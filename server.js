import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 80;

// Data & Uploads directories
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const UPLOADS_DIR = process.env.UPLOADS_DIR || path.join(__dirname, 'uploads');
const DB_FILE = path.join(DATA_DIR, 'eatgelato_db.json');

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg';
    const filename = `photo_${Date.now()}_${Math.round(Math.random() * 1000)}${ext}`;
    cb(null, filename);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Initial Default Data if DB does not exist
const DEFAULT_DB = {
  flavors: [
    {
      id: 'f1',
      name: 'Arequipe Real EAT GELATO',
      category: 'cremas',
      description: 'Nuestra receta secreta con arequipe cremoso de la casa e hilos de arequipe espeso horneado.',
      tags: ['Especialidad de la Casa', '100% Leche Entera'],
      image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=80',
      rating: 4.9,
      badge: 'Top 1',
      inStock: true
    },
    {
      id: 'f2',
      name: 'Cacao Venezolano 70% Chuao',
      category: 'chocolates',
      description: 'Intenso gelato a base de cacao fino de aroma venezolano de la región de Chuao con trozos crocantes.',
      tags: ['Cacao Orgánico', 'Gourmet'],
      image: 'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?auto=format&fit=crop&w=500&q=80',
      rating: 5.0,
      badge: 'Premium',
      inStock: true
    },
    {
      id: 'f3',
      name: 'Parchita Real (Maracuyá)',
      category: 'frutales',
      description: 'Refrescante sorbete 100% natural hecho con pulpa de parchita fresca y semillas crocantes.',
      tags: ['Refrescante', 'Sin Lactosa'],
      image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=500&q=80',
      rating: 4.9,
      inStock: true
    },
    {
      id: 'f4',
      name: 'Coco Cremoso con Leche Condensada',
      category: 'cremas',
      description: 'Base de leche de coco fresca rallada a mano bañada con hilos de leche condensada artesanal.',
      tags: ['Insumos Frescos'],
      image: 'https://images.unsplash.com/photo-1488900128323-21503983257e?auto=format&fit=crop&w=500&q=80',
      rating: 4.9,
      inStock: true
    },
    {
      id: 'f5',
      name: 'Pistacho Bronte Importado',
      category: 'cremas',
      description: 'Elaborado exclusivamente con pasta pura de pistachos seleccionados de Italia.',
      tags: ['Gourmet', 'Sin Gluten'],
      image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=500&q=80',
      rating: 4.8,
      inStock: true
    },
    {
      id: 'f6',
      name: 'Ron con Pasas Añejo',
      category: 'cremas',
      description: 'Pasas maceradas durante semanas en ron añejo venezolano de reserva especial.',
      tags: ['Receta Tradicional'],
      image: 'https://images.unsplash.com/photo-1557142046-c704a3adf364?auto=format&fit=crop&w=500&q=80',
      rating: 4.8,
      inStock: true
    }
  ],
  offers: [
    {
      id: 'offer-1',
      title: 'Martes 2x1 en Potes de 1/2 Kg',
      badge: '¡PROMO ESPECIAL!',
      description: 'Llevate 2 potes de medio kilo por el precio de 1. Combiná hasta 6 sabores artesanales.',
      price: '$8.00',
      originalPrice: '$16.00',
      tag: 'Solo por Hoy',
      image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80',
      active: true
    },
    {
      id: 'offer-2',
      title: 'Edición Especial: Cacao Chuao 70% & Parchita Real',
      badge: '🌟 SABOR DEL DÍA',
      description: 'Elaborado con cacao puro de origen venezolano Chuao y sorbete refrescante de parchita fresca.',
      price: '$3.00 / vaso',
      originalPrice: '$4.00',
      tag: 'Stock Limitado',
      image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=600&q=80',
      active: true
    }
  ],
  storeInfo: {
    name: 'EAT GELATO',
    tagline: 'GOURMET ARTESANAL',
    address: 'Av. Principal de Las Mercedes, Caracas - Venezuela 🇻🇪',
    reference: 'Frente a la plaza principal. Estacionamiento exclusivo.',
    phone: '+58 412-1234567',
    whatsapp: '584121234567',
    email: 'contacto@eatgelato.com.ve',
    hours: {
      weekdays: '12:00 PM - 10:00 PM',
      weekends: '12:00 PM - 11:30 PM',
      sunday: '12:00 PM - 10:30 PM'
    },
    paymentMethods: ['pago-movil', 'zelle', 'efectivo', 'punto'],
    social: {
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com'
    }
  },
  story: {
    title: 'Pasión Artesanal y Atención Familiar',
    badge: 'Atendido por su propio dueño',
    subtitle: 'Nuestra Esencia',
    text: 'En EAT GELATO no hacemos producción industrial. Somos una heladería atendida personalmente por su dueño y maestro gelatero. Creemos en el valor de las cosas hechas sin prisa, cuidando cada detalle desde la elección de las materias primas hasta la textura final en la copa.',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80'
  },
  orders: []
};

// Helper functions for atomic read/write database operations
function readDatabase() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      writeDatabase(DEFAULT_DB);
      return DEFAULT_DB;
    }
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading database file, using fallback:', err);
    return DEFAULT_DB;
  }
}

function writeDatabase(db) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing to database file:', err);
  }
}

// Serve uploaded image static files
app.use('/uploads', express.static(UPLOADS_DIR));

// API ROUTES

// 1. Initial Data
app.get('/api/initial-data', (req, res) => {
  const db = readDatabase();
  res.json(db);
});

// 2. Upload photo Endpoint (File or Base64)
app.post('/api/upload', upload.single('photo'), (req, res) => {
  if (req.file) {
    const fileUrl = `/uploads/${req.file.filename}`;
    return res.json({ url: fileUrl });
  }

  // Base64 upload support
  if (req.body && req.body.base64) {
    const { base64 } = req.body;
    const matches = base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ error: 'Formato de base64 inválido' });
    }

    const imageBuffer = Buffer.from(matches[2], 'base64');
    const filename = `photo_${Date.now()}_${Math.round(Math.random() * 1000)}.jpg`;
    const filePath = path.join(UPLOADS_DIR, filename);

    fs.writeFileSync(filePath, imageBuffer);
    return res.json({ url: `/uploads/${filename}` });
  }

  res.status(400).json({ error: 'No se envió ninguna imagen' });
});

// 3. Flavors CRUD
app.post('/api/flavors', (req, res) => {
  const db = readDatabase();
  const newFlavor = {
    ...req.body,
    id: 'f_' + Date.now(),
    inStock: req.body.inStock !== undefined ? req.body.inStock : true,
    rating: req.body.rating || 5.0
  };
  db.flavors = [newFlavor, ...db.flavors];
  writeDatabase(db);
  res.json(newFlavor);
});

app.put('/api/flavors/:id', (req, res) => {
  const { id } = req.params;
  const db = readDatabase();
  const index = db.flavors.findIndex(f => f.id === id);
  if (index !== -1) {
    db.flavors[index] = { ...db.flavors[index], ...req.body };
    writeDatabase(db);
    return res.json(db.flavors[index]);
  }
  res.status(404).json({ error: 'Sabor no encontrado' });
});

app.delete('/api/flavors/:id', (req, res) => {
  const { id } = req.params;
  const db = readDatabase();
  db.flavors = db.flavors.filter(f => f.id !== id);
  writeDatabase(db);
  res.json({ success: true, id });
});

// 4. Offers CRUD
app.post('/api/offers', (req, res) => {
  const db = readDatabase();
  const newOffer = {
    ...req.body,
    id: 'offer_' + Date.now(),
    active: req.body.active !== undefined ? req.body.active : true
  };
  db.offers = [newOffer, ...db.offers];
  writeDatabase(db);
  res.json(newOffer);
});

app.put('/api/offers/:id', (req, res) => {
  const { id } = req.params;
  const db = readDatabase();
  const index = db.offers.findIndex(o => o.id === id);
  if (index !== -1) {
    db.offers[index] = { ...db.offers[index], ...req.body };
    writeDatabase(db);
    return res.json(db.offers[index]);
  }
  res.status(404).json({ error: 'Oferta no encontrada' });
});

app.delete('/api/offers/:id', (req, res) => {
  const { id } = req.params;
  const db = readDatabase();
  db.offers = db.offers.filter(o => o.id !== id);
  writeDatabase(db);
  res.json({ success: true, id });
});

// 5. Store Info & Story
app.put('/api/store-info', (req, res) => {
  const db = readDatabase();
  db.storeInfo = { ...db.storeInfo, ...req.body };
  writeDatabase(db);
  res.json(db.storeInfo);
});

app.put('/api/story', (req, res) => {
  const db = readDatabase();
  db.story = { ...db.story, ...req.body };
  writeDatabase(db);
  res.json(db.story);
});

// 6. Orders
app.post('/api/orders', (req, res) => {
  const db = readDatabase();
  const newOrder = {
    ...req.body,
    id: 'ord_' + Date.now(),
    date: new Date().toLocaleString('es-VE')
  };
  db.orders = [newOrder, ...(db.orders || [])];
  writeDatabase(db);
  res.json(newOrder);
});

// Serve compiled React Frontend
const DIST_DIR = path.join(__dirname, 'dist');
if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));
  app.get('*', (req, res) => {
    res.sendFile(path.join(DIST_DIR, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🍦 Servidor EAT GELATO ejecutándose en el puerto ${PORT}`);
  console.log(`📂 Directorio de datos: ${DATA_DIR}`);
  console.log(`📸 Directorio de imágenes: ${UPLOADS_DIR}`);
});
