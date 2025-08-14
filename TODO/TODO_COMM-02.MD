# PLAN D'ACTION PRESCRIPTIF : COMM-02 — Onglet latéral « Communications » inspiré de Mailchimp

## User Story

En tant qu'utilisateur, je veux un onglet latéral « Communications » inspiré de l'UX de Mailchimp pour naviguer rapidement entre mes conversations, brouillons, messages planifiés et envoyés, avec des filtres, des labels et des compteurs clairs.

Références d'inspiration (non contractuelles):

- Mailchimp — navigation « Campaigns/Automations/Email » et sidebar d'inbox (rechercher: « Mailchimp email campaigns sidebar »).

---

## Portée & impacts

- UI: `src/components/communication/*` (adapter, ne pas dupliquer inutilement)
- Contexte: `src/contexts/CommunicationContext.tsx` (états: dossier/filtre sélectionnés, compteurs, recherche)
- Pages: `src/app/communications/page.tsx`
- Types: `src/types/communication.ts`

---

## Objectifs fonctionnels

1. Sidebar compacte, toujours visible, avec sections repliables et badges de compteurs.
2. Bouton principal « Composer » en haut (ouvre `UnifiedEmailModal`).
3. Groupes (exemples à adapter):
   - Dossiers: Boîte de réception, Suivis, Brouillons, Planifiés, Envoyés, Archivés, Corbeille.
   - Canaux: Email (MVP), plus tard autres canaux.
   - Filtres rapides: Assignés à moi, Non lus, Avec pièces jointes, Haute priorité.
   - Labels/Tags: liste dynamique (création/suppression rapide).
   - Segments (smart folders): « Récents », « Derniers répondus », etc.
4. Barre de recherche locale dans la sidebar (déclenche un filtrage côté `CommunicationContext`).
5. États vides clairs + skeletons.

---

## Plan d'Action Prescriptif

### Étape 1 — Audit & design minimaliste

- [ ] Passer en revue `DESIGN/*.MD` pour cohérence (espacements, couleurs, icônes).
- [ ] Lister ce qui existe déjà dans `CommunicationHub.tsx` et `ThreadViewer.tsx` et décider d’adapter plutôt que créer from scratch.

### Étape 2 — Modèle de données & context

- [ ] Étendre `src/types/communication.ts` si nécessaire: `MailboxFolder`, `Channel`, `Tag`, `SidebarSection`.
- [ ] Étendre `CommunicationContext`:
  - état: `activeFolder`, `activeChannel`, `activeQuickFilters`, `activeTags`, `searchTerm`;
  - sélecteurs: compteurs par dossier/tag, filtres dérivés;
  - actions: `setFolder`, `toggleTag`, `toggleQuickFilter`, `setSearchTerm`.

### Étape 3 — Composant `CommunicationSidebar`

- [ ] Créer `src/components/communication/CommunicationSidebar.tsx` (ou extraire depuis `CommunicationHub.tsx`).
- [ ] Sections repliables avec icônes + badges (non lus) + menus contextuels (rename/supprimer sur tags).
- [ ] Bouton « Composer » en sticky top (variant discret mais visible).
- [ ] Champs de recherche (debounced) + résultats vides.

### Étape 4 — Intégration & navigation

- [ ] Monter `CommunicationSidebar` dans `src/app/communications/page.tsx` à gauche, contenu à droite.
- [ ] Le changement de dossier/filtre met à jour la liste de fils (Thread list) via le context.

### Étape 5 — Comptes & états

- [ ] Afficher les compteurs par dossier (non lus, total) depuis le context; synchroniser lors des actions (marquer comme lu, archiver…).
- [ ] Gérer les états: loading/skeleton, empty states par dossier.

### Étape 6 — Accessibilité & clavier

- [ ] Navigation clavier (Tab/Enter/Espace), focus visible, aria-labels.

### Étape 7 — QA

- [ ] `npm run lint` → 0 erreur
- [ ] `npm run build` → OK
- [ ] Tests UX: sélection dossier/canal/tag, recherche, compteurs corrects, ouverture « Composer ».

---

## Critères d'acceptation

- [ ] Sidebar compacte, sections repliables, badges de compteurs, recherche locale.
- [ ] Bouton « Composer » fonctionnel (ouvre `UnifiedEmailModal`).
- [ ] Changement de dossier/filtre met à jour la liste de conversations.
- [ ] Compteurs (non lus/total) cohérents dans chaque section.
- [ ] Lint/Build OK.

---

## Notes

- S’inspirer de Mailchimp pour la hiérarchie et la lisibilité, sans copier 1:1.
- Prévoir l’extension future multi‑canal ( SMS, DM ) via `Channel`.
