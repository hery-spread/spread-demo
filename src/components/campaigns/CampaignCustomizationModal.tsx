'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import {
  XMarkIcon,
  Cog6ToothIcon,
  SwatchIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline';

interface CampaignCustomizationSettings {
  primaryColor: string;
  secondaryColor: string;
  agencyName: string;
}

interface CampaignCustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (settings: CampaignCustomizationSettings) => void;
  initialSettings?: CampaignCustomizationSettings;
}

const DEFAULT_SETTINGS: CampaignCustomizationSettings = {
  primaryColor: '#667eea',
  secondaryColor: '#764ba2',
  agencyName: 'Votre Agence',
};

export default function CampaignCustomizationModal({
  isOpen,
  onClose,
  onApply,
  initialSettings,
}: CampaignCustomizationModalProps) {
  const [settings, setSettings] = useState<CampaignCustomizationSettings>(
    initialSettings || DEFAULT_SETTINGS
  );

  useEffect(() => {
    if (initialSettings) {
      setSettings(initialSettings);
    }
  }, [initialSettings]);

  if (!isOpen) return null;

  const handleApply = () => {
    onApply(settings);
    onClose();
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  const updateColor = (type: 'primary' | 'secondary', value: string) => {
    setSettings((prev) => ({
      ...prev,
      [type === 'primary' ? 'primaryColor' : 'secondaryColor']: value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl animate-slideInUp">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center">
              <Cog6ToothIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                🎨 Personnalisation du rapport
              </h2>
              <p className="text-sm text-gray-500">
                Personnalisez les couleurs et le branding
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Couleur Principale */}
          <div className="space-y-3">
            <label className="flex items-center space-x-2 text-sm font-semibold text-gray-900">
              <SwatchIcon className="w-4 h-4" />
              <span>Couleur Principale</span>
            </label>
            <p className="text-xs text-gray-500">
              Utilisée pour les en-têtes, badges et boutons
            </p>
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={settings.primaryColor}
                onChange={(e) => updateColor('primary', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm"
                placeholder="#667eea"
              />
              <input
                type="color"
                value={settings.primaryColor}
                onChange={(e) => updateColor('primary', e.target.value)}
                className="w-14 h-10 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-purple-500 transition-colors"
              />
            </div>
          </div>

          {/* Couleur Secondaire */}
          <div className="space-y-3">
            <label className="flex items-center space-x-2 text-sm font-semibold text-gray-900">
              <SwatchIcon className="w-4 h-4" />
              <span>Couleur Secondaire</span>
            </label>
            <p className="text-xs text-gray-500">
              Utilisée pour les dégradés avec la couleur principale
            </p>
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={settings.secondaryColor}
                onChange={(e) => updateColor('secondary', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm"
                placeholder="#764ba2"
              />
              <input
                type="color"
                value={settings.secondaryColor}
                onChange={(e) => updateColor('secondary', e.target.value)}
                className="w-14 h-10 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-purple-500 transition-colors"
              />
            </div>
          </div>

          {/* Nom de l'Agence */}
          <div className="space-y-3">
            <label className="flex items-center space-x-2 text-sm font-semibold text-gray-900">
              <BuildingOfficeIcon className="w-4 h-4" />
              <span>Nom de l&apos;Agence</span>
            </label>
            <p className="text-xs text-gray-500">
              Le nom qui apparaît dans l&apos;en-tête du rapport
            </p>
            <input
              type="text"
              value={settings.agencyName}
              onChange={(e) =>
                setSettings((prev) => ({ ...prev, agencyName: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Votre Agence"
            />
          </div>

          {/* Aperçu */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            <p className="text-sm font-medium text-gray-700">Aperçu</p>
            <div
              className="h-24 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${settings.primaryColor} 0%, ${settings.secondaryColor} 100%)`,
              }}
            >
              {settings.agencyName}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3 mt-6 pt-6 border-t border-gray-200">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            className="flex-1"
          >
            Réinitialiser
          </Button>
          <Button onClick={handleApply} className="flex-1">
            Appliquer
          </Button>
        </div>
      </div>
    </div>
  );
}

