# PLAN D'ACTION PRESCRIPTIF : DASH-02

**User Story :** En tant qu'utilisateur, je veux voir les détails de mon abonnement (nom du plan, date de renouvellement) sur le Dashboard pour savoir quand il sera renouvelé.

**Objectif :** Ajouter une section dédiée aux détails de l'abonnement sur le Dashboard.

---

## Plan d'Action Prescriptif

### Étape 1 : Créer le composant SubscriptionCard

Créer `src/components/dashboard/SubscriptionCard.tsx` :

```tsx
"use client";

import { UserAccount } from "@/types";
import {
  CreditCardIcon,
  CalendarIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

interface SubscriptionCardProps {
  account: UserAccount;
}

export default function SubscriptionCard({ account }: SubscriptionCardProps) {
  const renewalDate = new Date(account.plan.renewalDate);
  const daysUntilRenewal = Math.ceil(
    (renewalDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const getRenewalStatus = () => {
    if (daysUntilRenewal <= 7) {
      return {
        color: "text-red-600",
        bg: "bg-red-50",
        text: "Renouvellement imminent",
      };
    } else if (daysUntilRenewal <= 30) {
      return {
        color: "text-orange-600",
        bg: "bg-orange-50",
        text: "Renouvellement proche",
      };
    }
    return {
      color: "text-green-600",
      bg: "bg-green-50",
      text: "Abonnement actif",
    };
  };

  const status = getRenewalStatus();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Mon Abonnement</h3>
        <div
          className={`px-3 py-1 rounded-full text-sm font-medium ${status.color} ${status.bg}`}
        >
          {status.text}
        </div>
      </div>

      <div className="space-y-4">
        {/* Plan actuel */}
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-50 rounded-lg">
            <CreditCardIcon className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              {account.plan.name}
            </p>
            <p className="text-sm text-gray-500">
              {account.plan.price.monthly}€/mois
            </p>
          </div>
        </div>

        {/* Date de renouvellement */}
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <CalendarIcon className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              Renouvellement le {renewalDate.toLocaleDateString("fr-FR")}
            </p>
            <p className="text-sm text-gray-500">
              Dans {daysUntilRenewal} jour{daysUntilRenewal > 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Fonctionnalités incluses */}
        <div className="pt-4 border-t border-gray-100">
          <h4 className="text-sm font-medium text-gray-900 mb-3">
            Fonctionnalités incluses
          </h4>
          <div className="space-y-2">
            {account.plan.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <CheckIcon className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-600">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-gray-100 flex space-x-3">
          <button className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors">
            Gérer l'abonnement
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
            Facturation
          </button>
        </div>
      </div>
    </div>
  );
}
```

### Étape 2 : Créer le composant UsageSummary

Créer `src/components/dashboard/UsageSummary.tsx` :

```tsx
"use client";

import { UserAccount } from "@/types";

interface UsageSummaryProps {
  account: UserAccount;
  searchesThisMonth: number;
}

export default function UsageSummary({
  account,
  searchesThisMonth,
}: UsageSummaryProps) {
  const profilesPercentage = Math.round(
    (account.plan.limits.profiles.used / account.plan.limits.profiles.total) *
      100
  );

  const usersPercentage = Math.round(
    (account.plan.limits.users.used / account.plan.limits.users.total) * 100
  );

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return "text-red-600";
    if (percentage >= 75) return "text-orange-600";
    return "text-green-600";
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Résumé d'utilisation
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Recherches */}
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {searchesThisMonth}
          </div>
          <div className="text-sm text-blue-600 font-medium">Recherches</div>
          <div className="text-xs text-gray-500 mt-1">ce mois-ci</div>
        </div>

        {/* Profils */}
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <div
            className={`text-2xl font-bold mb-1 ${getUsageColor(
              profilesPercentage
            )}`}
          >
            {profilesPercentage}%
          </div>
          <div className="text-sm text-purple-600 font-medium">Profils</div>
          <div className="text-xs text-gray-500 mt-1">
            {account.plan.limits.profiles.used}/
            {account.plan.limits.profiles.total} utilisés
          </div>
        </div>

        {/* Utilisateurs */}
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div
            className={`text-2xl font-bold mb-1 ${getUsageColor(
              usersPercentage
            )}`}
          >
            {account.plan.limits.users.used}/{account.plan.limits.users.total}
          </div>
          <div className="text-sm text-green-600 font-medium">Utilisateurs</div>
          <div className="text-xs text-gray-500 mt-1">équipe</div>
        </div>
      </div>

      {/* Alertes d'utilisation */}
      {(profilesPercentage >= 80 || usersPercentage >= 80) && (
        <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <div className="w-5 h-5 text-orange-500 mt-0.5">⚠️</div>
            <div>
              <p className="text-sm font-medium text-orange-800">
                Attention à votre consommation
              </p>
              <p className="text-sm text-orange-700">
                {profilesPercentage >= 80 &&
                  "Vous approchez de la limite de profils consultés. "}
                {usersPercentage >= 80 &&
                  "Vous approchez de la limite d'utilisateurs. "}
                Considérez une mise à niveau de votre plan.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

### Étape 3 : Mettre à jour la page Dashboard pour inclure les nouveaux composants

Modifier `src/app/page.tsx` pour ajouter les nouveaux composants :

```tsx
// Ajouter les imports
import SubscriptionCard from "@/components/dashboard/SubscriptionCard";
import UsageSummary from "@/components/dashboard/UsageSummary";

// Dans le return, après les barres de progression, ajouter :
{
  /* Résumé d'utilisation et abonnement */
}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <UsageSummary
    account={account!}
    searchesThisMonth={stats?.searchesThisMonth || 0}
  />
  <SubscriptionCard account={account!} />
</div>;
```

### Étape 4 : Vérifier l'installation

```bash
npm run lint
npm run build
```

---

## Checklist de Validation

- [ ] Étape 1 : Composant SubscriptionCard créé
- [ ] Étape 2 : Composant UsageSummary créé
- [ ] Étape 3 : Page Dashboard mise à jour
- [ ] Étape 4 : Lint et build passent sans erreur
