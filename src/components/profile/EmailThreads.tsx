'use client';

import { useState } from 'react';
import { Button } from '@/components/ui';
import { EmailThread } from '@/types';
import { mockEmailThreads } from '@/lib/mockData/emailData';

interface EmailThreadsProps {
  influencerId: string;
}

export default function EmailThreads({ influencerId }: EmailThreadsProps) {
  const [selectedThread, setSelectedThread] = useState<EmailThread | null>(
    null
  );
  const [showCompose, setShowCompose] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  // Récupérer les threads pour cet influenceur
  const threads = mockEmailThreads.filter(
    (thread) => thread.influencerId === influencerId
  );

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

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    // Simulation d'envoi de message
    console.log('Sending message:', newMessage);
    setNewMessage('');
    setShowCompose(false);

    // TODO: Ajouter le message à la conversation
  };

  if (threads.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <svg
            className="w-6 h-6 text-gray-400"
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
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Aucune conversation
        </h3>
        <p className="text-gray-600 mb-4">
          Vous n{`'`}avez pas encore échangé d{`'`}emails avec cet influenceur.
        </p>
        <Button
          onClick={() => setShowCompose(true)}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          Commencer une conversation
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header avec bouton composer */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Communications</h3>
          <p className="text-sm text-gray-600">
            {threads.length} conversation{threads.length > 1 ? 's' : ''}
          </p>
        </div>
        <Button
          onClick={() => setShowCompose(true)}
          size="sm"
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          Nouveau message
        </Button>
      </div>

      {/* Liste des conversations */}
      <div className="space-y-4">
        {threads.map((thread) => (
          <div
            key={thread.id}
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
              selectedThread?.id === thread.id
                ? 'border-emerald-500 bg-emerald-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() =>
              setSelectedThread(
                selectedThread?.id === thread.id ? null : thread
              )
            }
          >
            {/* Header de la conversation */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-gray-900">
                    {thread.subject}
                  </h4>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(thread.status)}`}
                  >
                    {getStatusLabel(thread.status)}
                  </span>
                  {thread.unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                      {thread.unreadCount}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {thread.lastMessagePreview}
                </p>
              </div>
              <div className="text-xs text-gray-500 ml-4">
                {formatDate(thread.lastMessageAt)}
              </div>
            </div>

            {/* Métadonnées de la conversation */}
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span>
                {thread.messageCount} message
                {thread.messageCount > 1 ? 's' : ''}
              </span>
              <span>Créé le {formatDate(thread.firstContactAt)}</span>
              {thread.lastReplyAt && (
                <span>
                  Dernière réponse le {formatDate(thread.lastReplyAt)}
                </span>
              )}
            </div>

            {/* Tags */}
            {thread.tags && thread.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {thread.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Messages détaillés (expandés) */}
            {selectedThread?.id === thread.id && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {thread.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-3 rounded-lg ${
                        message.from.includes('@agence-creative.com') ||
                        message.from.includes('@brand-fashion.com')
                          ? 'bg-emerald-50 ml-4'
                          : 'bg-gray-50 mr-4'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-sm text-gray-900">
                          {message.from.includes('@agence-creative.com') ||
                          message.from.includes('@brand-fashion.com')
                            ? 'Vous'
                            : thread.influencerName}
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatDate(message.sentAt)}
                          {!message.isRead && (
                            <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full inline-block"></span>
                          )}
                        </div>
                      </div>
                      <div className="text-sm text-gray-700 whitespace-pre-wrap">
                        {message.body}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Zone de réponse rapide */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <div className="flex-1">
                      <textarea
                        placeholder="Tapez votre réponse..."
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none text-sm"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50"
                      >
                        Répondre
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modale de composition */}
      {showCompose && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Nouveau message
              </h3>
              <button
                onClick={() => setShowCompose(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destinataire
                </label>
                <input
                  type="email"
                  value={threads[0]?.influencerEmail || ''}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sujet
                </label>
                <input
                  type="text"
                  placeholder="Sujet de votre message..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  rows={8}
                  placeholder="Votre message..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
              <Button variant="secondary" onClick={() => setShowCompose(false)}>
                Annuler
              </Button>
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50"
              >
                Envoyer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
