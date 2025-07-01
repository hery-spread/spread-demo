# PLAN D'ACTION PRESCRIPTIF : INFRA-03

**User Story :** En tant que développeur, je dois mettre en place un système de données mockées (ex: fichiers JSON ou objets TS) pour simuler les réponses de l'API et alimenter l'interface.

**Objectif :** Créer une architecture de données mockées centralisée et typée.

---

## Plan d'Action Prescriptif

### Étape 1 : Créer la structure des types

Créer `src/types/index.ts` :

```typescript
export interface Influencer {
  id: string;
  name: string;
  username: string;
  platform: "instagram" | "youtube" | "tiktok";
  avatar: string;
  followers: number;
  engagement: number;
  engagementRate: number;
  country: string;
  verified: boolean;
  email?: string;
  bio?: string;
}

export interface InfluencerDetails extends Influencer {
  stats: {
    avgLikes: number;
    avgComments: number;
    avgViews: number;
    totalPosts: number;
  };
  audience: {
    gender: { male: number; female: number };
    age: Record<string, number>;
    countries: Record<string, number>;
    cities: Record<string, number>;
    languages: Record<string, number>;
    ethnicities: Record<string, number>;
    interests: {
      topics: Record<string, number>;
      brands: Record<string, number>;
    };
  };
}

export interface InfluencerList {
  id: string;
  name: string;
  createdAt: string;
  influencers: {
    id: string;
    contactName?: string;
    contactEmail?: string;
  }[];
}

export interface UserAccount {
  name: string;
  email: string;
  plan: {
    name: string;
    renewalDate: string;
    limits: {
      searches: number | "unlimited";
      profiles: { used: number; total: number };
      users: { used: number; total: number };
    };
  };
}
```

### Étape 2 : Créer le service de données mockées

Créer `src/lib/mockData.ts` :

```typescript
import {
  Influencer,
  InfluencerDetails,
  InfluencerList,
  UserAccount,
} from "@/types";

// Données mockées des influenceurs
export const mockInfluencers: Influencer[] = [
  {
    id: "1",
    name: "Zidane",
    username: "zidane",
    platform: "instagram",
    avatar: "/avatars/zidane.jpg",
    followers: 44300000,
    engagement: 371000,
    engagementRate: 0.84,
    country: "FR",
    verified: true,
    email: "contact@zidane.com",
    bio: "Légende du football français",
  },
  // ... (48 autres profils à ajouter)
];

// Données détaillées pour 5 influenceurs
export const mockInfluencerDetails: Record<string, InfluencerDetails> = {
  "1": {
    ...mockInfluencers[0],
    stats: {
      avgLikes: 162000,
      avgComments: 200,
      avgViews: 1900000,
      totalPosts: 1000,
    },
    audience: {
      gender: { male: 31.8, female: 68.2 },
      age: {
        "13-17": 6.3,
        "18-24": 39.4,
        "25-34": 42.1,
        "35-44": 9.4,
        "45-64": 2.7,
      },
      countries: {
        France: 58.2,
        Maroc: 3.6,
        USA: 3.2,
        Belgique: 2.8,
        Algérie: 2.5,
      },
      cities: {
        Paris: 6.8,
        Marseille: 1.5,
        Lyon: 1.1,
        Bordeaux: 1.0,
        Bruxelles: 0.9,
      },
      languages: {
        Français: 69.7,
        Anglais: 16.0,
        Arabe: 4.1,
      },
      ethnicities: {
        Caucasien: 70.5,
        "Afro-descendant": 17.3,
        Asiatique: 10.1,
      },
      interests: {
        topics: {
          "Mode & Accessoires": 41.1,
          "Famille & Relations": 39.3,
          "Voyage & Tourisme": 32.7,
          Photographie: 31.7,
          Alimentation: 31.0,
        },
        brands: {
          "Walt Disney": 11.4,
          Apple: 8.3,
          Nike: 7.3,
          Zara: 6.4,
          Adidas: 5.2,
        },
      },
    },
  },
};

// Données des listes
export const mockLists: InfluencerList[] = [
  {
    id: "1",
    name: "HelloFresh",
    createdAt: "2024-06-15",
    influencers: [
      { id: "1", contactName: "Zidane", contactEmail: "contact@zidane.com" },
      { id: "2", contactName: "Nabilla", contactEmail: "contact@nabilla.com" },
    ],
  },
  {
    id: "2",
    name: "Food",
    createdAt: "2024-06-10",
    influencers: [
      { id: "3", contactName: "Chef Martin", contactEmail: "chef@martin.com" },
    ],
  },
];

// Données du compte utilisateur
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
  },
};
```

### Étape 3 : Créer les hooks de données

Créer `src/hooks/useInfluencers.ts` :

```typescript
import { useState, useEffect } from "react";
import { Influencer, InfluencerDetails } from "@/types";
import { mockInfluencers, mockInfluencerDetails } from "@/lib/mockData";

export function useInfluencers() {
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setInfluencers(mockInfluencers);
      setLoading(false);
    }, 500);
  }, []);

  return { influencers, loading };
}

export function useInfluencerDetails(id: string) {
  const [details, setDetails] = useState<InfluencerDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDetails(mockInfluencerDetails[id] || null);
      setLoading(false);
    }, 300);
  }, [id]);

  return { details, loading };
}
```

### Étape 4 : Vérifier l'installation

```bash
npm run lint
npm run build
```

---

## Checklist de Validation

- [ ] Étape 1 : Types créés dans src/types/index.ts
- [ ] Étape 2 : Service mockData créé avec données complètes
- [ ] Étape 3 : Hooks de données créés
- [ ] Étape 4 : Lint et build passent sans erreur
