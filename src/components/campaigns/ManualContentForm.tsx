'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import {
  PlusIcon,
  TrashIcon,
  FireIcon,
  PhotoIcon,
  VideoCameraIcon,
  PlayIcon,
  BoltIcon,
  EyeIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  BookmarkIcon,
  CurrencyEuroIcon,
  UserIcon,
  ArrowUpTrayIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { ManualContent, ContentType } from '@/types';
import { CONTENT_TYPE_CONFIGS, getContentTypeConfig } from '@/lib/mockData';

interface ManualContentFormProps {
  contents: ManualContent[];
  onContentsChange: (contents: ManualContent[]) => void;
}

// Icônes pour chaque type de contenu
const getContentTypeIcon = (type: ContentType) => {
  switch (type) {
    case 'story':
      return <FireIcon className="w-4 h-4" />;
    case 'post':
      return <PhotoIcon className="w-4 h-4" />;
    case 'reel':
      return <VideoCameraIcon className="w-4 h-4" />;
    case 'video':
      return <PlayIcon className="w-4 h-4" />;
    case 'short':
      return <BoltIcon className="w-4 h-4" />;
    default:
      return <PhotoIcon className="w-4 h-4" />;
  }
};

// Options de type de contenu pour le select
const contentTypeOptions = CONTENT_TYPE_CONFIGS.map((config) => ({
  value: config.type,
  label: config.label,
}));

// Options de plateforme
const platformOptions = [
  { value: 'instagram', label: 'Instagram' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'tiktok', label: 'TikTok' },
];

export default function ManualContentForm({
  contents,
  onContentsChange,
}: ManualContentFormProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Ajouter un nouveau contenu
  const addContent = () => {
    const newContent: ManualContent = {
      id: `manual_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'story',
      platform: 'instagram',
      addedAt: new Date().toISOString(),
      isManual: true,
    };
    onContentsChange([...contents, newContent]);
    setExpandedId(newContent.id);
  };

  // Supprimer un contenu
  const removeContent = (id: string) => {
    onContentsChange(contents.filter((c) => c.id !== id));
    if (expandedId === id) {
      setExpandedId(null);
    }
  };

  // Mettre à jour un contenu
  const updateContent = (id: string, updates: Partial<ManualContent>) => {
    onContentsChange(
      contents.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  // Obtenir les plateformes disponibles pour un type
  const getAvailablePlatforms = (type: ContentType) => {
    const config = getContentTypeConfig(type);
    if (!config) return platformOptions;
    return platformOptions.filter((p) =>
      config.platforms.includes(p.value as 'instagram' | 'youtube' | 'tiktok')
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-700">
            Contenus manuels
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Ajoutez des contenus avec leurs statistiques manuellement
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addContent}
          className="flex items-center space-x-1 text-purple-600 border-purple-200 hover:bg-purple-50"
        >
          <PlusIcon className="w-4 h-4" />
          <span>Ajouter</span>
        </Button>
      </div>

      {/* Liste des contenus */}
      {contents.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
          <PhotoIcon className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-500">Aucun contenu ajouté</p>
          <p className="text-xs text-gray-400 mt-1">
            Cliquez sur &quot;Ajouter&quot; pour créer un contenu manuel
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {contents.map((content, index) => {
            const config = getContentTypeConfig(content.type);
            const isExpanded = expandedId === content.id;

            return (
              <div
                key={content.id}
                className={`border rounded-xl transition-all duration-200 ${
                  isExpanded
                    ? 'border-purple-300 bg-purple-50/30 shadow-sm'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                {/* Header du contenu */}
                <div
                  className="flex items-center justify-between p-4 cursor-pointer"
                  onClick={() => setExpandedId(isExpanded ? null : content.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        content.type === 'story'
                          ? 'bg-orange-100 text-orange-600'
                          : content.type === 'reel'
                            ? 'bg-purple-100 text-purple-600'
                            : content.type === 'video'
                              ? 'bg-red-100 text-red-600'
                              : content.type === 'short'
                                ? 'bg-blue-100 text-blue-600'
                                : 'bg-pink-100 text-pink-600'
                      }`}
                    >
                      {getContentTypeIcon(content.type)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">
                          {config?.label || 'Contenu'} #{index + 1}
                        </span>
                        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-600 capitalize">
                          {content.platform}
                        </span>
                      </div>
                      {content.creatorUsername && (
                        <span className="text-xs text-gray-500">
                          @{content.creatorUsername}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {/* Stats preview */}
                    {content.views !== undefined && (
                      <span className="text-xs text-gray-500 flex items-center space-x-1">
                        <EyeIcon className="w-3 h-3" />
                        <span>{content.views.toLocaleString()}</span>
                      </span>
                    )}
                    {content.budget !== undefined && (
                      <span className="text-xs text-green-600 flex items-center space-x-1">
                        <CurrencyEuroIcon className="w-3 h-3" />
                        <span>{content.budget}€</span>
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeContent(content.id);
                      }}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Formulaire expandé */}
                {isExpanded && (
                  <div className="px-4 pb-4 space-y-4 border-t border-gray-100 pt-4">
                    {/* Type et Plateforme */}
                    <div className="grid grid-cols-2 gap-3">
                      <Select
                        label="Type de contenu"
                        options={contentTypeOptions}
                        value={content.type}
                        onChange={(e) => {
                          const newType = e.target.value as ContentType;
                          const availablePlatforms =
                            getAvailablePlatforms(newType);
                          const currentPlatformAvailable =
                            availablePlatforms.some(
                              (p) => p.value === content.platform
                            );
                          updateContent(content.id, {
                            type: newType,
                            platform: currentPlatformAvailable
                              ? content.platform
                              : (availablePlatforms[0]?.value as
                                  | 'instagram'
                                  | 'youtube'
                                  | 'tiktok'),
                          });
                        }}
                      />

                      <Select
                        label="Plateforme"
                        options={getAvailablePlatforms(content.type)}
                        value={content.platform}
                        onChange={(e) =>
                          updateContent(content.id, {
                            platform: e.target.value as
                              | 'instagram'
                              | 'youtube'
                              | 'tiktok',
                          })
                        }
                      />
                    </div>

                    {/* Créateur */}
                    <div className="relative">
                      <Input
                        label="Username du créateur"
                        placeholder="@username"
                        value={content.creatorUsername || ''}
                        onChange={(e) =>
                          updateContent(content.id, {
                            creatorUsername: e.target.value.replace('@', ''),
                          })
                        }
                      />
                      <UserIcon className="absolute right-3 top-9 w-4 h-4 text-gray-400" />
                    </div>

                    {/* URL (optionnel sauf pour stories) */}
                    {content.type !== 'story' && (
                      <Input
                        label="URL du contenu (optionnel)"
                        placeholder="https://instagram.com/p/..."
                        value={content.url || ''}
                        onChange={(e) =>
                          updateContent(content.id, { url: e.target.value })
                        }
                      />
                    )}

                    {/* Upload de visuel */}
                    <VisualUpload
                      thumbnail={content.thumbnail}
                      onUpload={(dataUrl) =>
                        updateContent(content.id, { thumbnail: dataUrl })
                      }
                      onRemove={() =>
                        updateContent(content.id, { thumbnail: undefined })
                      }
                    />

                    {/* Champs dynamiques selon le type */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-xs font-medium text-gray-600 mb-3">
                        Statistiques
                      </h4>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {/* Vues - toujours disponible */}
                        {config?.fields.views && (
                          <div className="relative">
                            <Input
                              label="Vues"
                              type="number"
                              min="0"
                              placeholder="0"
                              value={content.views || ''}
                              onChange={(e) =>
                                updateContent(content.id, {
                                  views: e.target.value
                                    ? parseInt(e.target.value)
                                    : undefined,
                                })
                              }
                            />
                            <EyeIcon className="absolute right-3 top-9 w-4 h-4 text-gray-400" />
                          </div>
                        )}

                        {/* Likes */}
                        {config?.fields.likes && (
                          <div className="relative">
                            <Input
                              label="Likes"
                              type="number"
                              min="0"
                              placeholder="0"
                              value={content.likes || ''}
                              onChange={(e) =>
                                updateContent(content.id, {
                                  likes: e.target.value
                                    ? parseInt(e.target.value)
                                    : undefined,
                                })
                              }
                            />
                            <HeartIcon className="absolute right-3 top-9 w-4 h-4 text-gray-400" />
                          </div>
                        )}

                        {/* Commentaires */}
                        {config?.fields.comments && (
                          <div className="relative">
                            <Input
                              label="Commentaires"
                              type="number"
                              min="0"
                              placeholder="0"
                              value={content.comments || ''}
                              onChange={(e) =>
                                updateContent(content.id, {
                                  comments: e.target.value
                                    ? parseInt(e.target.value)
                                    : undefined,
                                })
                              }
                            />
                            <ChatBubbleLeftIcon className="absolute right-3 top-9 w-4 h-4 text-gray-400" />
                          </div>
                        )}

                        {/* Partages */}
                        {config?.fields.shares && (
                          <div className="relative">
                            <Input
                              label="Partages"
                              type="number"
                              min="0"
                              placeholder="0"
                              value={content.shares || ''}
                              onChange={(e) =>
                                updateContent(content.id, {
                                  shares: e.target.value
                                    ? parseInt(e.target.value)
                                    : undefined,
                                })
                              }
                            />
                            <ShareIcon className="absolute right-3 top-9 w-4 h-4 text-gray-400" />
                          </div>
                        )}

                        {/* Saves */}
                        {config?.fields.saves && (
                          <div className="relative">
                            <Input
                              label="Enregistrements"
                              type="number"
                              min="0"
                              placeholder="0"
                              value={content.saves || ''}
                              onChange={(e) =>
                                updateContent(content.id, {
                                  saves: e.target.value
                                    ? parseInt(e.target.value)
                                    : undefined,
                                })
                              }
                            />
                            <BookmarkIcon className="absolute right-3 top-9 w-4 h-4 text-gray-400" />
                          </div>
                        )}

                        {/* Budget */}
                        {config?.fields.budget && (
                          <div className="relative">
                            <Input
                              label="Budget dépensé (€)"
                              type="number"
                              min="0"
                              step="0.01"
                              placeholder="0"
                              value={content.budget || ''}
                              onChange={(e) =>
                                updateContent(content.id, {
                                  budget: e.target.value
                                    ? parseFloat(e.target.value)
                                    : undefined,
                                })
                              }
                            />
                            <CurrencyEuroIcon className="absolute right-3 top-9 w-4 h-4 text-green-500" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Notes (optionnel)
                      </label>
                      <textarea
                        placeholder="Notes sur ce contenu..."
                        value={content.notes || ''}
                        onChange={(e) =>
                          updateContent(content.id, { notes: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm"
                        rows={2}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Composant pour l'upload de visuel (compact horizontal)
function VisualUpload({
  thumbnail,
  onUpload,
  onRemove,
}: {
  thumbnail?: string;
  onUpload: (dataUrl: string) => void;
  onRemove: () => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isVideo, setIsVideo] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsVideo(file.type.startsWith('video/'));

    const reader = new FileReader();
    reader.onloadend = () => {
      onUpload(reader.result as string);
    };
    reader.readAsDataURL(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Visuel (optionnel)
      </label>

      {thumbnail ? (
        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
            {isVideo ? (
              <video src={thumbnail} className="w-full h-full object-cover" />
            ) : (
              <Image
                src={thumbnail}
                alt="Aperçu"
                fill
                className="object-cover"
              />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">
              {isVideo ? 'Vidéo' : 'Image'} importée
            </p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs text-purple-600 hover:text-purple-700"
            >
              Modifier
            </button>
          </div>
          <button
            type="button"
            onClick={onRemove}
            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center space-x-3 p-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-400 hover:bg-purple-50/50 transition-all group"
        >
          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-purple-100">
            <ArrowUpTrayIcon className="w-5 h-5 text-gray-400 group-hover:text-purple-500" />
          </div>
          <div>
            <span className="text-sm text-gray-600 group-hover:text-purple-600 font-medium">
              Importer un visuel
            </span>
            <p className="text-xs text-gray-400">Capture, image ou vidéo</p>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
