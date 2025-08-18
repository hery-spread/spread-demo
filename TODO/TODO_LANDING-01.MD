# TODO_LANDING-01 - Landing Page Convertissante

## 📋 Vue d'ensemble

Création d'une landing page moderne et convertissante à la racine du projet pour diriger les utilisateurs vers l'essai gratuit de Spread, plateforme SaaS d'influence marketing.

## 🎯 Objectifs

- Présenter clairement la proposition de valeur de Spread
- Appliquer les 10 meilleures pratiques de conversion identifiées
- Intégrer harmonieusement avec le design system existant
- Optimiser le funnel TOFU → MOFU → BOFU
- Maximiser les conversions vers l'essai gratuit

## 📦 Composants à créer/modifier

- `src/app/page.tsx` - Landing page principale (remplacer redirection)
- `src/components/landing/` - Dossier des composants landing
  - `HeroSection.tsx` - Section hero avec CTA principal
  - `FeaturesSection.tsx` - Fonctionnalités clés
  - `SocialProofSection.tsx` - Témoignages et logos
  - `PricingPreview.tsx` - Aperçu des tarifs
  - `CTASection.tsx` - Call-to-action final
  - `TrustIndicators.tsx` - Éléments de réassurance

## 🗂️ Plan d'Action Prescriptif

### ✅ Étape 1 : Analyser l'architecture actuelle (EN COURS)

- [x] Étudier les composants UI existants
- [x] Comprendre le design system Spread
- [x] Identifier les fonctionnalités principales à présenter
- [x] Rechercher les meilleures pratiques de conversion

### ✅ Étape 2 : Créer la structure des composants landing

- [ ] Créer le dossier `src/components/landing/`
- [ ] Développer `HeroSection.tsx` avec proposition de valeur forte
- [ ] Créer `FeaturesSection.tsx` avec les 4 fonctionnalités clés
- [ ] Développer `SocialProofSection.tsx` avec éléments de réassurance
- [ ] Créer `PricingPreview.tsx` connecté aux données existantes
- [ ] Développer `CTASection.tsx` avec urgence et bénéfices
- [ ] Créer `TrustIndicators.tsx` avec certifications/garanties

### ✅ Étape 3 : Remplacer la page d'accueil

- [ ] Modifier `src/app/page.tsx` pour intégrer la landing
- [ ] Structurer selon les meilleures pratiques :
  - Hero avec CTA principal (TOFU)
  - Fonctionnalités et bénéfices (MOFU)
  - Social proof et réassurance (MOFU)
  - Tarification et urgence (BOFU)
  - CTA final optimisé (BOFU)

### ✅ Étape 4 : Optimisation conversion

- [ ] Appliquer les 10 principes identifiés :
  - Objectif clair (essai gratuit)
  - Titre accrocheur + proposition valeur
  - Visuels engageants
  - CTA optimisés et visibles
  - Formulaire simplifié
  - Éléments de réassurance
  - Suppression des distractions
  - Expérience mobile fluide
  - Neuromarketing subtil
  - Tests et optimisation

### ✅ Étape 5 : Tests et validation

- [ ] Vérifier `npm run lint`
- [ ] Vérifier `npm run build`
- [ ] Tester la responsivité mobile
- [ ] Valider l'accessibilité
- [ ] Optimiser les performances

## 🎨 Spécifications UX/UI

### Sections de la Landing Page :

**🚀 HERO SECTION (TOFU)**

- Titre accrocheur : "Trouvez les Influenceurs Parfaits en 30 Secondes"
- Sous-titre bénéfice : "La première plateforme IA qui révolutionne la recherche d'influenceurs"
- CTA principal : "Essayer Gratuitement" (14 jours)
- Visuel engagement : Capture d'écran interface recherche
- Indicateurs de confiance : "Rejoignez 2,847+ marques"

**✨ FEATURES SECTION (MOFU)**

- 4 fonctionnalités clés avec icônes :
  1. 🔍 Recherche IA Multi-Plateformes
  2. 📊 Rapports d'Audience Détaillés
  3. 💬 CRM & Communication Intégrée
  4. 📈 Analytics de Performance

**👥 SOCIAL PROOF SECTION (MOFU)**

- Témoignages clients avec avatars
- Logos partenaires/clients
- Statistiques d'usage impressionnantes
- Avis et ratings

**💰 PRICING PREVIEW (BOFU)**

- Aperçu des 3 plans avec focus sur "Pro" (populaire)
- Mise en avant de l'essai gratuit
- Comparaison rapide des bénéfices

**🎯 CTA FINAL SECTION (BOFU)**

- Urgence : "Rejoignez 2,847+ marketeurs qui économisent 10h/semaine"
- Garantie : "Essai gratuit 14 jours - Sans engagement"
- CTA secondaire : "Réserver une démo"

### Principes Neuromarketing :

- **Urgence** : Essai limité dans le temps
- **Preuve sociale** : Témoignages et statistiques
- **Autorité** : Expertise IA et données
- **Réciprocité** : Essai gratuit généreux
- **Rareté** : "Plateforme exclusive"

## 🔗 Dépendances

- Composants UI existants (Button, Card, Input)
- Design system Spread (couleurs, typographie)
- Données de pricing existantes
- Heroicons pour les icônes

## ✋ Points d'attention

- Cohérence avec l'identité visuelle Spread
- Performance et temps de chargement
- Expérience mobile prioritaire
- SEO optimisé
- Accessibilité WCAG AA

## 📊 Critères de validation

- Build et lint sans erreurs
- Temps de chargement < 2s
- Responsive sur tous écrans
- CTAs visibles et fonctionnels
- Cohérence avec le design system
- Messages de conversion optimisés
