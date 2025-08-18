'use client';

import { useState } from 'react';
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  InformationCircleIcon,
  EyeIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';

interface MetricData {
  label: string;
  value: number;
  previousValue?: number;
  format: 'number' | 'percentage' | 'currency' | 'duration';
  icon?: React.ReactNode;
  color?: 'blue' | 'green' | 'purple' | 'pink' | 'yellow' | 'red';
  description?: string;
}

interface ModashMetricsCardProps {
  title: string;
  metrics: MetricData[];
  className?: string;
  showTrends?: boolean;
  isLoading?: boolean;
}

export default function ModashMetricsCard({
  title,
  metrics,
  className = '',
  showTrends = true,
  isLoading = false,
}: ModashMetricsCardProps) {
  const [selectedMetric, setSelectedMetric] = useState<number | null>(null);

  const formatValue = (value: number, format: MetricData['format']): string => {
    switch (format) {
      case 'number':
        if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
        if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
        return value.toLocaleString();
      case 'percentage':
        return `${value.toFixed(1)}%`;
      case 'currency':
        return `€${value.toLocaleString()}`;
      case 'duration':
        const hours = Math.floor(value / 3600);
        const minutes = Math.floor((value % 3600) / 60);
        return `${hours}h ${minutes}m`;
      default:
        return value.toString();
    }
  };

  const calculateTrend = (
    current: number,
    previous: number
  ): {
    percentage: number;
    isPositive: boolean;
    isSignificant: boolean;
  } => {
    const percentage = ((current - previous) / previous) * 100;
    const isPositive = percentage > 0;
    const isSignificant = Math.abs(percentage) >= 5; // 5% de changement minimum

    return { percentage: Math.abs(percentage), isPositive, isSignificant };
  };

  const getColorClasses = (color: MetricData['color']) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-900',
          icon: 'text-blue-600',
          accent: 'bg-blue-500',
        };
      case 'green':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-900',
          icon: 'text-green-600',
          accent: 'bg-green-500',
        };
      case 'purple':
        return {
          bg: 'bg-purple-50',
          border: 'border-purple-200',
          text: 'text-purple-900',
          icon: 'text-purple-600',
          accent: 'bg-purple-500',
        };
      case 'pink':
        return {
          bg: 'bg-pink-50',
          border: 'border-pink-200',
          text: 'text-pink-900',
          icon: 'text-pink-600',
          accent: 'bg-pink-500',
        };
      case 'yellow':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          text: 'text-yellow-900',
          icon: 'text-yellow-600',
          accent: 'bg-yellow-500',
        };
      case 'red':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-900',
          icon: 'text-red-600',
          accent: 'bg-red-500',
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          text: 'text-gray-900',
          icon: 'text-gray-600',
          accent: 'bg-gray-500',
        };
    }
  };

  if (isLoading) {
    return (
      <div
        className={`bg-white rounded-xl border border-gray-200 p-6 ${className}`}
      >
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 p-6 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <ChartBarIcon className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>

        {selectedMetric !== null && metrics[selectedMetric]?.description && (
          <div className="relative group">
            <InformationCircleIcon className="w-5 h-5 text-gray-400 cursor-help" />
            <div className="absolute right-0 top-6 w-64 p-3 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
              {metrics[selectedMetric].description}
            </div>
          </div>
        )}
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, index) => {
          const colors = getColorClasses(metric.color);
          const trend = metric.previousValue
            ? calculateTrend(metric.value, metric.previousValue)
            : null;

          return (
            <div
              key={index}
              className={`
                ${colors.bg} ${colors.border} border rounded-lg p-4 cursor-pointer
                transition-all duration-200 hover:shadow-md
                ${selectedMetric === index ? 'ring-2 ring-purple-500 ring-opacity-50' : ''}
              `}
              onClick={() =>
                setSelectedMetric(selectedMetric === index ? null : index)
              }
            >
              {/* Metric Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {metric.icon && (
                    <div className={colors.icon}>{metric.icon}</div>
                  )}
                  <span className="text-sm font-medium text-gray-600">
                    {metric.label}
                  </span>
                </div>

                {/* Accent dot */}
                <div className={`w-2 h-2 ${colors.accent} rounded-full`}></div>
              </div>

              {/* Metric Value */}
              <div className="mb-2">
                <span className={`text-2xl font-bold ${colors.text}`}>
                  {formatValue(metric.value, metric.format)}
                </span>
              </div>

              {/* Trend Indicator */}
              {showTrends && trend && trend.isSignificant && (
                <div className="flex items-center space-x-1">
                  {trend.isPositive ? (
                    <ArrowTrendingUpIcon className="w-4 h-4 text-green-500" />
                  ) : (
                    <ArrowTrendingDownIcon className="w-4 h-4 text-red-500" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      trend.isPositive ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {trend.percentage.toFixed(1)}%
                  </span>
                  <span className="text-xs text-gray-500">vs précédent</span>
                </div>
              )}

              {/* No trend indicator */}
              {showTrends && (!trend || !trend.isSignificant) && (
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4"></div>
                  <span className="text-sm text-gray-400">Stable</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Metric Details */}
      {selectedMetric !== null && metrics[selectedMetric]?.description && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-start space-x-3">
            <InformationCircleIcon className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900 mb-1">
                {metrics[selectedMetric].label}
              </h4>
              <p className="text-sm text-gray-600">
                {metrics[selectedMetric].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Composants prédéfinis pour différents types de métriques

export function EngagementMetricsCard({
  data,
  isLoading = false,
}: {
  data: {
    likes: number;
    comments: number;
    shares: number;
    saves: number;
    views: number;
    engagementRate: number;
    previousLikes?: number;
    previousComments?: number;
    previousShares?: number;
    previousSaves?: number;
    previousViews?: number;
    previousEngagementRate?: number;
  };
  isLoading?: boolean;
}) {
  const metrics: MetricData[] = [
    {
      label: "Taux d'engagement",
      value: data.engagementRate,
      previousValue: data.previousEngagementRate,
      format: 'percentage',
      icon: <ChartBarIcon className="w-4 h-4" />,
      color: 'purple',
      description:
        "Pourcentage d'engagement moyen par rapport au nombre de followers",
    },
    {
      label: 'Likes moyens',
      value: data.likes,
      previousValue: data.previousLikes,
      format: 'number',
      icon: <HeartIcon className="w-4 h-4" />,
      color: 'pink',
      description: 'Nombre moyen de likes par publication',
    },
    {
      label: 'Commentaires moyens',
      value: data.comments,
      previousValue: data.previousComments,
      format: 'number',
      icon: <ChatBubbleLeftIcon className="w-4 h-4" />,
      color: 'blue',
      description: 'Nombre moyen de commentaires par publication',
    },
    {
      label: 'Partages moyens',
      value: data.shares,
      previousValue: data.previousShares,
      format: 'number',
      icon: <ShareIcon className="w-4 h-4" />,
      color: 'green',
      description: 'Nombre moyen de partages par publication',
    },
    {
      label: 'Vues moyennes',
      value: data.views,
      previousValue: data.previousViews,
      format: 'number',
      icon: <EyeIcon className="w-4 h-4" />,
      color: 'yellow',
      description: 'Nombre moyen de vues par publication (vidéos)',
    },
  ];

  return (
    <ModashMetricsCard
      title="Métriques d'engagement"
      metrics={metrics}
      isLoading={isLoading}
    />
  );
}

export function AudienceMetricsCard({
  data,
  isLoading = false,
}: {
  data: {
    followers: number;
    following: number;
    posts: number;
    averageAge: number;
    malePercentage: number;
    femalePercentage: number;
    previousFollowers?: number;
    previousFollowing?: number;
    previousPosts?: number;
  };
  isLoading?: boolean;
}) {
  const metrics: MetricData[] = [
    {
      label: 'Followers',
      value: data.followers,
      previousValue: data.previousFollowers,
      format: 'number',
      color: 'blue',
      description: 'Nombre total de followers',
    },
    {
      label: 'Following',
      value: data.following,
      previousValue: data.previousFollowing,
      format: 'number',
      color: 'green',
      description: 'Nombre de comptes suivis',
    },
    {
      label: 'Publications',
      value: data.posts,
      previousValue: data.previousPosts,
      format: 'number',
      color: 'purple',
      description: 'Nombre total de publications',
    },
    {
      label: 'Âge moyen',
      value: data.averageAge,
      format: 'number',
      color: 'yellow',
      description: "Âge moyen de l'audience",
    },
    {
      label: 'Audience masculine',
      value: data.malePercentage,
      format: 'percentage',
      color: 'blue',
      description: "Pourcentage d'hommes dans l'audience",
    },
    {
      label: 'Audience féminine',
      value: data.femalePercentage,
      format: 'percentage',
      color: 'pink',
      description: "Pourcentage de femmes dans l'audience",
    },
  ];

  return (
    <ModashMetricsCard
      title="Métriques d'audience"
      metrics={metrics}
      isLoading={isLoading}
    />
  );
}
