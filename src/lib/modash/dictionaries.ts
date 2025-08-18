import {
  ModashLanguage,
  ModashLocation,
  ModashBrand,
  ModashInterest,
  ModashUser,
} from '@/types';

// ========================================
// FAÇADE DICTIONNAIRES MODASH API
// ========================================

// Cache pour éviter les appels répétés
const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function getCacheKey(endpoint: string, params?: Record<string, string | number>): string {
  const paramString = params ? JSON.stringify(params) : '';
  return `${endpoint}:${paramString}`;
}

function getFromCache<T>(key: string): T | null {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data as T;
  }
  return null;
}

function setCache<T>(key: string, data: T): void {
  cache.set(key, { data, timestamp: Date.now() });
}

// Fonction utilitaire pour simuler les appels API Modash
async function mockModashCall<T>(
  endpoint: string,
  mockData: T,
  delay = 300
): Promise<{ error: boolean; data: T; total?: number }> {
  // Simulation d'un délai réseau
  await new Promise(resolve => setTimeout(resolve, delay));
  
  // Simulation d'erreurs occasionnelles (5% de chance)
  if (Math.random() < 0.05) {
    throw new Error(`Modash API Error: ${endpoint} temporarily unavailable`);
  }
  
  return {
    error: false,
    data: mockData,
    total: Array.isArray(mockData) ? mockData.length : undefined,
  };
}

// ========================================
// DICTIONNAIRES LANGUAGES
// ========================================

const mockLanguages: ModashLanguage[] = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'French' },
  { code: 'es', name: 'Spanish' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
  { code: 'tr', name: 'Turkish' },
  { code: 'pl', name: 'Polish' },
  { code: 'nl', name: 'Dutch' },
  { code: 'sv', name: 'Swedish' },
  { code: 'da', name: 'Danish' },
  { code: 'no', name: 'Norwegian' },
  { code: 'fi', name: 'Finnish' },
  { code: 'he', name: 'Hebrew' },
];

export async function getLanguages(
  platform: 'instagram' | 'youtube' | 'tiktok',
  query?: string,
  limit = 20
): Promise<{ languages: ModashLanguage[]; total: number }> {
  const cacheKey = getCacheKey(`${platform}/languages`, { query: query || '', limit });
  const cached = getFromCache<{ languages: ModashLanguage[]; total: number }>(cacheKey);
  
  if (cached) {
    return cached;
  }

  try {
    let filteredLanguages = mockLanguages;
    
    // Filtrage par query si fournie
    if (query) {
      const queryLower = query.toLowerCase();
      filteredLanguages = mockLanguages.filter(
        lang => 
          lang.name.toLowerCase().includes(queryLower) ||
          lang.code.toLowerCase().includes(queryLower)
      );
    }
    
    // Limitation des résultats
    const limitedLanguages = filteredLanguages.slice(0, limit);
    
    const result = await mockModashCall(`${platform}/languages`, {
      languages: limitedLanguages,
      total: filteredLanguages.length,
    });
    
    const response = {
      languages: result.data.languages,
      total: result.data.total,
    };
    
    setCache(cacheKey, response);
    return response;
  } catch (error) {
    console.error('Error fetching languages:', error);
    // Fallback sur les données mockées en cas d'erreur
    return {
      languages: mockLanguages.slice(0, limit),
      total: mockLanguages.length,
    };
  }
}

// ========================================
// DICTIONNAIRES LOCATIONS
// ========================================

const mockLocations: ModashLocation[] = [
  { id: 1, name: 'Paris', title: 'Paris, France' },
  { id: 2, name: 'London', title: 'London, United Kingdom' },
  { id: 3, name: 'New York', title: 'New York, United States' },
  { id: 4, name: 'Los Angeles', title: 'Los Angeles, United States' },
  { id: 5, name: 'Tokyo', title: 'Tokyo, Japan' },
  { id: 6, name: 'Berlin', title: 'Berlin, Germany' },
  { id: 7, name: 'Madrid', title: 'Madrid, Spain' },
  { id: 8, name: 'Rome', title: 'Rome, Italy' },
  { id: 9, name: 'Amsterdam', title: 'Amsterdam, Netherlands' },
  { id: 10, name: 'Stockholm', title: 'Stockholm, Sweden' },
  { id: 11, name: 'Copenhagen', title: 'Copenhagen, Denmark' },
  { id: 12, name: 'Oslo', title: 'Oslo, Norway' },
  { id: 13, name: 'Helsinki', title: 'Helsinki, Finland' },
  { id: 14, name: 'Vienna', title: 'Vienna, Austria' },
  { id: 15, name: 'Zurich', title: 'Zurich, Switzerland' },
  { id: 16, name: 'Brussels', title: 'Brussels, Belgium' },
  { id: 17, name: 'Dublin', title: 'Dublin, Ireland' },
  { id: 18, name: 'Lisbon', title: 'Lisbon, Portugal' },
  { id: 19, name: 'Prague', title: 'Prague, Czech Republic' },
  { id: 20, name: 'Warsaw', title: 'Warsaw, Poland' },
];

export async function getLocations(
  platform: 'instagram' | 'youtube' | 'tiktok',
  query?: string,
  limit = 20
): Promise<{ locations: ModashLocation[]; total: number }> {
  const cacheKey = getCacheKey(`${platform}/locations`, { query: query || '', limit });
  const cached = getFromCache<{ locations: ModashLocation[]; total: number }>(cacheKey);
  
  if (cached) {
    return cached;
  }

  try {
    let filteredLocations = mockLocations;
    
    // Filtrage par query si fournie
    if (query) {
      const queryLower = query.toLowerCase();
      filteredLocations = mockLocations.filter(
        location => 
          location.name.toLowerCase().includes(queryLower) ||
          location.title.toLowerCase().includes(queryLower)
      );
    }
    
    // Limitation des résultats
    const limitedLocations = filteredLocations.slice(0, limit);
    
    const result = await mockModashCall(`${platform}/locations`, {
      locations: limitedLocations,
      total: filteredLocations.length,
    });
    
    const response = {
      locations: result.data.locations,
      total: result.data.total,
    };
    
    setCache(cacheKey, response);
    return response;
  } catch (error) {
    console.error('Error fetching locations:', error);
    return {
      locations: mockLocations.slice(0, limit),
      total: mockLocations.length,
    };
  }
}

// ========================================
// DICTIONNAIRES TOPICS
// ========================================

const mockTopics: string[] = [
  'fashion', 'beauty', 'lifestyle', 'fitness', 'food', 'travel', 'technology',
  'gaming', 'music', 'art', 'photography', 'business', 'education', 'health',
  'parenting', 'pets', 'sports', 'automotive', 'home', 'diy', 'comedy',
  'entertainment', 'news', 'politics', 'science', 'nature', 'books', 'movies',
  'tv', 'anime', 'dance', 'cooking', 'baking', 'wine', 'coffee', 'tea',
  'skincare', 'makeup', 'hair', 'nails', 'jewelry', 'watches', 'shoes',
  'bags', 'luxury', 'streetwear', 'vintage', 'sustainable', 'vegan',
  'organic', 'wellness', 'meditation', 'yoga', 'running', 'cycling',
];

export async function getTopics(
  platform: 'instagram' | 'youtube' | 'tiktok',
  query?: string,
  limit = 20
): Promise<{ tags: string[]; total: number }> {
  const cacheKey = getCacheKey(`${platform}/topics`, { query: query || '', limit });
  const cached = getFromCache<{ tags: string[]; total: number }>(cacheKey);
  
  if (cached) {
    return cached;
  }

  try {
    let filteredTopics = mockTopics;
    
    // Filtrage par query si fournie
    if (query) {
      const queryLower = query.toLowerCase();
      filteredTopics = mockTopics.filter(topic => 
        topic.toLowerCase().includes(queryLower)
      );
    }
    
    // Limitation des résultats
    const limitedTopics = filteredTopics.slice(0, limit);
    
    const result = await mockModashCall(`${platform}/topics`, {
      tags: limitedTopics,
      total: filteredTopics.length,
    });
    
    const response = {
      tags: result.data.tags,
      total: result.data.total,
    };
    
    setCache(cacheKey, response);
    return response;
  } catch (error) {
    console.error('Error fetching topics:', error);
    return {
      tags: mockTopics.slice(0, limit),
      total: mockTopics.length,
    };
  }
}

// ========================================
// DICTIONNAIRES HASHTAGS
// ========================================

const mockHashtags: string[] = [
  'fashion', 'style', 'ootd', 'beauty', 'makeup', 'skincare', 'lifestyle',
  'fitness', 'workout', 'gym', 'healthy', 'food', 'foodie', 'recipe',
  'travel', 'wanderlust', 'adventure', 'nature', 'photography', 'photooftheday',
  'instagood', 'love', 'happy', 'blessed', 'grateful', 'motivation',
  'inspiration', 'success', 'entrepreneur', 'business', 'tech', 'innovation',
  'gaming', 'gamer', 'music', 'art', 'creative', 'design', 'handmade',
  'diy', 'home', 'decor', 'interior', 'architecture', 'luxury', 'vintage',
  'sustainable', 'eco', 'vegan', 'organic', 'wellness', 'selfcare',
];

export async function getHashtags(
  platform: 'instagram' | 'youtube' | 'tiktok',
  query?: string,
  limit = 20
): Promise<{ tags: string[]; total: number }> {
  const cacheKey = getCacheKey(`${platform}/hashtags`, { query: query || '', limit });
  const cached = getFromCache<{ tags: string[]; total: number }>(cacheKey);
  
  if (cached) {
    return cached;
  }

  try {
    let filteredHashtags = mockHashtags;
    
    // Filtrage par query si fournie
    if (query) {
      const queryLower = query.toLowerCase().replace('#', '');
      filteredHashtags = mockHashtags.filter(hashtag => 
        hashtag.toLowerCase().includes(queryLower)
      );
    }
    
    // Limitation des résultats
    const limitedHashtags = filteredHashtags.slice(0, limit);
    
    const result = await mockModashCall(`${platform}/hashtags`, {
      tags: limitedHashtags,
      total: filteredHashtags.length,
    });
    
    const response = {
      tags: result.data.tags,
      total: result.data.total,
    };
    
    setCache(cacheKey, response);
    return response;
  } catch (error) {
    console.error('Error fetching hashtags:', error);
    return {
      tags: mockHashtags.slice(0, limit),
      total: mockHashtags.length,
    };
  }
}

// ========================================
// DICTIONNAIRES INTERESTS (Instagram uniquement)
// ========================================

const mockInterests: ModashInterest[] = [
  { id: 1, name: 'Fashion & Style' },
  { id: 2, name: 'Beauty & Cosmetics' },
  { id: 3, name: 'Health & Fitness' },
  { id: 4, name: 'Food & Cooking' },
  { id: 5, name: 'Travel & Tourism' },
  { id: 6, name: 'Technology' },
  { id: 7, name: 'Gaming' },
  { id: 8, name: 'Music' },
  { id: 9, name: 'Art & Design' },
  { id: 10, name: 'Photography' },
  { id: 11, name: 'Business & Finance' },
  { id: 12, name: 'Education' },
  { id: 13, name: 'Entertainment' },
  { id: 14, name: 'Sports' },
  { id: 15, name: 'Automotive' },
  { id: 16, name: 'Home & Garden' },
  { id: 17, name: 'Parenting' },
  { id: 18, name: 'Pets & Animals' },
  { id: 19, name: 'Books & Literature' },
  { id: 20, name: 'Movies & TV' },
];

export async function getInterests(
  query?: string,
  limit = 20
): Promise<{ interests: ModashInterest[]; total: number }> {
  const cacheKey = getCacheKey('instagram/interests', { query: query || '', limit });
  const cached = getFromCache<{ interests: ModashInterest[]; total: number }>(cacheKey);
  
  if (cached) {
    return cached;
  }

  try {
    let filteredInterests = mockInterests;
    
    // Filtrage par query si fournie
    if (query) {
      const queryLower = query.toLowerCase();
      filteredInterests = mockInterests.filter(interest => 
        interest.name.toLowerCase().includes(queryLower)
      );
    }
    
    // Limitation des résultats
    const limitedInterests = filteredInterests.slice(0, limit);
    
    const result = await mockModashCall('instagram/interests', {
      interests: limitedInterests,
      total: filteredInterests.length,
    });
    
    const response = {
      interests: result.data.interests,
      total: result.data.total,
    };
    
    setCache(cacheKey, response);
    return response;
  } catch (error) {
    console.error('Error fetching interests:', error);
    return {
      interests: mockInterests.slice(0, limit),
      total: mockInterests.length,
    };
  }
}

// ========================================
// DICTIONNAIRES BRANDS (Instagram uniquement)
// ========================================

const mockBrands: ModashBrand[] = [
  { id: 1, name: 'Nike' },
  { id: 2, name: 'Adidas' },
  { id: 3, name: 'Apple' },
  { id: 4, name: 'Samsung' },
  { id: 5, name: 'Coca-Cola' },
  { id: 6, name: 'McDonald\'s' },
  { id: 7, name: 'Starbucks' },
  { id: 8, name: 'Amazon' },
  { id: 9, name: 'Google' },
  { id: 10, name: 'Microsoft' },
  { id: 11, name: 'Tesla' },
  { id: 12, name: 'BMW' },
  { id: 13, name: 'Mercedes-Benz' },
  { id: 14, name: 'Louis Vuitton' },
  { id: 15, name: 'Gucci' },
  { id: 16, name: 'Chanel' },
  { id: 17, name: 'Prada' },
  { id: 18, name: 'Rolex' },
  { id: 19, name: 'Omega' },
  { id: 20, name: 'Cartier' },
];

export async function getBrands(
  query?: string,
  limit = 20
): Promise<{ brands: ModashBrand[]; total: number }> {
  const cacheKey = getCacheKey('instagram/brands', { query: query || '', limit });
  const cached = getFromCache<{ brands: ModashBrand[]; total: number }>(cacheKey);
  
  if (cached) {
    return cached;
  }

  try {
    let filteredBrands = mockBrands;
    
    // Filtrage par query si fournie
    if (query) {
      const queryLower = query.toLowerCase();
      filteredBrands = mockBrands.filter(brand => 
        brand.name.toLowerCase().includes(queryLower)
      );
    }
    
    // Limitation des résultats
    const limitedBrands = filteredBrands.slice(0, limit);
    
    const result = await mockModashCall('instagram/brands', {
      brands: limitedBrands,
      total: filteredBrands.length,
    });
    
    const response = {
      brands: result.data.brands,
      total: result.data.total,
    };
    
    setCache(cacheKey, response);
    return response;
  } catch (error) {
    console.error('Error fetching brands:', error);
    return {
      brands: mockBrands.slice(0, limit),
      total: mockBrands.length,
    };
  }
}

// ========================================
// DICTIONNAIRES USERS
// ========================================

const mockUsers: ModashUser[] = [
  {
    userId: '1',
    username: 'cristiano',
    fullname: 'Cristiano Ronaldo',
    picture: 'https://example.com/cristiano.jpg',
    followers: 500000000,
    isVerified: true,
  },
  {
    userId: '2',
    username: 'kyliejenner',
    fullname: 'Kylie Jenner',
    picture: 'https://example.com/kylie.jpg',
    followers: 400000000,
    isVerified: true,
  },
  {
    userId: '3',
    username: 'selenagomez',
    fullname: 'Selena Gomez',
    picture: 'https://example.com/selena.jpg',
    followers: 350000000,
    isVerified: true,
  },
  {
    userId: '4',
    username: 'kimkardashian',
    fullname: 'Kim Kardashian',
    picture: 'https://example.com/kim.jpg',
    followers: 300000000,
    isVerified: true,
  },
  {
    userId: '5',
    username: 'arianagrande',
    fullname: 'Ariana Grande',
    picture: 'https://example.com/ariana.jpg',
    followers: 280000000,
    isVerified: true,
  },
];

export async function getUsers(
  platform: 'instagram' | 'youtube' | 'tiktok',
  query?: string,
  limit = 20
): Promise<{ users: ModashUser[]; total: number }> {
  const cacheKey = getCacheKey(`${platform}/users`, { query: query || '', limit });
  const cached = getFromCache<{ users: ModashUser[]; total: number }>(cacheKey);
  
  if (cached) {
    return cached;
  }

  try {
    let filteredUsers = mockUsers;
    
    // Filtrage par query si fournie
    if (query) {
      const queryLower = query.toLowerCase().replace('@', '');
      filteredUsers = mockUsers.filter(user => 
        user.username.toLowerCase().includes(queryLower) ||
        user.fullname.toLowerCase().includes(queryLower)
      );
    }
    
    // Limitation des résultats
    const limitedUsers = filteredUsers.slice(0, limit);
    
    const result = await mockModashCall(`${platform}/users`, {
      users: limitedUsers,
      total: filteredUsers.length,
    });
    
    const response = {
      users: result.data.users,
      total: result.data.total,
    };
    
    setCache(cacheKey, response);
    return response;
  } catch (error) {
    console.error('Error fetching users:', error);
    return {
      users: mockUsers.slice(0, limit),
      total: mockUsers.length,
    };
  }
}

// ========================================
// UTILITAIRES DE CACHE
// ========================================

export function clearDictionariesCache(): void {
  cache.clear();
}

export function getCacheStats(): { size: number; keys: string[] } {
  return {
    size: cache.size,
    keys: Array.from(cache.keys()),
  };
}

// ========================================
// FONCTION UTILITAIRE POUR RECHERCHE UNIFIÉE
// ========================================

export async function searchAllDictionaries(
  platform: 'instagram' | 'youtube' | 'tiktok',
  query: string,
  limit = 5
): Promise<{
  languages: ModashLanguage[];
  locations: ModashLocation[];
  topics: string[];
  hashtags: string[];
  users: ModashUser[];
  interests?: ModashInterest[]; // Instagram uniquement
  brands?: ModashBrand[]; // Instagram uniquement
}> {
  try {
    // Appels de base pour toutes les plateformes
    const [
      languagesResult,
      locationsResult,
      topicsResult,
      hashtagsResult,
      usersResult,
    ] = await Promise.all([
      getLanguages(platform, query, limit),
      getLocations(platform, query, limit),
      getTopics(platform, query, limit),
      getHashtags(platform, query, limit),
      getUsers(platform, query, limit),
    ]);

    const response: {
      languages: ModashLanguage[];
      locations: ModashLocation[];
      topics: string[];
      hashtags: string[];
      users: ModashUser[];
      interests?: ModashInterest[];
      brands?: ModashBrand[];
    } = {
      languages: languagesResult.languages,
      locations: locationsResult.locations,
      topics: topicsResult.tags,
      hashtags: hashtagsResult.tags,
      users: usersResult.users,
    };

    // Ajout des dictionnaires spécifiques à Instagram
    if (platform === 'instagram') {
      const [interestsResult, brandsResult] = await Promise.all([
        getInterests(query, limit),
        getBrands(query, limit),
      ]);
      
      response.interests = interestsResult.interests;
      response.brands = brandsResult.brands;
    }

    return response;
  } catch (error) {
    console.error('Error in unified search:', error);
    // Retour de données vides en cas d'erreur
    return {
      languages: [],
      locations: [],
      topics: [],
      hashtags: [],
      users: [],
      ...(platform === 'instagram' && { interests: [], brands: [] }),
    };
  }
}
