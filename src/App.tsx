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
  return <a href="#inicio" className="inline-flex items-center gap-2.5" aria-label="Fénix 357, volver al inicio">
    <img src="/fenix357-mark.svg" alt="" width="46" height="46" className="size-11 drop-shadow-[0_8px_16px_rgba(111,44,218,0.18)]" />
    <span className="flex flex-col leading-none">
      <span className="font-display text-xl font-extrabold tracking-[-0.035em] text-[#281447] sm:text-2xl">FÉNIX <span className="bg-gradient-to-r from-[#6934D8] to-[#DE4A9E] bg-clip-text text-transparent">357</span></span>
      <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.15em] text-[#73588B] sm:text-[10px]">Laboratorio de creación con IA</span>
    </span>
  </a>;
}

function SectionTitle({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return <div className="mx-auto mb-9 max-w-3xl text-center sm:mb-12">
    <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.19em] text-[#7A36C5]">{eyebrow}</p>
    <h2 className="font-display text-3xl font-extrabold leading-[1.14] tracking-[-0.035em] text-[#281447] sm:text-4xl md:text-5xl">{title}</h2>
    {body && <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#66577B]">{body}</p>}
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
  return <article className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-[#E4D7F0] bg-white shadow-[0_10px_38px_rgba(72,32,115,0.065)] transition-all hover:-translate-y-1 hover:border-[#BC91E4] hover:shadow-[0_20px_60px_rgba(82,38,135,0.15)]">
    <div className="relative aspect-[16/10] overflow-hidden border-b border-[#E5D7EE] bg-gradient-to-br from-[#E9D8FF] via-[#FDE6F5] to-[#FFD9B7]">
      <div className="absolute inset-0 flex flex-col items-start justify-end p-5">
        <span className="mb-auto rounded-lg border border-white/70 bg-white/75 p-2 font-mono font-bold text-[#6D32DA]">{project.mark}</span>
        <p className="text-lg font-bold text-[#281447]">{project.title}</p>
        <p className="mt-1 text-xs text-[#6D597D]">Proyecto documentado</p>
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
    <div className="flex flex-1 flex-col gap-3 p-6">
      <span className="text-xs font-bold uppercase tracking-wider text-[#8040C9]">{project.category}</span>
      <h3 className="font-display text-xl font-bold text-[#281447]">{project.title}</h3>
      <p className="flex-1 text-sm leading-6 text-[#66577B]">{project.description}</p>
      <p className="text-xs text-[#6F617C]"><strong className="font-bold text-[#3B2750]">Lo interesante:</strong> {project.skill}</p>
      <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 self-start text-sm font-bold text-[#6D32DA] underline-offset-4 hover:underline">
        Explorar proyecto <ExternalLink className="size-4" />
      </a>
    </div>
  </article>;
}

function PortraitPlaceholder() {
  return <div className="relative mx-auto flex aspect-[4/5] w-full max-w-[350px] flex-col items-center justify-center overflow-hidden rounded-[32px] border-2 border-dashed border-[#C1A3E7] bg-gradient-to-br from-[#FCF8FF] via-[#F0E3FF] to-[#FFE6DC] p-7 text-center shadow-[0_20px_70px_rgba(112,45,171,0.08)]">
    <div className="absolute -top-10 -right-10 size-48 rounded-full bg-[#F887BE]/25 blur-3xl" />
    <img src="/fenix357-mark.svg" alt="" width="110" height="110" className="mb-6 size-28 drop-shadow-xl" />
    <p className="font-display text-lg font-bold text-[#281447]">Tu instructor, sin filtros</p>
    <p className="mt-2 max-w-[250px] text-sm leading-6 text-[#65547B]">Aquí irá una fotografía real de Xavier. La identidad de la marca ya está lista.</p>
    <p className="mt-6 rounded-full border border-[#C8A2E5] bg-white/60 px-4 py-1.5 text-xs font-bold text-[#7B36C6]">Foto pendiente de subir</p>
  </div>;
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return <details className="group rounded-2xl border border-[#E1D4EE] bg-white px-6 py-5 shadow-[0_3px_18px_rgba(78,36,110,0.035)] open:border-[#B990DF]">
    <summary className="flex list-none items-center justify-between gap-4 text-left font-bold text-[#281447] [&::-webkit-details-marker]:hidden">
      {question}
      <ChevronDown className="size-5 shrink-0 text-[#7737C6] transition-transform group-open:rotate-180"/>
    </summary>
    <p className="mt-3 pr-5 text-sm leading-7 text-[#66577B]">{answer}</p>
  </details>;
}

export default function App() {
  const [category, setCategory] = useState<'Todos' | Project['category']>('Todos');
  const shownProjects = useMemo(() => category === 'Todos' ? projects : projects.filter(project => project.category === category), [category]);
  const categories = ['Todos', 'Negocios', 'Educación', 'Simulación'] as const;
  return <div id="inicio" className="min-h-screen overflow-x-hidden bg-[#FCFAFF] font-sans text-[#38234D] selection:bg-fuchsia-500/40">
    <a href="#contenido" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-slate-900 focus:p-4">Saltar al contenido</a>
    <div className="border-b border-[#E2D4EE] bg-[#F1E5FF] px-4 py-2 text-center text-xs font-semibold tracking-wide text-[#603388]">
      FÉNIX 357 START · Creación de aplicaciones con IA · Precio de lanzamiento US$9
    </div>
    <header className="sticky top-0 z-40 border-b border-[#E2D4EE] bg-white/90 shadow-[0_6px_30px_rgba(88,46,142,0.05)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-7">
        <Logo/>
        <nav className="hidden items-center gap-7 text-sm text-[#66577B] md:flex" aria-label="Navegación principal">
          <a href="#aprendizaje" className="hover:text-[#281447]">Qué aprenderás</a>
          <a href="#proyectos" className="hover:text-[#281447]">Proyectos</a>
          <a href="#instructor" className="hover:text-[#281447]">Tu instructor</a>
          <a href="#preguntas" className="hover:text-[#281447]">Preguntas</a>
        </nav>
        <a href="#inscripcion" className="rounded-xl bg-[#6D32DA] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#5622B8]">Ver entrenamiento <ArrowRight className="ml-1 inline size-4"/></a>
      </div>
    </header>

    <main id="contenido">
      <section className="brand-hero relative overflow-hidden px-5 pb-20 pt-14 sm:px-7 sm:pt-20 lg:pb-28">
        <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-[25%] size-[550px] rounded-full bg-[#BC89F8]/30 blur-[125px]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-fuchsia-300/25 bg-fuchsia-400/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#7736B2]"><WandSparkles className="size-4"/> FÉNIX 357 START · Aprender haciendo</p>
            <h1 className="max-w-2xl font-display text-[2.55rem] font-bold leading-[1.08] tracking-tight text-[#281447] sm:text-5xl lg:text-[3.5rem]">
              Tu idea puede convertirse en una <span className="bg-gradient-to-r from-[#7435DA] via-[#B836BE] to-[#EA6376] bg-clip-text text-transparent">herramienta web real.</span> Aprende a construirla con IA.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#66577B] sm:text-lg">Una experiencia práctica de FÉNIX 357 para pasar del primer prompt a una miniaplicación interactiva: construir, probar, corregir y conocer cómo publicarla. Sin tener que empezar por meses de teoría.</p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#38234D]">
              <span className="flex items-center gap-2"><CheckCircle2 className="size-4 text-[#198468]"/> Nivel inicial</span>
              <span className="flex items-center gap-2"><Clock3 className="size-4 text-[#198468]"/> 105 minutos de práctica</span>
              <span className="flex items-center gap-2"><Monitor className="size-4 text-[#198468]"/> Proyecto web guiado</span>
            </div>
            <div className="mt-9 flex max-w-xl flex-col items-start gap-3">
              <a href="#inscripcion" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#6733D3] to-[#CF3BA7] px-8 py-4 text-base font-bold text-white shadow-xl shadow-fuchsia-900/30 transition hover:-translate-y-0.5 sm:w-auto">
                Ver qué incluye FÉNIX 357 START · US$9 <ArrowRight className="size-5"/>
              </a>
              <p className="text-xs leading-5 text-[#6D607F]">Sin VSL obligatoria. Fecha de la primera edición y apertura de pagos por confirmar.</p>
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

      <section className="border-y border-[#E2D4EE] bg-white/80 px-5 py-7 sm:px-7">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="max-w-md font-semibold text-[#281447]">Aprender con IA no es copiar un prompt. Es saber convertir una idea en algo que funciona.</p>
          <div className="flex flex-wrap justify-center gap-3 text-xs font-medium text-[#38234D]">
            <span className="rounded-full border border-[#DBCAEC] px-3 py-1.5">Planificar</span>
            <span className="rounded-full border border-[#DBCAEC] px-3 py-1.5">Construir</span>
            <span className="rounded-full border border-[#DBCAEC] px-3 py-1.5">Corregir</span>
            <span className="rounded-full border border-[#DBCAEC] px-3 py-1.5">Publicar</span>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-7 sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#803CC2]">El problema real</p>
            <h2 className="font-display text-3xl font-bold leading-tight text-[#281447] sm:text-4xl">La IA puede crear una pantalla. <span className="text-[#803CC2]">¿Y después?</span></h2>
            <p className="mt-5 text-base leading-8 text-[#66577B]">Aparecen errores, los botones no hacen lo esperado o no sabes cómo compartir tu proyecto. Ahí es donde muchos tutoriales rápidos se quedan cortos.</p>
            <p className="mt-4 text-base leading-8 text-[#66577B]">FÉNIX 357 START no promete convertirte en desarrollador profesional en una tarde. Te enseña un proceso sencillo para avanzar con criterio, incluso si estás empezando.</p>
          </div>
          <div className="space-y-3">
            {[
              ['No solo prompts', 'Aprende a describir funcionalidades y comprobar si realmente funcionan.'],
              ['No solo interfaces bonitas', 'Conecta entradas, decisiones y resultados en una herramienta interactiva.'],
              ['No solo una demo en pantalla', 'Conoce los pasos de prueba y publicación para compartir tu trabajo.'],
            ].map(([title, text]) => <div key={title} className="flex items-start gap-4 rounded-2xl border border-[#E2D4EE] bg-white p-5">
              <CheckCircle2 className="mt-1 size-5 shrink-0 text-[#198468]"/>
              <div><h3 className="font-semibold text-[#281447]">{title}</h3><p className="mt-1 text-sm leading-6 text-[#66577B]">{text}</p></div>
            </div>)}
          </div>
        </div>
      </section>

      <section id="aprendizaje" className="border-y border-[#E2D4EE] bg-[#F4EEFF] px-5 py-20 sm:px-7 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Una ruta, tres etapas" title="Del primer prompt al proyecto que puedes enseñar" body="El taller de entrada está pensado para un resultado alcanzable. Los sistemas complejos y aplicaciones con backend se trabajan en formaciones posteriores."/>
          <div className="grid gap-5 md:grid-cols-3">
            {steps.map(({number, icon: Icon, title, description, result}) => <article key={number} className="rounded-3xl border border-[#E2D4EE] bg-white p-7">
              <div className="flex items-center justify-between"><div className="flex size-12 items-center justify-center rounded-xl bg-[#EEE0FF] text-[#6636AC]"><Icon className="size-6"/></div><span className="font-mono text-2xl font-bold text-[#281447]/20">{number}</span></div>
              <h3 className="mt-6 font-display text-xl font-bold text-[#281447]">{title}</h3>
              <p className="mt-3 min-h-28 text-sm leading-7 text-[#66577B]">{description}</p>
              <div className="mt-5 border-t border-[#E2D4EE] pt-4 text-sm"><Check className="mr-2 inline size-4 text-[#198468]"/><span className="text-[#38234D]">{result}</span></div>
            </article>)}
          </div>
        </div>
      </section>

      <section id="proyectos" className="px-5 py-20 sm:px-7 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Prueba antes que promesas" title="No tienes que creerme: explora proyectos publicados" body="Una selección de trabajos documentados en mi portafolio. No son todos parte del taller de US$9: muestran hacia dónde puede evolucionar tu aprendizaje."/>
          <div className="mb-7 flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Filtrar proyectos">
            {categories.map(option => <button key={option} type="button" onClick={() => setCategory(option)} aria-pressed={category === option} className={category === option ? 'rounded-full bg-[#6D32DA] px-4 py-2 text-sm font-semibold text-white' : 'rounded-full border border-[#DBCAEC] bg-white/5 px-4 py-2 text-sm font-semibold text-[#66577B] hover:border-fuchsia-400/40 hover:text-[#281447]'}>{option}</button>)}
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shownProjects.map(project => <ProjectCard key={project.title} project={project}/>)}
          </div>
          <div className="mt-8 text-center">
            <p className="mb-4 text-xs text-[#6D607F]">Capturas reales archivadas el 23 de octubre de 2026. Los enlaces externos pueden cambiar.</p>
            <a href="https://xavier.cabellosalirrosas.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-fuchsia-300/35 px-5 py-3 text-sm font-semibold text-[#7736B2] hover:bg-fuchsia-400/10">
              Explorar el portafolio completo <ExternalLink className="size-4"/>
            </a>
          </div>
        </div>
      </section>

      <section id="instructor" className="border-y border-[#E2D4EE] bg-[#F4EDFD] px-5 py-20 sm:px-7 sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.42fr_0.58fr]">
          <PortraitPlaceholder/>
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#803CC2]">Conoce a quien te enseña</p>
            <h2 className="font-display text-3xl font-bold text-[#281447] sm:text-4xl">Xavier Cabello</h2>
            <p className="mt-2 text-base font-medium text-[#7736B2]">Desarrollo web y educación tecnológica</p>
            <p className="mt-5 text-base leading-8 text-[#66577B]">Comparto lo que aprendo construyendo aplicaciones y recursos interactivos. Mis proyectos van desde herramientas para pequeños negocios hasta experiencias educativas y simulaciones visuales.</p>
            <p className="mt-4 text-base leading-8 text-[#66577B]">En Fénix quiero enseñarte un método que puedas repetir: pensar el problema, dirigir a la IA, revisar su trabajo y publicar con responsabilidad.</p>
            <a href="https://xavier.cabellosalirrosas.com/" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 font-semibold text-[#7736B2] hover:underline">
              Ver trayectoria y proyectos <ArrowUpRight className="size-4"/>
            </a>
          </div>
        </div>
      </section>

      <section id="inscripcion" className="px-5 py-20 sm:px-7 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <SectionTitle eyebrow="Tu primer paso" title="Empieza por una habilidad que puedas practicar" body="Una oferta introductoria diseñada para validar el programa y ayudarte a experimentar con una aplicación web de alcance realista."/>
          <div className="grid overflow-hidden rounded-3xl border border-fuchsia-300/30 bg-gradient-to-br from-[#1b123b] to-[#FAEEFF] shadow-[0_24px_80px_rgba(128,27,160,0.11)] lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-7 sm:p-10">
              <p className="inline-flex items-center gap-2 rounded-full bg-[#EFE1FF] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#7736B2]"><GraduationCap className="size-4"/> Entrenamiento inicial</p>
              <h3 className="mt-5 font-display text-3xl font-bold text-[#281447]">De la idea a tu primera herramienta web con IA</h3>
              <p className="mt-4 text-sm leading-7 text-[#66577B]">Enfoque práctico, ejemplos reales y una metodología que podrás seguir usando en proyectos futuros.</p>
              <ul className="mt-6 space-y-3 text-sm leading-6 text-[#38234D]">
                {[
                  '105 minutos de entrenamiento práctico y espacio de preguntas previsto.',
                  'Ejercicio guiado de una herramienta web interactiva.',
                  'Método de prompts, comprobación de resultados y corrección de errores.',
                  'Ruta para publicar con GitHub y Cloudflare según el proyecto.',
                  'Materiales y condiciones de acceso confirmados antes de abrir pagos.',
                ].map(item => <li key={item} className="flex items-start gap-3"><Check className="mt-1 size-4 shrink-0 text-[#198468]"/>{item}</li>)}
              </ul>
            </div>
            <div className="flex flex-col justify-center border-t border-[#E2D4EE] bg-[#F4E9FF] p-7 sm:p-10 lg:border-l lg:border-t-0">
              <p className="text-sm font-semibold text-[#7736B2]">Precio introductorio</p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-display text-6xl font-bold tracking-tight text-[#281447]">US$9</span>
                <span className="text-sm text-[#6D607F]">pago único</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-[#66577B]">Para compradores de Perú, el cobro se procesará en soles mediante Mercado Pago cuando la integración esté habilitada.</p>
              <div className="mt-7">
                <PeruCheckoutButton label="Quiero mi entrenamiento · US$9"/>
              </div>
              <p className="mt-6 flex items-start gap-2 text-xs leading-6 text-[#6D607F]"><ShieldCheck className="mt-1 size-4 shrink-0"/> No hay cobros habilitados todavía. La fecha y la modalidad definitiva se comunicarán antes de abrir inscripciones pagadas.</p>
            </div>
          </div>
          <div className="mx-auto mt-6 grid max-w-4xl gap-3 sm:grid-cols-3">
            <span className="flex items-center justify-center gap-2 text-center text-xs text-[#6D607F]"><Monitor className="size-4 text-violet-300"/> Aprendes desde tu computadora</span>
            <span className="flex items-center justify-center gap-2 text-center text-xs text-[#6D607F]"><BookOpen className="size-4 text-violet-300"/> Método aplicable a nuevos proyectos</span>
            <span className="flex items-center justify-center gap-2 text-center text-xs text-[#6D607F]"><BadgeCheck className="size-4 text-violet-300"/> Sin promesas de ingresos</span>
          </div>
        </div>
      </section>

      <section id="preguntas" className="border-t border-[#E2D4EE] bg-[#F6F0FF] px-5 py-20 sm:px-7 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <SectionTitle eyebrow="Sin letra pequeña" title="Preguntas antes de comenzar" body="Preferimos que sepas exactamente qué incluye —y qué no incluye— esta primera edición."/>
          <div className="space-y-3">{faqs.map(([question, answer]) => <FaqItem key={question} question={question} answer={answer}/>)}</div>
        </div>
      </section>

      <section className="px-5 py-20 text-center sm:px-7">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#803CC2]"><Video className="size-4"/> El inicio de una ruta de aprendizaje</p>
          <h2 className="font-display text-3xl font-bold text-[#281447] sm:text-4xl">Las ideas que construyes te hacen avanzar.</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#66577B]">Empieza por una herramienta pequeña, entiéndela y aprende a mostrarla al mundo.</p>
          <a href="#inscripcion" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#6D32DA] px-7 py-4 font-bold text-white hover:bg-[#5622B8]">Ver el entrenamiento de US$9 <ArrowRight className="size-5"/></a>
        </div>
      </section>
    </main>

    <footer className="border-t border-[#E2D4EE] bg-[#F2EBFC] px-5 py-8 pb-24 sm:px-7 sm:pb-8">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-xs leading-6 text-[#6D607F] sm:flex-row sm:items-center">
        <p>© 2026 FÉNIX 357 · Creación con inteligencia artificial</p>
        <p>Políticas y datos de contacto: se publicarán antes de activar pagos.</p>
        <a href="https://xavier.cabellosalirrosas.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#281447]">Portafolio del instructor <ArrowUpRight className="inline size-3.5"/></a>
      </div>
    </footer>
  </div>;
}
