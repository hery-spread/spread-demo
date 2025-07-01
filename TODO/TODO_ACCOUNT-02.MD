# PLAN D'ACTION PRESCRIPTIF : ACCOUNT-02

**User Story :** En tant qu'utilisateur, je veux gérer mon abonnement, voir les détails de mon plan et comparer les options disponibles.

**Objectif :** Créer les composants de gestion d'abonnement avec comparaison de plans et mise à niveau.

---

## Plan d'Action Prescriptif

### Étape 1 : Créer le composant PlanComparison

Créer `src/components/account/PlanComparison.tsx` :

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  CheckIcon,
  XMarkIcon,
  StarIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";
import { UserAccount } from "@/types";

interface Plan {
  id: string;
  name: string;
  price: {
    monthly: number;
    annual: number;
    currency: string;
  };
  features: string[];
  limits: {
    searches: number | "unlimited";
    profiles: number;
    users: number;
  };
  popular?: boolean;
  current?: boolean;
}

interface PlanComparisonProps {
  currentAccount: UserAccount;
  onUpgrade: (planId: string, billing: "monthly" | "annual") => Promise<void>;
}

const availablePlans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: { monthly: 49, annual: 490, currency: "EUR" },
    features: [
      "50 profils par mois",
      "100 recherches par mois",
      "1 utilisateur",
      "Export CSV limité",
      "Rapports basiques",
      "Support email",
    ],
    limits: {
      searches: 100,
      profiles: 50,
      users: 1,
    },
  },
  {
    id: "pro",
    name: "Pro",
    price: { monthly: 149, annual: 1490, currency: "EUR" },
    features: [
      "200 profils par mois",
      "Recherches illimitées",
      "5 utilisateurs",
      "Export CSV",
      "Rapports d'audience",
      "Support standard",
      "API access",
    ],
    limits: {
      searches: "unlimited",
      profiles: 200,
      users: 5,
    },
    popular: true,
  },
  {
    id: "elite",
    name: "Elite",
    price: { monthly: 299, annual: 2990, currency: "EUR" },
    features: [
      "500 profils par mois",
      "Recherches illimitées",
      "10 utilisateurs",
      "Export CSV illimité",
      "Rapports d'audience détaillés",
      "Support prioritaire",
      "API access",
      "Manager dédié",
      "Formation personnalisée",
    ],
    limits: {
      searches: "unlimited",
      profiles: 500,
      users: 10,
    },
  },
];

export default function PlanComparison({
  currentAccount,
  onUpgrade,
}: PlanComparisonProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "monthly"
  );
  const [upgrading, setUpgrading] = useState<string | null>(null);

  const currentPlanId = currentAccount.plan.name.toLowerCase();

  const handleUpgrade = async (planId: string) => {
    setUpgrading(planId);
    try {
      await onUpgrade(planId, billingCycle);
    } catch (error) {
      console.error("Erreur lors de la mise à niveau:", error);
    } finally {
      setUpgrading(null);
    }
  };

  const getAnnualSavings = (plan: Plan) => {
    const monthlyCost = plan.price.monthly * 12;
    const annualCost = plan.price.annual;
    const savings = monthlyCost - annualCost;
    const percentage = Math.round((savings / monthlyCost) * 100);
    return { savings, percentage };
  };

  const getPlanStatus = (planId: string) => {
    if (planId === currentPlanId) {
      return "current";
    }

    const planOrder = ["starter", "pro", "elite"];
    const currentIndex = planOrder.indexOf(currentPlanId);
    const planIndex = planOrder.indexOf(planId);

    if (planIndex > currentIndex) {
      return "upgrade";
    } else {
      return "downgrade";
    }
  };

  return (
    <div className="space-y-6">
      {/* Toggle billing cycle */}
      <div className="flex items-center justify-center">
        <div className="bg-gray-100 rounded-lg p-1 flex">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              billingCycle === "monthly"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Mensuel
          </button>
          <button
            onClick={() => setBillingCycle("annual")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              billingCycle === "annual"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Annuel
            <span className="ml-1 text-xs text-green-600 font-semibold">
              -17%
            </span>
          </button>
        </div>
      </div>

      {/* Plans grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {availablePlans.map((plan) => {
          const status = getPlanStatus(plan.id);
          const isCurrent = status === "current";
          const isUpgrade = status === "upgrade";
          const price =
            billingCycle === "monthly"
              ? plan.price.monthly
              : plan.price.annual / 12;
          const annualSavings = getAnnualSavings(plan);

          return (
            <div
              key={plan.id}
              className={`relative rounded-lg border-2 p-6 ${
                plan.popular
                  ? "border-purple-500 shadow-lg"
                  : isCurrent
                  ? "border-green-500"
                  : "border-gray-200"
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-500 text-white px-3 py-1 text-xs font-semibold rounded-full flex items-center">
                    <StarIcon className="w-3 h-3 mr-1" />
                    Populaire
                  </span>
                </div>
              )}

              {/* Current plan badge */}
              {isCurrent && (
                <div className="absolute -top-3 right-4">
                  <span className="bg-green-500 text-white px-3 py-1 text-xs font-semibold rounded-full">
                    Plan actuel
                  </span>
                </div>
              )}

              {/* Plan header */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>

                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900">
                    {price.toFixed(0)}€
                  </span>
                  <span className="text-gray-600">/mois</span>

                  {billingCycle === "annual" && (
                    <div className="text-sm text-green-600 font-medium">
                      Économisez {annualSavings.savings}€/an (
                      {annualSavings.percentage}%)
                    </div>
                  )}
                </div>

                {/* Limits summary */}
                <div className="text-sm text-gray-600 space-y-1">
                  <div>
                    {typeof plan.limits.searches === "number"
                      ? `${plan.limits.searches} recherches`
                      : "Recherches illimitées"}
                  </div>
                  <div>{plan.limits.profiles} profils</div>
                  <div>
                    {plan.limits.users} utilisateur
                    {plan.limits.users > 1 ? "s" : ""}
                  </div>
                </div>
              </div>

              {/* Features list */}
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Action button */}
              <div className="mt-auto">
                {isCurrent ? (
                  <Button variant="outline" className="w-full" disabled>
                    Plan actuel
                  </Button>
                ) : isUpgrade ? (
                  <Button
                    onClick={() => handleUpgrade(plan.id)}
                    disabled={upgrading === plan.id}
                    className="w-full"
                  >
                    <CreditCardIcon className="w-4 h-4 mr-2" />
                    {upgrading === plan.id
                      ? "Mise à niveau..."
                      : "Mettre à niveau"}
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => handleUpgrade(plan.id)}
                    disabled={upgrading === plan.id}
                    className="w-full"
                  >
                    {upgrading === plan.id ? "Changement..." : "Rétrograder"}
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional info */}
      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="text-blue-600 mt-1">ℹ️</div>
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Informations importantes :</p>
            <ul className="space-y-1 text-blue-700">
              <li>• Changement de plan effectif immédiatement</li>
              <li>
                • Facturation au prorata pour les changements en cours de mois
              </li>
              <li>• Annulation possible à tout moment</li>
              <li>• Support client disponible pour toute question</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Étape 2 : Créer le composant SubscriptionDetails

Créer `src/components/account/SubscriptionDetails.tsx` :

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  CreditCardIcon,
  CalendarIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { UserAccount } from "@/types";

interface SubscriptionDetailsProps {
  account: UserAccount;
  onCancelSubscription: () => Promise<void>;
  onReactivateSubscription: () => Promise<void>;
}

export default function SubscriptionDetails({
  account,
  onCancelSubscription,
  onReactivateSubscription,
}: SubscriptionDetailsProps) {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [reactivating, setReactivating] = useState(false);

  // Calculer les dates importantes
  const nextBillingDate = new Date();
  nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);

  const subscriptionEndDate = new Date();
  subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1);
  subscriptionEndDate.setDate(subscriptionEndDate.getDate() - 1);

  const daysUntilBilling = Math.ceil(
    (nextBillingDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const handleCancelSubscription = async () => {
    setCancelling(true);
    try {
      await onCancelSubscription();
      setShowCancelModal(false);
    } catch (error) {
      console.error("Erreur lors de l'annulation:", error);
    } finally {
      setCancelling(false);
    }
  };

  const handleReactivate = async () => {
    setReactivating(true);
    try {
      await onReactivateSubscription();
    } catch (error) {
      console.error("Erreur lors de la réactivation:", error);
    } finally {
      setReactivating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Statut de l'abonnement */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Statut de l'abonnement
          </h3>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <CheckCircleIcon className="w-4 h-4 mr-1" />
            Actif
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Plan actuel
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Plan :</span>
                <span className="font-medium">{account.plan.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Prix :</span>
                <span className="font-medium">
                  {account.plan.price.monthly}€/mois
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Facturation :</span>
                <span className="font-medium">Mensuelle</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Prochaine facturation
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Date :</span>
                <span className="font-medium">
                  {nextBillingDate.toLocaleDateString("fr-FR")}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Montant :</span>
                <span className="font-medium">
                  {account.plan.price.monthly}€
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Dans :</span>
                <span className="font-medium">
                  {daysUntilBilling} jour{daysUntilBilling > 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Utilisation actuelle */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Utilisation ce mois-ci
        </h3>

        <div className="space-y-4">
          {/* Profils */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Profils consultés
              </span>
              <span className="text-sm text-gray-600">
                {account.plan.limits.profiles.used} /{" "}
                {account.plan.limits.profiles.total}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full"
                style={{
                  width: `${
                    (account.plan.limits.profiles.used /
                      account.plan.limits.profiles.total) *
                    100
                  }%`,
                }}
              ></div>
            </div>
          </div>

          {/* Recherches */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Recherches
              </span>
              <span className="text-sm text-gray-600">
                {typeof account.plan.limits.searches === "number"
                  ? `85 / ${account.plan.limits.searches}`
                  : "Illimitées"}
              </span>
            </div>
            {typeof account.plan.limits.searches === "number" && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{
                    width: `${(85 / account.plan.limits.searches) * 100}%`,
                  }}
                ></div>
              </div>
            )}
          </div>

          {/* Utilisateurs */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Utilisateurs
              </span>
              <span className="text-sm text-gray-600">
                {account.plan.limits.users.used} /{" "}
                {account.plan.limits.users.total}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{
                  width: `${
                    (account.plan.limits.users.used /
                      account.plan.limits.users.total) *
                    100
                  }%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions de gestion */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Gestion de l'abonnement
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <CreditCardIcon className="w-5 h-5 text-gray-400" />
              <div>
                <div className="font-medium text-gray-900">
                  Méthode de paiement
                </div>
                <div className="text-sm text-gray-600">•••• •••• •••• 4242</div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Modifier
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <CalendarIcon className="w-5 h-5 text-gray-400" />
              <div>
                <div className="font-medium text-gray-900">
                  Cycle de facturation
                </div>
                <div className="text-sm text-gray-600">Mensuel</div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Changer
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <ArrowPathIcon className="w-5 h-5 text-gray-400" />
              <div>
                <div className="font-medium text-gray-900">
                  Renouvellement automatique
                </div>
                <div className="text-sm text-gray-600">Activé</div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Désactiver
            </Button>
          </div>
        </div>

        {/* Zone de danger */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <ExclamationTriangleIcon className="w-5 h-5 text-red-500 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-medium text-red-800 mb-1">
                  Zone de danger
                </h4>
                <p className="text-sm text-red-700 mb-3">
                  Annuler votre abonnement supprimera l'accès à toutes les
                  fonctionnalités premium à la fin de votre période de
                  facturation actuelle.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCancelModal(true)}
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  Annuler l'abonnement
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal d'annulation */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="text-center mb-6">
              <ExclamationTriangleIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Confirmer l'annulation
              </h3>
              <p className="text-gray-600">
                Êtes-vous sûr de vouloir annuler votre abonnement ? Vous
                garderez l'accès jusqu'au{" "}
                {subscriptionEndDate.toLocaleDateString("fr-FR")}.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowCancelModal(false)}
                className="flex-1"
                disabled={cancelling}
              >
                Garder l'abonnement
              </Button>
              <Button
                onClick={handleCancelSubscription}
                disabled={cancelling}
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                {cancelling ? "Annulation..." : "Confirmer l'annulation"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

### Étape 3 : Créer les fonctions de gestion d'abonnement

Ajouter dans `src/lib/mockData.ts` :

```tsx
// Fonctions de gestion d'abonnement
export function upgradePlan(
  planId: string,
  billing: "monthly" | "annual"
): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Mise à niveau vers le plan ${planId} (${billing})`);
      // Dans une vraie app, on intégrerait avec Stripe/PayPal
      resolve(true);
    }, 2000);
  });
}

export function cancelSubscription(): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Abonnement annulé");
      resolve(true);
    }, 1500);
  });
}

export function reactivateSubscription(): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Abonnement réactivé");
      resolve(true);
    }, 1000);
  });
}

export function updatePaymentMethod(paymentData: any): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Méthode de paiement mise à jour:", paymentData);
      resolve(true);
    }, 1500);
  });
}

export function changeBillingCycle(
  cycle: "monthly" | "annual"
): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Cycle de facturation changé vers: ${cycle}`);
      resolve(true);
    }, 1000);
  });
}
```

### Étape 4 : Mettre à jour la page de compte

Modifier `src/app/account/page.tsx` pour intégrer les nouveaux composants :

```tsx
// Ajouter les imports
import PlanComparison from "@/components/account/PlanComparison";
import SubscriptionDetails from "@/components/account/SubscriptionDetails";
import { upgradePlan, cancelSubscription, reactivateSubscription } from "@/lib/mockData";

// Dans le renderTabContent(), modifier le case "subscription":
case "subscription":
  return (
    <div className="space-y-6">
      <SubscriptionDetails
        account={account}
        onCancelSubscription={async () => {
          await cancelSubscription();
          // Recharger les données du compte
          await loadAccount();
        }}
        onReactivateSubscription={async () => {
          await reactivateSubscription();
          await loadAccount();
        }}
      />

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Changer de plan
        </h3>
        <PlanComparison
          currentAccount={account}
          onUpgrade={async (planId, billing) => {
            await upgradePlan(planId, billing);
            await loadAccount();
          }}
        />
      </div>
    </div>
  );
```

### Étape 5 : Vérifier l'installation

```bash
npm run lint
npm run build
```

---

## Checklist de Validation

- [ ] Étape 1 : Composant PlanComparison créé avec grille de plans
- [ ] Étape 2 : Composant SubscriptionDetails créé avec gestion complète
- [ ] Étape 3 : Fonctions de gestion d'abonnement ajoutées
- [ ] Étape 4 : Page de compte mise à jour avec nouveaux composants
- [ ] Étape 5 : Lint et build passent sans erreur
