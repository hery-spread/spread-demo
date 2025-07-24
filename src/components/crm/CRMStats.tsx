import {
  UserGroupIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import { CRMStats as CRMStatsType } from '@/types';

interface CRMStatsProps {
  stats: CRMStatsType;
}

export default function CRMStats({ stats }: CRMStatsProps) {
  const statCards = [
    {
      name: 'Total contacts',
      value: stats.totalContacts,
      icon: UserGroupIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
    },
    {
      name: 'Contactés',
      value: stats.contacted,
      icon: EnvelopeIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      name: 'Répondu',
      value: stats.responded,
      icon: CheckCircleIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    {
      name: 'Taux de réponse',
      value: `${stats.responseRate}%`,
      icon: ChartBarIcon,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <div
            key={index}
            className={`bg-white rounded-lg p-6 shadow-sm border ${stat.borderColor} hover:shadow-md transition-shadow`}
          >
            <div className="flex items-center">
              <div
                className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}
              >
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
