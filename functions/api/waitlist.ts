/**
 * Lista de interesados con Cloudflare D1.
 * Activación deliberada: WAITLIST_ENABLED=true + binding LEADS_DB.
 * Sin almacenamiento configurado: no se reciben correos y la UI usa mailto.
 */
type Prepared = { bind(...values: unknown[]): { run(): Promise<unknown> } };
type DB = { prepare(sql: string): Prepared };
interface Env { LEADS_DB?: DB; WAITLIST_ENABLED?: string }
interface Ctx { request: Request; env: Env }
const headers = { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" };
const json = (data: object, status = 200) => new Response(JSON.stringify(data), { headers, status });

export const onRequestGet = ({ env }: Ctx) => json({ available: env.WAITLIST_ENABLED === "true" && Boolean(env.LEADS_DB) });
export const onRequestPost = async ({ request, env }: Ctx) => {
  if (env.WAITLIST_ENABLED !== "true" || !env.LEADS_DB) return json({ error: "Registro no habilitado." }, 503);
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return json({ error: "Origen no permitido." }, 403);
  if (Number(request.headers.get("content-length") || 0) > 4096) return json({ error: "Solicitud demasiado grande." }, 413);
  let body: { email?: unknown; consent?: unknown; website?: unknown; source?: unknown };
  try { body = await request.json() as typeof body; } catch { return json({ error: "Solicitud inválida." }, 400); }
  if (body.website) return json({ ok: true }); // Honeypot: no almacenar bots.
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return json({ error: "Escribe un correo válido." }, 400);
  if (body.consent !== true) return json({ error: "Debes aceptar la finalidad del registro." }, 400);
  const source = typeof body.source === "string" ? body.source.slice(0,80).replace(/[^a-zA-Z0-9_.-]/g, "") : "site";
  try {
    await env.LEADS_DB.prepare("INSERT INTO waitlist (email, source, consent_at) VALUES (?, ?, datetime('now')) ON CONFLICT(email) DO NOTHING").bind(email, source).run();
    return json({ ok: true });
  } catch {
    return json({ error: "No pudimos guardar tu registro. Escríbenos por correo." }, 503);
  }
};
