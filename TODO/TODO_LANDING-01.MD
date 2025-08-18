# TODO LANDING-01 : Landing Page d'acquisition (Essai gratuit)

## 🎯 Objectif

Concevoir et déployer une landing page à la racine (`/`) orientée conversion vers l'essai gratuit, cohérente avec le design system existant.

## 📋 Plan d'Action Prescriptif

- [x] Étape 1 — Architecture: Isoler la route `/` du chrome applicatif (sidebar/header) pour un layout marketing dédié
- [x] Étape 2 — Hero & UVP: Créer un hero clair (titre, sous-titre, badges) + CTA principal « Commencer l'essai gratuit » → `/onboarding`
- [x] Étape 3 — Preuves sociales: Ajouter notation/compteurs + logos
- [x] Étape 4 — Bénéfices clés: 3 cartes synthétiques alignées DS
- [x] Étape 5 — CTA final: Bandeau conclusif avec double CTA (Essai / Voir les profils)
- [ ] Étape 6 — Tracking: Préparer les hooks d'événements (click CTA) pour futur analytics
- [ ] Étape 7 — SEO: Ajouter metadata spécifique route (server component dédié si nécessaire)
- [ ] Étape 8 — A/B Ready: Structurer sections pour variations (titres/CTA)
- [x] Étape 9 — Lint & Build: Vérifier la qualité (`npm run lint` / `npm run build`)
- [x] Étape 10 — Commit & Push: Versionner les changements

## 🔗 Fichiers impactés

- `src/components/layout/MainLayout.tsx` — Suppression du chrome sur `/`
- `src/app/page.tsx` — Nouvelle landing orientée conversion

## 🧪 Critères de validation

- Cohérence UI avec `DESIGN/`
- CTA principal mène à `/onboarding`
- Pas d'erreurs `npm run build` / `npm run lint`

## 🕒 Historique

- 2025-08-18 — Création et implémentation initiale (Étapes 1-5,9,10) ✅


