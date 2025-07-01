'use client';

import { Influencer } from '@/types';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import {
  CheckBadgeIcon,
  EnvelopeIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

interface ProfileHeaderProps {
  influencer: Influencer;
  onAddToList?: () => void;
  onContact?: () => void;
}

export default function ProfileHeader({
  influencer,
  onAddToList,
  onContact,
}: ProfileHeaderProps) {
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return '📷';
      case 'youtube':
        return '🎥';
      case 'tiktok':
        return '🎵';
      default:
        return '🌐';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return 'bg-pink-100 text-pink-800';
      case 'youtube':
        return 'bg-red-100 text-red-800';
      case 'tiktok':
        return 'bg-gray-900 text-white';
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

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-xl border border-white/20 shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
      {/* Header avec gradient moderne */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 h-32 relative overflow-hidden">
        {/* Effet glassmorphism sur le header */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
        {/* Animation shimmer */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      <div className="relative px-6 pb-6">
        {/* Avatar */}
        <div className="flex items-start justify-between -mt-16">
          <div className="flex items-end space-x-4">
            <Avatar
              src={influencer.avatar}
              name={influencer.name}
              size="3xl"
              className="border-4 border-white shadow-lg"
            />
            <div className="pb-4">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm border border-white/20 shadow-lg hover:scale-105 transition-all duration-300 ${getPlatformColor(
                  influencer.platform
                )}`}
              >
                <span className="mr-2">
                  {getPlatformIcon(influencer.platform)}
                </span>
                {influencer.platform}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3 mt-4">
            <Button
              variant="outline"
              onClick={onAddToList}
              className="flex items-center backdrop-blur-sm"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Ajouter à une liste
            </Button>
            {influencer.email && (
              <Button onClick={onContact} className="flex items-center">
                <EnvelopeIcon className="w-4 h-4 mr-2" />
                Contacter
              </Button>
            )}
          </div>
        </div>

        {/* Informations principales */}
        <div className="mt-4">
          <div className="flex items-center space-x-2 mb-2">
            <h1 className="text-2xl font-bold text-gray-900">
              {influencer.name}
            </h1>
            {influencer.verified && (
              <CheckBadgeIcon className="w-6 h-6 text-blue-500" />
            )}
          </div>

          <p className="text-lg text-gray-600 mb-2">@{influencer.username}</p>

          {influencer.bio && (
            <p className="text-gray-700 mb-4 max-w-2xl">{influencer.bio}</p>
          )}

          {/* Statistiques principales avec design moderne */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="text-center p-4 bg-blue-50/80 backdrop-blur-sm rounded-xl border border-blue-100/50 hover:bg-blue-100/80 transition-all duration-300 group">
              <div className="text-2xl font-bold text-blue-600 group-hover:scale-110 transition-transform duration-300">
                {formatNumber(influencer.followers)}
              </div>
              <div className="text-sm text-blue-600 font-medium">Followers</div>
            </div>

            <div className="text-center p-4 bg-green-50/80 backdrop-blur-sm rounded-xl border border-green-100/50 hover:bg-green-100/80 transition-all duration-300 group">
              <div className="text-2xl font-bold text-green-600 group-hover:scale-110 transition-transform duration-300">
                {influencer.engagementRate}%
              </div>
              <div className="text-sm text-green-600 font-medium">
                Engagement
              </div>
            </div>

            <div className="text-center p-4 bg-purple-50/80 backdrop-blur-sm rounded-xl border border-purple-100/50 hover:bg-purple-100/80 transition-all duration-300 group">
              <div className="text-2xl font-bold text-purple-600 group-hover:scale-110 transition-transform duration-300">
                {formatNumber(influencer.engagement)}
              </div>
              <div className="text-sm text-purple-600 font-medium">
                Interactions
              </div>
            </div>

            <div className="text-center p-4 bg-orange-50/80 backdrop-blur-sm rounded-xl border border-orange-100/50 hover:bg-orange-100/80 transition-all duration-300 group">
              <div className="text-2xl font-bold text-orange-600 group-hover:scale-110 transition-transform duration-300">
                {influencer.country}
              </div>
              <div className="text-sm text-orange-600 font-medium">Pays</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
