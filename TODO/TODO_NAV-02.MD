# TODO NAV-02 : Refactoring Navigation Bar

## 🎯 Objectif
Refactoriser la navigation en supprimant Dashboard et CRM, ajoutant Campagnes, et modernisant la zone compte utilisateur.

## 📋 Plan d'Action Prescriptif

### Étape 1 : Suppression des Pages Inutiles
- [ ] Supprimer `/src/app/page.tsx` (Dashboard)
- [ ] Supprimer `/src/app/crm/` (dossier complet)
- [ ] Supprimer les composants dashboard : `StatCard.tsx`, `ProgressBar.tsx`, `SubscriptionCard.tsx`, `UsageSummary.tsx`
- [ ] Test : `npm run build` & `npm run lint`

### Étape 2 : Modification de la Navigation (Sidebar.tsx)
- [ ] Retirer "Dashboard" du tableau `navigation`
- [ ] Retirer "CRM" du tableau `navigation`
- [ ] Ajouter "Campagnes" après "Communications" avec icône appropriée (Megaphone ou Rocket)
- [ ] Test : `npm run build` & `npm run lint`

### Étape 3 : Mise à Jour du Header
- [ ] Modifier `getPageTitle()` : supprimer case Dashboard et CRM
- [ ] Modifier `getPageIcon()` : supprimer case Dashboard et CRM
- [ ] Ajouter case pour "Campagnes" dans les 2 fonctions
- [ ] Changer la route par défaut de "/" vers "/search"
- [ ] Test : `npm run build` & `npm run lint`

### Étape 4 : Refonte Footer Sidebar (Zone Compte)
- [ ] Remplacer section "Version 2.0" par zone compte discrète
- [ ] Ajouter liens "Mon compte" et "Mon abonnement" 
- [ ] Styling plus discret avec icônes utilisateur appropriées
- [ ] Test : `npm run build` & `npm run lint`

### Étape 5 : Création Page Campagnes
- [ ] Créer `/src/app/campagnes/page.tsx` 
- [ ] Implémenter composant de base cohérent avec le design system
- [ ] Test : `npm run build` & `npm run lint`

### Étape 6 : Mise à Jour Routing
- [ ] Modifier routing par défaut dans `layout.tsx` si nécessaire
- [ ] Rediriger "/" vers "/search" 
- [ ] Test : `npm run build` & `npm run lint`

### Étape 7 : Nettoyage Final
- [ ] Vérifier absence de références Dashboard/CRM dans le code
- [ ] Nettoyer les imports inutiles
- [ ] Test final : `npm run build` & `npm run lint`

## 🎨 Design System
- Respecter cohérence visuelle existante dans DESIGN/
- Icône Campagnes : Megaphone ou Rocket (HeroIcons)
- Zone compte : Plus discrète, petites tailles

## ✅ Critères de Validation
- Navigation sans Dashboard ni CRM
- Campagnes accessible et fonctionnelle  
- Zone compte discrète et accessible
- Aucune erreur build/lint
- Cohérence design system respectée

## 🚨 Attention
- Vérifier que tous les liens internes pointent vers des pages existantes
- S'assurer que la suppression de Dashboard n'affecte pas d'autres composants
