'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
  XMarkIcon,
  DocumentArrowDownIcon,
  LockClosedIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { InfluencerList, InfluencerDetails } from '@/types';
import UnlockReportsModal from './UnlockReportsModal';
import { useCredits } from '@/hooks/useCredits';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  list: InfluencerList;
  onExport: (options: ExportOptions) => Promise<void>;
  influencersData?: InfluencerDetails[];
}

interface ExportOptions {
  format: 'csv' | 'xlsx' | 'json';
  fields: string[];
  includeHeaders: boolean;
  separator: string;
  encoding: string;
  filterEmptyEmails: boolean;
  includeAudienceData: boolean;
}

const availableFields = [
  { key: 'contactName', label: 'Nom du contact', required: true },
  { key: 'contactEmail', label: 'Email', required: false },
  { key: 'id', label: 'ID Influenceur', required: false },
  { key: 'platform', label: 'Plateforme', required: false },
  { key: 'followers', label: 'Nombre de followers', required: false },
  { key: 'engagementRate', label: "Taux d'engagement", required: false },
  { key: 'country', label: 'Pays', required: false },
  { key: 'category', label: 'Catégorie de la liste', required: false },
  { key: 'addedDate', label: "Date d'ajout", required: false },
  {
    key: 'audienceData',
    label: "Données d'audience",
    required: false,
    premium: true,
  },
];

export default function ExportModal({
  isOpen,
  onClose,
  list,
  onExport,
  influencersData = [],
}: ExportModalProps) {
  const [options, setOptions] = useState<ExportOptions>({
    format: 'csv',
    fields: ['contactName', 'contactEmail'],
    includeHeaders: true,
    separator: ',',
    encoding: 'UTF-8',
    filterEmptyEmails: false,
    includeAudienceData: false,
  });
  const [exporting, setExporting] = useState(false);
  const [showUnlockModal, setShowUnlockModal] = useState(false);

  const { credits, unlockReports } = useCredits();

  // Simuler quels influenceurs ont des rapports débloqués
  const getInfluencerData = (influencerId: string): InfluencerDetails => {
    const mockInfluencer = influencersData.find(
      (inf) => inf.id === influencerId
    ) || {
      id: influencerId,
      name: `Influenceur ${influencerId}`,
      username: `user_${influencerId}`,
      platform: 'instagram' as const,
      avatar: '/avatars/default.jpg',
      followers: 50000,
      engagement: 3500,
      engagementRate: 7,
      country: 'France',
      verified: false,
      audienceUnlocked: Math.random() > 0.6, // 40% des rapports sont débloqués
      stats: {
        avgLikes: 3500,
        avgComments: 200,
        avgViews: 15000,
        totalPosts: 500,
      },
      audience: {
        gender: { male: 30, female: 70 },
        age: { '13-17': 5, '18-24': 25, '25-34': 40, '35-44': 25, '45-64': 5 },
        countries: { France: 80, Autres: 20 },
        cities: { Paris: 40, Lyon: 20, Marseille: 15, Autres: 25 },
        languages: { Français: 85, Anglais: 15 },
        ethnicities: { Européen: 75, Autres: 25 },
        interests: {
          topics: { Mode: 70, Beauté: 60, Lifestyle: 80 },
          brands: { Zara: 40, Sephora: 35, 'H&M': 30 },
        },
      },
    };
    return mockInfluencer;
  };

  const influencersWithData = list.influencers.map((contact) =>
    getInfluencerData(contact.id)
  );
  const lockedInfluencers = influencersWithData.filter(
    (inf) => !inf.audienceUnlocked
  );

  if (!isOpen) return null;

  const handleFieldToggle = (fieldKey: string) => {
    const field = availableFields.find((f) => f.key === fieldKey);
    if (field?.required) return;

    if (fieldKey === 'audienceData') {
      setOptions((prev) => ({
        ...prev,
        includeAudienceData: !prev.includeAudienceData,
        fields: prev.includeAudienceData
          ? prev.fields.filter((f) => f !== fieldKey)
          : [...prev.fields, fieldKey],
      }));
    } else {
      setOptions((prev) => ({
        ...prev,
        fields: prev.fields.includes(fieldKey)
          ? prev.fields.filter((f) => f !== fieldKey)
          : [...prev.fields, fieldKey],
      }));
    }
  };

  const handleExport = async () => {
    // Vérifier si des rapports d'audience sont demandés mais non débloqués
    if (options.includeAudienceData && lockedInfluencers.length > 0) {
      setShowUnlockModal(true);
      return;
    }

    setExporting(true);
    try {
      await onExport(options);
      onClose();
    } catch (error) {
      console.error("Erreur lors de l'export:", error);
    } finally {
      setExporting(false);
    }
  };

  const handleUnlockReports = (influencerIds: string[]) => {
    const success = unlockReports(influencerIds);
    if (success) {
      // Marquer les influenceurs comme débloqués (dans un vrai projet, via API)
      influencersWithData.forEach((inf) => {
        if (influencerIds.includes(inf.id)) {
          inf.audienceUnlocked = true;
        }
      });

      setShowUnlockModal(false);

      // Procéder à l'export avec les données débloquées
      handleExport();
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Exporter la liste
              </h3>
              <p className="text-sm text-gray-600">
                {list.name} • {list.influencers.length} contact
                {list.influencers.length > 1 ? 's' : ''}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Format d'export */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Format d&apos;export
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'csv', label: 'CSV', desc: 'Compatible Excel' },
                  { value: 'xlsx', label: 'Excel', desc: 'Format natif' },
                  { value: 'json', label: 'JSON', desc: 'Pour développeurs' },
                ].map((format) => (
                  <button
                    key={format.value}
                    onClick={() =>
                      setOptions((prev) => ({
                        ...prev,
                        format: format.value as 'csv' | 'xlsx' | 'json',
                      }))
                    }
                    className={`p-3 text-left border rounded-lg transition-colors ${
                      options.format === format.value
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="font-medium">{format.label}</div>
                    <div className="text-xs text-gray-500">{format.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Champs à exporter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Champs à inclure
              </label>
              <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3">
                {availableFields.map((field) => (
                  <label
                    key={field.key}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      checked={options.fields.includes(field.key)}
                      onChange={() => handleFieldToggle(field.key)}
                      disabled={field.required}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span
                      className={`text-sm flex items-center space-x-1 ${field.required ? 'font-medium' : ''}`}
                    >
                      <span>{field.label}</span>
                      {field.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                      {field.premium && (
                        <LockClosedIcon className="w-3 h-3 text-purple-500" />
                      )}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Avertissement rapports verrouillés */}
            {options.includeAudienceData && lockedInfluencers.length > 0 && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <ExclamationTriangleIcon className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-amber-800">
                      Rapports d&apos;audience requis
                    </h4>
                    <p className="text-sm text-amber-700 mt-1">
                      {lockedInfluencers.length} influenceur(s) ont des rapports
                      d&apos;audience verrouillés. Ils seront automatiquement
                      débloqués lors de l&apos;export (
                      {lockedInfluencers.length * 2} crédits requis).
                    </p>
                    <div className="mt-2 text-xs text-amber-600">
                      Crédits disponibles : {credits.remainingCredits}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                {options.fields.length} champ(s) sélectionné(s)
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" onClick={onClose}>
                  Annuler
                </Button>
                <Button
                  onClick={handleExport}
                  disabled={exporting || options.fields.length === 0}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <DocumentArrowDownIcon className="w-4 h-4 mr-2" />
                  {exporting ? 'Export en cours...' : 'Exporter'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de déblocage */}
      <UnlockReportsModal
        isOpen={showUnlockModal}
        onClose={() => setShowUnlockModal(false)}
        lockedInfluencers={lockedInfluencers}
        onUnlock={handleUnlockReports}
        creditsAvailable={credits.remainingCredits}
      />
    </>
  );
}
