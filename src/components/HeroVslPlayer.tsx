import { useState } from 'react';
import { CheckCircle2, Clock, FileText, Film, Maximize2, Play, Sparkles, Volume2 } from 'lucide-react';

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
    title: '1. La verdad: Humano × IA',
    summary:
      'Por qué pedirle una app a la IA con dos líneas de texto siempre termina en material genérico o errores, y por qué la IA necesita más de tu experiencia docente que tú de ella.',
    takeaway: 'En los últimos 2 meses construí más de 60 web apps sin tocar una sola línea de código a mano.',
  },
  {
    id: 'metodo',
    time: '1:45 – 4:00',
    title: '2. Entrevista Inversa y Plan Maestro',
    summary:
      'En lugar de adivinar qué instrucción darle, haces que la IA te entreviste primero con preguntas y respuestas sobre tu clase, tus alumnos y tu objetivo antes de construir.',
    takeaway: 'Pasas de la idea guardada en tu cuaderno a un Plan Maestro claro sin iterar 100 veces.',
  },
  {
    id: 'caminos',
    time: '4:00 – 5:45',
    title: '3. Tus 3 caminos y despliegue $0',
    summary:
      'Cómo elegir entre personalizar 3 proyectos míos ya listos, clonar repositorios probados de GitHub o crear tu mini app desde cero, publicándola gratis en GitHub Pages o Cloudflare.',
    takeaway: 'Sales con un enlace web real funcionando y sin pagar servidores ni suscripciones obligatorias.',
  },
  {
    id: 'oferta',
    time: '5:45 – 7:15',
    title: '4. Qué incluye el taller de US$9',
    summary:
      'Resumen transparente de las 3 sesiones prácticas en vivo + grabaciones, qué incluye, qué no incluye y cómo funciona la garantía completa de 7 días.',
    takeaway: 'Entrada accesible de US$9 (pago único) para que el precio nunca sea una traba.',
  },
];

const VSL_FULL_SCRIPT: VslScriptBlock[] = [
  {
    time: '0:00 – 0:40',
    title: 'Bloque 1 · Gancho: Demoler el mito',
    text: '«Si eres profesor, tutor, capacitador o trabajas en educación, quiero mostrarte cómo construir tu propia aplicación web en menos de 7 a 14 días y desplegarla en internet sin pagar servidores. En estos últimos dos meses he construido más de 60 aplicaciones web educativas sin escribir a mano ni una sola línea de código. Pero no lo hice abriendo ChatGPT y lanzándole una orden de dos líneas esperando un milagro...»',
  },
  {
    time: '0:40 – 1:45',
    title: 'Bloque 2 · El problema real en el aula y en casa',
    text: '«En el aula tienes 30 o 40 minutos y si pasas media clase dibujando en la pizarra, los chicos se distraen. Y en casa pasas domingos por la tarde o noches hasta las 11 p. m. armando fichas. Tus mejores ideas se quedan en un cuaderno porque PowerPoint o PDF son planos, GeoGebra toma mucho tiempo y pedir cosas sueltas a la IA te deja en un bucle donde arregla una cosa y rompe otra.»',
  },
  {
    time: '1:45 – 3:00',
    title: 'Bloque 3 · Historia real sin filtro (de 2018 a +70 apps)',
    text: '«Soy Juan Xavier Cabello, profesor de matemáticas con más de 8 años en secundaria y preuniversitario en Perú. Me endeudé con WordPress en 2018, pasé casi un año en MIT App Inventor entre 2021 y 2022 hasta que Google Play cerró mi cuenta, y en abril de 2023 me volví a endeudar en un bootcamp full stack donde iteraba hasta 130 veces con ChatGPT. Todo cambió al unir mi criterio docente con este nuevo flujo: hoy llevo más de 70 web apps funcionales y nuestra Tabla Periódica superó las 500,000 vistas orgánicas.»',
  },
  {
    time: '3:00 – 5:45',
    title: 'Bloques 4, 5 y 6 · Revelación Humano × IA y los 3 pasos',
    text: '«La IA necesita más de ti y de tu información que tú de ella. Por eso usamos 3 pasos: 1) Entrevista Inversa y Plan Maestro (la IA te pregunta a ti primero); 2) Construcción sin código por 3 caminos (personalizar mis 3 apps listas, clonar de GitHub o crear desde cero); y 3) Publicación con costo $0 en GitHub Pages, Cloudflare Pages o Vercel.»',
  },
  {
    time: '5:45 – 7:15',
    title: 'Bloques 7 y 8 · Qué recibes por US$9, transparencia y cierre',
    text: '«Por un único pago de US$9 recibes las 3 sesiones en vivo + 30 días de grabaciones, mis 3 proyectos educativos listos y las plantillas de Entrevista Inversa, con 7 días de garantía completa. No incluye que yo haga la app por ti ni soporte 1 a 1 indefinido (quienes luego quieran acompañamiento semanal tienen la comunidad opcional en Skool por US$19/mes). Zénit significa llegar a tu punto más alto: haz clic debajo del video y nos vemos adentro.»',
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
      className="mx-auto w-full max-w-4xl overflow-hidden rounded-[28px] border-2 border-[#C5DBD0] bg-white shadow-[0_28px_80px_rgba(18,48,39,.16)]"
      aria-label="Presentación en video del taller Sistema Zénit"
    >
      {/* Barra superior del reproductor VSL */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#214B43] bg-[#112A26] px-4 py-3 text-white sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex size-2.5 rounded-full bg-[#38D399] shadow-[0_0_10px_#38D399]" />
          <span className="text-[11px] font-extrabold uppercase tracking-[.14em] text-[#D7EFE4]">
            Video de Presentación (VSL) · Sistema Zénit
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-[#E5F5EC]">
          <Clock className="size-3.5 text-[#67E2B4]" /> 7:15 min · Por Juan Xavier Cabello
        </span>
      </div>

      {/* Marco principal 16:9 (aspect-video) para el reproductor de video */}
      <div className="relative aspect-video w-full overflow-hidden bg-[#0B1E1B]">
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
          /* Estado visual 16:9 listo para insertar el reproductor VSL */
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
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#081715] via-[#102B26]/90 to-[#0C221E]/85"
            />

            {/* Fila superior dentro del reproductor 16:9 */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#38D399]/35 bg-[#163D35]/90 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[.12em] text-[#9CF0CD] sm:text-xs">
                <Volume2 className="size-3.5" /> Activa tu sonido · Presentación paso a paso
              </span>

              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-2.5 py-1 backdrop-blur-xs">
                <img
                  src="/instructor/xavier-cabello.webp"
                  width="28"
                  height="28"
                  alt="Juan Xavier Cabello"
                  className="size-6 rounded-full object-cover object-top"
                />
                <span className="text-[11px] font-semibold text-[#E2F3EC]">Prof. Juan Xavier Cabello</span>
              </div>
            </div>

            {/* Centro del reproductor 16:9: Botón Play grande + Mensaje central */}
            <div className="relative z-10 my-auto flex flex-col items-center text-center">
              <button
                type="button"
                onClick={() => setShowScriptDrawer(v => !v)}
                aria-expanded={showScriptDrawer}
                aria-label="Ver avance y guion completo del video de presentación"
                className="group relative flex size-16 items-center justify-center rounded-full bg-[#34C08B] text-[#0B231E] shadow-[0_0_45px_rgba(52,192,139,.5)] transition duration-300 hover:scale-105 hover:bg-[#49D6A0] sm:size-20"
              >
                <span className="animate-ping-slow pointer-events-none absolute inset-0 rounded-full bg-[#34C08B]/30" />
                <Play className="ml-1 size-7 fill-current sm:size-9" />
              </button>

              <p className="mt-3 max-w-2xl font-display text-sm font-bold leading-snug text-white sm:mt-4 sm:text-xl md:text-2xl">
                «La inteligencia artificial necesita más de ti y de tu información que tú de ella»
              </p>
              <p className="mt-1.5 hidden max-w-xl text-xs leading-relaxed text-[#C9E3D8] sm:block sm:text-sm">
                Cómo pasé de endeudarme estudiando programación tradicional a crear +70 web apps educativas con Entrevista Inversa y publicarlas gratis en internet.
              </p>

              <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowScriptDrawer(v => !v)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#56B893]/40 bg-[#173E36]/90 px-3 py-1.5 text-[11px] font-bold text-[#A9F2D4] transition hover:bg-[#205247]"
                >
                  <FileText className="size-3.5" />
                  {showScriptDrawer ? 'Ocultar guion completo del VSL' : 'Leer guion completo del VSL (7 min)'}
                </button>
                <a
                  href="#proyectos"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-bold text-white transition hover:bg-white/20"
                >
                  <Film className="size-3.5" /> Ver las 7 apps en vivo
                </a>
              </div>
            </div>

            {/* Barra de controles inferior estilo reproductor VSL 16:9 */}
            <div className="relative z-10 rounded-xl border border-white/10 bg-black/45 px-3 py-2 backdrop-blur-xs sm:px-4 sm:py-2.5">
              {/* Línea de progreso dividida en los 4 capítulos */}
              <div className="grid grid-cols-4 gap-1.5" role="group" aria-label="Línea de tiempo del video por capítulos">
                {VSL_CHAPTERS.map((chapter, index) => {
                  const completedOrActive = index <= activeChapterIndex;
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
                          completedOrActive ? 'bg-[#38D399]' : 'bg-white/25 group-hover:bg-white/45'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              <div className="mt-1.5 flex items-center justify-between gap-2 text-[11px] font-semibold text-[#D6EBE2]">
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setShowScriptDrawer(v => !v)}
                    className="inline-flex items-center gap-1 text-white hover:text-[#6EE7B7]"
                  >
                    <Play className="size-3.5 fill-current" />
                    <span>{activeChapter.time}</span>
                  </button>
                  <span className="hidden text-white/40 sm:inline">|</span>
                  <span className="hidden truncate text-[#9EE6C7] sm:inline">{activeChapter.title}</span>
                </div>

                <div className="flex items-center gap-2.5 text-[10px] text-[#B8D8CA]">
                  <span className="rounded bg-white/15 px-1.5 py-0.5 font-bold text-white">16:9 HD</span>
                  <Maximize2 className="size-3.5 opacity-80" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Guion desplegable completo del VSL para lectura o grabación */}
      {showScriptDrawer && (
        <div className="border-t border-[#224B43] bg-[#0E2421] p-5 text-white sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[.14em] text-[#6EE7B7]">
                Guion íntegro del VSL · Estructura de 8 bloques
              </p>
              <p className="mt-0.5 text-xs text-[#BFDCD0]">
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
              <div key={block.title} className="rounded-xl border border-white/10 bg-[#13312C] p-3.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#7CE5B9]">
                  {block.time}
                </span>
                <h3 className="mt-1 font-display text-sm font-bold text-white">{block.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[#D4EAE1]">{block.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selector interactivo de los 4 capítulos debajo del reproductor 16:9 */}
      <div className="border-t border-[#DCE8E1] bg-[#F6FAF7] p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-[11px] font-extrabold uppercase tracking-[.14em] text-[#2B6654]">
            Resumen del video por etapas (haz clic para explorar)
          </p>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#567266]">
            <Sparkles className="size-3.5 text-[#286F5A]" /> 4 capítulos clave
          </span>
        </div>

        <div
          role="tablist"
          aria-label="Etapas del video de presentación"
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
                    ? 'border-[#193F39] bg-[#193F39] text-white shadow-sm'
                    : 'border-[#D5E4DC] bg-white text-[#23443C] hover:border-[#9CC0B0]'
                }`}
              >
                <span className={`text-[10px] font-bold ${active ? 'text-[#9EE6C7]' : 'text-[#5A786B]'}`}>
                  {chapter.time}
                </span>
                <span className="mt-1 text-xs font-bold leading-snug">{chapter.title}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-3.5 rounded-2xl border border-[#DCE8E1] bg-white p-4">
          <p className="text-xs leading-6 text-[#4D6171] sm:text-sm">{activeChapter.summary}</p>
          <p className="mt-2.5 flex items-start gap-2 text-xs font-bold text-[#1D5844]">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#267754]" />
            <span>{activeChapter.takeaway}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
