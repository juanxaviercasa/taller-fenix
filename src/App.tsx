import { useMemo, useState } from 'react';
import {
  ArrowRight, ArrowUpRight, BadgeCheck, BookOpen, Check, CheckCircle2, ChevronDown,
  Clock3, Code2, ExternalLink, GraduationCap, Lightbulb, Monitor,
  MousePointer2, Rocket, ShieldCheck, Sparkles, Video, WandSparkles
} from 'lucide-react';
import { PeruCheckoutButton } from './components/PeruCheckoutButton';

type Project = {
  title: string;
  description: string;
  category: 'Negocios' | 'Educación' | 'Simulación';
  image: string;
  url: string;
  skill: string;
  mark: string;
};

const projects: Project[] = [
  {
    title: 'Todo Lima',
    description: 'Directorio para explorar y comparar negocios y servicios.',
    category: 'Negocios',
    image: 'todo-lima.webp',
    url: 'https://todolima.com/',
    skill: 'Búsqueda, información y navegación',
    mark: 'TL',
  },
  {
    title: 'Herramientas para Pymes',
    description: 'Colección de utilidades para cálculos y operaciones de negocios.',
    category: 'Negocios',
    image: 'herramientas-pymes.webp',
    url: 'https://nubeparapymes.online/herramientas/',
    skill: 'Interfaces y lógica interactiva',
    mark: 'PY',
  },
  {
    title: 'Mundos Simulados',
    description: 'Laboratorio visual para experimentar con fenómenos físicos.',
    category: 'Simulación',
    image: 'mundos-simulados.webp',
    url: 'https://mundossimulados.online/',
    skill: 'Simulación y visualización',
    mark: 'MS',
  },
  {
    title: 'Funciones Lab',
    description: 'Aprendizaje visual de funciones, gráficas y ejercicios.',
    category: 'Educación',
    image: 'funciones-lab.webp',
    url: 'https://funciones.sistemazenit.com/',
    skill: 'Gráficas y retroalimentación',
    mark: 'FL',
  },
  {
    title: 'GeoTransform Pro',
    description: 'Exploración de transformaciones geométricas sobre una pizarra.',
    category: 'Simulación',
    image: 'transformaciones-geometricas.webp',
    url: 'https://transformacionesgeometricas.sistemazenit.com/',
    skill: 'Canvas e interacción',
    mark: 'GT',
  },
  {
    title: 'Test vocacional RALE',
    description: 'Plataforma de orientación y evaluación para postulantes.',
    category: 'Educación',
    image: 'rale-test-vocacional.webp',
    url: 'https://raletest.sistemazenit.com/',
    skill: 'Formularios y flujos de evaluación',
    mark: 'RV',
  },
];

const steps = [
  {
    number: '01',
    icon: Lightbulb,
    title: 'De la idea a un plan claro',
    description: 'Define qué hará tu herramienta, para quién es y cómo pedirle a la IA una primera versión útil.',
    result: 'Una instrucción inicial bien estructurada.',
  },
  {
    number: '02',
    icon: Code2,
    title: 'De la instrucción a una app',
    description: 'Construye una interfaz funcional, revisa los resultados y aprende a reconocer y corregir errores habituales.',
    result: 'Una miniaplicación para probar.',
  },
  {
    number: '03',
    icon: Rocket,
    title: 'De tu computadora a internet',
    description: 'Prepara tu repositorio y conoce el flujo para publicar en un servicio con plan gratuito, dentro de sus límites.',
    result: 'Un camino reproducible para publicar.',
  },
];

const faqs: [string, string][] = [
  ['¿Necesito saber programar?', 'No necesitas dominar un lenguaje para comenzar. Te explicaré el proceso paso a paso, pero sí tendrás que leer instrucciones, comprobar los resultados y dedicar tiempo a practicar.'],
  ['¿Vamos a construir una aplicación móvil?', 'La primera edición se enfoca en una herramienta web que también pueda abrirse en un teléfono. No incluye publicación de aplicaciones nativas en App Store o Google Play.'],
  ['¿Qué construiré exactamente?', 'Trabajaremos una miniaplicación interactiva de alcance introductorio: interfaz, entradas, cálculos o lógica simple, revisión de errores y ruta de publicación. No prometemos construir un SaaS completo durante esta sesión.'],
  ['¿Cuándo será la sesión y cómo recibiré el acceso?', 'La primera edición está prevista en vivo. La fecha, la vía de acceso y las condiciones de la grabación se confirmarán antes de habilitar el cobro.'],
  ['¿Debo pagar hosting, IA o dominio?', 'Para el ejercicio se priorizan herramientas y planes gratuitos, sujetos a sus límites. Algunas funciones, servicios de IA o dominios personalizados pueden generar costes adicionales.'],
  ['¿Por qué cuesta US$9?', 'Es el precio de introducción para validar este entrenamiento. El importe final en soles para compradores de Perú se mostrará con claridad antes de pagar.'],
  ['¿Ya puedo pagar con Yape o Mercado Pago?', 'La integración está preparada, pero los cobros siguen desactivados mientras se valida la cuenta. Cuando esté habilitado, verás las formas de pago disponibles en la pantalla segura de Mercado Pago. Yape depende de su habilitación.'],
  ['¿Hay garantía de resultados?', 'Aprenderás un proceso práctico y podrás seguirlo a tu ritmo. El resultado final depende del ejercicio realizado, tu participación y las condiciones de las herramientas. No prometemos ingresos ni resultados comerciales.'],
];

function Logo() {
  return <a href="#inicio" className="inline-flex items-center gap-2.5 font-display text-lg font-bold tracking-tight text-white" aria-label="Fénix, volver al inicio">
    <span aria-hidden="true" className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-fuchsia-600/20"><Sparkles className="size-5" /></span>
    Fénix<span className="text-fuchsia-300">.</span>
  </a>;
}

function SectionTitle({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return <div className="mx-auto mb-9 max-w-3xl text-center sm:mb-12">
    <p className="mb-3 text-xs font-bold uppercase tracking-[0.23em] text-fuchsia-300">{eyebrow}</p>
    <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">{title}</h2>
    {body && <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-300">{body}</p>}
  </div>;
}

function ExampleApplication() {
  const [items, setItems] = useState(3);
  const [unit, setUnit] = useState(120);
  const total = items * unit;
  return <div className="overflow-hidden rounded-3xl border border-white/15 bg-slate-900/95 shadow-[0_28px_90px_rgba(7,4,32,0.7)]">
    <div className="flex items-center justify-between border-b border-white/10 bg-slate-950 px-4 py-3">
      <div className="flex items-center gap-1.5" aria-hidden="true">
        <span className="size-2.5 rounded-full bg-rose-400/80" />
        <span className="size-2.5 rounded-full bg-amber-400/80" />
        <span className="size-2.5 rounded-full bg-emerald-400/80" />
      </div>
      <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-400"><Monitor className="size-3.5" /> Ejemplo interactivo · pruébalo</span>
      <span className="font-mono text-[10px] text-emerald-300">DEMO</span>
    </div>
    <div className="grid gap-5 p-5 sm:p-7">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-violet-600/30 text-violet-200"><Code2 className="size-5" /></div>
        <div>
          <p className="text-base font-bold text-white">Cotizador interactivo</p>
          <p className="text-xs text-slate-400">Una pequeña herramienta, un resultado real</p>
        </div>
      </div>
      <label className="grid gap-2 text-sm text-slate-200">
        <span className="flex items-center justify-between"><span>Cantidad de servicios</span><strong className="font-mono text-fuchsia-200">{items}</strong></span>
        <input type="range" min="1" max="10" step="1" value={items} onChange={event => setItems(Number(event.target.value))} className="w-full accent-fuchsia-500" aria-label="Cantidad de servicios"/>
      </label>
      <label className="grid gap-2 text-sm text-slate-200">
        <span className="flex items-center justify-between"><span>Precio referencial por servicio</span><strong className="font-mono text-fuchsia-200">S/{unit}</strong></span>
        <input type="range" min="40" max="400" step="20" value={unit} onChange={event => setUnit(Number(event.target.value))} className="w-full accent-fuchsia-500" aria-label="Precio referencial por servicio"/>
      </label>
      <div aria-live="polite" className="flex items-end justify-between gap-2 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
        <div>
          <p className="text-xs text-slate-300">Presupuesto estimado</p>
          <p className="mt-1 font-display text-3xl font-bold text-white sm:text-4xl">S/{total.toLocaleString('es-PE')}</p>
        </div>
        <span className="rounded-lg bg-emerald-400/15 p-2 text-emerald-300"><CheckCircle2 className="size-5"/></span>
      </div>
      <p className="flex items-start gap-2 text-xs leading-5 text-slate-400"><MousePointer2 className="mt-0.5 size-3.5 shrink-0 text-fuchsia-300" /> Modifica los controles. Esta es una demostración funcional creada para explicar el tipo de proyecto introductorio, no una captura simulada de un cliente.</p>
    </div>
  </div>;
}

function ProjectCard({ project }: { project: Project }) {
  return <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] transition-colors hover:border-fuchsia-300/35 hover:bg-white/[0.06]">
    <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10 bg-gradient-to-br from-violet-950 via-slate-900 to-fuchsia-950">
      <div className="absolute inset-0 flex flex-col items-start justify-end p-5">
        <span className="mb-auto rounded-lg border border-white/15 bg-white/10 p-2 font-mono font-bold text-fuchsia-100">{project.mark}</span>
        <p className="text-lg font-bold text-white">{project.title}</p>
        <p className="mt-1 text-xs text-slate-300">Proyecto documentado</p>
      </div>
      <img
        src={'/projects/captures/' + project.image}
        alt={'Captura documentada de ' + project.title}
        loading="lazy"
        decoding="async"
        onError={event => { event.currentTarget.style.display = 'none'; }}
        className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.025]"
      />
    </div>
    <div className="flex flex-1 flex-col gap-3 p-5">
      <span className="text-xs font-semibold uppercase tracking-wider text-fuchsia-300">{project.category}</span>
      <h3 className="font-display text-xl font-semibold text-white">{project.title}</h3>
      <p className="flex-1 text-sm leading-6 text-slate-300">{project.description}</p>
      <p className="text-xs text-slate-400"><strong className="font-semibold text-slate-200">Lo interesante:</strong> {project.skill}</p>
      <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 self-start text-sm font-semibold text-fuchsia-200 underline-offset-4 hover:underline">
        Explorar proyecto <ExternalLink className="size-4" />
      </a>
    </div>
  </article>;
}

function PortraitPlaceholder() {
  return <div className="relative mx-auto flex aspect-[4/5] w-full max-w-[350px] flex-col items-center justify-center overflow-hidden rounded-3xl border border-dashed border-fuchsia-300/45 bg-gradient-to-br from-violet-950 via-slate-900 to-fuchsia-950 p-6 text-center">
    <div className="absolute -top-10 -right-10 size-40 rounded-full bg-fuchsia-400/10 blur-3xl" />
    <div className="mb-5 flex size-24 items-center justify-center rounded-3xl border border-white/15 bg-white/10 font-display text-4xl font-bold text-white">XC</div>
    <p className="text-sm font-semibold text-white">Fotografía real del instructor</p>
    <p className="mt-2 text-xs leading-5 text-slate-300">Espacio reservado para retrato profesional, sin fotografías generadas.</p>
    <p className="mt-5 rounded-full border border-fuchsia-300/25 px-3 py-1 text-[11px] text-fuchsia-200">Imagen pendiente</p>
  </div>;
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return <details className="group rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-4 open:border-fuchsia-300/25">
    <summary className="flex list-none items-center justify-between gap-4 text-left font-semibold text-white [&::-webkit-details-marker]:hidden">
      {question}
      <ChevronDown className="size-5 shrink-0 text-fuchsia-300 transition-transform group-open:rotate-180"/>
    </summary>
    <p className="mt-3 pr-5 text-sm leading-7 text-slate-300">{answer}</p>
  </details>;
}

export default function App() {
  const [category, setCategory] = useState<'Todos' | Project['category']>('Todos');
  const shownProjects = useMemo(() => category === 'Todos' ? projects : projects.filter(project => project.category === category), [category]);
  const categories = ['Todos', 'Negocios', 'Educación', 'Simulación'] as const;
  return <div id="inicio" className="min-h-screen overflow-x-hidden bg-[#090817] font-sans text-slate-200 selection:bg-fuchsia-500/40">
    <a href="#contenido" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-slate-900 focus:p-4">Saltar al contenido</a>
    <div className="border-b border-white/10 bg-violet-950/35 px-4 py-2 text-center text-xs font-semibold tracking-wide text-violet-100">
      Primera edición · Entrenamiento práctico de Vibe Coding con IA · Precio de introducción US$9
    </div>
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#090817]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-7">
        <Logo/>
        <nav className="hidden items-center gap-7 text-sm text-slate-300 md:flex" aria-label="Navegación principal">
          <a href="#aprendizaje" className="hover:text-white">Qué aprenderás</a>
          <a href="#proyectos" className="hover:text-white">Proyectos</a>
          <a href="#instructor" className="hover:text-white">Tu instructor</a>
          <a href="#preguntas" className="hover:text-white">Preguntas</a>
        </nav>
        <a href="#inscripcion" className="rounded-xl bg-fuchsia-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-fuchsia-500">Ver entrenamiento <ArrowRight className="ml-1 inline size-4"/></a>
      </div>
    </header>

    <main id="contenido">
      <section className="relative overflow-hidden px-5 pb-20 pt-14 sm:px-7 sm:pt-20 lg:pb-28">
        <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-[25%] size-[550px] rounded-full bg-violet-700/15 blur-[125px]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-fuchsia-300/25 bg-fuchsia-400/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-fuchsia-200"><WandSparkles className="size-4"/> Aprender haciendo, no mirando</p>
            <h1 className="max-w-2xl font-display text-[2.55rem] font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
              Tu idea puede convertirse en una <span className="bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-transparent">herramienta web real.</span> Aprende a construirla con IA.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">Un entrenamiento guiado para pasar del primer prompt a una miniaplicación interactiva: construir, probar, corregir y conocer cómo publicarla. Sin tener que empezar por meses de teoría.</p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-200">
              <span className="flex items-center gap-2"><CheckCircle2 className="size-4 text-emerald-400"/> Nivel inicial</span>
              <span className="flex items-center gap-2"><Clock3 className="size-4 text-emerald-400"/> 105 minutos de práctica</span>
              <span className="flex items-center gap-2"><Monitor className="size-4 text-emerald-400"/> Proyecto web guiado</span>
            </div>
            <div className="mt-9 flex max-w-xl flex-col items-start gap-3">
              <a href="#inscripcion" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-fuchsia-900/30 transition hover:-translate-y-0.5 sm:w-auto">
                Conocer el entrenamiento de US$9 <ArrowRight className="size-5"/>
              </a>
              <p className="text-xs leading-5 text-slate-400">Sin VSL obligatoria. Fecha de la primera edición y apertura de pagos por confirmar.</p>
            </div>
          </div>
          <div className="relative">
            <div aria-hidden="true" className="pointer-events-none absolute -inset-6 rounded-[40px] bg-fuchsia-500/10 blur-3xl"/>
            <div className="relative">
              <ExampleApplication/>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-5 py-7 sm:px-7">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="max-w-md font-semibold text-white">La diferencia no está solo en pedirle código a la IA. Está en saber qué hacer con el resultado.</p>
          <div className="flex flex-wrap justify-center gap-3 text-xs font-medium text-slate-200">
            <span className="rounded-full border border-white/15 px-3 py-1.5">Planificar</span>
            <span className="rounded-full border border-white/15 px-3 py-1.5">Construir</span>
            <span className="rounded-full border border-white/15 px-3 py-1.5">Corregir</span>
            <span className="rounded-full border border-white/15 px-3 py-1.5">Publicar</span>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-7 sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-fuchsia-300">El problema real</p>
            <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl">La IA te crea una pantalla. <span className="text-fuchsia-300">¿Y después?</span></h2>
            <p className="mt-5 text-base leading-8 text-slate-300">Aparecen errores, los botones no hacen lo esperado o no sabes cómo compartir tu proyecto. Ahí es donde muchos tutoriales rápidos se quedan cortos.</p>
            <p className="mt-4 text-base leading-8 text-slate-300">Este entrenamiento no promete convertirte en desarrollador profesional en una tarde. Te enseña un proceso sencillo para avanzar con criterio, incluso si estás empezando.</p>
          </div>
          <div className="space-y-3">
            {[
              ['No solo prompts', 'Aprende a describir funcionalidades y comprobar si realmente funcionan.'],
              ['No solo interfaces bonitas', 'Conecta entradas, decisiones y resultados en una herramienta interactiva.'],
              ['No solo una demo en pantalla', 'Conoce los pasos de prueba y publicación para compartir tu trabajo.'],
            ].map(([title, text]) => <div key={title} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-5">
              <CheckCircle2 className="mt-1 size-5 shrink-0 text-emerald-400"/>
              <div><h3 className="font-semibold text-white">{title}</h3><p className="mt-1 text-sm leading-6 text-slate-300">{text}</p></div>
            </div>)}
          </div>
        </div>
      </section>

      <section id="aprendizaje" className="border-y border-white/10 bg-slate-900/35 px-5 py-20 sm:px-7 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Una ruta, tres etapas" title="Del primer prompt al proyecto que puedes enseñar" body="El taller de entrada está pensado para un resultado alcanzable. Los sistemas complejos y aplicaciones con backend se trabajan en formaciones posteriores."/>
          <div className="grid gap-5 md:grid-cols-3">
            {steps.map(({number, icon: Icon, title, description, result}) => <article key={number} className="rounded-3xl border border-white/10 bg-[#100d29] p-7">
              <div className="flex items-center justify-between"><div className="flex size-12 items-center justify-center rounded-xl bg-violet-500/15 text-violet-200"><Icon className="size-6"/></div><span className="font-mono text-2xl font-bold text-white/20">{number}</span></div>
              <h3 className="mt-6 font-display text-xl font-bold text-white">{title}</h3>
              <p className="mt-3 min-h-28 text-sm leading-7 text-slate-300">{description}</p>
              <div className="mt-5 border-t border-white/10 pt-4 text-sm"><Check className="mr-2 inline size-4 text-emerald-400"/><span className="text-slate-200">{result}</span></div>
            </article>)}
          </div>
        </div>
      </section>

      <section id="proyectos" className="px-5 py-20 sm:px-7 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Prueba antes que promesas" title="No tienes que creerme: explora proyectos publicados" body="Una selección de trabajos documentados en mi portafolio. No son todos parte del taller de US$9: muestran hacia dónde puede evolucionar tu aprendizaje."/>
          <div className="mb-7 flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Filtrar proyectos">
            {categories.map(option => <button key={option} type="button" onClick={() => setCategory(option)} aria-pressed={category === option} className={category === option ? 'rounded-full bg-fuchsia-600 px-4 py-2 text-sm font-semibold text-white' : 'rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-300 hover:border-fuchsia-400/40 hover:text-white'}>{option}</button>)}
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shownProjects.map(project => <ProjectCard key={project.title} project={project}/>)}
          </div>
          <div className="mt-8 text-center">
            <p className="mb-4 text-xs text-slate-400">Capturas reales archivadas el 23 de octubre de 2026. Los enlaces externos pueden cambiar.</p>
            <a href="https://xavier.cabellosalirrosas.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-fuchsia-300/35 px-5 py-3 text-sm font-semibold text-fuchsia-200 hover:bg-fuchsia-400/10">
              Explorar el portafolio completo <ExternalLink className="size-4"/>
            </a>
          </div>
        </div>
      </section>

      <section id="instructor" className="border-y border-white/10 bg-slate-900/35 px-5 py-20 sm:px-7 sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.42fr_0.58fr]">
          <PortraitPlaceholder/>
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-fuchsia-300">Conoce a quien te enseña</p>
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">Xavier Cabello</h2>
            <p className="mt-2 text-base font-medium text-fuchsia-200">Desarrollo web y educación tecnológica</p>
            <p className="mt-5 text-base leading-8 text-slate-300">Comparto lo que aprendo construyendo aplicaciones y recursos interactivos. Mis proyectos van desde herramientas para pequeños negocios hasta experiencias educativas y simulaciones visuales.</p>
            <p className="mt-4 text-base leading-8 text-slate-300">En Fénix quiero enseñarte un método que puedas repetir: pensar el problema, dirigir a la IA, revisar su trabajo y publicar con responsabilidad.</p>
            <a href="https://xavier.cabellosalirrosas.com/" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 font-semibold text-fuchsia-200 hover:underline">
              Ver trayectoria y proyectos <ArrowUpRight className="size-4"/>
            </a>
          </div>
        </div>
      </section>

      <section id="inscripcion" className="px-5 py-20 sm:px-7 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <SectionTitle eyebrow="Tu primer paso" title="Empieza por una habilidad que puedas practicar" body="Una oferta introductoria diseñada para validar el programa y ayudarte a experimentar con una aplicación web de alcance realista."/>
          <div className="grid overflow-hidden rounded-3xl border border-fuchsia-300/30 bg-gradient-to-br from-[#1b123b] to-[#0d0b20] shadow-[0_24px_80px_rgba(128,27,160,0.14)] lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-7 sm:p-10">
              <p className="inline-flex items-center gap-2 rounded-full bg-fuchsia-400/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-fuchsia-200"><GraduationCap className="size-4"/> Entrenamiento inicial</p>
              <h3 className="mt-5 font-display text-3xl font-bold text-white">De la idea a tu primera herramienta web con IA</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">Enfoque práctico, ejemplos reales y una metodología que podrás seguir usando en proyectos futuros.</p>
              <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-200">
                {[
                  '105 minutos de entrenamiento práctico y espacio de preguntas previsto.',
                  'Ejercicio guiado de una herramienta web interactiva.',
                  'Método de prompts, comprobación de resultados y corrección de errores.',
                  'Ruta para publicar con GitHub y Cloudflare según el proyecto.',
                  'Materiales y condiciones de acceso confirmados antes de abrir pagos.',
                ].map(item => <li key={item} className="flex items-start gap-3"><Check className="mt-1 size-4 shrink-0 text-emerald-400"/>{item}</li>)}
              </ul>
            </div>
            <div className="flex flex-col justify-center border-t border-white/10 bg-slate-950/40 p-7 sm:p-10 lg:border-l lg:border-t-0">
              <p className="text-sm font-semibold text-fuchsia-200">Precio introductorio</p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-display text-6xl font-bold tracking-tight text-white">US$9</span>
                <span className="text-sm text-slate-400">pago único</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">Para compradores de Perú, el cobro se procesará en soles mediante Mercado Pago cuando la integración esté habilitada.</p>
              <div className="mt-7">
                <PeruCheckoutButton label="Quiero mi entrenamiento · US$9"/>
              </div>
              <p className="mt-6 flex items-start gap-2 text-xs leading-6 text-slate-400"><ShieldCheck className="mt-1 size-4 shrink-0"/> No hay cobros habilitados todavía. La fecha y la modalidad definitiva se comunicarán antes de abrir inscripciones pagadas.</p>
            </div>
          </div>
          <div className="mx-auto mt-6 grid max-w-4xl gap-3 sm:grid-cols-3">
            <span className="flex items-center justify-center gap-2 text-center text-xs text-slate-400"><Monitor className="size-4 text-violet-300"/> Aprendes desde tu computadora</span>
            <span className="flex items-center justify-center gap-2 text-center text-xs text-slate-400"><BookOpen className="size-4 text-violet-300"/> Método aplicable a nuevos proyectos</span>
            <span className="flex items-center justify-center gap-2 text-center text-xs text-slate-400"><BadgeCheck className="size-4 text-violet-300"/> Sin promesas de ingresos</span>
          </div>
        </div>
      </section>

      <section id="preguntas" className="border-t border-white/10 bg-slate-900/30 px-5 py-20 sm:px-7 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <SectionTitle eyebrow="Sin letra pequeña" title="Preguntas antes de comenzar" body="Preferimos que sepas exactamente qué incluye —y qué no incluye— esta primera edición."/>
          <div className="space-y-3">{faqs.map(([question, answer]) => <FaqItem key={question} question={question} answer={answer}/>)}</div>
        </div>
      </section>

      <section className="px-5 py-20 text-center sm:px-7">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-fuchsia-300"><Video className="size-4"/> El inicio de una ruta de aprendizaje</p>
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">Tu próxima idea merece salir del papel.</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-300">Empieza por una herramienta pequeña, entiéndela y aprende a mostrarla al mundo.</p>
          <a href="#inscripcion" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-fuchsia-600 px-7 py-4 font-bold text-white hover:bg-fuchsia-500">Ver el entrenamiento de US$9 <ArrowRight className="size-5"/></a>
        </div>
      </section>
    </main>

    <footer className="border-t border-white/10 bg-[#070611] px-5 py-8 sm:px-7">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-xs leading-6 text-slate-400 sm:flex-row sm:items-center">
        <p>© 2026 Fénix · Entrenamiento de Vibe Coding con IA</p>
        <p>Políticas y datos de contacto: se publicarán antes de activar pagos.</p>
        <a href="https://xavier.cabellosalirrosas.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white">Portafolio del instructor <ArrowUpRight className="inline size-3.5"/></a>
      </div>
    </footer>
  </div>;
}
