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
      const mockThreads: CommunicationThread[] = [
        {
          id: 'thread_1',
          contactId: 'contact_1',
          contact: {
            id: 'contact_1',
            name: 'Emma Lifestyle',
            email: 'emma@lifestyle-blog.com',
            avatar:
              'https://ui-avatars.com/api/?name=Emma+Lifestyle&background=8b5cf6&color=fff',
            socialHandles: {
              youtube: '@emma_lifestyle',
            },
            tags: ['lifestyle', 'mode', 'beauté'],
          },
          subject: 'Collaboration Samsung Galaxy S24 - Réponse positive 🔥',
          channel: 'email',
          status: 'responded',
          priority: 'high',
          isRead: false,
          isStarred: true,
          messageCount: 3,
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2h ago
          updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30min ago
          lastMessage: {
            id: 'msg_1_3',
            threadId: 'thread_1',
            senderId: 'contact_1',
            recipientId: 'current_user',
            channel: 'email',
            type: 'received',
            subject: 'Re: Collaboration Samsung Galaxy S24',
            content:
              'Bonjour ! Je suis très intéressée par cette collaboration. Mes tarifs pour un post + story sont de 800€. Pouvons-nous programmer un appel cette semaine ? Je suis super motivée ! 💫',
            timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
            status: 'delivered',
          },
        },
        {
          id: 'thread_2',
          contactId: 'contact_2',
          contact: {
            id: 'contact_2',
            name: 'Lucas Gaming',
            email: 'lucas@gaming-world.fr',
            avatar:
              'https://ui-avatars.com/api/?name=Lucas+Gaming&background=3b82f6&color=fff',
            socialHandles: {
              youtube: '@lucas_gaming',
            },
            tags: ['gaming', 'tech', 'reviews', 'esports'],
          },
          subject: 'Campagne Gaming Headset - En attente de réponse',
          channel: 'email',
          status: 'waiting',
          priority: 'medium',
          isRead: false,
          isStarred: true,
          messageCount: 2,
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
          updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6h ago
          lastMessage: {
            id: 'msg_2_2',
            threadId: 'thread_2',
            senderId: 'contact_2',
            recipientId: 'current_user',
            channel: 'email',
            type: 'received',
            subject: 'Proposition gaming intéressante',
            content:
              "Salut ! J'ai vu votre message sur LinkedIn concernant le nouveau casque gaming. Je suis intéressé mais j'ai quelques questions sur les specs techniques. Quand seriez-vous disponible pour en discuter ? 🎮",
            timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
            status: 'delivered',
          },
        },
        {
          id: 'thread_3',
          contactId: 'contact_3',
          contact: {
            id: 'contact_3',
            name: 'Sophie Fitness',
            email: 'sophie@fitlife.com',
            avatar:
              'https://ui-avatars.com/api/?name=Sophie+Fitness&background=10b981&color=fff',
            socialHandles: {
              youtube: '@sophie_fitlife',
              tiktok: '@fit_sophie',
            },
            tags: ['fitness', 'nutrition', 'wellness', 'healthy'],
          },
          subject: 'Collaboration Compléments Alimentaires - Négociation',
          channel: 'email',
          status: 'negotiating',
          priority: 'high',
          isRead: false,
          isStarred: true,
          messageCount: 5,
          createdAt: new Date(
            Date.now() - 3 * 24 * 60 * 60 * 1000
          ).toISOString(), // 3 days ago
          updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2h ago
          lastMessage: {
            id: 'msg_3_5',
            threadId: 'thread_3',
            senderId: 'contact_3',
            recipientId: 'current_user',
            channel: 'email',
            type: 'received',
            subject: 'DM Instagram - Suite collaboration',
            content:
              "Coucou ! J'ai bien réfléchi à votre proposition de collaboration pour les compléments alimentaires. Je suis partante mais je préférerais travailler avec vos produits naturels. Pouvez-vous m'envoyer plus d'infos sur cette gamme ? 💪✨",
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            status: 'delivered',
          },
        },
        {
          id: 'thread_4',
          contactId: 'contact_4',
          contact: {
            id: 'contact_4',
            name: 'Marie Cuisine',
            email: 'marie@cuisine-passion.fr',
            avatar:
              'https://ui-avatars.com/api/?name=Marie+Cuisine&background=f59e0b&color=fff',
            socialHandles: {
              youtube: '@CuisineMarie',
            },
            tags: ['cuisine', 'recettes', 'food', 'healthy-food'],
          },
          subject: 'Campagne Ustensiles de Cuisine - Nouveau contact',
          channel: 'email',
          status: 'new',
          priority: 'medium',
          isRead: false,
          isStarred: false,
          messageCount: 1,
          createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6h ago
          updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          lastMessage: {
            id: 'msg_4_1',
            threadId: 'thread_4',
            senderId: 'current_user',
            recipientId: 'contact_4',
            channel: 'email',
            type: 'sent',
            subject: 'Collaboration Ustensiles de Cuisine Premium',
            content:
              "Bonjour Marie, nous avons découvert votre contenu culinaire et aimerions vous proposer une collaboration avec notre marque d'ustensiles premium. Êtes-vous disponible pour en discuter ?",
            timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
            status: 'sent',
          },
        },
        {
          id: 'thread_5',
          contactId: 'contact_5',
          contact: {
            id: 'contact_5',
            name: 'Alex Travel',
            email: 'alex@wanderlust-adventures.com',
            avatar:
              'https://ui-avatars.com/api/?name=Alex+Travel&background=ef4444&color=fff',
            socialHandles: {
              youtube: '@alex_wanderlust',
              tiktok: '@travel_alex',
            },
            tags: ['travel', 'adventure', 'photography', 'nature'],
          },
          subject: 'Partenariat Voyage Maldives - Fermé',
          channel: 'email',
          status: 'closed',
          priority: 'low',
          isRead: true,
          isStarred: false,
          messageCount: 6,
          createdAt: new Date(
            Date.now() - 7 * 24 * 60 * 60 * 1000
          ).toISOString(), // 1 week ago
          updatedAt: new Date(
            Date.now() - 5 * 24 * 60 * 60 * 1000
          ).toISOString(), // 5 days ago
          lastMessage: {
            id: 'msg_5_6',
            threadId: 'thread_5',
            senderId: 'contact_5',
            recipientId: 'current_user',
            channel: 'email',
            type: 'received',
            subject: 'Re: Collaboration terminée - Merci !',
            content:
              "Merci beaucoup pour cette superbe collaboration ! Les posts ont très bien fonctionné. J'espère que nous pourrons retravailler ensemble bientôt.",
            timestamp: new Date(
              Date.now() - 5 * 24 * 60 * 60 * 1000
            ).toISOString(),
            status: 'delivered',
          },
        },
        {
          id: 'thread_6',
          contactId: 'contact_6',
          contact: {
            id: 'contact_6',
            name: 'Julien Tech',
            email: 'julien@tech-reviews.fr',
            avatar:
              'https://ui-avatars.com/api/?name=Julien+Tech&background=6366f1&color=fff',
            socialHandles: {
              youtube: '@julien_tech',
            },
            tags: ['tech', 'reviews', 'gadgets', 'innovation'],
          },
          subject: 'Review Smartphone - En attente de réponse',
          channel: 'email',
          status: 'waiting',
          priority: 'medium',
          isRead: true,
          isStarred: false,
          messageCount: 1,
          createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12h ago
          updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
          lastMessage: {
            id: 'msg_6_1',
            threadId: 'thread_6',
            senderId: 'current_user',
            recipientId: 'contact_6',
            channel: 'email',
            type: 'sent',
            subject: 'Proposition Review Smartphone Flagship',
            content:
              'Bonjour Julien, nous aimerions vous envoyer notre nouveau smartphone flagship pour une review complète. Quels sont vos tarifs pour une vidéo dédiée ?',
            timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
            status: 'delivered',
          },
        },
        {
          id: 'thread_7',
          contactId: 'contact_7',
          contact: {
            id: 'contact_7',
            name: 'Camille Beauty',
            email: 'camille@beauty-secrets.com',
            avatar:
              'https://ui-avatars.com/api/?name=Camille+Beauty&background=e11d48&color=fff',
            socialHandles: {
              youtube: '@beauty_camille',
              tiktok: '@camille_beauty',
            },
            tags: ['beauté', 'cosmétiques', 'skincare', 'makeup'],
          },
          subject: 'Campagne Soins de Peau - Réponse urgente !',
          channel: 'email',
          status: 'responded',
          priority: 'urgent',
          isRead: false,
          isStarred: true,
          messageCount: 2,
          createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1h ago
          updatedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15min ago
          lastMessage: {
            id: 'msg_7_2',
            threadId: 'thread_7',
            senderId: 'contact_7',
            recipientId: 'current_user',
            channel: 'email',
            type: 'received',
            subject: 'DM Instagram - Super intéressée !',
            content:
              "OMG votre campagne de soins de peau a l'air incroyable ! Je suis définitivement intéressée. Mes followers adorent les produits naturels. On se call cette semaine ? 💄✨",
            timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
            status: 'delivered',
          },
        },
        {
          id: 'thread_8',
          contactId: 'contact_8',
          contact: {
            id: 'contact_8',
            name: 'Thomas Fashion',
            email: 'thomas@style-street.com',
            avatar:
              'https://ui-avatars.com/api/?name=Thomas+Fashion&background=7c3aed&color=fff',
            socialHandles: {
              youtube: '@thomas_style',
            },
            tags: ['fashion', 'style', 'design', 'lifestyle'],
          },
          subject: 'Collaboration Mode Éco-responsable',
          channel: 'email',
          status: 'new',
          priority: 'high',
          isRead: false,
          isStarred: false,
          messageCount: 1,
          createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3h ago
          updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
          lastMessage: {
            id: 'msg_8_1',
            threadId: 'thread_8',
            senderId: 'current_user',
            recipientId: 'contact_8',
            channel: 'email',
            type: 'sent',
            subject: 'Proposition collaboration mode durable',
            content:
              'Bonjour Thomas, nous admirons votre travail en matière de mode éco-responsable. Nous aimerions vous proposer une collaboration avec notre nouvelle collection durable. Seriez-vous intéressé ?',
            timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
            status: 'sent',
          },
        },
        {
          id: 'thread_9',
          contactId: 'contact_9',
          contact: {
            id: 'contact_9',
            name: 'Lisa Wellness',
            email: 'lisa@mindful-living.com',
            avatar:
              'https://ui-avatars.com/api/?name=Lisa+Wellness&background=059669&color=fff',
            socialHandles: {
              youtube: '@MindfulLisa',
            },
            tags: ['wellness', 'mindfulness', 'meditation', 'health'],
          },
          subject: 'Partenariat Applications Bien-être',
          channel: 'email',
          status: 'negotiating',
          priority: 'medium',
          isRead: true,
          isStarred: true,
          messageCount: 4,
          createdAt: new Date(
            Date.now() - 5 * 24 * 60 * 60 * 1000
          ).toISOString(), // 5 days ago
          updatedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8h ago
          lastMessage: {
            id: 'msg_9_4',
            threadId: 'thread_9',
            senderId: 'contact_9',
            recipientId: 'current_user',
            channel: 'email',
            type: 'received',
            subject: 'Re: Conditions de partenariat',
            content:
              "Bonjour ! J'ai bien reçu vos propositions. Les conditions me semblent intéressantes, mais j'aimerais discuter des droits d'utilisation de mes contenus. Seriez-vous disponible pour un appel demain ? 🧘‍♀️",
            timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
            status: 'delivered',
          },
        },
        {
          id: 'thread_10',
          contactId: 'contact_10',
          contact: {
            id: 'contact_10',
            name: 'Antoine Photography',
            email: 'antoine@artistic-shots.com',
            avatar:
              'https://ui-avatars.com/api/?name=Antoine+Photography&background=d97706&color=fff',
            socialHandles: {
              youtube: '@antoine_artistic',
            },
            tags: ['photography', 'art', 'creative', 'visual'],
          },
          subject: 'Collaboration Photographie Artistique - Fermée',
          channel: 'email',
          status: 'closed',
          priority: 'low',
          isRead: true,
          isStarred: false,
          messageCount: 3,
          createdAt: new Date(
            Date.now() - 10 * 24 * 60 * 60 * 1000
          ).toISOString(), // 10 days ago
          updatedAt: new Date(
            Date.now() - 8 * 24 * 60 * 60 * 1000
          ).toISOString(), // 8 days ago
          lastMessage: {
            id: 'msg_10_3',
            threadId: 'thread_10',
            senderId: 'current_user',
            recipientId: 'contact_10',
            channel: 'email',
            type: 'sent',
            subject: 'Collaboration terminée - Merci beaucoup',
            content:
              'Bonjour Antoine, merci beaucoup pour cette belle collaboration ! Vos photos ont sublimé notre campagne. Nous espérons pouvoir retravailler ensemble prochainement.',
            timestamp: new Date(
              Date.now() - 8 * 24 * 60 * 60 * 1000
            ).toISOString(),
            status: 'sent',
          },
        },
      ];

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
