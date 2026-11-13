import { useEffect, useState, type FormEvent } from 'react';
import { ArrowRight, CheckCircle2, Mail } from 'lucide-react';

const CONTACT_EMAIL = 'xavier@cabellosalirrosas.com';

export function WaitlistForm() {
  const [available, setAvailable] = useState(false);
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    fetch('/api/waitlist', { cache: 'no-store' })
      .then(r => (r.ok ? (r.json() as Promise<{ available: boolean }>) : Promise.reject()))
      .then(v => {
        if (active) setAvailable(Boolean(v.available));
      })
      .catch(() => {
        if (active) setAvailable(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!available || busy) return;
    const honeypot = new FormData(event.currentTarget).get('website');
    setError('');
    setBusy(true);
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          email,
          consent,
          website: typeof honeypot === 'string' ? honeypot : '',
          source: 'landing',
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || 'No se pudo registrar.');
      setComplete(true);
      setEmail('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo registrar.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="waitlist-shell rounded-[24px] border border-[#D8E2DC] bg-white p-5 shadow-[0_14px_45px_rgba(22,54,42,0.06)] sm:p-7">
      <div className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-[#193E36]">
        <Mail className="size-5 text-[#286F5A]" />
        ¿Quieres enterarte apenas conectemos Skool o hacer una consulta?
      </div>
      {complete ? (
        <p role="status" className="flex items-center gap-2 text-sm font-semibold text-[#1E6B52]">
          <CheckCircle2 className="size-5 shrink-0" />
          ¡Registro recibido! Te avisaremos cuando conectemos el checkout oficial en Skool. Esto no constituye una compra ni genera ningún cobro.
        </p>
      ) : available ? (
        <form onSubmit={submit} className="grid gap-3">
          <div className="hidden" aria-hidden="true">
            <label>
              Web
              <input name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <label className="text-sm font-semibold text-[#23483F]" htmlFor="interest-email">
            Tu correo electrónico
          </label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              id="interest-email"
              required
              type="email"
              maxLength={254}
              autoComplete="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="min-w-0 flex-1 rounded-xl border border-[#C5D8CB] bg-[#FCFEFC] px-4 py-3.5 text-[#1F3E37] outline-none focus:border-[#26674F] focus:ring-2 focus:ring-[#E1F0E6]"
            />
            <button
              disabled={busy || !consent}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#193F39] px-6 py-3.5 font-bold text-white hover:bg-[#286957] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy ? 'Registrando…' : 'Avisarme al abrir inscripciones'}
              <ArrowRight className="size-4" />
            </button>
          </div>
          <label className="flex items-start gap-2 text-xs leading-5 text-[#65776D]">
            <input
              type="checkbox"
              checked={consent}
              onChange={e => setConsent(e.target.checked)}
              className="mt-1 accent-[#193F39]"
              required
            />
            <span>
              Acepto recibir un aviso cuando conectemos el acceso oficial del taller en Skool. Puedo solicitar la eliminación de mis datos cuando quiera.{' '}
              <a href="/privacidad" className="font-semibold underline">
                Privacidad
              </a>
              .
            </span>
          </label>
          {error && (
            <p role="alert" className="text-sm text-[#9F2945]">
              {error}
            </p>
          )}
        </form>
      ) : (
        <div>
          <p className="text-sm leading-6 text-[#5E7267]">
            Mientras terminamos de conectar el botón oficial hacia la comunidad de Skool, no se procesa ningún cobro automático. Si quieres consultar fechas, resolver dudas o pedir aviso por correo:
          </p>
          <a
            href={
              'mailto:' +
              CONTACT_EMAIL +
              '?subject=' +
              encodeURIComponent('Consulta sobre el taller de aplicaciones web con IA (US$9 · Skool)')
            }
            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-[#89B7A0] px-5 py-3 text-sm font-bold text-[#205C49] transition hover:bg-[#ECF5EE]"
          >
            Consultar sobre el taller <ArrowRight className="size-4" />
          </a>
        </div>
      )}
    </div>
  );
}
