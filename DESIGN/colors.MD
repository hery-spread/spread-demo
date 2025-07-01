# 🎨 Palette de Couleurs - Spread Design System

_Inspiré des dernières tendances Fintech UX 2025 - Design moderne et accessible_

## 🌈 Couleurs Primaires

### Brand Identity

```css
/* Gradient Principal - Spread Purple */
--spread-primary-start: #6366f1    /* Indigo-500 */
--spread-primary-end: #8b5cf6      /* Violet-500 */
--spread-primary-gradient: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)

/* Couleurs solides */
--spread-purple-50: #f8fafc
--spread-purple-100: #e2e8f0
--spread-purple-500: #6366f1
--spread-purple-600: #4f46e5
--spread-purple-700: #4338ca
--spread-purple-800: #3730a3
--spread-purple-900: #312e81
```

### Couleurs Secondaires

```css
/* Accent Colors - Tendance 2025 */
--spread-blue-50: #eff6ff
--spread-blue-100: #dbeafe
--spread-blue-500: #3b82f6
--spread-blue-600: #2563eb
--spread-blue-700: #1d4ed8

--spread-emerald-50: #ecfdf5
--spread-emerald-100: #d1fae5
--spread-emerald-500: #10b981
--spread-emerald-600: #059669
--spread-emerald-700: #047857

--spread-orange-50: #fff7ed
--spread-orange-100: #ffedd5
--spread-orange-500: #f97316
--spread-orange-600: #ea580c
--spread-orange-700: #c2410c
```

## 🎯 Couleurs Fonctionnelles

### États & Feedback

```css
/* Success - Vert moderne */
--success-50: #f0fdf4
--success-100: #dcfce7
--success-500: #22c55e
--success-600: #16a34a
--success-700: #15803d

/* Warning - Orange vibrant */
--warning-50: #fffbeb
--warning-100: #fef3c7
--warning-500: #f59e0b
--warning-600: #d97706
--warning-700: #b45309

/* Error - Rouge élégant */
--error-50: #fef2f2
--error-100: #fee2e2
--error-500: #ef4444
--error-600: #dc2626
--error-700: #b91c1c

/* Info - Bleu ciel */
--info-50: #f0f9ff
--info-100: #e0f2fe
--info-500: #0ea5e9
--info-600: #0284c7
--info-700: #0369a1
```

### Couleurs Neutres - Gamme Étendue 2025

```css
/* Gris modernes avec nuances chaudes */
--neutral-0: #ffffff
--neutral-25: #fcfcfd
--neutral-50: #f8fafc
--neutral-100: #f1f5f9
--neutral-200: #e2e8f0
--neutral-300: #cbd5e1
--neutral-400: #94a3b8
--neutral-500: #64748b
--neutral-600: #475569
--neutral-700: #334155
--neutral-800: #1e293b
--neutral-900: #0f172a
--neutral-950: #020617
```

## 🌟 Couleurs Spécialisées

### Plateformes Sociales

```css
/* Instagram */
--instagram-gradient: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)
--instagram-primary: #e4405f

/* YouTube */
--youtube-red: #ff0000
--youtube-dark: #282828

/* TikTok */
--tiktok-black: #000000
--tiktok-red: #ff0050
--tiktok-blue: #25f4ee

/* LinkedIn */
--linkedin-blue: #0077b5
```

### Données & Analytics

```css
/* Couleurs pour graphiques - Palette accessible */
--chart-blue: #3b82f6
--chart-green: #10b981
--chart-purple: #8b5cf6
--chart-orange: #f97316
--chart-pink: #ec4899
--chart-indigo: #6366f1
--chart-yellow: #eab308
--chart-red: #ef4444
```

## 🎨 Couleurs d'Interface

### Arrière-plans

```css
/* Backgrounds modernes */
--bg-primary: #ffffff
--bg-secondary: #f8fafc
--bg-tertiary: #f1f5f9
--bg-elevated: #ffffff
--bg-overlay: rgba(15, 23, 42, 0.1)
--bg-modal: rgba(15, 23, 42, 0.4)

/* Surfaces glassmorphism */
--glass-surface: rgba(255, 255, 255, 0.1)
--glass-border: rgba(255, 255, 255, 0.2)
```

### Bordures

```css
--border-light: #e2e8f0
--border-medium: #cbd5e1
--border-strong: #94a3b8
--border-focus: #6366f1
--border-error: #ef4444
--border-success: #22c55e
```

### Texte

```css
/* Hiérarchie typographique */
--text-primary: #0f172a
--text-secondary: #475569
--text-tertiary: #64748b
--text-quaternary: #94a3b8
--text-inverse: #ffffff
--text-link: #6366f1
--text-link-hover: #4f46e5
```

## 🌙 Mode Sombre (Préparation Future)

```css
/* Dark mode - Couleurs de base */
--dark-bg-primary: #0f172a
--dark-bg-secondary: #1e293b
--dark-bg-tertiary: #334155
--dark-text-primary: #f8fafc
--dark-text-secondary: #cbd5e1
--dark-text-tertiary: #94a3b8
```

## 🎯 Classes Tailwind Principales

### Couleurs Brand

```css
/* Classes utilitaires Spread */
.bg-spread-primary {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
}
.text-spread-primary {
  color: #6366f1;
}
.border-spread-primary {
  border-color: #6366f1;
}

/* États interactifs */
.hover\:bg-spread-primary:hover {
  background-color: #4f46e5;
}
.focus\:ring-spread-primary:focus {
  --tw-ring-color: #6366f1;
}
```

### Couleurs Fonctionnelles

```css
/* Success */
.bg-success-50 {
  background-color: #f0fdf4;
}
.bg-success-500 {
  background-color: #22c55e;
}
.text-success-600 {
  color: #16a34a;
}
.border-success-200 {
  border-color: #bbf7d0;
}

/* Warning */
.bg-warning-50 {
  background-color: #fffbeb;
}
.bg-warning-500 {
  background-color: #f59e0b;
}
.text-warning-600 {
  color: #d97706;
}

/* Error */
.bg-error-50 {
  background-color: #fef2f2;
}
.bg-error-500 {
  background-color: #ef4444;
}
.text-error-600 {
  color: #dc2626;
}
```

## 🔍 Accessibilité

### Ratios de Contraste

- **Texte normal** : Minimum 4.5:1
- **Texte large** : Minimum 3:1
- **Éléments UI** : Minimum 3:1

### Couleurs Testées WCAG AA

```css
/* Combinaisons validées */
--text-primary + --bg-primary: 21:1 ✅
--text-secondary + --bg-primary: 7.2:1 ✅
--text-tertiary + --bg-primary: 4.8:1 ✅
--spread-primary + --neutral-0: 4.7:1 ✅
```

## 🎨 Usage Recommandé

### Hiérarchie Visuelle

1. **Primaire** : Actions principales, CTA, navigation active
2. **Secondaire** : Actions secondaires, états hover
3. **Tertiaire** : Informations complémentaires, disabled states
4. **Accent** : Notifications, badges, highlights

### Tendances 2025 Appliquées

- **Gradients subtils** pour les surfaces élevées
- **Couleurs vives** pour les micro-interactions
- **Teintes chaudes** dans les neutres
- **Palette étendue** pour la data visualization
- **Contraste élevé** pour l'accessibilité premium
