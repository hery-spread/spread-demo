// ========================================
// SYSTÈME DE CACHE INTELLIGENT MODASH
// ========================================

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time To Live en millisecondes
  accessCount: number;
  lastAccessed: number;
  priority: 'low' | 'medium' | 'high';
}

interface CacheStats {
  totalEntries: number;
  totalSize: number; // Estimation en bytes
  hitRate: number;
  missRate: number;
  totalHits: number;
  totalMisses: number;
  oldestEntry: number;
  newestEntry: number;
  averageAccessCount: number;
}

class IntelligentCache<T> {
  private cache = new Map<string, CacheEntry<T>>();
  private maxSize: number;
  private defaultTTL: number;
  private hits = 0;
  private misses = 0;

  constructor(maxSize = 1000, defaultTTL = 30 * 60 * 1000) { // 30 minutes par défaut
    this.maxSize = maxSize;
    this.defaultTTL = defaultTTL;
  }

  // Générer une clé de cache intelligente
  private generateKey(prefix: string, params: Record<string, unknown>): string {
    const sortedParams = Object.keys(params)
      .sort()
      .reduce((result, key) => {
        result[key] = params[key];
        return result;
      }, {} as Record<string, unknown>);
    
    return `${prefix}:${JSON.stringify(sortedParams)}`;
  }

  // Calculer la priorité basée sur les patterns d'usage
  private calculatePriority(accessCount: number, lastAccessed: number): 'low' | 'medium' | 'high' {
    const now = Date.now();
    const timeSinceLastAccess = now - lastAccessed;
    const hoursSinceLastAccess = timeSinceLastAccess / (1000 * 60 * 60);

    if (accessCount >= 10 && hoursSinceLastAccess < 1) return 'high';
    if (accessCount >= 5 && hoursSinceLastAccess < 6) return 'medium';
    return 'low';
  }

  // Nettoyer le cache intelligemment
  private evictEntries(): void {
    if (this.cache.size <= this.maxSize) return;

    const now = Date.now();
    const entries = Array.from(this.cache.entries());

    // Supprimer d'abord les entrées expirées
    const expiredKeys = entries
      .filter(([, entry]) => now - entry.timestamp > entry.ttl)
      .map(([key]) => key);

    expiredKeys.forEach(key => this.cache.delete(key));

    // Si on a encore trop d'entrées, utiliser l'algorithme LFU avec priorité
    if (this.cache.size > this.maxSize) {
      const remainingEntries = Array.from(this.cache.entries())
        .map(([key, entry]) => ({
          key,
          entry,
          score: this.calculateEvictionScore(entry, now),
        }))
        .sort((a, b) => a.score - b.score); // Score le plus bas = priorité d'éviction

      const toEvict = remainingEntries.slice(0, this.cache.size - this.maxSize);
      toEvict.forEach(({ key }) => this.cache.delete(key));
    }
  }

  // Calculer le score d'éviction (plus bas = plus susceptible d'être évincé)
  private calculateEvictionScore(entry: CacheEntry<T>, now: number): number {
    const timeSinceLastAccess = now - entry.lastAccessed;
    const priorityWeight = entry.priority === 'high' ? 3 : entry.priority === 'medium' ? 2 : 1;
    
    // Score basé sur fréquence d'accès, récence et priorité
    return (entry.accessCount * priorityWeight) / (timeSinceLastAccess / 1000);
  }

  // Obtenir une entrée du cache
  get(prefix: string, params: Record<string, unknown>): T | null {
    const key = this.generateKey(prefix, params);
    const entry = this.cache.get(key);

    if (!entry) {
      this.misses++;
      return null;
    }

    const now = Date.now();

    // Vérifier si l'entrée a expiré
    if (now - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      this.misses++;
      return null;
    }

    // Mettre à jour les statistiques d'accès
    entry.accessCount++;
    entry.lastAccessed = now;
    entry.priority = this.calculatePriority(entry.accessCount, entry.lastAccessed);

    this.hits++;
    return entry.data;
  }

  // Stocker une entrée dans le cache
  set(
    prefix: string, 
    params: Record<string, unknown>, 
    data: T, 
    customTTL?: number,
    priority: 'low' | 'medium' | 'high' = 'medium'
  ): void {
    const key = this.generateKey(prefix, params);
    const now = Date.now();

    const entry: CacheEntry<T> = {
      data,
      timestamp: now,
      ttl: customTTL || this.defaultTTL,
      accessCount: 1,
      lastAccessed: now,
      priority,
    };

    this.cache.set(key, entry);
    this.evictEntries();
  }

  // Invalider des entrées par pattern
  invalidate(pattern: string): number {
    let invalidated = 0;
    const keys = Array.from(this.cache.keys());
    
    keys.forEach(key => {
      if (key.includes(pattern)) {
        this.cache.delete(key);
        invalidated++;
      }
    });

    return invalidated;
  }

  // Obtenir les statistiques du cache
  getStats(): CacheStats {
    const entries = Array.from(this.cache.values());

    const totalEntries = entries.length;
    const totalSize = this.estimateSize();
    const totalRequests = this.hits + this.misses;
    const hitRate = totalRequests > 0 ? (this.hits / totalRequests) * 100 : 0;
    const missRate = 100 - hitRate;

    const timestamps = entries.map(e => e.timestamp);
    const accessCounts = entries.map(e => e.accessCount);

    return {
      totalEntries,
      totalSize,
      hitRate: Math.round(hitRate * 100) / 100,
      missRate: Math.round(missRate * 100) / 100,
      totalHits: this.hits,
      totalMisses: this.misses,
      oldestEntry: timestamps.length > 0 ? Math.min(...timestamps) : 0,
      newestEntry: timestamps.length > 0 ? Math.max(...timestamps) : 0,
      averageAccessCount: accessCounts.length > 0 
        ? Math.round((accessCounts.reduce((a, b) => a + b, 0) / accessCounts.length) * 100) / 100 
        : 0,
    };
  }

  // Estimer la taille du cache en bytes
  private estimateSize(): number {
    let size = 0;
    this.cache.forEach((entry, key) => {
      size += key.length * 2; // UTF-16
      size += JSON.stringify(entry.data).length * 2;
      size += 64; // Métadonnées approximatives
    });
    return size;
  }

  // Nettoyer complètement le cache
  clear(): void {
    this.cache.clear();
    this.hits = 0;
    this.misses = 0;
  }

  // Précharger des données importantes
  async preload<K>(
    items: Array<{ prefix: string; params: Record<string, unknown>; loader: () => Promise<K> }>,
    priority: 'low' | 'medium' | 'high' = 'high'
  ): Promise<void> {
    const promises = items.map(async ({ prefix, params, loader }) => {
      try {
        const data = await loader();
        this.set(prefix, params, data as unknown as T, undefined, priority);
      } catch (error) {
        console.error(`Erreur lors du préchargement de ${prefix}:`, error);
      }
    });

    await Promise.allSettled(promises);
  }
}

// ========================================
// INSTANCES DE CACHE SPÉCIALISÉES
// ========================================

// Cache pour les recherches d'influenceurs
export const searchCache = new IntelligentCache(500, 15 * 60 * 1000); // 15 minutes

// Cache pour les rapports de profil
export const profileCache = new IntelligentCache(200, 60 * 60 * 1000); // 1 heure

// Cache pour les dictionnaires (langues, pays, etc.)
export const dictionaryCache = new IntelligentCache(100, 24 * 60 * 60 * 1000); // 24 heures

// Cache pour les données de performance
export const performanceCache = new IntelligentCache(300, 30 * 60 * 1000); // 30 minutes

// ========================================
// UTILITAIRES DE CACHE
// ========================================

// Gestionnaire de cache unifié
export class CacheManager {
  private caches = {
    search: searchCache,
    profile: profileCache,
    dictionary: dictionaryCache,
    performance: performanceCache,
  };

  // Obtenir les statistiques globales
  getGlobalStats() {
    const stats = Object.entries(this.caches).map(([name, cache]) => ({
      name,
      ...cache.getStats(),
    }));

    const totalEntries = stats.reduce((sum, s) => sum + s.totalEntries, 0);
    const totalSize = stats.reduce((sum, s) => sum + s.totalSize, 0);
    const totalHits = stats.reduce((sum, s) => sum + s.totalHits, 0);
    const totalMisses = stats.reduce((sum, s) => sum + s.totalMisses, 0);
    const totalRequests = totalHits + totalMisses;
    const globalHitRate = totalRequests > 0 ? (totalHits / totalRequests) * 100 : 0;

    return {
      global: {
        totalEntries,
        totalSize,
        hitRate: Math.round(globalHitRate * 100) / 100,
        totalHits,
        totalMisses,
      },
      byCache: stats,
    };
  }

  // Nettoyer tous les caches
  clearAll(): void {
    Object.values(this.caches).forEach(cache => cache.clear());
  }

  // Invalider par pattern dans tous les caches
  invalidatePattern(pattern: string): number {
    return Object.values(this.caches).reduce(
      (total, cache) => total + cache.invalidate(pattern),
      0
    );
  }

  // Précharger des données critiques
  async preloadCriticalData(): Promise<void> {
    console.log('🚀 Préchargement des données critiques...');
    
    // Précharger quelques données de base
    dictionaryCache.set('languages', { platform: 'instagram' }, { languages: [], total: 0 }, undefined, 'high');
    dictionaryCache.set('locations', { platform: 'instagram' }, { locations: [], total: 0 }, undefined, 'high');

    console.log('✅ Préchargement terminé');
  }

  // Optimiser automatiquement les caches
  optimize(): void {
    const stats = this.getGlobalStats();
    
    console.log('🔧 Optimisation des caches...');
    console.log(`📊 Statistiques globales:`, stats.global);
    
    // Si le taux de hit est faible, augmenter la taille des caches
    if (stats.global.hitRate < 70) {
      console.log('⚠️ Taux de hit faible, optimisation recommandée');
    }
    
    // Nettoyer les caches avec beaucoup d'entrées anciennes
    stats.byCache.forEach(({ name, totalEntries, hitRate }) => {
      if (totalEntries > 100 && hitRate < 50) {
        console.log(`🧹 Nettoyage du cache ${name} (${totalEntries} entrées, ${hitRate}% hit rate)`);
        this.caches[name as keyof typeof this.caches].clear();
      }
    });
  }
}

// Instance globale du gestionnaire de cache
export const cacheManager = new CacheManager();

// ========================================
// HOOKS ET UTILITAIRES POUR REACT
// ========================================

// Hook pour utiliser le cache dans les composants React
export function useCacheStats() {
  return cacheManager.getGlobalStats();
}

// Décorateur pour mettre en cache automatiquement les fonctions
export function withCache<T extends (...args: unknown[]) => Promise<unknown>>(
  fn: T,
  cacheInstance: IntelligentCache<unknown>,
  prefix: string,
  ttl?: number
): T {
  return (async (...args: Parameters<T>) => {
    const params = { args: JSON.stringify(args) };
    
    // Essayer de récupérer depuis le cache
    const cached = cacheInstance.get(prefix, params);
    if (cached) {
      return cached;
    }

    // Exécuter la fonction et mettre en cache le résultat
    try {
      const result = await fn(...args);
      cacheInstance.set(prefix, params, result, ttl);
      return result;
    } catch (error) {
      // Ne pas mettre en cache les erreurs
      throw error;
    }
  }) as T;
}

// Initialisation automatique du cache au démarrage
if (typeof window !== 'undefined') {
  // Côté client uniquement
  cacheManager.preloadCriticalData().catch(console.error);
  
  // Optimisation périodique
  setInterval(() => {
    cacheManager.optimize();
  }, 10 * 60 * 1000); // Toutes les 10 minutes
}
