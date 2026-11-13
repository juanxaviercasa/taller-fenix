import { lazy, Suspense, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import HeroMathPreview from './components/HeroMathPreview';
import { SkoolCheckoutButton } from './components/SkoolCheckoutButton';
import { WaitlistForm } from './components/WaitlistForm';

const MathStudio = lazy(() => import('./components/MathStudio'));
const OFFICIAL_PRICE = 'US$9';

type ProjectCategory = 'Matemáticas y Ciencias' | 'Automatización y Soluciones';
type FilterOption = 'Todos' | ProjectCategory;

interface ProjectItem {
  name: string;
  image: string;
  category: ProjectCategory;
  highlight: string;
  description: string;
  url: string;
}

const projects: ProjectItem[] = [
  {
    name: 'Funciones Lab',
    image: 'funciones-lab.webp',
    category: 'Matemáticas y Ciencias',
    highlight: 'Gráficas que se mueven en vivo',
    description:
      'Cambias los valores y la gráfica responde al instante. Tus alumnos ven qué le pasa a la función sin que tengas que dibujarla y borrarla en la pizarra.',
    url: 'https://funciones.sistemazenit.com/',
  },
  {
    name: 'Transformaciones Geométricas',
    image: 'transformaciones-geometricas.webp',
    category: 'Matemáticas y Ciencias',
    highlight: 'Geometría en movimiento + fichas',
    description:
      'Traslaciones, rotaciones y simetrías paso a paso, listas para proyectar en clase y con material para imprimir.',
    url: 'https://transformacionesgeometricas.sistemazenit.com/',
  },
  {
    name: 'Sólidos Geométricos',
    image: 'solidos-geometricos.webp',
    category: 'Matemáticas y Ciencias',
    highlight: 'Cuerpos en 3D y sus desarrollos',
    description:
      'Giras cada sólido en 3D y abres su desarrollo plano con un clic. Incluye teoría y retos para trabajar en clase.',
    url: 'https://solidosgeometricos.sistemazenit.com/',
  },
  {
    name: 'Mundos Simulados',
    image: 'mundos-simulados.webp',
    category: 'Matemáticas y Ciencias',
    highlight: 'Simulaciones de física',
    description:
      'Simulaciones para explicar fenómenos físicos y sistemas que cambian en el tiempo, listas para proyectar.',
    url: 'https://mundossimulados.online/',
  },
  {
    name: 'Test vocacional RALE',
    image: 'rale-test-vocacional.webp',
    category: 'Automatización y Soluciones',
    highlight: 'Un test que se corrige solo',
    description:
      'Los estudiantes responden en línea y los resultados salen automáticamente, sin corregir nada a mano.',
    url: 'https://raletest.sistemazenit.com/',
  },
  {
    name: 'Herramientas para Pymes',
    image: 'herramientas-pymes.webp',
    category: 'Automatización y Soluciones',
    highlight: 'Calculadoras y utilidades',
    description: 'Herramientas web prácticas para el trabajo diario de pequeños negocios.',
    url: 'https://nubeparapymes.online/herramientas/',
  },
  {
    name: 'Todo Lima',
    image: 'todo-lima.webp',
    category: 'Automatización y Soluciones',
    highlight: 'Directorio web en funcionamiento',
    description: 'Un directorio digital de Lima, publicado y funcionando. Lo mismo que aprendes sirve también fuera del aula.',
    url: 'https://todolima.com/',
  },
];

const steps = [
  {
    number: '01',
    image: '/docentes/ruta-01-idea-guardada-a-app.webp',
    alt: 'Cuaderno con el boceto de una app educativa junto a la misma app funcionando en pantalla',
    title: 'Eliges tu idea',
    description: 'Defines qué problema quieres resolver, para quién es y qué tiene que hacer tu app.',
  },
  {
    number: '02',
    image: '/docentes/ruta-02-construccion-ia-sin-codigo.webp',
    alt: 'Educador construyendo su app con ayuda de la inteligencia artificial',
    title: 'La construyes con IA',
    description: 'Le pides a la IA cada parte, revisas lo que te entrega y lo ajustas hasta que quede como quieres.',
  },
  {
    number: '03',
    image: '/docentes/ruta-03-automatizacion-tiempo-libre.webp',
    alt: 'Escritorio ordenado con un panel de evaluaciones ya resueltas automáticamente',
    title: 'La usas en tu clase o en tu trabajo',
    description:
      'La llevas a tus alumnos, la compartes con tu equipo o la usas para dejar de hacer a mano lo que hoy te quita horas.',
  },
];

const included = [
  'El paso a paso para pasar de tu idea a una app que funciona, aunque nunca hayas programado.',
  'Cómo usar la inteligencia artificial para construir tu app, revisarla y corregirla.',
  'Cómo elegir qué proyecto hacer primero y hasta dónde llegar con la primera versión.',
  'Ideas que sí sirven: desde apps para enseñar matemáticas y ciencias hasta herramientas que automatizan tareas de tu trabajo.',
];

const filterTabs: { id: FilterOption; label: string }[] = [
  { id: 'Todos', label: 'Todas (7)' },
  { id: 'Matemáticas y Ciencias', label: 'Matemáticas y ciencias' },
  { id: 'Automatización y Soluciones', label: 'Automatización' },
];

const FAQ: [string, string][] = [
  [
    '¿Es solo para profesores de matemáticas?',
    'No. Muestro varias apps de matemáticas y ciencias porque son parte de mis proyectos, pero el método sirve para cualquier curso y para cualquier persona que trabaje en educación: tutores, coordinadores, directivos o capacitadores. Puedes hacer simuladores, tests, calculadoras o herramientas para tu día a día.',
  ],
  [
    '¿Necesito saber programar?',
    'No. Empiezas desde cero. Lo que sí necesitas es tu idea y lo que ya sabes de tu curso o de tu trabajo. La IA escribe el código; tú aprendes a dirigirla.',
  ],
  [
    '¿Qué tipo de apps puedo hacer?',
    'Por ejemplo: simuladores para explicar un tema, tests que se corrigen solos, calculadoras o herramientas que te quitan tareas repetitivas. Más arriba tienes 7 ejemplos reales que puedes abrir.',
  ],
  [
    '¿Cuánto cuesta y cómo me inscribo?',
    'US$9, un solo pago. La inscripción será dentro de nuestra comunidad de Skool. Estamos terminando de abrirla: déjanos tu correo o escríbenos y te avisamos.',
  ],
  [
    '¿Por qué aprender contigo?',
    'Porque llevo desde 2023 haciendo esto y tengo apps funcionando que puedes probar ahora mismo. En el taller te ahorro la parte de prueba y error que a mí me tomó años.',
  ],
];

function SectionHeading({ label, title, body }: { label: string; title: string; body?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#43685B]">{label}</p>
      <h2 className="mt-4 font-display text-[clamp(1.95rem,3.7vw,3.35rem)] font-bold leading-[1.13] tracking-[-.055em] text-[#18283C]">
        {title}
      </h2>
      {body && <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#57687B]">{body}</p>}
    </div>
  );
}

function Brand() {
  return (
    <a href="#inicio" className="inline-flex items-center gap-3" aria-label="Sistema Zénit, ir al inicio">
      <span className="flex size-9 items-center justify-center rounded-xl bg-[#183F3C] font-display text-xl font-black text-white">
        Z
      </span>
      <span className="flex flex-col leading-none">
        <strong className="font-display text-[15px] tracking-tight text-[#18283B]">SISTEMA ZÉNIT</strong>
        <span className="mt-1 text-[9px] font-bold uppercase tracking-[.16em] text-[#5B7268]">
          Educación × Inteligencia Artificial
        </span>
      </span>
    </a>
  );
}

function PurchaseCTA({ compact = false }: { compact?: boolean }) {
  return (
    <a
      href="#comprar"
      className={`inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#193F39] font-bold text-white shadow-[0_10px_25px_rgba(25,63,57,.16)] transition hover:bg-[#286957] ${
        compact ? 'px-4 py-2.5 text-xs sm:text-sm' : 'px-7 py-4 text-sm sm:text-base'
      }`}
    >
      Quiero el taller · {OFFICIAL_PRICE} <ArrowRight className="size-5" />
    </a>
  );
}

function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-[#DFEAE3] bg-white shadow-[0_14px_38px_rgba(22,54,42,.06)] transition hover:border-[#9BBFAC]">
      <div className="aspect-[16/10] overflow-hidden border-b border-[#E5EEE8] bg-[#F2F7F4]">
        <img
          src={`/projects/captures/${project.image}`}
          alt={`Captura real de ${project.name}`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.02]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="rounded-full bg-[#EAF4ED] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.1em] text-[#24634F]">
            {project.category}
          </span>
          <span className="text-[11px] font-semibold text-[#5E7469]">{project.highlight}</span>
        </div>
        <h3 className="mt-3 font-display text-xl font-bold leading-snug text-[#1C3442]">{project.name}</h3>
        <p className="mt-2.5 flex-1 text-sm leading-7 text-[#5A6C78]">{project.description}</p>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[#193F39] underline-offset-4 hover:text-[#286F5A] hover:underline"
        >
          Abrir la app <ExternalLink className="size-4" />
        </a>
      </div>
    </article>
  );
}

function InstructorPortrait() {
  return (
    <figure className="mx-auto w-full max-w-[390px] overflow-hidden rounded-[25px] border border-[#C9DBD0] bg-white p-3 shadow-[0_22px_55px_rgba(22,54,42,.09)]">
      <img
        src="/instructor/xavier-cabello.webp"
        width="420"
        height="540"
        loading="lazy"
        decoding="async"
        alt="Juan Xavier Cabello, maestro que crea apps educativas con inteligencia artificial"
        className="aspect-[4/5] w-full rounded-[18px] object-cover object-top"
      />
      <figcaption className="px-3 pb-3 pt-5 text-center">
        <strong className="font-display text-lg text-[#193B38]">Juan Xavier Cabello</strong>
        <p className="mt-1 text-xs text-[#607A6D]">Maestro · Creando apps con IA desde 2023</p>
      </figcaption>
    </figure>
  );
}

export default function App() {
  const [studioOpen, setStudioOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterOption>('Todos');
  const visibleProjects =
    activeFilter === 'Todos' ? projects : projects.filter(project => project.category === activeFilter);
  const eduProjects = visibleProjects.filter(project => project.category === 'Matemáticas y Ciencias');
  const toolProjects = visibleProjects.filter(project => project.category === 'Automatización y Soluciones');

  return (
    <div id="inicio" className="min-h-screen bg-[#F8F9F7] font-sans text-[#1B2D40]">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-white focus:p-3"
      >
        Saltar al contenido
      </a>

      <header className="sticky top-0 z-40 border-b border-[#E5E9E7] bg-[#FBFCFA]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Brand />
          <nav aria-label="Navegación principal" className="hidden items-center gap-7 text-sm font-semibold text-[#4D6072] md:flex">
            <a href="#incluye" className="hover:text-[#176655]">
              Qué aprendes
            </a>
            <a href="#proyectos" className="hover:text-[#176655]">
              Apps reales
            </a>
            <a href="#metodo" className="hover:text-[#176655]">
              Cómo funciona
            </a>
            <a href="#preguntas" className="hover:text-[#176655]">
              Preguntas
            </a>
          </nav>
          <PurchaseCTA compact />
        </div>
      </header>

      <main id="contenido">
        {/* 1. HERO */}
        <section
          id="demostracion"
          className="relative overflow-hidden border-b border-[#E5EAE8] bg-[radial-gradient(ellipse_65%_55%_at_92%_0%,rgba(202,235,216,.48),transparent_70%),linear-gradient(180deg,#F9FBFA_0%,#F4F8F5_100%)] px-5 py-14 sm:px-8 sm:py-20"
        >
          <div className="mx-auto grid max-w-7xl items-center gap-10 xl:grid-cols-[.94fr_1.06fr] xl:gap-14">
            <div className="max-w-2xl">
              <p className="inline-flex flex-wrap items-center gap-2 rounded-full border border-[#DDE9E1] bg-white px-3.5 py-2 text-[10px] font-extrabold uppercase tracking-[.12em] text-[#285F51] sm:text-xs">
                <GraduationCap className="size-4" />
                TALLER PRÁCTICO · IA PARA QUIENES TRABAJAN EN EDUCACIÓN
              </p>
              <h1 className="mt-7 font-display text-[clamp(2.2rem,3.95vw,4rem)] font-bold leading-[1.09] tracking-[-.06em] text-[#18283C]">
                Crea tus propias apps educativas con IA, <span className="text-[#286F5A]">sin saber programar.</span>
              </h1>
              <p className="mt-6 text-base leading-8 text-[#4F6174] sm:text-lg">
                ¿Eres profesor, tutor, coordinador o trabajas en educación y tienes una idea guardada? Un simulador para tu clase, un test para tus alumnos o una herramienta que te ahorre trabajo. Te enseño el paso a paso para hacerla tú mismo con inteligencia artificial, sin pagarle a un programador.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-2.5 text-xs font-semibold text-[#3C5852]">
                <span className="rounded-full border border-[#D4E4DB] bg-white px-3.5 py-2">No necesitas saber programar</span>
                <span className="rounded-full border border-[#D4E4DB] bg-white px-3.5 py-2">Para cualquier curso o área</span>
                <span className="rounded-full border border-[#C6DFD1] bg-[#EBF6EF] px-3.5 py-2 font-bold text-[#1D5543]">
                  {OFFICIAL_PRICE} · pago único
                </span>
              </div>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <PurchaseCTA />
                <a
                  href="#proyectos"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2B665A] underline-offset-4 hover:underline"
                >
                  Ver las 7 apps que hice <ChevronRight className="size-4" />
                </a>
              </div>
              <p className="mt-4 text-xs leading-6 text-[#5E7282]">Las inscripciones abrirán en nuestra comunidad de Skool.</p>
            </div>

            <div className="min-w-0">
              <HeroMathPreview />
              <p className="mt-3 text-center text-xs leading-6 text-[#607384]">
                Este graficador lo hice con el mismo método que enseño. Pruébalo: mueve los controles y mira cómo cambia la gráfica.
              </p>
            </div>
          </div>
        </section>

        {/* 2. EL PROBLEMA Y EL CAMBIO */}
        <section id="problema" className="px-5 py-20 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              label="¿Te suena?"
              title="Sabes exactamente qué herramienta necesitan tus alumnos. Lo que no sabes es cómo hacerla."
              body="Puede ser un simulador para explicar un tema difícil, un examen que se corrija solo o un formato que hoy llenas a mano cada semana. La idea es buena, pero se queda en el cuaderno porque crees que necesitas aprender a programar o contratar a alguien."
            />
            <div className="mt-11 grid gap-5 lg:grid-cols-2">
              <div className="rounded-[24px] border border-[#E1E6EB] bg-white p-6 shadow-sm sm:p-8">
                <div className="overflow-hidden rounded-2xl border border-[#E3E8EE] bg-[#16202C]">
                  <img
                    src="/docentes/dolor-dependencia-madrugada.webp"
                    width="1280"
                    height="720"
                    loading="lazy"
                    decoding="async"
                    alt="Educador trabajando de madrugada frente a bocetos de una app que todavía no puede hacer"
                    className="aspect-video w-full object-cover"
                  />
                </div>
                <p className="mt-6 text-xs font-extrabold uppercase tracking-[.17em] text-[#657489]">Lo que pasa hoy</p>
                <div className="mt-6 space-y-6">
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#26374B]">La idea se queda guardada</h3>
                    <p className="mt-2 text-sm leading-7 text-[#69798C]">
                      Pasan los meses, a veces los años, y la herramienta sigue en tu cabeza porque no sabes por dónde empezar.
                    </p>
                  </div>
                  <div className="border-t border-[#EBEFF1] pt-5">
                    <h3 className="font-display text-lg font-bold text-[#26374B]">Contratar a un programador sale caro</h3>
                    <p className="mt-2 text-sm leading-7 text-[#69798C]">
                      Cotizas, explicas tu idea, esperas semanas y cada cambio vuelve a costar.
                    </p>
                  </div>
                  <div className="border-t border-[#EBEFF1] pt-5">
                    <h3 className="font-display text-lg font-bold text-[#26374B]">Pruebas la IA, pero no terminas nada</h3>
                    <p className="mt-2 text-sm leading-7 text-[#69798C]">
                      Sacas pedazos sueltos por tu cuenta y te quedas a medio camino, sin una app que puedas usar.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border border-[#CBDED2] bg-[#EAF4ED] p-6 shadow-sm sm:p-8">
                <div className="overflow-hidden rounded-2xl border border-[#BAD5C4] bg-white">
                  <img
                    src="/docentes/deseo-soberania-aula.webp"
                    width="1280"
                    height="720"
                    loading="lazy"
                    decoding="async"
                    alt="Educador mostrando a sus alumnos una app que él mismo creó"
                    className="aspect-video w-full object-cover"
                  />
                </div>
                <p className="mt-6 text-xs font-extrabold uppercase tracking-[.17em] text-[#2B6E5D]">Lo que cambia con el taller</p>
                <div className="mt-6 space-y-6">
                  <div>
                    <h3 className="flex items-start gap-2 font-display text-lg font-bold text-[#193C35]">
                      <CheckCircle2 className="mt-1 size-5 shrink-0 text-[#27775D]" />
                      Haces tu app tú mismo
                    </h3>
                    <p className="mt-2 pl-7 text-sm leading-7 text-[#466458]">
                      Aprendes a pedirle a la IA lo que necesitas, revisar lo que te da y corregirlo hasta que funcione como quieres.
                    </p>
                  </div>
                  <div className="border-t border-[#D0E3D7] pt-5">
                    <h3 className="flex items-start gap-2 font-display text-lg font-bold text-[#193C35]">
                      <CheckCircle2 className="mt-1 size-5 shrink-0 text-[#27775D]" />
                      Sigues un camino claro
                    </h3>
                    <p className="mt-2 pl-7 text-sm leading-7 text-[#466458]">
                      Ya no adivinas qué hacer después: avanzas en orden, de la idea a la app funcionando.
                    </p>
                  </div>
                  <div className="border-t border-[#D0E3D7] pt-5">
                    <h3 className="flex items-start gap-2 font-display text-lg font-bold text-[#193C35]">
                      <CheckCircle2 className="mt-1 size-5 shrink-0 text-[#27775D]" />
                      Te ahorras mis años de prueba y error
                    </h3>
                    <p className="mt-2 pl-7 text-sm leading-7 text-[#466458]">
                      Aprendo esto desde 2023. En el taller te paso lo que funciona para que no empieces de cero.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. QUÉ APRENDES */}
        <section id="incluye" className="border-y border-[#E0E8E4] bg-white px-5 py-20 sm:px-8 sm:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
            <div>
              <SectionHeading
                label={`Qué aprendes en el taller · ${OFFICIAL_PRICE}`}
                title="Sales sabiendo cómo hacer esa app que vienes postergando."
                body="Es un taller práctico: trabajas sobre tu propia idea, no sobre ejemplos que no te sirven."
              />
              <ul className="mx-auto mt-9 max-w-2xl space-y-4">
                {included.map(item => (
                  <li key={item} className="flex gap-3 text-sm leading-7 text-[#4E6473]">
                    <Check className="mt-1 size-5 shrink-0 rounded-full bg-[#E4F1E8] p-1 text-[#267754]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-9 text-center lg:text-left">
                <PurchaseCTA />
              </div>
            </div>

            <figure className="overflow-hidden rounded-[26px] border border-[#DAE7DF] bg-[#F6FAF7] p-3 shadow-[0_18px_50px_rgba(22,54,42,.08)]">
              <img
                src="/docentes/taller-ruta-2023-mockup.webp"
                width="1280"
                height="720"
                loading="lazy"
                decoding="async"
                alt="Laptop con apps educativas funcionando junto a un cuaderno con el plan del taller"
                className="aspect-video w-full rounded-2xl object-cover"
              />
              <figcaption className="px-2 pb-2 pt-3 text-center text-xs font-semibold text-[#3B5F52]">
                De la idea en el cuaderno a la app funcionando.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* 4. CÓMO FUNCIONA */}
        <section id="metodo" className="px-5 py-20 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              label="Cómo funciona"
              title="Tres pasos, de la idea a la app"
              body="No empiezas aprendiendo código. Empiezas por un problema real de tu clase o de tu trabajo."
            />
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {steps.map(step => (
                <article
                  key={step.number}
                  className="group flex flex-col overflow-hidden rounded-[24px] border border-[#DCE7E0] bg-white shadow-[0_12px_34px_rgba(22,54,42,.05)]"
                >
                  <div className="aspect-video overflow-hidden border-b border-[#E5EEE8] bg-[#F2F7F4]">
                    <img
                      src={step.image}
                      width="1280"
                      height="720"
                      loading="lazy"
                      decoding="async"
                      alt={step.alt}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <span className="font-display text-4xl font-bold tracking-tight text-[#B5D2C1]">{step.number}</span>
                    <h3 className="mt-4 font-display text-xl font-bold leading-snug text-[#203D39]">{step.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#647487]">{step.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 5. APPS REALES + MATH STUDIO */}
        <section id="proyectos" className="border-y border-[#E0E8E4] bg-white px-5 py-20 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              label="No te lo cuento, te lo muestro"
              title="7 apps que ya hice y están funcionando. Ábrelas y pruébalas."
              body="Unas son para enseñar matemáticas y ciencias; otras automatizan tareas o resuelven problemas fuera del aula. Son el tipo de proyectos que aprenderás a hacer."
            />

            <div role="tablist" aria-label="Filtrar apps por tipo" className="mt-9 flex flex-wrap justify-center gap-2.5">
              {filterTabs.map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={activeFilter === tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition sm:text-sm ${
                    activeFilter === tab.id
                      ? 'bg-[#183F3C] text-white shadow-sm'
                      : 'border border-[#CFE0D6] bg-[#F8FAF8] text-[#2D584B] hover:bg-[#EAF4ED]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {eduProjects.length > 0 && (
              <div className="mt-11">
                <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#286F5A]">Para enseñar matemáticas y ciencias</p>
                <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {eduProjects.map(project => (
                    <ProjectCard key={project.name} project={project} />
                  ))}
                </div>
              </div>
            )}

            {toolProjects.length > 0 && (
              <div className="mt-11">
                <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#286F5A]">
                  Para automatizar tareas y resolver problemas
                </p>
                <div className="mt-5 grid gap-5 md:grid-cols-3">
                  {toolProjects.map(project => (
                    <ProjectCard key={project.name} project={project} />
                  ))}
                </div>
              </div>
            )}

            <div className="mt-12 rounded-[24px] border border-[#CFE0D6] bg-[#F5FAF7] p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-5">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#193F39] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[.12em] text-white">
                      <Sparkles className="size-3.5" /> Pruébalo aquí mismo
                    </span>
                    <span className="rounded-full border border-[#C6DDD0] bg-white px-2.5 py-1 text-[11px] font-bold text-[#2C5C4E]">
                      Secundaria · Preuniversitario · Universidad
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-bold text-[#193B36]">Math Studio: mi laboratorio de gráficas</h3>
                  <p className="mt-2 text-sm leading-7 text-[#536B63]">
                    9 tipos de funciones, las 6 razones trigonométricas y sus inversas, derivadas y sumas de Riemann. Elige el nivel y explora.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStudioOpen(v => !v)}
                  aria-expanded={studioOpen}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#193F39] px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#286957]"
                >
                  {studioOpen ? 'Cerrar Math Studio' : 'Abrir Math Studio'}
                  <ArrowUpRight className="size-4" />
                </button>
              </div>
              {studioOpen && (
                <div className="mt-7" id="studio-completo">
                  <Suspense
                    fallback={
                      <p role="status" className="py-8 text-center text-sm text-[#56746B]">
                        Cargando Math Studio…
                      </p>
                    }
                  >
                    <MathStudio />
                  </Suspense>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 6. QUIÉN TE ENSEÑA */}
        <section id="fundador" className="border-y border-[#DDE6E0] bg-[#EDF4EE] px-5 py-20 sm:px-8 sm:py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[.75fr_1.25fr]">
            <InstructorPortrait />
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.17em] text-[#366F5C]">
                <Users className="size-4" /> Quién te enseña
              </p>
              <h2 className="mt-5 font-display text-[clamp(2rem,3.8vw,3.35rem)] font-bold leading-[1.12] tracking-[-.05em] text-[#1E3938]">
                Un maestro que empezó con la IA en 2023, cuando todo recién comenzaba.
              </h2>
              <p className="mt-7 text-lg leading-9 text-[#40584F]">
                Soy Juan Xavier Cabello. Desde entonces estudio y practico cómo crear apps con inteligencia artificial, y así hice los proyectos que viste arriba. En el camino me equivoqué mucho. Este taller es el atajo: te enseño lo que funciona para que tú no pierdas ese tiempo ni ese dinero.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  className="inline-flex items-center gap-2 rounded-xl border border-[#BED6C7] bg-white px-4 py-3 text-xs font-bold text-[#2B6654] transition hover:bg-[#F6FAF6]"
                  href="https://xavier.cabellosalirrosas.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver mi portafolio <ExternalLink className="size-4" />
                </a>
                <a
                  className="inline-flex items-center gap-2 rounded-xl border border-[#BED6C7] bg-white px-4 py-3 text-xs font-bold text-[#2B6654] transition hover:bg-[#F6FAF6]"
                  href="https://funciones.sistemazenit.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Probar Funciones Lab <ExternalLink className="size-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 7. INSCRIPCIÓN */}
        <section id="comprar" className="bg-[#F8F9F7] px-5 py-20 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              label="Inscripción"
              title={`Todo el taller por ${OFFICIAL_PRICE}.`}
              body="Un solo pago. Te inscribes en nuestra comunidad de Skool."
            />

            <div className="mx-auto mt-12 grid max-w-5xl overflow-hidden rounded-[26px] border border-[#D8E2DC] bg-white shadow-[0_20px_65px_rgba(22,54,42,.08)] lg:grid-cols-[1.08fr_.92fr]">
              <div className="p-7 sm:p-10">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#EDF6F0] px-3 py-2 text-[11px] font-extrabold uppercase tracking-[.12em] text-[#2D7358]">
                  <BookOpen className="size-4" /> Taller práctico de IA para educación
                </div>
                <h3 className="mt-6 font-display text-[clamp(1.6rem,2.5vw,2.3rem)] font-bold leading-[1.18] text-[#203744]">
                  Haz tu primera app educativa con IA, aunque nunca hayas programado.
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#647587]">
                  Para profesores de cualquier curso, tutores, coordinadores, directivos y capacitadores.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl bg-[#F7FAF8] p-4">
                    <p className="text-xs font-bold uppercase tracking-[.12em] text-[#537968]">Qué aprendes</p>
                    <p className="mt-2 text-sm leading-6 text-[#526675]">
                      El paso a paso, cómo usar la IA para construir tu app y cómo elegir tu primer proyecto.
                    </p>
                  </div>
                  <div className="rounded-xl bg-[#F7FAF8] p-4">
                    <p className="text-xs font-bold uppercase tracking-[.12em] text-[#537968]">Para quién</p>
                    <p className="mt-2 text-sm leading-6 text-[#526675]">
                      Cualquier persona que trabaje en educación y tenga una idea por hacer.
                    </p>
                  </div>
                </div>

                <p className="mt-7 rounded-xl border border-[#E5EBE7] bg-[#F8FAF8] p-4 text-xs leading-6 text-[#5E7280]">
                  Aquí aprendes a hacerla tú. No es un servicio donde yo hago la app por ti.
                </p>
              </div>

              <div className="border-t border-[#E2E9E3] bg-[#F0F6F1] p-7 sm:p-10 lg:border-l lg:border-t-0">
                <p className="text-xs font-bold uppercase tracking-[.15em] text-[#537968]">Precio oficial</p>
                <div className="mt-3 flex items-end gap-3">
                  <strong className="font-display text-[clamp(3.3rem,6vw,5.1rem)] font-bold leading-none tracking-[-.09em] text-[#193E36]">
                    {OFFICIAL_PRICE}
                  </strong>
                  <span className="pb-2 text-sm font-semibold text-[#60796A]">pago único</span>
                </div>

                <div className="my-7 border-t border-[#D6E4DA]" />

                <div className="rounded-2xl border border-[#D4E3D9] bg-white p-5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-extrabold uppercase tracking-[.12em] text-[#286F5A]">Inscripción en Skool</p>
                    <span className="rounded-full bg-[#EAF4ED] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#266B56]">
                      Muy pronto
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-[#5D7368]">Estamos terminando de abrir las inscripciones en Skool.</p>
                  <div className="mt-4">
                    <SkoolCheckoutButton />
                  </div>
                </div>

                <p className="mt-5 flex items-start gap-2 text-xs leading-6 text-[#62796C]">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0" />
                  Antes de pagar en Skool verás todas las condiciones del taller.
                </p>
              </div>
            </div>

            <div className="mx-auto mt-8 max-w-5xl">
              <WaitlistForm />
            </div>
          </div>
        </section>

        {/* 8. PARA QUIÉN */}
        <section id="para-quien" className="px-5 py-20 sm:px-8 sm:py-24">
          <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
            <div className="rounded-[24px] border border-[#CBDED2] bg-[#EAF4ED] p-7 sm:p-9">
              <h2 className="font-display text-2xl font-bold text-[#193C35]">Es para ti si...</h2>
              <ul className="mt-6 space-y-4 text-sm leading-7 text-[#466458]">
                <li className="flex gap-3">
                  <Check className="mt-1 size-5 shrink-0 text-[#27775D]" />
                  Trabajas en educación: das clases, haces tutorías, coordinas o capacitas.
                </li>
                <li className="flex gap-3">
                  <Check className="mt-1 size-5 shrink-0 text-[#27775D]" />
                  Tienes una idea de app o herramienta que nunca pudiste hacer porque no sabes programar.
                </li>
                <li className="flex gap-3">
                  <Check className="mt-1 size-5 shrink-0 text-[#27775D]" />
                  Quieres aprender a hacerla tú, en vez de depender de un programador.
                </li>
              </ul>
            </div>

            <div className="rounded-[24px] border border-[#E1E6EB] bg-white p-7 sm:p-9">
              <h2 className="font-display text-2xl font-bold text-[#26374B]">No es para ti si...</h2>
              <ul className="mt-6 space-y-4 text-sm leading-7 text-[#69798C]">
                <li className="flex gap-3">
                  <span className="mt-2 size-2 shrink-0 rounded-full bg-[#9AA8B5]" />
                  Quieres que otra persona haga la app por ti.
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 size-2 shrink-0 rounded-full bg-[#9AA8B5]" />
                  Buscas un curso largo de programación desde cero.
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 size-2 shrink-0 rounded-full bg-[#9AA8B5]" />
                  Esperas resultados sin dedicarle tiempo a tu proyecto.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 9. PREGUNTAS */}
        <section id="preguntas" className="border-t border-[#E0E8E4] bg-white px-5 py-20 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-4xl">
            <SectionHeading label="Preguntas frecuentes" title="Lo que más nos preguntan" />
            <div className="mt-10 divide-y divide-[#E4EBE6] rounded-2xl border border-[#DDE7E0] bg-white">
              {FAQ.map(([question, answer]) => (
                <details key={question} className="group p-5 sm:p-6">
                  <summary className="cursor-pointer list-none pr-8 font-display text-lg font-bold text-[#203D39] marker:hidden">
                    {question}
                    <ChevronRight className="float-right mt-1 size-5 transition group-open:rotate-90" />
                  </summary>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-[#647487]">{answer}</p>
                </details>
              ))}
            </div>
            <div className="mt-10 text-center">
              <PurchaseCTA />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#DFE7E1] bg-white px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5">
          <Brand />
          <div className="flex flex-wrap items-center gap-5 text-xs font-semibold text-[#627486]">
            <a href="/privacidad" className="hover:text-[#245C4B]">
              Privacidad
            </a>
            <a href="mailto:xavier@cabellosalirrosas.com" className="hover:text-[#245C4B]">
              Contacto
            </a>
            <a href="#inicio" className="hover:text-[#245C4B]">
              Volver arriba
            </a>
          </div>
          <p className="text-xs text-[#738195]">© 2026 Sistema Zénit · Apps educativas con IA</p>
        </div>
      </footer>
    </div>
  );
}
