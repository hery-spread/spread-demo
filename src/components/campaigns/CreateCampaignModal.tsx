'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface CreateCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (campaignData: {
    name: string;
    description: string;
    hashtags: string[];
    platforms: string[];
  }) => void;
}

export default function CreateCampaignModal({
  isOpen,
  onClose,
  onCreate,
}: CreateCampaignModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    hashtags: '',
    platforms: [] as string[],
  });

  const [isCreating, setIsCreating] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsCreating(true);

    // Simulation création
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const hashtags = formData.hashtags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0)
      .map((tag) => (tag.startsWith('#') ? tag : `#${tag}`));

    onCreate({
      name: formData.name,
      description: formData.description,
      hashtags,
      platforms: formData.platforms,
    });

    setIsCreating(false);
    setFormData({
      name: '',
      description: '',
      hashtags: '',
      platforms: [],
    });
    onClose();
  };

  const togglePlatform = (platform: string) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Créer une campagne
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nom de la campagne */}
          <div>
            <Input
              label="Nom de la campagne"
              placeholder="Ex: Campagne Samsung Galaxy 2025"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (optionnel)
            </label>
            <textarea
              placeholder="Décrivez brièvement votre campagne..."
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              rows={3}
            />
          </div>

          {/* Hashtags */}
          <div>
            <Input
              label="Hashtags à suivre"
              placeholder="Ex: #SamsungPartner, #GalaxyS25, #TechReview"
              value={formData.hashtags}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, hashtags: e.target.value }))
              }
            />
            <p className="text-xs text-gray-500 mt-1">
              Séparez les hashtags par des virgules. Le # sera ajouté
              automatiquement.
            </p>
          </div>

          {/* Plateformes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Plateformes à surveiller
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'instagram', label: 'Instagram', emoji: '📷' },
                { id: 'youtube', label: 'YouTube', emoji: '🎥' },
                { id: 'tiktok', label: 'TikTok', emoji: '🎵' },
              ].map((platform) => (
                <button
                  key={platform.id}
                  type="button"
                  onClick={() => togglePlatform(platform.id)}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    formData.platforms.includes(platform.id)
                      ? 'border-purple-300 bg-purple-50 text-purple-800'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="text-2xl mb-1">{platform.emoji}</div>
                  <div className="text-sm font-medium">{platform.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isCreating}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={!formData.name.trim() || isCreating}
            >
              {isCreating ? 'Création...' : 'Créer la campagne'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
