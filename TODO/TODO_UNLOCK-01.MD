# PLAN D'ACTION PRESCRIPTIF : UNLOCK-01

**User Story :** En tant qu'utilisateur, je veux voir une modale de déblocage de rapports d'audience lors du téléchargement CSV d'une liste, me permettant de consommer des crédits pour débloquer les rapports manquants.

**Objectif :** Créer une modale qui s'affiche lors du téléchargement CSV si des rapports d'audience ne sont pas débloqués, permettant d'acheter l'accès avec des crédits.

---

## Plan d'Action Prescriptif

### Étape 1 : Créer le composant UnlockReportsModal

Créer `src/components/lists/UnlockReportsModal.tsx` :

```tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
  XMarkIcon,
  LockClosedIcon,
  CreditCardIcon,
  UserGroupIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { Influencer } from '@/types';

interface UnlockReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lockedInfluencers: Influencer[];
  onUnlock: (influencerIds: string[]) => void;
  creditsAvailable: number;
}

export default function UnlockReportsModal({
  isOpen,
  onClose,
  lockedInfluencers,
  onUnlock,
  creditsAvailable,
}: UnlockReportsModalProps) {
  const [selectedInfluencers, setSelectedInfluencers] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const creditsPerReport = 2;
  const totalCreditsNeeded = selectedInfluencers.length * creditsPerReport;
  const canUnlock = totalCreditsNeeded <= creditsAvailable;

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedInfluencers([]);
    } else {
      setSelectedInfluencers(lockedInfluencers.map((inf) => inf.id));
    }
    setSelectAll(!selectAll);
  };

  const handleInfluencerToggle = (influencerId: string) => {
    setSelectedInfluencers((prev) =>
      prev.includes(influencerId)
        ? prev.filter((id) => id !== influencerId)
        : [...prev, influencerId]
    );
  };

  const handleUnlock = () => {
    onUnlock(selectedInfluencers);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <LockClosedIcon className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Débloquer les rapports d'audience
              </h2>
              <p className="text-sm text-gray-600">
                Certains influenceurs n'ont pas encore de rapport d'audience
                débloqué
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <UserGroupIcon className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                Rapports verrouillés
              </span>
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {lockedInfluencers.length}
            </span>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <CreditCardIcon className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">
                Crédits disponibles
              </span>
            </div>
            <span className="text-2xl font-bold text-green-900">
              {creditsAvailable}
            </span>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <CheckCircleIcon className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">
                Coût total
              </span>
            </div>
            <span className="text-2xl font-bold text-purple-900">
              {totalCreditsNeeded}
            </span>
          </div>
        </div>

        {/* Liste des influenceurs */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Sélectionner les rapports à débloquer
            </h3>
            <button
              onClick={handleSelectAll}
              className="text-sm text-purple-600 hover:text-purple-700"
            >
              {selectAll ? 'Désélectionner tout' : 'Sélectionner tout'}
            </button>
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto">
            {lockedInfluencers.map((influencer) => (
              <div
                key={influencer.id}
                className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={selectedInfluencers.includes(influencer.id)}
                  onChange={() => handleInfluencerToggle(influencer.id)}
                  className="h-4 w-4 text-purple-600 rounded border-gray-300"
                />
                <img
                  src={influencer.avatar}
                  alt={influencer.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">
                      {influencer.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      @{influencer.username}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {influencer.followers.toLocaleString()} followers
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {creditsPerReport} crédits
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {selectedInfluencers.length > 0 && (
              <span>
                {selectedInfluencers.length} rapport(s) sélectionné(s) •{' '}
                {totalCreditsNeeded} crédits
              </span>
            )}
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button
              onClick={handleUnlock}
              disabled={selectedInfluencers.length === 0 || !canUnlock}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Débloquer ({totalCreditsNeeded} crédits)
            </Button>
          </div>
        </div>

        {!canUnlock && selectedInfluencers.length > 0 && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">
              Crédits insuffisants. Vous avez besoin de{' '}
              {totalCreditsNeeded - creditsAvailable} crédits supplémentaires.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
```

### Étape 2 : Mettre à jour les types

Modifier `src/types/index.ts` pour ajouter les nouveaux types :

```typescript
// Ajouter après les types existants
export interface UnlockReport {
  influencerId: string;
  unlockedAt: string;
  creditsUsed: number;
}

export interface CreditsUsage {
  totalCredits: number;
  usedCredits: number;
  remainingCredits: number;
  history: {
    date: string;
    action: 'unlock_report' | 'search' | 'purchase';
    credits: number;
    description: string;
  }[];
}

// Étendre InfluencerDetails
export interface InfluencerDetails extends Influencer {
  // ... propriétés existantes
  audienceUnlocked: boolean;
  unlockedAt?: string;
}
```

### Étape 3 : Créer le hook useCredits

Créer `src/hooks/useCredits.ts` :

```typescript
import { useState, useEffect } from 'react';
import { CreditsUsage } from '@/types';

export const useCredits = () => {
  const [credits, setCredits] = useState<CreditsUsage>({
    totalCredits: 100,
    usedCredits: 45,
    remainingCredits: 55,
    history: [
      {
        date: '2024-01-15',
        action: 'unlock_report',
        credits: 2,
        description: 'Déblocage rapport @marie_lifestyle',
      },
      {
        date: '2024-01-14',
        action: 'search',
        credits: 5,
        description: 'Recherche influenceurs mode',
      },
      {
        date: '2024-01-10',
        action: 'purchase',
        credits: -50,
        description: 'Achat package 50 crédits',
      },
    ],
  });

  const unlockReports = (influencerIds: string[]) => {
    const creditsNeeded = influencerIds.length * 2;

    if (credits.remainingCredits >= creditsNeeded) {
      setCredits((prev) => ({
        ...prev,
        usedCredits: prev.usedCredits + creditsNeeded,
        remainingCredits: prev.remainingCredits - creditsNeeded,
        history: [
          {
            date: new Date().toISOString().split('T')[0],
            action: 'unlock_report',
            credits: creditsNeeded,
            description: `Déblocage ${influencerIds.length} rapport(s)`,
          },
          ...prev.history,
        ],
      }));
      return true;
    }

    return false;
  };

  return {
    credits,
    unlockReports,
  };
};
```

### Étape 4 : Intégrer dans ExportModal

Modifier `src/components/lists/ExportModal.tsx` pour inclure la vérification des rapports :

```tsx
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import UnlockReportsModal from './UnlockReportsModal';
import { useCredits } from '@/hooks/useCredits';
import { Influencer } from '@/types';

// ... autres imports

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  listName: string;
  influencers: Influencer[];
}

export default function ExportModal({
  isOpen,
  onClose,
  listName,
  influencers,
}: ExportModalProps) {
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [exportFormat, setExportFormat] = useState<'basic' | 'detailed'>(
    'basic'
  );
  const { credits, unlockReports } = useCredits();

  const lockedInfluencers = influencers.filter(
    (inf) => !(inf as any).audienceUnlocked
  );

  const handleExport = () => {
    if (exportFormat === 'detailed' && lockedInfluencers.length > 0) {
      setShowUnlockModal(true);
      return;
    }

    // Procéder à l'export normal
    const csv = generateCSV(influencers, exportFormat);
    downloadCSV(csv, `${listName}.csv`);
    onClose();
  };

  const handleUnlockReports = (influencerIds: string[]) => {
    const success = unlockReports(influencerIds);
    if (success) {
      // Marquer les influenceurs comme débloqués
      // Dans un vrai projet, ceci serait fait via une API
      setShowUnlockModal(false);

      // Procéder à l'export avec les données débloquées
      const csv = generateCSV(influencers, exportFormat);
      downloadCSV(csv, `${listName}.csv`);
      onClose();
    }
  };

  // ... reste du composant

  return (
    <>
      {/* Modal d'export existante */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {/* Contenu de la modale d'export */}
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              {/* ... */}
            </div>

            {/* Options d'export */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Format d'export
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="basic"
                      checked={exportFormat === 'basic'}
                      onChange={(e) => setExportFormat('basic')}
                      className="mr-2"
                    />
                    <span className="text-sm">
                      Basique (nom, followers, engagement)
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="detailed"
                      checked={exportFormat === 'detailed'}
                      onChange={(e) => setExportFormat('detailed')}
                      className="mr-2"
                    />
                    <span className="text-sm">
                      Détaillé (avec données d'audience)
                    </span>
                  </label>
                </div>
              </div>

              {exportFormat === 'detailed' && lockedInfluencers.length > 0 && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-700">
                    {lockedInfluencers.length} influenceur(s) ont des rapports
                    d'audience verrouillés. Ils seront débloqués automatiquement
                    lors de l'export.
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex space-x-3">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Annuler
              </Button>
              <Button onClick={handleExport} className="flex-1">
                Exporter
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de déblocage */}
      <UnlockReportsModal
        isOpen={showUnlockModal}
        onClose={() => setShowUnlockModal(false)}
        lockedInfluencers={lockedInfluencers}
        onUnlock={handleUnlockReports}
        creditsAvailable={credits.remainingCredits}
      />
    </>
  );
}

// Fonctions utilitaires
function generateCSV(
  influencers: Influencer[],
  format: 'basic' | 'detailed'
): string {
  const headers =
    format === 'basic'
      ? ['Nom', 'Username', 'Followers', 'Engagement', "Taux d'engagement"]
      : [
          'Nom',
          'Username',
          'Followers',
          'Engagement',
          "Taux d'engagement",
          'Pays',
          'Email',
          'Audience débloquée',
        ];

  const rows = influencers.map((inf) => {
    const basicData = [
      inf.name,
      inf.username,
      inf.followers.toString(),
      inf.engagement.toString(),
      `${inf.engagementRate}%`,
    ];

    if (format === 'detailed') {
      return [
        ...basicData,
        inf.country,
        inf.email || 'N/A',
        (inf as any).audienceUnlocked ? 'Oui' : 'Non',
      ];
    }

    return basicData;
  });

  return [headers, ...rows].map((row) => row.join(',')).join('\n');
}

function downloadCSV(csv: string, filename: string): void {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
```

### Étape 5 : Mettre à jour les données mockées

Modifier `src/lib/mockData.ts` pour inclure le statut de déblocage :

```typescript
// Ajouter aux données d'influenceurs existantes
export const mockInfluencers = mockInfluencersBase.map((inf, index) => ({
  ...inf,
  audienceUnlocked: index % 3 === 0, // 1/3 des influenceurs ont leurs rapports débloqués
  unlockedAt: index % 3 === 0 ? '2024-01-10' : undefined,
}));

// Ajouter les données de crédits
export const mockCreditsData = {
  totalCredits: 100,
  usedCredits: 45,
  remainingCredits: 55,
  history: [
    {
      date: '2024-01-15',
      action: 'unlock_report' as const,
      credits: 2,
      description: 'Déblocage rapport @marie_lifestyle',
    },
    {
      date: '2024-01-14',
      action: 'search' as const,
      credits: 5,
      description: 'Recherche influenceurs mode',
    },
    {
      date: '2024-01-10',
      action: 'purchase' as const,
      credits: -50,
      description: 'Achat package 50 crédits',
    },
  ],
};
```

---

## Résumé des modifications

✅ **Composant UnlockReportsModal** : Modale interactive pour débloquer les rapports
✅ **Types étendus** : Support du statut de déblocage et gestion des crédits
✅ **Hook useCredits** : Gestion des crédits et historique des actions
✅ **Intégration ExportModal** : Vérification automatique lors de l'export
✅ **Données mockées** : Simulation des statuts de déblocage

Cette fonctionnalité simule parfaitement l'expérience utilisateur de déblocage de rapports d'audience lors de l'export CSV.
