'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { XMarkIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import { CRMContact } from '@/types';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (contact: Partial<CRMContact>) => void;
}

export default function ContactModal({
  isOpen,
  onClose,
  onAdd,
}: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    platform: 'instagram' as const,
    followers: '',
    stage: 'contacted' as const,
    notes: '',
    source: 'manual' as const,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newContact: Partial<CRMContact> = {
      name: formData.name,
      username: formData.username,
      email: formData.email || undefined,
      phone: formData.phone || undefined,
      platform: formData.platform,
      followers: parseInt(formData.followers) || 0,
      stage: formData.stage,
      notes: formData.notes || undefined,
      source: formData.source,
      avatar: `/avatars/default.jpg`,
    };

    onAdd(newContact);

    // Reset form
    setFormData({
      name: '',
      username: '',
      email: '',
      phone: '',
      platform: 'instagram',
      followers: '',
      stage: 'contacted',
      notes: '',
      source: 'manual',
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  const canSubmit = formData.name && formData.username;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <UserPlusIcon className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Nouveau contact
              </h2>
              <p className="text-sm text-gray-600">
                Ajouter un influenceur à votre CRM
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Nom *"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Marie Dupont"
              required
            />
            <Input
              label="Username *"
              value={formData.username}
              onChange={(e) => handleChange('username', e.target.value)}
              placeholder="marie_lifestyle"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="marie@exemple.com"
            />
            <Input
              label="Téléphone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+33 6 12 34 56 78"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Plateforme"
              value={formData.platform}
              onChange={(e) => handleChange('platform', e.target.value)}
              options={[
                { value: 'instagram', label: 'Instagram' },
                { value: 'youtube', label: 'YouTube' },
                { value: 'tiktok', label: 'TikTok' },
              ]}
            />
            <Input
              label="Followers"
              type="number"
              value={formData.followers}
              onChange={(e) => handleChange('followers', e.target.value)}
              placeholder="125000"
              min="0"
            />
          </div>

          <Select
            label="Étape"
            value={formData.stage}
            onChange={(e) => handleChange('stage', e.target.value)}
            options={[
              { value: 'contacted', label: 'Contacté' },
              { value: 'responded', label: 'Répondu' },
              { value: 'negotiating', label: 'Négociation' },
              { value: 'closed', label: 'Fermé' },
            ]}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              placeholder="Notes sur ce contact..."
            />
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={!canSubmit}
              className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Ajouter
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
