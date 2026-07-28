export const DAILY_OFFERS = [
  {
    id: 'offer-1',
    title: 'Martes 2x1 en Potes de 1/2 Kg',
    badge: '¡PROMO ESPECIAL!',
    description: 'Llevate 2 potes de medio kilo por el precio de 1. Combiná hasta 6 sabores artesanales.',
    price: '$8.00',
    originalPrice: '$16.00',
    tag: 'Solo por Hoy',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'offer-2',
    title: 'Edición Especial: Cacao Chuao 70% & Parchita Real',
    badge: '🌟 SABOR DEL DÍA',
    description: 'Elaborado con cacao puro de origen venezolano Chuao y sorbete refrescante de parchita fresca.',
    price: '$3.00 / vaso',
    originalPrice: '$4.00',
    tag: 'Stock Limitado',
    image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'offer-3',
    title: 'Combo Pareja Gourmet + Baño de Chocolate Cacao Gratis',
    badge: '🔥 MÁS VENDIDO',
    description: '2 Vasos Grandes (3 bochas c/u) con salsa de chocolate fudge caliente y barquillos artesanales de regalo.',
    price: '$6.50',
    originalPrice: '$8.50',
    tag: 'Ideal para 2',
    image: 'https://images.unsplash.com/photo-1576506295286-5cda482453a2?auto=format&fit=crop&w=600&q=80'
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'Todos los Sabores' },
  { id: 'cremas', label: 'Cremas Gourmet' },
  { id: 'chocolates', label: 'Chocolates & Cacao Venezolano' },
  { id: 'frutales', label: 'Frutales de Estación' },
  { id: 'veganos', label: 'Sin Lactosa & Veganos' }
];

export const FLAVORS = [
  {
    id: 'f1',
    name: 'Arequipe Real EAT GELATO',
    category: 'cremas',
    description: 'Nuestra receta secreta con arequipe cremoso de la casa e hilos de arequipe espeso horneado.',
    tags: ['Especialidad de la Casa', '100% Leche Entera'],
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=80',
    rating: 4.9,
    badge: 'Top 1'
  },
  {
    id: 'f2',
    name: 'Cacao Venezolano 70% Chuao',
    category: 'chocolates',
    description: 'Intenso gelato a base de cacao fino de aroma venezolano de la región de Chuao con trozos crocantes.',
    tags: ['Cacao Orgánico', 'Gourmet'],
    image: 'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?auto=format&fit=crop&w=500&q=80',
    rating: 5.0,
    badge: 'Premium'
  },
  {
    id: 'f3',
    name: 'Parchita Real (Maracuyá)',
    category: 'frutales',
    description: 'Refrescante sorbete 100% natural hecho con pulpa de parchita fresca y semillas crocantes.',
    tags: ['Refrescante', 'Sin Lactosa'],
    image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=500&q=80',
    rating: 4.9
  },
  {
    id: 'f4',
    name: 'Coco Cremoso con Leche Condensada',
    category: 'cremas',
    description: 'Base de leche de coco fresca rallada a mano bañada con hilos de leche condensada artesanal.',
    tags: ['Insumos Frescos'],
    image: 'https://images.unsplash.com/photo-1488900128323-21503983257e?auto=format&fit=crop&w=500&q=80',
    rating: 4.9
  },
  {
    id: 'f5',
    name: 'Pistacho Bronte Importado',
    category: 'cremas',
    description: 'Elaborado exclusivamente con pasta pura de pistachos seleccionados de Italia.',
    tags: ['Gourmet', 'Sin Gluten'],
    image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=500&q=80',
    rating: 4.8
  },
  {
    id: 'f6',
    name: 'Ron con Pasas Añejo',
    category: 'cremas',
    description: 'Pasas maceradas durante semanas en ron añejo venezolano de reserva especial.',
    tags: ['Receta Tradicional'],
    image: 'https://images.unsplash.com/photo-1557142046-c704a3adf364?auto=format&fit=crop&w=500&q=80',
    rating: 4.8
  },
  {
    id: 'f7',
    name: 'Mantecado Real de Vainilla',
    category: 'cremas',
    description: 'El clásico e inigualable sabor a mantecado hecho con vainas de vainilla natural y yemas de campo.',
    tags: ['Clásico Inolvidable'],
    image: 'https://images.unsplash.com/photo-1560008511-11c63416e52d?auto=format&fit=crop&w=500&q=80',
    rating: 4.7
  },
  {
    id: 'f8',
    name: 'Guanábana Silvestre al Agua',
    category: 'veganos',
    description: 'Pulpa de guanábana natural batida al agua con toque sutil de lima.',
    tags: ['Vegano', '100% Natural'],
    image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=500&q=80',
    rating: 4.8
  },
  {
    id: 'f9',
    name: 'Galleta María & Crema de Avellanas',
    category: 'chocolates',
    description: 'Gelato cremoso intercalado con crujientes galletas María y abundante crema de avellanas.',
    tags: ['Favorito Infantil'],
    image: 'https://images.unsplash.com/photo-1576506295286-5cda482453a2?auto=format&fit=crop&w=500&q=80',
    rating: 4.9
  }
];

export const TUB_SIZES = [
  {
    id: 'size-1',
    name: 'Vaso Gourmet',
    capacity: '1-2 Sabores',
    maxFlavors: 2,
    price: 2.5,
    priceLabel: '$2.50',
    description: 'Ideal para disfrutar al instante en el local o paseando.'
  },
  {
    id: 'size-2',
    name: 'Pote 1/4 Kg',
    capacity: 'Hasta 3 Sabores',
    maxFlavors: 3,
    price: 4.5,
    priceLabel: '$4.50',
    description: 'Perfecto para una porción individual generosa.'
  },
  {
    id: 'size-3',
    name: 'Pote 1/2 Kg',
    capacity: 'Hasta 3 Sabores',
    maxFlavors: 3,
    price: 8.0,
    priceLabel: '$8.00',
    popular: true,
    description: 'La medida preferida para compartir en pareja.'
  },
  {
    id: 'size-4',
    name: 'Pote 1 Kg Familiar',
    capacity: 'Hasta 4 Sabores',
    maxFlavors: 4,
    price: 14.0,
    priceLabel: '$14.00',
    description: 'Ideal para compartir en familia y reuniones.'
  }
];

export const TOPPINGS = [
  { id: 'top-1', name: 'Baño de Chocolate Fudge Cacao', price: 0.5 },
  { id: 'top-2', name: 'Barquillos / Cucuruchos Crocantes (2 u.)', price: 0.75 },
  { id: 'top-3', name: 'Cerezas al Marrasquino', price: 0.75 },
  { id: 'top-4', name: 'Lluvia de Maní Tostado o Lluvia de Chocolate', price: 0.5 }
];

export const PAYMENT_METHODS = [
  { id: 'pago-movil', label: 'Pago Móvil (Tasa BCV)' },
  { id: 'zelle', label: 'Zelle' },
  { id: 'efectivo', label: 'Efectivo $' },
  { id: 'punto', label: 'Punto de Venta en Local / Delivery' }
];
