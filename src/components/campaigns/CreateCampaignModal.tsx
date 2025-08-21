'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  XMarkIcon,
  PlusIcon,
  TrashIcon,
  LinkIcon,
} from '@heroicons/react/24/outline';

interface CampaignLink {
  url: string;
  label?: string;
  budget?: number;
}

interface CreateCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (campaignData: {
    name: string;
    description: string;
    links: CampaignLink[];
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
    links: [{ url: '', label: '', budget: undefined }] as CampaignLink[],
    platforms: ['instagram', 'youtube', 'tiktok'],
  });

  const [isCreating, setIsCreating] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsCreating(true);

    // Simulation création
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Filtrer les liens valides (au moins une URL)
    const validLinks = formData.links.filter(
      (link) => link.url.trim().length > 0
    );

    onCreate({
      name: formData.name,
      description: formData.description,
      links: validLinks,
      platforms: formData.platforms,
    });

    setIsCreating(false);
    setFormData({
      name: '',
      description: '',
      links: [{ url: '', label: '', budget: undefined }],
      platforms: ['instagram', 'youtube', 'tiktok'],
    });
    onClose();
  };

  const addLink = () => {
    if (formData.links.length < 5) {
      setFormData((prev) => ({
        ...prev,
        links: [...prev.links, { url: '', label: '', budget: undefined }],
      }));
    }
  };

  const removeLink = (index: number) => {
    if (formData.links.length > 1) {
      setFormData((prev) => ({
        ...prev,
        links: prev.links.filter((_, i) => i !== index),
      }));
    }
  };

  const updateLink = (
    index: number,
    field: keyof CampaignLink,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      links: prev.links.map((link, i) =>
        i === index
          ? {
              ...link,
              [field]:
                field === 'budget'
                  ? value === ''
                    ? undefined
                    : Number(value)
                  : value,
            }
          : link
      ),
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

          {/* Liens à suivre */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Liens à suivre
              </label>
              <button
                type="button"
                onClick={addLink}
                disabled={formData.links.length >= 5}
                className="flex items-center space-x-1 text-sm text-purple-600 hover:text-purple-700 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                <PlusIcon className="w-4 h-4" />
                <span>Ajouter un lien</span>
              </button>
            </div>

            <div className="space-y-3">
              {formData.links.map((link, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <LinkIcon className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">
                        Lien {index + 1}
                      </span>
                    </div>
                    {formData.links.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeLink(index)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Input
                      label="URL *"
                      placeholder="https://exemple.com/campagne"
                      value={link.url}
                      onChange={(e) => updateLink(index, 'url', e.target.value)}
                      required
                    />

                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        label="Libellé (optionnel)"
                        placeholder="Nom du lien"
                        value={link.label || ''}
                        onChange={(e) =>
                          updateLink(index, 'label', e.target.value)
                        }
                      />

                      <Input
                        label="Budget (optionnel)"
                        placeholder="1000"
                        type="number"
                        min="0"
                        step="0.01"
                        value={link.budget || ''}
                        onChange={(e) =>
                          updateLink(index, 'budget', e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-500 mt-2">
              Ajoutez jusqu&apos;à 5 liens pour suivre les performances de votre
              campagne.
            </p>
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
