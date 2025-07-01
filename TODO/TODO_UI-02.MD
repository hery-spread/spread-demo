# PLAN D'ACTION PRESCRIPTIF : UI-02

**User Story :** En tant qu'utilisateur, je veux voir un en-tête persistant affichant des informations de base comme le plan actuel et le nombre de crédits restants.

**Objectif :** Améliorer le composant Header avec des données dynamiques et un design fidèle à Spread.

---

## Plan d'Action Prescriptif

### Étape 1 : Créer un hook pour les données utilisateur

Créer `src/hooks/useUserAccount.ts` :

```typescript
import { useState, useEffect } from "react";
import { UserAccount } from "@/types";
import { mockUserAccount } from "@/lib/mockData";

export function useUserAccount() {
  const [account, setAccount] = useState<UserAccount | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAccount(mockUserAccount);
      setLoading(false);
    }, 200);
  }, []);

  return { account, loading };
}
```

### Étape 2 : Mettre à jour le composant Header

Modifier `src/components/layout/Header.tsx` :

```tsx
"use client";

import { useUserAccount } from "@/hooks/useUserAccount";
import { usePathname } from "next/navigation";

const getPageTitle = (pathname: string) => {
  switch (pathname) {
    case "/":
      return "Dashboard";
    case "/lists":
      return "Mes Listes";
    case "/account":
      return "Mon Compte";
    case "/search":
      return "Recherche d'Influenceurs";
    default:
      return "Spread";
  }
};

export default function Header() {
  const { account, loading } = useUserAccount();
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

  if (loading) {
    return (
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{pageTitle}</h2>
          </div>
          <div className="flex items-center space-x-6">
            <div className="animate-pulse bg-gray-200 h-4 w-20 rounded"></div>
            <div className="animate-pulse bg-gray-200 h-4 w-16 rounded"></div>
            <div className="animate-pulse bg-gray-200 h-4 w-12 rounded"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{pageTitle}</h2>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              <span className="font-medium">Recherches:</span>{" "}
              <span className="text-green-600 font-semibold">
                {account?.plan.limits.searches === "unlimited"
                  ? "∞"
                  : account?.plan.limits.searches}
              </span>
            </div>

            <div className="text-sm text-gray-600">
              <span className="font-medium">Profils:</span>{" "}
              <span
                className={`font-semibold ${
                  account &&
                  account.plan.limits.profiles.used /
                    account.plan.limits.profiles.total >
                    0.8
                    ? "text-red-600"
                    : account &&
                      account.plan.limits.profiles.used /
                        account.plan.limits.profiles.total >
                        0.6
                    ? "text-orange-600"
                    : "text-green-600"
                }`}
              >
                {account?.plan.limits.profiles.used}/
                {account?.plan.limits.profiles.total}
              </span>
            </div>

            <div className="text-sm text-gray-600">
              <span className="font-medium">Users:</span>{" "}
              <span className="text-blue-600 font-semibold">
                {account?.plan.limits.users.used}/
                {account?.plan.limits.users.total}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full">
              {account?.plan.name}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
```

### Étape 3 : Vérifier l'installation

```bash
npm run lint
npm run build
```

---

## Checklist de Validation

- [ ] Étape 1 : Hook useUserAccount créé
- [ ] Étape 2 : Header mis à jour avec données dynamiques
- [ ] Étape 3 : Lint et build passent sans erreur
