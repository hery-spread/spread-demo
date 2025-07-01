# 🎨 Icônes - Spread Design System

_Système d'icônes moderne basé sur Heroicons et les tendances Fintech UX 2025_

## 📚 Librairie Principale

### Heroicons v2

```typescript
// Import principal
import {
  // Outline icons (24x24)
  UserIcon,
  MagnifyingGlassIcon,
  BellIcon,
  // Solid icons (24x24)
  UserIcon as UserSolidIcon,
  // Mini icons (20x20)
  UserIcon as UserMiniIcon,
} from "@heroicons/react/24/outline";
```

### Tailles Disponibles

```css
/* Système de tailles harmonieux */
--icon-xs: 12px; /* Mini icons pour badges */
--icon-sm: 16px; /* Small icons pour texte */
--icon-md: 20px; /* Medium icons (défaut) */
--icon-lg: 24px; /* Large icons pour boutons */
--icon-xl: 32px; /* Extra large pour headers */
--icon-2xl: 48px; /* Icons héroïques */
--icon-3xl: 64px; /* Icons de présentation */
```

## 🎯 Icônes par Catégorie

### Navigation & Interface

```typescript
// Navigation principale
import {
  HomeIcon, // Accueil
  MagnifyingGlassIcon, // Recherche
  UserGroupIcon, // Listes
  ChartBarIcon, // Analytics
  UserIcon, // Profil
  Cog6ToothIcon, // Paramètres
} from "@heroicons/react/24/outline";

// Actions courantes
import {
  PlusIcon, // Ajouter
  PencilIcon, // Éditer
  TrashIcon, // Supprimer
  ShareIcon, // Partager
  DocumentArrowDownIcon, // Télécharger
  EyeIcon, // Voir
  EyeSlashIcon, // Masquer
} from "@heroicons/react/24/outline";
```

### États & Feedback

```typescript
// États de validation
import {
  CheckIcon, // Succès
  XMarkIcon, // Erreur/Fermer
  ExclamationTriangleIcon, // Attention
  InformationCircleIcon, // Information
  QuestionMarkCircleIcon, // Aide
} from "@heroicons/react/24/outline";

// Chargement & Progression
import {
  ArrowPathIcon, // Actualiser/Loading
  ClockIcon, // En attente
  BoltIcon, // Rapide/Instantané
  SignalIcon, // Statut connexion
} from "@heroicons/react/24/outline";
```

### Données & Analytics

```typescript
// Graphiques & Métriques
import {
  ChartBarIcon, // Graphique en barres
  ChartPieIcon, // Graphique circulaire
  TrendingUpIcon, // Tendance positive
  TrendingDownIcon, // Tendance négative
  ArrowUpIcon, // Augmentation
  ArrowDownIcon, // Diminution
  EyeIcon, // Vues/Impressions
  HeartIcon, // Likes/Engagement
  ChatBubbleLeftIcon, // Commentaires
  ArrowUturnRightIcon, // Partages
} from "@heroicons/react/24/outline";
```

### Plateformes Sociales

```typescript
// Icônes avec emojis pour les plateformes
const PlatformIcons = {
  instagram: "📷",
  youtube: "🎥",
  tiktok: "🎵",
  linkedin: "💼",
  twitter: "🐦",
  facebook: "👥",
  twitch: "🎮",
  pinterest: "📌",
};

// Alternatives avec Heroicons
import {
  CameraIcon, // Instagram
  VideoCameraIcon, // YouTube/TikTok
  BriefcaseIcon, // LinkedIn
  MicrophoneIcon, // Podcast/Audio
  DevicePhoneMobileIcon, // Mobile/Apps
} from "@heroicons/react/24/outline";
```

### Communication & Contact

```typescript
// Moyens de contact
import {
  EnvelopeIcon, // Email
  PhoneIcon, // Téléphone
  ChatBubbleLeftIcon, // Message
  PaperAirplaneIcon, // Envoyer
  InboxIcon, // Boîte de réception
  MegaphoneIcon, // Campagne/Annonce
} from "@heroicons/react/24/outline";
```

### Gestion & Organisation

```typescript
// Listes & Organisation
import {
  ListBulletIcon, // Liste
  Squares2X2Icon, // Grille
  FunnelIcon, // Filtres
  AdjustmentsHorizontalIcon, // Paramètres
  FolderIcon, // Dossier
  TagIcon, // Tag/Catégorie
  StarIcon, // Favoris
  BookmarkIcon, // Sauvegarde
} from "@heroicons/react/24/outline";
```

### Finance & Abonnements

```typescript
// Éléments financiers
import {
  CreditCardIcon, // Carte de crédit
  BanknotesIcon, // Argent/Prix
  CurrencyEuroIcon, // Euro
  CurrencyDollarIcon, // Dollar
  ReceiptPercentIcon, // Remise
  GiftIcon, // Cadeau/Bonus
  ShieldCheckIcon, // Sécurisé
  LockClosedIcon, // Verrouillé/Premium
} from "@heroicons/react/24/outline";
```

## 🎨 Styles & Variations

### Classes de Base

```css
/* Classe de base pour tous les icônes */
.icon {
  display: inline-block;
  width: var(--icon-md);
  height: var(--icon-md);
  color: currentColor;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
}

/* Variations de taille */
.icon-xs {
  width: var(--icon-xs);
  height: var(--icon-xs);
}
.icon-sm {
  width: var(--icon-sm);
  height: var(--icon-sm);
}
.icon-md {
  width: var(--icon-md);
  height: var(--icon-md);
}
.icon-lg {
  width: var(--icon-lg);
  height: var(--icon-lg);
}
.icon-xl {
  width: var(--icon-xl);
  height: var(--icon-xl);
}
.icon-2xl {
  width: var(--icon-2xl);
  height: var(--icon-2xl);
}
.icon-3xl {
  width: var(--icon-3xl);
  height: var(--icon-3xl);
}
```

### Couleurs Contextuelles

```css
/* Couleurs sémantiques */
.icon-primary {
  color: var(--spread-primary);
}
.icon-secondary {
  color: var(--text-secondary);
}
.icon-tertiary {
  color: var(--text-tertiary);
}
.icon-success {
  color: var(--success-600);
}
.icon-warning {
  color: var(--warning-600);
}
.icon-error {
  color: var(--error-600);
}
.icon-info {
  color: var(--info-600);
}

/* Couleurs de plateforme */
.icon-instagram {
  color: #e4405f;
}
.icon-youtube {
  color: #ff0000;
}
.icon-tiktok {
  color: #000000;
}
.icon-linkedin {
  color: #0077b5;
}
.icon-twitter {
  color: #1da1f2;
}
```

### États Interactifs

```css
/* États hover et focus */
.icon-interactive {
  transition: all 0.2s ease;
  cursor: pointer;
}

.icon-interactive:hover {
  color: var(--spread-primary);
  transform: scale(1.1);
}

.icon-interactive:active {
  transform: scale(0.95);
}

/* Icônes dans les boutons */
.btn .icon {
  width: 1em;
  height: 1em;
  margin-right: 0.5rem;
}

.btn-icon .icon {
  margin: 0;
}
```

## 🎯 Composants d'Icônes

### Composant Icon de Base

```typescript
interface IconProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  color?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'error' | 'info';
  className?: string;
  solid?: boolean;
}

export function Icon({ name, size = 'md', color, className, solid = false }: IconProps) {
  const IconComponent = solid ? SolidIcons[name] : OutlineIcons[name];

  const sizeClass = \`icon-\${size}\`;
  const colorClass = color ? \`icon-\${color}\` : '';

  return (
    <IconComponent
      className={\`icon \${sizeClass} \${colorClass} \${className || ''}\`}
    />
  );
}
```

### Icône avec Badge

```typescript
interface IconWithBadgeProps {
  icon: React.ComponentType;
  badgeCount?: number;
  badgeColor?: string;
  size?: string;
}

export function IconWithBadge({ icon: IconComponent, badgeCount, badgeColor = 'red', size = 'md' }: IconWithBadgeProps) {
  return (
    <div className="relative inline-block">
      <IconComponent className={\`icon icon-\${size}\`} />
      {badgeCount && badgeCount > 0 && (
        <span className={\`absolute -top-1 -right-1 bg-\${badgeColor}-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] text-center\`}>
          {badgeCount > 99 ? '99+' : badgeCount}
        </span>
      )}
    </div>
  );
}
```

### Icône de Statut

```typescript
interface StatusIconProps {
  status: 'online' | 'offline' | 'busy' | 'away';
  size?: string;
}

export function StatusIcon({ status, size = 'md' }: StatusIconProps) {
  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    busy: 'bg-red-500',
    away: 'bg-yellow-500'
  };

  return (
    <div className="relative inline-block">
      <UserIcon className={\`icon icon-\${size}\`} />
      <span className={\`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white \${statusColors[status]}\`} />
    </div>
  );
}
```

## 📱 Icônes Responsive

### Adaptations Mobile

```css
/* Icônes plus grandes sur mobile pour l'accessibilité */
@media (max-width: 640px) {
  .icon-touch {
    width: var(--icon-lg);
    height: var(--icon-lg);
    min-width: 44px;
    min-height: 44px;
  }

  .btn-icon {
    width: 48px;
    height: 48px;
  }
}
```

### Icônes dans la Navigation

```css
/* Navigation principale */
.nav-icon {
  width: var(--icon-lg);
  height: var(--icon-lg);
  stroke-width: 1.5;
}

/* Navigation secondaire */
.subnav-icon {
  width: var(--icon-md);
  height: var(--icon-md);
  stroke-width: 2;
}

/* Breadcrumbs */
.breadcrumb-icon {
  width: var(--icon-sm);
  height: var(--icon-sm);
  stroke-width: 2;
}
```

## 🌟 Tendances 2025 Appliquées

### Micro-animations

```css
/* Animations subtiles */
@keyframes icon-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes icon-bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-2px);
  }
}

.icon-loading {
  animation: icon-pulse 2s infinite;
}

.icon-notification {
  animation: icon-bounce 1s ease-in-out;
}

/* Rotation pour les icônes de chargement */
.icon-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

### Icônes Dégradées

```css
/* Icônes avec gradient (SVG) */
.icon-gradient {
  fill: url(#gradient-primary);
}

/* Définition du gradient */
.icon-gradient-def {
  background: linear-gradient(
    135deg,
    var(--spread-primary-start),
    var(--spread-primary-end)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Icônes Glassmorphism

```css
/* Icônes avec effet verre */
.icon-glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-lg);
  padding: 8px;
}
```

## 🎨 Usage Contextuel

### Dashboard & Analytics

```typescript
const DashboardIcons = {
  metrics: ChartBarIcon,
  growth: TrendingUpIcon,
  decline: TrendingDownIcon,
  users: UserGroupIcon,
  revenue: BanknotesIcon,
  conversion: FunnelIcon,
};
```

### Formulaires

```typescript
const FormIcons = {
  required: ExclamationCircleIcon,
  optional: InformationCircleIcon,
  success: CheckIcon,
  error: XMarkIcon,
  help: QuestionMarkCircleIcon,
  show: EyeIcon,
  hide: EyeSlashIcon,
};
```

### Actions Utilisateur

```typescript
const ActionIcons = {
  add: PlusIcon,
  edit: PencilIcon,
  delete: TrashIcon,
  save: CheckIcon,
  cancel: XMarkIcon,
  share: ShareIcon,
  download: DocumentArrowDownIcon,
  upload: ArrowUpTrayIcon,
  copy: DocumentDuplicateIcon,
};
```

## 🔍 Accessibilité

### Labels & Descriptions

```typescript
// Toujours inclure des labels accessibles
<Icon
  name="search"
  aria-label="Rechercher des influenceurs"
  role="img"
/>

// Pour les icônes décoratives
<Icon
  name="star"
  aria-hidden="true"
  decorative
/>
```

### Contraste & Visibilité

```css
/* Assurer un contraste minimum */
.icon {
  color: var(--text-secondary); /* Ratio 4.5:1 minimum */
}

/* Mode haut contraste */
@media (prefers-contrast: high) {
  .icon {
    stroke-width: 2;
    color: var(--text-primary);
  }
}

/* Réduction des mouvements */
@media (prefers-reduced-motion: reduce) {
  .icon-loading,
  .icon-notification {
    animation: none;
  }
}
```

## 📦 Optimisation & Performance

### Lazy Loading

```typescript
// Import dynamique pour les icônes moins utilisées
const LazyIcon = lazy(
  () => import("@heroicons/react/24/outline/ArchiveBoxIcon")
);
```

### Bundle Optimization

```typescript
// Import spécifique pour réduire la taille du bundle
import { UserIcon } from "@heroicons/react/24/outline/UserIcon";

// Plutôt que
import { UserIcon } from "@heroicons/react/24/outline";
```

### SVG Sprites (Optionnel)

```html
<!-- Sprite SVG pour les icônes les plus utilisées -->
<svg style="display: none;">
  <defs>
    <g id="icon-user">
      <!-- Contenu SVG de l'icône user -->
    </g>
  </defs>
</svg>

<!-- Usage -->
<svg className="icon icon-md">
  <use href="#icon-user" />
</svg>
```
