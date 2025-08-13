export interface Influencer {
  id: string;
  name: string;
  username: string;
  platform: "instagram" | "youtube" | "tiktok";
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
      "13-17": number;
      "18-24": number;
      "25-34": number;
      "35-44": number;
      "45-64": number;
    };
    countries: Record<string, number>;
    cities: Record<string, number>;
    languages: Record<string, number>;
    ethnicities: Record<string, number>;
    interests: {
      topics: Record<string, number>;
      brands: Record<string, number>;
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
    type: "image" | "video" | "carousel";
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
  searches: number | "unlimited";
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
    action: "unlock_report" | "search" | "purchase";
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
  
  // Tracking et hashtags
  trackedHashtags: string[]; // Hashtags trouvés dans le contenu
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
    hashtags: string[]; // #samsungCampagne2025
    mentions: string[]; // @samsung, @influencer
    keywords: string[]; // mots-clés à chercher
    platforms: ('instagram' | 'youtube' | 'tiktok')[];
    autoImport: boolean; // Import automatique des contenus détectés
    flagMissingHashtags: boolean;
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
  
  // Créateur de contenu
  creator?: {
    gender?: 'male' | 'female' | 'non-binary' | 'not-specified';
    ageRange?: { min: number; max: number };
    languages?: string[]; // Langues parlées
    verified?: boolean;
    hasEmail?: boolean;
    hasPhoneNumber?: boolean;
    categories?: string[]; // Catégories de contenu (lifestyle, tech, gaming, etc.)
    location?: {
      country?: string;
      city?: string;
      continent?: 'europe' | 'america' | 'asia' | 'africa' | 'oceania';
    };
  };
  
  // Audience
  audience?: {
    followersRange?: { min: number; max: number };
    engagementRange?: { min: number; max: number }; // En pourcentage
    avgLikesRange?: { min: number; max: number };
    avgCommentsRange?: { min: number; max: number };
    avgSharesRange?: { min: number; max: number };
    avgViewsRange?: { min: number; max: number }; // Pour vidéos
    audienceGender?: {
      malePercentage?: { min: number; max: number };
      femalePercentage?: { min: number; max: number };
    };
    audienceAgeRange?: {
      age13_17?: { min: number; max: number };
      age18_24?: { min: number; max: number };
      age25_34?: { min: number; max: number };
      age35_44?: { min: number; max: number };
      age45_54?: { min: number; max: number };
      age55plus?: { min: number; max: number };
    };
    audienceLocation?: {
      topCountries?: string[];
      excludeCountries?: string[];
    };
  };
  
  // Contenu
  content?: {
    postFrequency?: 'very-low' | 'low' | 'medium' | 'high' | 'very-high';
    totalPostsRange?: { min: number; max: number };
    recentActivityDays?: number; // Dernière activité (en jours)
    contentTypes?: ('photo' | 'video' | 'story' | 'reel' | 'live' | 'short')[];
    avgVideoLength?: { min: number; max: number }; // En secondes
    postingDays?: ('monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday')[];
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