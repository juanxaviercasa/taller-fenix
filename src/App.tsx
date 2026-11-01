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
  {name:'Funciones Lab',image:'funciones-lab.webp',description:'Exploración de funciones con gráficas dinámicas, parámetros en vivo y práctica guiada.',skill:'Gráficas, lógica y retroalimentación',url:'https://funciones.sistemazenit.com/',group:'Educación'},
  {name:'Transformaciones Geométricas',image:'transformaciones-geometricas.webp',description:'Visualiza transformaciones en vivo, sigue una ruta de aprendizaje y ofrece práctica con recursos imprimibles.',skill:'Pizarra dinámica, práctica y material imprimible',url:'https://transformacionesgeometricas.sistemazenit.com/',group:'Educación'},
  {name:'Sólidos Geométricos',image:'solidos-geometricos.webp',description:'Modelos 3D interactivos, desarrollos planos, teoría y retos al servicio de tu sesión de aprendizaje.',skill:'Visualización espacial 3D, secuencia didáctica y actividades',url:'https://solidosgeometricos.sistemazenit.com/',group:'Educación'},
  {name:'Mundos Simulados',image:'mundos-simulados.webp',description:'Modelos visuales de física y sistemas dinámicos para experimentar en el navegador.',skill:'Simulación científica y pensamiento matemático',url:'https://mundossimulados.online/',group:'Educación'},
  {name:'Test vocacional RALE',image:'rale-test-vocacional.webp',description:'Evaluaciones y formularios de orientación para postulantes.',skill:'Preguntas, lógica y flujos de evaluación',url:'https://raletest.sistemazenit.com/',group:'Otros'},
  {name:'Herramientas para Pymes',image:'herramientas-pymes.webp',description:'Aplicaciones que ayudan a resolver problemas prácticos de negocios.',skill:'Calculadoras y herramientas',url:'https://nubeparapymes.online/herramientas/',group:'Otros'},
  {name:'Todo Lima',image:'todo-lima.webp',description:'Directorio digital para explorar negocios y servicios.',skill:'Búsqueda e interfaces web',url:'https://todolima.com/',group:'Otros'}
];
const faq:[string,string][]=[
  ['¿Tengo que invertir semanas aprendiendo programas complicados?', 'No. El taller está diseñado para docentes con la agenda llena: en una sesión práctica de 105 minutos aprenderás el flujo directo para transformar tu explicación matemática en un módulo interactivo con IA, sin memorizar código ni estudiar software pesado durante semanas.'],
  ['¿Este taller es para secundaria, academia o universidad?', 'Está orientado a docentes de secundaria, preparadores preuniversitarios y profesores de primeros cursos universitarios. La portada muestra tres niveles en vivo, y en el taller aprenderás el método construyendo tu primer módulo guiado paso a paso.'],
  ['¿Necesito saber programar?', 'No necesitas dominar ningún lenguaje de programación. Lo más valioso ya lo tienes: tu criterio como profesor de matemáticas para definir qué debe moverse en la gráfica y verificar que la IA respete las propiedades matemáticas.'],
  ['¿Una aplicación garantiza mayor atención o retención del aprendizaje?', 'Ninguna herramienta reemplaza al maestro, pero dejar de dar la espalda al salón para dibujar gráficos estáticos cambia por completo la dinámica del aula. El resultado depende de tus preguntas, tu secuencia didáctica y la práctica del estudiante; aquí aprenderás a crear recursos diseñados con esa intención pedagógica.'],
  ['¿Qué construiré exactamente por US$9?', 'Construirás un primer módulo de exploración matemática con una representación visual que responde en tiempo real a controles deslizantes, aprenderás a auditar las fórmulas y dejarás lista su ruta de publicación web. El alcance detallado se confirma antes de abrir pagos.'],
  ['¿La página de demostración completa está incluida?', 'Los módulos del escaparate ilustran el nivel de detalle al que puedes llegar aplicando el método. El taller de US$9 es tu punto de partida práctico con un ejercicio guiado paso a paso; los sistemas completos del portafolio no forman parte del entregable.'],
  ['¿Podré adaptarlo a otros temas y cursos de matemáticas?', 'Sí. El método de trabajo con IA es 100% transferible a funciones, geometría, trigonometría o cálculo; cada nuevo recurso requerirá que definas su modelo matemático y verifiques sus casos límite.'],
  ['¿Cuándo será la primera edición y cómo pagaré desde Perú?', 'La oferta de introducción es de US$9. Fecha, modalidad, acceso y monto exacto en soles vía Mercado Pago / Yape se confirmarán antes de habilitar el cobro.'],
  ['¿Hay otros costos ocultos?', 'Priorizamos herramientas y despliegues gratuitos dentro de sus planes libres. Los proveedores externos de IA o alojamiento pueden actualizar sus políticas o límites gratuitos con el tiempo.'],
  ['¿Construiré una plataforma escolar completa en 105 minutos?', 'No. Crearás un primer simulador didáctico funcional y verificable para tus clases. Plataformas con cuentas de usuarios, bases de datos o reportes institucionales requieren desarrollo adicional.'],
];
const steps=[
  {n:'01',time:'20 min',title:'Traducir tu clase en un modelo claro',desc:'Elige ese concepto que en la pizarra plana no se entiende bien y define qué variables necesita mover el alumno para descubrir la propiedad.',outcome:'Estructura didáctica y prompt maestro',icon:Lightbulb,image:'/metodo/etapa-01-modelo-matematico.webp'},
  {n:'02',time:'55 min',title:'Crear la visualización dinámica con IA',desc:'Genera el simulador interactivo sin escribir código desde cero, conecta deslizadores en vivo y verifica con rigor docente cada fórmula y caso límite.',outcome:'Tu primer módulo interactivo verificado',icon:Wrench,image:'/metodo/etapa-02-interaccion-ia.webp'},
  {n:'03',time:'30 min',title:'Publicar y brillar en el aula',desc:'Deja tu aplicación lista para abrirse desde cualquier navegador, proyectarla en clase sin perder un minuto y diferenciarte como un docente innovador.',outcome:'Aplicación web lista para tus sesiones',icon:MonitorPlay,image:'/metodo/etapa-03-publicacion-web.webp'}
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
  <div className="flex flex-1 flex-col p-6"><span className="text-[10px] font-bold uppercase tracking-[.13em] text-[#8A51C5]">{project.skill}</span><h3 className="mt-2 font-display text-xl font-bold text-[#2C1A40]">{project.name}</h3><p className="mt-3 flex-1 text-sm leading-7 text-[#695B77]">{project.description}</p><a href={project.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#6531C6] hover:underline">Abrir proyecto <ExternalLink className="size-4"/></a></div>
 </article>;
}
function InstructorPortrait(){
 return <div className="mx-auto flex w-full max-w-[320px] flex-col overflow-hidden rounded-[28px] border border-[#CBB0E7] bg-white shadow-[0_20px_50px_rgba(100,50,200,0.12)]">
   <img src="/instructor/xavier-cabello.webp" alt="Juan Xavier Cabello - Docente de matemáticas y desarrollador web" loading="lazy" decoding="async" className="aspect-[4/5] w-full object-cover object-top"/>
   <div className="border-t border-[#EBDFF5] bg-[#FBF9FD] px-5 py-3.5 text-center">
     <p className="font-display text-base font-bold text-[#2E1B40]">Juan Xavier Cabello</p>
     <p className="text-xs font-semibold text-[#7645BA]">Docente de matemáticas & creador de tecnología educativa</p>
   </div>
 </div>;
}
export default function App(){
 const [more,setMore]=useState(false);
 return <div id="inicio" className="min-h-screen overflow-x-clip bg-[#FCFAFF] font-sans text-[#2D1A42]">
  <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-2 focus:z-50 focus:bg-white focus:p-4">Saltar al contenido</a>
  <main id="contenido">
   <section className="brand-hero relative px-5 pb-24 pt-10 sm:px-7 sm:pt-14">
    <div className="relative mx-auto max-w-7xl">
     <div className="mx-auto max-w-5xl text-center">
      <p className="inline-flex items-center gap-2 rounded-full border border-[#D8C4ED] bg-white/75 px-4 py-2 text-xs font-extrabold uppercase tracking-[.1em] text-[#7238BF]"><GraduationCap className="size-4"/> Docentes de secundaria, academia y universidad</p>
      <h1 className="mt-6 font-display text-[clamp(2.55rem,5.1vw,5.2rem)] font-bold leading-[1.08] tracking-[-.065em] text-[#25173C]">Menos tiempo escribiendo y dibujando en la pizarra. <span className="bg-gradient-to-r from-[#6535D5] to-[#DA468B] bg-clip-text text-transparent">Más tiempo guiando el aprendizaje.</span></h1>
      <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#665674] sm:text-xl">Aprende a crear aplicaciones con IA para utilizarlas durante tus clases de matemáticas: visualiza conceptos complejos, manipula figuras y funciones en tiempo real, y guía la exploración y la práctica de tus estudiantes.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-bold text-[#564667]">{['Secundaria','Preuniversitario','Universidad','Proyecto guiado'].map(t=><span key={t} className="rounded-full border border-[#E4D7F0] bg-white/90 px-3 py-2"><CheckCircle2 className="mr-1.5 inline size-4 text-[#1D896A]"/>{t}</span>)}</div>
      <a href="#inscripcion" className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#6630CB] to-[#C33FA1] px-7 py-4 text-base font-extrabold text-white shadow-[0_15px_30px_rgba(101,48,200,.2)] hover:opacity-95 sm:w-auto">Quiero evolucionar mis clases con IA · US$9 <ArrowRight className="size-5"/></a>
      <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-6 text-[#5F4C74]"><span className="font-bold text-[#6532C2]">Es hora de evolucionar al siguiente nivel:</span> deja atrás los dibujos planos que se borran en minutos y destácate como el maestro innovador que crea su propia tecnología para el aula.</p>
      <p className="mt-3 text-xs text-[#806F8B]">Primera edición piloto · sin semanas de estudio técnico · fecha y acceso por confirmar.</p>
     </div>
     <div className="mt-12"><MathStudio/></div>
     <div className="mx-auto mt-6 flex max-w-5xl flex-wrap items-center justify-center gap-2 text-center text-xs text-[#796A84]"><span className="font-bold text-[#6F39C8]">Proyectos reales creados para el aula:</span><a href="https://funciones.sistemazenit.com/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Funciones Lab</a> · <a href="https://transformacionesgeometricas.sistemazenit.com/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">GeoTransform Pro</a> · <a href="https://mundossimulados.online/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Mundos Simulados</a></div>
    </div>
   </section>

   <section className="border-y border-[#E4D9ED] bg-white px-5 py-7 sm:px-7">
     <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 text-center lg:flex-row lg:text-left">
       <p className="font-display text-lg font-bold text-[#3B284E]">Un gráfico estático en 2D no se mueve. <span className="text-[#7240C8]">Una aplicación creada por ti transforma la atención, el orden y el nivel de tu clase.</span></p>
       <span className="rounded-full border border-[#E4D5EF] bg-[#FAF6FF] px-5 py-2.5 text-xs font-extrabold text-[#7241B8]">EXPLICA → EXPLORA → PRACTICA → LIDERA</span>
     </div>
   </section>

   <section className="px-5 py-24 sm:px-7">
     <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
       <div>
         <p className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[.18em] text-[#763AC5]"><Sparkles className="size-4"/> De maestro de matemáticas a maestro con tecnología</p>
         <h2 className="mt-4 font-display text-[clamp(2rem,4.3vw,3.3rem)] font-bold leading-[1.12] tracking-[-.055em] text-[#291840]">Basta de perder tiempo y el orden del aula dibujando algo que se borrará en 5 minutos.</h2>
         <p className="mt-5 text-base leading-8 text-[#645375]">Nos toca enseñar el curso más retador de la escuela: ese que a muchos estudiantes les cuesta porque aprendieron a través del miedo, prefiriendo callar y fingir que entendieron antes que parecer tontos. Y cuando das la espalda al salón para trazar a pulso una gráfica o una figura en la pizarra, la atención se dispersa en segundos.</p>
         <p className="mt-4 text-base leading-8 text-[#645375]">Por más malabares que hagas explicando, <strong className="text-[#2F1B44]">un dibujo plano en 2D no puede moverse</strong> para mostrar en vivo los cambios que tu explicación quiere transmitir. Y lo peor: apenas terminas de explicarlo, tienes que pasar el borrador y empezar de cero.</p>
         <p className="mt-4 text-base leading-8 text-[#645375]">Tu momento de brillar ha llegado. Sin perder semanas estudiando programas complicados, hoy puedes usar la IA para construir tus propias aplicaciones interactivas, recuperar el control de tu clase y ganar un <strong className="text-[#6934C6]">prestigio y diferenciación profesional</strong> reales frente a tus alumnos, colegas, directivos y padres de familia.</p>
       </div>
       <div className="space-y-4">
         {[
           ['Rompe la trampa de la pizarra','Deja de dar la espalda al salón rehaciendo trazos que se borran. Abre tu propio simulador, mueve un parámetro en vivo y mantén la atención del aula de principio a fin.'],
           ['Haz visible lo que el dibujo plano oculta','Cuando el estudiante observa cómo se transforma una curva o un sólido en tiempo real, rompe el bloqueo mental y pasa de fingir que entendió a participar de verdad.'],
           ['Diferénciate sin perder semanas de tu vida','No necesitas meses de programación ni software difícil. En una sola sesión práctica aprendes a crear recursos con tu sello docente que elevan tu estatus profesional.']
         ].map(([title,desc],i)=><div key={title} className="flex gap-4 rounded-2xl border border-[#E8DEF1] bg-white p-6 shadow-[0_10px_30px_rgba(70,32,120,0.05)]"><span className="font-mono text-sm font-extrabold text-[#8B53C8]">0{i+1}</span><div><h3 className="font-display text-lg font-bold text-[#382247]">{title}</h3><p className="mt-1.5 text-sm leading-7 text-[#736480]">{desc}</p></div></div>)}
       </div>
     </div>
   </section>

   <section id="caso-real" className="relative overflow-hidden border-y border-[#E6D9F0] bg-gradient-to-br from-[#F3EBFF] via-[#FFFBFE] to-[#FFF0E6] px-5 py-20 sm:px-7 sm:py-24">
    <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-[#CDAEFF]/35 blur-[90px]"/>
    <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.94fr_1.06fr] lg:gap-16">
      <div className="order-2 lg:order-1">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D8BCEC] bg-white px-4 py-2 text-xs font-extrabold text-[#6B36B5]"><CheckCircle2 className="size-4"/> Caso real en el aula · Prestigio y fluidez</div>
        <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.12] tracking-[-.055em] text-[#2B1940]">Enseñar transformaciones geométricas <span className="text-[#7941CE]">sin empezar cada gráfico desde cero.</span></h2>
        <p className="mt-5 text-base leading-8 text-[#645474]">Explicar traslaciones, rotaciones, simetrías u homotecias en la pizarra tradicional te obliga a medir, borrar y volver a trazar mientras el salón pierde el hilo. En lugar de desgastarte dibujando figuras que no se mueven, muestras el movimiento exacto en pantalla y haces que la propiedad geométrica salte a la vista.</p>
        <p className="mt-4 text-base leading-8 text-[#645474]">Por eso creé y utilizo <strong className="text-[#332047]">Transformaciones Geométricas</strong> en mis clases: visualizo los cambios en vivo, conduzco una ruta de aprendizaje estructurada, guío la práctica y genero materiales imprimibles para que el trabajo continúe en el cuaderno.</p>
        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          {[
            ['Movimientos en vivo','Demuestra giros, traslaciones y simetrías al instante sin rehacer trazos.'],
            ['Acompaña el ritmo','Conduce la ruta de aprendizaje sin dar la espalda a tus estudiantes.'],
            ['Lleva al papel','Genera materiales imprimibles listos para la práctica individual.']
          ].map(([heading,body])=><div key={heading} className="rounded-2xl border border-[#E4D6F0] bg-white/90 p-4 shadow-[0_8px_26px_rgba(83,44,130,.045)]"><Check className="mb-2 size-5 text-[#7D45D3]"/><h3 className="font-display text-sm font-extrabold text-[#342049]">{heading}</h3><p className="mt-1.5 text-xs leading-5 text-[#6E5D7D]">{body}</p></div>)}
        </div>
        <div className="mt-7 flex flex-wrap items-center gap-4">
          <a href="https://transformacionesgeometricas.sistemazenit.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#6633C9] px-6 py-3.5 text-sm font-extrabold text-white shadow-[0_10px_24px_rgba(102,51,201,.16)] hover:bg-[#5526B7]">Explorar la aplicación real <ExternalLink className="size-4"/></a>
          <a href="#inscripcion" className="inline-flex items-center gap-2 text-sm font-bold text-[#6331B9] underline-offset-4 hover:underline">Quiero crear mis propios recursos <ArrowRight className="size-4"/></a>
        </div>
      </div>
      <div className="order-1 lg:order-2">
        <div className="overflow-hidden rounded-[26px] border border-[#E5D6F1] bg-white p-2.5 shadow-[0_24px_70px_rgba(80,37,117,.13)] sm:p-4">
          <div className="flex items-center justify-between gap-2 px-3 pb-3 pt-1 text-[11px] font-semibold text-[#715A83]"><span>Aplicación real · Transformaciones Geométricas</span><span className="rounded-full bg-[#EDF7F2] px-2 py-1 text-[#218367]">Creada por un docente</span></div>
          <img src="/projects/captures/transformaciones-geometricas.webp" alt="Captura real de la aplicación Transformaciones Geométricas utilizada como apoyo para la enseñanza" loading="lazy" decoding="async" className="aspect-[16/11] w-full rounded-xl border border-[#EBE0F4] bg-[#F8F4FC] object-cover object-top"/>
          <p className="px-3 pb-1 pt-3 text-xs leading-6 text-[#78668A]">Captura auténtica del proyecto en producción. Puedes abrir la herramienta para ver cómo transforma una clase real.</p>
        </div>
        <p className="mx-auto mt-4 max-w-xl text-center text-xs leading-6 text-[#7C698B]">Proyecto completo desarrollado por el instructor; en el taller de US$9 aprenderás el método construyendo tu primer módulo guiado.</p>
      </div>
    </div>
   </section>

   <section id="caso-solidos" className="border-b border-[#E8DDF3] bg-white px-5 py-20 sm:px-7 sm:py-24">
     <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.03fr_.97fr] lg:gap-16">
       <div className="overflow-hidden rounded-[28px] border border-[#E4D7F0] bg-gradient-to-br from-[#F3EBFF] via-white to-[#FFF1E7] p-3.5 shadow-[0_20px_68px_rgba(77,44,117,.09)] sm:p-5">
         <div className="flex flex-wrap items-center justify-between gap-2 px-2 pb-4"><span className="text-xs font-extrabold text-[#5D3989]">Sólidos Geométricos · Aplicación real</span><span className="rounded-full border border-[#DCCCEC] bg-white px-3 py-1 text-[10px] font-bold text-[#7045B1]">Geometría 3D en vivo</span></div>
         <img src="/projects/captures/solidos-geometricos.webp" alt="Captura real de Sólidos Geométricos con modelos 3D y recursos didácticos" loading="lazy" decoding="async" className="aspect-[16/10] w-full rounded-xl border border-[#EBE1F5] bg-[#EEE6F8] object-cover object-top"/>
         <p className="px-2 pt-4 text-xs leading-6 text-[#786888]">Captura auténtica del proyecto publicado. Las plantillas de recorte y armado aún requieren validación física antes de usarse para construir modelos.</p>
       </div>
       <div>
         <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#783FC0]">Cuando el dibujo plano en 2D se queda corto</p>
         <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.45rem)] font-bold leading-[1.13] tracking-[-.055em] text-[#2B1940]">Sólidos en 3D que cobran vida y <span className="text-[#7840C8]">guían una secuencia didáctica.</span></h2>
         <p className="mt-5 text-base leading-8 text-[#685879]">Intentar que todo un salón imagine secciones, áreas laterales o volúmenes a partir de un dibujo estático en 2D es una de las mayores frustraciones al enseñar geometría del espacio. Con <strong className="text-[#34204B]">Sólidos Geométricos</strong> roto el cuerpo tridimensional en vivo, despliego sus caras en una red plana y conduzco toda la sesión con preguntas y retos sin perder un segundo borrando la pizarra.</p>
         <div className="mt-6 rounded-[24px] border border-[#E7DCEF] bg-[#FAF7FE] p-5">
           <h3 className="font-display text-sm font-extrabold text-[#423055]">Así conduces la clase con tecnología propia</h3>
           <ol className="mt-4 grid gap-3 sm:grid-cols-2">
             {[
               ['01','Explora en 3D','Gira el sólido en vivo para que ningún alumno se quede sin ver la figura espacial.'],
               ['02','Despliega','Identifica caras, vértices y aristas desplegando su red plana al instante.'],
               ['03','Demuestra','Conecta lo que están viendo en pantalla con la deducción de áreas y volúmenes.'],
               ['04','Desafía','Resuelve retos interactivos en clase y extiende la práctica con fichas.']
             ].map(([n,title,body])=><li key={n} className="flex gap-3 rounded-xl border border-[#EAE0F3] bg-white p-3"><span className="font-mono text-xs font-bold text-[#844ECF]">{n}</span><div><strong className="text-sm text-[#3F2A53]">{title}</strong><p className="mt-1 text-xs leading-5 text-[#776786]">{body}</p></div></li>)}
           </ol>
         </div>
         <a href="https://solidosgeometricos.sistemazenit.com/" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#6732CC] px-6 py-3.5 text-sm font-bold text-white hover:bg-[#5624B8]">Explorar la aplicación real <ExternalLink className="size-4"/></a>
         <p className="mt-3 text-xs leading-6 text-[#85748F]">Aplicación avanzada de muestra; el taller introductorio de US$9 se enfoca en construir tu primer módulo interactivo guiado.</p>
       </div>
     </div>
   </section>

   <section id="metodo" className="border-y border-[#E9DDF3] bg-[#F4EDFD] px-5 py-24 sm:px-7">
     <div className="mx-auto max-w-7xl">
       <Heading
         eyebrow="Diseñado para docentes sin tiempo que perder"
         title="No necesitas semanas libres para dominar programas complicados. Aprende el método en 105 minutos."
         body="Sabemos que tu agenda entre clases, revisiones y planificación está al tope. Por eso aquí vamos directo al grano: tomaremos un concepto que en la pizarra plana cuesta explicar y lo convertiremos paso a paso en tu primer módulo interactivo con IA, listo para proyectar y compartir."
       />
       <div className="mt-11 grid gap-5 lg:grid-cols-3">
         {steps.map(({n,time,title,desc,outcome,icon:Icon,image})=><article key={n} className="flex flex-col overflow-hidden rounded-[26px] border border-[#E2D5EF] bg-white shadow-[0_8px_30px_rgba(65,29,100,0.04)]"><div className="aspect-[16/9] w-full overflow-hidden bg-[#F2EAFA]"><img src={image} alt={`Etapa ${n}: ${title}`} loading="lazy" decoding="async" className="size-full object-cover transition-transform duration-500 hover:scale-105"/></div><div className="flex flex-1 flex-col p-7"><div className="flex items-center justify-between"><span className="flex size-12 items-center justify-center rounded-xl bg-[#EDE1FC] text-[#6634CB]"><Icon className="size-6"/></span><span className="font-mono text-xs font-extrabold text-[#8C7A9E]">{time}</span></div><span className="mt-7 text-xs font-extrabold tracking-[.2em] text-[#9A70C8]">ETAPA {n}</span><h3 className="mt-2 font-display text-2xl font-bold text-[#322048]">{title}</h3><p className="mt-3 flex-1 text-sm leading-7 text-[#6F607C]">{desc}</p><p className="mt-6 border-t border-[#EEE5F5] pt-4 text-sm font-semibold text-[#443150]"><Check className="mr-2 inline size-4 text-[#20846D]"/>{outcome}</p></div></article>)}
       </div>
       <p className="mt-5 text-xs text-[#81718E]">Los tiempos son orientativos; programa, fecha y modalidad se confirmarán antes del cobro.</p>
     </div>
   </section>

   <section id="proyectos" className="px-5 py-24 sm:px-7">
     <div className="mx-auto max-w-7xl">
       <Heading
         eyebrow="El estándar de un docente innovador"
         title="Mira lo que ocurre cuando un profesor de matemáticas crea su propia tecnología."
         body="Estos proyectos reales nacieron para resolver dolores auténticos del aula: lograr que el alumno vea el concepto en acción, manipule variables y practique con sentido. Son sistemas completos de portafolio que muestran hasta dónde puedes evolucionar cuando combinas tu pedagogía con IA."
       />
       <div className="mt-10 grid gap-5 md:grid-cols-3">{projects.slice(0,more?6:3).map(p=><ProjectCard key={p.name} project={p}/>)}</div>
       <div className="mt-7 text-center"><button onClick={()=>setMore(v=>!v)} className="inline-flex items-center gap-2 rounded-xl border border-[#CBB4E2] bg-white px-6 py-3.5 text-sm font-bold text-[#6832BD]">{more?'Ver solo proyectos educativos':'Ver más proyectos desarrollados'} <ChevronDown className={'size-4 '+(more?'rotate-180':'')}/></button><p className="mt-4 text-xs text-[#82728D]">Capturas documentadas del portafolio del instructor. La disponibilidad de las webs externas puede variar.</p></div>
     </div>
   </section>

   <section id="instructor" className="border-y border-[#E6DCEF] bg-[#F7F1FD] px-5 py-24 sm:px-7">
     <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[.4fr_.6fr]">
       <InstructorPortrait/>
       <div>
         <Heading
           eyebrow="De colega a colega · Quién te guía"
           title="Xavier Cabello"
           body="Soy profesor de matemáticas y conozco de primera mano el desgaste de pelear contra la distracción del aula mientras dibujas en la pizarra algo que vas a borrar minutos después. Por eso empecé a construir mis propias aplicaciones web interactivas: para que mis estudiantes vieran las funciones, las transformaciones y los sólidos cobrar vida frente a sus ojos."
         />
         <p className="mt-4 text-base leading-8 text-[#70607F]">El cambio en mis clases fue tan evidente que otros colegas e instituciones empezaron a encargarme herramientas digitales a medida. En este taller de US$9 quiero entregarte el método práctico para que tú también des ese salto profesional, crees tu primer recurso interactivo sin perder semanas en tecnicismos y te destaques como un maestro de vanguardia.</p>
         <a href="https://xavier.cabellosalirrosas.com/" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 font-bold text-[#6834C7] hover:underline">Explorar mi portafolio profesional <ExternalLink className="size-4"/></a>
       </div>
     </div>
   </section>

   <section id="inscripcion" className="px-5 py-24 sm:px-7">
     <div className="mx-auto max-w-6xl">
       <div className="mx-auto text-center">
         <p className="text-xs font-extrabold uppercase tracking-[.16em] text-[#7A3ABF]">Tu evolución docente empieza aquí · Precio piloto</p>
         <h2 className="mt-3 font-display text-[clamp(2.2rem,4.5vw,3.5rem)] font-bold tracking-[-.06em] text-[#2C1A43]">Deja atrás la pizarra estática y crea tu primera aplicación matemática con IA</h2>
         <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#6F607C]">En una sola sesión práctica aprenderás a convertir un tema clave de tu curso en un simulador visual interactivo que capture la atención de tus estudiantes y eleve tu prestigio profesional.</p>
       </div>
       <div className="mt-10 grid overflow-hidden rounded-[28px] border border-[#E0D0ED] bg-white shadow-[0_25px_70px_rgba(70,35,113,.09)] lg:grid-cols-[1.06fr_.94fr]">
         <div className="p-7 sm:p-10">
           <p className="inline-flex items-center gap-2 rounded-full bg-[#EFE4FD] px-4 py-2 text-xs font-bold text-[#7139C6]"><GraduationCap className="size-4"/> Entrenamiento intensivo para profesores de matemáticas</p>
           <h3 className="mt-6 font-display text-3xl font-bold text-[#2D1945]">Todo lo que lograrás en tu primera sesión</h3>
           <ul className="mt-7 space-y-4 text-sm leading-7 text-[#51415F]">
             {[
               'Tu primer módulo matemático interactivo creado sin perder semanas en programas complicados.',
               'El método exacto para darle instrucciones a la IA en el lenguaje de tu clase y obtener gráficas dinámicas.',
               'Criterios de verificación docente para asegurar que cada fórmula, parámetro y caso límite sea exacto.',
               'Paso a paso para publicar tu herramienta en la web y abrirla con un clic desde el proyector o televisor de tu aula.',
               'Diferenciación real frente a colegas, directivos y padres como un docente que lidera con tecnología.'
             ].map(t=><li key={t} className="flex items-start gap-2.5"><CheckCircle2 className="mt-1 size-4 shrink-0 text-[#178568]"/>{t}</li>)}
           </ul>
           <div className="mt-7 overflow-hidden rounded-2xl border border-[#E6D8F1] bg-[#FAF7FD] p-2.5 sm:p-3.5 shadow-sm">
             <img src="/workshop/bundle-kit-taller-docente.webp" alt="Kit digital del Taller: Simulador interactivo en laptop, guía didáctica y biblioteca de prompts para docentes" loading="lazy" decoding="async" className="aspect-[4/3] w-full rounded-xl object-cover shadow-sm"/>
             <p className="mt-2.5 text-center text-[11px] font-bold text-[#7A45C4]">Kit Digital Incluido: Módulo guiado + Plantilla de despliegue + Biblioteca de Prompts para Matemáticas</p>
           </div>
           <p className="mt-6 border-t border-[#EFE5F4] pt-5 text-xs leading-6 text-[#82738D]">Alcance transparente: construirás un primer simulador didáctico interactivo. No incluye sistemas de cuentas de alumnos, bases de datos ni plataformas institucionales completas.</p>
         </div>
         <div className="flex flex-col justify-center border-t border-[#EDE1F5] bg-gradient-to-br from-[#F6EFFF] to-[#FFF6FA] p-7 sm:p-10 lg:border-l lg:border-t-0">
           <p className="text-xs font-bold uppercase tracking-[.15em] text-[#8754C4]">Acceso de introducción</p>
           <div className="mt-2 font-display text-[clamp(4.2rem,8vw,5.8rem)] font-bold tracking-[-.075em] text-[#2D1945]">US$9 <span className="text-sm font-semibold tracking-normal text-[#7C6B89]">pago único</span></div>
           <p className="mt-4 text-sm leading-7 text-[#6E5D7D]">En Perú, el importe exacto en soles se mostrará antes de pagar una vez habilitado Mercado Pago / Yape.</p>
           <div className="mt-7"><PeruCheckoutButton label="Inscribirme al taller · US$9"/></div>
           <p className="mt-5 flex items-start gap-2 text-xs leading-6 text-[#897993]"><ShieldCheck className="mt-0.5 size-4 shrink-0"/> Pagos aún en preparación; regístrate abajo para asegurar tu lugar y recibir la confirmación de fecha sin ningún cargo hoy.</p>
         </div>
       </div>
       <div className="mx-auto mt-8 max-w-3xl"><WaitlistForm/></div>
     </div>
   </section>

   <section id="faq" className="border-t border-[#E8DFF2] bg-[#F8F4FD] px-5 py-24 sm:px-7">
     <div className="mx-auto max-w-3xl">
       <Heading eyebrow="Respuestas claras de maestro a maestro" title="Todo lo que necesitas saber antes de dar el paso."/>
       <div className="mt-10 space-y-3">{faq.map(([q,a])=><details key={q} className="group rounded-2xl border border-[#E5D9EF] bg-white p-5 open:border-[#C6A6E7]"><summary className="flex list-none items-center justify-between gap-3 font-bold text-[#332146] [&::-webkit-details-marker]:hidden">{q}<ChevronDown className="size-5 shrink-0 text-[#8D53C5] transition group-open:rotate-180"/></summary><p className="mt-3 text-sm leading-7 text-[#6F617B]">{a}</p></details>)}</div>
     </div>
   </section>

   <section className="px-5 py-20 text-center sm:px-7">
     <h2 className="mx-auto max-w-3xl font-display text-[clamp(2rem,4vw,3.35rem)] font-bold leading-tight tracking-[-.055em] text-[#29193F]">Es tu momento de brillar en el aula.<br/><span className="text-[#713BC9]">Deja atrás el desgaste de la pizarra plana y lidera la nueva era de docentes potenciados con IA.</span></h2>
     <a href="#inscripcion" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#6832D0] px-7 py-4 font-extrabold text-white shadow-[0_12px_28px_rgba(104,50,208,.22)] hover:bg-[#5724BE]">Quiero evolucionar mis clases · US$9 <ArrowRight className="size-5"/></a>
   </section>
  </main>
  <footer className="border-t border-[#E4D9EF] bg-white px-5 py-9 pb-24 sm:pb-9"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-xs leading-6 text-[#7D6D8A] sm:flex-row"><p>© 2026 · Matemáticas × IA · Taller práctico para docentes</p><a href="/privacidad" className="font-semibold hover:underline">Privacidad</a><p>Contacto: <a href="mailto:xavier@cabellosalirrosas.com" className="underline">xavier@cabellosalirrosas.com</a></p></div></footer>
  <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between border-t border-[#E0D2ED] bg-white/95 px-4 py-3 shadow-[0_-8px_25px_rgba(66,33,95,.1)] sm:hidden"><span className="font-display text-sm font-extrabold text-[#352047]">Matemáticas × IA <span className="text-[#7640C9]">· US$9</span></span><a href="#inscripcion" className="rounded-lg bg-[#6832D0] px-4 py-3 text-xs font-bold text-white">Ver taller</a></div>
 </div>;
}
