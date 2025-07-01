'use client';

import { Button } from '@/components/ui/Button';
import { LockClosedIcon, CreditCardIcon } from '@heroicons/react/24/outline';

interface LockedContentProps {
  title: string;
  description: string;
  onUnlock: () => void;
  creditCost?: number;
  features?: string[];
}

export default function LockedContent({
  title,
  description,
  onUnlock,
  creditCost = 1,
  features = [],
}: LockedContentProps) {
  return (
    <div className="p-8 text-center">
      {/* Icône de verrouillage */}
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
        <LockClosedIcon className="w-8 h-8 text-gray-400" />
      </div>

      {/* Titre et description */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>

      {/* Fonctionnalités (si fournies) */}
      {features.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 mb-3">
            Ce qui sera débloqué :
          </h4>
          <ul className="text-sm text-gray-600 space-y-1 max-w-sm mx-auto">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span className="text-left">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Coût */}
      <div className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-50 border border-purple-200 rounded-lg mb-6">
        <CreditCardIcon className="w-4 h-4 text-purple-600" />
        <span className="text-sm font-medium text-purple-900">
          {creditCost} crédit{creditCost > 1 ? 's' : ''}
        </span>
      </div>

      {/* Bouton de déverrouillage */}
      <Button
        onClick={() => {
          console.log(
            '🔓 LockedContent - Bouton "Débloquer maintenant" cliqué'
          );
          onUnlock();
        }}
        size="lg"
      >
        <LockClosedIcon className="w-4 h-4 mr-2" />
        Débloquer maintenant
      </Button>

      {/* Note */}
      <p className="text-xs text-gray-500 mt-4">
        Les données débloquées restent accessibles en permanence
      </p>
    </div>
  );
}
