# TODO_EMAIL-COMMUNICATIONS - Système de Communication en Masse et Suivi Email

## 📋 Vue d'ensemble

Implémentation d'un système complet de communication email avec les influenceurs, permettant le contact en masse et le suivi des conversations, similaire à Lemlist.

## 🎯 Objectifs

- Permettre l'envoi d'emails en masse depuis une liste
- Afficher l'historique des conversations dans les profils
- Centraliser toutes les communications
- Intégrer avec Gmail/Outlook

## 📦 Composants à créer

- `BulkEmailModal.tsx` - Modale de contact en masse
- `EmailThreads.tsx` - Affichage des fils de conversation
- `EmailCentralized.tsx` - Page centralisée des emails
- `EmailIntegration.tsx` - Configuration des intégrations

## 🗂️ Plan d'Action Prescriptif

### ✅ Étape 1 : Créer les types de données email

- [ ] Ajouter les types Email dans `src/types/index.ts`
- [ ] Créer les interfaces pour les conversations
- [ ] Définir les types d'intégration email

### ✅ Étape 2 : Créer les données mockées email

- [ ] Créer `src/lib/mockData/emailData.ts`
- [ ] Ajouter des conversations d'exemple
- [ ] Créer des threads d'emails réalistes

### ✅ Étape 3 : Créer le composant de contact en masse

- [x] Créer `src/components/lists/BulkEmailModal.tsx`
- [x] Intégrer dans `ListCard.tsx`
- [x] Ajouter la logique d'envoi simulé

### ✅ Étape 4 : Ajouter les conversations dans les profils

- [x] Créer `src/components/profile/EmailThreads.tsx`
- [x] Intégrer dans `ProfileTabs.tsx`
- [x] Afficher l'historique des emails

### ✅ Étape 5 : Créer la page centralisée des communications

- [x] Créer `src/app/communications/page.tsx`
- [x] Créer la page avec interface complète
- [x] Ajouter dans la navigation

### ✅ Étape 6 : Intégration email (simulation)

- [x] Créer `src/components/account/EmailIntegration.tsx`
- [x] Ajouter dans la page Account
- [x] Simuler la connexion Gmail/Outlook

### ✅ Étape 7 : Finalisation et tests

- [x] Vérifier la cohérence du design
- [x] Tester tous les flux
- [x] Corriger les erreurs de build/lint

## 🎨 Spécifications UX/UI

- Design cohérent avec le système existant
- Interface inspirée de Lemlist pour la familiarité
- Codes couleur pour les statuts des emails (lu, non lu, répondu)
- Filtres et recherche dans les conversations

## 🔗 Intégrations

- Simulation d'intégration Gmail/Outlook
- Synchronisation avec le CRM existant
- Lien avec les listes d'influenceurs

## ✋ Points d'attention

- Respecter la charte graphique DESIGN/
- Utiliser les composants UI existants
- Maintenir la cohérence avec le CRM
- Données mockées réalistes

## 📊 Critères de validation

- [ ] Build sans erreur (`npm run build`)
- [ ] Lint sans warning (`npm run lint`)
- [ ] Interface fonctionnelle et intuitive
- [ ] Données mockées cohérentes
- [ ] Navigation fluide entre les composants
