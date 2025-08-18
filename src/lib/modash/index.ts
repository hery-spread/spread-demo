// ========================================
// MODASH API - EXPORTS CENTRALISÉS
// ========================================

// Dictionnaires
export {
  getLanguages,
  getLocations,
  getTopics,
  getHashtags,
  getInterests,
  getBrands,
  getUsers,
  searchAllDictionaries,
  clearDictionariesCache,
  getCacheStats,
} from './dictionaries';

// Recherche et rapports
export {
  searchInfluencers,
  getInfluencerReport,
  getPerformanceData,
  searchByEmail,
  getAudienceOverlap,
  transformAdvancedFiltersToModash,
  clearSearchCache,
  getSearchCacheStats,
} from './search';

// Rapports enrichis
export {
  getEnhancedInfluencerReport,
  transformInstagramReport,
  transformYouTubeReport,
  transformTikTokReport,
  calculateEngagementRate,
  formatEngagementRate,
  getEngagementQuality,
  formatFollowerCount,
} from './reports';

// Système de cache
export {
  searchCache,
  profileCache,
  dictionaryCache,
  performanceCache,
  cacheManager,
  useCacheStats,
  withCache,
} from './cache';

// Gestion d'erreurs
export {
  ModashError,
  ModashErrorType,
  ErrorAnalyzer,
  RetryManager,
  FallbackManager,
  HealthMonitor,
  useModashErrorHandler,
  withErrorHandling,
} from './errors';

// Types réexportés pour faciliter l'utilisation
export type {
  ModashLanguage,
  ModashLocation,
  ModashBrand,
  ModashInterest,
  ModashUser,
  ModashSearchRequest,
  ModashSearchResponse,
  ModashSearchFilters,
  ModashInfluencerFilters,
  ModashAudienceFilters,
  ModashReportResponse,
  ModashInstagramReportProfile,
  ModashYouTubeReportProfile,
  ModashTikTokReportProfile,
  ModashReportProfile,
  ModashPerformanceData,
  ModashAudienceOverlapResponse,
  ModashEmailSearchResponse,
} from '@/types';
