import { useState } from 'react';
import { CheckCircle2, Clock, FileText, Film, Sparkles } from 'lucide-react';

/**
 * PEGA AQUÍ EL ENLACE DE TU VIDEO VSL (YouTube, Vimeo, PandaVideo, Bunny, Loom o archivo .mp4)
 * o configúralo en tu archivo .env como: VITE_VSL_VIDEO_URL="https://..."
 */
const DEFAULT_VSL_VIDEO_URL = '';

interface VslChapter {
  id: string;
  time: string;
  title: string;
  summary: string;
  takeaway: string;
}

interface VslScriptBlock {
  time: string;
  title: string;
  text: string;
}

const VSL_CHAPTERS: VslChapter[] = [
  {
    id: 'revelacion',
    time: '0:00 – 1:45',
    title: '1. La IA no adivina tu contexto',
    summary:
      'Por qué una instrucción vaga puede dejarte con un resultado genérico, y cómo tu experiencia profesional ayuda a orientar y revisar lo que la IA construye.',
    takeaway: 'Tu criterio aporta el contexto; la IA ayuda a ejecutar.',
  },
  {
    id: 'metodo',
    time: '1:45 – 4:00',
    title: '2. Entrevista Inversa y Plan Maestro',
    summary:
      'Antes de construir, organizas tu idea, el objetivo, las personas que usarán la herramienta y las pantallas o funciones que necesitas.',
    takeaway: 'Un plan revisado reduce los cambios a ciegas; no elimina toda iteración.',
  },
  {
    id: 'caminos',
    time: '4:00 – 5:45',
    title: '3. Elige una ruta y aprende a publicar',
    summary:
      'Puedes adaptar uno de tres proyectos educativos, partir de un repositorio de GitHub o desarrollar una mini app propia. Luego revisas las opciones de publicación y sus límites.',
    takeaway: 'Puedes empezar con herramientas gratuitas, dentro de los límites de cada plan.',
  },
  {
    id: 'oferta',
    time: '5:45 – 7:15',
    title: '4. Qué incluye el taller de US$9',
    summary:
      'Tres sesiones en vivo de unas dos horas, grabaciones disponibles durante 30 días, guías y plantillas, y acceso a tres proyectos para adaptar.',
    takeaway: 'US$9 de pago único por un mes de acceso; garantía de 7 días según las condiciones de Hotmart.',
  },
];

const VSL_FULL_SCRIPT: VslScriptBlock[] = [
  {
    time: '0:00 – 0:40',
    title: 'Bloque 1 · Gancho: Demoler el mito',
    text: '«Soy Juan Xavier Cabello, profesor de matemáticas en Perú. Si trabajas en educación y tienes una idea de clase que quisieras convertir en una herramienta interactiva, quiero mostrarte el método que uso para organizarla, dirigir a la IA y revisar lo que construye. La IA no adivina tu experiencia ni tu objetivo: eso lo pones tú.»',
  },
  {
    time: '0:40 – 1:45',
    title: 'Bloque 2 · El problema real en el aula y en casa',
    text: '«En una clase de 30 o 40 minutos, dibujar varias representaciones puede quitarte tiempo para guiar la exploración. A mí me pasó con transformaciones geométricas: por eso construí una herramienta para mostrar los cambios en vivo y preparar fichas imprimibles.»',
  },
  {
    time: '1:45 – 3:00',
    title: 'Bloque 3 · Historia real sin filtro (más de 70 proyectos web)',
    text: '«Llevo más de ocho años enseñando matemáticas en colegios, academias y tutorías. Probé WordPress, aplicaciones móviles, estudio de programación y distintos flujos con IA; aprendí por experiencia propia que la herramienta ejecuta rápido, pero hace falta una persona que conozca el tema y compruebe el resultado. Hoy tengo más de 70 proyectos en mis repositorios, en distintos estados de avance.»',
  },
  {
    time: '3:00 – 5:45',
    title: 'Bloques 4, 5 y 6 · Revelación Humano × IA y los 3 pasos',
    text: '«La IA necesita más de tu contexto del que mucha gente imagina. Organizamos la idea con una Entrevista Inversa y un Plan Maestro; eliges entre adaptar uno de tres proyectos, partir de un repositorio o crear una mini app, y revisas cómo prepararla para publicar. Los planes gratuitos pueden ser suficientes para comenzar, con sus límites.»',
  },
  {
    time: '5:45 – 7:15',
    title: 'Bloques 7 y 8 · Qué recibes por US$9, transparencia y cierre',
    text: '«El taller cuesta US$9 en pago único e incluye tres sesiones en vivo de unas dos horas, grabaciones durante 30 días, guías, plantillas y acceso a tres proyectos educativos para adaptar. Hotmart ofrece una garantía de 7 días según sus condiciones. No es soporte individual indefinido ni promete ingresos o un plazo fijo para publicar. Quienes quieran acompañamiento semanal pueden sumarse por separado a la comunidad de Skool, prevista en US$19 al mes.»',
  },
];

function parseVideoUrl(raw?: string): string | null {
  if (!raw) return null;
  try {
    const parsed = new URL(raw.trim());
    if (parsed.protocol !== 'https:') return null;
    return parsed.href;
  } catch {
    return null;
  }
}

function isDirectVideoFile(url: string): boolean {
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);
}

export default function HeroVslPlayer({ customVideoUrl }: { customVideoUrl?: string }) {
  const [activeChapterId, setActiveChapterId] = useState<string>(VSL_CHAPTERS[0].id);
  const [showScriptDrawer, setShowScriptDrawer] = useState(false);

  const rawUrl = customVideoUrl || import.meta.env.VITE_VSL_VIDEO_URL || DEFAULT_VSL_VIDEO_URL;
  const videoUrl = parseVideoUrl(rawUrl);
  const activeChapterIndex = Math.max(
    0,
    VSL_CHAPTERS.findIndex(chapter => chapter.id === activeChapterId),
  );
  const activeChapter = VSL_CHAPTERS[activeChapterIndex] ?? VSL_CHAPTERS[0];

  return (
    <div
      className="zenit-vsl-shell mx-auto w-full max-w-4xl overflow-hidden rounded-[28px] border-2 bg-white"
      aria-label="Presentación en video del taller Sistema Zénit"
    >
      {/* Barra superior del reproductor VSL */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#653622] bg-[#21191B] px-4 py-3 text-white sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex size-2.5 rounded-full bg-[#FFC14F] shadow-[0_0_10px_#FFC14F]" />
            <span className="text-[11px] font-extrabold uppercase tracking-[.14em] text-[#FFEAD4]">
              Guion de presentación · Sistema Zénit
          </span>
        </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-[#FFEAD4]">
            <Clock className="size-3.5 text-[#FFC664]" /> Video pendiente · Juan Xavier Cabello
        </span>
      </div>

      {/* Marco principal 16:9 (aspect-video) para el reproductor de video */}
      <div className={`relative ${videoUrl ? 'aspect-video' : 'min-h-[320px] sm:aspect-video'} w-full overflow-hidden bg-[#171316]`}>
        {videoUrl ? (
          isDirectVideoFile(videoUrl) ? (
            <video
              src={videoUrl}
              poster="/taller/taller-ruta-2023-mockup.webp"
              controls
              playsInline
              className="h-full w-full object-cover"
            >
              Tu navegador no soporta la reproducción de video.
            </video>
          ) : (
            <iframe
              src={videoUrl}
              title="Video de presentación del taller Sistema Zénit"
              className="h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )
        ) : (
          /* Portada legible del guion mientras se prepara el video real */
          <div className="relative flex h-full w-full flex-col justify-between p-4 text-white sm:p-7 md:p-9">
            {/* Imagen de fondo sutil + gradiente cinematográfico */}
            <img
              src="/taller/taller-ruta-2023-mockup.webp"
              width="1280"
              height="720"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-luminosity"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#171114] via-[#25191A]/90 to-[#1D1719]/85"
            />

            {/* Fila superior dentro del reproductor 16:9 */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#FFC14F]/35 bg-[#382319]/90 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[.12em] text-[#FFD991] sm:text-xs">
                <FileText className="size-3.5" /> El video de presentación aún no está configurado
              </span>

              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-2.5 py-1 backdrop-blur-xs">
                <img
                  src="/instructor/xavier-cabello.webp"
                  width="28"
                  height="28"
                  alt="Juan Xavier Cabello"
                  className="size-6 rounded-full object-cover object-top"
                />
                <span className="text-[11px] font-semibold text-[#F5E8DD]">Prof. Juan Xavier Cabello</span>
              </div>
            </div>

            {/* Portada de la presentación: el botón abre el guion, no finge reproducir un video */}
            <div className="relative z-10 my-auto flex flex-col items-center text-center">
                <button
                  type="button"
                  onClick={() => setShowScriptDrawer(v => !v)}
                  aria-expanded={showScriptDrawer}
                  aria-label="Leer guion completo de la presentación"
                className="group relative flex size-16 items-center justify-center rounded-full bg-[#F0A33A] text-[#30160D] shadow-[0_0_45px_rgba(240,125,43,.42)] transition duration-300 hover:scale-105 hover:bg-[#FFD067] sm:size-20"
              >
                <span className="animate-ping-slow pointer-events-none absolute inset-0 rounded-full bg-[#F0A33A]/30" />
                <FileText className="size-7 sm:size-9" />
              </button>

              <p className="mt-3 max-w-2xl font-display text-sm font-bold leading-snug text-white sm:mt-4 sm:text-xl md:text-2xl">
                «La inteligencia artificial necesita más de ti y de tu información que tú de ella»
              </p>
              <p className="mt-1.5 hidden max-w-xl text-xs leading-relaxed text-[#E3D1C3] sm:block sm:text-sm">
                Cómo convertí necesidades reales del aula en herramientas interactivas y organizo a la IA para construir una primera versión.
              </p>

              <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowScriptDrawer(v => !v)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#FFC14F]/38 bg-[#39241D]/90 px-3 py-1.5 text-[11px] font-bold text-[#FFD991] transition hover:bg-[#59321F]"
                >
                  <FileText className="size-3.5" />
                  {showScriptDrawer ? 'Ocultar guion de la presentación' : 'Leer el guion de la presentación'}
                </button>
                <a
                  href="#proyectos"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-bold text-white transition hover:bg-white/20"
                >
                  <Film className="size-3.5" /> Probar proyectos reales
                </a>
              </div>
            </div>

            {/* Barra de controles inferior estilo reproductor VSL 16:9 */}
              <div className="relative z-10 rounded-xl border border-white/10 bg-black/45 px-3 py-2 backdrop-blur-xs sm:px-4 sm:py-2.5">
              {/* Navegación de etapas del guion; no es una barra de progreso de video */}
              <div className="grid grid-cols-4 gap-1.5" role="group" aria-label="Etapas de la presentación">
                {VSL_CHAPTERS.map((chapter, index) => {
                  const isActive = index === activeChapterIndex;
                  return (
                    <button
                      key={chapter.id}
                      type="button"
                      onClick={() => setActiveChapterId(chapter.id)}
                      title={`${chapter.time} · ${chapter.title}`}
                      aria-label={`Ir al capítulo ${chapter.title} (${chapter.time})`}
                      className="group py-1 text-left"
                    >
                      <span
                        className={`block h-1.5 w-full rounded-full transition ${
                        isActive ? 'bg-[#FFC14F]' : 'bg-white/25 group-hover:bg-white/45'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              <div className="mt-1.5 flex items-center justify-between gap-2 text-[11px] font-semibold text-[#D6EBE2]">
                <span className="truncate text-[10px] text-[#B8D8CA]">{activeChapter.title}</span>
                <span className="text-[10px] text-[#B8D8CA]">Etapa {activeChapterIndex + 1} de {VSL_CHAPTERS.length}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Guion desplegable completo del VSL para lectura o grabación */}
      {showScriptDrawer && (
              <div className="border-t border-[#653622] bg-[#1C1518] p-5 text-white sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[.14em] text-[#FFD267]">
                Guion íntegro del VSL · Estructura de 5 bloques
              </p>
              <p className="mt-0.5 text-xs text-[#E2D0C3]">
                Basado 100% en las 100 respuestas de la entrevista del taller Sistema Zénit.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowScriptDrawer(false)}
              className="rounded-lg border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold text-white hover:bg-white/20"
            >
              Cerrar guion
            </button>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {VSL_FULL_SCRIPT.map(block => (
              <div key={block.title} className="rounded-xl border border-white/10 bg-[#2A1C1B] p-3.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#FFD267]">
                  {block.time}
                </span>
                <h3 className="mt-1 font-display text-sm font-bold text-white">{block.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[#EADBD0]">{block.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selector interactivo de los 4 capítulos debajo del reproductor 16:9 */}
      <div className="border-t border-[#E9D6C6] bg-[#FBF7F1] p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-[11px] font-extrabold uppercase tracking-[.14em] text-[#A84B25]">
            Resumen del guion por etapas (haz clic para explorar)
          </p>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#735F54]">
            <Sparkles className="size-3.5 text-[#C0672B]" /> 4 capítulos clave
          </span>
        </div>

        <div
          role="tablist"
          aria-label="Etapas del guion de presentación"
          className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4"
        >
          {VSL_CHAPTERS.map(chapter => {
            const active = chapter.id === activeChapter.id;
            return (
              <button
                key={chapter.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveChapterId(chapter.id)}
                className={`flex flex-col items-start rounded-xl border p-2.5 text-left transition ${
                  active
                    ? 'border-[#8E3D22] bg-[#8E3D22] text-white shadow-sm'
                    : 'border-[#E7D9CA] bg-white text-[#493229] hover:border-[#D8A46C]'
                }`}
              >
                <span className={`text-[10px] font-bold ${active ? 'text-[#FFD891]' : 'text-[#806A5B]'}`}>
                  {chapter.time}
                </span>
                <span className="mt-1 text-xs font-bold leading-snug">{chapter.title}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-3.5 rounded-2xl border border-[#E9DCCF] bg-white p-4">
          <p className="text-xs leading-6 text-[#5E514B] sm:text-sm">{activeChapter.summary}</p>
          <p className="mt-2.5 flex items-start gap-2 text-xs font-bold text-[#77401F]">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#C35A24]" />
            <span>{activeChapter.takeaway}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
