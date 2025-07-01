# PLAN D'ACTION PRESCRIPTIF : PROFILE-03

**User Story :** En tant qu'utilisateur, je veux un système de verrouillage par crédits pour débloquer les rapports détaillés d'influenceurs afin de contrôler ma consommation.

**Objectif :** Implémenter le système de crédits et de déverrouillage des rapports détaillés.

---

## Plan d'Action Prescriptif

### Étape 1 : Créer le composant UnlockModal

Créer `src/components/profile/UnlockModal.tsx` :

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  XMarkIcon,
  LockClosedIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";
import { Influencer } from "@/types";

interface UnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  influencer: Influencer;
  onUnlock: () => Promise<void>;
  currentCredits: number;
}

export default function UnlockModal({
  isOpen,
  onClose,
  influencer,
  onUnlock,
  currentCredits,
}: UnlockModalProps) {
  const [unlocking, setUnlocking] = useState(false);
  const creditCost = 1;

  if (!isOpen) return null;

  const handleUnlock = async () => {
    if (currentCredits < creditCost) return;

    setUnlocking(true);
    try {
      await onUnlock();
      onClose();
    } catch (error) {
      console.error("Erreur lors du déverrouillage:", error);
    } finally {
      setUnlocking(false);
    }
  };

  const canUnlock = currentCredits >= creditCost;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Débloquer le rapport détaillé
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Contenu */}
        <div className="space-y-4">
          {/* Influenceur */}
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <img
              src={influencer.avatar}
              alt={influencer.name}
              className="w-12 h-12 rounded-full object-cover"
              onError={(e) => {
                (
                  e.target as HTMLImageElement
                ).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  influencer.name
                )}&background=6366f1&color=fff`;
              }}
            />
            <div>
              <div className="font-medium text-gray-900">{influencer.name}</div>
              <div className="text-sm text-gray-500">
                @{influencer.username}
              </div>
            </div>
          </div>

          {/* Coût */}
          <div className="flex items-center justify-between p-4 border border-purple-200 rounded-lg bg-purple-50">
            <div className="flex items-center space-x-2">
              <LockClosedIcon className="w-5 h-5 text-purple-600" />
              <span className="font-medium text-purple-900">
                Rapport détaillé
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <CreditCardIcon className="w-4 h-4 text-purple-600" />
              <span className="font-semibold text-purple-900">
                {creditCost} crédit
              </span>
            </div>
          </div>

          {/* Ce qui sera débloqué */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">
              Ce qui sera débloqué :
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span>Analyse démographique détaillée (âge, genre)</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span>Géolocalisation de l'audience (pays, villes)</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span>Centres d'intérêt et marques favorites</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span>Statistiques de performance avancées</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span>Langues et ethnicités de l'audience</span>
              </li>
            </ul>
          </div>

          {/* Crédits disponibles */}
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <span className="text-sm font-medium text-blue-900">
              Crédits disponibles
            </span>
            <span className="font-semibold text-blue-900">
              {currentCredits}
            </span>
          </div>

          {/* Avertissement si pas assez de crédits */}
          {!canUnlock && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <span className="text-red-500">⚠️</span>
                <span className="text-sm font-medium text-red-800">
                  Crédits insuffisants
                </span>
              </div>
              <p className="text-sm text-red-700 mt-1">
                Vous avez besoin de {creditCost} crédit pour débloquer ce
                rapport.
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3 mt-6">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Annuler
          </Button>
          <Button
            onClick={handleUnlock}
            disabled={!canUnlock || unlocking}
            className="flex-1"
          >
            {unlocking
              ? "Déverrouillage..."
              : `Débloquer (${creditCost} crédit)`}
          </Button>
        </div>

        {/* Lien vers les crédits */}
        {!canUnlock && (
          <div className="mt-3 text-center">
            <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
              Acheter plus de crédits
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
```

### Étape 2 : Créer le hook useCredits

Créer `src/hooks/useCredits.ts` :

```tsx
import { useState, useEffect } from "react";

interface CreditTransaction {
  id: string;
  type: "unlock" | "purchase" | "refund";
  amount: number;
  description: string;
  date: string;
  influencerId?: string;
}

export function useCredits() {
  const [credits, setCredits] = useState(0);
  const [transactions, setTransactions] = useState<CreditTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement des crédits depuis l'API
    setTimeout(() => {
      // Données mockées - normalement depuis l'API utilisateur
      setCredits(25); // L'utilisateur a 25 crédits disponibles
      setTransactions([
        {
          id: "1",
          type: "purchase",
          amount: 50,
          description: "Achat de crédits - Pack Pro",
          date: "2024-06-15T10:00:00Z",
        },
        {
          id: "2",
          type: "unlock",
          amount: -1,
          description: "Rapport débloqué - Nabilla Vergara",
          date: "2024-06-20T14:30:00Z",
          influencerId: "2",
        },
        {
          id: "3",
          type: "unlock",
          amount: -1,
          description: "Rapport débloqué - Squeezie",
          date: "2024-06-22T09:15:00Z",
          influencerId: "3",
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const spendCredits = async (
    amount: number,
    description: string,
    influencerId?: string
  ): Promise<boolean> => {
    if (credits < amount) {
      throw new Error("Crédits insuffisants");
    }

    // Simuler l'API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTransaction: CreditTransaction = {
          id: Date.now().toString(),
          type: "unlock",
          amount: -amount,
          description,
          date: new Date().toISOString(),
          influencerId,
        };

        setCredits((prev) => prev - amount);
        setTransactions((prev) => [newTransaction, ...prev]);
        resolve(true);
      }, 1000);
    });
  };

  const addCredits = async (
    amount: number,
    description: string
  ): Promise<boolean> => {
    // Simuler l'achat de crédits
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTransaction: CreditTransaction = {
          id: Date.now().toString(),
          type: "purchase",
          amount,
          description,
          date: new Date().toISOString(),
        };

        setCredits((prev) => prev + amount);
        setTransactions((prev) => [newTransaction, ...prev]);
        resolve(true);
      }, 1000);
    });
  };

  return {
    credits,
    transactions,
    loading,
    spendCredits,
    addCredits,
  };
}
```

### Étape 3 : Créer le composant LockedContent

Créer `src/components/profile/LockedContent.tsx` :

```tsx
"use client";

import { Button } from "@/components/ui/Button";
import { LockClosedIcon, CreditCardIcon } from "@heroicons/react/24/outline";

interface LockedContentProps {
  title: string;
  description: string;
  onUnlock: () => void;
  creditCost?: number;
  features?: string[];
}

export default function LockedContent({
  title,
  description,
  onUnlock,
  creditCost = 1,
  features = [],
}: LockedContentProps) {
  return (
    <div className="p-8 text-center">
      {/* Icône de verrouillage */}
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
        <LockClosedIcon className="w-8 h-8 text-gray-400" />
      </div>

      {/* Titre et description */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>

      {/* Fonctionnalités (si fournies) */}
      {features.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 mb-3">
            Ce qui sera débloqué :
          </h4>
          <ul className="text-sm text-gray-600 space-y-1 max-w-sm mx-auto">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span className="text-left">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Coût */}
      <div className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-50 border border-purple-200 rounded-lg mb-6">
        <CreditCardIcon className="w-4 h-4 text-purple-600" />
        <span className="text-sm font-medium text-purple-900">
          {creditCost} crédit{creditCost > 1 ? "s" : ""}
        </span>
      </div>

      {/* Bouton de déverrouillage */}
      <Button onClick={onUnlock} size="lg">
        <LockClosedIcon className="w-4 h-4 mr-2" />
        Débloquer maintenant
      </Button>

      {/* Note */}
      <p className="text-xs text-gray-500 mt-4">
        Les données débloquées restent accessibles en permanence
      </p>
    </div>
  );
}
```

### Étape 4 : Mettre à jour la page de profil avec le système de crédits

Modifier `src/app/profile/[id]/page.tsx` pour intégrer le système de crédits :

```tsx
// Ajouter les imports
import { useCredits } from "@/hooks/useCredits";
import UnlockModal from "@/components/profile/UnlockModal";
import LockedContent from "@/components/profile/LockedContent";
import { unlockInfluencerReport } from "@/lib/mockData";

// Dans le composant, ajouter les états
export default function ProfilePage() {
  // ... états existants
  const { credits, spendCredits } = useCredits();
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [unlockingReport, setUnlockingReport] = useState(false);

  // Fonction pour débloquer le rapport
  const handleUnlockReport = async () => {
    if (!influencer) return;

    try {
      setUnlockingReport(true);

      // Dépenser les crédits
      await spendCredits(1, `Rapport débloqué - ${influencer.name}`, influencer.id);

      // Simuler le déverrouillage du rapport
      const unlockedData = await unlockInfluencerReport(influencer.id);
      if (unlockedData) {
        setDetailedData(unlockedData);
      }
    } catch (error) {
      console.error("Erreur lors du déverrouillage:", error);
    } finally {
      setUnlockingReport(false);
    }
  };

  // Modifier le case "audience" dans renderTabContent()
  case "audience":
    if (!detailedData) {
      return (
        <LockedContent
          title="Données d'audience verrouillées"
          description="Débloquez l'analyse détaillée de l'audience pour cet influenceur et accédez à des insights précieux sur ses followers."
          onUnlock={() => setShowUnlockModal(true)}
          creditCost={1}
          features={[
            "Répartition par âge et genre",
            "Géolocalisation (pays et villes)",
            "Centres d'intérêt détaillés",
            "Marques favorites de l'audience",
            "Langues et ethnicités"
          ]}
        />
      );
    }
    // ... reste du code d'audience existant

  // Ajouter la modal à la fin du JSX
  return (
    <div className="space-y-6">
      {/* ... contenu existant */}

      {/* Modal de déverrouillage */}
      {influencer && (
        <UnlockModal
          isOpen={showUnlockModal}
          onClose={() => setShowUnlockModal(false)}
          influencer={influencer}
          onUnlock={handleUnlockReport}
          currentCredits={credits}
        />
      )}
    </div>
  );
}
```

### Étape 5 : Vérifier l'installation

```bash
npm run lint
npm run build
```

---

## Checklist de Validation

- [ ] Étape 1 : Composant UnlockModal créé avec interface de déverrouillage
- [ ] Étape 2 : Hook useCredits créé pour gestion des crédits
- [ ] Étape 3 : Composant LockedContent créé pour contenu verrouillé
- [ ] Étape 4 : Page de profil mise à jour avec système de crédits
- [ ] Étape 5 : Lint et build passent sans erreur
