'use client';

import { useState } from 'react';
import {
  CursorArrowRaysIcon,
  ShoppingCartIcon,
  BanknotesIcon,
  CheckIcon,
  XMarkIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';
import { CampaignTracker } from '@/types';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface CreatorResultsFormProps {
  creator: CampaignTracker['creators'][0];
  onSave: (
    creatorId: string,
    results: {
      clicks?: number;
      salesCount?: number;
      salesRevenue?: number;
    }
  ) => void;
  isEditable?: boolean;
}

export default function CreatorResultsForm({
  creator,
  onSave,
  isEditable = true,
}: CreatorResultsFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [clicks, setClicks] = useState<string>(
    creator.clicks?.toString() || ''
  );
  const [salesCount, setSalesCount] = useState<string>(
    creator.salesCount?.toString() || ''
  );
  const [salesRevenue, setSalesRevenue] = useState<string>(
    creator.salesRevenue?.toString() || ''
  );

  const handleSave = () => {
    onSave(creator.influencerId, {
      clicks: clicks ? parseInt(clicks, 10) : undefined,
      salesCount: salesCount ? parseInt(salesCount, 10) : undefined,
      salesRevenue: salesRevenue ? parseFloat(salesRevenue) : undefined,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setClicks(creator.clicks?.toString() || '');
    setSalesCount(creator.salesCount?.toString() || '');
    setSalesRevenue(creator.salesRevenue?.toString() || '');
    setIsEditing(false);
  };

  // Calcul du ROI si les données sont présentes
  const roi =
    creator.salesRevenue && creator.costPerCreator > 0
      ? ((creator.salesRevenue - creator.costPerCreator) /
          creator.costPerCreator) *
        100
      : null;

  const conversionRate =
    creator.clicks && creator.salesCount
      ? (creator.salesCount / creator.clicks) * 100
      : null;

  if (!isEditing) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white bg-gradient-to-br from-purple-500 to-indigo-600">
              {creator.influencerName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="font-semibold text-gray-900">
                @{creator.influencerUsername}
              </div>
              <div className="text-xs text-gray-500">
                {creator.influencerName}
              </div>
            </div>
          </div>
          {isEditable && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-1"
            >
              <PencilIcon className="w-4 h-4" />
              <span>Éditer</span>
            </Button>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center mb-1">
              <CursorArrowRaysIcon className="w-4 h-4 text-blue-500 mr-1" />
              <span className="text-lg font-bold text-gray-900">
                {creator.clicks ?? '-'}
              </span>
            </div>
            <p className="text-xs text-gray-500">Clics</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center mb-1">
              <ShoppingCartIcon className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-lg font-bold text-gray-900">
                {creator.salesCount ?? '-'}
              </span>
            </div>
            <p className="text-xs text-gray-500">Ventes</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center mb-1">
              <BanknotesIcon className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-lg font-bold text-green-600">
                {creator.salesRevenue
                  ? new Intl.NumberFormat('fr-FR', {
                      style: 'currency',
                      currency: 'EUR',
                    }).format(creator.salesRevenue)
                  : '-'}
              </span>
            </div>
            <p className="text-xs text-gray-500">Revenus</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center mb-1">
              <span
                className={`text-lg font-bold ${roi !== null && roi > 0 ? 'text-green-600' : roi !== null && roi < 0 ? 'text-red-600' : 'text-gray-900'}`}
              >
                {roi !== null ? `${roi.toFixed(0)}%` : '-'}
              </span>
            </div>
            <p className="text-xs text-gray-500">ROI</p>
          </div>
        </div>

        {conversionRate !== null && (
          <div className="mt-2 text-center">
            <span className="text-xs text-gray-500">
              Taux de conversion :{' '}
              <span className="font-semibold text-purple-600">
                {conversionRate.toFixed(1)}%
              </span>
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white border-2 border-purple-300 rounded-xl p-4 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white bg-gradient-to-br from-purple-500 to-indigo-600">
            {creator.influencerName.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-semibold text-gray-900">
              @{creator.influencerUsername}
            </div>
            <div className="text-xs text-gray-500">Édition des résultats</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleCancel}
            className="flex items-center space-x-1"
          >
            <XMarkIcon className="w-4 h-4" />
            <span>Annuler</span>
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            className="flex items-center space-x-1"
          >
            <CheckIcon className="w-4 h-4" />
            <span>Enregistrer</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <CursorArrowRaysIcon className="w-4 h-4 inline mr-1 text-blue-500" />
            Nombre de clics
          </label>
          <Input
            type="number"
            value={clicks}
            onChange={(e) => setClicks(e.target.value)}
            placeholder="Ex: 150"
            min="0"
          />
          <p className="text-xs text-gray-400 mt-1">Optionnel</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <ShoppingCartIcon className="w-4 h-4 inline mr-1 text-green-500" />
            Nombre de ventes
          </label>
          <Input
            type="number"
            value={salesCount}
            onChange={(e) => setSalesCount(e.target.value)}
            placeholder="Ex: 5"
            min="0"
          />
          <p className="text-xs text-gray-400 mt-1">Optionnel</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <BanknotesIcon className="w-4 h-4 inline mr-1 text-green-500" />
            Revenus (€)
          </label>
          <Input
            type="number"
            value={salesRevenue}
            onChange={(e) => setSalesRevenue(e.target.value)}
            placeholder="Ex: 500"
            min="0"
            step="0.01"
          />
          <p className="text-xs text-gray-400 mt-1">Optionnel</p>
        </div>
      </div>

      <div className="mt-4 p-3 bg-purple-50 rounded-lg">
        <p className="text-sm text-purple-700">
          💡 <strong>Conseil :</strong> Ces données permettent de calculer
          automatiquement le ROI et le taux de conversion.
          {creator.costPerCreator > 0 && (
            <span className="block mt-1">
              Coût créateur :{' '}
              {new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'EUR',
              }).format(creator.costPerCreator)}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
