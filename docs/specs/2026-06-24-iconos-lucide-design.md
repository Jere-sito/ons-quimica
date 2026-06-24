# ONS Química — Sistema de íconos profesionales con Lucide

**Fecha:** 2026-06-24  
**Objetivo:** Reemplazar todos los emojis y placeholders genéricos en desktop y mobile por íconos SVG minimalistas profesionales usando Lucide Icons.

---

## Alcance (A + B + C + D)

| Item | Descripción |
|---|---|
| A | Favicon en pestaña del navegador |
| B | Íconos de categoría de producto en listas y tablas |
| C | Avatar del usuario Hugo en topbar |
| D | Íconos de navegación en sidebar desktop y bottom nav mobile |

---

## Tecnología

**Lucide Icons** vía CDN (unpkg):
```html
<script src="https://unpkg.com/lucide@latest"></script>
```
Uso en HTML: `<i data-lucide="nombre-icono" class="lucide-icon"></i>`  
Activación JS: `lucide.createIcons()` llamado al final del init.

Estilo base: stroke de 1.5px, sin relleno, color heredado del contenedor. Se controla con CSS (`stroke`, `width`, `height`).

---

## Archivos a modificar

- `public/desktop/index.html` — navegación sidebar, íconos de productos, avatar, favicon
- `public/mobile/index.html` — bottom nav, íconos de productos, avatar, favicon

---

## Mapeo completo de íconos

### D — Navegación

| Pantalla | Ícono Lucide | Aplica a |
|---|---|---|
| Dashboard | `layout-dashboard` | Desktop sidebar + Mobile bottom nav |
| Ventas | `shopping-cart` | Desktop sidebar + Mobile bottom nav |
| Stock | `package` | Desktop sidebar + Mobile bottom nav |
| Clientes | `users` | Desktop sidebar + Mobile bottom nav |
| Productos | `box` | Desktop sidebar + Mobile bottom nav |
| Fórmulas | `flask-conical` | Desktop sidebar |
| Reportes | `bar-chart-2` | Desktop sidebar |
| Tienda | `store` | Desktop sidebar |
| Usuarios | `user-circle` | Desktop sidebar |
| Configuración | `settings` | Desktop sidebar + Mobile bottom nav |

### B — Categorías de producto

| Categoría | Ícono Lucide |
|---|---|
| limpieza | `droplets` |
| industrial | `wrench` |
| fragancias | `wind` |
| (sin categoría / default) | `box` |

Aplica en: tabla de productos, tabla de stock, cards de tienda online, formularios de nuevo/editar producto, reportes.

### A — Favicon

```html
<link rel="icon" href="/logo.png" type="image/png">
```
Se agrega en el `<head>` de ambos HTML.

### C — Avatar de usuario

El avatar "H" se mantiene como inicial pero con estilos limpios: círculo con fondo degradado `#1E3A5F → #2E86AB`, letra blanca, fuente Inter 700. Sin cambios estructurales — solo limpieza visual del CSS existente.

---

## CSS base para íconos Lucide

```css
.lucide-icon {
  width: 18px; height: 18px;
  stroke: currentColor; stroke-width: 1.5;
  fill: none; stroke-linecap: round; stroke-linejoin: round;
  flex-shrink: 0;
}
.lucide-icon-sm { width: 14px; height: 14px; }
.lucide-icon-lg { width: 20px; height: 20px; }
```

Los íconos de sidebar heredan el color del `.sb-item` (blanco semitransparente / blanco activo).  
Los íconos de producto usan el color del contenedor (gris neutro `#64748B`).

---

## Qué NO cambia

- El logo ONS Química PNG en sidebar desktop y topbar mobile — ya está bien
- Los colores y layout de navegación — solo se reemplazan los emojis
- Los emojis dentro de los DATA arrays (son datos, no UI) — se ignoran
- Los emojis en selectores de "tipo de ícono" de formularios — se ignoran

---

## Orden de implementación

1. Agregar CDN Lucide + CSS base en ambos HTML
2. Favicon en ambos HTML
3. Íconos de navegación — desktop sidebar
4. Íconos de navegación — mobile bottom nav
5. Íconos de categoría de producto — desktop
6. Íconos de categoría de producto — mobile
7. Llamar `lucide.createIcons()` en el init de ambos
