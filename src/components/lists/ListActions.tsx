'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
  DocumentDuplicateIcon,
  ArrowsPointingInIcon,
  ArchiveBoxIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import { InfluencerList } from '@/types';

interface ListActionsProps {
  selectedLists: string[];
  allLists: InfluencerList[];
  onDuplicate: (listId: string) => void;
  onMerge: (listIds: string[]) => void;
  onArchive: (listIds: string[]) => void;
  onFavorite: (listIds: string[]) => void;
  onClearSelection: () => void;
}

export default function ListActions({
  selectedLists,
  allLists,
  onDuplicate,
  onMerge,
  onArchive,
  onFavorite,
  onClearSelection,
}: ListActionsProps) {
  const [showMergeModal, setShowMergeModal] = useState(false);

  if (selectedLists.length === 0) return null;

  const selectedListsData = allLists.filter((list) =>
    selectedLists.includes(list.id)
  );
  const canMerge = selectedLists.length >= 2;

  const handleMerge = () => {
    if (canMerge) {
      setShowMergeModal(true);
    }
  };

  const confirmMerge = (newListName: string) => {
    console.log('Merging lists with name:', newListName);
    onMerge(selectedLists);
    setShowMergeModal(false);
    onClearSelection();
  };

  const handleArchive = () => {
    if (
      confirm(`Archiver ${selectedLists.length} liste(s) sélectionnée(s) ?`)
    ) {
      onArchive(selectedLists);
      onClearSelection();
    }
  };

  const handleFavorite = () => {
    onFavorite(selectedLists);
    onClearSelection();
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">
              {selectedLists.length} liste{selectedLists.length > 1 ? 's' : ''}{' '}
              sélectionnée{selectedLists.length > 1 ? 's' : ''}
            </span>
            <button
              onClick={onClearSelection}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Désélectionner
            </button>
          </div>

          <div className="flex items-center space-x-2">
            {selectedLists.length === 1 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDuplicate(selectedLists[0])}
              >
                <DocumentDuplicateIcon className="w-4 h-4 mr-1" />
                Dupliquer
              </Button>
            )}

            {canMerge && (
              <Button variant="outline" size="sm" onClick={handleMerge}>
                <ArrowsPointingInIcon className="w-4 h-4 mr-1" />
                Fusionner
              </Button>
            )}

            <Button variant="outline" size="sm" onClick={handleFavorite}>
              <StarIcon className="w-4 h-4 mr-1" />
              Favoris
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleArchive}
              className="text-orange-600 hover:text-orange-700"
            >
              <ArchiveBoxIcon className="w-4 h-4 mr-1" />
              Archiver
            </Button>
          </div>
        </div>

        {/* Aperçu des listes sélectionnées */}
        <div className="mt-3 flex flex-wrap gap-2">
          {selectedListsData.slice(0, 3).map((list) => (
            <span
              key={list.id}
              className="inline-flex items-center px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full"
            >
              {list.name} ({list.influencers.length})
            </span>
          ))}
          {selectedListsData.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
              +{selectedListsData.length - 3} autres
            </span>
          )}
        </div>
      </div>

      {/* Modal de fusion */}
      {showMergeModal && (
        <MergeListsModal
          lists={selectedListsData}
          onConfirm={confirmMerge}
          onCancel={() => setShowMergeModal(false)}
        />
      )}
    </>
  );
}

interface MergeListsModalProps {
  lists: InfluencerList[];
  onConfirm: (newListName: string) => void;
  onCancel: () => void;
}

function MergeListsModal({ lists, onConfirm, onCancel }: MergeListsModalProps) {
  const [newListName, setNewListName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const totalContacts = lists.reduce(
    (sum, list) => sum + list.influencers.length,
    0
  );
  const uniqueContacts = new Set(
    lists.flatMap((list) => list.influencers.map((inf) => inf.id))
  ).size;
  const categories = Array.from(new Set(lists.map((list) => list.category)));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newListName.trim()) {
      onConfirm(newListName.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Fusionner les listes
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Aperçu de la fusion */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              Listes à fusionner :
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {lists.map((list) => (
                <li key={list.id} className="flex items-center justify-between">
                  <span>{list.name}</span>
                  <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                    {list.influencers.length} contacts
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-900">Total :</span>
                <span className="text-gray-600">
                  {uniqueContacts} contacts uniques (sur {totalContacts} total)
                </span>
              </div>
            </div>
          </div>

          {/* Nom de la nouvelle liste */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom de la nouvelle liste
            </label>
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder="Ex: Liste fusionnée"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          {/* Catégorie */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Catégorie
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={onCancel} type="button">
              Annuler
            </Button>
            <Button type="submit" disabled={!newListName.trim()}>
              Fusionner les listes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
