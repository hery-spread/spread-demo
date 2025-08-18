'use client';

import { useState, useMemo } from 'react';
import { 
  UsersIcon, 
  GlobeAltIcon,
  HeartIcon,
  LanguageIcon,
  InformationCircleIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';

interface AudienceData {
  gender: Record<string, number>;
  age: Record<string, number>;
  countries: Record<string, number>;
  cities: Record<string, number>;
  languages: Record<string, number>;
  interests: {
    topics: Record<string, number>;
    brands: Record<string, number>;
  };
}

interface ModashAudienceInsightsProps {
  data: AudienceData;
  title?: string;
  className?: string;
  isLoading?: boolean;
}

type InsightType = 'gender' | 'age' | 'countries' | 'cities' | 'languages' | 'interests';

export default function ModashAudienceInsights({
  data,
  title = "Insights d'audience",
  className = '',
  isLoading = false,
}: ModashAudienceInsightsProps) {
  const [selectedInsight, setSelectedInsight] = useState<InsightType>('gender');
  const [showAllItems, setShowAllItems] = useState(false);

  // Préparer les données pour la visualisation
  const processedData = useMemo(() => {
    const processCategory = (category: Record<string, number>, limit = 10) => {
      return Object.entries(category)
        .sort(([, a], [, b]) => b - a)
        .slice(0, showAllItems ? undefined : limit)
        .map(([key, value]) => ({ key, value, percentage: value * 100 }));
    };

    return {
      gender: processCategory(data.gender),
      age: processCategory(data.age),
      countries: processCategory(data.countries),
      cities: processCategory(data.cities),
      languages: processCategory(data.languages),
      interests: processCategory({
        ...data.interests.topics,
        ...data.interests.brands,
      }),
    };
  }, [data, showAllItems]);

  const getInsightIcon = (type: InsightType) => {
    switch (type) {
      case 'gender': return <UsersIcon className="w-4 h-4" />;
      case 'age': return <UsersIcon className="w-4 h-4" />;
      case 'countries': return <GlobeAltIcon className="w-4 h-4" />;
      case 'cities': return <GlobeAltIcon className="w-4 h-4" />;
      case 'languages': return <LanguageIcon className="w-4 h-4" />;
      case 'interests': return <HeartIcon className="w-4 h-4" />;
      default: return <UsersIcon className="w-4 h-4" />;
    }
  };

  const getInsightLabel = (type: InsightType) => {
    switch (type) {
      case 'gender': return 'Genre';
      case 'age': return 'Âge';
      case 'countries': return 'Pays';
      case 'cities': return 'Villes';
      case 'languages': return 'Langues';
      case 'interests': return 'Intérêts';
      default: return type;
    }
  };

  const getColorForIndex = (index: number): string => {
    const colors = [
      '#8B5CF6', '#EC4899', '#3B82F6', '#10B981', '#F59E0B',
      '#EF4444', '#8B5A2B', '#6366F1', '#84CC16', '#F97316',
    ];
    return colors[index % colors.length];
  };

  const formatKey = (key: string, type: InsightType): string => {
    switch (type) {
      case 'gender':
        return key === 'male' ? '👨 Hommes' : key === 'female' ? '👩 Femmes' : key;
      case 'age':
        return `👥 ${key} ans`;
      case 'countries':
        return `🌍 ${key}`;
      case 'cities':
        return `🏙️ ${key}`;
      case 'languages':
        return `🗣️ ${key}`;
      default:
        return key;
    }
  };

  if (isLoading) {
    return (
      <div className={`bg-white rounded-xl border border-gray-200 p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="flex space-x-4 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-8 bg-gray-200 rounded w-20"></div>
            ))}
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-2 bg-gray-200 rounded flex-1"></div>
                <div className="h-4 bg-gray-200 rounded w-12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const currentData = processedData[selectedInsight] || [];

  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <UsersIcon className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <InformationCircleIcon className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-500">
            {currentData.length} éléments
          </span>
        </div>
      </div>

      {/* Insight Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(['gender', 'age', 'countries', 'cities', 'languages', 'interests'] as InsightType[]).map((type) => (
          <button
            key={type}
            onClick={() => setSelectedInsight(type)}
            className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
              selectedInsight === type
                ? 'border-purple-200 bg-purple-50 text-purple-700'
                : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {getInsightIcon(type)}
            <span>{getInsightLabel(type)}</span>
          </button>
        ))}
      </div>

      {/* Visualization */}
      <div className="space-y-4">
        {/* Top Summary */}
        {currentData.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">
                  Top {getInsightLabel(selectedInsight)}
                </h4>
                <p className="text-sm text-gray-600">
                  {formatKey(currentData[0].key, selectedInsight)} représente{' '}
                  <span className="font-semibold text-purple-600">
                    {currentData[0].percentage.toFixed(1)}%
                  </span>{' '}
                  de l&apos;audience
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  {currentData[0].percentage.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-500">du total</div>
              </div>
            </div>
          </div>
        )}

        {/* Data Bars */}
        <div className="space-y-3">
          {currentData.map((item, index) => (
            <div key={item.key} className="flex items-center space-x-3">
              {/* Label */}
              <div className="w-32 text-sm font-medium text-gray-700 truncate">
                {formatKey(item.key, selectedInsight)}
              </div>
              
              {/* Progress Bar */}
              <div className="flex-1 relative">
                <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${Math.max(item.percentage, 2)}%`,
                      backgroundColor: getColorForIndex(index),
                    }}
                  />
                </div>
                
                {/* Percentage Label */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-medium text-white mix-blend-difference">
                    {item.percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
              
              {/* Value */}
              <div className="w-16 text-right text-sm text-gray-600">
                {item.percentage.toFixed(1)}%
              </div>
            </div>
          ))}
        </div>

        {/* Show More/Less Button */}
        {Object.keys(data[selectedInsight] || {}).length > 10 && (
          <div className="text-center pt-4">
            <button
              onClick={() => setShowAllItems(!showAllItems)}
              className="flex items-center space-x-2 mx-auto px-4 py-2 text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
            >
              <span>
                {showAllItems ? 'Voir moins' : `Voir tout (${Object.keys(data[selectedInsight] || {}).length})`}
              </span>
              <ChevronDownIcon 
                className={`w-4 h-4 transition-transform ${showAllItems ? 'rotate-180' : ''}`} 
              />
            </button>
          </div>
        )}

        {/* Insights Summary */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <InformationCircleIcon className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-900 mb-2">
                Insights clés - {getInsightLabel(selectedInsight)}
              </h4>
              <div className="space-y-1 text-sm text-blue-800">
                {selectedInsight === 'gender' && currentData.length >= 2 && (
                  <p>
                    L&apos;audience est composée à {currentData[0].percentage.toFixed(0)}% de{' '}
                    {currentData[0].key === 'female' ? 'femmes' : 'hommes'} et{' '}
                    {currentData[1].percentage.toFixed(0)}% de{' '}
                    {currentData[1].key === 'female' ? 'femmes' : 'hommes'}.
                  </p>
                )}
                {selectedInsight === 'age' && currentData.length > 0 && (
                  <p>
                    La tranche d&apos;âge dominante est {currentData[0].key} avec{' '}
                    {currentData[0].percentage.toFixed(1)}% de l&apos;audience.
                  </p>
                )}
                {selectedInsight === 'countries' && currentData.length > 0 && (
                  <p>
                    {currentData[0].key} est le pays principal avec{' '}
                    {currentData[0].percentage.toFixed(1)}% de l&apos;audience.
                    {currentData.length > 1 && (
                      <> Les {Math.min(3, currentData.length)} premiers pays représentent{' '}
                      {currentData.slice(0, 3).reduce((sum, item) => sum + item.percentage, 0).toFixed(1)}% du total.</>
                    )}
                  </p>
                )}
                {selectedInsight === 'languages' && currentData.length > 0 && (
                  <p>
                    {currentData[0].key} est la langue principale avec{' '}
                    {currentData[0].percentage.toFixed(1)}% de l&apos;audience.
                  </p>
                )}
                {selectedInsight === 'interests' && currentData.length > 0 && (
                  <p>
                    Les intérêts principaux incluent {currentData.slice(0, 3).map(item => item.key).join(', ')}.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
