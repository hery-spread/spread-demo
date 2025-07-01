# PLAN D'ACTION PRESCRIPTIF : DATA-01

**User Story :** En tant que développeur, je dois créer un fichier de mock data contenant une liste de 50 profils d'influenceurs avec leurs statistiques de base (nom, followers, engagement, ER).

**Objectif :** Compléter le fichier mockData.ts avec 50 profils d'influenceurs réalistes.

---

## Plan d'Action Prescriptif

### Étape 1 : Compléter la liste des 50 influenceurs

Modifier `src/lib/mockData.ts` pour compléter le tableau `mockInfluencers` avec 50 profils :

```typescript
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
  {
    id: "2",
    name: "Nabilla Vergara",
    username: "nabilla",
    platform: "instagram",
    avatar: "/avatars/nabilla.jpg",
    followers: 9500000,
    engagement: 162000,
    engagementRate: 1.71,
    country: "FR",
    verified: true,
    email: "contact@nabillavergara.com",
    bio: "Founder @nabillabeauty",
  },
  {
    id: "3",
    name: "Squeezie",
    username: "squeezie",
    platform: "youtube",
    avatar: "/avatars/squeezie.jpg",
    followers: 8800000,
    engagement: 536000,
    engagementRate: 6.07,
    country: "FR",
    verified: true,
    email: "contact@squeezie.fr",
    bio: "Créateur de contenu gaming",
  },
  {
    id: "4",
    name: "Dadju",
    username: "dadju",
    platform: "instagram",
    avatar: "/avatars/dadju.jpg",
    followers: 9000000,
    engagement: 114000,
    engagementRate: 1.26,
    country: "FR",
    verified: true,
    email: "contact@dadju.com",
    bio: "Artiste RnB français",
  },
  {
    id: "5",
    name: "Kev Adams",
    username: "kevadams",
    platform: "instagram",
    avatar: "/avatars/kevadams.jpg",
    followers: 7600000,
    engagement: 37000,
    engagementRate: 0.49,
    country: "FR",
    verified: true,
    email: "contact@kevadams.com",
    bio: "Humoriste et acteur",
  },
  // Continuer avec 45 autres profils...
  {
    id: "6",
    name: "Cyprien",
    username: "cyprien",
    platform: "youtube",
    avatar: "/avatars/cyprien.jpg",
    followers: 6200000,
    engagement: 245000,
    engagementRate: 3.95,
    country: "FR",
    verified: true,
    email: "contact@cyprien.fr",
    bio: "Créateur de contenu humoristique",
  },
  // ... (continuer jusqu'à 50 profils)
];
```

### Étape 2 : Créer une fonction utilitaire pour générer des données aléatoires

Ajouter dans `src/lib/mockData.ts` :

```typescript
// Fonction utilitaire pour générer des données cohérentes
function generateInfluencerData(
  id: string,
  name: string,
  username: string,
  platform: "instagram" | "youtube" | "tiktok"
): Influencer {
  const followers = Math.floor(Math.random() * 10000000) + 100000; // Entre 100k et 10M
  const baseEngagement = followers * (Math.random() * 0.05 + 0.005); // Entre 0.5% et 5.5%
  const engagement = Math.floor(baseEngagement);
  const engagementRate = Number(((engagement / followers) * 100).toFixed(2));

  const countries = ["FR", "US", "UK", "DE", "ES", "IT", "CA"];
  const country = countries[Math.floor(Math.random() * countries.length)];

  return {
    id,
    name,
    username,
    platform,
    avatar: `/avatars/${username}.jpg`,
    followers,
    engagement,
    engagementRate,
    country,
    verified: Math.random() > 0.3, // 70% de chance d'être vérifié
    email: Math.random() > 0.4 ? `contact@${username}.com` : undefined, // 60% ont un email
    bio: `${name} - Créateur de contenu ${platform}`,
  };
}
```

### Étape 3 : Créer une fonction de recherche et de filtrage

Ajouter dans `src/lib/mockData.ts` :

```typescript
export interface SearchFilters {
  platform?: "instagram" | "youtube" | "tiktok";
  minFollowers?: number;
  maxFollowers?: number;
  minEngagement?: number;
  country?: string;
  verified?: boolean;
  hasEmail?: boolean;
}

export function searchInfluencers(filters: SearchFilters = {}): Influencer[] {
  return mockInfluencers.filter((influencer) => {
    if (filters.platform && influencer.platform !== filters.platform)
      return false;
    if (filters.minFollowers && influencer.followers < filters.minFollowers)
      return false;
    if (filters.maxFollowers && influencer.followers > filters.maxFollowers)
      return false;
    if (
      filters.minEngagement &&
      influencer.engagementRate < filters.minEngagement
    )
      return false;
    if (filters.country && influencer.country !== filters.country) return false;
    if (
      filters.verified !== undefined &&
      influencer.verified !== filters.verified
    )
      return false;
    if (
      filters.hasEmail !== undefined &&
      !!influencer.email !== filters.hasEmail
    )
      return false;

    return true;
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

- [ ] Étape 1 : 50 profils d'influenceurs créés
- [ ] Étape 2 : Fonction utilitaire de génération ajoutée
- [ ] Étape 3 : Fonction de recherche et filtrage ajoutée
- [ ] Étape 4 : Lint et build passent sans erreur
