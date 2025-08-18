'use client';

import { useState, useMemo } from 'react';
import { 
  ChartBarIcon, 
  ArrowTrendingUpIcon,
  CalendarIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline';

interface PerformanceDataPoint {
  date: string;
  followers: number;
  engagement: number;
  reach: number;
  posts?: number;
}

interface ModashPerformanceChartProps {
  data: PerformanceDataPoint[];
  title?: string;
  className?: string;
  isLoading?: boolean;
  showPosts?: boolean;
}

type MetricType = 'followers' | 'engagement' | 'reach' | 'posts';
type TimeRange = '7d' | '30d' | '90d' | '1y' | 'all';

export default function ModashPerformanceChart({
  data,
  title = "Performance historique",
  className = '',
  isLoading = false,
  showPosts = true,
}: ModashPerformanceChartProps) {
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('followers');
  const [timeRange, setTimeRange] = useState<TimeRange>('90d');
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // Filtrer les données selon la période sélectionnée
  const filteredData = useMemo(() => {
    if (!data.length) return [];
    
    const now = new Date();
    let cutoffDate: Date;
    
    switch (timeRange) {
      case '7d':
        cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        cutoffDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      case '1y':
        cutoffDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        return data;
    }
    
    return data.filter(point => new Date(point.date) >= cutoffDate);
  }, [data, timeRange]);

  // Calculer les statistiques
  const stats = useMemo(() => {
    if (!filteredData.length) return null;
    
    const values = filteredData.map(point => point[selectedMetric] || 0);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
    const latest = values[values.length - 1];
    const previous = values[values.length - 2];
    const change = previous ? ((latest - previous) / previous) * 100 : 0;
    
    return { min, max, avg, latest, change };
  }, [filteredData, selectedMetric]);

  // Normaliser les données pour le graphique (0-100)
  const normalizedData = useMemo(() => {
    if (!filteredData.length || !stats) return [];
    
    const { min, max } = stats;
    const range = max - min || 1;
    
    return filteredData.map((point, index) => ({
      ...point,
      normalizedValue: ((point[selectedMetric] || 0) - min) / range * 80 + 10, // 10-90% de hauteur
      index,
    }));
  }, [filteredData, selectedMetric, stats]);

  const formatValue = (value: number, metric: MetricType): string => {
    switch (metric) {
      case 'followers':
      case 'reach':
        if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
        if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
        return value.toLocaleString();
      case 'engagement':
        return `${(value / 1000).toFixed(1)}K`;
      case 'posts':
        return value.toString();
      default:
        return value.toString();
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getMetricColor = (metric: MetricType): string => {
    switch (metric) {
      case 'followers': return '#8B5CF6'; // Purple
      case 'engagement': return '#EC4899'; // Pink
      case 'reach': return '#3B82F6'; // Blue
      case 'posts': return '#10B981'; // Green
      default: return '#6B7280'; // Gray
    }
  };

  const getMetricLabel = (metric: MetricType): string => {
    switch (metric) {
      case 'followers': return 'Followers';
      case 'engagement': return 'Engagement';
      case 'reach': return 'Portée';
      case 'posts': return 'Publications';
      default: return metric;
    }
  };

  if (isLoading) {
    return (
      <div className={`bg-white rounded-xl border border-gray-200 p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className={`bg-white rounded-xl border border-gray-200 p-6 ${className}`}>
        <div className="text-center py-12">
          <ChartBarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Aucune donnée de performance disponible</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <ArrowTrendingUpIcon className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Time Range Selector */}
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
            {(['7d', '30d', '90d', '1y', 'all'] as TimeRange[]).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                  timeRange === range
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {range === 'all' ? 'Tout' : range}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Metric Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(['followers', 'engagement', 'reach', ...(showPosts ? ['posts'] : [])] as MetricType[]).map((metric) => (
          <button
            key={metric}
            onClick={() => setSelectedMetric(metric)}
            className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
              selectedMetric === metric
                ? 'border-purple-200 bg-purple-50 text-purple-700'
                : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {getMetricLabel(metric)}
          </button>
        ))}
      </div>

      {/* Stats Summary */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <p className="text-sm text-gray-500">Actuel</p>
            <p className="text-lg font-semibold text-gray-900">
              {formatValue(stats.latest, selectedMetric)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Évolution</p>
            <p className={`text-lg font-semibold ${
              stats.change > 0 ? 'text-green-600' : stats.change < 0 ? 'text-red-600' : 'text-gray-600'
            }`}>
              {stats.change > 0 ? '+' : ''}{stats.change.toFixed(1)}%
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Maximum</p>
            <p className="text-lg font-semibold text-gray-900">
              {formatValue(stats.max, selectedMetric)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Moyenne</p>
            <p className="text-lg font-semibold text-gray-900">
              {formatValue(stats.avg, selectedMetric)}
            </p>
          </div>
        </div>
      )}

      {/* Chart */}
      <div className="relative h-64 bg-gray-50 rounded-lg p-4">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 800 200"
          className="overflow-visible"
        >
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y * 2}
              x2="800"
              y2={y * 2}
              stroke="#E5E7EB"
              strokeWidth="1"
            />
          ))}

          {/* Chart line */}
          {normalizedData.length > 1 && (
            <polyline
              points={normalizedData
                .map((point, index) => 
                  `${(index / (normalizedData.length - 1)) * 800},${200 - point.normalizedValue * 2}`
                )
                .join(' ')}
              fill="none"
              stroke={getMetricColor(selectedMetric)}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Data points */}
          {normalizedData.map((point, index) => (
            <circle
              key={index}
              cx={(index / (normalizedData.length - 1)) * 800}
              cy={200 - point.normalizedValue * 2}
              r="4"
              fill={getMetricColor(selectedMetric)}
              className="cursor-pointer hover:r-6 transition-all"
              onMouseEnter={() => setHoveredPoint(index)}
              onMouseLeave={() => setHoveredPoint(null)}
            />
          ))}

          {/* Tooltip */}
          {hoveredPoint !== null && normalizedData[hoveredPoint] && (
            <g>
              <rect
                x={(hoveredPoint / (normalizedData.length - 1)) * 800 - 60}
                y={200 - normalizedData[hoveredPoint].normalizedValue * 2 - 40}
                width="120"
                height="30"
                fill="rgba(0, 0, 0, 0.8)"
                rx="4"
              />
              <text
                x={(hoveredPoint / (normalizedData.length - 1)) * 800}
                y={200 - normalizedData[hoveredPoint].normalizedValue * 2 - 25}
                textAnchor="middle"
                fill="white"
                fontSize="12"
                fontWeight="bold"
              >
                {formatValue(normalizedData[hoveredPoint][selectedMetric] || 0, selectedMetric)}
              </text>
              <text
                x={(hoveredPoint / (normalizedData.length - 1)) * 800}
                y={200 - normalizedData[hoveredPoint].normalizedValue * 2 - 12}
                textAnchor="middle"
                fill="white"
                fontSize="10"
              >
                {formatDate(normalizedData[hoveredPoint].date)}
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center mt-4 space-x-6 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <CalendarIcon className="w-4 h-4" />
          <span>Période: {timeRange === 'all' ? 'Toutes les données' : timeRange}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: getMetricColor(selectedMetric) }}
          ></div>
          <span>{getMetricLabel(selectedMetric)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <FunnelIcon className="w-4 h-4" />
          <span>{filteredData.length} points de données</span>
        </div>
      </div>
    </div>
  );
}
