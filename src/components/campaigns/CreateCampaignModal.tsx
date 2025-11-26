'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  XMarkIcon,
  PlusIcon,
  TrashIcon,
  LinkIcon,
  InformationCircleIcon,
  DocumentTextIcon,
  ArrowDownTrayIcon,
  CheckIcon,
  FolderIcon,
  ChevronUpDownIcon,
} from '@heroicons/react/24/outline';
import { ManualContent, ApifyScrapedPost, CampaignFolder } from '@/types';
import ManualContentForm from './ManualContentForm';
import ApifyImportSection from './ApifyImportSection';

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
    manualContents: ManualContent[];
    importedPosts: ApifyScrapedPost[];
    folderId: string | null;
  }) => void;
  folders?: CampaignFolder[];
  selectedFolderId?: string | null;
}

type TabId = 'info' | 'links' | 'manual' | 'import';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

export default function CreateCampaignModal({
  isOpen,
  onClose,
  onCreate,
  folders = [],
  selectedFolderId: initialFolderId = null,
}: CreateCampaignModalProps) {
  const [activeTab, setActiveTab] = useState<TabId>('info');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    links: [{ url: '', label: '', budget: undefined }] as CampaignLink[],
    platforms: ['instagram', 'youtube', 'tiktok'],
  });
  const [manualContents, setManualContents] = useState<ManualContent[]>([]);
  const [importedPosts, setImportedPosts] = useState<ApifyScrapedPost[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(
    initialFolderId
  );
  const [isFolderDropdownOpen, setIsFolderDropdownOpen] = useState(false);

  // Mettre à jour le dossier sélectionné quand initialFolderId change
  useEffect(() => {
    setSelectedFolderId(initialFolderId);
  }, [initialFolderId]);

  // Tabs configuration
  const tabs: Tab[] = [
    {
      id: 'info',
      label: 'Informations',
      icon: <InformationCircleIcon className="w-4 h-4" />,
    },
    {
      id: 'links',
      label: 'Liens',
      icon: <LinkIcon className="w-4 h-4" />,
      badge: formData.links.filter((l) => l.url.trim()).length || undefined,
    },
    {
      id: 'manual',
      label: 'Contenus',
      icon: <DocumentTextIcon className="w-4 h-4" />,
      badge: manualContents.length || undefined,
    },
    {
      id: 'import',
      label: 'Import auto',
      icon: <ArrowDownTrayIcon className="w-4 h-4" />,
      badge: importedPosts.length || undefined,
    },
  ];

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
      manualContents,
      importedPosts,
      folderId: selectedFolderId,
    });

    setIsCreating(false);
    // Reset form
    setFormData({
      name: '',
      description: '',
      links: [{ url: '', label: '', budget: undefined }],
      platforms: ['instagram', 'youtube', 'tiktok'],
    });
    setManualContents([]);
    setImportedPosts([]);
    setActiveTab('info');
    setSelectedFolderId(initialFolderId);
    setIsFolderDropdownOpen(false);
    onClose();
  };

  const addLink = () => {
    setFormData((prev) => ({
      ...prev,
      links: [...prev.links, { url: '', label: '', budget: undefined }],
    }));
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

  // Handler pour l'import de posts via Apify
  const handleApifyImport = (posts: ApifyScrapedPost[]) => {
    setImportedPosts((prev) => [...prev, ...posts]);
  };

  // Vérifier si le formulaire est valide
  const isFormValid = formData.name.trim().length > 0;

  // Compter le total de contenus
  const totalContents = manualContents.length + importedPosts.length;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Créer une campagne
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Configurez votre campagne de tracking d&apos;influence
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-100 px-6">
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span
                    className={`px-1.5 py-0.5 text-xs font-medium rounded-full ${
                      activeTab === tab.id
                        ? 'bg-purple-100 text-purple-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-hidden flex flex-col"
        >
          <div className="flex-1 overflow-y-auto p-6">
            {/* Tab: Informations */}
            {activeTab === 'info' && (
              <div className="space-y-5">
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

                {/* Sélecteur de dossier */}
                {folders.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dossier
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() =>
                          setIsFolderDropdownOpen(!isFolderDropdownOpen)
                        }
                        className="w-full flex items-center justify-between px-3 py-2.5 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                      >
                        <div className="flex items-center space-x-2">
                          {selectedFolderId ? (
                            <>
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{
                                  backgroundColor:
                                    folders.find(
                                      (f) => f.id === selectedFolderId
                                    )?.color || '#9CA3AF',
                                }}
                              />
                              <FolderIcon className="w-4 h-4 text-gray-500" />
                              <span className="text-gray-900">
                                {folders.find((f) => f.id === selectedFolderId)
                                  ?.name || 'Dossier inconnu'}
                              </span>
                            </>
                          ) : (
                            <>
                              <div className="w-3 h-3 rounded-full bg-gray-300" />
                              <span className="text-gray-500">
                                Aucun dossier
                              </span>
                            </>
                          )}
                        </div>
                        <ChevronUpDownIcon className="w-5 h-5 text-gray-400" />
                      </button>

                      {/* Dropdown */}
                      {isFolderDropdownOpen && (
                        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                          {/* Option: Aucun dossier */}
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedFolderId(null);
                              setIsFolderDropdownOpen(false);
                            }}
                            className={`w-full flex items-center space-x-2 px-3 py-2.5 hover:bg-gray-50 transition-colors ${
                              selectedFolderId === null ? 'bg-purple-50' : ''
                            }`}
                          >
                            <div className="w-3 h-3 rounded-full bg-gray-300" />
                            <span
                              className={
                                selectedFolderId === null
                                  ? 'text-purple-700 font-medium'
                                  : 'text-gray-600'
                              }
                            >
                              Aucun dossier
                            </span>
                            {selectedFolderId === null && (
                              <CheckIcon className="w-4 h-4 text-purple-600 ml-auto" />
                            )}
                          </button>

                          <div className="border-t border-gray-100" />

                          {/* Liste des dossiers */}
                          {folders.map((folder) => (
                            <button
                              key={folder.id}
                              type="button"
                              onClick={() => {
                                setSelectedFolderId(folder.id);
                                setIsFolderDropdownOpen(false);
                              }}
                              className={`w-full flex items-center space-x-2 px-3 py-2.5 hover:bg-gray-50 transition-colors ${
                                selectedFolderId === folder.id
                                  ? 'bg-purple-50'
                                  : ''
                              }`}
                            >
                              <div
                                className="w-3 h-3 rounded-full flex-shrink-0"
                                style={{
                                  backgroundColor: folder.color || '#9CA3AF',
                                }}
                              />
                              <FolderIcon className="w-4 h-4 text-gray-500 flex-shrink-0" />
                              <div className="flex-1 text-left">
                                <span
                                  className={
                                    selectedFolderId === folder.id
                                      ? 'text-purple-700 font-medium'
                                      : 'text-gray-900'
                                  }
                                >
                                  {folder.name}
                                </span>
                                {folder.clientName && (
                                  <span className="text-xs text-gray-500 ml-2">
                                    ({folder.clientName})
                                  </span>
                                )}
                              </div>
                              {selectedFolderId === folder.id && (
                                <CheckIcon className="w-4 h-4 text-purple-600 flex-shrink-0" />
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="mt-1.5 text-xs text-gray-500">
                      Organisez votre campagne dans un dossier client
                    </p>
                  </div>
                )}

                {/* Résumé */}
                {totalContents > 0 && (
                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-4">
                    <h4 className="text-sm font-medium text-purple-900 mb-2">
                      Résumé de la campagne
                    </h4>
                    <div className="flex items-center space-x-6 text-sm">
                      <span className="text-purple-700">
                        📝 <strong>{manualContents.length}</strong> contenu
                        {manualContents.length > 1 ? 's' : ''} manuel
                        {manualContents.length > 1 ? 's' : ''}
                      </span>
                      <span className="text-indigo-700">
                        🔄 <strong>{importedPosts.length}</strong> contenu
                        {importedPosts.length > 1 ? 's' : ''} importé
                        {importedPosts.length > 1 ? 's' : ''}
                      </span>
                      <span className="text-gray-600">
                        🔗{' '}
                        <strong>
                          {formData.links.filter((l) => l.url.trim()).length}
                        </strong>{' '}
                        lien
                        {formData.links.filter((l) => l.url.trim()).length > 1
                          ? 's'
                          : ''}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab: Liens */}
            {activeTab === 'links' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">
                      Liens à suivre
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Ajoutez les liens que vous souhaitez tracker
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addLink}
                    className="flex items-center space-x-1 text-sm text-purple-600 hover:text-purple-700 transition-colors"
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
                          onChange={(e) =>
                            updateLink(index, 'url', e.target.value)
                          }
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

                <p className="text-xs text-gray-500">
                  Ajoutez autant de liens que nécessaire pour suivre les
                  performances de votre campagne. Chaque lien peut avoir son
                  propre budget et libellé.
                </p>
              </div>
            )}

            {/* Tab: Contenus manuels */}
            {activeTab === 'manual' && (
              <ManualContentForm
                contents={manualContents}
                onContentsChange={setManualContents}
              />
            )}

            {/* Tab: Import automatique */}
            {activeTab === 'import' && (
              <div className="space-y-5">
                <ApifyImportSection onImport={handleApifyImport} />

                {/* Liste des posts importés */}
                {importedPosts.length > 0 && (
                  <div className="border-t border-gray-200 pt-5">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-medium text-gray-700">
                        Posts importés ({importedPosts.length})
                      </h4>
                      <button
                        type="button"
                        onClick={() => setImportedPosts([])}
                        className="text-xs text-red-500 hover:text-red-700"
                      >
                        Tout supprimer
                      </button>
                    </div>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {importedPosts.map((post) => (
                        <div
                          key={post.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <CheckIcon className="w-4 h-4 text-green-500" />
                            <div>
                              <span className="text-sm font-medium text-gray-900">
                                @{post.username}
                              </span>
                              <span className="text-xs text-gray-500 ml-2">
                                {post.type} · {post.matchedFilter}
                              </span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setImportedPosts((prev) =>
                                prev.filter((p) => p.id !== post.id)
                              )
                            }
                            className="text-gray-400 hover:text-red-500"
                          >
                            <XMarkIcon className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="border-t border-gray-100 p-6 bg-gray-50/50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                {totalContents > 0 && (
                  <span>
                    {totalContents} contenu{totalContents > 1 ? 's' : ''} ajouté
                    {totalContents > 1 ? 's' : ''}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isCreating}
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  disabled={!isFormValid || isCreating}
                  className="min-w-[140px]"
                >
                  {isCreating ? 'Création...' : 'Créer la campagne'}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
