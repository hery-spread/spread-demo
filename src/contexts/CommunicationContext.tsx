'use client';

import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from 'react';
import {
  CommunicationContextValue,
  CommunicationThread,
  CommunicationMessage,
  CommunicationCampaign,
  CommunicationTemplate,
  CommunicationStats,
  CommunicationFilter,
  CommunicationContact,
} from '@/types/communication';

// State types
interface CommunicationState {
  threads: CommunicationThread[];
  messages: Record<string, CommunicationMessage[]>;
  campaigns: CommunicationCampaign[];
  templates: CommunicationTemplate[];
  stats: CommunicationStats;
  filters: CommunicationFilter;
  selectedThread: CommunicationThread | null;
  selectedCampaign: CommunicationCampaign | null;
  loading: boolean;
  error: string | null;
}

// Action types
type CommunicationAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_THREADS'; payload: CommunicationThread[] }
  | { type: 'ADD_THREAD'; payload: CommunicationThread }
  | {
      type: 'UPDATE_THREAD';
      payload: { threadId: string; updates: Partial<CommunicationThread> };
    }
  | { type: 'DELETE_THREAD'; payload: string }
  | {
      type: 'SET_MESSAGES';
      payload: { threadId: string; messages: CommunicationMessage[] };
    }
  | { type: 'ADD_MESSAGE'; payload: CommunicationMessage }
  | { type: 'SET_CAMPAIGNS'; payload: CommunicationCampaign[] }
  | { type: 'ADD_CAMPAIGN'; payload: CommunicationCampaign }
  | {
      type: 'UPDATE_CAMPAIGN';
      payload: { campaignId: string; updates: Partial<CommunicationCampaign> };
    }
  | { type: 'DELETE_CAMPAIGN'; payload: string }
  | { type: 'SET_TEMPLATES'; payload: CommunicationTemplate[] }
  | { type: 'ADD_TEMPLATE'; payload: CommunicationTemplate }
  | {
      type: 'UPDATE_TEMPLATE';
      payload: { templateId: string; updates: Partial<CommunicationTemplate> };
    }
  | { type: 'DELETE_TEMPLATE'; payload: string }
  | { type: 'SET_STATS'; payload: CommunicationStats }
  | { type: 'SET_FILTERS'; payload: CommunicationFilter }
  | { type: 'SELECT_THREAD'; payload: CommunicationThread | null }
  | { type: 'SELECT_CAMPAIGN'; payload: CommunicationCampaign | null };

// Initial state
const initialState: CommunicationState = {
  threads: [],
  messages: {},
  campaigns: [],
  templates: [],
  stats: {
    totalThreads: 0,
    newThreads: 0,
    respondedThreads: 0,
    waitingThreads: 0,
    closedThreads: 0,
    totalMessages: 0,
    sentMessages: 0,
    receivedMessages: 0,
    openRate: 0,
    responseRate: 0,
    averageResponseTime: 0,
    topPerformingTemplates: [],
    activityByDay: [],
  },
  filters: {},
  selectedThread: null,
  selectedCampaign: null,
  loading: false,
  error: null,
};

// Reducer
function communicationReducer(
  state: CommunicationState,
  action: CommunicationAction
): CommunicationState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };

    case 'SET_THREADS':
      return { ...state, threads: action.payload };

    case 'ADD_THREAD':
      return { ...state, threads: [action.payload, ...state.threads] };

    case 'UPDATE_THREAD':
      return {
        ...state,
        threads: state.threads.map((thread) =>
          thread.id === action.payload.threadId
            ? { ...thread, ...action.payload.updates }
            : thread
        ),
        selectedThread:
          state.selectedThread?.id === action.payload.threadId
            ? { ...state.selectedThread, ...action.payload.updates }
            : state.selectedThread,
      };

    case 'DELETE_THREAD':
      return {
        ...state,
        threads: state.threads.filter((thread) => thread.id !== action.payload),
        selectedThread:
          state.selectedThread?.id === action.payload
            ? null
            : state.selectedThread,
      };

    case 'SET_MESSAGES':
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.threadId]: action.payload.messages,
        },
      };

    case 'ADD_MESSAGE':
      const threadId = action.payload.threadId;
      return {
        ...state,
        messages: {
          ...state.messages,
          [threadId]: [...(state.messages[threadId] || []), action.payload],
        },
      };

    case 'SET_CAMPAIGNS':
      return { ...state, campaigns: action.payload };

    case 'ADD_CAMPAIGN':
      return { ...state, campaigns: [action.payload, ...state.campaigns] };

    case 'UPDATE_CAMPAIGN':
      return {
        ...state,
        campaigns: state.campaigns.map((campaign) =>
          campaign.id === action.payload.campaignId
            ? { ...campaign, ...action.payload.updates }
            : campaign
        ),
        selectedCampaign:
          state.selectedCampaign?.id === action.payload.campaignId
            ? { ...state.selectedCampaign, ...action.payload.updates }
            : state.selectedCampaign,
      };

    case 'DELETE_CAMPAIGN':
      return {
        ...state,
        campaigns: state.campaigns.filter(
          (campaign) => campaign.id !== action.payload
        ),
        selectedCampaign:
          state.selectedCampaign?.id === action.payload
            ? null
            : state.selectedCampaign,
      };

    case 'SET_TEMPLATES':
      return { ...state, templates: action.payload };

    case 'ADD_TEMPLATE':
      return { ...state, templates: [action.payload, ...state.templates] };

    case 'UPDATE_TEMPLATE':
      return {
        ...state,
        templates: state.templates.map((template) =>
          template.id === action.payload.templateId
            ? { ...template, ...action.payload.updates }
            : template
        ),
      };

    case 'DELETE_TEMPLATE':
      return {
        ...state,
        templates: state.templates.filter(
          (template) => template.id !== action.payload
        ),
      };

    case 'SET_STATS':
      return { ...state, stats: action.payload };

    case 'SET_FILTERS':
      return { ...state, filters: action.payload };

    case 'SELECT_THREAD':
      return { ...state, selectedThread: action.payload };

    case 'SELECT_CAMPAIGN':
      return { ...state, selectedCampaign: action.payload };

    default:
      return state;
  }
}

// Context
const CommunicationContext = createContext<CommunicationContextValue | null>(
  null
);

// Provider component
export function CommunicationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(communicationReducer, initialState);

  // Mock data loading functions (simulating API calls)
  const loadThreads = useCallback(async (filters?: CommunicationFilter) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // TODO: Replace with actual API call
      const mockThreads: CommunicationThread[] = [];

      dispatch({ type: 'SET_THREADS', payload: mockThreads });

      if (filters) {
        dispatch({ type: 'SET_FILTERS', payload: filters });
      }
    } catch {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Erreur lors du chargement des conversations',
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const loadMessages = useCallback(async (threadId: string) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300));

      // TODO: Replace with actual API call
      const mockMessages: CommunicationMessage[] = [];

      dispatch({
        type: 'SET_MESSAGES',
        payload: { threadId, messages: mockMessages },
      });
    } catch {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Erreur lors du chargement des messages',
      });
    }
  }, []);

  const sendMessage = useCallback(
    async (message: Partial<CommunicationMessage>) => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const newMessage: CommunicationMessage = {
          id: `msg_${Date.now()}`,
          threadId: message.threadId!,
          senderId: 'current_user',
          recipientId: message.recipientId!,
          channel: message.channel || 'email',
          type: 'sent',
          content: message.content!,
          timestamp: new Date().toISOString(),
          status: 'sent',
          ...message,
        };

        dispatch({ type: 'ADD_MESSAGE', payload: newMessage });

        // Update thread's last message
        dispatch({
          type: 'UPDATE_THREAD',
          payload: {
            threadId: message.threadId!,
            updates: {
              lastMessage: newMessage,
              updatedAt: new Date().toISOString(),
            },
          },
        });
      } catch (error) {
        dispatch({
          type: 'SET_ERROR',
          payload: "Erreur lors de l'envoi du message",
        });
        throw error;
      }
    },
    []
  );

  const createThread = useCallback(
    async (
      contact: CommunicationContact,
      initialMessage: Partial<CommunicationMessage>
    ): Promise<string> => {
      try {
        const threadId = `thread_${Date.now()}`;
        const messageId = `msg_${Date.now()}`;

        const message: CommunicationMessage = {
          id: messageId,
          threadId,
          senderId: 'current_user',
          recipientId: contact.id,
          channel: initialMessage.channel || 'email',
          type: 'sent',
          content: initialMessage.content!,
          subject: initialMessage.subject,
          timestamp: new Date().toISOString(),
          status: 'sent',
          ...initialMessage,
        };

        const thread: CommunicationThread = {
          id: threadId,
          contactId: contact.id,
          contact,
          channel: message.channel,
          subject: message.subject || 'Nouveau message',
          lastMessage: message,
          messageCount: 1,
          status: 'new',
          priority: 'medium',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isRead: true,
        };

        dispatch({ type: 'ADD_THREAD', payload: thread });
        dispatch({
          type: 'SET_MESSAGES',
          payload: { threadId, messages: [message] },
        });

        return threadId;
      } catch (error) {
        dispatch({
          type: 'SET_ERROR',
          payload: 'Erreur lors de la création de la conversation',
        });
        throw error;
      }
    },
    []
  );

  const updateThreadStatus = useCallback(
    async (threadId: string, status: CommunicationThread['status']) => {
      try {
        dispatch({
          type: 'UPDATE_THREAD',
          payload: {
            threadId,
            updates: { status, updatedAt: new Date().toISOString() },
          },
        });
      } catch {
        dispatch({
          type: 'SET_ERROR',
          payload: 'Erreur lors de la mise à jour du statut',
        });
      }
    },
    []
  );

  // Additional action implementations...
  const archiveThread = useCallback(
    async (threadId: string) => {
      await updateThreadStatus(threadId, 'archived');
    },
    [updateThreadStatus]
  );

  const starThread = useCallback(async (threadId: string, starred: boolean) => {
    dispatch({
      type: 'UPDATE_THREAD',
      payload: { threadId, updates: { isStarred: starred } },
    });
  }, []);

  const markAsRead = useCallback(async (threadIds: string[]) => {
    threadIds.forEach((threadId) => {
      dispatch({
        type: 'UPDATE_THREAD',
        payload: { threadId, updates: { isRead: true } },
      });
    });
  }, []);

  // Template actions
  const createTemplate = useCallback(
    async (template: Partial<CommunicationTemplate>) => {
      const newTemplate: CommunicationTemplate = {
        id: `template_${Date.now()}`,
        name: template.name!,
        subject: template.subject!,
        content: template.content!,
        variables: template.variables || [],
        category: template.category || 'other',
        channel: template.channel || 'email',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...template,
      };

      dispatch({ type: 'ADD_TEMPLATE', payload: newTemplate });
    },
    []
  );

  const updateTemplate = useCallback(
    async (templateId: string, updates: Partial<CommunicationTemplate>) => {
      dispatch({
        type: 'UPDATE_TEMPLATE',
        payload: {
          templateId,
          updates: { ...updates, updatedAt: new Date().toISOString() },
        },
      });
    },
    []
  );

  const deleteTemplate = useCallback(async (templateId: string) => {
    dispatch({ type: 'DELETE_TEMPLATE', payload: templateId });
  }, []);

  // Campaign actions
  const createCampaign = useCallback(
    async (campaign: Partial<CommunicationCampaign>) => {
      const newCampaign: CommunicationCampaign = {
        id: `campaign_${Date.now()}`,
        name: campaign.name!,
        type: campaign.type || 'sequence',
        channel: campaign.channel || 'email',
        status: 'draft',
        contactIds: campaign.contactIds || [],
        templateIds: campaign.templateIds || [],
        stats: {
          total: 0,
          sent: 0,
          delivered: 0,
          opened: 0,
          clicked: 0,
          replied: 0,
          bounced: 0,
          unsubscribed: 0,
        },
        settings: {
          trackOpens: true,
          trackClicks: true,
          unsubscribeLink: true,
          ...campaign.settings,
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'current_user',
        ...campaign,
      };

      dispatch({ type: 'ADD_CAMPAIGN', payload: newCampaign });
    },
    []
  );

  const updateCampaign = useCallback(
    async (campaignId: string, updates: Partial<CommunicationCampaign>) => {
      dispatch({
        type: 'UPDATE_CAMPAIGN',
        payload: {
          campaignId,
          updates: { ...updates, updatedAt: new Date().toISOString() },
        },
      });
    },
    []
  );

  const startCampaign = useCallback(
    async (campaignId: string) => {
      await updateCampaign(campaignId, {
        status: 'active',
        startedAt: new Date().toISOString(),
      });
    },
    [updateCampaign]
  );

  const pauseCampaign = useCallback(
    async (campaignId: string) => {
      await updateCampaign(campaignId, { status: 'paused' });
    },
    [updateCampaign]
  );

  const deleteCampaign = useCallback(async (campaignId: string) => {
    dispatch({ type: 'DELETE_CAMPAIGN', payload: campaignId });
  }, []);

  // Filter actions
  const setFilters = useCallback(
    (filters: Partial<CommunicationFilter>) => {
      dispatch({
        type: 'SET_FILTERS',
        payload: { ...state.filters, ...filters },
      });
    },
    [state.filters]
  );

  const clearFilters = useCallback(() => {
    dispatch({ type: 'SET_FILTERS', payload: {} });
  }, []);

  const search = useCallback(
    (query: string) => {
      setFilters({ searchQuery: query });
    },
    [setFilters]
  );

  // Selection actions
  const selectThread = useCallback((thread: CommunicationThread | null) => {
    dispatch({ type: 'SELECT_THREAD', payload: thread });
  }, []);

  const selectCampaign = useCallback(
    (campaign: CommunicationCampaign | null) => {
      dispatch({ type: 'SELECT_CAMPAIGN', payload: campaign });
    },
    []
  );

  const refreshStats = useCallback(async () => {
    // TODO: Implement stats refresh
    console.log('Refreshing stats...');
  }, []);

  // Context value
  const contextValue: CommunicationContextValue = {
    // State
    threads: state.threads,
    messages: Object.values(state.messages).flat(),
    campaigns: state.campaigns,
    templates: state.templates,
    stats: state.stats,
    filters: state.filters,
    selectedThread: state.selectedThread,
    selectedCampaign: state.selectedCampaign,
    loading: state.loading,
    error: state.error,

    // Actions
    loadThreads,
    loadMessages,
    sendMessage,
    createThread,
    updateThreadStatus,
    archiveThread,
    starThread,
    markAsRead,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    createCampaign,
    updateCampaign,
    startCampaign,
    pauseCampaign,
    deleteCampaign,
    setFilters,
    clearFilters,
    search,
    selectThread,
    selectCampaign,
    refreshStats,
  };

  return (
    <CommunicationContext.Provider value={contextValue}>
      {children}
    </CommunicationContext.Provider>
  );
}

// Hook to use the context
export function useCommunication() {
  const context = useContext(CommunicationContext);
  if (!context) {
    throw new Error(
      'useCommunication must be used within a CommunicationProvider'
    );
  }
  return context;
}
