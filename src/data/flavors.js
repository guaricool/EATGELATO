export const DAILY_OFFERS = [
  {
    id: 'offer-1',
    title: 'Martes 2x1 en Potes de 1/2 Kg',
    badge: '¡SUPER PROMO!',
    description: 'Llevate 2 potes de medio kilo por el precio de 1. Combiná hasta 6 sabores artesanales.',
    price: '$8.500',
    originalPrice: '$17.000',
    tag: 'Solo por Hoy',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'offer-2',
    title: 'Edición Limitada: Pistacho de Sicilia & Dulce de Leche',
    badge: '🌟 SABOR DEL DÍA',
    description: 'Pistachos tostados 100% origen italiano combinado con dulce de leche artesanal cocinado a fuego lento.',
    price: '$3.200 / vaso',
    originalPrice: '$4.000',
    tag: 'Stock Limitado',
    image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'offer-3',
    title: 'Combo Pareja Gourmet + Baño de Chocolate Gratis',
    badge: '🔥 MÁS VENDIDO',
    description: '2 Vasos Grandes (3 bochas c/u) con salsa de chocolate fudge caliente y barquillos artesanales de regalo.',
    price: '$6.900',
    originalPrice: '$8.800',
    tag: 'Ideal para 2',
    image: 'https://images.unsplash.com/photo-1576506295286-5cda482453a2?auto=format&fit=crop&w=600&q=80'
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'Todos los Sabores' },
  { id: 'cremas', label: 'Cremas Gourmet' },
  { id: 'chocolates', label: 'Chocolates de Autor' },
  { id: 'frutales', label: 'Frutales 100% Al Agua' },
  { id: 'veganos', label: 'Veganos & Sin Lactosa' }
];

export const FLAVORS = [
  {
    id: 'f1',
    name: 'Dulce de Leche EAT GELATO',
    category: 'cremas',
    description: 'Nuestra receta secreta con dulce de leche vacuno tradicional e hilos de dulce de leche repostero puro.',
    tags: ['Especialidad de la Casa', '100% Leche Entera'],
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=80',
    rating: 4.9,
    badge: 'Top 1'
  },
  {
    id: 'f2',
    name: 'Pistacho Bronte Real',
    category: 'cremas',
    description: 'Elaborado exclusivamente con pasta pura de pistachos importados de Bronte, Sicilia.',
    tags: ['Sin Gluten', 'Gourmet'],
    image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=500&q=80',
    rating: 5.0,
    badge: 'Premium'
  },
  {
    id: 'f3',
    name: 'Chocolate Amargo 70% Ecuador',
    category: 'chocolates',
    description: 'Intenso cacao de origen ecuatoriano con trozos de chocolate semiamargo crocante.',
    tags: ['Sin Lactosa', 'Vegano Option'],
    image: 'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?auto=format&fit=crop&w=500&q=80',
    rating: 4.8
  },
  {
    id: 'f4',
    name: 'Mascarpone con Frutos del Bosque',
    category: 'cremas',
    description: 'Crema de queso mascarpone artesanal jaspeada con salsa casera de frambuesas y moras frescas.',
    tags: ['Fruta Fresca'],
    image: 'https://images.unsplash.com/photo-1488900128323-21503983257e?auto=format&fit=crop&w=500&q=80',
    rating: 4.9
  },
  {
    id: 'f5',
    name: 'Frutilla de Huerta al Agua',
    category: 'frutales',
    description: 'Frutillas frescas seleccionadas a mano, batidas solo con agua purificada y azúcar orgánica.',
    tags: ['100% Fruta', 'Vegano', '0% Grasa'],
    image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=500&q=80',
    rating: 4.7
  },
  {
    id: 'f6',
    name: 'Maracuyá Intenso',
    category: 'frutales',
    description: 'Sabor tropical refrescante con semillas crujientes de maracuyá real y toque cítrico.',
    tags: ['Refrescante', 'Vegano'],
    image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=500&q=80',
    rating: 4.9
  },
  {
    id: 'f7',
    name: 'Chocolate Blanco Lotus Biscoff',
    category: 'chocolates',
    description: 'Suave gelato de chocolate blanco belga con vetas de crema Lotus y galletas troceadas.',
    tags: ['Crujiente', 'Tendencia'],
    image: 'https://images.unsplash.com/photo-1576506295286-5cda482453a2?auto=format&fit=crop&w=500&q=80',
    rating: 4.9
  },
  {
    id: 'f8',
    name: 'Sambayón a la Antigua',
    category: 'cremas',
    description: 'Clásico gelato italiano a base de yemas frescas de campo y oporto añejado.',
    tags: ['Receta Tradicional'],
    image: 'https://images.unsplash.com/photo-1557142046-c704a3adf364?auto=format&fit=crop&w=500&q=80',
    rating: 4.8
  },
  {
    id: 'f9',
    name: 'Limón Menta & Jengibre',
    category: 'veganos',
    description: 'Sorbet artesanal super digestivo con zumo de limón recién exprimido y hojas de menta huerta.',
    tags: ['Vegano', 'Digestivo'],
    image: 'https://images.unsplash.com/photo-1534706936160-d5ee67737249?auto=format&fit=crop&w=500&q=80',
    rating: 4.7
  }
];

export const TUB_SIZES = [
  {
    id: 'size-1',
    name: 'Vaso Gourmet',
    capacity: '1-2 Sabores',
    maxFlavors: 2,
    price: 2500,
    priceLabel: '$2.500',
    description: 'Ideal para disfrutar al instante en el local o caminando.'
  },
  {
    id: 'size-2',
    name: 'Pote 1/4 Kg',
    capacity: 'Hasta 3 Sabores',
    maxFlavors: 3,
    price: 4500,
    priceLabel: '$4.500',
    description: 'Perfecto para una porción individual generosa.'
  },
  {
    id: 'size-3',
    name: 'Pote 1/2 Kg',
    capacity: 'Hasta 3 Sabores',
    maxFlavors: 3,
    price: 8500,
    priceLabel: '$8.500',
    popular: true,
    description: 'La medida preferida para compartir en pareja.'
  },
  {
    id: 'size-4',
    name: 'Pote 1 Kg Familiar',
    capacity: 'Hasta 4 Sabores',
    maxFlavors: 4,
    price: 15500,
    priceLabel: '$15.500',
    description: 'Ideal para familias y reuniones con amigos.'
  }
];

export const TOPPINGS = [
  { id: 'top-1', name: 'Baño de Chocolate Fudge', price: 500 },
  { id: 'top-2', name: 'Cucuruchos / Barquillos Crocantes (2 u.)', price: 600 },
  { id: 'top-3', name: 'Cerezas al Marrasquino', price: 700 },
  { id: 'top-4', name: 'Nueces y Almendras Tostadas', price: 800 }
];
