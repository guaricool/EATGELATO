# Documento de Diseño: Backend API, Base de Datos SQLite y Almacenamiento de Fotos en VPS

## 1. Visión General
Este documento especifica la integración de un servidor backend en Node.js/Express con una base de datos SQLite y sistema de subida de archivos dentro del mismo proyecto en el VPS de EAT GELATO. Esto permite que todas las fotos subidas y los cambios de sabores, precios e información realizados desde el Panel de Administración persistan en la base de datos del VPS y sean visibles globalmente por todos los clientes en tiempo real.

---

## 2. Arquitectura del Servicio Unificado

```
  [ Cliente / Navegador ] (Público & Admin)
             │
             ▼  HTTP (Puerto 80 / Traefik Proxy)
  ┌─────────────────────────────────────────────────────────────┐
  │ Contenedor Docker `eatgelato-app` en VPS                    │
  │                                                             │
  │  ┌────────────────────────┐    ┌─────────────────────────┐  │
  │  │ Express Static Server  │    │ REST API (/api/*)       │  │
  │  │ (React Vite Build)     │    │ & /uploads/*            │  │
  │  └────────────────────────┘    └─────────────────────────┘  │
  │                                             │               │
  │                                             ▼               │
  │                               ┌───────────────────────────┐ │
  │                               │ Base de Datos SQLite      │ │
  │                               │ (/data/eatgelato.sqlite)  │ │
  │                               └───────────────────────────┘ │
  └─────────────────────────────────────────────────────────────┘
```

---

## 3. Base de Datos SQLite (`eatgelato.sqlite`)

La base de datos SQLite se almacenará en un directorio persistente del contenedor (`/data/eatgelato.sqlite`).

### Tablas:
1. `flavors`: `id`, `name`, `category`, `description`, `tags` (JSON), `image`, `rating`, `badge`, `in_stock` (INTEGER 0/1), `updated_at`.
2. `offers`: `id`, `title`, `badge`, `description`, `price`, `original_price`, `tag`, `image`, `active` (INTEGER 0/1).
3. `store_info`: `id`, `data` (JSON con dirección, WhatsApp +58, horarios, métodos de pago).
4. `story`: `id`, `title`, `badge`, `subtitle`, `text`, `image`.
5. `orders`: `id`, `customer_name`, `customer_phone`, `delivery_method`, `address`, `payment_method`, `total`, `items` (JSON), `created_at`.

---

## 4. Endpoints de la API REST (`/api`)

- `GET /api/initial-data`: Retorna todos los datos actuales de la heladería (sabores, ofertas, info del local, historia).
- `POST /api/upload`: Recibe una foto (multipart/form-data o base64), la guarda en `/uploads/` y devuelve la URL estática `/uploads/<filename>`.
- `POST /api/flavors`: Crea un nuevo sabor.
- `PUT /api/flavors/:id`: Edita un sabor existente o cambia su disponibilidad (*in_stock*).
- `DELETE /api/flavors/:id`: Elimina un sabor.
- `POST /api/offers`: Crea/Edita ofertas del día.
- `DELETE /api/offers/:id`: Elimina una oferta.
- `PUT /api/store-info`: Actualiza la información del local.
- `PUT /api/story`: Actualiza la historia del dueño.
- `POST /api/orders`: Registra un nuevo pedido del cliente.

---

## 5. Dockerfile & Despliegue en VPS
- Se agregará `server.js` en Node.js + Express.
- Dockerfile de 2 etapas:
  - Etapa 1: Compilación de React Vite (`dist`).
  - Etapa 2: Servidor Node.js Express ejecutando la API REST, sirviendo el cliente estático React, el directorio `/uploads` y gestionando la base de datos SQLite.
- Volumen Docker `/data` para evitar pérdida de fotos e información al reiniciar contenedores.
