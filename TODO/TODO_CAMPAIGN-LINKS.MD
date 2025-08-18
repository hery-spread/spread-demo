# PLAN D'ACTION PRESCRIPTIF : CAMPAIGN-LINKS — Remplacement des hashtags par un système de liens avec budgets

## User Story

En tant qu'utilisateur, je veux:

- Remplacer le système de hashtags dans les campagnes par un système de liens
- Pouvoir ajouter plusieurs liens (au moins 3) lors de la création d'une campagne
- Associer un budget optionnel à chaque lien
- Conserver la même interface utilisateur pour les plateformes (Instagram, YouTube, TikTok)
- Avoir une interface claire pour gérer les liens et leurs budgets

## Portée et impacts

- Types: `src/types/index.ts` (modifier `CampaignTracker` et interfaces associées)
- Composant modal: `src/components/campaigns/CreateCampaignModal.tsx` (refactorisation complète de la section hashtags)
- Page campagnes: `src/app/campagnes/page.tsx` (mise à jour de l'affichage)
- Mock data: `src/lib/mockData.ts` (adaptation des données de test)

## Données & mapping

### Ancienne structure (hashtags)
```typescript
trackingConfig: {
  hashtags: string[]; // ["#SamsungPartner", "#GalaxyS25"]
  // ... autres propriétés
}
```

### Nouvelle structure (liens avec budgets)
```typescript
trackingConfig: {
  links: {
    url: string;
    label?: string;
    budget?: number;
  }[];
  // ... autres propriétés (sans hashtags)
}
```

---

## Plan d'Action Prescriptif

### Étape 1 — Modification des types TypeScript

- [ ] Dans `src/types/index.ts`, modifier l'interface `CampaignTracker`:
  - Remplacer `hashtags: string[]` par `links: { url: string; label?: string; budget?: number; }[]`
  - Supprimer toutes les références aux hashtags dans les types liés
- [ ] Mettre à jour l'interface `CampaignContent` si nécessaire pour refléter le nouveau système

### Étape 2 — Refactorisation du composant CreateCampaignModal

- [ ] Dans `src/components/campaigns/CreateCampaignModal.tsx`:
  - Remplacer le champ "Hashtags à suivre" par une section "Liens à suivre"
  - Créer un composant de gestion dynamique des liens avec:
    - Champ URL (obligatoire)
    - Champ Label (optionnel)
    - Champ Budget (optionnel, numérique)
    - Bouton "Ajouter un lien" (jusqu'à 3 liens minimum)
    - Bouton "Supprimer" pour chaque lien
- [ ] Adapter la logique de soumission pour traiter les liens au lieu des hashtags
- [ ] Mettre à jour la validation du formulaire

### Étape 3 — Mise à jour de l'affichage des campagnes

- [ ] Dans `src/app/campagnes/page.tsx`:
  - Remplacer l'affichage des hashtags par l'affichage des liens
  - Adapter le formatage pour montrer les liens avec leurs budgets optionnels
  - Conserver le système de limitation d'affichage (4 éléments max + compteur)

### Étape 4 — Adaptation des données mockées

- [ ] Dans `src/lib/mockData.ts`:
  - Modifier les données de campagnes existantes pour utiliser des liens au lieu de hashtags
  - Créer des exemples de liens avec et sans budgets
  - Adapter la fonction `createCampaign` pour le nouveau format

### Étape 5 — Composant de gestion des liens (nouveau)

- [ ] Créer `src/components/campaigns/LinkManager.tsx`:
  - Interface pour ajouter/supprimer des liens
  - Validation des URLs
  - Gestion des budgets optionnels
  - Design cohérent avec le design system

### Étape 6 — QA + Validation

- [ ] Lancer `npm run lint` et corriger
- [ ] Lancer `npm run build` et corriger
- [ ] Tests UX manuels: création de campagne avec liens, affichage des campagnes existantes

---

## Critères d'acceptation

- [ ] Le formulaire de création de campagne affiche "Liens à suivre" au lieu de "Hashtags à suivre"
- [ ] L'utilisateur peut ajouter au moins 3 liens avec URL obligatoire
- [ ] Chaque lien peut avoir un label et un budget optionnels
- [ ] L'affichage des campagnes montre les liens au lieu des hashtags
- [ ] Les budgets sont affichés quand ils sont renseignés
- [ ] Lint et build passent sans erreur

---

## Suivi d'avancement

- Étapes totales: 6
- Avancement (%) = (étapes cochées / 6) × 100 → arrondir à l'entier

---

## Risques & gardes-fous

- Migration des données existantes: s'assurer que les campagnes mockées existantes fonctionnent
- Validation des URLs: implémenter une validation basique des URLs
- Interface utilisateur: maintenir la cohérence avec le design system existant

---

## Notes de design

- Conserver le style visuel existant (cards, couleurs, espacements)
- Utiliser les mêmes composants UI (`Input`, `Button`) pour la cohérence
- Affichage des liens: format "Label (Budget €)" ou juste "URL" si pas de label


