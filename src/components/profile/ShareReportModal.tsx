'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
  XMarkIcon,
  ShareIcon,
  CheckIcon,
  ChartBarIcon,
  EyeIcon,
  ClipboardDocumentIcon,
} from '@heroicons/react/24/outline';
import { InfluencerDetails } from '@/types';

interface ShareReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  influencer: InfluencerDetails;
  onShare: (shareData: ShareReportData) => void;
}

interface ShareReportData {
  influencerId: string;
  shareType: 'public' | 'private';
  expiresAt?: string;
  includeFullAudience: boolean;
  trackingEnabled: boolean;
}

export default function ShareReportModal({
  isOpen,
  onClose,
  influencer,
  onShare,
}: ShareReportModalProps) {
  const [shareData, setShareData] = useState<ShareReportData>({
    influencerId: influencer.id,
    shareType: 'public',
    expiresAt: undefined,
    includeFullAudience: false,
    trackingEnabled: true,
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);

  const handleGenerateLink = async () => {
    setIsGenerating(true);

    // Simuler la génération d'un lien unique
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const shareId = `${influencer.id}_${Date.now()}`;
    const link = `https://share.spread.com/report/${shareId}?utm_source=spread_app&utm_medium=share&utm_campaign=growth_hacking`;

    setGeneratedLink(link);
    setIsGenerating(false);

    // Appeler la fonction de partage
    onShare(shareData);
  };

  const handleCopyLink = async () => {
    if (generatedLink) {
      await navigator.clipboard.writeText(generatedLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <ShareIcon className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Partager le rapport
              </h2>
              <p className="text-sm text-gray-600">
                {influencer.name} (@{influencer.username})
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

        {!generatedLink ? (
          <>
            {/* Options de partage */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type de partage
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="public"
                      checked={shareData.shareType === 'public'}
                      onChange={() =>
                        setShareData({ ...shareData, shareType: 'public' })
                      }
                      className="mr-2"
                    />
                    <div>
                      <span className="text-sm font-medium">Public</span>
                      <p className="text-xs text-gray-500">
                        Accessible à tous avec le lien
                      </p>
                    </div>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="private"
                      checked={shareData.shareType === 'private'}
                      onChange={() =>
                        setShareData({ ...shareData, shareType: 'private' })
                      }
                      className="mr-2"
                    />
                    <div>
                      <span className="text-sm font-medium">Privé</span>
                      <p className="text-xs text-gray-500">
                        Protégé par mot de passe
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiration
                </label>
                <select
                  value={shareData.expiresAt || ''}
                  onChange={(e) =>
                    setShareData({
                      ...shareData,
                      expiresAt: e.target.value || undefined,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Jamais</option>
                  <option value="24h">24 heures</option>
                  <option value="7d">7 jours</option>
                  <option value="30d">30 jours</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={shareData.includeFullAudience}
                    onChange={(e) =>
                      setShareData({
                        ...shareData,
                        includeFullAudience: e.target.checked,
                      })
                    }
                    className="mr-2"
                  />
                  <span className="text-sm">
                    Inclure toutes les données d&apos;audience
                  </span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={shareData.trackingEnabled}
                    onChange={(e) =>
                      setShareData({
                        ...shareData,
                        trackingEnabled: e.target.checked,
                      })
                    }
                    className="mr-2"
                  />
                  <span className="text-sm">Activer le tracking des vues</span>
                </label>
              </div>
            </div>

            {/* Aperçu du rapport partagé */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Aperçu du rapport partagé
              </h3>
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <div className="flex items-center space-x-3 mb-2">
                  <img
                    src={influencer.avatar}
                    alt={influencer.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <div className="font-medium text-sm">{influencer.name}</div>
                    <div className="text-xs text-gray-500">
                      @{influencer.username}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-600 mb-2">
                  {influencer.followers.toLocaleString()} followers •{' '}
                  {influencer.engagementRate}% engagement
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded p-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-purple-600 rounded"></div>
                    <span className="text-xs font-medium text-purple-800">
                      Essayer Spread
                    </span>
                  </div>
                  <p className="text-xs text-purple-700 mt-1">
                    Trouvez des influenceurs comme {influencer.name} avec Spread
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-3">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Annuler
              </Button>
              <Button
                onClick={handleGenerateLink}
                disabled={isGenerating}
                className="flex-1 bg-purple-600 hover:bg-purple-700"
              >
                {isGenerating ? 'Génération...' : 'Générer le lien'}
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* Lien généré */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <CheckIcon className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  Lien généré avec succès !
                </span>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lien de partage
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={generatedLink}
                    readOnly
                    className="flex-1 p-2 border border-gray-300 rounded-lg bg-white text-sm"
                  />
                  <Button
                    onClick={handleCopyLink}
                    variant="outline"
                    className="flex items-center space-x-1"
                  >
                    {linkCopied ? (
                      <CheckIcon className="w-4 h-4 text-green-600" />
                    ) : (
                      <ClipboardDocumentIcon className="w-4 h-4" />
                    )}
                    <span>{linkCopied ? 'Copié' : 'Copier'}</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Statistiques preview */}
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <ChartBarIcon className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">
                  Tracking activé
                </span>
              </div>
              <p className="text-xs text-blue-700">
                Vous recevrez des notifications lorsque quelqu&apos;un consulte
                ce rapport. Les statistiques seront disponibles dans votre
                tableau de bord.
              </p>
            </div>

            {/* Actions finales */}
            <div className="flex space-x-3">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Fermer
              </Button>
              <Button
                onClick={() => {
                  // Ouvrir dans un nouvel onglet pour prévisualiser
                  window.open(generatedLink, '_blank');
                }}
                className="flex-1 bg-purple-600 hover:bg-purple-700"
              >
                <EyeIcon className="w-4 h-4 mr-2" />
                Prévisualiser
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
