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
    fetch('/api/waitlist', {cache:'no-store'})
      .then(r => r.ok ? r.json() as Promise<{available:boolean}> : Promise.reject())
      .then(v => { if(active) setAvailable(Boolean(v.available)); })
      .catch(()=> { if(active) setAvailable(false); });
    return () => { active = false; };
  }, []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!available || busy) return;
    const honeypot = new FormData(event.currentTarget).get('website');
    setError(''); setBusy(true);
    try {
      const res = await fetch('/api/waitlist', {
        method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify({email,consent,website:typeof honeypot === 'string' ? honeypot : '',source:'landing'}),
      });
      const data = await res.json() as {ok?:boolean;error?:string};
      if(!res.ok || !data.ok) throw new Error(data.error || 'No se pudo registrar.');
      setComplete(true); setEmail('');
    } catch(e) { setError(e instanceof Error ? e.message : 'No se pudo registrar.'); }
    finally { setBusy(false); }
  };

  return <div className="waitlist-shell rounded-[24px] border border-[#E4D9F0] bg-white p-5 shadow-[0_16px_50px_rgba(64,35,105,0.07)] sm:p-7">
    <div className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-[#27133E]"><Mail className="size-5 text-[#6836DB]"/> Recibe novedades del taller Matemáticas × IA</div>
    {complete ? <p role="status" className="flex items-center gap-2 text-sm font-semibold text-[#186B5C]"><CheckCircle2 className="size-5"/> ¡Registro recibido! Te avisaremos cuando abran las inscripciones. Esto no constituye una compra ni garantiza una plaza.</p> :
      available ? <form onSubmit={submit} className="grid gap-3">
        <div className="hidden" aria-hidden="true"><label>Web<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
        <label className="text-sm font-semibold text-[#3B294D]" htmlFor="interest-email">Tu mejor correo electrónico</label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input id="interest-email" required type="email" maxLength={254} autoComplete="email" placeholder="profesor@correo.com" value={email} onChange={e=>setEmail(e.target.value)} className="min-w-0 flex-1 rounded-xl border border-[#D4C2E8] bg-[#FEFCFF] px-4 py-3.5 text-[#291642] outline-none focus:border-[#7540DC] focus:ring-2 focus:ring-[#E4D6FF]" />
          <button disabled={busy || !consent} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#6234D3] px-6 py-3.5 font-bold text-white hover:bg-[#5427BF] disabled:cursor-not-allowed disabled:opacity-50">{busy?'Registrando…':'Avisarme al abrir inscripciones'}<ArrowRight className="size-4"/></button>
        </div>
        <label className="flex items-start gap-2 text-xs leading-5 text-[#685875]">
          <input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)} className="mt-1 accent-[#6234D3]" required/>
          Acepto recibir un aviso sobre la apertura del taller Matemáticas × IA. Puedo solicitar la eliminación de mis datos cuando quiera. <a href="/privacidad" className="font-semibold underline">Privacidad</a>.
        </label>
        {error && <p role="alert" className="text-sm text-[#A22555]">{error}</p>}
      </form> :
      <div>
        <p className="text-sm leading-6 text-[#645775]">La inscripción y el pago automático todavía no están disponibles. Para consultar el programa y las fechas del taller, escríbenos directamente:</p>
        <a href={'mailto:'+CONTACT_EMAIL+'?subject='+encodeURIComponent('Consulta sobre el taller Matemáticas x IA')} className="mt-4 inline-flex items-center gap-2 rounded-xl border border-[#6F37D7] px-5 py-3 font-bold text-[#6632CA] hover:bg-[#F4EEFF]">Consultar sobre el taller <ArrowRight className="size-4"/></a>
      </div>
    }
  </div>;
}
