# Fénix · Matemáticas × IA

Landing educativa dirigida a **docentes de matemáticas** de secundaria, preparación preuniversitaria y cursos universitarios iniciales. Muestra ejemplos reales de aplicaciones interactivas usadas en sesiones de aprendizaje y presenta un taller introductorio para crear un primer módulo matemático con ayuda de IA.

**Rama de producción prevista:** `main`.
**Dominio previsto:** https://vibecoding.sistemazenit.com/

## Tecnologías

- React 19, TypeScript, Vite y Tailwind CSS v4.
- Math Studio: demostraciones matemáticas interactivas con React/SVG y KaTeX.
- Cloudflare Pages Functions para checkout y registro de interesados; Cloudflare D1 opcional para el registro.
- GitHub Actions para pruebas, análisis estático y compilación.

## Desarrollo

```bash
npm ci
npm run dev
npm test
npm run lint
npm run build
```

El servidor de desarrollo usa el puerto 8080. La compilación estática se genera en `dist/`.

## Oferta y alcance

El producto piloto se comunica a **US$9**, con cobro en soles cuando se configure Mercado Pago Perú. La página enseña demostraciones de varios niveles; **el taller introductorio no incluye las aplicaciones avanzadas completas**.

La disponibilidad del checkout no debe suponerse: el código del servidor exige `MP_CHECKOUT_ENABLED=true`, credenciales privadas válidas, precio explícito en PEN y configuración de entorno. **No activar cobros hasta probar el flujo en la cuenta real, los webhooks, la conciliación y la entrega del acceso.** Actualmente la entrega de acceso es manual. No se debe deducir que una redirección de éxito confirma el pago.

El formulario de interesados requiere `WAITLIST_ENABLED=true` y el binding D1 `LEADS_DB`. Sin estas configuraciones, debe permanecer deshabilitado y mostrar la alternativa de contacto. Consultar `PAGOS_PERU.md` y `docs/WAITLIST_SETUP.md`.

No colocar tokens o secretos en el repositorio. Usar variables y secretos de Cloudflare.

## Despliegue y verificación

1. Confirmar en la cuenta **correcta** de Cloudflare que el proyecto de `vibecoding.sistemazenit.com` está conectado a `juanxaviercasa/taller-fenix`.
2. Verificar que la rama de producción sea `main`, el comando de compilación sea `npm run build` y el directorio de salida `dist`.
3. Revisar los logs del despliegue y comprobar la landing, los enlaces, Math Studio, las rutas `/pago` y `/privacidad` y los formularios.
4. Ejecutar las pruebas E2E y las pruebas reales de pagos antes de habilitar ventas.

No interpretar el resultado de GitHub Actions como una confirmación de despliegue en Cloudflare.

## Ramas históricas

Las tres propuestas comerciales anteriores se conservaron para desarrollo futuro en:

- `ofertas/web-costo-cero`
- `ofertas/vibe-coding-creadores`
- `ofertas/microagencia`

Estas ramas son **copias del estado previo** con las tres ofertas aún combinadas. No representan productos individuales ya separados. También existe `backup/main-pre-docentes-2026-11-12` como respaldo anterior a la integración educativa.

## Documentos de referencia

- `docs/AVATAR_Y_OFERTA_PRIORITARIA.md`: perfil y propuesta docente principal.
- `PAGOS_PERU.md`: preparación segura de Mercado Pago.
- `docs/WAITLIST_SETUP.md`: lista de interesados con D1.
- `Investigacion_Profesores_de_Matematicas.md`: investigación de audiencia.
- Los documentos de estrategia y VSL de la raíz pueden contener ideas de las **ofertas anteriores**; no deben tomarse automáticamente como especificaciones de producción para `main`.
