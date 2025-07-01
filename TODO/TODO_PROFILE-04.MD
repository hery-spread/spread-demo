# PLAN D'ACTION PRESCRIPTIF : PROFILE-04

**User Story :** En tant qu'utilisateur, je veux voir des graphiques d'évolution de l'audience et des métriques de performance pour analyser la croissance d'un influenceur.

**Objectif :** Créer des composants de graphiques et métriques avancées pour l'analyse de performance.

---

## Plan d'Action Prescriptif

### Étape 1 : Créer le composant PerformanceChart

Créer `src/components/profile/charts/PerformanceChart.tsx` :

```tsx
"use client";

import { useState } from "react";

interface PerformanceData {
  date: string;
  followers: number;
  engagement: number;
  reach: number;
}

interface PerformanceChartProps {
  data: PerformanceData[];
  title: string;
}

export default function PerformanceChart({
  data,
  title,
}: PerformanceChartProps) {
  const [activeMetric, setActiveMetric] = useState<
    "followers" | "engagement" | "reach"
  >("followers");

  const metrics = [
    {
      key: "followers" as const,
      label: "Followers",
      color: "blue",
      icon: "👥",
    },
    {
      key: "engagement" as const,
      label: "Engagement",
      color: "green",
      icon: "❤️",
    },
    { key: "reach" as const, label: "Portée", color: "purple", icon: "📊" },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return {
          line: "stroke-blue-500",
          fill: "fill-blue-100",
          text: "text-blue-600",
          bg: "bg-blue-50",
          border: "border-blue-200",
        };
      case "green":
        return {
          line: "stroke-green-500",
          fill: "fill-green-100",
          text: "text-green-600",
          bg: "bg-green-50",
          border: "border-green-200",
        };
      case "purple":
        return {
          line: "stroke-purple-500",
          fill: "fill-purple-100",
          text: "text-purple-600",
          bg: "bg-purple-50",
          border: "border-purple-200",
        };
      default:
        return {
          line: "stroke-gray-500",
          fill: "fill-gray-100",
          text: "text-gray-600",
          bg: "bg-gray-50",
          border: "border-gray-200",
        };
    }
  };

  const currentMetric = metrics.find((m) => m.key === activeMetric)!;
  const colors = getColorClasses(currentMetric.color);

  // Calculer les valeurs min/max pour le scaling
  const values = data.map((d) => d[activeMetric]);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const range = maxValue - minValue;

  // Générer les points du graphique
  const width = 400;
  const height = 200;
  const padding = 20;

  const points = data.map((item, index) => {
    const x = padding + (index / (data.length - 1)) * (width - 2 * padding);
    const y =
      height -
      padding -
      ((item[activeMetric] - minValue) / range) * (height - 2 * padding);
    return { x, y, value: item[activeMetric], date: item.date };
  });

  const pathData = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  const areaData = `${pathData} L ${points[points.length - 1].x} ${
    height - padding
  } L ${points[0].x} ${height - padding} Z`;

  const formatValue = (value: number, metric: string) => {
    if (metric === "followers") {
      return value >= 1000000
        ? `${(value / 1000000).toFixed(1)}M`
        : value >= 1000
        ? `${(value / 1000).toFixed(1)}K`
        : value.toString();
    }
    if (metric === "engagement") {
      return `${value.toFixed(1)}%`;
    }
    if (metric === "reach") {
      return value >= 1000000
        ? `${(value / 1000000).toFixed(1)}M`
        : value >= 1000
        ? `${(value / 1000).toFixed(1)}K`
        : value.toString();
    }
    return value.toString();
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>

        {/* Sélecteur de métrique */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          {metrics.map((metric) => (
            <button
              key={metric.key}
              onClick={() => setActiveMetric(metric.key)}
              className={`flex items-center space-x-2 px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                activeMetric === metric.key
                  ? `bg-white shadow-sm ${getColorClasses(metric.color).text}`
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <span>{metric.icon}</span>
              <span>{metric.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Graphique */}
      <div className="relative">
        <svg width={width} height={height} className="w-full h-auto">
          {/* Grille de fond */}
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#f3f4f6"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Zone sous la courbe */}
          <path d={areaData} className={colors.fill} opacity="0.3" />

          {/* Ligne principale */}
          <path
            d={pathData}
            fill="none"
            className={colors.line}
            strokeWidth="2"
          />

          {/* Points */}
          {points.map((point, index) => (
            <g key={index}>
              <circle
                cx={point.x}
                cy={point.y}
                r="4"
                className={`${colors.line} fill-white`}
                strokeWidth="2"
              />

              {/* Tooltip au survol */}
              <circle
                cx={point.x}
                cy={point.y}
                r="8"
                fill="transparent"
                className="cursor-pointer"
              >
                <title>
                  {new Date(point.date).toLocaleDateString("fr-FR")} :{" "}
                  {formatValue(point.value, activeMetric)}
                </title>
              </circle>
            </g>
          ))}
        </svg>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div
          className={`text-center p-3 rounded-lg ${colors.bg} ${colors.border} border`}
        >
          <div className={`text-lg font-bold ${colors.text}`}>
            {formatValue(values[values.length - 1], activeMetric)}
          </div>
          <div className="text-xs text-gray-600">Actuel</div>
        </div>

        <div
          className={`text-center p-3 rounded-lg ${colors.bg} ${colors.border} border`}
        >
          <div className={`text-lg font-bold ${colors.text}`}>
            {formatValue(Math.max(...values), activeMetric)}
          </div>
          <div className="text-xs text-gray-600">Maximum</div>
        </div>

        <div
          className={`text-center p-3 rounded-lg ${colors.bg} ${colors.border} border`}
        >
          <div className={`text-lg font-bold ${colors.text}`}>
            +{formatValue(values[values.length - 1] - values[0], activeMetric)}
          </div>
          <div className="text-xs text-gray-600">Évolution</div>
        </div>
      </div>
    </div>
  );
}
```

### Étape 2 : Créer le composant EngagementBreakdown

Créer `src/components/profile/charts/EngagementBreakdown.tsx` :

```tsx
"use client";

interface EngagementBreakdownProps {
  data: {
    likes: number;
    comments: number;
    shares: number;
    saves: number;
  };
  totalEngagement: number;
}

export default function EngagementBreakdown({
  data,
  totalEngagement,
}: EngagementBreakdownProps) {
  const engagementTypes = [
    { key: "likes", label: "Likes", icon: "❤️", color: "bg-red-500" },
    {
      key: "comments",
      label: "Commentaires",
      icon: "💬",
      color: "bg-blue-500",
    },
    { key: "shares", label: "Partages", icon: "📤", color: "bg-green-500" },
    { key: "saves", label: "Sauvegardes", icon: "🔖", color: "bg-purple-500" },
  ] as const;

  const calculatePercentage = (value: number) => {
    return ((value / totalEngagement) * 100).toFixed(1);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Répartition de l'engagement
      </h3>

      {/* Graphique en barres empilées */}
      <div className="mb-6">
        <div className="flex rounded-lg overflow-hidden h-4">
          {engagementTypes.map((type) => {
            const percentage = parseFloat(calculatePercentage(data[type.key]));
            return (
              <div
                key={type.key}
                className={type.color}
                style={{ width: `${percentage}%` }}
                title={`${type.label}: ${formatNumber(
                  data[type.key]
                )} (${percentage}%)`}
              />
            );
          })}
        </div>
      </div>

      {/* Détails par type */}
      <div className="grid grid-cols-2 gap-4">
        {engagementTypes.map((type) => {
          const value = data[type.key];
          const percentage = calculatePercentage(value);

          return (
            <div
              key={type.key}
              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">{type.icon}</span>
                <div className={`w-3 h-3 rounded-full ${type.color}`}></div>
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {type.label}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {percentage}%
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  {formatNumber(value)} interactions
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Total */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-900">
            Total des interactions
          </span>
          <span className="text-lg font-bold text-gray-900">
            {formatNumber(totalEngagement)}
          </span>
        </div>
      </div>
    </div>
  );
}
```

### Étape 3 : Créer le composant PostPerformance

Créer `src/components/profile/charts/PostPerformance.tsx` :

```tsx
"use client";

interface Post {
  id: string;
  type: "image" | "video" | "carousel";
  thumbnail: string;
  likes: number;
  comments: number;
  engagement: number;
  date: string;
}

interface PostPerformanceProps {
  posts: Post[];
}

export default function PostPerformance({ posts }: PostPerformanceProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "image":
        return "📷";
      case "video":
        return "🎥";
      case "carousel":
        return "📱";
      default:
        return "📄";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "image":
        return "bg-blue-100 text-blue-800";
      case "video":
        return "bg-red-100 text-red-800";
      case "carousel":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
    });
  };

  // Trier par engagement décroissant
  const sortedPosts = [...posts].sort((a, b) => b.engagement - a.engagement);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Performance des publications récentes
      </h3>

      <div className="space-y-4">
        {sortedPosts.map((post, index) => (
          <div
            key={post.id}
            className="flex items-center space-x-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {/* Rang */}
            <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full text-sm font-semibold text-gray-600">
              {index + 1}
            </div>

            {/* Thumbnail */}
            <div className="relative">
              <img
                src={post.thumbnail}
                alt="Post thumbnail"
                className="w-16 h-16 object-cover rounded-lg"
                onError={(e) => {
                  (
                    e.target as HTMLImageElement
                  ).src = `https://via.placeholder.com/64x64/6366f1/ffffff?text=${getTypeIcon(
                    post.type
                  )}`;
                }}
              />
              <div
                className={`absolute -top-1 -right-1 px-1.5 py-0.5 text-xs font-medium rounded-full ${getTypeColor(
                  post.type
                )}`}
              >
                {getTypeIcon(post.type)}
              </div>
            </div>

            {/* Métriques */}
            <div className="flex-1 grid grid-cols-4 gap-4">
              <div>
                <div className="text-sm font-semibold text-gray-900">
                  {formatNumber(post.likes)}
                </div>
                <div className="text-xs text-gray-500">Likes</div>
              </div>

              <div>
                <div className="text-sm font-semibold text-gray-900">
                  {formatNumber(post.comments)}
                </div>
                <div className="text-xs text-gray-500">Commentaires</div>
              </div>

              <div>
                <div className="text-sm font-semibold text-gray-900">
                  {post.engagement.toFixed(1)}%
                </div>
                <div className="text-xs text-gray-500">Engagement</div>
              </div>

              <div>
                <div className="text-sm font-semibold text-gray-900">
                  {formatDate(post.date)}
                </div>
                <div className="text-xs text-gray-500">Publié</div>
              </div>
            </div>

            {/* Barre d'engagement */}
            <div className="w-20">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(post.engagement * 10, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Statistiques globales */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-gray-900">
              {formatNumber(posts.reduce((sum, post) => sum + post.likes, 0))}
            </div>
            <div className="text-sm text-gray-600">Total likes</div>
          </div>

          <div>
            <div className="text-lg font-bold text-gray-900">
              {formatNumber(
                posts.reduce((sum, post) => sum + post.comments, 0)
              )}
            </div>
            <div className="text-sm text-gray-600">Total commentaires</div>
          </div>

          <div>
            <div className="text-lg font-bold text-gray-900">
              {(
                posts.reduce((sum, post) => sum + post.engagement, 0) /
                posts.length
              ).toFixed(1)}
              %
            </div>
            <div className="text-sm text-gray-600">Engagement moyen</div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Étape 4 : Mettre à jour les données mockées avec les métriques de performance

Modifier `src/lib/mockData.ts` pour ajouter les données de performance :

```tsx
// Ajouter dans mockInfluencerDetails pour les influenceurs avec données détaillées
const performanceData = {
  "2": {
    // Nabilla Vergara
    performance: [
      {
        date: "2024-01-01",
        followers: 6800000,
        engagement: 4.2,
        reach: 2800000,
      },
      {
        date: "2024-02-01",
        followers: 6850000,
        engagement: 4.5,
        reach: 2950000,
      },
      {
        date: "2024-03-01",
        followers: 6920000,
        engagement: 4.3,
        reach: 2900000,
      },
      {
        date: "2024-04-01",
        followers: 6980000,
        engagement: 4.7,
        reach: 3100000,
      },
      {
        date: "2024-05-01",
        followers: 7050000,
        engagement: 4.4,
        reach: 3000000,
      },
      {
        date: "2024-06-01",
        followers: 7120000,
        engagement: 4.6,
        reach: 3200000,
      },
    ],
    engagementBreakdown: {
      likes: 85.2,
      comments: 8.3,
      shares: 4.1,
      saves: 2.4,
    },
    recentPosts: [
      {
        id: "1",
        type: "image" as const,
        thumbnail: "https://picsum.photos/64/64?random=1",
        likes: 180000,
        comments: 2400,
        engagement: 5.2,
        date: "2024-06-25",
      },
      {
        id: "2",
        type: "video" as const,
        thumbnail: "https://picsum.photos/64/64?random=2",
        likes: 220000,
        comments: 3100,
        engagement: 6.1,
        date: "2024-06-23",
      },
      {
        id: "3",
        type: "carousel" as const,
        thumbnail: "https://picsum.photos/64/64?random=3",
        likes: 165000,
        comments: 1900,
        engagement: 4.8,
        date: "2024-06-21",
      },
    ],
  },
  // Ajouter des données similaires pour les autres influenceurs avec détails
};

// Modifier mockInfluencerDetails pour inclure ces données
export const mockInfluencerDetails: Record<string, InfluencerDetails> = {
  "2": {
    // ... données existantes
    ...performanceData["2"],
  },
  // ... autres influenceurs
};
```

### Étape 5 : Mettre à jour la page de profil pour afficher les graphiques

Modifier `src/app/profile/[id]/page.tsx` pour ajouter l'onglet performance :

```tsx
// Ajouter les imports
import PerformanceChart from "@/components/profile/charts/PerformanceChart";
import EngagementBreakdown from "@/components/profile/charts/EngagementBreakdown";
import PostPerformance from "@/components/profile/charts/PostPerformance";

// Modifier ProfileTabs pour inclure l'onglet performance
const tabs = [
  // ... onglets existants
  {
    id: "performance" as ProfileTab,
    name: "Performance",
    icon: "📈",
    available: hasDetailedData
  }
];

// Ajouter le case "performance" dans renderTabContent()
case "performance":
  if (!detailedData) {
    return (
      <LockedContent
        title="Données de performance verrouillées"
        description="Accédez aux graphiques de performance et à l'analyse détaillée des publications."
        onUnlock={() => setShowUnlockModal(true)}
        creditCost={1}
        features={[
          "Évolution des followers et engagement",
          "Répartition des interactions",
          "Performance des publications récentes",
          "Métriques de portée et croissance"
        ]}
      />
    );
  }
  return (
    <div className="p-6 space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">
        Analyse de performance
      </h3>

      {/* Graphique de performance */}
      <PerformanceChart
        data={detailedData.performance}
        title="Évolution des métriques"
      />

      {/* Répartition de l'engagement et posts récents */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EngagementBreakdown
          data={detailedData.engagementBreakdown}
          totalEngagement={detailedData.engagementBreakdown.likes + detailedData.engagementBreakdown.comments + detailedData.engagementBreakdown.shares + detailedData.engagementBreakdown.saves}
        />
        <PostPerformance posts={detailedData.recentPosts} />
      </div>
    </div>
  );
```

### Étape 6 : Vérifier l'installation

```bash
npm run lint
npm run build
```

---

## Checklist de Validation

- [ ] Étape 1 : Composant PerformanceChart créé avec graphiques interactifs
- [ ] Étape 2 : Composant EngagementBreakdown créé avec répartition des interactions
- [ ] Étape 3 : Composant PostPerformance créé avec analyse des publications
- [ ] Étape 4 : Données mockées étendues avec métriques de performance
- [ ] Étape 5 : Page de profil mise à jour avec onglet performance
- [ ] Étape 6 : Lint et build passent sans erreur
