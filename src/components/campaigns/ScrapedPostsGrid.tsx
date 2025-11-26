'use client';

import Image from 'next/image';
import {
  CheckIcon,
  EyeIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  BookmarkIcon,
  PlayIcon,
  PhotoIcon,
  VideoCameraIcon,
  HashtagIcon,
  AtSymbolIcon,
} from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { ApifyScrapedPost } from '@/types';

interface ScrapedPostsGridProps {
  posts: ApifyScrapedPost[];
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
}

// Formater les nombres
const formatNumber = (num: number): string => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

// Formater la date relative
const formatRelativeDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Aujourd'hui";
  if (diffDays === 1) return 'Hier';
  if (diffDays < 7) return `Il y a ${diffDays} jours`;
  if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} sem.`;
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
};

// Icône du type de contenu
const getTypeIcon = (type: string) => {
  switch (type) {
    case 'reel':
    case 'video':
      return <VideoCameraIcon className="w-3.5 h-3.5" />;
    case 'short':
      return <PlayIcon className="w-3.5 h-3.5" />;
    default:
      return <PhotoIcon className="w-3.5 h-3.5" />;
  }
};

export default function ScrapedPostsGrid({
  posts,
  selectedIds,
  onSelectionChange,
}: ScrapedPostsGridProps) {
  // Toggle la sélection d'un post
  const toggleSelection = (postId: string) => {
    if (selectedIds.includes(postId)) {
      onSelectionChange(selectedIds.filter((id) => id !== postId));
    } else {
      onSelectionChange([...selectedIds, postId]);
    }
  };

  // Sélectionner/désélectionner tous
  const toggleAll = () => {
    if (selectedIds.length === posts.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(posts.map((p) => p.id));
    }
  };

  return (
    <div className="space-y-3">
      {/* Header avec sélection globale */}
      <div className="flex items-center justify-between px-1">
        <button
          type="button"
          onClick={toggleAll}
          className="flex items-center space-x-2 text-sm text-purple-600 hover:text-purple-700 transition-colors"
        >
          <div
            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
              selectedIds.length === posts.length
                ? 'bg-purple-600 border-purple-600'
                : 'border-gray-300 hover:border-purple-400'
            }`}
          >
            {selectedIds.length === posts.length && (
              <CheckIcon className="w-3 h-3 text-white" />
            )}
          </div>
          <span>
            {selectedIds.length === posts.length
              ? 'Tout désélectionner'
              : 'Tout sélectionner'}
          </span>
        </button>

        <span className="text-sm text-gray-500">
          {selectedIds.length} / {posts.length} sélectionné
          {selectedIds.length > 1 ? 's' : ''}
        </span>
      </div>

      {/* Grid de posts */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto pr-1">
        {posts.map((post) => {
          const isSelected = selectedIds.includes(post.id);

          return (
            <div
              key={post.id}
              onClick={() => toggleSelection(post.id)}
              className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-200 group ${
                isSelected
                  ? 'ring-2 ring-purple-500 ring-offset-2'
                  : 'hover:ring-2 hover:ring-gray-300 hover:ring-offset-1'
              }`}
            >
              {/* Thumbnail */}
              <div className="relative aspect-square bg-gray-100">
                <Image
                  src={post.thumbnail}
                  alt={post.caption.slice(0, 50)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Badge type */}
                <div className="absolute top-2 left-2 flex items-center space-x-1.5">
                  <span className="flex items-center space-x-1 px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                    {getTypeIcon(post.type)}
                    <span className="capitalize">{post.type}</span>
                  </span>
                </div>

                {/* Badge matched filter */}
                <div className="absolute top-2 right-2">
                  <span
                    className={`flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full ${
                      post.matchType === 'hashtag'
                        ? 'bg-blue-500/90 text-white'
                        : 'bg-purple-500/90 text-white'
                    }`}
                  >
                    {post.matchType === 'hashtag' ? (
                      <HashtagIcon className="w-3 h-3" />
                    ) : (
                      <AtSymbolIcon className="w-3 h-3" />
                    )}
                    <span>{post.matchedFilter.slice(1)}</span>
                  </span>
                </div>

                {/* Checkbox de sélection */}
                <div className="absolute top-2 left-2 mt-8">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-purple-600'
                        : 'bg-white/20 backdrop-blur-sm group-hover:bg-white/40'
                    }`}
                  >
                    {isSelected ? (
                      <CheckCircleIcon className="w-6 h-6 text-white" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-white" />
                    )}
                  </div>
                </div>

                {/* Stats overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  {/* Username */}
                  <div className="flex items-center space-x-2 mb-2">
                    {post.userAvatar && (
                      <Image
                        src={post.userAvatar}
                        alt={post.username}
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                    )}
                    <span className="text-white text-xs font-medium">
                      @{post.username}
                    </span>
                    <span className="text-white/60 text-xs">
                      · {formatRelativeDate(post.publishedAt)}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center space-x-3 text-white text-xs">
                    {post.views !== undefined && (
                      <span className="flex items-center space-x-1">
                        <EyeIcon className="w-3.5 h-3.5" />
                        <span>{formatNumber(post.views)}</span>
                      </span>
                    )}
                    <span className="flex items-center space-x-1">
                      <HeartIcon className="w-3.5 h-3.5" />
                      <span>{formatNumber(post.likes)}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <ChatBubbleLeftIcon className="w-3.5 h-3.5" />
                      <span>{formatNumber(post.comments)}</span>
                    </span>
                    {post.shares !== undefined && (
                      <span className="flex items-center space-x-1">
                        <ShareIcon className="w-3.5 h-3.5" />
                        <span>{formatNumber(post.shares)}</span>
                      </span>
                    )}
                    {post.saves !== undefined && (
                      <span className="flex items-center space-x-1">
                        <BookmarkIcon className="w-3.5 h-3.5" />
                        <span>{formatNumber(post.saves)}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Caption preview (hover) */}
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-4">
                <p className="text-white text-xs line-clamp-6 text-center">
                  {post.caption}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Résumé de la sélection */}
      {selectedIds.length > 0 && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-purple-700">
              <strong>{selectedIds.length}</strong> contenu
              {selectedIds.length > 1 ? 's' : ''} prêt
              {selectedIds.length > 1 ? 's' : ''} à être importé
              {selectedIds.length > 1 ? 's' : ''}
            </p>
            <div className="flex items-center space-x-4 text-xs text-purple-600">
              <span>
                ❤️{' '}
                {formatNumber(
                  posts
                    .filter((p) => selectedIds.includes(p.id))
                    .reduce((sum, p) => sum + p.likes, 0)
                )}{' '}
                likes
              </span>
              <span>
                💬{' '}
                {formatNumber(
                  posts
                    .filter((p) => selectedIds.includes(p.id))
                    .reduce((sum, p) => sum + p.comments, 0)
                )}{' '}
                comments
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
