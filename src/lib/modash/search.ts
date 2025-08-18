import {
  ModashSearchRequest,
  ModashSearchResponse,
  ModashSearchFilters,
  ModashInfluencerFilters,
  ModashAudienceFilters,
  ModashReportResponse,
  ModashInstagramReportProfile,
  ModashPerformanceData,
  ModashAudienceOverlapResponse,
  ModashEmailSearchResponse,
  AdvancedSearchFilters,
} from '@/types';


// ========================================
// FAÇADE RECHERCHE MODASH API
// ========================================

// Configuration API
const MODASH_API_BASE = 'https://api.modash.io/v1';
const MODASH_API_KEY = process.env.NEXT_PUBLIC_MODASH_API_KEY || 'demo-key';

// Cache pour éviter les appels répétés (recherches coûtent 0.01 crédit par résultat)
const searchCache = new Map<string, { data: unknown; timestamp: number }>();
const SEARCH_CACHE_DURATION = 10 * 60 * 1000; // 10 minutes pour les recherches
const REPORT_CACHE_DURATION = 60 * 60 * 1000; // 1 heure pour les rapports (1 crédit)

function getSearchCacheKey(platform: string, request: ModashSearchRequest): string {
  return `search:${platform}:${JSON.stringify(request)}`;
}

function getReportCacheKey(platform: string, userId: string, calculationMethod?: string): string {
  return `report:${platform}:${userId}:${calculationMethod || 'median'}`;
}

function getFromSearchCache<T>(key: string, cacheDuration = SEARCH_CACHE_DURATION): T | null {
  const cached = searchCache.get(key);
  if (cached && Date.now() - cached.timestamp < cacheDuration) {
    return cached.data as T;
  }
  return null;
}

function setSearchCache<T>(key: string, data: T): void {
  searchCache.set(key, { data, timestamp: Date.now() });
}

// Fonction utilitaire pour les appels API réels (à terme)
async function callModashAPI<T>(
  endpoint: string,
  method: 'GET' | 'POST' = 'GET',
  body?: unknown
): Promise<T> {
  const url = `${MODASH_API_BASE}${endpoint}`;
  
  const options: RequestInit = {
    method,
    headers: {
      'Authorization': `Bearer ${MODASH_API_KEY}`,
      'Content-Type': 'application/json',
    },
  };

  if (body && method === 'POST') {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);
  
  if (!response.ok) {
    throw new Error(`Modash API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Fonction de simulation pour le développement
async function mockModashSearch(
  platform: 'instagram' | 'youtube' | 'tiktok',
  request: ModashSearchRequest
): Promise<ModashSearchResponse> {
  // Simulation d'un délai réseau
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Génération de données mockées basées sur les filtres
  const mockInfluencers = Array.from({ length: 15 }, (_, i) => ({
    userId: `mock_${platform}_${i + 1}`,
    profile: {
      userId: `mock_${platform}_${i + 1}`,
      fullname: `Mock ${platform} User ${i + 1}`,
      username: `mock_user_${i + 1}`,
      url: `https://${platform}.com/mock_user_${i + 1}`,
      picture: `https://picsum.photos/150/150?random=${i}`,
      followers: Math.floor(Math.random() * 1000000) + 10000,
      engagements: Math.floor(Math.random() * 50000) + 1000,
      engagementRate: Math.random() * 0.1 + 0.01,
      ...(platform === 'youtube' && {
        averageViews: Math.floor(Math.random() * 100000) + 5000,
        handle: `mock_channel_${i + 1}`,
      }),
    },
    match: {
      field: request.sort?.field || 'followers',
      value: Math.random(),
    },
  }));

  return {
    error: false,
    total: mockInfluencers.length,
    lookalikes: mockInfluencers.slice(0, 5),
    directs: mockInfluencers.slice(5),
    isExactMatch: true,
  };
}

// ========================================
// RECHERCHE D'INFLUENCEURS
// ========================================

export async function searchInfluencers(
  platform: 'instagram' | 'youtube' | 'tiktok',
  request: ModashSearchRequest
): Promise<ModashSearchResponse> {
  const cacheKey = getSearchCacheKey(platform, request);
  const cached = getFromSearchCache<ModashSearchResponse>(cacheKey);
  
  if (cached) {
    return cached;
  }

  try {
    // En mode développement, utiliser les données mockées
    if (process.env.NODE_ENV === 'development' || !MODASH_API_KEY || MODASH_API_KEY === 'demo-key') {
      const result = await mockModashSearch(platform, request);
      setSearchCache(cacheKey, result);
      return result;
    }

    // Appel API réel
    const result = await callModashAPI<ModashSearchResponse>(
      `/${platform}/search`,
      'POST',
      request
    );

    setSearchCache(cacheKey, result);
    return result;
  } catch (error) {
    console.error(`Error searching ${platform} influencers:`, error);
    
    // Fallback sur les données mockées en cas d'erreur
    const fallback = await mockModashSearch(platform, request);
    return fallback;
  }
}

// ========================================
// RAPPORTS D'INFLUENCEURS
// ========================================

function generateMockInstagramReport(userId: string): ModashInstagramReportProfile {
  return {
    userId,
    profile: {
      userId,
      fullname: `Mock Instagram User`,
      username: `mock_user_${userId}`,
      url: `https://instagram.com/mock_user_${userId}`,
      picture: `https://picsum.photos/150/150?random=${userId}`,
      followers: Math.floor(Math.random() * 1000000) + 10000,
      following: Math.floor(Math.random() * 5000) + 100,
      isPrivate: Math.random() < 0.1,
      isVerified: Math.random() < 0.2,
      accountType: ['Regular', 'Business', 'Creator'][Math.floor(Math.random() * 3)] as 'Regular' | 'Business' | 'Creator',
    },
    hashtags: Array.from({ length: 10 }, (_, i) => ({
      tag: `hashtag${i + 1}`,
      weight: Math.random(),
    })),
    mentions: Array.from({ length: 5 }, (_, i) => ({
      tag: `@mention${i + 1}`,
      weight: Math.random(),
    })),
    statsByContentType: {
      posts: {
        count: Math.floor(Math.random() * 100) + 10,
        avgLikes: Math.floor(Math.random() * 10000) + 100,
        avgComments: Math.floor(Math.random() * 500) + 10,
        avgViews: Math.floor(Math.random() * 50000) + 1000,
      },
      reels: {
        count: Math.floor(Math.random() * 50) + 5,
        avgLikes: Math.floor(Math.random() * 20000) + 500,
        avgComments: Math.floor(Math.random() * 1000) + 50,
        avgViews: Math.floor(Math.random() * 100000) + 5000,
      },
    },
    audience: {
      genders: [
        { code: 'MALE', weight: Math.random() * 0.6 + 0.2 },
        { code: 'FEMALE', weight: Math.random() * 0.6 + 0.2 },
      ],
      ages: [
        { code: '18-24', weight: Math.random() * 0.4 + 0.1 },
        { code: '25-34', weight: Math.random() * 0.4 + 0.1 },
        { code: '35-44', weight: Math.random() * 0.3 + 0.1 },
      ],
      geoCountries: [
        { name: 'United States', weight: Math.random() * 0.5 + 0.1, code: 'US' },
        { name: 'United Kingdom', weight: Math.random() * 0.3 + 0.1, code: 'GB' },
        { name: 'France', weight: Math.random() * 0.2 + 0.1, code: 'FR' },
      ],
      geoCities: [
        { name: 'New York', weight: Math.random() * 0.3 + 0.1, code: 'NYC' },
        { name: 'London', weight: Math.random() * 0.2 + 0.1, code: 'LON' },
        { name: 'Paris', weight: Math.random() * 0.2 + 0.1, code: 'PAR' },
      ],
      languages: [
        { code: 'en', name: 'English', weight: Math.random() * 0.7 + 0.2 },
        { code: 'fr', name: 'French', weight: Math.random() * 0.3 + 0.1 },
      ],
      interests: Array.from({ length: 5 }, (_, i) => ({
        id: i + 1,
        name: `Interest ${i + 1}`,
        weight: Math.random(),
      })),
      credibility: Math.random() * 0.5 + 0.5,
      notable: Math.random() * 0.1,
      notableUsers: [],
      audienceLookalikes: [],
      gendersPerAge: [
        { code: '18-24', male: Math.random() * 0.5, female: Math.random() * 0.5 },
        { code: '25-34', male: Math.random() * 0.5, female: Math.random() * 0.5 },
      ],
    },
    recentPosts: Array.from({ length: 10 }, (_, i) => ({
      id: `post_${i + 1}`,
      text: `Mock post content ${i + 1}`,
      url: `https://instagram.com/p/mock_${i + 1}`,
      created: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
      likes: Math.floor(Math.random() * 10000) + 100,
      comments: Math.floor(Math.random() * 500) + 10,
      views: Math.floor(Math.random() * 50000) + 1000,
      hashtags: [`hashtag${i + 1}`, `tag${i + 1}`],
      mentions: [`@mention${i + 1}`],
      thumbnail: `https://picsum.photos/300/300?random=${i}`,
    })),
    popularPosts: Array.from({ length: 5 }, (_, i) => ({
      id: `popular_${i + 1}`,
      text: `Popular post ${i + 1}`,
      url: `https://instagram.com/p/popular_${i + 1}`,
      created: new Date(Date.now() - i * 7 * 24 * 60 * 60 * 1000).toISOString(),
      likes: Math.floor(Math.random() * 50000) + 5000,
      comments: Math.floor(Math.random() * 2000) + 100,
      views: Math.floor(Math.random() * 200000) + 10000,
      hashtags: [`popular${i + 1}`],
      mentions: [],
      thumbnail: `https://picsum.photos/300/300?random=${100 + i}`,
    })),
    city: 'New York',
    state: 'New York',
    country: 'US',
    gender: Math.random() < 0.5 ? 'MALE' : 'FEMALE',
    ageGroup: ['18-24', '25-34', '35-44'][Math.floor(Math.random() * 3)] as '18-24' | '25-34' | '35-44',
    language: { code: 'en', name: 'English' },
    contacts: [
      { type: 'email', value: `mock_user_${userId}@example.com` },
    ],
    postsCounts: Math.floor(Math.random() * 500) + 50,
    postsCount: Math.floor(Math.random() * 500) + 50,
    avgLikes: Math.floor(Math.random() * 10000) + 500,
    avgComments: Math.floor(Math.random() * 500) + 25,
    avgViews: Math.floor(Math.random() * 50000) + 2000,
    avgReelsPlays: Math.floor(Math.random() * 100000) + 5000,
    bio: `Mock bio for user ${userId}. Lifestyle content creator and influencer.`,
    interests: Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      name: `Interest ${i + 1}`,
    })),
    brandAffinity: Array.from({ length: 3 }, (_, i) => ({
      id: i + 1,
      name: `Brand ${i + 1}`,
    })),
    sponsoredPosts: Array.from({ length: 3 }, (_, i) => ({
      id: `sponsored_${i + 1}`,
      text: `Sponsored post ${i + 1}`,
      url: `https://instagram.com/p/sponsored_${i + 1}`,
      created: new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000).toISOString(),
      likes: Math.floor(Math.random() * 20000) + 2000,
      comments: Math.floor(Math.random() * 1000) + 50,
      views: Math.floor(Math.random() * 100000) + 5000,
      thumbnail: `https://picsum.photos/300/300?random=${200 + i}`,
      type: 'post',
      title: `Sponsored Post ${i + 1}`,
      sponsors: [{ name: `Sponsor Brand ${i + 1}` }],
    })),
    paidPostPerformance: Math.random() * 0.5 + 0.5,
    paidPostPerformanceViews: Math.floor(Math.random() * 50000) + 10000,
    sponsoredPostsMedianViews: Math.floor(Math.random() * 80000) + 15000,
    sponsoredPostsMedianLikes: Math.floor(Math.random() * 15000) + 3000,
    nonSponsoredPostsMedianViews: Math.floor(Math.random() * 40000) + 8000,
    nonSponsoredPostsMedianLikes: Math.floor(Math.random() * 8000) + 1500,
    statHistory: Array.from({ length: 12 }, (_, i) => ({
      month: new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 7),
      followers: Math.floor(Math.random() * 100000) + 50000 + i * 1000,
      following: Math.floor(Math.random() * 2000) + 500,
      avgLikes: Math.floor(Math.random() * 5000) + 1000,
      avgViews: Math.floor(Math.random() * 25000) + 5000,
      avgComments: Math.floor(Math.random() * 250) + 50,
    })),
    lookalikes: Array.from({ length: 5 }, (_, i) => ({
      userId: `lookalike_${i + 1}`,
      username: `lookalike_${i + 1}`,
      fullname: `Lookalike User ${i + 1}`,
      picture: `https://picsum.photos/100/100?random=${300 + i}`,
      followers: Math.floor(Math.random() * 500000) + 10000,
      isVerified: Math.random() < 0.3,
      engagements: Math.floor(Math.random() * 25000) + 1000,
    })),
  };
}

export async function getInfluencerReport(
  platform: 'instagram' | 'youtube' | 'tiktok',
  userId: string,
  calculationMethod: 'median' | 'average' = 'median'
): Promise<ModashReportResponse> {
  const cacheKey = getReportCacheKey(platform, userId, calculationMethod);
  const cached = getFromSearchCache<ModashReportResponse>(cacheKey, REPORT_CACHE_DURATION);
  
  if (cached) {
    return cached;
  }

  try {
    // En mode développement, utiliser les données mockées
    if (process.env.NODE_ENV === 'development' || !MODASH_API_KEY || MODASH_API_KEY === 'demo-key') {
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulation délai
      
      let mockProfile;
      if (platform === 'instagram') {
        mockProfile = generateMockInstagramReport(userId);
      } else {
        // Pour YouTube et TikTok, générer des structures similaires mais adaptées
        mockProfile = generateMockInstagramReport(userId); // Temporaire
      }

      const result: ModashReportResponse = {
        error: false,
        profile: mockProfile,
      };

      setSearchCache(cacheKey, result);
      return result;
    }

    // Appel API réel
    const result = await callModashAPI<ModashReportResponse>(
      `/${platform}/profile/${userId}/report?calculationMethod=${calculationMethod}`
    );

    setSearchCache(cacheKey, result);
    return result;
  } catch (error) {
    console.error(`Error fetching ${platform} report for ${userId}:`, error);
    
    // Fallback sur les données mockées
    const mockProfile = generateMockInstagramReport(userId);
    return {
      error: false,
      profile: mockProfile,
    };
  }
}

// ========================================
// DONNÉES DE PERFORMANCE
// ========================================

export async function getPerformanceData(
  platform: 'instagram' | 'youtube' | 'tiktok',
  url: string
): Promise<ModashPerformanceData> {
  const cacheKey = `performance:${platform}:${url}`;
  const cached = getFromSearchCache<ModashPerformanceData>(cacheKey);
  
  if (cached) {
    return cached;
  }

  try {
    // En mode développement, générer des données mockées
    if (process.env.NODE_ENV === 'development' || !MODASH_API_KEY || MODASH_API_KEY === 'demo-key') {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulation délai plus long
      
      const mockData: ModashPerformanceData = {
        posts: {
          total: Math.floor(Math.random() * 50) + 10,
          posts_with_hidden_likes: Math.floor(Math.random() * 5),
          likes: {
            mean: [{ numberOfItems: 30, value: Math.floor(Math.random() * 10000) + 1000 }],
            min: [{ numberOfItems: 30, value: Math.floor(Math.random() * 500) + 50 }],
            max: [{ numberOfItems: 30, value: Math.floor(Math.random() * 50000) + 5000 }],
            median: [{ numberOfItems: 30, value: Math.floor(Math.random() * 8000) + 800 }],
          },
          comments: {
            mean: [{ numberOfItems: 30, value: Math.floor(Math.random() * 500) + 50 }],
            min: [{ numberOfItems: 30, value: Math.floor(Math.random() * 10) + 1 }],
            max: [{ numberOfItems: 30, value: Math.floor(Math.random() * 2000) + 200 }],
            median: [{ numberOfItems: 30, value: Math.floor(Math.random() * 300) + 30 }],
          },
          views: {
            mean: [{ numberOfItems: 30, value: Math.floor(Math.random() * 100000) + 10000 }],
            min: [{ numberOfItems: 30, value: Math.floor(Math.random() * 5000) + 500 }],
            max: [{ numberOfItems: 30, value: Math.floor(Math.random() * 500000) + 50000 }],
            median: [{ numberOfItems: 30, value: Math.floor(Math.random() * 80000) + 8000 }],
          },
          engagement_rate: [{ numberOfItems: 30, value: Math.random() * 0.1 + 0.02 }],
          posting_statistics: {
            weekDay: {
              mean: {
                numberOfItems: 30,
                value: {
                  monday: Math.random(),
                  tuesday: Math.random(),
                  wednesday: Math.random(),
                  thursday: Math.random(),
                  friday: Math.random(),
                  saturday: Math.random(),
                  sunday: Math.random(),
                },
              },
            },
            daily: {
              mean: {
                numberOfItems: 30,
                value: Math.random() * 3 + 0.5,
              },
            },
          },
        },
      };

      setSearchCache(cacheKey, mockData);
      return mockData;
    }

    // Appel API réel
    const result = await callModashAPI<ModashPerformanceData>(
      `/${platform}/performance-data?url=${encodeURIComponent(url)}`
    );

    setSearchCache(cacheKey, result);
    return result;
  } catch (error) {
    console.error(`Error fetching performance data for ${url}:`, error);
    throw error;
  }
}

// ========================================
// RECHERCHE PAR EMAIL
// ========================================

export async function searchByEmail(
  emails: string[]
): Promise<ModashEmailSearchResponse> {
  const cacheKey = `email-search:${emails.join(',')}`;
  const cached = getFromSearchCache<ModashEmailSearchResponse>(cacheKey);
  
  if (cached) {
    return cached;
  }

  try {
    // En mode développement, générer des données mockées
    if (process.env.NODE_ENV === 'development' || !MODASH_API_KEY || MODASH_API_KEY === 'demo-key') {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const matchedEmails = emails.slice(0, Math.floor(emails.length * 0.7)).map(email => ({
        email,
        accounts: [
          {
            platform: 'instagram' as const,
            userId: `user_${email.split('@')[0]}`,
            username: email.split('@')[0],
            fullname: `User ${email.split('@')[0]}`,
            picture: `https://picsum.photos/100/100?random=${email.length}`,
            followers: Math.floor(Math.random() * 100000) + 1000,
            isVerified: Math.random() < 0.2,
          },
        ],
      }));

      const result: ModashEmailSearchResponse = {
        error: false,
        matchedEmails,
        notMatchedEmails: emails.slice(matchedEmails.length),
        totalMatches: matchedEmails.length,
      };

      setSearchCache(cacheKey, result);
      return result;
    }

    // Appel API réel
    const result = await callModashAPI<ModashEmailSearchResponse>(
      '/email-search',
      'POST',
      { emails }
    );

    setSearchCache(cacheKey, result);
    return result;
  } catch (error) {
    console.error('Error in email search:', error);
    throw error;
  }
}

// ========================================
// AUDIENCE OVERLAP
// ========================================

export async function getAudienceOverlap(
  platform: 'instagram' | 'youtube' | 'tiktok',
  influencers: string[]
): Promise<ModashAudienceOverlapResponse> {
  const cacheKey = `overlap:${platform}:${influencers.join(',')}`;
  const cached = getFromSearchCache<ModashAudienceOverlapResponse>(cacheKey);
  
  if (cached) {
    return cached;
  }

  try {
    // En mode développement, générer des données mockées
    if (process.env.NODE_ENV === 'development' || !MODASH_API_KEY || MODASH_API_KEY === 'demo-key') {
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const totalFollowers = influencers.length * 100000;
      const totalUniqueFollowers = Math.floor(totalFollowers * 0.7);
      
      const data = influencers.map(userId => ({
        userId,
        username: `user_${userId}`,
        followers: Math.floor(Math.random() * 200000) + 50000,
        uniquePercentage: Math.random() * 0.5 + 0.3,
        overlappingPercentage: Math.random() * 0.4 + 0.1,
      }));

      const result: ModashAudienceOverlapResponse = {
        error: false,
        reportInfo: {
          totalFollowers,
          totalUniqueFollowers,
        },
        data,
      };

      setSearchCache(cacheKey, result);
      return result;
    }

    // Appel API réel
    const result = await callModashAPI<ModashAudienceOverlapResponse>(
      `/${platform}/reports/audience/overlap`,
      'POST',
      { influencers }
    );

    setSearchCache(cacheKey, result);
    return result;
  } catch (error) {
    console.error(`Error fetching audience overlap for ${platform}:`, error);
    throw error;
  }
}

// ========================================
// UTILITAIRES DE CACHE
// ========================================

export function clearSearchCache(): void {
  searchCache.clear();
}

export function getSearchCacheStats(): { size: number; keys: string[] } {
  return {
    size: searchCache.size,
    keys: Array.from(searchCache.keys()),
  };
}

// ========================================
// TRANSFORMATION DES FILTRES
// ========================================

export function transformAdvancedFiltersToModash(
  filters: AdvancedSearchFilters
): ModashSearchFilters {
  const modashFilters: ModashSearchFilters = {};

  // Transformation des filtres créateur
  if (filters.creator || filters.audience) {
    const influencerFilters: ModashInfluencerFilters = {};
    
    if (filters.audience?.followersRange) {
      influencerFilters.followers = {
        min: filters.audience.followersRange.min,
        max: filters.audience.followersRange.max,
      };
    }

    if (filters.audience?.engagementRange) {
      influencerFilters.engagementRate = filters.audience.engagementRange.min / 100;
    }

    if (filters.creator?.gender) {
      influencerFilters.gender = filters.creator.gender.toUpperCase() as 'MALE' | 'FEMALE';
    }

    if (filters.creator?.ageRange) {
      influencerFilters.age = {
        min: filters.creator.ageRange.min,
        max: filters.creator.ageRange.max,
      };
    }

    if (filters.creator?.verified !== undefined) {
      influencerFilters.isVerified = filters.creator.verified;
    }

    modashFilters.influencer = influencerFilters;
  }

  // Transformation des filtres audience avec weights
  if (filters.audience) {
    const audienceFilters: ModashAudienceFilters = {};
    
    // Pour l'instant, utilisation de weights par défaut
    // À terme, permettre à l'utilisateur de configurer les weights
    if (filters.audience.audienceLocation?.topCountries) {
      audienceFilters.location = filters.audience.audienceLocation.topCountries.map((countryCode: string, index: number) => ({
        id: index + 1, // Mapping vers les IDs Modash
        weight: 0.2, // Weight par défaut
      }));
    }

    if (filters.audience.audienceGender) {
      if (filters.audience.audienceGender.malePercentage?.min) {
        audienceFilters.gender = {
          id: 'MALE',
          weight: filters.audience.audienceGender.malePercentage.min / 100,
        };
      }
    }

    modashFilters.audience = audienceFilters;
  }

  return modashFilters;
}
