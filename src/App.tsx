import { useState } from 'react';
import {
  ArrowRight, Check, CheckCircle2, ChevronDown, Clock, Coins,
  ExternalLink, Gift, GraduationCap, HardDrive, Lightbulb, Lock, MonitorPlay,
  ShieldCheck, Sparkles, Timer, Users, Wrench, XCircle, Zap
} from 'lucide-react';
import { PeruCheckoutButton } from './components/PeruCheckoutButton';
import { WaitlistForm } from './components/WaitlistForm';
import MathStudio from './components/MathStudio';

type Project = {name:string;image:string;description:string;skill:string;url:string;group:'Educación'|'Otros'};
const projects:Project[]=[
  {name:'Funciones Lab',image:'funciones-lab.webp',description:'Olvídate de trazar y borrar ejes 15 veces por semana: mueve deslizadores en vivo y haz que el salón comprenda funciones en minutos.',skill:'Cero desgaste en pizarra · Comprensión rápida',url:'https://funciones.sistemazenit.com/',group:'Educación'},
  {name:'Transformaciones Geométricas',image:'transformaciones-geometricas.webp',description:'Visualiza transformaciones en tiempo real, sigue una ruta de aprendizaje y ofrece práctica con recursos imprimibles listos.',skill:'Ahorra horas de dibujo · Material imprimible',url:'https://transformacionesgeometricas.sistemazenit.com/',group:'Educación'},
  {name:'Sólidos Geométricos',image:'solidos-geometricos.webp',description:'Modelos 3D interactivos, desarrollos planos, teoría y retos al servicio de tus clases de matemáticas sin sufrir dibujando en 2D.',skill:'Impacto visual 3D · Secuencia didáctica lista',url:'https://solidosgeometricos.sistemazenit.com/',group:'Educación'},
  {name:'Mundos Simulados',image:'mundos-simulados.webp',description:'Modelos visuales de física y sistemas dinámicos listos para proyectar y capturar la atención de toda el aula.',skill:'Atención inmediata · Pensamiento matemático',url:'https://mundossimulados.online/',group:'Educación'},
  {name:'Test vocacional RALE',image:'rale-test-vocacional.webp',description:'Evaluaciones y formularios automatizados que ahorran horas de revisión manual y abren servicios educativos adicionales.',skill:'Automatización y flujos de evaluación',url:'https://raletest.sistemazenit.com/',group:'Otros'},
  {name:'Herramientas para Pymes',image:'herramientas-pymes.webp',description:'Calculadoras y sistemas prácticos creados con el mismo método para generar ingresos adicionales fuera del aula.',skill:'Oportunidad profesional y monetización',url:'https://nubeparapymes.online/herramientas/',group:'Otros'},
  {name:'Todo Lima',image:'todo-lima.webp',description:'Directorio digital que demuestra cómo dominar este sistema te abre puertas económicas más allá de la docencia.',skill:'Proyectos digitales escalables',url:'https://todolima.com/',group:'Otros'}
];

const oldVsNew:[string,string][]=[
  [
    'Pasarte media hora dibujando un poliedro con 3 colores de plumón para que al final te digan: «¿Profe, esa raya de atrás está adentro o afuera?».',
    'Giras el sólido en 3D con un clic, despliegas sus caras en vivo y todo el salón comprende la perspectiva en 10 segundos.'
  ],
  [
    'Darle la espalda al salón durante 3 minutos para trazar en la pizarra (el instante exacto en que pierdes el orden y la mitad saca el celular).',
    'Explicas siempre de frente a tus alumnos, manteniendo el contacto visual, la autoridad escénica y la atención de toda el aula.'
  ],
  [
    'Dictar en 5 secciones y dibujar y borrar la misma gráfica 15 veces por semana hasta terminar con el hombro, la espalda y la garganta destrozados.',
    'Lo generas una sola vez en minutos, lo llevas en tu USB sin depender de internet y lo reutilizas todo el año en todos tus salones.'
  ],
  [
    'Pelear con comandos lentos de GeoGebra en plena clase (donde te equivocas en un paréntesis y se te fue la hora) o usar diapositivas estáticas que no se mueven.',
    'Usas nuestras plantillas en español de copiar y pegar: si sabes mandar un WhatsApp y pegar en Word, la IA arma el visualizador por ti en 60 segundos.'
  ],
  [
    'Competir por precio en clases particulares cobrando S/ 20 o S/ 30 la hora contra universitarios porque enseñas con un PDF estático.',
    'Pasas a cobrar entre S/ 60 y S/ 80+ la hora mostrando a los padres simuladores interactivos propios que destraban a sus hijos desde la primera sesión.'
  ]
];

const failedAlternatives:[string,string,string][]=[
  [
    'Diapositivas de PowerPoint o Canva',
    'Son imágenes muertas en 2D.',
    'Si un alumno te pregunta «¿Profe, qué pasa si el coeficiente es negativo o si giramos la figura?», la diapositiva no puede moverse y terminas dibujando encima con plumón.'
  ],
  [
    'GeoGebra o Desmos Manual en Vivo',
    'Fricción técnica y pérdida de tiempo.',
    'Ponerte a meter comandos algebraicos en vivo frente a 40 chicos inquietos consume media clase; te equivocas en un paréntesis y perdiste la atención del salón.'
  ],
  [
    'Videos de YouTube de Otros Profesores',
    'Te quitan autoridad frente al grupo.',
    'Al poner el video de otro colega, tus alumnos pasan a modo pasivo y no puedes alterar los datos del video para resolver el problema específico de tu separata.'
  ],
  [
    'ChatGPT Básico en Modo Texto',
    'Ceguera geométrica y fórmulas rotas.',
    'Pedirle ejercicios en texto libre solo devuelve bloques planos sin interactividad visual. En cambio, nuestro método de Inyección de Plantillas crea pizarras vivas 2D/3D.'
  ]
];

const quickWinTimeline:[string,string,string][]=[
  [
    'Minuto 1 · Eliges tu Plantilla en Español',
    'Recibes tu acceso inmediato tras el pago de US$9 y abres la plantilla del tema que te toca enseñar mañana (funciones, geometría 2D/3D, trigo o cálculo).',
    'Si sabes usar WhatsApp y Word, ya sabes hacerlo'
  ],
  [
    'Minuto 5 · Copias y Pegas en la IA Gratuita',
    'Solo cambias entre corchetes el tema de tu clase y lo pegas en el taller gratuito de la IA. En 60 segundos construye los deslizadores, gráficos y retos por ti.',
    'Sin pagar suscripciones de IA · Cero código'
  ],
  [
    'Minuto 15 · A tu USB (Funciona Sin Internet)',
    'Descargas tu visualizador en un archivo único liviano (.html) que guardas en tu USB o celular y se abre sin Wi-Fi en cualquier televisor o proyector del colegio.',
    '100% Offline en el aula · +10 Apps ya listas'
  ]
];

const teacherProfiles:[string,string,string][]=[
  [
    '1. El Docente de Secundaria Sobrecargado',
    '«Tengo 5 secciones y dibujar la misma gráfica 15 veces por semana me tenía el hombro y la voz destrozados. Ahora llevo mi archivo en mi USB, lo abro sin internet en el TV del salón y recupero mis noches y mis domingos.»',
    'Alivio físico inmediato + Control del aula sin gritar'
  ],
  [
    '2. El «Tigre» de Academia Pre y Cálculo',
    '«Explicar Geometría del Espacio, Trigonometría o Derivadas e Integrales en una pizarra plana 2D era pedirles un acto de fe. Ahora giro el sólido en 3D, muestro el trazo oculto en 3 segundos y resuelvo el doble de problemas por clase.»',
    'Cero ceguera espacial 2D + Respeto académico total'
  ],
  [
    '3. El Profesor de Clases Particulares (De S/ 25 a S/ 80/h)',
    '«En clases particulares está lleno de chicos cobrando S/ 20 la hora. Cuando le muestras a los padres que enseñas con tus propios simuladores interactivos y su hijo por fin entiende sin miedo, pagan S/ 60 a S/ 80 la hora sin regatear.»',
    'Con 1 sola hora de clase recuperas tus US$9'
  ]
];

const valueStack:{title:string;objectionKilled:string;desc:string;value:string;isBonus?:boolean}[]=[
  {
    title:'1. El Generador Maestro «Pizarra Viva 3D» (Geometría del Espacio y Sólidos)',
    objectionKilled:'Elimina el dolor de: «Mis alumnos no ven la perspectiva en 2D y tardo media hora dibujando poliedros»',
    desc:'Plantilla copiar-y-pegar que ordena a la IA crear un visor 3D rotatorio con el ratón o el dedo, incluyendo botones para desplegar la red plana, ver líneas ocultas y cambiar dimensiones en vivo.',
    value:'US$47'
  },
  {
    title:'2. El Laboratorio Dinámico de Funciones, Trigonometría y Cálculo',
    objectionKilled:'Elimina el dolor de: «Dibujar y borrar 15 veces por semana la misma curva en 5 secciones distintas»',
    desc:'Genera planos cartesianos interactivos con deslizadores en tiempo real para parábolas, exponenciales, circunferencia trigonométrica, rectas tangentes (derivadas) y sumas de Riemann.',
    value:'US$47'
  },
  {
    title:'3. El Motor «Paso a Paso» Anti-Ansiedad Matemática (Álgebra y Aritmética)',
    objectionKilled:'Elimina el dolor de: «Ven la pizarra llena de ecuaciones, se bloquean y dicen "Sí entendí" por vergüenza»',
    desc:'Crea pizarras digitales donde la resolución no aparece de golpe: revelas cada despeje línea por línea con un botón «Siguiente Paso», resaltando en colores qué ocurrió con los signos.',
    value:'US$37'
  },
  {
    title:'BONO INTENCIONAL #1 · El Clonador de Ejercicios Infinitos en Vivo (Botón «Nuevo Reto»)',
    objectionKilled:'Rebate la objeción: «Pierdo horas en la noche inventando ejercicios cuyos datos salgan exactos»',
    desc:'Añade a tus visualizadores un botón que genera al instante nuevos problemas con respuestas exactas (sin raíces ni fracciones feas accidentales) para sacar alumnos a participar o competir por filas.',
    value:'US$27',
    isBonus:true
  },
  {
    title:'BONO INTENCIONAL #2 · Guía «De la IA a tu USB Sin Internet en 3 Clics» + Bóveda de 10 Apps Listas',
    objectionKilled:'Rebate la objeción: «En mi colegio NO hay internet en las aulas y necesito algo listo para mañana a las 8:00 AM»',
    desc:'Cómo descargar cualquier visualizador en un archivo único liviano que llevas en tu USB y abre sin Wi-Fi en cualquier TV o proyector. Incluye 10 simuladores ya armados listos para usar mañana mismo.',
    value:'US$39',
    isBonus:true
  }
];

type OrderBump = {
  id:string;
  tag:string;
  title:string;
  priceUsd:number;
  painSolved:string;
  desc:string;
};

const orderBumps:OrderBump[]=[
  {
    id:'bump-examenes-word',
    tag:'COMPLEMENTO #1 · AHORRO NOCTURNO',
    title:'Generador Automático de Exámenes (Fila A y B), Prácticas y Solucionarios Listos para Imprimir',
    priceUsd:9,
    painSolved:'Para no quedarte hasta las 11:30 PM peleando con el editor de ecuaciones y gráficos en Word',
    desc:'Plantillas que generan en 2 minutos fichas de trabajo, exámenes diferenciados anti-copia (Fila A y Fila B) con rúbricas y solucionarios paso a paso listos para imprimir en PDF.'
  },
  {
    id:'bump-boveda-50',
    tag:'COMPLEMENTO #2 · CERO ESFUERZO (TODO EL AÑO LISTO)',
    title:'Bóveda «Cero Esfuerzo» de 50 Visualizadores Matemáticos Ya Creados para tu USB (Secundaria + Pre)',
    priceUsd:12,
    painSolved:'Para el «profesor taxi» sin tiempo que quiere todo el año resuelto hoy sin siquiera copiar prompts',
    desc:'Descarga directa de los 50 simuladores interactivos 2D y 3D más usados del currículo (álgebra, geometría plana y del espacio, trigo, funciones y cálculo) listos para llevar en tu USB.'
  },
  {
    id:'bump-admision-minedu',
    tag:'COMPLEMENTO #3 · ACADEMIA PRE + COLEGIO MINEDU',
    title:'Pack de Prompts «Problemas Tipo Admisión (UNI / San Marcos / PUCP)» y Contextualizados MINEDU',
    priceUsd:7,
    painSolved:'Para cumplir con las situaciones significativas que exige el coordinador o el rigor preuniversitario',
    desc:'Transforma cualquier tema abstracto en problemas contextualizados de la vida real (enfoque por competencias) o en retos de nivel examen de admisión con gráficas integradas.'
  }
];

const faq:[string,string][]=[
  ['"En mi colegio NO hay internet en los salones, apenas un proyector o televisor. ¿Igual me sirve?"', '¡Sí, fue diseñado exactamente para la realidad de los colegios de Perú y Latinoamérica! Con el Bono #2 («De la IA a tu USB Sin Internet en 3 Clics»), tu visualizador se descarga como un archivo único súper liviano (.html) que guardas en tu memoria USB o celular. Llegas al salón, lo conectas al televisor o proyector y funciona al 100% SIN INTERNET.'],
  ['"Ya probé GeoGebra y cursos de TICs, pero en vivo pierdo media hora metiendo comandos. ¿Por qué esto es distinto?"', 'En GeoGebra tienes que configurar comandos algebraicos manualmente y, si te equivocas en un paréntesis frente a 40 alumnos inquietos, pierdes toda la clase. Aquí NO configuras software: usas nuestras Plantillas en Español de Copiar y Pegar. La IA construye todo el simulador por ti en 60 segundos y tú en clase solo mueves deslizadores y botones listos.'],
  ['"Soy profesor de matemáticas, no programador (y tengo más de 45 años). ¿Necesito saber código o pagar una IA cara?"', 'Si sabes escribir un mensaje de WhatsApp y copiar y pegar un texto en Word, ya tienes el 100% de la habilidad técnica necesaria. No tocas ni una línea de programación y todo el método funciona utilizando las versiones 100% GRATUITAS de la Inteligencia Artificial (sin pagar suscripciones de US$20 al mes).'],
  ['"Soy \'profesor taxi\', dicto más de 40 horas a la semana y ya no doy más. ¿Esto me va a quitar tiempo?"', 'Al contrario: está hecho para devolverte tus noches y erradicar el dolor de estómago del domingo a las 5:00 PM. Además, incluye una Bóveda con 10 visualizadores ya armados para que los uses mañana mismo a las 8:00 AM sin crear nada desde cero, y cada recurso nuevo te toma menos de 15 minutos dejándolo listo para todo el año.'],
  ['"¿Por qué cuesta solo US$9 (aprox. S/ 33 soles)? ¿Hay cobros mensuales ocultos?"', 'No hay ningún cobro mensual ni letra chica: es un único pago de US$9 (exactamente lo que te cuestan dos cajas de plumones acrílicos o lo que cobras en una sola hora de clase particular estándar). Lo fijamos en este precio de entrada para que cualquier docente de Perú y Latinoamérica pueda comprobar el sistema en su aula hoy mismo y entrar a nuestro ecosistema.'],
  ['"¿Cómo recupero estos US$9 dando clases particulares, en academia o en mi colegio?"', 'En el mercado de clases particulares, quien enseña con un PDF estático pelea por S/ 20 o S/ 30 la hora contra estudiantes universitarios. Cuando le muestras a los padres de familia tus propios simuladores 2D y 3D donde su hijo comprende en 15 minutos lo que no entendió en todo el bimestre, justificas tarifas de S/ 60 a S/ 80+ la hora. Con una sola hora de clase recuperas hasta el doble de tu inversión.'],
  ['"¿Las plataformas grandes multi-módulo como Sólidos Geométricos completo vienen dentro de los US$9?"', 'Esas plataformas avanzadas te muestran hasta dónde puedes escalar dentro de nuestro ecosistema. En tu acceso hoy de US$9 recibes las 3 plantillas maestras (3D, Funciones/Trigo/Cálculo y Álgebra Paso a Paso), los 2 bonos (Clonador de Retos + Guía USB Sin Internet con 10 Apps listas) para lograr tu victoria rápida desde tu primera clase.']
];

const steps=[
  {n:'01',time:'Cero comandos raros',title:'Copias nuestra Plantilla en Español del tema de tu clase',desc:'Olvídate de sufrir con GeoGebra o de empezar desde cero. Tomas la plantilla lista, escribes entre corchetes el tema de tu sílabo y la pegas en la IA gratuita.',outcome:'Si sabes usar WhatsApp y Word, ya lo dominas',icon:Lightbulb,image:'/metodo/etapa-01-modelo-matematico.webp'},
  {n:'02',time:'En 60 segundos',title:'La IA te entrega tu Pizarra Viva 2D o 3D con controles listos',desc:'Sin tocar código, obtienes tu visualizador con deslizadores en tiempo real, resolución paso a paso y el botón «Nuevo Reto» para generar ejercicios exactos al instante.',outcome:'Rompes el bloqueo y la ansiedad matemática del salón',icon:Wrench,image:'/metodo/etapa-02-interaccion-ia.webp'},
  {n:'03',time:'En tu USB sin internet',title:'Lo guardas en tu USB y lo usas todo el año sin Wi-Fi',desc:'Se descarga en un archivo único liviano que abres sin internet en el televisor o proyector de tu colegio, academia, universidad o clases particulares por Zoom.',outcome:'Ahorras horas cada semana y duplicas tu tarifa por hora',icon:MonitorPlay,image:'/metodo/etapa-03-publicacion-web.webp'}
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
 const [selectedBumps,setSelectedBumps]=useState<string[]>([]);

 const toggleBump=(id:string)=>{
   setSelectedBumps(prev=>{
     const next=prev.includes(id)?prev.filter(x=>x!==id):[...prev,id];
     try{window.localStorage.setItem('zenit_selected_bumps',JSON.stringify(next));}catch{}
     return next;
   });
 };

 const bumpsTotalUsd=orderBumps
   .filter(b=>selectedBumps.includes(b.id))
   .reduce((acc,b)=>acc+b.priceUsd,0);
 const totalUsd=9+bumpsTotalUsd;

 return <div id="inicio" className="min-h-screen overflow-x-clip bg-[#FCFAFF] font-sans text-[#2D1A42]">
  <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-2 focus:z-50 focus:bg-white focus:p-4">Saltar al contenido</a>
  <main id="contenido">
   {/* BLOQUE 1: HERO DE IMPULSO LOW-TICKET + PUENTE DE PRUEBA EN VIVO */}
   <section className="brand-hero relative px-5 pb-24 pt-10 sm:px-7 sm:pt-14">
    <div className="relative mx-auto max-w-7xl">
     <div className="mx-auto max-w-5xl text-center">
      <p className="inline-flex items-center gap-2 rounded-full border border-[#D8C4ED] bg-white/90 px-4 py-2 text-xs font-extrabold uppercase tracking-[.1em] text-[#7238BF] shadow-sm">
        <Sparkles className="size-4 text-[#9B4DFF]"/> Para profesores de matemáticas que aman enseñar, pero odian quedarse hasta las 11:30 PM preparando material
      </p>
      <h1 className="mt-6 font-display text-[clamp(2.55rem,5.1vw,5.2rem)] font-bold leading-[1.08] tracking-[-.065em] text-[#25173C]">
        Menos tiempo escribiendo y dibujando en la pizarra. <span className="bg-gradient-to-r from-[#6535D5] to-[#DA468B] bg-clip-text text-transparent">Más tiempo guiando el aprendizaje.</span>
      </h1>
      <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#665674] sm:text-xl">
        Aprende a crear aplicaciones con IA para utilizarlas durante tus clases de matemáticas: visualiza conceptos complejos, manipula figuras y funciones en tiempo real, y guía la exploración y la práctica de tus estudiantes.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2.5 text-xs font-bold text-[#564667]">
        {['Secundaria','Preuniversitario','Universidad','Funciona en tu USB sin internet en el aula'].map(t=>(
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
          <span className="inline-flex items-center gap-1"><Lock className="size-3.5 text-[#178568]"/> Pago único de US$9 (Lo que cuestan 2 cajas de plumones)</span>
          <span>·</span>
          <span>⚡ Listo en 15 min sin saber programar</span>
          <span>·</span>
          <span>🔌 Abre sin internet desde tu USB</span>
        </div>
      </div>
     </div>

     {/* PUENTE DE ACTIVACIÓN EN VIVO SOBRE EL SIMULADOR */}
     <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-[#DFC9F5] bg-white/90 px-5 py-3.5 text-center shadow-sm">
       <p className="text-xs leading-6 text-[#58456A] sm:text-sm">
         <strong className="text-[#6932C8]"><Zap className="mr-1 inline size-4 text-[#B93EA3]"/>Pruébalo tú mismo ahora:</strong> Mueve cualquier deslizador en el laboratorio de abajo. Lo que en la pizarra te toma <strong className="text-[#2D1A42]">20 minutos trazar y borrar de espaldas al salón</strong>, aquí tus alumnos lo ven moverse y lo comprenden en <strong className="text-[#2D1A42]">10 segundos</strong>.
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

   {/* BLOQUE 2: EL LEAD TSL (VOZ LITERAL DE SALA DE PROFESORES + FOTOGRAFÍA HIPERREALISTA + TRIFECTA DE RESULTADOS) */}
   <section className="border-t border-[#E4D9ED] px-5 py-24 sm:px-7">
     <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[1.08fr_0.92fr]">
       <div className="rounded-[28px] border border-[#E6DAF2] bg-white p-7 shadow-[0_14px_45px_rgba(70,32,120,0.06)] sm:p-10">
         <p className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[.18em] text-[#763AC5]">
           <GraduationCap className="size-4"/> Hablemos con la verdad · De profesor a profesor
         </p>
         <h2 className="mt-4 font-display text-[clamp(1.95rem,3.9vw,3.1rem)] font-bold leading-[1.13] tracking-[-.055em] text-[#291840]">
           «Me paso media hora dibujando con tres colores de plumón para que al final me digan: “¿Profe, esa raya de atrás está adentro o afuera?”…»
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
               <XCircle className="size-3.5 shrink-0 text-[#D14B72]"/> Seguir igual: espalda al salón, fatiga y alumnos en el celular
             </span>
             <span className="flex items-center gap-1.5 rounded-lg bg-[#ECFBF5] px-3 py-1.5 text-[#146C52]">
               <CheckCircle2 className="size-3.5 shrink-0 text-[#198768]"/> Con Pizarra Viva: de frente al aula, energía y atención total
             </span>
           </figcaption>
         </figure>
         <div className="mt-6 space-y-4 text-base leading-8 text-[#59486B]">
           <p>
             Si eres maestro de matemáticas, conoces este desgaste en carne propia: apenas le das la espalda al salón durante dos minutos para trazar una gráfica en la pizarra, <strong className="text-[#2B1840]">ya perdiste el orden del aula y la mitad está metida en el celular</strong>. Y si dictas en cinco secciones distintas, repetir y borrar la misma gráfica 15 veces por semana te deja el hombro, la espalda y la garganta destrozados.
           </p>
           <p>
             Para colmo, te toca enseñar <strong className="text-[#2B1840]">uno de los cursos más temidos de la escuela</strong>. Cuando preguntas <em>«¿Todo claro?»</em>, todos te dicen <em>«¡Sí, profe!»</em> calladitos porque sufren de ansiedad matemática y <strong className="text-[#2B1840]">les da vergüenza parecer tontos frente a sus compañeros</strong>… pero el viernes tomas la práctica y la mayoría reprueba porque un dibujo plano en 2D no se mueve ni les permite ver de dónde salen las fórmulas.
           </p>
           <p>
             Y cuando suena el timbre, empieza tu segundo turno no pagado: correr como «profesor taxi» de un colegio a otro o quedarte hasta las <strong className="text-[#2B1840]">11:30 de la noche de un domingo</strong> peleando con ecuaciones y grafiquitos en Word para el día siguiente.
           </p>
           <p className="rounded-2xl border border-[#E7DAF4] bg-[#FAF6FF] p-4 text-sm leading-7 text-[#4B3860]">
             <strong>Tu momento de evolucionar ha llegado —y seamos claros:</strong> ningún profesor compra esto porque quiera «ponerse a programar aplicaciones». Lo haces por el <strong>resultado directo en tu vida y en tu bolsillo</strong>: apagar tu laptop a las 7:00 PM, dominar tu aula de frente sin gritar y pasar de cobrar S/ 25 la hora a <strong>S/ 60–S/ 80+ la hora</strong> en tus clases particulares como un docente potenciado con tecnología.
           </p>
         </div>
       </div>

       <div className="space-y-5 lg:sticky lg:top-8">
         <div className="rounded-2xl border border-[#DECFF0] bg-[#F6EEFF] px-5 py-4">
           <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#6E36C4]">Los 3 motores reales por los que haces este cambio hoy</p>
         </div>
         {[
           {
             icon:Clock,
             badge:'01 · SALUD, GARGANTA Y DOMINGOS LIBRES',
             title:'Deja de dibujar 15 veces lo mismo y apaga tu laptop temprano',
             desc:'En lugar de desgastar tu hombro en 5 secciones o quedarte hasta medianoche armando gráficos, copias una plantilla en español, la IA crea tu pizarra viva en 60 segundos y la reutilizas todo el año.'
           },
           {
             icon:Users,
             badge:'02 · CONTROL DEL AULA Y CERO MIEDO MATEMÁTICO',
             title:'Enseña siempre de frente y logra el «¡Ah, ahora sí entendí!»',
             desc:'Sin darle la espalda al salón ni pelear con comandos lentos de GeoGebra, mueves un control en vivo, el sólido o la función cobra movimiento y hasta el alumno más distraído participa.'
           },
           {
             icon:Coins,
             badge:'03 · PRESTIGIO Y SALTO DE S/ 25 A S/ 80 LA HORA',
             title:'Destaca en tu institución y duplica tu tarifa en clases particulares',
             desc:'Lleva tus visualizadores en tu USB (funcionan sin internet en el colegio) para brillar en las observaciones de aula, y úsalos en tus asesorías particulares para cobrar como un especialista premium.'
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

   {/* BLOQUE 3: AUDITORÍA DE SOLUCIONES PREVIAS + MATRIZ "VIEJA PIZARRA VS. PIZARRA VIVA IA" */}
   <section className="border-t border-[#E6DBF0] bg-[#F7F2FC] px-5 py-20 sm:px-7 sm:py-24">
     <div className="mx-auto max-w-6xl">
       <div className="mx-auto max-w-3xl text-center">
         <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#763AC5]">Por qué no es tu culpa estar cansado de las capacitaciones tradicionales</p>
         <h2 className="mt-3 font-display text-[clamp(2rem,4.2vw,3.3rem)] font-bold leading-[1.12] tracking-[-.055em] text-[#291840]">
           Por qué lo que probaste antes falló en el aula <span className="text-[#7139C9]">(y cómo este nuevo vehículo lo resuelve)</span>
         </h2>
         <p className="mt-4 text-base leading-8 text-[#695978]">
           Nos hicieron creer que para modernizar la clase de matemáticas había que usar diapositivas quietas o aprender programas complicados.
         </p>
       </div>

       {/* 4 TARJETAS DE POR QUÉ FALLARON LAS SOLUCIONES ANTERIORES */}
       <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
         {failedAlternatives.map(([name,shortWhy,detail])=>(
           <div key={name} className="rounded-2xl border border-[#E8D8EE] bg-white p-5 shadow-sm">
             <div className="flex items-center gap-2 text-xs font-extrabold text-[#B0305C]">
               <XCircle className="size-4 shrink-0"/> {name}
             </div>
             <p className="mt-2 font-display text-sm font-bold text-[#2E1B42]">{shortWhy}</p>
             <p className="mt-1.5 text-xs leading-6 text-[#6D5D7C]">{detail}</p>
           </div>
         ))}
       </div>

       {/* TABLA COMPARATIVA DIRECTA */}
       <div className="mt-10 overflow-hidden rounded-[28px] border border-[#DFCFEF] bg-white shadow-[0_20px_60px_rgba(68,31,115,0.07)]">
         <div className="grid border-b border-[#E7DCF2] bg-[#FAF7FD] text-xs font-extrabold uppercase tracking-[.14em] md:grid-cols-2">
           <div className="flex items-center gap-2 px-6 py-4 text-[#9B3B5A] md:border-r md:border-[#E7DCF2]">
             <XCircle className="size-4 shrink-0"/> El viejo desgaste (Pizarra 2D y Comandos Lentos)
           </div>
           <div className="flex items-center gap-2 bg-[#F2E8FF] px-6 py-4 text-[#5F2AB8]">
             <CheckCircle2 className="size-4 shrink-0 text-[#198768]"/> El Nuevo Vehículo (Método Pizarra Viva IA™ en tu USB)
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
         <p className="mt-5 text-base leading-8 text-[#685879]">Tratar de explicar poliedros, secciones o volúmenes con líneas punteadas en 2D es agotador para ti y confuso para tus alumnos. En mis clases utilizo <strong className="text-[#34204B]">Sólidos Geométricos</strong> para girar el cuerpo en 3D en tiempo real, abrir su desarrollo plano con un clic y guiar la práctica sin gastar un solo minuto peleando con la perspectiva en la pizarra.</p>
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

   {/* BLOQUE 6: EL MECANISMO ÚNICO ("INYECCIÓN DE PLANTILLAS EN ESPAÑOL") + CRONOGRAMA DE 15 MINUTOS */}
   <section id="metodo" className="border-y border-[#E9DDF3] bg-[#F4EDFD] px-5 py-24 sm:px-7">
     <div className="mx-auto max-w-7xl">
       <Heading
         eyebrow="El Mecanismo Único · Método Pizarra Viva IA™ por Inyección de Plantillas"
         title="Si sabes mandar un WhatsApp y copiar y pegar en Word, ya tienes el 100% de la habilidad técnica necesaria."
         body="Olvídate de cursos teóricos de tecnología o de aprender código. Nuestro método funciona en español cotidiano, usa Inteligencia Artificial gratuita y descarga tus visualizadores listos para funcionar sin internet en cualquier salón."
       />
       <div className="mt-11 grid gap-5 lg:grid-cols-3">
         {steps.map(({n,time,title,desc,outcome,icon:Icon,image})=><article key={n} className="flex flex-col overflow-hidden rounded-[26px] border border-[#E2D5EF] bg-white shadow-[0_8px_30px_rgba(65,29,100,0.04)]"><div className="aspect-[16/9] w-full overflow-hidden bg-[#F2EAFA]"><img src={image} alt={`Etapa ${n}: ${title}`} loading="lazy" decoding="async" className="size-full object-cover transition-transform duration-500 hover:scale-105"/></div><div className="flex flex-1 flex-col p-7"><div className="flex items-center justify-between"><span className="flex size-12 items-center justify-center rounded-xl bg-[#EDE1FC] text-[#6634CB]"><Icon className="size-6"/></span><span className="rounded-full bg-[#F4ECFF] px-3 py-1 font-mono text-xs font-extrabold text-[#6D39C8]">{time}</span></div><span className="mt-7 text-xs font-extrabold tracking-[.2em] text-[#9A70C8]">PASO {n}</span><h3 className="mt-2 font-display text-2xl font-bold text-[#322048]">{title}</h3><p className="mt-3 flex-1 text-sm leading-7 text-[#6F607C]">{desc}</p><p className="mt-6 border-t border-[#EEE5F5] pt-4 text-sm font-semibold text-[#443150]"><Check className="mr-2 inline size-4 text-[#20846D]"/>{outcome}</p></div></article>)}
       </div>

       {/* CRONOGRAMA DE IMPLEMENTACIÓN EN 15 MINUTOS + PORTABILIDAD USB OFFLINE */}
       <div className="mt-12 rounded-[28px] border border-[#DCC8F2] bg-white p-7 shadow-[0_14px_40px_rgba(78,35,128,0.06)] sm:p-9">
         <div className="flex flex-col justify-between gap-4 border-b border-[#EFE6F8] pb-6 lg:flex-row lg:items-center">
           <div>
             <p className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[.15em] text-[#7338C6]">
               <Timer className="size-4"/> Cronograma real · ¿Qué pasa hoy mismo apenas entras por US$9?
             </p>
             <h3 className="mt-2 font-display text-2xl font-bold text-[#2B1941] sm:text-3xl">
               De cero a tu primera clase interactiva en tu USB en 15 minutos
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
         eyebrow="Más tiempo libre, mejor reputación y salto de S/ 25 a S/ 80+ por hora"
         title="Lo que empieza ahorrándote horas de pizarra termina multiplicando el valor de cada hora de tu trabajo."
         body="Tanto si dictas 40 horas en colegio estatal o privado, como si enseñas en academia preuniversitaria, universidad o das clases particulares por las tardes, este sistema te coloca en el 1% de docentes más cotizados."
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
           ['1. Fin del «Domingo Negro» y Noches en Vela','Apaga tu computadora a las 7:00 PM en vez de quedarte hasta medianoche cuadrando gráficas. Cada visualizador que generas queda guardado en tu biblioteca personal para reutilizarlo año tras año.'],
           ['2. De S/ 25/h a S/ 60–80+/h en Clases Particulares','Rompe la guerra de precios contra estudiantes universitarios. Cuando el padre de familia ve que tu clase incluye simuladores propios en 2D y 3D que su hijo sí entiende, paga tu tarifa premium sin dudar.'],
           ['3. Liderazgo en tu Institución y Activos Propios','Brilla en las observaciones de aula frente al director o coordinador académico llevando tus propios simuladores en tu USB, y abre la puerta a comercializar tus recursos digitales a otros colegas.']
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
           body="Voy a serte totalmente sincero: a mí tampoco me interesaba «aprender a crear aplicaciones» por hobby. Yo buscaba una salida al desgaste físico de la pizarra y una forma de hacer valer mejor mi tiempo y mi experiencia."
         />
         <div className="mt-6 grid gap-3.5 sm:grid-cols-2">
           {[
             ['1. El hartazgo en la pizarra','Estaba cansado de perder tiempo y garganta dibujando gráficos que borraba a los 5 minutos, lidiando con el desorden del salón y frustrado porque un dibujo plano en 2D no podía moverse.'],
             ['2. El descubrimiento sin código','Descubrí cómo inyectar plantillas precisas en español dentro de la IA gratuita para que construyera mis visualizadores matemáticos en 60 segundos sin pelear con GeoGebra ni saber programar.'],
             ['3. El alivio inmediato en clase','Llevé mis herramientas en mi USB sin depender del internet del colegio. Dejé de darle la espalda al salón y mis estudiantes pasaron del miedo a decir: «¡Profe, ahora sí lo vi clarito!».'],
             ['4. El salto económico','Padres de familia, colegas e instituciones vieron la diferencia y empezaron a pagarme mucho mejor por mis clases y por desarrollarles recursos. Hoy te entrego ese mismo atajo por solo US$9.']
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
           ¿Para quién es (y para quién NO es) este sistema de US$9?
         </h2>
       </div>
       <div className="mt-10 grid gap-6 md:grid-cols-2">
         <div className="rounded-[26px] border border-[#CBE8DF] bg-[#F5FBF8] p-7">
           <h3 className="flex items-center gap-2.5 font-display text-xl font-bold text-[#155E4B]">
             <CheckCircle2 className="size-6 shrink-0 text-[#198768]"/> SÍ es para ti si…
           </h3>
           <ul className="mt-5 space-y-3.5 text-sm leading-7 text-[#2D4D43]">
             {[
               'Eres profesor de matemáticas (Secundaria, Preuniversitario, Universidad o clases particulares) y quieres dejar de desgastar tu hombro y tu garganta dibujando 15 veces lo mismo.',
               'En tu colegio no hay buen internet y necesitas recursos que puedas llevar en tu memoria USB y abrir sin conexión en cualquier televisor o proyector.',
               'No te interesa volverte programador ni perder tiempo con comandos de GeoGebra: quieres plantillas copiar-y-pegar y 10 apps ya listas para usar mañana a las 8:00 AM.',
               'Te motiva recuperar tus noches y domingos libres, brillar en las observaciones de aula y cobrar S/ 60 a S/ 80+ la hora en tus clases particulares.'
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
               'Buscas un curso teórico de programación informática de 6 meses o quieres aprender código desde cero.',
               'Disfrutas quedarte hasta las 11:30 PM los domingos peleando con ecuaciones y gráficos estáticos que borrarás en 5 minutos.',
               'Prefieres seguir compitiendo por precio a S/ 20 la hora en clases particulares enseñando exactamente igual que todos.',
               'No estás dispuesto a invertir 15 minutos copiando y pegando una plantilla en español para ahorrarte cientos de horas en el año.'
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

   {/* BLOQUE 10: GRAND SLAM OFFER STACK INTENCIONAL (US$197 -> US$9) + 3 ORDER BUMPS EN CHECKOUT */}
   <section id="inscripcion" className="px-5 py-24 sm:px-7">
     <div className="mx-auto max-w-6xl">
       <div className="mx-auto text-center">
         <p className="inline-flex items-center gap-1.5 rounded-full border border-[#D8C2EF] bg-[#F6EEFF] px-4 py-1.5 text-xs font-extrabold uppercase tracking-[.15em] text-[#7137C2]">
           <Sparkles className="size-3.5"/> Oferta de Entrada · Valor Real US$197 → Hoy Solo US$9 (Ahorras US$188)
         </p>
         <h2 className="mt-4 font-display text-[clamp(2.2rem,4.5vw,3.5rem)] font-bold tracking-[-.06em] text-[#2C1A43]">Con lo que te cuestan 2 cajas de plumones (o 1 sola hora de clase particular), instalas tu fábrica de pizarras vivas 2D y 3D</h2>
         <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#6F607C]">Cada entregable y cada bono gratuito han sido diseñados intencionalmente para que tengas todo resuelto en 15 minutos —incluso si en tu aula no hay internet—.</p>
       </div>

       <div className="mt-10 grid overflow-hidden rounded-[28px] border border-[#E0D0ED] bg-white shadow-[0_25px_70px_rgba(70,35,113,.09)] lg:grid-cols-[1.12fr_.88fr]">
         <div className="p-7 sm:p-10">
           <p className="inline-flex items-center gap-2 rounded-full bg-[#EFE4FD] px-4 py-2 text-xs font-bold text-[#7139C6]"><Sparkles className="size-4"/> Stack Intencional · Todo lo que recibes hoy por US$9</p>
           <h3 className="mt-5 font-display text-2xl font-bold text-[#2D1945] sm:text-3xl">El Kit «Pizarra Viva IA™» + 2 Bonos Destructores de Objeciones</h3>

           <div className="mt-6 space-y-3.5">
             {valueStack.map(({title,objectionKilled,desc,value,isBonus})=>(
               <div key={title} className={`rounded-2xl border p-4 ${isBonus?'border-[#DFC6F7] bg-[#FAF5FF]':'border-[#EAE0F3] bg-white'}`}>
                 <div className="flex flex-wrap items-start justify-between gap-2">
                   <h4 className="flex items-center gap-2 font-display text-sm font-extrabold text-[#2F1B44]">
                     {isBonus ? <Gift className="size-4 shrink-0 text-[#9B35C8]"/> : <CheckCircle2 className="size-4 shrink-0 text-[#178568]"/>}
                     <span>{title}</span>
                   </h4>
                   <span className="shrink-0 rounded-full bg-[#F2EAFA] px-2.5 py-0.5 font-mono text-xs font-extrabold text-[#6E37C5]">Valor: {value}</span>
                 </div>
                 <p className="mt-1 pl-6 text-[11px] font-bold text-[#7A3EC8]">{objectionKilled}</p>
                 <p className="mt-1 pl-6 text-xs leading-6 text-[#685877]">{desc}</p>
               </div>
             ))}
           </div>

           <div className="mt-6 overflow-hidden rounded-2xl border border-[#E6D8F1] bg-[#FAF7FD] p-2.5 sm:p-3.5 shadow-sm">
             <img src="/workshop/bundle-kit-taller-docente.webp" alt="Kit digital completo Pizarra Viva IA para ahorrar tiempo en clases de matemáticas y llevar en USB sin internet" loading="lazy" decoding="async" className="aspect-[4/3] w-full rounded-xl object-cover shadow-sm"/>
             <p className="mt-2.5 flex items-center justify-center gap-1.5 text-center text-[11px] font-bold text-[#7A45C4]">
               <HardDrive className="size-3.5 shrink-0"/> Incluye: 3 Generadores Maestros + Clonador de Retos + Guía USB Sin Internet + 10 Apps Listas
             </p>
           </div>

           <p className="mt-5 border-t border-[#EFE5F4] pt-4 text-xs leading-6 text-[#82738D]">Nota transparente: este acceso inicial de US$9 te entrega el sistema completo de plantillas y tus primeros simuladores listos para el aula. Si deseas exámenes listos en Word o la bóveda de 50 apps pre-creadas, puedes añadirlos abajo en tu orden.</p>
         </div>

         <div className="flex flex-col justify-between border-t border-[#EDE1F5] bg-gradient-to-br from-[#F6EFFF] to-[#FFF6FA] p-7 sm:p-10 lg:border-l lg:border-t-0">
           <div>
             <div className="flex items-center justify-between">
               <p className="text-xs font-bold uppercase tracking-[.15em] text-[#8754C4]">Paso 1 · Tu Kit Principal Hoy</p>
               <span className="rounded-full bg-[#E5F7F0] px-3 py-1 text-[11px] font-extrabold text-[#14795D]">AHORRAS 95% HOY</span>
             </div>
             <div className="mt-3 rounded-2xl border border-[#E5D5F2] bg-white/95 p-4 shadow-sm">
               <div className="flex items-center justify-between text-xs font-semibold text-[#7A6889]">
                 <span>Valor total (3 Módulos + 2 Bonos):</span>
                 <span className="font-mono text-sm font-bold line-through text-[#B55279]">US$197.00</span>
               </div>
               <div className="mt-1.5 flex items-center justify-between text-xs font-semibold text-[#178568]">
                 <span>Beca de entrada al ecosistema:</span>
                 <span className="font-mono text-xs font-extrabold">− US$188.00</span>
               </div>
               <div className="mt-2.5 flex items-baseline justify-between border-t border-[#EFE6F7] pt-2.5">
                 <span className="text-xs font-extrabold uppercase tracking-wider text-[#38214E]">Acceso base hoy:</span>
                 <span className="font-display text-2xl font-extrabold text-[#178568]">US$9.00</span>
               </div>
             </div>

             {/* PASO 2: ORDER BUMPS INTENCIONALES EN EL CHECKOUT */}
             <div className="mt-6">
               <p className="text-xs font-extrabold uppercase tracking-[.14em] text-[#6E36C4]">
                 ⚡ Paso 2 (Opcional) · Personaliza tu orden con 1 clic:
               </p>
               <p className="mt-1 text-[11px] leading-5 text-[#6D5C7E]">
                 Marca solo si deseas sumar alguno de estos aceleradores exclusivos de lanzamiento a tu pedido:
               </p>
               <div className="mt-3 space-y-2.5">
                 {orderBumps.map(bump=>{
                   const checked=selectedBumps.includes(bump.id);
                   return (
                     <label
                       key={bump.id}
                       className={`block cursor-pointer rounded-2xl border-2 border-dashed p-3.5 transition ${
                         checked
                           ? 'border-[#178568] bg-[#F2FBF8] shadow-sm'
                           : 'border-[#D7C2EC] bg-white/90 hover:border-[#9B63E0]'
                       }`}
                     >
                       <div className="flex items-start gap-2.5">
                         <input
                           type="checkbox"
                           checked={checked}
                           onChange={()=>toggleBump(bump.id)}
                           className="mt-1 size-4 shrink-0 accent-[#178568]"
                         />
                         <div className="min-w-0 flex-1">
                           <div className="flex flex-wrap items-center justify-between gap-1">
                             <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#7A3EC8]">{bump.tag}</span>
                             <span className="rounded-full bg-[#ECFBF5] px-2 py-0.5 font-mono text-xs font-extrabold text-[#14795D]">+US${bump.priceUsd}</span>
                           </div>
                           <p className="mt-1 font-display text-xs font-bold leading-5 text-[#2C1942]">{bump.title}</p>
                           <p className="mt-1 text-[11px] font-semibold text-[#8E3967]">{bump.painSolved}</p>
                           <p className="mt-1 text-[11px] leading-5 text-[#675776]">{bump.desc}</p>
                         </div>
                       </div>
                     </label>
                   );
                 })}
               </div>
             </div>

             <div className="mt-6 flex items-baseline justify-between rounded-2xl border border-[#DFC9F2] bg-white px-4 py-3">
               <div>
                 <span className="block text-[11px] font-bold uppercase tracking-wider text-[#6D5B7F]">Total a abonar hoy:</span>
                 <span className="text-[11px] text-[#178568]">
                   {selectedBumps.length===0
                     ? 'Kit Principal Pizarra Viva IA™ (Pago único)'
                     : `Kit Principal (US$9) + ${selectedBumps.length} complemento(s)`}
                 </span>
               </div>
               <div className="font-display text-3xl font-extrabold text-[#2D1945]">
                 US${totalUsd} <span className="text-xs font-semibold text-[#7C6B89]">USD</span>
               </div>
             </div>

             <div className="mt-5">
               <PeruCheckoutButton
                 label={
                   selectedBumps.length===0
                     ? '¡Quiero ahorrar tiempo y evolucionar mis clases · US$9!'
                     : `¡Quiero mi Kit + ${selectedBumps.length} complemento(s) · US$${totalUsd}!`
                 }
               />
             </div>
             <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-[11px] font-semibold text-[#6F5D80]">
               <span className="inline-flex items-center gap-1"><Lock className="size-3.5 text-[#178568]"/> Pago Único (Sin mensualidades)</span>
               <span>·</span>
               <span>⚡ Acceso Inmediato 24/7</span>
             </div>
           </div>

           {/* CAJA DE GARANTÍA BLINDADA DE 14 DÍAS ANTI-RIESGO */}
           <div className="mt-6 space-y-3 border-t border-[#E6D8F2] pt-5">
             <div className="rounded-2xl border border-[#CBE8DF] bg-[#F5FBF8] p-4 text-xs leading-6 text-[#2C4E44] shadow-sm">
               <div className="flex items-center gap-2 font-display text-sm font-extrabold text-[#145E4B]">
                 <ShieldCheck className="size-5 shrink-0 text-[#178568]"/>
                 <span>Garantía Incondicional de 14 Días «Victoria en 15 Minutos»</span>
               </div>
               <p className="mt-1.5">
                 Entra hoy por US$9, descarga las 10 aplicaciones listas para tu USB y prueba las plantillas copiar-y-pegar durante 14 días. Si no logras tener tu primer visualizador funcionando en 15 minutos o no te ahorra horas de pizarra en tu primera semana, te devolvemos el 100% de tu dinero sin preguntas.
               </p>
             </div>
           </div>
         </div>
       </div>
       <div className="mx-auto mt-8 max-w-3xl"><WaitlistForm/></div>
     </div>
   </section>

   {/* BLOQUE 11: PREGUNTAS FRECUENTES INTENCIONALES (REBATEN LAS 7 OBJECIONES FORENSES) */}
   <section id="faq" className="border-t border-[#E8DFF2] bg-[#F8F4FD] px-5 py-24 sm:px-7">
     <div className="mx-auto max-w-3xl">
       <Heading eyebrow="Cero dudas · Cero excusas técnicas" title="Respuestas directas a lo que todo profesor de matemáticas pregunta antes de entrar."/>
       <div className="mt-10 space-y-3">{faq.map(([q,a])=><details key={q} className="group rounded-2xl border border-[#E5D9EF] bg-white p-5 open:border-[#C6A6E7]"><summary className="flex list-none items-center justify-between gap-3 font-bold text-[#332146] [&::-webkit-details-marker]:hidden">{q}<ChevronDown className="size-5 shrink-0 text-[#8D53C5] transition group-open:rotate-180"/></summary><p className="mt-3 text-sm leading-7 text-[#6F617B]">{a}</p></details>)}</div>
     </div>
   </section>

   {/* BLOQUE 12: CIERRE DE ENCRUCIJADA (EL LUNES A LAS 8:00 AM) */}
   <section className="px-5 py-20 text-center sm:px-7">
     <div className="mx-auto max-w-4xl">
       <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#763AC5]">El próximo lunes a las 8:00 AM tienes dos caminos frente al salón</p>
       <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.35rem)] font-bold leading-tight tracking-[-.055em] text-[#29193F]">
         Menos tiempo escribiendo y dibujando en la pizarra.<br/>
         <span className="text-[#713BC9]">Más tiempo guiando el aprendizaje, cuidando tu garganta y cotizándote mejor como docente.</span>
       </h2>
       <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#695879]">
         Puedes seguir entrando al aula a darle la espalda al grupo, repetir el mismo dibujo 15 veces por semana y quedarte hasta las 11:30 PM haciendo fichas… o puedes invertir <strong className="text-[#2B1840]">US$9 hoy</strong> (lo que cuestan dos cajas de plumones), llevar tus pizarras vivas en tu USB sin internet y convertirte en el profesor que todos respetan, entienden y recomiendan.
       </p>
       <a href="#inscripcion" className="mt-8 inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#6630CB] to-[#C33FA1] px-8 py-4.5 text-base font-extrabold text-white shadow-[0_15px_32px_rgba(104,50,208,.25)] transition hover:scale-[1.01] hover:opacity-95 sm:text-lg">
         ¡Sí, quiero ahorrar tiempo en pizarra y elevar mis clases · US$9! <ArrowRight className="size-5"/>
       </a>
       <p className="mt-3 text-xs font-semibold text-[#7A6889]">Pago único de US$9 (Valor real US$197) · Funciona sin internet en tu USB · Garantía de 14 días</p>
     </div>
   </section>
  </main>
  <footer className="border-t border-[#E4D9EF] bg-white px-5 py-9 pb-24 sm:pb-9"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-xs leading-6 text-[#7D6D8A] sm:flex-row"><p>© 2026 · Matemáticas × IA · Menos pizarra estática, más impacto, tiempo libre y crecimiento para el docente</p><a href="/privacidad" className="font-semibold hover:underline">Privacidad</a><p>Contacto: <a href="mailto:xavier@cabellosalirrosas.com" className="underline">xavier@cabellosalirrosas.com</a></p></div></footer>
  <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between border-t border-[#E0D2ED] bg-white/95 px-4 py-3 shadow-[0_-8px_25px_rgba(66,33,95,.1)] sm:hidden"><span className="font-display text-sm font-extrabold text-[#352047]">Pizarras Vivas en tu USB <span className="text-[#7640C9]">· US$9</span></span><a href="#inscripcion" className="rounded-lg bg-[#6832D0] px-4 py-3 text-xs font-bold text-white">Empezar hoy</a></div>
 </div>;
}
