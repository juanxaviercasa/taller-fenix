import { ShieldCheck } from 'lucide-react';

export default function PaymentReturn() {
  const status = new URLSearchParams(window.location.search).get('estado');
  const failed = status === 'fallido';
  const pending = status === 'pendiente';
  return <main className="min-h-screen bg-slate-950 px-5 py-20 text-center text-slate-100">
    <section className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-slate-900 p-8">
      <ShieldCheck className="mx-auto mb-5 size-12 text-fuchsia-400" />
      <h1 className="text-3xl font-bold">{failed ? 'El pago no se completó' : pending ? 'Tu pago está pendiente' : 'Estamos verificando tu pago'}</h1>
      <p className="mt-5 text-slate-300">
        {failed ? 'Puedes volver al entrenamiento e intentarlo nuevamente.' :
          'El retorno a esta página no es una confirmación de pago. La inscripción será validada en Mercado Pago antes de entregar el acceso.'}
      </p>
      <a href="/bycoding" className="mt-7 inline-block rounded-lg bg-fuchsia-600 px-6 py-3 font-semibold text-white">Volver al entrenamiento</a>
    </section>
  </main>;
}
