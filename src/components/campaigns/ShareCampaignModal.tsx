'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
  XMarkIcon,
  ShareIcon,
  LinkIcon,
  CheckIcon,
  ClipboardIcon,
  EyeIcon,
  LockClosedIcon,
  LanguageIcon,
} from '@heroicons/react/24/outline';
import { CampaignTracker } from '@/types';

interface ShareCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: CampaignTracker;
}

export default function ShareCampaignModal({
  isOpen,
  onClose,
  campaign,
}: ShareCampaignModalProps) {
  const [shareSettings, setShareSettings] = useState({
    includeFinancials: true,
    includeBudgets: false,
    shareType: 'public' as 'public' | 'private',
    password: '',
    language: 'fr' as 'fr' | 'en' | 'nl',
  });

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  ];
  const [shareLink, setShareLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const generateShareLink = async () => {
    setIsGenerating(true);

    // Simuler la génération d'un lien unique
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const shareId = `camp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const baseUrl =
      typeof window !== 'undefined'
        ? window.location.origin
        : 'http://localhost:3000';
    const link = `${baseUrl}/share/campaign/${shareId}`;

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
      includeFinancials: true,
      includeBudgets: false,
      shareType: 'public',
      password: '',
      language: 'fr',
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
                Share Campaign Report
              </h2>
              <p className="text-sm text-gray-500">{campaign.name}</p>
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
                    Campaign Overview Preview
                  </h3>
                  <p className="text-sm text-gray-600">
                    Recipients will see campaign performance, content metrics,
                    and creator information in a beautiful branded report.
                  </p>
                </div>
              </div>
            </div>

            {/* Paramètres de visibilité */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Visibility Settings
              </h3>

              <div className="space-y-3">
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={shareSettings.includeFinancials}
                    onChange={(e) =>
                      setShareSettings((prev) => ({
                        ...prev,
                        includeFinancials: e.target.checked,
                      }))
                    }
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 mt-1"
                  />
                  <div>
                    <span className="text-sm font-medium text-gray-900">
                      Include financial metrics
                    </span>
                    <p className="text-xs text-gray-500">
                      Show EMV, ROAS, CPM and other financial KPIs
                    </p>
                  </div>
                </label>

                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={shareSettings.includeBudgets}
                    onChange={(e) =>
                      setShareSettings((prev) => ({
                        ...prev,
                        includeBudgets: e.target.checked,
                      }))
                    }
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 mt-1"
                  />
                  <div>
                    <span className="text-sm font-medium text-gray-900">
                      Include budget information
                    </span>
                    <p className="text-xs text-gray-500">
                      Show individual link budgets and total costs
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Type de partage */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Access Control
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
                      <LinkIcon className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-gray-900">
                        Public link
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Anyone with the link can view the report
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
                        Password protected
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Requires a password to access the report
                    </p>
                  </div>
                </label>
              </div>

              {shareSettings.shareType === 'private' && (
                <div className="mt-3">
                  <input
                    type="password"
                    placeholder="Enter password"
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

            {/* Sélection de langue */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <LanguageIcon className="w-5 h-5" />
                <span>Langue du rapport</span>
              </h3>
              
              <div className="grid grid-cols-3 gap-3">
                {languages.map((lang) => (
                  <label
                    key={lang.code}
                    className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                      shareSettings.language === lang.code
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="language"
                      value={lang.code}
                      checked={shareSettings.language === lang.code}
                      onChange={(e) =>
                        setShareSettings((prev) => ({
                          ...prev,
                          language: e.target.value as 'fr' | 'en' | 'nl',
                        }))
                      }
                      className="w-4 h-4 text-purple-600"
                    />
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{lang.flag}</span>
                      <span className="text-sm font-medium text-gray-900">
                        {lang.name}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
              
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-sm text-blue-800">
                  <strong>Conseil :</strong> Le rapport sera généré dans la langue sélectionnée. 
                  Toutes les métriques, libellés et descriptions seront traduits automatiquement.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1"
              >
                Cancel
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
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <ShareIcon className="w-4 h-4" />
                    <span>Create Share Link</span>
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
                Share Link Created!
              </h3>
              <p className="text-gray-600">
                Your campaign report is ready to share. The link is valid and
                can be accessed immediately.
              </p>
            </div>

            {/* Lien de partage */}
            <div className="bg-gray-50 rounded-xl p-4">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Campaign Share Link
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
                      Copied
                    </>
                  ) : (
                    <>
                      <ClipboardIcon className="w-4 h-4 mr-1" />
                      Copy
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
                    What&apos;s included in this report:
                  </h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Campaign overview and performance metrics</li>
                    <li>• Content breakdown (posts, stories, reels)</li>
                    <li>• Creator information and engagement data</li>
                    {shareSettings.includeFinancials && (
                      <li>• Financial metrics (EMV, ROAS, CPM)</li>
                    )}
                    {shareSettings.includeBudgets && (
                      <li>• Budget and cost information</li>
                    )}
                    <li>• Rapport en {languages.find(l => l.code === shareSettings.language)?.name}</li>
                    <li>• Branded Spread call-to-action</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => window.open(shareLink, '_blank')}
                className="flex-1"
              >
                Preview Report
              </Button>
              <Button onClick={handleClose} className="flex-1">
                Done
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
