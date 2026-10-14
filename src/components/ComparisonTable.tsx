import { Check, X, Sparkles, AlertTriangle, ShieldCheck } from 'lucide-react';

export function ComparisonTable() {
  const comparisonRows = [
    {
      feature: 'Costo Inicial de Implementación',
      agency: '$500 a $2,500 USD',
      wordpress: '$50 a $150 USD (Curso + Plantilla)',
      fenix: '$19 USD (Pago Único)',
      highlight: true
    },
    {
      feature: 'Costo Mensual / Anual de Servidores',
      agency: 'Depende del plan que te cobren',
      wordpress: '$120 a $300 USD/año (Renovaciones sorpresa)',
      fenix: '$0 USD / mes de por vida (Cloudflare Enterprise CDN)',
      highlight: true
    },
    {
      feature: 'Tiempo hasta Publicar la Web',
      agency: '3 a 6 semanas (reuniones y demoras)',
      wordpress: 'Varios días peleando con cPanel y plugins',
      fenix: '105 minutos en vivo durante el taller',
      highlight: false
    },
    {
      feature: 'Mantenimiento & "Pantalla Blanca"',
      agency: 'Debes pagar por cada cambio menor',
      wordpress: 'Alto riesgo de romper la web al actualizar plugins',
      fenix: 'Cero mantenimiento. Web estática ultra-segura',
      highlight: false
    },
    {
      feature: 'Velocidad de Carga en Celulares',
      agency: 'Variable (generalmente pesada)',
      wordpress: 'Lenta (requiere plugins de caché complejos)',
      fenix: 'Menos de 1 segundo (Puntaje 95-100 en Google)',
      highlight: false
    },
    {
      feature: 'Control & Autonomía del Proyecto',
      agency: 'Secuestro del código y accesos',
      wordpress: 'Dependencia técnica de un webmaster',
      fenix: '100% tuya. Tú diriges la IA cuando quieras cambiar algo',
      highlight: true
    }
  ];

  return (
    <section aria-labelledby="comparison-title" className="relative px-5 py-16 sm:px-6 sm:py-20 md:py-24 bg-slate-950 overflow-hidden">
      <div className="mx-auto max-w-5xl">
        
        {/* Encabezado */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-purple/30 bg-brand-purple/15 px-3.5 py-1 text-xs font-semibold text-brand-light uppercase tracking-wider mb-3">
            <Sparkles className="size-3.5 text-brand-fuchsia" /> Validación Económica Transparente
          </span>
          <h2 id="comparison-title" className="font-display text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl md:text-5xl">
            ¿Por qué el Método Fénix es la opción más inteligente?
          </h2>
          <p className="mt-4 text-base/7 text-slate-400 max-w-2xl mx-auto sm:text-lg/8">
            Compara honestamente las 3 formas que existen hoy para tener una página web en internet. Los números hablan por sí solos.
          </p>
        </div>

        {/* Tabla Comparativa Desktop / Tablet */}
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-md shadow-2xl">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="border-b border-white/10 bg-slate-900/80">
                <th className="p-4 sm:p-5 text-sm font-semibold text-slate-300 w-1/4">Criterio</th>
                <th className="p-4 sm:p-5 text-sm font-semibold text-slate-400 w-1/4">
                  <div className="flex items-center gap-1.5">
                    <X className="size-4 text-rose-400" />
                    <span>Agencia Digital</span>
                  </div>
                </th>
                <th className="p-4 sm:p-5 text-sm font-semibold text-slate-400 w-1/4">
                  <div className="flex items-center gap-1.5">
                    <AlertTriangle className="size-4 text-amber-400" />
                    <span>WordPress + Hosting</span>
                  </div>
                </th>
                <th className="p-4 sm:p-5 text-sm font-bold text-brand-light w-1/4 bg-brand-purple/20 border-x border-brand-fuchsia/30 relative">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded bg-brand-fuchsia px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                    Ganador
                  </span>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="size-4 text-emerald-400" />
                    <span>Método Fénix (IA)</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs sm:text-sm">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className={row.highlight ? 'bg-white/[0.02]' : ''}>
                  <td className="p-4 sm:p-5 font-medium text-slate-200">
                    {row.feature}
                  </td>
                  <td className="p-4 sm:p-5 text-slate-400">
                    <span className="inline-block text-rose-300 font-medium">{row.agency}</span>
                  </td>
                  <td className="p-4 sm:p-5 text-slate-400">
                    <span className="inline-block text-amber-300 font-medium">{row.wordpress}</span>
                  </td>
                  <td className="p-4 sm:p-5 text-emerald-300 font-semibold bg-brand-purple/10 border-x border-brand-fuchsia/20">
                    <div className="flex items-start gap-2">
                      <Check className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{row.fenix}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Resumen del Ahorro */}
        <div className="mt-8 rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 sm:p-6 text-center">
          <p className="text-sm sm:text-base font-semibold text-emerald-300">
            💡 En solo 12 meses habrás ahorrado más de <span className="font-mono font-bold text-white text-lg">$250 USD</span> en servidores y hosting que nunca más tendrás que pagar.
          </p>
        </div>

      </div>
    </section>
  );
}
