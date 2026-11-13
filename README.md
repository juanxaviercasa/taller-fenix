# Sistema Zénit · Aplicaciones web interactivas con IA para educación

Landing editorial alojada en **Cloudflare Pages** (`taller-fenix`, rama `main`): React 19, TypeScript, Tailwind CSS v4 y Cloudflare Pages Functions (para la lista de aviso opcional en D1).

**Dominio de producción:** https://vibecoding.sistemazenit.com/

## Propuesta y oferta oficial

Taller práctico abierto a **profesionales en la industria de la educación** (docentes, capacitadores, coordinadores y creadores educativos) que desean transformar ideas guardadas en **aplicaciones web y herramientas interactivas reales con IA**, sin saber programación ni contratar programadores:

- **Precio oficial único:** **US$9**
- **Canal de checkout:** botón en placeholder para conectar el checkout dentro de nuestra comunidad en **Skool** (`VITE_SKOOL_CHECKOUT_URL`).
- **Alcance práctico:** desde aplicaciones para enseñar matemáticas y ciencias (conservando el graficador en vivo y **Math Studio** de tres niveles académicos) hasta herramientas para automatizar tareas y resolver necesidades reales en la industria educativa.
- **Respaldo:** ruta condensada desde la experiencia aplicada construyendo soluciones con IA desde **2023**.

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
