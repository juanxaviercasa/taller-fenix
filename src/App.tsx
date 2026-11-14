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
  Menu,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from 'lucide-react';
import HeroVslPlayer from './components/HeroVslPlayer';
import { HotmartCheckoutButton } from './components/HotmartCheckoutButton';
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
  buildTime: string;
  description: string;
  url: string;
}

const projects: ProjectItem[] = [
  {
    name: 'Transformaciones Geométricas',
    image: 'transformaciones-geometricas.webp',
    category: 'Matemáticas y Ciencias',
    highlight: 'Geometría en vivo + fichas para imprimir',
    buildTime: 'Hecha en 5 días · Probada en aula',
    description:
      'La aplicación que uso directamente en mi colegio: muestra traslaciones, rotaciones y simetrías en el plano cartesiano con sus ecuaciones completas, incluye teoría, retos y permite imprimir las fichas listas para repartir a los estudiantes.',
    url: 'https://transformacionesgeometricas.sistemazenit.com/',
  },
  {
    name: 'Sólidos Geométricos',
    image: 'solidos-geometricos.webp',
    category: 'Matemáticas y Ciencias',
    highlight: 'Cuerpos 3D y plantillas en A4/A3/A2',
    buildTime: 'Hecha en 3 a 4 días',
    description:
      'Giras cada sólido en 3D, abres su desarrollo plano con un clic, practicas con evaluaciones automáticas e imprimes las plantillas exactas en A4, A3 o A2 para que los alumnos armen sus sólidos en físico.',
    url: 'https://solidosgeometricos.sistemazenit.com/',
  },
  {
    name: 'Funciones Lab',
    image: 'funciones-lab.webp',
    category: 'Matemáticas y Ciencias',
    highlight: 'Gráficas que responden al instante',
    buildTime: 'En mejora continua',
    description:
      'Nació para destrabar uno de los temas donde más sufren los alumnos en álgebra y cálculo: cambias los parámetros y la función responde en tiempo real sin perder media clase dibujando y borrando en la pizarra.',
    url: 'https://funciones.sistemazenit.com/',
  },
  {
    name: 'Mundos Simulados',
    image: 'mundos-simulados.webp',
    category: 'Matemáticas y Ciencias',
    highlight: 'Escenarios científicos en línea',
    buildTime: 'Hecha en 1 semana',
    description:
      'Explora con datos científicos reales qué pasaría si un día desapareciera la gravedad o se fuera la electricidad en el planeta, transformado de un antiguo blog a código web limpio.',
    url: 'https://mundossimulados.online/',
  },
  {
    name: 'Test vocacional RALE',
    image: 'rale-test-vocacional.webp',
    category: 'Automatización y Soluciones',
    highlight: 'Evalúa y calcula resultados solo',
    buildTime: 'Hecha en 3 días · Cero corrección manual',
    description:
      'Creado para postulantes a escuelas militares y policiales («Rumbo a las Escuelas»): el alumno ingresa sus datos físicos, académicos, psicológicos y vocacionales y recibe su puntaje al instante sin corregir nada a mano.',
    url: 'https://raletest.sistemazenit.com/',
  },
  {
    name: 'Herramientas para Pymes',
    image: 'herramientas-pymes.webp',
    category: 'Automatización y Soluciones',
    highlight: '26 calculadoras y utilidades de gestión',
    buildTime: 'Migrada de WordPress a código en 1 mes',
    description:
      'Conjunto de 26 calculadoras prácticas de gestión y finanzas para que pequeños y medianos negocios hagan sus cálculos rápido y con seguridad. Demuestra que el mismo método sirve para crear software útil fuera del aula.',
    url: 'https://nubeparapymes.online/herramientas/',
  },
  {
    name: 'Todo Lima',
    image: 'todo-lima.webp',
    category: 'Automatización y Soluciones',
    highlight: 'Directorio web + publicación automática',
    buildTime: 'Hecha en 1 semana',
    description:
      'Plataforma local en funcionamiento con flujos automatizados que publican tres contenidos diarios para impulsar negocios en Lima, mostrando el alcance del método en proyectos reales.',
    url: 'https://todolima.com/',
  },
];

const workshopPaths = [
  {
    badge: 'Camino 1 · Ideal si empiezas de cero',
    title: 'Personalizar mis proyectos ya terminados',
    description:
      'Recibes 3 aplicaciones educativas mías ya terminadas y funcionales para que simplemente les cambies el nombre, tus colores, tu marca y tus enlaces a redes sociales.',
  },
  {
    badge: 'Camino 2 · Sobre base probada',
    title: 'Modelar y clonar un repositorio de GitHub',
    description:
      'Aprendes a pedirle a la IA los proyectos de código abierto con más estrellas y funciones verificadas para clonarlos y adaptarlos a tu curso sin que se rompan.',
  },
  {
    badge: 'Camino 3 · Tu idea propia',
    title: 'Construir tu propia mini app desde cero',
    description:
      'Sigues la ruta completa de Entrevista Inversa y Plan Maestro para transformar esa idea que tienes guardada en tu cuaderno en una web app funcional paso a paso.',
  },
];

const steps = [
  {
    number: '01',
    image: '/taller/ruta-01-idea-guardada-a-app.webp',
    alt: 'Cuaderno con el boceto de una app educativa junto a la misma app funcionando en pantalla',
    title: 'La IA te entrevista antes de construir',
    description:
      'La IA nunca va a adivinar lo que tienes en la cabeza. En vez de lanzar una instrucción suelta de dos líneas, le das tu contexto y haces que ella te pregunte todo sobre tu tema, tus alumnos y las pantallas que necesitas para armar un Plan Maestro sin huecos.',
  },
  {
    number: '02',
    image: '/taller/ruta-02-construccion-ia-sin-codigo.webp',
    alt: 'Educador construyendo su app con ayuda de la inteligencia artificial',
    title: 'Diriges el diseño y las funciones por partes',
    description:
      'Usando herramientas gratuitas como Antigravity, ChatGPT, Claude o Visual Studio Code —o partiendo de mis plantillas y repositorios probados de GitHub—, la IA ensambla cada bloque sin que escribas código a mano. Si algo falla, sabes exactamente cómo pedirle que lo corrija.',
  },
  {
    number: '03',
    image: '/taller/ruta-03-automatizacion-tiempo-libre.webp',
    alt: 'Escritorio ordenado con un panel de evaluaciones ya resueltas automáticamente',
    title: 'Aprendes a publicar una versión sencilla',
    description:
      'Conectas tu repositorio con un proveedor como GitHub Pages, Cloudflare Pages o Vercel y revisas las opciones gratuitas disponibles, sus límites y el enlace que ofrecen. Un dominio propio es opcional y puede tener costo; también puedes exportar una versión HTML.',
  },
];

const included = [
    'Taller práctico en vivo: 3 sesiones de unas 2 horas, con grabaciones disponibles durante 30 días.',
  '3 proyectos educativos míos ya terminados y funcionando, listos para que los uses en tu aula desde la primera semana o les pongas tu propia marca.',
  'Método de Entrevista Inversa y Plan Maestro: cómo hacer que la IA te pregunte todo lo necesario antes de construir para evitar iterar 100 veces.',
    'Guía para publicar con planes gratuitos, dentro de sus límites, y exportar una versión HTML para tu computadora o USB. Un subdominio del proveedor puede ser gratis; un dominio propio es opcional y suele tener costo.',
  'Guía de herramientas y créditos gratuitos: cómo aprovechar las versiones gratuitas de ChatGPT, Claude, Gemini, Antigravity, Visual Studio Code y plataformas con créditos diarios gratuitos como Manus.im (300 créditos diarios) y Genspark.',
];

const otherAreasExamples = [
  {
    area: 'Historia, Ciencias Sociales y Biología',
    ideas: 'Generadores de escenas hiperrealistas, líneas de tiempo, mapas y atlas explorables en clase.',
  },
  {
    area: 'Idiomas, Comunicación y Primaria / Inicial',
    ideas: 'Traductores contextuales, juegos con personajes, cuentos visuales y retos de comprensión con retroalimentación inmediata donde los chicos aprenden jugando.',
  },
  {
    area: 'Coordinación, Tutoría y Gestión Docente',
    ideas: 'Evaluadores y tests vocacionales que se corrigen solos sin pagar licencias, tu propio sistema gratuito de seguimiento y calificación de alumnos (sin pagar un CRM) y flujos automáticos para redes o WhatsApp.',
  },
];

const filterTabs: { id: FilterOption; label: string }[] = [
  { id: 'Todos', label: 'Todas (7)' },
  { id: 'Matemáticas y Ciencias', label: 'Matemáticas y ciencias' },
  { id: 'Automatización y Soluciones', label: 'Automatización' },
];

const FAQ: [string, string][] = [
  [
    '¿Es solo para docentes de matemáticas?',
    'No. Aunque yo soy profesor de matemáticas y ciencias, el método sirve para cualquier docente, tutor, coordinador, orientador o creador de cursos (Historia, Idiomas, Biología, Primaria, Inicial o capacitación). Con el mismo flujo puedes crear desde simuladores y juegos educativos hasta tests que se corrigen solos o sistemas gratuitos de calificación y seguimiento.',
  ],
  [
    'Soy pésimo con la tecnología, apenas uso Word, Excel o WhatsApp. ¿Esto es para mí?',
    'Necesitas una laptop o PC, internet y manejo básico de computadora. Si empiezas desde cero, instalar y configurar las herramientas puede tomar alrededor de dos semanas; el ritmo depende de tu experiencia y del tiempo que puedas dedicarle.',
  ],
  [
    'No sé programar y me preocupa encontrarme con errores técnicos. ¿Podré empezar?',
    'El taller está pensado para avanzar guiando a la IA en español, no para empezar memorizando sintaxis. Necesitas manejo básico de una computadora y disposición para revisar lo que genera: pueden aparecer errores y el proceso requiere comprobar y corregir, no solo aceptar todo lo que diga la herramienta.',
  ],
  [
    'Ya probé ChatGPT y solo me dio texto genérico o un código que dio error. ¿Qué cambia aquí?',
    'Cambian dos cosas: primero, no le pedimos código a ciegas en el chat suelto, sino que usamos el método de Entrevista Inversa y Plan Maestro; y segundo, hoy usamos entornos como Antigravity, ChatGPT Desktop o Visual Studio Code que se conectan directamente a las carpetas de tu computadora y a GitHub para crear los archivos, probarlos y corregirlos sin que tú tengas que copiar y pegar bloques rotos.',
  ],
  [
    'No tengo tiempo, termino agotado después de dictar clases todo el día.',
    'Justamente por eso el método parte de planificar bien desde el comienzo o de usar uno de mis 3 proyectos ya terminados para que solo le cambies tu nombre y tus datos. Muchos docentes avanzan el sábado por la mañana o el domingo por la tarde, y la herramienta que construyes hoy es la que luego te ahorra horas todas las semanas en el colegio.',
  ],
  [
    '¿Seguro no necesito pagar US$20 al mes en ChatGPT o Claude ni pagar hosting?',
    'Puedes empezar usando planes gratuitos, dentro de sus límites. No pagar una suscripción mensual no garantiza por sí solo que la aplicación salga bien: también tendrás que dirigir la IA, revisar el resultado y corregirlo. Los dominios propios y las suscripciones de pago son opcionales para empezar, aunque los proveedores pueden cambiar sus condiciones.',
  ],
  [
    '¿Por qué cuesta solo US$9? ¿Es puro relleno para obligarme a comprar algo caro después?',
    'Es un pago único de US$9 por un mes de acceso al taller y sus grabaciones. Incluye las tres sesiones, guías, plantillas y acceso a tres proyectos educativos para adaptar. El acompañamiento semanal es un paso aparte: la comunidad de Skool está prevista en US$19 al mes; no es obligatorio para tomar el taller.',
  ],
  [
    'La inteligencia artificial cambia cada semana. ¿Lo que aprenda hoy quedará obsoleto en dos meses?',
    'Eso pasaba cuando aprendías un lenguaje de programación tradicional: salía una actualización y tu código quedaba obsoleto. Pero aquí no memorizas botones ni sintaxis: aprendes a pensar, estructurar un Plan Maestro y dirigir a la IA con tu experiencia profesional. Si mañana sale un modelo de IA mejor, este mismo método hará que tus aplicaciones salgan todavía más rápido.',
  ],
  [
    '¿Qué garantía tengo si me inscribo por US$9?',
    'El precio de entrada es US$9 en un solo pago, con acceso por 30 días. La garantía es de 7 días según las condiciones de compra que publique Hotmart. El checkout aún no está conectado; cuando lo esté, podrás revisar allí los términos completos antes de pagar.',
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
      <span className="relative flex size-8 shrink-0 items-center justify-center rounded-xl bg-[#0F6264] font-display text-lg font-black text-white sm:size-9 sm:text-xl">
        Z
        <span aria-hidden="true" className="absolute -right-1 -top-1 size-2 rounded-full bg-[#F4B942] ring-2 ring-[#FBFCFA]" />
      </span>
      <span className="flex flex-col leading-none">
        <strong className="font-display text-[13px] tracking-tight text-[#18283B] sm:text-[15px]">
          <span className="sm:hidden">ZÉNIT</span>
          <span className="hidden sm:inline">SISTEMA ZÉNIT</span>
        </strong>
        <span className="mt-1 hidden text-[9px] font-bold uppercase tracking-[.16em] text-[#5B7268] sm:block">
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
      className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#C71D7A] font-bold text-white shadow-[0_10px_25px_rgba(199,29,122,.2)] transition hover:bg-[#A91667] ${
        compact ? 'px-2.5 py-2.5 text-[11px] sm:gap-2.5 sm:px-4 sm:text-sm' : 'px-7 py-4 text-sm sm:text-base'
      }`}
    >
      {compact ? (
        <>
          <span className="sm:hidden">Taller · {OFFICIAL_PRICE}</span>
          <span className="hidden sm:inline">Ver detalles · {OFFICIAL_PRICE}</span>
        </>
      ) : (
        <>Ver detalles del taller · {OFFICIAL_PRICE}</>
      )}
      <ArrowRight className={compact ? 'size-4 sm:size-5' : 'size-5'} />
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
          <span className="text-[11px] font-semibold text-[#5E7469]">{project.buildTime}</span>
        </div>
        <h3 className="mt-3 font-display text-xl font-bold leading-snug text-[#1C3442]">{project.name}</h3>
        <p className="mt-1 text-xs font-bold text-[#286F5A]">{project.highlight}</p>
        <p className="mt-2.5 flex-1 text-sm leading-7 text-[#5A6C78]">{project.description}</p>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[#193F39] underline-offset-4 hover:text-[#286F5A] hover:underline"
        >
          Abrir la app en vivo <ExternalLink className="size-4" />
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
        alt="Juan Xavier Cabello, profesor de matemáticas y creador de aplicaciones educativas con inteligencia artificial"
        className="aspect-[4/5] w-full rounded-[18px] object-cover object-top"
      />
      <figcaption className="px-3 pb-3 pt-5 text-center">
        <strong className="font-display text-lg text-[#193B38]">Juan Xavier Cabello</strong>
              <p className="mt-1 text-xs text-[#607A6D]">
          Profesor de matemáticas (+8 años en aula) · más de 70 proyectos web con IA
        </p>
      </figcaption>
    </figure>
  );
}

export default function App() {
  const [studioOpen, setStudioOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
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
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-8 sm:py-4">
          <Brand />
          <nav aria-label="Navegación principal" className="hidden items-center gap-7 text-sm font-semibold text-[#4D6072] lg:flex">
            <a href="#incluye" className="hover:text-[#176655]">
              Qué incluye
            </a>
            <a href="#metodo" className="hover:text-[#176655]">
              Método real
            </a>
            <a href="#proyectos" className="hover:text-[#176655]">
              Apps funcionando
            </a>
            <a href="#fundador" className="hover:text-[#176655]">
              Mi historia
            </a>
            <a href="#preguntas" className="hover:text-[#176655]">
              Preguntas
            </a>
          </nav>
          <PurchaseCTA compact />
          <button
            type="button"
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-[#C8DCD0] bg-white text-[#214E41] transition hover:bg-[#F3F8F5] lg:hidden"
            aria-label={mobileNavOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
            aria-expanded={mobileNavOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileNavOpen(open => !open)}
          >
            {mobileNavOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {mobileNavOpen && (
          <nav id="mobile-navigation" aria-label="Navegación móvil" className="border-t border-[#E5E9E7] bg-[#FBFCFA] px-4 py-3 shadow-lg lg:hidden">
            <div className="mx-auto grid max-w-7xl gap-1">
              {[
                ['Qué incluye', '#incluye'],
                ['Método real', '#metodo'],
                ['Apps funcionando', '#proyectos'],
                ['Mi historia', '#fundador'],
                ['Preguntas', '#preguntas'],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMobileNavOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm font-semibold text-[#4D6072] hover:bg-[#F0F6F1] hover:text-[#176655]"
                >
                  {label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main id="contenido">
        {/* 1. HERO CON ARQUITECTURA VSL CENTRADA (ABOVE THE FOLD) */}
        <section
          id="demostracion"
          className="relative overflow-hidden border-b border-[#DCE8E6] bg-[radial-gradient(ellipse_75%_55%_at_50%_0%,rgba(91,215,210,.22),transparent_72%),radial-gradient(ellipse_22%_24%_at_92%_8%,rgba(229,68,161,.1),transparent_72%),linear-gradient(180deg,#FAFCFB_0%,#F2F8F7_100%)] px-5 py-12 sm:px-8 sm:py-16"
        >
          <div className="mx-auto max-w-5xl">
            {/* Encabezado VSL centrado */}
            <div className="mx-auto max-w-4xl text-center">
              <p className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-[#CFE0D6] bg-white px-4 py-2 text-[10px] font-extrabold uppercase tracking-[.13em] text-[#285F51] shadow-xs sm:text-xs">
                <GraduationCap className="size-4" />
                TALLER PRÁCTICO · IA PARA QUIENES TRABAJAN EN EDUCACIÓN
              </p>

              <h1 className="mt-6 font-display text-[clamp(2.15rem,4.5vw,4.1rem)] font-bold leading-[1.08] tracking-[-.06em] text-[#18283C]">
                Convierte una idea de clase en una{' '}
                <span className="text-[#147E83]">web interactiva con IA.</span>
              </h1>

              <p className="mx-auto mt-4 max-w-3xl font-display text-sm font-bold leading-relaxed text-[#225847] sm:text-lg">
                El Método Zénit te guía para aclarar qué necesitas, dirigir a la IA, revisar lo que construye y preparar una primera versión para publicar. Tu experiencia docente pone el criterio; la IA acelera la ejecución.
              </p>

              <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[#4F6174] sm:text-base">
                ¿Tienes una idea guardada para tus clases? Explora las etapas del método y prueba proyectos reales. Si partes desde cero, configurar tus herramientas puede tomar alrededor de dos semanas; el ritmo depende de tu experiencia y del tiempo disponible.
              </p>
            </div>

            {/* Centro de gravedad de la página: Reproductor VSL 16:9 */}
            <div className="mt-8 sm:mt-10">
              <HeroVslPlayer />
            </div>

            {/* Bloque de llamada a la acción y confianza debajo del reproductor VSL */}
            <div className="mx-auto mt-8 max-w-3xl text-center sm:mt-10">
              <div className="flex flex-wrap items-center justify-center gap-4">
                <PurchaseCTA />
                <a
                  href="#proyectos"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[#C8DCD0] bg-white px-5 py-4 text-sm font-bold text-[#214E41] transition hover:bg-[#F3F8F5]"
                >
                  Probar las apps reales que construí <ChevronRight className="size-4" />
                </a>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 text-xs font-semibold text-[#3C5852]">
                <span className="rounded-full border border-[#D4E4DB] bg-white px-3.5 py-2">
                  ✓ Tres caminos: adaptar un proyecto, partir de GitHub o crear una mini app
                </span>
                <span className="rounded-full border border-[#D4E4DB] bg-white px-3.5 py-2">
                  ✓ Puedes empezar con herramientas gratuitas, dentro de sus límites
                </span>
                <span className="rounded-full border border-[#C6DFD1] bg-[#EBF6EF] px-3.5 py-2 font-bold text-[#1D5543]">
                  ✓ {OFFICIAL_PRICE} · pago único · acceso por 30 días
                </span>
              </div>

              <p className="mt-4 text-xs leading-6 text-[#5E7282]">
                Para profesores de matemáticas, ciencias y de cualquier área, tutores, capacitadores y creadores educativos · Más de 70 web apps construidas con este método.
              </p>
            </div>
          </div>
        </section>

        {/* 2. EL PROBLEMA Y LA REVELACIÓN HUMANO × IA */}
        <section id="problema" className="px-5 py-20 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              label="La verdad sin filtro"
              title="Por qué tus mejores ideas siguen guardadas en un cuaderno (aunque ya hayas probado usar IA)."
              body="La inteligencia artificial no adivina tu pensamiento ni conoce tu experiencia en el aula. Si solo le lanzas una instrucción suelta de dos líneas, te devuelve material genérico o código que se rompe."
            />
            <div className="mt-11 grid gap-5 lg:grid-cols-2">
              <div className="rounded-[24px] border border-[#E1E6EB] bg-white p-6 shadow-sm sm:p-8">
                <div className="overflow-hidden rounded-2xl border border-[#E3E8EE] bg-[#16202C]">
                  <img
                    src="/taller/dolor-dependencia-madrugada.webp"
                    width="1280"
                    height="720"
                    loading="lazy"
                    decoding="async"
                    alt="Educador trabajando de madrugada frente a bocetos de una app que todavía no puede hacer"
                    className="aspect-video w-full object-cover"
                  />
                </div>
                <p className="mt-6 text-xs font-extrabold uppercase tracking-[.17em] text-[#657489]">
                  Lo que pasa cuando intentas hacerlo a la antigua o a ciegas
                </p>
                <div className="mt-6 space-y-6">
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#26374B]">
                      Domingos por la tarde y madrugadas preparando material
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[#69798C]">
                      Pasas horas armando fichas, presentaciones o exámenes a mano que te quitan el descanso con tu familia, y en el aula los 30 o 40 minutos se van dibujando en la pizarra mientras los estudiantes se distraen con el celular.
                    </p>
                  </div>
                  <div className="border-t border-[#EBEFF1] pt-5">
                    <h3 className="font-display text-lg font-bold text-[#26374B]">
                      Las herramientas tradicionales chocan con pared
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[#69798C]">
                      PowerPoint, Canva y los PDF son planos y no responden; GeoGebra o Genially consumen demasiado tiempo; y encargar tu idea a un programador o agencia cuesta caro y te deja dependiendo de otros para cada cambio.
                    </p>
                  </div>
                  <div className="border-t border-[#EBEFF1] pt-5">
                    <h3 className="font-display text-lg font-bold text-[#26374B]">
                      El bucle de frustración con la IA suelta
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[#69798C]">
                      Abres ChatGPT, le pides una herramienta y, cuando le dices «corrige esto», arregla una parte y malogra otra, dejándote a las 11 de la noche con diez pestañas abiertas y nada publicado.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border border-[#CBDED2] bg-[#EAF4ED] p-6 shadow-sm sm:p-8">
                <div className="overflow-hidden rounded-2xl border border-[#BAD5C4] bg-white">
                  <img
                    src="/taller/deseo-soberania-aula.webp"
                    width="1280"
                    height="720"
                    loading="lazy"
                    decoding="async"
                    alt="Educador mostrando a sus alumnos una app que él mismo creó"
                    className="aspect-video w-full object-cover"
                  />
                </div>
                <p className="mt-6 text-xs font-extrabold uppercase tracking-[.17em] text-[#2B6E5D]">
                  Lo que cambia con el método Humano × IA (Sistema Zénit)
                </p>
                <div className="mt-6 space-y-6">
                  <div>
                    <h3 className="flex items-start gap-2 font-display text-lg font-bold text-[#193C35]">
                      <CheckCircle2 className="mt-1 size-5 shrink-0 text-[#27775D]" />
                      La IA necesita más de tu información que tú de ella
                    </h3>
                    <p className="mt-2 pl-7 text-sm leading-7 text-[#466458]">
                      La IA es un acelerador brutal para ejecutar, pero el criterio pedagógico lo pones tú. Aprendes a sacarle las cosas «por cucharitas» entrenándola primero con tus datos reales mediante Entrevista Inversa antes de generar una sola pantalla.
                    </p>
                  </div>
                  <div className="border-t border-[#D0E3D7] pt-5">
                    <h3 className="flex items-start gap-2 font-display text-lg font-bold text-[#193C35]">
                      <CheckCircle2 className="mt-1 size-5 shrink-0 text-[#27775D]" />
                      Tu experiencia dirige; la IA acelera el trabajo
                    </h3>
                    <p className="mt-2 pl-7 text-sm leading-7 text-[#466458]">
                      En los últimos meses he construido decenas de proyectos con IA. Tú aportas el criterio de tu área; la herramienta ayuda con la construcción y tú revisas que el resultado tenga sentido.
                    </p>
                  </div>
                  <div className="border-t border-[#D0E3D7] pt-5">
                    <h3 className="flex items-start gap-2 font-display text-lg font-bold text-[#193C35]">
                      <CheckCircle2 className="mt-1 size-5 shrink-0 text-[#27775D]" />
                      Publicación en línea con opciones gratuitas
                    </h3>
                    <p className="mt-2 pl-7 text-sm leading-7 text-[#466458]">
                      Aprendes a desplegar una versión sencilla con opciones gratuitas como GitHub Pages o Cloudflare Pages, teniendo en cuenta sus límites. Después puedes proyectarla en clase o preparar fichas para imprimir.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bloque de la Gran Revelación (Pregunta 94) */}
            <div className="mt-8 rounded-[24px] border border-[#C6DDD0] bg-[#163832] p-6 text-center text-white shadow-sm sm:p-8">
              <p className="text-[11px] font-extrabold uppercase tracking-[.15em] text-[#8EE6C2]">
                La revelación central del Sistema Zénit
              </p>
              <blockquote className="mx-auto mt-3 max-w-4xl font-display text-lg font-bold leading-relaxed text-white sm:text-2xl">
                «La inteligencia artificial no es nada sin un ser humano detrás que la dirija. Dicho en simple: la IA necesita más de ti y de tu información que tú de ella. La IA no viene a reemplazarte; es una extensión de ti mismo.»
              </blockquote>
            </div>
          </div>
        </section>

        {/* 3. QUÉ INCLUYE EL TALLER + 3 CAMINOS + TRANSPARENCIA */}
        <section id="incluye" className="border-y border-[#E0E8E4] bg-white px-5 py-20 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-[1.08fr_.92fr] lg:items-center">
              <div>
                <SectionHeading
                  label={`Qué recibes por ${OFFICIAL_PRICE} · Pago único`}
                  title="Aprende a construir una primera aplicación web y prepararla para publicar."
                  body="Diseñado para que no te quedes frente a la pantalla en blanco: sigues pasos guiados con plantillas o trabajas sobre una idea propia."
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
                  src="/taller/taller-ruta-2023-mockup.webp"
                  width="1280"
                  height="720"
                  loading="lazy"
                  decoding="async"
                  alt="Laptop con apps educativas funcionando junto a un cuaderno con el plan del taller"
                  className="aspect-video w-full rounded-2xl object-cover"
                />
                <figcaption className="px-2 pb-2 pt-3 text-center text-xs font-semibold text-[#3B5F52]">
                  De la idea en tu cuaderno a una aplicación web publicada en internet y exportable en HTML.
                </figcaption>
              </figure>
            </div>

            {/* Los 3 caminos prácticos dentro del taller (Pregunta 45) */}
            <div className="mt-14 rounded-[24px] border border-[#D8E5DD] bg-[#F4F9F6] p-6 sm:p-8">
              <div className="max-w-3xl">
                <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#286F5A]">
                  Cero bloqueo al empezar · Tus 3 opciones de salida
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold text-[#193B36]">
                  Elige cualquiera de estos 3 caminos prácticos dentro del taller según tu punto de partida
                </h3>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {workshopPaths.map(path => (
                  <div key={path.title} className="rounded-2xl border border-[#DCE8E0] bg-white p-5 shadow-xs">
                    <span className="inline-block rounded-full bg-[#E8F4EC] px-3 py-1 text-[11px] font-bold text-[#21614B]">
                      {path.badge}
                    </span>
                    <h4 className="mt-3 font-display text-lg font-bold text-[#1D3542]">{path.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-[#5B6D7A]">{path.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-[#D4E3DA] bg-white p-4 text-xs leading-6 text-[#4D6370] sm:p-5">
                <strong className="text-[#193E36]">Lo que incluye y lo que NO incluye este taller de {OFFICIAL_PRICE}:</strong>{' '}
                En este taller aprendes a dirigir la construcción de una mini app educativa y a preparar su publicación; los planes gratuitos tienen límites y un dominio propio puede tener costo. No incluye que yo construya la app por ti ni soporte técnico individual indefinido. El acompañamiento semanal en vivo y la revisión grupal de proyectos se ofrecen por separado en la comunidad de Skool (US$19/mes).
              </div>
            </div>
          </div>
        </section>

        {/* 4. CÓMO FUNCIONA EL MÉTODO */}
        <section id="metodo" className="px-5 py-20 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              label="Cómo funciona el método"
              title="Tres pasos reales: de la idea en tu cabeza a un enlace web funcionando"
              body="Sin jerga en inglés ni copiar código a ciegas. Tú pones tu experiencia docente y el objetivo; la IA ejecuta el trabajo pesado bajo tu dirección."
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

        {/* 5. APPS REALES + TABLA PERIÓDICA (+500K VISTAS) + MATH STUDIO */}
        <section id="proyectos" className="border-y border-[#E0E8E4] bg-white px-5 py-20 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              label="Proyectos reales · 7 destacados y demos interactivas"
              title="No te enseño teoría suelta: abre y prueba las aplicaciones que ya construí con este flujo."
              body="Tengo más de 70 proyectos web en mis repositorios, en distintos estados. Aquí puedes abrir siete aplicaciones destacadas, probar la Tabla Periódica Interactiva y explorar Math Studio; entre ellas hay herramientas que utilizo en mis clases."
            />

            {/* Destacado del caso viral de Tabla Periódica (+500,000 vistas) */}
            <div className="mt-10 rounded-[24px] border border-[#C7DFD1] bg-gradient-to-r from-[#173A35] to-[#1F4F46] p-6 text-white shadow-md sm:p-8">
              <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
                <div className="max-w-3xl">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[.12em] text-[#A8F0D1]">
                    <Sparkles className="size-3.5" /> Caso real de tracción orgánica · +500,000 visualizaciones en TikTok
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-bold text-white">
                    Tabla Periódica Interactiva (tablaperiodica.sistemazenit.com)
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[#D9EDE4]">
                    Nacida de un video viral que ya superó el medio millón de visualizaciones orgánicas: permite a miles de estudiantes descargar láminas de estudio y hacer clic en cada elemento químico para explorar sus propiedades y configuración electrónica en tiempo real.
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-3">
                  <a
                    href="https://tablaperiodica.sistemazenit.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#34C08B] px-5 py-3.5 text-xs font-extrabold text-[#0E2923] transition hover:bg-[#4AD39F] sm:text-sm"
                  >
                    Abrir Tabla Periódica <ExternalLink className="size-4" />
                  </a>
                  <a
                    href="https://xavier.cabellosalirrosas.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-3.5 text-xs font-bold text-white transition hover:bg-white/20 sm:text-sm"
                  >
                    Ver portafolio general <ExternalLink className="size-4" />
                  </a>
                </div>
              </div>
            </div>

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
                <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#286F5A]">
                  Para enseñar matemáticas y ciencias
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
                  Para automatizar evaluaciones, gestiones y negocios
                </p>
                <div className="mt-5 grid gap-5 md:grid-cols-3">
                  {toolProjects.map(project => (
                    <ProjectCard key={project.name} project={project} />
                  ))}
                </div>
              </div>
            )}

            {/* Ejemplos concretos para docentes de otras áreas (Pregunta 60) */}
            <div className="mt-12 rounded-[24px] border border-[#DCE7E0] bg-[#F8FAF8] p-6 sm:p-8">
              <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#286F5A]">
                ¿Y si enseñas otro curso o trabajas en otra área educativa?
              </p>
              <h3 className="mt-2 font-display text-xl font-bold text-[#1C3442] sm:text-2xl">
                Lo que puedes construir aunque no seas profesor de matemáticas
              </h3>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {otherAreasExamples.map(item => (
                  <div key={item.area} className="rounded-2xl border border-[#E1ECE5] bg-white p-5">
                    <h4 className="font-display text-base font-bold text-[#193E36]">{item.area}</h4>
                    <p className="mt-2 text-sm leading-6 text-[#5B6D7A]">{item.ideas}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 rounded-[24px] border border-[#CFE0D6] bg-[#F5FAF7] p-6 sm:p-8">
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
                  <h3 className="mt-3 font-display text-2xl font-bold text-[#193B36]">
                    Math Studio: mi laboratorio de gráficas
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[#536B63]">
                    9 tipos de funciones, las 6 razones trigonométricas y sus inversas, derivadas y sumas de Riemann. Elige el nivel y explora cómo funciona por dentro una herramienta hecha con este método.
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

        {/* 6. QUIÉN TE ENSEÑA — HISTORIA REAL + FILOSOFÍA SISTEMA ZÉNIT */}
        <section id="fundador" className="border-y border-[#DDE6E0] bg-[#EDF4EE] px-5 py-20 sm:px-8 sm:py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[.75fr_1.25fr]">
            <InstructorPortrait />
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.17em] text-[#366F5C]">
                <Users className="size-4" /> Quién te enseña · De docente a docente
              </p>
              <h2 className="mt-5 font-display text-[clamp(1.95rem,3.6vw,3.15rem)] font-bold leading-[1.12] tracking-[-.05em] text-[#1E3938]">
                Soy Juan Xavier Cabello: profesor de matemáticas (+8 años en aula) y creador de más de 70 proyectos web con IA.
              </h2>
              <div className="mt-6 space-y-4 text-base leading-8 text-[#40584F]">
                <p>
                  Enseño matemáticas en secundaria y nivel preuniversitario en Perú desde hace más de ocho años, entre colegios, academias y tutorías particulares.
                </p>
                <p>
                  Antes de llegar a este método pasé por todos los tropiezos posibles: en 2018 me endeudé dos años intentando vender páginas en WordPress; entre 2021 y 2022 dediqué casi un año entero a armar una app de tablas de multiplicar con bloques en MIT App Inventor, gasté en anuncios de Google Ads para conseguir apenas 130 descargas y perdí la aplicación cuando Google Play cerró mi cuenta por políticas de actualización; y en abril de 2023 me volví a endeudar entrando a un bootcamp intensivo de programación full stack de 16 semanas donde iteraba hasta 130 veces con ChatGPT por tarea y comprobé lo frustrante que es escribir código a mano cuando todo se desactualiza cada mes.
                </p>
                <p>
                  Cuando entendí que <strong>la inteligencia artificial no reemplaza al docente, sino que multiplica a quien sabe dirigirla con la información de su propio campo</strong>, todo cambió. Hoy tengo más de 70 proyectos web en mis repositorios, en distintas etapas de avance. En el aula he utilizado herramientas que construí para explorar conceptos y preparar materiales imprimibles; este taller comparte parte del método detrás de ese trabajo.
                </p>
              </div>

              {/* Filosofía Sistema Zénit (Pregunta 100) */}
              <div className="mt-6 rounded-2xl border border-[#C5DBD0] bg-white p-5 text-sm leading-7 text-[#355248] shadow-xs">
                <strong className="font-display text-base text-[#193B36]">Por qué se llama Sistema Zénit:</strong>{' '}
                <em>Zénit</em> significa llegar a tu punto más alto. Las buenas intenciones o las ideas guardadas en un cuaderno no cambian tu realidad si no tienes un sistema ordenado que te lleve a ejecutarlas.
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  className="inline-flex items-center gap-2 rounded-xl border border-[#BED6C7] bg-white px-4 py-3 text-xs font-bold text-[#2B6654] transition hover:bg-[#F6FAF6]"
                  href="https://xavier.cabellosalirrosas.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver mi portafolio completo <ExternalLink className="size-4" />
                </a>
                <a
                  className="inline-flex items-center gap-2 rounded-xl border border-[#BED6C7] bg-white px-4 py-3 text-xs font-bold text-[#2B6654] transition hover:bg-[#F6FAF6]"
                  href="https://transformacionesgeometricas.sistemazenit.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Probar Transformaciones Geométricas <ExternalLink className="size-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 7. INSCRIPCIÓN, GARANTÍA DE 7 DÍAS Y ESCALERA TRANSPARENTE */}
        <section id="comprar" className="bg-[#F8F9F7] px-5 py-20 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              label="Inscripción al taller"
              title={`Aprende a construir y publicar una primera web interactiva por ${OFFICIAL_PRICE}.`}
              body="Pago único de US$9 por un mes de acceso al taller y sus grabaciones. La garantía de 7 días se tramita según las condiciones de Hotmart."
            />

            <div className="mx-auto mt-12 grid max-w-5xl overflow-hidden rounded-[26px] border border-[#D8E2DC] bg-white shadow-[0_20px_65px_rgba(22,54,42,.08)] lg:grid-cols-[1.08fr_.92fr]">
              <div className="p-7 sm:p-10">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#EDF6F0] px-3 py-2 text-[11px] font-extrabold uppercase tracking-[.12em] text-[#2D7358]">
                  <BookOpen className="size-4" /> Taller de Entrada · Método Sistema Zénit
                </div>
                <h3 className="mt-6 font-display text-[clamp(1.6rem,2.5vw,2.3rem)] font-bold leading-[1.18] text-[#203744]">
                  Una ruta práctica para definir, construir y revisar una mini app educativa con IA.
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#647587]">
                  Incluye 3 sesiones prácticas en vivo de unas 2 horas cada una, grabaciones disponibles durante 30 días, guías y plantillas, y acceso a 3 proyectos educativos para adaptar. La meta es que construyas una primera versión sencilla y aprendas a prepararla para publicar; si partes de cero, configurar tus herramientas puede tomar alrededor de dos semanas.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl bg-[#F7FAF8] p-4">
                    <p className="text-xs font-bold uppercase tracking-[.12em] text-[#537968]">Requisitos mínimos</p>
                    <p className="mt-2 text-sm leading-6 text-[#526675]">
                      Una laptop o PC, conexión a internet, manejo básico de computadora (Word/teclado) y una cuenta gratuita de Gmail.
                    </p>
                  </div>
                  <div className="rounded-xl bg-[#F7FAF8] p-4">
                    <p className="text-xs font-bold uppercase tracking-[.12em] text-[#537968]">Garantía de 7 días según Hotmart</p>
                    <p className="mt-2 text-sm leading-6 text-[#526675]">
                      La compra incluye una garantía de 7 días, de acuerdo con las condiciones publicadas por Hotmart al momento del pago.
                    </p>
                  </div>
                </div>

                <p className="mt-7 rounded-xl border border-[#E5EBE7] bg-[#F8FAF8] p-4 text-xs leading-6 text-[#5E7280]">
                  <strong>Siguiente escalón opcional:</strong> En este taller de {OFFICIAL_PRICE} aprendes a construir tu app tú mismo. Una vez dentro, quienes deseen seguimiento continuo cada semana, llamadas en vivo, soporte técnico revisando su repositorio y módulos de monetización y embudos de venta podrán sumarse opcionalmente a nuestra comunidad en Skool (US$19/mes).
                </p>
              </div>

              <div className="border-t border-[#E2E9E3] bg-[#F0F6F1] p-7 sm:p-10 lg:border-l lg:border-t-0">
                <p className="text-xs font-bold uppercase tracking-[.15em] text-[#537968]">Pago único · acceso por 30 días</p>
                <div className="mt-3 flex items-end gap-3">
                  <strong className="font-display text-[clamp(3.3rem,6vw,5.1rem)] font-bold leading-none tracking-[-.09em] text-[#193E36]">
                    {OFFICIAL_PRICE}
                  </strong>
                  <span className="pb-2 text-sm font-semibold text-[#60796A]">pago único</span>
                </div>

                <div className="my-7 border-t border-[#D6E4DA]" />

                <div className="rounded-2xl border border-[#D4E3D9] bg-white p-5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-extrabold uppercase tracking-[.12em] text-[#286F5A]">Inscripción al taller</p>
                    <span className="rounded-full bg-[#EAF4ED] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#266B56]">
                      En preparación
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-6 text-[#4D6370] sm:p-5">
                    El checkout de Hotmart se habilitará cuando esté conectado el enlace oficial de compra.
                  </p>
                  <div className="mt-4">
                    <HotmartCheckoutButton />
                  </div>
                </div>

                <p className="mt-5 flex items-start gap-2 text-xs leading-6 text-[#62796C]">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0" />
                  Garantía de 7 días según las condiciones de Hotmart · No se requiere una suscripción de IA de pago para empezar.
                </p>
              </div>
            </div>

            <div className="mx-auto mt-8 max-w-5xl">
              <WaitlistForm />
            </div>
          </div>
        </section>

        {/* 8. FILTRO HONESTO: PARA QUIÉN ES Y PARA QUIÉN NO */}
        <section id="para-quien" className="px-5 py-20 sm:px-8 sm:py-24">
          <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
            <div className="rounded-[24px] border border-[#CBDED2] bg-[#EAF4ED] p-7 sm:p-9">
              <h2 className="font-display text-2xl font-bold text-[#193C35]">Es para ti si...</h2>
              <ul className="mt-6 space-y-4 text-sm leading-7 text-[#466458]">
                <li className="flex gap-3">
                  <Check className="mt-1 size-5 shrink-0 text-[#27775D]" />
                  Eres profesor de matemáticas, ciencias (Física, Química, Biología) o de cualquier área, tutor particular, coordinador, capacitador o creador educativo.
                </li>
                <li className="flex gap-3">
                  <Check className="mt-1 size-5 shrink-0 text-[#27775D]" />
                  Tienes ideas guardadas en un cuaderno o celular y quieres convertirlas en herramientas web reales para tus clases, tu institución o tu marca personal.
                </li>
                <li className="flex gap-3">
                  <Check className="mt-1 size-5 shrink-0 text-[#27775D]" />
                  Cuentas con lo mínimo indispensable: una laptop o PC, conexión a internet, manejo básico de computadora (Word/teclado) y una cuenta gratuita de Gmail.
                </li>
                <li className="flex gap-3">
                  <Check className="mt-1 size-5 shrink-0 text-[#27775D]" />
                  Quieres aprender un sistema práctico y honesto para dirigir a la IA sin depender de programadores ni gastar en servidores mensuales.
                </li>
              </ul>
            </div>

            <div className="rounded-[24px] border border-[#E1E6EB] bg-white p-7 sm:p-9">
              <h2 className="font-display text-2xl font-bold text-[#26374B]">No es para ti si...</h2>
              <ul className="mt-6 space-y-4 text-sm leading-7 text-[#69798C]">
                <li className="flex gap-3">
                  <span className="mt-2 size-2 shrink-0 rounded-full bg-[#9AA8B5]" />
                  Buscas promesas mágicas de hacerte rico de la noche a la mañana sin trabajar ni aprender.
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 size-2 shrink-0 rounded-full bg-[#9AA8B5]" />
                  Quieres que otra persona construya la aplicación por ti en lugar de aprender a dirigirla tú mismo.
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 size-2 shrink-0 rounded-full bg-[#9AA8B5]" />
                  No estás dispuesto a dedicarle unas horas de enfoque durante una o dos semanas para configurar tus herramientas y publicar tu primer proyecto.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 9. PREGUNTAS FRECUENTES — LAS OBJECIONES REALES RESPONDIDAS */}
        <section id="preguntas" className="border-t border-[#E0E8E4] bg-white px-5 py-20 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-4xl">
            <SectionHeading
              label="Preguntas frecuentes"
              title="Respuestas directas y sin rodeos antes de entrar"
            />
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
