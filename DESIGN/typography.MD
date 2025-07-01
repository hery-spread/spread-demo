# ✍️ Typographie - Spread Design System

_Hiérarchie typographique moderne inspirée des tendances Fintech UX 2025_

## 🔤 Familles de Police

### Police Principale - Inter

```css
/* Famille principale - Optimisée pour les interfaces */
font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
  "Ubuntu", "Cantarell", sans-serif;

/* Fallbacks système */
--font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
--font-system: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
```

### Police Monospace - JetBrains Mono

```css
/* Pour le code et les données techniques */
--font-mono: "JetBrains Mono", "Fira Code", "Monaco", "Cascadia Code", monospace;
```

### Police Display - Cal Sans (Optionnel)

```css
/* Pour les titres héroïques et branding */
--font-display: "Cal Sans", "Inter", ui-sans-serif, system-ui, sans-serif;
```

## 📏 Échelle Typographique

### Tailles - Système Modulaire 1.25 (Major Third)

```css
/* Échelle harmonieuse basée sur le ratio 1.25 */
--text-xs: 0.75rem; /* 12px */
--text-sm: 0.875rem; /* 14px */
--text-base: 1rem; /* 16px - Taille de base */
--text-lg: 1.125rem; /* 18px */
--text-xl: 1.25rem; /* 20px */
--text-2xl: 1.5rem; /* 24px */
--text-3xl: 1.875rem; /* 30px */
--text-4xl: 2.25rem; /* 36px */
--text-5xl: 3rem; /* 48px */
--text-6xl: 3.75rem; /* 60px */
--text-7xl: 4.5rem; /* 72px */
```

### Poids de Police

```css
/* Gamme étendue pour expressivité */
--font-thin: 100;
--font-extralight: 200;
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
--font-black: 900;
```

## 📝 Hiérarchie des Titres

### H1 - Titre Principal

```css
.text-h1 {
  font-size: 3rem; /* 48px */
  font-weight: 700; /* Bold */
  line-height: 1.1; /* 52.8px */
  letter-spacing: -0.025em; /* -0.4px */
  color: var(--text-primary);
}

/* Responsive */
@media (max-width: 640px) {
  .text-h1 {
    font-size: 2.25rem;
  } /* 36px sur mobile */
}
```

### H2 - Titre Section

```css
.text-h2 {
  font-size: 2.25rem; /* 36px */
  font-weight: 600; /* Semibold */
  line-height: 1.2; /* 43.2px */
  letter-spacing: -0.025em; /* -0.36px */
  color: var(--text-primary);
}

@media (max-width: 640px) {
  .text-h2 {
    font-size: 1.875rem;
  } /* 30px sur mobile */
}
```

### H3 - Titre Sous-section

```css
.text-h3 {
  font-size: 1.875rem; /* 30px */
  font-weight: 600; /* Semibold */
  line-height: 1.3; /* 39px */
  letter-spacing: -0.015em; /* -0.3px */
  color: var(--text-primary);
}
```

### H4 - Titre Composant

```css
.text-h4 {
  font-size: 1.5rem; /* 24px */
  font-weight: 600; /* Semibold */
  line-height: 1.4; /* 33.6px */
  letter-spacing: -0.01em; /* -0.24px */
  color: var(--text-primary);
}
```

### H5 - Titre Carte

```css
.text-h5 {
  font-size: 1.25rem; /* 20px */
  font-weight: 600; /* Semibold */
  line-height: 1.4; /* 28px */
  letter-spacing: -0.005em; /* -0.1px */
  color: var(--text-primary);
}
```

### H6 - Titre Petit

```css
.text-h6 {
  font-size: 1.125rem; /* 18px */
  font-weight: 600; /* Semibold */
  line-height: 1.4; /* 25.2px */
  letter-spacing: 0;
  color: var(--text-primary);
}
```

## 📄 Texte de Corps

### Body Large

```css
.text-body-lg {
  font-size: 1.125rem; /* 18px */
  font-weight: 400; /* Normal */
  line-height: 1.6; /* 28.8px */
  letter-spacing: 0;
  color: var(--text-secondary);
}
```

### Body Normal

```css
.text-body {
  font-size: 1rem; /* 16px */
  font-weight: 400; /* Normal */
  line-height: 1.6; /* 25.6px */
  letter-spacing: 0;
  color: var(--text-secondary);
}
```

### Body Small

```css
.text-body-sm {
  font-size: 0.875rem; /* 14px */
  font-weight: 400; /* Normal */
  line-height: 1.5; /* 21px */
  letter-spacing: 0;
  color: var(--text-secondary);
}
```

## 🏷️ Texte Utilitaire

### Caption

```css
.text-caption {
  font-size: 0.75rem; /* 12px */
  font-weight: 500; /* Medium */
  line-height: 1.4; /* 16.8px */
  letter-spacing: 0.025em; /* 0.3px */
  color: var(--text-tertiary);
  text-transform: uppercase;
}
```

### Label

```css
.text-label {
  font-size: 0.875rem; /* 14px */
  font-weight: 500; /* Medium */
  line-height: 1.4; /* 19.6px */
  letter-spacing: 0.01em; /* 0.14px */
  color: var(--text-primary);
}
```

### Overline

```css
.text-overline {
  font-size: 0.75rem; /* 12px */
  font-weight: 600; /* Semibold */
  line-height: 1.3; /* 15.6px */
  letter-spacing: 0.1em; /* 1.2px */
  color: var(--text-tertiary);
  text-transform: uppercase;
}
```

## 🔗 Liens

### Lien Standard

```css
.text-link {
  color: var(--text-link);
  text-decoration: underline;
  text-decoration-color: transparent;
  text-underline-offset: 3px;
  transition: all 0.2s ease;
}

.text-link:hover {
  color: var(--text-link-hover);
  text-decoration-color: currentColor;
}
```

### Lien Subtil

```css
.text-link-subtle {
  color: var(--text-secondary);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: all 0.2s ease;
}

.text-link-subtle:hover {
  color: var(--text-link);
  border-bottom-color: var(--text-link);
}
```

## 🎯 Composants Spécialisés

### Boutons

```css
/* Bouton Primary */
.btn-text {
  font-size: 0.875rem; /* 14px */
  font-weight: 600; /* Semibold */
  line-height: 1.4; /* 19.6px */
  letter-spacing: 0.025em; /* 0.35px */
}

/* Bouton Large */
.btn-lg-text {
  font-size: 1rem; /* 16px */
  font-weight: 600; /* Semibold */
  line-height: 1.4; /* 22.4px */
  letter-spacing: 0.025em; /* 0.4px */
}

/* Bouton Small */
.btn-sm-text {
  font-size: 0.75rem; /* 12px */
  font-weight: 600; /* Semibold */
  line-height: 1.4; /* 16.8px */
  letter-spacing: 0.05em; /* 0.6px */
}
```

### Tableaux

```css
/* En-têtes de tableau */
.table-header {
  font-size: 0.75rem; /* 12px */
  font-weight: 600; /* Semibold */
  line-height: 1.4; /* 16.8px */
  letter-spacing: 0.05em; /* 0.6px */
  color: var(--text-tertiary);
  text-transform: uppercase;
}

/* Cellules de tableau */
.table-cell {
  font-size: 0.875rem; /* 14px */
  font-weight: 400; /* Normal */
  line-height: 1.5; /* 21px */
  color: var(--text-secondary);
}
```

### Formulaires

```css
/* Labels de formulaire */
.form-label {
  font-size: 0.875rem; /* 14px */
  font-weight: 500; /* Medium */
  line-height: 1.4; /* 19.6px */
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

/* Placeholder */
.form-placeholder {
  color: var(--text-quaternary);
  font-style: italic;
}

/* Messages d'erreur */
.form-error {
  font-size: 0.75rem; /* 12px */
  font-weight: 400; /* Normal */
  line-height: 1.4; /* 16.8px */
  color: var(--error-600);
}

/* Messages d'aide */
.form-help {
  font-size: 0.75rem; /* 12px */
  font-weight: 400; /* Normal */
  line-height: 1.4; /* 16.8px */
  color: var(--text-tertiary);
}
```

## 📱 Responsive Typography

### Breakpoints

```css
/* Mobile First Approach */
.responsive-title {
  font-size: 1.875rem; /* 30px - Mobile */
  line-height: 1.2;
}

@media (min-width: 640px) {
  .responsive-title {
    font-size: 2.25rem; /* 36px - Tablet */
  }
}

@media (min-width: 1024px) {
  .responsive-title {
    font-size: 3rem; /* 48px - Desktop */
  }
}
```

## 🎨 Classes Tailwind Utilitaires

### Tailles Courantes

```css
/* Classes Tailwind personnalisées */
.text-display-lg {
  @apply text-6xl font-bold leading-tight tracking-tight;
}
.text-display {
  @apply text-5xl font-bold leading-tight tracking-tight;
}
.text-display-sm {
  @apply text-4xl font-semibold leading-tight tracking-tight;
}

.text-headline-lg {
  @apply text-3xl font-semibold leading-tight tracking-tight;
}
.text-headline {
  @apply text-2xl font-semibold leading-snug tracking-tight;
}
.text-headline-sm {
  @apply text-xl font-semibold leading-snug;
}

.text-title-lg {
  @apply text-lg font-semibold leading-snug;
}
.text-title {
  @apply text-base font-semibold leading-snug;
}
.text-title-sm {
  @apply text-sm font-semibold leading-snug;
}
```

## 🔍 Accessibilité Typographique

### Recommandations WCAG

- **Taille minimum** : 16px pour le texte de corps
- **Contraste** : 4.5:1 pour texte normal, 3:1 pour texte large
- **Interligne** : Minimum 1.5x la taille de police
- **Espacement** : 0.12x minimum entre les caractères

### Lisibilité Optimisée

```css
/* Amélioration de la lisibilité */
.readable-text {
  font-feature-settings: "kern" 1, "liga" 1, "calt" 1;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

## 📊 Usage Contextuel

### Dashboard & Analytics

- **Métriques** : text-3xl + font-bold + tracking-tight
- **Labels** : text-sm + font-medium + text-tertiary
- **Valeurs** : text-xl + font-semibold + text-primary

### Formulaires

- **Titres** : text-lg + font-semibold
- **Labels** : text-sm + font-medium
- **Inputs** : text-base + font-normal
- **Erreurs** : text-xs + font-normal + text-error

### Navigation

- **Menu principal** : text-sm + font-medium
- **Sous-menus** : text-xs + font-normal
- **Breadcrumbs** : text-xs + font-normal + text-tertiary

## 🌟 Tendances 2025 Appliquées

### Micro-typographie

- **Letter-spacing** ajusté pour chaque taille
- **Optical sizing** pour les grandes tailles
- **Variable fonts** pour les animations fluides

### Hiérarchie Moderne

- **Contraste de poids** plus marqué
- **Espacement vertical** rythmé (1.5rem baseline)
- **Tailles intermédiaires** pour plus de nuances
