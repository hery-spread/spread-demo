# PLAN D'ACTION PRESCRIPTIF : PRICING-02

**User Story :** En tant qu'utilisateur abonné, je veux pouvoir acheter des crédits supplémentaires quand j'arrive au bout de ma consommation mensuelle, avec des packages de 10, 50 ou 100 crédits, sachant qu'un crédit me donne accès à 15 résultats de recherche ou à un rapport d'audience.

**Objectif :** Ajouter un système d'achat de crédits à la demande dans la page pricing existante, permettant aux utilisateurs de dépasser leurs limites d'abonnement sans changer de plan.

---

## Plan d'Action Prescriptif

### Étape 1 : Étendre les données mockées pour les crédits

Modifier `src/lib/mockData.ts` pour ajouter les données de crédits :

```tsx
// Ajouter après les données existantes

// Données des packages de crédits
export const mockCreditPackages = [
  {
    id: 'credit_10',
    name: 'Pack Démarrage',
    credits: 10,
    price: 15,
    description: '150 recherches ou 10 rapports',
    value: '1,50€ par crédit',
    popular: false,
    savings: null,
  },
  {
    id: 'credit_50',
    name: 'Pack Croissance',
    credits: 50,
    price: 65,
    description: '750 recherches ou 50 rapports',
    value: '1,30€ par crédit',
    popular: true,
    savings: 10, // Économie de 10€ vs 5x pack de 10
  },
  {
    id: 'credit_100',
    name: 'Pack Performance',
    credits: 100,
    price: 120,
    description: '1500 recherches ou 100 rapports',
    value: '1,20€ par crédit',
    popular: false,
    savings: 30, // Économie de 30€ vs 10x pack de 10
  },
];

// Données d'historique d'achat de crédits
export const mockCreditPurchaseHistory = [
  {
    id: 'purchase_1',
    packageId: 'credit_50',
    packageName: 'Pack Croissance',
    credits: 50,
    price: 65,
    purchasedAt: '2024-01-20T14:30:00Z',
    status: 'completed' as const,
    paymentMethod: '•••• •••• •••• 4242',
  },
  {
    id: 'purchase_2',
    packageId: 'credit_10',
    packageName: 'Pack Démarrage',
    credits: 10,
    price: 15,
    purchasedAt: '2024-01-15T09:15:00Z',
    status: 'completed' as const,
    paymentMethod: '•••• •••• •••• 4242',
  },
];

// État actuel des crédits utilisateur
export const mockUserCredits = {
  balance: 23, // Crédits restants
  totalPurchased: 60, // Total acheté
  totalUsed: 37, // Total consommé
  thisMonth: {
    used: 12,
    searches: 180, // 12 crédits = 180 recherches (12 * 15)
    reports: 0,
  },
  history: [
    {
      id: 'usage_1',
      type: 'search' as const,
      creditsUsed: 1,
      resultsCount: 15,
      description: 'Recherche influenceurs mode France',
      usedAt: '2024-01-22T16:45:00Z',
    },
    {
      id: 'usage_2',
      type: 'report' as const,
      creditsUsed: 1,
      influencerId: '1',
      influencerName: 'Zidane',
      description: 'Rapport audience débloqué',
      usedAt: '2024-01-22T14:20:00Z',
    },
    {
      id: 'usage_3',
      type: 'search' as const,
      creditsUsed: 2,
      resultsCount: 30,
      description: 'Recherche influenceurs gaming 18-25 ans',
      usedAt: '2024-01-21T11:30:00Z',
    },
  ],
};

// Fonctions utilitaires pour les crédits
export function getCreditPackages() {
  return Promise.resolve(mockCreditPackages);
}

export function getUserCredits() {
  return Promise.resolve(mockUserCredits);
}

export function purchaseCreditPackage(packageId: string): Promise<{
  success: boolean;
  transactionId?: string;
  newBalance?: number;
  error?: string;
}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const package_ = mockCreditPackages.find((p) => p.id === packageId);
      if (package_) {
        const newBalance = mockUserCredits.balance + package_.credits;
        mockUserCredits.balance = newBalance;
        mockUserCredits.totalPurchased += package_.credits;

        const newPurchase = {
          id: `purchase_${Date.now()}`,
          packageId: package_.id,
          packageName: package_.name,
          credits: package_.credits,
          price: package_.price,
          purchasedAt: new Date().toISOString(),
          status: 'completed' as const,
          paymentMethod: '•••• •••• •••• 4242',
        };

        mockCreditPurchaseHistory.unshift(newPurchase);

        resolve({
          success: true,
          transactionId: newPurchase.id,
          newBalance,
        });
      } else {
        resolve({
          success: false,
          error: 'Package non trouvé',
        });
      }
    }, 1500); // Simule un temps de traitement payment
  });
}

export function getCreditPurchaseHistory() {
  return Promise.resolve(mockCreditPurchaseHistory);
}
```

### Étape 2 : Ajouter un troisième onglet "Crédits" à la page pricing

Modifier `src/app/pricing/page.tsx` :

```tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
  CalculatorIcon,
  CheckIcon,
  StarIcon,
  CreditCardIcon,
  UserGroupIcon,
  SearchIcon,
  DocumentChartBarIcon,
  CurrencyDollarIcon, // Ajouter cet import
} from '@heroicons/react/24/outline';
import PricingCalculator from '@/components/pricing/PricingCalculator';
import PlanComparison from '@/components/pricing/PlanComparison';
import CreditPackages from '@/components/pricing/CreditPackages'; // Nouveau composant

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState<
    'calculator' | 'plans' | 'credits'
  >('calculator');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tarifs adaptés à votre usage
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculez le plan parfait pour vos campagnes d'influence marketing.
            Payez seulement pour ce que vous utilisez.
          </p>
        </div>
      </div>

      {/* Navigation tabs - Modifier pour 3 onglets */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-center">
          <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'calculator'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <CalculatorIcon className="w-4 h-4 mr-2" />
              Calculateur
            </button>
            <button
              onClick={() => setActiveTab('plans')}
              className={`flex items-center px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'plans'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <CreditCardIcon className="w-4 h-4 mr-2" />
              Plans fixes
            </button>
            <button
              onClick={() => setActiveTab('credits')}
              className={`flex items-center px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'credits'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <CurrencyDollarIcon className="w-4 h-4 mr-2" />
              Crédits supplémentaires
            </button>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        {activeTab === 'calculator' && <PricingCalculator />}
        {activeTab === 'plans' && <PlanComparison />}
        {activeTab === 'credits' && <CreditPackages />}
      </div>

      {/* FAQ Section - Ajouter une question sur les crédits */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Questions fréquentes
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Quelle est la différence entre recherches et rapports ?
              </h3>
              <p className="text-gray-600">
                Les recherches permettent de trouver des influenceurs selon vos
                critères. Les rapports débloquent les données d'audience
                détaillées (démographie, intérêts, etc.).
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Comment fonctionnent les crédits supplémentaires ?
              </h3>
              <p className="text-gray-600">
                Chaque crédit vous donne accès à 15 résultats de recherche OU à
                1 rapport d'audience. Les crédits achetés n'expirent jamais et
                s'ajoutent à votre quota mensuel. Parfait pour les pics
                d'activité !
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Puis-je changer de plan à tout moment ?
              </h3>
              <p className="text-gray-600">
                Oui, vous pouvez upgrader ou downgrader votre plan à tout
                moment. Les changements sont effectifs immédiatement avec
                proratisation.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Que se passe-t-il si je dépasse mes limites ?
              </h3>
              <p className="text-gray-600">
                Vous pouvez acheter des crédits supplémentaires ou upgrader
                votre plan. Nous vous préviendrons avant d'atteindre vos
                limites.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Étape 3 : Créer le composant CreditPackages

Créer `src/components/pricing/CreditPackages.tsx` :

```tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import {
  CurrencyDollarIcon,
  CheckCircleIcon,
  ClockIcon,
  StarIcon,
  SparklesIcon,
  SearchIcon,
  DocumentChartBarIcon,
  BoltIcon,
} from '@heroicons/react/24/outline';
import {
  getCreditPackages,
  getUserCredits,
  purchaseCreditPackage,
  getCreditPurchaseHistory,
} from '@/lib/mockData';

interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  price: number;
  description: string;
  value: string;
  popular: boolean;
  savings: number | null;
}

interface UserCredits {
  balance: number;
  totalPurchased: number;
  totalUsed: number;
  thisMonth: {
    used: number;
    searches: number;
    reports: number;
  };
}

interface PurchaseHistory {
  id: string;
  packageName: string;
  credits: number;
  price: number;
  purchasedAt: string;
  status: 'completed' | 'pending' | 'failed';
}

export default function CreditPackages() {
  const [packages, setPackages] = useState<CreditPackage[]>([]);
  const [userCredits, setUserCredits] = useState<UserCredits | null>(null);
  const [purchaseHistory, setPurchaseHistory] = useState<PurchaseHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [packagesData, creditsData, historyData] = await Promise.all([
          getCreditPackages(),
          getUserCredits(),
          getCreditPurchaseHistory(),
        ]);

        setPackages(packagesData);
        setUserCredits(creditsData);
        setPurchaseHistory(historyData);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handlePurchase = async (packageId: string) => {
    setPurchasing(packageId);

    try {
      const result = await purchaseCreditPackage(packageId);

      if (result.success) {
        // Mettre à jour les crédits utilisateur
        if (userCredits && result.newBalance) {
          setUserCredits({
            ...userCredits,
            balance: result.newBalance,
          });
        }

        // Recharger l'historique
        const newHistory = await getCreditPurchaseHistory();
        setPurchaseHistory(newHistory);

        // Afficher un message de succès (en vrai, on utiliserait un toast)
        alert('Crédits ajoutés avec succès !');
      } else {
        alert("Erreur lors de l'achat: " + result.error);
      }
    } catch (error) {
      console.error('Erreur achat:', error);
      alert("Erreur technique lors de l'achat");
    } finally {
      setPurchasing(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header avec solde actuel */}
      {userCredits && (
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold">{userCredits.balance}</div>
              <div className="text-purple-100">Crédits disponibles</div>
            </div>
            <div>
              <div className="text-3xl font-bold">
                {userCredits.thisMonth.used}
              </div>
              <div className="text-purple-100">Utilisés ce mois</div>
            </div>
            <div>
              <div className="text-3xl font-bold">
                {userCredits.balance * 15}
              </div>
              <div className="text-purple-100">Recherches restantes</div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-purple-300 text-center">
            <p className="text-purple-100">
              <SparklesIcon className="w-4 h-4 inline mr-1" />1 crédit = 15
              résultats de recherche OU 1 rapport d'audience
            </p>
          </div>
        </div>
      )}

      {/* Explication des crédits */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          Augmentez votre capacité avec des crédits supplémentaires
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-3">
            <div className="bg-green-100 rounded-lg p-2">
              <SearchIcon className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                Pour vos recherches
              </h3>
              <p className="text-gray-600 text-sm">
                Dépassez votre quota mensuel quand vous avez un pic d'activité.
                1 crédit = 15 résultats de recherche avec tous les filtres.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-blue-100 rounded-lg p-2">
              <DocumentChartBarIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Pour vos rapports</h3>
              <p className="text-gray-600 text-sm">
                Débloquez l'analyse d'audience complète des influenceurs. 1
                crédit = 1 rapport avec toutes les données démographiques.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Packages de crédits */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 text-center mb-6">
          Choisissez votre pack de crédits
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((package_) => (
            <div
              key={package_.id}
              className={`relative rounded-xl border-2 bg-white p-6 shadow-sm transition-all hover:shadow-lg ${
                package_.popular
                  ? 'border-purple-500 shadow-lg scale-105'
                  : 'border-gray-200'
              }`}
            >
              {/* Badge populaire */}
              {package_.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-500 text-white px-3 py-1 text-sm font-semibold rounded-full flex items-center">
                    <StarIcon className="w-3 h-3 mr-1" />
                    Plus populaire
                  </span>
                </div>
              )}

              {/* Header du package */}
              <div className="text-center mb-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  {package_.name}
                </h4>

                <div className="mb-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {package_.price}€
                  </span>
                </div>

                <div className="text-purple-600 font-semibold mb-2">
                  {package_.credits} crédits
                </div>

                <div className="text-sm text-gray-600 mb-2">
                  {package_.description}
                </div>

                <div className="text-sm font-medium text-green-600">
                  {package_.value}
                </div>

                {package_.savings && (
                  <div className="text-sm font-medium text-orange-600 mt-1">
                    Économie de {package_.savings}€
                  </div>
                )}
              </div>

              {/* Équivalences */}
              <div className="space-y-2 mb-6 text-sm">
                <div className="flex items-center justify-between py-1">
                  <span className="text-gray-600">Recherches</span>
                  <span className="font-semibold">
                    {package_.credits * 15} résultats
                  </span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-gray-600">Rapports</span>
                  <span className="font-semibold">
                    {package_.credits} rapports
                  </span>
                </div>
                <div className="flex items-center justify-between py-1 border-t pt-2">
                  <span className="text-gray-600">Prix par crédit</span>
                  <span className="font-semibold text-purple-600">
                    {(package_.price / package_.credits).toFixed(2)}€
                  </span>
                </div>
              </div>

              {/* CTA */}
              <Button
                onClick={() => handlePurchase(package_.id)}
                disabled={purchasing === package_.id}
                className={`w-full py-3 ${
                  package_.popular
                    ? 'bg-purple-600 hover:bg-purple-700'
                    : 'bg-gray-900 hover:bg-gray-800'
                }`}
              >
                {purchasing === package_.id ? (
                  <>
                    <ClockIcon className="w-4 h-4 mr-2 animate-spin" />
                    Traitement...
                  </>
                ) : (
                  <>
                    <BoltIcon className="w-4 h-4 mr-2" />
                    Acheter maintenant
                  </>
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center mt-2">
                Crédits ajoutés instantanément • Pas d'expiration
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Historique des achats */}
      {purchaseHistory.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Historique des achats
            </h3>
          </div>
          <div className="divide-y divide-gray-200">
            {purchaseHistory.slice(0, 5).map((purchase) => (
              <div
                key={purchase.id}
                className="p-4 flex items-center justify-between"
              >
                <div>
                  <div className="font-medium text-gray-900">
                    {purchase.packageName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(purchase.purchasedAt).toLocaleDateString(
                      'fr-FR',
                      {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      }
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">
                    +{purchase.credits} crédits
                  </div>
                  <div className="text-sm text-gray-500">{purchase.price}€</div>
                </div>
                <div className="ml-4">
                  <CheckCircleIcon className="w-5 h-5 text-green-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA vers les plans */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-8 text-center text-white">
        <h3 className="text-2xl font-bold mb-2">
          Besoin de plus de crédits régulièrement ?
        </h3>
        <p className="text-gray-300 mb-6">
          Nos plans fixes incluent plus de crédits mensuels et peuvent être plus
          économiques pour un usage intensif.
        </p>
        <Button
          variant="outline"
          className="bg-white text-gray-900 hover:bg-gray-100"
          onClick={() => {
            // En vrai, on utiliserait le router pour changer d'onglet
            const event = new CustomEvent('changePricingTab', {
              detail: 'plans',
            });
            window.dispatchEvent(event);
          }}
        >
          Voir les plans fixes
        </Button>
      </div>
    </div>
  );
}
```

### Étape 4 : Créer un hook pour gérer les crédits

Créer `src/hooks/useCredits.ts` :

```tsx
import { useState, useEffect } from 'react';
import {
  getUserCredits,
  getCreditPackages,
  purchaseCreditPackage,
  getCreditPurchaseHistory,
} from '@/lib/mockData';

interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  price: number;
  description: string;
  value: string;
  popular: boolean;
  savings: number | null;
}

interface UserCredits {
  balance: number;
  totalPurchased: number;
  totalUsed: number;
  thisMonth: {
    used: number;
    searches: number;
    reports: number;
  };
  history: Array<{
    id: string;
    type: 'search' | 'report';
    creditsUsed: number;
    description: string;
    usedAt: string;
  }>;
}

interface PurchaseHistory {
  id: string;
  packageName: string;
  credits: number;
  price: number;
  purchasedAt: string;
  status: 'completed' | 'pending' | 'failed';
  paymentMethod: string;
}

export function useCredits() {
  const [userCredits, setUserCredits] = useState<UserCredits | null>(null);
  const [packages, setPackages] = useState<CreditPackage[]>([]);
  const [purchaseHistory, setPurchaseHistory] = useState<PurchaseHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState<string | null>(null);

  // Charger les données initiales
  useEffect(() => {
    const loadData = async () => {
      try {
        const [creditsData, packagesData, historyData] = await Promise.all([
          getUserCredits(),
          getCreditPackages(),
          getCreditPurchaseHistory(),
        ]);

        setUserCredits(creditsData);
        setPackages(packagesData);
        setPurchaseHistory(historyData);
      } catch (error) {
        console.error('Erreur lors du chargement des crédits:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Acheter un package de crédits
  const buyCredits = async (packageId: string) => {
    setPurchasing(packageId);

    try {
      const result = await purchaseCreditPackage(packageId);

      if (result.success && result.newBalance) {
        // Mettre à jour le solde
        setUserCredits((prev) =>
          prev
            ? {
                ...prev,
                balance: result.newBalance!,
              }
            : null
        );

        // Recharger l'historique
        const newHistory = await getCreditPurchaseHistory();
        setPurchaseHistory(newHistory);

        return { success: true, newBalance: result.newBalance };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Erreur achat crédits:', error);
      return { success: false, error: 'Erreur technique' };
    } finally {
      setPurchasing(null);
    }
  };

  // Utiliser des crédits (pour simulation)
  const useCredits = async (type: 'search' | 'report', amount: number = 1) => {
    if (!userCredits || userCredits.balance < amount) {
      return { success: false, error: 'Crédits insuffisants' };
    }

    // Simuler l'utilisation
    const newBalance = userCredits.balance - amount;
    setUserCredits((prev) =>
      prev
        ? {
            ...prev,
            balance: newBalance,
            totalUsed: prev.totalUsed + amount,
            thisMonth: {
              ...prev.thisMonth,
              used: prev.thisMonth.used + amount,
              searches:
                type === 'search'
                  ? prev.thisMonth.searches + amount * 15
                  : prev.thisMonth.searches,
              reports:
                type === 'report'
                  ? prev.thisMonth.reports + amount
                  : prev.thisMonth.reports,
            },
          }
        : null
    );

    return { success: true, newBalance };
  };

  // Vérifier si l'utilisateur a assez de crédits
  const hasEnoughCredits = (required: number = 1) => {
    return userCredits ? userCredits.balance >= required : false;
  };

  // Obtenir le nombre de recherches possibles
  const getAvailableSearches = () => {
    return userCredits ? userCredits.balance * 15 : 0;
  };

  // Obtenir le package le plus populaire
  const getPopularPackage = () => {
    return packages.find((p) => p.popular) || packages[0];
  };

  // Calculer les économies d'un package
  const calculateSavings = (packageObj: CreditPackage) => {
    const basePackage = packages.find((p) => p.credits === 10);
    if (!basePackage || packageObj.credits === 10) return 0;

    const basePrice = (packageObj.credits / 10) * basePackage.price;
    return Math.round(basePrice - packageObj.price);
  };

  return {
    // États
    userCredits,
    packages,
    purchaseHistory,
    loading,
    purchasing,

    // Actions
    buyCredits,
    useCredits,

    // Helpers
    hasEnoughCredits,
    getAvailableSearches,
    getPopularPackage,
    calculateSavings,
  };
}

export default useCredits;
```

### Étape 5 : Ajouter une alerte de crédits insuffisants

Créer `src/components/ui/CreditAlert.tsx` :

```tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
  ExclamationTriangleIcon,
  CurrencyDollarIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

interface CreditAlertProps {
  currentCredits: number;
  requiredCredits: number;
  onBuyCredits: () => void;
  onClose: () => void;
  type: 'search' | 'report';
}

export default function CreditAlert({
  currentCredits,
  requiredCredits,
  onBuyCredits,
  onClose,
  type,
}: CreditAlertProps) {
  const missingCredits = requiredCredits - currentCredits;
  const action = type === 'search' ? 'cette recherche' : 'ce rapport';
  const equivalent =
    type === 'search'
      ? `${requiredCredits * 15} résultats`
      : `${requiredCredits} rapport${requiredCredits > 1 ? 's' : ''}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
        {/* Bouton fermer */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        {/* Icône d'alerte */}
        <div className="flex justify-center mb-4">
          <div className="bg-orange-100 rounded-full p-3">
            <ExclamationTriangleIcon className="w-8 h-8 text-orange-600" />
          </div>
        </div>

        {/* Contenu */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Crédits insuffisants
          </h3>
          <p className="text-gray-600 mb-4">
            Vous avez{' '}
            <span className="font-semibold">{currentCredits} crédits</span> mais
            il vous en faut{' '}
            <span className="font-semibold">{requiredCredits}</span> pour{' '}
            {action}.
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="text-sm text-gray-600">
              <div className="font-medium mb-2">Il vous manque :</div>
              <div className="text-lg font-bold text-purple-600">
                {missingCredits} crédit{missingCredits > 1 ? 's' : ''}
              </div>
              <div className="text-xs mt-1">({equivalent})</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            onClick={onBuyCredits}
            className="w-full bg-purple-600 hover:bg-purple-700 py-3"
          >
            <CurrencyDollarIcon className="w-4 h-4 mr-2" />
            Acheter des crédits
          </Button>

          <Button variant="outline" onClick={onClose} className="w-full">
            Annuler
          </Button>
        </div>

        {/* Note */}
        <p className="text-xs text-gray-500 text-center mt-4">
          Les crédits n'expirent jamais et peuvent être utilisés pour des
          recherches ou des rapports d'audience.
        </p>
      </div>
    </div>
  );
}
```

### Étape 6 : Ajouter un indicateur de crédits dans le header

Modifier `src/components/layout/Header.tsx` pour ajouter un indicateur de crédits :

```tsx
// Ajouter dans les imports
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { useCredits } from '@/hooks/useCredits';

// Dans le composant Header, ajouter après les autres éléments
const { userCredits, loading } = useCredits();

// Ajouter dans la partie droite du header, avant les autres boutons
{
  !loading && userCredits && (
    <div className="flex items-center space-x-2 px-3 py-1 bg-purple-50 rounded-lg">
      <CurrencyDollarIcon className="w-4 h-4 text-purple-600" />
      <span className="text-sm font-medium text-purple-900">
        {userCredits.balance} crédits
      </span>
    </div>
  );
}
```

### Étape 7 : Intégrer les alertes de crédits dans les pages de recherche

Modifier `src/app/search/page.tsx` pour vérifier les crédits avant recherche :

```tsx
// Ajouter dans les imports
import { useCredits } from '@/hooks/useCredits';
import CreditAlert from '@/components/ui/CreditAlert';

// Dans le composant, ajouter les états
const {
  userCredits,
  hasEnoughCredits,
  useCredits: consumeCredits,
} = useCredits();
const [showCreditAlert, setShowCreditAlert] = useState(false);
const [pendingSearchCredits, setPendingSearchCredits] = useState(0);

// Modifier la fonction de recherche
const handleSearch = async (searchData: any) => {
  const estimatedCredits = Math.ceil(searchData.estimatedResults / 15);

  if (!hasEnoughCredits(estimatedCredits)) {
    setPendingSearchCredits(estimatedCredits);
    setShowCreditAlert(true);
    return;
  }

  // Procéder à la recherche
  setIsLoading(true);
  try {
    // Consommer les crédits
    await consumeCredits('search', estimatedCredits);

    // Effectuer la recherche
    const results = await searchInfluencers(searchData);
    setInfluencers(results);
  } catch (error) {
    console.error('Erreur recherche:', error);
  } finally {
    setIsLoading(false);
  }
};

// Ajouter avant le return
{
  showCreditAlert && userCredits && (
    <CreditAlert
      currentCredits={userCredits.balance}
      requiredCredits={pendingSearchCredits}
      type="search"
      onBuyCredits={() => {
        setShowCreditAlert(false);
        // Rediriger vers l'onglet crédits
        window.location.href = '/pricing#credits';
      }}
      onClose={() => setShowCreditAlert(false)}
    />
  );
}
```

---

## Résumé des modifications

✅ **Données mockées étendues** : Packages de crédits, historique, solde utilisateur  
✅ **Troisième onglet "Crédits"** : Interface d'achat de crédits dans le pricing  
✅ **Composant CreditPackages** : Affichage des packages avec achat instantané  
✅ **Hook useCredits** : Gestion complète des crédits (achat, utilisation, vérification)  
✅ **Alerte crédits insuffisants** : Modal pour prévenir et rediriger vers l'achat  
✅ **Indicateur dans le header** : Affichage du solde de crédits  
✅ **Intégration recherche** : Vérification des crédits avant recherche

Ce système permet aux utilisateurs d'acheter des crédits supplémentaires quand ils dépassent leur quota mensuel, avec une UX fluide et des conversions optimisées.
