'use client';

import { useState } from 'react';

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
    'followers' | 'engagement' | 'reach'
  >('followers');

  const metrics = [
    {
      key: 'followers' as const,
      label: 'Followers',
      color: 'blue',
      icon: '👥',
    },
    {
      key: 'engagement' as const,
      label: 'Engagement',
      color: 'green',
      icon: '❤️',
    },
    { key: 'reach' as const, label: 'Portée', color: 'purple', icon: '📊' },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          line: 'stroke-blue-500',
          fill: 'fill-blue-100',
          text: 'text-blue-600',
          bg: 'bg-blue-50',
          border: 'border-blue-200',
        };
      case 'green':
        return {
          line: 'stroke-green-500',
          fill: 'fill-green-100',
          text: 'text-green-600',
          bg: 'bg-green-50',
          border: 'border-green-200',
        };
      case 'purple':
        return {
          line: 'stroke-purple-500',
          fill: 'fill-purple-100',
          text: 'text-purple-600',
          bg: 'bg-purple-50',
          border: 'border-purple-200',
        };
      default:
        return {
          line: 'stroke-gray-500',
          fill: 'fill-gray-100',
          text: 'text-gray-600',
          bg: 'bg-gray-50',
          border: 'border-gray-200',
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
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ');

  const areaData = `${pathData} L ${points[points.length - 1].x} ${
    height - padding
  } L ${points[0].x} ${height - padding} Z`;

  const formatValue = (value: number, metric: string) => {
    if (metric === 'followers') {
      return value >= 1000000
        ? `${(value / 1000000).toFixed(1)}M`
        : value >= 1000
          ? `${(value / 1000).toFixed(1)}K`
          : value.toString();
    }
    if (metric === 'engagement') {
      return `${value.toFixed(1)}%`;
    }
    if (metric === 'reach') {
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
                  : 'text-gray-600 hover:text-gray-900'
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
                  {new Date(point.date).toLocaleDateString('fr-FR')} :{' '}
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
