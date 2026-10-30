# Lista de interesados sin promesas falsas

Esta función está preparada, pero no recoge direcciones de correo salvo que se configure **Cloudflare D1** y `WAITLIST_ENABLED=true`.

## Activación segura
1. Crear una base D1 en Cloudflare.
2. Ejecutar `migrations/0001_waitlist.sql` en esa base.
3. Añadir el binding `LEADS_DB` a la Cloudflare Pages Function de este proyecto y seleccionar la base correcta para el entorno de la rama.
4. Revisar el texto de privacidad con asesoría legal y confirmar datos de responsable, canal de contacto, retención y derechos de titulares.
5. Probar envío válido, consentimiento ausente, email repetido, fallos del servidor y comprobación de la base.
6. Solo entonces establecer `WAITLIST_ENABLED=true`.

Si no está activo, el componente presenta un enlace a `mailto:xavier@cabellosalirrosas.com`; **no pretende guardar ningún correo**.

La tabla `waitlist` guarda correo, procedencia de campaña y fecha de consentimiento. No implementar newsletters, automatizaciones de correo ni campañas no consentidas sin revisión de cumplimiento normativo y políticas de baja.

## Seguridad antes de abrir tráfico alto
La versión preparada valida email, consentimiento, límite de cuerpo declarado, honeypot y origen. Antes de habilitar registro público, agregar rate limiting por ruta en Cloudflare WAF, alertas de abuso, backups, control de retención y proceso real de eliminación de datos. El backend no realiza envíos automáticos.
