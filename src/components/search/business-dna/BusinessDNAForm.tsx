'use client';

import { useState } from 'react';
import { BusinessDNA } from '@/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  GlobeAltIcon,
  SparklesIcon,
  CheckCircleIcon,
  TagIcon,
  UserGroupIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';

interface BusinessDNAFormProps {
  onAnalyze: (url: string) => Promise<BusinessDNA>;
  onSaveDNA: (dna: BusinessDNA) => void;
  onSearchWithDNA: (dna: BusinessDNA) => void;
  initialDNA?: BusinessDNA | null;
}

export default function BusinessDNAForm({
  onAnalyze,
  onSaveDNA,
  onSearchWithDNA,
  initialDNA,
}: BusinessDNAFormProps) {
  const [url, setUrl] = useState(initialDNA?.websiteUrl || '');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzedDNA, setAnalyzedDNA] = useState<BusinessDNA | null>(
    initialDNA || null
  );
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!url.trim()) {
      setError('Veuillez entrer une URL');
      return;
    }

    // Validation basique de l'URL
    let validUrl = url.trim();
    if (!validUrl.startsWith('http://') && !validUrl.startsWith('https://')) {
      validUrl = 'https://' + validUrl;
    }

    try {
      new URL(validUrl);
    } catch {
      setError("L'URL n'est pas valide");
      return;
    }

    setError(null);
    setIsAnalyzing(true);
    setAnalyzedDNA(null);

    try {
      const result = await onAnalyze(validUrl);
      setAnalyzedDNA(result);
    } catch (err) {
      console.error("Erreur lors de l'analyse:", err);
      setError("Erreur lors de l'analyse du site web");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSaveAndSearch = () => {
    if (analyzedDNA) {
      onSaveDNA(analyzedDNA);
      onSearchWithDNA(analyzedDNA);
    }
  };

  return (
    <div className="space-y-6">
      {/* Formulaire d'URL */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 shadow-sm">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <GlobeAltIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Analyser un site web
            </h2>
            <p className="text-sm text-gray-500">
              Entrez l&apos;URL pour extraire l&apos;ADN business
            </p>
          </div>
        </div>

        <div className="flex space-x-3">
          <div className="flex-1">
            <Input
              type="url"
              placeholder="https://www.example.com"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setError(null);
              }}
              className="w-full"
              disabled={isAnalyzing}
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !url.trim()}
            className="flex items-center space-x-2"
          >
            {isAnalyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Analyse...</span>
              </>
            ) : (
              <>
                <SparklesIcon className="w-5 h-5" />
                <span>Analyser</span>
              </>
            )}
          </Button>
        </div>

        {/* Animation de chargement */}
        {isAnalyzing && (
          <div className="mt-6 p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200/30">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-purple-200 border-t-purple-600 animate-spin" />
                <SparklesIcon className="w-6 h-6 text-purple-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  Analyse IA en cours...
                </p>
                <p className="text-sm text-gray-600">
                  Extraction des mots-clés, catégories et audience cible
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="flex space-x-1">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-purple-600">
                    Cela peut prendre quelques secondes
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Résultat de l'analyse */}
      {analyzedDNA && !isAnalyzing && (
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Analyse terminée !
              </h2>
              <p className="text-sm text-gray-500">
                Business DNA extrait avec succès
              </p>
            </div>
          </div>

          {/* Informations du DNA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Colonne gauche */}
            <div className="space-y-4">
              {/* En-tête avec logo */}
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                {analyzedDNA.logoUrl && (
                  <img
                    src={analyzedDNA.logoUrl}
                    alt={analyzedDNA.name}
                    className="w-12 h-12 rounded-lg"
                  />
                )}
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {analyzedDNA.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {analyzedDNA.websiteUrl}
                  </p>
                </div>
              </div>

              {/* Catégories */}
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <TagIcon className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Catégories
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {analyzedDNA.categories.map((category) => (
                    <span
                      key={category}
                      className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mots-clés */}
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <SparklesIcon className="w-4 h-4 text-indigo-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Mots-clés extraits
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {analyzedDNA.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-sm rounded-lg border border-indigo-200"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Colonne droite */}
            <div className="space-y-4">
              {/* Audience cible */}
              <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200/30">
                <div className="flex items-center space-x-2 mb-3">
                  <UserGroupIcon className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Audience cible
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tranche d&apos;âge</span>
                    <span className="font-medium text-gray-900">
                      {analyzedDNA.targetAudience.ageRange} ans
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Genre</span>
                    <span className="font-medium text-gray-900">
                      {analyzedDNA.targetAudience.gender}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Intérêts</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {analyzedDNA.targetAudience.interests.map((interest) => (
                        <span
                          key={interest}
                          className="px-2 py-0.5 bg-white/70 text-blue-700 text-xs rounded-full"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Types de créateurs suggérés */}
              <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200/30">
                <div className="flex items-center space-x-2 mb-3">
                  <AcademicCapIcon className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Types de créateurs suggérés
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {analyzedDNA.suggestedCreatorTypes.map((type) => (
                    <span
                      key={type}
                      className="px-2.5 py-1 bg-white/70 text-green-700 text-sm rounded-lg border border-green-200"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
            <Button variant="outline" onClick={() => onSaveDNA(analyzedDNA)}>
              Sauvegarder
            </Button>
            <Button
              onClick={handleSaveAndSearch}
              className="flex items-center space-x-2"
            >
              <SparklesIcon className="w-5 h-5" />
              <span>Lancer la recherche</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
