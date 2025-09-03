'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { SparklesIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { SparklesIcon as SparklesIconSolid } from '@heroicons/react/24/solid';

export default function AISearchPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsAnalyzing(true);

    // Simuler l'analyse IA
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Stocker la recherche dans sessionStorage
    sessionStorage.setItem('aiSearchQuery', searchQuery.trim());

    setIsAnalyzing(false);

    // Rediriger vers l'onboarding
    router.push('/onboarding');
  };

  return (
    <div className="flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <SparklesIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Recherche IA d'Influenceurs
          </h1>
          <p className="text-xl text-gray-600 max-w-lg mx-auto">
            Décrivez le profil d'influenceur que vous recherchez en langage
            naturel
          </p>
        </div>

        {/* Search Interface */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-200/50">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <MagnifyingGlassIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Recherche Intelligente
              </h2>
              <p className="text-sm text-gray-600">
                L'IA analysera votre description pour trouver les meilleurs
                profils
              </p>
            </div>
          </div>

          {/* Textarea */}
          <div className="space-y-6">
            <div className="relative">
              <textarea
                placeholder='Exemple : "Influenceuses beauté françaises entre 50k et 500k followers sur Instagram, taux engagement >4%, audience féminine 18-35 ans"'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-base leading-relaxed min-h-[120px]"
                rows={5}
              />

              {/* Character count */}
              <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                {searchQuery.length}/500
              </div>
            </div>

            {/* Example suggestions */}
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm font-medium text-gray-700 mb-3">
                💡 Exemples de recherches :
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <button
                  onClick={() =>
                    setSearchQuery(
                      'Influenceurs gaming masculins européens YouTube +100k abonnés esport'
                    )
                  }
                  className="text-left p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all text-gray-600 hover:text-gray-900"
                >
                  🎮 Gaming & Esport
                </button>
                <button
                  onClick={() =>
                    setSearchQuery(
                      'Influenceuses lifestyle italiennes TikTok 25k-200k followers voyage food engagement >6%'
                    )
                  }
                  className="text-left p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all text-gray-600 hover:text-gray-900"
                >
                  ✈️ Voyage & Food
                </button>
                <button
                  onClick={() =>
                    setSearchQuery(
                      'Micro-influenceuses mode allemandes Instagram 10k-50k followers audience premium posts sponsorisés'
                    )
                  }
                  className="text-left p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all text-gray-600 hover:text-gray-900"
                >
                  👗 Mode Premium
                </button>
                <button
                  onClick={() =>
                    setSearchQuery(
                      'Créateurs fitness francophones multi-plateformes +75k followers musculation nutrition audience masculine'
                    )
                  }
                  className="text-left p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all text-gray-600 hover:text-gray-900"
                >
                  💪 Fitness & Sport
                </button>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              onClick={handleSearch}
              disabled={!searchQuery.trim() || isAnalyzing}
              size="lg"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-4 text-lg font-semibold shadow-xl shadow-purple-500/25 transform transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isAnalyzing ? (
                <div className="flex items-center justify-center space-x-3">
                  <SparklesIconSolid className="w-6 h-6 animate-spin" />
                  <span>Analyse IA en cours...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-3">
                  <SparklesIcon className="w-6 h-6" />
                  <span>Lancer la Recherche IA</span>
                </div>
              )}
            </Button>

            {/* Info */}
            <div className="text-center">
              <p className="text-sm text-gray-500">
                ✨ L'IA analysera automatiquement votre recherche et vous
                guidera vers les meilleurs profils
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-400">
            Déjà inscrit ?{' '}
            <a
              href="/search"
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Accéder à la recherche avancée
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
