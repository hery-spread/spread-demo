'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
  XMarkIcon,
  LockClosedIcon,
  CreditCardIcon,
  UserGroupIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { Influencer } from '@/types';

interface UnlockReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lockedInfluencers: Influencer[];
  onUnlock: (influencerIds: string[]) => void;
  creditsAvailable: number;
}

export default function UnlockReportsModal({
  isOpen,
  onClose,
  lockedInfluencers,
  onUnlock,
  creditsAvailable,
}: UnlockReportsModalProps) {
  const [selectedInfluencers, setSelectedInfluencers] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const creditsPerReport = 1;
  const totalCreditsNeeded = selectedInfluencers.length * creditsPerReport;
  const canUnlock = totalCreditsNeeded <= creditsAvailable;

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedInfluencers([]);
    } else {
      setSelectedInfluencers(lockedInfluencers.map((inf) => inf.id));
    }
    setSelectAll(!selectAll);
  };

  const handleInfluencerToggle = (influencerId: string) => {
    setSelectedInfluencers((prev) =>
      prev.includes(influencerId)
        ? prev.filter((id) => id !== influencerId)
        : [...prev, influencerId]
    );
  };

  const handleUnlock = () => {
    onUnlock(selectedInfluencers);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <LockClosedIcon className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Débloquer les rapports d&apos;audience
              </h2>
              <p className="text-sm text-gray-600">
                Certains influenceurs n&apos;ont pas encore de rapport
                d&apos;audience débloqué
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <UserGroupIcon className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                Rapports verrouillés
              </span>
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {lockedInfluencers.length}
            </span>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <CreditCardIcon className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">
                Crédits disponibles
              </span>
            </div>
            <span className="text-2xl font-bold text-green-900">
              {creditsAvailable}
            </span>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <CheckCircleIcon className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">
                Coût total
              </span>
            </div>
            <span className="text-2xl font-bold text-purple-900">
              {totalCreditsNeeded}
            </span>
          </div>
        </div>

        {/* Liste des influenceurs */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Sélectionner les rapports à débloquer
            </h3>
            <button
              onClick={handleSelectAll}
              className="text-sm text-purple-600 hover:text-purple-700"
            >
              {selectAll ? 'Désélectionner tout' : 'Sélectionner tout'}
            </button>
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto">
            {lockedInfluencers.map((influencer) => (
              <div
                key={influencer.id}
                className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={selectedInfluencers.includes(influencer.id)}
                  onChange={() => handleInfluencerToggle(influencer.id)}
                  className="h-4 w-4 text-purple-600 rounded border-gray-300"
                />
                <img
                  src={influencer.avatar}
                  alt={influencer.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">
                      {influencer.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      @{influencer.username}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {influencer.followers.toLocaleString()} followers
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {creditsPerReport} crédits
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {selectedInfluencers.length > 0 && (
              <span>
                {selectedInfluencers.length} rapport(s) sélectionné(s) •{' '}
                {totalCreditsNeeded} crédits
              </span>
            )}
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button
              onClick={handleUnlock}
              disabled={selectedInfluencers.length === 0 || !canUnlock}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Débloquer ({totalCreditsNeeded} crédits)
            </Button>
          </div>
        </div>

        {!canUnlock && selectedInfluencers.length > 0 && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">
              Crédits insuffisants. Vous avez besoin de{' '}
              {totalCreditsNeeded - creditsAvailable} crédits supplémentaires.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
