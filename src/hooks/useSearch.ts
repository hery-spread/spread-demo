import { useState, useEffect, useCallback } from "react";
import {
  searchInfluencers,
  SearchFilters,
  getSearchSuggestions,
} from "@/lib/mockData";
import { Influencer } from "@/types";

export function useSearch() {
  const [filters, setFilters] = useState<SearchFilters>({});
  const [results, setResults] = useState<Influencer[]>([]);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const search = useCallback(async (searchFilters: SearchFilters) => {
    setLoading(true);

    // Simuler un délai d'API
    setTimeout(() => {
      const searchResults = searchInfluencers(searchFilters);
      setResults(searchResults);
      setLoading(false);
    }, 500);
  }, []);

  const getSuggestions = useCallback((query: string) => {
    const searchSuggestions = getSearchSuggestions(query);
    setSuggestions(searchSuggestions);
  }, []);

  const updateFilters = useCallback((newFilters: SearchFilters) => {
    setFilters(newFilters);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
    setSuggestions([]);
  }, []);

  // Recherche initiale
  useEffect(() => {
    search({});
  }, [search]);

  return {
    filters,
    results,
    loading,
    suggestions,
    search,
    getSuggestions,
    updateFilters,
    clearFilters,
  };
} 