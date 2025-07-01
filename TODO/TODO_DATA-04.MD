# PLAN D'ACTION PRESCRIPTIF : DATA-04

**User Story :** En tant que développeur, je dois créer un fichier de mock data pour les informations du compte utilisateur et de son abonnement (Plan Elite, date de renouvellement).

**Objectif :** Finaliser les données utilisateur et créer des variations pour différents types de comptes.

---

## Plan d'Action Prescriptif

### Étape 1 : Étendre les types pour les variations de comptes

Modifier `src/types/index.ts` pour ajouter des types étendus :

```typescript
export interface PlanLimits {
  searches: number | "unlimited";
  profiles: { used: number; total: number };
  users: { used: number; total: number };
}

export interface SubscriptionPlan {
  name: string;
  renewalDate: string;
  limits: PlanLimits;
  features: string[];
  price: {
    monthly: number;
    currency: string;
  };
}

export interface UserAccount {
  name: string;
  email: string;
  plan: SubscriptionPlan;
  billingInfo?: {
    company?: string;
    vatNumber?: string;
    address: {
      street: string;
      city: string;
      postalCode: string;
      country: string;
    };
  };
}
```

### Étape 2 : Créer plusieurs variations de comptes utilisateur

Modifier `src/lib/mockData.ts` pour ajouter différents types de comptes :

```typescript
// Plan Elite (compte principal)
export const mockUserAccount: UserAccount = {
  name: "Hugo Expandia",
  email: "hugo@expandia.io",
  plan: {
    name: "Plan Élite",
    renewalDate: "2025-07-27",
    limits: {
      searches: "unlimited",
      profiles: { used: 73, total: 500 },
      users: { used: 0, total: 10 },
    },
    features: [
      "Recherches illimitées",
      "500 profils par mois",
      "10 utilisateurs équipe",
      "Export CSV illimité",
      "Rapports d'audience détaillés",
      "Support prioritaire",
    ],
    price: {
      monthly: 299,
      currency: "EUR",
    },
  },
  billingInfo: {
    company: "Expandia SAS",
    vatNumber: "FR12345678901",
    address: {
      street: "123 Rue de la Paix",
      city: "Paris",
      postalCode: "75001",
      country: "France",
    },
  },
};

// Plan Pro (exemple alternatif)
export const mockUserAccountPro: UserAccount = {
  name: "Marie Dubois",
  email: "marie@agenceinfluence.fr",
  plan: {
    name: "Plan Pro",
    renewalDate: "2024-12-15",
    limits: {
      searches: "unlimited",
      profiles: { used: 45, total: 200 },
      users: { used: 2, total: 5 },
    },
    features: [
      "Recherches illimitées",
      "200 profils par mois",
      "5 utilisateurs équipe",
      "Export CSV",
      "Rapports d'audience",
      "Support standard",
    ],
    price: {
      monthly: 149,
      currency: "EUR",
    },
  },
};

// Plan Starter (exemple alternatif)
export const mockUserAccountStarter: UserAccount = {
  name: "Thomas Martin",
  email: "thomas@startup.com",
  plan: {
    name: "Plan Starter",
    renewalDate: "2024-08-30",
    limits: {
      searches: 100,
      profiles: { used: 28, total: 50 },
      users: { used: 0, total: 1 },
    },
    features: [
      "100 recherches par mois",
      "50 profils par mois",
      "1 utilisateur",
      "Export CSV limité",
      "Rapports basiques",
    ],
    price: {
      monthly: 49,
      currency: "EUR",
    },
  },
};
```

### Étape 3 : Créer des fonctions utilitaires pour la gestion des comptes

Ajouter dans `src/lib/mockData.ts` :

```typescript
export function getCurrentUserAccount(): UserAccount {
  // Par défaut, retourner le compte Elite
  return mockUserAccount;
}

export function updateUserProfile(
  updates: Partial<Pick<UserAccount, "name" | "email">>
): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate API call success
      resolve(true);
    }, 400);
  });
}

export function changePassword(
  oldPassword: string,
  newPassword: string
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate password validation
      if (oldPassword === "wrongpassword") {
        reject(new Error("Mot de passe actuel incorrect"));
      } else {
        resolve(true);
      }
    }, 600);
  });
}

export function getUsageStats(): Promise<{
  searchesThisMonth: number;
  profilesThisMonth: number;
  topSearchKeywords: string[];
  recentActivity: Array<{
    date: string;
    action: string;
    details: string;
  }>;
}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        searchesThisMonth: 156,
        profilesThisMonth: 73,
        topSearchKeywords: ["beauté", "gaming", "lifestyle", "food", "tech"],
        recentActivity: [
          {
            date: "2024-07-01",
            action: "Recherche",
            details: "Influenceurs beauté France",
          },
          {
            date: "2024-06-30",
            action: "Export",
            details: "Liste HelloFresh (4 contacts)",
          },
          {
            date: "2024-06-29",
            action: "Rapport débloqué",
            details: "Nabilla Vergara - Analyse audience",
          },
        ],
      });
    }, 300);
  });
}
```

### Étape 4 : Vérifier l'installation

```bash
npm run lint
npm run build
```

---

## Checklist de Validation

- [ ] Étape 1 : Types étendus pour les comptes créés
- [ ] Étape 2 : Trois variations de comptes créées (Elite, Pro, Starter)
- [ ] Étape 3 : Fonctions utilitaires de gestion de compte ajoutées
- [ ] Étape 4 : Lint et build passent sans erreur
