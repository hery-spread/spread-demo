'use client';

type ProfileTab = 'overview' | 'audience' | 'content' | 'contact';

interface ProfileTabsProps {
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
  hasDetailedData: boolean;
}

export default function ProfileTabs({
  activeTab,
  onTabChange,
  hasDetailedData,
}: ProfileTabsProps) {
  const tabs = [
    {
      id: 'overview' as ProfileTab,
      name: "Vue d'ensemble",
      icon: '📊',
      available: true,
    },
    {
      id: 'audience' as ProfileTab,
      name: 'Audience',
      icon: '👥',
      available: hasDetailedData,
    },
    {
      id: 'content' as ProfileTab,
      name: 'Contenu',
      icon: '📱',
      available: hasDetailedData,
    },
    {
      id: 'contact' as ProfileTab,
      name: 'Contact',
      icon: '📧',
      available: true,
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const isDisabled = !tab.available;

            return (
              <button
                key={tab.id}
                onClick={() => tab.available && onTabChange(tab.id)}
                disabled={isDisabled}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  isActive
                    ? 'border-purple-500 text-purple-600'
                    : isDisabled
                      ? 'border-transparent text-gray-400 cursor-not-allowed'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
                {isDisabled && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-500">
                    🔒
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
