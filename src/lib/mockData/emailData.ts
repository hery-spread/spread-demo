import { 
  EmailProvider, 
  EmailThread, 
  EmailMessage, 
  EmailTemplate, 
  EmailCampaign,
  EmailStats 
} from '@/types';

// Fournisseurs d'email configurés
export const mockEmailProviders: EmailProvider[] = [
  {
    type: 'gmail',
    email: 'marie.marketing@agence-creative.com',
    connected: true,
    connectedAt: '2024-01-15T10:30:00Z',
    lastSync: '2024-01-20T14:20:00Z'
  },
  {
    type: 'outlook',
    email: 'contact@brand-fashion.com',
    connected: false
  }
];

// Messages d'emails mockés
const createEmailMessage = (
  id: string,
  threadId: string,
  from: string,
  to: string[],
  subject: string,
  body: string,
  sentAt: string,
  isRead = true,
  isReplied = false
): EmailMessage => ({
  id,
  threadId,
  from,
  to,
  subject,
  body,
  sentAt,
  receivedAt: sentAt,
  isRead,
  isReplied,
  isForwarded: false,
  messageId: `msg_${id}@spread.com`,
  references: []
});

// Fils de conversation mockés
export const mockEmailThreads: EmailThread[] = [
  {
    id: 'thread_1',
    influencerId: 'inf_1',
    influencerName: 'Sarah Lifestyle',
    influencerEmail: 'sarah.lifestyle@gmail.com',
    influencerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150',
    subject: 'Collaboration pour campagne beauté naturelle',
    messageCount: 4,
    unreadCount: 1,
    lastMessageAt: '2024-01-20T11:30:00Z',
    lastMessagePreview: 'Parfait ! Je suis très intéressée par cette collaboration. Pouvons-nous discuter des détails ?',
    status: 'responded',
    tags: ['beauté', 'lifestyle'],
    firstContactAt: '2024-01-18T09:00:00Z',
    lastReplyAt: '2024-01-20T11:30:00Z',
    messages: [
      createEmailMessage(
        'msg_1_1',
        'thread_1',
        'marie.marketing@agence-creative.com',
        ['sarah.lifestyle@gmail.com'],
        'Collaboration pour campagne beauté naturelle',
        'Bonjour Sarah,\n\nJe suis Marie de l\'agence Créative. Nous avons remarqué votre contenu authentique sur Instagram et aimerions vous proposer une collaboration pour notre nouvelle gamme de cosmétiques naturels.\n\nSeriez-vous intéressée par un partenariat ?\n\nCordialement,\nMarie',
        '2024-01-18T09:00:00Z'
      ),
      createEmailMessage(
        'msg_1_2',
        'thread_1',
        'sarah.lifestyle@gmail.com',
        ['marie.marketing@agence-creative.com'],
        'Re: Collaboration pour campagne beauté naturelle',
        'Bonjour Marie,\n\nMerci pour votre message ! Je suis effectivement intéressée. Pouvez-vous me donner plus de détails sur la campagne et les conditions de partenariat ?\n\nBelle journée,\nSarah',
        '2024-01-18T16:45:00Z',
        true,
        true
      ),
      createEmailMessage(
        'msg_1_3',
        'thread_1',
        'marie.marketing@agence-creative.com',
        ['sarah.lifestyle@gmail.com'],
        'Re: Collaboration pour campagne beauté naturelle',
        'Bonjour Sarah,\n\nParfait ! Voici les détails :\n- 3 posts Instagram + 5 stories\n- Produits offerts + rémunération 800€\n- Timing : début février\n\nÊtes-vous disponible pour un appel cette semaine ?\n\nMarie',
        '2024-01-19T10:15:00Z'
      ),
      createEmailMessage(
        'msg_1_4',
        'thread_1',
        'sarah.lifestyle@gmail.com',
        ['marie.marketing@agence-creative.com'],
        'Re: Collaboration pour campagne beauté naturelle',
        'Parfait ! Je suis très intéressée par cette collaboration. Pouvons-nous discuter des détails demain à 14h ? Je vous envoie mon calendly en privé.',
        '2024-01-20T11:30:00Z',
        false
      )
    ]
  },
  {
    id: 'thread_2',
    influencerId: 'inf_2',
    influencerName: 'Tom Fitness',
    influencerEmail: 'tom.fitness@outlook.com',
    influencerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    subject: 'Partenariat équipements sportifs',
    messageCount: 2,
    unreadCount: 0,
    lastMessageAt: '2024-01-19T14:20:00Z',
    lastMessagePreview: 'Merci pour votre proposition, mais je ne suis pas disponible pour l\'instant.',
    status: 'closed',
    tags: ['fitness', 'sport'],
    firstContactAt: '2024-01-19T09:30:00Z',
    messages: [
      createEmailMessage(
        'msg_2_1',
        'thread_2',
        'marie.marketing@agence-creative.com',
        ['tom.fitness@outlook.com'],
        'Partenariat équipements sportifs',
        'Bonjour Tom,\n\nNous sommes une marque d\'équipements de fitness et cherchons des ambassadeurs pour nos nouveaux produits. Votre contenu nous intéresse beaucoup !\n\nSeriez-vous ouvert à une collaboration ?\n\nSportivement,\nMarie',
        '2024-01-19T09:30:00Z'
      ),
      createEmailMessage(
        'msg_2_2',
        'thread_2',
        'tom.fitness@outlook.com',
        ['marie.marketing@agence-creative.com'],
        'Re: Partenariat équipements sportifs',
        'Bonjour,\n\nMerci pour votre proposition, mais je ne suis pas disponible pour l\'instant. Mon agenda est complet jusqu\'en mars.\n\nBonne continuation,\nTom',
        '2024-01-19T14:20:00Z',
        true,
        true
      )
    ]
  },
  {
    id: 'thread_3',
    influencerId: 'inf_3',
    influencerName: 'Emma Travel',
    influencerEmail: 'emma.adventures@gmail.com',
    influencerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    subject: 'Collaboration voyage Bali',
    messageCount: 6,
    unreadCount: 2,
    lastMessageAt: '2024-01-20T16:45:00Z',
    lastMessagePreview: 'J\'ai reçu le contrat, tout me semble parfait ! Je le signe et vous le renvoie.',
    status: 'negotiating',
    tags: ['voyage', 'lifestyle'],
    firstContactAt: '2024-01-17T11:00:00Z',
    lastReplyAt: '2024-01-20T16:45:00Z',
    messages: [
      createEmailMessage(
        'msg_3_1',
        'thread_3',
        'marie.marketing@agence-creative.com',
        ['emma.adventures@gmail.com'],
        'Collaboration voyage Bali',
        'Bonjour Emma,\n\nNous organisons un voyage de presse à Bali et aimerions vous inviter à nous rejoindre pour documenter l\'expérience.\n\nIntéressée ?\n\nMarie',
        '2024-01-17T11:00:00Z'
      )
    ]
  }
];

// Templates d'emails
export const mockEmailTemplates: EmailTemplate[] = [
  {
    id: 'template_1',
    name: 'Premier contact - Beauté',
    subject: 'Collaboration {brand_name} x {influencer_name}',
    bodyHtml: '<p>Bonjour {influencer_name},</p><p>Je suis {sender_name} de {brand_name}. Nous avons remarqué votre contenu authentique et aimerions vous proposer une collaboration.</p><p>Seriez-vous intéressé(e) par un partenariat ?</p><p>Cordialement,<br>{sender_name}</p>',
    bodyText: 'Bonjour {influencer_name},\n\nJe suis {sender_name} de {brand_name}. Nous avons remarqué votre contenu authentique et aimerions vous proposer une collaboration.\n\nSeriez-vous intéressé(e) par un partenariat ?\n\nCordialement,\n{sender_name}',
    category: 'outreach',
    variables: ['influencer_name', 'sender_name', 'brand_name'],
    createdAt: '2024-01-10T09:00:00Z',
    lastUsed: '2024-01-20T10:30:00Z',
    isDefault: true
  },
  {
    id: 'template_2',
    name: 'Relance après 1 semaine',
    subject: 'Re: Collaboration {brand_name}',
    bodyHtml: '<p>Bonjour {influencer_name},</p><p>J\'espère que vous allez bien ! Je me permets de revenir vers vous concernant notre proposition de collaboration.</p><p>Auriez-vous eu l\'occasion d\'y réfléchir ?</p><p>Belle journée,<br>{sender_name}</p>',
    bodyText: 'Bonjour {influencer_name},\n\nJ\'espère que vous allez bien ! Je me permets de revenir vers vous concernant notre proposition de collaboration.\n\nAuriez-vous eu l\'occasion d\'y réfléchir ?\n\nBelle journée,\n{sender_name}',
    category: 'follow_up',
    variables: ['influencer_name', 'sender_name', 'brand_name'],
    createdAt: '2024-01-10T09:15:00Z',
    isDefault: false
  }
];

// Campagnes d'emails
export const mockEmailCampaigns: EmailCampaign[] = [
  {
    id: 'campaign_1',
    name: 'Outreach Beauté Janvier 2024',
    subject: 'Collaboration marque de cosmétiques naturels',
    bodyTemplate: 'template_1',
    recipientCount: 50,
    sentCount: 50,
    deliveredCount: 48,
    openedCount: 32,
    repliedCount: 12,
    bouncedCount: 2,
    status: 'sent',
    createdAt: '2024-01-15T09:00:00Z',
    sentAt: '2024-01-15T10:00:00Z',
    completedAt: '2024-01-15T12:30:00Z',
    fromEmail: 'marie.marketing@agence-creative.com',
    fromName: 'Marie - Agence Créative',
    listId: 'list_1'
  },
  {
    id: 'campaign_2',
    name: 'Relance Fitness Décembre',
    subject: 'Dernière chance - Partenariat fitness',
    bodyTemplate: 'template_2',
    recipientCount: 25,
    sentCount: 20,
    deliveredCount: 19,
    openedCount: 15,
    repliedCount: 5,
    bouncedCount: 1,
    status: 'sending',
    createdAt: '2024-01-18T14:00:00Z',
    sentAt: '2024-01-19T09:00:00Z',
    fromEmail: 'marie.marketing@agence-creative.com',
    fromName: 'Marie - Agence Créative'
  }
];

// Statistiques des emails
export const mockEmailStats: EmailStats = {
  totalThreads: 48,
  activeThreads: 23,
  responseRate: 34.5,
  averageResponseTime: 18.5, // heures
  totalSent: 156,
  totalReceived: 89,
  unreadCount: 7,
  monthlyStats: [
    { month: '2024-01', sent: 76, received: 45, responded: 28 },
    { month: '2023-12', sent: 52, received: 32, responded: 18 },
    { month: '2023-11', sent: 28, received: 12, responded: 8 }
  ]
}; 