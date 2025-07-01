# PLAN D'ACTION PRESCRIPTIF : LISTS-03

**User Story :** En tant qu'utilisateur, je veux avoir des données mockées étendues pour les listes avec différentes catégories et influenceurs pour tester toutes les fonctionnalités.

**Objectif :** Étendre les données mockées avec plus de listes, catégories et fonctions utilitaires.

---

## Plan d'Action Prescriptif

### Étape 1 : Étendre les données mockées dans mockData.ts

Modifier `src/lib/mockData.ts` pour ajouter plus de listes :

```tsx
// Ajouter à la fin du fichier mockData.ts

// Listes étendues avec plus de catégories
export const extendedMockLists: InfluencerList[] = [
  // Listes existantes restent inchangées
  ...mockLists,

  // Nouvelles listes
  {
    id: "8",
    name: "Tech Reviewers",
    description:
      "Influenceurs spécialisés dans les tests et reviews de produits technologiques",
    category: "Technologie",
    createdAt: "2024-03-15",
    influencers: [
      { id: "30", contactName: "Micode", contactEmail: "contact@micode.com" },
      {
        id: "31",
        contactName: "Linus Tech Tips",
        contactEmail: "linus@linustechtips.com",
      },
      { id: "32", contactName: "MKBHD", contactEmail: "marques@mkbhd.com" },
      {
        id: "33",
        contactName: "Unbox Therapy",
        contactEmail: "lewis@unboxtherapy.com",
      },
      { id: "34", contactName: "Dave2D", contactEmail: "dave@dave2d.com" },
    ],
  },
  {
    id: "9",
    name: "Fitness Motivation",
    description:
      "Coachs et influenceurs fitness pour campagne équipements sportifs",
    category: "Sport",
    createdAt: "2024-04-10",
    influencers: [
      {
        id: "35",
        contactName: "Tibo InShape",
        contactEmail: "tibo@tiboinshape.com",
      },
      {
        id: "36",
        contactName: "Sissy Mua",
        contactEmail: "sissy@sissymua.com",
      },
      { id: "37", contactName: "Athlean-X", contactEmail: "jeff@athleanx.com" },
      {
        id: "38",
        contactName: "Calisthenic Movement",
        contactEmail: "contact@calisthenic-movement.com",
      },
      {
        id: "39",
        contactName: "FitnessBlender",
        contactEmail: "contact@fitnessblender.com",
      },
    ],
  },
  {
    id: "10",
    name: "Music Artists",
    description:
      "Artistes et producteurs musicaux pour promotion plateforme streaming",
    category: "Musique",
    createdAt: "2024-05-20",
    influencers: [
      { id: "40", contactName: "PNL", contactEmail: "management@pnlmusic.com" },
      {
        id: "41",
        contactName: "Orelsan",
        contactEmail: "orelsan@7thheaven.fr",
      },
      {
        id: "42",
        contactName: "Angèle",
        contactEmail: "angele@angelemusic.com",
      },
      { id: "43", contactName: "Stromae", contactEmail: "contact@stromae.com" },
      {
        id: "44",
        contactName: "Bigflo & Oli",
        contactEmail: "contact@bigfloetoli.com",
      },
    ],
  },
  {
    id: "11",
    name: "Parenting Bloggers",
    description: "Influenceurs parentalité pour campagne produits bébé/enfant",
    category: "Famille",
    createdAt: "2024-02-28",
    influencers: [
      {
        id: "45",
        contactName: "Maman Déborde",
        contactEmail: "contact@mamandeborde.com",
      },
      {
        id: "46",
        contactName: "Papa Positive",
        contactEmail: "papa@papapositive.fr",
      },
      {
        id: "47",
        contactName: "Les Maternelles",
        contactEmail: "contact@lesmaternelles.com",
      },
      {
        id: "48",
        contactName: "Famille Nombreuse",
        contactEmail: "contact@famillenombreuse.com",
      },
    ],
  },
  {
    id: "12",
    name: "Eco-Influencers",
    description: "Influenceurs éco-responsables pour marque durable",
    category: "Écologie",
    createdAt: "2024-06-12",
    influencers: [
      {
        id: "49",
        contactName: "Camille Se Lance",
        contactEmail: "camille@camilleselance.com",
      },
      {
        id: "50",
        contactName: "Julien Vidal",
        contactEmail: "julien@cacommenceparmoi.org",
      },
      {
        id: "51",
        contactName: "Lucie Pinson",
        contactEmail: "lucie@reclaimfinance.org",
      },
      {
        id: "52",
        contactName: "Zero Waste France",
        contactEmail: "contact@zerowastefrance.org",
      },
    ],
  },
  {
    id: "13",
    name: "Luxury Lifestyle",
    description: "Influenceurs luxe et lifestyle haut de gamme",
    category: "Luxe",
    createdAt: "2024-01-25",
    influencers: [
      {
        id: "53",
        contactName: "Luxury Lifestyle",
        contactEmail: "contact@luxurylifestyle.com",
      },
      {
        id: "54",
        contactName: "Rich Kids",
        contactEmail: "contact@richkids.com",
      },
      {
        id: "55",
        contactName: "Monaco Life",
        contactEmail: "contact@monacolife.com",
      },
    ],
  },
  {
    id: "14",
    name: "Pet Influencers",
    description: "Influenceurs animaliers pour marque alimentation animale",
    category: "Animaux",
    createdAt: "2024-03-08",
    influencers: [
      {
        id: "56",
        contactName: "Grumpy Cat",
        contactEmail: "grumpy@grumpycat.com",
      },
      {
        id: "57",
        contactName: "Doug the Pug",
        contactEmail: "doug@dougthepug.com",
      },
      { id: "58", contactName: "Nala Cat", contactEmail: "nala@nalacat.com" },
      { id: "59", contactName: "Jiff Pom", contactEmail: "jiff@jiffpom.com" },
    ],
  },
];

// Remplacer l'export mockLists par extendedMockLists
export { extendedMockLists as mockLists };
```

### Étape 2 : Créer des fonctions utilitaires pour les statistiques

Ajouter dans `src/lib/mockData.ts` :

```tsx
// Fonctions utilitaires pour les statistiques des listes
export function getListStatistics() {
  const totalLists = mockLists.length;
  const totalContacts = mockLists.reduce(
    (sum, list) => sum + list.influencers.length,
    0
  );
  const totalCategories = new Set(mockLists.map((list) => list.category)).size;
  const averageContactsPerList = Math.round(totalContacts / totalLists);

  const contactsWithEmail = mockLists.reduce(
    (sum, list) =>
      sum + list.influencers.filter((inf) => inf.contactEmail).length,
    0
  );

  const emailCompletionRate = Math.round(
    (contactsWithEmail / totalContacts) * 100
  );

  const categoryDistribution = mockLists.reduce((acc, list) => {
    acc[list.category] = (acc[list.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostPopularCategory = Object.entries(categoryDistribution).sort(
    ([, a], [, b]) => b - a
  )[0];

  const recentLists = mockLists.filter((list) => {
    const listDate = new Date(list.createdAt);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return listDate >= thirtyDaysAgo;
  }).length;

  return {
    totalLists,
    totalContacts,
    totalCategories,
    averageContactsPerList,
    contactsWithEmail,
    emailCompletionRate,
    categoryDistribution,
    mostPopularCategory: mostPopularCategory
      ? {
          name: mostPopularCategory[0],
          count: mostPopularCategory[1],
        }
      : null,
    recentLists,
  };
}

export function getListsByCategory(category?: string): InfluencerList[] {
  if (!category) return mockLists;
  return mockLists.filter((list) => list.category === category);
}

export function searchLists(query: string): InfluencerList[] {
  const lowerQuery = query.toLowerCase();
  return mockLists.filter(
    (list) =>
      list.name.toLowerCase().includes(lowerQuery) ||
      list.description?.toLowerCase().includes(lowerQuery) ||
      list.category.toLowerCase().includes(lowerQuery) ||
      list.influencers.some(
        (inf) =>
          inf.contactName?.toLowerCase().includes(lowerQuery) ||
          inf.contactEmail?.toLowerCase().includes(lowerQuery)
      )
  );
}

export function getListsCreatedInPeriod(days: number): InfluencerList[] {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  return mockLists.filter((list) => new Date(list.createdAt) >= cutoffDate);
}

export function getTopListsByContactCount(limit: number = 5): InfluencerList[] {
  return [...mockLists]
    .sort((a, b) => b.influencers.length - a.influencers.length)
    .slice(0, limit);
}

export function getListCompletionStats() {
  return mockLists.map((list) => {
    const totalContacts = list.influencers.length;
    const contactsWithEmail = list.influencers.filter(
      (inf) => inf.contactEmail
    ).length;
    const completionRate =
      totalContacts > 0 ? (contactsWithEmail / totalContacts) * 100 : 0;

    return {
      id: list.id,
      name: list.name,
      category: list.category,
      totalContacts,
      contactsWithEmail,
      completionRate: Math.round(completionRate),
      status:
        completionRate >= 80
          ? "complete"
          : completionRate >= 50
          ? "partial"
          : "incomplete",
    };
  });
}
```

### Étape 3 : Créer un hook pour les statistiques de listes

Créer `src/hooks/useListStatistics.ts` :

```tsx
import { useState, useEffect } from "react";
import {
  getListStatistics,
  getListsByCategory,
  getTopListsByContactCount,
  getListCompletionStats,
} from "@/lib/mockData";

interface ListStatistics {
  totalLists: number;
  totalContacts: number;
  totalCategories: number;
  averageContactsPerList: number;
  contactsWithEmail: number;
  emailCompletionRate: number;
  categoryDistribution: Record<string, number>;
  mostPopularCategory: { name: string; count: number } | null;
  recentLists: number;
}

export function useListStatistics() {
  const [statistics, setStatistics] = useState<ListStatistics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler un délai de chargement
    setTimeout(() => {
      const stats = getListStatistics();
      setStatistics(stats);
      setLoading(false);
    }, 300);
  }, []);

  const getTopLists = (limit?: number) => {
    return getTopListsByContactCount(limit);
  };

  const getListsByCategory = (category: string) => {
    return getListsByCategory(category);
  };

  const getCompletionStats = () => {
    return getListCompletionStats();
  };

  return {
    statistics,
    loading,
    getTopLists,
    getListsByCategory,
    getCompletionStats,
  };
}
```

### Étape 4 : Créer un composant ListsAnalytics

Créer `src/components/lists/ListsAnalytics.tsx` :

```tsx
"use client";

import { useListStatistics } from "@/hooks/useListStatistics";
import {
  ChartBarIcon,
  UserGroupIcon,
  TagIcon,
  EnvelopeIcon,
  TrendingUpIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

export default function ListsAnalytics() {
  const { statistics, loading } = useListStatistics();

  if (loading || !statistics) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 h-32 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  const statCards = [
    {
      title: "Total des listes",
      value: statistics.totalLists,
      icon: ChartBarIcon,
      color: "purple",
      description: `${statistics.recentLists} créées ce mois`,
    },
    {
      title: "Total des contacts",
      value: statistics.totalContacts,
      icon: UserGroupIcon,
      color: "blue",
      description: `${statistics.averageContactsPerList} par liste en moyenne`,
    },
    {
      title: "Catégories actives",
      value: statistics.totalCategories,
      icon: TagIcon,
      color: "green",
      description: statistics.mostPopularCategory
        ? `${statistics.mostPopularCategory.name} (${statistics.mostPopularCategory.count})`
        : "Aucune catégorie",
    },
    {
      title: "Emails disponibles",
      value: `${statistics.emailCompletionRate}%`,
      icon: EnvelopeIcon,
      color: "orange",
      description: `${statistics.contactsWithEmail} contacts sur ${statistics.totalContacts}`,
    },
    {
      title: "Taux de complétion",
      value: `${Math.round(
        (statistics.contactsWithEmail / statistics.totalContacts) * 100
      )}%`,
      icon: TrendingUpIcon,
      color: "indigo",
      description: "Contacts avec informations complètes",
    },
    {
      title: "Listes récentes",
      value: statistics.recentLists,
      icon: ClockIcon,
      color: "pink",
      description: "Créées dans les 30 derniers jours",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      purple: "bg-purple-50 text-purple-600 border-purple-200",
      blue: "bg-blue-50 text-blue-600 border-blue-200",
      green: "bg-green-50 text-green-600 border-green-200",
      orange: "bg-orange-50 text-orange-600 border-orange-200",
      indigo: "bg-indigo-50 text-indigo-600 border-indigo-200",
      pink: "bg-pink-50 text-pink-600 border-pink-200",
    };
    return colors[color as keyof typeof colors] || colors.purple;
  };

  return (
    <div className="space-y-6">
      {/* Titre */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Statistiques des listes
        </h2>
        <p className="text-gray-600">
          Vue d'ensemble de vos listes d'influenceurs et contacts
        </p>
      </div>

      {/* Cartes statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = getColorClasses(stat.color);

          return (
            <div
              key={index}
              className={`bg-white rounded-lg border p-6 ${
                colorClasses.includes("border") ? "" : "border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${colorClasses}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-700">
                  {stat.title}
                </div>
                <div className="text-xs text-gray-500">{stat.description}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Répartition par catégorie */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Répartition par catégorie
        </h3>

        <div className="space-y-3">
          {Object.entries(statistics.categoryDistribution)
            .sort(([, a], [, b]) => b - a)
            .map(([category, count]) => {
              const percentage = (count / statistics.totalLists) * 100;

              return (
                <div key={category} className="flex items-center space-x-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        {category}
                      </span>
                      <span className="text-sm text-gray-500">
                        {count} liste{count > 1 ? "s" : ""} (
                        {percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
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

- [ ] Étape 1 : Données mockées étendues avec 7 nouvelles listes
- [ ] Étape 2 : Fonctions utilitaires pour statistiques créées
- [ ] Étape 3 : Hook useListStatistics créé
- [ ] Étape 4 : Composant ListsAnalytics créé avec graphiques
- [ ] Étape 5 : Lint et build passent sans erreur
