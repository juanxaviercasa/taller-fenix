# Sistema Zénit · Aplicaciones web interactivas con IA para educación

Landing editorial alojada en **Cloudflare Pages** (`taller-fenix`, rama `main`): React 19, TypeScript, Tailwind CSS v4 y Cloudflare Pages Functions (para la lista de aviso opcional en D1).

**Dominio de producción:** https://vibecoding.sistemazenit.com/

## Propuesta y oferta oficial

Taller práctico para **docentes y profesionales de la educación** que quieren convertir una idea de clase en una web interactiva con IA, aportando su criterio y revisando lo que la herramienta construye:

- **Precio de entrada:** pago único de **US$9**, con acceso al taller y sus grabaciones durante 30 días.
- **Formato:** tres sesiones en vivo de alrededor de dos horas, guías y plantillas, más acceso a tres proyectos educativos para adaptar.
- **Canal de checkout:** Hotmart. El botón permanece desactivado hasta configurar `VITE_HOTMART_CHECKOUT_URL` con el enlace oficial `https://pay.hotmart.com/...`.
- **Acceso de por vida:** no se publica hasta confirmar el precio exacto de esa modalidad.
- **Comunidad posterior:** Skool es un paso opcional de acompañamiento semanal, previsto en US$19/mes; no es el checkout del taller de entrada.
- **Alcance práctico:** desde aplicaciones para enseñar matemáticas y ciencias (conservando el graficador en vivo y **Math Studio** de tres niveles académicos) hasta herramientas para automatizar tareas y resolver necesidades reales en la industria educativa.
- **Respaldo:** experiencia aplicada construyendo soluciones con IA desde **2023**. La primera versión no promete un plazo fijo ni resultados de aprendizaje o ingresos garantizados.

## Proyectos reales publicados

1. `Funciones Lab` (`https://funciones.sistemazenit.com/`)
2. `Transformaciones Geométricas` (`https://transformacionesgeometricas.sistemazenit.com/`)
3. `Sólidos Geométricos` (`https://solidosgeometricos.sistemazenit.com/`)
4. `Mundos Simulados` (`https://mundossimulados.online/`)
5. `Test vocacional RALE` (`https://raletest.sistemazenit.com/`)
6. `Herramientas para Pymes` (`https://nubeparapymes.online/herramientas/`)
7. `Todo Lima` (`https://todolima.com/`)

## Comandos locales

```bash
npm ci
npm test
npm run lint
npm run build
```

## Registro de aviso

El formulario de interesados (`functions/api/waitlist.ts`) solo guarda correos cuando `WAITLIST_ENABLED=true`, hay consentimiento explícito y existe el binding D1 `LEADS_DB`. Mientras tanto muestra el canal directo por correo. Ver `docs/WAITLIST_SETUP.md`.
