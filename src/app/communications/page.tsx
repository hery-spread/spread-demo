'use client';

import { useState } from 'react';
import { Button } from '@/components/ui';
import { EmailThread, EmailCampaignSequence } from '@/types';
import { mockEmailThreads, mockEmailStats } from '@/lib/mockData/emailData';
import SimpleCampaignWizard from '@/components/communications/SimpleCampaignWizard';

export default function CommunicationsPage() {
  const [activeFilter, setActiveFilter] = useState<
    'all' | 'new' | 'responded' | 'waiting' | 'negotiating' | 'closed'
  >('all');
  const [selectedThread, setSelectedThread] = useState<EmailThread | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [showCampaignWizard, setShowCampaignWizard] = useState(false);
  const [, setCampaigns] = useState<EmailCampaignSequence[]>([]);

  const stats = mockEmailStats;

  // Filtrer les threads
  const filteredThreads = mockEmailThreads.filter((thread) => {
    const matchesFilter =
      activeFilter === 'all' || thread.status === activeFilter;
    const matchesSearch =
      searchQuery === '' ||
      thread.influencerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.subject.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
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

  const filterButtons = [
    { key: 'all', label: 'Tous', count: mockEmailThreads.length },
    {
      key: 'new',
      label: 'Nouveau',
      count: mockEmailThreads.filter((t) => t.status === 'new').length,
    },
    {
      key: 'responded',
      label: 'Répondu',
      count: mockEmailThreads.filter((t) => t.status === 'responded').length,
    },
    {
      key: 'waiting',
      label: 'En attente',
      count: mockEmailThreads.filter((t) => t.status === 'waiting').length,
    },
    {
      key: 'negotiating',
      label: 'Négociation',
      count: mockEmailThreads.filter((t) => t.status === 'negotiating').length,
    },
    {
      key: 'closed',
      label: 'Fermé',
      count: mockEmailThreads.filter((t) => t.status === 'closed').length,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Communications</h1>
          <p className="text-gray-600 mt-1">
            Gérez toutes vos conversations avec les influenceurs
          </p>
        </div>
        <Button
          onClick={() => setShowCampaignWizard(true)}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          Nouvelle campagne email
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.97 8.97 0 01-4.906-1.44L3 21l2.44-5.094A8.97 8.97 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Conversations</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.totalThreads}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Taux de réponse
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.responseRate}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg
                className="w-6 h-6 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Temps de réponse
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.averageResponseTime}h
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Non lus</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.unreadCount}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Liste des conversations */}
        <div className="lg:col-span-1 space-y-6">
          {/* Filtres */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-medium text-gray-900 mb-3">Filtres</h3>
            <div className="space-y-2">
              {filterButtons.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() =>
                    setActiveFilter(filter.key as typeof activeFilter)
                  }
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-sm transition-colors ${
                    activeFilter === filter.key
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span>{filter.label}</span>
                  <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                    {filter.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Recherche */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Rechercher des conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Liste des threads */}
          <div className="bg-white rounded-lg border border-gray-200 max-h-[600px] overflow-y-auto">
            {filteredThreads.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-gray-500">Aucune conversation trouvée</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredThreads.map((thread) => (
                  <div
                    key={thread.id}
                    onClick={() => setSelectedThread(thread)}
                    className={`p-4 cursor-pointer transition-colors ${
                      selectedThread?.id === thread.id
                        ? 'bg-emerald-50 border-r-2 border-emerald-500'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <img
                          src={thread.influencerAvatar}
                          alt={thread.influencerName}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {thread.influencerName}
                          </h4>
                          <p className="text-sm text-gray-600 truncate">
                            {thread.subject}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(thread.status)}`}
                        >
                          {getStatusLabel(thread.status)}
                        </span>
                        {thread.unreadCount > 0 && (
                          <div className="mt-1">
                            <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                              {thread.unreadCount}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                      {thread.lastMessagePreview}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>
                        {thread.messageCount} message
                        {thread.messageCount > 1 ? 's' : ''}
                      </span>
                      <span>{formatDate(thread.lastMessageAt)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Vue détaillée de la conversation */}
        <div className="lg:col-span-2">
          {selectedThread ? (
            <div className="bg-white rounded-lg border border-gray-200 h-[600px] flex flex-col">
              {/* Header de la conversation */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={selectedThread.influencerAvatar}
                      alt={selectedThread.influencerName}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {selectedThread.influencerName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {selectedThread.subject}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedThread.status)}`}
                  >
                    {getStatusLabel(selectedThread.status)}
                  </span>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {selectedThread.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`${
                        message.from.includes('@agence-creative.com') ||
                        message.from.includes('@brand-fashion.com')
                          ? 'ml-12'
                          : 'mr-12'
                      }`}
                    >
                      <div
                        className={`p-3 rounded-lg ${
                          message.from.includes('@agence-creative.com') ||
                          message.from.includes('@brand-fashion.com')
                            ? 'bg-emerald-500 text-white ml-auto'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm">
                            {message.from.includes('@agence-creative.com') ||
                            message.from.includes('@brand-fashion.com')
                              ? 'Vous'
                              : selectedThread.influencerName}
                          </span>
                          <span
                            className={`text-xs ${
                              message.from.includes('@agence-creative.com') ||
                              message.from.includes('@brand-fashion.com')
                                ? 'text-emerald-100'
                                : 'text-gray-500'
                            }`}
                          >
                            {formatDate(message.sentAt)}
                          </span>
                        </div>
                        <div className="whitespace-pre-wrap">
                          {message.body}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Zone de réponse */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-3">
                  <div className="flex-1">
                    <textarea
                      placeholder="Tapez votre réponse..."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                    />
                  </div>
                  <div className="flex flex-col justify-end">
                    <Button
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700"
                    >
                      Envoyer
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 h-[600px] flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.97 8.97 0 01-4.906-1.44L3 21l2.44-5.094A8.97 8.97 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Sélectionnez une conversation
                </h3>
                <p className="text-gray-600">
                  Choisissez une conversation dans la liste pour voir les
                  détails
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Campaign Wizard Modal */}
      <SimpleCampaignWizard
        isOpen={showCampaignWizard}
        onClose={() => setShowCampaignWizard(false)}
        onCreateCampaign={(campaign: EmailCampaignSequence) => {
          setCampaigns((prev) => [...prev, campaign]);
          console.log('Campagne créée:', campaign);
        }}
      />
    </div>
  );
}
