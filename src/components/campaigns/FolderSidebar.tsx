'use client';

import { useState } from 'react';
import {
  FolderIcon,
  FolderOpenIcon,
  ChevronRightIcon,
  PlusIcon,
  MegaphoneIcon,
} from '@heroicons/react/24/outline';
import { CampaignFolder, CampaignTracker } from '@/types';

interface FolderSidebarProps {
  folders: CampaignFolder[];
  campaigns: CampaignTracker[];
  selectedFolderId: string | null;
  onSelectFolder: (folderId: string | null) => void;
  onCreateFolder: () => void;
}

export default function FolderSidebar({
  folders,
  campaigns,
  selectedFolderId,
  onSelectFolder,
  onCreateFolder,
}: FolderSidebarProps) {
  // État pour les dossiers expandés (tous collapsés par défaut)
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set()
  );

  // Toggle l'état d'expansion d'un dossier
  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(folderId)) {
        newSet.delete(folderId);
      } else {
        newSet.add(folderId);
      }
      return newSet;
    });
  };

  // Compter les campagnes par dossier
  const getCampaignCount = (folderId: string) => {
    return campaigns.filter((c) => c.folderId === folderId).length;
  };

  // Campagnes sans dossier
  const campaignsWithoutFolder = campaigns.filter((c) => !c.folderId);

  return (
    <div className="w-64 flex-shrink-0 bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200/50">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          Organisation
        </h3>
      </div>

      {/* Liste des dossiers */}
      <div className="p-2">
        {/* Option "Toutes les campagnes" */}
        <button
          onClick={() => onSelectFolder(null)}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group ${
            selectedFolderId === null
              ? 'bg-purple-100 text-purple-900'
              : 'hover:bg-gray-100 text-gray-700'
          }`}
        >
          <div className="flex items-center space-x-3">
            <div
              className={`p-1.5 rounded-lg ${
                selectedFolderId === null
                  ? 'bg-purple-200'
                  : 'bg-gray-100 group-hover:bg-gray-200'
              }`}
            >
              <MegaphoneIcon className="w-4 h-4" />
            </div>
            <span className="font-medium text-sm">Toutes les campagnes</span>
          </div>
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              selectedFolderId === null
                ? 'bg-purple-200 text-purple-800'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {campaigns.length}
          </span>
        </button>

        {/* Séparateur */}
        <div className="my-3 border-t border-gray-200/50" />

        {/* Label dossiers */}
        <div className="px-3 py-1.5 flex items-center justify-between">
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
            Dossiers
          </span>
        </div>

        {/* Liste des dossiers */}
        <div className="space-y-1">
          {folders.map((folder) => {
            const isExpanded = expandedFolders.has(folder.id);
            const isSelected = selectedFolderId === folder.id;
            const campaignCount = getCampaignCount(folder.id);
            const folderCampaigns = campaigns.filter(
              (c) => c.folderId === folder.id
            );

            return (
              <div key={folder.id}>
                {/* Dossier principal */}
                <div
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-purple-100 text-purple-900'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                  onClick={() => onSelectFolder(folder.id)}
                >
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    {/* Chevron pour expand/collapse */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFolder(folder.id);
                      }}
                      className={`p-0.5 rounded transition-transform duration-200 ${
                        isExpanded ? 'transform rotate-90' : ''
                      }`}
                    >
                      <ChevronRightIcon className="w-3.5 h-3.5 text-gray-400" />
                    </button>

                    {/* Icône du dossier avec couleur */}
                    <div
                      className="p-1.5 rounded-lg"
                      style={{
                        backgroundColor: folder.color
                          ? `${folder.color}20`
                          : '#8B5CF620',
                      }}
                    >
                      {isExpanded ? (
                        <FolderOpenIcon
                          className="w-4 h-4"
                          style={{ color: folder.color || '#8B5CF6' }}
                        />
                      ) : (
                        <FolderIcon
                          className="w-4 h-4"
                          style={{ color: folder.color || '#8B5CF6' }}
                        />
                      )}
                    </div>

                    {/* Nom du dossier */}
                    <span className="font-medium text-sm truncate">
                      {folder.name}
                    </span>
                  </div>

                  {/* Badge compteur */}
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ml-2 ${
                      isSelected
                        ? 'bg-purple-200 text-purple-800'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {campaignCount}
                  </span>
                </div>

                {/* Liste des campagnes (si expanded) */}
                {isExpanded && folderCampaigns.length > 0 && (
                  <div className="ml-8 mt-1 space-y-0.5">
                    {folderCampaigns.map((campaign) => (
                      <div
                        key={campaign.id}
                        className="flex items-center space-x-2 px-3 py-1.5 text-xs text-gray-500 rounded-lg hover:bg-gray-50 cursor-default"
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            campaign.status === 'active'
                              ? 'bg-green-500'
                              : campaign.status === 'paused'
                                ? 'bg-orange-500'
                                : campaign.status === 'completed'
                                  ? 'bg-blue-500'
                                  : 'bg-gray-400'
                          }`}
                        />
                        <span className="truncate">{campaign.name}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Message si dossier vide et expanded */}
                {isExpanded && folderCampaigns.length === 0 && (
                  <div className="ml-8 mt-1 px-3 py-1.5 text-xs text-gray-400 italic">
                    Aucune campagne
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Campagnes sans dossier (si présentes) */}
        {campaignsWithoutFolder.length > 0 && (
          <>
            <div className="my-3 border-t border-gray-200/50" />
            <div className="px-3 py-1.5">
              <span className="text-xs font-medium text-gray-400">
                Sans dossier ({campaignsWithoutFolder.length})
              </span>
            </div>
            <div className="space-y-0.5">
              {campaignsWithoutFolder.map((campaign) => (
                <div
                  key={campaign.id}
                  className="flex items-center space-x-2 px-6 py-1.5 text-xs text-gray-500 rounded-lg hover:bg-gray-50 cursor-default"
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      campaign.status === 'active'
                        ? 'bg-green-500'
                        : campaign.status === 'paused'
                          ? 'bg-orange-500'
                          : campaign.status === 'completed'
                            ? 'bg-blue-500'
                            : 'bg-gray-400'
                    }`}
                  />
                  <span className="truncate">{campaign.name}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Séparateur avant bouton */}
        <div className="my-3 border-t border-gray-200/50" />

        {/* Bouton Nouveau dossier */}
        <button
          onClick={onCreateFolder}
          className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-purple-600 hover:bg-purple-50 transition-all duration-200 group"
        >
          <div className="p-1.5 rounded-lg bg-purple-100 group-hover:bg-purple-200 transition-colors">
            <PlusIcon className="w-4 h-4" />
          </div>
          <span className="font-medium text-sm">Nouveau dossier</span>
        </button>
      </div>
    </div>
  );
}
