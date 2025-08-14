# PLAN D'ACTION PRESCRIPTIF : LISTS-07 — Liste automatique « Rapports d'audience débloqués » (UI distincte)

## User Story

En tant qu'utilisateur, je veux une liste automatique par défaut qui regroupe tous mes rapports d'audience déjà débloqués, visible dans « Mes Listes », avec une apparence visuelle distincte et des actions dédiées (refresh en masse / unitaire), afin d'y accéder rapidement sans configuration.

---

## Contexte & dépendances

- Données existantes (mock): `mockUnlockedReports`, `getUnlockedReports`, `refreshReport`, `refreshMultipleReports`, `getRefreshStats` dans `src/lib/mockData.ts`.
- Types: `UnlockedReport`, `RefreshStats` dans `src/types/index.ts`.
- UI de listes existante: `src/app/lists/page.tsx`, `src/app/lists/[id]/page.tsx`, composants sous `src/components/lists/*`.
- À terme (prod): source Supabase/Modash (non inclus ici). Garder l’API interne agnostique pour remplacer facilement la source de données.

---

## Objectifs

1. Enregistrer une « liste système » par défaut: « Rapports débloqués » (non supprimable, toujours visible).
2. UI différenciée: badge « Automatique », icône/un style distinct, bandeau d’explication.
3. Page de détail dédiée: colonnes pertinentes + actions de rafraîchissement (unitaire et masse) + indicateurs d’état.
4. Filtrage/tri basiques: par plateforme, date de déblocage, statut fraîcheur.

---

## Portée technique

- Routing & détection liste système:
  - Utiliser un `systemId` stable: `system-unlocked-reports`.
  - Lister cette entrée dans `src/app/lists/page.tsx` en tête de section.
  - Dans `src/app/lists/[id]/page.tsx`, si `id === 'system-unlocked-reports'`, rendre un composant spécialisé.
- Nouveau composant: `src/components/lists/UnlockedReportsList.tsx` (table + actions + bandeau).
- Services: `src/lib/unlockedReports.ts` (façade) qui wrap les fonctions mock (`getUnlockedReports`, `refreshReport`, `refreshMultipleReports`, `getRefreshStats`) pour découpler l’UI de la source.
- Types/UI: réutiliser `UnlockedReport` et introduire un type de vue enrichi si nécessaire: rapport + infos influenceur ramenées depuis les mocks existants.

---

## Plan d'Action Prescriptif

### Étape 1 — Façade data

- [ ] Créer `src/lib/unlockedReports.ts` avec:
  - [ ] `listUnlockedReports(): Promise<UnlockedReport[]>`
  - [ ] `refreshOne(reportId: string): Promise<UnlockedReport>`
  - [ ] `refreshMany(reportIds: string[]): Promise<{ updated: number }>`
  - [ ] `getStats(): Promise<RefreshStats>`
  - [ ] Optionnel: `hydrateWithInfluencer(report)` pour joindre nom, avatar, plateforme.

### Étape 2 — Enregistrement de la « liste système »

- [ ] Modifier `src/app/lists/page.tsx` pour injecter une Card spéciale en tête:
  - Titre: « Rapports d'audience débloqués »
  - Badge: « Automatique »
  - Icône: lock-open/bolt (consistant avec le design system)
  - CTA: « Ouvrir » → `/lists/system-unlocked-reports`

### Étape 3 — Détail de la liste système

- [ ] Créer `src/components/lists/UnlockedReportsList.tsx`:
  - Bandeau d’info (différenciation UI): Cette liste se met à jour automatiquement.
  - Boutons: « Rafraîchir la sélection », « Rafraîchir tout » (+ compteur et feedback).
  - Table colonnes: Profil, Plateforme, Dernier refresh, Statut (fresh/stale), Impressions/ER (si dispo), Actions (Rafraîchir).
  - Filtres locaux (barre compacte): plateforme (IG/YT/TT), statut fraîcheur, recherche par nom.
  - Sélection multiple par checkbox.
- [ ] Intégrer ce composant dans `src/app/lists/[id]/page.tsx` quand `id` vaut `system-unlocked-reports`.

### Étape 4 — UI distincte

- [ ] Style différent de `ListCard` standard: cadre accentué, badge « Automatique », fond subtil, icône dédiée.
- [ ] Empty state dédié: « Aucun rapport débloqué pour le moment » + lien contextuel vers les zones où débloquer.

### Étape 5 — QA & perf

- [ ] Gérer les états de chargement/erreur sur les refresh.
- [ ] Optimiser les updates UI (optimistic update + rollback en cas d’échec).
- [ ] `npm run lint` et `npm run build` → OK.

---

## Critères d'acceptation

- [ ] La liste « Rapports d'audience débloqués » apparaît par défaut dans « Mes Listes » avec un style distinct et un badge « Automatique ».
- [ ] La route `/lists/system-unlocked-reports` affiche la table avec colonnes, filtres, sélection multiple et actions de rafraîchissement (unitaire/masse).
- [ ] Les actions de refresh mettent à jour l’UI (dates/statuts) et retournent un feedback utilisateur.
- [ ] Lint/Build OK.

---

## Risques & notes

- Cohérence des types: ne pas diverger des interfaces existantes `UnlockedReport`/`RefreshStats`.
- Évolution future: remplacer facilement la façade mock par des appels réels (Supabase/Modash) sans toucher l’UI.
- Performance: prévoir pagination ou lazy load si la liste devient volumineuse.

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
