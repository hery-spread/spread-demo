'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  searchInfluencers,
  SearchFilters as LegacySearchFilters,
} from '@/lib/mockData';
import {
  Influencer,
  SearchUIState,
  SearchResults,
  AdvancedSearchFilters,
} from '@/types';
import SearchSidebar from '@/components/search/SearchSidebar';
import SearchResultsTable from '@/components/search/SearchResultsTable';
import { Button } from '@/components/ui/Button';
import {
  searchInfluencers as modashSearchInfluencers,
  transformAdvancedFiltersToModash,
} from '@/lib/modash';

// Recherche avancée avec intégration Modash
const performAdvancedSearch = async (
  filters: AdvancedSearchFilters,
  query: string
): Promise<SearchResults> => {
  const startTime = Date.now();

  try {
    // Vérifier qu'une plateforme est sélectionnée
    if (!filters.platforms || filters.platforms.length === 0) {
      // Fallback sur les données mockées si aucune plateforme n'est sélectionnée
      return performLegacySearch(filters, query);
    }

    const platform = filters.platforms[0];

    // Transformer les filtres avancés vers le format Modash
    const modashFilters = transformAdvancedFiltersToModash(filters);

    // Préparer la requête Modash
    const modashRequest = {
      page: 0,
      sort: {
        field: 'followers',
        direction: 'desc' as const,
      },
      filter: modashFilters,
    };

    // Appel à l'API Modash
    const modashResponse = await modashSearchInfluencers(
      platform,
      modashRequest
    );

    // Transformer la réponse Modash vers notre format
    const influencers: Influencer[] = [
      ...modashResponse.lookalikes,
      ...modashResponse.directs,
    ].map((response) => ({
      id: response.userId,
      name: response.profile.fullname || response.profile.username,
      username: response.profile.username,
      platform,
      avatar: response.profile.picture,
      followers: response.profile.followers,
      engagement: response.profile.engagements,
      engagementRate: response.profile.engagementRate,
      country: 'Unknown', // À enrichir avec les données de profil
      verified: false, // À enrichir avec les données de profil
      email: undefined, // À enrichir avec les données de profil
      bio: undefined, // À enrichir avec les données de profil
    }));

    const searchTime = Date.now() - startTime;

    return {
      influencers,
      totalCount: modashResponse.total,
      facets: {
        platforms: { [platform]: influencers.length },
        countries: {},
        followerRanges: {},
        engagementRanges: {},
      },
      searchTime,
      aiAnalysis: {
        queryUnderstanding: `Recherche sur ${platform} avec ${Object.keys(modashFilters).length} filtres actifs`,
        suggestedRefinements: [
          'Affiner la tranche de followers',
          'Ajouter des filtres géographiques',
          "Préciser les intérêts de l'audience",
        ],
        alternativeQueries: [
          'Influenceurs similaires',
          'Créateurs émergents',
          'Top performers',
        ],
      },
    };
  } catch (error) {
    console.error('Erreur lors de la recherche Modash:', error);

    // Fallback sur les données mockées en cas d'erreur
    return performLegacySearch(filters, query);
  }
};

// Fonction de fallback avec les données mockées
const performLegacySearch = async (
  filters: AdvancedSearchFilters,
  query: string
): Promise<SearchResults> => {
  const startTime = Date.now();

  // Simulation d'un délai d'API
  await new Promise((resolve) =>
    setTimeout(resolve, 800 + Math.random() * 400)
  );

  // Convertir les nouveaux filtres vers l'ancien format pour la compatibilité
  const legacyFilters: LegacySearchFilters = {};

  // Plateforme
  if (filters.platforms && filters.platforms.length === 1) {
    legacyFilters.platform = filters.platforms[0];
  }

  // Créateur
  if (filters.creator) {
    if (filters.creator.verified) legacyFilters.verified = true;
    if (filters.creator.hasEmail) legacyFilters.hasEmail = true;
    if (filters.creator.location?.country)
      legacyFilters.country = filters.creator.location.country;
  }

  // Audience
  if (filters.audience) {
    if (filters.audience.followersRange) {
      legacyFilters.minFollowers = filters.audience.followersRange.min;
      legacyFilters.maxFollowers = filters.audience.followersRange.max;
    }
    if (filters.audience.engagementRange) {
      legacyFilters.minEngagement = filters.audience.engagementRange.min;
      legacyFilters.maxEngagement = filters.audience.engagementRange.max;
    }
  }

  // Recherche textuelle
  if (query.trim()) {
    legacyFilters.query = query;
  }

  const results = searchInfluencers(legacyFilters);
  const endTime = Date.now();

  // Calculer les facettes
  const facets = {
    platforms: {} as { [key: string]: number },
    countries: {} as { [key: string]: number },
    followerRanges: {} as { [key: string]: number },
    engagementRanges: {} as { [key: string]: number },
  };

  results.forEach((influencer) => {
    // Plateformes
    facets.platforms[influencer.platform] =
      (facets.platforms[influencer.platform] || 0) + 1;

    // Pays
    facets.countries[influencer.country] =
      (facets.countries[influencer.country] || 0) + 1;

    // Fourchettes de followers
    const followers = influencer.followers;
    let followerRange = '0-10K';
    if (followers >= 10000000) followerRange = '10M+';
    else if (followers >= 5000000) followerRange = '5M-10M';
    else if (followers >= 1000000) followerRange = '1M-5M';
    else if (followers >= 500000) followerRange = '500K-1M';
    else if (followers >= 100000) followerRange = '100K-500K';
    else if (followers >= 50000) followerRange = '50K-100K';
    else if (followers >= 10000) followerRange = '10K-50K';

    facets.followerRanges[followerRange] =
      (facets.followerRanges[followerRange] || 0) + 1;

    // Fourchettes d'engagement
    const engagement = influencer.engagementRate;
    let engagementRange = '0-1%';
    if (engagement >= 10) engagementRange = '10%+';
    else if (engagement >= 5) engagementRange = '5-10%';
    else if (engagement >= 3) engagementRange = '3-5%';
    else if (engagement >= 2) engagementRange = '2-3%';
    else if (engagement >= 1) engagementRange = '1-2%';

    facets.engagementRanges[engagementRange] =
      (facets.engagementRanges[engagementRange] || 0) + 1;
  });

  // Simuler l'analyse IA
  const aiAnalysis = query.trim()
    ? {
        queryUnderstanding: `Recherche d'influenceurs basée sur "${query.substring(0, 50)}${query.length > 50 ? '...' : ''}"`,
        suggestedRefinements: [
          'Préciser la plateforme (Instagram, YouTube, TikTok)',
          'Ajouter une fourchette de followers',
          'Spécifier une catégorie de contenu',
        ].slice(0, Math.floor(Math.random() * 3) + 1),
        alternativeQueries: [
          query.toLowerCase().includes('gaming')
            ? 'influenceurs tech et gaming'
            : 'influenceurs lifestyle',
          query.toLowerCase().includes('français')
            ? 'créateurs francophones'
            : 'créateurs internationaux',
        ].slice(0, Math.floor(Math.random() * 2) + 1),
      }
    : undefined;

  return {
    influencers: results,
    totalCount: results.length,
    facets,
    searchTime: endTime - startTime,
    aiAnalysis,
  };
};

export default function AdvancedSearchPage() {
  const router = useRouter();

  // État de l'interface de recherche
  const [searchState, setSearchState] = useState<SearchUIState>({
    isSearching: false,
    hasSearched: false,
    searchQuery: '',
    activeFilters: {},
    cardStates: {
      'platform-search': false,
      'creator-filters': false,
      'audience-filters': false,
      'content-filters': false,
    },
    results: null,
    selectedInfluencers: [],
  });

  // Modaux et sélections
  const [showAddToListModal, setShowAddToListModal] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] =
    useState<Influencer | null>(null);

  // Mettre à jour l'état de recherche
  const updateSearchState = useCallback((updates: Partial<SearchUIState>) => {
    setSearchState((prev) => ({ ...prev, ...updates }));
  }, []);

  // Fonction de recherche principale
  const performSearch = useCallback(async () => {
    updateSearchState({ isSearching: true });

    try {
      const results = await performAdvancedSearch(
        searchState.activeFilters,
        searchState.searchQuery
      );

      updateSearchState({
        isSearching: false,
        hasSearched: true,
        results,
      });
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
      updateSearchState({
        isSearching: false,
        results: {
          influencers: [],
          totalCount: 0,
          facets: {
            platforms: {},
            countries: {},
            followerRanges: {},
            engagementRanges: {},
          },
          searchTime: 0,
        },
      });
    }
  }, [searchState.activeFilters, searchState.searchQuery, updateSearchState]);

  // Recherche initiale au chargement
  useEffect(() => {
    performSearch();
  }, [performSearch]);

  // Gestion des actions sur les influenceurs
  const handleViewProfile = (influencer: Influencer) => {
    router.push(`/profile/${influencer.id}`);
  };

  const handleAddToList = (influencer: Influencer) => {
    setSelectedInfluencer(influencer);
    setShowAddToListModal(true);
  };

  const handleSelectInfluencer = (influencerId: string) => {
    const newSelected = searchState.selectedInfluencers.includes(influencerId)
      ? searchState.selectedInfluencers.filter((id) => id !== influencerId)
      : [...searchState.selectedInfluencers, influencerId];

    updateSearchState({ selectedInfluencers: newSelected });
  };

  return (
    <div className="h-screen flex bg-gray-50 overflow-x-hidden">
      {/* Sidebar de recherche - Colonne gauche */}
      <div className="w-[28rem] min-w-[22rem] max-w-[32rem] flex-shrink-0 overflow-hidden">
        <SearchSidebar
          searchState={searchState}
          onSearchStateChange={updateSearchState}
          onSearch={performSearch}
          isSearching={searchState.isSearching}
        />
      </div>

      {/* Zone de résultats - Colonne droite */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header des résultats */}
        <div className="flex-shrink-0 bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {searchState.hasSearched
                  ? 'Résultats de recherche'
                  : "Recherche d'Influenceurs"}
              </h1>
              {searchState.results && (
                <p className="text-gray-600 mt-1">
                  {searchState.results.totalCount.toLocaleString()} résultat
                  {searchState.results.totalCount > 1 ? 's' : ''} trouvé
                  {searchState.results.totalCount > 1 ? 's' : ''}
                  {searchState.results.searchTime && (
                    <span className="ml-2 text-sm">
                      ({searchState.results.searchTime}ms)
                    </span>
                  )}
                </p>
              )}
            </div>

            {/* Actions sur la sélection */}
            {searchState.selectedInfluencers.length > 0 && (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">
                  {searchState.selectedInfluencers.length} sélectionné
                  {searchState.selectedInfluencers.length > 1 ? 's' : ''}
                </span>
                <Button variant="outline" size="sm">
                  Ajouter à une liste
                </Button>
                <Button size="sm">Exporter la sélection</Button>
              </div>
            )}
          </div>

          {/* Analyse IA */}
          {searchState.results?.aiAnalysis && (
            <div className="mt-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-200/30">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 text-sm">🤖</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm mb-2">
                    Analyse IA de votre recherche
                  </h4>
                  <p className="text-sm text-gray-700 mb-3">
                    {searchState.results.aiAnalysis.queryUnderstanding}
                  </p>

                  {searchState.results.aiAnalysis.suggestedRefinements.length >
                    0 && (
                    <div className="mb-2">
                      <p className="text-xs font-medium text-gray-600 mb-1">
                        💡 Suggestions d&apos;amélioration :
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {searchState.results.aiAnalysis.suggestedRefinements.map(
                          (suggestion, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-1 bg-white/80 text-gray-700 text-xs rounded-full border border-purple-200/50"
                            >
                              {suggestion}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {searchState.results.aiAnalysis.alternativeQueries.length >
                    0 && (
                    <div>
                      <p className="text-xs font-medium text-gray-600 mb-1">
                        🔍 Recherches alternatives :
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {searchState.results.aiAnalysis.alternativeQueries.map(
                          (query, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                updateSearchState({ searchQuery: query });
                                // Auto-trigger search après un court délai
                                setTimeout(performSearch, 100);
                              }}
                              className="inline-flex items-center px-2 py-1 bg-white/80 hover:bg-purple-100 text-gray-700 hover:text-purple-800 text-xs rounded-full border border-purple-200/50 transition-colors cursor-pointer"
                            >
                              {`"${query}"`}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Table des résultats */}
        <div className="flex-1 overflow-hidden">
          <SearchResultsTable
            results={searchState.results?.influencers || []}
            loading={searchState.isSearching}
            selectedInfluencers={searchState.selectedInfluencers}
            onViewProfile={handleViewProfile}
            onAddToList={handleAddToList}
            onSelectInfluencer={handleSelectInfluencer}
          />
        </div>
      </div>

      {/* Modal Ajouter à liste */}
      {showAddToListModal && selectedInfluencer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Ajouter {selectedInfluencer.name} à une liste
            </h3>

            <div className="space-y-3 mb-6">
              <button className="w-full text-left p-4 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-purple-300 transition-all">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📋</span>
                  <div>
                    <div className="font-medium text-gray-900">
                      Liste Beauté & Mode
                    </div>
                    <div className="text-sm text-gray-600">
                      156 influenceurs
                    </div>
                  </div>
                </div>
              </button>

              <button className="w-full text-left p-4 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-purple-300 transition-all">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🎮</span>
                  <div>
                    <div className="font-medium text-gray-900">
                      Liste Gaming
                    </div>
                    <div className="text-sm text-gray-600">89 influenceurs</div>
                  </div>
                </div>
              </button>

              <button className="w-full text-left p-4 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-purple-300 transition-all">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">✨</span>
                  <div>
                    <div className="font-medium text-gray-900">Liste VIP</div>
                    <div className="text-sm text-gray-600">23 influenceurs</div>
                  </div>
                </div>
              </button>

              <button className="w-full text-left p-4 border-2 border-dashed border-purple-300 rounded-xl hover:bg-purple-50 hover:border-purple-400 transition-all text-purple-700">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">➕</span>
                  <div className="font-medium">Créer une nouvelle liste</div>
                </div>
              </button>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowAddToListModal(false);
                  setSelectedInfluencer(null);
                }}
                className="flex-1"
              >
                Annuler
              </Button>
              <Button
                onClick={() => {
                  alert(`${selectedInfluencer.name} ajouté à la liste !`);
                  setShowAddToListModal(false);
                  setSelectedInfluencer(null);
                }}
                className="flex-1"
              >
                Ajouter
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
