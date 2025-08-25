'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

import ListCard from '@/components/lists/ListCard';
import UnlockedReportsListCard from '@/components/lists/UnlockedReportsListCard';
import CreateListModal from '@/components/lists/CreateListModal';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  Squares2X2Icon,
  ListBulletIcon,
} from '@heroicons/react/24/outline';
import { InfluencerList } from '@/types';
import {
  getUserLists,
  createUserList,
  deleteUserList,
  exportListToCSV,
} from '@/lib/mockData';

export default function ListsPage() {
  const [lists, setLists] = useState<InfluencerList[]>([]);
  const [filteredLists, setFilteredLists] = useState<InfluencerList[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Charger les listes
  useEffect(() => {
    loadLists();
  }, []);

  // Filtrer les listes
  useEffect(() => {
    let filtered = lists;

    if (searchQuery) {
      filtered = filtered.filter(
        (list) =>
          list.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          list.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredLists(filtered);
  }, [lists, searchQuery]);

  const loadLists = async () => {
    try {
      const userLists = await getUserLists();
      setLists(userLists);
    } catch (error) {
      console.error('Erreur lors du chargement des listes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateList = async (listData: {
    name: string;
    description: string;
    category: string;
  }) => {
    try {
      const newList = await createUserList(listData);
      setLists((prev) => [newList, ...prev]);
    } catch (error) {
      console.error('Erreur lors de la création:', error);
      throw error;
    }
  };

  const handleEditList = (list: InfluencerList) => {
    // TODO: Implémenter la modification
    console.log('Modifier la liste:', list.name);
  };

  const handleDeleteList = async (listId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette liste ?')) {
      return;
    }

    try {
      await deleteUserList(listId);
      setLists((prev) => prev.filter((list) => list.id !== listId));
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  const handleExportList = async (listId: string) => {
    try {
      const csvContent = await exportListToCSV(listId);
      const list = lists.find((l) => l.id === listId);

      // Créer et télécharger le fichier CSV
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${list?.name || 'liste'}-contacts.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Erreur lors de l'export:", error);
    }
  };

  const handleShareList = (listId: string) => {
    // TODO: Implémenter le partage
    console.log('Partager la liste:', listId);
  };



  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mes listes</h1>
          <p className="text-gray-600">
            Gérez vos listes d&apos;influenceurs et organisez vos campagnes
          </p>
        </div>

        <Button onClick={() => setShowCreateModal(true)}>
          <PlusIcon className="w-4 h-4 mr-2" />
          Nouvelle liste
        </Button>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-purple-600">
            {lists.length}
          </div>
          <div className="text-sm text-gray-600">Listes créées</div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-blue-600">
            {lists.reduce((sum, list) => sum + list.influencers.length, 0)}
          </div>
          <div className="text-sm text-gray-600">Contacts total</div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-green-600">
            {lists.filter(list => list.influencers.some(inf => inf.contactEmail)).length}
          </div>
          <div className="text-sm text-gray-600">Listes contactables</div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-orange-600">
            {Math.round(
              lists.reduce((sum, list) => sum + list.influencers.length, 0) /
                (lists.length || 1)
            )}
          </div>
          <div className="text-sm text-gray-600">Contacts par liste</div>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          {/* Recherche */}
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Rechercher une liste..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>



          {/* Mode d'affichage */}
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Squares2X2Icon className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <ListBulletIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Listes */}
      {filteredLists.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {lists.length === 0 ? 'Aucune liste créée' : 'Aucune liste trouvée'}
          </h3>
          <p className="text-gray-600 mb-6">
            {lists.length === 0
              ? 'Créez votre première liste pour organiser vos influenceurs'
              : 'Essayez de modifier vos critères de recherche'}
          </p>
          {lists.length === 0 && (
            <Button onClick={() => setShowCreateModal(true)}>
              <PlusIcon className="w-4 h-4 mr-2" />
              Créer ma première liste
            </Button>
          )}
        </div>
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }
        >
          {filteredLists.map((list) => {
            // Utiliser le composant spécialisé pour la liste des rapports débloqués
            if (list.id === 'unlocked-reports') {
              return (
                <UnlockedReportsListCard
                  key={list.id}
                  list={list}
                  onEdit={handleEditList}
                  onDelete={handleDeleteList}
                  onExport={handleExportList}
                  onShare={handleShareList}
                />
              );
            }

            // Utiliser le composant standard pour les autres listes
            return (
              <ListCard
                key={list.id}
                list={list}
                onEdit={handleEditList}
                onDelete={handleDeleteList}
                onExport={handleExportList}
                onShare={handleShareList}
              />
            );
          })}
        </div>
      )}

      {/* Modal de création */}
      <CreateListModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateList}
      />
    </div>
  );
}
