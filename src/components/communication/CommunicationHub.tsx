'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import {
  InboxIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  StarIcon as StarIconSolid,
  ArrowLeftIcon,
  PaperAirplaneIcon,
  ArrowUturnLeftIcon,
  ClockIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { InboxIcon as InboxIconSolid } from '@heroicons/react/24/solid';
import {
  CommunicationHubProps,
  CommunicationThread,
} from '@/types/communication';
import { useCommunication } from '@/contexts/CommunicationContext';
import { useEmailIntegration } from '@/hooks/useEmailIntegration';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { ArchiveBoxIcon } from '@heroicons/react/24/outline';

export default function CommunicationHub({
  defaultView = 'inbox',
  embedded = false,
  showSidebar = true,
}: CommunicationHubProps) {
  const [activeView, setActiveView] = useState(defaultView);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isGmailConnected, setIsGmailConnected] = useState(false);
  const [selectedThread, setSelectedThread] =
    useState<CommunicationThread | null>(null);
  const [showThreadView, setShowThreadView] = useState(false);
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [contactSearchQuery, setContactSearchQuery] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<CommunicationThread[]>([]);

  const {} = useEmailIntegration();

  const {
    threads,
    stats,
    loading,
    error,
    filters,
    loadThreads,
    setFilters,

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
          value === 'all' ? undefined : [value as 'email' | 'phone' | 'other'];
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

  const openThread = (thread: CommunicationThread) => {
    setSelectedThread(thread);
    setShowThreadView(true);
  };

  const closeThread = () => {
    setShowThreadView(false);
    setSelectedThread(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = diff / (1000 * 60 * 60);

    if (hours < 1) {
      return "À l'instant";
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
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-200 border-t-purple-600"></div>
          <div
            className="absolute inset-0 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin"
            style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
          ></div>
          <div
            className="absolute inset-2 rounded-full border-2 border-pink-200 border-t-pink-400 animate-spin"
            style={{ animationDuration: '2s' }}
          ></div>
        </div>
        <div className="mt-4 text-center">
          <p className="text-purple-600 font-semibold">
            Chargement des conversations...
          </p>
          <p className="text-purple-400 text-sm mt-1">Veuillez patienter</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 p-8">
        <div className="relative mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-pink-100 rounded-3xl flex items-center justify-center shadow-lg">
            <span className="text-2xl">⚠️</span>
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
            <span className="text-white text-xs font-bold">!</span>
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Une erreur est survenue
        </h3>
        <p className="text-gray-600 mb-6 max-w-md text-center">{error}</p>
        <Button
          onClick={() => loadThreads()}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl px-6 py-3"
        >
          <span className="mr-2">🔄</span>
          Réessayer
        </Button>
      </div>
    );
  }

  return (
    <div
      className={`flex h-full ${embedded ? '' : 'bg-gradient-to-br from-slate-50 via-purple-50/20 to-indigo-50/30'}`}
    >
      {/* Sidebar */}
      {showSidebar && (
        <div className="w-64 bg-gradient-to-br from-white via-purple-50/30 to-indigo-50/20 border-r border-purple-100/50 flex flex-col backdrop-blur-sm">
          {/* Header */}
          <div className="p-6 border-b border-purple-100/30 bg-gradient-to-r from-purple-500/5 to-indigo-500/5">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center space-x-3">
                  <h2 className="text-xl font-bold bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent">
                    Communications
                  </h2>
                  {isGmailConnected && (
                    <div className="flex items-center space-x-1 bg-green-100 px-2 py-1 rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-semibold text-green-700">
                        Gmail
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-purple-600/70 font-medium mt-1">
                  {isGmailConnected
                    ? 'Conversations Gmail connectées'
                    : 'Connectez votre email pour commencer'}
                </p>
              </div>
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-xl"
                onClick={() => setShowComposeModal(true)}
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                Nouveau message
              </Button>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-3 rounded-xl border border-blue-200/50 hover:shadow-md transition-all duration-200">
                <div className="font-bold text-blue-900 text-lg">
                  {stats.newThreads}
                </div>
                <div className="text-blue-700 font-medium">Nouveaux</div>
                <div className="w-full bg-blue-200 rounded-full h-1 mt-2">
                  <div
                    className="bg-blue-500 h-1 rounded-full"
                    style={{ width: '60%' }}
                  ></div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-3 rounded-xl border border-emerald-200/50 hover:shadow-md transition-all duration-200">
                <div className="font-bold text-emerald-900 text-lg">
                  {stats.respondedThreads}
                </div>
                <div className="text-emerald-700 font-medium">Répondus</div>
                <div className="w-full bg-emerald-200 rounded-full h-1 mt-2">
                  <div
                    className="bg-emerald-500 h-1 rounded-full"
                    style={{ width: '85%' }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Activity indicator */}
            <div className="mt-4 p-3 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-xl border border-purple-200/30">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-purple-700">
                  Activité
                </span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <div
                    className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"
                    style={{ animationDelay: '0.5s' }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-red-400 rounded-full animate-pulse"
                    style={{ animationDelay: '1s' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {views.map((view) => {
              const isActive = activeView === view.id;
              const Icon = isActive ? view.iconSolid : view.icon;
              const isDisabled = !isGmailConnected && view.id === 'inbox';

              return (
                <button
                  key={view.id}
                  onClick={() => !isDisabled && setActiveView('inbox')}
                  disabled={isDisabled}
                  className={`group w-full flex items-center justify-between p-4 rounded-2xl text-left transition-all duration-300 transform hover:scale-[1.02] ${
                    isDisabled
                      ? 'text-gray-400 cursor-not-allowed opacity-50 bg-gray-50/50'
                      : isActive
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25 border border-purple-500/30'
                        : 'text-gray-700 hover:bg-white hover:shadow-md hover:border-purple-100 border border-transparent'
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`p-2 rounded-xl mr-4 transition-all duration-300 ${
                        isDisabled
                          ? 'bg-gray-200'
                          : isActive
                            ? 'bg-white/20'
                            : 'bg-purple-50 group-hover:bg-purple-100'
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 transition-all duration-300 ${
                          isDisabled
                            ? 'text-gray-400'
                            : isActive
                              ? 'text-white'
                              : 'text-purple-600 group-hover:text-purple-700'
                        }`}
                      />
                    </div>
                    <div>
                      <span
                        className={`font-semibold text-sm transition-all duration-300 ${
                          isDisabled
                            ? 'text-gray-400'
                            : isActive
                              ? 'text-white'
                              : 'text-gray-700 group-hover:text-purple-700'
                        }`}
                      >
                        {view.name}
                      </span>
                      {view.count > 0 && !isDisabled && (
                        <div className="text-xs opacity-75 mt-0.5">
                          {view.count} conversation{view.count > 1 ? 's' : ''}
                        </div>
                      )}
                    </div>
                  </div>
                  {view.count > 0 && !isDisabled && (
                    <div
                      className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all duration-300 ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-purple-100 text-purple-700 group-hover:bg-purple-200'
                      }`}
                    >
                      {view.count}
                    </div>
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
        <div className="bg-white/80 backdrop-blur-xl border-b border-purple-100/50 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent">
                {views.find((v) => v.id === activeView)?.name}
              </h1>
              <p className="text-sm text-purple-600/70 font-medium mt-1">
                {threads.length} conversation{threads.length > 1 ? 's' : ''} au
                total
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="bg-white/50 border-purple-200/50 hover:bg-purple-50 hover:border-purple-300 transition-all duration-300 rounded-xl"
              >
                <FunnelIcon className="w-4 h-4 mr-2" />
                Filtres
              </Button>

              {selectedItems.length > 0 && (
                <div className="flex items-center space-x-2 bg-purple-50/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-purple-200/30">
                  <span className="text-sm font-semibold text-purple-700">
                    {selectedItems.length} sélectionné
                    {selectedItems.length > 1 ? 's' : ''}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkAction('markRead')}
                    className="bg-blue-50 border-blue-200 hover:bg-blue-100 transition-all duration-200"
                  >
                    Marquer lu
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkAction('star')}
                    className="bg-yellow-50 border-yellow-200 hover:bg-yellow-100 transition-all duration-200"
                  >
                    <StarIconSolid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkAction('archive')}
                    className="bg-gray-50 border-gray-200 hover:bg-gray-100 transition-all duration-200"
                  >
                    <ArchiveBoxIcon className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Search */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex-1 relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <MagnifyingGlassIcon className="w-5 h-5 text-purple-400" />
              </div>
              <Input
                type="text"
                placeholder="Rechercher dans les conversations..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white/60 backdrop-blur-sm border-purple-200/50 rounded-xl focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-300 text-gray-700 placeholder:text-purple-400/70"
              />
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mb-6 p-6 bg-gradient-to-r from-white/60 to-purple-50/40 backdrop-blur-sm rounded-2xl border border-purple-100/50 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-purple-700">
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
                    className="bg-white/80 border-purple-200/50 rounded-xl focus:border-purple-400 transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-purple-700">
                    Canal
                  </label>
                  <Select
                    options={[
                      { value: 'all', label: 'Tous les canaux' },
                      { value: 'email', label: '📧 Email' },
                    ]}
                    onChange={(e) =>
                      handleFilterChange('channel', e.target.value)
                    }
                    className="bg-white/80 border-purple-200/50 rounded-xl focus:border-purple-400 transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-purple-700">
                    Priorité
                  </label>
                  <Select
                    options={[
                      { value: 'all', label: 'Toutes les priorités' },
                      { value: 'urgent', label: '🔴 Urgent' },
                      { value: 'high', label: '🟠 Élevée' },
                      { value: 'medium', label: '🟡 Moyenne' },
                      { value: 'low', label: '🟢 Faible' },
                    ]}
                    onChange={(e) =>
                      handleFilterChange('priority', e.target.value)
                    }
                    className="bg-white/80 border-purple-200/50 rounded-xl focus:border-purple-400 transition-all duration-300"
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
              {!isGmailConnected ? (
                <div className="flex flex-col items-center justify-center h-full p-12">
                  <div className="relative mb-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100 rounded-3xl flex items-center justify-center shadow-xl">
                      <InboxIcon className="w-12 h-12 text-purple-600" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">?</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent">
                    Connectez votre email Gmail
                  </h3>

                  <p className="text-center text-purple-600/70 mb-8 max-w-lg text-lg leading-relaxed">
                    Pour accéder à vos conversations avec les influenceurs, vous
                    devez d'abord connecter votre compte Gmail professionnel.
                  </p>

                  <div className="flex flex-col items-center space-y-6">
                    <div className="bg-white/80 backdrop-blur-sm border border-purple-200/50 rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 max-w-md">
                      <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-2xl font-bold">
                          📧
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">
                        Gmail
                      </h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Connectez votre boîte mail pour voir vos conversations
                        avec les influenceurs
                      </p>
                      <Button
                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl px-6 py-3"
                        onClick={() => {
                          // Simuler la connexion Gmail
                          setIsGmailConnected(true);
                        }}
                      >
                        <span className="mr-2">🔗</span>
                        Connecter Gmail
                      </Button>
                    </div>

                    <div className="text-center">
                      <p className="text-xs text-purple-600/70">
                        Simulation : Cliquez sur "Connecter Gmail" pour voir les
                        fausses conversations
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Toolbar */}
                  <div className="bg-white/60 backdrop-blur-sm border-b border-purple-100/30 px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        checked={
                          selectedItems.length === threads.length &&
                          threads.length > 0
                        }
                        onChange={selectAll}
                        className="rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-sm font-semibold text-purple-700">
                        {threads.length} conversation
                        {threads.length !== 1 ? 's' : ''}
                      </span>
                      {selectedItems.length > 0 && (
                        <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                          {selectedItems.length} sélectionnée
                          {selectedItems.length > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Thread list */}
                  <div className="overflow-y-auto h-full p-6 space-y-4">
                    {threads.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-64 text-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-3xl flex items-center justify-center mb-6 shadow-lg">
                          <InboxIcon className="w-10 h-10 text-purple-600" />
                        </div>
                        <h3 className="text-xl font-bold text-purple-700 mb-3">
                          Aucune conversation
                        </h3>
                        <p className="text-purple-600/70 max-w-md">
                          Vos nouvelles conversations apparaîtront ici.
                          Connectez vos canaux de communication pour commencer !
                        </p>
                      </div>
                    ) : (
                      threads.map((thread, index) => (
                        <div
                          key={thread.id}
                          className={`group relative bg-white/70 backdrop-blur-sm border border-purple-100/50 rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:scale-[1.02] hover:bg-white/90 animate-fade-in-up ${
                            selectedThread?.id === thread.id
                              ? 'bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-300 shadow-lg shadow-purple-500/20'
                              : ''
                          } ${!thread.isRead ? 'bg-blue-50/50 border-blue-200' : ''}`}
                          style={{ animationDelay: `${index * 0.1}s` }}
                          onClick={() => openThread(thread)}
                        >
                          {/* Priority indicator */}
                          {thread.priority === 'urgent' && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                          )}

                          <div className="flex items-start space-x-4">
                            <input
                              type="checkbox"
                              checked={selectedItems.includes(thread.id)}
                              onChange={(e) => {
                                e.stopPropagation();
                                toggleSelection(thread.id);
                              }}
                              className="mt-2 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                            />

                            <div className="flex-shrink-0">
                              <div className="relative">
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl flex items-center justify-center shadow-sm">
                                  {thread.contact.avatar ? (
                                    <Image
                                      src={thread.contact.avatar}
                                      alt={thread.contact.name}
                                      width={48}
                                      height={48}
                                      className="w-12 h-12 rounded-2xl object-cover"
                                    />
                                  ) : (
                                    <span className="text-sm font-bold text-purple-700">
                                      {thread.contact.name
                                        .charAt(0)
                                        .toUpperCase()}
                                    </span>
                                  )}
                                </div>
                                {/* Online status indicator */}
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                              </div>
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-2">
                                <h4
                                  className={`text-base font-bold text-gray-900 truncate transition-all duration-300 group-hover:text-purple-700 ${
                                    !thread.isRead ? 'font-extrabold' : ''
                                  }`}
                                >
                                  {thread.contact.name}
                                </h4>
                                <div className="flex items-center space-x-3">
                                  {thread.isStarred && (
                                    <StarIconSolid className="w-5 h-5 text-yellow-500 animate-pulse" />
                                  )}
                                  <span className="text-xs font-medium text-purple-600/70">
                                    {formatDate(thread.updatedAt)}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center space-x-3 mb-3">
                                <span
                                  className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all duration-200 ${getStatusColor(thread.status)}`}
                                >
                                  {getStatusLabel(thread.status)}
                                </span>
                                <span className="text-sm font-semibold">
                                  {getPriorityIcon(thread.priority)}
                                </span>
                                <span className="text-xs font-medium text-purple-600/70 bg-purple-50 px-2 py-1 rounded-full capitalize">
                                  {thread.channel}
                                </span>
                              </div>

                              <h5
                                className={`text-sm font-semibold text-gray-800 truncate mb-2 transition-all duration-300 group-hover:text-purple-700 ${
                                  !thread.isRead ? 'font-bold' : ''
                                }`}
                              >
                                {thread.subject}
                              </h5>

                              <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                                {thread.lastMessage.content}
                              </p>

                              {/* Message count indicator */}
                              <div className="flex items-center justify-between mt-3">
                                <div className="flex items-center space-x-2">
                                  <span className="text-xs font-medium text-purple-600">
                                    {thread.messageCount} message
                                    {thread.messageCount > 1 ? 's' : ''}
                                  </span>
                                  {thread.tags && thread.tags.length > 0 && (
                                    <div className="flex space-x-1">
                                      {thread.tags
                                        .slice(0, 2)
                                        .map((tag, index) => (
                                          <span
                                            key={index}
                                            className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium"
                                          >
                                            {tag}
                                          </span>
                                        ))}
                                    </div>
                                  )}
                                </div>

                                <button
                                  className="p-2 text-purple-400 hover:text-purple-600 rounded-xl hover:bg-purple-50 transition-all duration-200"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Handle menu action
                                  }}
                                >
                                  <EllipsisVerticalIcon className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Thread View Modal */}
      {showThreadView && selectedThread && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
              <div className="flex items-center justify-between mb-4">
                <Button
                  onClick={closeThread}
                  className="bg-white/20 hover:bg-white/30 text-white border-0 rounded-xl"
                >
                  <ArrowLeftIcon className="w-4 h-4 mr-2" />
                  Retour
                </Button>
                <div className="flex items-center space-x-3">
                  <Button
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white border-0 rounded-xl"
                  >
                    <ArrowUturnLeftIcon className="w-4 h-4 mr-2" />
                    Répondre
                  </Button>
                  <Button
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white border-0 rounded-xl"
                  >
                    <StarIconSolid className="w-4 h-4 mr-2" />
                    Favoris
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  {selectedThread.contact.avatar ? (
                    <Image
                      src={selectedThread.contact.avatar}
                      alt={selectedThread.contact.name}
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded-2xl object-cover"
                    />
                  ) : (
                    <span className="text-white font-bold text-xl">
                      {selectedThread.contact.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    {selectedThread.contact.name}
                  </h1>
                  <p className="text-white/80">
                    {selectedThread.contact.email}
                  </p>
                  <p className="text-white/60 text-sm">
                    Conversation ouverte • {selectedThread.messageCount} message
                    {selectedThread.messageCount > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>

            {/* Email Content */}
            <div className="p-6 bg-gray-50 min-h-[400px]">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="border-b border-gray-200 pb-4 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {selectedThread.subject}
                  </h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <span
                        className={`inline-block w-2 h-2 rounded-full mr-2 ${
                          selectedThread.status === 'new'
                            ? 'bg-blue-500'
                            : selectedThread.status === 'responded'
                              ? 'bg-green-500'
                              : selectedThread.status === 'waiting'
                                ? 'bg-yellow-500'
                                : 'bg-gray-500'
                        }`}
                      ></span>
                      {selectedThread.status === 'new'
                        ? 'Nouveau'
                        : selectedThread.status === 'responded'
                          ? 'Répondu'
                          : selectedThread.status === 'waiting'
                            ? 'En attente'
                            : selectedThread.status === 'negotiating'
                              ? 'Négociation'
                              : 'Fermé'}
                    </span>
                    <span>•</span>
                    <span>
                      Priorité:{' '}
                      {selectedThread.priority === 'urgent'
                        ? '🔴 Urgent'
                        : selectedThread.priority === 'high'
                          ? '🟠 Élevée'
                          : selectedThread.priority === 'medium'
                            ? '🟡 Moyenne'
                            : '🟢 Faible'}
                    </span>
                    <span>•</span>
                    <span>Canal: 📧 Email</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Message envoyé (vous) */}
                  <div className="flex justify-end">
                    <div className="max-w-md bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-4 rounded-2xl rounded-br-md">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-xs font-medium text-white/80">
                          Vous
                        </span>
                        <span className="text-xs text-white/60">
                          {new Date(selectedThread.createdAt).toLocaleString(
                            'fr-FR',
                            {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit',
                            }
                          )}
                        </span>
                      </div>
                      <p className="text-white leading-relaxed">
                        {selectedThread.lastMessage.type === 'sent'
                          ? selectedThread.lastMessage.content
                          : 'Bonjour ! Nous aimerions collaborer avec vous pour notre nouvelle campagne. Seriez-vous intéressé(e) ?'}
                      </p>
                    </div>
                  </div>

                  {/* Message reçu (contact) */}
                  <div className="flex justify-start">
                    <div className="max-w-md bg-white border border-gray-200 p-4 rounded-2xl rounded-bl-md shadow-sm">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-xs font-medium text-gray-900">
                          {selectedThread.contact.name}
                        </span>
                        <span className="text-xs text-gray-600">
                          {new Date(selectedThread.updatedAt).toLocaleString(
                            'fr-FR',
                            {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit',
                            }
                          )}
                        </span>
                      </div>
                      <p className="text-gray-800 leading-relaxed">
                        {selectedThread.lastMessage.type === 'received'
                          ? selectedThread.lastMessage.content
                          : 'Bonjour ! Je suis très intéressé(e) par votre proposition. Pouvons-nous en discuter plus en détail ?'}
                      </p>
                    </div>
                  </div>

                  {/* Message supplémentaire si count > 2 */}
                  {selectedThread.messageCount > 2 && (
                    <div className="flex justify-center">
                      <div className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm">
                        💬 {selectedThread.messageCount - 2} message
                        {selectedThread.messageCount - 2 > 1 ? 's' : ''}{' '}
                        supplémentaire
                        {selectedThread.messageCount - 2 > 1 ? 's' : ''}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Reply Section */}
            <div className="bg-white border-t border-gray-200 p-6">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <Input
                    placeholder={`Répondre à ${selectedThread.contact.name}...`}
                    className="bg-gray-50 border-gray-200 rounded-xl focus:bg-white"
                  />
                </div>
                <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl px-6">
                  <PaperAirplaneIcon className="w-4 h-4 mr-2" />
                  Envoyer
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Compose Email Modal */}
      {showComposeModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <PaperAirplaneIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">Nouveau message</h1>
                    <p className="text-white/80">Envoyez un email personnalisé</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowComposeModal(false)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-all duration-200"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
              {/* Main Content */}
              <div className="flex-1 flex flex-col">
                {/* Recipients Section */}
                <div className="p-6 border-b border-gray-100">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-semibold text-gray-700 w-16">À :</span>
                      <div className="flex-1">
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Rechercher des contacts..."
                            value={contactSearchQuery}
                            onChange={(e) => setContactSearchQuery(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-300"
                          />
                          <MagnifyingGlassIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    {/* Selected Recipients */}
                    {selectedContacts.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {selectedContacts.map((contact) => (
                          <div
                            key={contact.id}
                            className="flex items-center space-x-2 bg-purple-50 text-purple-700 px-3 py-2 rounded-xl text-sm"
                          >
                            <div className="w-6 h-6 bg-purple-200 rounded-full flex items-center justify-center">
                              <span className="text-xs font-semibold">
                                {contact.contact.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <span className="font-medium">{contact.contact.name}</span>
                            <button
                              onClick={() => setSelectedContacts(prev => prev.filter(c => c.id !== contact.id))}
                              className="text-purple-500 hover:text-purple-700"
                            >
                              <XMarkIcon className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Contact Search Results */}
                {contactSearchQuery && (
                  <div className="max-h-64 overflow-y-auto border-b border-gray-100">
                    {threads
                      .filter(thread =>
                        thread.contact.name.toLowerCase().includes(contactSearchQuery.toLowerCase()) ||
                        thread.contact.email?.toLowerCase().includes(contactSearchQuery.toLowerCase())
                      )
                      .slice(0, 8)
                      .map((thread) => (
                        <button
                          key={thread.id}
                          onClick={() => {
                            if (!selectedContacts.find(c => c.id === thread.id)) {
                              setSelectedContacts(prev => [...prev, thread]);
                            }
                            setContactSearchQuery('');
                          }}
                          className="w-full flex items-center space-x-4 p-4 hover:bg-gray-50 transition-all duration-200 border-b border-gray-50 last:border-b-0"
                        >
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl flex items-center justify-center">
                            {thread.contact.avatar ? (
                              <Image
                                src={thread.contact.avatar}
                                alt={thread.contact.name}
                                width={40}
                                height={40}
                                className="w-10 h-10 rounded-xl object-cover"
                              />
                            ) : (
                              <span className="text-sm font-semibold text-purple-700">
                                {thread.contact.name.charAt(0).toUpperCase()}
                              </span>
                            )}
                          </div>
                          <div className="flex-1 text-left">
                            <div className="font-semibold text-gray-900">{thread.contact.name}</div>
                            <div className="text-sm text-gray-600">{thread.contact.email}</div>
                          </div>
                          {selectedContacts.find(c => c.id === thread.id) && (
                            <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                        </button>
                      ))}
                  </div>
                )}

                {/* Email Content */}
                <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      Objet du message
                    </label>
                    <input
                      type="text"
                      placeholder="Entrez l'objet de votre email..."
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-300 text-gray-900 placeholder:text-gray-400"
                    />
                  </div>

                  {/* Message Templates */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      Modèle de message
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button className="p-4 bg-gradient-to-r from-blue-50 to-blue-100/50 border-2 border-blue-200 rounded-xl hover:border-blue-400 transition-all duration-300 text-left group">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-sm">🤝</span>
                          </div>
                          <div>
                            <div className="font-semibold text-blue-900">Collaboration</div>
                            <div className="text-xs text-blue-700">Proposition de partenariat</div>
                          </div>
                        </div>
                        <p className="text-sm text-blue-800 leading-relaxed">
                          Parfait pour proposer une collaboration avec un influenceur...
                        </p>
                      </button>

                      <button className="p-4 bg-gradient-to-r from-green-50 to-green-100/50 border-2 border-green-200 rounded-xl hover:border-green-400 transition-all duration-300 text-left group">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-sm">📅</span>
                          </div>
                          <div>
                            <div className="font-semibold text-green-900">Événement</div>
                            <div className="text-xs text-green-700">Invitation exclusive</div>
                          </div>
                        </div>
                        <p className="text-sm text-green-800 leading-relaxed">
                          Pour inviter à un événement ou lancement produit...
                        </p>
                      </button>
                    </div>
                  </div>

                  {/* Message Content */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      Message
                    </label>
                    <textarea
                      rows={12}
                      placeholder="Rédigez votre message personnalisé..."
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-300 resize-none text-gray-900 placeholder:text-gray-400"
                    />
                  </div>

                  {/* Variables de personnalisation */}
                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50/50 p-4 rounded-xl border border-purple-200/50">
                    <h4 className="text-sm font-bold text-purple-900 mb-3">
                      Variables de personnalisation
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {['{{prénom}}', '{{nom}}', '{{entreprise}}', '{{ville}}'].map((variable) => (
                        <button
                          key={variable}
                          className="px-3 py-2 bg-white border border-purple-200 rounded-lg text-sm font-medium text-purple-700 hover:bg-purple-100 transition-all duration-200"
                        >
                          {variable}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-purple-600/70 mt-3">
                      Ces variables seront automatiquement remplacées par les informations du destinataire.
                    </p>
                  </div>
                </div>
              </div>

              {/* Preview Sidebar */}
              <div className="w-96 bg-gray-50 border-l border-gray-200 flex flex-col">
                {/* Preview Header */}
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Aperçu</h3>
                  <p className="text-sm text-gray-600">Visualisez votre email avant envoi</p>
                </div>

                {/* Email Preview */}
                <div className="flex-1 p-6">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
                    <div className="text-xs text-gray-500 mb-4 space-y-1">
                      <div><strong>De:</strong> Votre nom &lt;votre@email.com&gt;</div>
                      <div><strong>À:</strong> {selectedContacts.length > 0 ? selectedContacts[0].contact.name : 'Sélectionnez un destinataire'}</div>
                      <div><strong>Objet:</strong> [Votre objet ici]</div>
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Bonjour [Prénom],<br/><br/>
                        Votre message apparaîtra ici...<br/><br/>
                        Cordialement,<br/>
                        Votre nom
                      </p>
                    </div>
                  </div>
                </div>

                {/* Send Actions */}
                <div className="p-6 border-t border-gray-200 bg-white">
                  <div className="space-y-3">
                    <Button
                      disabled={selectedContacts.length === 0}
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl py-3"
                    >
                      <PaperAirplaneIcon className="w-4 h-4 mr-2" />
                      Envoyer maintenant
                    </Button>

                    <Button
                      variant="outline"
                      disabled={selectedContacts.length === 0}
                      className="w-full border-purple-200 text-purple-700 hover:bg-purple-50 rounded-xl py-3"
                    >
                      <ClockIcon className="w-4 h-4 mr-2" />
                      Programmer l&apos;envoi
                    </Button>
                  </div>

                  {selectedContacts.length > 0 && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-200">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-blue-900">
                          {selectedContacts.length} destinataire{selectedContacts.length > 1 ? 's' : ''} sélectionné{selectedContacts.length > 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
