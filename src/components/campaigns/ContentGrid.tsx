'use client';

import Image from 'next/image';
import {
  HeartIcon,
  ChatBubbleLeftIcon,
  EyeIcon,
  VideoCameraIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline';

export interface ContentItem {
  id: string;
  creatorName: string;
  creatorUsername: string;
  creatorAvatar: string;
  contentType: 'post' | 'story' | 'reel' | 'video';
  thumbnail: string;
  publishedAt: string;
  likes: number;
  comments: number;
  views?: number;
  url: string;
}

interface ContentGridProps {
  contents: ContentItem[];
  onContentClick?: (content: ContentItem) => void;
}

const formatNumber = (num: number) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

const getContentTypeIcon = (type: string) => {
  switch (type) {
    case 'reel':
    case 'video':
      return <VideoCameraIcon className="w-4 h-4" />;
    case 'story':
      return <PhotoIcon className="w-4 h-4" />;
    default:
      return <PhotoIcon className="w-4 h-4" />;
  }
};

const getContentTypeLabel = (type: string) => {
  switch (type) {
    case 'reel':
      return 'Reel';
    case 'video':
      return 'Vidéo';
    case 'story':
      return 'Story';
    case 'post':
      return 'Post';
    default:
      return type;
  }
};

export default function ContentGrid({
  contents,
  onContentClick,
}: ContentGridProps) {
  if (contents.length === 0) {
    return (
      <div className="col-span-full text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
        <PhotoIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 text-sm">
          Les contenus publiés s&apos;afficheront ici au fur et à mesure
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {contents.map((content) => (
        <div
          key={content.id}
          onClick={() => onContentClick?.(content)}
          className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group animate-fadeInUp"
        >
          {/* Aperçu du contenu */}
          <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
            <Image
              src={content.thumbnail}
              alt={`Contenu de ${content.creatorName}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            {/* Badge type de contenu */}
            <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1.5">
              {getContentTypeIcon(content.contentType)}
              <span>{getContentTypeLabel(content.contentType)}</span>
            </div>
          </div>

          {/* Informations du contenu */}
          <div className="p-4 space-y-3">
            {/* Créateur */}
            <div className="flex items-center space-x-2">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{
                  background:
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                }}
              >
                {content.creatorName.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  @{content.creatorUsername}
                </p>
              </div>
            </div>

            {/* Date */}
            <p className="text-xs text-gray-500">
              Publié le{' '}
              {new Date(content.publishedAt).toLocaleDateString('fr-FR')}
            </p>

            {/* Métriques */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-100">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-sm font-bold text-gray-900">
                  <HeartIcon className="w-4 h-4 text-gray-400" />
                  <span>{formatNumber(content.likes)}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Likes</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-sm font-bold text-gray-900">
                  <ChatBubbleLeftIcon className="w-4 h-4 text-gray-400" />
                  <span>{formatNumber(content.comments)}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Comm.</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-sm font-bold text-gray-900">
                  <EyeIcon className="w-4 h-4 text-gray-400" />
                  <span>
                    {content.views ? formatNumber(content.views) : '-'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Vues</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

