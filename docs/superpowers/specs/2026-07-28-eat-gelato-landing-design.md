# Documento de Diseño: Landing Page EAT GELATO

## 1. Visión General
**EAT GELATO** es una heladería gourmet artesanal atendida por su propio dueño. La landing page tiene como objetivo proyectar una experiencia estética de alta calidad, cálida y artesanal, facilitando la visualización del menú de sabores, las ofertas del día y la realización de pedidos directamente por WhatsApp y Correo Electrónico.

---

## 2. Paleta de Colores e Identidad Visual
Basada estrictamente en el logo oficial del cliente (`media__1785272114870.jpg`):

| Elemento | Color Hexadecimal | Aplicación |
| :--- | :--- | :--- |
| **Fondo Principal** | `#FAF6F0` (Ivory / Crema Marfil) | Fondos generales de la página |
| **Azul Heladería** | `#4889A8` (Sky Blue / Azul Pastel) | Bordes de tarjetas, botones primarios, acentos suaves |
| **Terracota / Coral** | `#E47A5A` (Warm Terracotta) | Insignias, ofertas destacadas, botones de llamados a la acción |
| **Chocolate Cacao** | `#3D2722` (Deep Chocolate) | Títulos principales, textos y bordes de contraste |
| **Rojo Cereza** | `#C83E4D` (Cherry Red) | Indicadores de ofertas, badges de "Especial del día" |
| **Crema Vainilla** | `#F5D7A1` (Vanilla Cream) | Tarjetas secundarias y contenedores con brillo |

### Tipografía
- **Títulos y Encabezados:** `Outfit` (Google Font, sans-serif moderna, redondeada y amigable).
- **Cuerpo y Detalles:** `Inter` (Google Font, alta legibilidad).

---

## 3. Estructura de Secciones y Componentes

### 3.1 Header & Navegación Sticky
- **Logo Oficial:** Renderizado con el logo circular `EAT GELATO GOURMET`.
- **Navegación:** Enlaces a `Inicio`, `Ofertas de Hoy`, `Menú de Sabores`, `Nuestra Historia`, `Ubicación`.
- **Acciones Rápidas:**
  - Botón de WhatsApp directo.
  - Carrito de pedidos flotante con contador de ítems.

### 3.2 Hero Section (Sección Principal)
- **Titular:** *"Gelato Artesanal Hecho a Mano con Pasión"*
- **Subtítulo:** *"Fresco todos los días, elaborado con insumos 100% naturales. Atendido amablemente por su propio dueño."*
- **Badge Flotante:** 🏅 *"Atendido por su propio dueño"*
- **CTAs Primarios:**
  - *"Armar mi Pedido"* (Desplaza al creador de potes)
  - *"Ver Ofertas del Día"*
- **Galería Visual:** Imágenes de copas de gelato artesanales con bañados de chocolate fudge y toppings de barquillos crocantes.

### 3.3 Ofertas del Día (Daily Special Offers)
Sección interactiva tipo carrusel/tarjetas destacadas para impulsar la venta:
- **Especial #1:** 🍦 *Martes 2x1 en Potes de 1/2 Kg*.
- **Especial #2:** 🌟 *Sabor del Día: Pistacho Bronte & Dulce de Leche con Nuez*.
- **Especial #3:** 🧇 *Combo Pareja: 2 Vasos Gourmet + Topping de Barquillos sin costo extra*.

### 3.4 Catálogo Interactivo de Sabores
Filtros de categoría:
1. `Todos`
2. `Cremas Gourmet` (ej. Mascarpone con Frutos del Bosque, Sambayón, Dulce de Leche Granizado)
3. `Frutales 100% Naturales` (ej. Maracuyá, Limón Menta, Frutilla de Huerta)
4. `Chocolates de Autor` (ej. Chocolate Amargo 70% Ecuador, Chocolate Blanco con Galletas Lotus)
5. `Veganos & Sin Lactosa`

Cada tarjeta incluirá:
- Foto de alta calidad del gelato.
- Nombre y notas de sabor.
- Etiquetas de insumos (ej. *100% Leche Entera*, *Fruta Fresca de Estación*).
- Botón *"Agregar al Pedido"*.

### 3.5 Creador de Pote Interactivo (Custom Tub Builder)
Un configurador en 3 pasos:
1. **Paso 1: Elegir Tamaño** (Vaso 1 Bocha, Pote 1/4 kg, Pote 1/2 kg, Pote 1 kg).
2. **Paso 2: Elegir Sabores** (Límite dinámico según el tamaño).
3. **Paso 3: Agregar Toppings** (Baño de Chocolate Fudge, Barquillos crocantes, Cereza al marrasquino).

### 3.6 Nuestra Historia ("Atendido por su Propio Dueño")
- Tarjeta de estilo editorial cálido que narra la historia del maestro gelatero / dueño.
- Pilares de calidad: Insumos de origen seleccionado, cero saborizantes o colorantes artificiales, batido lento al estilo italiano tradicional.

### 3.7 Sistema de Pedidos (Checkout por WhatsApp & Correo)
Modal emergente interactivo cuando el usuario hace clic en su carrito:
- **Formulario de Datos:** Nombre, Teléfono, Tipo de Entrega (*Delivery* o *Retiro en Local*), Dirección / Notas adicionales.
- **Resumen:** Detalle de potes armados, sabores y adicionales.
- **Acción WhatsApp:** Genera un mensaje formateado:
  > *"¡Hola EAT GELATO! Quisiera realizar el siguiente pedido:*
  > *- Pote 1/2 kg: Dulce de Leche, Pistacho, Chocolate Amargo*
  > *Cliente: Juan Pérez - Delivery a Av. Principal 123"*
- **Acción Correo Electrónico:** Envía un email estructurado directamente al correo de la heladería con el resumen de la compra.

### 3.8 Ubicación, Horarios y Opiniones
- Tarjeta informativa con horarios de atención (ej. Lun-Dom: 12:00 PM - 10:30 PM).
- Mapa visual interactivo del local.
- Reseñas destacadas de clientes satisfechos (estrellas y comentarios).

---

## 4. Tecnología e Implementación
- **Framework:** React + Vite (HTML5, JS/JSX).
- **Estilos:** CSS Vanilla Moderno con variables CSS (`:root`) para colores, sombras glassmorphism, responsive flexbox/grid y animaciones suaves con `@keyframes` y `transition`.
- **Imágenes:** Renderizado del logo original `media__1785272114870.jpg` e imágenes de demostración generadas para productos y gelatos.
