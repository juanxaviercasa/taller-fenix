import { ArrowUpRight, Lock } from 'lucide-react';

function parseSkoolUrl(raw?: string): string | null {
  if (!raw) return null;
  try {
    const parsed = new URL(raw.trim());
    const validHost = /(^|\.)skool\.com$/i.test(parsed.hostname);
    if (parsed.protocol !== 'https:' || !validHost) return null;
    return parsed.href;
  } catch {
    return null;
  }
}

interface SkoolCheckoutButtonProps {
  label?: string;
}

/** Placeholder del botón de inscripción hasta conectar el checkout oficial en Skool. */
export function SkoolCheckoutButton({
  label = 'Ir al checkout en Skool · US$9',
}: SkoolCheckoutButtonProps) {
  const skoolUrl = parseSkoolUrl(import.meta.env.VITE_SKOOL_CHECKOUT_URL);

  if (skoolUrl) {
    return (
      <div className="space-y-2.5">
        <a
          href={skoolUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#193F39] px-6 py-4 text-sm font-bold text-white shadow-[0_12px_28px_rgba(25,63,57,.2)] transition hover:bg-[#286957] sm:text-base"
        >
          {label} <ArrowUpRight className="size-4" />
        </a>
        <p className="text-center text-xs leading-5 text-[#537265]">
          Checkout oficial de pago único (US$9) dentro de nuestra comunidad en Skool.
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
        className="inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-dashed border-[#8FB6A0] bg-[#E5F0E9] px-6 py-4 text-sm font-bold text-[#245345] opacity-85 sm:text-base"
      >
        <Lock className="size-4 shrink-0" />
        Checkout en Skool · Próximamente (US$9)
      </button>
      <p className="text-center text-xs leading-5 text-[#587467]">
        Botón reservado para conectar el enlace oficial del checkout en la comunidad de Skool. Todavía no se realiza ningún cobro.
      </p>
    </div>
  );
}
