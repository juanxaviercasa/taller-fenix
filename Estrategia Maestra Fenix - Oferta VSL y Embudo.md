# Estrategia Maestra Fénix

## Revisión tras `estrategia_curso.md`

El documento confirma que el ángulo de hosting y WordPress debe conservarse. No era un desvío del producto: representa un segundo mercado real junto al de educadores y creadores que quieren construir herramientas con IA.

La decisión revisada es trabajar con una oferta central y dos rutas de adquisición:

1. **Independencia:** para propietarios de WordPress, autónomos y pequeños negocios que pagan alojamiento o mantenimiento y quieren reconstruir una página crítica en paralelo, sin apagar todavía su sitio actual.
2. **Creación:** para educadores, consultores y emprendedores que quieren construir una landing, calculadora, test o herramienta sencilla desde cero.

Ambas rutas comparten el mismo método: definir una página concreta, construirla con IA, revisar escritorio y móvil, guardar el código bajo control y desplegar una versión estática dentro de los límites de una plataforma gratuita.

La promesa general recomendada queda así:

> Crea con IA una web rápida que tú controles y publícala sin mensualidad de hosting, dentro de los límites del plan gratuito, aunque hoy no sepas programar.

El documento `estrategia_curso.md` acierta al identificar el dolor de las renovaciones, la dependencia de WordPress y la falta de control. Debe corregirse únicamente el alcance técnico: una tienda, membresía, LMS, foro, reservas complejas o sistema con PHP/MySQL no se migra de forma directa a GitHub y CDN. El taller debe enseñar un proyecto paralelo estático y dejar la migración completa para un curso posterior.

Para adquisición se recomiendan dos aperturas de VSL y dos variantes de la landing. El visitante que llega por “renovación de hosting” debe ver primero el problema de WordPress; el que llega por “crear una herramienta educativa con IA” debe ver primero la demostración. El producto, el precio y el mecanismo pueden ser comunes.

## Decisión estratégica

El taller de $19 no debe venderse principalmente como una forma de ahorrar alojamiento. El ahorro es un beneficio secundario y sirve para captar atención, pero limita la audiencia a quienes ya pagan hosting y atrae compradores motivados solo por precio.

La promesa central recomendada es:

> Convierte una idea postergada en tu primera web funcional con ayuda de IA y publícala en internet, aunque hoy no sepas programar.

El resultado mínimo que debe poder cumplirse dentro del taller es una página o herramienta sencilla, responsive y publicada. No se debe prometer que cualquier alumno construirá una plataforma completa, academia o aplicación compleja en una sola sesión.

El ahorro de hosting se presenta así:

> Para este tipo de proyecto inicial aprenderás a usar opciones de publicación con planes gratuitos, dentro de sus límites y condiciones.

Esta formulación conserva el beneficio sin prometer gratuidad perpetua. Cloudflare Pages y otras plataformas aplican cuotas, límites y cambios de condiciones. Vercel Hobby, en particular, está sujeto a uso personal o no comercial; por eso no debe presentarse de manera general como hosting gratuito para cualquier negocio.

## Audiencia de entrada

La página no debe intentar hablarle con la misma intensidad a profesores, consultores y a cualquier dueño de negocio. El mensaje principal debe dirigirse a una situación compartida:

- Tiene una idea concreta para enseñar, captar clientes, calcular, evaluar o automatizar.
- La ha postergado por costo, dependencia técnica o miedo a romper algo.
- Sabe usar herramientas digitales comunes, pero no se considera programador.
- Valora la guía, la claridad y un resultado visible por encima de una formación técnica extensa.

Perfil prioritario recomendado para la primera validación: educadores, formadores y consultores que necesitan una herramienta sencilla para entregar valor o captar prospectos. Este segmento conecta naturalmente con la experiencia del mentor y permite demostrar calculadoras, evaluaciones, simuladores, páginas de registro y recursos interactivos.

## Mecanismo propio

El término “Vibe Coding” despierta curiosidad, pero no debe cargar toda la promesa. Se recomienda convertir el proceso en un método recordable:

### Método Fénix: Idea → Construcción → Publicación

1. **Idea clara:** convertir una necesidad en una especificación sencilla.
2. **Construcción guiada:** pedir, revisar y corregir con IA sin copiar a ciegas.
3. **Publicación segura:** probar en móvil y desplegar dentro de los límites del servicio elegido.

La diferencia de la oferta no es “la IA escribe código”. Esa capacidad está disponible para todos. La diferencia es la ruta, los comandos, los criterios de revisión y el acompañamiento para llegar a un resultado funcional.

## Oferta mínima viable del taller

Nombre recomendado:

> **Taller Fénix: de una idea a tu primera web con IA**

Promesa de trabajo:

> En una sesión práctica construirás una primera versión sencilla y la publicarás en internet siguiendo el Método Fénix, incluso si hoy no sabes programar.

La oferta de $19 debería incluir:

- Taller en vivo de 90 a 120 minutos.
- Plantilla de definición de proyecto de una página.
- Biblioteca inicial de prompts o comandos probados.
- Proyecto base para evitar instalaciones y decisiones innecesarias.
- Checklist de revisión para escritorio y móvil.
- Guía de publicación y límites de los planes gratuitos usados.
- Grabación disponible durante un plazo definido.
- Una sesión breve de preguntas o un canal temporal de soporte.
- Invitación opcional al siguiente programa, presentada después de entregar el primer resultado.

No se deben añadir bonos que no ayuden al alumno a publicar. La claridad convierte mejor que una pila artificial de archivos.

## Criterio de éxito del alumno

El taller se considera cumplido cuando el alumno:

1. Define una web sencilla con usuario, propósito y acción principal.
2. Genera una primera versión a partir del proyecto base.
3. Realiza al menos una corrección guiada.
4. Comprueba la vista móvil.
5. Publica una URL o queda a un único paso claramente documentado por una limitación de cuenta.

Este criterio debe guiar el currículo, la demostración, el soporte y los testimonios.

## VSL recomendada

La VSL debe durar aproximadamente 4 a 5 minutos. Tres minutos pueden vender una oferta de $19, pero dejan poco espacio para demostrar el mecanismo, hacer creíble el resultado y filtrar expectativas. El botón debe aparecer cuando se pronuncia por primera vez la oferta completa, no en un minuto decidido antes de grabar. Una vez editado el video, se registra el segundo real en `src/vslConfig.ts`.

### 0:00–0:20 — Gancho específico

**Visual:** mentor a cámara; encuadre cercano y natural. En pantalla aparecen ejemplos breves de una calculadora, evaluación o página de captación.

**Guion:**

> Si tienes una idea para enseñar mejor, captar clientes o crear una herramienta para tu negocio, pero la sigues postergando porque no sabes programar, quiero mostrarte algo. Hoy puedes convertir una idea sencilla en una web funcional y publicarla en internet con ayuda de inteligencia artificial. El reto ya no es escribir cada línea de código: es saber qué pedir, qué revisar y cómo llegar hasta el final.

### 0:20–1:00 — Espejo del problema

**Visual:** archivos dispersos, constructores, presupuestos y una versión móvil deficiente. Usar capturas propias o material con permiso.

**Guion:**

> Tal vez ya probaste un constructor, pediste un presupuesto o abriste un tutorial que asumía demasiadas cosas. Terminas dependiendo de alguien para cada cambio, pagando herramientas que aún no aprovechas o mirando una pantalla en blanco sin saber cuál es el siguiente paso. Y tu idea, que podría ayudar a un alumno o a un cliente, sigue guardada en una libreta.

### 1:00–2:15 — Demostración del mecanismo

**Visual:** demostración sin cortes engañosos. Mostrar la instrucción, el resultado inicial, un error o ajuste real, la revisión móvil y la URL publicada.

**Guion:**

> Este es el Método Fénix. Primero definimos una sola persona, un solo problema y una sola acción. Después convertimos esa definición en instrucciones claras para la IA. Mira: le pido una calculadora sencilla para mis alumnos, con los campos que necesito y una experiencia legible en el celular. La IA crea una primera versión, pero no la aceptamos a ciegas. La probamos, corregimos lo necesario y, cuando funciona, la publicamos. Para proyectos iniciales como este existen planes gratuitos con límites suficientes para aprender y validar una idea. Si el proyecto crece, entonces elegimos la infraestructura adecuada.

### 2:15–2:55 — Autoridad con evidencia

**Visual:** mentor a cámara intercalado con dos o tres proyectos reales. Añadir datos verificables, nombres o resultados solo cuando existan.

**Guion:**

> Soy [NOMBRE], profesor de matemáticas y desarrollador web. He usado este proceso para crear [EJEMPLOS REALES]. Como profesor sé que aprender no consiste en ver a otra persona hacer clic: consiste en completar un proceso y entender cómo repetirlo. Por eso convertí mi forma de trabajar en una ruta práctica para personas que parten desde cero.

### 2:55–3:45 — Oferta y aparición del CTA

**Visual:** mostrar el taller, sus componentes y el botón debajo del video. El CTA aparece exactamente al pronunciar “por 19 dólares”.

**Guion:**

> Preparé el Taller Fénix: de una idea a tu primera web con IA. En una sesión práctica vamos a definir tu proyecto, construir una primera versión, revisarla en móvil y publicarla siguiendo el mismo proceso que acabas de ver. Recibirás la plantilla de definición, mis comandos iniciales, el proyecto base, el checklist de revisión y la guía de publicación. Por 19 dólares puedes reservar tu plaza en el botón que acaba de aparecer debajo de este video.

### 3:45–4:25 — Reducción de riesgo y filtro

**Visual:** lista “es para ti / no es para ti”.

**Guion:**

> Este taller es para ti si tienes una idea sencilla, puedes seguir instrucciones y estás dispuesto a construir conmigo. No es una promesa de crear una plataforma compleja en una tarde ni un atajo para dejar todo en manos de la IA. Es una ruta para completar tu primer proyecto pequeño y adquirir una habilidad que podrás volver a usar.

### 4:25–4:50 — Cierre

**Visual:** mentor a cámara y CTA visible.

**Guion:**

> Tu primera versión no tiene que ser perfecta; tiene que existir, funcionar y enseñarte qué mejorar. Haz clic en el botón, reserva tu plaza por 19 dólares y trae esa idea que llevas tiempo postergando. Nos vemos dentro del Taller Fénix.

## Elementos que deben sustituirse antes de grabar

- `[NOMBRE]` y una presentación personal de una sola frase.
- Dos o tres proyectos reales y verificables.
- Fecha, hora, zona horaria y duración del taller.
- Plazo exacto de acceso a la grabación.
- Canal y duración del soporte.
- Cupos reales, solo si existe un límite operativo.
- Política de reembolso o satisfacción aplicable.
- Herramienta de IA que se enseñará y sus límites vigentes.
- Plataforma de publicación elegida y sus términos vigentes.

## Afirmaciones que deben eliminarse o reformularse

| Afirmación original | Problema | Formulación recomendada |
|---|---|---|
| “Te están secuestrando digitalmente” | Agresiva, polariza y exige demostrar la acusación. | “Dependes de proveedores y renovaciones que dificultan empezar.” |
| “Gratis de por vida” | Ningún proveedor garantiza condiciones perpetuas. | “Con un plan gratuito, dentro de sus límites actuales.” |
| “Estructura perfecta” | La salida de IA necesita revisión. | “Una primera versión que vamos a probar y corregir.” |
| “Imposible de hackear” | Falso para cualquier sistema conectado. | “Reduce superficie de ataque en un sitio estático bien configurado.” |
| “Carga en milisegundos” | Depende del proyecto, red y medición. | “Puede ofrecer una carga rápida si se optimiza correctamente.” |
| “Saldrás con tu Web App” | Demasiado amplio para una sesión y público inicial. | “Saldrás con una primera web sencilla publicada o lista para publicar.” |
| “Sin aprender a programar” | Puede interpretarse como cero comprensión. | “Sin experiencia previa; aprenderás lo necesario para guiar y revisar.” |

## Arquitectura de la landing

La landing actual cubre gancho, video, dolor, mecanismo, mentor y FAQ. Antes de abrir tráfico pagado necesita incorporar:

1. **Resultado concreto:** ejemplos del tipo de proyecto alcanzable.
2. **Qué incluye:** entregables, duración, modalidad y grabación.
3. **Para quién / para quién no:** reduce compras equivocadas.
4. **Prueba del mecanismo:** demostración o proyectos reales.
5. **Información operativa:** fecha, hora, zona horaria y requisitos.
6. **Reducción de riesgo:** política real y soporte.
7. **CTA consistente:** una misma acción y un mismo precio.
8. **Prueba social auténtica:** solo resultados verificables; durante la primera edición usar transparencia de “edición fundadora” en lugar de testimonios inventados.

Los logos de herramientas deben describirse como herramientas utilizadas, nunca como avales o alianzas.

## Diseño del taller

### Antes del vivo

- Formulario de compra con una pregunta: “¿Qué deseas crear?”
- Correo inmediato con fecha, enlace, requisitos y proyecto base.
- Recordatorios 24 horas y 1 hora antes.
- Mini diagnóstico para agrupar ideas por tipo.
- Prueba técnica opcional de 10 minutos.

### Agenda sugerida de 105 minutos

| Tiempo | Bloque | Resultado |
|---:|---|---|
| 0–10 min | Bienvenida y alcance | El alumno sabe qué construirá y qué quedará fuera. |
| 10–25 min | Idea clara | Completa persona, problema, acción y contenido mínimo. |
| 25–45 min | Primera construcción | Genera una versión sobre el proyecto base. |
| 45–65 min | Revisión guiada | Corrige contenido, interacción y errores visibles. |
| 65–80 min | Adaptación móvil | Comprueba jerarquía, lectura y acciones táctiles. |
| 80–95 min | Publicación | Obtiene una URL o completa el proceso documentado. |
| 95–105 min | Próximo paso | Plan de siete días, preguntas y siguiente oferta opcional. |

### Después del vivo

- Correo inmediato con grabación, materiales y checklist.
- Desafío de 7 días para publicar o mejorar una versión.
- Solicitud de evidencia: URL, captura y respuesta a tres preguntas.
- Testimonio solicitado solo después de comprobar el resultado.
- Invitación al siguiente programa basada en el nuevo obstáculo del alumno.

## Embudo de ascensión

La función del taller de $19 es producir compradores activados y evidencia de transformación. No debe intentar enseñar todo ni forzar una mentoría de alto precio en la primera compra.

### Nivel 1 — Taller Fénix ($19)

Resultado: primera web sencilla publicada y comprensión del Método Fénix.

Métrica principal: porcentaje de compradores que publica o entrega evidencia durante siete días.

### Nivel 2 — Curso de implementación

Resultado: construir un activo de negocio completo, por ejemplo una herramienta de captación, evaluación, simulador o página de oferta.

Contenido: arquitectura, diseño, formularios, datos, analítica, despliegue y mantenimiento. La oferta se presenta cuando el alumno descubre que publicar una primera versión no equivale todavía a convertirla en un sistema de negocio.

### Nivel 3 — Programa acompañado

Resultado: lanzar una solución validada con revisiones, sesiones grupales y fechas de entrega.

Debe vender ejecución y feedback, no más videos. La entrada se filtra con aplicación o con evidencia del proyecto inicial.

### Nivel 4 — Mentoría o implementación premium

Resultado: diseñar y lanzar un producto, plataforma educativa o sistema digital alineado con el negocio del cliente.

Solo se ofrece a alumnos con problema valioso, capacidad de implementación y compromiso demostrado. Puede ser mentoría, servicio colaborativo o implementación completa, con alcances distintos.

## Métricas mínimas

No se optimiza únicamente la compra. El tablero debe seguir la cadena completa:

| Etapa | Métrica |
|---|---|
| Landing | reproducción del video, 25%, 50%, pitch y finalización |
| Oferta | clic al CTA, inicio de checkout y compra |
| Taller | asistencia en vivo y permanencia |
| Activación | proyecto definido, versión creada y URL publicada |
| Calidad | solicitud de ayuda, satisfacción y reembolso |
| Ascensión | consumo de materiales, desafío completado y aceptación de siguiente oferta |

Los objetivos numéricos se fijarán después de la primera cohorte. Antes de tener datos propios, cualquier porcentaje de conversión es una hipótesis.

## Fases de ejecución recomendadas

### Fase 2 — Validación de oferta y guion

- Entrevistar a 5–10 personas del segmento prioritario.
- Elegir un único proyecto demostrativo.
- Completar los datos operativos de la oferta.
- Grabar una demostración real antes del discurso a cámara.
- Editar la VSL y medir el segundo exacto del pitch.
- Actualizar los placeholders y la landing.

**Puerta para avanzar:** cinco personas entienden la promesa sin explicación adicional y al menos tres expresan interés real o compran una edición fundadora.

### Fase 3 — Producto y experiencia del taller

- Construir plantilla, proyecto base, prompts y checklist.
- Ensayar el taller completo con cronómetro.
- Probarlo con dos usuarios sin experiencia técnica.
- Preparar recuperación ante errores de instalación, cuenta o despliegue.

**Puerta para avanzar:** un usuario de prueba completa el resultado mínimo dentro del tiempo previsto.

### Fase 4 — Checkout, onboarding y medición

- Conectar pago, confirmación, correos y recordatorios.
- Instalar analítica con eventos del VSL y del checkout.
- Probar compra, acceso, móvil, correos y reembolso.
- Incorporar consentimiento y textos legales aplicables.

**Puerta para avanzar:** una compra de prueba recorre todo el sistema sin intervención manual inesperada.

### Fase 5 — Cohorte fundadora

- Captar primero con audiencia propia, aliados o alcance directo.
- Ejecutar una cohorte pequeña y observar bloqueos.
- Recoger proyectos, lenguaje del cliente y objeciones reales.
- Corregir el currículo y la landing con evidencia.

**Puerta para avanzar:** la mayoría de asistentes completa el resultado central y existen casos utilizables con autorización.

### Fase 6 — Ascensión

- Diseñar el curso siguiente a partir de las necesidades observadas.
- Separar claramente contenido, acompañamiento y servicio premium.
- Crear una secuencia poscompra basada en progreso, no solo en promociones.
- Ofrecer el siguiente nivel después de una victoria observable.

### Fase 7 — Escala y optimización

- Probar tráfico pagado solo después de validar activación y retención.
- Ensayar una variable importante por vez: promesa, demostración, prueba u oferta.
- Comparar cohortes por fuente, asistencia, publicación y ascensión.
- Mantener registro de versiones del VSL y del estado de desbloqueo del CTA.

## Fuentes operativas consultadas

- GitHub documenta que Copilot Free tiene límites mensuales; no debe venderse como uso ilimitado: <https://docs.github.com/en/copilot/managing-copilot/managing-copilot-as-an-individual-subscriber/getting-started-with-copilot-on-your-personal-account/about-individual-copilot-plans-and-benefits>
- Cloudflare documenta límites de Pages Free, incluidos compilaciones, archivos y proyectos: <https://developers.cloudflare.com/pages/platform/limits/>
- Cloudflare señala Workers como plataforma principal para nuevos casos de aplicación, aunque Pages sigue disponible: <https://developers.cloudflare.com/pages/>
- Los términos de Vercel limitan Hobby a uso personal o no comercial: <https://vercel.com/legal/terms>

## Addendum: decisión final después de `estrategia_curso.md`

Este addendum reemplaza cualquier frase anterior del dossier que prometa migrar cualquier WordPress, hosting gratuito perpetuo, seguridad absoluta o una aplicación completa en minutos.

### Posicionamiento final

> **Crea con IA una web rápida que tú controles y publícala sin mensualidad de hosting, dentro de los límites del plan gratuito.**

Para el segmento WordPress, la promesa específica es:

> **Reconstruye una página importante de tu WordPress en una web estática y publícala en paralelo, sin apagar tu sitio actual.**

Para educadores y creadores:

> **Convierte una idea, recurso o proceso en tu primera web interactiva con IA y publícala.**

### Cómo debe organizarse la captación

Se deben crear dos anuncios y dos aperturas de VSL:

- **Independencia:** renovación de hosting, miedo a plugins y falta de control. La demostración muestra una landing reconstruida y desplegada.
- **Creación:** PDF o proceso pasivo que se convierte en calculadora, test o recurso interactivo. La demostración muestra la herramienta funcionando.

Después de los primeros 60 segundos, ambas VSL pueden converger en la misma demostración del Método Fénix y en el mismo taller. No se debe mezclar todo el dolor en los primeros segundos de una sola pieza.

### Alcance técnico que debe explicarse en la venta

El taller enseña el camino de una web estática: repositorio, build, despliegue, dominio opcional, revisión móvil y actualización por cambios en el código. Eso cubre landings, sitios institucionales, portafolios, documentación, blogs exportados y herramientas que calculan en el navegador.

Quedan fuera del resultado inicial las funciones que requieren servidor o datos persistentes: cuentas de usuario, pagos implementados en código propio, membresías, WooCommerce, LMS, reservas complejas, paneles privados y bases de datos. Esas necesidades forman parte de la ruta avanzada.

GitHub puede ser el repositorio, pero no debe venderse como hosting comercial: su documentación indica que GitHub Pages no está destinado a negocios online, comercio electrónico o SaaS. Netlify permite proyectos comerciales en su plan Free, aunque aplica límites mensuales. Render ofrece sitios estáticos sin costo, con límites de uso. Cloudflare Pages también aplica cuotas. La clase debe mostrar una tabla de decisión y enseñar al alumno a comprobar los términos vigentes.

### Currículo corregido del taller de entrada

1. **Elegir una página:** qué se puede reconstruir o crear en una arquitectura estática.
2. **Definir el resultado:** usuario, problema, contenido, acción y datos que no se deben exponer.
3. **Construir con IA:** prompt inicial, iteración, revisión y corrección de errores.
4. **Comprobar móvil:** texto, botones, imágenes y flujo principal.
5. **Publicar:** repositorio, build, plataforma, URL y dominio opcional.
6. **Decidir el siguiente nivel:** mantener la versión paralela, reconstruir más páginas o pasar a una arquitectura dinámica.

El éxito de la primera cohorte no se mide por cuántos alumnos dicen que les gustó la IA, sino por cuántos publican una página y entienden qué parte de su negocio puede vivir en una arquitectura estática.

### Fuentes de plataforma revisadas

- GitHub Pages: límites y usos no permitidos para negocios: <https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits>
- Netlify: plan Free, créditos y límites vigentes: <https://www.netlify.com/pricing/>
- Render: sitios estáticos gratuitos y límites de uso: <https://render.com/docs/static-sites>
- Cloudflare Pages: límites del plan Free: <https://developers.cloudflare.com/pages/platform/limits/>

## Siguiente fase recomendada: arquitectura de oferta y sistema visual de conversión

La landing actual es un prototipo sólido de estructura, pero todavía no es la versión final de ventas. La próxima fase debe convertir la promesa en una oferta visible, concreta y fácil de comparar.

### 1. Resolver la diferencia entre hosting y dominio

La comunicación correcta debe distinguir tres situaciones:

- **Hosting:** puede ser $0 en una plataforma gratuita, mientras el proyecto respete sus límites y condiciones.
- **Subdominio:** el proveedor puede entregar una URL gratuita como `proyecto.pages.dev`, `sitio.netlify.app` o `proyecto.onrender.com`.
- **Dominio propio:** `tumarca.com` se registra por separado y normalmente tiene un costo anual. No debe prometerse como gratuito salvo que exista una promoción concreta y vigente.

Copy recomendado:

> Publica tu primera web sin mensualidad de hosting. Empieza con una URL gratuita o conecta tu dominio propio cuando estés listo.

La página debe mostrar estas opciones en una comparación simple, sin presentar cuatro proveedores como si fueran equivalentes:

| Opción | Uso en el taller | URL inicial | Nota comercial |
|---|---|---|---|
| Cloudflare Pages | Sitios estáticos y frontend | `pages.dev` | Revisar límites del plan vigente. |
| Netlify | Sitios estáticos y despliegues Git | `netlify.app` | Plan Free con créditos mensuales. |
| Render Static Site | Frontends estáticos | `onrender.com` | Uso mensual y dominios según el plan. |
| Vercel | Frontend y previews | `vercel.app` | Hobby sujeto a uso personal o no comercial. |
| GitHub Pages | Documentación, portafolios y proyectos compatibles | `github.io` | No venderlo como hosting de un negocio online. |

### 2. Construir el paquete de valor

Antes de diseñar más secciones, hay que cerrar estos datos reales:

- Fecha, hora, zona horaria y duración.
- Modalidad: en vivo, grabado o híbrido.
- Acceso a grabación y plazo de disponibilidad.
- Canal de soporte y horario de respuesta.
- Resultado exacto de la sesión.
- Requisitos previos.
- Política de reembolso.
- Cupos, solo si existe una limitación operativa real.

El bloque de oferta debe presentar el taller y tres bonos útiles:

1. **Bono Proyecto Base:** una estructura preparada para comenzar.
2. **Bono Biblioteca de Prompts:** instrucciones organizadas por objetivo.
3. **Bono Checklist de Publicación:** revisión de móvil, repositorio, build, URL y dominio.

Los bonos deben ayudar a completar el resultado central. No conviene añadir PDFs decorativos o materiales que aumenten la percepción de volumen sin aumentar la probabilidad de publicación.

### 3. Crear el sistema de imágenes

La página necesita una secuencia visual que demuestre el cambio:

- Captura real de una página antigua o un panel complicado, siempre anonimizada.
- Diagrama simple “WordPress actual → página paralela → despliegue”.
- GIF o video corto de la IA generando una primera versión.
- Captura de la vista móvil antes y después.
- Captura del repositorio y de la URL publicada.
- Mockup de los tres bonos.
- Fotografía real del mentor en su entorno de trabajo.
- Testimonios con captura del resultado, URL o evidencia verificable.

La imagen principal no debe ser una ilustración genérica de tecnología. La evidencia de una página real publicada vende mejor el mecanismo que un fondo futurista.

### 4. Orden final de la landing

1. Promesa principal y video.
2. CTA diferido.
3. Barra de plataformas: Cloudflare Pages, Netlify, Render, Vercel y GitHub, descritas como opciones del taller.
4. Dos rutas: “Tengo WordPress” y “Quiero crear desde cero”.
5. Demostración antes/después.
6. Qué incluye el taller.
7. Bonos.
8. Agenda de la sesión.
9. Para quién es y para quién no es.
10. Mentor y prueba.
11. Precio, garantía y condiciones.
12. FAQ sobre dominio, hosting, WordPress, límites y soporte.
13. CTA final.

### 5. Fases que siguen

**Fase 3 — Arquitectura de oferta y sistema visual.** Cerrar los datos operativos, escribir el paquete de valor, definir bonos, crear los wireframes y producir las imágenes de evidencia.

**Fase 4 — Producción de VSL y activos.** Grabar las dos aperturas, demostrar una construcción real, capturar el segundo exacto del pitch y conectar el CTA diferido.

**Fase 5 — Landing de conversión.** Implementar las nuevas secciones, comparación de plataformas, oferta, bonos, prueba visual, datos del evento y versión móvil.

**Fase 6 — Checkout y experiencia poscompra.** Confirmación, recordatorios, entrega del proyecto base, soporte, grabación, seguimiento de siete días y solicitud de evidencia.

**Fase 7 — Cohorte fundadora y optimización.** Ejecutar con un grupo pequeño, medir publicación real, corregir objeciones y recién después probar tráfico pagado.
