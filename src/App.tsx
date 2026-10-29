import { useId, useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { 
  ArrowUpRight, 
  Check, 
  ChevronDown, 
  Cloud, 
  Code2, 
  Layers3, 
  Play, 
  ShieldCheck, 
  X,
  Sparkles,
  Gift,
  Lock,
  Zap,
  CheckCircle2
} from 'lucide-react';

import mentorPortraitVisual from './assets/mentor_portrait_1790998415489.jpg';
import workshopStudentVisual from './assets/workshop_student_1790998472338.jpg';
import imgMasterBundle from './assets/master_bundle_hero.jpg';

import { PeruCheckoutButton } from './components/PeruCheckoutButton';
import { vslConfig } from './vslConfig';

// A/B Testing & Conversión Multi-Oferta
import { type VariantId, VARIANTS, resolveVariantFromPath } from './data/variants';
import { AbTestingBar } from './components/AbTestingBar';
import { ComparisonTable } from './components/ComparisonTable';
import { AntiTrapSection } from './components/AntiTrapSection';


const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

const methodPhases = [
  {
    step: 'Paso 01',
    title: 'Estructurar tu Idea en Español',
    duration: '25 min',
    desc: 'Sin código. Defines el propósito, tu audiencia, los textos y las secciones clave con el Blueprint visual de 5 bloques.',
    bullets: ['Plantilla de especificación en 1 página', 'Definición de llamadas a la acción que venden', 'Cero términos técnicos abrumadores']
  },
  {
    step: 'Paso 02',
    title: 'Construir con Asistentes de IA (Vibe Coding)',
    duration: '45 min',
    desc: 'Alimentas a la IA con los prompts exactos en español. La IA redacta, diseña y genera el código mientras tú diriges el resultado.',
    bullets: ['Prompts probados para titulares y layouts', 'Ajuste visual responsivo para móviles', 'Interacción en tiempo real y corrección fluida']
  },
  {
    step: 'Paso 03',
    title: 'Publicar Gratis en Servidores Globales',
    duration: '35 min',
    desc: 'Conectas a la nube de grado empresarial (Cloudflare Pages / Vercel). Tu web queda en vivo para el mundo con certificado SSL en 1 clic.',
    bullets: ['Alojamiento 100% gratuito de por vida ($0/mes)', 'Certificado de seguridad HTTPS automático', 'Tu enlace listo para compartir en WhatsApp y redes']
  }
];

const inclusions = [
  {
    title: 'Taller práctico en vivo de 105 minutos',
    desc: '1 hora y 45 minutos de implementación guiada pura donde construimos y publicamos juntos en tiempo real.'
  },
  {
    title: 'Sesión en vivo de preguntas y desbloqueo (+45 min)',
    desc: 'Espacio dedicado para resolver dudas, revisar pantallas y asegurar que nadie se quede atrás.'
  },
  {
    title: 'Proyecto base profesional prediseñado',
    desc: 'Comienza con una arquitectura limpia de alta gama para nunca enfrentarte a la pantalla en blanco.'
  },
  {
    title: 'Biblioteca de prompts y comandos en español',
    desc: 'Instrucciones precisas para guiar a la IA sin errores técnicos ni frustraciones.'
  },
  {
    title: 'Checklist de revisión móvil y despliegue',
    desc: 'Asegura que tu web se vea perfecta en cualquier teléfono o pantalla antes de compartirla.'
  },
  {
    title: 'Grabación completa y acceso ilimitado de por vida',
    desc: 'Repasa a tu ritmo tantas veces como necesites para futuras páginas o herramientas.'
  },
];

const ctaClass = 'inline-flex w-full items-center justify-center gap-3 rounded-xl bg-linear-to-r/oklch from-brand-purple to-brand-fuchsia px-6 py-6 text-xl font-bold text-white shadow-[0_0_45px_rgba(217,70,239,0.35)] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] motion-reduce:transform-none sm:w-auto sm:px-12 sm:text-2xl';

interface PurchaseCtaProps {
  customText?: string;
  totalPrice?: number;
  selectedBumps?: string[];
}

function PurchaseCta({ customText }: PurchaseCtaProps) {
  return <PeruCheckoutButton label={customText || 'Inscribirme por US$9'} className={ctaClass} />;
}
function StickyMobileCta({ price = 9 }: { showCta?: boolean; price?: number }) {
  return <div className="fixed bottom-0 inset-x-0 z-50 border-t border-white/10 bg-slate-950/95 p-2 sm:hidden">
    <div className="mx-auto flex max-w-lg items-center justify-between gap-2">
      <span className="font-bold text-white">US${price} · Lanzamiento</span>
      <PeruCheckoutButton label="Inscribirme" className="rounded-lg bg-fuchsia-600 px-4 py-3 text-sm font-bold text-white disabled:opacity-60" />
    </div>
  </div>;
}

export default function App() {
  // Inicialización de la variante según la URL (/webcero, /bycoding, /agencia) o param ?v=
  const [currentVariant, setCurrentVariant] = useState<VariantId>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return resolveVariantFromPath(window.location.pathname, params.get('v'));
    }
    return 'creadores';
  });

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      setCurrentVariant(resolveVariantFromPath(window.location.pathname, params.get('v')));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSelectVariant = (id: VariantId) => {
    const targetPath = VARIANTS[id].path;
    window.history.pushState({}, '', targetPath);
    setCurrentVariant(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeVariant = VARIANTS[currentVariant];

  const [video, setVideo] = useState<HTMLVideoElement | null>(null);
  const [videoError, setVideoError] = useState(false);
  const [selectedShowcase, setSelectedShowcase] = useState<string>('consultoria');
  const checkoutTotal = 9;
  const activeBumps: string[] = [];
  const showCta = true; // Sin bloqueo de VSL en la TSL inicial

  const activeProject = activeVariant.showcaseProjects.find(p => p.id === selectedShowcase) || activeVariant.showcaseProjects[0];

  return (
    <main className="min-h-screen overflow-x-clip bg-slate-950 font-sans text-slate-300 antialiased selection:bg-brand-purple selection:text-white">
      <a href="#contenido" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-slate-900 focus:p-4">Saltar al contenido</a>

      {/* ── 0. BARRA DE CONTROL DE PRUEBAS A/B (Para el Estratega & Campañas) ── */}
      <AbTestingBar currentVariant={currentVariant} onSelectVariant={handleSelectVariant} />

      {/* ── 1. HEADER / BARRA DE URGENCIA & CONTEXTO ── */}
      <header className="border-b border-white/5 bg-slate-950/80 px-4 py-3 backdrop-blur-md sticky top-0 sm:top-0 z-40">
        <div className="mx-auto flex max-w-5xl items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="flex size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono font-semibold tracking-wider text-slate-200 uppercase">
              Taller Fénix · Edición Fundadora
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="hidden sm:inline">105 min en vivo + 45 min Q&A</span>
            <span className="rounded-full bg-brand-purple/30 px-2.5 py-0.5 font-medium text-brand-light border border-brand-purple/40">
              Inscripciones abiertas
            </span>
          </div>
        </div>
      </header>

      {/* ── 2. HERO SECTION CON VSL Y GANCHOS DINÁMICOS SEGÚN OFERTA ── */}
      <section id="contenido" aria-labelledby="hero-title" className="px-3 pt-2 pb-8 sm:px-6 sm:pt-4 md:pt-4 md:pb-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mx-auto max-w-4xl text-center"
        >
          {/* Pre-titular calificador de audiencia */}
          <motion.div 
            variants={fadeInUp} 
            className={`mb-2.5 inline-flex items-center gap-1.5 rounded-full border px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wider transition-colors ${activeVariant.heroTheme.badgeStyle}`}
          >
            <Sparkles className="size-3 text-brand-fuchsia" />
            <span>{activeVariant.preHeadline}</span>
          </motion.div>

          {/* Titular Principal H1 Dinámico Compacto */}
          <motion.h1
            variants={fadeInUp}
            id="hero-title"
            className="font-display font-extrabold tracking-tight text-balance text-slate-50
                       text-2xl sm:text-3xl md:text-4xl lg:text-[2.35rem] lg:leading-[1.14] leading-tight"
          >
            {activeVariant.headlineMain}{' '}
            <span className="bg-linear-to-r/oklch from-purple-200 via-brand-light to-white bg-clip-text text-transparent inline-block">
              {activeVariant.headlineHighlight}
            </span>
          </motion.h1>

          {/* Subtítulo persuasivo conciso */}
          <motion.p variants={fadeInUp} className="mx-auto mt-2 max-w-xl text-xs sm:text-sm md:text-base leading-relaxed text-slate-400">
            {activeVariant.subheadline}
          </motion.p>

          {/* Video VSL: Envoltorio Navegador MacOS / Arc optimizado para Above-the-Fold */}
          <motion.div variants={fadeInUp} className="relative isolate mx-auto mt-3.5 max-w-2xl lg:max-w-[740px] sm:mt-4">
            {/* Auras luminosas ambientales dinámicas por oferta */}
            <div aria-hidden="true" className={`pointer-events-none absolute -top-8 -right-6 -z-10 h-3/4 w-3/4 rounded-full blur-[100px] transition-all duration-500 ${activeVariant.heroTheme.glowFrom}`} />
            <div aria-hidden="true" className={`pointer-events-none absolute -bottom-8 -left-6 -z-10 h-3/4 w-3/4 rounded-full blur-[100px] transition-all duration-500 ${activeVariant.heroTheme.glowTo}`} />

            {/* Frame de Navegador Premium */}
            <div className="browser-mockup relative">
              {/* Barra superior de navegador */}
              <div className="flex items-center justify-between border-b border-white/10 bg-slate-900/90 px-3 py-2 sm:px-4 sm:py-2.5 backdrop-blur-md">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="size-2.5 sm:size-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="size-2.5 sm:size-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="size-2.5 sm:size-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 rounded-md bg-slate-950/70 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[11px] sm:text-xs font-mono text-slate-400 border border-white/5">
                  <Lock className="size-2.5 sm:size-3 text-emerald-400" />
                  <span className="truncate max-w-[200px] sm:max-w-none">{activeVariant.vslUrlBadge}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-brand-light">
                  <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="hidden sm:inline">105 min en vivo</span>
                </div>
              </div>

              {/* Contenedor del Video */}
              <div className="relative aspect-video overflow-hidden bg-brand-dark">
                {vslConfig.videoUrl ? (
                  <video 
                    ref={setVideo} 
                    controls 
                    playsInline 
                    preload="metadata" 
                    poster={activeVariant.vslPoster} 
                    aria-label={`Presentación: ${activeVariant.name}`} 
                    onError={() => setVideoError(true)} 
                    className="h-full w-full object-cover"
                  >
                    <source src={vslConfig.videoUrl} />
                    {vslConfig.captionsUrl && <track kind="captions" srcLang="es" label="Español" src={vslConfig.captionsUrl} default />}
                    Tu navegador no admite video HTML5.
                  </video>
                ) : (
                  <>
                    <img 
                      src={activeVariant.vslPoster} 
                      alt={`Presentación de ${activeVariant.name}`} 
                      className="h-full w-full object-cover opacity-90 transition-transform duration-300 hover:scale-[1.01]" 
                      fetchPriority="high" 
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-slate-950/40 px-4">
                      <span className="flex size-14 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl shadow-[0_0_35px_rgba(217,70,239,0.35)] transition-transform hover:scale-105 sm:size-16">
                        <Play aria-hidden="true" className="size-6 text-slate-50 sm:size-7" />
                      </span>
                      <p className="text-sm font-semibold text-slate-100 sm:text-base">Haz clic para ver la presentación</p>
                      <p className="text-[11px] text-slate-300 sm:text-xs">Aprende la metodología paso a paso</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {videoError && <p role="alert" className="mt-2 text-xs sm:text-sm text-brand-light">No se pudo cargar el video. Intenta recargar la página.</p>}

          {/* CTA gate */}
          <div className="mt-4 min-h-16 sm:mt-5" aria-live="polite">
            {showCta ? (
              <PurchaseCta customText={activeVariant.ctaText} totalPrice={checkoutTotal} selectedBumps={activeBumps} />
            ) : (
              <p className="flex items-center justify-center gap-1.5 text-xs text-slate-400 sm:text-sm">
                <Play aria-hidden="true" className="size-3 sm:size-3.5 text-brand-fuchsia" />
                El botón de inscripción se habilita al completar la presentación.
              </p>
            )}
          </div>

          {/* Barra de Tecnologías y Autoridad (Tech Trust Bar) */}
          <motion.div variants={fadeInUp} className="mt-14 sm:mt-16 pt-8 border-t border-white/5">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-5">
              Construirás sobre el stack oficial de IA y desarrollo web moderno
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs sm:text-sm font-medium text-slate-300">
              <span className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-3.5 py-1.5 border border-white/10 hover:border-brand-fuchsia/40 transition-colors">
                <Sparkles className="size-3.5 text-brand-fuchsia" /> Claude 3.7 & ChatGPT
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-3.5 py-1.5 border border-white/10 hover:border-brand-purple/40 transition-colors">
                <Code2 className="size-3.5 text-purple-300" /> Cursor & Vibe Coding
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-3.5 py-1.5 border border-white/10 hover:border-cyan-400/40 transition-colors">
                <Zap className="size-3.5 text-cyan-400" /> Vite + React
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-3.5 py-1.5 border border-white/10 hover:border-teal-400/40 transition-colors">
                <Layers3 className="size-3.5 text-teal-400" /> Tailwind CSS v4
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-3.5 py-1.5 border border-white/10 hover:border-amber-400/40 transition-colors">
                <Cloud className="size-3.5 text-amber-400" /> Cloudflare Pages ($0/mes)
              </span>
            </div>
          </motion.div>

        </motion.div>
      </section>

      <div className="beam-divider" />

      {/* ── 3. SECCIÓN DOLOR DINÁMICA (Problema & Agitación PAS según Variante) ── */}
      <section aria-labelledby="pain-title" className="px-5 py-16 sm:px-6 sm:py-20 md:py-24">
        <div className="mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.5 }} className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-3.5 py-1 text-xs font-semibold text-rose-300 uppercase tracking-wider mb-3">
              {activeVariant.painBadge}
            </span>
            <h2 id="pain-title" className="font-display text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl md:text-5xl">
              {activeVariant.painTitle}
            </h2>
            <p className="mt-4 text-base/7 text-slate-400 max-w-2xl mx-auto sm:text-lg/8">
              {activeVariant.painSubtitle}
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 sm:mt-16 sm:gap-8 md:grid-cols-3">
            {activeVariant.pains.map(({ icon: Icon, title, text, highlight }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-panel flex flex-col justify-between"
              >
                <div>
                  <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-brand-purple/20 border border-brand-purple/40 text-brand-light shadow-[0_0_20px_rgba(217,70,239,0.2)]">
                    <Icon aria-hidden="true" className="size-6 text-brand-fuchsia" />
                  </div>
                  {highlight && (
                    <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-bold block mb-2">
                      {highlight}
                    </span>
                  )}
                  <h3 className="font-display text-xl font-bold text-slate-50 leading-snug">{title}</h3>
                  <p className="mt-3 text-sm/6 text-slate-400">{text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="beam-divider" />

      {/* ── 4. SECCIÓN MÉTODO FÉNIX (El Mecanismo de 3 Fases) ── */}
      <section aria-labelledby="method-title" className="bg-brand-dark px-5 py-16 sm:px-6 sm:py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.5 }} className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-purple/30 bg-brand-purple/20 px-3.5 py-1 text-xs font-semibold text-brand-light uppercase tracking-wider mb-3">
              Mecanismo Único Comprobado
            </span>
            <h2 id="method-title" className="font-display text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl md:text-5xl">
              El Método Fénix: 3 pasos hacia tu libertad digital
            </h2>
            <p className="mt-4 text-base/7 text-slate-400 max-w-2xl mx-auto sm:text-lg/8">
              Una estructura diseñada para eliminar la fricción técnica y garantizar que termines el taller con una página real en vivo.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 sm:mt-16 sm:gap-8 md:grid-cols-3">
            {methodPhases.map(({ step, title, duration, desc, bullets }, i) => (
              <motion.article
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-panel relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
                    <span className="font-mono text-xs font-bold tracking-widest text-brand-light uppercase">{step}</span>
                    <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs font-medium text-slate-300 border border-white/10">{duration}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-slate-50 sm:text-2xl">{title}</h3>
                  <p className="mt-3 text-sm/6 text-slate-400">{desc}</p>
                </div>
                <ul className="mt-6 space-y-2 border-t border-white/5 pt-4">
                  {bullets.map(b => (
                    <li key={b} className="flex items-center gap-2 text-xs text-slate-300">
                      <Check className="size-3 text-brand-fuchsia shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <div className="beam-divider" />

      {/* ── 5. VITRINA INTERACTIVA DE PROYECTOS (Showcase) ── */}
      <section aria-labelledby="showcase-title" className="relative px-5 py-16 sm:px-6 sm:py-20 md:py-28 overflow-hidden bg-slate-950">
        <div className="mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.5 }} className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-purple/30 bg-brand-purple/20 px-3.5 py-1 text-xs font-semibold text-brand-light uppercase tracking-wider mb-3">
              <Sparkles className="size-3.5 text-brand-fuchsia" /> Lo que tú mismo podrás construir
            </span>
            <h2 id="showcase-title" className="font-display text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl md:text-5xl">
              {activeVariant.showcaseTitle}
            </h2>
            <p className="mt-4 text-base/7 text-slate-400 max-w-2xl mx-auto sm:text-lg/8">
              {activeVariant.showcaseSubtitle}
            </p>
          </motion.div>

          {/* Selector de pestañas */}
          <div className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-3">
            {activeVariant.showcaseProjects.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedShowcase(p.id)}
                className={`rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all ${
                  activeProject.id === p.id
                    ? 'bg-linear-to-r/oklch from-brand-purple to-brand-fuchsia text-white shadow-[0_0_25px_rgba(217,70,239,0.4)] scale-105'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200 border border-white/5'
                }`}
              >
                {p.tag}
              </button>
            ))}
          </div>

          {/* Visualizador del Proyecto Activo */}
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-8 rounded-3xl border border-white/10 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl shadow-2xl grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center"
          >
            {/* Mockup del Navegador con imagen */}
            <div className="browser-mockup overflow-hidden shadow-2xl border border-white/15">
              <div className="flex items-center justify-between border-b border-white/10 bg-slate-900 px-3.5 py-2">
                <div className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-rose-500/70 inline-block" />
                  <span className="size-2.5 rounded-full bg-amber-500/70 inline-block" />
                  <span className="size-2.5 rounded-full bg-emerald-500/70 inline-block" />
                </div>
                <span className="text-[11px] font-mono text-slate-400 bg-black/40 px-3 py-0.5 rounded border border-white/5">
                  https://{activeProject.url}
                </span>
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="relative aspect-video overflow-hidden bg-slate-950">
                <img src={activeProject.img} alt={activeProject.title} className="h-full w-full object-cover" />
              </div>
            </div>

            {/* Ficha descriptiva y estadísticas */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="rounded bg-brand-purple/30 px-2.5 py-0.5 text-xs font-semibold text-brand-light border border-brand-purple/40">
                  {activeProject.time}
                </span>
                <span className="text-xs font-mono text-slate-400">{activeProject.stack}</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-slate-50 sm:text-3xl leading-snug">
                {activeProject.title}
              </h3>
              <p className="mt-3 text-sm/6 text-slate-300">
                {activeProject.description}
              </p>

              {/* El Prompt Utilizado */}
              <div className="mt-4 rounded-xl bg-slate-950/80 p-3.5 border border-white/5 font-mono text-xs text-brand-light">
                <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1 font-sans">Prompt exacto enviado a la IA:</span>
                <p className="italic text-slate-300">{activeProject.promptSnippet}</p>
              </div>

              {/* Métricas clave */}
              <div className="mt-5 grid grid-cols-3 gap-3 border-t border-white/10 pt-4 text-center">
                {activeProject.stats.map(s => (
                  <div key={s.label} className="rounded-lg bg-white/[0.02] p-2">
                    <p className="font-display text-base font-bold text-emerald-400 sm:text-lg">{s.value}</p>
                    <p className="text-[10px] text-slate-400 sm:text-xs">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="beam-divider" />

      {/* ── 6. TABLA COMPARATIVA DE DEMOLICIÓN ECONÓMICA (Agencia vs WP vs Fénix) ── */}
      <ComparisonTable />

      <div className="beam-divider" />

      {/* ── 7. SECCIÓN DE TRANSPARENCIA TÉCNICA (Demoliendo la trampa del hosting gratis) ── */}
      <AntiTrapSection />

      <div className="beam-divider" />

      {/* ── 8. SECCIÓN OFERTA, STACK DE VALOR Y ORDER BUMPS ── */}
      <section aria-labelledby="offer-title" className="relative bg-slate-950 px-5 py-16 sm:px-6 sm:py-20 md:py-28 overflow-hidden">
        {/* Luces de fondo */}
        <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 -z-10 h-96 w-full max-w-4xl rounded-full bg-brand-purple/20 blur-[140px]" />

        <div className="mx-auto max-w-5xl">
          {/* 8A. Qué te llevas al inscribirte */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.5 }} className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-purple/30 bg-brand-purple/20 px-3.5 py-1 text-xs font-semibold text-brand-light uppercase tracking-wider mb-4">
                <Sparkles className="size-3.5 text-brand-fuchsia" /> Lo que recibes al inscribirte
              </span>
              <h2 id="offer-title" className="font-display text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl md:text-5xl/14">
                {activeVariant.offerTitle}
              </h2>
              <p className="mt-4 text-base/7 text-slate-400 sm:text-lg/8">
                {activeVariant.offerSubtitle}
              </p>
              <ul className="mt-6 space-y-3.5 sm:space-y-4">
                {inclusions.map(({ title, desc }) => (
                  <li key={title} className="flex gap-3 text-base/7 sm:text-lg/8">
                    <Check aria-hidden="true" className="mt-1 size-5 shrink-0 text-emerald-400" />
                    <div>
                      <span className="font-semibold text-slate-100">{title}: </span>
                      <span className="text-slate-400">{desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl sm:rounded-3xl">
              <img src={workshopStudentVisual} alt="Participante en el taller construyendo su primera web con IA" className="aspect-[4/3] w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-slate-950 via-slate-950/70 to-transparent p-5 pt-16 sm:p-7 sm:pt-20">
                <span className="font-mono text-xs font-semibold tracking-widest text-brand-light uppercase">Taller Fénix</span>
                <p className="mt-1 text-lg font-bold text-slate-50 sm:text-xl">Construye con criterio. Publica con control total.</p>
              </div>
            </div>
          </motion.div>

          {/* 8B. 3 Bonos de Aceleración con Mockups 3D de Alta Fidelidad */}
          <div className="mt-20 sm:mt-24">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.5 }} className="text-center mb-12">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-fuchsia/30 bg-brand-fuchsia/15 px-3.5 py-1 text-xs font-semibold text-brand-light uppercase tracking-wider mb-3">
                <Gift className="size-3.5 text-brand-fuchsia" /> 3 Bonos Exclusivos Incluidos
              </span>
              <h3 className="font-display text-2xl font-bold text-slate-50 sm:text-3xl md:text-4xl">
                Herramientas que aceleran tu resultado
              </h3>
              <p className="mt-3 text-base text-slate-400 max-w-xl mx-auto">
                Acceso gratuito e ilimitado al asegurar tu plaza durante esta edición fundadora.
              </p>
            </motion.div>

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
              {activeVariant.bonuses.map(({ num, badge, title, desc, img, features }) => (
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5 }}
                  key={num}
                  className="glass-panel overflow-hidden flex flex-col p-0 border border-white/10 hover:border-brand-fuchsia/40 transition-all hover:scale-[1.01]"
                >
                  <div className="aspect-[4/3] w-full border-b border-white/10 bg-slate-900 relative overflow-hidden group">
                    <img src={img} alt={title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <span className="absolute top-3 left-3 rounded-md bg-slate-950/85 px-2.5 py-1 font-mono text-xs font-bold text-brand-light border border-white/15 backdrop-blur-md shadow-lg">
                      {badge}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col sm:p-7">
                    <h4 className="text-xl font-bold text-slate-50">{title}</h4>
                    <p className="mt-2.5 text-sm/6 text-slate-300">{desc}</p>

                    <ul className="mt-4 space-y-2 border-t border-white/5 pt-4 flex-1">
                      {features.map(f => (
                        <li key={f} className="flex items-center gap-2 text-xs text-slate-400">
                          <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Entrega:</span>
                      <span className="font-bold text-emerald-400">100% Gratis con tu entrada</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          {/* 8C. Value Stack + Master Bundle Mockup 3D + Order Bumps + Precio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mt-20 max-w-3xl rounded-3xl border border-brand-fuchsia/40 bg-white/5 p-6 shadow-[0_0_70px_rgba(217,70,239,0.18)] sm:mt-24 sm:p-10 relative overflow-hidden"
          >
            {/* Halo superior del bundle */}
            <div aria-hidden="true" className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 -z-10 h-40 w-3/4 rounded-full bg-brand-fuchsia/30 blur-3xl" />

            {/* Master Bundle Image */}
            <div className="mb-8 overflow-hidden rounded-2xl border border-white/15 shadow-2xl bg-slate-950/80">
              <img
                src={imgMasterBundle}
                alt="Paquete Maestro Taller Fénix con todos los bonos incluidos"
                className="w-full object-cover aspect-16/9"
              />
              <div className="p-3 bg-slate-900/90 border-t border-white/10 text-center">
                <span className="font-mono text-xs font-bold text-brand-light uppercase tracking-wider">
                  ★ Paquete Completo de Fundador · Taller en Vivo + 3 Bonos + Grabación de por vida
                </span>
              </div>
            </div>

            <h3 className="text-center font-display text-2xl font-bold text-slate-50 mb-6 sm:text-3xl sm:mb-8">
              Todo lo que consigues hoy por solo US$9
            </h3>

            {/* Desglose de Valor Percibido */}
            <ul className="space-y-3.5 mb-6 sm:space-y-4 sm:mb-8">
              <li className="flex justify-between items-center text-sm sm:text-base border-b border-white/5 pb-2.5">
                <span className="flex items-center gap-2 sm:gap-3 text-slate-200">
                  <Check className="size-5 text-emerald-400 shrink-0" /> Taller en Vivo (105 min práctica + 45 min Q&A)
                </span>
                <span className="text-slate-500 line-through text-xs sm:text-sm">$97 USD</span>
              </li>
              {activeVariant.bonuses.map((b) => (
                <li key={b.num} className="flex justify-between items-center text-sm sm:text-base border-b border-white/5 pb-2.5">
                  <span className="flex items-center gap-2 sm:gap-3 text-slate-200">
                    <Check className="size-5 text-emerald-400 shrink-0" /> Bono {b.num}: {b.title}
                  </span>
                  <span className="text-slate-500 line-through text-xs sm:text-sm">
                    {b.badge.replace(/^.*?Valor\s*/, '')}
                  </span>
                </li>
              ))}
            </ul>

            <div className="border-t border-white/10 pt-4 mb-6 flex justify-between items-center text-base font-semibold sm:pt-5 sm:mb-8 sm:text-lg">
              <span className="text-slate-300">Valor real acumulado:</span>
              <span className="text-slate-400 line-through font-mono text-base sm:text-xl">$190 USD</span>
            </div>

            {/* 8D. SIMULADOR DE ORDER BUMPS (Incrementador de AOV) */}
            {/* Complementos ocultos durante la validación del producto principal. */}

            <div className="text-center mt-8">
              {/* Escasez */}
              <p className="text-xs font-semibold tracking-widest text-brand-light uppercase mb-2.5 sm:text-sm">
                Edición fundadora · Inscripciones abiertas
              </p>
              <div className="mx-auto max-w-xs mb-5 sm:mb-6">
                <div className="flex justify-between text-xs font-medium text-slate-400 mb-1.5">
                  <span>Plazas reservadas</span>
                  <span className="text-brand-fuchsia font-bold">Sin cupo declarado</span>
                </div>
                <div className="h-2.5 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-linear-to-r/oklch from-brand-purple to-brand-fuchsia w-[Sin cupo declarado] rounded-full shadow-[0_0_12px_rgba(217,70,239,0.6)]"></div>
                </div>
              </div>

              {/* Precio anclado */}
              <p className="font-display text-5xl font-bold text-slate-50 mb-1 sm:text-6xl">
                ${checkoutTotal} <span className="text-xl font-normal text-slate-400 sm:text-2xl">USD</span>
              </p>
              <p className="text-slate-400 text-xs mb-6 sm:text-sm sm:mb-7">
                {activeVariant.priceComparisonContext}
              </p>

              {/* Garantía Incondicional de 7 Días */}
              <div className="mb-6 flex items-start gap-3 rounded-xl bg-brand-purple/15 p-4 border border-brand-purple/30 text-left sm:mb-8 sm:gap-4 sm:rounded-2xl sm:p-5">
                <ShieldCheck className="size-8 text-emerald-400 shrink-0 mt-0.5 sm:size-10" />
                <div>
                  <p className="font-bold text-slate-50 text-sm sm:text-base">Garantía incondicional de 7 días</p>
                  <p className="mt-1 text-xs/5 text-slate-300 sm:text-sm/6">
                    Asiste al taller, usa los materiales y si sientes que no fue para ti, me escribes y te devuelvo el 100% de tu dinero al instante. Sin preguntas. Y los bonos te los quedas como agradecimiento.
                  </p>
                </div>
              </div>

              {/* Botón CTA Dinámico */}
              <div className="min-h-24" aria-live="polite">
                {showCta ? (
                  <PurchaseCta customText={activeVariant.ctaText} totalPrice={checkoutTotal} selectedBumps={activeBumps} />
                ) : (
                  <p className="text-xs text-slate-500 sm:text-sm">
                    El botón se habilita al completar la presentación.
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="beam-divider" />

      {/* ── 9. SECCIÓN FILTRO DE AUDIENCIA SEGÚN LA VARIANTE ACTIVA ── */}
      <section aria-labelledby="filter-title" className="bg-brand-dark px-5 py-16 sm:px-6 sm:py-20 md:py-24">
        <div className="mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.5 }} className="text-center mb-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-purple/30 bg-brand-purple/20 px-3.5 py-1 text-xs font-semibold text-brand-light uppercase tracking-wider mb-3">
              Criterio de Selección
            </span>
            <h2 id="filter-title" className="font-display text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl md:text-5xl">
              ¿Este taller es adecuado para ti?
            </h2>
            <p className="mt-4 text-base/7 text-slate-400 max-w-xl mx-auto sm:text-lg/8">
              Buscamos personas comprometidas que quieran aplicar el método y ver su web publicada esa misma tarde.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
            {/* Para quién SÍ es */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.5 }} className="rounded-2xl border border-emerald-500/30 bg-emerald-950/10 p-6 sm:p-8 backdrop-blur-md">
              <h3 className="font-display text-xl font-bold text-slate-50 mb-5 flex items-center gap-3 sm:text-2xl">
                <Check className="size-6 text-emerald-400 shrink-0 sm:size-7" /> Esto SÍ es para ti si:
              </h3>
              <ul className="space-y-3.5 sm:space-y-4">
                {activeVariant.whoIsItFor.map(item => (
                  <li key={item} className="text-slate-300 text-base/7 flex gap-3 sm:text-lg/7">
                    <Check className="size-5 text-emerald-400 shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Para quién NO es */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.5 }} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 backdrop-blur-md">
              <h3 className="font-display text-xl font-bold text-slate-50 mb-5 flex items-center gap-3 sm:text-2xl">
                <X className="size-6 text-slate-500 shrink-0 sm:size-7" /> Esto NO es para ti si:
              </h3>
              <ul className="space-y-3.5 sm:space-y-4">
                {activeVariant.whoIsNotFor.map(item => (
                  <li key={item} className="text-slate-400 text-base/7 flex gap-3 sm:text-lg/7">
                    <span className="text-slate-500 shrink-0 font-bold">✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="beam-divider" />

      {/* ── 10. SECCIÓN MENTOR (Conexión Emocional & Autoridad) ── */}
      <section aria-labelledby="mentor-title" className="px-5 py-16 sm:px-6 sm:py-20 md:py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.5 }} className="mx-auto grid max-w-4xl items-center gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-14">
          <img src={mentorPortraitVisual} alt="Tu instructor del taller Fénix" loading="lazy" className="aspect-square w-full max-w-sm mx-auto rounded-2xl object-cover border border-white/10 shadow-[0_0_40px_rgba(217,70,239,0.15)] sm:rounded-3xl" />
          <div>
            <p className="mb-3 text-xs font-semibold tracking-widest text-brand-light uppercase sm:text-sm">Tu instructor</p>
            <h2 id="mentor-title" className="font-display text-2xl font-bold text-slate-50 sm:text-3xl md:text-4xl/12">
              Sé lo que es tener una idea<br />bloqueada por meses.
            </h2>
            <p className="mt-5 text-base/7 text-slate-300 sm:text-lg/8">
              Soy profesor de matemáticas y desarrollador web. He acompañado a profesionales, emprendedores y educadores sin experiencia técnica a publicar sus primeras páginas usando IA. Sé con exactitud dónde se producen los bloqueos — y por eso diseñé una ruta paso a paso que los elimina.
            </p>
            <ul className="mt-5 space-y-3 sm:mt-7 sm:space-y-4">
              {[
                'Sin tecnicismos abrumadores. Todo explicado en español claro.',
                'Un proyecto concreto y funcional, cero teoría innecesaria.',
                'Terminas el taller con una URL real lista para compartir con el mundo.'
              ].map(text => (
                <li key={text} className="flex gap-3 text-base/7 sm:text-lg/8">
                  <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-emerald-400 sm:size-5" />
                  <span className="text-slate-200">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </section>

      <div className="beam-divider" />

      {/* ── 11. SECCIÓN FAQ (Objeciones Resueltas de Minería de Reseñas) ── */}
      <section aria-labelledby="faq-title" className="bg-brand-dark px-5 py-16 sm:px-6 sm:py-20 md:py-24">
        <div className="mx-auto max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.5 }} className="text-center mb-8 sm:mb-12">
            <p className="mb-3 text-xs font-semibold tracking-widest text-brand-light uppercase sm:text-sm">
              {activeVariant.faqSubtitle}
            </p>
            <h2 id="faq-title" className="font-display text-3xl font-bold text-slate-50 sm:text-4xl md:text-5xl">
              {activeVariant.faqTitle}
            </h2>
          </motion.div>
          <div className="space-y-3 sm:space-y-4">
            {activeVariant.faqs.map(([question, answer]) => (
              <details key={question} className="glass-panel group p-5 sm:p-7">
                <summary className="flex list-none cursor-pointer items-center justify-between gap-4 text-base font-semibold text-slate-50 [&::-webkit-details-marker]:hidden sm:gap-5 sm:text-lg/8">
                  {question}
                  <ChevronDown aria-hidden="true" className="size-4 shrink-0 text-purple-300 transition-transform group-open:rotate-180 motion-reduce:transition-none sm:size-5" />
                </summary>
                <p className="mt-4 border-t border-white/10 pt-4 text-sm/6 text-slate-300 sm:mt-5 sm:pt-5 sm:text-base/7">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <div className="beam-divider" />

      {/* ── 12. FOOTER CTA (Cierre y Última Oportunidad) ── */}
      <footer className="px-5 pt-16 pb-24 text-center sm:px-6 sm:pt-20 sm:pb-12 md:pt-24 bg-slate-950">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.5 }}>
          <p className="mb-3 text-xs font-semibold tracking-widest text-brand-fuchsia uppercase sm:text-sm">
            Precio de lanzamiento
          </p>
          <h2 className="font-display text-3xl font-bold text-slate-50 sm:text-4xl md:text-5xl/14">
            Tu URL puede estar en vivo esta misma semana.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base/7 text-slate-400 sm:mt-5 sm:text-lg/8">
            En 105 minutos. Sin programar a mano. Sin depender de nadie.
          </p>
          <div className="mt-7 min-h-24" aria-live="polite">
            {showCta ? (
              <PurchaseCta customText={activeVariant.ctaText} totalPrice={checkoutTotal} selectedBumps={activeBumps} />
            ) : (
              <a href="#contenido" className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3.5 text-sm font-semibold text-slate-100 hover:border-white/40 transition-colors sm:px-6 sm:py-4">
                Ver la presentación <Play aria-hidden="true" className="size-3.5" />
              </a>
            )}
          </div>
        </motion.div>

        {/* Trust bar mínima */}
        <div className="mx-auto mt-12 flex max-w-lg flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-slate-500 sm:mt-16">
          <span>🔒 Pago 100% seguro</span>
          <span>·</span>
          <span>Garantía incondicional 7 días</span>
          <span>·</span>
          <span>Pago único sin suscripciones</span>
        </div>
        <div className="mx-auto mt-8 flex max-w-5xl flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-6 text-xs/6 text-slate-600">
          <span>© 2026 Fénix · Taller Web con Inteligencia Artificial</span>
          <span>
            Desarrollado por{' '}
            <a
              href="https://xavier.cabellosalirrosas.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 font-medium hover:text-brand-light transition-colors underline decoration-slate-700 underline-offset-4 hover:decoration-brand-light"
            >
              Xavier Cabello
            </a>
          </span>
          <span>De la idea a la nube. Un paso a la vez.</span>
        </div>
      </footer>

      {/* ── 13. STICKY MOBILE CTA ── */}
      <StickyMobileCta showCta={showCta} price={checkoutTotal} />
    </main>
  );
}
