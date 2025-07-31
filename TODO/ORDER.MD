# ORDRE D'EXÉCUTION DES NOUVELLES USER STORIES

## 🎯 Ordre de priorité d'implémentation

### Phase 1 : Fonctionnalités Core (Semaines 1-2)

1. **PRICING-01** - Page de pricing avec calculateur interactif
   - Dépendances : Aucune
   - Impact : Conversion et acquisition
   - Complexité : Moyenne

2. **PRICING-02** - Système d'achat de crédits supplémentaires
   - Dépendances : PRICING-01
   - Impact : Monétisation récurrente et flexibilité
   - Complexité : Moyenne

3. **ONBOARDING-01** - Onboarding automatisé avec call demo
   - Dépendances : Aucune
   - Impact : Activation et qualification leads
   - Complexité : Moyenne

4. **ONBOARDING-02** - Onboarding simplifié avec sélecteur Agence/Marque
   - Dépendances : ONBOARDING-01
   - Impact : Amélioration UX et conversion
   - Complexité : Moyenne

5. **UNLOCK-01** - Modale de déblocage des rapports d'audience
   - Dépendances : Aucune
   - Impact : Monétisation directe
   - Complexité : Moyenne

6. **SHARE-01** - Partage de rapport avec branding
   - Dépendances : Aucune
   - Impact : Growth hacking
   - Complexité : Moyenne

7. **CRM-01** - Système CRM intégré
   - Dépendances : Aucune
   - Impact : Rétention utilisateurs
   - Complexité : Élevée

### Phase 2 : Fonctionnalités Avancées (Semaines 3-4)

8. **SEARCH-05** - Recherche IA en langage naturel
   - Dépendances : Aucune
   - Impact : UX révolutionnaire
   - Complexité : Élevée

9. **SEARCH-06** - Recherche vocale
   - Dépendances : SEARCH-05
   - Impact : Différenciation
   - Complexité : Moyenne

10. **SEARCH-08** - Historique des recherches
    - Dépendances : SEARCH-05
    - Impact : Économies utilisateur
    - Complexité : Moyenne

### Phase 3 : Intégrations (Semaines 5-6)

11. **EMAIL-01** - Intégration email Google/Outlook
    - Dépendances : CRM-01
    - Impact : Productivité
    - Complexité : Très élevée

12. **SHARE-02** - Système de tracking des partages
    - Dépendances : SHARE-01
    - Impact : Analytics
    - Complexité : Moyenne

13. **SEARCH-07** - Champs de recherche Modash
    - Dépendances : SEARCH-05
    - Impact : Précision
    - Complexité : Faible

### Phase 4 : Compléments (Semaines 7-8)

14. **CRM-02** - Pipeline de contact avancé
    - Dépendances : CRM-01
    - Impact : Workflow
    - Complexité : Moyenne

15. **EMAIL-02** - Fils d'emails dans profil
    - Dépendances : EMAIL-01
    - Impact : Centralisation
    - Complexité : Moyenne

16. **SHARE-03** - Statistiques de partage
    - Dépendances : SHARE-02
    - Impact : Insights
    - Complexité : Faible

17. **CRM-03** - Gestion du pipeline
    - Dépendances : CRM-02
    - Impact : Workflow
    - Complexité : Faible

18. **CRM-04** - Historique des communications
    - Dépendances : EMAIL-02
    - Impact : Suivi
    - Complexité : Moyenne

19. **EMAIL-03** - Page centralisée des emails
    - Dépendances : EMAIL-02
    - Impact : Vue globale
    - Complexité : Moyenne

20. **CRM-05** - Notes et rappels
    - Dépendances : CRM-03
    - Impact : Organisation
    - Complexité : Faible

### Phase 5 : Nouvelles Fonctionnalités UX/Communication (Semaines 9-10)

21. **LISTS-06** - Sélection individuelle de contacts pour envoi email
    - Dépendances : LISTS-01, EMAIL-COMMUNICATIONS
    - Impact : Précision des campagnes
    - Complexité : Moyenne

22. **COMM-01** - Harmonisation du système de communication
    - Dépendances : EMAIL-COMMUNICATIONS, CRM-01
    - Impact : Cohérence UX globale
    - Complexité : Élevée

23. **NAV-01** - Regroupement navigation par cas d'utilisation
    - Dépendances : Tous les modules existants
    - Impact : UX et découvrabilité
    - Complexité : Moyenne

24. **ANALYTICS-01** - Système d'analyse de campagne
    - Dépendances : COMM-01, LISTS-06, CRM-01
    - Impact : Insights business
    - Complexité : Élevée

---

## 🔄 Dépendances détaillées

### Graphe de dépendances

```
PRICING-01 (indépendant)
├── PRICING-02 (crédits supplémentaires)
└── Peut être implémenté immédiatement

ONBOARDING-01 (indépendant)
├── ONBOARDING-02 (simplification onboarding)
└── Peut être implémenté immédiatement

UNLOCK-01 (indépendant)
└── Peut être implémenté immédiatement

SHARE-01 (indépendant)
├── SHARE-02 (tracking)
└── SHARE-03 (statistiques)

CRM-01 (indépendant)
├── CRM-02 (pipeline)
│   └── CRM-03 (gestion pipeline)
│       └── CRM-05 (notes/rappels)
├── CRM-04 (historique)
└── EMAIL-01 (intégration)
    ├── EMAIL-02 (fils emails)
    │   └── EMAIL-03 (page centralisée)
    └── CRM-04 (historique avec emails)

SEARCH-05 (indépendant)
├── SEARCH-06 (vocale)
├── SEARCH-07 (champs Modash)
└── SEARCH-08 (historique)

LISTS-06 (indépendant, amélioration LISTS-01)
└── Peut être implémenté après LISTS-01 et EMAIL-COMMUNICATIONS

COMM-01 (refactorisation globale)
├── Dépend de EMAIL-COMMUNICATIONS
├── Impact sur CRM-01 et toutes les communications
└── Prérequis pour ANALYTICS-01

NAV-01 (refactorisation UI globale)
└── Impact transversal sur tous les modules

ANALYTICS-01 (système de métriques)
├── COMM-01 (communication harmonisée)
├── LISTS-06 (sélection avancée)
└── CRM-01 (données)
```

---

## 📊 Impact Business vs Complexité

### Impact Très Élevé / Complexité Faible-Moyenne

- **PRICING-01** : Page de pricing avec calculateur pour optimiser les conversions
- **PRICING-02** : Achat de crédits supplémentaires pour monétisation récurrente
- **ONBOARDING-01** : Qualification des leads et activation optimisée
- **ONBOARDING-02** : Simplification onboarding pour améliorer la conversion
- **UNLOCK-01** : Monétisation directe
- **SHARE-01** : Growth hacking viral

### Impact Élevé / Complexité Moyenne

- **CRM-01** : Rétention et valeur ajoutée
- **SEARCH-08** : Économies utilisateur

### Impact Moyen / Complexité Élevée

- **SEARCH-05** : Différenciation UX
- **EMAIL-01** : Intégration complexe

### Impact Faible / Complexité Faible

- **SHARE-03** : Analytics complémentaires
- **CRM-05** : Fonctionnalités de confort

---

## 🚀 Stratégie d'implémentation

### Approche recommandée : "Quick Wins First"

1. **Commencer par PRICING-01** : Optimisation de la conversion dès l'arrivée
2. **Enchaîner avec ONBOARDING-01** : Qualification et activation des leads
3. **Améliorer avec ONBOARDING-02** : Simplifier le processus d'inscription
4. **Développer UNLOCK-01** : ROI immédiat sur la monétisation
5. **Intégrer SHARE-01** : Effet viral pour l'acquisition
6. **Déployer CRM-01** : Base solide pour la rétention

### Critères de validation pour passer à la phase suivante

- [ ] Build sans erreurs
- [ ] Lint sans warnings
- [ ] Tests fonctionnels validés
- [ ] Performance acceptable
- [ ] UX validée par test utilisateur

---

## 📋 Checklist avant démarrage

### Prérequis techniques

- [ ] Environnement de développement configuré
- [ ] Dépendances npm installées
- [ ] Compte Supabase configuré
- [ ] API keys configurées
- [ ] Design system validé

### Prérequis fonctionnels

- [ ] User stories validées
- [ ] Wireframes approuvés
- [ ] Spécifications techniques rédigées
- [ ] Plan de tests défini
- [ ] Critères d'acceptation clarifiés

---

## 🎨 Structure des données mockées

### Nouvelles entités à créer

```typescript
// Types pour page de pricing
interface PricingConfig {
  basePrice: number;
  searchPrice: number;
  reportPrice: number;
  userPrice: number;
}

// Types pour onboarding
interface OnboardingData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    role: string;
  };
  businessInfo: {
    industry: string;
    teamSize: string;
    monthlyBudget: string;
    goals: string[];
  };
  preferences: {
    wantsDemo: boolean;
    demoTime: string;
    communicationChannel: 'email' | 'phone' | 'both';
  };
}

// Types pour déblocage de rapports
interface UnlockReport {
  influencerId: string;
  unlockedAt: string;
  creditsUsed: number;
}

// Types pour partage
interface SharedReport {
  id: string;
  influencerId: string;
  shareType: 'public' | 'private';
  viewCount: number;
  trackingEnabled: boolean;
}

// Types pour CRM
interface CRMContact {
  id: string;
  name: string;
  stage: 'contacted' | 'responded' | 'negotiating' | 'closed';
  lastContact: string;
  notes?: string;
}

// Types pour recherche IA
interface AISearchHistory {
  id: string;
  query: string;
  filters: SearchFilters;
  resultsCount: number;
  createdAt: string;
}
```

### Fichiers de données mockées à créer

- `src/lib/mockData/pricing.ts` - Données de pricing et plans
- `src/lib/mockData/onboarding.ts` - Données d'onboarding et créneaux
- `src/lib/mockData/unlock.ts` - Données de déblocage
- `src/lib/mockData/share.ts` - Données de partage
- `src/lib/mockData/crm.ts` - Données CRM
- `src/lib/mockData/ai.ts` - Données IA
- `src/lib/mockData/email.ts` - Données email

---

## 📈 Métriques de succès

### KPIs à tracker

- **Pricing** : Taux de conversion landing → signup
- **Onboarding** : Taux de complétion et demandes de démo
- **Déblocage** : Taux de conversion crédits → rapports
- **Partage** : Taux de partage et clics CTA
- **CRM** : Taux d'adoption et conversion pipeline
- **IA** : Taux d'utilisation recherche naturelle
- **Email** : Taux de connexion et utilisation

### Seuils de validation MVP

- Pricing : >20% de conversion visitors → leads
- Onboarding : >80% de complétion + >30% demandes démo
- Déblocage : >15% de conversion
- Partage : >5% de clics CTA
- CRM : >25% d'utilisation active
- IA : >40% des recherches en mode naturel
- Email : >10% de connexions

---

**🎯 Objectif final : Transformer Spread en plateforme complète de gestion d'influence marketing avec optimisation des conversions et qualification automatisée des leads**
