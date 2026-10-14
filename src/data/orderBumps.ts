export interface OrderBumpItem {
  id: string;
  name: string;
  badge: string;
  price: number;
  originalPrice: number;
  shortDesc: string;
  bullets: string[];
}

export const ORDER_BUMPS: OrderBumpItem[] = [
  {
    id: 'bump-templates',
    name: 'Pack Élite: 5 Plantillas Vibe Coding Listas para Duplicar',
    badge: '★ MÁS POPULAR (Ahorra 80%)',
    price: 9,
    originalPrice: 47,
    shortDesc: 'Archivos base listos para clonar y adaptar en 5 minutos con la IA. No empieces ninguna web desde cero.',
    bullets: [
      'Plantilla 1: Landing de Servicios Profesionales / Consultor de Alta Gama',
      'Plantilla 2: Página de Captación de Leads con Integración Directa a WhatsApp',
      'Plantilla 3: Calculadora Interactiva de Presupuesto en Tiempo Real',
      'Plantilla 4: Catálogo / Menú Comercial para Negocios Locales',
      'Plantilla 5: "Link-in-Bio" Ultra-Rápido sin pagar a Linktree ni Beacons'
    ]
  },
  {
    id: 'bump-payments',
    name: 'Masterclass Express: Pasarelas de Pago LATAM & Cobro Instantáneo',
    badge: 'RECOMENDADO PARA COMERCIOS',
    price: 14,
    originalPrice: 67,
    shortDesc: 'Aprende a integrar botones de cobro en 1 clic para que tus clientes te paguen al instante sin configurar tiendas pesadas.',
    bullets: [
      'Integración con MercadoPago (Checkout Pro y Link de Pago)',
      'Flujo automatizado de comprobantes de Yape y Plin (Perú) por WhatsApp',
      'Integración express con Stripe y Wompi (Colombia / México / Global)',
      'Plantilla de confirmación y redirección inmediata tras el pago'
    ]
  }
];
