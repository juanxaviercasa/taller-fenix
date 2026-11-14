import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#F8F9F7] px-5 py-16 text-[#21443C]">
      <article className="mx-auto max-w-3xl rounded-3xl border border-[#D8E5DC] bg-white p-8 shadow-sm sm:p-12">
        <a href="/" className="inline-flex items-center gap-2 font-semibold text-[#286A52]">
          <ArrowLeft className="size-4" /> Volver al taller
        </a>
        <h1 className="mt-7 font-display text-4xl font-bold">Privacidad y contacto</h1>
        <p className="mt-5 leading-7">
          Responsable: Juan Xavier Cabello. Contacto:{' '}
          <a className="font-semibold underline" href="mailto:xavier@cabellosalirrosas.com">
            xavier@cabellosalirrosas.com
          </a>
          .
        </p>

        <h2 className="mt-7 text-xl font-bold">Qué información se solicita</h2>
        <p className="mt-2 leading-7">
          Explorar esta página y probar el graficador no solicita datos personales. Si te registras en la lista de aviso cuando esté activa, únicamente solicitamos tu correo electrónico y consentimiento expreso. Si nos escribes por correo, recibiremos la información que incluyas en tu mensaje.
        </p>

        <h2 className="mt-7 text-xl font-bold">Pago del taller y comunidad</h2>
        <p className="mt-2 leading-7">
          El taller de entrada está previsto en Hotmart por un pago único de US$9, con acceso durante 30 días. El checkout todavía no está conectado. Cuando se habilite, el registro y el pago se procesarán directamente en Hotmart bajo sus propias condiciones de privacidad y seguridad. Esta landing no solicita ni almacena datos de tarjetas bancarias. La comunidad opcional de acompañamiento semanal se ofrecerá por separado en Skool; su alta y cobro estarán sujetos a las condiciones de esa plataforma.
        </p>

        <h2 className="mt-7 text-xl font-bold">Para qué usamos tus datos y dónde se almacenan</h2>
        <p className="mt-2 leading-7">
          Los datos de contacto o lista de aviso se usan exclusivamente para responder consultas, compartir información del taller y avisar cuando se habilite la inscripción. No vendemos tu información. Si el formulario de lista de aviso está habilitado, se almacena en Cloudflare D1; mientras no esté configurado, el formulario no recopila correos.
        </p>

        <h2 className="mt-7 text-xl font-bold">Tus opciones</h2>
        <p className="mt-2 leading-7">
          Puedes solicitar acceso, corrección o eliminación de los datos que nos hayas enviado escribiendo al contacto indicado. También puedes consultar cualquier duda sobre el taller, su formato o condiciones antes de realizar un pago.
        </p>

        <p className="mt-8 text-sm text-[#63766A]">Última actualización: noviembre de 2026.</p>
      </article>
    </main>
  );
}
