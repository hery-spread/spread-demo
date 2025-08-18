# PLAN D'ACTION PRESCRIPTIF : ANALYTICS-02 — Rapport de campagne partageable (coûts par contenu, CPM/CPC/ROAS)

## User Story

En tant qu'utilisateur, je veux générer un rapport de campagne le plus complet possible, partageable via un lien, qui consolide toutes les performances et les coûts par contenu afin de calculer automatiquement les métriques business (CPM, CPC, CPA, ROAS, coût de revient, etc.).

---

## Contexte & dépendances

- Campagnes existantes (UI/Mock): `src/app/campagnes/page.tsx`, `src/components/campaigns/*`, `src/lib/mockData.ts` (mockAdvancedCampaigns, mockCampaignContents).
- Partage (pattern existant): `src/app/share/[shareId]/page.tsx` et composants associés.
- Types: `src/types/index.ts` (CampaignContent, CampaignTracker, CampaignAnalytics...).
- À terme: intégration Modash/Supabase pour données réelles; pour l’instant, mock+structure API propre.

---

## Objectifs

1. Calculer et afficher un rapport complet par campagne avec granularité « contenu » et « créateur ».
2. Permettre la saisie/stockage du coût payé par contenu (monnaie configurable) dès la création/édition de campagne.
3. Calculer automatiquement CPM, CPC, CPA, CTR, ER, ROAS, coût total et coût de revient.
4. Offrir un lien partageable en lecture seule (branding Spread), export PDF/CSV.
5. Regroupements et filtres (par plateforme, créateur, période, type de contenu).

---

## Modèle de données (proposé — sans coder ici)

- Table/entité `campaigns` (id, name, description, currency, start_at, end_at, hashtags[])
- Table/entité `campaign_contents` (id, campaign_id, creator_id, platform, url, content_type, published_at, cost_paid, currency, notes)
- Mesures par contenu (collectées/calculées): impressions, reach, views, likes, comments, shares, clicks, conversions, revenue
- Dérivées calculées:
  - CPM = (cost_paid / impressions) × 1000
  - CPC = cost_paid / clicks
  - CPA = cost_paid / conversions
  - CTR = clicks / impressions
  - ER = engagements / impressions
  - ROAS = revenue / total_cost

Remarque: Normaliser devise (currency) et offrir conversion (placeholder tant qu’on n’a pas de FX service).

---

## Plan d'Action Prescriptif

### Étape 1 — Types & utilitaires de calcul

- [ ] Étendre `src/types/index.ts` si nécessaire pour les champs coût/monnaie par contenu et agrégats campagne.
- [ ] Créer `src/lib/analytics/campaignCalculations.ts` avec fonctions pures:
  - `sumCampaignCosts(contents)`
  - `computeContentMetrics(content)` (CPM, CPC, CPA, CTR, ER)
  - `aggregateCampaignMetrics(contents)` (CPM moyen pondéré, ROAS, etc.)
- [ ] Tests unitaires des calculs (limites: divisions par zéro, valeurs manquantes).

### Étape 2 — Saisie des coûts par contenu

- [ ] Étendre le flux de création/édition de campagne pour saisir `cost_paid` par contenu (+ currency).
- [ ] Validation (>= 0), affichage de la devise, total de la campagne.

### Étape 3 — Page Rapport de campagne (app)

- [ ] Créer `src/app/campagnes/[id]/rapport/page.tsx` (ou `report.tsx`) avec onglets:
  - « Overview » (KPI: total cost, impressions, clicks, revenue, ROAS, CPM/CPC moyens)
  - « Creators » (table par créateur: coûts, perfs, CPM/CPC/CPA)
  - « Contents » (table par contenu: coût payé, perfs, CPM/CPC/CPA, lien)
- [ ] Filtres: période (date range), plateforme, type de contenu, créateur.
- [ ] Sélecteur de devise d’affichage.
- [ ] Exports: CSV (contents/creators), PDF (overview + tableaux).

### Étape 4 — Rapport partageable (public)

- [ ] Créer route `src/app/share/campaign/[shareId]/page.tsx` (readonly):
  - Branding Spread, légende de confidentialité, pas d’édition.
  - Paramètres: expiration du lien, option « masquer coûts ».
- [ ] Génération `shareId`: via service `shareService.createCampaignShare(campaignId, options)`.

### Étape 5 — Groupements & vues

- [ ] Switch de regroupement: par créateur, par plateforme, par type de contenu.
- [ ] Graphiques simples: bar chart coûts vs résultats, sparkline perfs dans le temps (si séries disponibles).

### Étape 6 — QA & accessibilité

- [ ] États vides, erreurs (données manquantes), skeletons.
- [ ] A11y: navigation clavier, aria-labels sur tableaux.
- [ ] `npm run lint` / `npm run build` → OK.

---

## Critères d'acceptation

- [ ] Saisie du coût par contenu lors de la préparation de la campagne (devise incluse).
- [ ] Rapport de campagne affiche KPIs et tableaux complets avec calculs CPM/CPC/CPA/CTR/ER/ROAS.
- [ ] Regroupements et filtres fonctionnels (plateforme, créateur, période, type de contenu).
- [ ] Lien partageable readonly disponible; export CSV/PDF.
- [ ] Lint/Build OK.

---

## Risques & notes

- Données partielles selon plateforme → gérer les divisions par zéro et afficher « — ».
- Conversions de devise non gérées initialement → afficher avertissement si devises multiples.
- Performance: pagination/virtualisation des tableaux si >10k lignes.


