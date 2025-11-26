'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  XMarkIcon,
  FolderPlusIcon,
  SwatchIcon,
} from '@heroicons/react/24/outline';

interface CreateFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (folderData: {
    name: string;
    description?: string;
    clientName?: string;
    color: string;
  }) => void;
}

// Palette de couleurs prédéfinies
const colorPalette = [
  { name: 'Violet', value: '#8B5CF6' },
  { name: 'Bleu', value: '#3B82F6' },
  { name: 'Vert', value: '#16A34A' },
  { name: 'Rose', value: '#DB2777' },
  { name: 'Orange', value: '#EA580C' },
  { name: 'Cyan', value: '#0891B2' },
  { name: 'Indigo', value: '#4F46E5' },
  { name: 'Rouge', value: '#DC2626' },
];

export default function CreateFolderModal({
  isOpen,
  onClose,
  onCreate,
}: CreateFolderModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [clientName, setClientName] = useState('');
  const [selectedColor, setSelectedColor] = useState(colorPalette[0].value);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return;

    setIsSubmitting(true);

    try {
      await onCreate({
        name: name.trim(),
        description: description.trim() || undefined,
        clientName: clientName.trim() || undefined,
        color: selectedColor,
      });

      // Reset form
      setName('');
      setDescription('');
      setClientName('');
      setSelectedColor(colorPalette[0].value);
      onClose();
    } catch (error) {
      console.error('Erreur lors de la création du dossier:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-fadeInUp">
        {/* Header */}
        <div
          className="p-6 border-b border-gray-200"
          style={{
            background: `linear-gradient(135deg, ${selectedColor}15 0%, white 100%)`,
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                className="p-2 rounded-xl"
                style={{ backgroundColor: `${selectedColor}20` }}
              >
                <FolderPlusIcon
                  className="w-6 h-6"
                  style={{ color: selectedColor }}
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Nouveau dossier
                </h2>
                <p className="text-sm text-gray-500">
                  Organisez vos campagnes par client ou projet
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <XMarkIcon className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Nom du dossier */}
          <div>
            <label
              htmlFor="folder-name"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Nom du dossier <span className="text-red-500">*</span>
            </label>
            <Input
              id="folder-name"
              type="text"
              placeholder="Ex: Campagnes Samsung 2025"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
            />
          </div>

          {/* Client */}
          <div>
            <label
              htmlFor="client-name"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Nom du client{' '}
              <span className="text-gray-400 font-normal">(optionnel)</span>
            </label>
            <Input
              id="client-name"
              type="text"
              placeholder="Ex: Samsung Electronics France"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Description{' '}
              <span className="text-gray-400 font-normal">(optionnel)</span>
            </label>
            <textarea
              id="description"
              rows={2}
              placeholder="Décrivez brièvement ce dossier..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm"
            />
          </div>

          {/* Couleur */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center space-x-2">
                <SwatchIcon className="w-4 h-4" />
                <span>Couleur du dossier</span>
              </div>
            </label>
            <div className="flex flex-wrap gap-2">
              {colorPalette.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setSelectedColor(color.value)}
                  className={`w-8 h-8 rounded-lg transition-all duration-200 ${
                    selectedColor === color.value
                      ? 'ring-2 ring-offset-2 ring-gray-400 scale-110'
                      : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Aperçu */}
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider font-medium">
              Aperçu
            </p>
            <div className="flex items-center space-x-3">
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: `${selectedColor}20` }}
              >
                <FolderPlusIcon
                  className="w-5 h-5"
                  style={{ color: selectedColor }}
                />
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {name || 'Nom du dossier'}
                </p>
                {clientName && (
                  <p className="text-xs text-gray-500">{clientName}</p>
                )}
              </div>
              <span
                className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: `${selectedColor}20`,
                  color: selectedColor,
                }}
              >
                0
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={!name.trim() || isSubmitting}
              className="flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Création...</span>
                </>
              ) : (
                <>
                  <FolderPlusIcon className="w-4 h-4" />
                  <span>Créer le dossier</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
