'use client';

import { useState } from 'react';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  EyeIcon,
  EyeSlashIcon,
  UserGroupIcon,
  PhotoIcon,
  HeartIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import { MetricsVisibilityConfig, DEFAULT_METRICS_VISIBILITY } from '@/types';

interface MetricsVisibilitySelectorProps {
  value: MetricsVisibilityConfig;
  onChange: (config: MetricsVisibilityConfig) => void;
}

// Configuration des sections avec leurs métriques associées
const SECTIONS_CONFIG = {
  creators: {
    label: 'Créateurs',
    icon: UserGroupIcon,
    description: 'Liste des créateurs participants',
    metrics: [] as string[], // Pas de métriques individuelles
  },
  content: {
    label: 'Content',
    icon: PhotoIcon,
    description: 'Statistiques de contenu',
    metrics: [
      'creatorsPosted',
      'totalPosts',
      'totalReels',
      'totalStories',
      'totalContent',
    ] as const,
  },
  engagement: {
    label: 'Notoriété & Engagement',
    icon: HeartIcon,
    description: "Métriques d'engagement et de portée",
    metrics: [
      'totalEngagements',
      'averageER',
      'totalImpressions',
      'totalReach',
      'totalLikes',
      'totalComments',
      'totalViews',
      'averageVideoER',
      'totalEMV',
    ] as const,
  },
  performance: {
    label: 'Performance',
    icon: ChartBarIcon,
    description: 'Métriques financières et de performance',
    metrics: [
      'totalCreatorCost',
      'averageCPM',
      'averageCPC',
      'roas',
      'roi',
      'costPerEngagement',
    ] as const,
  },
  publishedContents: {
    label: 'Contenus Publiés',
    icon: PhotoIcon,
    description: 'Grille des contenus publiés',
    metrics: [] as string[], // Pas de métriques individuelles
  },
} as const;

// Labels des métriques
const METRICS_LABELS: Record<string, string> = {
  // Content
  creatorsPosted: 'Créateurs ayant posté',
  totalPosts: 'Total posts',
  totalReels: 'Total Reels',
  totalStories: 'Total Stories',
  totalContent: 'Total contenus',
  // Engagement
  totalEngagements: 'Total engagements',
  averageER: 'ER moyen %',
  totalImpressions: 'Impressions estimées',
  totalReach: 'Portée estimée',
  totalLikes: 'Total likes',
  totalComments: 'Total commentaires',
  totalViews: 'Vues',
  averageVideoER: 'ER vidéo moyen',
  totalEMV: 'EMV',
  // Performance
  totalCreatorCost: 'Coût total créateurs',
  averageCPM: 'CPM',
  averageCPC: 'CPC',
  roas: 'ROAS',
  roi: 'ROI',
  costPerEngagement: 'Coût par engagement',
};

type SectionKey = keyof typeof SECTIONS_CONFIG;

export default function MetricsVisibilitySelector({
  value,
  onChange,
}: MetricsVisibilitySelectorProps) {
  const [expandedSections, setExpandedSections] = useState<
    Record<SectionKey, boolean>
  >({
    creators: false,
    content: false,
    engagement: false,
    performance: false,
    publishedContents: false,
  });

  const toggleSectionExpanded = (section: SectionKey) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleSection = (section: SectionKey) => {
    const newValue = !value.sections[section];
    const newConfig = { ...value };
    newConfig.sections = { ...newConfig.sections, [section]: newValue };

    // Si on désactive une section, on désactive aussi toutes ses métriques
    const sectionMetrics = SECTIONS_CONFIG[section].metrics;
    if (!newValue && sectionMetrics.length > 0) {
      newConfig.metrics = { ...newConfig.metrics };
      sectionMetrics.forEach((metric) => {
        (newConfig.metrics as Record<string, boolean>)[metric] = false;
      });
    }
    // Si on active une section, on réactive toutes ses métriques
    if (newValue && sectionMetrics.length > 0) {
      newConfig.metrics = { ...newConfig.metrics };
      sectionMetrics.forEach((metric) => {
        (newConfig.metrics as Record<string, boolean>)[metric] = true;
      });
    }

    onChange(newConfig);
  };

  const toggleMetric = (metric: string) => {
    const newConfig = { ...value };
    newConfig.metrics = {
      ...newConfig.metrics,
      [metric]: !(newConfig.metrics as Record<string, boolean>)[metric],
    };
    onChange(newConfig);
  };

  const selectAll = () => {
    onChange(DEFAULT_METRICS_VISIBILITY);
  };

  const deselectAll = () => {
    const newConfig: MetricsVisibilityConfig = {
      sections: {
        creators: false,
        content: false,
        engagement: false,
        performance: false,
        publishedContents: false,
      },
      metrics: {
        creatorsPosted: false,
        totalPosts: false,
        totalReels: false,
        totalStories: false,
        totalContent: false,
        totalEngagements: false,
        averageER: false,
        totalImpressions: false,
        totalReach: false,
        totalLikes: false,
        totalComments: false,
        totalViews: false,
        averageVideoER: false,
        totalEMV: false,
        totalCreatorCost: false,
        averageCPM: false,
        averageCPC: false,
        roas: false,
        roi: false,
        costPerEngagement: false,
      },
    };
    onChange(newConfig);
  };

  // Calculer le nombre de métriques visibles
  const visibleMetricsCount = Object.values(value.metrics).filter(
    Boolean
  ).length;
  const totalMetricsCount = Object.keys(value.metrics).length;
  const visibleSectionsCount = Object.values(value.sections).filter(
    Boolean
  ).length;
  const totalSectionsCount = Object.keys(value.sections).length;

  return (
    <div className="space-y-4">
      {/* En-tête avec actions globales */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <EyeIcon className="w-5 h-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">
            Métriques visibles : {visibleMetricsCount}/{totalMetricsCount}
          </span>
          <span className="text-xs text-gray-400">
            ({visibleSectionsCount}/{totalSectionsCount} sections)
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={selectAll}
            className="text-xs text-purple-600 hover:text-purple-700 font-medium"
          >
            Tout afficher
          </button>
          <span className="text-gray-300">|</span>
          <button
            type="button"
            onClick={deselectAll}
            className="text-xs text-gray-500 hover:text-gray-600 font-medium"
          >
            Tout masquer
          </button>
        </div>
      </div>

      {/* Liste des sections */}
      <div className="space-y-2">
        {(
          Object.entries(SECTIONS_CONFIG) as [
            SectionKey,
            (typeof SECTIONS_CONFIG)[SectionKey],
          ][]
        ).map(([sectionKey, section]) => {
          const Icon = section.icon;
          const isExpanded = expandedSections[sectionKey];
          const isSectionEnabled = value.sections[sectionKey];
          const hasMetrics = section.metrics.length > 0;

          // Compter les métriques activées pour cette section
          const enabledMetricsCount = hasMetrics
            ? section.metrics.filter(
                (m) => (value.metrics as Record<string, boolean>)[m]
              ).length
            : 0;

          return (
            <div
              key={sectionKey}
              className={`border rounded-xl overflow-hidden transition-all duration-200 ${
                isSectionEnabled
                  ? 'border-purple-200 bg-purple-50/50'
                  : 'border-gray-200 bg-gray-50/50'
              }`}
            >
              {/* En-tête de section */}
              <div className="flex items-center p-3">
                {/* Toggle de la section */}
                <button
                  type="button"
                  onClick={() => toggleSection(sectionKey)}
                  className={`w-10 h-6 rounded-full relative transition-colors duration-200 mr-3 ${
                    isSectionEnabled ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                      isSectionEnabled ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>

                {/* Info section */}
                <div className="flex items-center flex-1 min-w-0">
                  <Icon
                    className={`w-5 h-5 mr-2 ${
                      isSectionEnabled ? 'text-purple-600' : 'text-gray-400'
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      <span
                        className={`font-medium text-sm ${
                          isSectionEnabled ? 'text-gray-900' : 'text-gray-500'
                        }`}
                      >
                        {section.label}
                      </span>
                      {hasMetrics && (
                        <span className="ml-2 text-xs text-gray-400">
                          ({enabledMetricsCount}/{section.metrics.length})
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 truncate">
                      {section.description}
                    </p>
                  </div>
                </div>

                {/* Bouton d'expansion (uniquement si la section a des métriques) */}
                {hasMetrics && (
                  <button
                    type="button"
                    onClick={() => toggleSectionExpanded(sectionKey)}
                    className="p-1 hover:bg-gray-200 rounded-lg transition-colors ml-2"
                  >
                    {isExpanded ? (
                      <ChevronUpIcon className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                )}
              </div>

              {/* Liste des métriques (si section étendue et a des métriques) */}
              {hasMetrics && isExpanded && (
                <div className="px-3 pb-3 pt-1 border-t border-gray-200/50">
                  <div className="grid grid-cols-2 gap-2">
                    {section.metrics.map((metricKey) => {
                      const isEnabled =
                        (value.metrics as Record<string, boolean>)[metricKey] &&
                        isSectionEnabled;
                      return (
                        <label
                          key={metricKey}
                          className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors ${
                            isEnabled
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-gray-100 text-gray-500'
                          } ${!isSectionEnabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-100/70'}`}
                        >
                          <input
                            type="checkbox"
                            checked={isEnabled}
                            onChange={() => toggleMetric(metricKey)}
                            disabled={!isSectionEnabled}
                            className="sr-only"
                          />
                          {isEnabled ? (
                            <EyeIcon className="w-4 h-4 mr-2 text-purple-600" />
                          ) : (
                            <EyeSlashIcon className="w-4 h-4 mr-2 text-gray-400" />
                          )}
                          <span className="text-xs font-medium truncate">
                            {METRICS_LABELS[metricKey]}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Résumé */}
      <div className="bg-gray-100 rounded-lg p-3 text-center">
        <p className="text-xs text-gray-600">
          Le rapport partagé affichera{' '}
          <span className="font-semibold text-purple-600">
            {visibleSectionsCount} section{visibleSectionsCount > 1 ? 's' : ''}
          </span>{' '}
          et{' '}
          <span className="font-semibold text-purple-600">
            {visibleMetricsCount} métrique{visibleMetricsCount > 1 ? 's' : ''}
          </span>
        </p>
      </div>
    </div>
  );
}
