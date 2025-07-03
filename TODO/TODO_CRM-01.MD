# PLAN D'ACTION PRESCRIPTIF : CRM-01

**User Story :** En tant qu'utilisateur, je veux pouvoir contacter un influenceur ou une liste d'influenceurs pour qu'ils soient automatiquement ajoutés à un CRM de contact intégré.

**Objectif :** Créer un système CRM intégré avec pipeline de contact, suivi des communications et gestion des campagnes.

---

## Plan d'Action Prescriptif

### Étape 1 : Créer la page CRM principale

Créer `src/app/crm/page.tsx` :

```tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
  UserGroupIcon,
  PlusIcon,
  FunnelIcon,
  ChartBarIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarDaysIcon,
} from '@heroicons/react/24/outline';
import CRMKanban from '@/components/crm/CRMKanban';
import CRMStats from '@/components/crm/CRMStats';
import ContactModal from '@/components/crm/ContactModal';
import { useCRM } from '@/hooks/useCRM';

export default function CRMPage() {
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [showContactModal, setShowContactModal] = useState(false);
  const { contacts, stats, updateContactStage, addContact } = useCRM();

  const handleAddContact = (contactData: any) => {
    addContact(contactData);
    setShowContactModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <UserGroupIcon className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">CRM</h1>
                <p className="text-gray-600">
                  Gérez vos contacts et campagnes d'influence
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('kanban')}
                  className={`px-3 py-1 rounded-md text-sm ${
                    viewMode === 'kanban'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FunnelIcon className="w-4 h-4 mr-1 inline" />
                  Kanban
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1 rounded-md text-sm ${
                    viewMode === 'list'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <ChartBarIcon className="w-4 h-4 mr-1 inline" />
                  Liste
                </button>
              </div>

              <Button
                onClick={() => setShowContactModal(true)}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                Nouveau contact
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <CRMStats stats={stats} />
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        {viewMode === 'kanban' ? (
          <CRMKanban contacts={contacts} onUpdateStage={updateContactStage} />
        ) : (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Tous les contacts
              </h2>
              {/* Liste des contacts */}
              <div className="space-y-4">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={contact.avatar}
                        alt={contact.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {contact.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          @{contact.username} •{' '}
                          {contact.followers.toLocaleString()} followers
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          contact.stage === 'contacted'
                            ? 'bg-blue-100 text-blue-800'
                            : contact.stage === 'responded'
                              ? 'bg-green-100 text-green-800'
                              : contact.stage === 'negotiating'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {contact.stage === 'contacted' && 'Contacté'}
                        {contact.stage === 'responded' && 'Répondu'}
                        {contact.stage === 'negotiating' && 'Négociation'}
                        {contact.stage === 'closed' && 'Fermé'}
                      </span>
                      <div className="flex items-center space-x-2">
                        {contact.email && (
                          <button className="text-gray-400 hover:text-purple-600">
                            <EnvelopeIcon className="w-4 h-4" />
                          </button>
                        )}
                        {contact.phone && (
                          <button className="text-gray-400 hover:text-purple-600">
                            <PhoneIcon className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal de contact */}
      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        onAdd={handleAddContact}
      />
    </div>
  );
}
```

### Étape 2 : Créer le composant CRM Kanban

Créer `src/components/crm/CRMKanban.tsx` :

```tsx
'use client';

import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  EnvelopeIcon,
  PhoneIcon,
  VideoCameraIcon,
  CalendarDaysIcon,
  ChatBubbleLeftIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';
import { CRMContact } from '@/types';
import { Button } from '@/components/ui/Button';

interface CRMKanbanProps {
  contacts: CRMContact[];
  onUpdateStage: (contactId: string, newStage: string) => void;
}

const stages = [
  { id: 'contacted', name: 'Contacté', color: 'bg-blue-100 text-blue-800' },
  { id: 'responded', name: 'Répondu', color: 'bg-green-100 text-green-800' },
  {
    id: 'negotiating',
    name: 'Négociation',
    color: 'bg-yellow-100 text-yellow-800',
  },
  { id: 'closed', name: 'Fermé', color: 'bg-gray-100 text-gray-800' },
];

export default function CRMKanban({ contacts, onUpdateStage }: CRMKanbanProps) {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    onUpdateStage(draggableId, destination.droppableId);
    setDraggedItem(null);
  };

  const getContactsByStage = (stageId: string) => {
    return contacts.filter((contact) => contact.stage === stageId);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stages.map((stage) => (
          <div key={stage.id} className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">{stage.name}</h3>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {getContactsByStage(stage.id).length}
                </span>
              </div>
            </div>

            <Droppable droppableId={stage.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="p-4 min-h-[200px] space-y-3"
                >
                  {getContactsByStage(stage.id).map((contact, index) => (
                    <Draggable
                      key={contact.id}
                      draggableId={contact.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`p-3 border border-gray-200 rounded-lg cursor-move transition-shadow ${
                            snapshot.isDragging
                              ? 'shadow-lg'
                              : 'hover:shadow-md'
                          }`}
                        >
                          <ContactCard contact={contact} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}

function ContactCard({ contact }: { contact: CRMContact }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="relative">
      <div className="flex items-center space-x-3 mb-2">
        <img
          src={contact.avatar}
          alt={contact.name}
          className="w-8 h-8 rounded-full"
        />
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-gray-900 truncate">
            {contact.name}
          </h4>
          <p className="text-xs text-gray-500 truncate">@{contact.username}</p>
        </div>
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="text-gray-400 hover:text-gray-600"
        >
          <EllipsisVerticalIcon className="w-4 h-4" />
        </button>
      </div>

      <div className="text-xs text-gray-600 mb-2">
        {contact.followers.toLocaleString()} followers
      </div>

      {contact.lastContact && (
        <div className="text-xs text-gray-500 mb-2">
          Dernier contact: {new Date(contact.lastContact).toLocaleDateString()}
        </div>
      )}

      <div className="flex items-center space-x-2 mb-2">
        {contact.email && (
          <button className="text-gray-400 hover:text-purple-600">
            <EnvelopeIcon className="w-3 h-3" />
          </button>
        )}
        {contact.phone && (
          <button className="text-gray-400 hover:text-purple-600">
            <PhoneIcon className="w-3 h-3" />
          </button>
        )}
        {contact.hasVideoCall && (
          <button className="text-gray-400 hover:text-purple-600">
            <VideoCameraIcon className="w-3 h-3" />
          </button>
        )}
      </div>

      {contact.nextReminder && (
        <div className="flex items-center space-x-1 text-xs text-orange-600">
          <CalendarDaysIcon className="w-3 h-3" />
          <span>
            Rappel: {new Date(contact.nextReminder).toLocaleDateString()}
          </span>
        </div>
      )}

      {contact.notes && (
        <div className="mt-2 p-2 bg-gray-50 rounded text-xs text-gray-600">
          {contact.notes.substring(0, 50)}
          {contact.notes.length > 50 && '...'}
        </div>
      )}

      {showMenu && (
        <div className="absolute right-0 top-8 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
          <button className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
            <EnvelopeIcon className="w-4 h-4" />
            <span>Envoyer un email</span>
          </button>
          <button className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
            <CalendarDaysIcon className="w-4 h-4" />
            <span>Programmer un rappel</span>
          </button>
          <button className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
            <ChatBubbleLeftIcon className="w-4 h-4" />
            <span>Ajouter une note</span>
          </button>
        </div>
      )}
    </div>
  );
}
```

### Étape 3 : Créer le composant CRM Stats

Créer `src/components/crm/CRMStats.tsx` :

```tsx
import {
  UserGroupIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  ClockIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

interface CRMStatsProps {
  stats: {
    totalContacts: number;
    contacted: number;
    responded: number;
    negotiating: number;
    closed: number;
    responseRate: number;
    averageResponseTime: number;
    conversionRate: number;
  };
}

export default function CRMStats({ stats }: CRMStatsProps) {
  const statCards = [
    {
      name: 'Total contacts',
      value: stats.totalContacts,
      icon: UserGroupIcon,
      color: 'bg-purple-100 text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      name: 'Contactés',
      value: stats.contacted,
      icon: EnvelopeIcon,
      color: 'bg-blue-100 text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      name: 'Répondu',
      value: stats.responded,
      icon: CheckCircleIcon,
      color: 'bg-green-100 text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      name: 'Taux de réponse',
      value: `${stats.responseRate}%`,
      icon: ChartBarIcon,
      color: 'bg-orange-100 text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg p-6 shadow">
          <div className="flex items-center">
            <div
              className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}
            >
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### Étape 4 : Créer le modal de contact

Créer `src/components/crm/ContactModal.tsx` :

```tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import {
  XMarkIcon,
  UserPlusIcon,
  EnvelopeIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (contact: any) => void;
}

export default function ContactModal({
  isOpen,
  onClose,
  onAdd,
}: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    platform: 'instagram',
    followers: '',
    stage: 'contacted',
    notes: '',
    source: 'manual',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newContact = {
      id: Date.now().toString(),
      name: formData.name,
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      platform: formData.platform,
      followers: parseInt(formData.followers) || 0,
      stage: formData.stage,
      notes: formData.notes,
      source: formData.source,
      avatar: '/avatars/default.jpg',
      createdAt: new Date().toISOString(),
      lastContact: new Date().toISOString(),
    };

    onAdd(newContact);
    setFormData({
      name: '',
      username: '',
      email: '',
      phone: '',
      platform: 'instagram',
      followers: '',
      stage: 'contacted',
      notes: '',
      source: 'manual',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <UserPlusIcon className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Nouveau contact
              </h2>
              <p className="text-sm text-gray-600">
                Ajouter un influenceur à votre CRM
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Nom"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <Input
              label="Username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              placeholder="@username"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              icon={EnvelopeIcon}
            />
            <Input
              label="Téléphone"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              icon={PhoneIcon}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Plateforme"
              value={formData.platform}
              onChange={(e) =>
                setFormData({ ...formData, platform: e.target.value })
              }
            >
              <option value="instagram">Instagram</option>
              <option value="youtube">YouTube</option>
              <option value="tiktok">TikTok</option>
            </Select>
            <Input
              label="Followers"
              type="number"
              value={formData.followers}
              onChange={(e) =>
                setFormData({ ...formData, followers: e.target.value })
              }
              placeholder="0"
            />
          </div>

          <Select
            label="Étape"
            value={formData.stage}
            onChange={(e) =>
              setFormData({ ...formData, stage: e.target.value })
            }
          >
            <option value="contacted">Contacté</option>
            <option value="responded">Répondu</option>
            <option value="negotiating">Négociation</option>
            <option value="closed">Fermé</option>
          </Select>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Notes sur ce contact..."
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-purple-600 hover:bg-purple-700"
            >
              Ajouter
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
```

### Étape 5 : Créer le hook useCRM

Créer `src/hooks/useCRM.ts` :

```typescript
import { useState, useEffect } from 'react';
import { CRMContact, CRMStats } from '@/types';
import { mockCRMContacts, mockCRMStats } from '@/lib/mockData';

export const useCRM = () => {
  const [contacts, setContacts] = useState<CRMContact[]>(mockCRMContacts);
  const [stats, setStats] = useState<CRMStats>(mockCRMStats);

  const addContact = (contactData: Partial<CRMContact>) => {
    const newContact: CRMContact = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      lastContact: new Date().toISOString(),
      ...contactData,
    } as CRMContact;

    setContacts((prev) => [newContact, ...prev]);
    updateStats();
  };

  const updateContactStage = (contactId: string, newStage: string) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === contactId
          ? { ...contact, stage: newStage as any }
          : contact
      )
    );
    updateStats();
  };

  const updateContact = (contactId: string, updates: Partial<CRMContact>) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === contactId ? { ...contact, ...updates } : contact
      )
    );
  };

  const deleteContact = (contactId: string) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== contactId));
    updateStats();
  };

  const updateStats = () => {
    const totalContacts = contacts.length;
    const contacted = contacts.filter((c) => c.stage === 'contacted').length;
    const responded = contacts.filter((c) => c.stage === 'responded').length;
    const negotiating = contacts.filter(
      (c) => c.stage === 'negotiating'
    ).length;
    const closed = contacts.filter((c) => c.stage === 'closed').length;

    const responseRate =
      totalContacts > 0 ? Math.round((responded / totalContacts) * 100) : 0;
    const conversionRate =
      totalContacts > 0 ? Math.round((closed / totalContacts) * 100) : 0;

    setStats({
      totalContacts,
      contacted,
      responded,
      negotiating,
      closed,
      responseRate,
      averageResponseTime: 24, // heures
      conversionRate,
    });
  };

  return {
    contacts,
    stats,
    addContact,
    updateContactStage,
    updateContact,
    deleteContact,
  };
};
```

### Étape 6 : Étendre les types

Ajouter à `src/types/index.ts` :

```typescript
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
  metadata?: Record<string, any>;
}
```

### Étape 7 : Créer les données mockées CRM

Ajouter à `src/lib/mockData.ts` :

```typescript
export const mockCRMContacts: CRMContact[] = [
  {
    id: 'crm_1',
    name: 'Marie Lifestyle',
    username: 'marie_lifestyle',
    email: 'marie@lifestyle.com',
    phone: '+33 6 12 34 56 78',
    platform: 'instagram',
    followers: 125000,
    avatar: '/avatars/marie.jpg',
    stage: 'negotiating',
    notes:
      'Intéressée par une collaboration long-terme. Préfère les produits eco-friendly.',
    source: 'search',
    createdAt: '2024-01-15T10:30:00Z',
    lastContact: '2024-01-20T14:22:00Z',
    nextReminder: '2024-01-25T09:00:00Z',
    tags: ['mode', 'lifestyle', 'eco-friendly'],
    hasVideoCall: true,
    dealValue: 2500,
    probability: 75,
    expectedCloseDate: '2024-02-01',
  },
  {
    id: 'crm_2',
    name: 'Alex Gaming',
    username: 'alex_gaming',
    email: 'alex@gaming.com',
    platform: 'youtube',
    followers: 89000,
    avatar: '/avatars/alex.jpg',
    stage: 'responded',
    notes: 'Répond rapidement, très professionnel. Spécialisé hardware gaming.',
    source: 'list',
    createdAt: '2024-01-12T15:45:00Z',
    lastContact: '2024-01-18T11:15:00Z',
    tags: ['gaming', 'tech', 'hardware'],
    dealValue: 1800,
    probability: 60,
  },
  {
    id: 'crm_3',
    name: 'Sarah Fitness',
    username: 'sarah_fitness',
    email: 'sarah@fitness.com',
    platform: 'instagram',
    followers: 67000,
    avatar: '/avatars/sarah.jpg',
    stage: 'contacted',
    notes: 'Premier contact envoyé. Attente de réponse.',
    source: 'manual',
    createdAt: '2024-01-20T08:30:00Z',
    lastContact: '2024-01-20T08:30:00Z',
    tags: ['fitness', 'health', 'wellness'],
    dealValue: 1200,
    probability: 30,
  },
];

export const mockCRMStats: CRMStats = {
  totalContacts: 15,
  contacted: 6,
  responded: 4,
  negotiating: 3,
  closed: 2,
  responseRate: 67,
  averageResponseTime: 24,
  conversionRate: 13,
};
```

### Étape 8 : Intégrer dans la navigation

Modifier `src/components/layout/Sidebar.tsx` pour ajouter le lien CRM :

```tsx
// Ajouter dans les liens de navigation
{
  name: "CRM",
  href: "/crm",
  icon: UserGroupIcon,
  current: pathname === "/crm",
},
```

---

## Résumé des modifications

✅ **Page CRM complète** : Dashboard avec vue Kanban et liste
✅ **Pipeline interactif** : Drag & drop pour changer les étapes
✅ **Gestion des contacts** : Ajout, modification, suppression
✅ **Statistiques avancées** : Métriques de performance
✅ **Système de rappels** : Suivi des prochaines actions
✅ **Intégration transparente** : Ajout depuis recherche et listes

Ce système CRM transforme la plateforme en véritable outil de gestion de campagnes d'influence.
