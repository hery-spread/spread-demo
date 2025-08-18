# PLAN D'ACTION PRESCRIPTIF : SEARCH-08 — Intégration complète des champs Modash API dans l'interface de recherche

## User Story

En tant qu'utilisateur, je veux avoir accès à tous les champs de recherche disponibles dans l'API Modash (Instagram, YouTube, TikTok) organisés dans une interface intuitive par catégories, afin d'effectuer des recherches d'influenceurs ultra-précises et exploiter toute la puissance de l'API.

---

## Contexte & dépendances

- Interface de recherche existante : `src/app/search/page.tsx`, `src/components/search/SearchSidebar.tsx` et filtres cards.
- Types actuels : `src/types/index.ts` (AdvancedSearchFilters, SearchUIState).
- Mock data : `src/lib/mockData.ts` (à terme remplacé par vrais appels Modash).
- Documentation API Modash complète fournie par l'utilisateur.

---

## Objectifs

1. **Mapper tous les champs Modash** dans nos types TypeScript existants.
2. **Enrichir les catégories de filtres** : Creator, Audience, Content + nouvelle catégorie Platform.
3. **Intégrer les dictionnaires Modash** (languages, locations, topics, hashtags, interests, brands, users).
4. **Gérer les spécificités par plateforme** (certains champs uniquement Instagram/YouTube/TikTok).
5. **Préserver l'UX existante** tout en ajoutant les nouveaux champs de manière progressive.

---

## Analyse des champs Modash par catégorie

### 🎯 **Creator Filters (influencer.\*)**

**Champs actuels à enrichir :**

- ✅ `followers` (min/max) — déjà présent
- ✅ `engagementRate` — déjà présent
- ✅ `location` (array d'IDs) — déjà présent, à connecter aux dictionnaires Modash
- ✅ `language` (code) — déjà présent, à connecter au dictionnaire Modash
- ✅ `gender`, `age` (min/max) — déjà présents
- ✅ `isVerified` — déjà présent

**Nouveaux champs Creator à ajouter :**

- 🆕 `lastposted` (jours depuis dernier post)
- 🆕 `relevance` (array hashtags/mentions pour pertinence)
- 🆕 `audienceRelevance` (mentions pour pertinence audience)
- 🆕 `followersGrowthRate` (interval, value, operator)
- 🆕 `bio` (recherche dans la bio)
- 🆕 `views` (min/max vues)
- 🆕 `hasContactDetails` (email, phone, etc.)
- 🆕 `keywords` (mots-clés)
- 🆕 `textTags` (hashtags/mentions structurées)
- 🆕 `engagements` (min/max)
- 🆕 **Instagram uniquement :** `hasYouTube`, `accountTypes`, `brands`, `interests`, `reelsPlays`, `hasSponsoredPosts`
- 🆕 **YouTube uniquement :** `viewsGrowthRate`, `isOfficialArtist`
- 🆕 **TikTok uniquement :** `shares`, `saves`, `likesGrowthRate`

### 👥 **Audience Filters (audience.\*)**

**Champs actuels à enrichir :**

- ✅ `location` — à enrichir avec système de weights
- ✅ `language` — à enrichir avec système de weights
- ✅ `gender` — à enrichir avec système de weights
- ✅ `age`/`ageRange` — à enrichir avec système de weights

**Nouveaux champs Audience à ajouter :**

- 🆕 **Instagram uniquement :** `interests` (avec weights), `credibility`

### 📱 **Platform Filters (nouvelle catégorie)**

**Champs spécifiques par plateforme :**

- 🆕 `calculationMethod` ("median" | "average")
- 🆕 Gestion des champs différents par plateforme
- 🆕 `filterOperations` (opérateurs logiques entre filtres)

### 📄 **Content Filters (enrichissements)**

**Champs actuels à enrichir :**

- ✅ Types de contenu par plateforme (posts, reels, videos, shorts)

**Nouveaux champs Content à ajouter :**

- 🆕 Performance metrics par type de contenu
- 🆕 Posting frequency patterns

---

## Plan d'Action Prescriptif

### Étape 1 — Extension des types TypeScript

- [ ] **Enrichir `src/types/index.ts`** avec tous les nouveaux champs Modash :
  - [ ] `CreatorFilters` : ajouter tous les nouveaux champs influencer
  - [ ] `AudienceFilters` : ajouter système de weights + nouveaux champs
  - [ ] `PlatformFilters` : nouvelle interface pour champs spécifiques plateformes
  - [ ] `ModashDictionaries` : interfaces pour languages, locations, topics, etc.
  - [ ] Sous-types par plateforme : `InstagramFilters`, `YouTubeFilters`, `TikTokFilters`

### Étape 2 — Dictionnaires Modash (façade data)

- [ ] **Créer `src/lib/modash/dictionaries.ts`** :
  - [ ] `getLanguages(platform, query?, limit?)`
  - [ ] `getLocations(platform, query?, limit?)`
  - [ ] `getTopics(platform, query?, limit?)`
  - [ ] `getHashtags(platform, query?, limit?)`
  - [ ] `getInterests(query?, limit?)` (Instagram seulement)
  - [ ] `getBrands(query?, limit?)` (Instagram seulement)
  - [ ] `getUsers(platform, query?, limit?)`
- [ ] **Mock data** pour développement, avec structure identique aux réponses Modash
- [ ] **Cache layer** pour éviter les appels répétés

### Étape 3 — Composant Platform Selection (refactor)

- [ ] **Enrichir `src/components/search/PlatformSearchCard.tsx`** :
  - [ ] Choix platform influence les champs disponibles dynamiquement
  - [ ] `calculationMethod` selector (median/average)
  - [ ] Message informatif sur les champs spécifiques à chaque plateforme

### Étape 4 — Creator Filters Card (enrichissement majeur)

- [ ] **Refactor `src/components/search/CreatorFiltersCard.tsx`** :
  - [ ] **Section Growth & Activity** : `followersGrowthRate`, `lastposted`, `viewsGrowthRate`
  - [ ] **Section Content Performance** : `views`, `engagements`, `reelsPlays`
  - [ ] **Section Profile** : `bio` search, `hasContactDetails`, `isVerified`
  - [ ] **Section Relevance** : `relevance`, `audienceRelevance`, `keywords`, `textTags`
  - [ ] **Section Platform-specific** : champs conditionnels selon plateforme sélectionnée
  - [ ] **Autocomplétion** : intégration dictionnaires pour locations, languages, etc.

### Étape 5 — Audience Filters Card (système weights)

- [ ] **Refactor `src/components/search/AudienceFiltersCard.tsx`** :
  - [ ] **Weights sliders** pour chaque critère audience (location, language, gender, age)
  - [ ] **Multiple selection** avec weights : locations multiples avec % importance
  - [ ] **Age ranges avancés** : plusieurs tranches d'âge avec weights
  - [ ] **Instagram : interests & credibility** : sélection multiple + credibility slider

### Étape 6 — Content Filters Card (par plateforme)

- [ ] **Refactor `src/components/search/ContentFiltersCard.tsx`** :
  - [ ] **Filtres conditionnels** selon plateforme : reels (Instagram), shorts (YouTube), etc.
  - [ ] **Performance metrics** : vues, likes, comments par type de contenu
  - [ ] **Posting patterns** : fréquence, jours de la semaine préférés

### Étape 7 — Advanced Search Logic

- [ ] **Créer `src/lib/modash/searchBuilder.ts`** :
  - [ ] `buildModashQuery(filters, platform)` : transformation de nos filtres UI vers format Modash API
  - [ ] **Validation** des filtres selon la plateforme sélectionnée
  - [ ] **Gestion filterOperations** : AND/OR entre critères
  - [ ] **Pagination & sorting** : intégration complète

### Étape 8 — Components d'autocomplétion avancés

- [ ] **Créer `src/components/search/AutocompleteInput.tsx`** :
  - [ ] **Location picker** avec recherche géographique
  - [ ] **Language selector** avec codes ISO
  - [ ] **Hashtags & Topics** avec suggestions en temps réel
  - [ ] **Users/Brands** avec preview cards
  - [ ] **Debouncing** pour éviter trop d'appels API

### Étape 9 — Integration & Testing

- [ ] **Mise à jour `src/app/search/page.tsx`** pour gérer les nouveaux filtres
- [ ] **Tests unitaires** des fonctions de transformation de filtres
- [ ] **Tests E2E** de l'interface complète avec tous les nouveaux champs
- [ ] **Performance** : lazy loading des dictionnaires, virtualisation si nécessaire

### Étape 10 — Documentation & UX

- [ ] **Tooltips explicatifs** sur chaque nouveau champ complexe
- [ ] **Examples de recherche** contextuels selon la plateforme
- [ ] **Save/Load search presets** : permettre de sauvegarder des recherches complexes
- [ ] **Export advanced filters** : partager des configurations de recherche

---

## Critères d'acceptation

- [ ] **Tous les champs Modash** sont disponibles dans l'interface de recherche, organisés logiquement.
- [ ] **Filtrage dynamique** : l'interface s'adapte à la plateforme sélectionnée.
- [ ] **Autocomplétion** fonctionne sur tous les champs concernés (locations, languages, etc.).
- [ ] **Système de weights** permet de pondérer l'importance des critères audience.
- [ ] **Recherche complexe** : combinaisons de filtres avec opérateurs logiques.
- [ ] **Performance** : interface fluide même avec tous les nouveaux champs.
- [ ] **Backward compatibility** : l'interface actuelle continue de fonctionner pendant la transition.
- [ ] **Build/Lint** : `npm run build` et `npm run lint` passent sans erreur.

---

## Risques & notes

- **Complexité UI** : risque de surcharge cognitive avec trop de champs → implémentation progressive, collapsibles.
- **Performance API** : dictionnaires peuvent être volumineux → cache intelligent et pagination.
- **Maintenance** : nouveaux champs Modash dans le futur → architecture extensible.
- **UX** : utilisateurs novices vs experts → mode "simple" et "avancé".

---

## 🎯 Champs Modash par plateforme (référence)

### 📱 **Instagram Search Fields**

```typescript
influencer: {
  followers, engagementRate, location[], language, lastposted, relevance[],
  audienceRelevance[], gender, age, followersGrowthRate, bio, hasYouTube,
  hasContactDetails[], accountTypes[], brands[], interests[], keywords,
  textTags[], reelsPlays, isVerified, hasSponsoredPosts, engagements
}
audience: {
  location[], language, gender, age[], ageRange, interests[], credibility
}
```

### 🎬 **YouTube Search Fields**

```typescript
influencer: {
  followers, engagementRate, location[], language, lastposted, relevance[],
  audienceRelevance[], gender, age, followersGrowthRate, bio, views,
  hasContactDetails[], keywords, isVerified, isOfficialArtist,
  viewsGrowthRate, engagements
}
audience: {
  location[], language, gender, age[], ageRange
}
```

### 🎵 **TikTok Search Fields**

```typescript
influencer: {
  followers, engagementRate, location[], language, lastposted, relevance[],
  audienceRelevance[], gender, age, followersGrowthRate, bio, views,
  hasContactDetails[], textTags[], keywords, isVerified, likesGrowthRate,
  shares, saves, engagements
}
audience: {
  location[], language, gender, age[], ageRange
}
```

---

## 🚀 Stratégie de déploiement

1. **Phase 1** : Types + dictionnaires mock + Creator filters enrichis
2. **Phase 2** : Audience weights + Platform filters + autocomplétion de base
3. **Phase 3** : Content filters avancés + search builder + intégration API réelle
4. **Phase 4** : UX avancée + presets + optimisations performance

