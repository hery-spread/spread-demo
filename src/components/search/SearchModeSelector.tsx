'use client';

import Link from 'next/link';
import {
  MagnifyingGlassIcon,
  GlobeAltIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

type SearchMode = 'advanced' | 'business-dna' | 'from-campaign';

interface SearchModeSelectorProps {
  currentMode: SearchMode;
}

const modes = [
  {
    id: 'advanced' as const,
    label: 'Recherche avancée',
    description: 'Filtres détaillés',
    href: '/search',
    icon: MagnifyingGlassIcon,
    color: 'purple',
  },
  {
    id: 'business-dna' as const,
    label: 'Business DNA',
    description: 'Analyse de site web',
    href: '/search/business-dna',
    icon: GlobeAltIcon,
    color: 'indigo',
  },
  {
    id: 'from-campaign' as const,
    label: 'Depuis campagne',
    description: 'Créateurs similaires',
    href: '/search/from-campaign',
    icon: SparklesIcon,
    color: 'blue',
  },
];

export default function SearchModeSelector({
  currentMode,
}: SearchModeSelectorProps) {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-500 mr-2">Mode de recherche :</span>
      <div className="flex bg-gray-100 rounded-xl p-1">
        {modes.map((mode) => {
          const isActive = mode.id === currentMode;
          const Icon = mode.icon;

          return (
            <Link
              key={mode.id}
              href={mode.href}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              <Icon
                className={`w-4 h-4 ${
                  isActive
                    ? mode.color === 'purple'
                      ? 'text-purple-600'
                      : mode.color === 'indigo'
                        ? 'text-indigo-600'
                        : 'text-blue-600'
                    : ''
                }`}
              />
              <span>{mode.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
