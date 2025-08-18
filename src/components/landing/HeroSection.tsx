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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
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
               d&apos;influenceurs avec des rapports d&apos;audience ultra-détaillés
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

          {/* Visual Right */}
          <div className="relative">
            {/* Glass Card Mockup */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-gray-500/20 p-8 border border-gray-200/50">
              <div className="space-y-6">
                {/* Search Bar Mockup */}
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl">
                  <MagnifyingGlassIcon className="w-6 h-6 text-purple-600" />
                  <div className="flex-1 text-gray-600 text-lg">
                    &quot;Micro-influenceurs fitness France&quot;
                  </div>
                </div>

                {/* Results Mockup */}
                <div className="space-y-4">
                  {[
                    {
                      name: '@fitcoach_marie',
                      followers: '45.2K',
                      engagement: '4.8%',
                    },
                    {
                      name: '@healthy_lucas',
                      followers: '32.1K',
                      engagement: '5.2%',
                    },
                    {
                      name: '@yoga_emma',
                      followers: '28.5K',
                      engagement: '6.1%',
                    },
                  ].map((influencer, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-full"></div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            {influencer.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {influencer.followers} followers
                          </div>
                        </div>
                      </div>
                      <div className="text-green-600 font-bold">
                        {influencer.engagement}
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA in mockup */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center py-3 rounded-xl font-semibold">
                    🔓 Débloquer les Rapports d&apos;Audience
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
              <ChartBarIcon className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
              <UserGroupIcon className="w-8 h-8 text-white" />
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
              <div className="text-3xl font-bold text-purple-600">1.2M+</div>
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
