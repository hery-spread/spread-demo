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
  DocumentChartBarIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { InfluencerList } from '@/types';
import UnifiedEmailModal from '../communication/UnifiedEmailModal';
import { CommunicationProvider } from '@/contexts/CommunicationContext';
import { useCredits } from '@/hooks/useCredits';

interface UnlockedReportsListCardProps {
  list: InfluencerList;
  onEdit: (list: InfluencerList) => void;
  onDelete: (listId: string) => void;
  onExport: (listId: string) => void;
  onShare: (listId: string) => void;
}

export default function UnlockedReportsListCard({
  list,
  onEdit,
  onDelete,
  onExport,
  onShare,
}: UnlockedReportsListCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showBulkEmailModal, setShowBulkEmailModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { consumeCredits } = useCredits();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleUpdateReports = async () => {
    setIsUpdating(true);

    // Simuler la consommation d'un crédit
    const success = await consumeCredits(1);

    if (success) {
      // Simuler la mise à jour des rapports
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simuler l'ajout d'un nouveau rapport débloqué
      list.influencers.push({
        id: Date.now().toString(),
        contactName: 'Nouveau rapport',
        contactEmail: 'nouveau@exemple.com',
      });

      alert("Les rapports d'audience ont été mis à jour !");
    } else {
      alert('Crédits insuffisants pour mettre à jour les rapports.');
    }

    setIsUpdating(false);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200 p-6 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
      {/* Indicateur spécial */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-blue-500 to-transparent opacity-20 rounded-bl-3xl"></div>

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <DocumentChartBarIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
              Liste Système
            </div>
          </div>

          <Link
            href={`/lists/${list.id}`}
            className="text-lg font-semibold text-blue-900 hover:text-blue-700 transition-colors"
          >
            {list.name}
          </Link>

          {list.description && (
            <p className="text-sm text-blue-700 mt-2 line-clamp-2">
              {list.description}
            </p>
          )}
        </div>

        {/* Menu actions */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 text-blue-400 hover:text-blue-600 rounded-lg hover:bg-blue-100"
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
                disabled
              >
                <TrashIcon className="w-4 h-4" />
                <span>Non supprimable</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <UserGroupIcon className="w-4 h-4 text-blue-500" />
          <span className="text-sm text-blue-700 font-medium">
            {list.influencers.length} rapport
            {list.influencers.length > 1 ? 's débloqués' : ' débloqué'}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <CalendarIcon className="w-4 h-4 text-blue-500" />
          <span className="text-sm text-blue-700">
            Mis à jour {formatDate(list.createdAt)}
          </span>
        </div>
      </div>

      {/* Aperçu des influenceurs avec un style spécial */}
      {list.influencers.length > 0 && (
        <div className="mb-4">
          <div className="text-xs font-medium text-blue-600 mb-2">
            Rapports disponibles :
          </div>
          <div className="flex flex-wrap gap-1">
            {list.influencers.slice(0, 3).map((influencer) => (
              <span
                key={influencer.id}
                className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full border border-blue-200"
              >
                {influencer.contactName}
              </span>
            ))}
            {list.influencers.length > 3 && (
              <span className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full border border-blue-200">
                +{list.influencers.length - 3} autres rapports
              </span>
            )}
          </div>
        </div>
      )}

      {/* Actions spéciales */}
      <div className="flex items-center space-x-2">
        <Link href={`/lists/${list.id}`}>
          <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
            Voir les rapports
          </Button>
        </Link>

        <Button
          variant="outline"
          size="sm"
          onClick={handleUpdateReports}
          disabled={isUpdating}
          className="flex items-center text-green-600 border-green-200 hover:bg-green-50"
        >
          {isUpdating ? (
            <>
              <ArrowPathIcon className="w-4 h-4 mr-1 animate-spin" />
              Mise à jour...
            </>
          ) : (
            <>
              <ArrowPathIcon className="w-4 h-4 mr-1" />
              Mettre à jour
            </>
          )}
        </Button>

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

      {/* Badge "Consomme 1 crédit" */}
      <div className="mt-3 flex items-center justify-center">
        <div className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full border border-yellow-200">
          💳 Mise à jour consomme 1 crédit
        </div>
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
