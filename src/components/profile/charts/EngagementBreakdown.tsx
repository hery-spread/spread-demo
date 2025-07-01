'use client';

interface EngagementBreakdownProps {
  data: {
    likes: number;
    comments: number;
    shares: number;
    saves: number;
  };
  totalEngagement: number;
}

export default function EngagementBreakdown({
  data,
  totalEngagement,
}: EngagementBreakdownProps) {
  const engagementTypes = [
    { key: 'likes', label: 'Likes', icon: '❤️', color: 'bg-red-500' },
    {
      key: 'comments',
      label: 'Commentaires',
      icon: '💬',
      color: 'bg-blue-500',
    },
    { key: 'shares', label: 'Partages', icon: '📤', color: 'bg-green-500' },
    { key: 'saves', label: 'Sauvegardes', icon: '🔖', color: 'bg-purple-500' },
  ] as const;

  const calculatePercentage = (value: number) => {
    return ((value / totalEngagement) * 100).toFixed(1);
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
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Répartition de l&apos;engagement
      </h3>

      {/* Graphique en barres empilées */}
      <div className="mb-6">
        <div className="flex rounded-lg overflow-hidden h-4">
          {engagementTypes.map((type) => {
            const percentage = parseFloat(calculatePercentage(data[type.key]));
            return (
              <div
                key={type.key}
                className={type.color}
                style={{ width: `${percentage}%` }}
                title={`${type.label}: ${formatNumber(
                  data[type.key]
                )} (${percentage}%)`}
              />
            );
          })}
        </div>
      </div>

      {/* Détails par type */}
      <div className="grid grid-cols-2 gap-4">
        {engagementTypes.map((type) => {
          const value = data[type.key];
          const percentage = calculatePercentage(value);

          return (
            <div
              key={type.key}
              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">{type.icon}</span>
                <div className={`w-3 h-3 rounded-full ${type.color}`}></div>
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {type.label}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {percentage}%
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  {formatNumber(value)} interactions
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Total */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-900">
            Total des interactions
          </span>
          <span className="text-lg font-bold text-gray-900">
            {formatNumber(totalEngagement)}
          </span>
        </div>
      </div>
    </div>
  );
}
