# TODO_COMM-01 - Harmonisation du Système de Communication

## 📋 Vue d'ensemble

Refactorisation et harmonisation complète du système de communication dispersé dans l'application pour créer une expérience cohérente et centralisée.

## 🎯 Objectifs

- Centraliser tous les flux de communication dans une interface unifiée
- Harmoniser les composants email dispersés (BulkEmailModal, EmailThreads, etc.)
- Créer un design system pour les communications
- Unifier les states et la logique de gestion des emails

## 📦 Composants à refactoriser/créer

- `CommunicationHub.tsx` - Hub central de communication
- `UnifiedEmailModal.tsx` - Modale email unifiée
- `CommunicationSidebar.tsx` - Sidebar dédiée communication
- `ThreadViewer.tsx` - Visualiseur unifié des conversations

## 🗂️ Plan d'Action Prescriptif

### ✅ Étape 1 : Audit du système actuel

- [ ] Analyser tous les composants de communication existants
- [ ] Identifier les redondances et incohérences
- [ ] Mapper les flux utilisateur actuels
- [ ] Documenter les patterns à harmoniser

### ✅ Étape 2 : Créer l'architecture unifiée

- [ ] Définir les types unifiés dans `src/types/communication.ts`
- [ ] Créer le context `CommunicationContext` pour l'état global
- [ ] Définir les hooks réutilisables (`useCommunication`, `useEmailThreads`)
- [ ] Établir les patterns de données cohérents

### ✅ Étape 3 : Développer le hub central

- [ ] Créer `src/components/communication/CommunicationHub.tsx`
- [ ] Interface unifiée pour tous types de communication
- [ ] Onglets pour emails, messages, historique
- [ ] Intégration avec le CRM existant

### ✅ Étape 4 : Refactoriser les modales existantes

- [ ] Unifier `BulkEmailModal` et `EmailModal` en `UnifiedEmailModal`
- [ ] Harmoniser les interfaces et comportements
- [ ] Simplifier les props et améliorer la réutilisabilité
- [ ] Migrer tous les usages existants

### ✅ Étape 5 : Créer la navigation communication

- [ ] Développer `CommunicationSidebar.tsx`
- [ ] Menu contextuel selon le type de communication
- [ ] Filtres unifiés (status, date, type, etc.)
- [ ] Recherche globale dans toutes les communications

### ✅ Étape 6 : Unifier l'affichage des conversations

- [ ] Refactoriser `EmailThreads.tsx` en `ThreadViewer.tsx`
- [ ] Support multi-canaux (email, LinkedIn, etc.)
- [ ] Interface cohérente pour tous types de messages
- [ ] Actions rapides unifiées (répondre, transférer, etc.)

### ✅ Étape 7 : Migrer les pages existantes

- [ ] Refactoriser `src/app/communications/page.tsx`
- [ ] Migrer les composants profile qui utilisent les emails
- [ ] Adapter les listes pour utiliser le nouveau système
- [ ] Mettre à jour la navigation globale

### ✅ Étape 8 : Tests et validation

- [ ] Tester la migration de tous les flux existants
- [ ] Valider la cohérence des interfaces
- [ ] Performance du système unifié
- [ ] Corriger build/lint errors

## 🎨 Spécifications UX/UI

- Design system cohérent pour toutes les communications
- Navigation intuitive entre les différents canaux
- États visuels unifiés (lu/non lu, envoyé, en attente)
- Responsive design pour tous les composants
- Respect strict de DESIGN/layouts.MD et colors.MD

## 🔗 Dépendances

- EMAIL-COMMUNICATIONS (système existant)
- CRM-01 (intégration CRM)
- UI-01, UI-02 (composants de base)
- LISTS-01 à LISTS-05 (listes existantes)

## ✋ Points d'attention

- Migration sans rupture des fonctionnalités existantes
- Préservation des données et conversations
- Compatibilité avec les intégrations externes
- Formation utilisateur sur la nouvelle interface

## 📊 Critères de validation

- [ ] Build sans erreur (`npm run build`)
- [ ] Lint sans warning (`npm run lint`)
- [ ] Migration complète sans perte de fonctionnalité
- [ ] Interface cohérente dans toute l'app
- [ ] Performance équivalente ou améliorée
- [ ] Tests utilisateur positifs sur la nouvelle UX
