'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import {
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
  ShareIcon,
  DocumentArrowDownIcon,
  UserGroupIcon,
  CalendarIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import { InfluencerList } from '@/types';
import UnifiedEmailModal from '../communication/UnifiedEmailModal';
import { CommunicationProvider } from '@/contexts/CommunicationContext';

interface ListCardProps {
  list: InfluencerList;
  onEdit: (list: InfluencerList) => void;
  onDelete: (listId: string) => void;
  onExport: (listId: string) => void;
  onShare: (listId: string) => void;
}

export default function ListCard({
  list,
  onEdit,
  onDelete,
  onExport,
  onShare,
}: ListCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showBulkEmailModal, setShowBulkEmailModal] = useState(false);

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
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-2xl">{getCategoryIcon(list.category)}</span>
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(
                list.category
              )}`}
            >
              {list.category}
            </span>
          </div>

          <Link
            href={`/lists/${list.id}`}
            className="text-lg font-semibold text-gray-900 hover:text-purple-600 transition-colors"
          >
            {list.name}
          </Link>

          {list.description && (
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {list.description}
            </p>
          )}
        </div>

        {/* Menu actions */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <EllipsisVerticalIcon className="w-5 h-5" />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-10 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
              <button
                onClick={() => {
                  onEdit(list);
                  setShowMenu(false);
                }}
                className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <PencilIcon className="w-4 h-4" />
                <span>Modifier</span>
              </button>

              <button
                onClick={() => {
                  setShowBulkEmailModal(true);
                  setShowMenu(false);
                }}
                className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <EnvelopeIcon className="w-4 h-4" />
                <span>Contacter en masse</span>
              </button>

              <button
                onClick={() => {
                  onShare(list.id);
                  setShowMenu(false);
                }}
                className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <ShareIcon className="w-4 h-4" />
                <span>Partager</span>
              </button>

              <button
                onClick={() => {
                  onExport(list.id);
                  setShowMenu(false);
                }}
                className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <DocumentArrowDownIcon className="w-4 h-4" />
                <span>Exporter CSV</span>
              </button>

              <div className="border-t border-gray-100 my-1"></div>

              <button
                onClick={() => {
                  onDelete(list.id);
                  setShowMenu(false);
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

      {/* Statistiques */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <UserGroupIcon className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            {list.influencers.length} influenceur
            {list.influencers.length > 1 ? 's' : ''}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <CalendarIcon className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            {formatDate(list.createdAt)}
          </span>
        </div>
      </div>

      {/* Aperçu des influenceurs */}
      {list.influencers.length > 0 && (
        <div className="mb-4">
          <div className="text-xs font-medium text-gray-500 mb-2">Aperçu :</div>
          <div className="flex flex-wrap gap-1">
            {list.influencers.slice(0, 3).map((influencer) => (
              <span
                key={influencer.id}
                className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
              >
                {influencer.contactName}
              </span>
            ))}
            {list.influencers.length > 3 && (
              <span className="px-2 py-1 text-xs bg-gray-100 text-gray-500 rounded-full">
                +{list.influencers.length - 3} autres
              </span>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center space-x-2">
        <Link href={`/lists/${list.id}`}>
          <Button size="sm" className="flex-1">
            Voir la liste
          </Button>
        </Link>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onExport(list.id)}
          className="flex items-center"
        >
          <DocumentArrowDownIcon className="w-4 h-4 mr-1" />
          Export
        </Button>
      </div>

      {/* Fermer le menu au clic extérieur */}
      {showMenu && (
        <div className="fixed inset-0 z-0" onClick={() => setShowMenu(false)} />
      )}

      {/* Modale d'email en masse */}
      <CommunicationProvider>
        <UnifiedEmailModal
          isOpen={showBulkEmailModal}
          onClose={() => setShowBulkEmailModal(false)}
          mode="bulk"
          contacts={list.influencers.map((inf) => ({
            id: inf.id,
            name: inf.contactName || 'Nom non défini',
            email: inf.contactEmail || '',
            company: '',
          }))}
          onSent={(result) => {
            console.log(`Email envoyé à ${result.sent} contacts`);
          }}
        />
      </CommunicationProvider>
    </div>
  );
}
