'use client';

import {
  UserGroupIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import { InfluencerContact } from '@/types';

interface SelectionPreviewProps {
  contacts: InfluencerContact[];
  selectedContacts: string[];
  validContacts: InfluencerContact[];
  onOpenSelectionPanel?: () => void;
  showAdvancedSelection?: boolean;
  title?: string;
  className?: string;
}

export default function SelectionPreview({
  contacts,
  selectedContacts,
  validContacts,
  onOpenSelectionPanel,
  showAdvancedSelection = true,
  title = "Contacts sélectionnés",
  className = "",
}: SelectionPreviewProps) {
  const selectedValidContacts = validContacts.filter((inf) =>
    selectedContacts.includes(inf.id)
  );
  const actualRecipients = selectedValidContacts.length > 0 ? selectedValidContacts : validContacts;
  const recipientCount = actualRecipients.length;
  const totalValidContacts = validContacts.length;

  // Statistiques de la sélection
  const stats = {
    total: contacts.length,
    withEmail: validContacts.length,
    withoutEmail: contacts.length - validContacts.length,
    selected: recipientCount,
    selectionRate: totalValidContacts > 0 ? Math.round((recipientCount / totalValidContacts) * 100) : 0,
  };

  const getStatusColor = () => {
    if (recipientCount === 0) return 'bg-red-50 border-red-200';
    if (stats.selectionRate === 100) return 'bg-green-50 border-green-200';
    return 'bg-purple-50 border-purple-200';
  };

  const getStatusText = () => {
    if (recipientCount === 0) return 'Aucun contact sélectionné';
    if (stats.selectionRate === 100) return 'Tous les contacts sélectionnés';
    return `${stats.selectionRate}% des contacts sélectionnés`;
  };

  const getStatusIcon = () => {
    if (recipientCount === 0) {
      return <ExclamationTriangleIcon className="w-5 h-5 text-red-600" />;
    }
    return <UserGroupIcon className="w-5 h-5 text-purple-600" />;
  };

  return (
    <div className={`rounded-lg p-4 border ${getStatusColor()} ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            {getStatusIcon()}
            <span className="font-medium text-gray-900">{title}</span>
          </div>
          <div className="bg-white/50 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-medium">
            {recipientCount} sur {totalValidContacts}
          </div>
        </div>
        {showAdvancedSelection && onOpenSelectionPanel && (
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenSelectionPanel}
            className="text-purple-600 border-purple-300 hover:bg-purple-100"
          >
            <AdjustmentsHorizontalIcon className="w-4 h-4 mr-2" />
            Sélection avancée
          </Button>
        )}
      </div>

      {/* Statistiques détaillées */}
      <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-2 text-center">
          <div className="text-lg font-bold text-gray-900">{stats.total}</div>
          <div className="text-xs text-gray-600">Total</div>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-2 text-center">
          <div className="text-lg font-bold text-green-600">{stats.withEmail}</div>
          <div className="text-xs text-gray-600">Avec email</div>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-2 text-center">
          <div className="text-lg font-bold text-gray-400">{stats.withoutEmail}</div>
          <div className="text-xs text-gray-600">Sans email</div>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-2 text-center">
          <div className="text-lg font-bold text-purple-600">{recipientCount}</div>
          <div className="text-xs text-gray-600">Sélectionnés</div>
        </div>
      </div>

      {/* Aperçu des contacts sélectionnés */}
      {actualRecipients.length > 0 && (
        <div className="mt-3">
          <div className="text-xs font-medium text-gray-700 mb-2">
            {getStatusText()}
          </div>
          <div className="flex flex-wrap gap-2">
            {actualRecipients.slice(0, 6).map((contact) => (
              <span
                key={contact.id}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-purple-700 border border-purple-200 shadow-sm"
              >
                <CheckCircleIcon className="w-3 h-3 mr-1" />
                {contact.contactName || `Contact ${contact.id.slice(-4)}`}
              </span>
            ))}
            {actualRecipients.length > 6 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700 border border-purple-200">
                +{actualRecipients.length - 6} autres
              </span>
            )}
          </div>
        </div>
      )}

      {/* Alerte si aucun contact */}
      {recipientCount === 0 && (
        <div className="mt-3 p-2 bg-red-100 rounded-lg border border-red-200">
          <p className="text-sm text-red-700 flex items-center">
            <ExclamationTriangleIcon className="w-4 h-4 mr-2" />
            {totalValidContacts === 0
              ? "Aucun contact avec email disponible dans cette liste."
              : "Aucun contact sélectionné. Cliquez sur 'Sélection avancée' pour choisir vos destinataires."
            }
          </p>
        </div>
      )}

      {/* Recommandations intelligentes */}
      {recipientCount > 0 && stats.selectionRate < 50 && stats.withEmail > recipientCount && (
        <div className="mt-3 p-2 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-700 flex items-center">
            <AdjustmentsHorizontalIcon className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>
              Vous pourriez toucher {stats.withEmail - recipientCount} contact{stats.withEmail - recipientCount > 1 ? 's' : ''} supplémentaire{stats.withEmail - recipientCount > 1 ? 's' : ''}.
              {showAdvancedSelection && " Utilisez les filtres pour affiner votre sélection."}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
