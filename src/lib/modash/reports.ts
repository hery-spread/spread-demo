import {
  ModashInstagramReportProfile,
  ModashYouTubeReportProfile,
  ModashTikTokReportProfile,
  InfluencerDetails,
} from '@/types';
import { getInfluencerReport } from './search';

// ========================================
// TRANSFORMATION DES RAPPORTS MODASH
// ========================================

// Transformer un rapport Instagram Modash vers notre format
export function transformInstagramReport(
  modashProfile: ModashInstagramReportProfile
): InfluencerDetails {
  return {
    id: modashProfile.userId,
    name: modashProfile.profile.fullname || modashProfile.profile.username,
    username: modashProfile.profile.username,
    platform: 'instagram',
    avatar: modashProfile.profile.picture,
    followers: modashProfile.profile.followers,
    engagement: modashProfile.avgLikes + modashProfile.avgComments,
    engagementRate: (modashProfile.avgLikes + modashProfile.avgComments) / modashProfile.profile.followers * 100,
    country: modashProfile.country || 'Unknown',
    verified: modashProfile.profile.isVerified,
    email: modashProfile.contacts?.find(c => c.type === 'email')?.value,
    bio: modashProfile.bio,
    
    // Statistiques détaillées
    stats: {
      avgLikes: modashProfile.avgLikes,
      avgComments: modashProfile.avgComments,
      avgViews: modashProfile.avgViews,
      totalPosts: modashProfile.postsCount,
    },
    
    // Audience détaillée
    audience: {
      gender: {
        male: modashProfile.audience.genders.find(g => g.code === 'MALE')?.weight || 0,
        female: modashProfile.audience.genders.find(g => g.code === 'FEMALE')?.weight || 0,
      },
      age: {
        '13-17': modashProfile.audience.ages.find(a => a.code === '13-17')?.weight || 0,
        '18-24': modashProfile.audience.ages.find(a => a.code === '18-24')?.weight || 0,
        '25-34': modashProfile.audience.ages.find(a => a.code === '25-34')?.weight || 0,
        '35-44': modashProfile.audience.ages.find(a => a.code === '35-44')?.weight || 0,
        '45-64': modashProfile.audience.ages.find(a => a.code === '45-64')?.weight || 0,
      },
      countries: modashProfile.audience.geoCountries.reduce((acc, country) => {
        acc[country.code] = country.weight;
        return acc;
      }, {} as Record<string, number>),
      cities: modashProfile.audience.geoCities.reduce((acc, city) => {
        acc[city.code] = city.weight;
        return acc;
      }, {} as Record<string, number>),
      languages: modashProfile.audience.languages.reduce((acc, lang) => {
        acc[lang.code] = lang.weight;
        return acc;
      }, {} as Record<string, number>),
      ethnicities: modashProfile.audienceExtra?.ethnicities?.reduce((acc, ethnicity) => {
        acc[ethnicity.code] = ethnicity.weight;
        return acc;
      }, {} as Record<string, number>) || {},
      interests: {
        topics: modashProfile.audience.interests.reduce((acc, interest) => {
          acc[interest.name] = interest.weight;
          return acc;
        }, {} as Record<string, number>),
        brands: modashProfile.brandAffinity.reduce((acc, brand) => {
          acc[brand.name] = 0.5; // Poids par défaut
          return acc;
        }, {} as Record<string, number>),
      },
    },
    
    // Performance historique
    performance: modashProfile.statHistory.map(stat => ({
      date: stat.month,
      followers: stat.followers,
      engagement: stat.avgLikes + stat.avgComments,
      reach: stat.avgViews,
    })),
    
    // Breakdown de l'engagement
    engagementBreakdown: {
      likes: modashProfile.avgLikes,
      comments: modashProfile.avgComments,
      shares: 0, // Non disponible sur Instagram
      saves: 0, // Non disponible dans cette version
    },
    
    // Posts récents
    recentPosts: modashProfile.recentPosts.map(post => ({
      id: post.id,
      type: post.type === 'video' ? 'video' : 'image',
      thumbnail: post.thumbnail || post.image || '',
      likes: post.likes || 0,
      comments: post.comments || 0,
      engagement: ((post.likes || 0) + (post.comments || 0)) / modashProfile.profile.followers * 100,
      date: post.created,
    })),
    
    // Données de déblocage
    audienceUnlocked: true,
    unlockedAt: new Date().toISOString(),
  };
}

// Transformer un rapport YouTube Modash vers notre format
export function transformYouTubeReport(
  modashProfile: ModashYouTubeReportProfile
): InfluencerDetails {
  return {
    id: modashProfile.userId,
    name: modashProfile.profile.fullname || modashProfile.profile.username,
    username: modashProfile.profile.username,
    platform: 'youtube',
    avatar: modashProfile.profile.picture,
    followers: modashProfile.profile.followers,
    engagement: modashProfile.avgLikes + modashProfile.avgComments,
    engagementRate: (modashProfile.avgLikes + modashProfile.avgComments) / modashProfile.profile.followers * 100,
    country: modashProfile.country || 'Unknown',
    verified: modashProfile.profile.isVerified,
    email: modashProfile.contacts?.find(c => c.type === 'email')?.value,
    bio: modashProfile.description,
    
    // Statistiques détaillées
    stats: {
      avgLikes: modashProfile.avgLikes,
      avgComments: modashProfile.avgComments,
      avgViews: modashProfile.statsByContentType.videos?.avgViews || 0,
      totalPosts: modashProfile.postsCount,
    },
    
    // Audience détaillée
    audience: {
      gender: {
        male: modashProfile.audience.genders.find(g => g.code === 'MALE')?.weight || 0,
        female: modashProfile.audience.genders.find(g => g.code === 'FEMALE')?.weight || 0,
      },
      age: {
        '13-17': 0, // Non disponible sur YouTube
        '18-24': modashProfile.audience.ages.find(a => a.code === '18-24')?.weight || 0,
        '25-34': modashProfile.audience.ages.find(a => a.code === '25-34')?.weight || 0,
        '35-44': modashProfile.audience.ages.find(a => a.code === '35-44')?.weight || 0,
        '45-64': modashProfile.audience.ages.find(a => a.code === '45-64')?.weight || 0,
      },
      countries: modashProfile.audience.geoCountries.reduce((acc, country) => {
        acc[country.code] = country.weight;
        return acc;
      }, {} as Record<string, number>),
      cities: {},
      languages: modashProfile.audience.languages.reduce((acc, lang) => {
        acc[lang.code] = lang.weight;
        return acc;
      }, {} as Record<string, number>),
      ethnicities: {},
      interests: {
        topics: modashProfile.interests.reduce((acc, interest) => {
          acc[interest.name] = 0.5; // Poids par défaut
          return acc;
        }, {} as Record<string, number>),
        brands: modashProfile.audienceExtra?.brandAffinity?.reduce((acc, brand) => {
          acc[brand.name] = 0.5;
          return acc;
        }, {} as Record<string, number>) || {},
      },
    },
    
    // Performance historique
    performance: modashProfile.statHistory.map(stat => ({
      date: stat.month,
      followers: stat.followers,
      engagement: stat.avgLikes + stat.avgComments,
      reach: stat.avgViews,
    })),
    
    // Breakdown de l'engagement
    engagementBreakdown: {
      likes: modashProfile.avgLikes,
      comments: modashProfile.avgComments,
      shares: 0,
      saves: 0,
    },
    
    // Posts récents (vidéos)
    recentPosts: modashProfile.recentPosts.map(post => ({
      id: post.id,
      type: 'video',
      thumbnail: post.thumbnail || '',
      likes: post.likes || 0,
      comments: post.comments || 0,
      engagement: ((post.likes || 0) + (post.comments || 0)) / modashProfile.profile.followers * 100,
      date: post.created,
    })),
    
    // Données de déblocage
    audienceUnlocked: true,
    unlockedAt: new Date().toISOString(),
  };
}

// Transformer un rapport TikTok Modash vers notre format
export function transformTikTokReport(
  modashProfile: ModashTikTokReportProfile
): InfluencerDetails {
  return {
    id: modashProfile.userId,
    name: modashProfile.profile.fullname || modashProfile.profile.username,
    username: modashProfile.profile.username,
    platform: 'tiktok',
    avatar: modashProfile.profile.picture,
    followers: modashProfile.profile.followers,
    engagement: modashProfile.avgLikes + modashProfile.avgComments,
    engagementRate: (modashProfile.avgLikes + modashProfile.avgComments) / modashProfile.profile.followers * 100,
    country: modashProfile.country || 'Unknown',
    verified: modashProfile.profile.isVerified,
    email: modashProfile.contacts?.find(c => c.type === 'email')?.value,
    bio: modashProfile.bio,
    
    // Statistiques détaillées
    stats: {
      avgLikes: modashProfile.avgLikes,
      avgComments: modashProfile.avgComments,
      avgViews: modashProfile.statsByContentType.posts?.avgViews || 0,
      totalPosts: modashProfile.postsCount,
    },
    
    // Audience détaillée
    audience: {
      gender: {
        male: modashProfile.audience.genders.find(g => g.code === 'MALE')?.weight || 0,
        female: modashProfile.audience.genders.find(g => g.code === 'FEMALE')?.weight || 0,
      },
      age: {
        '13-17': 0, // Non disponible sur TikTok dans cette version
        '18-24': modashProfile.audience.ages.find(a => a.code === '18-24')?.weight || 0,
        '25-34': modashProfile.audience.ages.find(a => a.code === '25-34')?.weight || 0,
        '35-44': modashProfile.audience.ages.find(a => a.code === '35-44')?.weight || 0,
        '45-64': modashProfile.audience.ages.find(a => a.code === '45-64')?.weight || 0,
      },
      countries: modashProfile.audience.geoCountries.reduce((acc, country) => {
        acc[country.code] = country.weight;
        return acc;
      }, {} as Record<string, number>),
      cities: modashProfile.audience.geoCities.reduce((acc, city) => {
        acc[city.code] = city.weight;
        return acc;
      }, {} as Record<string, number>),
      languages: modashProfile.audience.languages.reduce((acc, lang) => {
        acc[lang.code] = lang.weight;
        return acc;
      }, {} as Record<string, number>),
      ethnicities: {},
      interests: {
        topics: modashProfile.interests.reduce((acc, interest) => {
          acc[interest.name] = 0.5;
          return acc;
        }, {} as Record<string, number>),
        brands: modashProfile.audienceExtra?.brandAffinity?.reduce((acc, brand) => {
          acc[brand.name] = 0.5;
          return acc;
        }, {} as Record<string, number>) || {},
      },
    },
    
    // Performance historique
    performance: modashProfile.statHistory.map(stat => ({
      date: stat.month,
      followers: stat.followers,
      engagement: stat.avgLikes + stat.avgComments,
      reach: stat.avgViews,
    })),
    
    // Breakdown de l'engagement
    engagementBreakdown: {
      likes: modashProfile.avgLikes,
      comments: modashProfile.avgComments,
      shares: modashProfile.statsByContentType.posts?.avgShares || 0,
      saves: 0, // Non disponible dans cette version
    },
    
    // Posts récents
    recentPosts: modashProfile.recentPosts.map(post => ({
      id: post.id,
      type: 'video',
      thumbnail: post.thumbnail || '',
      likes: post.likes || 0,
      comments: post.comments || 0,
      engagement: ((post.likes || 0) + (post.comments || 0)) / modashProfile.profile.followers * 100,
      date: post.created,
    })),
    
    // Données de déblocage
    audienceUnlocked: true,
    unlockedAt: new Date().toISOString(),
  };
}

// ========================================
// FONCTION PRINCIPALE DE RÉCUPÉRATION DE RAPPORT
// ========================================

export async function getEnhancedInfluencerReport(
  platform: 'instagram' | 'youtube' | 'tiktok',
  userId: string,
  calculationMethod: 'median' | 'average' = 'median'
): Promise<InfluencerDetails> {
  try {
    // Récupérer le rapport Modash
    const modashResponse = await getInfluencerReport(platform, userId, calculationMethod);
    
    if (modashResponse.error) {
      throw new Error('Erreur lors de la récupération du rapport Modash');
    }

    // Transformer selon la plateforme
    switch (platform) {
      case 'instagram':
        return transformInstagramReport(modashResponse.profile as ModashInstagramReportProfile);
      case 'youtube':
        return transformYouTubeReport(modashResponse.profile as ModashYouTubeReportProfile);
      case 'tiktok':
        return transformTikTokReport(modashResponse.profile as ModashTikTokReportProfile);
      default:
        throw new Error(`Plateforme non supportée: ${platform}`);
    }
  } catch (error) {
    console.error(`Erreur lors de la récupération du rapport ${platform} pour ${userId}:`, error);
    
    // Fallback sur des données mockées en cas d'erreur
    return generateFallbackReport(platform, userId);
  }
}

// ========================================
// FALLBACK AVEC DONNÉES MOCKÉES
// ========================================

function generateFallbackReport(
  platform: 'instagram' | 'youtube' | 'tiktok',
  userId: string
): InfluencerDetails {
  return {
    id: userId,
    name: `Mock ${platform} User`,
    username: `mock_user_${userId}`,
    platform,
    avatar: `https://picsum.photos/150/150?random=${userId}`,
    followers: Math.floor(Math.random() * 1000000) + 10000,
    engagement: Math.floor(Math.random() * 50000) + 1000,
    engagementRate: Math.random() * 10 + 1,
    country: 'Unknown',
    verified: Math.random() < 0.3,
    email: Math.random() < 0.5 ? `mock_${userId}@example.com` : undefined,
    bio: `Mock bio for ${platform} user ${userId}`,
    
    stats: {
      avgLikes: Math.floor(Math.random() * 10000) + 500,
      avgComments: Math.floor(Math.random() * 500) + 25,
      avgViews: Math.floor(Math.random() * 50000) + 2000,
      totalPosts: Math.floor(Math.random() * 500) + 50,
    },
    
    audience: {
      gender: { male: 0.4, female: 0.6 },
      age: {
        '13-17': 0.1,
        '18-24': 0.3,
        '25-34': 0.4,
        '35-44': 0.15,
        '45-64': 0.05,
      },
      countries: { 'US': 0.4, 'FR': 0.3, 'GB': 0.2, 'DE': 0.1 },
      cities: { 'New York': 0.2, 'Paris': 0.15, 'London': 0.1 },
      languages: { 'en': 0.6, 'fr': 0.3, 'es': 0.1 },
      ethnicities: {},
      interests: {
        topics: { 'lifestyle': 0.4, 'fashion': 0.3, 'travel': 0.2, 'food': 0.1 },
        brands: { 'Nike': 0.3, 'Apple': 0.2, 'Starbucks': 0.1 },
      },
    },
    
    performance: Array.from({ length: 12 }, (_, i) => ({
      date: new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 7),
      followers: Math.floor(Math.random() * 100000) + 50000 + i * 1000,
      engagement: Math.floor(Math.random() * 25000) + 5000,
      reach: Math.floor(Math.random() * 100000) + 20000,
    })),
    
    engagementBreakdown: {
      likes: Math.floor(Math.random() * 8000) + 2000,
      comments: Math.floor(Math.random() * 400) + 100,
      shares: Math.floor(Math.random() * 200) + 50,
      saves: Math.floor(Math.random() * 300) + 75,
    },
    
    recentPosts: Array.from({ length: 10 }, (_, i) => ({
      id: `mock_post_${i}`,
      type: Math.random() < 0.5 ? 'image' : 'video',
      thumbnail: `https://picsum.photos/300/300?random=${i}`,
      likes: Math.floor(Math.random() * 15000) + 1000,
      comments: Math.floor(Math.random() * 750) + 50,
      engagement: Math.random() * 8 + 2,
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
    })),
    
    audienceUnlocked: true,
    unlockedAt: new Date().toISOString(),
  };
}

// ========================================
// UTILITAIRES POUR LES RAPPORTS
// ========================================

export function calculateEngagementRate(likes: number, comments: number, followers: number): number {
  return ((likes + comments) / followers) * 100;
}

export function formatEngagementRate(rate: number): string {
  return `${rate.toFixed(2)}%`;
}

export function getEngagementQuality(rate: number): 'excellent' | 'good' | 'average' | 'poor' {
  if (rate >= 6) return 'excellent';
  if (rate >= 3) return 'good';
  if (rate >= 1) return 'average';
  return 'poor';
}

export function formatFollowerCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}
