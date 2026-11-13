import { 
  Wallet, 
  Monitor, 
  Layers3, 
  Sparkles, 
  TrendingUp, 
  AlertTriangle, 
  Clock, 
  ShieldX, 
  DollarSign,
  type LucideIcon
} from 'lucide-react';

import imgShowcaseConsultor from '../assets/showcase_consultor.jpg';
import imgShowcaseCalculadora from '../assets/showcase_calculadora.jpg';
import imgShowcaseEvento from '../assets/showcase_evento.jpg';

import imgBonoMapa from '../assets/bono_mapa_blueprint.jpg';
import imgBonoPrompts from '../assets/bono_prompts_deck.jpg';
import imgBonoChecklist from '../assets/bono_checklist_mockup.jpg';

import imgVslWebCero from '../assets/hero_vsl_webcero.jpg';
import imgVslByCoding from '../assets/hero_vsl_bycoding.jpg';
import imgVslAgencia from '../assets/hero_vsl_agencia.jpg';

export type VariantId = 'independencia' | 'creadores' | 'agencia';

export interface ShowcaseProject {
  id: string;
  tag: string;
  title: string;
  description: string;
  time: string;
  promptSnippet: string;
  stack: string;
  img: string;
  url: string;
  stats: Array<{ label: string; value: string }>;
}

export interface BonusItem {
  num: string;
  badge: string;
  title: string;
  desc: string;
  img: string;
  features: string[];
}

export interface VariantData {
  id: VariantId;
  path: string;
  aliases: string[];
  name: string;
  badgeTag: string;
  targetAudience: string;
  adHook: string;
  
  // Hero Section
  vslPoster: string;
  heroTheme: {
    accentColor: string;
    glowFrom: string;
    glowTo: string;
    badgeStyle: string;
  };
  preHeadline: string;
  headlineMain: string;
  headlineHighlight: string;
  subheadline: string;
  vslUrlBadge: string;
  ctaText: string;
  ctaSubtext: string;

  // Pain Points (PAS Framework)
  painBadge: string;
  painTitle: string;
  painSubtitle: string;
  pains: Array<{
    icon: LucideIcon;
    title: string;
    text: string;
    highlight?: string;
  }>;

  // Showcase Projects Específicos por Avatar
  showcaseTitle: string;
  showcaseSubtitle: string;
  showcaseProjects: ShowcaseProject[];

  // Offer Angle Specifics
  offerTitle: string;
  offerSubtitle: string;
  priceComparisonContext: string;

  // Bonos Específicos por Avatar
  bonuses: BonusItem[];

  // Audience Filter Específico
  whoIsItFor: string[];
  whoIsNotFor: string[];

  // Preguntas Frecuentes (FAQ) Específicas por Avatar
  faqTitle: string;
  faqSubtitle: string;
  faqs: Array<[string, string]>;

  // Meta Ads Campaign Concept
  adStrategy: {
    campaignAngle: string;
    suggestedHookScript: string;
    targetInterests: string[];
  };
}

export const VARIANTS: Record<VariantId, VariantData> = {
  // ─────────────────────────────────────────────────────────────
  // OFERTA GANADORA 1: EL DOLOR DEL HOSTING Y LA RUPTURA CON WORDPRESS
  // ─────────────────────────────────────────────────────────────
  independencia: {
    id: 'independencia',
    path: '/webcero',
    aliases: ['/webcero', '/independencia', '/cero'],
    name: 'Oferta A: Independencia & Costo Cero ($0 Hosting)',
    badgeTag: 'Ángulo Anti-Alquiler Digital & WordPress',
    targetAudience: 'Dueños de negocios, freelancers y usuarios cansados de pagar renovaciones anuales de hosting y plugins rotos.',
    adHook: '¿Pagando $120–$300 al año de hosting por una web lenta que casi no tocas? Te revelo el secreto de las empresas tech para tener hosting perpetuo a $0.',

    preHeadline: 'Para dueños de negocios y profesionales hartos del alquiler digital',
    vslPoster: imgVslWebCero,
    heroTheme: {
      accentColor: 'text-emerald-400',
      glowFrom: 'bg-emerald-500/25',
      glowTo: 'bg-cyan-500/30',
      badgeStyle: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
    },
    headlineMain: 'Deja de pagar hosting por una web que casi no tocas.',
    headlineHighlight: 'Publica con IA a $0 de por vida.',
    subheadline: 'Aprende a dialogar con IA para crear una web ultrarrápida (0.3s) alojada gratis en Cloudflare Pages, sin agencias ni WordPress.',
    vslUrlBadge: 'fenix-ia.com/metodo-independencia',
    ctaText: 'Asegurar mi plaza · Ahorrar hosting de por vida',
    ctaSubtext: 'Garantía incondicional de 7 días · $19 USD pago único · $0/mes en servidores',

    painBadge: 'El Secuestro Digital que la Industria No Quiere que Sepas',
    painTitle: 'El ciclo tóxico del desarrollo web tradicional',
    painSubtitle: 'Por qué tener una página web se convirtió en una renta mensual interminable y una fuente de estrés constante.',
    pains: [
      {
        icon: Wallet,
        title: 'La factura sorpresa de renovación cada 12 meses.',
        text: 'Compraste un hosting por $20 USD el primer año y ahora te cobran $120 o $250 USD por renovar. Es un secuestro digital donde si no pagas, tu negocio desaparece de internet.',
        highlight: 'Cobros abusivos automáticos'
      },
      {
        icon: AlertTriangle,
        title: 'La pesadilla de la "pantalla blanca" de WordPress.',
        text: 'Un plugin se actualizó de noche y tu página amaneció rota. Para arreglarlo necesitas a un programador que te cobra $50 USD la hora o quedarte sin ventas todo el fin de semana.',
        highlight: 'Vulnerabilidad y fragilidad técnica'
      },
      {
        icon: Clock,
        title: 'Presupuestos de agencias entre $500 y $2,500 USD.',
        text: 'Pedir el cambio de un texto o número de teléfono te toma días de llamadas y presupuestos ridículos. Estás atrapado en una relación de dependencia donde nunca tienes el control.',
        highlight: 'Pérdida total de autonomía'
      }
    ],

    // Vitrina Adaptada a Negocios / Migración de WordPress
    showcaseTitle: 'Páginas corporativas migradas a $0/mes',
    showcaseSubtitle: 'Empresas y profesionales que dijeron adiós al hosting compartido y a la lentitud de WordPress.',
    showcaseProjects: [
      {
        id: 'corporativo',
        tag: 'Migración Web Corporativa (Antes WordPress)',
        title: 'Estudio Jurídico & Contable Valenzuela',
        description: 'Página corporativa antes montada en WordPress pagando $210 USD al año en alojamiento. Migrada a Cloudflare Pages con carga de 0.3s y $0 de costo mensual.',
        time: '25 min de migración con IA',
        promptSnippet: '“Reestructura el contenido de esta web de servicios legales en una landing moderna en HTML5 + Tailwind, con sección de abogados, testimonios y botón de cita directa a WhatsApp.”',
        stack: 'HTML5 + Tailwind CSS + Cloudflare Pages ($0)',
        img: imgShowcaseConsultor,
        url: 'valenzuelalegal.com',
        stats: [
          { label: 'Ahorro en Hosting', value: '$210/año' },
          { label: 'Velocidad de Carga', value: '0.3 seg' },
          { label: 'Caídas de Servidor', value: '0%' }
        ]
      },
      {
        id: 'catalogo',
        tag: 'Catálogo de Servicios sin cPanel',
        title: 'Arquitectura & Reformas Integrales',
        description: 'Web moderna de presentación con galería fotográfica de obras y botón de presupuesto inmediato, sin bases de datos vulnerables que requieran mantenimiento.',
        time: '30 min con IA',
        promptSnippet: '“Genera una web para estudio de arquitectura con portafolio visual de proyectos, formulario ligero y optimización absoluta para que cargue en 1 segundo en celulares.”',
        stack: 'React + Vite + Tailwind + Cloudflare',
        img: imgShowcaseCalculadora,
        url: 'reformas-integrales.com',
        stats: [
          { label: 'Mantenimiento Mensual', value: '$0 USD' },
          { label: 'Vulnerabilidades', value: '0 detectadas' },
          { label: 'Puntaje Móvil', value: '100/100' }
        ]
      },
      {
        id: 'marca-personal',
        tag: 'Landing de Marca Personal con Dominio .com',
        title: 'Consultoría Financiera & Patrimonial',
        description: 'Dominio propio .com conectado en minutos a la red Edge de Cloudflare con certificado de seguridad SSL grado bancario incluido para siempre.',
        time: '15 min con IA',
        promptSnippet: '“Crea una landing de alta autoridad para consultor financiero, destacando casos de éxito, metodología de trabajo y formulario de calificación de prospectos.”',
        stack: 'HTML5 + Tailwind + Cloudflare Edge',
        img: imgShowcaseEvento,
        url: 'consultorfinanciero.com',
        stats: [
          { label: 'Dominio Propio', value: 'Conectado gratis' },
          { label: 'Certificado SSL', value: 'Automático HTTPS' },
          { label: 'Costo Operativo', value: '$0/mes de por vida' }
        ]
      }
    ],

    offerTitle: 'Tu ruta definitiva hacia la independencia tecnológica',
    offerSubtitle: 'En solo 105 minutos migras tu presencia a una arquitectura moderna sin servidores que mantener y con costo operativo de cero dólares para siempre.',
    priceComparisonContext: 'Ahorras entre $150 y $350 USD al año en hosting, mantenimiento y licencias de plugins.',

    // Bonos Específicos para Independencia / WordPress
    bonuses: [
      {
        num: '01',
        badge: 'Bono 1 · Valor $27 USD',
        title: 'Blueprint de Migración a Costo Cero',
        desc: 'El plano exacto para trasladar el contenido de tu web lenta a una arquitectura estática moderna sin tocar código ni romper nada.',
        img: imgBonoMapa,
        features: ['Guía paso a paso de reemplazo de WordPress', 'Estructura ligera de 5 bloques', 'Cero caída de servicio durante la transición']
      },
      {
        num: '02',
        badge: 'Bono 2 · Valor $47 USD',
        title: 'Prompts de IA para Rediseño sin Agencias',
        desc: 'Comandos específicos en español para pedirle a la IA que modernice tus textos, reorganice tus servicios y cree layouts de nivel profesional.',
        img: imgBonoPrompts,
        features: ['+40 prompts de transformación de contenidos', 'Comandos para corrección visual en tiempo real', 'Adaptación de textos corporativos que venden']
      },
      {
        num: '03',
        badge: 'Bono 3 · Valor $19 USD',
        title: 'Guía de Dominio Propio & Correos a $0',
        desc: 'Aprende a conectar tu dominio (.com, .es, etc.) a Cloudflare y mantén tus correos corporativos funcionando sin pagar hosting.',
        img: imgBonoChecklist,
        features: ['Conexión de DNS en menos de 3 minutos', 'Configuración de correo corporativo gratuito', 'Verificación de candado verde SSL automático']
      }
    ],

    whoIsItFor: [
      'Personas con sitios en WordPress o Wix cansadas de pagar mensualidades o renovaciones anuales abusivas.',
      'Emprendedores y profesionales que quieren tener el control absoluto de su activo digital sin intermediarios.',
      'Cualquiera que quiera una web ultrarrápida que cargue en menos de 1 segundo en teléfonos móviles.'
    ],
    whoIsNotFor: [
      'Proyectos que requieran bases de datos relacionales gigantes o foros masivos de usuarios en PHP.',
      'Personas que buscan que otra persona les haga todo el trabajo sin dedicar 105 minutos a aprender.',
      'Quienes prefieren seguir pagando cuotas mensuales a agencias por comodidad.'
    ],

    // FAQ Específica para Dueños de Negocio y Salir de WordPress
    faqTitle: 'Preguntas Frecuentes sobre Hosting y WordPress',
    faqSubtitle: 'Despejamos tus dudas sobre dominios, correos corporativos y la migración a costo cero.',
    faqs: [
      [
        '¿Qué pasa con mi web actual en WordPress si hago este taller? ¿Tengo que borrarla?',
        'Absolutamente no. El método te enseña a construir tu nueva web moderna en paralelo, sin tocar ni apagar tu sitio actual. Solo cuando veas tu nueva página publicada, rápida y hermosa, decides si apagas el hosting viejo para dejar de pagar renovaciones.'
      ],
      [
        '¿Qué ocurre con mis correos corporativos (ej. contacto@minegocio.com) si dejo de pagar el hosting?',
        'En el taller te explicamos cómo mantener tus correos corporativos activos sin pagar un plan de hosting costoso. Puedes usar el enrutamiento gratuito de Cloudflare Email Routing o mantener tu proveedor de correo habitual sin pagar por un servidor web entero solo para recibir emails.'
      ],
      [
        '¿Cómo conecto mi dominio propio (.com, .net, .pe) si el hosting es en Cloudflare?',
        'Es muy sencillo. En el taller te mostramos paso a paso cómo vincular cualquier dominio que ya tengas comprado (en GoDaddy, Namecheap, DonDominio, etc.) con Cloudflare en menos de 3 minutos, manteniendo el control total de tu nombre de marca.'
      ],
      [
        '¿De verdad Cloudflare no me cobrará nada el próximo año? ¿Dónde está el truco?',
        'Cero trucos. Cloudflare es una compañía de infraestructura que cotiza en Wall Street y protege el 20% de internet. Ofrecen su servicio de páginas estáticas con tráfico ilimitado a $0 porque para ellos servir código estático cuesta fracciones de centavo. Es el estándar que usan las mayores empresas de tecnología del mundo.'
      ],
      [
        '¿Puedo actualizar los textos y teléfonos de mi web yo mismo sin depender de nadie?',
        'Sí. Ese es el corazón del método. Aprenderás a pedirle a la IA cualquier cambio o actualización en lenguaje natural y publicarlo en 60 segundos, sin tener que esperar días ni pagarle $50 a un técnico.'
      ],
      [
        '¿Qué pasa si en el futuro necesito una tienda online compleja con cientos de productos?',
        'El taller está enfocado en páginas de servicios, consultoría, captación de prospectos y marcas personales, que representan el 90% de las necesidades comerciales. Si en el futuro necesitas un comercio electrónico masivo tipo Amazon, te orientamos en la ruta adecuada sin engaños.'
      ]
    ],

    adStrategy: {
      campaignAngle: 'Anti-Hosting / Escape del Alquiler Digital',
      suggestedHookScript: '¿Sabías que las grandes empresas tecnológicas ya no pagan hosting tradicional para sus páginas web? Usan servidores estáticos globales que son 100% gratuitos y jamás se caen. En este video te muestro cómo tú puedes hacer exactamente lo mismo hoy con IA.',
      targetInterests: ['WordPress', 'Web hosting', 'Elementor', 'GoDaddy', 'HostGator', 'Pequeñas empresas']
    }
  },

  // ─────────────────────────────────────────────────────────────
  // OFERTA GANADORA 2: CREADORES, CONSULTORES Y LANZAMIENTO EXPRESS CON IA (VIBE CODING)
  // ─────────────────────────────────────────────────────────────
  creadores: {
    id: 'creadores',
    path: '/bycoding',
    aliases: ['/bycoding', '/vibecoding', '/creadores', '/vibe'],
    name: 'Fénix: Entrenamiento de Vibe Coding con IA · US$9',
    badgeTag: 'Ángulo Vibe Coding & Activos Interactivos',
    targetAudience: 'Educadores, consultores, terapeutas, formadores y creadores de infoproductos que necesitan una landing o herramienta interactiva YA.',
    adHook: '¿Tienes una idea de curso, consultoría o servicio parada por no tener web? Mira cómo construir y publicar una landing profesional interactiva con IA en 105 minutos.',

    preHeadline: 'Entrenamiento práctico para emprendedores y creadores',
    vslPoster: imgVslByCoding,
    heroTheme: {
      accentColor: 'text-brand-fuchsia',
      glowFrom: 'bg-brand-fuchsia/25',
      glowTo: 'bg-brand-purple/35',
      badgeStyle: 'border-brand-purple/40 bg-brand-purple/20 text-brand-light'
    },
    headlineMain: 'Aprende a crear y publicar una herramienta web con IA.',
    headlineHighlight: 'Un proyecto práctico, paso a paso.',
    subheadline: 'En una sesión de 105 minutos verás cómo planificar, construir, probar y publicar una pequeña aplicación web con inteligencia artificial. No necesitas dominar código para empezar.',
    vslUrlBadge: 'fenix.cabellosalirrosas.com/bycoding',
    ctaText: 'Quiero mi entrenamiento · US$9',
    ctaSubtext: 'Entrenamiento US$9 · Pago en soles para Perú una vez habilitado',

    painBadge: 'La Parálisis por Análisis que Mata tus Lanzamientos',
    painTitle: 'Por qué tus mejores ideas se quedan en un cuaderno',
    painSubtitle: 'La barrera técnica te roba tiempo y te impide validar tus servicios frente al mercado.',
    pains: [
      {
        icon: Monitor,
        title: 'Tu idea de servicio o curso lleva meses esperando una web.',
        text: 'Sabes exactamente lo que quieres enseñar o vender, pero la idea de pelear con código, plantillas complicadas o diseñadores te frena cada semana.',
        highlight: 'Parálisis técnica y retraso comercial'
      },
      {
        icon: Layers3,
        title: 'Páginas genéricas que no transmiten tu verdadera autoridad.',
        text: 'Las plantillas prefabricadas de constructores visuales se ven todas iguales, cargan lento y no permiten crear elementos dinámicos que enamoren a tus prospectos.',
        highlight: 'Baja percepción de valor'
      },
      {
        icon: Sparkles,
        title: 'El mito de que necesitas meses para aprender a programar.',
        text: 'Con IA puedes avanzar más rápido, pero también necesitas revisar el resultado, entender errores y probar la aplicación antes de publicarla.',
        highlight: 'La revolución de los creadores con IA'
      }
    ],

    // Vitrina Adaptada a Creadores / Herramientas Interactivas
    showcaseTitle: 'Tres ideas de proyectos que puedes construir con IA',
    showcaseSubtitle: 'Vistas conceptuales para ilustrar ejercicios. Los proyectos reales del instructor se añadirán con enlaces verificables.',
    showcaseProjects: [
      {
        id: 'calculadora',
        tag: 'Ejemplo 1 · Herramienta interactiva',
        title: 'Calculadora de presupuesto',
        description: 'Concepto educativo: introduce valores, calcula un resultado y aprende a comprobar si la lógica funciona. La imagen es ilustrativa.',
        time: 'Ejercicio guiado',
        promptSnippet: '“Diseña una calculadora interactiva con campos claros, validación de datos y resultados explicados para el usuario.”',
        stack: 'React + TypeScript · Ejemplo',
        img: imgShowcaseCalculadora,
        url: 'ejemplo-conceptual',
        stats: [
          { label: 'Tipo', value: 'Simulador' },
          { label: 'Objetivo', value: 'Interactividad' },
          { label: 'Estado', value: 'Ejemplo' }
        ]
      },
      {
        id: 'evento',
        tag: 'Ejemplo 2 · Página de captación',
        title: 'Registro a una clase',
        description: 'Concepto educativo: formulario, validación de datos y una interfaz clara. Integrar correo o base de datos requiere pasos adicionales.',
        time: 'Ejercicio guiado',
        promptSnippet: '“Crea una landing para una clase práctica con formulario de inscripción, estados de validación y diseño adaptable a celulares.”',
        stack: 'HTML + CSS + IA · Ejemplo',
        img: imgShowcaseEvento,
        url: 'ejemplo-conceptual',
        stats: [
          { label: 'Tipo', value: 'Landing' },
          { label: 'Objetivo', value: 'Formularios' },
          { label: 'Estado', value: 'Ejemplo' }
        ]
      },
      {
        id: 'consultoria',
        tag: 'Ejemplo 3 · Página profesional',
        title: 'Página para un servicio',
        description: 'Concepto educativo: sección de servicios, testimonios solo cuando sean reales y botón de contacto. Imagen referencial.',
        time: 'Ejercicio guiado',
        promptSnippet: '“Diseña una página de presentación profesional con secciones claras, diseño móvil y enlace de contacto a WhatsApp.”',
        stack: 'HTML + Tailwind · Ejemplo',
        img: imgShowcaseConsultor,
        url: 'ejemplo-conceptual',
        stats: [
          { label: 'Tipo', value: 'Web' },
          { label: 'Objetivo', value: 'Presentación' },
          { label: 'Estado', value: 'Ejemplo' }
        ]
      }
    ],

    offerTitle: 'Tu punto de partida para desarrollar con IA',
    offerSubtitle: 'Entrenamiento guiado de 105 minutos: un proyecto introductorio, pruebas de funcionamiento y publicación según los requisitos de cada plataforma.',
    priceComparisonContext: 'Precio de lanzamiento US$9. Para compradores en Perú, el importe exacto en soles aparecerá antes de pagar.',

    // Bonos Específicos para Creadores / Vibe Coding
    bonuses: [
      {
        num: '01',
        badge: 'Bono 1 · Valor $27 USD',
        title: 'Mapa de tu Primera Web (Blueprint)',
        desc: 'Define usuario, problema, contenido y llamada a la acción antes de abrir cualquier IA. El plano visual exacto para no dudar.',
        img: imgBonoMapa,
        features: ['Estructura de 5 bloques de alta conversión', 'Formato imprimible y digital para planificar', 'Ahorra semanas de prueba y error']
      },
      {
        num: '02',
        badge: 'Bono 2 · Valor $47 USD',
        title: 'Biblioteca de Prompts Probados de Vibe Coding',
        desc: 'Comandos exactos en español para generar copys que venden, calculadoras interactivas y componentes de alta retención.',
        img: imgBonoPrompts,
        features: ['+40 prompts catalogados por sección', 'Instrucciones para titulares, ofertas y FAQ', 'Comandos para interactividad y sliders']
      },
      {
        num: '03',
        badge: 'Bono 3 · Valor $19 USD',
        title: 'Checklist de Publicación en la Nube',
        desc: 'Revisa diseño móvil, dominio propio, velocidad y límites de uso antes de compartir tu enlace con el mundo.',
        img: imgBonoChecklist,
        features: ['Matriz de verificación técnica pre-lanzamiento', 'Configuración de HTTPS y subdominio gratuito', 'Pruebas prácticas con herramientas de rendimiento']
      }
    ],

    whoIsItFor: [
      'Educadores, consultores, coaches y formadores que venden su conocimiento o servicios profesionales.',
      'Creadores de contenido que quieren enlaces interactivos propios y calculadoras para sus seguidores.',
      'Emprendedores que buscan validar productos mínimos viables en tiempo récord.'
    ],
    whoIsNotFor: [
      'Personas sin ninguna idea o servicio que quieran comercializar.',
      'Desarrolladores avanzados de software buscando cursos de arquitectura de bases de datos.',
      'Quienes no estén dispuestos a seguir un método paso a paso durante 105 minutos.'
    ],

    // FAQ Específica para Creadores y Educadores con IA
    faqTitle: 'Preguntas Frecuentes sobre Creación con IA',
    faqSubtitle: 'Todo lo que necesitas saber para publicar tu primera herramienta interactiva sin saber programar.',
    faqs: [
      [
        'No sé programar ni una sola línea de código, ¿de verdad podré crear calculadoras o elementos interactivos?',
        'Sí, rotundamente. El paradigma del "Vibe Coding" consiste en que tú eres el director creativo y especificas qué debe hacer la herramienta en español cotidiano; la IA se encarga de escribir todo el código y la lógica matemática.'
      ],
      [
        '¿Qué herramientas de IA necesito para el taller? ¿Tengo que pagar suscripciones de ChatGPT Plus o Claude Pro?',
        'Puedes seguir todo el taller utilizando las versiones gratuitas de los asistentes de IA más potentes del mercado (ChatGPT gratis o Claude gratis). No requieres pagar membresías mensuales caras para tener tu web lista.'
      ],
      [
        '¿Puedo integrar la página con mi WhatsApp, Hotmart o botones de pago?',
        'Totalmente. Aprenderás a vincular botones que lleven directamente a tus checkouts de Hotmart, pasarelas de pago como Stripe o MercadoPago, o abrir conversaciones directas de WhatsApp con un mensaje pre-llenado listo para cerrar ventas.'
      ],
      [
        '¿Cómo logro que la página no se vea como una plantilla genérica y aburrida?',
        'Te entregamos un sistema de diseño probado que incluye paletas de color prémium, tipografías modernas de alto impacto y espacios cuidados. El resultado visual compite de igual a igual con páginas diseñadas por agencias de miles de dólares.'
      ],
      [
        '¿Puedo capturar correos para enviar a mi plataforma de email marketing?',
        'Sí. Aprenderás a integrar formularios limpios de un solo paso que guardan la información directamente en Google Sheets o se conectan a tu proveedor de correo sin pagar herramientas adicionales.'
      ],
      [
        '¿Cuánto tiempo me tomará tener mi página en vivo después de asistir al taller?',
        'El taller está diseñado para que termines los 105 minutos con tu enlace público ya funcionando y listo para ser compartido en tus redes sociales o enviado a tus prospectos.'
      ]
    ],

    adStrategy: {
      campaignAngle: 'Lanzamiento Rápido con IA / Vibe Coding',
      suggestedHookScript: 'Si tienes un curso, una asesoría o un servicio profesional y aún no tienes web porque te parece difícil o caro, mira esto: Esta calculadora interactiva y esta landing las construí en 20 minutos hablando en español con una IA. Te enseño cómo hacerlo en vivo.',
      targetInterests: ['Educación en línea', 'Coaching', 'Infoproductos', 'Hotmart', 'Consultoría de negocios']
    }
  },

  // ─────────────────────────────────────────────────────────────
  // OFERTA GANADORA 3: HABILIDAD MONETIZABLE / MICRO-AGENCIA 48H (MODELO PAULO ANDERSON BRASIL)
  // ─────────────────────────────────────────────────────────────
  agencia: {
    id: 'agencia',
    path: '/agencia',
    aliases: ['/agencia', '/microagencia', '/servicios'],
    name: 'Oferta C: Micro-Agencia en 48 Horas (Habilidad Monetizable)',
    badgeTag: 'Ángulo Emprendimiento & Servicios Web Rentables',
    targetAudience: 'Freelancers, estudiantes, autodidactas y personas que buscan generar ingresos extra vendiendo páginas web a negocios locales con 100% margen neto.',
    adHook: 'El negocio más rentable y ligero de 2026: cómo cobrar $150–$350 USD por crear webs a negocios locales en 48 horas usando IA, sin pagar licencias ni servidores.',

    preHeadline: 'Para freelancers y autodidactas que buscan un servicio rentable',
    vslPoster: imgVslAgencia,
    heroTheme: {
      accentColor: 'text-amber-400',
      glowFrom: 'bg-amber-500/25',
      glowTo: 'bg-blue-600/30',
      badgeStyle: 'border-amber-500/40 bg-amber-500/10 text-amber-300'
    },
    headlineMain: 'Crea y vende sitios web a clientes en 48 horas.',
    headlineHighlight: 'Con $0 en servidores y 100% margen neto.',
    subheadline: 'Domina la habilidad de entregar webs ultrarrápidas con IA a comercios y clínicas locales. Cobra entre $150 y $350 USD por proyecto sin pagar licencias ni hosting.',
    vslUrlBadge: 'fenix-ia.com/micro-agencia-express',
    ctaText: 'Asegurar mi plaza · Dominar la habilidad de Micro-Agencia',
    ctaSubtext: 'Garantía incondicional de 7 días · $19 USD · Recuperas tu inversión con tu primer cliente',

    painBadge: 'El Negocio de Servicios Tradicional Está Roto',
    painTitle: 'Por qué hacer webs tradicionales para clientes ya no es rentable',
    painSubtitle: 'El modelo antiguo de WordPress te consume en soporte técnico gratuito y márgenes miserables.',
    pains: [
      {
        icon: ShieldX,
        title: 'Horas infinitas peleando con Elementor y configuraciones de hosting.',
        text: 'Pasas 20 horas configurando plugins y servidores para entregar una web básica, y terminas ganando menos por hora que en un empleo tradicional.',
        highlight: 'Poco margen de ganancia por hora'
      },
      {
        icon: DollarSign,
        title: 'Pagar licencias caras y cobrar poco a clientes locales.',
        text: 'Si tienes que pagar licencias anuales de constructores visuales y hosting para cada cliente, tu margen se desvanece antes de empezar.',
        highlight: 'Costos fijos que devoran tus ingresos'
      },
      {
        icon: TrendingUp,
        title: 'Los clientes locales quieren resultados inmediatos, no semanas de espera.',
        text: 'Un odontólogo o restaurante no quiere un desarrollo de 2 meses. Quiere su web lista en 48 horas para promocionar su negocio en WhatsApp y redes sociales.',
        highlight: 'Demanda insatisfecha de velocidad extrema'
      }
    ],

    // Vitrina Adaptada a Micro-Agencia / Ventas a Clientes
    showcaseTitle: 'Páginas vendidas a clientes con 100% margen limpio',
    showcaseSubtitle: 'Ejemplos de proyectos reales que se cotizan entre $150 y $400 USD y se entregan en menos de 48 horas.',
    showcaseProjects: [
      {
        id: 'restaurante',
        tag: 'Proyecto Vendido por $250 USD a Negocio Local',
        title: 'Bistro Gourmet & Menú Digital QR',
        description: 'Web ultra-rápida con menú visual interactivo, botón de reservas directas por WhatsApp y código QR para mesas. Construida en 2 horas y entregada al día siguiente.',
        time: '2 horas de creación con IA',
        promptSnippet: '“Genera una web moderna para restaurante con catálogo de platillos destacados, botón directo de reservas a WhatsApp y diseño optimizado para escanear en QR móvil.”',
        stack: 'HTML5 + Tailwind + Cloudflare ($0 hosting)',
        img: imgShowcaseConsultor,
        url: 'bistrogourmet.pages.dev',
        stats: [
          { label: 'Precio Cobrado', value: '$250 USD' },
          { label: 'Costo en Servidores', value: '$0 USD' },
          { label: 'Margen de Ganancia', value: '100% neto' }
        ]
      },
      {
        id: 'clinica',
        tag: 'Proyecto Vendido por $350 USD',
        title: 'Clínica Dental Especializada & Citas',
        description: 'Página de alta confianza con perfiles médicos, antes y después de tratamientos y formulario directo para agendar valoraciones odontológicas.',
        time: '3 horas de trabajo con IA',
        promptSnippet: '“Diseña una web de confianza médica para clínica odontológica con presentación de especialistas, sección de tratamientos frecuentes y botón flotante de WhatsApp.”',
        stack: 'React + Vite + Tailwind + Vercel',
        img: imgShowcaseCalculadora,
        url: 'clinicadentalexpert.com',
        stats: [
          { label: 'Precio Cobrado', value: '$350 USD' },
          { label: 'Tiempo de Entrega', value: '48 horas' },
          { label: 'Soporte Requerido', value: 'Cero problemas' }
        ]
      },
      {
        id: 'gimnasio',
        tag: 'Proyecto Vendido por $180 USD en 1 Tarde',
        title: 'Centro de Entrenamiento & Membresías',
        description: 'Landing de captación para promociones del mes y venta de pases de entrenamiento. El dueño del gimnasio empezó a recibir consultas esa misma noche.',
        time: '1 hora y media con IA',
        promptSnippet: '“Crea una landing de alta energía para gimnasio con tabla de planes mensuales, testimonios con fotos y botón de reclamo de clase gratis por WhatsApp.”',
        stack: 'HTML5 + Tailwind + Cloudflare Pages',
        img: imgShowcaseEvento,
        url: 'fitnessclubpro.pages.dev',
        stats: [
          { label: 'Precio Cobrado', value: '$180 USD' },
          { label: 'Tiempo Invertido', value: '90 minutos' },
          { label: 'Margen Limpio', value: '100% ganancia' }
        ]
      }
    ],

    offerTitle: 'Tu catálogo de servicios web de alta velocidad',
    offerSubtitle: 'Aprende la metodología completa para cotizar, crear con IA y entregar webs publicadas en Cloudflare sin costos operativos, dejando el 100% del pago en tu bolsillo.',
    priceComparisonContext: 'Con solo 1 cliente al que le cobres $150 USD habrás multiplicado por 8 tu inversión en este taller.',

    // Bonos Específicos para Micro-Agencia / Monetización
    bonuses: [
      {
        num: '01',
        badge: 'Bono 1 · Valor $47 USD',
        title: 'Plantilla de Propuesta & Contrato Comercial',
        desc: 'El documento exacto para presentar a dueños de negocios locales y cerrar el 50% de anticipo sin objeciones de precio.',
        img: imgBonoMapa,
        features: ['Propuesta de valor en 1 página para clientes', 'Cláusulas de entrega en 48 horas sin enredos', 'Estructura de cobro de anticipo']
      },
      {
        num: '02',
        badge: 'Bono 2 · Valor $47 USD',
        title: 'Guión de Prospección por WhatsApp y Maps',
        desc: 'Cómo encontrar negocios en tu ciudad que tienen páginas rotas o lentas en Google Maps y enviarles un mensaje que abre conversaciones.',
        img: imgBonoPrompts,
        features: ['Auditoría express de 2 minutos por negocio', 'Guiones probados para mensajes de WhatsApp', 'Estrategia para cerrar tus primeros 3 clientes']
      },
      {
        num: '03',
        badge: 'Bono 3 · Valor $27 USD',
        title: 'Protocolo de Entrega en 1 Clic',
        desc: 'Cómo entregar el enlace y transferir el proyecto al cliente final para que tú no quedes atrapado dándole soporte gratuito eterno.',
        img: imgBonoChecklist,
        features: ['Transferencia limpia sin exponer tu cuenta', 'Vincular el dominio del cliente en 10 min', 'Opciones para cobrar mantenimiento mensual']
      }
    ],

    whoIsItFor: [
      'Personas buscando una habilidad práctica con la que empezar a generar ingresos en internet de inmediato.',
      'Diseñadores y community managers que quieren agregar desarrollo web rápido a su oferta de servicios.',
      'Freelancers cansados de WordPress que buscan un flujo de entrega ágil en menos de 48 horas.'
    ],
    whoIsNotFor: [
      'Personas que buscan fórmulas mágicas para ganar dinero sin sentarse a aprender una habilidad real.',
      'Quienes no tengan interés en contactar negocios locales o prestar servicios a clientes.',
      'Programadores sénior que buscan optimizaciones a bajo nivel en C++ o Rust.'
    ],

    // FAQ Específica para Freelancers y Micro-Agencias
    faqTitle: 'Preguntas Frecuentes sobre el Negocio de Micro-Agencia',
    faqSubtitle: 'Cómo cotizar, conseguir clientes y entregar proyectos con el 100% de margen limpio.',
    faqs: [
      [
        '¿Cómo le entrego la página al cliente para no quedar atrapado dándole soporte técnico gratuito?',
        'En el taller aprenderás el protocolo de entrega en 1 clic: le entregas su enlace activo vinculado a su dominio propio con una lista de verificación de entrega conforme. Como las webs estáticas no usan plugins ni bases de datos, no se rompen solas, eliminando el 95% de los reclamos típicos de WordPress.'
      ],
      [
        '¿Cuánto dinero puedo cobrar realmente por una de estas páginas a un negocio local?',
        'En el mercado hispanohablante, una página informativa profesional o catálogo para un restaurante, clínica, taller o consultorio se cotiza normalmente entre $150 y $350 USD. Como no pagas servidores ni licencias, casi el 100% de lo cobrado es ganancia limpia para ti.'
      ],
      [
        '¿Necesito pagar licencias comerciales de software o cPanel por cada cliente?',
        'No. Esa es la mayor ventaja competitiva frente a las agencias tradicionales. El stack que enseñamos (Cloudflare Pages + Tailwind + IA) tiene costo de hosting de $0 de por vida. No tienes que comprar licencias de constructores ni pagar cuotas mensuales por cliente.'
      ],
      [
        '¿Cómo consigo a mis primeros 3 clientes si nunca antes he vendido desarrollo web?',
        'Recibes el Bono de Prospección Hiperlocal: te enseñamos a buscar en Google Maps comercios de tu zona que tienen webs lentas o desactualizadas, y enviarles una propuesta directa en WhatsApp mostrándoles cómo se vería su web moderna lista en 48 horas.'
      ],
      [
        '¿Qué pasa si el cliente me pide cambios en el diseño después de que ya le entregué la web?',
        'Tienes dos opciones muy lucrativas: o le cobras por hora/actualización puntual ($25–$40 USD por un cambio que con la IA haces en 10 minutos), o le ofreces un plan de mantenimiento y soporte mensual ($20–$35/mes) generando ingresos recurrentes.'
      ],
      [
        '¿Cuánto tiempo me tomará crear y entregar una web completa para un cliente?',
        'Con el método y los prompts que te entregamos, crearás una web completa de 3 a 5 secciones en entre 2 y 4 horas de trabajo enfocado. Esto te permite prometer entrega en 48 horas, una ventaja brutal que las agencias lentas no pueden igualar.'
      ]
    ],

    adStrategy: {
      campaignAngle: 'Micro-Agencia Web con IA / Ingresos Rápidos',
      suggestedHookScript: '¿Sabes cuántos negocios en tu ciudad no tienen página web o tienen una web de hace 10 años que ni carga en celulares? Cientos. Hoy puedes crearles una web profesional en menos de 2 horas con IA y cobrar $200 USD limpios, porque no gastas un solo centavo en hosting. Te enseño cómo.',
      targetInterests: ['Freelancer', 'Marketing digital', 'Emprendimiento', 'Ingresos pasivos', 'Diseño web']
    }
  }
};

export function resolveVariantFromPath(pathname: string, queryParam?: string | null): VariantId {
  if (queryParam && (queryParam in VARIANTS)) {
    return queryParam as VariantId;
  }
  const clean = pathname.toLowerCase().replace(/\/+$/, '') || '/';
  for (const v of Object.values(VARIANTS)) {
    if (v.path === clean || v.aliases.includes(clean)) {
      return v.id;
    }
  }
  return 'creadores';
}
