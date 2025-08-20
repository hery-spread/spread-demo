'use client';

import { useState } from 'react';
import { Button } from '@/components/ui';
import { InfluencerContact } from '@/types';
import { mockEmailTemplates } from '@/lib/mockData/emailData';
import ContactSelectionPanel from './ContactSelectionPanel';
import SelectionPreview from './SelectionPreview';

interface BulkEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  influencers: InfluencerContact[];
  listName: string;
  selectedContacts?: string[]; // IDs des contacts pré-sélectionnés
  onSelectionChange?: (selectedIds: string[]) => void;
}

export default function BulkEmailModal({
  isOpen,
  onClose,
  influencers,
  listName,
  selectedContacts = [],
  onSelectionChange,
}: BulkEmailModalProps) {
  const [step, setStep] = useState<'compose' | 'preview' | 'sending' | 'sent'>(
    'compose'
  );
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [fromEmail, setFromEmail] = useState(
    'marie.marketing@agence-creative.com'
  );
  const [fromName, setFromName] = useState('Marie - Agence Créative');
  const [trackOpens, setTrackOpens] = useState(true);
  const [scheduleEmail, setScheduleEmail] = useState(false);
  const [scheduledAt, setScheduledAt] = useState('');
  const [sendingProgress, setSendingProgress] = useState(0);
  
  // Nouveaux états pour la sélection
  const [internalSelectedContacts, setInternalSelectedContacts] = useState<string[]>(selectedContacts);
  const [showSelectionPanel, setShowSelectionPanel] = useState(false);

  const templates = mockEmailTemplates;
  const validInfluencers = influencers.filter((inf) => inf.contactEmail);
  
  // Calculer les contacts effectivement sélectionnés (avec email uniquement)
  const selectedValidContacts = validInfluencers.filter((inf) => 
    internalSelectedContacts.includes(inf.id)
  );
  const recipientCount = selectedValidContacts.length > 0 ? selectedValidContacts.length : validInfluencers.length;

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setSubject(template.subject);
      setBody(template.bodyText);
    }
  };

  const handleSelectionChange = (newSelection: string[]) => {
    setInternalSelectedContacts(newSelection);
    onSelectionChange?.(newSelection);
  };

  const handleOpenSelectionPanel = () => {
    setShowSelectionPanel(true);
  };

  const handleCloseSelectionPanel = () => {
    setShowSelectionPanel(false);
  };

  const handleSend = async () => {
    setStep('sending');
    setSendingProgress(0);

    // Simulation d'envoi avec barre de progression
    const interval = setInterval(() => {
      setSendingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStep('sent');
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleClose = () => {
    if (step !== 'sending') {
      setStep('compose');
      setSelectedTemplate('');
      setSubject('');
      setBody('');
      setSendingProgress(0);
      // Réinitialiser la sélection à la sélection par défaut
      setInternalSelectedContacts(selectedContacts);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Contacter en masse
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {recipientCount} influenceur{recipientCount > 1 ? 's' : ''} dans{' '}
              {listName}
            </p>
          </div>
          <button
            onClick={handleClose}
            disabled={step === 'sending'}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
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

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {step === 'compose' && (
            <div className="space-y-6">
              {/* Sélection des contacts */}
              <SelectionPreview
                contacts={influencers}
                selectedContacts={internalSelectedContacts}
                validContacts={validInfluencers}
                onOpenSelectionPanel={handleOpenSelectionPanel}
                showAdvancedSelection={true}
                title="Contacts sélectionnés"
              />

              {/* Templates */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Template (optionnel)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      onClick={() => handleTemplateSelect(template.id)}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedTemplate === template.id
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium text-gray-900">
                        {template.name}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {template.subject}
                      </div>
                      <div className="text-xs text-gray-500 mt-2 capitalize">
                        {template.category}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expéditeur */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email expéditeur
                  </label>
                  <input
                    type="email"
                    value={fromEmail}
                    onChange={(e) => setFromEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom expéditeur
                  </label>
                  <input
                    type="text"
                    value={fromName}
                    onChange={(e) => setFromName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Sujet */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sujet
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Objet de votre email..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              {/* Corps du message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Votre message..."
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Variables disponibles : {'{influencer_name}'},{' '}
                  {'{sender_name}'}, {'{brand_name}'}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={trackOpens}
                    onChange={(e) => setTrackOpens(e.target.checked)}
                    className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Tracker les ouvertures d{`'`}emails
                  </span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={scheduleEmail}
                    onChange={(e) => setScheduleEmail(e.target.checked)}
                    className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Programmer l{`'`}envoi
                  </span>
                </label>

                {scheduleEmail && (
                  <div className="ml-6">
                    <input
                      type="datetime-local"
                      value={scheduledAt}
                      onChange={(e) => setScheduledAt(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 'sending' && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-6 bg-emerald-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-emerald-600 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Envoi en cours...
              </h3>
              <p className="text-gray-600 mb-6">
                {Math.round((sendingProgress / 100) * recipientCount)} /{' '}
                {recipientCount} emails envoyés
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${sendingProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {step === 'sent' && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-6 bg-emerald-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Emails envoyés avec succès !
              </h3>
              <p className="text-gray-600 mb-6">
                {recipientCount} email
                {recipientCount > 1 ? 's ont été envoyés' : ' a été envoyé'} aux
                influenceurs de votre liste.
              </p>
              <p className="text-sm text-gray-500">
                Vous pouvez suivre les réponses dans la section Communications.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          {step === 'compose' && (
            <>
              <div className="text-sm text-gray-600">
                {recipientCount} destinataire{recipientCount > 1 ? 's' : ''}
              </div>
              <div className="flex space-x-3">
                <Button variant="secondary" onClick={handleClose}>
                  Annuler
                </Button>
                <Button
                  onClick={handleSend}
                  disabled={!subject.trim() || !body.trim() || recipientCount === 0}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  {scheduleEmail ? 'Programmer' : 'Envoyer'} ({recipientCount})
                </Button>
              </div>
            </>
          )}

          {step === 'sent' && (
            <div className="flex justify-end w-full">
              <Button onClick={handleClose}>Fermer</Button>
            </div>
          )}
        </div>
      </div>

      {/* Panneau de sélection avancée */}
      <ContactSelectionPanel
        isOpen={showSelectionPanel}
        onClose={handleCloseSelectionPanel}
        contacts={influencers}
        selectedContacts={internalSelectedContacts}
        onSelectionChange={handleSelectionChange}
      />
    </div>
  );
}
