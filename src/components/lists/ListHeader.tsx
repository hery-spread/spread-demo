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
} from '@heroicons/react/24/outline';
import { InfluencerList } from '@/types';
import ExportModal from './ExportModal';
import EmailModal from './EmailModal';
import { exportListWithOptions, sendGroupEmail } from '@/lib/mockData';

interface ListHeaderProps {
  list: InfluencerList;
  onEdit: () => void;
  onDelete: () => void;
  onShare: () => void;
  onAddInfluencer: () => void;
}

export default function ListHeader({
  list,
  onEdit,
  onDelete,
  onShare,
  onAddInfluencer,
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

          {/* Statistiques */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {list.influencers.length}
              </div>
              <div className="text-sm text-purple-600 font-medium">
                Influenceur{list.influencers.length > 1 ? 's' : ''}
              </div>
            </div>

            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {list.influencers.filter((inf) => inf.contactEmail).length}
              </div>
              <div className="text-sm text-blue-600 font-medium">
                Contacts email
              </div>
            </div>

            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {list.influencers.length > 0 ? '100' : '0'}%
              </div>
              <div className="text-sm text-green-600 font-medium">
                Complétude
              </div>
            </div>

            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {new Date().toLocaleDateString('fr-FR') ===
                new Date(list.createdAt).toLocaleDateString('fr-FR')
                  ? "Aujourd'hui"
                  : 'Active'}
              </div>
              <div className="text-sm text-orange-600 font-medium">Statut</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col space-y-2 md:ml-6">
          <Button onClick={onAddInfluencer} className="flex items-center">
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

            <Button
              variant="outline"
              onClick={() => setShowEmailModal(true)}
              size="sm"
            >
              <EnvelopeIcon className="w-4 h-4 mr-1" />
              Email
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
                <div className="absolute right-0 top-10 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
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
      <EmailModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        list={list}
        onSend={async (emailData) => {
          const result = await sendGroupEmail(list.id, emailData);
          if (result.success) {
            console.log(`Email envoyé à ${result.sentCount} destinataires`);
          } else {
            console.error(`Erreur d'envoi: ${result.error}`);
          }
        }}
      />
    </div>
  );
}
