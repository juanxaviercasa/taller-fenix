# Pagos en Perú — Taller Fénix

## Propuesta comercial
Precio anunciado: **US$9**. Para la cuenta peruana de Mercado Pago la preferencia usa **PEN**, con precio local fijo configurable (valor inicial: **S/34**, no una conversión en tiempo real). Publicar el importe exacto antes del pago y ajustarlo según las pruebas comerciales. Yape se muestra únicamente si Mercado Pago lo ofrece para la cuenta/comprador; la página no puede forzarlo.

## Desplegar
**Requiere Cloudflare Pages con Functions habilitadas**. Una publicación exclusivamente en GitHub Pages no ejecutará `functions/api/checkout.ts`.
1. Conectar el repositorio a Cloudflare Pages; build `npm run build`, directorio `dist`.
2. En Pages > Settings > Variables and Secrets configurar:
   - `MP_ACCESS_TOKEN`: secreto servidor de Mercado Pago Perú (NUNCA usar prefijo VITE_ ni subirlo a GitHub).
   - `MP_PRICE_PEN`: por ejemplo `34`.
   - `SITE_URL`: `https://fenix.cabellosalirrosas.com`.
3. Crear la aplicación e integrar Checkout Pro en Mercado Pago Perú, validar la cuenta, Yape y credenciales.
4. Probar con cuentas de prueba y credenciales de test. Verificar ida, retorno aprobado, pendiente y fallido.
5. Pasar a credenciales de producción después de las pruebas.

## Importante: entrega del producto
La redirección `/pago?estado=exitoso` **NO** es comprobante de pago. Esta implementación sólo abre el checkout y recibe notificaciones sin activar acceso. Antes de entregar cursos automáticamente se necesita persistencia, validación de la firma x-signature y consulta de pago a Mercado Pago, verificando idempotencia, referencia, estado `approved`, monto y moneda. Hasta implementarlo, verificar los pagos en el panel del vendedor y gestionar el acceso manualmente.

El cuerpo de la solicitud del navegador no permite cambiar precio ni producto. La preferencia se construye exclusivamente en el servidor.

Referencias:
- https://www.mercadopago.com.pe/developers/es/docs/checkout-pro-preferences/overview
- https://www.mercadopago.com.pe/developers/es/reference/online-payments/checkout-pro-preferences/create-preference/post
- https://developers.cloudflare.com/pages/functions/bindings/
