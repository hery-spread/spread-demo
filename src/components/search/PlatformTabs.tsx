'use client';

type Platform = 'all' | 'instagram' | 'youtube' | 'tiktok';

interface PlatformTabsProps {
  activePlatform: Platform;
  onPlatformChange: (platform: Platform) => void;
  counts?: {
    all: number;
    instagram: number;
    youtube: number;
    tiktok: number;
  };
}

export default function PlatformTabs({
  activePlatform,
  onPlatformChange,
  counts,
}: PlatformTabsProps) {
  const platforms = [
    {
      id: 'all' as Platform,
      name: 'Tous',
      icon: '🌐',
      color: 'text-gray-600 border-gray-300',
      activeColor: 'text-purple-600 border-purple-600 bg-purple-50',
    },
    {
      id: 'instagram' as Platform,
      name: 'Instagram',
      icon: '📷',
      color: 'text-pink-600 border-pink-300',
      activeColor: 'text-pink-600 border-pink-600 bg-pink-50',
    },
    {
      id: 'youtube' as Platform,
      name: 'YouTube',
      icon: '🎥',
      color: 'text-red-600 border-red-300',
      activeColor: 'text-red-600 border-red-600 bg-red-50',
    },
    {
      id: 'tiktok' as Platform,
      name: 'TikTok',
      icon: '🎵',
      color: 'text-gray-900 border-gray-300',
      activeColor: 'text-gray-900 border-gray-900 bg-gray-50',
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center space-x-1 overflow-x-auto">
        {platforms.map((platform) => {
          const isActive = activePlatform === platform.id;
          const count = counts?.[platform.id] || 0;

          return (
            <button
              key={platform.id}
              onClick={() => onPlatformChange(platform.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all duration-200 whitespace-nowrap ${
                isActive
                  ? platform.activeColor
                  : `${platform.color} hover:bg-gray-50`
              }`}
            >
              <span className="text-lg">{platform.icon}</span>
              <span className="font-medium">{platform.name}</span>
              {counts && (
                <span
                  className={`text-sm px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-white/80' : 'bg-gray-100'
                  }`}
                >
                  {count.toLocaleString()}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
