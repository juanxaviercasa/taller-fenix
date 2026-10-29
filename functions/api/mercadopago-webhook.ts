// Endpoint de recepción: NO confirma ni concede acceso. La entrega del curso
// requiere consultar el pago server-to-server a Mercado Pago y validar monto,
// moneda, referencia y estado approved antes de activar a un alumno.
interface Env { MP_ACCESS_TOKEN?: string }
interface Context { request: Request; env: Env }
export const onRequestPost = async ({ request, env }: Context): Promise<Response> => {
  if (!env.MP_ACCESS_TOKEN) return new Response("Not configured", { status: 503 });
  const url = new URL(request.url);
  const id = url.searchParams.get("data.id");
  const type = url.searchParams.get("type");
  if (type !== "payment" || !id || !/^\d{1,24}$/.test(id)) return new Response("OK");
  try {
    const result = await fetch("https://api.mercadopago.com/v1/payments/" + id, {
      headers: { Authorization: "Bearer " + env.MP_ACCESS_TOKEN }
    });
    if (!result.ok) return new Response("Retry", { status: 503 });
    const payment = await result.json() as { status?: string; currency_id?: string; transaction_amount?: number; external_reference?: string };
    // No se guarda ningún dato ni se activa acceso sin almacenamiento persistente.
    // Integrar aquí D1/CRM y la validación de firma x-signature ANTES de automatizar entregas.
    if (payment.status !== "approved") return new Response("OK");
    if (payment.currency_id !== "PEN" || !payment.external_reference) return new Response("OK");
    return new Response("OK");
  } catch { return new Response("Retry", { status: 503 }); }
};
