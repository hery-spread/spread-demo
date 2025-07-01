'use client';

import { UserAccount } from '@/types';
import {
  CreditCardIcon,
  CalendarIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';

interface SubscriptionCardProps {
  account: UserAccount;
}

export default function SubscriptionCard({ account }: SubscriptionCardProps) {
  const renewalDate = new Date(account.plan.renewalDate);
  const daysUntilRenewal = Math.ceil(
    (renewalDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const getRenewalStatus = () => {
    if (daysUntilRenewal <= 7) {
      return {
        color: 'text-red-600',
        bg: 'bg-red-50',
        text: 'Renouvellement imminent',
      };
    } else if (daysUntilRenewal <= 30) {
      return {
        color: 'text-orange-600',
        bg: 'bg-orange-50',
        text: 'Renouvellement proche',
      };
    }
    return {
      color: 'text-green-600',
      bg: 'bg-green-50',
      text: 'Abonnement actif',
    };
  };

  const status = getRenewalStatus();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Mon Abonnement</h3>
        <div
          className={`px-3 py-1 rounded-full text-sm font-medium ${status.color} ${status.bg}`}
        >
          {status.text}
        </div>
      </div>

      <div className="space-y-4">
        {/* Plan actuel */}
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-50 rounded-lg">
            <CreditCardIcon className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              {account.plan.name}
            </p>
            <p className="text-sm text-gray-500">
              {account.plan.price.monthly}€/mois
            </p>
          </div>
        </div>

        {/* Date de renouvellement */}
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <CalendarIcon className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              Renouvellement le {renewalDate.toLocaleDateString('fr-FR')}
            </p>
            <p className="text-sm text-gray-500">
              Dans {daysUntilRenewal} jour{daysUntilRenewal > 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Fonctionnalités incluses */}
        <div className="pt-4 border-t border-gray-100">
          <h4 className="text-sm font-medium text-gray-900 mb-3">
            Fonctionnalités incluses
          </h4>
          <div className="space-y-2">
            {account.plan.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <CheckIcon className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-600">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-gray-100 flex space-x-3">
          <button className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors">
            Gérer l&apos;abonnement
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
            Facturation
          </button>
        </div>
      </div>
    </div>
  );
}
