# PLAN D'ACTION PRESCRIPTIF : SEARCH-04

**User Story :** En tant qu'utilisateur, je veux des onglets pour filtrer par plateforme (Instagram, YouTube, TikTok, Tous) afin de naviguer rapidement entre les différentes plateformes.

**Objectif :** Créer un système d'onglets pour filtrer les résultats de recherche par plateforme.

---

## Plan d'Action Prescriptif

### Étape 1 : Créer le composant PlatformTabs

Créer `src/components/search/PlatformTabs.tsx` :

```tsx
"use client";

import { useState } from "react";

type Platform = "all" | "instagram" | "youtube" | "tiktok";

interface PlatformTabsProps {
  activePlatform: Platform;
  onPlatformChange: (platform: Platform) => void;
  counts?: {
    all: number;
    instagram: number;
    youtube: number;
    tiktok: number;
  };
}

export default function PlatformTabs({
  activePlatform,
  onPlatformChange,
  counts,
}: PlatformTabsProps) {
  const platforms = [
    {
      id: "all" as Platform,
      name: "Tous",
      icon: "🌐",
      color: "text-gray-600 border-gray-300",
      activeColor: "text-purple-600 border-purple-600 bg-purple-50",
    },
    {
      id: "instagram" as Platform,
      name: "Instagram",
      icon: "📷",
      color: "text-pink-600 border-pink-300",
      activeColor: "text-pink-600 border-pink-600 bg-pink-50",
    },
    {
      id: "youtube" as Platform,
      name: "YouTube",
      icon: "🎥",
      color: "text-red-600 border-red-300",
      activeColor: "text-red-600 border-red-600 bg-red-50",
    },
    {
      id: "tiktok" as Platform,
      name: "TikTok",
      icon: "🎵",
      color: "text-gray-900 border-gray-300",
      activeColor: "text-gray-900 border-gray-900 bg-gray-50",
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center space-x-1 overflow-x-auto">
        {platforms.map((platform) => {
          const isActive = activePlatform === platform.id;
          const count = counts?.[platform.id] || 0;

          return (
            <button
              key={platform.id}
              onClick={() => onPlatformChange(platform.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all duration-200 whitespace-nowrap ${
                isActive
                  ? platform.activeColor
                  : `${platform.color} hover:bg-gray-50`
              }`}
            >
              <span className="text-lg">{platform.icon}</span>
              <span className="font-medium">{platform.name}</span>
              {counts && (
                <span
                  className={`text-sm px-2 py-0.5 rounded-full ${
                    isActive ? "bg-white bg-opacity-80" : "bg-gray-100"
                  }`}
                >
                  {count.toLocaleString()}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
```

### Étape 2 : Créer le composant PlatformStats

Créer `src/components/search/PlatformStats.tsx` :

```tsx
"use client";

import { getSearchStats } from "@/lib/mockData";
import { useEffect, useState } from "react";

interface PlatformStatsProps {
  currentResults?: number;
  activePlatform?: string;
}

export default function PlatformStats({
  currentResults,
  activePlatform,
}: PlatformStatsProps) {
  const [stats, setStats] = useState<ReturnType<typeof getSearchStats> | null>(
    null
  );

  useEffect(() => {
    const searchStats = getSearchStats();
    setStats(searchStats);
  }, []);

  if (!stats) return null;

  const getPlatformName = (platform: string) => {
    switch (platform) {
      case "instagram":
        return "Instagram";
      case "youtube":
        return "YouTube";
      case "tiktok":
        return "TikTok";
      default:
        return "toutes les plateformes";
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200 p-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">
            {currentResults !== undefined
              ? currentResults.toLocaleString()
              : stats.totalInfluencers.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">
            {currentResults !== undefined ? "Résultats" : "Influenceurs"}
          </div>
          {activePlatform && activePlatform !== "all" && (
            <div className="text-xs text-gray-500 mt-1">
              sur {getPlatformName(activePlatform)}
            </div>
          )}
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-pink-600">
            {stats.byPlatform.instagram?.toLocaleString() || 0}
          </div>
          <div className="text-sm text-gray-600">Instagram</div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">
            {stats.byPlatform.youtube?.toLocaleString() || 0}
          </div>
          <div className="text-sm text-gray-600">YouTube</div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {stats.byPlatform.tiktok?.toLocaleString() || 0}
          </div>
          <div className="text-sm text-gray-600">TikTok</div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-purple-200">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-gray-900">
              {stats.avgFollowers.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Followers moyens</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900">
              {stats.avgEngagement}%
            </div>
            <div className="text-sm text-gray-600">Engagement moyen</div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Étape 3 : Mettre à jour la page de recherche avec les onglets

Modifier `src/app/search/page.tsx` pour intégrer les nouveaux composants :

```tsx
// Ajouter les imports
import PlatformTabs from "@/components/search/PlatformTabs";
import PlatformStats from "@/components/search/PlatformStats";

// Ajouter le type Platform
type Platform = "all" | "instagram" | "youtube" | "tiktok";

// Dans le composant, ajouter l'état pour la plateforme active
export default function SearchPage() {
  // ... états existants
  const [activePlatform, setActivePlatform] = useState<Platform>("all");

  // Modifier la fonction handleSearch pour inclure la plateforme
  const handleSearch = async () => {
    setLoading(true);
    setHasSearched(true);

    const searchFilters = {
      ...filters,
      platform: activePlatform !== "all" ? activePlatform : undefined,
    };

    setTimeout(() => {
      const searchResults = searchInfluencers(searchFilters);
      setResults(searchResults);
      setLoading(false);
    }, 800);
  };

  // Fonction pour changer de plateforme
  const handlePlatformChange = (platform: Platform) => {
    setActivePlatform(platform);
    const newFilters = { ...filters };
    if (platform === "all") {
      delete newFilters.platform;
    } else {
      newFilters.platform = platform;
    }
    setFilters(newFilters);
  };

  // Calculer les comptes par plateforme
  const getPlatformCounts = () => {
    const allResults = searchInfluencers(filters);
    return {
      all: allResults.length,
      instagram: allResults.filter((r) => r.platform === "instagram").length,
      youtube: allResults.filter((r) => r.platform === "youtube").length,
      tiktok: allResults.filter((r) => r.platform === "tiktok").length,
    };
  };

  // Mettre à jour useEffect pour relancer la recherche quand la plateforme change
  useEffect(() => {
    handleSearch();
  }, [activePlatform]);

  // Dans le JSX, ajouter les nouveaux composants après le titre :
  return (
    <div className="space-y-6">
      {/* Titre existant */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Recherche d'Influenceurs
        </h1>
        <p className="text-gray-600">
          Utilisez les filtres ci-dessous pour trouver les influenceurs qui
          correspondent à vos critères.
        </p>
      </div>

      {/* Nouveaux composants */}
      <PlatformStats
        currentResults={hasSearched ? results.length : undefined}
        activePlatform={activePlatform}
      />

      <PlatformTabs
        activePlatform={activePlatform}
        onPlatformChange={handlePlatformChange}
        counts={hasSearched ? getPlatformCounts() : undefined}
      />

      {/* Composants existants */}
      <SearchFilters
        filters={filters}
        onFiltersChange={setFilters}
        onSearch={handleSearch}
        loading={loading}
      />

      <SearchResultsTable
        results={results}
        loading={loading}
        onViewProfile={(influencer) => {
          console.log("Voir profil:", influencer.name);
        }}
        onAddToList={(influencer) => {
          console.log("Ajouter à liste:", influencer.name);
        }}
      />
    </div>
  );
}
```

### Étape 4 : Vérifier l'installation

```bash
npm run lint
npm run build
```

---

## Checklist de Validation

- [ ] Étape 1 : Composant PlatformTabs créé avec onglets interactifs
- [ ] Étape 2 : Composant PlatformStats créé avec statistiques
- [ ] Étape 3 : Page de recherche mise à jour avec onglets et stats
- [ ] Étape 4 : Lint et build passent sans erreur
