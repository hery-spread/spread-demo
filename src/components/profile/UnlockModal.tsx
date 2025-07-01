'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
  XMarkIcon,
  LockClosedIcon,
  CreditCardIcon,
} from '@heroicons/react/24/outline';
import { Influencer } from '@/types';
import Image from 'next/image';

interface UnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  influencer: Influencer;
  onUnlock: () => Promise<void>;
  currentCredits: number;
}

export default function UnlockModal({
  isOpen,
  onClose,
  influencer,
  onUnlock,
  currentCredits,
}: UnlockModalProps) {
  const [unlocking, setUnlocking] = useState(false);
  const creditCost = 1;

  if (!isOpen) return null;

  const handleUnlock = async () => {
    if (currentCredits < creditCost) {
      return;
    }

    setUnlocking(true);
    try {
      await onUnlock();
      onClose();
    } catch (error) {
      console.error('Erreur lors du déverrouillage:', error);
    } finally {
      setUnlocking(false);
    }
  };

  const canUnlock = currentCredits >= creditCost;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Débloquer le rapport détaillé
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Contenu */}
        <div className="space-y-4">
          {/* Influenceur */}
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Image
              src={influencer.avatar}
              alt={influencer.name}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    influencer.name
                  )}&background=6366f1&color=fff`;
              }}
            />
            <div>
              <div className="font-medium text-gray-900">{influencer.name}</div>
              <div className="text-sm text-gray-500">
                @{influencer.username}
              </div>
            </div>
          </div>

          {/* Coût */}
          <div className="flex items-center justify-between p-4 border border-purple-200 rounded-lg bg-purple-50">
            <div className="flex items-center space-x-2">
              <LockClosedIcon className="w-5 h-5 text-purple-600" />
              <span className="font-medium text-purple-900">
                Rapport détaillé
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <CreditCardIcon className="w-4 h-4 text-purple-600" />
              <span className="font-semibold text-purple-900">
                {creditCost} crédit
              </span>
            </div>
          </div>

          {/* Ce qui sera débloqué */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">
              Ce qui sera débloqué :
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span>Analyse démographique détaillée (âge, genre)</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span>Géolocalisation de l&apos;audience (pays, villes)</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span>Centres d&apos;intérêt et marques favorites</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span>Statistiques de performance avancées</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span>Langues et ethnicités de l&apos;audience</span>
              </li>
            </ul>
          </div>

          {/* Crédits disponibles */}
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <span className="text-sm font-medium text-blue-900">
              Crédits disponibles
            </span>
            <span className="font-semibold text-blue-900">
              {currentCredits}
            </span>
          </div>

          {/* Avertissement si pas assez de crédits */}
          {!canUnlock && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <span className="text-red-500">⚠️</span>
                <span className="text-sm font-medium text-red-800">
                  Crédits insuffisants
                </span>
              </div>
              <p className="text-sm text-red-700 mt-1">
                Vous avez besoin de {creditCost} crédit pour débloquer ce
                rapport.
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3 mt-6">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Annuler
          </Button>
          <Button
            onClick={handleUnlock}
            disabled={!canUnlock || unlocking}
            className="flex-1"
          >
            {unlocking
              ? 'Déverrouillage...'
              : `Débloquer (${creditCost} crédit)`}
          </Button>
        </div>

        {/* Lien vers les crédits */}
        {!canUnlock && (
          <div className="mt-3 text-center">
            <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
              Acheter plus de crédits
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
