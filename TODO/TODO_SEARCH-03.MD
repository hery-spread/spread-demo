# PLAN D'ACTION PRESCRIPTIF : SEARCH-03

**User Story :** En tant que développeur, je dois peupler la recherche avec des données mockées pour que les utilisateurs puissent tester les fonctionnalités de recherche et de filtrage.

**Objectif :** Intégrer les données mockées dans la fonctionnalité de recherche et s'assurer que les filtres fonctionnent correctement.

---

## Plan d'Action Prescriptif

### Étape 1 : Créer des données de recherche étendues

Modifier `src/lib/mockData.ts` pour ajouter plus d'influenceurs et améliorer la fonction de recherche :

```typescript
// Étendre le tableau mockInfluencers avec plus de données variées
const additionalInfluencers: Influencer[] = [
  // Influenceurs Gaming
  {
    id: "50",
    name: "Gotaga",
    username: "gotaga",
    platform: "youtube",
    avatar: "/avatars/gotaga.jpg",
    followers: 3200000,
    engagement: 128000,
    engagementRate: 4.0,
    country: "FR",
    verified: true,
    email: "contact@gotaga.tv",
    bio: "Pro gamer et streamer français",
  },
  {
    id: "51",
    name: "Domingo",
    username: "domingo",
    platform: "youtube",
    avatar: "/avatars/domingo.jpg",
    followers: 2800000,
    engagement: 95000,
    engagementRate: 3.4,
    country: "FR",
    verified: true,
    email: "contact@domingo.fr",
    bio: "Gaming et divertissement",
  },
  // Influenceurs Beauté
  {
    id: "52",
    name: "Sananas",
    username: "sananas",
    platform: "youtube",
    avatar: "/avatars/sananas.jpg",
    followers: 2100000,
    engagement: 84000,
    engagementRate: 4.0,
    country: "FR",
    verified: true,
    email: "contact@sananas.fr",
    bio: "Beauté et lifestyle",
  },
  {
    id: "53",
    name: "EnjoyPhoenix",
    username: "enjoyphoenix",
    platform: "youtube",
    avatar: "/avatars/enjoyphoenix.jpg",
    followers: 3500000,
    engagement: 105000,
    engagementRate: 3.0,
    country: "FR",
    verified: true,
    email: "marie@enjoyphoenix.fr",
    bio: "Beauté, lifestyle et bien-être",
  },
  // Influenceurs TikTok
  {
    id: "54",
    name: "Léa Elui",
    username: "leaelui",
    platform: "tiktok",
    avatar: "/avatars/leaelui.jpg",
    followers: 13200000,
    engagement: 660000,
    engagementRate: 5.0,
    country: "FR",
    verified: true,
    email: "contact@leaelui.com",
    bio: "Danseuse et créatrice de contenu",
  },
  {
    id: "55",
    name: "Théo Derville",
    username: "theoderville",
    platform: "tiktok",
    avatar: "/avatars/theoderville.jpg",
    followers: 8900000,
    engagement: 445000,
    engagementRate: 5.0,
    country: "FR",
    verified: true,
    bio: "Humour et divertissement",
  },
  // Influenceurs Lifestyle
  {
    id: "56",
    name: "Caroline Receveur",
    username: "carolinereceveur",
    platform: "instagram",
    avatar: "/avatars/carolinereceveur.jpg",
    followers: 4200000,
    engagement: 168000,
    engagementRate: 4.0,
    country: "FR",
    verified: true,
    email: "contact@carolinereceveur.fr",
    bio: "Lifestyle, mode et famille",
  },
  // Influenceurs Fitness
  {
    id: "57",
    name: "Tibo InShape",
    username: "tiboinshape",
    platform: "youtube",
    avatar: "/avatars/tiboinshape.jpg",
    followers: 8100000,
    engagement: 324000,
    engagementRate: 4.0,
    country: "FR",
    verified: true,
    email: "contact@tiboinshape.fr",
    bio: "Fitness et musculation",
  },
  // Influenceurs Cuisine
  {
    id: "58",
    name: "Cyril Lignac",
    username: "cyril_lignac",
    platform: "instagram",
    avatar: "/avatars/cyrillignac.jpg",
    followers: 1800000,
    engagement: 54000,
    engagementRate: 3.0,
    country: "FR",
    verified: true,
    email: "contact@cyril-lignac.com",
    bio: "Chef cuisinier",
  },
  // Influenceurs Internationaux
  {
    id: "59",
    name: "MrBeast",
    username: "mrbeast",
    platform: "youtube",
    avatar: "/avatars/mrbeast.jpg",
    followers: 172000000,
    engagement: 8600000,
    engagementRate: 5.0,
    country: "US",
    verified: true,
    email: "business@mrbeast.com",
    bio: "Philanthropist and content creator",
  },
  {
    id: "60",
    name: "Charli D'Amelio",
    username: "charlidamelio",
    platform: "tiktok",
    avatar: "/avatars/charlidamelio.jpg",
    followers: 151000000,
    engagement: 7550000,
    engagementRate: 5.0,
    country: "US",
    verified: true,
    email: "contact@charlidamelio.com",
    bio: "Dancer and content creator",
  },
];

// Fusionner avec les influenceurs existants
export const mockInfluencers: Influencer[] = [
  // ... influenceurs existants
  ...additionalInfluencers,
];
```

### Étape 2 : Améliorer la fonction de recherche avec des filtres plus précis

Modifier la fonction `searchInfluencers` dans `src/lib/mockData.ts` :

```typescript
export function searchInfluencers(filters: SearchFilters = {}): Influencer[] {
  return mockInfluencers.filter((influencer) => {
    // Filtre par plateforme
    if (filters.platform && influencer.platform !== filters.platform) {
      return false;
    }

    // Filtre par nombre de followers
    if (filters.minFollowers && influencer.followers < filters.minFollowers) {
      return false;
    }
    if (filters.maxFollowers && influencer.followers > filters.maxFollowers) {
      return false;
    }

    // Filtre par taux d'engagement
    if (
      filters.minEngagement &&
      influencer.engagementRate < filters.minEngagement
    ) {
      return false;
    }
    if (
      filters.maxEngagement &&
      influencer.engagementRate > filters.maxEngagement
    ) {
      return false;
    }

    // Filtre par pays
    if (filters.country && influencer.country !== filters.country) {
      return false;
    }

    // Filtre par statut vérifié
    if (
      filters.verified !== undefined &&
      influencer.verified !== filters.verified
    ) {
      return false;
    }

    // Filtre par disponibilité email
    if (filters.hasEmail !== undefined) {
      const hasEmail = !!influencer.email;
      if (hasEmail !== filters.hasEmail) {
        return false;
      }
    }

    // Filtre par recherche textuelle (nom ou username)
    if (filters.query) {
      const query = filters.query.toLowerCase();
      const matchesName = influencer.name.toLowerCase().includes(query);
      const matchesUsername = influencer.username.toLowerCase().includes(query);
      const matchesBio = influencer.bio?.toLowerCase().includes(query);

      if (!matchesName && !matchesUsername && !matchesBio) {
        return false;
      }
    }

    return true;
  });
}

// Ajouter une fonction pour obtenir des suggestions de recherche
export function getSearchSuggestions(query: string): string[] {
  if (!query || query.length < 2) return [];

  const suggestions = new Set<string>();
  const queryLower = query.toLowerCase();

  mockInfluencers.forEach((influencer) => {
    // Suggestions basées sur le nom
    if (influencer.name.toLowerCase().includes(queryLower)) {
      suggestions.add(influencer.name);
    }

    // Suggestions basées sur le username
    if (influencer.username.toLowerCase().includes(queryLower)) {
      suggestions.add(influencer.username);
    }

    // Suggestions basées sur la bio
    if (influencer.bio?.toLowerCase().includes(queryLower)) {
      const words = influencer.bio.split(" ");
      words.forEach((word) => {
        if (word.toLowerCase().includes(queryLower) && word.length > 2) {
          suggestions.add(word);
        }
      });
    }
  });

  return Array.from(suggestions).slice(0, 5);
}

// Ajouter une fonction pour obtenir des statistiques de recherche
export function getSearchStats(): {
  totalInfluencers: number;
  byPlatform: Record<string, number>;
  byCountry: Record<string, number>;
  avgFollowers: number;
  avgEngagement: number;
} {
  const stats = {
    totalInfluencers: mockInfluencers.length,
    byPlatform: {} as Record<string, number>,
    byCountry: {} as Record<string, number>,
    avgFollowers: 0,
    avgEngagement: 0,
  };

  let totalFollowers = 0;
  let totalEngagement = 0;

  mockInfluencers.forEach((influencer) => {
    // Compter par plateforme
    stats.byPlatform[influencer.platform] =
      (stats.byPlatform[influencer.platform] || 0) + 1;

    // Compter par pays
    stats.byCountry[influencer.country] =
      (stats.byCountry[influencer.country] || 0) + 1;

    // Calculer les moyennes
    totalFollowers += influencer.followers;
    totalEngagement += influencer.engagementRate;
  });

  stats.avgFollowers = Math.round(totalFollowers / mockInfluencers.length);
  stats.avgEngagement = Number(
    (totalEngagement / mockInfluencers.length).toFixed(2)
  );

  return stats;
}
```

### Étape 3 : Ajouter le type SearchFilters avec query

Modifier `src/lib/mockData.ts` pour ajouter le champ query :

```typescript
export interface SearchFilters {
  platform?: "instagram" | "youtube" | "tiktok";
  minFollowers?: number;
  maxFollowers?: number;
  minEngagement?: number;
  maxEngagement?: number;
  country?: string;
  verified?: boolean;
  hasEmail?: boolean;
  query?: string; // Nouveau champ pour la recherche textuelle
}
```

### Étape 4 : Créer un hook personnalisé pour la recherche

Créer `src/hooks/useSearch.ts` :

```typescript
import { useState, useEffect, useCallback } from "react";
import {
  searchInfluencers,
  SearchFilters,
  getSearchSuggestions,
} from "@/lib/mockData";
import { Influencer } from "@/types";

export function useSearch() {
  const [filters, setFilters] = useState<SearchFilters>({});
  const [results, setResults] = useState<Influencer[]>([]);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const search = useCallback(async (searchFilters: SearchFilters) => {
    setLoading(true);

    // Simuler un délai d'API
    setTimeout(() => {
      const searchResults = searchInfluencers(searchFilters);
      setResults(searchResults);
      setLoading(false);
    }, 500);
  }, []);

  const getSuggestions = useCallback((query: string) => {
    const searchSuggestions = getSearchSuggestions(query);
    setSuggestions(searchSuggestions);
  }, []);

  const updateFilters = useCallback((newFilters: SearchFilters) => {
    setFilters(newFilters);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
    setSuggestions([]);
  }, []);

  // Recherche initiale
  useEffect(() => {
    search({});
  }, [search]);

  return {
    filters,
    results,
    loading,
    suggestions,
    search,
    getSuggestions,
    updateFilters,
    clearFilters,
  };
}
```

### Étape 5 : Vérifier l'installation

```bash
npm run lint
npm run build
```

---

## Checklist de Validation

- [ ] Étape 1 : Données d'influenceurs étendues avec plus de variété
- [ ] Étape 2 : Fonction de recherche améliorée avec filtres précis
- [ ] Étape 3 : Type SearchFilters mis à jour avec query
- [ ] Étape 4 : Hook useSearch créé pour la gestion d'état
- [ ] Étape 5 : Lint et build passent sans erreur
