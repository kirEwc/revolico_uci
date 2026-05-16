# REVOLICO UCI — Reglas de desarrollo

> Estas reglas DEBEN leerse antes de generar cualquier código. Se actualizan según sea necesario.

---

## 1. Reglas obligatorias

### 1.1 Consultar contexto
Antes de crear o modificar cualquier componente, ruta o decisión de diseño, leer `REVOLICO_UCI_CONTEXT.md` en su totalidad.

### 1.2 Stack
- Next.js 15 (App Router), React 19, Tailwind CSS v4, Framer Motion, Poppins
- Prohibido usar `pages/` — solo `app/` con App Router

### 1.3 Colores y estilos
- Usar **únicamente tokens semánticos** definidos en `globals.css` (oklch)
- Prohibido: colores hexadecimales sueltos, `bg-white`, `text-black`, gradientes morados sobre blanco
- Botón WhatsApp → exclusivamente color `--whatsapp`

### 1.4 Tipografía
- **Solo Poppins** (vía `next/font/google` en `layout.tsx`)
- Prohibido: Inter, Roboto, system-ui o cualquier tipografía por defecto

### 1.5 Arquitectura
- Componentes servidor por defecto; `"use client"` solo cuando sea necesario
- Mobile-first con breakpoints `md` (768px) y `lg` (1024px)
- Imágenes con `<Image>` de `next/image` — siempre `width`, `height`, `alt`
- Links con `<Link>` de `next/link`
- Metadata con `export const metadata` o `generateMetadata()` por ruta

### 1.6 Microcopy oficial
Usar los textos exactos de la sección 8 del contexto. Sin variaciones.

### 1.7 Accesibilidad
- Contraste AA en ambos modos
- `aria-label` en iconos sin texto visible
- Focus visible con anillo naranja (`--orange`)
- Navegación por teclado funcional

### 1.8 Prohibiciones absolutas
(referirse a sección 10 del contexto — checklist completo)

### 1.9 Checklist por componente
Verificar los 10 puntos de la sección 11 del contexto antes de dar por terminado cualquier componente.

---

## 2. Ciclo de trabajo

1. **Leer contexto** (`REVOLICO_UCI_CONTEXT.md`) si no se ha hecho en la sesión
2. **Revisar tareas pendientes** en `REVOLICO_UCI_TASKS.md`
3. **Implementar** siguiendo las reglas de este archivo
4. **Verificar** con el checklist de la sección 11 del contexto
5. **Actualizar** `REVOLICO_UCI_TASKS.md` moviendo la tarea a completada
6. **Si ocurre un error complejo** → registrar en `POTENTIAL_ERRORS.md`

---

*Este archivo debe mantenerse sincronizado con cualquier cambio de diseño o arquitectura.*
