// ========================================
// SYSTÈME DE GESTION D'ERREURS MODASH
// ========================================

// Types d'erreurs spécifiques à Modash
export enum ModashErrorType {
  NETWORK_ERROR = 'NETWORK_ERROR',
  API_RATE_LIMIT = 'API_RATE_LIMIT',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  INVALID_PARAMETERS = 'INVALID_PARAMETERS',
  RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
  QUOTA_EXCEEDED = 'QUOTA_EXCEEDED',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

// Classe d'erreur personnalisée pour Modash
export class ModashError extends Error {
  public readonly type: ModashErrorType;
  public readonly statusCode?: number;
  public readonly retryable: boolean;
  public readonly retryAfter?: number; // en millisecondes
  public readonly originalError?: Error;
  public readonly context?: Record<string, unknown>;

  constructor(
    type: ModashErrorType,
    message: string,
    options: {
      statusCode?: number;
      retryable?: boolean;
      retryAfter?: number;
      originalError?: Error;
      context?: Record<string, unknown>;
    } = {}
  ) {
    super(message);
    this.name = 'ModashError';
    this.type = type;
    this.statusCode = options.statusCode;
    this.retryable = options.retryable ?? this.isRetryableByDefault(type);
    this.retryAfter = options.retryAfter;
    this.originalError = options.originalError;
    this.context = options.context;
  }

  private isRetryableByDefault(type: ModashErrorType): boolean {
    switch (type) {
      case ModashErrorType.NETWORK_ERROR:
      case ModashErrorType.API_RATE_LIMIT:
      case ModashErrorType.SERVICE_UNAVAILABLE:
      case ModashErrorType.TIMEOUT_ERROR:
        return true;
      case ModashErrorType.AUTHENTICATION_ERROR:
      case ModashErrorType.INVALID_PARAMETERS:
      case ModashErrorType.RESOURCE_NOT_FOUND:
      case ModashErrorType.QUOTA_EXCEEDED:
        return false;
      default:
        return false;
    }
  }

  // Convertir l'erreur en objet sérialisable
  toJSON() {
    return {
      name: this.name,
      type: this.type,
      message: this.message,
      statusCode: this.statusCode,
      retryable: this.retryable,
      retryAfter: this.retryAfter,
      context: this.context,
      stack: this.stack,
    };
  }
}

// ========================================
// ANALYSEUR D'ERREURS
// ========================================

export class ErrorAnalyzer {
  // Analyser une erreur et la convertir en ModashError
  static analyze(error: unknown, context?: Record<string, unknown>): ModashError {
    // Si c'est déjà une ModashError, la retourner
    if (error instanceof ModashError) {
      return error;
    }

    // Analyser les erreurs HTTP
    if (error && typeof error === 'object' && 'response' in error) {
      const response = (error as { response: { status: number; data?: { message?: string }; headers?: Record<string, string> } }).response;
      const status = response.status;
      const data = response.data;

      switch (status) {
        case 401:
          return new ModashError(
            ModashErrorType.AUTHENTICATION_ERROR,
            'Authentification échouée - Vérifiez votre clé API',
            { statusCode: status, context }
          );
        
        case 403:
          return new ModashError(
            ModashErrorType.QUOTA_EXCEEDED,
            'Quota API dépassé - Attendez avant de refaire une requête',
            { statusCode: status, context }
          );
        
        case 404:
          return new ModashError(
            ModashErrorType.RESOURCE_NOT_FOUND,
            'Ressource non trouvée - Vérifiez les paramètres',
            { statusCode: status, context }
          );
        
        case 429:
          const retryAfter = this.extractRetryAfter(response.headers || {});
          return new ModashError(
            ModashErrorType.API_RATE_LIMIT,
            'Limite de taux API atteinte - Ralentissez les requêtes',
            { 
              statusCode: status, 
              retryAfter,
              context 
            }
          );
        
        case 500:
        case 502:
        case 503:
        case 504:
          return new ModashError(
            ModashErrorType.SERVICE_UNAVAILABLE,
            'Service Modash temporairement indisponible',
            { statusCode: status, retryable: true, context }
          );
        
        default:
          const errorMessage = error && typeof error === 'object' && 'message' in error && typeof error.message === 'string' 
            ? error.message 
            : 'Erreur inconnue';
          return new ModashError(
            ModashErrorType.UNKNOWN_ERROR,
            `Erreur HTTP ${status}: ${data?.message || errorMessage}`,
            { statusCode: status, originalError: error as unknown as Error, context }
          );
      }
    }

    // Analyser les erreurs de réseau
    if (error && typeof error === 'object' && 'code' in error && (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED')) {
      return new ModashError(
        ModashErrorType.NETWORK_ERROR,
        'Erreur de connexion réseau - Vérifiez votre connexion',
        { retryable: true, originalError: error as unknown as Error, context }
      );
    }

    // Analyser les erreurs de timeout
    if (error && typeof error === 'object' && (('code' in error && error.code === 'ECONNABORTED') || ('message' in error && typeof error.message === 'string' && error.message.includes('timeout')))) {
      return new ModashError(
        ModashErrorType.TIMEOUT_ERROR,
        'Timeout de la requête - Le serveur met trop de temps à répondre',
        { retryable: true, originalError: error as unknown as Error, context }
      );
    }

    // Erreur générique
    const message = error && typeof error === 'object' && 'message' in error && typeof error.message === 'string' 
      ? error.message 
      : 'Erreur inconnue';
    
    return new ModashError(
      ModashErrorType.UNKNOWN_ERROR,
      message,
      { originalError: error as unknown as Error, context }
    );
  }

  // Extraire le délai de retry des headers
  private static extractRetryAfter(headers: Record<string, string>): number {
    const retryAfter = headers['retry-after'] || headers['Retry-After'];
    if (retryAfter) {
      const seconds = parseInt(retryAfter, 10);
      return isNaN(seconds) ? 60000 : seconds * 1000; // Convertir en millisecondes
    }
    return 60000; // 1 minute par défaut
  }
}

// ========================================
// SYSTÈME DE RETRY INTELLIGENT
// ========================================

interface RetryOptions {
  maxAttempts?: number;
  baseDelay?: number;
  maxDelay?: number;
  backoffFactor?: number;
  jitter?: boolean;
}

export class RetryManager {
  private static readonly DEFAULT_OPTIONS: Required<RetryOptions> = {
    maxAttempts: 3,
    baseDelay: 1000, // 1 seconde
    maxDelay: 30000, // 30 secondes
    backoffFactor: 2,
    jitter: true,
  };

  // Exécuter une fonction avec retry automatique
  static async withRetry<T>(
    fn: () => Promise<T>,
    options: RetryOptions = {},
    context?: Record<string, unknown>
  ): Promise<T> {
    const opts = { ...this.DEFAULT_OPTIONS, ...options };
    let lastError: ModashError;

    for (let attempt = 1; attempt <= opts.maxAttempts; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = ErrorAnalyzer.analyze(error, { 
          ...context, 
          attempt, 
          maxAttempts: opts.maxAttempts 
        });

        // Ne pas retry si l'erreur n'est pas retryable
        if (!lastError.retryable) {
          throw lastError;
        }

        // Ne pas retry si c'est la dernière tentative
        if (attempt === opts.maxAttempts) {
          throw lastError;
        }

        // Calculer le délai de retry
        const delay = this.calculateDelay(
          attempt,
          opts.baseDelay,
          opts.maxDelay,
          opts.backoffFactor,
          opts.jitter,
          lastError.retryAfter
        );

        console.warn(
          `Tentative ${attempt}/${opts.maxAttempts} échouée:`,
          lastError.message,
          `Retry dans ${delay}ms`
        );

        await this.sleep(delay);
      }
    }

    throw lastError!;
  }

  // Calculer le délai de retry avec backoff exponentiel
  private static calculateDelay(
    attempt: number,
    baseDelay: number,
    maxDelay: number,
    backoffFactor: number,
    jitter: boolean,
    retryAfter?: number
  ): number {
    // Utiliser retryAfter si spécifié par l'API
    if (retryAfter) {
      return Math.min(retryAfter, maxDelay);
    }

    // Backoff exponentiel
    let delay = baseDelay * Math.pow(backoffFactor, attempt - 1);
    
    // Ajouter du jitter pour éviter le thundering herd
    if (jitter) {
      delay = delay * (0.5 + Math.random() * 0.5);
    }

    return Math.min(delay, maxDelay);
  }

  // Utilitaire pour attendre
  private static sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// ========================================
// SYSTÈME DE FALLBACK
// ========================================

export class FallbackManager {
  // Exécuter avec fallback automatique
  static async withFallback<T>(
    primary: () => Promise<T>,
    fallback: () => Promise<T>,
    context?: Record<string, unknown>
  ): Promise<{ data: T; source: 'primary' | 'fallback' }> {
    try {
      const data = await primary();
      return { data, source: 'primary' };
    } catch (error) {
      const modashError = ErrorAnalyzer.analyze(error, context);
      
      console.warn(
        'Fonction principale échouée, utilisation du fallback:',
        modashError.message
      );

      try {
        const data = await fallback();
        return { data, source: 'fallback' };
      } catch (fallbackError) {
        const fallbackModashError = ErrorAnalyzer.analyze(fallbackError, {
          ...context,
          fallbackError: true,
        });

        // Si le fallback échoue aussi, lancer l'erreur originale
        console.error('Fallback également échoué:', fallbackModashError.message);
        throw modashError;
      }
    }
  }

  // Exécuter avec plusieurs fallbacks en cascade
  static async withCascadingFallbacks<T>(
    functions: Array<() => Promise<T>>,
    context?: Record<string, unknown>
  ): Promise<{ data: T; source: number }> {
    let lastError: ModashError;

    for (let i = 0; i < functions.length; i++) {
      try {
        const data = await functions[i]();
        return { data, source: i };
      } catch (error) {
        lastError = ErrorAnalyzer.analyze(error, {
          ...context,
          fallbackLevel: i,
          totalFallbacks: functions.length,
        });

        if (i < functions.length - 1) {
          console.warn(
            `Fallback niveau ${i} échoué, essai du niveau ${i + 1}:`,
            lastError.message
          );
        }
      }
    }

    throw lastError!;
  }
}

// ========================================
// MONITEUR DE SANTÉ DE L'API
// ========================================

interface HealthMetrics {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  errorsByType: Record<ModashErrorType, number>;
  lastError?: ModashError;
  uptime: number;
}

export class HealthMonitor {
  private static metrics: HealthMetrics = {
    totalRequests: 0,
    successfulRequests: 0,
    failedRequests: 0,
    averageResponseTime: 0,
    errorsByType: {} as Record<ModashErrorType, number>,
    uptime: Date.now(),
  };

  private static responseTimes: number[] = [];

  // Enregistrer une requête réussie
  static recordSuccess(responseTime: number): void {
    this.metrics.totalRequests++;
    this.metrics.successfulRequests++;
    this.updateResponseTime(responseTime);
  }

  // Enregistrer une erreur
  static recordError(error: ModashError, responseTime?: number): void {
    this.metrics.totalRequests++;
    this.metrics.failedRequests++;
    this.metrics.lastError = error;
    
    // Compter les erreurs par type
    this.metrics.errorsByType[error.type] = 
      (this.metrics.errorsByType[error.type] || 0) + 1;

    if (responseTime) {
      this.updateResponseTime(responseTime);
    }
  }

  // Mettre à jour le temps de réponse moyen
  private static updateResponseTime(responseTime: number): void {
    this.responseTimes.push(responseTime);
    
    // Garder seulement les 100 dernières mesures
    if (this.responseTimes.length > 100) {
      this.responseTimes.shift();
    }

    this.metrics.averageResponseTime = 
      this.responseTimes.reduce((sum, time) => sum + time, 0) / 
      this.responseTimes.length;
  }

  // Obtenir les métriques de santé
  static getMetrics(): HealthMetrics & { 
    successRate: number; 
    isHealthy: boolean;
    recommendations: string[];
  } {
    const successRate = this.metrics.totalRequests > 0 
      ? (this.metrics.successfulRequests / this.metrics.totalRequests) * 100 
      : 100;

    const isHealthy = successRate >= 95 && this.metrics.averageResponseTime < 5000;

    const recommendations: string[] = [];
    if (successRate < 95) {
      recommendations.push('Taux de succès faible - Vérifiez la connectivité réseau');
    }
    if (this.metrics.averageResponseTime > 5000) {
      recommendations.push('Temps de réponse élevé - Considérez l\'optimisation du cache');
    }
    if (this.metrics.errorsByType[ModashErrorType.API_RATE_LIMIT] > 10) {
      recommendations.push('Trop d\'erreurs de rate limiting - Réduisez la fréquence des requêtes');
    }

    return {
      ...this.metrics,
      successRate: Math.round(successRate * 100) / 100,
      isHealthy,
      recommendations,
    };
  }

  // Réinitialiser les métriques
  static reset(): void {
    this.metrics = {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      averageResponseTime: 0,
      errorsByType: {} as Record<ModashErrorType, number>,
      uptime: Date.now(),
    };
    this.responseTimes = [];
  }
}

// ========================================
// UTILITAIRES D'ERREUR POUR REACT
// ========================================

// Hook pour gérer les erreurs Modash dans React
export function useModashErrorHandler() {
  const handleError = (error: unknown, context?: Record<string, unknown>) => {
    const modashError = ErrorAnalyzer.analyze(error, context);
    HealthMonitor.recordError(modashError);
    
    // Log pour le développement
    if (process.env.NODE_ENV === 'development') {
      console.error('Erreur Modash:', modashError.toJSON());
    }

    return modashError;
  };

  const isRetryable = (error: ModashError): boolean => {
    return error.retryable;
  };

  const getErrorMessage = (error: ModashError): string => {
    switch (error.type) {
      case ModashErrorType.NETWORK_ERROR:
        return 'Problème de connexion. Vérifiez votre réseau.';
      case ModashErrorType.API_RATE_LIMIT:
        return 'Trop de requêtes. Attendez un moment avant de réessayer.';
      case ModashErrorType.AUTHENTICATION_ERROR:
        return 'Erreur d\'authentification. Contactez le support.';
      case ModashErrorType.QUOTA_EXCEEDED:
        return 'Quota dépassé. Mettez à niveau votre plan.';
      case ModashErrorType.SERVICE_UNAVAILABLE:
        return 'Service temporairement indisponible. Réessayez plus tard.';
      default:
        return 'Une erreur inattendue s\'est produite.';
    }
  };

  return {
    handleError,
    isRetryable,
    getErrorMessage,
  };
}

// Décorateur pour instrumenter automatiquement les fonctions
export function withErrorHandling<T extends (...args: unknown[]) => Promise<unknown>>(
  fn: T,
  context?: Record<string, unknown>
): T {
  return (async (...args: Parameters<T>) => {
    const startTime = Date.now();
    
    try {
      const result = await fn(...args);
      const responseTime = Date.now() - startTime;
      HealthMonitor.recordSuccess(responseTime);
      return result;
    } catch (error) {
      const responseTime = Date.now() - startTime;
      const modashError = ErrorAnalyzer.analyze(error, {
        ...context,
        functionName: fn.name,
        args: JSON.stringify(args),
      });
      
      HealthMonitor.recordError(modashError, responseTime);
      throw modashError;
    }
  }) as T;
}
