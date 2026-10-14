# Fénix · Taller Web

Landing VSL en React, TypeScript y Tailwind CSS v4. El diseño sigue el documento `Diseño VSL y Reglas Tailwind.md` de la raíz.

La propuesta, el guion revisado, el diseño del taller y las siguientes fases del embudo están documentados en `Estrategia Maestra Fenix - Oferta VSL y Embudo.md`.

## Desarrollo

- `npm run dev`: servidor local en el puerto 8080.
- `npm run build`: comprobación de TypeScript y compilación de producción.
- `npm run lint`: análisis de código.
- `node --test tests/delayed-cta.test.mjs`: pruebas del desbloqueo y SSR.

## Placeholders

Edita `src/vslConfig.ts` para reemplazar el video (MP4/WebM), subtítulos WebVTT, foto del mentor, enlace de pago y el segundo real en que se pronuncia la oferta. El valor de 180 segundos es provisional y no debe fijarse hasta editar el VSL. La miniatura existente se conserva.

Sin video se muestra una vista previa; no se simula reproducción. Sin enlace de pago, el CTA desbloqueado es un botón deshabilitado. Para YouTube, Vimeo u otra plataforma, integrar su SDK y conectar sus eventos de reproducción al hook.

Los CTA de arriba y del pie están fuera del DOM hasta que el video alcanza el pitch. El hook usa un temporizador solo mientras reproduce, verifica el tiempo real del reproductor y limpia eventos/temporizadores al desmontarse. Pausar o esperar por buffering no consume tiempo del pitch. La marca de desbloqueo persiste en localStorage y se sincroniza entre pestañas. Si el almacenamiento está bloqueado, funciona en memoria. Cambiar storageVersion reinicia el desbloqueo para una nueva edición.

El primer render no accede a window ni localStorage: el estado persistido se recupera dentro de useEffect después del montaje. El proyecto es una SPA Vite; el hook es compatible con SSR.

Los tokens OKLCH, familias tipográficas y ancho del VSL están en @theme; el vidrio reutilizable usa @utility. Inter y Clash Display tienen fallback del sistema hasta incorporar sus archivos de fuente. Sustituir la fotografía provisional y revisar los textos finales antes de publicar.
