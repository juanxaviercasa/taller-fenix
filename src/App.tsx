import { useState } from 'react';
import {
  ArrowRight, Check, CheckCircle2, ChevronDown,
  ExternalLink, GraduationCap, Lightbulb, MonitorPlay, ShieldCheck,
  Sparkles, Wrench
} from 'lucide-react';
import { PeruCheckoutButton } from './components/PeruCheckoutButton';
import { WaitlistForm } from './components/WaitlistForm';
import MathStudio from './components/MathStudio';

type Project = {name:string;image:string;description:string;skill:string;url:string;group:'Educación'|'Otros'};
const projects:Project[]=[
  {name:'Funciones Lab',image:'funciones-lab.webp',description:'Olvídate de trazar y borrar ejes una y otra vez: cambia parámetros en vivo y haz que el salón comprenda funciones en minutos.',skill:'Cero desgaste en pizarra · Comprensión rápida',url:'https://funciones.sistemazenit.com/',group:'Educación'},
  {name:'Transformaciones Geométricas',image:'transformaciones-geometricas.webp',description:'Visualiza transformaciones en tiempo real, sigue una ruta de aprendizaje y ofrece práctica con recursos imprimibles listos.',skill:'Ahorra horas de dibujo · Material imprimible',url:'https://transformacionesgeometricas.sistemazenit.com/',group:'Educación'},
  {name:'Sólidos Geométricos',image:'solidos-geometricos.webp',description:'Modelos 3D interactivos, desarrollos planos, teoría y retos al servicio de tus clases de matemáticas sin sufrir dibujando en 2D.',skill:'Impacto visual 3D · Secuencia didáctica lista',url:'https://solidosgeometricos.sistemazenit.com/',group:'Educación'},
  {name:'Mundos Simulados',image:'mundos-simulados.webp',description:'Modelos visuales de física y sistemas dinámicos listos para proyectar y capturar la atención de toda el aula.',skill:'Atención inmediata · Pensamiento matemático',url:'https://mundossimulados.online/',group:'Educación'},
  {name:'Test vocacional RALE',image:'rale-test-vocacional.webp',description:'Evaluaciones y formularios automatizados que ahorran horas de revisión manual.',skill:'Automatización y flujos de evaluación',url:'https://raletest.sistemazenit.com/',group:'Otros'},
  {name:'Herramientas para Pymes',image:'herramientas-pymes.webp',description:'Calculadoras y sistemas prácticos creados con el mismo método para generar ingresos adicionales.',skill:'Oportunidad profesional y monetización',url:'https://nubeparapymes.online/herramientas/',group:'Otros'},
  {name:'Todo Lima',image:'todo-lima.webp',description:'Directorio digital que demuestra cómo este método abre puertas más allá del aula.',skill:'Proyectos digitales escalables',url:'https://todolima.com/',group:'Otros'}
];

const faq:[string,string][]=[
  ['"Ya tengo demasiado trabajo como profesor. ¿Esto me va a quitar más tiempo?"', 'Todo lo contrario: el único objetivo de este método es DEVOLVERTE tiempo y energía. Hoy pierdes horas cada semana volviendo a escribir y dibujar los mismos gráficos en distintos salones porque el borrador se lleva tu trabajo. Con este sistema, la IA construye tu recurso visual en minutos una sola vez y tú lo reutilizas todo el año con un clic, terminando tus días de clase con mucha menos fatiga.'],
  ['"No sé nada de programación ni quiero volverme informático. ¿Es para mí?"', 'A ningún profesor le interesa volverse programador, y no necesitas serlo. La IA hace el 95% del trabajo técnico pesado usando nuestras plantillas. Tú solo pones tu criterio como docente de matemáticas para elegir qué quieres que tus alumnos vean moverse en pantalla y comprobar que el resultado sea exacto.'],
  ['¿Cómo me ayuda esto económicamente y en mi crecimiento profesional?', 'Los docentes mejor valorados y mejor pagados no son los que más tiza o plumón gastan, sino los que logran resultados visibles. Enseñar con tus propios simuladores interactivos te diferencia de inmediato en tu colegio, academia o universidad, te permite cobrar mejor por tus clases particulares o grupales, e incluso te abre la puerta a vender recursos digitales a otros colegas o instituciones.'],
  ['¿Funciona para mis clases de Secundaria, Preuniversitario o Universidad?', 'Sí. El ahorro de tiempo y el impacto visual aplican en los tres niveles: desde funciones y geometría en Secundaria, pasando por trigonometría analítica en Preuniversitario, hasta derivadas e integrales en la Universidad.'],
  ['¿Qué recibo exactamente por los US$9 y por qué es tan accesible?', 'Por solo US$9 (menos de lo que cuestan unos plumones de pizarra) recibes el entrenamiento práctico paso a paso a tu ritmo, las plantillas de instrucciones listas para copiar y pegar, y el sistema para tener tu primer recurso interactivo funcionando en tus clases esta misma semana. Es nuestra oferta de entrada para que compruebes el resultado en tu propia aula y entres a nuestro ecosistema docente.'],
  ['¿Las plataformas grandes como Sólidos Geométricos o el Math Studio vienen hechas dentro de los US$9?', 'Esos sistemas avanzados te muestran el potencial económico y profesional al que puedes escalar dentro de nuestro ecosistema. En este primer paso de US$9 nos enfocamos en tu primera victoria rápida: que tengas tu primer módulo interactivo funcionando en tiempo récord y sin abrumarte.'],
  ['¿De verdad cambia la atención y el orden de los estudiantes en el salón?', 'Piénsalo así: cuando das la espalda durante 4 minutos para dibujar una gráfica a mano, el salón se dispersa. Cuando estás de frente, mueves un control en vivo y la curva o el sólido se transforma ante sus ojos, el estudiante deja de fingir que entendió por miedo y se engancha con la explicación.']
];

const steps=[
  {n:'01',time:'Ahorro inmediato',title:'Delega a la IA el dibujo que hoy te cansa repetir',desc:'Elige ese tema de tus clases de matemáticas donde pierdes tiempo trazando en la pizarra y usa nuestra plantilla lista para pedirle a la IA la visualización exacta.',outcome:'Cero horas perdidas dibujando desde cero',icon:Lightbulb,image:'/metodo/etapa-01-modelo-matematico.webp'},
  {n:'02',time:'Sin esfuerzo técnico',title:'Obtén en minutos un gráfico vivo que sí se mueve',desc:'Sin tocar código complejo, la IA genera tus figuras y funciones con controles en tiempo real para que tus alumnos vean al instante lo que en 2D era imposible explicar.',outcome:'Clases fluidas que capturan la atención',icon:Wrench,image:'/metodo/etapa-02-interaccion-ia.webp'},
  {n:'03',time:'Úsalo todo el año',title:'Guárdalo una vez y reutilízalo en todos tus salones',desc:'Ábrelo con un clic en el colegio, la academia, la universidad o tus clases particulares. Menos desgaste para tu garganta y mayor prestigio para tu carrera docente.',outcome:'Más tiempo libre, energía y valor profesional',icon:MonitorPlay,image:'/metodo/etapa-03-publicacion-web.webp'}
];

function Heading({eyebrow,title,body}:{eyebrow:string;title:string;body?:string}){
 return <div className="max-w-3xl">
  <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#763AC5]">{eyebrow}</p>
  <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.45rem)] font-bold leading-[1.12] tracking-[-.055em] text-[#291840]">{title}</h2>
  {body&&<p className="mt-5 text-base leading-8 text-[#6D5C7D]">{body}</p>}
 </div>;
}

function ProjectCard({project}:{project:Project}){
 return <article className="flex h-full flex-col overflow-hidden rounded-[24px] border border-[#E5D9EE] bg-white shadow-[0_9px_30px_rgba(65,29,100,0.055)]">
  <div className="aspect-[16/10] overflow-hidden bg-[#EFE5F9]"><img src={'/projects/captures/'+project.image} alt={'Captura documentada de '+project.name} loading="lazy" decoding="async" className="size-full object-cover object-top"/></div>
  <div className="flex flex-1 flex-col p-6"><span className="text-[10px] font-bold uppercase tracking-[.13em] text-[#8A51C5]">{project.skill}</span><h3 className="mt-2 font-display text-xl font-bold text-[#2C1A40]">{project.name}</h3><p className="mt-3 flex-1 text-sm leading-7 text-[#695B77]">{project.description}</p><a href={project.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#6531C6] hover:underline">Ver cómo ahorra tiempo en clase <ExternalLink className="size-4"/></a></div>
 </article>;
}

function InstructorPortrait(){
 return <div className="mx-auto flex w-full max-w-[320px] flex-col overflow-hidden rounded-[28px] border border-[#CBB0E7] bg-white shadow-[0_20px_50px_rgba(100,50,200,0.12)]">
   <img src="/instructor/xavier-cabello.webp" alt="Juan Xavier Cabello - Docente de matemáticas y desarrollador web" loading="lazy" decoding="async" className="aspect-[4/5] w-full object-cover object-top"/>
   <div className="border-t border-[#EBDFF5] bg-[#FBF9FD] px-5 py-3.5 text-center">
     <p className="font-display text-base font-bold text-[#2E1B40]">Juan Xavier Cabello</p>
     <p className="text-xs font-semibold text-[#7645BA]">Profesor de matemáticas & creador del método</p>
   </div>
 </div>;
}

export default function App(){
 const [more,setMore]=useState(false);
 return <div id="inicio" className="min-h-screen overflow-x-clip bg-[#FCFAFF] font-sans text-[#2D1A42]">
  <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-2 focus:z-50 focus:bg-white focus:p-4">Saltar al contenido</a>
  <main id="contenido">
   {/* 1. HERO PRINCIPAL (ENFOQUE HORMOZI / BRUNSON: PROMESA DE AHORRO DE TIEMPO Y ENERGÍA + RESULTADO EN EL AULA) */}
   <section className="brand-hero relative px-5 pb-24 pt-10 sm:px-7 sm:pt-14">
    <div className="relative mx-auto max-w-7xl">
     <div className="mx-auto max-w-5xl text-center">
      <p className="inline-flex items-center gap-2 rounded-full border border-[#D8C4ED] bg-white/85 px-4 py-2 text-xs font-extrabold uppercase tracking-[.1em] text-[#7238BF] shadow-sm">
        <Sparkles className="size-4 text-[#9B4DFF]"/> Para profesores de matemáticas que quieren ahorrar tiempo, cuidar su energía y destacar
      </p>
      <h1 className="mt-6 font-display text-[clamp(2.55rem,5.1vw,5.2rem)] font-bold leading-[1.08] tracking-[-.065em] text-[#25173C]">
        Menos tiempo escribiendo y dibujando en la pizarra. <span className="bg-gradient-to-r from-[#6535D5] to-[#DA468B] bg-clip-text text-transparent">Más tiempo guiando el aprendizaje.</span>
      </h1>
      <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#665674] sm:text-xl">
        Aprende a crear aplicaciones con IA para utilizarlas durante tus clases de matemáticas: visualiza conceptos complejos, manipula figuras y funciones en tiempo real, y guía la exploración y la práctica de tus estudiantes.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2.5 text-xs font-bold text-[#564667]">
        {['Secundaria','Preuniversitario','Universidad','Ahorra horas de pizarra cada semana'].map(t=>(
          <span key={t} className="rounded-full border border-[#E4D7F0] bg-white/95 px-3.5 py-2 shadow-sm">
            <CheckCircle2 className="mr-1.5 inline size-4 text-[#1D896A]"/>{t}
          </span>
        ))}
      </div>
      <div className="mt-8 flex flex-col items-center">
        <a href="#inscripcion" className="inline-flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#6630CB] to-[#C33FA1] px-8 py-4.5 text-base font-extrabold text-white shadow-[0_18px_38px_rgba(101,48,200,.26)] transition hover:scale-[1.01] hover:opacity-95 sm:w-auto sm:text-lg">
          ¡Quiero ahorrar horas de pizarra y transformar mis clases · US$9! <ArrowRight className="size-5"/>
        </a>
        <p className="mt-3.5 text-xs font-semibold text-[#6E5B82]">
          Sin saber programar · Lo preparas en minutos y lo reutilizas todo el año · Pago único de US$9
        </p>
      </div>
     </div>
     <div className="mt-12"><MathStudio/></div>
     <div className="mx-auto mt-6 flex max-w-5xl flex-wrap items-center justify-center gap-2 text-center text-xs text-[#796A84]">
       <span className="font-bold text-[#6F39C8]">Resultados reales en el aula:</span>
       <a href="https://funciones.sistemazenit.com/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Funciones Lab</a> ·
       <a href="https://transformacionesgeometricas.sistemazenit.com/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">GeoTransform Pro</a> ·
       <a href="https://mundossimulados.online/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Mundos Simulados</a>
     </div>
    </div>
   </section>

   {/* 2. BARRA DE CONTRASTE (EL VIEJO DESGASTE VS. EL NUEVO RESULTADO) */}
   <section className="border-y border-[#E4D9ED] bg-white px-5 py-7 sm:px-7">
     <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 text-center lg:flex-row lg:text-left">
       <p className="font-display text-lg font-bold text-[#3B284E]">
         Nadie quiere más trabajo frente a la computadora. <span className="text-[#7240C8]">Lo que quieres es dejar de desgastarte dibujando lo mismo en 5 salones y que tus alumnos entiendan a la primera.</span>
       </p>
       <span className="shrink-0 rounded-full border border-[#E4D5EF] bg-[#FAF6FF] px-5 py-2.5 text-xs font-extrabold text-[#7241B8]">
         MENOS DESGASTE → MÁS ATENCIÓN → MÁS PRESTIGIO
       </span>
     </div>
   </section>

   {/* 3. EL LEAD DE LA CARTA DE VENTAS (DOLOR VISCERAL + DESEO DE TIEMPO, ENERGÍA, ORDEN Y CRECIMIENTO ECONÓMICO) */}
   <section className="px-5 py-24 sm:px-7">
     <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
       <div>
         <p className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[.18em] text-[#763AC5]">
           <GraduationCap className="size-4"/> Hablemos con la verdad · De profesor a profesor
         </p>
         <h2 className="mt-4 font-display text-[clamp(2rem,4.3vw,3.3rem)] font-bold leading-[1.12] tracking-[-.055em] text-[#291840]">
           El problema no es tu forma de enseñar. Es que la pizarra estática te roba tiempo, energía y la atención de tu salón.
         </h2>
         <p className="mt-5 text-base leading-8 text-[#5E4D70]">
           Si eres maestro de matemáticas, estás cansado de lidiar con estudiantes cuya atención se dispersa rápidamente. Y lo peor: te toca explicar <strong className="text-[#2B1840]">uno de los cursos más difíciles de las escuelas</strong> —las matemáticas que son el dolor de cabeza no solo de pequeños, sino de grandes que se quedaron traumados porque aprendieron a través del miedo, sintiendo que era mejor fingir que entendieron para no parecer tontos—.
         </p>
         <p className="mt-4 text-base leading-8 text-[#5E4D70]">
           Terminas agotado de lidiar con el orden del aula, perdiendo tiempo valioso escribiendo y dibujando algo que se borrará tan pronto termines de explicar. Y te frustra ver que, por más malabares y maravillas que hagas para hacerte entender, <strong className="text-[#2B1840]">un simple gráfico plano en 2D no puede moverse</strong> para mostrar los cambios que tu explicación quiere transmitir.
         </p>
         <p className="mt-4 text-base leading-8 text-[#5E4D70]">
           <strong className="text-[#6934C6]">Tu momento ha llegado: es hora de brillar y evolucionar al siguiente nivel.</strong> No porque te interese "programar aplicaciones", sino por el resultado que eso te da: <strong className="text-[#2B1840]">ahorrarte horas de desgaste físico cada semana, capturar la mirada de todo el salón en segundos, elevar tu prestigio profesional y abrirte nuevas oportunidades económicas</strong> como un maestro potenciado con tecnología.
         </p>
       </div>
       <div className="space-y-4">
         {[
           ['Recupera tu tiempo y tu energía física','Deja de dibujar y borrar la misma gráfica 15 veces por semana en distintos salones. La preparas una sola vez en minutos con IA y te queda lista para reutilizar todo el año con un solo clic.'],
           ['Domina el orden y la comprensión del aula','Sin dar la espalda al salón, mueves un parámetro en vivo y logras que hasta el alumno más distraído o con miedo a las matemáticas vea el cambio en tiempo real y entienda sin sufrir.'],
           ['Diferénciate y haz crecer tus ingresos docentes','Un profesor con herramientas interactivas propias destaca frente a directivos y padres, cobra mejor por sus clases particulares o grupales y puede incluso vender sus recursos a otros colegas.']
         ].map(([title,desc],i)=><div key={title} className="flex gap-4 rounded-2xl border border-[#E8DEF1] bg-white p-6 shadow-[0_10px_30px_rgba(70,32,120,0.05)]"><span className="font-mono text-sm font-extrabold text-[#8B53C8]">0{i+1}</span><div><h3 className="font-display text-lg font-bold text-[#382247]">{title}</h3><p className="mt-1.5 text-sm leading-7 text-[#736480]">{desc}</p></div></div>)}
       </div>
     </div>
   </section>

   {/* 4. PRUEBA DE RESULTADO #1: TRANSFORMACIONES GEOMÉTRICAS (ENFOCADA EN AHORRO DE TIEMPO Y FLUIDEZ) */}
   <section id="caso-real" className="relative overflow-hidden border-y border-[#E6D9F0] bg-gradient-to-br from-[#F3EBFF] via-[#FFFBFE] to-[#FFF0E6] px-5 py-20 sm:px-7 sm:py-24">
    <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-[#CDAEFF]/35 blur-[90px]"/>
    <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.94fr_1.06fr] lg:gap-16">
      <div className="order-2 lg:order-1">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D8BCEC] bg-white px-4 py-2 text-xs font-extrabold text-[#6B36B5]"><CheckCircle2 className="size-4"/> De 25 minutos dibujando a mano a 10 segundos en vivo</div>
        <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.12] tracking-[-.055em] text-[#2B1940]">Enseñar transformaciones geométricas <span className="text-[#7941CE]">sin empezar cada gráfico desde cero.</span></h2>
        <p className="mt-5 text-base leading-8 text-[#645474]">¿Cuánto tiempo y paciencia pierdes trazando traslaciones, rotaciones o simetrías con regla y plumón en la pizarra para que al primer cambio de ángulo tengas que borrar todo? Ese desgaste innecesario es el que te agota al final del día.</p>
        <p className="mt-4 text-base leading-8 text-[#645474]">Por eso utilizo <strong className="text-[#332047]">Transformaciones Geométricas</strong> en mis clases de matemáticas: en vez de cansarme dibujando, muevo la figura en tiempo real, conduzco una ruta de aprendizaje que mantiene a todos atentos y descargo materiales imprimibles en segundos sin quedarme trabajando de madrugada.</p>
        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          {[
            ['Cero tiempo perdido','Muestra 10 casos distintos en un minuto sin tocar el borrador.'],
            ['Atención total','Conduce la ruta de aprendizaje mirando siempre a tus alumnos.'],
            ['Fichas al instante','Obtén materiales imprimibles listos sin pasar horas diseñando.']
          ].map(([heading,body])=><div key={heading} className="rounded-2xl border border-[#E4D6F0] bg-white/90 p-4 shadow-[0_8px_26px_rgba(83,44,130,.045)]"><Check className="mb-2 size-5 text-[#7D45D3]"/><h3 className="font-display text-sm font-extrabold text-[#342049]">{heading}</h3><p className="mt-1.5 text-xs leading-5 text-[#6E5D7D]">{body}</p></div>)}
        </div>
        <div className="mt-7 flex flex-wrap items-center gap-4">
          <a href="https://transformacionesgeometricas.sistemazenit.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#6633C9] px-6 py-3.5 text-sm font-extrabold text-white shadow-[0_10px_24px_rgba(102,51,201,.16)] hover:bg-[#5526B7]">Ver cómo funciona en vivo <ExternalLink className="size-4"/></a>
          <a href="#inscripcion" className="inline-flex items-center gap-2 text-sm font-bold text-[#6331B9] underline-offset-4 hover:underline">Quiero este resultado en mis clases · US$9 <ArrowRight className="size-4"/></a>
        </div>
      </div>
      <div className="order-1 lg:order-2">
        <div className="overflow-hidden rounded-[26px] border border-[#E5D6F1] bg-white p-2.5 shadow-[0_24px_70px_rgba(80,37,117,.13)] sm:p-4">
          <div className="flex items-center justify-between gap-2 px-3 pb-3 pt-1 text-[11px] font-semibold text-[#715A83]"><span>Resultado real · Transformaciones Geométricas</span><span className="rounded-full bg-[#EDF7F2] px-2 py-1 text-[#218367]">Ahorro total de pizarra</span></div>
          <img src="/projects/captures/transformaciones-geometricas.webp" alt="Captura real de la aplicación Transformaciones Geométricas utilizada en clases de matemáticas" loading="lazy" decoding="async" className="aspect-[16/11] w-full rounded-xl border border-[#EBE0F4] bg-[#F8F4FC] object-cover object-top"/>
          <p className="px-3 pb-1 pt-3 text-xs leading-6 text-[#78668A]">Una sola herramienta lista en el navegador reemplaza cientos de dibujos repetitivos a lo largo del año escolar.</p>
        </div>
        <p className="mx-auto mt-4 max-w-xl text-center text-xs leading-6 text-[#7C698B]">Con tu acceso inicial de US$9 logras tu primera victoria rápida con un módulo interactivo propio; sistemas completos como este son parte de la escalera de valor de nuestro ecosistema.</p>
      </div>
    </div>
   </section>

   {/* 5. PRUEBA DE RESULTADO #2: SÓLIDOS GEOMÉTRICOS 3D (IMPACTO Y COMPRENSIÓN INSTANTÁNEA) */}
   <section id="caso-solidos" className="border-b border-[#E8DDF3] bg-white px-5 py-20 sm:px-7 sm:py-24">
     <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.03fr_.97fr] lg:gap-16">
       <div className="overflow-hidden rounded-[28px] border border-[#E4D7F0] bg-gradient-to-br from-[#F3EBFF] via-white to-[#FFF1E7] p-3.5 shadow-[0_20px_68px_rgba(77,44,117,.09)] sm:p-5">
         <div className="flex flex-wrap items-center justify-between gap-2 px-2 pb-4"><span className="text-xs font-extrabold text-[#5D3989]">Sólidos Geométricos · Resultado en el aula</span><span className="rounded-full border border-[#DCCCEC] bg-white px-3 py-1 text-[10px] font-bold text-[#7045B1]">Comprensión 3D en segundos</span></div>
         <img src="/projects/captures/solidos-geometricos.webp" alt="Captura real de Sólidos Geométricos con modelos 3D y recursos didácticos" loading="lazy" decoding="async" className="aspect-[16/10] w-full rounded-xl border border-[#EBE1F5] bg-[#EEE6F8] object-cover object-top"/>
         <p className="px-2 pt-4 text-xs leading-6 text-[#786888]">Lo que en la pizarra plana confunde al alumno, en 3D interactivo queda claro en segundos y sin esfuerzo.</p>
       </div>
       <div>
         <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#783FC0]">Fin de la frustración del gráfico plano en 2D</p>
         <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.45rem)] font-bold leading-[1.13] tracking-[-.055em] text-[#2B1940]">Sólidos en 3D que se mueven en vivo y <span className="text-[#7840C8]">guían una secuencia didáctica.</span></h2>
         <p className="mt-5 text-base leading-8 text-[#685879]">Tratar de explicar poliedros, secciones o volúmenes con un dibujo estático en 2D es agotador para ti y confuso para tus alumnos. En mis clases utilizo <strong className="text-[#34204B]">Sólidos Geométricos</strong> para girar el cuerpo en 3D en tiempo real, abrir su desarrollo plano con un clic y guiar la práctica sin gastar un solo minuto peleando con la perspectiva en la pizarra.</p>
         <div className="mt-6 rounded-[24px] border border-[#E7DCEF] bg-[#FAF7FE] p-5">
           <h3 className="font-display text-sm font-extrabold text-[#423055]">Por qué tus alumnos por fin entienden a la primera</h3>
           <ol className="mt-4 grid gap-3 sm:grid-cols-2">
             {[
               ['01','Ven el sólido real','Giras la figura en 3D y eliminas de raíz la confusión del dibujo plano.'],
               ['02','Entienden el porqué','Muestras caras, vértices y aristas desplegando su red plana al instante.'],
               ['03','Deducen sin miedo','Conectas lo visual con las fórmulas en la mitad del tiempo habitual.'],
               ['04','Practican atentos','Resuelve retos en vivo donde todo el salón quiere participar.']
             ].map(([n,title,body])=><li key={n} className="flex gap-3 rounded-xl border border-[#EAE0F3] bg-white p-3"><span className="font-mono text-xs font-bold text-[#844ECF]">{n}</span><div><strong className="text-sm text-[#3F2A53]">{title}</strong><p className="mt-1 text-xs leading-5 text-[#776786]">{body}</p></div></li>)}
           </ol>
         </div>
         <a href="https://solidosgeometricos.sistemazenit.com/" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#6732CC] px-6 py-3.5 text-sm font-bold text-white hover:bg-[#5624B8]">Ver demostración en vivo <ExternalLink className="size-4"/></a>
         <p className="mt-3 text-xs leading-6 text-[#85748F]">Muestra del nivel avanzado al que puedes escalar dentro de nuestro ecosistema tras dar tu primer paso de US$9.</p>
       </div>
     </div>
   </section>

   {/* 6. EL MECANISMO SIN ESFUERZO (HORMOZI: REDUCIR TIME DELAY & EFFORT/SACRIFICE) */}
   <section id="metodo" className="border-y border-[#E9DDF3] bg-[#F4EDFD] px-5 py-24 sm:px-7">
     <div className="mx-auto max-w-7xl">
       <Heading
         eyebrow="Mínimo esfuerzo técnico · Máximo ahorro de tiempo en tu semana"
         title="La IA hace el trabajo pesado en minutos. Tú te quedas con el tiempo libre, el control del aula y el prestigio."
         body="No te interesa pasarte semanas aprendiendo a programar, y no tienes por qué hacerlo. El método está diseñado para que inviertas unos minutos una sola vez y te ahorres cientos de horas de pizarra durante todo el año."
       />
       <div className="mt-11 grid gap-5 lg:grid-cols-3">
         {steps.map(({n,time,title,desc,outcome,icon:Icon,image})=><article key={n} className="flex flex-col overflow-hidden rounded-[26px] border border-[#E2D5EF] bg-white shadow-[0_8px_30px_rgba(65,29,100,0.04)]"><div className="aspect-[16/9] w-full overflow-hidden bg-[#F2EAFA]"><img src={image} alt={`Etapa ${n}: ${title}`} loading="lazy" decoding="async" className="size-full object-cover transition-transform duration-500 hover:scale-105"/></div><div className="flex flex-1 flex-col p-7"><div className="flex items-center justify-between"><span className="flex size-12 items-center justify-center rounded-xl bg-[#EDE1FC] text-[#6634CB]"><Icon className="size-6"/></span><span className="rounded-full bg-[#F4ECFF] px-3 py-1 font-mono text-xs font-extrabold text-[#6D39C8]">{time}</span></div><span className="mt-7 text-xs font-extrabold tracking-[.2em] text-[#9A70C8]">PASO {n}</span><h3 className="mt-2 font-display text-2xl font-bold text-[#322048]">{title}</h3><p className="mt-3 flex-1 text-sm leading-7 text-[#6F607C]">{desc}</p><p className="mt-6 border-t border-[#EEE5F5] pt-4 text-sm font-semibold text-[#443150]"><Check className="mr-2 inline size-4 text-[#20846D]"/>{outcome}</p></div></article>)}
       </div>
     </div>
   </section>

   {/* 7. VISIÓN DE CRECIMIENTO Y OPORTUNIDAD ECONÓMICA (ECOSISTEMA) */}
   <section id="proyectos" className="px-5 py-24 sm:px-7">
     <div className="mx-auto max-w-7xl">
       <Heading
         eyebrow="Más tiempo libre, mejor reputación y nuevas fuentes de ingreso"
         title="Lo que empieza ahorrándote horas de pizarra termina abriéndote puertas que hoy ni imaginas."
         body="Cuando dejas de enseñar como en el siglo pasado y tienes tu propio arsenal de recursos interactivos, no solo descansas más y disfrutas tus clases: te conviertes en un docente altamente cotizado capaz de liderar proyectos educativos y monetizar sus propias herramientas."
       />
       <div className="mt-10 grid gap-5 md:grid-cols-3">{projects.slice(0,more?6:3).map(p=><ProjectCard key={p.name} project={p}/>)}</div>
       <div className="mt-7 text-center"><button onClick={()=>setMore(v=>!v)} className="inline-flex items-center gap-2 rounded-xl border border-[#CBB4E2] bg-white px-6 py-3.5 text-sm font-bold text-[#6832BD]">{more?'Ver solo resultados para el aula':'Ver todos los proyectos y oportunidades'} <ChevronDown className={'size-4 '+(more?'rotate-180':'')}/></button></div>
     </div>
   </section>

   {/* 8. LA HISTORIA REAL DE EPIFANÍA DEL INSTRUCTOR (BRUNSON EPIPHANY BRIDGE) */}
   <section id="instructor" className="border-y border-[#E6DCEF] bg-[#F7F1FD] px-5 py-24 sm:px-7">
     <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[.4fr_.6fr]">
       <InstructorPortrait/>
       <div>
         <Heading
           eyebrow="Por qué hice este cambio (y por qué tú también deberías)"
           title="Xavier Cabello"
           body="Voy a serte sincero: yo no empecé a usar IA por amor al código. Lo hice porque estaba agotado de perder tiempo y energía dibujando en la pizarra cosas que borraba a los 5 minutos, lidiando con alumnos distraídos y frustrado porque un dibujo plano en 2D no se movía para mostrar lo que yo quería explicar."
         />
         <p className="mt-4 text-base leading-8 text-[#70607F]">Cuando descubrí cómo hacer que la IA construyera mis propios recursos visuales en minutos, <strong className="text-[#3C225E]">recuperé mi tranquilidad en el aula, ahorré horas cada semana y mis estudiantes pasaron del miedo a la fascinación</strong>. Y ocurrió algo mejor: colegas e instituciones vieron la diferencia y empezaron a pagarme por desarrollarles herramientas. Por eso creé este acceso de <strong className="text-[#3C225E]">US$9</strong>: para que logres ese mismo alivio de tiempo, prestigio y crecimiento sin pasar por meses de prueba y error.</p>
         <a href="https://xavier.cabellosalirrosas.com/" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 font-bold text-[#6834C7] hover:underline">Conocer mi portafolio y trayectoria <ExternalLink className="size-4"/></a>
       </div>
     </div>
   </section>

   {/* 9. LA OFERTA "GRAND SLAM" DE US$9 (HORMOZI VALUE STACK) */}
   <section id="inscripcion" className="px-5 py-24 sm:px-7">
     <div className="mx-auto max-w-6xl">
       <div className="mx-auto text-center">
         <p className="text-xs font-extrabold uppercase tracking-[.16em] text-[#7A3ABF]">Inversión ridículamente baja · Retorno para todo tu año escolar</p>
         <h2 className="mt-3 font-display text-[clamp(2.2rem,4.5vw,3.5rem)] font-bold tracking-[-.06em] text-[#2C1A43]">¿Cuánto vale para ti ahorrar cientos de horas de pizarra y terminar tus clases con energía?</h2>
         <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#6F607C]">Por menos de lo que gastas en un par de plumones, dejas atrás el desgaste del dibujo estático, capturas la atención de tus alumnos en tiempo real y te posicionas como un docente de élite.</p>
       </div>
       <div className="mt-10 grid overflow-hidden rounded-[28px] border border-[#E0D0ED] bg-white shadow-[0_25px_70px_rgba(70,35,113,.09)] lg:grid-cols-[1.06fr_.94fr]">
         <div className="p-7 sm:p-10">
           <p className="inline-flex items-center gap-2 rounded-full bg-[#EFE4FD] px-4 py-2 text-xs font-bold text-[#7139C6]"><Sparkles className="size-4"/> Todo diseñado para ahorrarte tiempo y esfuerzo</p>
           <h3 className="mt-6 font-display text-3xl font-bold text-[#2D1945]">Lo que desbloqueas hoy mismo por solo US$9</h3>
           <ul className="mt-7 space-y-4 text-sm leading-7 text-[#51415F]">
             {[
               'El Sistema "Pizarra Viva" Paso a Paso (a tu propio ritmo): cómo tener tu primer recurso matemático interactivo listo sin saber programar.',
               'Plantillas Copiar-y-Pegar para Profesores de Matemáticas: las órdenes exactas para que la IA haga el trabajo pesado por ti en minutos.',
               'Método de Ahorro y Reutilización Docente: cómo publicar tu herramienta gratis para usarla en todos tus salones todo el año con un solo clic.',
               'Guía de Conducción de Clase Dinámica: cómo usar tu recurso en vivo para mantener el orden del salón y lograr que todos participen.',
               'Pase de Entrada al Ecosistema Matemáticas × IA: acceso preferencial para escalar a laboratorios 3D, generadores de fichas y monetización docente.'
             ].map(t=><li key={t} className="flex items-start gap-2.5"><CheckCircle2 className="mt-1 size-4 shrink-0 text-[#178568]"/>{t}</li>)}
           </ul>
           <div className="mt-7 overflow-hidden rounded-2xl border border-[#E6D8F1] bg-[#FAF7FD] p-2.5 sm:p-3.5 shadow-sm">
             <img src="/workshop/bundle-kit-taller-docente.webp" alt="Kit digital completo para ahorrar tiempo en clases de matemáticas y destacar como docente innovador" loading="lazy" decoding="async" className="aspect-[4/3] w-full rounded-xl object-cover shadow-sm"/>
             <p className="mt-2.5 text-center text-[11px] font-bold text-[#7A45C4]">Incluye: Sistema Paso a Paso + Plantillas Copiar-y-Pegar + Guía de Publicación Instantánea</p>
           </div>
           <p className="mt-6 border-t border-[#EFE5F4] pt-5 text-xs leading-6 text-[#82738D]">Nota transparente: este acceso inicial te entrega el método y tu primer módulo interactivo funcional listo para el aula. Los sistemas avanzados multi-módulo forman parte de los siguientes escalones de nuestro ecosistema.</p>
         </div>
         <div className="flex flex-col justify-center border-t border-[#EDE1F5] bg-gradient-to-br from-[#F6EFFF] to-[#FFF6FA] p-7 sm:p-10 lg:border-l lg:border-t-0">
           <p className="text-xs font-bold uppercase tracking-[.15em] text-[#8754C4]">Oferta de entrada · Pago único</p>
           <div className="mt-2 font-display text-[clamp(4.2rem,8vw,5.8rem)] font-bold tracking-[-.075em] text-[#2D1945]">US$9 <span className="text-sm font-semibold tracking-normal text-[#7C6B89]">acceso inmediato</span></div>
           <p className="mt-4 text-sm leading-7 text-[#6E5D7D]">Sin mensualidades ni horarios obligatorios. En Perú podrás abonar en soles mediante Mercado Pago o Yape.</p>
           <div className="mt-7"><PeruCheckoutButton label="¡Quiero ahorrar tiempo y evolucionar mis clases · US$9!"/></div>
           <p className="mt-5 flex items-start gap-2 text-xs leading-6 text-[#897993]"><ShieldCheck className="mt-0.5 size-4 shrink-0"/> Pasarela automática en activación; asegura abajo tu lugar con precio congelado de US$9 sin ningún cargo hoy.</p>
         </div>
       </div>
       <div className="mx-auto mt-8 max-w-3xl"><WaitlistForm/></div>
     </div>
   </section>

   {/* 10. PREGUNTAS FRECUENTES QUE DERRIBAN OBJECIONES DE ESFUERZO Y TIEMPO */}
   <section id="faq" className="border-t border-[#E8DFF2] bg-[#F8F4FD] px-5 py-24 sm:px-7">
     <div className="mx-auto max-w-3xl">
       <Heading eyebrow="Cero dudas · Cero complicaciones" title="Lo que todo profesor ocupado pregunta antes de entrar."/>
       <div className="mt-10 space-y-3">{faq.map(([q,a])=><details key={q} className="group rounded-2xl border border-[#E5D9EF] bg-white p-5 open:border-[#C6A6E7]"><summary className="flex list-none items-center justify-between gap-3 font-bold text-[#332146] [&::-webkit-details-marker]:hidden">{q}<ChevronDown className="size-5 shrink-0 text-[#8D53C5] transition group-open:rotate-180"/></summary><p className="mt-3 text-sm leading-7 text-[#6F617B]">{a}</p></details>)}</div>
     </div>
   </section>

   {/* 11. CIERRE DE DECISIÓN (EL COSTO DE NO HACER NADA VS. US$9) */}
   <section className="px-5 py-20 text-center sm:px-7">
     <h2 className="mx-auto max-w-4xl font-display text-[clamp(2rem,4vw,3.35rem)] font-bold leading-tight tracking-[-.055em] text-[#29193F]">
       Menos tiempo escribiendo y dibujando en la pizarra.<br/>
       <span className="text-[#713BC9]">Más tiempo guiando el aprendizaje, cuidando tu energía y destacando como docente.</span>
     </h2>
     <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#695879]">
       El próximo lunes puedes volver a entrar al salón a desgastar tu voz y tu brazo dibujando gráficos que borrarás en 5 minutos… o puedes invertir US$9 hoy para que la tecnología trabaje por ti en cada clase.
     </p>
     <a href="#inscripcion" className="mt-8 inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#6630CB] to-[#C33FA1] px-8 py-4.5 text-base font-extrabold text-white shadow-[0_15px_32px_rgba(104,50,208,.25)] transition hover:scale-[1.01] hover:opacity-95 sm:text-lg">
       ¡Sí, quiero ahorrar tiempo en pizarra y elevar mis clases · US$9! <ArrowRight className="size-5"/>
     </a>
   </section>
  </main>
  <footer className="border-t border-[#E4D9EF] bg-white px-5 py-9 pb-24 sm:pb-9"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-xs leading-6 text-[#7D6D8A] sm:flex-row"><p>© 2026 · Matemáticas × IA · Menos pizarra estática, más impacto y tiempo para el docente</p><a href="/privacidad" className="font-semibold hover:underline">Privacidad</a><p>Contacto: <a href="mailto:xavier@cabellosalirrosas.com" className="underline">xavier@cabellosalirrosas.com</a></p></div></footer>
  <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between border-t border-[#E0D2ED] bg-white/95 px-4 py-3 shadow-[0_-8px_25px_rgba(66,33,95,.1)] sm:hidden"><span className="font-display text-sm font-extrabold text-[#352047]">Ahorra horas de pizarra <span className="text-[#7640C9]">· US$9</span></span><a href="#inscripcion" className="rounded-lg bg-[#6832D0] px-4 py-3 text-xs font-bold text-white">Empezar hoy</a></div>
 </div>;
}
