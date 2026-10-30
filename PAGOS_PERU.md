# Fénix — Integración Mercado Pago Perú preparada (placeholder)

## Estado actual
- Rama: `feat/checkout-mercadopago-yape-peru`.
- Oferta escogida para el primer experimento: **creadores / Vibe Coding**, entrada **US$9**.
- Primera prueba: una sola oferta en lugar de las rutas A/B.
- El cobro **ESTÁ DESACTIVADO** hasta habilitar `MP_CHECKOUT_ENABLED=true`.
- La página muestra “Pago en preparación · US$9” si faltan credenciales, funciones o activación. No se realiza ningún cargo.
- El checkout está diseñado para cobrar **PEN (soles)** a una cuenta peruana; por defecto **S/34 como precio local provisional**. US$9 es el mensaje comercial, **no existe conversión automática de divisas**. Verificar importe visible antes de habilitar.

## Elegir dominio
Recomendación para la oferta: `vibecoding.sistemazenit.com` (solo si el dominio te pertenece y está configurado en Cloudflare).
Mantener `fenix.cabellosalirrosas.com` intacto durante el experimento.
Para el despliegue ya configurado por el propietario en bycoding.systems.mx.com, comprobar si apunta a la rama y mantener main intacta; también es válido usar la URL de vista previa que Cloudflare asigne; el alias de rama es `feat-checkout-mercadopago-yape-peru.<nombre-del-proyecto>.pages.dev` según el nombre real del proyecto. No inventar un dominio `pages.dev`.
Para subdominio personalizado de rama, Cloudflare Pages admite enlazar un CNAME proxied hacia el alias de rama después de crear y desplegar la rama:
https://developers.cloudflare.com/pages/how-to/custom-branch-aliases/

## Despliegue en Cloudflare Pages
La aplicación usa **Vite + React**, build `npm run build`, salida `dist`. Las rutas de servidor residen en `functions/api/`, por lo que **GitHub Pages no puede servir el checkout**.
1. Crear/conectar un proyecto de Cloudflare Pages al repositorio privado `juanxaviercasa/taller-fenix`.
2. Publicar esta rama como **Preview** (no mezclar a `main` ni mover el dominio actual todavía).
3. Verificar que `GET /api/checkout` responde JSON `{ready:false,...}` sin credenciales y que el botón aparece desactivado. Si devuelve HTML, las Pages Functions no se desplegaron correctamente.
4. Cuando llegue el momento, elegir el subdominio y ponerlo como dominio personalizado de esa rama en Cloudflare DNS. Ajustar `SITE_URL` para que coincida con el dominio real en cada entorno.

## Variables / secretos pendientes
Configurar en **Cloudflare Pages > Settings > Variables and Secrets**:

| Nombre | Valor de ejemplo | Secreto | Propósito |
|---|---|---|---|
| `MP_CHECKOUT_ENABLED` | `false` | No | **Interruptor de seguridad**; solo activar tras pruebas |
| `MP_ACCESS_TOKEN` | `APP_USR_... (NO insertar aquí)` | **Sí** | Credencial privada del vendedor peruano |
| `MP_WEBHOOK_SECRET` | `... (NO insertar aquí)` | **Sí** | Firma de las notificaciones |
| `MP_PRICE_PEN` | `34` | No | Importe fijo en soles a cobrar |
| `MP_ENVIRONMENT` | `test` o `production` | No | URL de prueba o producción |
| `SITE_URL` | `https://vibecoding.sistemazenit.com` | No | Dominio definitivo con HTTPS |

**Nunca** publicar `MP_ACCESS_TOKEN`, `MP_WEBHOOK_SECRET` ni claves reales dentro de GitHub, URLs, archivos `.env`, capturas o chats. No utilizar `VITE_` para secretos.

## Mercado Pago y Yape
Se usa **Checkout Pro**: botón -> `POST /api/checkout` -> preferencia en API Mercado Pago -> redirección a checkout alojado por Mercado Pago. Yape puede aparecer entre los medios de pago disponibles según la cuenta, configuración y elegibilidad; este código **NO lo fuerza ni ofrece un cobro directo a Yape**. Si se requiere una integración propia de Yape, investigar Checkout API, tokenización OTP y aprobaciones del vendedor.
Documentación: https://www.mercadopago.com.pe/developers/es/docs/checkout-pro-preferences/overview
Documentación Yape: https://www.mercadopago.com.pe/developers/es/docs/checkout-api-orders/payment-integration/websites/yape

## Retornos y confirmación
El checkout utiliza las rutas:
- `/pago?estado=exitoso`
- `/pago?estado=pendiente`
- `/pago?estado=fallido`

**La redirección nunca significa que el pago está aprobado**.
El webhook `POST /api/mercadopago-webhook` autentica `x-signature`, consulta a Mercado Pago el estado/monto/moneda/referencia y responde; **no habilita entregas automáticamente**. Antes de automatizar accesos falta persistencia segura (D1/CRM), idempotencia, validación de órdenes y flujo de reembolsos. Por ahora, revisar los pagos directamente en el panel de Mercado Pago y entregar el acceso manualmente.

## Checklist de activación (Work, más adelante)
- [ ] Verificar cuenta de Mercado Pago Perú y opciones de Yape autorizadas.
- [ ] Crear aplicación de producción en Mercado Pago Developers.
- [ ] Configurar URLs de notificación; crear credenciales de prueba y producción en Cloudflare.
- [ ] Ejecutar pruebas con compradores de prueba y validar fallidos/pendientes/aprobados.
- [ ] Confirmar importe correcto en soles y comisión antes de abrir cobros.
- [ ] Configurar política de devolución y contacto.
- [ ] Completar entrega manual de alumnos o desarrollar sistema de acceso validado.
- [ ] Cambiar `MP_ENVIRONMENT=production`, `MP_CHECKOUT_ENABLED=true` **solo después de pruebas exitosas**.

## Nota de tests
El código se revisó mediante lectura del repositorio. El build `npm run build` debe ejecutarse en el entorno de desarrollo/CI antes de publicar.

## Revisión comercial (octubre de 2026)
La landing se rediseñó como TSL independiente de una VSL. Incluye demo interactiva propia, seis capturas reales copiadas del portafolio del mismo propietario y links de los proyectos, una oferta única de US$9, FAQ transparente y espacio sin foto sintética del instructor. Ver `docs/MARKETING_REFERENCIAS.md` y `docs/FOTOGRAFIA_INSTRUCTOR.md`.
