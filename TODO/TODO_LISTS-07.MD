# TODO LISTS-07 : Liste Rapports Débloqués + Système Refresh

## 🎯 Objectif
Créer une liste spécialisée "Rapports Débloqués" permettant de visualiser et rafraîchir les rapports d'audience déjà débloqués.

## 📋 Plan d'Action Prescriptif

### Étape 1 : Extension Types et Mock Data
- [ ] Ajouter interface `UnlockedReport` dans `types/index.ts`
- [ ] Créer mock data pour rapports débloqués dans `lib/mockData.ts`
- [ ] Ajouter fonctions CRUD pour rapports débloqués
- [ ] Test : `npm run build` & `npm run lint`

### Étape 2 : Composant UnlockedReportsCard
- [ ] Créer `components/lists/UnlockedReportsCard.tsx`
- [ ] Interface spécialisée pour rapports avec actions refresh
- [ ] Boutons refresh unitaire et en masse
- [ ] Indicateurs de statut (fresh/stale/refreshing)
- [ ] Test : `npm run build` & `npm run lint`

### Étape 3 : Composant RefreshReportsModal
- [ ] Créer `components/lists/RefreshReportsModal.tsx`
- [ ] Sélection multiple des rapports à rafraîchir
- [ ] Indicateur de progression du refresh
- [ ] Gestion des erreurs et succès
- [ ] Test : `npm run build` & `npm run lint`

### Étape 4 : Hook useUnlockedReports
- [ ] Créer `hooks/useUnlockedReports.ts`
- [ ] Logique de récupération des rapports débloqués
- [ ] Fonctions refresh unitaire et masse
- [ ] Gestion du statut de fraîcheur des données
- [ ] Test : `npm run build` & `npm run lint`

### Étape 5 : Intégration Page Lists
- [ ] Modifier `app/lists/page.tsx`
- [ ] Ajouter section dédiée rapports débloqués
- [ ] Statistiques rapports dans header
- [ ] Filtrage spécifique aux rapports
- [ ] Test : `npm run build` & `npm run lint`

### Étape 6 : Page Détail Rapports Débloqués
- [ ] Créer `app/lists/unlocked-reports/page.tsx`
- [ ] Vue détaillée de tous les rapports
- [ ] Interface de gestion avancée
- [ ] Analytics et métriques des rafraîchissements
- [ ] Test : `npm run build` & `npm run lint`

### Étape 7 : Tests et Intégration Finale
- [ ] Vérifier cohérence design system
- [ ] Tests d'interaction utilisateur
- [ ] Optimisation performances
- [ ] Test final : `npm run build` & `npm run lint`

## 🎨 Design System
- Respecter palette couleurs existante (violet/purple theme)
- Icônes : DocumentCheckIcon, ArrowPathIcon pour refresh
- States visuels : fresh (vert), stale (orange), refreshing (bleu)
- Animations subtiles pour feedback utilisateur

## ✅ Critères de Validation
- Liste "Rapports Débloqués" accessible depuis /lists
- Refresh unitaire et en masse fonctionnels
- Indicateurs de statut clairs
- Performance optimale (pas de lag)
- Cohérence totale avec design existant
- Aucune erreur build/lint

## 🚨 Attention
- S'assurer de la cohérence avec logique UnlockReportsModal existante
- Prévoir gestion des rapports expirés/périmés
- Optimiser pour éviter spam des API de refresh
