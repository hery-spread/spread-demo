'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
  XMarkIcon,
  ShareIcon,
  CheckIcon,
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
  const shareData: ShareReportData = {
    influencerId: influencer.id,
    shareType: 'public',
    expiresAt: undefined,
    includeFullAudience: false,
    trackingEnabled: true,
  };
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);

  // Génère le lien automatiquement à l'ouverture et passe directement à l'étape finale
  useEffect(() => {
    if (!isOpen) return;
    const shareId = `${influencer.id}_${Date.now()}`;
    const baseUrl =
      typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
    const link = `${baseUrl}/share/${shareId}`;
    setGeneratedLink(link);
    onShare(shareData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

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
        {/* Lien direct à copier */}
            <div className="mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lien de partage
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                value={generatedLink ?? ''}
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

        <div className="flex">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Fermer
              </Button>
            </div>
      </div>
    </div>
  );
}
