import { useState } from 'react';
import { ORDER_BUMPS } from '../data/orderBumps';
import { Check, Sparkles } from 'lucide-react';

interface OrderBumpsSectionProps {
  basePrice: number;
  onTotalChange?: (total: number, selectedBumps: string[]) => void;
}

export function OrderBumpsSection({ basePrice = 19, onTotalChange }: OrderBumpsSectionProps) {
  const [selectedBumps, setSelectedBumps] = useState<Record<string, boolean>>({
    'bump-templates': false,
    'bump-payments': false
  });

  const toggleBump = (id: string) => {
    const updated = { ...selectedBumps, [id]: !selectedBumps[id] };
    setSelectedBumps(updated);

    const bumpsTotal = ORDER_BUMPS.filter(b => updated[b.id]).reduce((sum, b) => sum + b.price, 0);
    const newTotal = basePrice + bumpsTotal;
    const activeIds = Object.keys(updated).filter(k => updated[k]);

    if (onTotalChange) {
      onTotalChange(newTotal, activeIds);
    }
  };

  const selectedCount = Object.values(selectedBumps).filter(Boolean).length;
  const bumpsTotal = ORDER_BUMPS.filter(b => selectedBumps[b.id]).reduce((sum, b) => sum + b.price, 0);
  const total = basePrice + bumpsTotal;

  return (
    <div className="mt-8 rounded-2xl border border-brand-purple/30 bg-slate-900/80 p-5 sm:p-7 backdrop-blur-md shadow-xl text-left">
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-brand-fuchsia" />
          <h4 className="font-bold text-slate-100 text-sm sm:text-base">
            Personaliza tu Paquete de Entrada (Opcional)
          </h4>
        </div>
        <span className="rounded bg-brand-fuchsia/20 px-2 py-0.5 text-[11px] font-mono font-semibold text-brand-light">
          Oferta de un solo clic
        </span>
      </div>

      <p className="text-xs text-slate-400 mb-4">
        Añade estas herramientas con descuento exclusivo antes de ingresar a la sala:
      </p>

      {/* Lista de Order Bumps */}
      <div className="space-y-4">
        {ORDER_BUMPS.map((bump) => {
          const isChecked = !!selectedBumps[bump.id];
          return (
            <div
              key={bump.id}
              onClick={() => toggleBump(bump.id)}
              className={`cursor-pointer rounded-xl border p-4 transition-all ${
                isChecked
                  ? 'border-brand-fuchsia/60 bg-brand-purple/20 shadow-[0_0_20px_rgba(217,70,239,0.15)] scale-[1.01]'
                  : 'border-white/10 bg-slate-950/40 hover:border-white/20'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {}} // Manejado por el contenedor onClick
                  className="mt-1 size-5 rounded border-white/20 bg-slate-900 text-brand-fuchsia focus:ring-brand-fuchsia"
                />

                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300">
                      {bump.badge}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-slate-500 line-through">${bump.originalPrice} USD</span>
                      <span className="font-mono text-sm font-bold text-emerald-400">+${bump.price} USD</span>
                    </div>
                  </div>

                  <h5 className="font-bold text-slate-100 text-sm sm:text-base leading-snug">
                    {bump.name}
                  </h5>
                  <p className="mt-1 text-xs text-slate-300">
                    {bump.shortDesc}
                  </p>

                  {isChecked && (
                    <ul className="mt-3 space-y-1.5 border-t border-white/10 pt-2.5">
                      {bump.bullets.map((b, i) => (
                        <li key={i} className="flex items-center gap-2 text-[11px] text-slate-300">
                          <Check className="size-3 text-emerald-400 shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Resumen Total Dinámico */}
      <div className="mt-6 border-t border-white/10 pt-4 flex flex-wrap items-center justify-between gap-3 bg-slate-950/60 -mx-5 -mb-5 p-5 rounded-b-2xl">
        <div>
          <span className="text-xs text-slate-400 block">Total a facturar:</span>
          <span className="text-xs text-slate-500">
            {selectedCount === 0 ? 'Taller Fénix Base' : `Taller + ${selectedCount} acelerador${selectedCount > 1 ? 'es' : ''}`}
          </span>
        </div>

        <div className="text-right">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-3xl font-bold text-white">
              ${total}
            </span>
            <span className="text-xs text-slate-400 uppercase font-mono">USD</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-semibold block">
            Pago único · Sin renovaciones
          </span>
        </div>
      </div>

    </div>
  );
}
