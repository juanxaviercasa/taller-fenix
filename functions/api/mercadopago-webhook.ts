/**
 * Webhook Mercado Pago: autentica la firma y consulta la transacción al proveedor.
 * NO otorga acceso ni almacena pagos: la entrega sigue MANUAL hasta conectar D1/CRM.
 * Docs: https://www.mercadopago.com.pe/developers/es/docs/checkout-pro-preferences/additional-content/notifications/webhooks
 */
interface Env {
  MP_ACCESS_TOKEN?: string;
  MP_WEBHOOK_SECRET?: string;
  MP_CHECKOUT_ENABLED?: string;
  MP_PRICE_PEN?: string;
}
interface Context { request: Request; env: Env }
async function validSignature(request: Request, id: string, secret: string): Promise<boolean> {
  const signature = request.headers.get("x-signature") || "";
  const requestId = request.headers.get("x-request-id") || "";
  const ts = /(?:^|,)\s*ts=([0-9]+)(?:,|$)/.exec(signature)?.[1];
  const hex = /(?:^|,)\s*v1=([0-9a-f]{64})(?:,|$)/i.exec(signature)?.[1];
  if (!ts || !hex || !requestId) return false;
  // Manifest documentado: id:<data.id>;request-id:<x-request-id>;ts:<ts>;
  const manifest = `id:${id.toLowerCase()};request-id:${requestId};ts:${ts};`;
  const key = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["verify"]
  );
  const digest = Uint8Array.from(hex.match(/.{2}/g)!.map(part => parseInt(part, 16)));
  return crypto.subtle.verify("HMAC", key, digest, new TextEncoder().encode(manifest));
}
export const onRequestPost = async ({ request, env }: Context): Promise<Response> => {
  if (env.MP_CHECKOUT_ENABLED !== "true" || !env.MP_ACCESS_TOKEN || !env.MP_WEBHOOK_SECRET) {
    return new Response("Not configured", { status: 503 });
  }
  const url = new URL(request.url);
  if (url.searchParams.get("type") !== "payment") return new Response("OK");
  const id = url.searchParams.get("data.id");
  if (!id || !/^\d{1,24}$/.test(id)) return new Response("Invalid id", { status: 400 });
  if (!(await validSignature(request, id, env.MP_WEBHOOK_SECRET))) {
    return new Response("Unauthorized", { status: 401 });
  }
  try {
    const response = await fetch("https://api.mercadopago.com/v1/payments/" + id, {
      headers: { Authorization: "Bearer " + env.MP_ACCESS_TOKEN },
    });
    if (!response.ok) return new Response("Try later", { status: 503 });
    const payment = await response.json() as {
      status?: string; currency_id?: string; transaction_amount?: number; external_reference?: string;
    };
    if (payment.status !== "approved") return new Response("OK");
    const amount = Number(env.MP_PRICE_PEN || "34");
    if (payment.currency_id !== "PEN" || payment.transaction_amount !== amount ||
        !/^fenix-[0-9a-f-]{36}$/.test(payment.external_reference || "")) {
      return new Response("OK"); // No concede acceso a referencias ajenas ni importes distintos.
    }
    // PLACEHOLDER: registrar pago en base persistente, verificar idempotencia,
    // entregar acceso al alumno y manejar reembolsos/contracargos.
    // Por ahora la entrega se valida MANUALMENTE en Mercado Pago.
    return new Response("OK");
  } catch { return new Response("Try later", { status: 503 }); }
};
