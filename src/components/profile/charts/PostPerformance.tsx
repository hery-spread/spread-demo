'use client';

import Image from 'next/image';

interface Post {
  id: string;
  type: 'image' | 'video' | 'carousel';
  thumbnail: string;
  likes: number;
  comments: number;
  engagement: number;
  date: string;
}

interface PostPerformanceProps {
  posts: Post[];
}

export default function PostPerformance({ posts }: PostPerformanceProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image':
        return '📷';
      case 'video':
        return '🎥';
      case 'carousel':
        return '📱';
      default:
        return '📄';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'image':
        return 'bg-blue-100 text-blue-800';
      case 'video':
        return 'bg-red-100 text-red-800';
      case 'carousel':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
    });
  };

  // Trier par engagement décroissant
  const sortedPosts = [...posts].sort((a, b) => b.engagement - a.engagement);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Performance des publications récentes
      </h3>

      <div className="space-y-4">
        {sortedPosts.map((post, index) => (
          <div
            key={post.id}
            className="flex items-center space-x-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {/* Rang */}
            <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full text-sm font-semibold text-gray-600">
              {index + 1}
            </div>

            {/* Thumbnail */}
            <div className="relative">
              <Image
                src={post.thumbnail}
                alt="Post thumbnail"
                width={64}
                height={64}
                className="w-16 h-16 object-cover rounded-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    `https://via.placeholder.com/64x64/6366f1/ffffff?text=${getTypeIcon(
                      post.type
                    )}`;
                }}
              />
              <div
                className={`absolute -top-1 -right-1 px-1.5 py-0.5 text-xs font-medium rounded-full ${getTypeColor(
                  post.type
                )}`}
              >
                {getTypeIcon(post.type)}
              </div>
            </div>

            {/* Métriques */}
            <div className="flex-1 grid grid-cols-4 gap-4">
              <div>
                <div className="text-sm font-semibold text-gray-900">
                  {formatNumber(post.likes)}
                </div>
                <div className="text-xs text-gray-500">Likes</div>
              </div>

              <div>
                <div className="text-sm font-semibold text-gray-900">
                  {formatNumber(post.comments)}
                </div>
                <div className="text-xs text-gray-500">Commentaires</div>
              </div>

              <div>
                <div className="text-sm font-semibold text-gray-900">
                  {post.engagement.toFixed(1)}%
                </div>
                <div className="text-xs text-gray-500">Engagement</div>
              </div>

              <div>
                <div className="text-sm font-semibold text-gray-900">
                  {formatDate(post.date)}
                </div>
                <div className="text-xs text-gray-500">Publié</div>
              </div>
            </div>

            {/* Barre d'engagement */}
            <div className="w-20">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(post.engagement * 10, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Statistiques globales */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-gray-900">
              {formatNumber(posts.reduce((sum, post) => sum + post.likes, 0))}
            </div>
            <div className="text-sm text-gray-600">Total likes</div>
          </div>

          <div>
            <div className="text-lg font-bold text-gray-900">
              {formatNumber(
                posts.reduce((sum, post) => sum + post.comments, 0)
              )}
            </div>
            <div className="text-sm text-gray-600">Total commentaires</div>
          </div>

          <div>
            <div className="text-lg font-bold text-gray-900">
              {(
                posts.reduce((sum, post) => sum + post.engagement, 0) /
                posts.length
              ).toFixed(1)}
              %
            </div>
            <div className="text-sm text-gray-600">Engagement moyen</div>
          </div>
        </div>
      </div>
    </div>
  );
}
