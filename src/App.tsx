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
  {name:'Funciones Lab',image:'funciones-lab.webp',description:'Exploración de funciones con gráficas dinámicas, parámetros en tiempo real y práctica guiada para tus clases de matemáticas.',skill:'Gráficas en tiempo real y práctica',url:'https://funciones.sistemazenit.com/',group:'Educación'},
  {name:'Transformaciones Geométricas',image:'transformaciones-geometricas.webp',description:'Visualiza transformaciones en tiempo real, sigue una ruta de aprendizaje y ofrece práctica con recursos imprimibles.',skill:'Pizarra dinámica, práctica y material imprimible',url:'https://transformacionesgeometricas.sistemazenit.com/',group:'Educación'},
  {name:'Sólidos Geométricos',image:'solidos-geometricos.webp',description:'Modelos 3D interactivos, desarrollos planos, teoría y retos al servicio de tus clases de matemáticas.',skill:'Visualización espacial 3D, secuencia didáctica y actividades',url:'https://solidosgeometricos.sistemazenit.com/',group:'Educación'},
  {name:'Mundos Simulados',image:'mundos-simulados.webp',description:'Modelos visuales de física y sistemas dinámicos para experimentar en el navegador durante la clase.',skill:'Simulación científica y pensamiento matemático',url:'https://mundossimulados.online/',group:'Educación'},
  {name:'Test vocacional RALE',image:'rale-test-vocacional.webp',description:'Evaluaciones y formularios de orientación para postulantes.',skill:'Preguntas, lógica y flujos de evaluación',url:'https://raletest.sistemazenit.com/',group:'Otros'},
  {name:'Herramientas para Pymes',image:'herramientas-pymes.webp',description:'Aplicaciones que ayudan a resolver problemas prácticos de negocios.',skill:'Calculadoras y herramientas',url:'https://nubeparapymes.online/herramientas/',group:'Otros'},
  {name:'Todo Lima',image:'todo-lima.webp',description:'Directorio digital para explorar negocios y servicios.',skill:'Búsqueda e interfaces web',url:'https://todolima.com/',group:'Otros'}
];

const faq:[string,string][]=[
  ['¿El curso es en vivo o es grabado?', 'Es un curso 100% grabado (on-demand), sin fechas fijas ni horarios en vivo. Puedes entrar cuando quieras, avanzar a tu propio ritmo en tus ratos libres, pausar y repetir cada paso mientras construyes tu primera aplicación para tus clases de matemáticas.'],
  ['¿Tengo que invertir semanas aprendiendo programas complicados?', 'No. Sabemos que como profesor no tienes semanas libres para estudiar software difícil ni lenguajes de programación. El curso grabado va directo al grano para que en pocas horas tengas tu primera herramienta interactiva funcionando y lista para el aula.'],
  ['¿Para qué niveles está pensado: Secundaria, Preuniversitario o Universidad?', 'Para los tres niveles: Secundaria, Preuniversitario y Universidad. El método para traducir conceptos matemáticos en aplicaciones con IA sirve tanto para funciones y geometría escolar como para trigonometría preuniversitaria o cálculo universitario.'],
  ['¿Necesito saber programar para tomar el curso?', 'No necesitas saber programar. Lo más importante ya lo dominas: la matemática y cómo explicarla. En el curso grabado aprenderás a darle instrucciones precisas a la IA y a verificar que las fórmulas, gráficas y controles respondan con exactitud matemática.'],
  ['¿Qué logro exactamente por US$9 y cómo sigo avanzando después?', 'Este curso grabado de US$9 es tu puerta de entrada a nuestro ecosistema de tecnología para docentes de matemáticas. Aquí lograrás tu primera victoria rápida: crear, verificar y publicar tu primer módulo interactivo (como un explorador de funciones o geometría con controles en tiempo real). Una vez que domines esta base, podrás escalar dentro de nuestro ecosistema hacia programas avanzados, laboratorios 3D completos, generadores de fichas imprimibles y bancos de retos interactivos.'],
  ['¿Las aplicaciones avanzadas del portafolio vienen incluidas completas por US$9?', 'Los proyectos como Transformaciones Geométricas, Sólidos Geométricos o el Math Studio completo son sistemas avanzados que muestran todo lo que es posible construir dentro de nuestro ecosistema. Con tus US$9 accedes al curso grabado inicial donde construyes tu primer módulo interactivo paso a paso desde cero.'],
  ['¿Cómo ayuda esto a que mis estudiantes presten atención en clase?', 'Aunque ninguna herramienta hace magia sola, dejar de dar la espalda al salón para escribir y dibujar en la pizarra cambia por completo el orden de la clase. Al proyectar un gráfico que se mueve en tiempo real cuando cambias un parámetro, logras que el alumno vea el porqué del concepto, pierda el miedo a preguntar y participe activamente en la exploración y la práctica.'],
  ['¿Cómo realizo el pago de US$9 desde Perú o el extranjero?', 'Es un único pago de introducción de US$9 por acceso al curso grabado. Desde Perú podrás abonar en soles mediante Mercado Pago o Yape apenas quede activa la pasarela automática, o solicitar tu acceso directo en la sección inferior.']
];

const steps=[
  {n:'01',time:'Módulo 1 · Grabado',title:'De la pizarra plana a un modelo dinámico',desc:'Elige ese tema de tus clases de matemáticas donde el gráfico 2D de la pizarra se queda corto y define qué parámetros vas a manipular en tiempo real frente a tus estudiantes.',outcome:'Diseño pedagógico + Prompt maestro listo',icon:Lightbulb,image:'/metodo/etapa-01-modelo-matematico.webp'},
  {n:'02',time:'Módulo 2 · Grabado',title:'Construye tu aplicación interactiva con IA',desc:'Sigue las lecciones a tu propio ritmo para generar figuras y funciones que responden en vivo a controles deslizantes, comprobando que cada fórmula y resultado sea matemáticamente exacto.',outcome:'Tu primer simulador interactivo funcional',icon:Wrench,image:'/metodo/etapa-02-interaccion-ia.webp'},
  {n:'03',time:'Módulo 3 · Grabado',title:'Publica en la web y úsala en tus clases',desc:'Sube tu aplicación a internet gratis para abrirla con un clic desde el proyector o pantalla de tu salón, guiar la práctica de tus alumnos y prepararte para escalar al siguiente nivel.',outcome:'Aplicación publicada + Ruta de evolución',icon:MonitorPlay,image:'/metodo/etapa-03-publicacion-web.webp'}
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
   {/* HERO PRINCIPAL */}
   <section className="brand-hero relative px-5 pb-24 pt-10 sm:px-7 sm:pt-14">
    <div className="relative mx-auto max-w-7xl">
     <div className="mx-auto max-w-5xl text-center">
      <p className="inline-flex items-center gap-2 rounded-full border border-[#D8C4ED] bg-white/75 px-4 py-2 text-xs font-extrabold uppercase tracking-[.1em] text-[#7238BF]"><GraduationCap className="size-4"/> Docentes de secundaria, academia y universidad</p>
      <h1 className="mt-6 font-display text-[clamp(2.55rem,5.1vw,5.2rem)] font-bold leading-[1.08] tracking-[-.065em] text-[#25173C]">Menos tiempo escribiendo y dibujando en la pizarra. <span className="bg-gradient-to-r from-[#6535D5] to-[#DA468B] bg-clip-text text-transparent">Más tiempo guiando el aprendizaje.</span></h1>
      <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#665674] sm:text-xl">Aprende a crear aplicaciones con IA para utilizarlas durante tus clases de matemáticas: visualiza conceptos complejos, manipula figuras y funciones en tiempo real, y guía la exploración y la práctica de tus estudiantes.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-bold text-[#564667]">{['Secundaria','Preuniversitario','Universidad','Curso 100% grabado'].map(t=><span key={t} className="rounded-full border border-[#E4D7F0] bg-white/90 px-3 py-2"><CheckCircle2 className="mr-1.5 inline size-4 text-[#1D896A]"/>{t}</span>)}</div>
      <a href="#inscripcion" className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#6630CB] to-[#C33FA1] px-7 py-4 text-base font-extrabold text-white shadow-[0_15px_30px_rgba(101,48,200,.2)] hover:opacity-95 sm:w-auto">Acceder al curso grabado · US$9 <ArrowRight className="size-5"/></a>
      <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-6 text-[#5F4C74]"><span className="font-bold text-[#6532C2]">Estudia a tu propio ritmo, sin horarios fijos:</span> da tu primer paso en nuestro ecosistema creando tu primera aplicación matemática interactiva sin perder semanas en programas complicados.</p>
     </div>
     <div className="mt-12"><MathStudio/></div>
     <div className="mx-auto mt-6 flex max-w-5xl flex-wrap items-center justify-center gap-2 text-center text-xs text-[#796A84]"><span className="font-bold text-[#6F39C8]">Aplicaciones reales de nuestro ecosistema:</span><a href="https://funciones.sistemazenit.com/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Funciones Lab</a> · <a href="https://transformacionesgeometricas.sistemazenit.com/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">GeoTransform Pro</a> · <a href="https://mundossimulados.online/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Mundos Simulados</a></div>
    </div>
   </section>

   {/* CINTILLO DE POSICIONAMIENTO */}
   <section className="border-y border-[#E4D9ED] bg-white px-5 py-7 sm:px-7">
     <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 text-center lg:flex-row lg:text-left">
       <p className="font-display text-lg font-bold text-[#3B284E]">Un simple gráfico plano en 2D no puede moverse. <span className="text-[#7240C8]">Una aplicación creada por ti transforma tus clases de matemáticas para siempre.</span></p>
       <span className="rounded-full border border-[#E4D5EF] bg-[#FAF6FF] px-5 py-2.5 text-xs font-extrabold text-[#7241B8]">VISUALIZA → MANIPULA EN TIEMPO REAL → GUÍA LA PRÁCTICA</span>
     </div>
   </section>

   {/* SECCIÓN EMPATÍA Y EVOLUCIÓN DEL MAESTRO DE MATEMÁTICAS */}
   <section className="px-5 py-24 sm:px-7">
     <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.04fr_0.96fr]">
       <div>
         <p className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[.18em] text-[#763AC5]"><Sparkles className="size-4"/> De profesor agotado en la pizarra a maestro con tecnología</p>
         <h2 className="mt-4 font-display text-[clamp(2rem,4.3vw,3.3rem)] font-bold leading-[1.12] tracking-[-.055em] text-[#291840]">Si estás cansado de perder tiempo escribiendo y dibujando algo que se borrará tan pronto termines de explicar, tu momento ha llegado.</h2>
         <p className="mt-5 text-base leading-8 text-[#645375]">Seamos honestos: nos toca enseñar el curso más difícil de las escuelas. Las matemáticas son el dolor de cabeza de pequeños y grandes que se quedaron traumados porque aprendieron a través del miedo, sintiendo que era mejor callar y fingir que entendieron para no parecer tontos. Y encima tienes que lidiar con un salón cuya atención se dispersa en segundos.</p>
         <p className="mt-4 text-base leading-8 text-[#645375]">Cuando das la espalda para escribir y dibujar a pulso en la pizarra, pierdes el orden del aula y gastas minutos valiosos en trazos que vas a borrar enseguida. Peor aún: por más malabares y maravillas que hagas explicando, <strong className="text-[#2F1B44]">un simple gráfico plano en 2D no puede moverse</strong> para mostrar en tiempo real los cambios que tu explicación quiere transmitir.</p>
         <p className="mt-4 text-base leading-8 text-[#645375]">Es hora de brillar y evolucionar al siguiente nivel. Con este <strong className="text-[#6934C6]">curso grabado de US$9</strong> aprendes a tu propio ritmo —sin perder semanas en programas complicados— a crear aplicaciones con IA para tus clases de matemáticas, ganando prestigio y diferenciación real frente a tus estudiantes, colegas, directivos y padres de familia.</p>
       </div>
       <div className="space-y-4">
         {[
           ['Menos tiempo escribiendo y dibujando en la pizarra','No des más la espalda al salón rehaciendo figuras que el borrador desaparece en minutos. Proyecta tu aplicación lista y mantén el control y la mirada de tu clase.'],
           ['Manipula figuras y funciones en tiempo real','Donde el dibujo estático en 2D se queda mudo, tu aplicación mueve curvas, ángulos y sólidos en vivo para que el estudiante vea el cambio y comprenda de verdad.'],
           ['Avanza a tu ritmo y escala tu nivel profesional','Estudia las lecciones grabadas cuando quieras. Empieza hoy creando tu primer módulo interactivo y abre la puerta a dominar todo un ecosistema de tecnología educativa.']
         ].map(([title,desc],i)=><div key={title} className="flex gap-4 rounded-2xl border border-[#E8DEF1] bg-white p-6 shadow-[0_10px_30px_rgba(70,32,120,0.05)]"><span className="font-mono text-sm font-extrabold text-[#8B53C8]">0{i+1}</span><div><h3 className="font-display text-lg font-bold text-[#382247]">{title}</h3><p className="mt-1.5 text-sm leading-7 text-[#736480]">{desc}</p></div></div>)}
       </div>
     </div>
   </section>

   {/* CASO REAL 1: TRANSFORMACIONES GEOMÉTRICAS */}
   <section id="caso-real" className="relative overflow-hidden border-y border-[#E6D9F0] bg-gradient-to-br from-[#F3EBFF] via-[#FFFBFE] to-[#FFF0E6] px-5 py-20 sm:px-7 sm:py-24">
    <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-[#CDAEFF]/35 blur-[90px]"/>
    <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.94fr_1.06fr] lg:gap-16">
      <div className="order-2 lg:order-1">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D8BCEC] bg-white px-4 py-2 text-xs font-extrabold text-[#6B36B5]"><CheckCircle2 className="size-4"/> Ejemplo real en clases de matemáticas</div>
        <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.12] tracking-[-.055em] text-[#2B1940]">Enseñar transformaciones geométricas <span className="text-[#7941CE]">sin empezar cada gráfico desde cero.</span></h2>
        <p className="mt-5 text-base leading-8 text-[#645474]">Explicar traslaciones, rotaciones o simetrías dibujando a mano en la pizarra te obliga a medir, borrar y volver a trazar mientras los alumnos se distraen. En cambio, cuando manipulas la figura en tiempo real, el estudiante descubre de inmediato por qué ocurre cada transformación.</p>
        <p className="mt-4 text-base leading-8 text-[#645474]">Por eso creé <strong className="text-[#332047]">Transformaciones Geométricas</strong> para mis clases de matemáticas: visualizo conceptos complejos, conduzco una ruta de aprendizaje paso a paso, guío la exploración y la práctica de mis estudiantes, y genero materiales imprimibles listos para trabajar en el aula.</p>
        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          {[
            ['Visualiza en vivo','Mueve y transforma figuras en tiempo real sin rehacer dibujos en la pizarra.'],
            ['Guía la práctica','Conduce una ruta de aprendizaje clara con ejercicios interactivos.'],
            ['Lleva al papel','Genera materiales imprimibles desde la aplicación para reforzar en clase.']
          ].map(([heading,body])=><div key={heading} className="rounded-2xl border border-[#E4D6F0] bg-white/90 p-4 shadow-[0_8px_26px_rgba(83,44,130,.045)]"><Check className="mb-2 size-5 text-[#7D45D3]"/><h3 className="font-display text-sm font-extrabold text-[#342049]">{heading}</h3><p className="mt-1.5 text-xs leading-5 text-[#6E5D7D]">{body}</p></div>)}
        </div>
        <div className="mt-7 flex flex-wrap items-center gap-4">
          <a href="https://transformacionesgeometricas.sistemazenit.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#6633C9] px-6 py-3.5 text-sm font-extrabold text-white shadow-[0_10px_24px_rgba(102,51,201,.16)] hover:bg-[#5526B7]">Explorar la aplicación real <ExternalLink className="size-4"/></a>
          <a href="#inscripcion" className="inline-flex items-center gap-2 text-sm font-bold text-[#6331B9] underline-offset-4 hover:underline">Empezar con el curso grabado de US$9 <ArrowRight className="size-4"/></a>
        </div>
      </div>
      <div className="order-1 lg:order-2">
        <div className="overflow-hidden rounded-[26px] border border-[#E5D6F1] bg-white p-2.5 shadow-[0_24px_70px_rgba(80,37,117,.13)] sm:p-4">
          <div className="flex items-center justify-between gap-2 px-3 pb-3 pt-1 text-[11px] font-semibold text-[#715A83]"><span>Aplicación del ecosistema · Transformaciones Geométricas</span><span className="rounded-full bg-[#EDF7F2] px-2 py-1 text-[#218367]">Secundaria · Preuniversitario</span></div>
          <img src="/projects/captures/transformaciones-geometricas.webp" alt="Captura real de la aplicación Transformaciones Geométricas utilizada en clases de matemáticas" loading="lazy" decoding="async" className="aspect-[16/11] w-full rounded-xl border border-[#EBE0F4] bg-[#F8F4FC] object-cover object-top"/>
          <p className="px-3 pb-1 pt-3 text-xs leading-6 text-[#78668A]">Captura real de la herramienta en producción. Ábrela para experimentar cómo reemplaza horas de trazos en pizarra.</p>
        </div>
        <p className="mx-auto mt-4 max-w-xl text-center text-xs leading-6 text-[#7C698B]">Con el curso grabado de US$9 das el primer paso creando tu primer módulo interactivo; aplicaciones completas como esta muestran hasta dónde puedes escalar en nuestro ecosistema.</p>
      </div>
    </div>
   </section>

   {/* CASO REAL 2: SÓLIDOS GEOMÉTRICOS */}
   <section id="caso-solidos" className="border-b border-[#E8DDF3] bg-white px-5 py-20 sm:px-7 sm:py-24">
     <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.03fr_.97fr] lg:gap-16">
       <div className="overflow-hidden rounded-[28px] border border-[#E4D7F0] bg-gradient-to-br from-[#F3EBFF] via-white to-[#FFF1E7] p-3.5 shadow-[0_20px_68px_rgba(77,44,117,.09)] sm:p-5">
         <div className="flex flex-wrap items-center justify-between gap-2 px-2 pb-4"><span className="text-xs font-extrabold text-[#5D3989]">Sólidos Geométricos · Aplicación del ecosistema</span><span className="rounded-full border border-[#DCCCEC] bg-white px-3 py-1 text-[10px] font-bold text-[#7045B1]">Geometría 3D en tiempo real</span></div>
         <img src="/projects/captures/solidos-geometricos.webp" alt="Captura real de Sólidos Geométricos con modelos 3D y recursos didácticos" loading="lazy" decoding="async" className="aspect-[16/10] w-full rounded-xl border border-[#EBE1F5] bg-[#EEE6F8] object-cover object-top"/>
         <p className="px-2 pt-4 text-xs leading-6 text-[#786888]">Captura auténtica del proyecto publicado para explorar cuerpos geométricos en 3D y sus desarrollos planos durante la clase.</p>
       </div>
       <div>
         <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#783FC0]">Donde la pizarra 2D jamás podrá llegar</p>
         <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.45rem)] font-bold leading-[1.13] tracking-[-.055em] text-[#2B1940]">Sólidos en 3D que se mueven en vivo y <span className="text-[#7840C8]">guían una secuencia didáctica.</span></h2>
         <p className="mt-5 text-base leading-8 text-[#685879]">Dibujar un poliedro en una pizarra plana y pedirle al alumno que imagine cómo rota o cómo se abre es perder a la mitad del salón. En mis clases de matemáticas utilizo <strong className="text-[#34204B]">Sólidos Geométricos</strong> para manipular figuras tridimensionales en tiempo real, relacionar sus caras con desarrollos planos y guiar la exploración y la práctica de mis estudiantes.</p>
         <div className="mt-6 rounded-[24px] border border-[#E7DCEF] bg-[#FAF7FE] p-5">
           <h3 className="font-display text-sm font-extrabold text-[#423055]">Una experiencia imposible en una pizarra estática</h3>
           <ol className="mt-4 grid gap-3 sm:grid-cols-2">
             {[
               ['01','Manipula en 3D','Gira el sólido en tiempo real para observar cada perspectiva espacial.'],
               ['02','Despliega','Identifica caras, vértices y aristas abriendo su red plana frente al aula.'],
               ['03','Deduce','Conecta el modelo visual con la demostración de áreas y volúmenes.'],
               ['04','Practica','Resuelve retos en vivo con tus estudiantes y afianza el aprendizaje.']
             ].map(([n,title,body])=><li key={n} className="flex gap-3 rounded-xl border border-[#EAE0F3] bg-white p-3"><span className="font-mono text-xs font-bold text-[#844ECF]">{n}</span><div><strong className="text-sm text-[#3F2A53]">{title}</strong><p className="mt-1 text-xs leading-5 text-[#776786]">{body}</p></div></li>)}
           </ol>
         </div>
         <a href="https://solidosgeometricos.sistemazenit.com/" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#6732CC] px-6 py-3.5 text-sm font-bold text-white hover:bg-[#5624B8]">Explorar la aplicación real <ExternalLink className="size-4"/></a>
         <p className="mt-3 text-xs leading-6 text-[#85748F]">Muestra del nivel avanzado de nuestro ecosistema; tu camino comienza dominando los fundamentos en el curso grabado de US$9.</p>
       </div>
     </div>
   </section>

   {/* EL MÉTODO EN CURSO GRABADO */}
   <section id="metodo" className="border-y border-[#E9DDF3] bg-[#F4EDFD] px-5 py-24 sm:px-7">
     <div className="mx-auto max-w-7xl">
       <Heading
         eyebrow="Curso 100% grabado · Avanza a tu propio ritmo"
         title="Sin horarios fijos ni semanas perdidas en programas complejos: crea tu primera aplicación paso a paso."
         body="No tienes que esperar a una transmisión en vivo ni sacrificar tus fines de semana estudiando código. El curso grabado está dividido en 3 módulos directos al grano para que abras tu computadora cuando quieras y construyas una herramienta interactiva lista para tus clases de matemáticas."
       />
       <div className="mt-11 grid gap-5 lg:grid-cols-3">
         {steps.map(({n,time,title,desc,outcome,icon:Icon,image})=><article key={n} className="flex flex-col overflow-hidden rounded-[26px] border border-[#E2D5EF] bg-white shadow-[0_8px_30px_rgba(65,29,100,0.04)]"><div className="aspect-[16/9] w-full overflow-hidden bg-[#F2EAFA]"><img src={image} alt={`Etapa ${n}: ${title}`} loading="lazy" decoding="async" className="size-full object-cover transition-transform duration-500 hover:scale-105"/></div><div className="flex flex-1 flex-col p-7"><div className="flex items-center justify-between"><span className="flex size-12 items-center justify-center rounded-xl bg-[#EDE1FC] text-[#6634CB]"><Icon className="size-6"/></span><span className="font-mono text-xs font-extrabold text-[#6D39C8]">{time}</span></div><span className="mt-7 text-xs font-extrabold tracking-[.2em] text-[#9A70C8]">PASO {n}</span><h3 className="mt-2 font-display text-2xl font-bold text-[#322048]">{title}</h3><p className="mt-3 flex-1 text-sm leading-7 text-[#6F607C]">{desc}</p><p className="mt-6 border-t border-[#EEE5F5] pt-4 text-sm font-semibold text-[#443150]"><Check className="mr-2 inline size-4 text-[#20846D]"/>{outcome}</p></div></article>)}
       </div>
       <p className="mt-6 text-center text-xs font-semibold text-[#6F5D82]">Acceso a las lecciones grabadas para verlas, pausarlas y aplicarlas cuantas veces necesites.</p>
     </div>
   </section>

   {/* ECOSISTEMA Y PORTAFOLIO */}
   <section id="proyectos" className="px-5 py-24 sm:px-7">
     <div className="mx-auto max-w-7xl">
       <Heading
         eyebrow="Tu ruta de crecimiento dentro del ecosistema"
         title="Empieza hoy con tu primer módulo por US$9 y mira todo lo que podrás llegar a construir."
         body="Este curso grabado es tu puerta de entrada. Primero aprendes a crear tu primer visualizador interactivo para ganar fluidez en el aula, y luego podrás escalar dentro de nuestro ecosistema para dominar aplicaciones completas de álgebra, geometría 2D/3D, cálculo y simulaciones."
       />
       <div className="mt-10 grid gap-5 md:grid-cols-3">{projects.slice(0,more?6:3).map(p=><ProjectCard key={p.name} project={p}/>)}</div>
       <div className="mt-7 text-center"><button onClick={()=>setMore(v=>!v)} className="inline-flex items-center gap-2 rounded-xl border border-[#CBB4E2] bg-white px-6 py-3.5 text-sm font-bold text-[#6832BD]">{more?'Ver solo aplicaciones de matemáticas':'Ver más aplicaciones del ecosistema'} <ChevronDown className={'size-4 '+(more?'rotate-180':'')}/></button></div>
     </div>
   </section>

   {/* INSTRUCTOR */}
   <section id="instructor" className="border-y border-[#E6DCEF] bg-[#F7F1FD] px-5 py-24 sm:px-7">
     <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[.4fr_.6fr]">
       <InstructorPortrait/>
       <div>
         <Heading
           eyebrow="De maestro de matemáticas a creador de tecnología"
           title="Xavier Cabello"
           body="Como profesor de matemáticas, viví en carne propia la frustración de perder tiempo escribiendo y dibujando en la pizarra gráficos que se borraban apenas terminaba de explicar, mientras sentía que una figura plana en 2D no bastaba para despertar la comprensión de mis alumnos."
         />
         <p className="mt-4 text-base leading-8 text-[#70607F]">Por eso decidí integrar la IA para crear mis propias aplicaciones interactivas y utilizarlas durante mis clases de matemáticas en Secundaria, Preuniversitario y Universidad. El impacto fue tan grande que colegas e instituciones comenzaron a pedirme herramientas a medida. Creé este <strong className="text-[#3C225E]">curso grabado de US$9</strong> como el primer escalón de mi ecosistema para que cualquier docente pueda evolucionar a su propio ritmo y brillar en el aula.</p>
         <a href="https://xavier.cabellosalirrosas.com/" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 font-bold text-[#6834C7] hover:underline">Explorar mi portafolio profesional <ExternalLink className="size-4"/></a>
       </div>
     </div>
   </section>

   {/* INSCRIPCIÓN / OFERTA LOW-TICKET */}
   <section id="inscripcion" className="px-5 py-24 sm:px-7">
     <div className="mx-auto max-w-6xl">
       <div className="mx-auto text-center">
         <p className="text-xs font-extrabold uppercase tracking-[.16em] text-[#7A3ABF]">Curso 100% Grabado · Puerta de entrada al ecosistema</p>
         <h2 className="mt-3 font-display text-[clamp(2.2rem,4.5vw,3.5rem)] font-bold tracking-[-.06em] text-[#2C1A43]">Da el salto de la pizarra tradicional a crear tus propias aplicaciones con IA</h2>
         <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#6F607C]">Por solo US$9 accedes al curso grabado donde aprenderás paso a paso a visualizar conceptos complejos, manipular figuras y funciones en tiempo real, y guiar la exploración y la práctica de tus estudiantes.</p>
       </div>
       <div className="mt-10 grid overflow-hidden rounded-[28px] border border-[#E0D0ED] bg-white shadow-[0_25px_70px_rgba(70,35,113,.09)] lg:grid-cols-[1.06fr_.94fr]">
         <div className="p-7 sm:p-10">
           <p className="inline-flex items-center gap-2 rounded-full bg-[#EFE4FD] px-4 py-2 text-xs font-bold text-[#7139C6]"><GraduationCap className="size-4"/> Secundaria · Preuniversitario · Universidad</p>
           <h3 className="mt-6 font-display text-3xl font-bold text-[#2D1945]">Lo que incluye tu acceso al curso grabado</h3>
           <ul className="mt-7 space-y-4 text-sm leading-7 text-[#51415F]">
             {[
               'Lecciones 100% grabadas para avanzar a tu propio ritmo, sin horarios fijos ni necesidad de saber programar.',
               'Creación guiada de tu primer módulo matemático interactivo con controles y gráficas en tiempo real.',
               'Fórmula de prompts docentes para pedirle a la IA visualizaciones exactas que un dibujo 2D en pizarra no puede mover.',
               'Método de verificación matemática y publicación web gratuita para abrir tu aplicación en el aula con un clic.',
               'Acceso preferencial para escalar a los siguientes niveles, plantillas avanzadas y herramientas de nuestro ecosistema.'
             ].map(t=><li key={t} className="flex items-start gap-2.5"><CheckCircle2 className="mt-1 size-4 shrink-0 text-[#178568]"/>{t}</li>)}
           </ul>
           <div className="mt-7 overflow-hidden rounded-2xl border border-[#E6D8F1] bg-[#FAF7FD] p-2.5 sm:p-3.5 shadow-sm">
             <img src="/workshop/bundle-kit-taller-docente.webp" alt="Kit digital del Curso Grabado: Simulador interactivo en laptop, guía didáctica y biblioteca de prompts para docentes" loading="lazy" decoding="async" className="aspect-[4/3] w-full rounded-xl object-cover shadow-sm"/>
             <p className="mt-2.5 text-center text-[11px] font-bold text-[#7A45C4]">Kit Digital Incluido: Curso Grabado Paso a Paso + Plantilla de Despliegue + Biblioteca de Prompts</p>
           </div>
           <p className="mt-6 border-t border-[#EFE5F4] pt-5 text-xs leading-6 text-[#82738D]">En este curso de entrada construirás tu primer módulo interactivo funcional; los sistemas completos con múltiples laboratorios, 3D avanzado o cuentas de usuarios forman parte de los niveles superiores del ecosistema.</p>
         </div>
         <div className="flex flex-col justify-center border-t border-[#EDE1F5] bg-gradient-to-br from-[#F6EFFF] to-[#FFF6FA] p-7 sm:p-10 lg:border-l lg:border-t-0">
           <p className="text-xs font-bold uppercase tracking-[.15em] text-[#8754C4]">Oferta de entrada · Curso grabado</p>
           <div className="mt-2 font-display text-[clamp(4.2rem,8vw,5.8rem)] font-bold tracking-[-.075em] text-[#2D1945]">US$9 <span className="text-sm font-semibold tracking-normal text-[#7C6B89]">pago único</span></div>
           <p className="mt-4 text-sm leading-7 text-[#6E5D7D]">Estudia cuando quieras y desde donde estés. En Perú, el importe exacto en soles se mostrará en Mercado Pago / Yape.</p>
           <div className="mt-7"><PeruCheckoutButton label="Acceder al curso grabado · US$9"/></div>
           <p className="mt-5 flex items-start gap-2 text-xs leading-6 text-[#897993]"><ShieldCheck className="mt-0.5 size-4 shrink-0"/> Pasarela automática en activación; regístrate abajo para recibir tu enlace de acceso apenas se habilite sin ningún cargo hoy.</p>
         </div>
       </div>
       <div className="mx-auto mt-8 max-w-3xl"><WaitlistForm/></div>
     </div>
   </section>

   {/* PREGUNTAS FRECUENTES */}
   <section id="faq" className="border-t border-[#E8DFF2] bg-[#F8F4FD] px-5 py-24 sm:px-7">
     <div className="mx-auto max-w-3xl">
       <Heading eyebrow="Dudas frecuentes sobre el curso grabado" title="Respuestas claras antes de entrar al ecosistema."/>
       <div className="mt-10 space-y-3">{faq.map(([q,a])=><details key={q} className="group rounded-2xl border border-[#E5D9EF] bg-white p-5 open:border-[#C6A6E7]"><summary className="flex list-none items-center justify-between gap-3 font-bold text-[#332146] [&::-webkit-details-marker]:hidden">{q}<ChevronDown className="size-5 shrink-0 text-[#8D53C5] transition group-open:rotate-180"/></summary><p className="mt-3 text-sm leading-7 text-[#6F617B]">{a}</p></details>)}</div>
     </div>
   </section>

   {/* CIERRE FINAL UNIFICADO CON EL COPY CENTRAL */}
   <section className="px-5 py-20 text-center sm:px-7">
     <h2 className="mx-auto max-w-4xl font-display text-[clamp(2rem,4vw,3.35rem)] font-bold leading-tight tracking-[-.055em] text-[#29193F]">Menos tiempo escribiendo y dibujando en la pizarra.<br/><span className="text-[#713BC9]">Más tiempo guiando el aprendizaje en tus clases de matemáticas.</span></h2>
     <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#695879]">Es tu momento de brillar y evolucionar a un maestro con tecnología propia. Empieza hoy a tu propio ritmo por solo US$9.</p>
     <a href="#inscripcion" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#6832D0] px-7 py-4 font-extrabold text-white shadow-[0_12px_28px_rgba(104,50,208,.22)] hover:bg-[#5724BE]">Quiero acceder al curso grabado · US$9 <ArrowRight className="size-5"/></a>
   </section>
  </main>
  <footer className="border-t border-[#E4D9EF] bg-white px-5 py-9 pb-24 sm:pb-9"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-xs leading-6 text-[#7D6D8A] sm:flex-row"><p>© 2026 · Matemáticas × IA · Curso grabado y ecosistema para docentes</p><a href="/privacidad" className="font-semibold hover:underline">Privacidad</a><p>Contacto: <a href="mailto:xavier@cabellosalirrosas.com" className="underline">xavier@cabellosalirrosas.com</a></p></div></footer>
  <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between border-t border-[#E0D2ED] bg-white/95 px-4 py-3 shadow-[0_-8px_25px_rgba(66,33,95,.1)] sm:hidden"><span className="font-display text-sm font-extrabold text-[#352047]">Curso Grabado <span className="text-[#7640C9]">· US$9</span></span><a href="#inscripcion" className="rounded-lg bg-[#6832D0] px-4 py-3 text-xs font-bold text-white">Acceder</a></div>
 </div>;
}
