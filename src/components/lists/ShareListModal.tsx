'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
  XMarkIcon,
  ShareIcon,
  CheckIcon,
  ClipboardIcon,
  EyeIcon,
  LockClosedIcon,
  HandThumbUpIcon,
  ChatBubbleLeftIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import { InfluencerList } from '@/types';

interface ShareListModalProps {
  isOpen: boolean;
  onClose: () => void;
  list: InfluencerList;
}

export default function ShareListModal({
  isOpen,
  onClose,
  list,
}: ShareListModalProps) {
  const [shareSettings, setShareSettings] = useState({
    allowVotes: true,
    allowComments: false,
    shareType: 'public' as 'public' | 'private',
    password: '',
  });

  const [shareLink, setShareLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const generateShareLink = async () => {
    setIsGenerating(true);

    // Simuler la génération d'un lien unique
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const shareId = `list_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const baseUrl =
      typeof window !== 'undefined'
        ? window.location.origin
        : 'http://localhost:3000';
    const link = `${baseUrl}/share/list/${shareId}`;

    setShareLink(link);
    setIsGenerating(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const resetModal = () => {
    setShareLink('');
    setCopied(false);
    setIsGenerating(false);
    setShareSettings({
      allowVotes: true,
      allowComments: false,
      shareType: 'public',
      password: '',
    });
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center">
              <ShareIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Partager la liste de casting
              </h2>
              <p className="text-sm text-gray-500">{list.name}</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {!shareLink ? (
          // Configuration du partage
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <EyeIcon className="w-5 h-5 text-purple-600 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">
                    Aperçu de la liste de casting
                  </h3>
                  <p className="text-sm text-gray-600">
                    Les destinataires pourront voir les{' '}
                    {list.influencers.length} créateurs sélectionnés et donner
                    leur avis.
                  </p>
                </div>
              </div>
            </div>

            {/* Paramètres d'interaction */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Options d&apos;interaction
              </h3>

              <div className="space-y-3">
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={shareSettings.allowVotes}
                    onChange={(e) =>
                      setShareSettings((prev) => ({
                        ...prev,
                        allowVotes: e.target.checked,
                      }))
                    }
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 mt-1"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <HandThumbUpIcon className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-gray-900">
                        Activer les votes
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Permet aux visiteurs de voter pour ou contre chaque
                      créateur
                    </p>
                  </div>
                </label>

                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={shareSettings.allowComments}
                    onChange={(e) =>
                      setShareSettings((prev) => ({
                        ...prev,
                        allowComments: e.target.checked,
                      }))
                    }
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 mt-1"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <ChatBubbleLeftIcon className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium text-gray-900">
                        Activer les commentaires
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Permet aux visiteurs de laisser des commentaires sur
                      chaque créateur
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Type de partage */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Contrôle d&apos;accès
              </h3>

              <div className="space-y-2">
                <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="shareType"
                    value="public"
                    checked={shareSettings.shareType === 'public'}
                    onChange={(e) =>
                      setShareSettings((prev) => ({
                        ...prev,
                        shareType: e.target.value as 'public' | 'private',
                      }))
                    }
                    className="w-4 h-4 text-purple-600"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <ShareIcon className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-gray-900">
                        Lien public
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Toute personne avec le lien peut voir la liste
                    </p>
                  </div>
                </label>

                <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="shareType"
                    value="private"
                    checked={shareSettings.shareType === 'private'}
                    onChange={(e) =>
                      setShareSettings((prev) => ({
                        ...prev,
                        shareType: e.target.value as 'public' | 'private',
                      }))
                    }
                    className="w-4 h-4 text-purple-600"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <LockClosedIcon className="w-4 h-4 text-orange-500" />
                      <span className="text-sm font-medium text-gray-900">
                        Protégé par mot de passe
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Nécessite un mot de passe pour accéder à la liste
                    </p>
                  </div>
                </label>
              </div>

              {shareSettings.shareType === 'private' && (
                <div className="mt-3">
                  <input
                    type="password"
                    placeholder="Entrez un mot de passe"
                    value={shareSettings.password}
                    onChange={(e) =>
                      setShareSettings((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1"
              >
                Annuler
              </Button>
              <Button
                onClick={generateShareLink}
                disabled={
                  isGenerating ||
                  (shareSettings.shareType === 'private' &&
                    !shareSettings.password)
                }
                className="flex-1 flex items-center justify-center space-x-2"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Génération...</span>
                  </>
                ) : (
                  <>
                    <ShareIcon className="w-4 h-4" />
                    <span>Créer le lien</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          // Lien généré
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckIcon className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Lien de partage créé !
              </h3>
              <p className="text-gray-600">
                Votre liste de casting est prête à être partagée. Les
                destinataires pourront
                {shareSettings.allowVotes &&
                  ' voter pour leurs créateurs préférés'}
                {shareSettings.allowVotes &&
                  shareSettings.allowComments &&
                  ' et'}
                {shareSettings.allowComments && ' laisser des commentaires'}.
              </p>
            </div>

            {/* Lien de partage */}
            <div className="bg-gray-50 rounded-xl p-4">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Lien de partage de la liste
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={shareLink}
                  readOnly
                  className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-mono"
                />
                <Button
                  onClick={copyToClipboard}
                  size="sm"
                  className={copied ? 'bg-green-600 hover:bg-green-700' : ''}
                >
                  {copied ? (
                    <>
                      <CheckIcon className="w-4 h-4 mr-1" />
                      Copié
                    </>
                  ) : (
                    <>
                      <ClipboardIcon className="w-4 h-4 mr-1" />
                      Copier
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Informations sur le partage */}
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <EyeIcon className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-2">
                    Ce qui est inclus :
                  </h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>
                      • {list.influencers.length} créateurs avec leurs profils
                    </li>
                    <li>• Statistiques de base (followers, engagement rate)</li>
                    {shareSettings.allowVotes && (
                      <li>• Système de vote pour chaque créateur</li>
                    )}
                    {shareSettings.allowComments && (
                      <li>• Possibilité de laisser des commentaires</li>
                    )}
                    <li>• Design personnalisé avec votre branding</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => window.open(shareLink, '_blank')}
                  className="flex-1"
                >
                  Prévisualiser
                </Button>
                <Button onClick={handleClose} className="flex-1">
                  Terminé
                </Button>
              </div>

              {shareSettings.allowVotes && (
                <Button
                  variant="outline"
                  onClick={() => {
                    window.open(`/lists/${list.id}/share-results`, '_blank');
                  }}
                  className="w-full flex items-center justify-center space-x-2 border-purple-300 text-purple-700 hover:bg-purple-50"
                >
                  <ChartBarIcon className="w-4 h-4" />
                  <span>Voir les résultats des votes</span>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

