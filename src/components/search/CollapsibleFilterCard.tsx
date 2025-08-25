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
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50/50 transition-colors rounded-t-2xl"
        onClick={() => onToggle(id)}
      >
        <div className="flex items-center space-x-3">
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
              hasActiveFilters
                ? 'bg-purple-100 text-purple-600'
                : 'bg-gray-100 text-gray-500'
            }`}
          >
            {icon}
          </div>

          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
              {hasActiveFilters && filterCount > 0 && (
                <span className="inline-flex items-center px-1.5 py-0.5 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                  {filterCount}
                </span>
              )}
            </div>
            {description && (
              <p className="text-xs text-gray-600 mt-0.5">{description}</p>
            )}
          </div>
        </div>

        <div
          className={`w-7 h-7 flex items-center justify-center rounded-lg transition-colors ${
            isOpen
              ? 'bg-purple-100 text-purple-600'
              : 'text-gray-400 hover:bg-gray-100'
          }`}
        >
          {isOpen ? (
            <ChevronUpIcon className="w-4 h-4" />
          ) : (
            <ChevronDownIcon className="w-4 h-4" />
          )}
        </div>
      </div>

      {/* Contenu de la card */}
      {isOpen && (
        <div className="px-4 pb-4 border-t border-gray-100/80">
          <div className="pt-3">{children}</div>
        </div>
      )}
    </div>
  );
}
