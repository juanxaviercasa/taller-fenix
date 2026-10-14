import { ShieldAlert, ShieldCheck, CheckCircle2, XCircle } from 'lucide-react';

export function AntiTrapSection() {
  return (
    <section aria-labelledby="anti-trap-title" className="relative px-5 py-16 sm:px-6 sm:py-20 md:py-24 bg-brand-dark overflow-hidden border-t border-b border-white/5">
      <div className="mx-auto max-w-5xl">
        
        {/* Encabezado */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-300 uppercase tracking-wider mb-3">
            <ShieldAlert className="size-3.5 text-amber-400" /> Transparencia Técnica Absoluta
          </span>
          <h2 id="anti-trap-title" className="font-display text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl md:text-5xl">
            "¿Cómo es posible que el hosting sea $0 de por vida? ¿Dónde está el truco?"
          </h2>
          <p className="mt-4 text-base/7 text-slate-400 max-w-2xl mx-auto sm:text-lg/8">
            Si has intentado usar "hosting gratis" antes, probablemente viviste una pesadilla. Te explicamos por qué nuestra arquitectura es radicalmente diferente a los trucos baratos de internet.
          </p>
        </div>

        {/* Comparación Visual: La Trampa vs La Realidad Tecnológica */}
        <div className="grid gap-6 md:grid-cols-2">
          
          {/* Tarjeta 1: La trampa del hosting gratuito tradicional (WordPress) */}
          <div className="rounded-2xl border border-rose-500/30 bg-rose-950/10 p-6 sm:p-8 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex size-10 items-center justify-center rounded-xl bg-rose-500/20 text-rose-400">
                <XCircle className="size-6" />
              </span>
              <div>
                <h3 className="font-bold text-slate-100 text-lg">La Trampa del "Hosting Gratis" Tradicional</h3>
                <span className="text-xs text-rose-400 font-mono">InfinityFree, 000webhost, servidores compartidos</span>
              </div>
            </div>

            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-300 mt-6">
              <li className="flex items-start gap-2.5">
                <XCircle className="size-4 text-rose-400 shrink-0 mt-0.5" />
                <span><strong>Límites secretos de archivos (inodos):</strong> Instalas 2 plugins de WordPress y te suspenden la cuenta automáticamente sin aviso.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="size-4 text-rose-400 shrink-0 mt-0.5" />
                <span><strong>Caídas continuas por "CPU Overload":</strong> Si 10 personas visitan tu página al mismo tiempo, el servidor colapsa.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="size-4 text-rose-400 shrink-0 mt-0.5" />
                <span><strong>Aviso rojo de "Sitio No Seguro":</strong> Certificados SSL fallidos que espantan a tus clientes antes de entrar.</span>
              </li>
            </ul>
          </div>

          {/* Tarjeta 2: La Infraestructura Estática de Grado Empresarial (Cloudflare Pages) */}
          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/15 p-6 sm:p-8 backdrop-blur-md shadow-[0_0_50px_rgba(16,185,129,0.1)] relative">
            <span className="absolute -top-3 right-6 rounded bg-emerald-500 px-2.5 py-0.5 text-[10px] font-bold text-slate-950 uppercase tracking-wider">
              Lo que usamos en el taller
            </span>

            <div className="flex items-center gap-3 mb-4">
              <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                <ShieldCheck className="size-6" />
              </span>
              <div>
                <h3 className="font-bold text-slate-100 text-lg">Infraestructura Edge de Grado Empresarial</h3>
                <span className="text-xs text-emerald-400 font-mono">Cloudflare Pages & Vercel ($0 de por vida)</span>
              </div>
            </div>

            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-300 mt-6">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Sin bases de datos que colapsen:</strong> Tu web es puro código estático ultraligero que jamás sufre por inodos ni sobrecarga.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Red CDN global en más de 300 ciudades:</strong> Carga a la velocidad de la luz en cualquier país del mundo.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Certificado SSL militar incluido gratis:</strong> Tu candado verde HTTPS activo desde el primer minuto sin configuraciones raras.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Garantía de Claridad */}
        <div className="mt-8 text-center text-xs text-slate-400 max-w-xl mx-auto">
          <p>
            * El tier gratuito de Cloudflare Pages permite tráfico masivo ilimitado para webs estáticas. Es el secreto que las empresas tecnológicas usan para ahorrar millones en servidores.
          </p>
        </div>

      </div>
    </section>
  );
}
