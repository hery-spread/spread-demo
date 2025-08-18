# PLAN D'ACTION PRESCRIPTIF : PROFILE-05 — Récupération Modash (profil + rapport partageable)

## User Story

En tant qu'utilisateur, lorsque j'ouvre une page profil comme `/profile/1`, je veux que les données affichées proviennent de l'API Modash et que le rapport partageable s'appuie sur les champs officiels Modash (pas des mocks), afin d'avoir des informations à jour et exhaustives.

---

## Références officielles (Modash)

- Instagram: `https://docs.modash.io/products/discovery_api/openapi_doc/discovery/instagram`
- YouTube: `https://docs.modash.io/products/discovery_api/openapi_doc/discovery/youtube`
- TikTok: `https://docs.modash.io/products/discovery_api/openapi_doc/discovery/tiktok/tiktokcontroller_search`

Endpoints clés (selon plateforme):

- `/{platform}/profile/{userId}/report` → Rapport détaillé (à privilégier et à mettre en cache)
- `/{platform}/users` → Recherche d’utilisateurs par handle/ID (résolution de `@handle` → `userId`)
- Dictionnaires: `/{platform}/languages`, `/{platform}/locations`, `/{platform}/topics`, `/{platform}/hashtags` (+ Instagram: `/interests`, `/brands`)

---

## Objectifs

1. Récupérer et exposer l’intégralité des champs disponibles dans Modash pour un profil (Search/Report), avec conservation d’un `raw` complet.
2. Mettre à jour la page `profile/[id]` pour alimenter toutes les sections avec les données Modash.
3. Aligner la page de partage `share/[shareId]` sur les mêmes données (mêmes champs et structure), en prévision d’un lien partageable.

---

## Portée technique

- Pages: `src/app/profile/[id]/page.tsx`, `src/app/share/[shareId]/page.tsx`
- Service API: `src/lib/modash.ts` (nouveau) — client typé, mapping, helpers de dictionnaires
- Types: `src/types/index.ts` (ajouts: `ModashInstagramReport`, `ModashYoutubeReport`, `ModashTiktokReport`, + `raw: unknown`)
- Config: `MODASH_API_TOKEN` (env), timeouts, retry, quotas (coûts en crédits Modash)

---

## Plan d'Action Prescriptif

### Étape 1 — Préparation & sécurité

- [ ] Ajouter `MODASH_API_TOKEN` (variables d’environnement + exemple dans README)
- [ ] Créer `src/lib/modash.ts` avec:
  - [ ] Client fetch commun (headers: `Authorization: Bearer <token>`, `Content-Type: application/json`)
  - [ ] Gestion des erreurs (401/403/429/5xx), retry limité, timeouts
  - [ ] Utilitaire `withCache(key, fetcher)` (SWR serveur: `fetch({ next: { revalidate: 3600 } })` si applicable)

### Étape 2 — Résolution identifiant

- [ ] Ajouter `resolveUserId(platform, handleOrId)`:
  - Input: `platform: 'instagram'|'youtube'|'tiktok'`, `handleOrId: string`
  - Si `handleOrId` est un ID → retourner tel quel
  - Sinon: requête `/{platform}/users?query=<handle>` puis sélection du `userId`

### Étape 3 — Récupération du rapport Modash (source de vérité)

- [ ] Implémenter `getProfileReport(platform, userId)`:
  - Appel `/{platform}/profile/{userId}/report`
  - Conserver le JSON complet en `raw`
  - Retourner un objet normalisé minimal pour l’UI + `raw`
- [ ] Champs à mapper (quand disponibles):
  - Identité: id, username, name, avatar, bio, verified, platform, profileUrl
  - Compteurs & performance: followers/subscribers, engagement, engagement_rate, vues/likes/comments (mean/min/max/median), posting_statistics (weekDay/daily)
  - Audience: genders, ages (13‑17, 18‑24, 25‑34, 35‑44, 45‑54, 55+), languages, locations (top countries/cities)
  - Contenu: topics/interests, hashtags, collaborations summary

### Étape 4 — Dictionnaires (auto-complétion & cohérence)

- [ ] Exposer helpers: `listLanguages`, `listLocations`, `listTopics`, `listHashtags` (+ IG: `listInterests`, `listBrands`)
- [ ] Support recherche (`query`) et pagination; limiter les résultats avec `limit`

### Étape 5 — Intégration dans `/profile/[id]`

- [ ] Déduire la plateforme & le handle/id selon le contexte actuel (mock → transitoire):
  - Heuristique temporaire: si l’URL contient un `?platform=xx` l’utiliser; sinon valeur par défaut ou issue du mock courant
  - À terme: stocker la plateforme + userId dans la navigation précédente
- [ ] Appeler `resolveUserId` puis `getProfileReport`
- [ ] Renseigner toutes les sections visibles (header, stats, audience charts, performance)
- [ ] Afficher des placeholders quand un champ n’est pas fourni par la plateforme

### Étape 6 — Alignement `/share/[shareId]`

- [ ] Utiliser la même structure de données & mapping
- [ ] Paramétrer une stratégie de cache plus longue pour le partage (ex: 24h), bouton « Refresh » si nécessaire

### Étape 7 — Types & exhaustivité

- [ ] Ajouter types `Modash{Platform}Report` (OpenAPI → types), + champ générique `raw: unknown`
- [ ] Vérifier via checklist par plateforme que tous les groupes de champs OpenAPI sont soit mappés, soit présents dans `raw`

### Étape 8 — QA & stabilité

- [ ] `npm run lint` → 0 erreur
- [ ] `npm run build` → OK
- [ ] Tests manuels: profils IG/YT/TT variés, cas "non trouvé", timeouts, quotas

---

## Critères d'acceptation

- [ ] `/profile/[id]` affiche des données provenant de Modash (pas de mock), avec au minimum: identité, followers, engagement_rate, stats de contenus, démographie audience (si disponible)
- [ ] Les champs disponibles dans Modash sont couverts: mappés dans l’UI ou conservés en `raw`
- [ ] La page de partage `/share/[shareId]` consomme les mêmes données et reste cohérente
- [ ] Gestion des erreurs propre (états de chargement/erreur, quotas)
- [ ] Lint/Build OK

---

## Journal & risques

- Crédits Modash: surveiller la consommation (le `report` a un coût par appel)
- Variations entre plateformes: certains champs ne sont pas uniformes → fallback propre & `raw` accessible
- Performance: activer caching côté serveur; éviter les appels redondants (résolution `userId`)


