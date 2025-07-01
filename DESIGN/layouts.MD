# 📐 Layouts & Mise en Page - Spread Design System

_Système de mise en page moderne inspiré des tendances Fintech UX 2025_

## 🌐 Grid System

### Container Principal

```css
/* Container responsive avec max-width adaptatif */
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

/* Breakpoints modernes */
@media (min-width: 640px) {
  .container {
    max-width: 640px;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
    padding-left: 2.5rem;
    padding-right: 2.5rem;
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
    padding-left: 3rem;
    padding-right: 3rem;
  }
}

@media (min-width: 1536px) {
  .container {
    max-width: 1536px;
  }
}
```

### Grid Flexible

```css
/* Grid 12 colonnes responsive */
.grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(12, 1fr);
}

/* Variations de gap */
.grid-tight {
  gap: 0.75rem;
}
.grid-normal {
  gap: 1.5rem;
}
.grid-loose {
  gap: 2.5rem;
}
.grid-relaxed {
  gap: 4rem;
}

/* Colonnes utilitaires */
.col-1 {
  grid-column: span 1;
}
.col-2 {
  grid-column: span 2;
}
.col-3 {
  grid-column: span 3;
}
.col-4 {
  grid-column: span 4;
}
.col-6 {
  grid-column: span 6;
}
.col-8 {
  grid-column: span 8;
}
.col-9 {
  grid-column: span 9;
}
.col-12 {
  grid-column: span 12;
}
```

## 📱 Breakpoints Responsive

### Système de Breakpoints

```css
/* Breakpoints Tailwind étendus */
--breakpoint-xs: 475px; /* Extra small devices */
--breakpoint-sm: 640px; /* Small devices */
--breakpoint-md: 768px; /* Medium devices */
--breakpoint-lg: 1024px; /* Large devices */
--breakpoint-xl: 1280px; /* Extra large devices */
--breakpoint-2xl: 1536px; /* 2X Extra large devices */

/* Breakpoints personnalisés pour Spread */
--breakpoint-mobile: 480px;
--breakpoint-tablet: 768px;
--breakpoint-desktop: 1024px;
--breakpoint-wide: 1440px;
--breakpoint-ultra: 1920px;
```

### Media Queries Utilitaires

```css
/* Mobile First Approach */
.mobile-only {
  display: block;
}
.tablet-up {
  display: none;
}
.desktop-up {
  display: none;
}

@media (min-width: 768px) {
  .mobile-only {
    display: none;
  }
  .tablet-up {
    display: block;
  }
}

@media (min-width: 1024px) {
  .desktop-up {
    display: block;
  }
}

/* Grid responsive automatique */
.auto-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .auto-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .auto-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1280px) {
  .auto-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

## 🏗️ Layouts Principaux

### Layout Dashboard

```css
/* Layout principal avec sidebar */
.dashboard-layout {
  display: grid;
  grid-template-areas:
    "sidebar header"
    "sidebar main";
  grid-template-columns: 280px 1fr;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
}

.dashboard-sidebar {
  grid-area: sidebar;
  background: var(--bg-secondary);
  border-right: 1px solid var(--border-light);
}

.dashboard-header {
  grid-area: header;
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-light);
  padding: 1rem 2rem;
}

.dashboard-main {
  grid-area: main;
  padding: 2rem;
  overflow-y: auto;
}

/* Version mobile */
@media (max-width: 1023px) {
  .dashboard-layout {
    grid-template-areas:
      "header"
      "main";
    grid-template-columns: 1fr;
  }

  .dashboard-sidebar {
    position: fixed;
    left: -280px;
    top: 0;
    height: 100vh;
    z-index: 50;
    transition: left 0.3s ease;
  }

  .dashboard-sidebar.open {
    left: 0;
  }
}
```

### Layout Centré

```css
/* Layout pour pages de contenu */
.centered-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.centered-header {
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-light);
  padding: 1rem 0;
}

.centered-main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.centered-content {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
}
```

### Layout Deux Colonnes

```css
/* Layout pour pages de détail */
.two-column-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  padding: 2rem;
}

.main-content {
  min-width: 0; /* Permet au contenu de se rétrécir */
}

.sidebar-content {
  background: var(--bg-secondary);
  border-radius: var(--radius-card);
  padding: 1.5rem;
}

@media (max-width: 1023px) {
  .two-column-layout {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
```

## 📄 Composants de Layout

### Header Moderne

```css
.modern-header {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 40;
  padding: 1rem 0;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: between;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

.header-nav {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}
```

### Sidebar Adaptative

```css
.adaptive-sidebar {
  width: 280px;
  background: var(--bg-primary);
  border-right: 1px solid var(--border-light);
  transition: all 0.3s ease;
}

.sidebar-collapsed {
  width: 80px;
}

.sidebar-nav {
  padding: 1rem;
}

.sidebar-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
}

.sidebar-item:hover {
  background: var(--bg-secondary);
}

.sidebar-item.active {
  background: var(--spread-primary);
  color: white;
}

/* Animation du texte lors du collapse */
.sidebar-collapsed .sidebar-text {
  opacity: 0;
  width: 0;
  overflow: hidden;
}
```

### Footer Moderne

```css
.modern-footer {
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-light);
  padding: 3rem 0 2rem;
  margin-top: auto;
}

.footer-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-bottom {
  border-top: 1px solid var(--border-light);
  padding-top: 2rem;
  display: flex;
  justify-content: between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}
```

## 🎯 Patterns de Layout Spécialisés

### Card Grid Responsive

```css
.card-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
}

.card-grid-dense {
  grid-auto-rows: masonry; /* Futur CSS Masonry */
}

/* Fallback pour Masonry */
.card-grid-masonry {
  columns: 1;
  column-gap: 1.5rem;
}

@media (min-width: 640px) {
  .card-grid-masonry {
    columns: 2;
  }
}

@media (min-width: 1024px) {
  .card-grid-masonry {
    columns: 3;
  }
}

@media (min-width: 1280px) {
  .card-grid-masonry {
    columns: 4;
  }
}

.card-grid-masonry .card {
  break-inside: avoid;
  margin-bottom: 1.5rem;
}
```

### Hero Section

```css
.hero-section {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  background: linear-gradient(
    135deg,
    var(--spread-primary-start),
    var(--spread-primary-end)
  );
  color: white;
  text-align: center;
  padding: 4rem 2rem;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1.5rem;
}

.hero-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 2rem;
}

@media (max-width: 767px) {
  .hero-title {
    font-size: 2.5rem;
  }
  .hero-subtitle {
    font-size: 1.125rem;
  }
}
```

### Stats Grid

```css
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-card);
  padding: 1.5rem;
  text-align: center;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--spread-primary);
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

## 🌟 Tendances 2025 Appliquées

### Glassmorphism Layout

```css
.glass-container {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-2xl);
  padding: 2rem;
}

.glass-sidebar {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(40px);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}
```

### Bento Box Layout

```css
/* Layout en grille asymétrique */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 200px);
  gap: 1rem;
}

.bento-item-large {
  grid-column: span 2;
  grid-row: span 2;
}

.bento-item-wide {
  grid-column: span 2;
  grid-row: span 1;
}

.bento-item-tall {
  grid-column: span 1;
  grid-row: span 2;
}

.bento-item {
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-card);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media (max-width: 1023px) {
  .bento-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .bento-item-large,
  .bento-item-wide {
    grid-column: span 2;
    grid-row: span 1;
  }
}

@media (max-width: 639px) {
  .bento-grid {
    grid-template-columns: 1fr;
  }

  .bento-item-large,
  .bento-item-wide,
  .bento-item-tall {
    grid-column: span 1;
    grid-row: span 1;
  }
}
```

### Floating Action Layout

```css
.floating-actions {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 50;
}

.floating-btn {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-full);
  background: var(--spread-primary);
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.floating-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
}
```

## 📐 Espacements & Rythme

### Système d'Espacement Vertical

```css
/* Rythme vertical basé sur 1.5rem (24px) */
.section-spacing {
  margin-bottom: 6rem; /* 4 * 1.5rem */
}

.component-spacing {
  margin-bottom: 3rem; /* 2 * 1.5rem */
}

.element-spacing {
  margin-bottom: 1.5rem; /* 1 * 1.5rem */
}

.tight-spacing {
  margin-bottom: 0.75rem; /* 0.5 * 1.5rem */
}
```

### Conteneurs avec Contraintes

```css
/* Largeurs maximales pour la lisibilité */
.prose-container {
  max-width: 65ch; /* Optimal pour la lecture */
  margin: 0 auto;
}

.form-container {
  max-width: 480px;
  margin: 0 auto;
}

.content-container {
  max-width: 800px;
  margin: 0 auto;
}

.wide-container {
  max-width: 1200px;
  margin: 0 auto;
}
```

## 🔍 Accessibilité Layout

### Focus Management

```css
/* Zones de focus visibles */
.focus-container {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.focus-container:focus-within {
  outline-color: var(--spread-primary);
}

/* Skip links */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--spread-primary);
  color: white;
  padding: 8px;
  border-radius: var(--radius-md);
  text-decoration: none;
  z-index: 100;
}

.skip-link:focus {
  top: 6px;
}
```

### Responsive Text Scaling

```css
/* Adaptation des tailles selon l'appareil */
@media (max-width: 639px) {
  .responsive-text {
    font-size: 0.875rem;
    line-height: 1.5;
  }
}

@media (min-width: 640px) {
  .responsive-text {
    font-size: 1rem;
    line-height: 1.6;
  }
}

/* Respect des préférences utilisateur */
@media (prefers-reduced-motion: reduce) {
  .animated-layout {
    transition: none;
    animation: none;
  }
}
```
