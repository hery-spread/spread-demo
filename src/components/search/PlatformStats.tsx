'use client';

import { getSearchStats } from '@/lib/mockData';
import { useEffect, useState } from 'react';

interface PlatformStatsProps {
  currentResults?: number;
  activePlatform?: string;
}

export default function PlatformStats({
  currentResults,
  activePlatform,
}: PlatformStatsProps) {
  const [stats, setStats] = useState<ReturnType<typeof getSearchStats> | null>(
    null
  );

  useEffect(() => {
    const searchStats = getSearchStats();
    setStats(searchStats);
  }, []);

  if (!stats) return null;

  const getPlatformName = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return 'Instagram';
      case 'youtube':
        return 'YouTube';
      case 'tiktok':
        return 'TikTok';
      default:
        return 'toutes les plateformes';
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200 p-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">
            {currentResults !== undefined
              ? currentResults.toLocaleString()
              : stats.totalInfluencers.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">
            {currentResults !== undefined ? 'Résultats' : 'Influenceurs'}
          </div>
          {activePlatform && activePlatform !== 'all' && (
            <div className="text-xs text-gray-500 mt-1">
              sur {getPlatformName(activePlatform)}
            </div>
          )}
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-pink-600">
            {stats.byPlatform.instagram?.toLocaleString() || 0}
          </div>
          <div className="text-sm text-gray-600">Instagram</div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">
            {stats.byPlatform.youtube?.toLocaleString() || 0}
          </div>
          <div className="text-sm text-gray-600">YouTube</div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {stats.byPlatform.tiktok?.toLocaleString() || 0}
          </div>
          <div className="text-sm text-gray-600">TikTok</div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-purple-200">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-gray-900">
              {stats.avgFollowers.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Followers moyens</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900">
              {stats.avgEngagement}%
            </div>
            <div className="text-sm text-gray-600">Engagement moyen</div>
          </div>
        </div>
      </div>
    </div>
  );
}
