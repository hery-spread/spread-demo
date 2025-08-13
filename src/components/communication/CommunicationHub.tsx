'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import {
  InboxIcon,
  ChatBubbleLeftRightIcon,
  RocketLaunchIcon,
  ChartBarIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  StarIcon,
  ArchiveBoxIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';
import {
  StarIcon as StarIconSolid,
  InboxIcon as InboxIconSolid,
} from '@heroicons/react/24/solid';
import { CommunicationHubProps } from '@/types/communication';
import { useCommunication } from '@/contexts/CommunicationContext';

export default function CommunicationHub({
  defaultView = 'inbox' as 'inbox' | 'campaigns' | 'templates' | 'analytics',
  embedded = false,
  showSidebar = true,
}: CommunicationHubProps) {
  const [activeView, setActiveView] = useState(defaultView);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const {
    threads,
    campaigns,
    templates,
    stats,
    loading,
    error,
    filters,
    selectedThread,
    loadThreads,
    setFilters,
    selectThread,
    markAsRead,
    starThread,
    archiveThread,
  } = useCommunication();

  useEffect(() => {
    loadThreads();
  }, [loadThreads]);

  const views = [
    {
      id: 'inbox',
      name: 'Boîte de réception',
      icon: InboxIcon,
      iconSolid: InboxIconSolid,
      count: stats.newThreads + stats.respondedThreads,
    },
    {
      id: 'campaigns',
      name: 'Campagnes',
      icon: RocketLaunchIcon,
      iconSolid: RocketLaunchIcon,
      count: campaigns.filter((c) => c.status === 'active').length,
    },
    {
      id: 'templates',
      name: 'Modèles',
      icon: ChatBubbleLeftRightIcon,
      iconSolid: ChatBubbleLeftRightIcon,
      count: templates.length,
    },
    {
      id: 'analytics' as const,
      name: 'Analytics',
      icon: ChartBarIcon,
      iconSolid: ChartBarIcon,
      count: 0,
    },
  ];

  const filterOptions = [
    { value: 'all', label: 'Tous', count: threads.length },
    {
      value: 'unread',
      label: 'Non lus',
      count: threads.filter((t) => !t.isRead).length,
    },
    {
      value: 'starred',
      label: 'Favoris',
      count: threads.filter((t) => t.isStarred).length,
    },
    {
      value: 'new',
      label: 'Nouveaux',
      count: threads.filter((t) => t.status === 'new').length,
    },
    {
      value: 'responded',
      label: 'Répondus',
      count: threads.filter((t) => t.status === 'responded').length,
    },
    {
      value: 'waiting',
      label: 'En attente',
      count: threads.filter((t) => t.status === 'waiting').length,
    },
  ];

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setFilters({ searchQuery: value });
  };

  const handleFilterChange = (filterType: string, value: string) => {
    const newFilters = { ...filters };

    switch (filterType) {
      case 'status':
        if (value === 'all') {
          delete newFilters.statuses;
        } else if (value === 'unread') {
          newFilters.isRead = false;
        } else if (value === 'starred') {
          newFilters.isStarred = true;
        } else {
          newFilters.statuses = [value];
        }
        break;
      case 'channel':
        newFilters.channels =
          value === 'all'
            ? undefined
            : [value as 'email' | 'linkedin' | 'instagram' | 'phone' | 'other'];
        break;
      case 'priority':
        newFilters.priorities =
          value === 'all'
            ? undefined
            : [value as 'low' | 'medium' | 'high' | 'urgent'];
        break;
    }

    setFilters(newFilters);
  };

  const handleBulkAction = async (action: string) => {
    if (selectedItems.length === 0) return;

    switch (action) {
      case 'markRead':
        await markAsRead(selectedItems);
        break;
      case 'archive':
        for (const threadId of selectedItems) {
          await archiveThread(threadId);
        }
        break;
      case 'star':
        for (const threadId of selectedItems) {
          await starThread(threadId, true);
        }
        break;
    }
    setSelectedItems([]);
  };

  const toggleSelection = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const selectAll = () => {
    if (selectedItems.length === threads.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(threads.map((t) => t.id));
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = diff / (1000 * 60 * 60);

    if (hours < 1) {
      return 'À l&apos;instant';
    } else if (hours < 24) {
      return `Il y a ${Math.floor(hours)}h`;
    } else {
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'responded':
        return 'bg-green-100 text-green-800';
      case 'waiting':
        return 'bg-yellow-100 text-yellow-800';
      case 'negotiating':
        return 'bg-purple-100 text-purple-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'new':
        return 'Nouveau';
      case 'responded':
        return 'Répondu';
      case 'waiting':
        return 'En attente';
      case 'negotiating':
        return 'Négociation';
      case 'closed':
        return 'Fermé';
      default:
        return status;
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return '🔴';
      case 'high':
        return '🟠';
      case 'medium':
        return '🟡';
      case 'low':
        return '🟢';
      default:
        return '⚪';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <div className="text-red-600 mb-4">{error}</div>
        <Button onClick={() => loadThreads()}>Réessayer</Button>
      </div>
    );
  }

  return (
    <div className={`flex h-full ${embedded ? '' : 'bg-gray-50'}`}>
      {/* Sidebar */}
      {showSidebar && (
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Communications
              </h2>
              <Button size="sm">
                <PlusIcon className="w-4 h-4 mr-1" />
                Nouveau
              </Button>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-blue-50 p-2 rounded">
                <div className="font-medium text-blue-900">
                  {stats.newThreads}
                </div>
                <div className="text-blue-600">Nouveaux</div>
              </div>
              <div className="bg-green-50 p-2 rounded">
                <div className="font-medium text-green-900">
                  {stats.respondedThreads}
                </div>
                <div className="text-green-600">Répondus</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            {views.map((view) => {
              const isActive = activeView === view.id;
              const Icon = isActive ? view.iconSolid : view.icon;

              return (
                <button
                  key={view.id}
                  onClick={() =>
                    setActiveView(
                      view.id as
                        | 'inbox'
                        | 'campaigns'
                        | 'templates'
                        | 'analytics'
                    )
                  }
                  className={`w-full flex items-center justify-between p-3 mb-1 rounded-lg text-left transition-colors ${
                    isActive
                      ? 'bg-purple-50 text-purple-700 border-l-4 border-purple-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <Icon
                      className={`w-5 h-5 mr-3 ${isActive ? 'text-purple-700' : 'text-gray-400'}`}
                    />
                    <span className="font-medium">{view.name}</span>
                  </div>
                  {view.count > 0 && (
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        isActive
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {view.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-900">
              {views.find((v) => v.id === activeView)?.name}
            </h1>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FunnelIcon className="w-4 h-4 mr-1" />
                Filtres
              </Button>

              {selectedItems.length > 0 && (
                <div className="flex items-center space-x-1">
                  <span className="text-sm text-gray-600">
                    {selectedItems.length} sélectionné
                    {selectedItems.length > 1 ? 's' : ''}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkAction('markRead')}
                  >
                    Marquer lu
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkAction('star')}
                  >
                    <StarIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkAction('archive')}
                  >
                    <ArchiveBoxIcon className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Search */}
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Rechercher dans les conversations..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Statut
                  </label>
                  <Select
                    options={filterOptions.map((option) => ({
                      value: option.value,
                      label: `${option.label} (${option.count})`,
                    }))}
                    onChange={(e) =>
                      handleFilterChange('status', e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Canal
                  </label>
                  <Select
                    options={[
                      { value: 'all', label: 'Tous les canaux' },
                      { value: 'email', label: 'Email' },
                      { value: 'linkedin', label: 'LinkedIn' },
                      { value: 'instagram', label: 'Instagram' },
                    ]}
                    onChange={(e) =>
                      handleFilterChange('channel', e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priorité
                  </label>
                  <Select
                    options={[
                      { value: 'all', label: 'Toutes les priorités' },
                      { value: 'urgent', label: 'Urgent' },
                      { value: 'high', label: 'Élevée' },
                      { value: 'medium', label: 'Moyenne' },
                      { value: 'low', label: 'Faible' },
                    ]}
                    onChange={(e) =>
                      handleFilterChange('priority', e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {activeView === 'inbox' && (
            <div className="h-full">
              {/* Toolbar */}
              <div className="bg-white border-b border-gray-200 px-4 py-2">
                <div className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    checked={
                      selectedItems.length === threads.length &&
                      threads.length > 0
                    }
                    onChange={selectAll}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-600">
                    {threads.length} conversation
                    {threads.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              {/* Thread list */}
              <div className="overflow-y-auto h-full">
                {threads.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                    <InboxIcon className="w-12 h-12 mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      Aucune conversation
                    </h3>
                    <p>Vos nouvelles conversations apparaîtront ici.</p>
                  </div>
                ) : (
                  threads.map((thread) => (
                    <div
                      key={thread.id}
                      className={`border-b border-gray-200 p-4 cursor-pointer hover:bg-gray-50 ${
                        selectedThread?.id === thread.id ? 'bg-blue-50' : ''
                      } ${!thread.isRead ? 'bg-blue-25' : ''}`}
                      onClick={() => selectThread(thread)}
                    >
                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(thread.id)}
                          onChange={(e) => {
                            e.stopPropagation();
                            toggleSelection(thread.id);
                          }}
                          className="mt-1 rounded border-gray-300"
                        />

                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            {thread.contact.avatar ? (
                              <img
                                src={thread.contact.avatar}
                                alt={thread.contact.name}
                                className="w-10 h-10 rounded-full"
                              />
                            ) : (
                              <span className="text-sm font-medium text-gray-600">
                                {thread.contact.name.charAt(0).toUpperCase()}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4
                              className={`text-sm ${!thread.isRead ? 'font-semibold' : 'font-medium'} text-gray-900 truncate`}
                            >
                              {thread.contact.name}
                            </h4>
                            <div className="flex items-center space-x-2">
                              {thread.isStarred && (
                                <StarIconSolid className="w-4 h-4 text-yellow-400" />
                              )}
                              <span className="text-xs text-gray-500">
                                {formatDate(thread.updatedAt)}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 mb-1">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${getStatusColor(thread.status)}`}
                            >
                              {getStatusLabel(thread.status)}
                            </span>
                            <span className="text-xs">
                              {getPriorityIcon(thread.priority)}
                            </span>
                            <span className="text-xs text-gray-500 capitalize">
                              {thread.channel}
                            </span>
                          </div>

                          <p
                            className={`text-sm ${!thread.isRead ? 'font-medium' : ''} text-gray-600 truncate`}
                          >
                            {thread.subject}
                          </p>

                          <p className="text-xs text-gray-500 mt-1 truncate">
                            {thread.lastMessage.content}
                          </p>
                        </div>

                        <div className="flex-shrink-0">
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <EllipsisVerticalIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeView === 'campaigns' && (
            <div className="p-4">
              <div className="text-center py-12">
                <RocketLaunchIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Campagnes
                </h3>
                <p className="text-gray-600">Gérez vos campagnes email ici.</p>
              </div>
            </div>
          )}

          {activeView === 'templates' && (
            <div className="p-4">
              <div className="text-center py-12">
                <ChatBubbleLeftRightIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Modèles
                </h3>
                <p className="text-gray-600">
                  Créez et gérez vos modèles d&apos;emails.
                </p>
              </div>
            </div>
          )}

          {activeView === 'analytics' && (
            <div className="p-4">
              <div className="text-center py-12">
                <ChartBarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Analytics
                </h3>
                <p className="text-gray-600">
                  Analysez les performances de vos communications.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
