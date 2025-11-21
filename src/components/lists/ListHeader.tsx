'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
  PencilIcon,
  ShareIcon,
  DocumentArrowDownIcon,
  TrashIcon,
  UserPlusIcon,
  CalendarIcon,
  TagIcon,
  EnvelopeIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import { InfluencerList } from '@/types';
import ExportModal from './ExportModal';
import UnifiedEmailModal from '../communication/UnifiedEmailModal';
import { CommunicationProvider } from '@/contexts/CommunicationContext';
import { exportListWithOptions } from '@/lib/mockData';

interface ListHeaderProps {
  list: InfluencerList;
  onEdit: () => void;
  onDelete: () => void;
  onShare: () => void;
  onAddInfluencer: () => void;
  onViewShareResults?: () => void;
}

export default function ListHeader({
  list,
  onEdit,
  onDelete,
  onShare,
  onAddInfluencer,
  onViewShareResults,
}: ListHeaderProps) {
  const [showActions, setShowActions] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Mode & Beauté':
        return 'bg-pink-100 text-pink-800';
      case 'Gaming':
        return 'bg-purple-100 text-purple-800';
      case 'Cuisine':
        return 'bg-orange-100 text-orange-800';
      case 'Automobile':
        return 'bg-blue-100 text-blue-800';
      case 'Lifestyle':
        return 'bg-green-100 text-green-800';
      case 'Marketing':
        return 'bg-indigo-100 text-indigo-800';
      case 'Voyage':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Mode & Beauté':
        return '👗';
      case 'Gaming':
        return '🎮';
      case 'Cuisine':
        return '🍳';
      case 'Automobile':
        return '🚗';
      case 'Lifestyle':
        return '✨';
      case 'Marketing':
        return '📈';
      case 'Voyage':
        return '✈️';
      default:
        return '📋';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between space-y-4 md:space-y-0">
        {/* Informations principales */}
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <span className="text-3xl">{getCategoryIcon(list.category)}</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{list.name}</h1>
              <div className="flex items-center space-x-4 mt-1">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(
                    list.category
                  )}`}
                >
                  <TagIcon className="w-3 h-3 inline mr-1" />
                  {list.category}
                </span>
                <span className="text-sm text-gray-500 flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-1" />
                  Créée le {formatDate(list.createdAt)}
                </span>
              </div>
            </div>
          </div>

          {list.description && (
            <p className="text-gray-600 mb-4 max-w-2xl">{list.description}</p>
          )}

          {/* Statistiques simplifiées */}
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-lg text-gray-900">
                {list.influencers.length}
              </span>
              <span>influenceur{list.influencers.length > 1 ? 's' : ''}</span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="font-semibold text-sm text-green-600">
                {list.influencers.filter((inf) => inf.contactEmail).length}
              </span>
              <span className="text-xs">contacts email</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col space-y-2 md:ml-6">
          {list.influencers.filter((inf) => inf.contactEmail).length > 0 && (
            <Button
              onClick={() => setShowEmailModal(true)}
              className="flex items-center"
            >
              <EnvelopeIcon className="w-4 h-4 mr-2" />
              Contacter en masse (
              {list.influencers.filter((inf) => inf.contactEmail).length})
            </Button>
          )}

          <Button
            onClick={onAddInfluencer}
            variant="outline"
            className="flex items-center"
          >
            <UserPlusIcon className="w-4 h-4 mr-2" />
            Ajouter un influenceur
          </Button>

          <div className="flex space-x-2">
            <Button variant="outline" onClick={onEdit} size="sm">
              <PencilIcon className="w-4 h-4 mr-1" />
              Modifier
            </Button>

            <Button
              variant="outline"
              onClick={() => setShowExportModal(true)}
              size="sm"
            >
              <DocumentArrowDownIcon className="w-4 h-4 mr-1" />
              Export
            </Button>

            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setShowActions(!showActions)}
                size="sm"
              >
                •••
              </Button>

              {showActions && (
                <div className="absolute right-0 top-10 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                  <button
                    onClick={() => {
                      onShare();
                      setShowActions(false);
                    }}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <ShareIcon className="w-4 h-4" />
                    <span>Partager</span>
                  </button>

                  {onViewShareResults && (
                    <button
                      onClick={() => {
                        onViewShareResults();
                        setShowActions(false);
                      }}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-purple-700 hover:bg-purple-50"
                    >
                      <ChartBarIcon className="w-4 h-4" />
                      <span>Résultats des votes</span>
                    </button>
                  )}

                  <div className="border-t border-gray-100 my-1"></div>

                  <button
                    onClick={() => {
                      onDelete();
                      setShowActions(false);
                    }}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <TrashIcon className="w-4 h-4" />
                    <span>Supprimer</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fermer le menu au clic extérieur */}
      {showActions && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowActions(false)}
        />
      )}

      {/* Export Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        list={list}
        onExport={async (options) => {
          const result = await exportListWithOptions(list.id, options);
          if (result.success) {
            console.log(`Export réussi: ${result.filename}`);
            // Dans une vraie app, on déclencherait le téléchargement ici
          } else {
            console.error(`Erreur d'export: ${result.error}`);
          }
        }}
      />

      {/* Email Modal */}
      <CommunicationProvider>
        <UnifiedEmailModal
          isOpen={showEmailModal}
          onClose={() => setShowEmailModal(false)}
          mode="bulk"
          contacts={list.influencers.map((inf) => ({
            id: inf.id,
            name: inf.contactName || 'Nom non défini',
            email: inf.contactEmail || '',
            company: '',
          }))}
          onSent={(result) => {
            console.log(`Email envoyé à ${result.sent} destinataires`);
          }}
        />
      </CommunicationProvider>
    </div>
  );
}
