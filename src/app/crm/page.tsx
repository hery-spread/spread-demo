'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
  UserGroupIcon,
  PlusIcon,
  FunnelIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline';
import CRMKanban from '@/components/crm/CRMKanban';
import CRMStats from '@/components/crm/CRMStats';
import ContactModal from '@/components/crm/ContactModal';
import { useCRM } from '@/hooks/useCRM';

export default function CRMPage() {
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [showContactModal, setShowContactModal] = useState(false);
  const { contacts, stats, updateContactStage, addContact } = useCRM();

  const handleAddContact = (
    contactData: Partial<import('@/types').CRMContact>
  ) => {
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
                  Gérez vos contacts et campagnes d&apos;influence
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('kanban')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
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
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'list'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Bars3Icon className="w-4 h-4 mr-1 inline" />
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
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Tous les contacts
              </h2>

              {/* Liste des contacts */}
              <div className="space-y-4">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={contact.avatar}
                        alt={contact.name}
                        className="w-10 h-10 rounded-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              contact.name
                            )}&background=6366f1&color=fff`;
                        }}
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
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
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

                      {contact.dealValue && (
                        <span className="text-sm font-medium text-green-600">
                          {contact.dealValue}€
                        </span>
                      )}
                    </div>
                  </div>
                ))}

                {contacts.length === 0 && (
                  <div className="text-center py-12">
                    <UserGroupIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Aucun contact
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Commencez par ajouter votre premier contact au CRM.
                    </p>
                    <Button
                      onClick={() => setShowContactModal(true)}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <PlusIcon className="w-4 h-4 mr-2" />
                      Ajouter un contact
                    </Button>
                  </div>
                )}
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
