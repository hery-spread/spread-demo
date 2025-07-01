# PLAN D'ACTION PRESCRIPTIF : DATA-02

**User Story :** En tant que développeur, je dois créer des fichiers de mock data détaillés pour au moins 5 influenceurs, incluant les données d'audience complètes (démographie, intérêts, etc.).

**Objectif :** Compléter le fichier mockData.ts avec des données d'audience détaillées pour 5 influenceurs.

---

## Plan d'Action Prescriptif

### Étape 1 : Compléter les données détaillées pour 5 influenceurs

Modifier `src/lib/mockData.ts` pour compléter le dictionnaire `mockInfluencerDetails` :

```typescript
export const mockInfluencerDetails: Record<string, InfluencerDetails> = {
  "1": {
    ...mockInfluencers[0], // Zidane
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
  "2": {
    ...mockInfluencers[1], // Nabilla
    stats: {
      avgLikes: 145000,
      avgComments: 850,
      avgViews: 2100000,
      totalPosts: 2500,
    },
    audience: {
      gender: { male: 25.4, female: 74.6 },
      age: {
        "13-17": 12.8,
        "18-24": 45.2,
        "25-34": 28.9,
        "35-44": 10.1,
        "45-64": 3.0,
      },
      countries: {
        France: 62.5,
        Maroc: 8.2,
        Algérie: 5.1,
        Tunisie: 3.8,
        Belgique: 3.2,
      },
      cities: {
        Paris: 12.4,
        Marseille: 4.2,
        Lyon: 3.1,
        Casablanca: 2.8,
        Alger: 2.1,
      },
      languages: {
        Français: 78.5,
        Arabe: 15.2,
        Anglais: 6.3,
      },
      ethnicities: {
        Caucasien: 55.8,
        "Afro-descendant": 35.2,
        Asiatique: 9.0,
      },
      interests: {
        topics: {
          "Mode & Accessoires": 68.9,
          "Beauté & Cosmétiques": 55.7,
          "Famille & Relations": 42.3,
          Lifestyle: 38.6,
          "Voyage & Tourisme": 28.4,
        },
        brands: {
          Chanel: 18.7,
          "Louis Vuitton": 15.3,
          Sephora: 12.8,
          Zara: 11.2,
          "H&M": 9.4,
        },
      },
    },
  },
  "3": {
    ...mockInfluencers[2], // Squeezie
    stats: {
      avgLikes: 425000,
      avgComments: 3200,
      avgViews: 3500000,
      totalPosts: 450,
    },
    audience: {
      gender: { male: 72.3, female: 27.7 },
      age: {
        "13-17": 35.6,
        "18-24": 38.9,
        "25-34": 18.2,
        "35-44": 5.8,
        "45-64": 1.5,
      },
      countries: {
        France: 68.9,
        Belgique: 5.2,
        Suisse: 4.1,
        Canada: 3.8,
        Maroc: 2.7,
      },
      cities: {
        Paris: 8.9,
        Lyon: 3.4,
        Marseille: 2.8,
        Toulouse: 2.1,
        Bordeaux: 1.9,
      },
      languages: {
        Français: 85.4,
        Anglais: 14.6,
      },
      ethnicities: {
        Caucasien: 78.9,
        "Afro-descendant": 12.4,
        Asiatique: 8.7,
      },
      interests: {
        topics: {
          Gaming: 89.5,
          Technologie: 65.8,
          Divertissement: 58.9,
          Humour: 45.2,
          Musique: 32.1,
        },
        brands: {
          PlayStation: 45.8,
          Nintendo: 38.9,
          Apple: 28.7,
          Samsung: 22.1,
          Microsoft: 19.8,
        },
      },
    },
  },
  "4": {
    ...mockInfluencers[3], // Dadju
    stats: {
      avgLikes: 89000,
      avgComments: 1200,
      avgViews: 1800000,
      totalPosts: 800,
    },
    audience: {
      gender: { male: 42.1, female: 57.9 },
      age: {
        "13-17": 18.9,
        "18-24": 42.5,
        "25-34": 28.1,
        "35-44": 8.2,
        "45-64": 2.3,
      },
      countries: {
        France: 52.8,
        "Côte d'Ivoire": 12.4,
        Sénégal: 8.9,
        Mali: 6.7,
        Congo: 5.2,
      },
      cities: {
        Paris: 9.8,
        Abidjan: 7.2,
        Dakar: 5.1,
        Marseille: 3.9,
        Lyon: 2.8,
      },
      languages: {
        Français: 82.4,
        Anglais: 12.6,
        Lingala: 5.0,
      },
      ethnicities: {
        "Afro-descendant": 68.9,
        Caucasien: 25.8,
        Asiatique: 5.3,
      },
      interests: {
        topics: {
          Musique: 78.9,
          Danse: 45.2,
          "Mode & Accessoires": 38.7,
          Divertissement: 35.4,
          "Famille & Relations": 28.9,
        },
        brands: {
          Spotify: 52.8,
          "Apple Music": 38.9,
          Nike: 28.7,
          Adidas: 25.4,
          Deezer: 18.9,
        },
      },
    },
  },
  "5": {
    ...mockInfluencers[4], // Kev Adams
    stats: {
      avgLikes: 28000,
      avgComments: 450,
      avgViews: 850000,
      totalPosts: 1200,
    },
    audience: {
      gender: { male: 48.9, female: 51.1 },
      age: {
        "13-17": 8.9,
        "18-24": 32.5,
        "25-34": 35.8,
        "35-44": 18.2,
        "45-64": 4.6,
      },
      countries: {
        France: 78.9,
        Belgique: 6.8,
        Suisse: 4.2,
        Canada: 3.9,
        Maroc: 2.8,
      },
      cities: {
        Paris: 15.8,
        Lyon: 4.2,
        Marseille: 3.9,
        Toulouse: 2.8,
        Nice: 2.1,
      },
      languages: {
        Français: 89.4,
        Anglais: 10.6,
      },
      ethnicities: {
        Caucasien: 82.4,
        "Afro-descendant": 12.8,
        Asiatique: 4.8,
      },
      interests: {
        topics: {
          Humour: 68.9,
          Cinéma: 45.8,
          Divertissement: 42.5,
          Télévision: 38.9,
          Théâtre: 25.4,
        },
        brands: {
          Netflix: 42.8,
          "Disney+": 28.9,
          "Amazon Prime": 22.4,
          "Canal+": 18.7,
          OCS: 12.8,
        },
      },
    },
  },
};
```

### Étape 2 : Créer une fonction pour simuler le "déverrouillage" d'un rapport

Ajouter dans `src/lib/mockData.ts` :

```typescript
export function unlockInfluencerReport(
  id: string
): Promise<InfluencerDetails | null> {
  return new Promise((resolve) => {
    // Simuler un délai d'API
    setTimeout(() => {
      resolve(mockInfluencerDetails[id] || null);
    }, 800);
  });
}
```

### Étape 3 : Vérifier l'installation

```bash
npm run lint
npm run build
```

---

## Checklist de Validation

- [ ] Étape 1 : Données détaillées pour 5 influenceurs complétées
- [ ] Étape 2 : Fonction de déverrouillage de rapport ajoutée
- [ ] Étape 3 : Lint et build passent sans erreur
