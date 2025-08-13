# TODO CAMPAIGNS-REFACTOR : Refactorisation Complète Système Campagnes

## 🎯 Objectif

Refactoriser complètement le système de campagnes pour créer un système de tracking de contenus avec analytics avancées inspiré des captures d'écran.

## 📋 Plan d'Action Prescriptif

### Étape 1 : Nouveaux Types et Architecture

- [ ] Créer nouveaux types `CampaignContent`, `CampaignTracker`, `CampaignAnalytics` dans `types/index.ts`
- [ ] Système de liens de contenus avec tracking individuel
- [ ] Métriques financières (CPM, ROAS, coût par lien)
- [ ] Support hashtags et mentions automatiques
- [ ] Test : `npm run build` & `npm run lint`

### Étape 2 : Mock Data Campagnes Avancées

- [ ] Créer mock data sophistiquée avec vrais contenus trackés
- [ ] Données d'engagement réalistes par contenu
- [ ] Métriques financières détaillées
- [ ] Simulation hashtag tracking (#samsungCampagne2025)
- [ ] Test : `npm run build` & `npm run lint`

### Étape 3 : Interface Création Campagne

- [ ] Créer `components/campaigns/CreateCampaignWizard.tsx`
- [ ] Formulaire multi-étapes (nom, hashtags, tracking setup)
- [ ] Sélection de créateurs/influenceurs
- [ ] Configuration tracking et budget
- [ ] Test : `npm run build` & `npm run lint`

### Étape 4 : Dashboard Analytics Campagne

- [ ] Créer `components/campaigns/CampaignDashboard.tsx`
- [ ] Métriques overview (engagement, impressions, coûts)
- [ ] Regroupement par influenceur/plateforme
- [ ] Charts et visualisations avancées
- [ ] Test : `npm run build` & `npm run lint`

### Étape 5 : Composant Content Tracker

- [ ] Créer `components/campaigns/ContentTracker.tsx`
- [ ] Liste des contenus trackés avec métriques
- [ ] Actions sur contenus individuels
- [ ] Filtres et recherche dans contenus
- [ ] Test : `npm run build` & `npm run lint`

### Étape 6 : Page Campagne Individuelle

- [ ] Créer `app/campagnes/[id]/page.tsx`
- [ ] Vue détaillée d'une campagne
- [ ] Tabs : Overview, Contenus, Analytics, Performance
- [ ] Actions avancées et configurations
- [ ] Test : `npm run build` & `npm run lint`

### Étape 7 : Refactorisation Page Principale

- [ ] Modifier `app/campagnes/page.tsx` complètement
- [ ] Liste des campagnes avec nouveaux designs
- [ ] Métriques globales et KPI
- [ ] Actions rapides et filtres
- [ ] Test : `npm run build` & `npm run lint`

### Étape 8 : Système Hashtag Detection

- [ ] Créer utilitaires pour détection hashtags
- [ ] Import automatique de contenus
- [ ] Matching et scoring de pertinence
- [ ] Interface de validation contenus
- [ ] Test : `npm run build` & `npm run lint`

## 🎨 Design System

- Respecter palette existante (purple/indigo theme)
- Icônes : HashtagIcon, ChartBarIcon, LinkIcon
- States visuels : actif (vert), pause (orange), terminé (bleu)
- Animations subtiles pour feedback

## ✅ Critères de Validation

- Interface création intuitive et complète
- Dashboard analytics riche et informatif
- Système regroupement flexible (influ/plateforme)
- Métriques financières précises (CPM, ROAS)
- Import hashtag automatique fonctionnel
- Performance optimale sans lag
- Design cohérent avec reste de l'app

## 🚨 Attention

- Maintenir compatibilité avec données existantes
- Éviter breaking changes sur les APIs
- Prévoir migration douce des campagnes existantes
