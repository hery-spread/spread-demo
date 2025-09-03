'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  DocumentChartBarIcon, 
  UserGroupIcon, 
  GlobeAltIcon,
  HeartIcon,
  EyeIcon,
  LockClosedIcon,
  LockOpenIcon
} from '@heroicons/react/24/outline';

export default function ReportsAnimation() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [audienceData, setAudienceData] = useState({
    demographics: { loaded: false },
    geography: { loaded: false },
    interests: { loaded: false },
    engagement: { loaded: false }
  });
  const [isAnimating, setIsAnimating] = useState(true);

  // Données de démonstration pour le rapport d'audience
  const reportData = useMemo(() => ({
    influencer: {
      name: 'Marie Beauté',
      handle: '@marie_beauty_fr',
      followers: 156000,
      platform: 'Instagram'
    },
    audience: {
      demographics: {
        age: [
          { range: '18-24', percentage: 35 },
          { range: '25-34', percentage: 42 },
          { range: '35-44', percentage: 18 },
          { range: '45+', percentage: 5 }
        ],
        gender: { female: 78, male: 22 }
      },
      geography: [
        { country: 'France', percentage: 65, flag: '🇫🇷' },
        { country: 'Belgique', percentage: 15, flag: '🇧🇪' },
        { country: 'Suisse', percentage: 12, flag: '🇨🇭' },
        { country: 'Canada', percentage: 8, flag: '🇨🇦' }
      ],
      interests: [
        { category: 'Beauté & Cosmétiques', percentage: 89 },
        { category: 'Mode & Style', percentage: 67 },
        { category: 'Lifestyle', percentage: 54 },
        { category: 'Voyage', percentage: 32 }
      ],
      engagement: {
        rate: 6.2,
        quality: 'Excellent',
        authenticity: 96
      }
    }
  }), []);

  // Animation en boucle
  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= 6) {
          // Reset après le cycle complet
          setIsUnlocked(false);
          setAudienceData({
            demographics: { loaded: false },
            geography: { loaded: false },
            interests: { loaded: false },
            engagement: { loaded: false }
          });
          return 0;
        }
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  // Gestion du déverrouillage
  useEffect(() => {
    if (currentStep === 1) {
      setIsUnlocked(true);
    } else if (currentStep === 2) {
      setAudienceData(prev => ({ ...prev, demographics: { loaded: true } }));
    } else if (currentStep === 3) {
      setAudienceData(prev => ({ ...prev, geography: { loaded: true } }));
    } else if (currentStep === 4) {
      setAudienceData(prev => ({ ...prev, interests: { loaded: true } }));
    } else if (currentStep === 5) {
      setAudienceData(prev => ({ ...prev, engagement: { loaded: true } }));
    }
  }, [currentStep]);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsAnimating(false)}
      onMouseLeave={() => setIsAnimating(true)}
    >
      {/* Interface de rapport d'audience */}
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-gray-500/20 p-6 border border-gray-200/50">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
            <DocumentChartBarIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">
              Rapport d'Audience
            </h4>
            <p className="text-xs text-gray-500">
              Analyse ultra-détaillée
            </p>
          </div>
        </div>

        {/* Profil de l'influenceur */}
        <div className="flex items-center space-x-3 mb-6 p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
            MB
          </div>
          <div>
            <div className="font-medium text-gray-900">{reportData.influencer.name}</div>
            <div className="text-sm text-gray-600">{reportData.influencer.handle}</div>
            <div className="text-xs text-gray-500">{reportData.influencer.followers.toLocaleString()} followers • {reportData.influencer.platform}</div>
          </div>
        </div>

        {/* Bouton de déverrouillage */}
        {!isUnlocked && currentStep === 0 && (
          <div className="text-center mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
            <LockClosedIcon className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-yellow-900 mb-2">Rapport d'audience verrouillé</div>
            <div className="text-xs text-yellow-700 mb-3">Débloquez pour accéder aux données détaillées</div>
            <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-yellow-600 hover:to-orange-600 transition-colors">
              🔓 Débloquer (1 crédit)
            </button>
          </div>
        )}

        {/* Animation de déverrouillage */}
        {currentStep === 1 && (
          <div className="text-center mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 animate-fadeIn">
            <LockOpenIcon className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-green-900">Rapport déverrouillé !</div>
            <div className="text-xs text-green-700">Chargement des données...</div>
          </div>
        )}

        {/* Sections du rapport */}
        <div className="space-y-4">
          {/* Démographie */}
          <div className={`p-4 rounded-xl border transition-all duration-500 ${
            audienceData.demographics.loaded 
              ? 'bg-blue-50 border-blue-200 animate-slideIn' 
              : 'bg-gray-50 border-gray-200 opacity-60'
          }`}>
            <div className="flex items-center space-x-2 mb-3">
              <UserGroupIcon className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-blue-900">Démographie</span>
              {audienceData.demographics.loaded && (
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">✓ Chargé</span>
              )}
            </div>
            {audienceData.demographics.loaded ? (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-xs text-blue-700 mb-1">Âge principal</div>
                  <div className="font-bold text-blue-900">25-34 ans (42%)</div>
                </div>
                <div>
                  <div className="text-xs text-blue-700 mb-1">Genre</div>
                  <div className="font-bold text-blue-900">78% Femmes</div>
                </div>
              </div>
            ) : (
              <div className="text-xs text-gray-500">En attente de déverrouillage...</div>
            )}
          </div>

          {/* Géographie */}
          <div className={`p-4 rounded-xl border transition-all duration-500 ${
            audienceData.geography.loaded 
              ? 'bg-green-50 border-green-200 animate-slideIn' 
              : 'bg-gray-50 border-gray-200 opacity-60'
          }`}>
            <div className="flex items-center space-x-2 mb-3">
              <GlobeAltIcon className="w-4 h-4 text-green-600" />
              <span className="font-medium text-green-900">Géographie</span>
              {audienceData.geography.loaded && (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">✓ Chargé</span>
              )}
            </div>
            {audienceData.geography.loaded ? (
              <div className="space-y-2">
                {reportData.audience.geography.slice(0, 2).map((country, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span>{country.flag}</span>
                      <span className="text-sm text-green-800">{country.country}</span>
                    </div>
                    <span className="font-bold text-green-900">{country.percentage}%</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-gray-500">En attente de déverrouillage...</div>
            )}
          </div>

          {/* Centres d'intérêt */}
          <div className={`p-4 rounded-xl border transition-all duration-500 ${
            audienceData.interests.loaded 
              ? 'bg-purple-50 border-purple-200 animate-slideIn' 
              : 'bg-gray-50 border-gray-200 opacity-60'
          }`}>
            <div className="flex items-center space-x-2 mb-3">
              <HeartIcon className="w-4 h-4 text-purple-600" />
              <span className="font-medium text-purple-900">Centres d'intérêt</span>
              {audienceData.interests.loaded && (
                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">✓ Chargé</span>
              )}
            </div>
            {audienceData.interests.loaded ? (
              <div className="space-y-2">
                {reportData.audience.interests.slice(0, 2).map((interest, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-purple-800">{interest.category}</span>
                    <span className="font-bold text-purple-900">{interest.percentage}%</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-gray-500">En attente de déverrouillage...</div>
            )}
          </div>

          {/* Engagement */}
          <div className={`p-4 rounded-xl border transition-all duration-500 ${
            audienceData.engagement.loaded 
              ? 'bg-orange-50 border-orange-200 animate-slideIn' 
              : 'bg-gray-50 border-gray-200 opacity-60'
          }`}>
            <div className="flex items-center space-x-2 mb-3">
              <EyeIcon className="w-4 h-4 text-orange-600" />
              <span className="font-medium text-orange-900">Engagement</span>
              {audienceData.engagement.loaded && (
                <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">✓ Chargé</span>
              )}
            </div>
            {audienceData.engagement.loaded ? (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-xs text-orange-700 mb-1">Taux d'engagement</div>
                  <div className="font-bold text-orange-900">{reportData.audience.engagement.rate}%</div>
                </div>
                <div>
                  <div className="text-xs text-orange-700 mb-1">Authenticité</div>
                  <div className="font-bold text-orange-900">{reportData.audience.engagement.authenticity}%</div>
                </div>
              </div>
            ) : (
              <div className="text-xs text-gray-500">En attente de déverrouillage...</div>
            )}
          </div>
        </div>

        {/* Résumé final */}
        {currentStep >= 6 && (
          <div className="mt-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 animate-fadeIn">
            <div className="text-sm font-medium text-emerald-900 mb-2">📊 Analyse complète</div>
            <div className="text-xs text-emerald-700">
              Audience qualifiée • Engagement authentique • Parfait pour votre marque
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-6">
          <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-center py-3 rounded-xl font-semibold text-sm hover:from-emerald-700 hover:to-teal-700 transition-colors duration-300">
            📈 Voir le Rapport Complet
          </button>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
        <DocumentChartBarIcon className="w-6 h-6 text-white" />
      </div>

      {/* Performance Badge */}
      <div className="absolute top-4 right-4 bg-gradient-to-r from-emerald-400 to-teal-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
        🎯 96% précision
      </div>

      {/* Styles pour les animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-slideIn {
          animation: slideIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
