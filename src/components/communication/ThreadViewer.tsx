'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  PaperAirplaneIcon,
  StarIcon,
  ArchiveBoxIcon,
  EllipsisVerticalIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { ThreadViewerProps, CommunicationThread } from '@/types/communication';
import { useCommunication } from '@/contexts/CommunicationContext';
import UnifiedEmailModal from './UnifiedEmailModal';

export default function ThreadViewer({
  threadId,
  contactId,
  showHeader = true,
  showComposer = true,
  compact = false,
}: ThreadViewerProps) {
  const [expandedMessages, setExpandedMessages] = useState<Set<string>>(
    new Set()
  );
  const [replyContent, setReplyContent] = useState('');
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    threads,
    messages,
    selectedThread,
    loadThreads,
    loadMessages,
    selectThread,
    sendMessage,
    starThread,
    archiveThread,
    updateThreadStatus,
  } = useCommunication();

  // Trouver le thread courant
  const currentThread = threadId
    ? threads.find((t) => t.id === threadId)
    : selectedThread;

  // Messages du thread courant
  const threadMessages = currentThread
    ? messages.filter((m) => m.threadId === currentThread.id)
    : [];

  useEffect(() => {
    if (!threads.length) {
      loadThreads();
    }
  }, [threads.length, loadThreads]);

  useEffect(() => {
    if (currentThread && threadMessages.length === 0) {
      loadMessages(currentThread.id);
    }
  }, [currentThread, threadMessages.length, loadMessages]);

  useEffect(() => {
    if (contactId && !currentThread) {
      // Chercher un thread existant pour ce contact
      const contactThread = threads.find((t) => t.contactId === contactId);
      if (contactThread) {
        selectThread(contactThread);
      }
    }
  }, [contactId, currentThread, threads, selectThread]);

  const handleSendReply = async () => {
    if (!replyContent.trim() || !currentThread) return;

    setLoading(true);
    try {
      await sendMessage({
        threadId: currentThread.id,
        recipientId: currentThread.contactId,
        content: replyContent,
        channel: currentThread.channel,
        type: 'sent',
      });
      setReplyContent('');
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStarThread = () => {
    if (currentThread) {
      starThread(currentThread.id, !currentThread.isStarred);
    }
  };

  const handleArchiveThread = () => {
    if (currentThread && confirm('Archiver cette conversation ?')) {
      archiveThread(currentThread.id);
    }
  };

  const handleStatusChange = (newStatus: CommunicationThread['status']) => {
    if (currentThread) {
      updateThreadStatus(currentThread.id, newStatus);
    }
  };

  const toggleMessageExpansion = (messageId: string) => {
    setExpandedMessages((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(messageId)) {
        newSet.delete(messageId);
      } else {
        newSet.add(messageId);
      }
      return newSet;
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffHours < 1) {
      return 'À l&apos;instant';
    } else if (diffHours < 24) {
      return `Il y a ${Math.floor(diffHours)}h`;
    } else if (diffHours < 168) {
      return date.toLocaleDateString('fr-FR', {
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit',
      });
    } else {
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
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

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email':
        return '📧';
      case 'linkedin':
        return '💼';
      case 'instagram':
        return '📸';
      case 'phone':
        return '📞';
      default:
        return '💬';
    }
  };

  if (!currentThread) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        {contactId ? (
          <>
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-lg font-medium mb-2">Aucune conversation</h3>
            <p className="text-center mb-4">
              Aucune conversation trouvée avec ce contact.
              <br />
              Commencez une nouvelle conversation.
            </p>
            <Button onClick={() => setShowNewMessageModal(true)}>
              <PlusIcon className="w-4 h-4 mr-2" />
              Nouveau message
            </Button>
          </>
        ) : (
          <>
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-lg font-medium mb-2">
              Sélectionnez une conversation
            </h3>
            <p>Choisissez une conversation pour voir les détails.</p>
          </>
        )}

        {/* Modal nouveau message */}
        {showNewMessageModal && contactId && (
          <UnifiedEmailModal
            isOpen={showNewMessageModal}
            onClose={() => setShowNewMessageModal(false)}
            mode="single"
            contacts={[]} // TODO: Récupérer le contact par contactId
            onSent={() => {
              setShowNewMessageModal(false);
              // Recharger les threads
              loadThreads();
            }}
          />
        )}
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-full ${compact ? '' : 'bg-white'}`}>
      {/* Header */}
      {showHeader && (
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Avatar contact */}
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  {currentThread.contact.avatar ? (
                    <Image
                      src={currentThread.contact.avatar}
                      alt={currentThread.contact.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-medium text-gray-600">
                      {currentThread.contact.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
              </div>

              {/* Infos conversation */}
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {currentThread.contact.name}
                  </h3>
                  <span className="text-sm">
                    {getChannelIcon(currentThread.channel)}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>{currentThread.contact.email}</span>
                  {currentThread.contact.company && (
                    <>
                      <span>•</span>
                      <span>{currentThread.contact.company}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              {/* Status */}
              <select
                value={currentThread.status}
                onChange={(e) =>
                  handleStatusChange(
                    e.target.value as CommunicationThread['status']
                  )
                }
                className="text-sm border border-gray-300 rounded px-2 py-1"
              >
                <option value="new">Nouveau</option>
                <option value="responded">Répondu</option>
                <option value="waiting">En attente</option>
                <option value="negotiating">Négociation</option>
                <option value="closed">Fermé</option>
              </select>

              {/* Star */}
              <button
                onClick={handleStarThread}
                className={`p-2 rounded-lg transition-colors ${
                  currentThread.isStarred
                    ? 'text-yellow-500 hover:text-yellow-600'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {currentThread.isStarred ? (
                  <StarIconSolid className="w-5 h-5" />
                ) : (
                  <StarIcon className="w-5 h-5" />
                )}
              </button>

              {/* Archive */}
              <button
                onClick={handleArchiveThread}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <ArchiveBoxIcon className="w-5 h-5" />
              </button>

              {/* Menu */}
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <EllipsisVerticalIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Subject & Status */}
          <div className="mt-3 flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-900">
              {currentThread.subject}
            </h4>
            <div className="flex items-center space-x-2">
              <span
                className={`px-2 py-1 text-xs rounded-full ${getStatusColor(currentThread.status)}`}
              >
                {getStatusLabel(currentThread.status)}
              </span>
              <span className="text-xs text-gray-500">
                {threadMessages.length} message
                {threadMessages.length > 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {threadMessages.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">📭</div>
            <p>Chargement des messages...</p>
          </div>
        ) : (
          threadMessages.map((message, index) => {
            const isExpanded = expandedMessages.has(message.id);
            const isLastMessage = index === threadMessages.length - 1;
            const isSent = message.type === 'sent';

            return (
              <div
                key={message.id}
                className={`${isSent ? 'ml-12' : 'mr-12'} ${isLastMessage ? '' : 'pb-4 border-b border-gray-100'}`}
              >
                {/* Message header */}
                <div
                  className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded"
                  onClick={() => toggleMessageExpansion(message.id)}
                >
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                        isSent
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {isSent
                        ? 'Moi'
                        : currentThread.contact.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <span className="text-sm font-medium">
                        {isSent ? 'Vous' : currentThread.contact.name}
                      </span>
                      <span className="text-xs text-gray-500 ml-2">
                        {formatDate(message.timestamp)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {/* Status indicators */}
                    {message.trackingData?.opened && (
                      <span className="text-xs text-green-600">Lu</span>
                    )}
                    {message.trackingData?.clicked && (
                      <span className="text-xs text-blue-600">Cliqué</span>
                    )}

                    {isExpanded ? (
                      <ChevronUpIcon className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronDownIcon className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </div>

                {/* Message content */}
                {(isExpanded || isLastMessage) && (
                  <div className="mt-2 ml-10">
                    {message.subject && (
                      <div className="text-sm font-medium text-gray-900 mb-2">
                        {message.subject}
                      </div>
                    )}
                    <div className="text-sm text-gray-700 whitespace-pre-wrap">
                      {message.content}
                    </div>

                    {/* Attachments */}
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {message.attachments.map((attachment) => (
                          <div
                            key={attachment.id}
                            className="flex items-center space-x-2 text-xs text-gray-600 bg-gray-50 p-2 rounded"
                          >
                            <span>📎</span>
                            <span>{attachment.name}</span>
                            <span>
                              ({(attachment.size / 1024).toFixed(1)} KB)
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Composer */}
      {showComposer && (
        <div className="border-t border-gray-200 p-4">
          <div className="space-y-3">
            <div className="flex space-x-3">
              <Input
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Tapez votre réponse..."
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                    handleSendReply();
                  }
                }}
              />
              <Button
                onClick={handleSendReply}
                disabled={!replyContent.trim() || loading}
                size="sm"
              >
                <PaperAirplaneIcon className="w-4 h-4" />
              </Button>
            </div>

            <div className="text-xs text-gray-500">
              Cmd/Ctrl + Entrée pour envoyer
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
