import { useEffect, useState } from 'react';
import { ArrowUpRight, LoaderCircle, ShieldCheck } from 'lucide-react';

type CheckoutStatus = { ready: boolean; amount: number | null; currency: 'PEN'; offerUsd: number };
const defaultClass = 'inline-flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#6D32DA] to-[#D846A3] px-6 py-5 text-lg font-bold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto';

export function PeruCheckoutButton({ label = 'Inscribirme por US$9', className = '' }: { label?: string; className?: string }) {
  const [status, setStatus] = useState<CheckoutStatus | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    fetch('/api/checkout', { cache: 'no-store' })
      .then(async response => {
        if (!response.ok) throw new Error('Sin endpoint activo');
        return await response.json() as CheckoutStatus;
      })
      .then(data => { if (active) setStatus(data); })
      .catch(() => { if (active) setStatus({ ready: false, amount: null, currency: 'PEN', offerUsd: 9 }); });
    return () => { active = false; };
  }, []);

  const pay = async () => {
    if (busy || !status?.ready) return;
    setBusy(true); setError('');
    try {
      const res = await fetch('/api/checkout', { method: 'POST' });
      const data = await res.json() as { checkoutUrl?: string; error?: string };
      if (!res.ok || !data.checkoutUrl) throw new Error(data.error || 'No se pudo iniciar el pago.');
      const url = new URL(data.checkoutUrl);
      if (url.protocol !== 'https:' || !/(^|\.)mercadopago\.com(\.pe)?$/.test(url.hostname)) throw new Error('Destino de pago inválido.');
      window.location.assign(url.href);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error inesperado. Inténtalo nuevamente.');
      setBusy(false);
    }
  };
  const enabled = status?.ready === true;
  return <div className="w-full text-center">
    <button type="button" onClick={pay} disabled={!enabled || busy} className={className ? className + ' disabled:opacity-50 disabled:cursor-not-allowed' : defaultClass}>
      {busy ? <LoaderCircle className="size-5 animate-spin" /> : <ArrowUpRight className="size-5" />}
      {busy ? 'Conectando con Mercado Pago…' : enabled ? label : 'Pago en preparación · US$9'}
    </button>
    <p className="mt-2 text-xs text-[#66577B]">
      <ShieldCheck className="mr-1 inline size-4" />
      {enabled ? `El cobro para Perú será de S/${status?.amount} · Yape solo si está disponible en tu checkout` :
        'Integración de Mercado Pago pendiente de activación. No se realizará ningún cargo.'}
    </p>
    {error && <p role="alert" className="mt-2 text-sm text-[#9F2140]">{error}</p>}
  </div>;
}
