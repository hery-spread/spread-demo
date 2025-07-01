# PLAN D'ACTION PRESCRIPTIF : DASH-01

**User Story :** En tant qu'utilisateur, je veux voir un Dashboard affichant mes quotas d'utilisation (Recherches, Profils consultés, Utilisateurs) pour suivre ma consommation.

**Objectif :** Créer la page Dashboard principale avec des statistiques d'utilisation.

---

## Plan d'Action Prescriptif

### Étape 1 : Créer le composant de carte de statistique

Créer `src/components/dashboard/StatCard.tsx` :

```tsx
interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
  color?: "blue" | "green" | "purple" | "orange" | "red";
}

export default function StatCard({
  title,
  value,
  subtitle,
  trend,
  icon,
  color = "blue",
}: StatCardProps) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600",
    red: "bg-red-50 text-red-600",
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900 mt-2">{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        {icon && (
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>{icon}</div>
        )}
      </div>
      {trend && (
        <div className="mt-4 flex items-center">
          <span
            className={`text-sm font-medium ${
              trend.isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend.isPositive ? "+" : ""}
            {trend.value}%
          </span>
          <span className="text-sm text-gray-500 ml-2">vs mois dernier</span>
        </div>
      )}
    </div>
  );
}
```

### Étape 2 : Créer le composant de barre de progression

Créer `src/components/dashboard/ProgressBar.tsx` :

```tsx
interface ProgressBarProps {
  label: string;
  current: number;
  total: number | "unlimited";
  color?: "blue" | "green" | "purple" | "orange" | "red";
  showPercentage?: boolean;
}

export default function ProgressBar({
  label,
  current,
  total,
  color = "purple",
  showPercentage = true,
}: ProgressBarProps) {
  const isUnlimited = total === "unlimited";
  const percentage = isUnlimited ? 0 : Math.round((current / total) * 100);

  const getColorClass = () => {
    if (isUnlimited) return "bg-green-500";
    if (percentage >= 90) return "bg-red-500";
    if (percentage >= 75) return "bg-orange-500";
    return `bg-${color}-500`;
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm text-gray-500">
          {isUnlimited ? `${current} (illimité)` : `${current}/${total}`}
          {showPercentage && !isUnlimited && ` (${percentage}%)`}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${getColorClass()}`}
          style={{
            width: isUnlimited ? "100%" : `${Math.min(percentage, 100)}%`,
          }}
        />
      </div>
    </div>
  );
}
```

### Étape 3 : Créer la page Dashboard

Créer `src/app/page.tsx` :

```tsx
"use client";

import { useUserAccount } from "@/hooks/useUserAccount";
import { getUsageStats } from "@/lib/mockData";
import StatCard from "@/components/dashboard/StatCard";
import ProgressBar from "@/components/dashboard/ProgressBar";
import { useEffect, useState } from "react";
import {
  ChartBarIcon,
  UserGroupIcon,
  DocumentTextIcon,
  TrendingUpIcon,
} from "@heroicons/react/24/outline";

interface UsageStats {
  searchesThisMonth: number;
  profilesThisMonth: number;
  topSearchKeywords: string[];
  recentActivity: Array<{
    date: string;
    action: string;
    details: string;
  }>;
}

export default function Dashboard() {
  const { account, loading: accountLoading } = useUserAccount();
  const [stats, setStats] = useState<UsageStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    getUsageStats().then((data) => {
      setStats(data);
      setStatsLoading(false);
    });
  }, []);

  if (accountLoading || statsLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg border border-gray-200 p-6"
            >
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Recherches ce mois"
          value={stats?.searchesThisMonth || 0}
          subtitle="Illimitées disponibles"
          icon={<ChartBarIcon className="w-6 h-6" />}
          color="blue"
          trend={{ value: 12, isPositive: true }}
        />

        <StatCard
          title="Profils consultés"
          value={`${account?.plan.limits.profiles.used}/${account?.plan.limits.profiles.total}`}
          subtitle={`${Math.round(
            ((account?.plan.limits.profiles.used || 0) /
              (account?.plan.limits.profiles.total || 1)) *
              100
          )}% utilisé`}
          icon={<UserGroupIcon className="w-6 h-6" />}
          color="purple"
        />

        <StatCard
          title="Utilisateurs équipe"
          value={`${account?.plan.limits.users.used}/${account?.plan.limits.users.total}`}
          subtitle="Places disponibles"
          icon={<UserGroupIcon className="w-6 h-6" />}
          color="green"
        />

        <StatCard
          title="Plan actuel"
          value={account?.plan.name || ""}
          subtitle={`Renouvellement le ${new Date(
            account?.plan.renewalDate || ""
          ).toLocaleDateString("fr-FR")}`}
          icon={<TrendingUpIcon className="w-6 h-6" />}
          color="orange"
        />
      </div>

      {/* Barres de progression des quotas */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Utilisation des quotas
        </h3>
        <div className="space-y-4">
          <ProgressBar
            label="Recherches mensuelles"
            current={stats?.searchesThisMonth || 0}
            total={account?.plan.limits.searches || "unlimited"}
            color="blue"
          />
          <ProgressBar
            label="Profils consultés"
            current={account?.plan.limits.profiles.used || 0}
            total={account?.plan.limits.profiles.total || 0}
            color="purple"
          />
          <ProgressBar
            label="Utilisateurs équipe"
            current={account?.plan.limits.users.used || 0}
            total={account?.plan.limits.users.total || 0}
            color="green"
          />
        </div>
      </div>

      {/* Activité récente */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Activité récente
        </h3>
        <div className="space-y-3">
          {stats?.recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 py-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {activity.action}
                </p>
                <p className="text-sm text-gray-500">{activity.details}</p>
              </div>
              <span className="text-xs text-gray-400">
                {new Date(activity.date).toLocaleDateString("fr-FR")}
              </span>
            </div>
          ))}
        </div>
      </div>
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

- [ ] Étape 1 : Composant StatCard créé
- [ ] Étape 2 : Composant ProgressBar créé
- [ ] Étape 3 : Page Dashboard créée avec statistiques
- [ ] Étape 4 : Lint et build passent sans erreur
