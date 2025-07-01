'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface CreateListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (listData: {
    name: string;
    description: string;
    category: string;
  }) => Promise<void>;
}

export default function CreateListModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateListModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
  });
  const [loading, setLoading] = useState(false);

  const categories = [
    'Mode & Beauté',
    'Gaming',
    'Cuisine',
    'Automobile',
    'Lifestyle',
    'Marketing',
    'Voyage',
    'Technologie',
    'Sport',
    'Musique',
    'Autre',
  ];

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.category) {
      return;
    }

    setLoading(true);
    try {
      await onSubmit(formData);
      setFormData({ name: '', description: '', category: '' });
      onClose();
    } catch (error) {
      console.error('Erreur lors de la création:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ name: '', description: '', category: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Créer une nouvelle liste
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nom de la liste */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom de la liste *
            </label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Ex: Campagne HelloFresh"
              required
              maxLength={50}
            />
            <div className="text-xs text-gray-500 mt-1">
              {formData.name.length}/50 caractères
            </div>
          </div>

          {/* Catégorie */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Catégorie *
            </label>
            <Select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              required
              options={[
                { value: '', label: 'Sélectionner une catégorie' },
                ...categories.map((category) => ({
                  value: category,
                  label: category,
                })),
              ]}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description (optionnel)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Décrivez l'objectif de cette liste..."
              rows={3}
              maxLength={200}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
            />
            <div className="text-xs text-gray-500 mt-1">
              {formData.description.length}/200 caractères
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
              disabled={loading}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={loading || !formData.name.trim() || !formData.category}
            >
              {loading ? 'Création...' : 'Créer la liste'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
