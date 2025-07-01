# 🔲 Formes & Géométrie - Spread Design System

_Système de formes modernes inspiré des tendances Fintech UX 2025_

## 🌊 Rayons de Bordure

### Système de Border Radius

```css
/* Échelle harmonieuse pour les coins arrondis */
--radius-none: 0px;
--radius-xs: 2px;
--radius-sm: 4px;
--radius-md: 6px; /* Valeur de base */
--radius-lg: 8px;
--radius-xl: 12px;
--radius-2xl: 16px;
--radius-3xl: 24px;
--radius-full: 9999px; /* Cercle parfait */

/* Rayons spécialisés */
--radius-button: 8px; /* Boutons standards */
--radius-card: 12px; /* Cartes et conteneurs */
--radius-modal: 16px; /* Modales et overlays */
--radius-input: 6px; /* Champs de formulaire */
```

### Classes Tailwind Correspondantes

```css
.rounded-none {
  border-radius: 0px;
}
.rounded-xs {
  border-radius: 2px;
}
.rounded-sm {
  border-radius: 4px;
}
.rounded {
  border-radius: 6px;
} /* Défaut */
.rounded-md {
  border-radius: 6px;
}
.rounded-lg {
  border-radius: 8px;
}
.rounded-xl {
  border-radius: 12px;
}
.rounded-2xl {
  border-radius: 16px;
}
.rounded-3xl {
  border-radius: 24px;
}
.rounded-full {
  border-radius: 9999px;
}
```

## 🎯 Composants & Leurs Formes

### Boutons

```css
/* Bouton Primary */
.btn-primary {
  border-radius: var(--radius-button); /* 8px */
  padding: 12px 24px;
}

/* Bouton Small */
.btn-small {
  border-radius: var(--radius-md); /* 6px */
  padding: 8px 16px;
}

/* Bouton Large */
.btn-large {
  border-radius: var(--radius-lg); /* 8px */
  padding: 16px 32px;
}

/* Bouton Icon */
.btn-icon {
  border-radius: var(--radius-lg); /* 8px */
  width: 40px;
  height: 40px;
  padding: 0;
}

/* Bouton Pill */
.btn-pill {
  border-radius: var(--radius-full); /* Cercle */
  padding: 12px 24px;
}
```

### Champs de Formulaire

```css
/* Input Standard */
.input {
  border-radius: var(--radius-input); /* 6px */
  padding: 12px 16px;
  height: 44px;
}

/* Input Large */
.input-lg {
  border-radius: var(--radius-lg); /* 8px */
  padding: 16px 20px;
  height: 52px;
}

/* Input Small */
.input-sm {
  border-radius: var(--radius-sm); /* 4px */
  padding: 8px 12px;
  height: 36px;
}

/* Textarea */
.textarea {
  border-radius: var(--radius-input); /* 6px */
  padding: 12px 16px;
  min-height: 88px;
}

/* Select */
.select {
  border-radius: var(--radius-input); /* 6px */
  padding: 12px 16px;
  height: 44px;
}
```

### Cartes & Conteneurs

```css
/* Carte Standard */
.card {
  border-radius: var(--radius-card); /* 12px */
  padding: 24px;
}

/* Carte Compacte */
.card-compact {
  border-radius: var(--radius-lg); /* 8px */
  padding: 16px;
}

/* Carte Élevée */
.card-elevated {
  border-radius: var(--radius-2xl); /* 16px */
  padding: 32px;
}

/* Container Principal */
.container {
  border-radius: var(--radius-xl); /* 12px */
  padding: 24px;
}
```

### Modales & Overlays

```css
/* Modale */
.modal {
  border-radius: var(--radius-modal); /* 16px */
  padding: 32px;
  max-width: 500px;
}

/* Dropdown */
.dropdown {
  border-radius: var(--radius-lg); /* 8px */
  padding: 8px;
}

/* Tooltip */
.tooltip {
  border-radius: var(--radius-md); /* 6px */
  padding: 8px 12px;
}

/* Popover */
.popover {
  border-radius: var(--radius-xl); /* 12px */
  padding: 16px;
}
```

## 🎨 Éléments Visuels

### Badges & Tags

```css
/* Badge Standard */
.badge {
  border-radius: var(--radius-md); /* 6px */
  padding: 4px 8px;
  font-size: 12px;
}

/* Badge Pill */
.badge-pill {
  border-radius: var(--radius-full); /* Cercle */
  padding: 4px 12px;
}

/* Tag */
.tag {
  border-radius: var(--radius-sm); /* 4px */
  padding: 6px 10px;
}
```

### Avatars & Images

```css
/* Avatar Rond */
.avatar {
  border-radius: var(--radius-full); /* Cercle */
  width: 40px;
  height: 40px;
}

/* Avatar Carré */
.avatar-square {
  border-radius: var(--radius-lg); /* 8px */
  width: 40px;
  height: 40px;
}

/* Image Thumbnail */
.thumbnail {
  border-radius: var(--radius-md); /* 6px */
  width: 64px;
  height: 64px;
  object-fit: cover;
}
```

### Navigation & Tabs

```css
/* Tab Active */
.tab-active {
  border-radius: var(--radius-md); /* 6px */
  padding: 8px 16px;
}

/* Menu Item */
.menu-item {
  border-radius: var(--radius-sm); /* 4px */
  padding: 8px 12px;
}

/* Breadcrumb */
.breadcrumb-item {
  border-radius: var(--radius-sm); /* 4px */
  padding: 4px 8px;
}
```

## 📐 Espacements & Padding

### Système d'Espacement

```css
/* Échelle d'espacement harmonieuse */
--space-0: 0px;
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
--space-32: 128px;
```

### Paddings par Composant

```css
/* Boutons */
.btn-padding-sm {
  padding: var(--space-2) var(--space-4);
} /* 8px 16px */
.btn-padding {
  padding: var(--space-3) var(--space-6);
} /* 12px 24px */
.btn-padding-lg {
  padding: var(--space-4) var(--space-8);
} /* 16px 32px */

/* Cartes */
.card-padding-sm {
  padding: var(--space-4);
} /* 16px */
.card-padding {
  padding: var(--space-6);
} /* 24px */
.card-padding-lg {
  padding: var(--space-8);
} /* 32px */

/* Inputs */
.input-padding-sm {
  padding: var(--space-2) var(--space-3);
} /* 8px 12px */
.input-padding {
  padding: var(--space-3) var(--space-4);
} /* 12px 16px */
.input-padding-lg {
  padding: var(--space-4) var(--space-5);
} /* 16px 20px */
```

## 🎯 Formes Spécialisées

### Barres de Progression

```css
/* Barre de progression */
.progress-bar {
  border-radius: var(--radius-full); /* Cercle */
  height: 8px;
  overflow: hidden;
}

.progress-bar-thick {
  border-radius: var(--radius-full); /* Cercle */
  height: 12px;
  overflow: hidden;
}

/* Barre de progression carrée */
.progress-bar-square {
  border-radius: var(--radius-sm); /* 4px */
  height: 8px;
  overflow: hidden;
}
```

### Séparateurs

```css
/* Divider horizontal */
.divider-h {
  height: 1px;
  border-radius: var(--radius-full);
  background: var(--border-light);
}

/* Divider vertical */
.divider-v {
  width: 1px;
  border-radius: var(--radius-full);
  background: var(--border-light);
}
```

### Indicateurs

```css
/* Dot indicator */
.dot {
  border-radius: var(--radius-full); /* Cercle */
  width: 8px;
  height: 8px;
}

/* Status indicator */
.status-indicator {
  border-radius: var(--radius-full); /* Cercle */
  width: 12px;
  height: 12px;
  border: 2px solid white;
}
```

## 📱 Adaptations Responsive

### Breakpoints & Formes

```css
/* Mobile - Rayons plus petits */
@media (max-width: 640px) {
  .card {
    border-radius: var(--radius-lg);
  } /* 8px au lieu de 12px */
  .modal {
    border-radius: var(--radius-xl);
  } /* 12px au lieu de 16px */
  .btn {
    border-radius: var(--radius-md);
  } /* 6px au lieu de 8px */
}

/* Desktop - Rayons plus généreux */
@media (min-width: 1024px) {
  .card-hero {
    border-radius: var(--radius-3xl);
  } /* 24px pour les grandes cartes */
  .container-main {
    border-radius: var(--radius-2xl);
  } /* 16px pour les containers */
}
```

## 🌟 Tendances 2025 Appliquées

### Geometric Harmony

```css
/* Proportions dorées dans les formes */
.golden-card {
  border-radius: var(--radius-card);
  aspect-ratio: 1.618; /* Ratio doré */
}

/* Formes organiques subtiles */
.organic-shape {
  border-radius: 12px 24px 12px 24px; /* Asymétrie contrôlée */
}
```

### Micro-interactions

```css
/* Formes qui s'adaptent au hover */
.interactive-card {
  border-radius: var(--radius-card);
  transition: border-radius 0.3s ease;
}

.interactive-card:hover {
  border-radius: var(--radius-2xl);
}

/* Morphing buttons */
.morph-btn {
  border-radius: var(--radius-button);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.morph-btn:hover {
  border-radius: var(--radius-full);
  transform: scale(1.05);
}
```

### Glassmorphism Elements

```css
/* Surfaces en verre */
.glass-surface {
  border-radius: var(--radius-2xl);
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Cards flottantes */
.floating-card {
  border-radius: var(--radius-3xl);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05);
}
```

## 🎨 Classes Utilitaires Personnalisées

### Formes Complexes

```css
/* Classes Tailwind étendues */
.rounded-tl-2xl {
  border-top-left-radius: 16px;
}
.rounded-tr-2xl {
  border-top-right-radius: 16px;
}
.rounded-bl-2xl {
  border-bottom-left-radius: 16px;
}
.rounded-br-2xl {
  border-bottom-right-radius: 16px;
}

/* Formes asymétriques */
.rounded-organic-1 {
  border-radius: 12px 24px 12px 24px;
}
.rounded-organic-2 {
  border-radius: 24px 12px 24px 12px;
}
.rounded-organic-3 {
  border-radius: 16px 32px 8px 24px;
}
```

### Combinaisons Courantes

```css
/* Card avec header arrondi */
.card-with-header {
  border-radius: var(--radius-card);
}

.card-header {
  border-radius: var(--radius-card) var(--radius-card) 0 0;
  margin: -24px -24px 24px -24px;
  padding: 24px;
}

/* Input group */
.input-group-start {
  border-radius: var(--radius-input) 0 0 var(--radius-input);
}

.input-group-end {
  border-radius: 0 var(--radius-input) var(--radius-input) 0;
}
```

## 🔍 Accessibilité & Formes

### Zones de Clic

```css
/* Tailles minimales pour l'accessibilité */
.touch-target {
  min-width: 44px;
  min-height: 44px;
  border-radius: var(--radius-lg);
}

/* Focus visible */
.focus-ring {
  outline: 2px solid var(--spread-primary);
  outline-offset: 2px;
  border-radius: calc(var(--radius-lg) + 2px);
}
```

### Contraste & Bordures

```css
/* Bordures pour le contraste */
.bordered-shape {
  border: 1px solid var(--border-light);
  border-radius: var(--radius-card);
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .card {
    border: 2px solid var(--border-strong);
    border-radius: var(--radius-lg); /* Rayons plus nets */
  }
}
```
