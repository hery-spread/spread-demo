import { useState } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

export default function StatCard({
  title,
  value,
  subtitle,
  trend,
  icon,
  color = 'blue',
}: StatCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const colorClasses = {
    blue: {
      icon: 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25',
      trend: 'text-blue-600',
      glow: 'group-hover:shadow-blue-500/20',
      shimmer: 'from-blue-500/10 via-blue-500/20 to-blue-500/10',
    },
    green: {
      icon: 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg shadow-green-500/25',
      trend: 'text-green-600',
      glow: 'group-hover:shadow-green-500/20',
      shimmer: 'from-green-500/10 via-green-500/20 to-green-500/10',
    },
    purple: {
      icon: 'bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/25',
      trend: 'text-purple-600',
      glow: 'group-hover:shadow-purple-500/20',
      shimmer: 'from-purple-500/10 via-purple-500/20 to-purple-500/10',
    },
    orange: {
      icon: 'bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25',
      trend: 'text-orange-600',
      glow: 'group-hover:shadow-orange-500/20',
      shimmer: 'from-orange-500/10 via-orange-500/20 to-orange-500/10',
    },
    red: {
      icon: 'bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25',
      trend: 'text-red-600',
      glow: 'group-hover:shadow-red-500/20',
      shimmer: 'from-red-500/10 via-red-500/20 to-red-500/10',
    },
  };

  const currentColors = colorClasses[color];

  return (
    <div
      className={`
        group relative overflow-hidden
        bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6
        shadow-lg shadow-gray-500/5 hover:shadow-xl transition-all duration-500 transform-gpu
        hover:scale-[1.02] hover:-translate-y-1 cursor-pointer
        ${currentColors.glow}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glassmorphism shimmer effect */}
      <div
        className={`
        absolute inset-0 transition-transform duration-1000 
        ${isHovered ? 'translate-x-full' : '-translate-x-full'}
        bg-gradient-to-r from-transparent via-white/30 to-transparent
      `}
      />

      {/* Subtle gradient background on hover */}
      <div
        className={`
        absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
        bg-gradient-to-br ${currentColors.shimmer}
      `}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-2 transition-colors duration-300 group-hover:text-gray-700">
              {title}
            </p>
            <p
              className={`
              text-3xl font-bold text-gray-900 mb-2 transition-all duration-300
              group-hover:scale-105 group-hover:text-gray-950
              ${isHovered ? 'animate-pulse' : ''}
            `}
            >
              {value}
            </p>
            {subtitle && (
              <p className="text-sm text-gray-500 transition-colors duration-300 group-hover:text-gray-600">
                {subtitle}
              </p>
            )}
          </div>

          {icon && (
            <div
              className={`
              p-4 rounded-2xl transition-all duration-300 transform-gpu
              group-hover:scale-110 group-hover:rotate-3
              ${currentColors.icon}
            `}
            >
              <div className="w-6 h-6">{icon}</div>
            </div>
          )}
        </div>

        {trend && (
          <div className="mt-4 flex items-center space-x-2">
            <div
              className={`
              inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
              backdrop-blur-sm border transition-all duration-300
              ${
                trend.isPositive
                  ? 'bg-green-100/80 text-green-700 border-green-200/50 hover:shadow-sm hover:shadow-green-500/20'
                  : 'bg-red-100/80 text-red-700 border-red-200/50 hover:shadow-sm hover:shadow-red-500/20'
              }
              hover:scale-105
            `}
            >
              <svg
                className={`w-4 h-4 mr-1 transition-transform duration-300 ${isHovered ? 'animate-bounce' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    trend.isPositive
                      ? 'M7 17l10-10M17 7v10M17 7H7'
                      : 'M17 7l-10 10M7 17V7M7 17h10'
                  }
                />
              </svg>
              {trend.isPositive ? '+' : ''}
              {trend.value}%
            </div>
            <span className="text-sm text-gray-500 transition-colors duration-300 group-hover:text-gray-600">
              vs mois dernier
            </span>
          </div>
        )}
      </div>

      {/* Subtle border glow on hover */}
      <div className="absolute inset-0 rounded-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none">
        <div
          className={`w-full h-full rounded-2xl border-2 border-transparent bg-gradient-to-r ${currentColors.shimmer} bg-clip-padding`}
        />
      </div>
    </div>
  );
}
