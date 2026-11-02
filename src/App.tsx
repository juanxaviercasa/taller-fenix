import { useState } from 'react';
import {
  ArrowRight, Check, CheckCircle2, ChevronDown, Clock, Coins,
  ExternalLink, Gift, GraduationCap, Lightbulb, Lock, MonitorPlay, ShieldCheck,
  Sparkles, Timer, Users, Wrench, XCircle, Zap
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
  {name:'Test vocacional RALE',image:'rale-test-vocacional.webp',description:'Evaluaciones y formularios automatizados que ahorran horas de revisión manual y abren servicios educativos adicionales.',skill:'Automatización y flujos de evaluación',url:'https://raletest.sistemazenit.com/',group:'Otros'},
  {name:'Herramientas para Pymes',image:'herramientas-pymes.webp',description:'Calculadoras y sistemas prácticos creados con el mismo método para generar ingresos adicionales fuera del aula.',skill:'Oportunidad profesional y monetización',url:'https://nubeparapymes.online/herramientas/',group:'Otros'},
  {name:'Todo Lima',image:'todo-lima.webp',description:'Directorio digital que demuestra cómo dominar este sistema te abre puertas económicas más allá de la docencia.',skill:'Proyectos digitales escalables',url:'https://todolima.com/',group:'Otros'}
];

const oldVsNew:[string,string][]=[
  [
    'Dibujar y borrar 15 veces el mismo gráfico cada semana en distintos salones, terminando el día con el brazo y la garganta agotados.',
    'Lo preparas una sola vez en minutos con ayuda de la IA y lo abres todo el año con un clic en todos tus salones.'
  ],
  [
    'Dar la espalda al salón durante 5 minutos mientras trazas a pulso (el momento exacto en que se pierde el silencio y el orden).',
    'Enseñas de frente a tus estudiantes, moviendo controles en vivo mientras mantienes el control y la mirada de toda la clase.'
  ],
  [
    'Gráficos planos en 2D que no se mueven y frustran tu explicación cuando necesitas mostrar cómo cambia una función o figura.',
    'Figuras y funciones dinámicas en 2D y 3D que se transforman en tiempo real ante los ojos de tus alumnos.'
  ],
  [
    'Estudiantes bloqueados por el miedo a las matemáticas que prefieren fingir que entendieron para no parecer tontos frente al grupo.',
    'Curiosidad genuina y participación: el cambio visual rompe el miedo y hace que ellos mismos quieran explorar qué pasa al mover un valor.'
  ],
  [
    'Sentirte estancado cobrando lo mismo de siempre, sin una ventaja visible que te diferencie de otros profesores.',
    'Prestigio inmediato frente a directivos, padres y colegas, pudiendo cobrar mejor tus clases particulares o monetizar tus propios recursos.'
  ]
];

const quickWinTimeline:[string,string,string][]=[
  [
    'Minuto 1 · Abres tu Plantilla Lista',
    'Recibes tu acceso inmediato tras el pago de US$9 y eliges la plantilla del tema que te toca enseñar esta semana (funciones, geometría, trigonometría o cálculo).',
    'Sin instalaciones complicadas'
  ],
  [
    'Minuto 5 · Copias y Pegas en la IA',
    'Pegas nuestra estructura guiada en español sencillo. La IA programa todo el plano interactivo, los deslizadores y las fórmulas por ti.',
    'Cero código · Cero estrés técnico'
  ],
  [
    'Minuto 15 · Listo para tu Salón',
    'Obtienes tu enlace listo para abrir mañana mismo desde el proyector, televisor, laptop o celular, y reutilizarlo todo el año escolar.',
    'Ahorras horas cada semana'
  ]
];

const teacherProfiles:[string,string,string][]=[
  [
    'Docente de Colegio (Secundaria)',
    '«Dejé de dibujar y borrar la misma parábola en 5 secciones distintas. Ahora abro mi recurso en 3 segundos, mantengo el orden mirando al salón y termino el día con energía.»',
    'Resultado: +6 horas libres por semana y control del aula'
  ],
  [
    'Docente Preuniversitario y Universidad',
    '«En temas intensos como razones trigonométricas, límites o sumas de Riemann, avanzo el doble de rápido sin llenar tres pizarras de trazos que nadie alcanza a copiar.»',
    'Resultado: Comprensión visual inmediata en temas complejos'
  ],
  [
    'Docente de Clases Particulares / Independiente',
    '«Cuando los padres ven que enseño con mis propios simuladores interactivos y que su hijo por fin entiende sin miedo, pagan mi tarifa por hora sin regatear y me recomiendan.»',
    'Resultado: Mayor prestigio y mejores ingresos por hora'
  ]
];

const valueStack:{title:string;desc:string;value:string;isBonus?:boolean}[]=[
  {
    title:'1. El Sistema Práctico «Pizarra Viva sin Programar»',
    desc:'Paso a paso directo al grano y a tu propio ritmo para tener tu primer recurso matemático interactivo listo para el aula sin escribir código.',
    value:'US$47'
  },
  {
    title:'2. Pack de Plantillas Copiar-y-Pegar para Profesores de Matemáticas',
    desc:'Las instrucciones exactas en español sencillo para que la IA haga el trabajo técnico pesado por ti en minutos y con rigor matemático.',
    value:'US$27'
  },
  {
    title:'3. Guía de Publicación Instantánea en 1 Clic (Cero Costo de Servidor)',
    desc:'Cómo dejar tu herramienta lista en internet gratis para abrirla desde cualquier proyector, pizarra digital, laptop o celular durante todo el año.',
    value:'US$19'
  },
  {
    title:'BONO #1 · Guía de Conducción de Clase Dinámica y Orden en el Aula',
    desc:'La estructura exacta de preguntas y retos en vivo para usar tu recurso interactivo logrando que hasta el alumno más distraído participe sin miedo.',
    value:'US$17',
    isBonus:true
  },
  {
    title:'BONO #2 · Mapa de Prestigio y Monetización Docente',
    desc:'3 rutas reales para rentabilizar tus nuevas herramientas: cobrar mejor por tus clases particulares/grupales, destacar en tu institución y crear activos propios.',
    value:'US$19',
    isBonus:true
  }
];

const faq:[string,string][]=[
  ['"Ya tengo demasiado trabajo como profesor. ¿Esto me va a quitar más tiempo?"', 'Todo lo contrario: el único objetivo de este método es DEVOLVERTE tiempo y energía física. Hoy pierdes horas cada semana volviendo a escribir y dibujar los mismos gráficos en distintos salones porque la mota borra tu esfuerzo. Con este sistema, la IA construye tu recurso visual en minutos una sola vez y tú lo reutilizas todo el año con un clic, terminando tus días de clase mucho más descansado.'],
  ['"No sé nada de programación ni me interesa crear aplicaciones por hobby. ¿Es para mí?"', 'A ningún profesor le interesa volverse programador ni trabajar gratis frente a la pantalla. Aquí no vienes a estudiar informática: vienes por el RESULTADO. La IA hace el 95% del trabajo pesado usando nuestras plantillas copiar-y-pegar, y tú solo pones tu criterio como docente de matemáticas para usar el recurso listo en clase.'],
  ['¿Cómo me ayuda esto económicamente y en mi crecimiento profesional?', 'Los profesores mejor pagados y más respetados no son los que más plumón gastan, sino los que logran que el alumno entienda rápido. Enseñar con tus propios simuladores interactivos te diferencia de inmediato frente a directores y padres de familia, justifica mejores tarifas en tus clases particulares o grupales, y te abre la puerta a vender materiales digitales a otros docentes o colegios.'],
  ['¿Funciona para mis clases de Secundaria, Preuniversitario o Universidad?', 'Sí. El ahorro de pizarra y el impacto visual aplican en los tres niveles: desde funciones y geometría en Secundaria, pasando por trigonometría analítica en Preuniversitario, hasta derivadas, integrales y sumas de Riemann en la Universidad.'],
  ['¿Qué recibo exactamente por los US$9 y por qué es tan accesible?', 'Por solo US$9 (menos de lo que cuestan dos plumones de pizarra) recibes el sistema práctico paso a paso a tu propio ritmo, las plantillas listas para copiar y pegar, la guía de publicación gratuita y los 2 bonos de conducción y monetización. Es nuestra oferta de entrada para que compruebes el resultado en tu propia aula esta misma semana y conozcas nuestro ecosistema docente.'],
  ['¿Las plataformas grandes como Sólidos Geométricos o el Math Studio vienen hechas dentro de los US$9?', 'Esos sistemas avanzados multi-módulo te muestran el potencial profesional y económico al que puedes escalar dentro de nuestro ecosistema. En este primer paso de US$9 nos enfocamos en tu primera victoria rápida: que tengas tu primer módulo interactivo propio funcionando en tiempo récord y sin abrumarte.'],
  ['¿De verdad cambia la atención y rompe el miedo de los estudiantes en el salón?', 'Piénsalo así: cuando das la espalda durante 5 minutos para trazar una gráfica a mano, el salón se dispersa. Cuando estás de frente, mueves un deslizador en vivo y la curva o el sólido se transforma ante sus ojos, el estudiante deja de fingir que entendió por miedo a parecer tonto y conecta de inmediato con tu explicación.']
];

const steps=[
  {n:'01',time:'Ahorro inmediato',title:'Eliges el tema que más te cansa dibujar en la pizarra',desc:'Tomas ese tema de tus clases de matemáticas donde hoy pierdes tiempo trazando a pulso y usas nuestra plantilla copiar-y-pegar para indicarle a la IA qué necesitas.',outcome:'Cero horas perdidas empezando desde cero',icon:Lightbulb,image:'/metodo/etapa-01-modelo-matematico.webp'},
  {n:'02',time:'Cero código',title:'La IA construye por ti un gráfico vivo que sí se mueve',desc:'Sin aprender programación, en pocos minutos obtienes figuras y funciones con controles en tiempo real que muestran los cambios que un dibujo plano en 2D jamás pudo explicar.',outcome:'Clases dinámicas sin esfuerzo técnico',icon:Wrench,image:'/metodo/etapa-02-interaccion-ia.webp'},
  {n:'03',time:'Úsalo todo el año',title:'Lo guardas una vez y cobras dividendos de tiempo y prestigio',desc:'Lo abres con un clic desde tu celular, laptop o proyector en el colegio, academia, universidad o clases particulares. Menos desgaste físico y mayor valor para tu trabajo.',outcome:'Más tiempo libre, energía y retorno económico',icon:MonitorPlay,image:'/metodo/etapa-03-publicacion-web.webp'}
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
  <div className="flex flex-1 flex-col p-6"><span className="text-[10px] font-bold uppercase tracking-[.13em] text-[#8A51C5]">{project.skill}</span><h3 className="mt-2 font-display text-xl font-bold text-[#2C1A40]">{project.name}</h3><p className="mt-3 flex-1 text-sm leading-7 text-[#695B77]">{project.description}</p><a href={project.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#6531C6] hover:underline">Ver resultado en vivo <ExternalLink className="size-4"/></a></div>
 </article>;
}

function InstructorPortrait(){
 return <div className="mx-auto flex w-full max-w-[320px] flex-col overflow-hidden rounded-[28px] border border-[#CBB0E7] bg-white shadow-[0_20px_50px_rgba(100,50,200,0.12)]">
   <img src="/instructor/xavier-cabello.webp" alt="Juan Xavier Cabello - Docente de matemáticas y creador del método" loading="lazy" decoding="async" className="aspect-[4/5] w-full object-cover object-top"/>
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
   {/* BLOQUE 1: HERO DE IMPULSO LOW-TICKET + PUENTE DE PRUEBA EN VIVO */}
   <section className="brand-hero relative px-5 pb-24 pt-10 sm:px-7 sm:pt-14">
    <div className="relative mx-auto max-w-7xl">
     <div className="mx-auto max-w-5xl text-center">
      <p className="inline-flex items-center gap-2 rounded-full border border-[#D8C4ED] bg-white/90 px-4 py-2 text-xs font-extrabold uppercase tracking-[.1em] text-[#7238BF] shadow-sm">
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
        <div className="mt-3.5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs font-semibold text-[#6E5B82]">
          <span className="inline-flex items-center gap-1"><Lock className="size-3.5 text-[#178568]"/> Pago único de US$9 (93% OFF hoy)</span>
          <span>·</span>
          <span>⚡ Listo en 15 minutos sin saber programar</span>
          <span>·</span>
          <span>🇵🇪 Yape / Mercado Pago / Tarjeta</span>
        </div>
      </div>
     </div>

     {/* PUENTE DE ACTIVACIÓN EN VIVO SOBRE EL SIMULADOR */}
     <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-[#DFC9F5] bg-white/90 px-5 py-3.5 text-center shadow-sm">
       <p className="text-xs leading-6 text-[#58456A] sm:text-sm">
         <strong className="text-[#6932C8]"><Zap className="mr-1 inline size-4 text-[#B93EA3]"/>Pruébalo tú mismo ahora:</strong> Mueve cualquier deslizador en el laboratorio de abajo. Lo que en la pizarra te toma <strong className="text-[#2D1A42]">20 minutos trazar y borrar</strong>, aquí tus alumnos lo ven moverse y lo comprenden en <strong className="text-[#2D1A42]">10 segundos</strong>.
       </p>
     </div>

     <div className="mt-5"><MathStudio/></div>
     <div className="mx-auto mt-6 flex max-w-5xl flex-wrap items-center justify-center gap-2 text-center text-xs text-[#796A84]">
       <span className="font-bold text-[#6F39C8]">Resultados reales funcionando hoy en el aula:</span>
       <a href="https://funciones.sistemazenit.com/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Funciones Lab</a> ·
       <a href="https://transformacionesgeometricas.sistemazenit.com/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">GeoTransform Pro</a> ·
       <a href="https://mundossimulados.online/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Mundos Simulados</a>
     </div>
    </div>
   </section>

   {/* BLOQUE 2: EL LEAD TSL (EMPATÍA VISCERAL DE PROFESOR A PROFESOR + TRIFECTA DE RESULTADOS) */}
   <section className="border-t border-[#E4D9ED] px-5 py-24 sm:px-7">
     <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[1.08fr_0.92fr]">
       <div className="rounded-[28px] border border-[#E6DAF2] bg-white p-7 shadow-[0_14px_45px_rgba(70,32,120,0.06)] sm:p-10">
         <p className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[.18em] text-[#763AC5]">
           <GraduationCap className="size-4"/> Hablemos con la verdad · De profesor a profesor
         </p>
         <h2 className="mt-4 font-display text-[clamp(1.95rem,3.9vw,3.1rem)] font-bold leading-[1.13] tracking-[-.055em] text-[#291840]">
           El problema nunca fue tu vocación. Es enseñar en pleno siglo XXI encadenado a una pizarra estática que te drena la energía.
         </h2>
         <figure className="mt-6 overflow-hidden rounded-2xl border border-[#DFCFEF] bg-[#FAF6FF] p-2.5 shadow-[0_14px_38px_rgba(70,32,120,0.08)]">
           <div className="relative overflow-hidden rounded-xl border border-[#E7DAF4]">
             <img
               src="/metodo/dolor-pizarra-vs-clase-viva.webp"
               alt="Contraste real en el aula de matemáticas: el desgaste de dar la espalda dibujando en una pizarra estática frente a alumnos dispersos versus enseñar de frente con visualizaciones interactivas y alumnos participando"
               loading="lazy"
               decoding="async"
               className="aspect-[16/9] w-full object-cover"
             />
           </div>
           <figcaption className="mt-2.5 grid gap-2 text-[11px] font-bold sm:grid-cols-2">
             <span className="flex items-center gap-1.5 rounded-lg bg-[#FFF1F5] px-3 py-1.5 text-[#9B2C53]">
               <XCircle className="size-3.5 shrink-0 text-[#D14B72]"/> Seguir igual: espalda al salón, fatiga y alumnos dispersos
             </span>
             <span className="flex items-center gap-1.5 rounded-lg bg-[#ECFBF5] px-3 py-1.5 text-[#146C52]">
               <CheckCircle2 className="size-3.5 shrink-0 text-[#198768]"/> Con Pizarra Viva: de frente al aula, energía y atención total
             </span>
           </figcaption>
         </figure>
         <div className="mt-6 space-y-4 text-base leading-8 text-[#59486B]">
           <p>
             Si eres maestro de matemáticas, sabes lo que es estar cansado de lidiar con estudiantes cuya atención se dispersa rápidamente. Y lo peor: te toca explicar <strong className="text-[#2B1840]">uno de los cursos más difíciles de las escuelas</strong> —las matemáticas que son el dolor de cabeza no solo de pequeños, sino también de grandes que se quedaron traumados porque aprendieron a través del miedo, sintiendo que <strong className="text-[#2B1840]">era mejor fingir que entendiste para no parecer tonto</strong> frente al salón—.
           </p>
           <p>
             Terminas agotado de lidiar con el orden del aula, perdiendo tiempo valioso escribiendo y dibujando a pulso algo que se borrará tan pronto termines de explicar. Y te frustra ver que, por más malabares y maravillas que hagas para explicar los conceptos, <strong className="text-[#2B1840]">un simple gráfico plano en 2D no puede moverse</strong> para mostrar los cambios que tu explicación quiere transmitir.
           </p>
           <p>
             Molesto por no poder transmitir de la forma adecuada todo lo que sabes, sientes que trabajas el doble para recibir la mitad de atención. <strong className="text-[#6934C6]">Pero tu momento ha llegado: es hora de brillar y evolucionar al siguiente nivel.</strong>
           </p>
           <p className="rounded-2xl border border-[#E7DAF4] bg-[#FAF6FF] p-4 text-sm leading-7 text-[#4B3860]">
             <strong>Seamos claros:</strong> ningún profesor paga porque tenga ganas de «ponerse a programar aplicaciones». Lo haces por el <strong>resultado</strong> que te devuelve en tu vida diaria: <strong>ahorrarte horas de tiempo y energía física, dominar el aula sin gritar y cotizarte mejor económicamente</strong> como un maestro potenciado con tecnología.
           </p>
         </div>
       </div>

       <div className="space-y-5 lg:sticky lg:top-8">
         <div className="rounded-2xl border border-[#DECFF0] bg-[#F6EEFF] px-5 py-4">
           <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#6E36C4]">Los 3 resultados reales por los que haces este cambio</p>
         </div>
         {[
           {
             icon:Clock,
             badge:'01 · TIEMPO LIBRE Y ENERGÍA FÍSICA',
             title:'Deja de dibujar y borrar lo mismo 15 veces por semana',
             desc:'En lugar de desgastar tu brazo y tu garganta trazando el mismo gráfico en cada salón, la IA lo arma una sola vez en minutos y te queda listo para reutilizar todo el año con un clic.'
           },
           {
             icon:Users,
             badge:'02 · ORDEN Y COMPRENSIÓN EN EL AULA',
             title:'No vuelvas a darle la espalda a un salón distraído',
             desc:'Cuando mueves un deslizador de frente a la clase y la figura cobra vida, rompes el miedo del alumno traumado con las matemáticas y capturas la atención sin levantar la voz.'
           },
           {
             icon:Coins,
             badge:'03 · PRESTIGIO Y RETORNO ECONÓMICO',
             title:'Diferénciate del resto y haz crecer tus ingresos docentes',
             desc:'Un profesor con sus propios simuladores interactivos destaca ante directivos y padres de familia, cobra tarifas más altas en clases particulares y puede comercializar sus propios recursos.'
           }
         ].map(({icon:Icon,badge,title,desc})=>(
           <div key={title} className="rounded-2xl border border-[#E8DEF1] bg-white p-6 shadow-[0_10px_30px_rgba(70,32,120,0.05)]">
             <div className="flex items-center gap-2.5 text-xs font-extrabold tracking-[.12em] text-[#7A41C8]">
               <span className="flex size-8 items-center justify-center rounded-lg bg-[#EFE4FD] text-[#6932C8]"><Icon className="size-4"/></span>
               {badge}
             </div>
             <h3 className="mt-3 font-display text-xl font-bold text-[#2F1B42]">{title}</h3>
             <p className="mt-2 text-sm leading-7 text-[#6E5E7C]">{desc}</p>
           </div>
         ))}
       </div>
     </div>
   </section>

   {/* BLOQUE 3: MATRIZ COMPARATIVA "VIEJA PIZARRA VS. SISTEMA PIZARRA VIVA" (BRUNSON VEHICLE SHIFT) */}
   <section className="border-t border-[#E6DBF0] bg-[#F7F2FC] px-5 py-20 sm:px-7 sm:py-24">
     <div className="mx-auto max-w-6xl">
       <div className="mx-auto max-w-3xl text-center">
         <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#763AC5]">Por qué seguir igual te sale demasiado caro</p>
         <h2 className="mt-3 font-display text-[clamp(2rem,4.2vw,3.3rem)] font-bold leading-[1.12] tracking-[-.055em] text-[#291840]">
           El viejo desgaste en la pizarra vs. <span className="text-[#7139C9]">tu nueva clase potenciada con IA</span>
         </h2>
         <p className="mt-4 text-base leading-8 text-[#695978]">
           No necesitas trabajar más horas para ser un mejor profesor; necesitas cambiar el vehículo con el que enseñas.
         </p>
       </div>

       <div className="mt-10 overflow-hidden rounded-[28px] border border-[#DFCFEF] bg-white shadow-[0_20px_60px_rgba(68,31,115,0.07)]">
         <div className="grid border-b border-[#E7DCF2] bg-[#FAF7FD] text-xs font-extrabold uppercase tracking-[.14em] md:grid-cols-2">
           <div className="flex items-center gap-2 px-6 py-4 text-[#9B3B5A] md:border-r md:border-[#E7DCF2]">
             <XCircle className="size-4 shrink-0"/> Lo que hoy te agota (La Pizarra Estática)
           </div>
           <div className="flex items-center gap-2 bg-[#F2E8FF] px-6 py-4 text-[#5F2AB8]">
             <CheckCircle2 className="size-4 shrink-0 text-[#198768]"/> Lo que logras con este sistema (Pizarra Viva con IA)
           </div>
         </div>
         <div className="divide-y divide-[#EDE4F6]">
           {oldVsNew.map(([oldWay,newWay],idx)=>(
             <div key={idx} className="grid md:grid-cols-2">
               <div className="flex items-start gap-3.5 p-6 text-sm leading-7 text-[#6E5E7C] md:border-r md:border-[#EDE4F6]">
                 <XCircle className="mt-1 size-5 shrink-0 text-[#D14B72]"/>
                 <span>{oldWay}</span>
               </div>
               <div className="flex items-start gap-3.5 bg-[#FCF9FF] p-6 text-sm font-medium leading-7 text-[#342049]">
                 <CheckCircle2 className="mt-1 size-5 shrink-0 text-[#198768]"/>
                 <span>{newWay}</span>
               </div>
             </div>
           ))}
         </div>
       </div>
     </div>
   </section>

   {/* BLOQUE 4: PRUEBA DEMOSTRADA #1: TRANSFORMACIONES GEOMÉTRICAS */}
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
            ['Atención en el aula','Conduce la ruta de aprendizaje mirando siempre a tus alumnos.'],
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

   {/* BLOQUE 5: PRUEBA DEMOSTRADA #2: SÓLIDOS GEOMÉTRICOS 3D */}
   <section id="caso-solidos" className="border-b border-[#E8DDF3] bg-white px-5 py-20 sm:px-7 sm:py-24">
     <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.03fr_.97fr] lg:gap-16">
       <div className="overflow-hidden rounded-[28px] border border-[#E4D7F0] bg-gradient-to-br from-[#F3EBFF] via-white to-[#FFF1E7] p-3.5 shadow-[0_20px_68px_rgba(77,44,117,.09)] sm:p-5">
         <div className="flex flex-wrap items-center justify-between gap-2 px-2 pb-4"><span className="text-xs font-extrabold text-[#5D3989]">Sólidos Geométricos · Resultado en el aula</span><span className="rounded-full border border-[#DCCCEC] bg-white px-3 py-1 text-[10px] font-bold text-[#7045B1]">Comprensión 3D en segundos</span></div>
         <img src="/projects/captures/solidos-geometricos.webp" alt="Captura real de Sólidos Geométricos con modelos 3D y recursos didácticos" loading="lazy" decoding="async" className="aspect-[16/10] w-full rounded-xl border border-[#EBE1F5] bg-[#EEE6F8] object-cover object-top"/>
         <p className="px-2 pt-4 text-xs leading-6 text-[#786888]">Lo que en la pizarra plana confunde al alumno, en 3D interactivo queda claro en segundos y sin esfuerzo.</p>
       </div>
       <div>
         <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#783FC0]">El fin del gráfico plano en 2D que nadie entiende</p>
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

   {/* BLOQUE 6: EL MECANISMO SIN ESFUERZO EN 3 PASOS + CRONOGRAMA DE VICTORIA EN 15 MINUTOS (MODELO HORMOZI ADS) */}
   <section id="metodo" className="border-y border-[#E9DDF3] bg-[#F4EDFD] px-5 py-24 sm:px-7">
     <div className="mx-auto max-w-7xl">
       <Heading
         eyebrow="Mínimo esfuerzo técnico · Máximo ahorro de tiempo en tu semana"
         title="La IA hace el trabajo pesado en minutos. Tú te quedas con el tiempo libre, el control del aula y el prestigio."
         body="No te interesa pasarte meses aprendiendo a programar, y no tienes por qué hacerlo. El sistema está diseñado para que inviertas unos minutos una sola vez y te ahorres cientos de horas de pizarra durante todo el año."
       />
       <div className="mt-11 grid gap-5 lg:grid-cols-3">
         {steps.map(({n,time,title,desc,outcome,icon:Icon,image})=><article key={n} className="flex flex-col overflow-hidden rounded-[26px] border border-[#E2D5EF] bg-white shadow-[0_8px_30px_rgba(65,29,100,0.04)]"><div className="aspect-[16/9] w-full overflow-hidden bg-[#F2EAFA]"><img src={image} alt={`Etapa ${n}: ${title}`} loading="lazy" decoding="async" className="size-full object-cover transition-transform duration-500 hover:scale-105"/></div><div className="flex flex-1 flex-col p-7"><div className="flex items-center justify-between"><span className="flex size-12 items-center justify-center rounded-xl bg-[#EDE1FC] text-[#6634CB]"><Icon className="size-6"/></span><span className="rounded-full bg-[#F4ECFF] px-3 py-1 font-mono text-xs font-extrabold text-[#6D39C8]">{time}</span></div><span className="mt-7 text-xs font-extrabold tracking-[.2em] text-[#9A70C8]">PASO {n}</span><h3 className="mt-2 font-display text-2xl font-bold text-[#322048]">{title}</h3><p className="mt-3 flex-1 text-sm leading-7 text-[#6F607C]">{desc}</p><p className="mt-6 border-t border-[#EEE5F5] pt-4 text-sm font-semibold text-[#443150]"><Check className="mr-2 inline size-4 text-[#20846D]"/>{outcome}</p></div></article>)}
       </div>

       {/* CRONOGRAMA DE IMPLEMENTACIÓN EN 15 MINUTOS (GATILLO DE IMPULSO FACEBOOK ADS) */}
       <div className="mt-12 rounded-[28px] border border-[#DCC8F2] bg-white p-7 shadow-[0_14px_40px_rgba(78,35,128,0.06)] sm:p-9">
         <div className="flex flex-col justify-between gap-4 border-b border-[#EFE6F8] pb-6 lg:flex-row lg:items-center">
           <div>
             <p className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[.15em] text-[#7338C6]">
               <Timer className="size-4"/> Cronograma real · ¿Qué pasa hoy mismo apenas entras por US$9?
             </p>
             <h3 className="mt-2 font-display text-2xl font-bold text-[#2B1941] sm:text-3xl">
               De cero a tu primera clase interactiva lista en 15 minutos
             </h3>
           </div>
           <a href="#inscripcion" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#6630CB] px-5 py-3 text-xs font-extrabold text-white hover:bg-[#5624B8] sm:text-sm">
             Probar el sistema hoy · US$9 <ArrowRight className="size-4"/>
           </a>
         </div>
         <div className="mt-6 grid gap-5 md:grid-cols-3">
           {quickWinTimeline.map(([title,desc,pill])=>(
             <div key={title} className="rounded-2xl border border-[#EAE0F5] bg-[#FCF9FF] p-5">
               <span className="inline-block rounded-full bg-[#EFE4FD] px-3 py-1 text-[11px] font-extrabold text-[#6B35C4]">{pill}</span>
               <h4 className="mt-3 font-display text-lg font-bold text-[#2F1B44]">{title}</h4>
               <p className="mt-2 text-xs leading-6 text-[#695978]">{desc}</p>
             </div>
           ))}
         </div>
       </div>
     </div>
   </section>

   {/* BLOQUE 7: PERFILES DE IMPACTO DOCENTE + TUS 3 RETORNOS (TIEMPO, AULA Y BOLSILLO) + ECOSISTEMA */}
   <section id="proyectos" className="px-5 py-24 sm:px-7">
     <div className="mx-auto max-w-7xl">
       <Heading
         eyebrow="Más tiempo libre, mejor reputación y nuevas fuentes de ingreso"
         title="Lo que empieza ahorrándote horas de pizarra termina abriéndote puertas económicas que hoy ni imaginas."
         body="Cuando dejas atrás el desgaste del plumón y construyes tu propio arsenal de recursos interactivos, no solo descansas más: te conviertes en un docente altamente cotizado."
       />

       {/* 3 ESCENARIOS DE IDENTIFICACIÓN INMEDIATA SEGÚN EL PERFIL DEL PROFESOR */}
       <div className="mt-10 grid gap-5 md:grid-cols-3">
         {teacherProfiles.map(([role,quote,result])=>(
           <div key={role} className="flex flex-col justify-between rounded-[24px] border border-[#E2D3F0] bg-white p-6 shadow-[0_10px_30px_rgba(68,31,115,0.04)]">
             <div>
               <span className="inline-block rounded-full bg-[#F3EAFF] px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#6D37C7]">{role}</span>
               <p className="mt-4 text-sm italic leading-7 text-[#4E3D60]">{quote}</p>
             </div>
             <p className="mt-5 border-t border-[#EFE7F6] pt-3.5 text-xs font-extrabold text-[#178568]">
               <CheckCircle2 className="mr-1.5 inline size-4"/>{result}
             </p>
           </div>
         ))}
       </div>

       {/* 3 TARJETAS DE RETORNO ECONÓMICO Y PERSONAL */}
       <div className="mt-6 grid gap-5 md:grid-cols-3">
         {[
           ['1. Retorno en Salud y Tardes Libres','Cada módulo que dejas listo hoy es un tema que nunca más volverás a dibujar desde cero. Ahorras decenas de horas cada bimestre y terminas tus jornadas con energía para ti y tu familia.'],
           ['2. Clases Particulares y Academia Mejor Pagadas','Los padres de familia y alumnos pagan con gusto más por hora al profesor que logra hacer entender en 15 minutos visuales lo que en el colegio no entendieron en dos meses.'],
           ['3. Creación de Activos Digitales Propios','Tal como ves en las plataformas de abajo, este mismo método te permite empaquetar simuladores, guías y herramientas que otros colegas, colegios o negocios están dispuestos a comprar.']
         ].map(([title,desc])=>(
           <div key={title} className="rounded-2xl border border-[#DFCFEF] bg-[#FAF6FF] p-6">
             <h3 className="font-display text-lg font-bold text-[#311C47]">{title}</h3>
             <p className="mt-2.5 text-sm leading-7 text-[#685778]">{desc}</p>
           </div>
         ))}
       </div>

       <div className="mt-10 grid gap-5 md:grid-cols-3">{projects.slice(0,more?6:3).map(p=><ProjectCard key={p.name} project={p}/>)}</div>
       <div className="mt-7 text-center"><button onClick={()=>setMore(v=>!v)} className="inline-flex items-center gap-2 rounded-xl border border-[#CBB4E2] bg-white px-6 py-3.5 text-sm font-bold text-[#6832BD]">{more?'Ver solo resultados para el aula':'Ver todos los proyectos y oportunidades de monetización'} <ChevronDown className={'size-4 '+(more?'rotate-180':'')}/></button></div>
     </div>
   </section>

   {/* BLOQUE 8: PUENTE DE EPIFANÍA DEL INSTRUCTOR (BRUNSON EPIPHANY BRIDGE EN 4 ACTOS) */}
   <section id="instructor" className="border-y border-[#E6DCEF] bg-[#F7F1FD] px-5 py-24 sm:px-7">
     <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[.38fr_.62fr]">
       <InstructorPortrait/>
       <div>
         <Heading
           eyebrow="Por qué hice este cambio (y por qué tú también deberías)"
           title="Xavier Cabello"
           body="Voy a serte totalmente sincero: a mí tampoco me interesaba «aprender a crear aplicaciones» por hobby. Yo buscaba una salida al desgaste físico del aula y una forma de crecer económicamente."
         />
         <div className="mt-6 grid gap-3.5 sm:grid-cols-2">
           {[
             ['1. El hartazgo en la pizarra','Estaba cansado de perder tiempo y garganta dibujando gráficos que borraba a los 5 minutos, lidiando con el desorden del salón y frustrado porque un dibujo plano en 2D no podía moverse.'],
             ['2. El descubrimiento con IA','Descubrí cómo darle órdenes precisas a la inteligencia artificial para que construyera mis visualizadores matemáticos en minutos sin pasar semanas programando.'],
             ['3. El alivio inmediato en clase','Dejé de darle la espalda al salón. Mis estudiantes dejaron de fingir que entendían por miedo y empezaron a participar viendo cómo cada función cobraba vida.'],
             ['4. El salto económico','Colegas e instituciones vieron el impacto de mis herramientas y empezaron a pagarme por ellas. Por eso creé este acceso de US$9: para ahorrarte meses de prueba y error.']
           ].map(([stepTitle,stepBody])=>(
             <div key={stepTitle} className="rounded-2xl border border-[#E4D6F1] bg-white p-4 shadow-sm">
               <h3 className="font-display text-sm font-extrabold text-[#38214E]">{stepTitle}</h3>
               <p className="mt-1.5 text-xs leading-6 text-[#6D5D7C]">{stepBody}</p>
             </div>
           ))}
         </div>
         <a href="https://xavier.cabellosalirrosas.com/" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 font-bold text-[#6834C7] hover:underline">Conocer mi portafolio y trayectoria <ExternalLink className="size-4"/></a>
       </div>
     </div>
   </section>

   {/* BLOQUE 9: FILTRO DE CALIFICACIÓN DOCENTE (PARA QUIÉN SÍ ES / PARA QUIÉN NO ES) */}
   <section className="border-b border-[#E7DCF1] bg-white px-5 py-20 sm:px-7">
     <div className="mx-auto max-w-6xl">
       <div className="mx-auto max-w-3xl text-center">
         <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#763AC5]">Transparencia total antes de dar el paso</p>
         <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,3.1rem)] font-bold tracking-[-.05em] text-[#291840]">
           ¿Para quién es (y para quién NO es) esta oferta de entrada?
         </h2>
       </div>
       <div className="mt-10 grid gap-6 md:grid-cols-2">
         <div className="rounded-[26px] border border-[#CBE8DF] bg-[#F5FBF8] p-7">
           <h3 className="flex items-center gap-2.5 font-display text-xl font-bold text-[#155E4B]">
             <CheckCircle2 className="size-6 shrink-0 text-[#198768]"/> SÍ es para ti si…
           </h3>
           <ul className="mt-5 space-y-3.5 text-sm leading-7 text-[#2D4D43]">
             {[
               'Eres profesor de matemáticas (Secundaria, Preuniversitario, Universidad o clases particulares) y quieres dejar de perder tiempo y salud dibujando lo mismo en pizarra.',
               'Quieres mantener el orden y la atención de tu salón haciendo que hasta los alumnos con miedo a las matemáticas comprendan visualmente.',
               'No te interesa volverte programador: quieres un método rápido donde la IA haga el trabajo pesado y tú disfrutes el resultado.',
               'Te motiva destacar profesionalmente, cobrar mejor por tus horas de enseñanza y abrir nuevas fuentes de ingreso con tecnología.'
             ].map(item=>(
               <li key={item} className="flex items-start gap-2.5">
                 <Check className="mt-1 size-4 shrink-0 text-[#198768]"/>
                 <span>{item}</span>
               </li>
             ))}
           </ul>
         </div>

         <div className="rounded-[26px] border border-[#F0D5DF] bg-[#FFF8FA] p-7">
           <h3 className="flex items-center gap-2.5 font-display text-xl font-bold text-[#7D2847]">
             <XCircle className="size-6 shrink-0 text-[#C83E6B]"/> NO es para ti si…
           </h3>
           <ul className="mt-5 space-y-3.5 text-sm leading-7 text-[#6B4252]">
             {[
               'Buscas un curso académico de ingeniería de software o quieres aprender lenguajes de programación desde cero durante 6 meses.',
               'Estás cómodo gastando tu voz, tu brazo y tu tiempo libre repitiendo los mismos gráficos estáticos en 2D cada semana.',
               'Crees que la tecnología es una moda pasajera y prefieres enseñar exactamente igual que hace 30 años.',
               'No estás dispuesto a invertir 15 minutos siguiendo una plantilla paso a paso para ahorrarte cientos de horas en el año.'
             ].map(item=>(
               <li key={item} className="flex items-start gap-2.5">
                 <XCircle className="mt-1 size-4 shrink-0 text-[#C83E6B]"/>
                 <span>{item}</span>
               </li>
             ))}
           </ul>
         </div>
       </div>
     </div>
   </section>

   {/* BLOQUE 10: GRAND SLAM OFFER STACK DE ALEX HORMOZI + RECIBO DE AHORRO 93% OFF + GARANTÍA BLINDADA */}
   <section id="inscripcion" className="px-5 py-24 sm:px-7">
     <div className="mx-auto max-w-6xl">
       <div className="mx-auto text-center">
         <p className="inline-flex items-center gap-1.5 rounded-full border border-[#D8C2EF] bg-[#F6EEFF] px-4 py-1.5 text-xs font-extrabold uppercase tracking-[.15em] text-[#7137C2]">
           <Sparkles className="size-3.5"/> Oferta de Entrada · 93% de Descuento Hoy (Ahorras US$120)
         </p>
         <h2 className="mt-4 font-display text-[clamp(2.2rem,4.5vw,3.5rem)] font-bold tracking-[-.06em] text-[#2C1A43]">¿Cuánto vale para ti ahorrar cientos de horas de pizarra y cotizarte mejor como docente?</h2>
         <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#6F607C]">Por menos de lo que cuestan dos plumones de pizarra, recibes el sistema completo y los bonos para transformar tus clases a tu propio ritmo y sin horarios fijos.</p>
       </div>

       <div className="mt-10 grid overflow-hidden rounded-[28px] border border-[#E0D0ED] bg-white shadow-[0_25px_70px_rgba(70,35,113,.09)] lg:grid-cols-[1.12fr_.88fr]">
         <div className="p-7 sm:p-10">
           <p className="inline-flex items-center gap-2 rounded-full bg-[#EFE4FD] px-4 py-2 text-xs font-bold text-[#7139C6]"><Sparkles className="size-4"/> Todo lo que desbloqueas hoy mismo (Stack de Valor)</p>
           <h3 className="mt-5 font-display text-2xl font-bold text-[#2D1945] sm:text-3xl">Tu Kit Completo «Pizarra Viva» + 2 Bonos</h3>

           <div className="mt-6 space-y-3.5">
             {valueStack.map(({title,desc,value,isBonus})=>(
               <div key={title} className={`rounded-2xl border p-4 ${isBonus?'border-[#DFC6F7] bg-[#FAF5FF]':'border-[#EAE0F3] bg-white'}`}>
                 <div className="flex flex-wrap items-start justify-between gap-2">
                   <h4 className="flex items-center gap-2 font-display text-sm font-extrabold text-[#2F1B44]">
                     {isBonus ? <Gift className="size-4 shrink-0 text-[#9B35C8]"/> : <CheckCircle2 className="size-4 shrink-0 text-[#178568]"/>}
                     <span>{title}</span>
                   </h4>
                   <span className="shrink-0 rounded-full bg-[#F2EAFA] px-2.5 py-0.5 font-mono text-xs font-extrabold text-[#6E37C5]">Valor: {value}</span>
                 </div>
                 <p className="mt-1.5 pl-6 text-xs leading-6 text-[#685877]">{desc}</p>
               </div>
             ))}
           </div>

           <div className="mt-6 overflow-hidden rounded-2xl border border-[#E6D8F1] bg-[#FAF7FD] p-2.5 sm:p-3.5 shadow-sm">
             <img src="/workshop/bundle-kit-taller-docente.webp" alt="Kit digital completo para ahorrar tiempo en clases de matemáticas y destacar como docente innovador" loading="lazy" decoding="async" className="aspect-[4/3] w-full rounded-xl object-cover shadow-sm"/>
             <p className="mt-2.5 text-center text-[11px] font-bold text-[#7A45C4]">Incluye: Sistema Paso a Paso + Plantillas Copiar-y-Pegar + Guía de Publicación + 2 Bonos</p>
           </div>

           <p className="mt-5 border-t border-[#EFE5F4] pt-4 text-xs leading-6 text-[#82738D]">Nota transparente: este acceso inicial de US$9 te entrega el método completo y tu primer módulo interactivo funcional listo para el aula. Los sistemas avanzados multi-módulo forman parte de los siguientes escalones de nuestro ecosistema.</p>
         </div>

         <div className="flex flex-col justify-between border-t border-[#EDE1F5] bg-gradient-to-br from-[#F6EFFF] to-[#FFF6FA] p-7 sm:p-10 lg:border-l lg:border-t-0">
           <div>
             <div className="flex items-center justify-between">
               <p className="text-xs font-bold uppercase tracking-[.15em] text-[#8754C4]">Resumen de tu orden hoy</p>
               <span className="rounded-full bg-[#E5F7F0] px-3 py-1 text-[11px] font-extrabold text-[#14795D]">AHORRAS 93% HOY</span>
             </div>
             <div className="mt-4 rounded-2xl border border-[#E5D5F2] bg-white/90 p-4 shadow-sm">
               <div className="flex items-center justify-between text-xs font-semibold text-[#7A6889]">
                 <span>Valor total de los 3 módulos + 2 bonos:</span>
                 <span className="font-mono text-sm font-bold line-through text-[#B55279]">US$129.00</span>
               </div>
               <div className="mt-1.5 flex items-center justify-between text-xs font-semibold text-[#178568]">
                 <span>Descuento especial para docentes:</span>
                 <span className="font-mono text-xs font-extrabold">− US$120.00</span>
               </div>
               <div className="mt-2.5 flex items-baseline justify-between border-t border-[#EFE6F7] pt-2.5">
                 <span className="text-xs font-extrabold uppercase tracking-wider text-[#38214E]">Tu único pago hoy:</span>
                 <span className="font-display text-2xl font-extrabold text-[#178568]">US$9.00</span>
               </div>
             </div>

             <div className="mt-5 font-display text-[clamp(4.2rem,8vw,5.6rem)] font-bold leading-none tracking-[-.075em] text-[#2D1945]">
               US$9 <span className="text-sm font-semibold tracking-normal text-[#7C6B89]">pago único · acceso de por vida</span>
             </div>
             <p className="mt-4 text-sm leading-7 text-[#6E5D7D]">
               Sin suscripciones mensuales ni horarios obligatorios. Avanzas a tu propio ritmo desde hoy mismo. En Perú puedes abonar en soles con Mercado Pago o Yape.
             </p>
             <div className="mt-7"><PeruCheckoutButton label="¡Quiero ahorrar tiempo y evolucionar mis clases · US$9!"/></div>
             <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-[11px] font-semibold text-[#6F5D80]">
               <span className="inline-flex items-center gap-1"><Lock className="size-3.5 text-[#178568]"/> Pago 100% Seguro</span>
               <span>·</span>
               <span>⚡ Entrega Digital Inmediata</span>
             </div>
           </div>

           {/* CAJA DE GARANTÍA BLINDADA ANTI-RIESGO PARA TRÁFICO FRÍO DE FACEBOOK ADS */}
           <div className="mt-8 space-y-3 border-t border-[#E6D8F2] pt-5">
             <div className="rounded-2xl border border-[#CBE8DF] bg-[#F5FBF8] p-4 text-xs leading-6 text-[#2C4E44] shadow-sm">
               <div className="flex items-center gap-2 font-display text-sm font-extrabold text-[#145E4B]">
                 <ShieldCheck className="size-5 shrink-0 text-[#178568]"/>
                 <span>Garantía Blindada de Claridad y Victoria Rápida</span>
               </div>
               <p className="mt-1.5">
                 Entra hoy por US$9, descarga las plantillas copiar-y-pegar y arma tu primer recurso en 15 minutos. Todo está explicado paso a paso en español sencillo para que cualquier profesor de matemáticas —aunque nunca haya programado— logre el resultado.
               </p>
             </div>
             <p className="text-[11px] leading-5 text-[#897993]">
               Si la pasarela automática se encuentra en mantenimiento en tu región, registra tus datos abajo para congelar tu precio preferencial de US$9 sin ningún cargo hoy.
             </p>
           </div>
         </div>
       </div>
       <div className="mx-auto mt-8 max-w-3xl"><WaitlistForm/></div>
     </div>
   </section>

   {/* BLOQUE 11: PREGUNTAS FRECUENTES DERRIBADORAS DE OBJECIONES */}
   <section id="faq" className="border-t border-[#E8DFF2] bg-[#F8F4FD] px-5 py-24 sm:px-7">
     <div className="mx-auto max-w-3xl">
       <Heading eyebrow="Cero dudas · Cero complicaciones" title="Lo que todo profesor ocupado pregunta antes de dar el paso."/>
       <div className="mt-10 space-y-3">{faq.map(([q,a])=><details key={q} className="group rounded-2xl border border-[#E5D9EF] bg-white p-5 open:border-[#C6A6E7]"><summary className="flex list-none items-center justify-between gap-3 font-bold text-[#332146] [&::-webkit-details-marker]:hidden">{q}<ChevronDown className="size-5 shrink-0 text-[#8D53C5] transition group-open:rotate-180"/></summary><p className="mt-3 text-sm leading-7 text-[#6F617B]">{a}</p></details>)}</div>
     </div>
   </section>

   {/* BLOQUE 12: CIERRE DE ENCRUCIJADA (THE TWO PATHS CLOSE DE RUSSELL BRUNSON) */}
   <section className="px-5 py-20 text-center sm:px-7">
     <div className="mx-auto max-w-4xl">
       <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#763AC5]">El próximo lunes tienes dos caminos frente al salón</p>
       <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.35rem)] font-bold leading-tight tracking-[-.055em] text-[#29193F]">
         Menos tiempo escribiendo y dibujando en la pizarra.<br/>
         <span className="text-[#713BC9]">Más tiempo guiando el aprendizaje, cuidando tu energía y destacando como docente.</span>
       </h2>
       <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#695879]">
         Puedes seguir entrando al aula con el plumón en la mano a repetir y borrar los mismos dibujos estáticos mientras luchas por la atención… o puedes invertir <strong className="text-[#2B1840]">US$9 hoy</strong>, dejar que la IA haga el trabajo pesado y convertirte en el profesor que todos respetan, entienden y recomiendan.
       </p>
       <a href="#inscripcion" className="mt-8 inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#6630CB] to-[#C33FA1] px-8 py-4.5 text-base font-extrabold text-white shadow-[0_15px_32px_rgba(104,50,208,.25)] transition hover:scale-[1.01] hover:opacity-95 sm:text-lg">
         ¡Sí, quiero ahorrar tiempo en pizarra y elevar mis clases · US$9! <ArrowRight className="size-5"/>
       </a>
       <p className="mt-3 text-xs font-semibold text-[#7A6889]">Pago único de US$9 (93% OFF hoy) · Acceso inmediato a tu propio ritmo · Cero programación</p>
     </div>
   </section>
  </main>
  <footer className="border-t border-[#E4D9EF] bg-white px-5 py-9 pb-24 sm:pb-9"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-xs leading-6 text-[#7D6D8A] sm:flex-row"><p>© 2026 · Matemáticas × IA · Menos pizarra estática, más impacto, tiempo libre y crecimiento para el docente</p><a href="/privacidad" className="font-semibold hover:underline">Privacidad</a><p>Contacto: <a href="mailto:xavier@cabellosalirrosas.com" className="underline">xavier@cabellosalirrosas.com</a></p></div></footer>
  <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between border-t border-[#E0D2ED] bg-white/95 px-4 py-3 shadow-[0_-8px_25px_rgba(66,33,95,.1)] sm:hidden"><span className="font-display text-sm font-extrabold text-[#352047]">Ahorra horas de pizarra <span className="text-[#7640C9]">· US$9</span></span><a href="#inscripcion" className="rounded-lg bg-[#6832D0] px-4 py-3 text-xs font-bold text-white">Empezar hoy</a></div>
 </div>;
}
