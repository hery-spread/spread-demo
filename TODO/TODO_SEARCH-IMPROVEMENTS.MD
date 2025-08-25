# TODO - Améliorations Page de Recherche

## 📋 **User Story**

Corriger les problèmes de layout, UX et filtres de la page de recherche selon le feedback utilisateur détaillé.

## 🎯 **Objectifs**

- Corriger le layout vertical qui pousse le contenu hors de la viewport
- Fixer le positionnement du bouton "Analyser" dans la recherche IA
- Ouvrir toutes les cards de filtres par défaut
- Rendre la sélection de plateforme obligatoire et prioritaire
- Réorganiser et nettoyer les filtres selon les spécifications
- Améliorer l'UX des filtres multiples (mots-clés bio, géographie audience)

## 📝 **Plan d'Action Prescriptif**

### 🏗️ **1. Corrections Layout Principal**

- [ ] **1.1** Corriger le problème de hauteur de la page de recherche
  - Modifier `src/app/search/page.tsx` : changer `h-screen` vers `min-h-screen`
  - Ajuster les conteneurs flex pour éviter le débordement vertical
  - Optimiser la gestion de l'overflow dans les colonnes

- [ ] **1.2** Fixer le positionnement du bouton "Analyser" dans AISearchCard
  - Corriger le positionnement absolu du bouton dans `AISearchCard.tsx`
  - S'assurer qu'il ne se superpose pas avec le contenu
  - Tester sur différentes tailles d'écran

### 🔧 **2. État par Défaut des Cards**

- [ ] **2.1** Modifier l'état initial des cards de filtres
  - Dans `SearchSidebar.tsx`, changer les `cardStates` par défaut de `false` à `true`
  - Modifier la logique d'initialisation dans `search/page.tsx`
  - S'assurer que toutes les cards s'ouvrent par défaut

### 🎯 **3. Plateforme Obligatoire et Prioritaire**

- [ ] **3.1** Rendre la sélection de plateforme obligatoire
  - Modifier `PlatformSearchCard.tsx` pour afficher un message d'obligation
  - Ajouter une validation dans la logique de recherche
  - Désactiver les autres filtres tant qu'aucune plateforme n'est sélectionnée

- [ ] **3.2** Améliorer la visibilité de l'obligation plateforme
  - Ajouter un indicateur visuel (badge "Obligatoire")
  - Modifier le design pour mettre en évidence cette section
  - Ajouter un message d'aide contextuel

### 🏷️ **4. Amélioration Filtres - Mots-clés Bio (Multi-sélection)**

- [ ] **4.1** Créer un système de tags multiples pour les mots-clés bio
  - Modifier le composant de recherche bio pour accepter plusieurs mots-clés
  - Ajouter un système de tags avec suppression individuelle
  - Permettre l'ajout par "Entrée" ou bouton "+"

- [ ] **4.2** Interface utilisateur pour mots-clés multiples
  - Input avec auto-complétion
  - Affichage des tags sélectionnés
  - Bouton de suppression par tag
  - Validation et feedback visuel

### 🗺️ **5. Géographie Audience - Pourcentages**

- [ ] **5.1** Ajouter les champs de pourcentage pour la géographie audience
  - Modifier `AudienceTargetingFiltersCard.tsx`
  - Ajouter un slider ou input numérique pour le pourcentage minimum
  - Logique : "X% minimum de l'audience doit être dans ce pays"

### 🧹 **6. Nettoyage des Filtres selon Spécifications**

#### **6.1** Filtres à SUPPRIMER :

- [ ] Similarité de contenu (pas utile)
- [ ] Continent (garder seulement pays)
- [ ] Numéro téléphone disponible (pas d'accès)
- [ ] Qualité de l'audience (pas utile)
- [ ] Localisation du poids avec Modash (incompréhensible)
- [ ] Contactabilité (doublon avec email)
- [ ] Type de collaboration (à enlever)
- [ ] Gammes de prix estimés (à enlever)

#### **6.2** Filtres à GARDER et AMÉLIORER :

- [ ] Mots-clés dans la bio (multi-sélection) ✅
- [ ] Mots-clés dans le contenu ✅
- [ ] Catégorie de contenu ✅
- [ ] Hashtags et mentions ✅
- [ ] Type et statut, compte vérifié ✅
- [ ] Marques mentionnées ✅
- [ ] Intérêts du créateur ✅
- [ ] Langue principale du créateur ✅
- [ ] Dernière publication ✅
- [ ] Caractéristiques (minimum 18 ans, genre) ✅
- [ ] Pays et ville localisation créateur ✅
- [ ] Email de contact disponible (case unique) ✅
- [ ] Géographie audience par pays/ville + pourcentages ✅
- [ ] Langue de l'audience ✅
- [ ] Genre de l'audience + pourcentages ✅
- [ ] Âge de l'audience ✅
- [ ] Crédibilité audience ✅

#### **6.3** Filtres à REMONTER (Plus Importants) :

- [ ] **Taille de l'audience (nombre de followers)** → Section Performance (plus haut)
- [ ] **Nombre de vues moyennes** → Section Performance (plus haut)
- [ ] **Likes moyens par post** → Section Performance
- [ ] **Commentaires moyens par post** → Section Performance

### 🚀 **7. Réorganisation des Sections de Filtres**

#### **7.1** Nouvelle hiérarchie proposée :

1. **Plateforme & Recherche** (OBLIGATOIRE) ⭐
2. **Performance & Taille** (métriques importantes)
3. **Identité Créateur** (localisation, genre, vérification)
4. **Contenu & Thématiques** (catégories, mots-clés, hashtags)
5. **Audience Ciblage** (géographie, démographie audience)
6. **Croissance & Sponsoring** (filtres avancés)

#### **7.2** Restructuration des composants :

- [ ] Créer `PerformanceSizeFiltersCard.tsx` (nouveau)
- [ ] Modifier `CreatorIdentityFiltersCard.tsx` (simplifié)
- [ ] Créer `ContentThematicsFiltersCard.tsx` (nouveau)
- [ ] Modifier `AudienceTargetingFiltersCard.tsx` (avec pourcentages)
- [ ] Garder `GrowthSponsoringFiltersCard.tsx` (nettoyé)

### 🧽 **8. Bouton "Supprimer Tous les Filtres"**

- [ ] **8.1** Améliorer la fonction de nettoyage
  - Ajouter une confirmation avant suppression
  - Animation de feedback
  - Raccourci clavier (Ctrl+R ou Cmd+R)

- [ ] **8.2** Positionnement et visibilité
  - Rendre le bouton plus visible
  - Ajouter un compteur de filtres actifs
  - Feedback visuel lors du nettoyage

### 📱 **9. Tests et Validation**

- [ ] **9.1** Tests de layout responsive
  - Tester sur mobile, tablette, desktop
  - Vérifier que le contenu ne déborde plus
  - Valider la navigation entre les filtres

- [ ] **9.2** Tests fonctionnels
  - Validation de l'obligation plateforme
  - Test des filtres multiples (mots-clés, géographie)
  - Vérification de la logique de recherche

- [ ] **9.3** Tests UX
  - Parcours utilisateur complet
  - Temps de compréhension des filtres
  - Facilité d'utilisation des nouvelles fonctionnalités

## 🔧 **Commandes Essentielles**

```bash
npm run build        # Vérification compilation
npm run lint         # Vérification code
npm run dev          # Test en développement
```

## 📁 **Fichiers à Modifier**

### **Fichiers Principaux :**

- `src/app/search/page.tsx` (layout principal)
- `src/components/search/SearchSidebar.tsx` (état par défaut cards)
- `src/components/search/AISearchCard.tsx` (positionnement bouton)
- `src/components/search/PlatformSearchCard.tsx` (obligation plateforme)

### **Nouveaux Fichiers à Créer :**

- `src/components/search/PerformanceSizeFiltersCard.tsx`
- `src/components/search/ContentThematicsFiltersCard.tsx`

### **Fichiers à Restructurer :**

- `src/components/search/CreatorIdentityFiltersCard.tsx`
- `src/components/search/AudienceTargetingFiltersCard.tsx`
- `src/components/search/GrowthSponsoringFiltersCard.tsx`

### **Types à Mettre à Jour :**

- `src/types/index.ts` (nouvelles structures de filtres)

## 🎨 **Design System**

- Respecter les couleurs définies dans `/DESIGN/colors.MD`
- Utiliser la typographie de `/DESIGN/typography.MD`
- Suivre les layouts de `/DESIGN/layouts.MD`
- Maintenir la cohérence avec les autres pages

## ⚠️ **Points d'Attention**

- **Layout** : S'assurer que la page ne déborde plus verticalement
- **Performance** : Optimiser les re-renders lors des changements de filtres
- **UX** : Rendre l'obligation de plateforme claire et intuitive
- **Accessibilité** : Maintenir la navigation clavier et screen readers
- **Responsive** : Tester sur toutes les tailles d'écran
- **API** : Vérifier que les nouveaux filtres sont compatibles avec Modash

## 📊 **Critères de Succès**

- [ ] Page de recherche ne déborde plus verticalement
- [ ] Bouton "Analyser" correctement positionné
- [ ] Toutes les cards ouvertes par défaut
- [ ] Sélection plateforme obligatoire et claire
- [ ] Mots-clés bio en multi-sélection fonctionnels
- [ ] Géographie audience avec pourcentages
- [ ] Filtres inutiles supprimés
- [ ] Filtres importants remontés
- [ ] Bouton "Supprimer tout" amélioré
- [ ] Build et lint passent sans erreur
- [ ] Tests responsive validés
- [ ] UX fluide et intuitive

## 🚀 **Impact Attendu**

1. **UX améliorée** : Navigation plus fluide et intuitive
2. **Efficacité** : Filtres mieux organisés et plus pertinents
3. **Clarté** : Obligation plateforme évite la confusion
4. **Fonctionnalité** : Multi-sélection et pourcentages plus précis
5. **Performance** : Layout optimisé sans débordement
