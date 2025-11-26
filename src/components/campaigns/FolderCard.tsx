'use client';

import {
  FolderIcon,
  PencilIcon,
  TrashIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';
import { CampaignFolder } from '@/types';
import { useState, useRef, useEffect } from 'react';

interface FolderCardProps {
  folder: CampaignFolder;
  campaignCount: number;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function FolderCard({
  folder,
  campaignCount,
  onClick,
  onEdit,
  onDelete,
}: FolderCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fermer le menu au clic extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      className="relative bg-white/80 backdrop-blur-xl rounded-xl p-5 border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
      onClick={onClick}
    >
      {/* Menu contextuel */}
      <div className="absolute top-3 right-3" ref={menuRef}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(!showMenu);
          }}
          className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-gray-100 transition-all"
        >
          <EllipsisVerticalIcon className="w-5 h-5 text-gray-500" />
        </button>

        {showMenu && (
          <div className="absolute right-0 mt-1 w-36 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-10">
            {onEdit && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(false);
                  onEdit();
                }}
                className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <PencilIcon className="w-4 h-4" />
                <span>Modifier</span>
              </button>
            )}
            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(false);
                  onDelete();
                }}
                className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <TrashIcon className="w-4 h-4" />
                <span>Supprimer</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Contenu de la carte */}
      <div className="flex items-start space-x-4">
        {/* Icône du dossier */}
        <div
          className="p-3 rounded-xl flex-shrink-0"
          style={{
            backgroundColor: folder.color ? `${folder.color}15` : '#8B5CF615',
          }}
        >
          <FolderIcon
            className="w-6 h-6"
            style={{ color: folder.color || '#8B5CF6' }}
          />
        </div>

        {/* Informations */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">
            {folder.name}
          </h3>
          {folder.clientName && (
            <p className="text-sm text-gray-500 truncate">
              {folder.clientName}
            </p>
          )}
          {folder.description && (
            <p className="text-xs text-gray-400 mt-1 line-clamp-2">
              {folder.description}
            </p>
          )}
        </div>
      </div>

      {/* Footer avec compteur */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
        <span className="text-xs text-gray-500">
          {campaignCount} campagne{campaignCount !== 1 ? 's' : ''}
        </span>
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{
            backgroundColor: folder.color ? `${folder.color}15` : '#8B5CF615',
            color: folder.color || '#8B5CF6',
          }}
        >
          {campaignCount}
        </span>
      </div>

      {/* Barre de couleur en bas */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 rounded-b-xl"
        style={{ backgroundColor: folder.color || '#8B5CF6' }}
      />
    </div>
  );
}
