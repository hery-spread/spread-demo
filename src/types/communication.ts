// Types unifiés pour le système de communication

export interface CommunicationChannel {
  id: string;
  name: string;
  type: 'email' | 'linkedin' | 'instagram' | 'phone' | 'other';
  connected: boolean;
  lastSync?: string;
}

export interface CommunicationContact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  socialHandles?: {
    linkedin?: string;
    instagram?: string;
    tiktok?: string;
    youtube?: string;
  };
  avatar?: string;
  company?: string;
  tags?: string[];
}

export interface CommunicationMessage {
  id: string;
  threadId: string;
  senderId: string;
  recipientId: string;
  channel: 'email' | 'linkedin' | 'instagram' | 'phone' | 'other';
  type: 'sent' | 'received' | 'draft';
  subject?: string;
  content: string;
  htmlContent?: string;
  attachments?: CommunicationAttachment[];
  timestamp: string;
  status: 'draft' | 'scheduled' | 'sent' | 'delivered' | 'opened' | 'clicked' | 'replied' | 'bounced' | 'failed';
  trackingData?: {
    opened?: boolean;
    openedAt?: string;
    clicked?: boolean;
    clickedAt?: string;
    linkClicks?: { url: string; clickedAt: string }[];
  };
  metadata?: Record<string, string | number | boolean>;
}

export interface CommunicationThread {
  id: string;
  contactId: string;
  contact: CommunicationContact;
  channel: 'email' | 'linkedin' | 'instagram' | 'phone' | 'other';
  subject: string;
  lastMessage: CommunicationMessage;
  messageCount: number;
  status: 'new' | 'responded' | 'waiting' | 'negotiating' | 'closed' | 'archived';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  tags?: string[];
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  isRead: boolean;
  isStarred?: boolean;
  campaignId?: string;
  listId?: string;
}

export interface CommunicationAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

export interface CommunicationTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  htmlContent?: string;
  variables?: string[];
  category: 'outreach' | 'follow_up' | 'negotiation' | 'closing' | 'other';
  channel: 'email' | 'linkedin' | 'instagram' | 'other';
  isDefault?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CommunicationCampaign {
  id: string;
  name: string;
  description?: string;
  type: 'sequence' | 'broadcast' | 'drip';
  channel: 'email' | 'linkedin' | 'instagram' | 'multi';
  status: 'draft' | 'scheduled' | 'active' | 'paused' | 'completed' | 'cancelled';
  listId?: string;
  listName?: string;
  contactIds: string[];
  templateIds: string[];
  sequence?: CommunicationSequenceStep[];
  scheduledAt?: string;
  startedAt?: string;
  completedAt?: string;
  stats: {
    total: number;
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    replied: number;
    bounced: number;
    unsubscribed: number;
  };
  settings: {
    trackOpens: boolean;
    trackClicks: boolean;
    unsubscribeLink: boolean;
    sendTime?: string;
    timezone?: string;
  };
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface CommunicationSequenceStep {
  id: string;
  stepNumber: number;
  templateId: string;
  template?: CommunicationTemplate;
  delayDays: number;
  delayHours?: number;
  conditions?: {
    ifOpened?: boolean;
    ifClicked?: boolean;
    ifReplied?: boolean;
    ifNotReplied?: boolean;
  };
  isActive: boolean;
}

export interface CommunicationFilter {
  channels?: ('email' | 'linkedin' | 'instagram' | 'phone' | 'other')[];
  statuses?: string[];
  priorities?: ('low' | 'medium' | 'high' | 'urgent')[];
  dateRange?: {
    start: string;
    end: string;
  };
  searchQuery?: string;
  tags?: string[];
  assignedTo?: string[];
  isRead?: boolean;
  isStarred?: boolean;
  hasAttachments?: boolean;
  campaignId?: string;
  listId?: string;
}

export interface CommunicationStats {
  totalThreads: number;
  newThreads: number;
  respondedThreads: number;
  waitingThreads: number;
  closedThreads: number;
  totalMessages: number;
  sentMessages: number;
  receivedMessages: number;
  openRate: number;
  responseRate: number;
  averageResponseTime: number; // en heures
  topPerformingTemplates: {
    templateId: string;
    templateName: string;
    openRate: number;
    responseRate: number;
    usageCount: number;
  }[];
  activityByDay: {
    date: string;
    sent: number;
    received: number;
    opened: number;
  }[];
}

export interface CommunicationSettings {
  defaultChannel: 'email' | 'linkedin' | 'instagram';
  defaultSender: {
    name: string;
    email: string;
  };
  signatures: {
    [channel: string]: string;
  };
  autoResponders: {
    enabled: boolean;
    templates: string[];
  };
  notifications: {
    newReplies: boolean;
    campaignUpdates: boolean;
    weeklyReports: boolean;
  };
  workingHours: {
    enabled: boolean;
    timezone: string;
    schedule: {
      [day: string]: {
        enabled: boolean;
        start: string;
        end: string;
      };
    };
  };
}

// Types pour les hooks
export interface UseCommunicationReturn {
  // State
  threads: CommunicationThread[];
  messages: CommunicationMessage[];
  campaigns: CommunicationCampaign[];
  templates: CommunicationTemplate[];
  stats: CommunicationStats;
  filters: CommunicationFilter;
  loading: boolean;
  error: string | null;

  // Actions
  loadThreads: (filters?: CommunicationFilter) => Promise<void>;
  loadMessages: (threadId: string) => Promise<void>;
  sendMessage: (message: Partial<CommunicationMessage>) => Promise<void>;
  createThread: (contact: CommunicationContact, initialMessage: Partial<CommunicationMessage>) => Promise<string>;
  updateThreadStatus: (threadId: string, status: CommunicationThread['status']) => Promise<void>;
  archiveThread: (threadId: string) => Promise<void>;
  starThread: (threadId: string, starred: boolean) => Promise<void>;
  markAsRead: (threadIds: string[]) => Promise<void>;
  
  // Templates
  createTemplate: (template: Partial<CommunicationTemplate>) => Promise<void>;
  updateTemplate: (templateId: string, updates: Partial<CommunicationTemplate>) => Promise<void>;
  deleteTemplate: (templateId: string) => Promise<void>;
  
  // Campaigns
  createCampaign: (campaign: Partial<CommunicationCampaign>) => Promise<void>;
  updateCampaign: (campaignId: string, updates: Partial<CommunicationCampaign>) => Promise<void>;
  startCampaign: (campaignId: string) => Promise<void>;
  pauseCampaign: (campaignId: string) => Promise<void>;
  deleteCampaign: (campaignId: string) => Promise<void>;
  
  // Filters & Search
  setFilters: (filters: Partial<CommunicationFilter>) => void;
  clearFilters: () => void;
  search: (query: string) => void;
}

// Types pour le Context
export interface CommunicationContextValue extends UseCommunicationReturn {
  selectedThread: CommunicationThread | null;
  selectedCampaign: CommunicationCampaign | null;
  selectThread: (thread: CommunicationThread | null) => void;
  selectCampaign: (campaign: CommunicationCampaign | null) => void;
  refreshStats: () => Promise<void>;
}

// Types pour les composants
export interface CommunicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'single' | 'bulk' | 'campaign';
  contacts?: CommunicationContact[];
  listId?: string;
  templateId?: string;
  onSent?: (result: { sent: number; failed: number }) => void;
}

export interface ThreadViewerProps {
  threadId?: string;
  contactId?: string;
  showHeader?: boolean;
  showComposer?: boolean;
  compact?: boolean;
}

export interface CommunicationHubProps {
  defaultView?: 'inbox' | 'campaigns' | 'templates' | 'analytics';
  embedded?: boolean;
  showSidebar?: boolean;
} 