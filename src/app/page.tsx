'use client';

import { useUserAccount } from '@/hooks/useUserAccount';
import { getUsageStats } from '@/lib/mockData';
import StatCard from '@/components/dashboard/StatCard';
import ProgressBar from '@/components/dashboard/ProgressBar';
import SubscriptionCard from '@/components/dashboard/SubscriptionCard';
import UsageSummary from '@/components/dashboard/UsageSummary';
import { useEffect, useState } from 'react';
import {
  ChartBarIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';

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
          value={account?.plan.name || ''}
          subtitle={`Renouvellement le ${new Date(
            account?.plan.renewalDate || ''
          ).toLocaleDateString('fr-FR')}`}
          icon={<ArrowTrendingUpIcon className="w-6 h-6" />}
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
            total={account?.plan.limits.searches || 'unlimited'}
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

      {/* Résumé d'utilisation et abonnement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UsageSummary
          account={account!}
          searchesThisMonth={stats?.searchesThisMonth || 0}
        />
        <SubscriptionCard account={account!} />
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
                {new Date(activity.date).toLocaleDateString('fr-FR')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
