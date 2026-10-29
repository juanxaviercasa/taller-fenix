import { useState } from 'react';
import { ArrowUpRight, LoaderCircle, ShieldCheck } from 'lucide-react';

export function PeruCheckoutButton({ label = 'Inscribirme por US$9', className = '' }: { label?: string; className?: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const pay = async () => {
    if (busy) return;
    setBusy(true); setError('');
    try {
      const res = await fetch('/api/checkout', { method: 'POST' });
      const data = await res.json() as { checkoutUrl?: string; error?: string };
      if (!res.ok || !data.checkoutUrl) throw new Error(data.error || 'No se pudo iniciar el pago.');
      const url = new URL(data.checkoutUrl);
      if (url.protocol !== 'https:' || !/(^|\.)mercadopago\.com(\.pe)?$/.test(url.hostname)) throw new Error('Respuesta de pago inválida.');
      window.location.assign(url.href);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error inesperado. Inténtalo nuevamente.');
      setBusy(false);
    }
  };
  return <div className="w-full text-center">
    <button type="button" onClick={pay} disabled={busy} className={className || 'inline-flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-5 text-lg font-bold text-white hover:opacity-90 disabled:opacity-60 sm:w-auto'}>
      {busy ? <LoaderCircle className="size-5 animate-spin" /> : <ArrowUpRight className="size-5" />}
      {busy ? 'Conectando con Mercado Pago…' : label}
    </button>
    <p className="mt-2 text-xs text-slate-400"><ShieldCheck className="mr-1 inline size-4" /> Pago seguro en soles con Mercado Pago · Yape sujeto a disponibilidad</p>
    {error && <p role="alert" className="mt-2 text-sm text-rose-300">{error}</p>}
  </div>;
}
