'use client';

import AnimatedAISearchDemo from '@/components/search/AnimatedAISearchDemo';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function AIDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4 mb-6">
            <Link
              href="/"
              className="flex items-center space-x-2 text-purple-600 hover:text-purple-800 transition-colors duration-300"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span className="font-medium">Retour à l'accueil</span>
            </Link>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🤖 Démonstration IA Interactive
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez comment notre IA analyse vos recherches en langage naturel 
              et détecte automatiquement les filtres pertinents en temps réel.
            </p>
          </div>
        </div>
      </div>

      {/* Demo Component */}
      <div className="py-12">
        <AnimatedAISearchDemo />
      </div>

      {/* Informations supplémentaires */}
      <div className="max-w-4xl mx-auto px-8 pb-12">
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Comment ça marche ?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✍️</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                1. Saisie Naturelle
              </h4>
              <p className="text-gray-600 text-sm">
                Décrivez ce que vous cherchez en langage naturel, comme si vous parliez à un humain.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🧠</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                2. Analyse IA
              </h4>
              <p className="text-gray-600 text-sm">
                Notre IA comprend votre demande et identifie automatiquement tous les filtres pertinents.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎯</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                3. Résultats Précis
              </h4>
              <p className="text-gray-600 text-sm">
                Obtenez instantanément des résultats ultra-précis basés sur vos critères exacts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
