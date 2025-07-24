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