import { useState } from 'react';
import { type VariantId, VARIANTS } from '../data/variants';
import { Copy, Check, ChevronUp, ChevronDown, SlidersHorizontal, ExternalLink, X } from 'lucide-react';

interface AbTestingBarProps {
  currentVariant: VariantId;
  onSelectVariant: (id: VariantId) => void;
}

export function AbTestingBar({ currentVariant, onSelectVariant }: AbTestingBarProps) {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        type="button"
        className="fixed bottom-4 left-4 z-50 flex items-center gap-1.5 rounded-full bg-slate-900/90 px-3 py-1.5 text-xs font-semibold text-brand-light border border-brand-fuchsia/40 shadow-xl backdrop-blur-md hover:bg-slate-800 transition-all hover:scale-105"
        title="Mostrar Selector de Ofertas"
      >
        <SlidersHorizontal className="size-3.5 text-brand-fuchsia" />
        <span>Rutas A/B</span>
      </button>
    );
  }

  const active = VARIANTS[currentVariant];

  const copyCurrentUrl = () => {
    const fullUrl = `${window.location.origin}${active.path}`;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <aside aria-label="Navegador de ofertas A/B" className="fixed bottom-4 left-4 z-50 max-w-sm sm:max-w-md">
      <div className="rounded-2xl border border-brand-fuchsia/40 bg-slate-950/95 p-3 text-xs text-slate-300 shadow-2xl backdrop-blur-xl transition-all">
        
        {/* Cabecera del Widget Flotante */}
        <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2">
          <div className="flex items-center gap-2">
            <span className="flex size-6 items-center justify-center rounded-md bg-linear-to-r/oklch from-brand-purple to-brand-fuchsia text-white">
              <SlidersHorizontal className="size-3.5" />
            </span>
            <div>
              <span className="font-mono text-[11px] font-bold text-brand-light uppercase tracking-wider block">
                Navegador de Ofertas A/B
              </span>
              <span className="text-[10px] text-slate-400">
                Página activa: <strong className="text-white font-mono">{active.path}</strong>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              type="button"
              className="rounded-md p-1 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
              title={isExpanded ? 'Contraer' : 'Ver detalles de campaña'}
            >
              {isExpanded ? <ChevronDown className="size-3.5" /> : <ChevronUp className="size-3.5" />}
            </button>
            <button
              onClick={() => setIsVisible(false)}
              type="button"
              className="rounded-md p-1 text-slate-400 hover:bg-white/10 hover:text-rose-400 transition-colors"
              title="Ocultar para ver la página 100% limpia"
            >
              <X className="size-3.5" />
            </button>
          </div>
        </div>

        {/* Botones de las 3 Páginas Independientes */}
        <div className="mt-2.5 flex flex-col gap-1.5">
          {(Object.keys(VARIANTS) as VariantId[]).map((vKey) => {
            const v = VARIANTS[vKey];
            const isSelected = vKey === currentVariant;
            return (
              <div key={vKey} className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onSelectVariant(vKey)}
                  className={`flex-1 rounded-lg px-2.5 py-1.5 text-left text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-linear-to-r/oklch from-brand-purple to-brand-fuchsia text-white font-bold shadow-md'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
                  }`}
                >
                  <span className="font-mono text-brand-light text-[11px] mr-1.5 font-bold">
                    {v.path}
                  </span>
                  <span className="truncate">
                    {vKey === 'independencia' ? 'Web Costo Cero ($0 Hosting)' : vKey === 'creadores' ? 'Vibe Coding con IA (Creadores)' : 'Micro-Agencia en 48 Horas'}
                  </span>
                </button>

                {/* Enlace para abrir directamente en nueva pestaña */}
                <a
                  href={v.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-white/5 p-2 text-slate-400 hover:bg-white/10 hover:text-brand-light border border-white/5 transition-colors"
                  title={`Abrir ${v.path} en nueva pestaña`}
                >
                  <ExternalLink className="size-3.5" />
                </a>
              </div>
            );
          })}
        </div>

        {/* Panel Expandido con Detalles de Marketing */}
        {isExpanded && (
          <div className="mt-3 border-t border-white/10 pt-2 text-[11px] space-y-2">
            <div className="rounded-lg bg-slate-900/80 p-2 border border-white/5">
              <span className="font-mono text-[10px] font-bold text-amber-300 block mb-0.5">
                Gancho para Anuncio:
              </span>
              <p className="italic text-slate-300 text-[10px] leading-relaxed">
                "{active.adHook}"
              </p>
            </div>

            <button
              onClick={copyCurrentUrl}
              type="button"
              className="w-full flex items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-[11px] font-medium text-slate-200 hover:bg-white/10 hover:text-white transition-colors"
            >
              {copied ? (
                <>
                  <Check className="size-3 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">¡URL copiada para anuncios!</span>
                </>
              ) : (
                <>
                  <Copy className="size-3 text-slate-400" />
                  <span>Copiar URL directa ({active.path})</span>
                </>
              )}
            </button>
          </div>
        )}

      </div>
    </aside>
  );
}
