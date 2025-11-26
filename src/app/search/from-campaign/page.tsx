'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  CampaignTracker,
  CampaignCreatorScore,
  SimilarCreatorResult,
} from '@/types';
import {
  getAdvancedCampaigns,
  getTopPerformersFromCampaign,
  findSimilarCreators,
} from '@/lib/mockData';
import SearchModeSelector from '@/components/search/SearchModeSelector';
import CampaignSelector from '@/components/search/from-campaign/CampaignSelector';
import TopPerformersPanel from '@/components/search/from-campaign/TopPerformersPanel';
import SimilarCreatorsResults from '@/components/search/from-campaign/SimilarCreatorsResults';
import CostEstimator from '@/components/search/from-campaign/CostEstimator';

const INITIAL_LOAD = 3;
const PAGE_SIZE = 10;

// Composant interne qui utilise useSearchParams
function FromCampaignContent() {
  const searchParams = useSearchParams();
  const preselectedCampaignId = searchParams.get('campaignId');

  const [campaigns, setCampaigns] = useState<CampaignTracker[]>([]);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(
    preselectedCampaignId
  );
  const [topPerformers, setTopPerformers] = useState<CampaignCreatorScore[]>(
    []
  );
  const [similarCreators, setSimilarCreators] = useState<
    SimilarCreatorResult[]
  >([]);
  const [totalAvailable, setTotalAvailable] = useState(0);

  const [isLoadingCampaigns, setIsLoadingCampaigns] = useState(true);
  const [isLoadingTopPerformers, setIsLoadingTopPerformers] = useState(false);
  const [isLoadingSimilar, setIsLoadingSimilar] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Charger les campagnes
  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        const data = await getAdvancedCampaigns();
        setCampaigns(data);
      } catch (error) {
        console.error('Erreur lors du chargement des campagnes:', error);
      } finally {
        setIsLoadingCampaigns(false);
      }
    };

    loadCampaigns();
  }, []);

  // Charger les données quand une campagne est sélectionnée
  useEffect(() => {
    if (selectedCampaignId) {
      loadCampaignData(selectedCampaignId);
    } else {
      setTopPerformers([]);
      setSimilarCreators([]);
      setTotalAvailable(0);
    }
  }, [selectedCampaignId]);

  // Auto-sélection depuis l'URL
  useEffect(() => {
    if (preselectedCampaignId && campaigns.length > 0) {
      const exists = campaigns.some((c) => c.id === preselectedCampaignId);
      if (exists) {
        setSelectedCampaignId(preselectedCampaignId);
      }
    }
  }, [preselectedCampaignId, campaigns]);

  const loadCampaignData = async (campaignId: string) => {
    // Charger les top performers
    setIsLoadingTopPerformers(true);
    try {
      const performers = await getTopPerformersFromCampaign(campaignId);
      setTopPerformers(performers);
    } catch (error) {
      console.error('Erreur lors du chargement des top performers:', error);
      setTopPerformers([]);
    } finally {
      setIsLoadingTopPerformers(false);
    }

    // Charger les premiers créateurs similaires
    setIsLoadingSimilar(true);
    setSimilarCreators([]);
    try {
      const { creators, total } = await findSimilarCreators(
        campaignId,
        0,
        INITIAL_LOAD
      );
      setSimilarCreators(creators);
      setTotalAvailable(total);
    } catch (error) {
      console.error(
        'Erreur lors de la recherche de créateurs similaires:',
        error
      );
      setSimilarCreators([]);
      setTotalAvailable(0);
    } finally {
      setIsLoadingSimilar(false);
    }
  };

  const handleLoadMore = useCallback(async () => {
    if (!selectedCampaignId || isLoadingMore) return;

    setIsLoadingMore(true);
    try {
      const { creators } = await findSimilarCreators(
        selectedCampaignId,
        similarCreators.length,
        PAGE_SIZE
      );
      setSimilarCreators((prev) => [...prev, ...creators]);
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [selectedCampaignId, similarCreators.length, isLoadingMore]);

  const handleSelectCampaign = (campaignId: string) => {
    setSelectedCampaignId(campaignId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec sélecteur de mode */}
      <div className="bg-white border-b border-gray-200 p-4">
        <SearchModeSelector currentMode="from-campaign" />
      </div>

      {/* Contenu principal */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Titre de la page */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Trouver des créateurs similaires
            </h1>
            <p className="text-gray-600 mt-1">
              Analysez vos top performers et découvrez des créateurs au profil
              similaire susceptibles de générer les mêmes résultats.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Colonne gauche - Sélection et Top Performers */}
            <div className="lg:col-span-1 space-y-6">
              {/* Sélecteur de campagne */}
              <CampaignSelector
                campaigns={campaigns}
                selectedCampaignId={selectedCampaignId}
                onSelectCampaign={handleSelectCampaign}
                isLoading={isLoadingCampaigns}
              />

              {/* Top Performers */}
              {selectedCampaignId && (
                <TopPerformersPanel
                  topPerformers={topPerformers}
                  isLoading={isLoadingTopPerformers}
                />
              )}

              {/* Estimateur de coût */}
              {topPerformers.length > 0 && (
                <CostEstimator topPerformers={topPerformers} />
              )}
            </div>

            {/* Colonne droite - Résultats */}
            <div className="lg:col-span-2">
              <SimilarCreatorsResults
                results={similarCreators}
                isLoading={isLoadingSimilar}
                loadedCount={similarCreators.length}
                totalAvailable={totalAvailable}
                onLoadMore={handleLoadMore}
                isLoadingMore={isLoadingMore}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading fallback pour Suspense
function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="h-10 w-96 bg-gray-200 rounded-xl animate-pulse" />
      </div>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <div className="h-64 bg-gray-200 rounded-2xl animate-pulse" />
            </div>
            <div className="lg:col-span-2">
              <div className="h-96 bg-gray-200 rounded-2xl animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Composant d'export avec Suspense boundary
export default function FromCampaignPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <FromCampaignContent />
    </Suspense>
  );
}
