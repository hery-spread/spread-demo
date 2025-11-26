'use client';

import { useState } from 'react';
import { BusinessDNA } from '@/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import BusinessDNACard from './BusinessDNACard';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline';

interface BusinessDNASidebarProps {
  businessDNAs: BusinessDNA[];
  selectedDNA: BusinessDNA | null;
  onSelectDNA: (dna: BusinessDNA | null) => void;
  onNewDNA: () => void;
  onDeleteDNA?: (dna: BusinessDNA) => void;
  isLoading?: boolean;
}

export default function BusinessDNASidebar({
  businessDNAs,
  selectedDNA,
  onSelectDNA,
  onNewDNA,
  onDeleteDNA,
  isLoading = false,
}: BusinessDNASidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Extraire toutes les catégories uniques
  const allCategories = [
    ...new Set(businessDNAs.flatMap((dna) => dna.categories)),
  ].sort();

  // Filtrer les Business DNAs
  const filteredDNAs = businessDNAs.filter((dna) => {
    const matchesSearch =
      searchQuery === '' ||
      dna.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dna.websiteUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dna.keywords.some((k) =>
        k.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === null || dna.categories.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-80 min-w-80 bg-white/80 backdrop-blur-xl border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Business DNA</h2>
            <p className="text-sm text-gray-500">
              {businessDNAs.length} profil{businessDNAs.length > 1 ? 's' : ''}{' '}
              enregistré{businessDNAs.length > 1 ? 's' : ''}
            </p>
          </div>
        </div>

        <Button
          onClick={onNewDNA}
          className="w-full flex items-center justify-center space-x-2"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Nouveau Business DNA</span>
        </Button>
      </div>

      {/* Filtres */}
      <div className="p-4 border-b border-gray-200 space-y-3">
        {/* Recherche */}
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 text-sm"
          />
        </div>

        {/* Filtre par catégorie */}
        {allCategories.length > 0 && (
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <FunnelIcon className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-500 font-medium">
                Filtrer par catégorie
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-2.5 py-1 text-xs font-medium rounded-full transition-colors ${
                  selectedCategory === null
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Tous
              </button>
              {allCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-full transition-colors ${
                    selectedCategory === category
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Liste des Business DNAs */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {isLoading ? (
          // Skeleton loading
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse bg-gray-100 rounded-xl h-32"
              />
            ))}
          </div>
        ) : filteredDNAs.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">🧬</div>
            <p className="text-gray-500 text-sm">
              {searchQuery || selectedCategory
                ? 'Aucun Business DNA trouvé'
                : 'Aucun Business DNA enregistré'}
            </p>
            <p className="text-gray-400 text-xs mt-1">
              {searchQuery || selectedCategory
                ? 'Essayez de modifier vos filtres'
                : 'Créez votre premier Business DNA'}
            </p>
          </div>
        ) : (
          filteredDNAs.map((dna) => (
            <BusinessDNACard
              key={dna.id}
              dna={dna}
              isSelected={selectedDNA?.id === dna.id}
              onSelect={onSelectDNA}
              onDelete={onDeleteDNA}
            />
          ))
        )}
      </div>
    </div>
  );
}
