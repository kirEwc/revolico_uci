# REVOLICO UCI — Contexto completo del proyecto
> **Archivo de referencia para IA durante el desarrollo.** Leer antes de generar cualquier código, componente, ruta o decisión de diseño.

---

## 1. ¿Qué es Revolico UCI?

**Revolico UCI** es un marketplace local premium enfocado en comunidad. Conecta compradores y vendedores del mismo barrio o ciudad, priorizando comunicación directa vía WhatsApp. No hay checkout interno: todo el flujo de compra ocurre fuera de la plataforma.

### Valores del producto
| Valor | Descripción |
|---|---|
| **Comunidad local** | Vendedores verificados del barrio/ciudad del usuario |
| **Premium asequible** | Diseño cuidado, no genérico. Calidad visual sin precio de lujo |
| **Simplicidad** | Claridad sobre densidad. Jamás estilo tabla de clasificados |
| **Confianza** | Vendedores verificados, ratings visibles, contacto directo |
| **Inmediatez** | WhatsApp como canal único de comunicación comprador-vendedor |

### Lo que NO es Revolico UCI
- ❌ No es un clon de AliExpress ni Mercado Libre
- ❌ No tiene carrito de compras ni checkout interno
- ❌ No es un portal de clasificados con estética densa y anticuada
- ❌ No usa tipografías genéricas (Inter, Roboto, system-ui)
- ❌ No usa gradientes morados sobre blanco

---

## 2. Stack tecnológico

```
Next.js 15 (App Router) → Framework SSR/SSG/ISR
React 19                → UI
Tailwind CSS v4         → Estilos (via @import en app/globals.css)
Framer Motion           → Animaciones
Poppins (Google Fonts)  → Tipografía única (next/font/google)
```

### Reglas de arquitectura
- Routing **file-based** en `app/` con **App Router** — nunca `pages/`
- Carpeta de rutas: `app/(rutas)/page.tsx`, layouts en `app/layout.tsx`
- Componentes de servidor por defecto; usar `"use client"` solo cuando sea necesario (interactividad, hooks, eventos)
- Tokens de color en `app/globals.css` con `oklch` — nunca colores hardcoded en componentes
- Solo tokens semánticos: `bg-card`, `text-foreground`, `bg-orange`, etc.
- Imágenes con el componente `<Image>` de `next/image` — siempre `width`, `height`, `priority` solo en hero
- Links con el componente `<Link>` de `next/link`
- Fuentes cargadas con `next/font/google` en `app/layout.tsx`
- Mobile-first; breakpoints `md` (768px) y `lg` (1024px)
- Metadata con el objeto `export const metadata` o `generateMetadata()` por ruta

---

## 3. Sistema de diseño

### Paleta de colores (oklch)

```css
/* app/globals.css — tokens obligatorios */
:root {
  --navy:      oklch(0.26 0.07 255);   /* Base oscura, textos fuertes */
  --orange:    oklch(0.72 0.18 52);    /* Acento, CTAs, precios */
  --cream:     oklch(0.985 0.012 85);  /* Fondo claro */
  --whatsapp:  oklch(0.66 0.16 150);   /* EXCLUSIVO botón WhatsApp */

  /* Grises derivados del navy */
  --gray-soft: oklch(0.60 0.03 255);
  --gray-muted: oklch(0.75 0.02 255);

  /* Sombras tintadas */
  --shadow-soft: 0 2px 12px oklch(0.26 0.07 255 / 0.08);
  --shadow-card: 0 4px 24px oklch(0.26 0.07 255 / 0.12);
}
```

### Uso semántico de colores

| Token | Uso |
|---|---|
| `--navy` | Fondos dark, textos fuertes, bordes, navbar dark |
| `--orange` | CTAs primarios, precios, badges, FAB mobile, hover states |
| `--cream` | Fondo light, tarjetas light mode |
| `--whatsapp` | **Solo** el botón "Contactar por WhatsApp" |

### Modo claro vs oscuro

| Elemento | Light | Dark |
|---|---|---|
| Fondo global | cream | navy profundo |
| Tarjetas | blanco | navy elevado (+luminosidad) |
| Texto principal | navy | cream |
| Toggle | Persistente en navbar | Persistente en navbar |

### Tipografía

- **Fuente**: Poppins (400 / 500 / 600 / 700)
- **Headings**: `font-weight: 600+`, `letter-spacing: -0.02em` (tracking-tight)
- Prohibido usar Inter, Roboto o cualquier tipografía por defecto del sistema

### Componentes base

```
border-radius: rounded-2xl (0.75rem) en cards
               rounded-3xl (1rem) en modales, galería
ring: ring-1 ring-border/60 en tarjetas
spacing: generoso, aireado — no UI cargada
```

### Animaciones (Framer Motion)
- `fade-up` en secciones al entrar en viewport
- `hover lift` (scale 1.03 + shadow) en cards de producto
- Sin animaciones llamativas ni distractoras

---

## 4. Arquitectura de rutas

```
/                        → Home (landing principal)
/categoria/$slug         → Listado filtrado por categoría
/producto/$id            → Ficha detalle de producto
/tienda/$id              → Storefront del vendedor
/dashboard               → Panel de gestión del vendedor
/login                   → Autenticación (email + OAuth Google)
/registro                → Registro de nuevo usuario
/favoritos               → Lista personal de guardados
/buscar                  → Resultados de búsqueda global
```

### SEO obligatorio por ruta
Cada ruta debe exportar `metadata` o `generateMetadata()` con:
- `title` < 60 caracteres, único por página
- `description` < 160 caracteres
- `openGraph.title`, `openGraph.description`
- `openGraph.images` en rutas con imagen hero (`/producto/[id]`, `/tienda/[id]`)
- `<h1>` único por página
- `alt` text descriptivo en todas las imágenes (`<Image alt="...">`)
- JSON-LD `Product` en ficha de producto (script en `<head>` via componente)
- JSON-LD `LocalBusiness` en ficha de tienda

---

## 5. Layout global

### Navbar (desktop, sticky, blur backdrop)
```
[Logo Revolico UCI]  [Buscador central ancho 🔍]  [📍 Ubicación]
                                          [♡ Favoritos] [💬 Mensajes] [☀/🌙] [Avatar/Entrar] [Vender →]
```
- Buscador: placeholder `"Buscar productos, tiendas o categorías…"`
- Botón "Vender": naranja, primario
- ThemeToggle: persiste en localStorage

### BottomNav (mobile, fixed, safe-area)
```
[🏠 Inicio]  [🗂 Categorías]  [➕ Publicar]  [💬 Mensajes]  [👤 Perfil]
```
- Botón Publicar: FAB naranja central, ligeramente elevado
- `padding-bottom: env(safe-area-inset-bottom)` obligatorio

### Footer
- Logo + tagline
- Columnas: Plataforma / Comunidad / Legal
- Copyright

---

## 6. Páginas — especificación detallada

### 6.1 Home `/`

Secciones en este orden exacto:

1. **Hero split (2 col en md)**
   - Chip: "Marketplace de tu comunidad"
   - H1 grande con palabra clave en naranja inline
   - Párrafo descriptivo
   - CTA primario: "Explorar productos" (naranja)
   - CTA secundario: "Vender en Revolico" (outline)
   - Badges de confianza: Verificados · WhatsApp
   - Imagen del barrio + tarjeta flotante de stats (`+450 negocios activos`)

2. **Categorías** — grid 3 col mobile / 6 desktop
   - Icono emoji en burbuja naranja translúcida + nombre de categoría

3. **Productos destacados** — grid 2 col mobile / 4 desktop
   - Componente `ProductCard`

4. **Banner promo** — fondo navy
   - "¿Tienes un negocio?" + CTA naranja → `/dashboard`

5. **Tiendas destacadas** — grid 1/2/4
   - Avatar con inicial, nombre, tagline, rating, nº productos

6. **Tendencia esta semana** — grid 2/4 — `ProductCard`

7. **Recién añadidos** — grid 2/4 — `ProductCard`

8. **Cómo funciona** — 3 pasos
   - Descubre → Contacta → Recibe

9. **Testimonios locales** — 3 tarjetas cream
   - Avatar + texto + rating ★

---

### 6.2 Componente `ProductCard`

```
┌─────────────────────────────┐
│  [Badge: Nuevo/Oferta/...]  │  [♡]
│                             │
│     Imagen 4:5 object-cover │
│     rounded-2xl             │
│     hover: scale(1.03)      │
│                             │
├─────────────────────────────┤
│ Título truncado 1 línea     │
│ $Precio grande (orange)  ~~$anterior~~ │
│ ★ 4.8 · NombreTienda · 📍 Ciudad │
└─────────────────────────────┘
```

Click en card → `/producto/$id`
Click en corazón → agrega/quita de favoritos

---

### 6.3 Categoría `/categoria/$slug`

- Breadcrumb: `Inicio › Categorías › {Nombre}`
- Header: título + nº resultados + selector orden
  - Orden: Recientes / Precio ↑ / Precio ↓ / Mejor valorados
- **Sidebar filtros** (desktop) / **Sheet** (mobile):
  - Rango de precio (slider dual)
  - Rating mínimo (★ selector)
  - Ubicación (selector)
  - Condición: Nuevo / Usado
  - Toggle: Solo verificados
- Grid productos 2/3/4 cols
- Paginación o botón "Cargar más"
- Estado vacío con ilustración y CTA

---

### 6.4 Producto `/producto/$id`

**Columna izquierda:**
- Imagen principal grande
- Thumbnails verticales (hasta 6)

**Columna derecha:**
- Link categoría + H1 título
- Rating ★ + nº reseñas + nº vistas
- Precio grande (naranja) + condición (Nuevo/Usado)
- Chips: 📍 Ubicación · 🚚 Entrega · 📦 Stock
- **Botón verde WhatsApp** "Contactar por WhatsApp" ← CTA principal
  - Mensaje pre-relleno: `"Hola, me interesa: {título} {URL}"`
- Botón outline "Guardar" + icono "Compartir"
- **Mini-card vendedor**: avatar, nombre, rating, "Ver tienda →"
- Garantías: ✓ Vendedor verificado · ✓ Pago contra entrega · ⚑ Reportar

**Tabs inferiores:**
1. Descripción
2. Especificaciones (tabla clave-valor)
3. Reseñas (lista con avatar + rating + texto)
4. Preguntas y respuestas

**Secciones abajo:**
- "Productos similares" — grid 4
- "Más de esta tienda" — grid 4

---

### 6.5 Tienda `/tienda/$id`

```
[Cover banner — gradiente navy]
      ↑ -mt-16
[Avatar grande | Nombre | Tagline]
[★ Rating · 📍 Ubicación]
[Productos: N | Seguidores: N | Calificación: N%]
[WhatsApp verde] [Seguir outline] [Compartir ↗]
```

**Tabs:**
1. **Productos** — grid 2/4, buscador interno + filtro categoría
2. **Reseñas** — lista con avatar + texto + rating
3. **Información** — descripción, horarios, ubicación (mapa estático opcional)
4. **Políticas** — entrega, pagos, devoluciones

---

### 6.6 Dashboard `/dashboard` (vendedor)

**Navegación lateral** (desktop sidebar / mobile drawer):
Resumen · Productos · Mensajes · Estadísticas · Tienda · Configuración

**Pestaña Resumen:**
- 4 KPIs: Vistas · Mensajes · Productos activos · Rating promedio
  - Cada KPI con delta semanal (↑ o ↓ %)
- Gráfico SVG de visitas últimos 30 días
- Lista últimos mensajes WhatsApp (referencia + link `wa.me`)
- Top productos por vistas

**Pestaña Productos:**
- Tabla: imagen miniatura · título · precio · stock · estado (Activo/Pausado/Agotado) · acciones
- Acciones por fila: editar / pausar / eliminar
- **Botón naranja "Publicar producto"** → abre modal o ruta con formulario:
  ```
  Título, Categoría, Precio, Condición (Nuevo/Usado),
  Descripción (rich text básico),
  Hasta 6 imágenes (drag & drop),
  Ubicación, Stock, Número WhatsApp
  ```

**Pestaña Mensajes:**
- Lista de conversaciones iniciadas vía WhatsApp
- Referencia del producto + enlace directo `wa.me`

**Pestaña Estadísticas:**
- Charts: vistas diarias / contactos WhatsApp / tasa de conversión

**Pestaña Tienda:**
- Editar: cover, avatar, nombre, descripción, horarios, políticas

---

## 7. Autenticación

> Activar cuando se conecte Supabase/Cloud.

- Rutas `/login` y `/registro`
- Métodos: email + password, OAuth Google
- **Roles en tabla separada `user_roles`** (nunca en `profiles`):
  - `comprador`, `vendedor`, `admin`
- Función `has_role()` con `SECURITY DEFINER` para RLS
- Rutas del vendedor bajo layout `_authenticated`
- Redirigir a `/dashboard` tras login como vendedor

---

## 8. Microcopy oficial (es-ES neutro)

| Contexto | Texto |
|---|---|
| CTA contacto | **"Contactar por WhatsApp"** |
| CTA vender | **"Publica tu producto"** |
| CTA explorar | **"Explorar productos"** |
| CTA tienda | **"Vender en Revolico"** |
| Favoritos vacíos | _"Aún no guardas productos. Explora el barrio →"_ |
| Confianza | _"Vendedores verificados de tu comunidad"_ |
| Búsqueda vacía | _"No encontramos resultados para '{query}'. Prueba con otro término."_ |
| Error genérico | _"Algo salió mal. Inténtalo de nuevo."_ |
| Producto agotado | _"Este producto no está disponible en este momento."_ |

---

## 9. Accesibilidad

- Contraste mínimo **AA** en ambos modos (light y dark)
- Focus visible con anillo naranja (`--orange`) en todos los elementos interactivos
- `aria-label` en todos los iconos sin texto visible
- Imágenes con `alt` text descriptivo (nunca vacío salvo decorativas)
- Navegación por teclado funcional en modales y menús

---

## 10. Prohibiciones absolutas

```
❌ Gradientes morados sobre blanco (estética genérica de AI)
❌ Tipografías Inter, Roboto, system-ui
❌ Checkout / carrito interno (todo va por WhatsApp)
❌ Densidad tipo tabla de clasificados (Craigslist, OLX anticuado)
❌ Colores hexadecimales sueltos en componentes (usar solo tokens)
❌ bg-white, text-black hardcoded
❌ Más de un H1 por página
❌ Imágenes sin alt text
❌ Animaciones agresivas o llamativas
❌ Botón WhatsApp en cualquier color que no sea --whatsapp
```

---

## 11. Checklist por componente nuevo

Antes de dar por terminado cualquier componente o página, verificar:

- [ ] ¿Usa solo tokens semánticos? (no hex sueltos)
- [ ] ¿Funciona en light y dark mode?
- [ ] ¿Es mobile-first con breakpoints `md` y `lg`?
- [ ] ¿Tiene `aria-label` en iconos?
- [ ] ¿Las imágenes tienen `alt`, `width`, `height`?
- [ ] ¿El H1 es único en la página?
- [ ] ¿El `head()` tiene title, description y og: tags?
- [ ] ¿Los CTA usan el microcopy oficial?
- [ ] ¿Los hover states usan animación suave (Framer Motion)?
- [ ] ¿El botón WhatsApp usa exclusivamente `--whatsapp`?

---

## 12. Estructura de carpetas esperada

```
app/
├── layout.tsx                  # Layout raíz (fuentes, ThemeProvider, Navbar, Footer)
├── globals.css                 # Tokens oklch + @import Tailwind v4
├── page.tsx                    # /  (Home)
├── categoria/
│   └── [slug]/
│       └── page.tsx            # /categoria/:slug
├── producto/
│   └── [id]/
│       └── page.tsx            # /producto/:id
├── tienda/
│   └── [id]/
│       └── page.tsx            # /tienda/:id
├── dashboard/
│   └── page.tsx                # /dashboard
├── login/
│   └── page.tsx
├── registro/
│   └── page.tsx
├── favoritos/
│   └── page.tsx
└── buscar/
    └── page.tsx

components/
├── ui/                         # Primitivos (Button, Badge, Card, Sheet…)
├── ProductCard.tsx             # "use client" — hover, favoritos
├── Navbar.tsx
├── BottomNav.tsx               # "use client" — safe-area, FAB
├── Footer.tsx
├── ThemeToggle.tsx             # "use client"
└── WhatsAppButton.tsx          # "use client"

lib/
├── utils.ts
└── whatsapp.ts                 # Helpers para generar links wa.me

public/
└── images/                     # Imágenes estáticas (.jpg)
```

---

## 13. Helper WhatsApp

```typescript
// src/lib/whatsapp.ts
export function buildWhatsAppLink(phone: string, productTitle: string, productUrl: string) {
  const message = encodeURIComponent(
    `Hola, me interesa: ${productTitle}\n${productUrl}`
  );
  return `https://wa.me/${phone}?text=${message}`;
}
```

---

*Última actualización del contexto: versión inicial del proyecto.*
*Este archivo debe mantenerse sincronizado con cualquier cambio de diseño o arquitectura acordado con el equipo.*
