# TODO - Améliorations Landing Page (Feedback Transcript)

## 📋 **User Story**

Améliorer la landing page selon les retours utilisateur du transcript pour optimiser l'expérience utilisateur et la conversion.

## 🎯 **Objectifs**

- Implémenter l'animation en boucle pour le Hero Section
- Corriger les problèmes visuels identifiés
- Optimiser les CTA et le parcours utilisateur
- Mettre à jour le contenu selon les nouvelles spécifications
- Améliorer la structure et l'organisation des sections

## 📝 **Plan d'Action Prescriptif**

### 🔄 **1. Animation en Boucle - Hero Section**

- [ ] **1.1** Modifier `HeroSection.tsx` pour ajouter un système de boucle automatique
  - Ajouter un état `animationCycle` pour gérer les cycles
  - Implémenter un timer pour redémarrer l'animation après completion
  - Ajouter une pause de 3-4 secondes entre chaque cycle
  - Réinitialiser tous les états d'animation (`currentText`, `showAnalysis`, `showFilters`, etc.)

- [ ] **1.2** Optimiser les performances de l'animation en boucle
  - Nettoyer les timers existants avant de redémarrer
  - Éviter les fuites mémoire avec `useCallback` et `useEffect` cleanup
  - Ajouter une option pour désactiver la boucle au hover

### 🎨 **2. Corrections Visuelles - Hero Section**

- [ ] **2.1** Corriger la superposition des éléments GIF/icônes
  - Identifier et supprimer l'élément en double dans la zone d'animation
  - Vérifier les positions absolues des éléments flottants
  - Ajuster les z-index si nécessaire

- [ ] **2.2** Corriger l'erreur de texte identifiée
  - Localiser et corriger la faute de frappe mentionnée
  - Vérifier tous les textes du Hero Section pour d'autres erreurs

### 🎯 **3. Optimisation des CTA**

- [ ] **3.1** Simplifier les boutons CTA du Hero Section
  - Garder uniquement "Commencer l'Essai Gratuit 14 jours"
  - Supprimer ou repositionner "Réserver une démo"
  - Rediriger directement vers la création de compte (pas vers onboarding avec demo)

- [ ] **3.2** Mettre à jour les redirections CTA
  - Modifier `handleStartTrial()` pour pointer vers `/onboarding` sans paramètres
  - Simplifier le parcours utilisateur

### 📊 **4. Mise à Jour des Métriques - Stats Bar**

- [ ] **4.1** Remplacer la métrique de satisfaction
  - Changer "98% taux de satisfaction" par "10h économisées par semaine en moyenne"
  - Mettre à jour les traductions correspondantes dans les fichiers i18n
  - Garder les autres métriques : "2,847+ marques", "250M+ influenceurs"

### 🏢 **5. Mise à Jour Features Section**

- [ ] **5.1** Modifier le titre CRM vers "Séquences Mailing"
  - Changer "CRM & Communication Intégrée" vers "Séquences Mailing Automatisées"
  - Adapter la description pour refléter les fonctionnalités de mailing
  - Mettre à jour les bénéfices listés pour correspondre aux séquences mailing

- [ ] **5.2** Réviser les autres titres de fonctionnalités
  - Vérifier que "Rapports d'Audience Détaillée" est bien présent
  - S'assurer que "Analytique de Performance" est correctement libellé

### 👥 **6. Social Proof Section - Témoignages**

- [ ] **6.1** Remplacer par de vrais témoignages avec photos
  - Rechercher et intégrer de vrais avis clients
  - Ajouter de vraies photos de personnes (pas d'avatars avec initiales)
  - Mettre à jour le contenu des témoignages

### 🛡️ **7. Trust Indicators - Nettoyage**

- [ ] **7.1** Supprimer "Données Sécurisées"
  - Enlever cette section des Trust Indicators
  - Garder "Excellence Reconnue" et "Support Dédié"
  - Réorganiser la grille pour 2 colonnes au lieu de 3

### 💰 **8. Pricing Section - Mise à Jour Plans**

- [ ] **8.1** Mettre à jour avec les 3 nouveaux plans
  - Coordonner avec Amori pour les spécificités de chaque plan
  - Intégrer le système de "nombre de rapports de campagne déterminés"
  - Mettre à jour les prix et fonctionnalités

### ❓ **9. FAQ Section - Repositionnement**

- [ ] **9.1** Déplacer la FAQ plus bas dans la page
  - Repositionner après la section Pricing
  - Avant la section CTA finale

### 🎬 **10. CTA Section - Simplification**

- [ ] **10.1** Simplifier les CTA finaux
  - Garder uniquement "Commencer l'Essai Gratuit"
  - Supprimer "Réserver une démo" de cette section
  - Corriger les erreurs de texte identifiées

- [ ] **10.2** Nettoyer les garanties
  - Supprimer "Sans engagement" et "Sécurisé" si redondant
  - Garder uniquement les éléments à forte valeur ajoutée

### 🏁 **11. Footer - Optimisation**

- [ ] **11.1** Supprimer l'espace blanc excessif
  - Réduire les marges et paddings
  - S'assurer que le footer colle bien au contenu précédent

- [ ] **11.2** Nettoyer le contenu du footer
  - Supprimer "Rejoignez 200+ marques" si présent
  - Garder uniquement les éléments essentiels

### ✅ **12. Tests et Validation**

- [ ] **12.1** Tester l'animation en boucle
  - Vérifier que l'animation redémarre correctement
  - Tester sur différents navigateurs
  - Vérifier les performances

- [ ] **12.2** Validation responsive
  - Tester sur mobile, tablette, desktop
  - Vérifier que tous les changements sont responsive

- [ ] **12.3** Tests de conversion
  - Vérifier que tous les CTA fonctionnent
  - Tester les redirections
  - Valider le parcours utilisateur

## 🔧 **Commandes Essentielles**

```bash
npm run build        # Vérification compilation
npm run lint         # Vérification code
npm run dev          # Test en développement
```

## 📁 **Fichiers à Modifier**

- `src/components/landing/HeroSection.tsx` (animation boucle, corrections visuelles)
- `src/components/landing/FeaturesSection.tsx` (CRM → Séquences Mailing)
- `src/components/landing/SocialProofSection.tsx` (vrais témoignages)
- `src/components/landing/PricingPreview.tsx` (nouveaux plans)
- `src/components/landing/CTASection.tsx` (simplification CTA)
- `src/components/landing/TrustIndicators.tsx` (suppression éléments)
- `src/components/landing/Footer.tsx` (optimisation espaces)
- `src/lib/i18n/locales/fr.json` (traductions mises à jour)
- `src/app/page.tsx` (réorganisation sections si nécessaire)

## 🎨 **Design System**

- Respecter les couleurs définies dans `/DESIGN/colors.MD`
- Utiliser la typographie de `/DESIGN/typography.MD`
- Suivre les layouts de `/DESIGN/layouts.MD`

## ⚠️ **Points d'Attention**

- L'animation en boucle ne doit pas être trop agressive (pause entre cycles)
- Coordonner avec Amori pour les spécifications des plans pricing
- S'assurer que les vrais témoignages sont disponibles avant implémentation
- Tester les performances avec l'animation en boucle continue
- Vérifier que les redirections CTA correspondent au nouveau parcours utilisateur

## 📊 **Critères de Succès**

- [ ] Animation Hero Section tourne en boucle fluide
- [ ] Aucun élément visuel en superposition
- [ ] CTA simplifiés et fonctionnels
- [ ] Métriques mises à jour selon spécifications
- [ ] Contenu Features Section aligné avec produit
- [ ] Vrais témoignages intégrés
- [ ] Plans pricing mis à jour
- [ ] FAQ repositionnée
- [ ] Footer optimisé sans espaces excessifs
- [ ] Build et lint passent sans erreur
- [ ] Tests responsive validés

