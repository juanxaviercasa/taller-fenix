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
    <div className="waitlist-shell rounded-[24px] border border-[#E9D9C9] bg-white p-5 shadow-[0_14px_45px_rgba(94,51,26,0.07)] sm:p-7">
      <div className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-[#39261F]">
        <Mail className="size-5 text-[#C45C28]" />
        ¿Quieres que te avise cuando abran las inscripciones?
      </div>
      {complete ? (
        <p role="status" className="flex items-center gap-2 text-sm font-semibold text-[#1E6B52]">
          <CheckCircle2 className="size-5 shrink-0" />
          ¡Listo! Te avisaremos cuando se habilite la inscripción al taller. Esto no es una compra ni genera ningún cobro.
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
              className="zenit-primary-cta inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-bold disabled:cursor-not-allowed disabled:opacity-50"
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
              Acepto recibir un correo cuando abran las inscripciones del taller. Puedo solicitar la eliminación de mis datos cuando quiera.{' '}
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
            Escríbeme y te aviso apenas abran las inscripciones. También puedes preguntarme cualquier duda sobre el taller.
          </p>
          <a
            href={
              'mailto:' +
              CONTACT_EMAIL +
              '?subject=' +
              encodeURIComponent('Quiero información del taller de apps educativas con IA (US$9)')
            }
            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-[#89B7A0] px-5 py-3 text-sm font-bold text-[#205C49] transition hover:bg-[#ECF5EE]"
          >
            Escribirme por correo <ArrowRight className="size-4" />
          </a>
        </div>
      )}
    </div>
  );
}
