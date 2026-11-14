import { ArrowUpRight, Lock } from 'lucide-react';

function parseHotmartUrl(raw?: string): string | null {
  if (!raw) return null;
  try {
    const parsed = new URL(raw.trim());
    const validHost = /(^|\.)hotmart\.com$/i.test(parsed.hostname);
    if (parsed.protocol !== 'https:' || !validHost) return null;
    return parsed.href;
  } catch {
    return null;
  }
}

/** Checkout de Hotmart: permanece bloqueado hasta configurar el enlace real. */
export function HotmartCheckoutButton() {
  const checkoutUrl = parseHotmartUrl(import.meta.env.VITE_HOTMART_CHECKOUT_URL);

  if (checkoutUrl) {
    return (
      <div className="space-y-2.5">
        <a
          href={checkoutUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#C71D7A] px-6 py-4 text-sm font-bold text-white shadow-[0_12px_28px_rgba(199,29,122,.2)] transition hover:bg-[#A91667] sm:text-base"
        >
          Inscribirme por US$9 <ArrowUpRight className="size-4" />
        </a>
        <p className="text-center text-xs leading-5 text-[#537265]">
          Pago único · acceso al taller y sus grabaciones durante 30 días.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      <button
        type="button"
        disabled
        aria-disabled="true"
        className="inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-dashed border-[#C58AAE] bg-[#F8ECF3] px-6 py-4 text-sm font-bold text-[#74465F] opacity-90 sm:text-base"
      >
        <Lock className="size-4 shrink-0" />
        Inscripción en Hotmart aún no habilitada
      </button>
      <p className="text-center text-xs leading-5 text-[#705E68]">
        El pago se activará cuando esté conectado el checkout oficial. Todavía no se realiza ningún cobro.
      </p>
    </div>
  );
}
