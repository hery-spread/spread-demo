'use client';

import { UserAccount } from '@/types';

interface UsageSummaryProps {
  account: UserAccount;
  searchesThisMonth: number;
}

export default function UsageSummary({
  account,
  searchesThisMonth,
}: UsageSummaryProps) {
  const profilesPercentage = Math.round(
    (account.plan.limits.profiles.used / account.plan.limits.profiles.total) *
      100
  );

  const usersPercentage = Math.round(
    (account.plan.limits.users.used / account.plan.limits.users.total) * 100
  );

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 75) return 'text-orange-600';
    return 'text-green-600';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Résumé d&apos;utilisation
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Recherches */}
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {searchesThisMonth}
          </div>
          <div className="text-sm text-blue-600 font-medium">Recherches</div>
          <div className="text-xs text-gray-500 mt-1">ce mois-ci</div>
        </div>

        {/* Profils */}
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <div
            className={`text-2xl font-bold mb-1 ${getUsageColor(
              profilesPercentage
            )}`}
          >
            {profilesPercentage}%
          </div>
          <div className="text-sm text-purple-600 font-medium">Profils</div>
          <div className="text-xs text-gray-500 mt-1">
            {account.plan.limits.profiles.used}/
            {account.plan.limits.profiles.total} utilisés
          </div>
        </div>

        {/* Utilisateurs */}
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div
            className={`text-2xl font-bold mb-1 ${getUsageColor(
              usersPercentage
            )}`}
          >
            {account.plan.limits.users.used}/{account.plan.limits.users.total}
          </div>
          <div className="text-sm text-green-600 font-medium">Utilisateurs</div>
          <div className="text-xs text-gray-500 mt-1">équipe</div>
        </div>
      </div>

      {/* Alertes d'utilisation */}
      {(profilesPercentage >= 80 || usersPercentage >= 80) && (
        <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <div className="w-5 h-5 text-orange-500 mt-0.5">⚠️</div>
            <div>
              <p className="text-sm font-medium text-orange-800">
                Attention à votre consommation
              </p>
              <p className="text-sm text-orange-700">
                {profilesPercentage >= 80 &&
                  'Vous approchez de la limite de profils consultés. '}
                {usersPercentage >= 80 &&
                  'Vous approchez de la limite d&apos;utilisateurs. '}
                Considérez une mise à niveau de votre plan.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
