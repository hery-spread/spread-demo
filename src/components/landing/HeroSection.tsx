'use client';

import { Button } from '@/components/ui/Button';
import {
  MagnifyingGlassIcon,
  ChartBarIcon,
  UserGroupIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

export default function HeroSection() {
  const handleStartTrial = () => {
    // Redirection vers l'inscription/onboarding
    window.location.href = '/onboarding';
  };

  const handleBookDemo = () => {
    // Redirection vers réservation démo
    window.location.href = '/onboarding?demo=true';
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content Left */}
          <div className="text-center lg:text-left">
            {/* Trust Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 text-sm font-medium mb-6">
              <SparklesIcon className="w-4 h-4 mr-2" />
              Rejoignez 2,847+ marketeurs qui nous font confiance
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Trouvez les
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                {' '}
                Influenceurs Parfaits{' '}
              </span>
              en 30 Secondes
            </h1>

            {/* Subheadline */}
            <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
              La première plateforme IA qui révolutionne la recherche
              d&apos;influenceurs avec des rapports d&apos;audience
              ultra-détaillés
            </p>

            {/* Benefits List */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              <div className="flex items-center">
                <MagnifyingGlassIcon className="w-5 h-5 text-purple-600 mr-3" />
                <span className="text-gray-700">
                  Recherche IA Multi-Plateformes
                </span>
              </div>
              <div className="flex items-center">
                <ChartBarIcon className="w-5 h-5 text-purple-600 mr-3" />
                <span className="text-gray-700">
                  Rapports d&apos;Audience Détaillés
                </span>
              </div>
              <div className="flex items-center">
                <UserGroupIcon className="w-5 h-5 text-purple-600 mr-3" />
                <span className="text-gray-700">CRM Intégré</span>
              </div>
              <div className="flex items-center">
                <SparklesIcon className="w-5 h-5 text-purple-600 mr-3" />
                <span className="text-gray-700">Analytics de Performance</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                onClick={handleStartTrial}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold shadow-xl shadow-purple-500/25 transform transition-all duration-300 hover:scale-105"
              >
                🚀 Essai Gratuit 14 Jours
              </Button>
              <Button
                onClick={handleBookDemo}
                variant="outline"
                size="lg"
                className="border-2 border-purple-200 text-purple-700 hover:bg-purple-50 px-8 py-4 text-lg font-semibold"
              >
                📅 Réserver une Démo
              </Button>
            </div>

            {/* Trust Indicators */}
            <p className="text-sm text-gray-500 mt-6">
              ✨ Sans engagement • 🔐 Sécurisé • 💳 Sans CB requise
            </p>
          </div>

          {/* Visual Right - Real AI Search Interface */}
          <div className="relative">
            {/* AI Search Interface Mockup */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-gray-500/20 p-6 border border-gray-200/50">
              {/* Header */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <SparklesIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Recherche IA</h4>
                  <p className="text-xs text-gray-500">
                    Langage naturel → Filtres automatiques
                  </p>
                </div>
              </div>

              {/* AI Search Input */}
              <div className="relative mb-6">
                <div className="w-full p-4 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl text-sm text-gray-700 font-medium">
                  Influenceuses beauté françaises entre 50k et 500k followers
                  sur Instagram, taux engagement &gt;4%, audience féminine 18-35
                  ans
                </div>
                <div className="absolute bottom-3 right-3 flex items-center space-x-1">
                  <SparklesIcon className="w-4 h-4 text-purple-600 animate-pulse" />
                  <span className="text-xs text-purple-600 font-medium">
                    Analyse IA
                  </span>
                </div>
              </div>

              {/* AI Analysis Results */}
              <div className="space-y-3 mb-6">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Filtres détectés automatiquement :
                </div>

                <div className="flex flex-wrap gap-2">
                  <div className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                    📍 France
                  </div>
                  <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    👥 50K-500K followers
                  </div>
                  <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    📈 +4% engagement
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <div className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-medium">
                    💄 Beauté
                  </div>
                  <div className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                    👩 Audience féminine
                  </div>
                  <div className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs font-medium">
                    🔢 18-35 ans
                  </div>
                </div>
              </div>

              {/* Search Results Preview */}
              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600">
                    Résultats trouvés
                  </span>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-600 font-medium">
                      2,847 profils
                    </span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-green-700">
                        2,847
                      </div>
                      <div className="text-xs text-green-600">Profils</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-blue-700">
                        ~156K
                      </div>
                      <div className="text-xs text-blue-600">
                        Followers moy.
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-purple-700">
                        5.2%
                      </div>
                      <div className="text-xs text-purple-600">
                        Engagement moy.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6">
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center py-3 rounded-xl font-semibold text-sm">
                  🔍 Voir les 2,847 Profils Trouvés
                </div>
              </div>
            </div>

            {/* Floating AI Elements */}
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <SparklesIcon className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
              <MagnifyingGlassIcon className="w-6 h-6 text-white" />
            </div>

            {/* Performance Badge */}
            <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-400 to-red-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              ⚡ &lt; 30s
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-20 pt-12 border-t border-gray-200">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-600">2,847+</div>
              <div className="text-gray-600">Marques clientes</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">250M+</div>
              <div className="text-gray-600">Influenceurs référencés</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">98%</div>
              <div className="text-gray-600">Taux de satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">10h</div>
              <div className="text-gray-600">Économisées par semaine</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
