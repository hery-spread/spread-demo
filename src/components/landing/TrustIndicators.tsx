'use client';

import { SparklesIcon } from '@heroicons/react/24/outline';

export default function TrustIndicators() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Final Trust Message */}
        <div className="text-center">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 text-sm font-medium">
            <SparklesIcon className="w-4 h-4 mr-2" />
            Rejoignez 400+ utilisateurs qui nous font déjà confiance
          </div>
        </div>
      </div>
    </section>
  );
}
