# Íconos Lucide Profesionales — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reemplazar todos los emojis y placeholders genéricos de navegación y productos por íconos SVG Lucide minimalistas profesionales en desktop y mobile.

**Architecture:** Se agrega el CDN de Lucide a ambos HTML. Un helper `getCategoryIcon(cat)` mapea categorías a nombres de íconos. Las funciones de render dinámico se actualizan para emitir `<i data-lucide="...">` en lugar de emojis. Se llama `lucide.createIcons()` al final de cada ciclo de render.

**Tech Stack:** Lucide Icons (CDN unpkg), HTML/JS inline, Git

## Global Constraints

- Archivos a modificar: `public/desktop/index.html` y `public/mobile/index.html`
- CDN: `https://unpkg.com/lucide@latest` — agregar antes de `</head>` en ambos
- Clase base: `lucide-icon` (18×18px, stroke 1.5, fill none)
- Los campos `emoji` en DATA_PRODUCTOS NO se modifican (son datos, no UI)
- Después de cada `innerHTML =` que incluya `data-lucide`, llamar `lucide.createIcons()`
- Ruta raíz del proyecto: `C:\Users\Gyver\Desktop\CARPETAS\- JERE\PROYECTO HUGO\ons-server\`

---

### Task 1: Setup — CDN, CSS y Favicon (ambos HTML)

**Files:**
- Modify: `public/desktop/index.html` (línea 267-268, cerca de `</style></head>`)
- Modify: `public/mobile/index.html` (línea 282-283, cerca de `</style></head>`)

**Interfaces:**
- Produce: clases `.lucide-icon`, `.lucide-icon-sm`, `.lucide-icon-lg` disponibles en todo el DOM; `lucide` objeto global disponible; favicon visible en pestaña

- [ ] **Step 1: Agregar CDN + favicon + CSS en desktop**

Buscar en `public/desktop/index.html` la línea `</style>\n</head>` y reemplazar con:

```html
  /* ─── LUCIDE ICONS ─── */
  .lucide-icon { width:18px; height:18px; stroke:currentColor; stroke-width:1.5; fill:none; stroke-linecap:round; stroke-linejoin:round; flex-shrink:0; display:block; }
  .lucide-icon-sm { width:14px; height:14px; }
  .lucide-icon-lg { width:22px; height:22px; }
  .sb-icon { font-size:0; width:20px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
</style>
<link rel="icon" href="/logo.png" type="image/png">
<script src="https://unpkg.com/lucide@latest"></script>
</head>
```

- [ ] **Step 2: Agregar CDN + favicon + CSS en mobile**

Buscar en `public/mobile/index.html` el bloque que termina `</style>\n</head>` y agregar antes del cierre:

```html
  /* ─── LUCIDE ICONS ─── */
  .lucide-icon { width:18px; height:18px; stroke:currentColor; stroke-width:1.5; fill:none; stroke-linecap:round; stroke-linejoin:round; flex-shrink:0; display:block; }
  .lucide-icon-sm { width:14px; height:14px; }
  .lucide-icon-lg { width:22px; height:22px; }
  .m-nav-icon { width:20px; height:20px; display:flex; align-items:center; justify-content:center; }
</style>
<link rel="icon" href="/logo.png" type="image/png">
<script src="https://unpkg.com/lucide@latest"></script>
</head>
```

- [ ] **Step 3: Verificar que Lucide carga**

Abrir `public/desktop/index.html` en el navegador (con el servidor corriendo en localhost:3000).  
Abrir consola del browser → escribir `lucide` → debe mostrar el objeto, no `undefined`.

- [ ] **Step 4: Commit**

```powershell
cd "C:\Users\Gyver\Desktop\CARPETAS\- JERE\PROYECTO HUGO\ons-server"
git add public/desktop/index.html public/mobile/index.html
git commit -m "feat: agregar Lucide CDN, CSS base y favicon"
```

---

### Task 2: Desktop — Íconos de navegación en sidebar

**Files:**
- Modify: `public/desktop/index.html` líneas 277-286 (sidebar nav items)
- Modify: `public/desktop/index.html` línea 3763 (fin del init)

**Interfaces:**
- Consumes: CDN Lucide de Task 1
- Produce: sidebar con íconos SVG; `lucide.createIcons()` llamado en init

- [ ] **Step 1: Reemplazar los 10 items del sidebar**

Buscar el bloque `<div class="sb-nav">` con los 10 items y reemplazar completo:

```html
  <div class="sb-nav">
    <div class="sb-item active" data-section="dashboard" onclick="showSection('dashboard')"><i data-lucide="layout-dashboard" class="lucide-icon sb-icon"></i>Dashboard</div>
    <div class="sb-item" data-section="ventas" onclick="showSection('ventas')"><i data-lucide="shopping-cart" class="lucide-icon sb-icon"></i>Ventas</div>
    <div class="sb-item" data-section="stock" onclick="showSection('stock')"><i data-lucide="package" class="lucide-icon sb-icon"></i>Stock</div>
    <div class="sb-item" data-section="clientes" onclick="showSection('clientes')"><i data-lucide="users" class="lucide-icon sb-icon"></i>Clientes</div>
    <div class="sb-item" data-section="productos" onclick="showSection('productos')"><i data-lucide="box" class="lucide-icon sb-icon"></i>Productos</div>
    <div class="sb-item" data-section="formulas" onclick="showSection('formulas')"><i data-lucide="flask-conical" class="lucide-icon sb-icon"></i>Fórmulas</div>
    <div class="sb-item" data-section="reportes" onclick="showSection('reportes')"><i data-lucide="bar-chart-2" class="lucide-icon sb-icon"></i>Reportes</div>
    <div class="sb-item" data-section="tienda" onclick="showSection('tienda')"><i data-lucide="store" class="lucide-icon sb-icon"></i>Tienda</div>
    <div class="sb-item" data-section="usuarios" onclick="showSection('usuarios')"><i data-lucide="user-circle" class="lucide-icon sb-icon"></i>Usuarios</div>
    <div class="sb-item" data-section="config" onclick="showSection('config')"><i data-lucide="settings" class="lucide-icon sb-icon"></i>Configuración</div>
  </div>
```

- [ ] **Step 2: Agregar `lucide.createIcons()` al final del init desktop**

Buscar el bloque:
```js
  actualizarBadge();
  const savedSection = localStorage.getItem('ons_section') || 'dashboard';
  showSection(savedSection);
})();
```

Reemplazar con:
```js
  actualizarBadge();
  const savedSection = localStorage.getItem('ons_section') || 'dashboard';
  showSection(savedSection);
  if (typeof lucide !== 'undefined') lucide.createIcons();
})();
```

- [ ] **Step 3: Verificar**

Abrir `http://localhost:3000` en PC. El sidebar debe mostrar los íconos SVG en lugar de emojis. Deben ser blancos semitransparentes, y el ítem activo debe mostrarse blanco sólido.

- [ ] **Step 4: Commit**

```powershell
git add public/desktop/index.html
git commit -m "feat: iconos Lucide en sidebar desktop"
```

---

### Task 3: Mobile — Íconos de navegación en bottom nav

**Files:**
- Modify: `public/mobile/index.html` líneas 2729-2750 (bottom nav)
- Modify: `public/mobile/index.html` línea 3293 (DOMContentLoaded)

**Interfaces:**
- Consumes: CDN Lucide de Task 1
- Produce: bottom nav con íconos SVG en mobile; `lucide.createIcons()` en DOMContentLoaded

- [ ] **Step 1: Reemplazar los 5 items del bottom nav**

Buscar el bloque `<div class="m-bottom-nav">` y reemplazar completo:

```html
        <div class="m-bottom-nav">
          <div class="m-nav-item active" onclick="showSection('dashboard')">
            <div class="m-nav-active-dot"></div>
            <i data-lucide="layout-dashboard" class="lucide-icon m-nav-icon"></i>
            <div class="m-nav-label" style="color:#2E86AB;">Dashboard</div>
          </div>
          <div class="m-nav-item" onclick="showSection('ventas')">
            <i data-lucide="shopping-cart" class="lucide-icon m-nav-icon"></i>
            <div class="m-nav-label">Ventas</div>
          </div>
          <div class="m-nav-item" onclick="showSection('stock')">
            <i data-lucide="package" class="lucide-icon m-nav-icon"></i>
            <div class="m-nav-label">Stock</div>
          </div>
          <div class="m-nav-item" onclick="showSection('clientes')">
            <i data-lucide="users" class="lucide-icon m-nav-icon"></i>
            <div class="m-nav-label">Clientes</div>
          </div>
          <div class="m-nav-item" onclick="showSection('mas')">
            <i data-lucide="grid-2x2" class="lucide-icon m-nav-icon"></i>
            <div class="m-nav-label">Más</div>
          </div>
        </div>
```

- [ ] **Step 2: Agregar `lucide.createIcons()` en DOMContentLoaded mobile**

Buscar:
```js
window.addEventListener('DOMContentLoaded', () => {
  const noLeidas = M_NOTIFS.filter(n => !_mNotifsLeidas.has(n.id));
  const badge = document.getElementById('m-notif-badge');
  if (badge && noLeidas.length) {
    badge.style.display = 'flex';
    badge.textContent = noLeidas.length;
  }
});
```

Reemplazar con:
```js
window.addEventListener('DOMContentLoaded', () => {
  const noLeidas = M_NOTIFS.filter(n => !_mNotifsLeidas.has(n.id));
  const badge = document.getElementById('m-notif-badge');
  if (badge && noLeidas.length) {
    badge.style.display = 'flex';
    badge.textContent = noLeidas.length;
  }
  if (typeof lucide !== 'undefined') lucide.createIcons();
});
```

- [ ] **Step 3: Verificar**

Abrir `http://localhost:3000/?view=mobile` en PC o desde el celular. El bottom nav debe mostrar íconos SVG en lugar de emojis. El activo aparece en azul `#2E86AB`.

- [ ] **Step 4: Commit**

```powershell
git add public/mobile/index.html
git commit -m "feat: iconos Lucide en bottom nav mobile"
```

---

### Task 4: Desktop — Íconos de categoría de producto

**Files:**
- Modify: `public/desktop/index.html` — funciones `renderProductos`, `renderStock`, `renderTienda`, `renderDashboard` y HTML estático de productos

**Interfaces:**
- Consumes: CDN Lucide de Task 1; `lucide.createIcons()` de Task 2
- Produce: helper `getCategoryIcon(cat)` disponible globalmente; íconos de categoría en todas las tablas de producto

- [ ] **Step 1: Agregar helper `getCategoryIcon` en desktop**

Agregar justo antes de la función `renderProductos` (buscar `function renderProductos`):

```js
function getCategoryIcon(cat) {
  const map = { limpieza: 'droplets', industrial: 'wrench', fragancias: 'wind' };
  return map[(cat||'').toLowerCase()] || 'box';
}
```

- [ ] **Step 2: Actualizar renderProductos para usar íconos**

En la función `renderProductos`, buscar la plantilla que emite filas de productos. Localizar donde aparece `p.emoji` o `emoji` dentro del `.map(p =>` y reemplazar el span/div del emoji con:

```js
`<i data-lucide="${getCategoryIcon(p.categoria)}" class="lucide-icon lucide-icon-lg" style="color:#64748B;flex-shrink:0;"></i>`
```

Después del `document.getElementById('d-productos-body').innerHTML = ...` agregar:
```js
if (typeof lucide !== 'undefined') lucide.createIcons();
```

- [ ] **Step 3: Actualizar renderStock para usar íconos**

En la función `renderStock` (o `renderDStock`), localizar donde se usa `p.emoji` en el template HTML y reemplazar con:
```js
`<i data-lucide="${getCategoryIcon(p.categoria)}" class="lucide-icon" style="color:#64748B;"></i>`
```

Después del `innerHTML =` agregar:
```js
if (typeof lucide !== 'undefined') lucide.createIcons();
```

- [ ] **Step 4: Actualizar renderTienda para usar íconos**

Mismo patrón en la función `renderTienda`:
- Reemplazar `p.emoji` con el `<i data-lucide="${getCategoryIcon(p.categoria)}" ...></i>`
- Agregar `lucide.createIcons()` después del `innerHTML =`

- [ ] **Step 5: Verificar en browser**

Abrir `http://localhost:3000` → ir a Productos, Stock y Tienda. Las filas deben mostrar íconos SVG grises en lugar de emojis de producto.

- [ ] **Step 6: Commit**

```powershell
git add public/desktop/index.html
git commit -m "feat: iconos de categoria en tablas de producto desktop"
```

---

### Task 5: Mobile — Íconos de categoría en HTML estático

**Files:**
- Modify: `public/mobile/index.html` — referencias estáticas a emojis de producto en listas y cards

**Interfaces:**
- Consumes: CDN Lucide de Task 1; `lucide.createIcons()` de Task 3
- Produce: íconos SVG de categoría en todas las pantallas mobile donde aparecían emojis de producto

- [ ] **Step 1: Reemplazar emojis estáticos de producto en mobile**

La mobile usa HTML estático (no render functions). Buscar todas las ocurrencias del patrón `<span>🧴</span>`, `<span style="font-size:...">🧴</span>`, y variaciones similares con 🌸, 🍋, etc.

Usar PowerShell para identificar las líneas:
```powershell
Select-String -Path "public\mobile\index.html" -Pattern "🧴|🌸|🍋|🧪|🔧" | Select-Object LineNumber, Line | Format-Table -Wrap
```

Para cada ocurrencia de emoji de producto, reemplazar el elemento que lo contiene con el ícono correspondiente. Patrón general:

- `🧴` (lavandina/limpieza) → `<i data-lucide="droplets" class="lucide-icon lucide-icon-lg" style="color:#64748B;"></i>`
- `🌸` (fragancias) → `<i data-lucide="wind" class="lucide-icon lucide-icon-lg" style="color:#64748B;"></i>`
- `🍋` (limpieza) → `<i data-lucide="droplets" class="lucide-icon lucide-icon-lg" style="color:#64748B;"></i>`
- `🔧` (industrial) → `<i data-lucide="wrench" class="lucide-icon lucide-icon-lg" style="color:#64748B;"></i>`
- `✨` (cera/industrial) → `<i data-lucide="wrench" class="lucide-icon lucide-icon-lg" style="color:#64748B;"></i>`

- [ ] **Step 2: Verificar**

Abrir `http://localhost:3000/?view=mobile`. Navegar a Stock, Productos, Ventas — los emojis de producto deben ser íconos SVG grises.

- [ ] **Step 3: Commit**

```powershell
git add public/mobile/index.html
git commit -m "feat: iconos de categoria en pantallas mobile"
```

---

### Task 6: Push a Railway

**Files:** ninguno nuevo

- [ ] **Step 1: Push**

```powershell
cd "C:\Users\Gyver\Desktop\CARPETAS\- JERE\PROYECTO HUGO\ons-server"
git push origin main
```

- [ ] **Step 2: Verificar en Railway**

Esperar ~30 segundos. Abrir `https://ons-quimica-production.up.railway.app` desde PC y desde celular.

Verificar:
- Pestaña del browser muestra el logo de ONS Química (favicon) ✓
- Sidebar desktop muestra íconos SVG de línea fina ✓
- Bottom nav mobile muestra íconos SVG ✓
- Tablas de productos/stock muestran íconos de categoría ✓
