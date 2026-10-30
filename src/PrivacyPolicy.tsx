import { ArrowLeft } from 'lucide-react';
export default function PrivacyPolicy() {
  return <main className="min-h-screen bg-[#FAF8FF] px-5 py-16 text-[#352243]">
    <article className="mx-auto max-w-3xl rounded-3xl border border-[#E6DCEF] bg-white p-8 shadow-sm sm:p-12">
      <a href="/" className="inline-flex items-center gap-2 font-semibold text-[#6330CC]"><ArrowLeft className="size-4"/> Volver al taller</a>
      <h1 className="mt-7 font-display text-4xl font-bold">Privacidad de la lista de interesados</h1>
      <p className="mt-5 leading-7">Responsable: Juan Xavier Cabello. Contacto: <a className="font-semibold underline" href="mailto:xavier@cabellosalirrosas.com">xavier@cabellosalirrosas.com</a>.</p>
      <h2 className="mt-7 text-xl font-bold">Qué información se solicita</h2>
      <p className="mt-2 leading-7">Únicamente tu correo electrónico, fecha de consentimiento y procedencia general del registro, cuando la lista esté activada.</p>
      <h2 className="mt-7 text-xl font-bold">Para qué se utilizará</h2>
      <p className="mt-2 leading-7">Solo para avisarte de la apertura del entrenamiento «De demo a app». No vendemos tu información ni la usamos para enviarte otras campañas sin consentimiento adicional.</p>
      <h2 className="mt-7 text-xl font-bold">Dónde se almacena</h2>
      <p className="mt-2 leading-7">Si se habilita el registro, los datos se almacenarán en una base de datos gestionada mediante Cloudflare. Mientras no se configure, el formulario no recoge correos. Si nos escribes, tu mensaje se administra mediante el servicio de correo correspondiente.</p>
      <h2 className="mt-7 text-xl font-bold">Tus opciones</h2>
      <p className="mt-2 leading-7">Puedes solicitar acceso, corrección o eliminación de tu correo escribiendo al contacto indicado. Conservaremos los datos solo el tiempo necesario para comunicar la apertura y atender solicitudes, revisando periódicamente los registros.</p>
      <p className="mt-8 text-sm text-[#796889]">Última actualización: octubre de 2026. Revisar el texto legal y la configuración de tratamiento de datos antes de habilitar el registro automatizado.</p>
    </article>
  </main>;
}
