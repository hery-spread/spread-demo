'use client';

import { BusinessDNA } from '@/types';
import {
  GlobeAltIcon,
  MagnifyingGlassIcon,
  TrashIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

interface BusinessDNACardProps {
  dna: BusinessDNA;
  isSelected: boolean;
  onSelect: (dna: BusinessDNA) => void;
  onDelete?: (dna: BusinessDNA) => void;
}

export default function BusinessDNACard({
  dna,
  isSelected,
  onSelect,
  onDelete,
}: BusinessDNACardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div
      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
        isSelected
          ? 'border-purple-500 bg-purple-50/50'
          : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-md'
      }`}
      onClick={() => onSelect(dna)}
    >
      {/* Header avec logo et nom */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          {dna.logoUrl ? (
            <img
              src={dna.logoUrl}
              alt={dna.name}
              className="w-10 h-10 rounded-lg object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
              <GlobeAltIcon className="w-5 h-5 text-white" />
            </div>
          )}
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">{dna.name}</h3>
            <p className="text-xs text-gray-500 truncate max-w-[150px]">
              {dna.websiteUrl.replace(/https?:\/\//, '').split('/')[0]}
            </p>
          </div>
        </div>

        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(dna);
            }}
            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Catégories */}
      <div className="flex flex-wrap gap-1 mb-3">
        {dna.categories.slice(0, 3).map((category) => (
          <span
            key={category}
            className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-full"
          >
            {category}
          </span>
        ))}
      </div>

      {/* Mots-clés (aperçu) */}
      <div className="flex flex-wrap gap-1 mb-3">
        {dna.keywords.slice(0, 4).map((keyword) => (
          <span
            key={keyword}
            className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
          >
            {keyword}
          </span>
        ))}
        {dna.keywords.length > 4 && (
          <span className="px-1.5 py-0.5 text-gray-400 text-xs">
            +{dna.keywords.length - 4}
          </span>
        )}
      </div>

      {/* Footer avec stats */}
      <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
        <div className="flex items-center space-x-1">
          <MagnifyingGlassIcon className="w-3.5 h-3.5" />
          <span>{dna.searchCount} recherches</span>
        </div>
        <div className="flex items-center space-x-1">
          <ClockIcon className="w-3.5 h-3.5" />
          <span>{formatDate(dna.analyzedAt)}</span>
        </div>
      </div>
    </div>
  );
}
