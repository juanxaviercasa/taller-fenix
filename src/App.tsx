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
    highlight: 'Visualización interactiva en tiempo real',
    description:
      'Mueve parámetros y deslizadores en vivo para que tus estudiantes comprendan funciones sin trazar y borrar ejes una y otra vez.',
    url: 'https://funciones.sistemazenit.com/',
  },
  {
    name: 'Transformaciones Geométricas',
    image: 'transformaciones-geometricas.webp',
    category: 'Matemáticas y Ciencias',
    highlight: 'Geometría dinámica + material imprimible',
    description:
      'Explora traslaciones, rotaciones y simetrías paso a paso siguiendo una ruta didáctica lista para proyectar y trabajar en clase.',
    url: 'https://transformacionesgeometricas.sistemazenit.com/',
  },
  {
    name: 'Sólidos Geométricos',
    image: 'solidos-geometricos.webp',
    category: 'Matemáticas y Ciencias',
    highlight: 'Modelos 3D y desarrollos planos',
    description:
      'Gira cuerpos en 3D, abre su red plana en un clic y conecta áreas, volúmenes y retos sin depender de dibujos estáticos en pizarra.',
    url: 'https://solidosgeometricos.sistemazenit.com/',
  },
  {
    name: 'Mundos Simulados',
    image: 'mundos-simulados.webp',
    category: 'Matemáticas y Ciencias',
    highlight: 'Física y sistemas dinámicos en vivo',
    description:
      'Modelos visuales interactivos para explicar fenómenos científicos y sistemas dinámicos capturando la atención de todo el salón.',
    url: 'https://mundossimulados.online/',
  },
  {
    name: 'Test vocacional RALE',
    image: 'rale-test-vocacional.webp',
    category: 'Automatización y Soluciones',
    highlight: 'Evaluaciones y flujos automatizados',
    description:
      'Instrumento web interactivo que automatiza la aplicación y entrega de resultados vocacionales, ahorrando horas de revisión manual.',
    url: 'https://raletest.sistemazenit.com/',
  },
  {
    name: 'Herramientas para Pymes',
    image: 'herramientas-pymes.webp',
    category: 'Automatización y Soluciones',
    highlight: 'Calculadoras y utilidades prácticas',
    description:
      'Suite de herramientas web prácticas construidas con el mismo método para agilizar procesos de trabajo y crear soluciones reales.',
    url: 'https://nubeparapymes.online/herramientas/',
  },
  {
    name: 'Todo Lima',
    image: 'todo-lima.webp',
    category: 'Automatización y Soluciones',
    highlight: 'Plataforma web escalable publicada',
    description:
      'Directorio digital completo que demuestra cómo la misma ruta permite resolver necesidades reales fuera y dentro de tu institución.',
    url: 'https://todolima.com/',
  },
];

const steps = [
  {
    number: '01',
    image: '/docentes/ruta-01-idea-guardada-a-app.webp',
    alt: 'Cuaderno con boceto de aplicación educativa transformándose en una interfaz web interactiva en pantalla',
    title: 'Define la idea que llevabas años guardando',
    description:
      'Aclaras qué problema concreto quieres resolver para tus estudiantes, tu institución o tu sector y trazas el alcance real de tu aplicación sin enredos técnicos.',
  },
  {
    number: '02',
    image: '/docentes/ruta-02-construccion-ia-sin-codigo.webp',
    alt: 'Profesional de la educación dirigiendo la construcción paso a paso de módulos web con inteligencia artificial',
    title: 'Construye con IA paso a paso sin código',
    description:
      'Aplicas la ruta estructurada para dirigir, revisar y ajustar cada pantalla e interacción de tu herramienta web sin depender de un programador externo.',
  },
  {
    number: '03',
    image: '/docentes/ruta-03-automatizacion-tiempo-libre.webp',
    alt: 'Escritorio ordenado con panel de herramientas y evaluaciones educativas automatizadas completadas',
    title: 'Ponla en marcha para enseñar o automatizar',
    description:
      'Llevas tu aplicación web interactiva al aula, a tu equipo o a tu industria: desde simuladores didácticos hasta evaluaciones y flujos que ahorran horas de trabajo.',
  },
];

const included = [
  'Ruta práctica paso a paso para convertir tu idea educativa en una aplicación web o herramienta interactiva real, aunque no sepas programar.',
  'Estrategia probada desde 2023 que condensa años de aprendizajes, pruebas y errores para ahorrar tiempo de vida y dinero.',
  'Criterios, flujo de trabajo y prompts guiados para dirigir a la IA sobre tu propio proyecto sin contratar un programador.',
  'Aplicable desde apps para enseñar matemáticas y ciencias hasta automatización de tareas y soluciones aún no resueltas en tu institución o industria.',
  'Referencia viva de 7 aplicaciones reales publicadas y acceso interactivo a nuestro graficador Math Studio.',
];

const filterTabs: { id: FilterOption; label: string }[] = [
  { id: 'Todos', label: 'Las 7 aplicaciones' },
  { id: 'Matemáticas y Ciencias', label: 'Matemáticas y ciencias' },
  { id: 'Automatización y Soluciones', label: 'Automatización y soluciones' },
];

const FAQ: [string, string][] = [
  [
    '¿El taller es solo para profesores de matemáticas?',
    'No. Está abierto a docentes de cualquier área y a profesionales en la industria de la educación (coordinación, capacitación, tutorías, orientación o gestión). Conservamos y mostramos nuestro graficador y apps de matemáticas y ciencias como prueba de nivel, pero la ruta aplica exactamente igual para crear simuladores de otras áreas, evaluaciones, tableros, automatizaciones y herramientas web para resolver problemas reales.',
  ],
  [
    '¿Necesito saber programar o haber usado código antes?',
    'No. La ruta está diseñada para trabajar sin conocimientos previos de programación. Tú aportas tu criterio profesional y educativo, y aprendes cómo dirigir paso a paso a la inteligencia artificial para construir y ajustar tus aplicaciones web sin contratar un programador.',
  ],
  [
    '¿Qué tipo de aplicaciones web y herramientas puedo crear?',
    'Desde aplicaciones interactivas para enseñar conceptos de matemáticas y ciencias hasta herramientas que automatizan tareas repetitivas, evaluaciones diagnósticas, calculadoras personalizadas o soluciones web para necesidades concretas de tu institución o industria.',
  ],
  [
    '¿Cómo funciona el precio oficial de US$9 y el acceso en Skool?',
    'El precio oficial único del taller es US$9 y el acceso se gestionará dentro de nuestra comunidad en Skool. El botón hacia el checkout de Skool está actualmente en modo placeholder mientras conectamos el enlace oficial, por lo que todavía no se realiza ningún cobro desde esta página.',
  ],
  [
    '¿Por qué enfatizas la experiencia desde 2023?',
    'Estudiar y construir aplicaciones reales con IA desde el inicio de su auge en 2023 implicó cientos de horas de pruebas y errores. Condensar esa estrategia en una sola ruta clara te permite ir directo a lo que funciona y evitar años de intentos dispersos.',
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
      Ver taller por {OFFICIAL_PRICE} <ArrowRight className="size-5" />
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
          Abrir aplicación en vivo <ExternalLink className="size-4" />
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
        alt="Juan Xavier Cabello, docente y constructor de aplicaciones educativas con IA"
        className="aspect-[4/5] w-full rounded-[18px] object-cover object-top"
      />
      <figcaption className="px-3 pb-3 pt-5 text-center">
        <strong className="font-display text-lg text-[#193B38]">Juan Xavier Cabello</strong>
        <p className="mt-1 text-xs text-[#607A6D]">
          Educador y constructor de aplicaciones web con IA desde 2023 · Sistema Zénit
        </p>
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
              Qué incluye
            </a>
            <a href="#proyectos" className="hover:text-[#176655]">
              Proyectos y graficador
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
        {/* 1. HERO: PROPUESTA AMPLIA EN EDUCACIÓN + GRAFICADOR VIVO */}
        <section
          id="demostracion"
          className="relative overflow-hidden border-b border-[#E5EAE8] bg-[radial-gradient(ellipse_65%_55%_at_92%_0%,rgba(202,235,216,.48),transparent_70%),linear-gradient(180deg,#F9FBFA_0%,#F4F8F5_100%)] px-5 py-14 sm:px-8 sm:py-20"
        >
          <div className="mx-auto grid max-w-7xl items-center gap-10 xl:grid-cols-[.94fr_1.06fr] xl:gap-14">
            <div className="max-w-2xl">
              <p className="inline-flex flex-wrap items-center gap-2 rounded-full border border-[#DDE9E1] bg-white px-3.5 py-2 text-[10px] font-extrabold uppercase tracking-[.12em] text-[#285F51] sm:text-xs">
                <GraduationCap className="size-4" />
                TALLER PRÁCTICO · IA PARA PROFESIONALES DE LA EDUCACIÓN
              </p>
              <h1 className="mt-7 font-display text-[clamp(2.2rem,3.95vw,4rem)] font-bold leading-[1.09] tracking-[-.06em] text-[#18283C]">
                Crea tus propias aplicaciones web interactivas con IA{' '}
                <span className="text-[#286F5A]">sin saber programar.</span>
              </h1>
              <p className="mt-6 text-base leading-8 text-[#4F6174] sm:text-lg">
                Ayudo a profesionales innovadores en la industria de la educación a plasmar esa idea que llevan años guardando en aplicaciones web reales para sus estudiantes o su institución —sin contratar a un programador ni desperdiciar tiempo y dinero en pruebas y errores, apoyado en experiencia aplicada con IA desde 2023.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-2.5 text-xs font-semibold text-[#3C5852]">
                <span className="rounded-full border border-[#D4E4DB] bg-white px-3.5 py-2">
                  Cero programación previa
                </span>
                <span className="rounded-full border border-[#D4E4DB] bg-white px-3.5 py-2">
                  Enseñanza y automatización
                </span>
                <span className="rounded-full border border-[#C6DFD1] bg-[#EBF6EF] px-3.5 py-2 font-bold text-[#1D5543]">
                  Precio oficial: {OFFICIAL_PRICE}
                </span>
              </div>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <PurchaseCTA />
                <a
                  href="#proyectos"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2B665A] underline-offset-4 hover:underline"
                >
                  Ver 7 apps reales y graficador <ChevronRight className="size-4" />
                </a>
              </div>
              <p className="mt-4 text-xs leading-6 text-[#5E7282]">
                Acceso oficial único de {OFFICIAL_PRICE} en nuestra comunidad de Skool (botón en placeholder mientras conectamos el checkout).
              </p>
            </div>

            <div className="min-w-0">
              <HeroMathPreview />
              <p className="mt-3 text-center text-xs leading-6 text-[#607384]">
                Graficador interactivo real creado con este enfoque: prueba cómo responden parámetros y curvas al instante (y debajo explora Math Studio completo y apps de automatización).
              </p>
            </div>
          </div>
        </section>

        {/* 2. CONTRASTE DOLOR VS. SOBERANÍA TECNOLÓGICA */}
        <section id="problema" className="px-5 py-20 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              label="Deja de postergar esa herramienta que ya sabes que hace falta"
              title="Tienes la idea y el criterio educativo. Te faltaba la ruta para construirla por ti mismo."
              body="Desde aplicaciones interactivas para enseñar matemáticas y ciencias hasta herramientas que automatizan tareas y resuelven problemas en tu institución o industria, ya no necesitas contratar desarrolladores externos para volver real tu proyecto."
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
                    alt="Profesional educativo trabajando de madrugada frente a bocetos y presupuestos costosos para una aplicación"
                    className="aspect-video w-full object-cover"
                  />
                </div>
                <p className="mt-6 text-xs font-extrabold uppercase tracking-[.17em] text-[#657489]">
                  Lo que hoy frena tus ideas
                </p>
                <div className="mt-6 space-y-6">
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#26374B]">
                      Guardar durante años un proyecto que ya deberías estar usando
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[#69798C]">
                      Conoces exactamente qué aplicación o recurso interactivo necesitan tus alumnos o tu equipo, pero lo postergas pensando que primero debes aprender a programar desde cero.
                    </p>
                  </div>
                  <div className="border-t border-[#EBEFF1] pt-5">
                    <h3 className="font-display text-lg font-bold text-[#26374B]">
                      Contratar un programador consume tiempo, dinero y esfuerzo
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[#69798C]">
                      Explicar tu enfoque pedagógico a terceros, esperar semanas y pagar por cada cambio termina encareciendo tu idea antes de validar su impacto real.
                    </p>
                  </div>
                  <div className="border-t border-[#EBEFF1] pt-5">
                    <h3 className="font-display text-lg font-bold text-[#26374B]">
                      Perder tiempo en pruebas y errores con prompts sueltos
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[#69798C]">
                      Probar herramientas de IA aisladas te da resultados incompletos que no se sostienen cuando quieres una aplicación web funcional y útil en tu trabajo.
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
                    alt="Educador mostrando con seguridad su propia aplicación web interactiva en el aula"
                    className="aspect-video w-full object-cover"
                  />
                </div>
                <p className="mt-6 text-xs font-extrabold uppercase tracking-[.17em] text-[#2B6E5D]">
                  Lo que cambia con esta ruta práctica
                </p>
                <div className="mt-6 space-y-6">
                  <div>
                    <h3 className="flex items-start gap-2 font-display text-lg font-bold text-[#193C35]">
                      <CheckCircle2 className="mt-1 size-5 shrink-0 text-[#27775D]" />
                      Tomas el control total sin saber programación
                    </h3>
                    <p className="mt-2 pl-7 text-sm leading-7 text-[#466458]">
                      Aprendes paso a paso cómo guiar a la IA para dar vida a tu proyecto web, modificarlo al instante y decidir cómo evolucionarlo sin intermediarios.
                    </p>
                  </div>
                  <div className="border-t border-[#D0E3D7] pt-5">
                    <h3 className="flex items-start gap-2 font-display text-lg font-bold text-[#193C35]">
                      <CheckCircle2 className="mt-1 size-5 shrink-0 text-[#27775D]" />
                      Ahorras años de aprendizajes, pruebas y errores
                    </h3>
                    <p className="mt-2 pl-7 text-sm leading-7 text-[#466458]">
                      Recorres la estrategia de alguien que estudia y aplica IA desde el inicio del boom en 2023, ahorrándote tiempo de vida y gastos innecesarios.
                    </p>
                  </div>
                  <div className="border-t border-[#D0E3D7] pt-5">
                    <h3 className="flex items-start gap-2 font-display text-lg font-bold text-[#193C35]">
                      <CheckCircle2 className="mt-1 size-5 shrink-0 text-[#27775D]" />
                      Creas herramientas didácticas o soluciones para tu sector
                    </h3>
                    <p className="mt-2 pl-7 text-sm leading-7 text-[#466458]">
                      Construye desde simuladores interactivos de matemáticas y ciencias hasta automatizaciones, calculadoras y soluciones a problemas aún no resueltos en tu industria.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. QUÉ INCLUYE POR US$9 */}
        <section id="incluye" className="border-y border-[#E0E8E4] bg-white px-5 py-20 sm:px-8 sm:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
            <div>
              <SectionHeading
                label={`Qué recibes por ${OFFICIAL_PRICE} (precio oficial)`}
                title="Sales con claridad para desarrollar de forma completa esa idea que estabas guardando."
                body="No es un catálogo de prompts aislados. Es un taller práctico orientado a que avances tu propia aplicación o herramienta interactiva con IA sin saber código."
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
                alt="Laptop ejecutando aplicaciones educativas junto a cuaderno y tarjetas de la ruta práctica Sistema Zénit desde 2023"
                className="aspect-video w-full rounded-2xl object-cover"
              />
              <figcaption className="px-2 pb-2 pt-3 text-center text-xs font-semibold text-[#3B5F52]">
                Ruta condensada desde 2023: de tu idea guardada durante años a aplicaciones web interactivas funcionando.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* 4. CÓMO FUNCIONA EN 3 PASOS */}
        <section id="metodo" className="px-5 py-20 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              label="El método paso a paso"
              title="Una ruta práctica en tres pasos"
              body="No empiezas estudiando sintaxis ni meses de programación teórica. Empiezas por un problema educativo o institucional real y diriges a la IA con criterio."
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
                    <span className="font-display text-4xl font-bold tracking-tight text-[#B5D2C1]">
                      {step.number}
                    </span>
                    <h3 className="mt-4 font-display text-xl font-bold leading-snug text-[#203D39]">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[#647487]">{step.description}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl border border-[#D6E6DC] bg-[#EFF7F0] p-5 text-sm leading-7 text-[#37584C]">
              <ShieldCheck className="size-6 shrink-0" />
              Estrategia construida desde 2023 al inicio del auge de la IA para ahorrarte años de aprendizajes, pruebas y errores que hoy cuestan tiempo y dinero.
            </div>
          </div>
        </section>

        {/* 5. PROYECTOS REALES + GRAFICADOR MATH STUDIO */}
        <section id="proyectos" className="border-y border-[#E0E8E4] bg-white px-5 py-20 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              label="Prueba real antes de inscribirte"
              title="No son simples páginas de juguete: explora 7 aplicaciones reales y nuestro graficador."
              body="Estos proyectos están publicados y muestran el abanico real del método: desde aplicaciones interactivas para enseñar matemáticas y ciencias hasta automatización de evaluaciones y herramientas para problemas concretos."
            />

            <div role="tablist" aria-label="Filtrar proyectos reales por categoría" className="mt-9 flex flex-wrap justify-center gap-2.5">
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
                <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#286F5A]">
                  Aplicaciones interactivas para enseñar matemáticas y ciencias
                </p>
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
                  Automatización de tareas y soluciones en tu institución o industria
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
                      <Sparkles className="size-3.5" /> Graficador interactivo en vivo
                    </span>
                    <span className="rounded-full border border-[#C6DDD0] bg-white px-2.5 py-1 text-[11px] font-bold text-[#2C5C4E]">
                      Secundaria · Preuniversitario · Universidad
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-bold text-[#193B36]">
                    Math Studio: prueba nuestro graficador y simuladores matemáticos completos
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[#536B63]">
                    Mantén intacta la precisión visual: explora 9 familias de funciones, trigonometría directa e inversa y cálculo diferencial con tipografía LaTeX y SVG interactivo.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStudioOpen(v => !v)}
                  aria-expanded={studioOpen}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#193F39] px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#286957]"
                >
                  {studioOpen ? 'Cerrar Math Studio' : 'Explorar Math Studio'}
                  <ArrowUpRight className="size-4" />
                </button>
              </div>
              {studioOpen && (
                <div className="mt-7" id="studio-completo">
                  <Suspense
                    fallback={
                      <p role="status" className="py-8 text-center text-sm text-[#56746B]">
                        Preparando el graficador Math Studio…
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

        {/* 6. DOCENTE FUNDADOR · EXPERIENCIA DESDE 2023 */}
        <section id="fundador" className="border-y border-[#DDE6E0] bg-[#EDF4EE] px-5 py-20 sm:px-8 sm:py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[.75fr_1.25fr]">
            <InstructorPortrait />
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.17em] text-[#366F5C]">
                <Users className="size-4" /> Quién te guía
              </p>
              <h2 className="mt-5 font-display text-[clamp(2rem,3.8vw,3.35rem)] font-bold leading-[1.12] tracking-[-.05em] text-[#1E3938]">
                Aprende con la experiencia de quien estudia e implementa con IA desde 2023.
              </h2>
              <p className="mt-7 text-lg leading-9 text-[#40584F]">
                Soy Juan Xavier Cabello. Desde 2023 —en el inicio del auge de la inteligencia artificial— estudio, pruebo y construyo aplicaciones web interactivas reales para educación y productividad. Toda esa curva de aprendizaje, pruebas y errores la condenso en una ruta práctica para ahorrarte años de intentos dispersos y ayudarte a completar por fin ese proyecto que vienes postergando.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  className="inline-flex items-center gap-2 rounded-xl border border-[#BED6C7] bg-white px-4 py-3 text-xs font-bold text-[#2B6654] transition hover:bg-[#F6FAF6]"
                  href="https://xavier.cabellosalirrosas.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver portafolio <ExternalLink className="size-4" />
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

        {/* 7. PRECIO OFICIAL US$9 + CHECKOUT EN SKOOL (PLACEHOLDER) */}
        <section id="comprar" className="bg-[#F8F9F7] px-5 py-20 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              label="Inscripción oficial"
              title="Empieza a construir tu propia aplicación web con IA por US$9."
              body="Un único precio oficial para que aprendas la ruta paso a paso y transformes tu idea educativa en una herramienta web interactiva real."
            />

            <div className="mx-auto mt-12 grid max-w-5xl overflow-hidden rounded-[26px] border border-[#D8E2DC] bg-white shadow-[0_20px_65px_rgba(22,54,42,.08)] lg:grid-cols-[1.08fr_.92fr]">
              <div className="p-7 sm:p-10">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#EDF6F0] px-3 py-2 text-[11px] font-extrabold uppercase tracking-[.12em] text-[#2D7358]">
                  <BookOpen className="size-4" /> Taller práctico · IA para educación
                </div>
                <h3 className="mt-6 font-display text-[clamp(1.6rem,2.5vw,2.3rem)] font-bold leading-[1.18] text-[#203744]">
                  De una idea educativa guardada a aplicaciones web interactivas reales, sin saber programar.
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#647587]">
                  Abierto a docentes de todas las áreas y profesionales del sector educativo que buscan enseñar mejor con herramientas propias o automatizar procesos en su institución.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl bg-[#F7FAF8] p-4">
                    <p className="text-xs font-bold uppercase tracking-[.12em] text-[#537968]">Qué obtienes</p>
                    <p className="mt-2 text-sm leading-6 text-[#526675]">
                      Ruta práctica paso a paso, criterios de IA desde 2023 y referencia de proyectos reales.
                    </p>
                  </div>
                  <div className="rounded-xl bg-[#F7FAF8] p-4">
                    <p className="text-xs font-bold uppercase tracking-[.12em] text-[#537968]">Abierto a</p>
                    <p className="mt-2 text-sm leading-6 text-[#526675]">
                      Profesores, formadores, coordinadores y profesionales en la industria de la educación.
                    </p>
                  </div>
                </div>

                <p className="mt-7 rounded-xl border border-[#E5EBE7] bg-[#F8FAF8] p-4 text-xs leading-6 text-[#5E7280]">
                  El taller te guía paso a paso para que tú mismo crees tus aplicaciones web y herramientas interactivas con IA; no incluye servicio de desarrollo hecho por encargo.
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
                <p className="mt-4 text-sm leading-7 text-[#607768]">
                  Inversión única y oficial para acceder al taller dentro de nuestra comunidad en Skool, sin cargos ocultos ni pasarelas adicionales en esta página.
                </p>

                <div className="my-7 border-t border-[#D6E4DA]" />

                <div className="rounded-2xl border border-[#D4E3D9] bg-white p-5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-extrabold uppercase tracking-[.12em] text-[#286F5A]">
                      Acceso en comunidad de Skool
                    </p>
                    <span className="rounded-full bg-[#EAF4ED] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#266B56]">
                      En preparación
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-[#5D7368]">
                    El checkout oficial funcionará directamente dentro de Skool. Hemos dejado el botón listo en modo placeholder mientras lo conectamos.
                  </p>
                  <div className="mt-4">
                    <SkoolCheckoutButton />
                  </div>
                </div>

                <p className="mt-5 flex items-start gap-2 text-xs leading-6 text-[#62796C]">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0" />
                  Mientras el checkout en Skool esté en placeholder, no se realiza ningún cobro. Antes de pagar en Skool verás todas las condiciones de acceso.
                </p>
              </div>
            </div>

            <div className="mx-auto mt-8 max-w-5xl">
              <WaitlistForm />
            </div>
          </div>
        </section>

        {/* 8. FILTRO HONESTAMENTE SEGMENTADO */}
        <section id="para-quien" className="px-5 py-20 sm:px-8 sm:py-24">
          <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
            <div className="rounded-[24px] border border-[#CBDED2] bg-[#EAF4ED] p-7 sm:p-9">
              <h2 className="font-display text-2xl font-bold text-[#193C35]">Este taller es para ti si...</h2>
              <ul className="mt-6 space-y-4 text-sm leading-7 text-[#466458]">
                <li className="flex gap-3">
                  <Check className="mt-1 size-5 shrink-0 text-[#27775D]" />
                  Trabajas en educación (docencia, capacitación, tutoría o gestión) y guardas hace años una idea de herramienta útil.
                </li>
                <li className="flex gap-3">
                  <Check className="mt-1 size-5 shrink-0 text-[#27775D]" />
                  Quieres construir aplicaciones web interactivas para enseñar o automatizar tareas sin saber programar ni contratar programador.
                </li>
                <li className="flex gap-3">
                  <Check className="mt-1 size-5 shrink-0 text-[#27775D]" />
                  Prefieres seguir una estrategia aplicada desde 2023 en vez de perder años en ensayo y error por tu cuenta.
                </li>
              </ul>
            </div>

            <div className="rounded-[24px] border border-[#E1E6EB] bg-white p-7 sm:p-9">
              <h2 className="font-display text-2xl font-bold text-[#26374B]">No es para ti si...</h2>
              <ul className="mt-6 space-y-4 text-sm leading-7 text-[#69798C]">
                <li className="flex gap-3">
                  <span className="mt-2 size-2 shrink-0 rounded-full bg-[#9AA8B5]" />
                  Buscas delegar por completo la construcción a una agencia sin involucrarte en el diseño de tu idea.
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 size-2 shrink-0 rounded-full bg-[#9AA8B5]" />
                  Quieres un curso universitario largo de programación tradicional desde cero antes de probar una solución real.
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 size-2 shrink-0 rounded-full bg-[#9AA8B5]" />
                  Esperas una promesa mágica sin definir qué problema educativo o laboral quieres resolver.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 9. PREGUNTAS FRECUENTES */}
        <section id="preguntas" className="border-t border-[#E0E8E4] bg-white px-5 py-20 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-4xl">
            <SectionHeading label="Preguntas frecuentes" title="Resuelve todas tus dudas con transparencia" />
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
          <p className="text-xs text-[#738195]">© 2026 Sistema Zénit · Aplicaciones web interactivas con IA para educación</p>
        </div>
      </footer>
    </div>
  );
}
