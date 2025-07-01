'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
  XMarkIcon,
  DocumentArrowDownIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import { InfluencerList } from '@/types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  list: InfluencerList;
  onExport: (options: ExportOptions) => Promise<void>;
}

interface ExportOptions {
  format: 'csv' | 'xlsx' | 'json';
  fields: string[];
  includeHeaders: boolean;
  separator: string;
  encoding: string;
  filterEmptyEmails: boolean;
}

const availableFields = [
  { key: 'contactName', label: 'Nom du contact', required: true },
  { key: 'contactEmail', label: 'Email', required: false },
  { key: 'id', label: 'ID Influenceur', required: false },
  { key: 'platform', label: 'Plateforme', required: false },
  { key: 'followers', label: 'Nombre de followers', required: false },
  { key: 'engagementRate', label: "Taux d'engagement", required: false },
  { key: 'country', label: 'Pays', required: false },
  { key: 'category', label: 'Catégorie de la liste', required: false },
  { key: 'addedDate', label: "Date d'ajout", required: false },
];

export default function ExportModal({
  isOpen,
  onClose,
  list,
  onExport,
}: ExportModalProps) {
  const [options, setOptions] = useState<ExportOptions>({
    format: 'csv',
    fields: ['contactName', 'contactEmail'],
    includeHeaders: true,
    separator: ',',
    encoding: 'UTF-8',
    filterEmptyEmails: false,
  });
  const [exporting, setExporting] = useState(false);

  if (!isOpen) return null;

  const handleFieldToggle = (fieldKey: string) => {
    const field = availableFields.find((f) => f.key === fieldKey);
    if (field?.required) return; // Ne pas permettre de désélectionner les champs requis

    setOptions((prev) => ({
      ...prev,
      fields: prev.fields.includes(fieldKey)
        ? prev.fields.filter((f) => f !== fieldKey)
        : [...prev.fields, fieldKey],
    }));
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      await onExport(options);
      onClose();
    } catch (error) {
      console.error("Erreur lors de l'export:", error);
    } finally {
      setExporting(false);
    }
  };

  const previewData = list.influencers.slice(0, 3).map((influencer) => {
    const row: Record<string, string> = {};
    options.fields.forEach((field) => {
      switch (field) {
        case 'contactName':
          row[field] = influencer.contactName || '';
          break;
        case 'contactEmail':
          row[field] = influencer.contactEmail || '';
          break;
        case 'id':
          row[field] = influencer.id;
          break;
        case 'category':
          row[field] = list.category;
          break;
        case 'addedDate':
          row[field] = list.createdAt;
          break;
        default:
          row[field] = '';
      }
    });
    return row;
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Exporter la liste
            </h3>
            <p className="text-sm text-gray-600">
              {list.name} • {list.influencers.length} contact
              {list.influencers.length > 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Format d'export */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Format d&apos;export
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'csv', label: 'CSV', desc: 'Compatible Excel' },
                { value: 'xlsx', label: 'Excel', desc: 'Format natif' },
                { value: 'json', label: 'JSON', desc: 'Pour développeurs' },
              ].map((format) => (
                <button
                  key={format.value}
                  onClick={() =>
                    setOptions((prev) => ({
                      ...prev,
                      format: format.value as 'csv' | 'xlsx' | 'json',
                    }))
                  }
                  className={`p-3 text-left border rounded-lg transition-colors ${
                    options.format === format.value
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="font-medium">{format.label}</div>
                  <div className="text-xs text-gray-500">{format.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Champs à exporter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Champs à inclure
            </label>
            <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3">
              {availableFields.map((field) => (
                <label key={field.key} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={options.fields.includes(field.key)}
                    onChange={() => handleFieldToggle(field.key)}
                    disabled={field.required}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span
                    className={`text-sm ${field.required ? 'font-medium' : ''}`}
                  >
                    {field.label}
                    {field.required && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Options avancées */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Cog6ToothIcon className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">
                Options avancées
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Séparateur */}
              {options.format === 'csv' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Séparateur
                  </label>
                  <select
                    value={options.separator}
                    onChange={(e) =>
                      setOptions((prev) => ({
                        ...prev,
                        separator: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value=",">Virgule (,)</option>
                    <option value=";">Point-virgule (;)</option>
                    <option value="\t">Tabulation</option>
                  </select>
                </div>
              )}

              {/* Encodage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Encodage
                </label>
                <select
                  value={options.encoding}
                  onChange={(e) =>
                    setOptions((prev) => ({
                      ...prev,
                      encoding: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="UTF-8">UTF-8</option>
                  <option value="ISO-8859-1">ISO-8859-1</option>
                  <option value="Windows-1252">Windows-1252</option>
                </select>
              </div>
            </div>

            {/* Options de filtrage */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={options.includeHeaders}
                  onChange={(e) =>
                    setOptions((prev) => ({
                      ...prev,
                      includeHeaders: e.target.checked,
                    }))
                  }
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">
                  Inclure les en-têtes de colonnes
                </span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={options.filterEmptyEmails}
                  onChange={(e) =>
                    setOptions((prev) => ({
                      ...prev,
                      filterEmptyEmails: e.target.checked,
                    }))
                  }
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">
                  Exclure les contacts sans email
                </span>
              </label>
            </div>
          </div>

          {/* Aperçu */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Aperçu ({previewData.length} premiers résultats)
            </label>
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                <div className="grid grid-cols-3 gap-4 text-xs font-medium text-gray-700">
                  {options.fields.slice(0, 3).map((field) => {
                    const fieldLabel = availableFields.find(
                      (f) => f.key === field
                    )?.label;
                    return (
                      <div key={field} className="truncate">
                        {fieldLabel}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {previewData.map((row, index) => (
                  <div key={index} className="px-4 py-2">
                    <div className="grid grid-cols-3 gap-4 text-xs text-gray-600">
                      {options.fields.slice(0, 3).map((field) => (
                        <div key={field} className="truncate">
                          {row[field] || '-'}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            {list.influencers.length} contact
            {list.influencers.length > 1 ? 's' : ''} à exporter
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button
              onClick={handleExport}
              disabled={exporting || options.fields.length === 0}
            >
              <DocumentArrowDownIcon className="w-4 h-4 mr-2" />
              {exporting ? 'Export en cours...' : 'Exporter'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
