interface Env { MP_ACCESS_TOKEN?: string; MP_PRICE_PEN?: string; SITE_URL?: string }
interface Context { request: Request; env: Env }
export const onRequestPost = async ({ request, env }: Context): Promise<Response> => {
  const headers = { "Content-Type": "application/json", "Cache-Control": "no-store" };
  if (!env.MP_ACCESS_TOKEN) return new Response(JSON.stringify({ error: "Pagos aún no configurados." }), { status: 503, headers });
  const configured = Number(env.MP_PRICE_PEN || "34");
  if (!Number.isFinite(configured) || configured <= 0 || configured > 1000) return new Response(JSON.stringify({ error: "Precio inválido." }), { status: 500, headers });
  const site = new URL(env.SITE_URL || "https://fenix.cabellosalirrosas.com");
  if (site.protocol !== "https:") return new Response(JSON.stringify({ error: "SITE_URL debe usar HTTPS." }), { status: 500, headers });
  const reference = crypto.randomUUID();
  const body = {
    items: [{ id: "fenix-entrada-9usd", title: "Taller Fénix - Entrenamiento de Vibe Coding con IA", quantity: 1, currency_id: "PEN", unit_price: configured }],
    external_reference: reference,
    back_urls: {
      success: new URL("/pago?estado=exitoso", site).toString(),
      pending: new URL("/pago?estado=pendiente", site).toString(),
      failure: new URL("/pago?estado=fallido", site).toString()
    },
    auto_return: "approved",
    notification_url: new URL("/api/mercadopago-webhook", site).toString(),
    metadata: { product: "fenix-entrada", offer_usd: 9 }
  };
  try {
    const res = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: { "Authorization": "Bearer " + env.MP_ACCESS_TOKEN, "Content-Type": "application/json", "X-Idempotency-Key": reference },
      body: JSON.stringify(body)
    });
    const data = await res.json() as { init_point?: string; error?: string; message?: string };
    if (!res.ok || !data.init_point || !/^https:\/\/([a-z0-9-]+\.)*mercadopago\.com(\.pe)?\//i.test(data.init_point)) {
      return new Response(JSON.stringify({ error: "No fue posible iniciar el pago. Intenta nuevamente." }), { status: 502, headers });
    }
    return new Response(JSON.stringify({ checkoutUrl: data.init_point }), { status: 200, headers });
  } catch {
    return new Response(JSON.stringify({ error: "El servicio de pagos no responde. Intenta nuevamente." }), { status: 502, headers });
  }
};
