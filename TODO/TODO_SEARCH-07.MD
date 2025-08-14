# PLAN D'ACTION PRESCRIPTIF : SEARCH-07 — Filtres Modash complets + UI minimaliste + Sélection multiple des résultats

## User Story

En tant qu'utilisateur, je veux:

- des filtres complets alignés avec la documentation Modash (Instagram, YouTube, TikTok);
- une interface minimaliste avec « Catégories de contenu » en dropdown multi‑select;
- un dropdown Pays multi‑select avec recherche, et l'ajout d'un champ « Villes » multi‑select avec recherche;
- la recherche directe par `@handle` supportant plusieurs `@` cumulés (sans remplacement du précédent);
- dans les résultats, pouvoir sélectionner plusieurs profils via checkbox pour des actions groupées, et trier les résultats par followers, engagement, etc.;
- que tous les panneaux de filtres soient « expanded » par défaut.

Références (Modash):

- Instagram: `https://docs.modash.io/products/discovery_api/openapi_doc/discovery/instagram`
- YouTube: `https://docs.modash.io/products/discovery_api/openapi_doc/discovery/youtube`
- TikTok: `https://docs.modash.io/products/discovery_api/openapi_doc/discovery/tiktok/tiktokcontroller_search`

---

## Portée et impacts

- UI: `src/components/search/*` (cards de filtres, sidebar, résultats)
- Types: `src/types/index.ts` (étendre `AdvancedSearchFilters` si nécessaire)
- Logique de recherche: `src/app/search/page.tsx` (conversion → legacy/mock, puis futur mapping → Modash)
- Table des résultats: `src/components/search/SearchResultsTable.tsx` (checkbox multi‑sélection, bar d’actions, tris visibles)
- Nouveau composant UI: `src/components/ui/MultiSelect.tsx` (minimaliste, avec recherche locale)

---

## Données & mapping (synthèse Modash → nos filtres)

- Plateforme unique: `filters.platform` ∈ {instagram|youtube|tiktok}
- Localisation audience:
  - Pays: tableau d'IDs Modash (multi) → `filters.audience.locations.countries: string[]`
  - Villes: tableau d'IDs Modash (multi) → `filters.audience.locations.cities: string[]`
  - Endpoints Modash: `/{platform}/locations` (recherche + pagination)
- Démographie audience: genre, âges (13‑17, 18‑24, 25‑34, 35‑44, 45‑54, 55+), langues → déjà présents; garder compatibilité.
- Performance: followers range, engagement rate range, views/likes/comments ranges (si exposés dans UI), croissance…
- Contenu:
  - Catégories (intérêts/sujets): multi‑select → `filters.content.categories: string[]` (IDs Modash topics/interests)
  - Types (photo, vidéo, story, reel, short, live) → existant
- Recherche directe multi‑`@`:
  - `filters.directUsers: string[]` (usernames/handles exacts, cross‑platform si plateforme non choisie)
- Tri résultats: `sort.field ∈ {followers, engagement_rate, views, …}`, `sort.direction ∈ {asc, desc}`

---

## Couverture EXHAUSTIVE des champs Modash (à récupérer et exposer)

Exigence non‑négociable: récupérer et rendre disponibles dans notre couche de données l’intégralité des champs fournis par Modash pour les endpoints Search et Report des 3 plateformes. Aucun champ ne doit être perdu (conserver un `raw` complet par item).

Références officielles:

- Instagram: `https://docs.modash.io/products/discovery_api/openapi_doc/discovery/instagram`
- YouTube: `https://docs.modash.io/products/discovery_api/openapi_doc/discovery/youtube`
- TikTok: `https://docs.modash.io/products/discovery_api/openapi_doc/discovery/tiktok/tiktokcontroller_search`

À intégrer (communs, lorsque disponibles par plateforme):

- Requête Search
  - `sort`: `{ field, direction, sortedValue?, value? }`
  - `page`: number
  - `filter`: objet complet (AND global, OR sur tableaux comme `age` et `location`), avec poids/threshold supportés par Modash
    - `audience`
      - `age`: tableaux d’IDs/plages (13‑17, 18‑24, 25‑34, 35‑44, 45‑54, 55+)
      - `gender`: poids/percentages (male/female)
      - `languages`: codes langue (IDs dictionnaire)
      - `location`: pays (IDs), villes (IDs)
    - `profile`
      - `followers` (min/max)
      - `engagement_rate` (min/max)
      - `verified` (bool)
      - `email_available` (bool, si exposé)
    - `content`
      - `topics`/`interests` (IDs dictionnaires)
      - `hashtags` (IDs/strings selon plateforme)
      - `mentions`, `captions`, `types` (photo, video, story, reel, short, live)
    - `performance`
      - vues/likes/comments: min/max/mean/median (selon plateforme)
      - `posting_statistics`: weekDay/daily (mean/min/max/etc.)

- Réponse Search/Report (résumé)
  - Identité profil: id, username, name, avatar, bio, verified, platform
  - Compteurs: followers/subscribers, engagement, engagement_rate
  - Performance par format: vidéos/shorts/reels (likes, views, comments: mean/min/max/median)
  - Posting statistics: weekDay/daily (mean/value, numberOfItems)
  - Audience: genres, âges, langues, locations (pays/villes)
  - Contenu: topics/interests, hashtags, collaborations

- Dictionnaires à utiliser (avec recherche + pagination):
  - `/{platform}/languages`
  - `/{platform}/locations`
  - `/{platform}/topics`
  - `/{platform}/hashtags`
  - Instagram spécifiques: `/instagram/interests`, `/instagram/brands`

Sort/Pagination UI:

- Exposer au moins: followers, engagement_rate, views; direction asc/desc; page (15 résultats/page par défaut Modash).

Types & persistance:

- Générer des types `Modash{Platform}SearchResult` et `Modash{Platform}Report` (OpenAPI → types) et conserver `raw: unknown` complet par item pour audit.
- Mapper uniquement ce qui est nécessaire pour l’UI; tout le reste reste accessible via `raw`.

Critère de vérification:

- Écrire une checklist par plateforme confirmant que chaque groupe de champs du schéma OpenAPI reçu est présent soit mappé, soit dans `raw`.

---

## Plan d'Action Prescriptif

### Étape 0 — Préparation

- [ ] Lister les cartes actives dans `SearchSidebar.tsx` et forcer l'état `isOpen=true` par défaut pour toutes.
- [ ] Vérifier le design system (`DESIGN/*.MD`) pour les espacements/typographies; viser une UI compacte.

### Étape 1 — Composant `MultiSelect` réutilisable (minimaliste avec recherche)

- [ ] Créer `src/components/ui/MultiSelect.tsx` avec API:
  - `label?: string`
  - `placeholder?: string`
  - `values: Array<{ value: string; label: string }>`
  - `selected: string[]`
  - `onChange: (next: string[]) => void`
  - `searchable?: boolean` (par défaut true)
  - `disabled?: boolean`
  - Affichage tags (chips) + menu déroulant filtrable par texte; clavier accessible.
- [ ] Style minimal (tailwind), largeur full, hauteur compacte.

### Étape 2 — « Catégories de contenu » → Multi‑select

- [ ] Dans `src/components/search/ContentFiltersCard.tsx`, remplacer l'UI actuelle par `MultiSelect`.
- [ ] Injecter les options (premier set statique, alias/emoji → label):
  - Lifestyle, Beauté, Mode, Fitness, Food, Voyage, Tech, Gaming, Musique, Art, Éducation, Business.
- [ ] Stocker dans `filters.content.categories: string[]`.
- [ ] Adapter le comptage des filtres actifs dans `SearchSidebar.tsx`.

### Étape 3 — Pays (multi + recherche) et Villes (multi + recherche)

- [ ] Dans `src/components/search/AudienceFiltersCard.tsx`, remplacer « Pays » par `MultiSelect`.
- [ ] Ajouter une section « Villes » sous Pays, également via `MultiSelect`.
- [ ] État: `filters.audience.locations.countries: string[]`, `filters.audience.locations.cities: string[]`.
- [ ] Préparer un provider de données avec recherche locale (mock) + TODO d’intégration API Modash `/{platform}/locations`.

### Étape 4 — Recherche directe multi‑@ (accumulation)

- [ ] Dans `src/components/search/PlatformSearchCard.tsx` ou `TextSearchSection.tsx`:
  - Parser l’entrée texte et extraire tous les `@handles` (séparateurs: espace, virgule, nouvelle ligne).
  - Afficher les handles sous forme de tags avec possibilité de suppression individuelle.
  - Conserver un tableau cumulé `directUsers: string[]` sans écraser les précédents.
- [ ] Étendre `AdvancedSearchFilters` et la conversion `performAdvancedSearch` pour transmettre `directUsers` → legacy/mock.

### Étape 5 — Résultats: checkbox multi‑sélection + actions groupées + tris visibles

- [ ] Dans `src/components/search/SearchResultsTable.tsx`:
  - Ajouter une colonne checkbox (entête: checkbox maître pour tout sélectionner sur la page courante).
  - Propager `selectedInfluencerIds: string[]`, `onToggleSelect(id)`, `onToggleSelectAll(pageIds)`.
  - Barre d’actions groupées au-dessus du tableau lorsque `selectedInfluencerIds.length > 0`:
    - Actions: « Ajouter à une liste » (ouvre la modale existante), « Export CSV » (mock), « Autre » (placeholder).
  - Conserver/améliorer le tri existant (followers, engagement, plateforme). Ajouter éventuellement `views` si dispo dans mock.

### Étape 6 — UI minimaliste & auto‑expand

- [ ] Réduire paddings/marges sur les cards (classes Tailwind), harmoniser les tailles de police.
- [ ] S’assurer que toutes les cards des filtres sont ouvertes par défaut et conservent leur état.

### Étape 7 — Mapping complet Modash (pré‑intégration)

- [ ] Documenter dans le code une fonction `mapAdvancedFiltersToModashRequest(filters)` retournant le payload attendu (par plateforme).
- [ ] Préparer les appels dictionnaires (languages, locations, topics/hashtags) avec recherche et pagination.
- [ ] Garder le mock existant en fallback si pas d’API key.

### Étape 8 — QA + Validation

- [ ] Lancer `npm run lint` et corriger.
- [ ] Lancer `npm run build` et corriger.
- [ ] Tests UX manuels: multi‑@ cumulés, multi‑select catégories/pays/villes, tri et actions groupées sur résultats.

---

## Critères d'acceptation

- [ ] « Catégories de contenu » est un dropdown multi‑select fonctionnel (tags affichés, suppression, recherche interne).
- [ ] « Pays » et « Villes » sont des multi‑select avec recherche, stockés dans `filters.audience.locations.*`.
- [ ] La recherche directe accepte plusieurs `@handles` en entrée, les accumule et n’en remplace aucun automatiquement.
- [ ] Les résultats de recherche incluent des checkboxes; une barre d’actions groupées apparaît et permet « Ajouter à une liste ».
- [ ] Le tri des colonnes (followers, engagement, plateforme) est visible et fonctionne.
- [ ] Tous les panneaux de filtres sont « expanded » par défaut.
- [ ] Lint et build passent.

---

## Suivi d'avancement (à reporter dans `user_story.csv` — ligne `SEARCH-07`)

- Étapes totales: 8
- Avancement (%) = (étapes cochées / 8) × 100 → arrondir à l'entier.

---

## Risques & gardes‑fous

- Dictionnaires Modash potentiellement volumineux: implémenter pagination et recherche côté client avec debounce.
- Différences de schémas entre plateformes: isoler `mapAdvancedFiltersToModashRequest` par plateforme.
- Accessibilité: navigable au clavier et lisible (contrastes suffisants).

---

## Notes de design

- UI minimaliste: espacements réduits, labels concis, composants compacts, pas d’ornements inutiles.
- Conserver la cohérence avec `src/components/ui/*` existants (typographies, radius, couleurs).
