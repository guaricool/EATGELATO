# Documento de Diseño: Panel de Administración EAT GELATO

## 1. Visión General
El **Panel de Administración (Admin Portal)** de EAT GELATO le permite al dueño de la heladería gestionar en tiempo real todo el contenido de su landing page desde cualquier dispositivo (celular o computadora). El dueño podrá subir fotos reales de sus helados, modificar el menú de sabores, gestionar las ofertas del día, actualizar información del local (dirección, WhatsApp +58, redes, horarios, métodos de pago) y revisar el historial de pedidos.

---

## 2. Autenticación y Seguridad
- **Ruta de Acceso:** `/admin` (disponible también desde un enlace discreto en el pie de página).
- **Control de Acceso:** Login mediante PIN / Contraseña de administrador.
- **PIN por Defecto:** `1234` (modificable desde el panel de configuración).
- **Manejo de Sesión:** Token de sesión persistente en navegador con opción de cierre de sesión manual.

---

## 3. Módulos Funcionales

### 3.1 Dashboard Principal (Resumen)
- Indicadores rápidos: Cantidad de sabores activos, ofertas vigentes y pedidos recibidos.
- Accesos directos a la edición de la landing page.

### 3.2 Gestión de Sabores y Catálogo
- **Listado de Sabores:** Vista de tabla / tarjetas con opción de filtrar por categoría (*Cremas, Chocolates, Frutales, Veganos*).
- **Crear / Editar Sabor:**
  - Nombre del sabor.
  - Descripción e ingredientes principales.
  - Categoría y Etiquetas (*Sin Lactosa, Gourmet, Especialidad, etc.*).
  - Puntuación (1.0 a 5.0).
  - Foto Real: Selector de archivo de imagen con previsualización (soporte base64/upload) o URL.
  - Interruptor de Disponibilidad (*En Stock / Agotado*).
- **Eliminar Sabor:** Eliminación con modal de confirmación.

### 3.3 Gestión de Ofertas del Día
- **Crear / Editar Promoción:**
  - Título de la oferta.
  - Insignia (*2x1*, *Sabor del Día*, *Promo Especial*).
  - Descripción de la promo.
  - Precio actual en $ USD y precio anterior.
  - Foto promocional.
  - Estado (*Activa / Pausada*).

### 3.4 Configuración del Local & Contacto (Venezuela 🇻🇪)
- **Datos de Contacto:** Número de WhatsApp (+58...), teléfono fijo, correo de recepción.
- **Ubicación:** Dirección del local, punto de referencia y enlace de Google Maps.
- **Horarios:** Configuración de horarios de apertura y cierre para Lunes-Jueves, Viernes-Sábado y Domingos.
- **Métodos de Pago:** Conmutadores para activar/desactivar *Pago Móvil (Tasa BCV)*, *Zelle*, *Efectivo $*, *Punto de Venta*.
- **Redes Sociales:** Enlaces a Instagram y Facebook.

### 3.5 Historia del Dueño ("El Gelataio")
- Edición del título principal, biografía/historia artesanal y foto de perfil del maestro helatero.

### 3.6 Registro de Pedidos Realizados
- Tabla con historial de los pedidos estructurados armados por los clientes en la landing page.

---

## 4. Persistencia de Datos y Arquitectura
- **Contexto React (`StoreContext`):** Almacenamiento centralizado con sincronización en tiempo real entre el Admin Portal y la Landing Page pública.
- **Persistencia en LocalStorage / Server State:** Fallback inicial enriquecido que guarda los cambios de forma persistente en el dispositivo/servidor.
- **Formato de Imágenes:** Conversión a base64 / data-URI para almacenamiento de fotos reales subidas por el dueño desde su teléfono.
