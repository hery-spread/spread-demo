# TODO_LISTS-06 - Sélection Individuelle de Contacts pour Envoi Email

## 📋 Vue d'ensemble

Amélioration du système de listes pour permettre la sélection individuelle des contacts lors de l'envoi d'emails en masse, offrant plus de granularité et de contrôle à l'utilisateur.

## 🎯 Objectifs

- Permettre la sélection/désélection individuelle de contacts dans une liste
- Ajouter des filtres avancés pour la sélection (engagement, taille audience, etc.)
- Prévisualisation des contacts sélectionnés avant envoi
- Sauvegarde des sélections pour réutilisation

## 📦 Composants à modifier/créer

- `ContactsTable.tsx` - Ajouter les checkboxes de sélection
- `BulkEmailModal.tsx` - Améliorer pour gérer la sélection
- `ContactSelectionPanel.tsx` - Nouveau panneau de sélection avancée
- `SelectionPreview.tsx` - Prévisualisation des contacts sélectionnés

## 🗂️ Plan d'Action Prescriptif

### ✅ Étape 1 : Améliorer ContactsTable avec sélection multiple

- [ ] Modifier `src/components/lists/ContactsTable.tsx`
- [ ] Ajouter state pour gérer les sélections
- [ ] Implémenter les checkboxes avec "Tout sélectionner"
- [ ] Ajouter compteur de contacts sélectionnés

### ✅ Étape 2 : Créer le panneau de sélection avancée

- [ ] Créer `src/components/lists/ContactSelectionPanel.tsx`
- [ ] Filtres par engagement rate, followers, platform
- [ ] Sélection par critères automatiques
- [ ] Boutons de sélection rapide (Top 10, plus engagés, etc.)

### ✅ Étape 3 : Améliorer BulkEmailModal

- [ ] Modifier `src/components/lists/BulkEmailModal.tsx`
- [ ] Intégrer la liste des contacts sélectionnés
- [ ] Prévisualisation avec détails des contacts
- [ ] Validation du nombre de contacts minimum/maximum

### ✅ Étape 4 : Créer le composant de prévisualisation

- [ ] Créer `src/components/lists/SelectionPreview.tsx`
- [ ] Affichage compact des contacts sélectionnés
- [ ] Statistiques de la sélection (audience totale, etc.)
- [ ] Possibilité de retirer des contacts de la sélection

### ✅ Étape 5 : Mise à jour de la page de détail liste

- [ ] Modifier `src/app/lists/[id]/page.tsx`
- [ ] Intégrer les nouveaux composants
- [ ] Gérer les états de sélection globaux
- [ ] Ajouter boutons d'actions rapides

### ✅ Étape 6 : Sauvegarde des sélections

- [ ] Ajouter types pour les sélections sauvegardées
- [ ] Implémenter la logique de sauvegarde local
- [ ] Interface pour gérer les sélections sauvées
- [ ] Import/export de sélections

### ✅ Étape 7 : Tests et validation

- [ ] Vérifier la performance avec de grandes listes
- [ ] Tester tous les cas d'usage de sélection
- [ ] Corriger les erreurs de build/lint
- [ ] Valider l'UX avec l'équipe

## 🎨 Spécifications UX/UI

- Checkboxes cohérentes avec le design system
- Feedback visuel pour les contacts sélectionnés
- Compteurs et statistiques en temps réel
- Interface intuitive pour la sélection en masse
- Palette de couleurs selon DESIGN/colors.MD

## 🔗 Dépendances

- LISTS-01 (base des listes)
- EMAIL-COMMUNICATIONS (système d'envoi)
- UI-01 (composants de base)

## ✋ Points d'attention

- Performance avec de grandes listes (> 500 contacts)
- Gestion mémoire des sélections multiples
- Cohérence avec les patterns de sélection existants
- Accessibilité des contrôles de sélection

## 📊 Critères de validation

- [ ] Build sans erreur (`npm run build`)
- [ ] Lint sans warning (`npm run lint`)
- [ ] Sélection fluide jusqu'à 1000 contacts
- [ ] Sauvegarde/restauration fonctionnelle
- [ ] Interface intuitive et responsive
