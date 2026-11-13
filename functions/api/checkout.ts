/**
 * Cloudflare Pages Functions · Checkout Pro Perú
 * Activación explícita: MP_CHECKOUT_ENABLED=true + secretos válidos.
 * No se recibe información de tarjetas ni se confía en precios del navegador.
 */
interface Env {
  MP_ACCESS_TOKEN?: string;
  MP_WEBHOOK_SECRET?: string;
  MP_CHECKOUT_ENABLED?: string;
  MP_PRICE_PEN?: string;
  MP_ENVIRONMENT?: string;
  SITE_URL?: string;
}
interface Context { request: Request; env: Env }
const headers = { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" };
const reply = (body: object, status = 200) => new Response(JSON.stringify(body), { status, headers });
const priceOf = (env: Env) => Number(env.MP_PRICE_PEN || "34");
const validPrice = (price: number) => Number.isFinite(price) && price > 0 && price <= 1000;
const validSite = (value?: string) => {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password && !url.search && !url.hash;
  } catch { return false; }
};
const ready = (env: Env) => env.MP_CHECKOUT_ENABLED === "true" &&
  Boolean(env.MP_ACCESS_TOKEN?.trim()) && Boolean(env.MP_WEBHOOK_SECRET?.trim()) &&
  validPrice(priceOf(env)) && Boolean(env.MP_PRICE_PEN) && validSite(env.SITE_URL) &&
  (env.MP_ENVIRONMENT === "test" || env.MP_ENVIRONMENT === "production");

export const onRequestGet = ({ env }: Context): Response => reply({
  ready: ready(env), currency: "PEN", amount: ready(env) ? priceOf(env) : null,
  offerUsd: 9, paymentProvider: "Mercado Pago",
});

export const onRequestPost = async ({ request, env }: Context): Promise<Response> => {
  if (!ready(env)) return reply({ error: "El checkout todavía no está habilitado." }, 503);
  const origin = request.headers.get("Origin");
  if (origin && origin !== new URL(request.url).origin) return reply({ error: "Origen no permitido." }, 403);
  let site: URL;
  try { site = new URL(env.SITE_URL!); } catch { return reply({ error: "SITE_URL inválida." }, 500); }
  if (site.protocol !== "https:") return reply({ error: "SITE_URL debe utilizar HTTPS." }, 500);
  const reference = "fenix-" + crypto.randomUUID();
  const body = {
    items: [{
      id: "fenix-entrenamiento-9usd", title: "Fénix - Entrenamiento práctico de Vibe Coding con IA",
      quantity: 1, currency_id: "PEN", unit_price: priceOf(env),
    }],
    external_reference: reference,
    back_urls: {
      success: new URL("/pago?estado=exitoso", site).toString(),
      pending: new URL("/pago?estado=pendiente", site).toString(),
      failure: new URL("/pago?estado=fallido", site).toString(),
    },
    auto_return: "approved",
    notification_url: new URL("/api/mercadopago-webhook", site).toString(),
    metadata: { product: "fenix-entrenamiento", advertised_usd: 9 },
  };
  try {
    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + env.MP_ACCESS_TOKEN,
        "Content-Type": "application/json",
        "X-Idempotency-Key": reference,
      },
      body: JSON.stringify(body),
    });
    const data = await response.json() as { init_point?: string; sandbox_init_point?: string };
    const target = env.MP_ENVIRONMENT === "test" ? data.sandbox_init_point : data.init_point;
    if (!response.ok || !target) return reply({ error: "No fue posible iniciar el pago." }, 502);
    const checkout = new URL(target);
    if (checkout.protocol !== "https:" || !/(^|\.)mercadopago\.com(\.pe)?$/.test(checkout.hostname)) {
      return reply({ error: "Destino de pago inválido." }, 502);
    }
    return reply({ checkoutUrl: checkout.href });
  } catch {
    return reply({ error: "El proveedor de pago no está disponible. Reintenta." }, 502);
  }
};
