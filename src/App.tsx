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
  ['"No soy programador, soy profesor de matemáticas. ¿De verdad podré hacerlo?"', 'Rotundamente sí. El error de muchos docentes es creer que necesitan aprender ingeniería de sistemas. Tú ya tienes lo más difícil: sabes qué propiedad matemática quieres demostrar. Aquí aprenderás a pedirle a la IA que construya la visualización por ti y a verificar con tu ojo docente que cada gráfica y fórmula sea exacta.'],
  ['"Mi agenda está llena de clases y correcciones. ¿Cuánto tiempo me tomará?"', 'Por eso mismo no es un programa teórico eterno ni tienes que conectarte a horarios fijos. Tienes acceso inmediato para avanzar a tu propio ritmo en tus ratos libres: en una sola tarde puedes tener tu primera aplicación matemática creada, verificada y publicada en internet.'],
  ['¿Sirve para mis temas de Secundaria, Preuniversitario o Universidad?', 'Sí. El método que aprenderás funciona exactamente igual si necesitas enseñar funciones o geometría en Secundaria, razones e identidades en nivel Preuniversitario, o derivadas e integrales en la Universidad.'],
  ['¿Qué logro exactamente con esta inversión de US$9 y qué viene después?', 'Por US$9 logras tu primera victoria rápida: construir y publicar tu primer módulo matemático interactivo listo para proyectar en tus clases. Además, es tu llave de entrada a nuestro ecosistema exclusivo para docentes, donde luego podrás escalar hacia laboratorios 3D completos, generadores automáticos de fichas imprimibles y sistemas de evaluación interactiva.'],
  ['¿Las aplicaciones completas como Sólidos Geométricos o el Math Studio vienen hechas en este acceso?', 'Esas aplicaciones muestran el nivel de dominio al que podrás escalar dentro de nuestro ecosistema. En este entrenamiento inicial de US$9 te concentras en construir paso a paso tu primer simulador interactivo funcional desde cero para que domines la base sin abrumarte.'],
  ['¿Realmente cambia la actitud y atención de los estudiantes en el salón?', 'Aunque ningún recurso reemplaza tu pedagogía, dejar de dar la espalda al aula para dibujar trazos estáticos transforma la energía de la clase. Cuando mueves un control en vivo y el alumno ve cómo responde la curva o la figura en tiempo real, rompe el miedo a preguntar y participa de verdad.'],
  ['¿Cómo reclamo mi acceso por US$9 desde Perú o el extranjero?', 'Es un pago único de US$9 (sin mensualidades). En Perú podrás abonar en soles vía Mercado Pago o Yape apenas se active el botón automático, o asegurar tu acceso prioritario registrándote al final de esta página.']
];

const steps=[
  {n:'01',time:'Paso 1 · Claridad total',title:'Elige el tema que la pizarra 2D no deja ver',desc:'Selecciona ese concepto de tus clases de matemáticas donde un dibujo plano se queda corto y define qué parámetros moverás en tiempo real frente a tus alumnos.',outcome:'Estructura didáctica + Prompt maestro listo',icon:Lightbulb,image:'/metodo/etapa-01-modelo-matematico.webp'},
  {n:'02',time:'Paso 2 · Sin programar',title:'Haz que la IA construya tu simulador en vivo',desc:'Convierte tu explicación en una gráfica o figura dinámica con deslizadores interactivos, auditando cada fórmula para que tenga rigor matemático absoluto.',outcome:'Tu primera aplicación interactiva verificada',icon:Wrench,image:'/metodo/etapa-02-interaccion-ia.webp'},
  {n:'03',time:'Paso 3 · Impacto en el aula',title:'Publícala en un clic y conquista tu clase',desc:'Pon tu herramienta en línea gratis para abrirla desde el proyector o pantalla de tu salón, guiar la práctica de tus estudiantes y brillar como un docente innovador.',outcome:'Aplicación web publicada + Ruta de escalamiento',icon:MonitorPlay,image:'/metodo/etapa-03-publicacion-web.webp'}
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
  <div className="flex flex-1 flex-col p-6"><span className="text-[10px] font-bold uppercase tracking-[.13em] text-[#8A51C5]">{project.skill}</span><h3 className="mt-2 font-display text-xl font-bold text-[#2C1A40]">{project.name}</h3><p className="mt-3 flex-1 text-sm leading-7 text-[#695B77]">{project.description}</p><a href={project.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#6531C6] hover:underline">Probar aplicación en vivo <ExternalLink className="size-4"/></a></div>
 </article>;
}

function InstructorPortrait(){
 return <div className="mx-auto flex w-full max-w-[320px] flex-col overflow-hidden rounded-[28px] border border-[#CBB0E7] bg-white shadow-[0_20px_50px_rgba(100,50,200,0.12)]">
   <img src="/instructor/xavier-cabello.webp" alt="Juan Xavier Cabello - Docente de matemáticas y desarrollador web" loading="lazy" decoding="async" className="aspect-[4/5] w-full object-cover object-top"/>
   <div className="border-t border-[#EBDFF5] bg-[#FBF9FD] px-5 py-3.5 text-center">
     <p className="font-display text-base font-bold text-[#2E1B40]">Juan Xavier Cabello</p>
     <p className="text-xs font-semibold text-[#7645BA]">Profesor de matemáticas & creador de tecnología educativa</p>
   </div>
 </div>;
}

export default function App(){
 const [more,setMore]=useState(false);
 return <div id="inicio" className="min-h-screen overflow-x-clip bg-[#FCFAFF] font-sans text-[#2D1A42]">
  <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-2 focus:z-50 focus:bg-white focus:p-4">Saltar al contenido</a>
  <main id="contenido">
   {/* 1. HERO TSL DE ALTA CONVERSIÓN (CERO REDUNDANCIA, ENFOCADO EN DESEO Y TRANSFORMACIÓN) */}
   <section className="brand-hero relative px-5 pb-24 pt-10 sm:px-7 sm:pt-14">
    <div className="relative mx-auto max-w-7xl">
     <div className="mx-auto max-w-5xl text-center">
      <p className="inline-flex items-center gap-2 rounded-full border border-[#D8C4ED] bg-white/85 px-4 py-2 text-xs font-extrabold uppercase tracking-[.1em] text-[#7238BF] shadow-sm">
        <Sparkles className="size-4 text-[#9B4DFF]"/> Para profesores de matemáticas que quieren revolucionar el aula con IA
      </p>
      <h1 className="mt-6 font-display text-[clamp(2.55rem,5.1vw,5.2rem)] font-bold leading-[1.08] tracking-[-.065em] text-[#25173C]">
        Menos tiempo escribiendo y dibujando en la pizarra. <span className="bg-gradient-to-r from-[#6535D5] to-[#DA468B] bg-clip-text text-transparent">Más tiempo guiando el aprendizaje.</span>
      </h1>
      <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#665674] sm:text-xl">
        Aprende a crear aplicaciones con IA para utilizarlas durante tus clases de matemáticas: visualiza conceptos complejos, manipula figuras y funciones en tiempo real, y guía la exploración y la práctica de tus estudiantes.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2.5 text-xs font-bold text-[#564667]">
        {['Secundaria','Preuniversitario','Universidad','Sin saber programar'].map(t=>(
          <span key={t} className="rounded-full border border-[#E4D7F0] bg-white/95 px-3.5 py-2 shadow-sm">
            <CheckCircle2 className="mr-1.5 inline size-4 text-[#1D896A]"/>{t}
          </span>
        ))}
      </div>
      <div className="mt-8 flex flex-col items-center">
        <a href="#inscripcion" className="inline-flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#6630CB] to-[#C33FA1] px-8 py-4.5 text-base font-extrabold text-white shadow-[0_18px_38px_rgba(101,48,200,.26)] transition hover:scale-[1.01] hover:opacity-95 sm:w-auto sm:text-lg">
          ¡Quiero crear mis propias aplicaciones con IA · US$9! <ArrowRight className="size-5"/>
        </a>
        <p className="mt-3.5 text-xs font-semibold text-[#6E5B82]">
          Acceso inmediato a tu propio ritmo · Sin horarios fijos · Pago único de US$9
        </p>
      </div>
     </div>
     <div className="mt-12"><MathStudio/></div>
     <div className="mx-auto mt-6 flex max-w-5xl flex-wrap items-center justify-center gap-2 text-center text-xs text-[#796A84]">
       <span className="font-bold text-[#6F39C8]">Explora herramientas reales de nuestro ecosistema:</span>
       <a href="https://funciones.sistemazenit.com/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Funciones Lab</a> ·
       <a href="https://transformacionesgeometricas.sistemazenit.com/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">GeoTransform Pro</a> ·
       <a href="https://mundossimulados.online/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Mundos Simulados</a>
     </div>
    </div>
   </section>

   {/* 2. BARRA DE CONTRASTE (EL VIEJO CAMINO VS. EL NUEVO CAMINO) */}
   <section className="border-y border-[#E4D9ED] bg-white px-5 py-7 sm:px-7">
     <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 text-center lg:flex-row lg:text-left">
       <p className="font-display text-lg font-bold text-[#3B284E]">
         Un simple gráfico plano en 2D no puede moverse. <span className="text-[#7240C8]">Una aplicación creada por ti captura la atención de todo el salón en segundos.</span>
       </p>
       <span className="rounded-full border border-[#E4D5EF] bg-[#FAF6FF] px-5 py-2.5 text-xs font-extrabold text-[#7241B8]">
         VISUALIZA → MANIPULA EN TIEMPO REAL → GUÍA LA PRÁCTICA
       </span>
     </div>
   </section>

   {/* 3. CARTA DE VENTAS (TSL LEAD): EL DOLOR OCULTO DEL PROFESOR DE MATEMÁTICAS Y SU EVOLUCIÓN */}
   <section className="px-5 py-24 sm:px-7">
     <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
       <div>
         <p className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[.18em] text-[#763AC5]">
           <GraduationCap className="size-4"/> De maestro a maestro · La verdad sobre enseñar matemáticas hoy
         </p>
         <h2 className="mt-4 font-display text-[clamp(2rem,4.3vw,3.3rem)] font-bold leading-[1.12] tracking-[-.055em] text-[#291840]">
           ¿Cansado de perder tiempo escribiendo y dibujando algo que vas a borrar apenas termines de explicar?
         </h2>
         <p className="mt-5 text-base leading-8 text-[#5E4D70]">
           Si eres maestro de matemáticas, sabes lo que se siente lidiar todos los días con estudiantes cuya atención se dispersa rápidamente. Y lo peor: te toca explicar <strong className="text-[#2B1840]">uno de los cursos más difíciles de las escuelas</strong> —ese que es el dolor de cabeza no solo de pequeños, sino de grandes que se quedaron traumados porque aprendieron a través del miedo, sintiendo que era mejor fingir que entendieron para no parecer tontos—.
         </p>
         <p className="mt-4 text-base leading-8 text-[#5E4D70]">
           Mientras intentas mantener el orden del aula, das la espalda al salón y pierdes minutos valiosos trazando a pulso gráficas o figuras que el borrador desaparecerá en instantes. Y por más malabares y maravillas que hagas al hablar, te chocas siempre con la misma pared: <strong className="text-[#2B1840]">un simple gráfico plano en 2D no puede moverse</strong> para mostrar los cambios en vivo que tu explicación necesita transmitir.
         </p>
         <p className="mt-4 text-base leading-8 text-[#5E4D70]">
           <strong className="text-[#6934C6]">Tu momento ha llegado. Es hora de brillar y evolucionar al siguiente nivel: un maestro con tecnología propia.</strong> Hoy no necesitas perder semanas estudiando programas complicados; con Inteligencia Artificial puedes crear tus propias aplicaciones interactivas, lograr que tus alumnos finalmente <em>vean</em> la matemática y ganar una admiración y diferenciación profesional única frente a colegas, directivos y padres de familia.
         </p>
       </div>
       <div className="space-y-4">
         {[
           ['Recupera el orden y la atención del aula','Deja de dar la espalda al salón rehaciendo dibujos que se borran en 5 minutos. Proyecta tu aplicación lista, mantén el contacto visual con tu grupo y domina el ritmo de la clase.'],
           ['Rompe el trauma del "fingo que entendí"','Cuando manipulas figuras y funciones en tiempo real y el alumno ve cómo cambia la curva frente a sus ojos, desaparece el miedo a preguntar y nace la verdadera comprensión.'],
           ['Conviértete en el docente referente de tu institución','Sin saber programar ni sacrificar semanas libres, construyes herramientas interactivas con tu sello pedagógico que elevan de inmediato tu estatus y prestigio profesional.']
         ].map(([title,desc],i)=><div key={title} className="flex gap-4 rounded-2xl border border-[#E8DEF1] bg-white p-6 shadow-[0_10px_30px_rgba(70,32,120,0.05)]"><span className="font-mono text-sm font-extrabold text-[#8B53C8]">0{i+1}</span><div><h3 className="font-display text-lg font-bold text-[#382247]">{title}</h3><p className="mt-1.5 text-sm leading-7 text-[#736480]">{desc}</p></div></div>)}
       </div>
     </div>
   </section>

   {/* 4. DEMOSTRACIÓN DE PODER #1: TRANSFORMACIONES GEOMÉTRICAS */}
   <section id="caso-real" className="relative overflow-hidden border-y border-[#E6D9F0] bg-gradient-to-br from-[#F3EBFF] via-[#FFFBFE] to-[#FFF0E6] px-5 py-20 sm:px-7 sm:py-24">
    <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-[#CDAEFF]/35 blur-[90px]"/>
    <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.94fr_1.06fr] lg:gap-16">
      <div className="order-2 lg:order-1">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D8BCEC] bg-white px-4 py-2 text-xs font-extrabold text-[#6B36B5]"><CheckCircle2 className="size-4"/> Así se ve una clase cuando evolucionas con IA</div>
        <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.12] tracking-[-.055em] text-[#2B1940]">Enseñar transformaciones geométricas <span className="text-[#7941CE]">sin empezar cada gráfico desde cero.</span></h2>
        <p className="mt-5 text-base leading-8 text-[#645474]">Explicar traslaciones, rotaciones, simetrías u homotecias con plumón y regla te obliga a borrar y redibujar cada caso mientras el salón pierde la concentración. En cambio, cuando la figura responde en vivo a tus controles, toda la clase comprende al instante qué cambia y qué permanece invariante.</p>
        <p className="mt-4 text-base leading-8 text-[#645474]">Por eso creé <strong className="text-[#332047]">Transformaciones Geométricas</strong> para utilizarla durante mis clases de matemáticas: visualizo conceptos complejos, conduzco una ruta de aprendizaje paso a paso, guío la exploración y la práctica de mis estudiantes, y genero materiales imprimibles en segundos.</p>
        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          {[
            ['Manipulación en vivo','Mueve vértices, ángulos y vectores en tiempo real sin volver a dibujar.'],
            ['Guía la exploración','Conduce una ruta de aprendizaje que mantiene a todos atentos.'],
            ['Del proyector al papel','Descarga materiales imprimibles listos para la práctica en el aula.']
          ].map(([heading,body])=><div key={heading} className="rounded-2xl border border-[#E4D6F0] bg-white/90 p-4 shadow-[0_8px_26px_rgba(83,44,130,.045)]"><Check className="mb-2 size-5 text-[#7D45D3]"/><h3 className="font-display text-sm font-extrabold text-[#342049]">{heading}</h3><p className="mt-1.5 text-xs leading-5 text-[#6E5D7D]">{body}</p></div>)}
        </div>
        <div className="mt-7 flex flex-wrap items-center gap-4">
          <a href="https://transformacionesgeometricas.sistemazenit.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#6633C9] px-6 py-3.5 text-sm font-extrabold text-white shadow-[0_10px_24px_rgba(102,51,201,.16)] hover:bg-[#5526B7]">Probar aplicación en vivo <ExternalLink className="size-4"/></a>
          <a href="#inscripcion" className="inline-flex items-center gap-2 text-sm font-bold text-[#6331B9] underline-offset-4 hover:underline">Quiero aprender a crear mis aplicaciones · US$9 <ArrowRight className="size-4"/></a>
        </div>
      </div>
      <div className="order-1 lg:order-2">
        <div className="overflow-hidden rounded-[26px] border border-[#E5D6F1] bg-white p-2.5 shadow-[0_24px_70px_rgba(80,37,117,.13)] sm:p-4">
          <div className="flex items-center justify-between gap-2 px-3 pb-3 pt-1 text-[11px] font-semibold text-[#715A83]"><span>Ecosistema Matemáticas × IA · Transformaciones Geométricas</span><span className="rounded-full bg-[#EDF7F2] px-2 py-1 text-[#218367]">En uso real en el aula</span></div>
          <img src="/projects/captures/transformaciones-geometricas.webp" alt="Captura real de la aplicación Transformaciones Geométricas utilizada en clases de matemáticas" loading="lazy" decoding="async" className="aspect-[16/11] w-full rounded-xl border border-[#EBE0F4] bg-[#F8F4FC] object-cover object-top"/>
          <p className="px-3 pb-1 pt-3 text-xs leading-6 text-[#78668A]">Captura real de la herramienta creada para el aula. Haz clic en "Probar aplicación en vivo" para verla en acción.</p>
        </div>
        <p className="mx-auto mt-4 max-w-xl text-center text-xs leading-6 text-[#7C698B]">Con tu acceso de US$9 das el primer paso creando tu primer módulo interactivo; herramientas completas como esta te muestran todo lo que podrás construir y escalar dentro de nuestro ecosistema.</p>
      </div>
    </div>
   </section>

   {/* 5. DEMOSTRACIÓN DE PODER #2: SÓLIDOS GEOMÉTRICOS 3D */}
   <section id="caso-solidos" className="border-b border-[#E8DDF3] bg-white px-5 py-20 sm:px-7 sm:py-24">
     <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.03fr_.97fr] lg:gap-16">
       <div className="overflow-hidden rounded-[28px] border border-[#E4D7F0] bg-gradient-to-br from-[#F3EBFF] via-white to-[#FFF1E7] p-3.5 shadow-[0_20px_68px_rgba(77,44,117,.09)] sm:p-5">
         <div className="flex flex-wrap items-center justify-between gap-2 px-2 pb-4"><span className="text-xs font-extrabold text-[#5D3989]">Sólidos Geométricos · Ecosistema Matemáticas × IA</span><span className="rounded-full border border-[#DCCCEC] bg-white px-3 py-1 text-[10px] font-bold text-[#7045B1]">Geometría 3D Interactiva</span></div>
         <img src="/projects/captures/solidos-geometricos.webp" alt="Captura real de Sólidos Geométricos con modelos 3D y recursos didácticos" loading="lazy" decoding="async" className="aspect-[16/10] w-full rounded-xl border border-[#EBE1F5] bg-[#EEE6F8] object-cover object-top"/>
         <p className="px-2 pt-4 text-xs leading-6 text-[#786888]">Visualización tridimensional en el navegador: rota cuerpos geométricos y despliega sus caras frente a tus estudiantes.</p>
       </div>
       <div>
         <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#783FC0]">Rompe el límite de la pizarra plana</p>
         <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.45rem)] font-bold leading-[1.13] tracking-[-.055em] text-[#2B1940]">Sólidos en 3D que giran en tiempo real y <span className="text-[#7840C8]">guían una secuencia didáctica.</span></h2>
         <p className="mt-5 text-base leading-8 text-[#685879]">¿Cuántas veces has dibujado un poliedro o un prisma en 2D sintiendo que tus alumnos no logran imaginar sus caras ocultas ni su volumen? Con <strong className="text-[#34204B]">Sólidos Geométricos</strong> manipulo cuerpos tridimensionales en vivo durante mis clases de matemáticas, despliego su desarrollo plano al instante y conduzco la exploración y la práctica sin tocar el borrador.</p>
         <div className="mt-6 rounded-[24px] border border-[#E7DCEF] bg-[#FAF7FE] p-5">
           <h3 className="font-display text-sm font-extrabold text-[#423055]">Lo que logras cuando el gráfico cobra vida</h3>
           <ol className="mt-4 grid gap-3 sm:grid-cols-2">
             {[
               ['01','Gira en 3D','Rota el sólido en tiempo real desde cualquier ángulo frente al salón.'],
               ['02','Despliega','Muestra caras, vértices y aristas abriendo su red plana con un clic.'],
               ['03','Demuestra','Conecta la intuición visual con el cálculo de áreas y volúmenes.'],
               ['04','Desafía','Resuelve retos interactivos en clase y multiplica la participación.']
             ].map(([n,title,body])=><li key={n} className="flex gap-3 rounded-xl border border-[#EAE0F3] bg-white p-3"><span className="font-mono text-xs font-bold text-[#844ECF]">{n}</span><div><strong className="text-sm text-[#3F2A53]">{title}</strong><p className="mt-1 text-xs leading-5 text-[#776786]">{body}</p></div></li>)}
           </ol>
         </div>
         <a href="https://solidosgeometricos.sistemazenit.com/" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#6732CC] px-6 py-3.5 text-sm font-bold text-white hover:bg-[#5624B8]">Probar aplicación en vivo <ExternalLink className="size-4"/></a>
         <p className="mt-3 text-xs leading-6 text-[#85748F]">Parte de los niveles avanzados de nuestro ecosistema a los que podrás escalar tras dominar tu primer módulo de US$9.</p>
       </div>
     </div>
   </section>

   {/* 6. EL MÉTODO EN 3 PASOS (CERO COMPLEJIDAD TÉCNICA, VELOCIDAD PARA EL DOCENTE OCUPADO) */}
   <section id="metodo" className="border-y border-[#E9DDF3] bg-[#F4EDFD] px-5 py-24 sm:px-7">
     <div className="mx-auto max-w-7xl">
       <Heading
         eyebrow="El método rápido para profesores sin tiempo libre"
         title="No necesitas semanas estudiando programas complicados. Así crearás tu primera aplicación en 3 pasos."
         body="Sabemos que tu día está lleno de horas de dictado, preparación y revisiones. Por eso diseñamos una ruta directa al resultado: entras cuando quieras, sigues el paso a paso a tu propio ritmo y transformas una explicación de tu clase en una aplicación interactiva real."
       />
       <div className="mt-11 grid gap-5 lg:grid-cols-3">
         {steps.map(({n,time,title,desc,outcome,icon:Icon,image})=><article key={n} className="flex flex-col overflow-hidden rounded-[26px] border border-[#E2D5EF] bg-white shadow-[0_8px_30px_rgba(65,29,100,0.04)]"><div className="aspect-[16/9] w-full overflow-hidden bg-[#F2EAFA]"><img src={image} alt={`Etapa ${n}: ${title}`} loading="lazy" decoding="async" className="size-full object-cover transition-transform duration-500 hover:scale-105"/></div><div className="flex flex-1 flex-col p-7"><div className="flex items-center justify-between"><span className="flex size-12 items-center justify-center rounded-xl bg-[#EDE1FC] text-[#6634CB]"><Icon className="size-6"/></span><span className="rounded-full bg-[#F4ECFF] px-3 py-1 font-mono text-xs font-extrabold text-[#6D39C8]">{time}</span></div><span className="mt-7 text-xs font-extrabold tracking-[.2em] text-[#9A70C8]">ETAPA {n}</span><h3 className="mt-2 font-display text-2xl font-bold text-[#322048]">{title}</h3><p className="mt-3 flex-1 text-sm leading-7 text-[#6F607C]">{desc}</p><p className="mt-6 border-t border-[#EEE5F5] pt-4 text-sm font-semibold text-[#443150]"><Check className="mr-2 inline size-4 text-[#20846D]"/>{outcome}</p></div></article>)}
       </div>
     </div>
   </section>

   {/* 7. VISIÓN DEL ECOSISTEMA COMPLETO (ESCALERA DE VALOR) */}
   <section id="proyectos" className="px-5 py-24 sm:px-7">
     <div className="mx-auto max-w-7xl">
       <Heading
         eyebrow="Tu puerta de entrada a un ecosistema mayor"
         title="Hoy empiezas creando tu primer módulo por US$9. Mañana podrás construir todo esto."
         body="Cuando descubres lo fácil que es convertir tus ideas pedagógicas en aplicaciones con IA, ya no hay vuelta atrás. Este entrenamiento es el primer escalón de nuestro ecosistema: domina hoy los fundamentos y prepárate para escalar hacia laboratorios completos de álgebra, geometría 3D, trigonometría y cálculo."
       />
       <div className="mt-10 grid gap-5 md:grid-cols-3">{projects.slice(0,more?6:3).map(p=><ProjectCard key={p.name} project={p}/>)}</div>
       <div className="mt-7 text-center"><button onClick={()=>setMore(v=>!v)} className="inline-flex items-center gap-2 rounded-xl border border-[#CBB4E2] bg-white px-6 py-3.5 text-sm font-bold text-[#6832BD]">{more?'Ver solo aplicaciones de matemáticas':'Ver más aplicaciones del ecosistema'} <ChevronDown className={'size-4 '+(more?'rotate-180':'')}/></button></div>
     </div>
   </section>

   {/* 8. AUTORIDAD E IDENTIFICACIÓN CON EL INSTRUCTOR */}
   <section id="instructor" className="border-y border-[#E6DCEF] bg-[#F7F1FD] px-5 py-24 sm:px-7">
     <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[.4fr_.6fr]">
       <InstructorPortrait/>
       <div>
         <Heading
           eyebrow="Quién te acompaña en esta evolución"
           title="Xavier Cabello"
           body="Soy profesor de matemáticas y conozco exactamente la frustración de dejar la garganta en clase y llenar la pizarra de trazos que se borran en minutos, sintiendo que un gráfico plano en 2D jamás le hace justicia a lo que queremos explicar."
         />
         <p className="mt-4 text-base leading-8 text-[#70607F]">Por eso decidí apalancarme en la Inteligencia Artificial para crear mis propias aplicaciones interactivas y utilizarlas durante mis clases de matemáticas en Secundaria, Preuniversitario y Universidad. El salto en la atención de mis alumnos y en mi prestigio profesional fue tan grande que otros colegas e instituciones empezaron a encargarme herramientas a medida. Hoy abro las puertas de mi ecosistema por solo <strong className="text-[#3C225E]">US$9</strong> para que tú también des ese salto sin perder semanas en el intento.</p>
         <a href="https://xavier.cabellosalirrosas.com/" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 font-bold text-[#6834C7] hover:underline">Explorar mi portafolio profesional <ExternalLink className="size-4"/></a>
       </div>
     </div>
   </section>

   {/* 9. LA OFERTA IRRESISTIBLE DE US$9 (VALUE STACK DE ALTA CONVERSIÓN) */}
   <section id="inscripcion" className="px-5 py-24 sm:px-7">
     <div className="mx-auto max-w-6xl">
       <div className="mx-auto text-center">
         <p className="text-xs font-extrabold uppercase tracking-[.16em] text-[#7A3ABF]">Oferta especial de entrada al ecosistema · Pago único</p>
         <h2 className="mt-3 font-display text-[clamp(2.2rem,4.5vw,3.5rem)] font-bold tracking-[-.06em] text-[#2C1A43]">Evoluciona tus clases de matemáticas hoy por menos de lo que cuesta una caja de plumones</h2>
         <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#6F607C]">Deja de pelear con dibujos estáticos que se borran. Aprende a tu propio ritmo a crear aplicaciones con IA que visualizan conceptos complejos, manipulan figuras y funciones en tiempo real y guían la práctica de tus estudiantes.</p>
       </div>
       <div className="mt-10 grid overflow-hidden rounded-[28px] border border-[#E0D0ED] bg-white shadow-[0_25px_70px_rgba(70,35,113,.09)] lg:grid-cols-[1.06fr_.94fr]">
         <div className="p-7 sm:p-10">
           <p className="inline-flex items-center gap-2 rounded-full bg-[#EFE4FD] px-4 py-2 text-xs font-bold text-[#7139C6]"><Sparkles className="size-4"/> Tu pase de entrada como Maestro con Tecnología</p>
           <h3 className="mt-6 font-display text-3xl font-bold text-[#2D1945]">Todo lo que recibes al desbloquear tu acceso hoy</h3>
           <ul className="mt-7 space-y-4 text-sm leading-7 text-[#51415F]">
             {[
               'Entrenamiento Práctico Paso a Paso (Acceso inmediato a tu ritmo): construye tu primera aplicación matemática interactiva sin saber programar.',
               'Fórmula de Prompts para Matemáticas: cómo darle órdenes exactas a la IA para crear gráficas y figuras dinámicas que responden en tiempo real.',
               'Protocolo de Verificación Docente: cómo auditar fórmulas, dominios y casos límite para que tu aplicación sea 100% rigurosa en clase.',
               'Guía de Publicación Web en 1 Clic: deja tu herramienta lista en internet para abrirla desde el proyector o televisor de tu aula.',
               'Llave de Entrada al Ecosistema Matemáticas × IA: acceso preferencial para escalar a nuestros programas avanzados, laboratorios 3D y generadores de material imprimible.'
             ].map(t=><li key={t} className="flex items-start gap-2.5"><CheckCircle2 className="mt-1 size-4 shrink-0 text-[#178568]"/>{t}</li>)}
           </ul>
           <div className="mt-7 overflow-hidden rounded-2xl border border-[#E6D8F1] bg-[#FAF7FD] p-2.5 sm:p-3.5 shadow-sm">
             <img src="/workshop/bundle-kit-taller-docente.webp" alt="Kit digital incluido: Simulador interactivo en laptop, guía didáctica y biblioteca de prompts para profesores de matemáticas" loading="lazy" decoding="async" className="aspect-[4/3] w-full rounded-xl object-cover shadow-sm"/>
             <p className="mt-2.5 text-center text-[11px] font-bold text-[#7A45C4]">Kit Digital Completo: Entrenamiento Paso a Paso + Plantilla de Publicación + Biblioteca de Prompts</p>
           </div>
           <p className="mt-6 border-t border-[#EFE5F4] pt-5 text-xs leading-6 text-[#82738D]">Transparencia total: aquí lograrás tu primera victoria rápida construyendo tu primer módulo interactivo funcional. Las plataformas completas del portafolio corresponden a los niveles superiores de nuestro ecosistema.</p>
         </div>
         <div className="flex flex-col justify-center border-t border-[#EDE1F5] bg-gradient-to-br from-[#F6EFFF] to-[#FFF6FA] p-7 sm:p-10 lg:border-l lg:border-t-0">
           <p className="text-xs font-bold uppercase tracking-[.15em] text-[#8754C4]">Inversión única de entrada</p>
           <div className="mt-2 font-display text-[clamp(4.2rem,8vw,5.8rem)] font-bold tracking-[-.075em] text-[#2D1945]">US$9 <span className="text-sm font-semibold tracking-normal text-[#7C6B89]">pago único</span></div>
           <p className="mt-4 text-sm leading-7 text-[#6E5D7D]">Acceso inmediato para avanzar a tu ritmo, sin horarios fijos. En Perú podrás abonar en soles con Mercado Pago o Yape.</p>
           <div className="mt-7"><PeruCheckoutButton label="¡Quiero crear mis aplicaciones con IA · US$9!"/></div>
           <p className="mt-5 flex items-start gap-2 text-xs leading-6 text-[#897993]"><ShieldCheck className="mt-0.5 size-4 shrink-0"/> Pasarela automática en activación; asegura abajo tu acceso prioritario por US$9 sin ningún cargo hoy.</p>
         </div>
       </div>
       <div className="mx-auto mt-8 max-w-3xl"><WaitlistForm/></div>
     </div>
   </section>

   {/* 10. PREGUNTAS FRECUENTES ORIENTADAS A CERRAR OBJECIONES */}
   <section id="faq" className="border-t border-[#E8DFF2] bg-[#F8F4FD] px-5 py-24 sm:px-7">
     <div className="mx-auto max-w-3xl">
       <Heading eyebrow="Resolvemos tus dudas antes de empezar" title="Preguntas frecuentes de profesores de matemáticas como tú."/>
       <div className="mt-10 space-y-3">{faq.map(([q,a])=><details key={q} className="group rounded-2xl border border-[#E5D9EF] bg-white p-5 open:border-[#C6A6E7]"><summary className="flex list-none items-center justify-between gap-3 font-bold text-[#332146] [&::-webkit-details-marker]:hidden">{q}<ChevronDown className="size-5 shrink-0 text-[#8D53C5] transition group-open:rotate-180"/></summary><p className="mt-3 text-sm leading-7 text-[#6F617B]">{a}</p></details>)}</div>
     </div>
   </section>

   {/* 11. CIERRE TSL DE ALTO IMPACTO */}
   <section className="px-5 py-20 text-center sm:px-7">
     <h2 className="mx-auto max-w-4xl font-display text-[clamp(2rem,4vw,3.35rem)] font-bold leading-tight tracking-[-.055em] text-[#29193F]">
       Menos tiempo escribiendo y dibujando en la pizarra.<br/>
       <span className="text-[#713BC9]">Más tiempo guiando el aprendizaje en tus clases de matemáticas.</span>
     </h2>
     <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#695879]">
       Tienes dos caminos en tu próxima clase: seguir dándole la espalda al aula para dibujar gráficos estáticos que borrarás en 5 minutos, o evolucionar hoy mismo a un maestro potenciado con su propia tecnología por solo US$9.
     </p>
     <a href="#inscripcion" className="mt-8 inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#6630CB] to-[#C33FA1] px-8 py-4.5 text-base font-extrabold text-white shadow-[0_15px_32px_rgba(104,50,208,.25)] transition hover:scale-[1.01] hover:opacity-95 sm:text-lg">
       ¡Sí, quiero evolucionar mis clases de matemáticas · US$9! <ArrowRight className="size-5"/>
     </a>
   </section>
  </main>
  <footer className="border-t border-[#E4D9EF] bg-white px-5 py-9 pb-24 sm:pb-9"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-xs leading-6 text-[#7D6D8A] sm:flex-row"><p>© 2026 · Matemáticas × IA · Ecosistema de tecnología educativa para docentes</p><a href="/privacidad" className="font-semibold hover:underline">Privacidad</a><p>Contacto: <a href="mailto:xavier@cabellosalirrosas.com" className="underline">xavier@cabellosalirrosas.com</a></p></div></footer>
  <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between border-t border-[#E0D2ED] bg-white/95 px-4 py-3 shadow-[0_-8px_25px_rgba(66,33,95,.1)] sm:hidden"><span className="font-display text-sm font-extrabold text-[#352047]">Matemáticas × IA <span className="text-[#7640C9]">· US$9</span></span><a href="#inscripcion" className="rounded-lg bg-[#6832D0] px-4 py-3 text-xs font-bold text-white">Crear mis apps</a></div>
 </div>;
}
