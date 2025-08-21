'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  SparklesIcon,
  TrophyIcon,
  FireIcon,
  UsersIcon,
  XMarkIcon,
  CheckIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline';
import { InfluencerContact } from '@/types';

interface ContactSelectionPanelProps {
  contacts: InfluencerContact[];
  selectedContacts: string[];
  onSelectionChange: (selectedIds: string[]) => void;
  isOpen: boolean;
  onClose: () => void;
}

interface FilterCriteria {
  minFollowers?: number;
  maxFollowers?: number;
  minEngagementRate?: number;
  maxEngagementRate?: number;
  platforms?: string[];
  hasEmail?: boolean;
}

export default function ContactSelectionPanel({
  contacts,
  selectedContacts,
  onSelectionChange,
  isOpen,
  onClose,
}: ContactSelectionPanelProps) {
  const [filters, setFilters] = useState<FilterCriteria>({
    hasEmail: true, // Par défaut, on ne filtre que ceux avec email
  });
  const [quickSelection, setQuickSelection] = useState<string>('');

  // Filtrer les contacts selon les critères
  const filteredContacts = useMemo(() => {
    let result = contacts.filter((contact) => contact.contactEmail); // Toujours filtrer ceux avec email

    if (filters.minFollowers) {
      result = result.filter(
        (c) => (c.followers || 0) >= filters.minFollowers!
      );
    }
    if (filters.maxFollowers) {
      result = result.filter(
        (c) => (c.followers || 0) <= filters.maxFollowers!
      );
    }
    if (filters.minEngagementRate) {
      result = result.filter(
        (c) => (c.engagementRate || 0) >= filters.minEngagementRate!
      );
    }
    if (filters.maxEngagementRate) {
      result = result.filter(
        (c) => (c.engagementRate || 0) <= filters.maxEngagementRate!
      );
    }
    if (filters.platforms && filters.platforms.length > 0) {
      result = result.filter((c) =>
        filters.platforms!.some((platform) =>
          c.platform?.toLowerCase().includes(platform.toLowerCase())
        )
      );
    }

    return result;
  }, [contacts, filters]);

  // Gestion de la sélection rapide
  const handleQuickSelection = (type: string) => {
    let newSelection: string[] = [];
    const contactsWithEmail = filteredContacts;

    switch (type) {
      case 'all':
        newSelection = contactsWithEmail.map((c) => c.id);
        break;
      case 'top10':
        newSelection = contactsWithEmail
          .sort((a, b) => (b.followers || 0) - (a.followers || 0))
          .slice(0, 10)
          .map((c) => c.id);
        break;
      case 'top-engagement':
        newSelection = contactsWithEmail
          .sort((a, b) => (b.engagementRate || 0) - (a.engagementRate || 0))
          .slice(0, 10)
          .map((c) => c.id);
        break;
      case 'micro':
        newSelection = contactsWithEmail
          .filter(
            (c) => (c.followers || 0) >= 1000 && (c.followers || 0) <= 100000
          )
          .map((c) => c.id);
        break;
      case 'macro':
        newSelection = contactsWithEmail
          .filter((c) => (c.followers || 0) > 100000)
          .map((c) => c.id);
        break;
      case 'none':
        newSelection = [];
        break;
    }

    setQuickSelection(type);
    onSelectionChange(newSelection);
  };

  // Mise à jour d'un filtre
  const updateFilter = (
    key: keyof FilterCriteria,
    value: number | string[] | boolean | undefined
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Reset des filtres
  const resetFilters = () => {
    setFilters({ hasEmail: true });
    setQuickSelection('');
  };

  const handleApplySelection = () => {
    const currentlySelected = selectedContacts.filter((id) =>
      filteredContacts.some((c) => c.id === id)
    );
    onSelectionChange(currentlySelected);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      {/* Panel */}
      <div className="relative ml-auto w-96 bg-white shadow-2xl h-full overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AdjustmentsHorizontalIcon className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Sélection Avancée
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <XMarkIcon className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div className="mt-2 text-sm text-gray-600">
            {filteredContacts.length} contacts correspondant aux critères
          </div>
        </div>

        {/* Contenu */}
        <div className="p-4 space-y-6">
          {/* Sélections rapides */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
              <SparklesIcon className="w-4 h-4 mr-2 text-purple-600" />
              Sélections rapides
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickSelection('all')}
                className={
                  quickSelection === 'all' ? 'ring-2 ring-purple-500' : ''
                }
              >
                <CheckIcon className="w-4 h-4 mr-1" />
                Tout
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickSelection('none')}
                className={
                  quickSelection === 'none' ? 'ring-2 ring-purple-500' : ''
                }
              >
                <XMarkIcon className="w-4 h-4 mr-1" />
                Aucun
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickSelection('top10')}
                className={
                  quickSelection === 'top10' ? 'ring-2 ring-purple-500' : ''
                }
              >
                <TrophyIcon className="w-4 h-4 mr-1" />
                Top 10
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickSelection('top-engagement')}
                className={
                  quickSelection === 'top-engagement'
                    ? 'ring-2 ring-purple-500'
                    : ''
                }
              >
                <FireIcon className="w-4 h-4 mr-1" />+ Engagé
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickSelection('micro')}
                className={
                  quickSelection === 'micro' ? 'ring-2 ring-purple-500' : ''
                }
              >
                <UsersIcon className="w-4 h-4 mr-1" />
                Micro
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickSelection('macro')}
                className={
                  quickSelection === 'macro' ? 'ring-2 ring-purple-500' : ''
                }
              >
                <UsersIcon className="w-4 h-4 mr-1" />
                Macro
              </Button>
            </div>
          </div>

          {/* Filtres par nombre de followers */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
              <UsersIcon className="w-4 h-4 mr-2 text-purple-600" />
              Nombre de followers
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="Min."
                value={filters.minFollowers || ''}
                onChange={(e) =>
                  updateFilter(
                    'minFollowers',
                    e.target.value ? parseInt(e.target.value) : undefined
                  )
                }
              />
              <Input
                type="number"
                placeholder="Max."
                value={filters.maxFollowers || ''}
                onChange={(e) =>
                  updateFilter(
                    'maxFollowers',
                    e.target.value ? parseInt(e.target.value) : undefined
                  )
                }
              />
            </div>
          </div>

          {/* Filtres par taux d'engagement */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
              <FireIcon className="w-4 h-4 mr-2 text-purple-600" />
              Taux d&apos;engagement (%)
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="Min."
                step="0.1"
                value={filters.minEngagementRate || ''}
                onChange={(e) =>
                  updateFilter(
                    'minEngagementRate',
                    e.target.value ? parseFloat(e.target.value) : undefined
                  )
                }
              />
              <Input
                type="number"
                placeholder="Max."
                step="0.1"
                value={filters.maxEngagementRate || ''}
                onChange={(e) =>
                  updateFilter(
                    'maxEngagementRate',
                    e.target.value ? parseFloat(e.target.value) : undefined
                  )
                }
              />
            </div>
          </div>

          {/* Plateforme */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              Plateformes
            </h4>
            <div className="space-y-2">
              {['Instagram', 'YouTube', 'TikTok', 'Twitter'].map((platform) => (
                <label key={platform} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.platforms?.includes(platform) || false}
                    onChange={(e) => {
                      const currentPlatforms = filters.platforms || [];
                      if (e.target.checked) {
                        updateFilter('platforms', [
                          ...currentPlatforms,
                          platform,
                        ]);
                      } else {
                        updateFilter(
                          'platforms',
                          currentPlatforms.filter((p) => p !== platform)
                        );
                      }
                    }}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{platform}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Résumé de la sélection actuelle */}
          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              Sélection actuelle
            </h4>
            <div className="bg-purple-50 rounded-lg p-3">
              <div className="text-sm text-purple-800">
                <div className="font-medium">
                  {selectedContacts.length} contact
                  {selectedContacts.length > 1 ? 's' : ''} sélectionné
                  {selectedContacts.length > 1 ? 's' : ''}
                </div>
                <div className="text-purple-600 mt-1">
                  sur {filteredContacts.length} contact
                  {filteredContacts.length > 1 ? 's' : ''} disponible
                  {filteredContacts.length > 1 ? 's' : ''}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
          <div className="flex space-x-2">
            <Button variant="outline" onClick={resetFilters} className="flex-1">
              Reset
            </Button>
            <Button
              onClick={handleApplySelection}
              className="flex-1"
            >
              Appliquer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
