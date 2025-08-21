# TODO_UI-CLEANUP-01 : Nettoyage de l'Interface Utilisateur - Phase 1

## 🎯 User Story

**En tant qu'utilisateur, je veux une interface plus épurée et focalisée sur les fonctionnalités essentielles pour améliorer l'expérience utilisateur et réduire les distractions.**

## 📋 Plan d'Action Prescriptif

### ✅ Étape 1 : Retirer la section "Sécurité & Confiance" de la landing page

- **Fichier :** `src/components/landing/TrustIndicators.tsx`
- **Action :** Supprimer complètement la section "Sécurité & Confiance" et la section "Nos Engagements"
- **Conserver :** Uniquement le message final "Rejoignez 2,847+ marques qui nous font déjà confiance"

### ✅ Étape 2 : Simplifier le composant TrustIndicators

- **Fichier :** `src/components/landing/TrustIndicators.tsx`
- **Action :** Transformer en composant minimaliste avec seulement le message de confiance
- **Design :** Utiliser un design plus sobre et moins imposant

### ✅ Étape 3 : Retirer les catégories des listes

- **Fichier :** `src/components/lists/ListCard.tsx`
- **Action :** Supprimer l'affichage des catégories dans les cartes de listes
- **Conserver :** Nom de la liste et description uniquement
- **Lignes concernées :** 46-65, 94-101 (fonctions getCategoryColor, getCategoryIcon et affichage)

### ✅ Étape 4 : Mettre à jour les types de données

- **Fichier :** `src/types/index.ts`
- **Action :** Rendre le champ `category` optionnel dans `InfluencerList`
- **Modification :** `category?: string;` au lieu de `category: string;`

### ✅ Étape 5 : Créer une liste par défaut "Rapports d'audience débloqués"

- **Fichier :** `src/lib/mockData.ts`
- **Action :** Ajouter une liste spéciale avec un ID reconnaissable
- **Nom :** "Rapports d'audience débloqués"
- **Type :** Liste système avec UI différenciée

### ✅ Étape 6 : Créer un composant spécial pour la liste des rapports débloqués

- **Fichier :** `src/components/lists/UnlockedReportsListCard.tsx`
- **Action :** Composant avec UI différente et bouton "Mettre à jour le rapport d'audience"
- **Design :** Utiliser des couleurs distinctives (bleu/vert) et icône spécifique

### ✅ Étape 7 : Modifier la page des listes pour intégrer le nouveau composant

- **Fichier :** `src/app/lists/page.tsx`
- **Action :** Détecter la liste spéciale et utiliser le composant approprié
- **Condition :** `if (list.id === 'unlocked-reports') { return <UnlockedReportsListCard /> }`

### ✅ Étape 8 : Retirer la section "Plateformes à surveiller" de la création de campagne

- **Fichier :** `src/components/campaigns/CreateCampaignModal.tsx`
- **Action :** Supprimer complètement la section plateformes (lignes 260-286)
- **Conserver :** Tous les autres champs (nom, description, liens)

### ✅ Étape 9 : Mettre à jour les types de campagne

- **Fichier :** Interface `CreateCampaignModalProps` dans `CreateCampaignModal.tsx`
- **Action :** Retirer `platforms: string[]` des propriétés
- **Impact :** Simplifier la logique de création de campagne

### ✅ Étape 10 : Ajouter un bouton "Mettre à jour les informations" sur la page de campagne

- **Fichier :** `src/app/campagnes/[id]/page.tsx`
- **Action :** Ajouter un bouton dans la section Actions (ligne 199-217)
- **Position :** Entre le bouton "Share campaign" et "Add creators"
- **Fonctionnalité :** Déclencher une mise à jour des données de la campagne

### ✅ Étape 11 : Ajouter un onglet "Équipe" dans la section Mon Compte

- **Fichier :** `src/app/account/page.tsx`
- **Action :** Ajouter un nouvel onglet dans le tableau `tabs` (ligne 16-53)
- **Icône :** `UsersIcon` de Heroicons
- **Position :** Après l'onglet "integrations"

### ✅ Étape 12 : Créer le composant TeamTab

- **Fichier :** `src/app/account/page.tsx`
- **Action :** Ajouter une nouvelle fonction `TeamTab()` après `PrivacyTab()`
- **Fonctionnalité :** Interface pour ajouter/gérer les membres de l'équipe
- **UI :** Tableau des membres + bouton "Ajouter un membre" + modale d'ajout

## 🎨 Design System à Respecter

### Couleurs pour la liste "Rapports d'audience débloqués"

- **Primaire :** `bg-blue-50 border-blue-200`
- **Accent :** `text-blue-700`
- **Bouton :** `bg-green-600 hover:bg-green-700`

### Icône spéciale

- **Icône :** `DocumentChartBarIcon` ou `ChartBarIcon`
- **Couleur :** `text-blue-600`

## 🧪 Tests à Effectuer

1. **Vérifier** que la landing page ne contient plus la section sécurité
2. **Vérifier** que les listes s'affichent sans catégories
3. **Vérifier** que la liste "Rapports d'audience débloqués" a une UI différente
4. **Vérifier** que la création de campagne n'a plus les plateformes
5. **Vérifier** que le bouton "Mettre à jour" apparaît sur les campagnes
6. **Vérifier** que l'onglet "Équipe" est présent dans Mon Compte

## 🔧 Commandes de Vérification

```bash
npm run build        # Vérifier que tout compile
npm run lint         # Vérifier qu'il n'y a pas d'erreurs de linting
```

## ✅ Critères d'Acceptation

- [ ] Section "Sécurité & Confiance" supprimée de la landing page
- [ ] Catégories supprimées des cartes de listes
- [ ] Liste "Rapports d'audience débloqués" créée avec UI spéciale
- [ ] Section "Plateformes" supprimée de la création de campagne
- [ ] Bouton "Mettre à jour les informations" ajouté aux campagnes
- [ ] Onglet "Équipe" ajouté dans Mon Compte
- [ ] `npm run build` réussit sans erreurs
- [ ] `npm run lint` réussit sans warnings

## 📊 Impact sur l'Architecture

### Fichiers Modifiés

- `src/components/landing/TrustIndicators.tsx` - Simplification majeure
- `src/components/lists/ListCard.tsx` - Suppression des catégories
- `src/lib/mockData.ts` - Ajout liste spéciale
- `src/components/campaigns/CreateCampaignModal.tsx` - Suppression plateformes
- `src/app/campagnes/[id]/page.tsx` - Ajout bouton mise à jour
- `src/app/account/page.tsx` - Ajout onglet équipe

### Nouveaux Fichiers

- `src/components/lists/UnlockedReportsListCard.tsx` - Composant spécialisé

### Données Mockées

- Ajout d'une liste spéciale dans les mock data
- Pas de migration DB nécessaire (données mockées uniquement)

---

**🎯 Objectif : Épurer l'interface pour se concentrer sur les fonctionnalités essentielles et améliorer l'expérience utilisateur**

