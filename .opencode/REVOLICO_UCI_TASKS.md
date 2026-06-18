# REVOLICO UCI — Lista de tareas

> **Instrucción**: Cada vez que termines una tarea, muévela a "Completadas" y agrega la siguiente. Si no hay siguiente, deja la lista preparada para el próximo paso.

---

## En progreso

### Infraestructura
- [x] Instalar `@supabase/supabase-js` y `zustand`
- [x] Crear `lib/supabase.ts` - cliente Supabase con variables de entorno
- [x] Crear `lib/store/useAuthStore.ts` - Zustand store para auth (user, login, logout, isLoading)

### Base de Datos (Supabase)
- [x] Crear tabla `usuarios` (id, email, nombre, created_at)
- [x] Crear tabla `perfiles` (usuario_id, avatar_url, banner_url, bio, telefono)
- [x] Crear tabla `productos` (vendor_id, titulo, precio, imagenes, categoria, descripcion, etc.)
- [x] Crear tabla `verification_codes` (email, codigo, expiracion)

### Backend API (Next.js Routes)
- [x] `POST /api/auth/send-code` - Generar código 6 dígitos, guardar en DB, enviar email
- [x] `POST /api/auth/verify-code` - Validar código, crear sesión (cookie o Supabase session)
- [x] `GET /api/auth/me` - Devolver usuario actual
- [x] `POST /api/auth/logout` - Cerrar sesión

### Email (Nodemailer)
- [x] Diseñar template HTML con branding Revólico UCI
- [x] Incluir logo e imagen de la plataforma
- [x] Diseño responsive y limpio

### Frontend Auth
- [x] Componente `ProtectedRoute.tsx` - Proteger rutas autenticadas
- [x] `/app/login/page.tsx` - Formulario email → enviar código
- [x] `/app/registro/page.tsx` - Formulario registro → verificar código → crear cuenta

### Dashboard Vendedor
- [x] Editar perfil (avatar, banner con Cloudinary, bio, teléfono)
- [x] CRUD productos (crear, editar, eliminar, listar)

## Completadas

- [x] Instalar framer-motion
- [x] Configurar `globals.css` con tokens oklch y `@import` Tailwind v4
- [x] Crear `lib/whatsapp.ts` + `lib/utils.ts`
- [x] Remover stock images de create-next-app
- [x] Actualizar `layout.tsx` con Poppins, metadata, Navbar, Footer, BottomNav
- [x] Componente `Navbar` (desktop sticky + blur)
- [x] Componente `BottomNav` (mobile fixed + FAB + safe-area)
- [x] Componente `Footer`
- [x] Componente `ThemeToggle`
- [x] Componente `ProductCard`
- [x] Componente `WhatsAppButton`
- [x] Landing page (`/`) con hero section
- [x] Página Categoría (`/categoria/[slug]`) con filtros, grid, orden
- [x] Página Producto (`/producto/[id]`) con galería, WhatsApp, tabs
- [x] Página Tienda (`/tienda/[id]`) con cover, tabs, productos
- [x] Dashboard vendedor (`/dashboard`)
- [x] Favoritos (`/favoritos`)
- [x] Búsqueda (`/buscar`)
