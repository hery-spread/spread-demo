export interface Influencer {
  id: string;
  name: string;
  username: string;
  platform: 'instagram' | 'youtube' | 'tiktok';
  avatar: string;
  followers: number;
  engagement: number;
  engagementRate: number;
  country: string;
  verified: boolean;
  email?: string;
  bio?: string;
}

export interface InfluencerDetails extends Influencer {
  stats: {
    avgLikes: number;
    avgComments: number;
    avgViews: number;
    totalPosts: number;
  };
  audience: {
    gender: { male: number; female: number };
    age: {
      '13-17': number;
      '18-24': number;
      '25-34': number;
      '35-44': number;
      '45-64': number;
    };
    countries: Record<string, number>;
    cities: Record<string, number>;
    languages: Record<string, number>;
    ethnicities: Record<string, number>;
    interests: {
      topics: Record<string, number>;
      brands: Record<string, number>;
    };
    credibility?: number; // Pourcentage d'audience authentique (0-1)
    notable?: number; // Pourcentage d'utilisateurs notables
    audienceTypes?: {
      real: number;
      suspicious: number;
      mass_followers: number;
      influencers: number;
    };
    audienceReachability?: {
      '-500': number;
      '500-1000': number;
      '1000-1500': number;
      '1500-': number;
    };
  };
  performance?: {
    date: string;
    followers: number;
    engagement: number;
    reach: number;
  }[];
  engagementBreakdown?: {
    likes: number;
    comments: number;
    shares: number;
    saves: number;
  };
  recentPosts?: {
    id: string;
    type: 'image' | 'video' | 'carousel';
    thumbnail: string;
    likes: number;
    comments: number;
    engagement: number;
    date: string;
  }[];
  audienceUnlocked?: boolean;
  unlockedAt?: string;
}

export interface InfluencerContact {
  id: string;
  contactName?: string;
  contactEmail?: string;
  followers?: number;
  engagementRate?: number;
  platform?: string;
}

export interface InfluencerList {
  id: string;
  name: string;
  description?: string;
  category: string;
  createdAt: string;
  influencers: InfluencerContact[];
}

export interface PlanLimits {
  searches: number | 'unlimited';
  profiles: { used: number; total: number };
  users: { used: number; total: number };
}

export interface SubscriptionPlan {
  name: string;
  renewalDate: string;
  limits: PlanLimits;
  features: string[];
  price: {
    monthly: number;
    currency: string;
  };
}

export interface UserAccount {
  name: string;
  email: string;
  plan: SubscriptionPlan;
  billingInfo?: {
    company?: string;
    vatNumber?: string;
    address?: {
      street: string;
      city: string;
      postalCode: string;
      country: string;
    };
    phone?: string;
  };
}

// Nouveaux types pour le déblocage de rapports
export interface UnlockReport {
  influencerId: string;
  unlockedAt: string;
  creditsUsed: number;
}

export interface CreditsUsage {
  totalCredits: number;
  usedCredits: number;
  remainingCredits: number;
  history: {
    date: string;
    action: 'unlock_report' | 'search' | 'purchase';
    credits: number;
    description: string;
  }[];
}

// Types pour le partage de rapports
export interface SharedReport {
  id: string;
  influencerId: string;
  shareType: 'public' | 'private';
  createdAt: string;
  expiresAt?: string;
  includeFullAudience: boolean;
  trackingEnabled: boolean;
  password?: string;
  viewCount: number;
  lastViewedAt?: string;
  utmParameters?: {
    source?: string;
    medium?: string;
    campaign?: string;
  };
}

export interface ShareStats {
  totalViews: number;
  uniqueViews: number;
  clickThroughRate: number;
  conversionRate: number;
  topReferrers: { source: string; views: number }[];
  viewsOverTime: { date: string; views: number }[];
}

// Types pour le partage de campagnes
export interface SharedCampaign {
  id: string;
  campaignId: string;
  shareType: 'public' | 'private';
  createdAt: string;
  expiresAt?: string;
  password?: string;
  viewCount: number;
  lastViewedAt?: string;
  includeFinancials: boolean;
  includeBudgets: boolean;
  trackingEnabled: boolean;
  utmParameters?: {
    source?: string;
    medium?: string;
    campaign?: string;
  };
}

export interface CampaignShareStats {
  totalViews: number;
  uniqueViews: number;
  averageViewTime: number;
  topReferrers: { source: string; views: number }[];
  viewsOverTime: { date: string; views: number }[];
  geographicViews: { country: string; views: number }[];
}

// Types pour l'onboarding
export interface OnboardingData {
  step: number;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    role: string;
  };
  businessInfo: {
    industry: string;
    teamSize: string;
    monthlyBudget: string;
    goals: string[];
  };
  preferences: {
    wantsDemo: boolean;
    demoTime: string;
    communicationChannel: 'email' | 'phone' | 'both';
  };
}

export interface DemoBooking {
  id: string;
  userId: string;
  scheduledAt: string;
  duration: number;
  status: 'scheduled' | 'completed' | 'cancelled';
  meetingUrl?: string;
  notes?: string;
}

// Types pour le CRM
export interface CRMContact {
  id: string;
  name: string;
  username: string;
  email?: string;
  phone?: string;
  platform: 'instagram' | 'youtube' | 'tiktok';
  followers: number;
  avatar: string;
  stage: 'contacted' | 'responded' | 'negotiating' | 'closed';
  notes?: string;
  source: 'manual' | 'search' | 'import' | 'list';
  createdAt: string;
  lastContact: string;
  nextReminder?: string;
  tags?: string[];
  hasVideoCall?: boolean;
  dealValue?: number;
  probability?: number;
  expectedCloseDate?: string;
}

export interface CRMStats {
  totalContacts: number;
  contacted: number;
  responded: number;
  negotiating: number;
  closed: number;
  responseRate: number;
  averageResponseTime: number;
  conversionRate: number;
}

export interface CRMActivity {
  id: string;
  contactId: string;
  type: 'email' | 'call' | 'meeting' | 'note' | 'stage_change';
  title: string;
  description?: string;
  createdAt: string;
  createdBy: string;
  metadata?: Record<string, string | number | boolean>;
}

// Types pour les Rapports Débloqués
export interface UnlockedReport {
  id: string;
  influencerId: string;
  influencerName: string;
  influencerUsername: string;
  influencerAvatar: string;
  platform: 'instagram' | 'youtube' | 'tiktok';
  unlockedAt: string;
  lastRefreshed: string;
  creditsUsed: number;
  status: 'fresh' | 'stale' | 'refreshing' | 'error';
  report: InfluencerDetails;
  refreshCount: number;
  validUntil: string; // Date d'expiration du rapport
}

export interface RefreshStats {
  totalReports: number;
  freshReports: number;
  staleReports: number;
  totalRefreshes: number;
  creditsSpent: number;
  lastRefreshDate?: string;
}

// Types pour le Nouveau Système de Campagnes
export interface CampaignContent {
  id: string;
  campaignId: string;
  influencerId: string;
  influencerName: string;
  influencerUsername: string;
  influencerAvatar: string;
  platform: 'instagram' | 'youtube' | 'tiktok';
  contentType: 'post' | 'story' | 'reel' | 'video' | 'short';
  contentUrl: string;
  contentTitle?: string;
  contentDescription?: string;
  publishedAt: string;
  detectedAt: string; // Quand le contenu a été détecté/importé

  // Tracking et mentions
  trackedLinks: string[]; // Liens trouvés dans le contenu
  trackedMentions: string[]; // Mentions trouvées
  trackedKeywords: string[]; // Keywords trouvés

  // Métriques d'engagement
  metrics: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
    saves?: number;
    clicks?: number;
    impressions: number;
    reach: number;
    engagementRate: number;
    videoCompletionRate?: number; // Pour vidéos
  };

  // Métriques financières
  financials: {
    costPerContent: number; // Coût payé pour ce contenu
    cpm: number; // Cost Per Mille
    cpc?: number; // Cost Per Click
    emv: number; // Earned Media Value
    roas?: number; // Return on Ad Spend
  };

  // Status et validation
  status: 'detected' | 'validated' | 'rejected' | 'paid';
  validatedBy?: string;
  validatedAt?: string;
  notes?: string;
}

export interface CampaignTracker {
  id: string;
  name: string;
  description?: string;

  // Configuration de tracking
  trackingConfig: {
    links: {
      url: string;
      label?: string;
      budget?: number;
    }[]; // Liens à suivre avec budgets optionnels
    mentions: string[]; // @samsung, @influencer
    keywords: string[]; // mots-clés à chercher
    platforms: ('instagram' | 'youtube' | 'tiktok')[];
    autoImport: boolean; // Import automatique des contenus détectés
    flagMissingDisclosure: boolean;
    eventMode: boolean; // Mode événement pour tracking limité
  };

  // Période de tracking
  startDate: string;
  endDate?: string;

  // Influenceurs participants
  creators: {
    influencerId: string;
    influencerName: string;
    influencerUsername: string;
    influencerAvatar: string;
    platform: 'instagram' | 'youtube' | 'tiktok';
    expectedPosts: number;
    deliveredPosts: number;
    costPerCreator: number;
    status: 'pending' | 'active' | 'completed' | 'cancelled';
    contractedAt: string;
  }[];

  // Métriques globales de la campagne
  analytics: CampaignAnalytics;

  // Status et metadata
  status: 'draft' | 'active' | 'paused' | 'completed' | 'cancelled';
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  totalBudget: number;
  spentBudget: number;
}

export interface CampaignAnalytics {
  // Métriques de contenu
  content: {
    totalPosts: number;
    totalStories: number;
    totalReels: number;
    totalVideos: number;
    creatorsPosted: number;
    totalCreators: number;
  };

  // Métriques d'engagement
  engagement: {
    totalEngagements: number;
    averageER: number; // Engagement Rate moyen
    totalLikes: number;
    totalComments: number;
    totalShares: number;
    totalSaves: number;
  };

  // Métriques de portée
  reach: {
    totalImpressions: number;
    totalReach: number;
    averageVideoER?: number; // Video Engagement Rate
    totalViews: number;
  };

  // Métriques de performance
  performance: {
    totalLinks: number;
    totalClicks: number;
    ctr: number; // Click Through Rate
    totalConversions?: number;
    conversionRate?: number;
  };

  // Métriques financières
  financials: {
    totalCreatorCost: number;
    totalEMV: number; // Earned Media Value
    averageCPM: number;
    averageCPC?: number;
    roas?: number; // Return on Ad Spend
    costPerEngagement: number;
  };

  // Répartition par plateforme
  byPlatform: {
    [key in 'instagram' | 'youtube' | 'tiktok']?: {
      posts: number;
      engagements: number;
      impressions: number;
      cost: number;
      emv: number;
    };
  };

  // Répartition par créateur (top performers)
  topCreators: {
    influencerId: string;
    influencerName: string;
    posts: number;
    totalEngagements: number;
    averageER: number;
    totalCost: number;
    emv: number;
  }[];

  // Timeline performance
  timeline: {
    date: string;
    posts: number;
    engagements: number;
    impressions: number;
    cost: number;
  }[];
}

// Types utilitaires pour les vues et filtres
export interface CampaignFilters {
  status?: ('draft' | 'active' | 'paused' | 'completed' | 'cancelled')[];
  platforms?: ('instagram' | 'youtube' | 'tiktok')[];
  dateRange?: {
    start: string;
    end: string;
  };
  budgetRange?: {
    min: number;
    max: number;
  };
  creatorCount?: {
    min: number;
    max: number;
  };
}

export interface CampaignGrouping {
  type: 'none' | 'platform' | 'creator' | 'contentType' | 'date';
  sortBy: 'date' | 'performance' | 'cost' | 'engagement';
  sortOrder: 'asc' | 'desc';
}

// Types pour le Nouveau Système de Recherche avec IA
export interface AISearchInput {
  query: string; // Recherche en langage naturel
  confidence: number; // Score de confiance de l'IA
  parsedFilters?: AdvancedSearchFilters; // Filtres extraits par l'IA
  suggestions?: string[]; // Suggestions d'amélioration
}

export interface AdvancedSearchFilters {
  // Recherche générale
  textQuery?: string;

  // Plateforme et identification
  platforms?: ('instagram' | 'youtube' | 'tiktok')[];
  userSearch?: string; // Recherche par nom ou @username
  directUsers?: string[]; // Recherche directe multi-@ (handles exacts)

  // Créateur de contenu (réorganisé selon les 4 catégories)
  creator?: {
    // Thématique & identité (prioritaire)
    bioSearch?: string; // Recherche dans la bio
    keywords?: string[]; // Mots-clés dans le contenu
    categories?: string[]; // Catégories de contenu
    relevance?: string[]; // Similarité de contenu (#hashtags @mentions)
    audienceRelevance?: string[]; // Audience similaire à (@mentions)
    textTags?: Array<{
      type: 'hashtag' | 'mention';
      value: string;
    }>; // Hashtags et mentions utilisés
    brands?: string[]; // Marques mentionnées
    interests?: string[]; // Intérêts du créateur
    language?: string; // Langue principale du créateur
    lastPosted?: number; // Dernière activité (jours)

    // Caractéristiques démographiques
    gender?: 'MALE' | 'FEMALE' | 'KNOWN' | 'UNKNOWN';
    ageRange?: { min: number; max: number };

    // Géographie du créateur (après les mots-clés)
    location?: {
      country?: string;
      city?: string;
      continent?: 'europe' | 'america' | 'asia' | 'africa' | 'oceania';
    };

    // Types/flags
    verified?: boolean;
    hasEmail?: boolean;
    hasPhoneNumber?: boolean;
    accountType?: 'personal' | 'business' | 'creator'; // Type de compte (Instagram)
    hasYouTube?: boolean; // Possède une chaîne YouTube (Instagram)
    isOfficialArtist?: boolean; // Artiste officiel (YouTube)
    languages?: string[]; // Langues parlées (legacy)
  };

  // Audience (qui ils touchent)
  audience?: {
    // Géographie de l'audience
    locations?: {
      countries?: string[]; // Pays multi-select (simple)
      cities?: string[]; // Villes multi-select (simple)
    };
    audienceLanguage?: string; // Langue principale de l'audience

    // Genre de l'audience
    audienceGender?: {
      malePercentage?: { min: number; max: number };
      femalePercentage?: { min: number; max: number };
    };

    // Âge de l'audience (avec système de poids Modash)
    audienceAgeRange?: {
      age13_17?: { min: number; max: number };
      age18_24?: { min: number; max: number };
      age25_34?: { min: number; max: number };
      age35_44?: { min: number; max: number };
      age45_54?: { min: number; max: number };
      age55plus?: { min: number; max: number };
    };
    audienceAgeModash?: Array<{
      id: string; // '13-17', '18-24', etc.
      weight: number; // 0.1 à 1.0
    }>;

    // Intérêts de l'audience (Instagram uniquement)
    audienceInterests?: Array<{
      id: number;
      name: string;
      weight: number;
    }>;

    // Qualité de l'audience
    audienceCredibility?: number; // 0 à 1 (crédibilité)

    // Filtres avancés avec poids Modash
    audienceLocationModash?: Array<{
      id: number;
      name: string;
      weight: number;
    }>;
    audienceLanguageModash?: Array<{
      code: string;
      name: string;
      weight: number;
    }>;

    // Legacy fields
    followersRange?: { min: number; max: number };
    engagementRange?: { min: number; max: number }; // En pourcentage
    avgLikesRange?: { min: number; max: number };
    avgCommentsRange?: { min: number; max: number };
    avgSharesRange?: { min: number; max: number };
    avgViewsRange?: { min: number; max: number }; // Pour vidéos
    audienceLocation?: {
      topCountries?: string[];
      excludeCountries?: string[];
    };
  };

  // Performance (taille & performance)
  performance?: {
    // Taille de l'audience
    followersRange?: { min?: number; max?: number };

    // Portée/Vues
    avgViewsRange?: { min?: number; max?: number };
    avgReelsViewsRange?: { min?: number; max?: number }; // Instagram

    // Engagement
    engagementRateRange?: { min?: number; max?: number };
    avgLikesRange?: { min?: number; max?: number };
    avgCommentsRange?: { min?: number; max?: number };
    avgSharesRange?: { min?: number; max?: number }; // TikTok
    avgSavesRange?: { min?: number; max?: number }; // TikTok

    // Contactabilité
    hasEmail?: boolean;
    hasPhoneNumber?: boolean;
    contactTypes?: string[]; // Types de contact disponibles

    // Métriques spécifiques par plateforme
    avgVideoDuration?: { min?: number; max?: number }; // YouTube (minutes)
    uploadFrequency?: string; // YouTube
    storiesPostRatio?: string; // Instagram
    hasReels?: boolean; // Instagram
    avgTikTokDuration?: { min?: number; max?: number }; // TikTok (secondes)
    usesTrends?: boolean; // TikTok
  };

  // Croissance
  growth?: {
    // Croissance des followers
    followersGrowthPeriod?: string;
    followersGrowthRate?: { min: number; max: number };

    // Tendance générale
    growthTrend?: 'declining' | 'stable' | 'growing' | 'fast-growing' | 'viral';

    // Croissance des vues (YouTube/TikTok)
    viewsGrowthPeriod?: string;
    viewsGrowthRate?: { min: number; max: number };

    // Croissance des likes (TikTok)
    likesGrowthPeriod?: string;
    likesGrowthRate?: { min: number; max: number };

    // Âge du compte
    minAccountAge?: number;
    maxAccountAge?: number;
  };



  // Contenu
  content?: {
    categories?: string[]; // Catégories de contenu (lifestyle, beauté, mode, etc.)
    postFrequency?: 'very-low' | 'low' | 'medium' | 'high' | 'very-high';
    totalPostsRange?: { min: number; max: number };
    recentActivityDays?: number; // Dernière activité (en jours)
    contentTypes?: ('photo' | 'video' | 'story' | 'reel' | 'live' | 'short')[];
    avgVideoLength?: { min: number; max: number }; // En secondes
    postingDays?: (
      | 'monday'
      | 'tuesday'
      | 'wednesday'
      | 'thursday'
      | 'friday'
      | 'saturday'
      | 'sunday'
    )[];
    postingTimes?: { from: string; to: string }; // Format HH:mm
    hashtagUsage?: 'low' | 'medium' | 'high'; // Utilisation des hashtags
    collaborationRate?: { min: number; max: number }; // Pourcentage de posts sponsorisés
  };

  // Filtres avancés
  advanced?: {
    excludeKeywords?: string[]; // Mots-clés à exclure
    includeKeywords?: string[]; // Mots-clés obligatoires
    excludeUsernames?: string[]; // Utilisateurs à exclure
    minAccountAge?: number; // Age minimum du compte (en mois)
    growthTrend?: 'declining' | 'stable' | 'growing' | 'fast-growing';
    brandSafety?: boolean; // Contenu brand-safe uniquement
    fakefollowersScore?: { max: number }; // Score maximum de faux followers
  };
}

export interface SearchFilterCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  isOpen: boolean;
  hasActiveFilters: boolean;
  filterCount?: number;
}

export interface SearchResults {
  influencers: Influencer[];
  totalCount: number;
  facets: {
    platforms: { [key: string]: number };
    countries: { [key: string]: number };
    followerRanges: { [key: string]: number };
    engagementRanges: { [key: string]: number };
  };
  searchTime: number; // Temps de recherche en ms
  aiAnalysis?: {
    queryUnderstanding: string;
    suggestedRefinements: string[];
    alternativeQueries: string[];
  };
}

// Types pour l'interface de recherche
export interface SearchUIState {
  isSearching: boolean;
  hasSearched: boolean;
  searchQuery: string;
  activeFilters: AdvancedSearchFilters;
  cardStates: { [cardId: string]: boolean }; // États ouverts/fermés des cards
  results: SearchResults | null;
  selectedInfluencers: string[]; // IDs des influenceurs sélectionnés
}

// Types pour le système de communications email
export interface EmailProvider {
  type: 'gmail' | 'outlook' | 'other';
  email: string;
  connected: boolean;
  connectedAt?: string;
  lastSync?: string;
}

export interface EmailMessage {
  id: string;
  threadId: string;
  from: string;
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  body: string;
  bodyHtml?: string;
  sentAt: string;
  receivedAt?: string;
  isRead: boolean;
  isReplied: boolean;
  isForwarded: boolean;
  attachments?: EmailAttachment[];
  messageId: string;
  inReplyTo?: string;
  references?: string[];
}

export interface EmailAttachment {
  id: string;
  filename: string;
  mimeType: string;
  size: number;
  downloadUrl?: string;
}

export interface EmailThread {
  id: string;
  influencerId: string;
  influencerName: string;
  influencerEmail: string;
  influencerAvatar?: string;
  subject: string;
  messageCount: number;
  unreadCount: number;
  lastMessageAt: string;
  lastMessagePreview: string;
  status: 'new' | 'responded' | 'waiting' | 'negotiating' | 'closed';
  tags?: string[];
  messages: EmailMessage[];
  firstContactAt: string;
  lastReplyAt?: string;
}

export interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  bodyTemplate: string;
  recipientCount: number;
  sentCount: number;
  deliveredCount: number;
  openedCount: number;
  repliedCount: number;
  bouncedCount: number;
  status: 'draft' | 'sending' | 'sent' | 'paused';
  createdAt: string;
  sentAt?: string;
  completedAt?: string;
  fromEmail: string;
  fromName: string;
  listId?: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  bodyHtml: string;
  bodyText: string;
  category: 'outreach' | 'follow_up' | 'collaboration' | 'custom';
  variables: string[];
  createdAt: string;
  lastUsed?: string;
  isDefault: boolean;
}

export interface BulkEmailRequest {
  recipientIds: string[];
  templateId?: string;
  subject: string;
  body: string;
  fromEmail: string;
  fromName: string;
  scheduledAt?: string;
  trackOpens: boolean;
  trackClicks: boolean;
}

export interface EmailStats {
  totalThreads: number;
  activeThreads: number;
  responseRate: number;
  averageResponseTime: number;
  totalSent: number;
  totalReceived: number;
  unreadCount: number;
  monthlyStats: {
    month: string;
    sent: number;
    received: number;
    responded: number;
  }[];
}

// Types pour les campagnes séquentielles
export interface EmailSequenceStep {
  id: string;
  stepNumber: number;
  delayDays: number;
  templateId: string;
  subject: string;
  body: string;
  isActive: boolean;
}

export interface EmailCampaignSequence {
  id: string;
  name: string;
  description?: string;
  listId: string;
  listName: string;
  fromEmail: string;
  fromName: string;
  steps: EmailSequenceStep[];
  status: 'draft' | 'active' | 'paused' | 'completed';
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  totalRecipients: number;
  sentCount: number;
  openedCount: number;
  repliedCount: number;
  bouncedCount: number;
  trackOpens: boolean;
  trackClicks: boolean;
}

export interface CampaignRecipient {
  id: string;
  campaignId: string;
  influencerId: string;
  influencerName: string;
  influencerEmail: string;
  currentStep: number;
  status: 'pending' | 'active' | 'completed' | 'bounced' | 'unsubscribed';
  lastEmailSentAt?: string;
  nextEmailAt?: string;
  hasReplied: boolean;
  repliedAt?: string;
}

// ========================================
// TYPES MODASH API - INTÉGRATION COMPLÈTE
// ========================================

// Types de base pour les dictionnaires Modash
export interface ModashLanguage {
  code: string;
  name: string;
}

export interface ModashLocation {
  id: number;
  name: string;
  title: string;
}

export interface ModashBrand {
  id: number;
  name: string;
}

export interface ModashInterest {
  id: number;
  name: string;
}

export interface ModashUser {
  userId: string;
  username: string;
  fullname: string;
  picture: string;
  followers: number;
  isVerified: boolean;
  handle?: string; // YouTube uniquement
}

// Types pour les filtres de recherche Modash enrichis
export interface ModashInfluencerFilters {
  // Métriques de base
  followers?: { min?: number; max?: number };
  engagementRate?: number;
  location?: number[]; // IDs des locations
  language?: string; // Code langue
  lastposted?: number; // Jours depuis dernier post

  // Pertinence et contenu
  relevance?: string[]; // Hashtags/mentions pour pertinence
  audienceRelevance?: string[]; // Mentions pour pertinence audience
  bio?: string; // Recherche dans la bio
  keywords?: string; // Mots-clés
  textTags?: Array<{
    type: 'hashtag' | 'mention';
    value: string;
  }>;

  // Démographie créateur
  gender?: 'MALE' | 'FEMALE';
  age?: { min?: number; max?: number };
  isVerified?: boolean;

  // Croissance et activité
  followersGrowthRate?: {
    interval: 'i1month' | 'i3months' | 'i6months' | 'i1year';
    value: number;
    operator: 'gt' | 'lt' | 'eq';
  };

  // Performance et engagement
  views?: { min?: number; max?: number };
  engagements?: { min?: number; max?: number };
  hasContactDetails?: Array<{
    contactType: 'email' | 'phone' | 'website';
    filterAction: 'must' | 'should' | 'must_not';
  }>;

  // Champs spécifiques Instagram
  hasYouTube?: boolean;
  accountTypes?: number[]; // 1=Regular, 2=Business, 3=Creator
  brands?: number[]; // IDs des marques
  interests?: number[]; // IDs des intérêts
  reelsPlays?: { min?: number; max?: number };
  hasSponsoredPosts?: boolean;

  // Champs spécifiques YouTube
  isOfficialArtist?: boolean;
  viewsGrowthRate?: {
    interval: 'i1month' | 'i3months' | 'i6months' | 'i1year';
    value: number;
    operator: 'gt' | 'lt' | 'eq';
  };

  // Champs spécifiques TikTok
  shares?: { min?: number; max?: number };
  saves?: { min?: number; max?: number };
  likesGrowthRate?: {
    interval: 'i1month' | 'i3months' | 'i6months' | 'i1year';
    value: number;
    operator: 'gt' | 'lt' | 'eq';
  };

  // Opérations logiques
  filterOperations?: Array<{
    operator: 'and' | 'or';
    filter: string;
  }>;
}

export interface ModashAudienceFilters {
  location?: Array<{
    id: number;
    weight: number;
  }>;
  language?: {
    id: string;
    weight: number;
  };
  gender?: {
    id: 'MALE' | 'FEMALE';
    weight: number;
  };
  age?: Array<{
    id: '13-17' | '18-24' | '25-34' | '35-44' | '45-64' | '65-';
    weight: number;
  }>;
  ageRange?: {
    min: string;
    max: string;
    weight: number;
  };
  // Instagram uniquement
  interests?: Array<{
    id: number;
    weight: number;
  }>;
  credibility?: number; // Score de crédibilité (0-1)
}

export interface ModashSearchFilters {
  influencer?: ModashInfluencerFilters;
  audience?: ModashAudienceFilters;
}

export interface ModashSearchRequest {
  page?: number;
  sort?: {
    field: string;
    value?: number;
    direction: 'asc' | 'desc';
  };
  filter?: ModashSearchFilters;
}

// Types pour les réponses de recherche Modash
export interface ModashInfluencerProfile {
  userId: string;
  fullname?: string;
  username: string;
  url: string;
  picture: string;
  followers: number;
  engagements: number;
  engagementRate: number;
  averageViews?: number; // YouTube
  handle?: string; // YouTube
}

export interface ModashInfluencerResponse {
  userId: string;
  profile: ModashInfluencerProfile;
  match?: {
    field?: string;
    value?: number;
  };
}

export interface ModashSearchResponse {
  error: boolean;
  total: number;
  lookalikes: ModashInfluencerResponse[];
  directs: ModashInfluencerResponse[];
  isExactMatch: boolean;
}

// Types pour les rapports détaillés Modash
export interface ModashContact {
  type: 'email' | 'phone' | 'website';
  value: string;
}

export interface ModashTag {
  tag: string;
  weight: number;
}

export interface ModashWeightWithCode {
  code: string;
  weight: number;
}

export interface ModashWeightWithCodeName {
  name: string;
  weight: number;
  code: string;
}

export interface ModashGenderPerAge {
  code: string;
  male: number;
  female: number;
}

export interface ModashAudienceLanguage {
  code: string;
  name: string;
  weight: number;
}

export interface ModashMonthlyStat {
  month: string;
  followers: number;
  following: number;
  avgLikes: number;
  avgViews: number;
  avgComments: number;
  avgShares?: number;
}

export interface ModashRecentPost {
  id: string;
  text: string;
  url: string;
  created: string;
  likes?: number;
  comments?: number;
  views?: number;
  shares?: number;
  mentions?: string[];
  hashtags?: string[];
  video?: string;
  image?: string;
  thumbnail?: string;
  type?: string;
  title?: string;
}

export interface ModashSponsoredPost {
  id: string;
  text: string;
  url: string;
  created: string;
  likes?: number;
  comments?: number;
  views?: number;
  video?: string;
  image?: string;
  thumbnail: string;
  type: string;
  title: string;
  sponsors?: Array<{
    name: string;
    url?: string;
    logo?: string;
  }>;
}

// Types spécialisés par plateforme
export interface ModashInstagramReportProfile {
  userId: string;
  profile: {
    userId: string;
    fullname?: string;
    username: string;
    url: string;
    picture: string;
    followers: number;
    following: number;
    isPrivate: boolean;
    isVerified: boolean;
    accountType: 'Regular' | 'Business' | 'Creator';
  };

  // Contenu et hashtags
  hashtags: ModashTag[];
  mentions: ModashTag[];

  // Statistiques par type de contenu
  statsByContentType: {
    posts?: {
      count: number;
      avgLikes: number;
      avgComments: number;
      avgViews: number;
    };
    reels?: {
      count: number;
      avgLikes: number;
      avgComments: number;
      avgViews: number;
    };
  };

  // Audience détaillée (16 propriétés)
  audience: {
    genders: ModashWeightWithCode[];
    ages: ModashWeightWithCode[];
    geoCountries: ModashWeightWithCodeName[];
    geoCities: ModashWeightWithCodeName[];
    languages: ModashAudienceLanguage[];
    interests: Array<{ id: number; name: string; weight: number }>;
    credibility: number;
    notable: number;
    notableUsers: ModashUser[];
    audienceLookalikes: ModashUser[];
    gendersPerAge: ModashGenderPerAge[];
    // ... autres propriétés audience
  };

  // Posts et contenu
  recentPosts: ModashRecentPost[];
  popularPosts: ModashRecentPost[];

  // Informations personnelles
  city?: string;
  state?: string;
  country?: string;
  gender?: 'MALE' | 'FEMALE';
  ageGroup?: '13-17' | '18-24' | '25-34' | '35-44' | '45-64' | '65-';
  language?: ModashLanguage;
  contacts?: ModashContact[];

  // Métriques
  postsCounts: number;
  postsCount: number;
  avgLikes: number;
  avgComments: number;
  avgViews: number;
  avgReelsPlays: number;
  bio: string;

  // Intérêts et marques
  interests: ModashInterest[];
  brandAffinity: ModashBrand[];

  // Posts sponsorisés et performance
  sponsoredPosts: ModashSponsoredPost[];
  paidPostPerformance?: number;
  paidPostPerformanceViews: number;
  sponsoredPostsMedianViews: number;
  sponsoredPostsMedianLikes: number;
  nonSponsoredPostsMedianViews: number;
  nonSponsoredPostsMedianLikes: number;

  // Historique et évolution
  statHistory: ModashMonthlyStat[];
  lookalikes: ModashUser[];

  // Données supplémentaires
  audienceExtra?: {
    brandAffinity?: ModashBrand[];
    interests?: ModashInterest[];
    ethnicities?: ModashWeightWithCodeName[];
  };
}

export interface ModashYouTubeReportProfile {
  userId: string;
  profile: {
    userId: string;
    fullname?: string;
    username: string;
    url: string;
    picture: string;
    followers: number;
    isVerified: boolean;
    handle?: string;
    description: string;
    totalViews: number;
  };

  // Audience spécialisée YouTube
  audience: {
    genders: ModashWeightWithCode[];
    ages: ModashWeightWithCode[];
    geoCountries: ModashWeightWithCodeName[];
    languages: ModashAudienceLanguage[];
    notable: number;
    notableUsers: ModashUser[];
    audienceLookalikes: ModashUser[];
    gendersPerAge: ModashGenderPerAge[];
  };

  // Audience des commentateurs (spécifique YouTube)
  audienceCommenters: {
    notable: number;
    genders: ModashWeightWithCode[];
    geoCountries: ModashWeightWithCodeName[];
    ages: ModashWeightWithCode[];
    gendersPerAge: ModashGenderPerAge[];
    languages: ModashAudienceLanguage[];
    notableUsers: ModashUser[];
    audienceLookalikes: ModashUser[];
  };

  // Statistiques par type de contenu
  statsByContentType: {
    videos?: {
      count: number;
      avgLikes: number;
      avgComments: number;
      avgViews: number;
    };
    shorts?: {
      count: number;
      avgLikes: number;
      avgComments: number;
      avgViews: number;
    };
  };

  // Posts et contenu
  recentPosts: ModashRecentPost[];
  popularPosts: ModashRecentPost[];

  // Informations personnelles
  city?: string;
  state?: string;
  country?: string;
  gender?: 'MALE' | 'FEMALE';
  ageGroup?: '18-24' | '25-34' | '35-44' | '45-64' | '65-';
  contacts?: ModashContact[];

  // Métriques
  postsCount: number;
  avgLikes: number;
  avgComments: number;
  description: string;

  // Intérêts et recommandations
  interests: ModashInterest[];
  lookalikesByTopics: ModashUser[];

  // Posts sponsorisés et performance
  sponsoredPosts: ModashSponsoredPost[];
  paidPostPerformance?: number;
  paidPostPerformanceViews: number;
  sponsoredPostsMedianViews: number;
  sponsoredPostsMedianLikes: number;
  nonSponsoredPostsMedianViews: number;
  nonSponsoredPostsMedianLikes: number;

  // Historique
  statHistory: ModashMonthlyStat[];

  // Données supplémentaires
  audienceExtra?: {
    brandAffinity?: ModashBrand[];
    interests?: ModashInterest[];
  };
}

export interface ModashTikTokReportProfile {
  userId: string;
  profile: {
    userId: string;
    fullname?: string;
    username: string;
    url: string;
    picture: string;
    followers: number;
    following: number;
    isPrivate: boolean;
    isVerified: boolean;
    bio: string;
  };

  // Audience
  audience: {
    genders: ModashWeightWithCode[];
    ages: ModashWeightWithCode[];
    geoCountries: ModashWeightWithCodeName[];
    geoCities: ModashWeightWithCodeName[];
    languages: ModashAudienceLanguage[];
    interests: Array<{ id: number; name: string; weight: number }>;
    notable: number;
    notableUsers: ModashUser[];
    gendersPerAge: ModashGenderPerAge[];
  };

  // Identifiant spécifique TikTok
  secUid: string;

  // Statistiques par type de contenu
  statsByContentType: {
    posts?: {
      count: number;
      avgLikes: number;
      avgComments: number;
      avgViews: number;
      avgShares: number;
    };
  };

  // Posts et contenu
  recentPosts: ModashRecentPost[];
  popularPosts: ModashRecentPost[];

  // Informations personnelles
  city?: string;
  state?: string;
  country?: string;
  gender?: 'MALE' | 'FEMALE';
  ageGroup?: '18-24' | '25-34' | '35-44' | '45-64' | '65-';
  contacts?: ModashContact[];

  // Métriques
  postsCount: number;
  avgLikes: number;
  totalLikes: number;
  avgComments: number;
  bio: string;

  // Intérêts et recommandations
  interests: ModashInterest[];
  lookalikes: ModashUser[];

  // Posts sponsorisés et performance
  sponsoredPosts: ModashSponsoredPost[];
  paidPostPerformance?: number;
  paidPostPerformanceViews: number;
  sponsoredPostsMedianViews: number;
  sponsoredPostsMedianLikes: number;
  nonSponsoredPostsMedianViews: number;
  nonSponsoredPostsMedianLikes: number;

  // Historique
  statHistory: ModashMonthlyStat[];

  // Données supplémentaires
  audienceExtra?: {
    brandAffinity?: ModashBrand[];
    interests?: ModashInterest[];
  };
}

// Type unifié pour les rapports Modash
export type ModashReportProfile =
  | ModashInstagramReportProfile
  | ModashYouTubeReportProfile
  | ModashTikTokReportProfile;

export interface ModashReportResponse {
  error: boolean;
  profile: ModashReportProfile;
}

// Types pour les données de performance
export interface ModashPerformanceMetric {
  numberOfItems: number;
  value: number;
}

export interface ModashPerformanceData {
  posts?: {
    total: number;
    posts_with_hidden_likes?: number;
    posts_with_hidden_comments?: number;
    videos_with_turned_off_comments?: number;
    shorts_with_turned_off_comments?: number;
    likes: {
      mean: ModashPerformanceMetric[];
      min: ModashPerformanceMetric[];
      max: ModashPerformanceMetric[];
      median: ModashPerformanceMetric[];
    };
    comments: {
      mean: ModashPerformanceMetric[];
      min: ModashPerformanceMetric[];
      max: ModashPerformanceMetric[];
      median: ModashPerformanceMetric[];
    };
    views: {
      mean: ModashPerformanceMetric[];
      min: ModashPerformanceMetric[];
      max: ModashPerformanceMetric[];
      median: ModashPerformanceMetric[];
    };
    engagement_rate: ModashPerformanceMetric[];
    posting_statistics: {
      weekDay?: {
        mean: {
          numberOfItems: number;
          value: Record<string, number>;
        };
      };
      weekDayHour?: {
        mean: {
          numberOfItems: number;
          value: number;
        };
      };
      daily: {
        mean: {
          numberOfItems: number;
          value: number;
        };
      };
    };
  };
  reels?: {
    total: number;
    reels_with_hidden_likes: number;
    likes: {
      mean: ModashPerformanceMetric[];
      min: ModashPerformanceMetric[];
      max: ModashPerformanceMetric[];
      median: ModashPerformanceMetric[];
    };
    comments: {
      mean: ModashPerformanceMetric[];
      min: ModashPerformanceMetric[];
      max: ModashPerformanceMetric[];
      median: ModashPerformanceMetric[];
    };
    views: {
      mean: ModashPerformanceMetric[];
      min: ModashPerformanceMetric[];
      max: ModashPerformanceMetric[];
      median: ModashPerformanceMetric[];
    };
    engagement_rate: ModashPerformanceMetric[];
    posting_statistics: {
      weekDayHour: {
        mean: {
          numberOfItems: number;
          value: number;
        };
      };
      daily: {
        mean: {
          numberOfItems: number;
          value: number;
        };
      };
    };
  };
  videos?: {
    total: number;
    videos_with_turned_off_comments: number;
    likes: {
      mean: ModashPerformanceMetric[];
      min: ModashPerformanceMetric[];
      max: ModashPerformanceMetric[];
      median: ModashPerformanceMetric[];
    };
    views: {
      mean: ModashPerformanceMetric[];
      min: ModashPerformanceMetric[];
      max: ModashPerformanceMetric[];
      median: ModashPerformanceMetric[];
    };
    comments: {
      mean: ModashPerformanceMetric[];
      min: ModashPerformanceMetric[];
      max: ModashPerformanceMetric[];
      median: ModashPerformanceMetric[];
    };
    engagement_rate: ModashPerformanceMetric[];
    posting_statistics: {
      weekDay: {
        mean: {
          numberOfItems: number;
          value: Record<string, number>;
        };
      };
      daily: {
        mean: {
          numberOfItems: number;
          value: number;
        };
      };
    };
  };
  shorts?: {
    total: number;
    shorts_with_turned_off_comments: number;
    likes: {
      mean: ModashPerformanceMetric[];
      min: ModashPerformanceMetric[];
      max: ModashPerformanceMetric[];
      median: ModashPerformanceMetric[];
    };
    views: {
      mean: ModashPerformanceMetric[];
      min: ModashPerformanceMetric[];
      max: ModashPerformanceMetric[];
      median: ModashPerformanceMetric[];
    };
    comments: {
      mean: ModashPerformanceMetric[];
      min: ModashPerformanceMetric[];
      max: ModashPerformanceMetric[];
      median: ModashPerformanceMetric[];
    };
    engagement_rate: ModashPerformanceMetric[];
  };
}

// Types pour l'audience overlap
export interface ModashOverlapReport {
  userId: string;
  username: string;
  followers: number;
  uniquePercentage: number;
  overlappingPercentage: number;
}

export interface ModashAudienceOverlapResponse {
  error: boolean;
  reportInfo: {
    totalFollowers: number;
    totalUniqueFollowers: number;
  };
  data: ModashOverlapReport[];
}

// Types pour la recherche par email
export interface ModashMatchedEmail {
  email: string;
  accounts: Array<{
    platform: 'instagram' | 'youtube' | 'tiktok';
    userId: string;
    username: string;
    fullname?: string;
    picture: string;
    followers: number;
    isVerified: boolean;
  }>;
}

export interface ModashEmailSearchResponse {
  error: boolean;
  matchedEmails: ModashMatchedEmail[];
  notMatchedEmails: string[];
  totalMatches: number;
}
