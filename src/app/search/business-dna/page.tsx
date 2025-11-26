'use client';

import { useState, useEffect, useCallback } from 'react';
import { BusinessDNA, Influencer } from '@/types';
import {
  getBusinessDNAs,
  analyzeWebsiteForDNA,
  searchCreatorsByDNA,
  saveBusinessDNA,
} from '@/lib/mockData';
import BusinessDNASidebar from '@/components/search/business-dna/BusinessDNASidebar';
import BusinessDNAForm from '@/components/search/business-dna/BusinessDNAForm';
import BusinessDNAResults from '@/components/search/business-dna/BusinessDNAResults';
import SearchModeSelector from '@/components/search/SearchModeSelector';

type ViewMode = 'form' | 'results';

export default function BusinessDNAPage() {
  const [businessDNAs, setBusinessDNAs] = useState<BusinessDNA[]>([]);
  const [selectedDNA, setSelectedDNA] = useState<BusinessDNA | null>(null);
  const [searchResults, setSearchResults] = useState<Influencer[]>([]);
  const [isLoadingDNAs, setIsLoadingDNAs] = useState(true);
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('form');

  // Charger les Business DNAs existants
  useEffect(() => {
    const loadDNAs = async () => {
      try {
        const dnas = await getBusinessDNAs();
        setBusinessDNAs(dnas);
      } catch (error) {
        console.error('Erreur lors du chargement des Business DNAs:', error);
      } finally {
        setIsLoadingDNAs(false);
      }
    };

    loadDNAs();
  }, []);

  // Analyser une URL
  const handleAnalyze = async (url: string): Promise<BusinessDNA> => {
    const dna = await analyzeWebsiteForDNA(url);
    return dna;
  };

  // Sauvegarder un Business DNA
  const handleSaveDNA = useCallback(async (dna: BusinessDNA) => {
    try {
      const savedDNA = await saveBusinessDNA(dna);
      setBusinessDNAs((prev) => {
        // Vérifier si le DNA existe déjà
        const existingIndex = prev.findIndex((d) => d.id === savedDNA.id);
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = savedDNA;
          return updated;
        }
        return [savedDNA, ...prev];
      });
      setSelectedDNA(savedDNA);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  }, []);

  // Rechercher avec un Business DNA
  const handleSearchWithDNA = useCallback(async (dna: BusinessDNA) => {
    setSelectedDNA(dna);
    setViewMode('results');
    setIsLoadingResults(true);

    try {
      const results = await searchCreatorsByDNA(dna);
      setSearchResults(results);
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
      setSearchResults([]);
    } finally {
      setIsLoadingResults(false);
    }
  }, []);

  // Sélectionner un DNA depuis la sidebar
  const handleSelectDNA = (dna: BusinessDNA | null) => {
    if (dna) {
      setSelectedDNA(dna);
      // Lancer automatiquement la recherche quand on sélectionne un DNA existant
      handleSearchWithDNA(dna);
    } else {
      setSelectedDNA(null);
      setViewMode('form');
      setSearchResults([]);
    }
  };

  // Créer un nouveau DNA
  const handleNewDNA = () => {
    setSelectedDNA(null);
    setViewMode('form');
    setSearchResults([]);
  };

  // Supprimer un DNA
  const handleDeleteDNA = (dna: BusinessDNA) => {
    if (window.confirm(`Supprimer "${dna.name}" ?`)) {
      setBusinessDNAs((prev) => prev.filter((d) => d.id !== dna.id));
      if (selectedDNA?.id === dna.id) {
        setSelectedDNA(null);
        setViewMode('form');
        setSearchResults([]);
      }
    }
  };

  // Rafraîchir les résultats
  const handleRefresh = () => {
    if (selectedDNA) {
      handleSearchWithDNA(selectedDNA);
    }
  };

  return (
    <div className="flex h-full bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <BusinessDNASidebar
        businessDNAs={businessDNAs}
        selectedDNA={selectedDNA}
        onSelectDNA={handleSelectDNA}
        onNewDNA={handleNewDNA}
        onDeleteDNA={handleDeleteDNA}
        isLoading={isLoadingDNAs}
      />

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header avec sélecteur de mode */}
        <div className="flex-shrink-0 bg-white border-b border-gray-200 p-4">
          <SearchModeSelector currentMode="business-dna" />
        </div>

        {/* Zone de contenu scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          {viewMode === 'form' ? (
            <BusinessDNAForm
              onAnalyze={handleAnalyze}
              onSaveDNA={handleSaveDNA}
              onSearchWithDNA={handleSearchWithDNA}
              initialDNA={selectedDNA}
            />
          ) : selectedDNA ? (
            <BusinessDNAResults
              dna={selectedDNA}
              results={searchResults}
              isLoading={isLoadingResults}
              onRefresh={handleRefresh}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
