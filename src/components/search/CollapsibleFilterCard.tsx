'use client';

import { ReactNode } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface CollapsibleFilterCardProps {
  id: string;
  title: string;
  description?: string;
  icon: ReactNode;
  isOpen: boolean;
  onToggle: (id: string) => void;
  hasActiveFilters?: boolean;
  filterCount?: number;
  children: ReactNode;
  className?: string;
}

export default function CollapsibleFilterCard({
  id,
  title,
  description,
  icon,
  isOpen,
  onToggle,
  hasActiveFilters = false,
  filterCount = 0,
  children,
  className = '',
}: CollapsibleFilterCardProps) {
  return (
    <div
      className={`bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 shadow-sm ${className}`}
    >
      {/* Header de la card */}
      <div
        className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50/50 transition-colors rounded-t-2xl"
        onClick={() => onToggle(id)}
      >
        <div className="flex items-center space-x-4">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
              hasActiveFilters
                ? 'bg-purple-100 text-purple-600'
                : 'bg-gray-100 text-gray-500'
            }`}
          >
            {icon}
          </div>

          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-gray-900">{title}</h3>
              {hasActiveFilters && filterCount > 0 && (
                <span className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                  {filterCount} filtre{filterCount > 1 ? 's' : ''}
                </span>
              )}
            </div>
            {description && (
              <p className="text-sm text-gray-600 mt-1">{description}</p>
            )}
          </div>
        </div>

        <div
          className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
            isOpen
              ? 'bg-purple-100 text-purple-600'
              : 'text-gray-400 hover:bg-gray-100'
          }`}
        >
          {isOpen ? (
            <ChevronUpIcon className="w-5 h-5" />
          ) : (
            <ChevronDownIcon className="w-5 h-5" />
          )}
        </div>
      </div>

      {/* Contenu de la card */}
      {isOpen && (
        <div className="px-6 pb-6 border-t border-gray-100/80">
          <div className="pt-4">{children}</div>
        </div>
      )}
    </div>
  );
}
