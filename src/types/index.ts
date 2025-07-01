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
}

export interface InfluencerList {
  id: string;
  name: string;
  createdAt: string;
  influencers: {
    id: string;
    contactName?: string;
    contactEmail?: string;
  }[];
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