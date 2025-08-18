'use client';

import React, { useState, useEffect } from 'react';
import { SparklesIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface DetectedFilter {
  id: string;
  label: string;
  value: string;
  icon: string;
  delay: number;
}

interface SearchResults {
  profiles: number;
  avgFollowers: string;
  avgEngagement: string;
}

export default function AnimatedAISearchDemo() {
  const [currentText, setCurrentText] = useState('');
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [detectedFilters, setDetectedFilters] = useState<DetectedFilter[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [currentResults, setCurrentResults] = useState<SearchResults>({
    profiles: 0,
    avgFollowers: '0K',
    avgEngagement: '0%',
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [pulseIndex, setPulseIndex] = useState(0);

  const targetText =
    'Influenceuses beauté françaises entre 50k et 500k followers sur Instagram, taux engagement >4%, audience féminine 18-35 ans';

  const filters: DetectedFilter[] = [
    {
      id: 'location',
      label: '📍 France',
      value: 'France',
      icon: '🇫🇷',
      delay: 200,
    },
    {
      id: 'followers',
      label: '👥 50K-500K followers',
      value: '50K-500K',
      icon: '📊',
      delay: 400,
    },
    {
      id: 'engagement',
      label: '📈 +4% engagement',
      value: '>4%',
      icon: '⚡',
      delay: 600,
    },
    {
      id: 'category',
      label: '💄 Beauté',
      value: 'Beauté',
      icon: '✨',
      delay: 800,
    },
    {
      id: 'audience',
      label: '👩 Audience féminine',
      value: 'Féminine',
      icon: '💗',
      delay: 1000,
    },
    {
      id: 'age',
      label: '🔢 18-35 ans',
      value: '18-35',
      icon: '🎯',
      delay: 1200,
    },
  ];

  const finalResults: SearchResults = {
    profiles: 2847,
    avgFollowers: '~156K',
    avgEngagement: '5.2%',
  };

  // Effect de frappe pour le texte
  useEffect(() => {
    if (currentText.length < targetText.length) {
      const timer = setTimeout(
        () => {
          setCurrentText(targetText.slice(0, currentText.length + 1));
        },
        50 + Math.random() * 30
      ); // Vitesse variable pour plus de réalisme
      return () => clearTimeout(timer);
    } else if (currentText.length === targetText.length && !showAnalysis) {
      // Démarrer l'analyse après la frappe
      setTimeout(() => {
        setShowAnalysis(true);
        setIsAnalyzing(true);
      }, 800);
    }
  }, [currentText, targetText, showAnalysis]);

  // Animation des filtres détectés
  useEffect(() => {
    if (showAnalysis && isAnalyzing) {
      filters.forEach((filter, index) => {
        setTimeout(() => {
          setDetectedFilters((prev) => [...prev, filter]);
          if (index === filters.length - 1) {
            // Derniers filtres détectés, lancer la recherche
            setTimeout(() => {
              setIsAnalyzing(false);
              setShowResults(true);
            }, 500);
          }
        }, filter.delay);
      });
    }
  }, [showAnalysis, isAnalyzing]);

  // Animation du compteur de résultats
  useEffect(() => {
    if (showResults) {
      // Animation du nombre de profils
      let current = 0;
      const increment = finalResults.profiles / 30;
      const profileTimer = setInterval(() => {
        current += increment;
        if (current >= finalResults.profiles) {
          setCurrentResults((prev) => ({
            ...prev,
            profiles: finalResults.profiles,
            avgFollowers: finalResults.avgFollowers,
            avgEngagement: finalResults.avgEngagement,
          }));
          clearInterval(profileTimer);
        } else {
          setCurrentResults((prev) => ({
            ...prev,
            profiles: Math.floor(current),
          }));
        }
      }, 50);

      return () => clearInterval(profileTimer);
    }
  }, [showResults, finalResults]);

  // Animation des points de chargement
  useEffect(() => {
    if (isAnalyzing) {
      const pulseTimer = setInterval(() => {
        setPulseIndex((prev) => (prev + 1) % 3);
      }, 500);
      return () => clearInterval(pulseTimer);
    }
  }, [isAnalyzing]);

  const resetDemo = () => {
    setCurrentText('');
    setShowAnalysis(false);
    setDetectedFilters([]);
    setShowResults(false);
    setCurrentResults({ profiles: 0, avgFollowers: '0K', avgEngagement: '0%' });
    setIsAnalyzing(false);
    setPulseIndex(0);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      {/* Header avec bouton reset */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            🤖 Recherche IA Interactive
          </h2>
          <p className="text-gray-600">
            Regardez l'IA analyser votre recherche en temps réel
          </p>
        </div>
        <button
          onClick={resetDemo}
          className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors duration-300 flex items-center space-x-2"
        >
          <span>🔄</span>
          <span>Relancer</span>
        </button>
      </div>

      {/* Section de recherche */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
            <MagnifyingGlassIcon className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Recherche IA</h3>
            <p className="text-sm text-gray-600">
              Langage naturel → Filtres automatiques
            </p>
          </div>
        </div>

        {/* Zone de texte avec effet de frappe */}
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="min-h-[60px] text-gray-800">
            {currentText}
            {currentText.length < targetText.length && (
              <span className="animate-pulse bg-purple-500 w-0.5 h-5 inline-block ml-1"></span>
            )}
          </div>
        </div>
      </div>

      {/* Section d'analyse IA */}
      {showAnalysis && (
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg animate-fadeIn">
          <div className="flex items-center space-x-3 mb-6">
            <SparklesIcon
              className={`w-6 h-6 text-purple-600 ${isAnalyzing ? 'animate-spin' : ''}`}
            />
            <h3 className="font-semibold text-gray-900">
              {isAnalyzing ? 'Analyse IA en cours' : 'Analyse IA'}
            </h3>
            {isAnalyzing && (
              <div className="flex space-x-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 bg-purple-600 rounded-full transition-all duration-300 ${
                      pulseIndex === i
                        ? 'scale-125 opacity-100'
                        : 'scale-75 opacity-40'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Filtres détectés automatiquement */}
          <div>
            <p className="text-sm text-gray-600 mb-4">
              Filtres détectés automatiquement :
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {detectedFilters.map((filter, index) => (
                <div
                  key={filter.id}
                  className="flex items-center space-x-2 bg-purple-50 rounded-xl px-3 py-2 animate-slideInUp"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: 'both',
                  }}
                >
                  <span className="text-lg">{filter.icon}</span>
                  <span className="text-sm font-medium text-purple-700">
                    {filter.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Section des résultats */}
      {showResults && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 animate-fadeIn">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <span className="text-green-600 text-lg">🎯</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Résultats trouvés</h3>
              <p className="text-sm text-gray-600">
                Recherche terminée avec succès
              </p>
            </div>
          </div>

          {/* Métriques animées */}
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2 animate-countUp">
                {currentResults.profiles.toLocaleString()}
              </div>
              <div className="text-sm font-medium text-gray-700">Profils</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {currentResults.avgFollowers}
              </div>
              <div className="text-sm font-medium text-gray-700">
                Followers moy.
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {currentResults.avgEngagement}
              </div>
              <div className="text-sm font-medium text-gray-700">
                Engagement moy.
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-6 text-center">
            <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 mx-auto">
              <span>🔍</span>
              <span>
                Voir les {currentResults.profiles.toLocaleString()} Profils
                Trouvés
              </span>
            </button>
          </div>
        </div>
      )}

      {/* CSS pour les animations personnalisées */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes countUp {
          from {
            transform: scale(0.5);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-slideInUp {
          animation: slideInUp 0.5s ease-out;
        }

        .animate-countUp {
          animation: countUp 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
