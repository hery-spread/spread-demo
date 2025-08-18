# PLAN D'ACTION PRESCRIPTIF : PROFILE-06 — Refonte complète des rapports d'influence avec tous les champs Modash API

## User Story
En tant qu'utilisateur, je veux des rapports d'influence ultra-complets qui exploitent tous les champs disponibles dans l'API Modash (Instagram, YouTube, TikTok), organisés dans une interface moderne et professionnelle, afin d'avoir une vision exhaustive des performances et de l'audience de chaque influenceur.

---

## Contexte & dépendances
- Pages existantes : `src/app/profile/[id]/page.tsx`, `src/app/share/[shareId]/page.tsx`
- Composants actuels : `src/components/profile/*` (ProfileHeader, ProfileTabs, charts, etc.)
- Types actuels : `src/types/index.ts` (à enrichir massivement)
- Mock data : `src/lib/mockData.ts` (à remplacer par vrais appels Modash)
- Partage existant : pattern de partage déjà en place

---

## Objectifs
1. **Mapper tous les champs Modash** dans nos interfaces de rapport d'influence
2. **Créer des rapports spécialisés par plateforme** (Instagram, YouTube, TikTok)
3. **Enrichir massivement les données affichées** : audience, performance, collaborations, historique
4. **Moderniser l'interface** avec des visualisations avancées et une navigation intuitive
5. **Maintenir la compatibilité** avec le système de partage existant

---

## 📊 Analyse des champs Modash par plateforme

### 📱 **Instagram Report Fields**
```typescript
profile: {
  // Profil de base
  userId, username, fullname, url, picture, bio, isPrivate, accountType, isVerified,
  
  // Métriques principales
  followers, following, postsCount, avgLikes, avgComments, avgViews, avgReelsPlays,
  
  // Géolocalisation & démographie
  city, state, country, gender, ageGroup, language,
  
  // Contenu & engagement
  hashtags[], mentions[], statsByContentType, recentPosts[], popularPosts[],
  
  // Audience détaillée (16 propriétés)
  audience: { genders, ages, locations, languages, interests, credibility, etc. },
  
  // Collaborations & monétisation
  sponsoredPosts[], brandAffinity[], paidPostPerformance, 
  sponsoredPostsMedianViews, nonSponsoredPostsMedianViews,
  
  // Historique & évolution
  statHistory[], lookalikes[], contacts[], interests[]
}
```

### 🎬 **YouTube Report Fields**
```typescript
profile: {
  // Profil de base
  userId, username, fullname, url, picture, description, isVerified, handle,
  
  // Métriques principales
  followers, postsCount, avgLikes, avgComments, totalViews,
  
  // Géolocalisation & démographie
  city, state, country, gender, ageGroup,
  
  // Contenu par type
  statsByContentType: { videos, shorts, etc. },
  recentPosts[], popularPosts[],
  
  // Audience spécialisée YouTube
  audienceCommenters: { genders, geoCountries, ages, languages, notableUsers, audienceLookalikes },
  
  // Collaborations & monétisation
  sponsoredPosts[], paidPostPerformance, sponsoredPostsMedianViews,
  
  // Recommandations & similarité
  lookalikesByTopics[], interests[], contacts[]
}
```

### 🎵 **TikTok Report Fields**
```typescript
profile: {
  // Profil de base
  userId, username, fullname, url, picture, bio, isPrivate, isVerified, secUid,
  
  // Métriques principales
  followers, following, postsCount, avgLikes, totalLikes, avgComments,
  
  // Géolocalisation & démographie
  city, state, country, gender, ageGroup,
  
  // Contenu & engagement
  statsByContentType, recentPosts[], popularPosts[],
  
  // Audience (9 propriétés)
  audience: { genders, ages, locations, languages, interests, etc. },
  
  // Collaborations & monétisation
  sponsoredPosts[], paidPostPerformance, sponsoredPostsMedianViews,
  
  // Recommandations
  lookalikes[], interests[], contacts[]
}
```

---

## Plan d'Action Prescriptif

### Étape 1 — Extension massive des types TypeScript
- [ ] **Créer `src/types/modashReports.ts`** avec interfaces complètes :
  - [ ] `InstagramReportProfile` : tous les champs Instagram
  - [ ] `YouTubeReportProfile` : tous les champs YouTube  
  - [ ] `TikTokReportProfile` : tous les champs TikTok
  - [ ] `UnifiedInfluencerReport` : interface commune + spécificités par plateforme
  - [ ] Types pour audience détaillée, collaborations, historique, lookalikes
- [ ] **Enrichir `src/types/index.ts`** avec les nouveaux types unifiés
- [ ] **Types pour visualisations** : graphiques, métriques, comparaisons

### Étape 2 — Façade data Modash (remplacement mock)
- [ ] **Créer `src/lib/modash/reports.ts`** :
  - [ ] `getInstagramReport(userId, calculationMethod?)` 
  - [ ] `getYouTubeReport(userId, calculationMethod?)`
  - [ ] `getTikTokReport(userId, calculationMethod?)`
  - [ ] `getUnifiedReport(platform, userId)` : interface commune
  - [ ] `getPerformanceData(platform, url)` : données de performance avancées
- [ ] **Cache intelligent** : éviter les appels répétés (1 crédit par rapport)
- [ ] **Gestion d'erreurs** : retry logic, fallback sur mock si API indisponible

### Étape 3 — Refonte complète ProfileHeader
- [ ] **Refactor `src/components/profile/ProfileHeader.tsx`** :
  - [ ] **Section principale** : photo, nom, handle, badges (vérifié, privé, type de compte)
  - [ ] **Métriques clés** : followers, engagement rate, posts count
  - [ ] **Géolocalisation** : ville, état, pays avec drapeaux
  - [ ] **Contacts** : email, téléphone (si disponibles)
  - [ ] **Liens sociaux** : autres plateformes détectées
  - [ ] **Actions** : partager rapport, exporter, ajouter à liste

### Étape 4 — Système d'onglets enrichi
- [ ] **Refactor `src/components/profile/ProfileTabs.tsx`** avec nouveaux onglets :
  - [ ] **"Vue d'ensemble"** : KPIs principaux, graphiques de tendance
  - [ ] **"Audience"** : démographie détaillée, géolocalisation, intérêts
  - [ ] **"Contenu"** : posts récents/populaires, hashtags, mentions
  - [ ] **"Performance"** : métriques par type de contenu, évolution temporelle
  - [ ] **"Collaborations"** : posts sponsorisés, marques partenaires
  - [ ] **"Similaires"** : lookalikes, recommandations, audience overlap

### Étape 5 — Composants de visualisation avancés
- [ ] **Créer `src/components/profile/charts/AudienceBreakdown.tsx`** :
  - [ ] **Graphiques démographiques** : âge, genre, localisation
  - [ ] **Langues parlées** : répartition avec pourcentages
  - [ ] **Intérêts** : nuage de mots, barres horizontales
  - [ ] **Crédibilité audience** (Instagram) : indicateur visuel
- [ ] **Créer `src/components/profile/charts/ContentAnalysis.tsx`** :
  - [ ] **Performance par type** : posts vs reels vs videos vs shorts
  - [ ] **Hashtags populaires** : fréquence, performance
  - [ ] **Mentions récurrentes** : réseau d'influence
  - [ ] **Horaires de publication** : heatmap jour/heure
- [ ] **Créer `src/components/profile/charts/CollaborationInsights.tsx`** :
  - [ ] **Marques partenaires** : historique, fréquence
  - [ ] **Performance posts sponsorisés** vs organiques
  - [ ] **Évolution monétisation** : tendances CPM, engagement payé

### Étape 6 — Composants spécialisés par plateforme
- [ ] **Créer `src/components/profile/platform/InstagramSpecific.tsx`** :
  - [ ] **Reels analytics** : vues moyennes, top performers
  - [ ] **Stories insights** (si disponible via API)
  - [ ] **Shopping tags** : produits mis en avant
  - [ ] **Brand affinity** : affinité avec les marques
- [ ] **Créer `src/components/profile/platform/YouTubeSpecific.tsx`** :
  - [ ] **Videos vs Shorts** : performance comparative
  - [ ] **Audience commentaires** : profil des viewers actifs
  - [ ] **Collaborations détectées** : autres YouTubeurs
  - [ ] **Monétisation** : revenus estimés, CPM
- [ ] **Créer `src/components/profile/platform/TikTokSpecific.tsx`** :
  - [ ] **Viral content** : posts avec le plus de vues
  - [ ] **Trends participation** : hashtags tendance utilisés
  - [ ] **Duets & Stitches** : contenu collaboratif
  - [ ] **Music usage** : sons populaires utilisés

### Étape 7 — Historique et évolution temporelle
- [ ] **Créer `src/components/profile/timeline/GrowthTimeline.tsx`** :
  - [ ] **Évolution followers** : graphique temporel avec événements marquants
  - [ ] **Performance content** : likes, comments, vues dans le temps
  - [ ] **Engagement rate** : tendances et variations saisonnières
  - [ ] **Comparaison périodes** : croissance mensuelle, trimestrielle
- [ ] **Détection d'événements** : pics de croissance, collaborations marquantes

### Étape 8 — Système de recommandations et lookalikes
- [ ] **Créer `src/components/profile/recommendations/SimilarInfluencers.tsx`** :
  - [ ] **Lookalikes par audience** : influenceurs avec audience similaire
  - [ ] **Lookalikes par contenu** : style et thématiques proches
  - [ ] **Audience overlap** : calcul de chevauchement d'audience
  - [ ] **Recommandations collaborations** : suggestions de partenariats

### Étape 9 — Export et partage avancés
- [ ] **Enrichir le système de partage existant** :
  - [ ] **Rapports PDF** : mise en page professionnelle avec tous les insights
  - [ ] **Exports Excel** : données brutes pour analyse approfondie
  - [ ] **Liens partageables** : versions publiques avec branding Spread
  - [ ] **Rapports personnalisés** : sélection des sections à inclure

### Étape 10 — Performance et optimisation
- [ ] **Lazy loading** : chargement progressif des sections lourdes
- [ ] **Virtualisation** : listes de posts, collaborations si > 100 items
- [ ] **Cache stratégique** : mise en cache des rapports coûteux (1 crédit)
- [ ] **Skeleton loading** : états de chargement élégants
- [ ] **Error boundaries** : gestion gracieuse des erreurs API

---

## Critères d'acceptation
- [ ] **Tous les champs Modash** sont intégrés et affichés de manière pertinente
- [ ] **Interface adaptative** : s'adapte automatiquement à la plateforme (Instagram/YouTube/TikTok)
- [ ] **Visualisations riches** : graphiques, métriques, insights visuels
- [ ] **Performance optimale** : chargement < 3s, interactions fluides
- [ ] **Partage fonctionnel** : liens publics, exports PDF/Excel
- [ ] **Responsive design** : parfait sur desktop, tablet, mobile
- [ ] **Accessibilité** : navigation clavier, screen readers, contrastes
- [ ] **Build/Lint** : `npm run build` et `npm run lint` passent sans erreur

---

## Risques & notes
- **Coût API** : 1 crédit par rapport → cache intelligent obligatoire
- **Données manquantes** : certains champs peuvent être null → fallbacks élégants
- **Performance** : rapports très riches → lazy loading et optimisation
- **Maintenance** : évolution API Modash → architecture extensible

---

## 🎨 Spécifications UX/UI

### Design System
- **Palette cohérente** : violet/purple theme existant
- **Typographie** : hiérarchie claire, lisibilité optimale
- **Iconographie** : Heroicons + icônes spécialisées plateformes
- **Animations** : transitions fluides, micro-interactions

### Layout Responsive
- **Desktop** : sidebar navigation, colonnes multiples
- **Tablet** : navigation tabs, colonnes adaptatives  
- **Mobile** : navigation bottom, single column, swipe gestures

### Visualisations
- **Graphiques** : Chart.js ou D3.js pour interactivité
- **Métriques** : cards avec évolution, indicateurs colorés
- **Comparaisons** : tableaux, barres de progression
- **Géolocalisation** : cartes interactives si pertinent

---

## 🚀 Stratégie de déploiement
1. **Phase 1** : Types + façade API + ProfileHeader enrichi
2. **Phase 2** : Onglets de base + visualisations audience/contenu
3. **Phase 3** : Composants spécialisés par plateforme + collaborations
4. **Phase 4** : Historique + recommandations + exports avancés
5. **Phase 5** : Optimisations performance + polish UX

---

## 📋 Champs Modash par section (référence)

### 🎯 **Section Vue d'ensemble**
- Métriques principales : followers, engagement rate, posts count
- Évolution récente : croissance followers, performance moyenne
- Score influence : calcul composite basé sur audience + engagement

### 👥 **Section Audience** 
- **Démographie** : âge, genre, localisation géographique
- **Langues** : répartition des langues parlées par l'audience
- **Intérêts** : centres d'intérêt de l'audience (Instagram uniquement)
- **Crédibilité** : score de qualité de l'audience (Instagram)

### 📄 **Section Contenu**
- **Posts récents** : dernières publications avec métriques
- **Posts populaires** : meilleures performances historiques
- **Hashtags** : plus utilisés avec poids et performance
- **Mentions** : comptes mentionnés fréquemment

### 📊 **Section Performance**
- **Par type de contenu** : posts vs reels vs videos vs shorts
- **Métriques temporelles** : évolution likes, comments, vues
- **Engagement rate** : calculs par période et type de contenu
- **Posting patterns** : fréquence, jours préférés, heures optimales

### 🤝 **Section Collaborations**
- **Posts sponsorisés** : historique des partenariats détectés
- **Marques partenaires** : fréquence de collaboration
- **Performance payée** : comparaison posts sponsorisés vs organiques
- **Monétisation** : estimations revenus, CPM, valeur par post

### 🔍 **Section Similaires**
- **Lookalikes** : influenceurs avec audience/contenu similaire
- **Audience overlap** : chevauchement d'audience avec autres créateurs
- **Recommandations** : suggestions de collaborations potentielles
- **Network analysis** : position dans l'écosystème d'influence
