import { useState } from 'react';
import {
  ArrowRight, ArrowUpRight, Check, CheckCircle2, ChevronDown,
  Clock3, ExternalLink, GraduationCap, Lightbulb, MonitorPlay, ShieldCheck,
  Sparkles, Wrench, Zap
} from 'lucide-react';
import { PeruCheckoutButton } from './components/PeruCheckoutButton';
import { WaitlistForm } from './components/WaitlistForm';

type Project = {name:string;image:string;description:string;skill:string;url:string;group:'Educación'|'Otros'};
const projects:Project[]=[
  {name:'Funciones Lab',image:'funciones-lab.webp',description:'Exploración de funciones con gráficas y práctica guiada.',skill:'Gráficas, lógica y retroalimentación',url:'https://funciones.sistemazenit.com/',group:'Educación'},
  {name:'GeoTransform Pro',image:'transformaciones-geometricas.webp',description:'Transformaciones geométricas interactivas en una pizarra.',skill:'Geometría dinámica y controles',url:'https://transformacionesgeometricas.sistemazenit.com/',group:'Educación'},
  {name:'Test vocacional RALE',image:'rale-test-vocacional.webp',description:'Evaluaciones y formularios de orientación para postulantes.',skill:'Preguntas, lógica y flujos de evaluación',url:'https://raletest.sistemazenit.com/',group:'Educación'},
  {name:'Mundos Simulados',image:'mundos-simulados.webp',description:'Modelos de física para experimentar en el navegador.',skill:'Simulaciones y experiencia visual',url:'https://mundossimulados.online/',group:'Otros'},
  {name:'Herramientas para Pymes',image:'herramientas-pymes.webp',description:'Aplicaciones que ayudan a resolver problemas prácticos de negocios.',skill:'Calculadoras y herramientas',url:'https://nubeparapymes.online/herramientas/',group:'Otros'},
  {name:'Todo Lima',image:'todo-lima.webp',description:'Directorio digital para explorar negocios y servicios.',skill:'Búsqueda e interfaces web',url:'https://todolima.com/',group:'Otros'}
];
const faq:[string,string][]=[
  ['¿Necesito saber programar?', 'No. Este entrenamiento se dirige a docentes que empiezan con desarrollo web asistido por IA. Sí necesitarás una computadora, internet y tiempo para seguir y revisar las instrucciones.'],
  ['¿Qué vamos a construir?', 'Un mini-simulacro interactivo de matemáticas con preguntas, respuestas, puntuación y retroalimentación. Será un proyecto introductorio sin cuentas de alumnos ni almacenamiento de notas.'],
  ['¿El ejercicio servirá para todas mis clases?', 'Aprenderás un procedimiento que podrás adaptar. Cada tema y nivel requiere revisar contenido, dificultades y respuestas. El ejemplo inicial no sustituye una plataforma educativa completa.'],
  ['¿Cuándo y dónde se realizará?', 'La primera edición piloto está en preparación. Fecha, modalidad, acceso y condiciones de grabación se confirmarán antes de habilitar el pago.'],
  ['¿Cuánto cuesta y cómo puedo pagar en Perú?', 'El precio introductorio es US$9. Cuando Mercado Pago esté activo, se mostrará el precio definitivo en soles antes del pago. Yape dependerá de los medios disponibles en tu cuenta y en el checkout.'],
  ['¿Debo pagar por herramientas adicionales?', 'Se priorizarán herramientas que permitan completar el ejercicio con planes gratuitos. Los servicios de IA y hosting pueden cambiar sus límites o requerir créditos adicionales.'],
  ['¿Los proyectos avanzados de la página vienen incluidos?', 'No. Esas aplicaciones documentan experiencia previa del instructor. El producto de US$9 es un taller de entrada con un proyecto pequeño y guiado.'],
  ['¿Me convertiré en desarrollador profesional en 105 minutos?', 'No. El objetivo es que aprendas y practiques un proceso inicial. Las bases de datos, la seguridad, el despliegue avanzado y los sistemas de producción requieren formación adicional.']
];
const steps=[
  {n:'01',time:'20 min',title:'De tus preguntas a una actividad',desc:'Selecciona un tema y estructura preguntas, respuestas y reglas de puntuación para que la IA entienda lo que necesitas.',outcome:'Guion y prompt inicial',icon:Lightbulb},
  {n:'02',time:'55 min',title:'De una pantalla a un simulacro funcional',desc:'Construye el ejercicio, revisa sus respuestas, detecta un fallo típico y corrígelo con pruebas.',outcome:'Simulacro autocorregible',icon:Wrench},
  {n:'03',time:'30 min',title:'De tu archivo a un enlace compartible',desc:'Conoce cómo preparar el proyecto y publicarlo para que pueda abrirse desde el teléfono.',outcome:'Ruta de publicación',icon:MonitorPlay}
];
function Brand(){
 return <a href="#inicio" className="inline-flex items-center gap-2.5" aria-label="Inicio del taller de aplicaciones educativas con IA">
  <span aria-hidden="true" className="flex size-10 items-center justify-center rounded-xl bg-[#5F34C8] font-mono text-xl font-bold text-white">∑</span>
  <span className="flex flex-col leading-none">
   <span className="font-display text-[19px] font-extrabold tracking-[-.06em] text-[#261840]">DE EJERCICIO <span className="text-[#7C44D4]">A APP</span></span>
   <span className="mt-1.5 text-[9px] font-bold uppercase tracking-[.15em] text-[#81708F]">Laboratorio práctico para docentes</span>
  </span>
 </a>;
}
function Heading({eyebrow,title,body}:{eyebrow:string;title:string;body?:string}){
 return <div className="max-w-3xl">
  <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#763AC5]">{eyebrow}</p>
  <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.45rem)] font-bold leading-[1.12] tracking-[-.055em] text-[#291840]">{title}</h2>
  {body&&<p className="mt-5 text-base leading-8 text-[#6D5C7D]">{body}</p>}
 </div>;
}
function QuizDemo(){
 const [answer,setAnswer]=useState<number|null>(null);
 const [checked,setChecked]=useState(false);
 const [corrected,setCorrected]=useState(false);
 const correctAnswer=3;
 const bugAnswer=4;
 const winner=corrected?correctAnswer:bugAnswer;
 const valid=answer===winner;
 const pick=(v:number)=>{setAnswer(v);setChecked(false)};
 return <div className="relative">
  <div aria-hidden="true" className="absolute -inset-5 rounded-[40px] bg-gradient-to-br from-[#BD9DF6]/40 via-[#F1B1D5]/20 to-[#FFD1A5]/35 blur-3xl"/>
  <div className="relative overflow-hidden rounded-[28px] border border-[#DDD1EF] bg-white shadow-[0_30px_80px_rgba(67,36,118,0.14)]">
   <div className="flex items-center justify-between gap-3 border-b border-[#EEE5F4] bg-[#FAF7FD] px-5 py-3">
    <div aria-hidden="true" className="flex gap-1.5"><span className="size-2.5 rounded-full bg-rose-300"/><span className="size-2.5 rounded-full bg-amber-300"/><span className="size-2.5 rounded-full bg-emerald-300"/></div>
    <span className="font-mono text-[10px] text-[#78658E]">matematicas.demo</span>
    <span className="rounded-full bg-[#EAF8F0] px-2 py-1 text-[10px] font-bold text-[#1B7863]">INTERACTIVO</span>
   </div>
   <div className="p-5 sm:p-7">
    <div className="flex flex-wrap items-center justify-between gap-3">
     <div><span className="text-[10px] font-bold uppercase tracking-[.17em] text-[#8850C9]">Práctica de álgebra</span><h3 className="mt-1 font-display text-xl font-bold text-[#2C1A41]">Un simulacro con un error</h3></div>
     <div className="inline-flex rounded-xl border border-[#E0D0F0] bg-[#F4EEFB] p-1" role="group" aria-label="Versiones del ejercicio">
      <button type="button" aria-pressed={!corrected} onClick={()=>{setCorrected(false);setChecked(false);setAnswer(null)}} className={'rounded-lg px-3 py-2 text-xs font-bold '+(!corrected?'bg-white text-[#7038C4] shadow':'text-[#806F90]')}>Con fallo</button>
      <button type="button" aria-pressed={corrected} onClick={()=>{setCorrected(true);setChecked(false);setAnswer(null)}} className={'rounded-lg px-3 py-2 text-xs font-bold '+(corrected?'bg-[#6933D1] text-white':'text-[#806F90]')}>Corregido</button>
     </div>
    </div>
    <p className="mt-6 text-sm font-semibold text-[#504162]">Resuelve la ecuación:</p>
    <div className="mt-3 rounded-2xl border border-[#E8D9F4] bg-[#FAF7FF] px-4 py-6 text-center font-display text-3xl font-bold tracking-[-.04em] text-[#3C205E]">3(2x + 1) = 21</div>
    <div className="mt-5 grid grid-cols-3 gap-3">
     {[2,3,4].map(n=><button key={n} type="button" onClick={()=>pick(n)} aria-pressed={answer===n} className={'rounded-xl border px-4 py-3.5 font-display text-lg font-bold transition focus-visible:outline-[#6D33D4] '+(answer===n?'border-[#6933D1] bg-[#F1E8FE] text-[#6332BD]':'border-[#DDD4E9] bg-white text-[#483657] hover:border-[#AB8AD8]')}>x = {n}</button>)}
    </div>
    <button disabled={answer===null} type="button" onClick={()=>setChecked(true)} className="mt-4 w-full rounded-xl bg-[#6736D0] px-5 py-3.5 text-sm font-extrabold text-white hover:bg-[#5428B4] disabled:cursor-not-allowed disabled:opacity-50">Comprobar respuesta</button>
    <div aria-live="polite" className={'mt-4 min-h-[83px] rounded-xl border p-4 text-sm '+(checked?(valid?'border-[#BFDDCF] bg-[#F1FAF5] text-[#1A745B]':'border-[#EDC5C7] bg-[#FFF5F4] text-[#99415D]'):'border-[#E9E0F1] bg-[#FAF9FC] text-[#756783]')}>
     {!checked?'Selecciona una alternativa y comprueba cómo responde la aplicación.':<><strong>{valid?'La aplicación marca: correcta':'La aplicación marca: incorrecta'}</strong><p className="mt-1.5 text-xs leading-5">{corrected?'La lógica corregida usa x = 3, porque 3(2·3 + 1) = 21.':"Esta versión contiene un fallo intencional: marca x = 4 como respuesta correcta. ¿Puedes detectarlo?"}</p></>}
    </div>
    <p className="mt-4 text-[11px] leading-5 text-[#82738F]"><Sparkles className="mr-1 inline size-3.5 text-[#9A5BD7]"/> Demostración didáctica programada para esta landing. No es una plataforma de alumnos ni un resultado de un cliente.</p>
   </div>
  </div>
 </div>;
}
function ProjectCard({project}:{project:Project}){
 return <article className="flex h-full flex-col overflow-hidden rounded-[24px] border border-[#E5D9EE] bg-white shadow-[0_9px_30px_rgba(65,29,100,0.055)]">
  <div className="aspect-[16/10] overflow-hidden bg-[#EFE5F9]"><img src={'/projects/captures/'+project.image} alt={'Captura documentada de '+project.name} loading="lazy" decoding="async" className="size-full object-cover object-top"/></div>
  <div className="flex flex-1 flex-col p-6"><span className="text-[10px] font-bold uppercase tracking-[.13em] text-[#8A51C5]">{project.skill}</span><h3 className="mt-2 font-display text-xl font-bold text-[#2C1A40]">{project.name}</h3><p className="mt-3 flex-1 text-sm leading-7 text-[#695B77]">{project.description}</p><a href={project.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#6531C6] hover:underline">Abrir proyecto <ExternalLink className="size-4"/></a></div>
 </article>;
}
function PortraitPlaceholder(){
 return <div className="mx-auto flex aspect-[4/5] w-full max-w-[300px] flex-col items-center justify-center rounded-[28px] border-2 border-dashed border-[#CBB0E7] bg-gradient-to-br from-[#F8F2FF] via-white to-[#FFEAD8] p-6 text-center"><span className="flex size-24 items-center justify-center rounded-[28px] bg-[#6432CE] font-display text-4xl font-bold text-white">XC</span><p className="mt-6 font-display text-lg font-bold text-[#2E1B40]">Xavier Cabello</p><p className="mt-3 text-sm leading-6 text-[#766583]">Fotografía real del instructor pendiente. No utilizaremos retratos generados.</p><span className="mt-5 rounded-full border border-[#DAC6EC] bg-white px-3 py-1.5 text-[11px] font-bold text-[#7E48BC]">Espacio reservado</span></div>;
}
export default function App(){
 const [more,setMore]=useState(false);
 return <div id="inicio" className="min-h-screen overflow-x-clip bg-[#FCFAFF] font-sans text-[#2D1A42]">
  <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-2 focus:z-50 focus:bg-white focus:p-4">Saltar al contenido</a>
  <div className="bg-[#39205C] px-4 py-2.5 text-center text-[11px] font-extrabold uppercase tracking-[.12em] text-white">TALLER 01 · Aplicaciones educativas con IA · Precio de introducción US$9</div>
  <header className="sticky top-0 z-40 border-b border-[#E2D6EB] bg-white/95 backdrop-blur-xl">
   <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-7"><Brand/><nav className="hidden items-center gap-6 text-sm font-semibold text-[#685977] lg:flex"><a href="#metodo" className="hover:text-[#6332C6]">Qué aprenderás</a><a href="#proyectos" className="hover:text-[#6332C6]">Aplicaciones</a><a href="#instructor" className="hover:text-[#6332C6]">Instructor</a><a href="#faq" className="hover:text-[#6332C6]">Preguntas</a></nav><a href="#inscripcion" className="shrink-0 rounded-xl bg-[#6432C9] px-4 py-3 text-xs font-extrabold text-white hover:bg-[#5222B6] sm:text-sm">Ver el taller <ArrowUpRight className="inline size-4"/></a></div>
  </header>
  <main id="contenido">
   <section className="brand-hero relative px-5 pb-24 pt-14 sm:px-7 sm:pt-20"><div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[.98fr_1.02fr]">
    <div><p className="inline-flex items-center gap-2 rounded-full border border-[#D8C4ED] bg-white/70 px-4 py-2 text-xs font-extrabold uppercase tracking-[.1em] text-[#7238BF]"><GraduationCap className="size-4"/> Para docentes de matemáticas</p><h1 className="mt-6 font-display text-[clamp(2.7rem,5vw,4.9rem)] font-bold leading-[1.07] tracking-[-.065em] text-[#25173C]">Tus ejercicios de matemáticas. <span className="bg-gradient-to-r from-[#6D36D6] to-[#DB448B] bg-clip-text text-transparent">Ahora en una app interactiva.</span></h1>
    <p className="mt-6 max-w-xl text-base leading-8 text-[#665674] sm:text-lg">Aprende a convertir tus preguntas en un simulacro autocorregible con IA, probar sus respuestas y compartirlo con tus estudiantes. Aunque nunca hayas programado.</p>
    <div className="mt-6 flex flex-wrap gap-3 text-xs font-bold text-[#564667]">{['Profesor o tutor','Proyecto guiado','105 minutos previstos'].map(t=><span key={t} className="rounded-full border border-[#E4D7F0] bg-white/90 px-3 py-2"><CheckCircle2 className="mr-1.5 inline size-4 text-[#1D896A]"/>{t}</span>)}</div>
    <a href="#inscripcion" className="mt-9 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#6630CB] to-[#C33FA1] px-7 py-4 text-base font-extrabold text-white shadow-[0_15px_30px_rgba(101,48,200,.2)] hover:opacity-95 sm:w-auto">Ver el entrenamiento de US$9 <ArrowRight className="size-5"/></a>
    <p className="mt-3 text-xs text-[#806F8B]">Primera edición piloto. Fecha, acceso y medios de pago pendientes de confirmación.</p>
    </div><QuizDemo/>
   </div></section>
   <section className="border-y border-[#E4D9ED] bg-white px-5 py-7 sm:px-7"><div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 text-center lg:flex-row lg:text-left"><p className="font-display text-lg font-bold text-[#3B284E]">No necesitas otro curso de prompts. <span className="text-[#7240C8]">Necesitas un material que tus alumnos puedan usar.</span></p><span className="rounded-full border border-[#E4D5EF] bg-[#FAF6FF] px-5 py-2.5 text-xs font-extrabold text-[#7241B8]">PREGUNTAS → APP → PRUEBA → ENLACE</span></div></section>
   <section className="px-5 py-24 sm:px-7"><div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[.92fr_1.08fr]"><Heading eyebrow="El problema en el aula" title="Ya tienes los ejercicios. Lo difícil es convertirlos en algo interactivo." body="Puedes preparar buenas preguntas en Word o PDF, pero conseguir una actividad con respuestas, puntuación y retroalimentación suele exigir tiempo, plataformas limitadas o ayuda técnica."/><div className="space-y-3">{[['Antes','Compartes un PDF y revisas respuestas manualmente.'],['Con una actividad interactiva','Tus alumnos eligen respuestas y reciben feedback inmediato.'],['El reto verdadero','Comprobar que ninguna respuesta se califique incorrectamente por un fallo de lógica.']].map(([title,desc],i)=><div key={title} className="flex gap-4 rounded-2xl border border-[#E8DEF1] bg-white p-6 shadow-sm"><span className="font-mono text-sm font-extrabold text-[#8B53C8]">0{i+1}</span><div><h3 className="font-display text-lg font-bold text-[#382247]">{title}</h3><p className="mt-1 text-sm leading-7 text-[#736480]">{desc}</p></div></div>)}</div></div></section>
   <section id="metodo" className="border-y border-[#E9DDF3] bg-[#F4EDFD] px-5 py-24 sm:px-7"><div className="mx-auto max-w-7xl"><Heading eyebrow="El entrenamiento" title="Tres pasos. Un recurso que puedes adaptar a tus clases." body="El ejercicio previsto es un mini-simulacro de alcance introductorio. No es una plataforma escolar completa ni requiere registrar datos personales de estudiantes."/><div className="mt-11 grid gap-5 lg:grid-cols-3">{steps.map(({n,time,title,desc,outcome,icon:Icon})=><article key={n} className="flex flex-col rounded-[26px] border border-[#E2D5EF] bg-white p-7"><div className="flex items-center justify-between"><span className="flex size-12 items-center justify-center rounded-xl bg-[#EDE1FC] text-[#6634CB]"><Icon className="size-6"/></span><span className="font-mono text-xs font-extrabold text-[#8C7A9E]">{time}</span></div><span className="mt-7 text-xs font-extrabold tracking-[.2em] text-[#9A70C8]">ETAPA {n}</span><h3 className="mt-2 font-display text-2xl font-bold text-[#322048]">{title}</h3><p className="mt-3 flex-1 text-sm leading-7 text-[#6F607C]">{desc}</p><p className="mt-6 border-t border-[#EEE5F5] pt-4 text-sm font-semibold text-[#443150]"><Check className="mr-2 inline size-4 text-[#20846D]"/>{outcome}</p></article>)}</div><p className="mt-5 text-xs text-[#81718E]">Los tiempos son orientativos; programa, fecha y modalidad se confirmarán antes del cobro.</p></div></section>
   <section id="proyectos" className="px-5 py-24 sm:px-7"><div className="mx-auto max-w-7xl"><Heading eyebrow="Experiencia demostrable" title="Aplicaciones reales para explorar, no promesas de resultados." body="Estos proyectos documentados muestran el tipo de aplicaciones educativas que he construido. Son de mayor alcance y no forman parte del ejercicio introductorio de US$9."/><div className="mt-10 grid gap-5 md:grid-cols-3">{projects.slice(0,more?6:3).map(p=><ProjectCard key={p.name} project={p}/>)}</div><div className="mt-7 text-center"><button onClick={()=>setMore(v=>!v)} className="inline-flex items-center gap-2 rounded-xl border border-[#CBB4E2] bg-white px-6 py-3.5 text-sm font-bold text-[#6832BD]">{more?'Ver solo proyectos educativos':'Ver más proyectos'} <ChevronDown className={'size-4 '+(more?'rotate-180':'')}/></button><p className="mt-4 text-xs text-[#82728D]">Capturas archivadas el 23 de octubre de 2026. La disponibilidad de las webs externas puede variar.</p></div></div></section>
   <section id="instructor" className="border-y border-[#E6DCEF] bg-[#F7F1FD] px-5 py-24 sm:px-7"><div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[.4fr_.6fr]"><PortraitPlaceholder/><div><Heading eyebrow="Quién enseña" title="Xavier Cabello" body="Trabajo en educación matemática y en desarrollo de herramientas web. He desarrollado recursos interactivos que pueden abrirse en el navegador, y algunos colegas docentes me han contratado para crear proyectos digitales."/><p className="mt-4 text-base leading-8 text-[#70607F]">Esa experiencia motivó la idea de enseñar el proceso en lugar de ofrecer únicamente el trabajo terminado. El taller de US$9 es la primera prueba de ese formato de enseñanza.</p><a href="https://xavier.cabellosalirrosas.com/" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 font-bold text-[#6834C7] hover:underline">Explorar mi portafolio <ExternalLink className="size-4"/></a></div></div></section>
   <section id="inscripcion" className="px-5 py-24 sm:px-7"><div className="mx-auto max-w-6xl"><div className="mx-auto text-center"><p className="text-xs font-extrabold uppercase tracking-[.16em] text-[#7A3ABF]">Primera edición · Precio piloto</p><h2 className="mt-3 font-display text-[clamp(2.2rem,4.5vw,3.5rem)] font-bold tracking-[-.06em] text-[#2C1A43]">Tu primera actividad matemática creada con IA</h2><p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#6F607C]">Un entrenamiento guiado, diseñado para que puedas replicar el proceso en otras unidades y lecciones.</p></div><div className="mt-10 grid overflow-hidden rounded-[28px] border border-[#E0D0ED] bg-white shadow-[0_25px_70px_rgba(70,35,113,.09)] lg:grid-cols-[1.06fr_.94fr]"><div className="p-7 sm:p-10"><p className="inline-flex items-center gap-2 rounded-full bg-[#EFE4FD] px-4 py-2 text-xs font-bold text-[#7139C6]"><GraduationCap className="size-4"/> Taller de entrada para docentes</p><h3 className="mt-6 font-display text-3xl font-bold text-[#2D1945]">De tus ejercicios a un simulacro autocorregible</h3><ul className="mt-7 space-y-4 text-sm leading-7 text-[#51415F]">{['Un ejemplo guiado con preguntas y retroalimentación.','Prompts para planificar y generar la primera versión.','Revisión de puntuación y corrección de un fallo de lógica.','Preparación para publicar y compartir mediante un enlace.','Fecha, acceso y materiales confirmados antes de abrir pagos.'].map(t=><li key={t} className="flex items-start gap-2.5"><CheckCircle2 className="mt-1 size-4 shrink-0 text-[#178568]"/>{t}</li>)}</ul><p className="mt-7 border-t border-[#EFE5F4] pt-5 text-xs leading-6 text-[#82738D]">No incluye cuentas de alumnos, base de datos, reportes escolares, integración con plataformas institucionales ni una aplicación móvil nativa.</p></div><div className="flex flex-col justify-center border-t border-[#EDE1F5] bg-gradient-to-br from-[#F6EFFF] to-[#FFF6FA] p-7 sm:p-10 lg:border-l lg:border-t-0"><p className="text-xs font-bold uppercase tracking-[.15em] text-[#8754C4]">Precio de introducción</p><div className="mt-2 font-display text-[clamp(4.2rem,8vw,5.8rem)] font-bold tracking-[-.075em] text-[#2D1945]">US$9 <span className="text-sm font-semibold tracking-normal text-[#7C6B89]">pago único</span></div><p className="mt-4 text-sm leading-7 text-[#6E5D7D]">En Perú, el monto exacto en soles se mostrará antes de pagar una vez habilitado Mercado Pago.</p><div className="mt-7"><PeruCheckoutButton label="Inscribirme al taller · US$9"/></div><p className="mt-5 flex items-start gap-2 text-xs leading-6 text-[#897993]"><ShieldCheck className="mt-0.5 size-4 shrink-0"/> Pagos aún en preparación; no se realizará ningún cargo hasta su activación.</p></div></div><div className="mx-auto mt-8 max-w-3xl"><WaitlistForm/></div></div></section>
   <section id="faq" className="border-t border-[#E8DFF2] bg-[#F8F4FD] px-5 py-24 sm:px-7"><div className="mx-auto max-w-3xl"><Heading eyebrow="Dudas frecuentes" title="Antes de inscribirte, conoce el alcance exacto."/><div className="mt-10 space-y-3">{faq.map(([q,a])=><details key={q} className="group rounded-2xl border border-[#E5D9EF] bg-white p-5 open:border-[#C6A6E7]"><summary className="flex list-none items-center justify-between gap-3 font-bold text-[#332146] [&::-webkit-details-marker]:hidden">{q}<ChevronDown className="size-5 shrink-0 text-[#8D53C5] transition group-open:rotate-180"/></summary><p className="mt-3 text-sm leading-7 text-[#6F617B]">{a}</p></details>)}</div></div></section>
   <section className="px-5 py-20 text-center sm:px-7"><h2 className="mx-auto max-w-3xl font-display text-[clamp(2rem,4vw,3.35rem)] font-bold leading-tight tracking-[-.055em] text-[#29193F]">Tus alumnos ya resuelven ejercicios.<br/><span className="text-[#713BC9]">Haz que también puedan explorarlos.</span></h2><a href="#inscripcion" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#6832D0] px-7 py-4 font-extrabold text-white">Conocer el taller de US$9 <ArrowRight className="size-5"/></a></section>
  </main><footer className="border-t border-[#E4D9EF] bg-white px-5 py-9 pb-24 sm:pb-9"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-xs leading-6 text-[#7D6D8A] sm:flex-row"><p>© 2026 · Taller práctico de aplicaciones educativas con IA</p><a href="/privacidad" className="font-semibold hover:underline">Privacidad</a><p>Contacto: <a href="mailto:xavier@cabellosalirrosas.com" className="underline">xavier@cabellosalirrosas.com</a></p></div></footer>
  <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between border-t border-[#E0D2ED] bg-white/95 px-4 py-3 shadow-[0_-8px_25px_rgba(66,33,95,.1)] sm:hidden"><span className="font-display text-sm font-extrabold text-[#352047]">Taller 01 <span className="text-[#7640C9]">· US$9</span></span><a href="#inscripcion" className="rounded-lg bg-[#6832D0] px-4 py-3 text-xs font-bold text-white">Ver taller</a></div>
 </div>;
}
