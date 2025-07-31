'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import {
  XMarkIcon,
  PaperAirplaneIcon,
  UserGroupIcon,
  UserIcon,
  DocumentTextIcon,
  ClockIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';
import {
  CommunicationModalProps,
  CommunicationContact,
} from '@/types/communication';
import { useCommunication } from '@/contexts/CommunicationContext';

interface UnifiedEmailModalProps extends CommunicationModalProps {
  className?: string;
}

export default function UnifiedEmailModal({
  isOpen,
  onClose,
  mode = 'single',
  contacts = [],
  templateId,
  onSent,
}: UnifiedEmailModalProps) {
  const [formData, setFormData] = useState({
    subject: '',
    content: '',
    templateId: templateId || '',
    scheduledAt: '',
    fromName: 'Marie - Agence Créative',
    fromEmail: 'marie.marketing@agence-creative.com',
  });
  const [selectedContacts, setSelectedContacts] =
    useState<CommunicationContact[]>(contacts);
  const [loading, setLoading] = useState(false);
  // const [previewMode, setPreviewMode] = useState(false);
  const [step, setStep] = useState<'compose' | 'preview' | 'schedule'>(
    'compose'
  );

  const { templates, createThread } = useCommunication();

  useEffect(() => {
    if (templateId && templates.length > 0) {
      const template = templates.find((t) => t.id === templateId);
      if (template) {
        setFormData((prev) => ({
          ...prev,
          subject: template.subject,
          content: template.content,
          templateId: template.id,
        }));
      }
    }
  }, [templateId, templates]);

  useEffect(() => {
    setSelectedContacts(contacts);
  }, [contacts]);

  const handleTemplateChange = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setFormData((prev) => ({
        ...prev,
        subject: template.subject,
        content: template.content,
        templateId: template.id,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        templateId: '',
      }));
    }
  };

  const handleContactToggle = (contact: CommunicationContact) => {
    setSelectedContacts((prev) =>
      prev.find((c) => c.id === contact.id)
        ? prev.filter((c) => c.id !== contact.id)
        : [...prev, contact]
    );
  };

  const validateForm = () => {
    if (!formData.subject.trim()) return 'Le sujet est requis';
    if (!formData.content.trim()) return 'Le contenu est requis';
    if (selectedContacts.length === 0) return 'Au moins un contact est requis';
    return null;
  };

  const handleSend = async () => {
    const error = validateForm();
    if (error) {
      alert(error);
      return;
    }

    setLoading(true);
    try {
      let sent = 0;
      let failed = 0;

      for (const contact of selectedContacts) {
        try {
          if (mode === 'single' || mode === 'bulk') {
            // Créer une nouvelle conversation ou ajouter à une existante
            await createThread(contact, {
              subject: formData.subject,
              content: formData.content,
              channel: 'email',
            });
          }
          sent++;
        } catch {
          failed++;
        }
      }

      onSent?.({ sent, failed });
      onClose();
      resetForm();
    } catch {
      alert("Erreur lors de l'envoi des emails");
    } finally {
      setLoading(false);
    }
  };

  const handleSchedule = () => {
    // TODO: Implement scheduling logic
    console.log('Scheduling email for:', formData.scheduledAt);
    handleSend();
  };

  const resetForm = () => {
    setFormData({
      subject: '',
      content: '',
      templateId: '',
      scheduledAt: '',
      fromName: 'Marie - Agence Créative',
      fromEmail: 'marie.marketing@agence-creative.com',
    });
    setSelectedContacts([]);
    setStep('compose');
    // setPreviewMode(false);
  };

  const insertVariable = (variable: string) => {
    const textarea = document.querySelector(
      'textarea[name="content"]'
    ) as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const content = formData.content;
      const newContent =
        content.substring(0, start) +
        `{{${variable}}}` +
        content.substring(end);
      setFormData((prev) => ({ ...prev, content: newContent }));

      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(
          start + variable.length + 4,
          start + variable.length + 4
        );
      }, 0);
    }
  };

  const renderPersonalization = () => {
    const variables = ['prenom', 'nom', 'entreprise', 'poste', 'ville'];

    return (
      <div className="bg-gray-50 p-3 rounded-lg">
        <h4 className="text-sm font-medium text-gray-700 mb-2">
          Variables de personnalisation :
        </h4>
        <div className="flex flex-wrap gap-2">
          {variables.map((variable) => (
            <button
              key={variable}
              type="button"
              onClick={() => insertVariable(variable)}
              className="px-2 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-50"
            >
              {`{{${variable}}}`}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderContactSelection = () => {
    if (mode === 'single') return null;

    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Destinataires ({selectedContacts.length})
        </label>
        <div className="max-h-32 overflow-y-auto border border-gray-300 rounded-lg p-2">
          {contacts.map((contact) => (
            <label
              key={contact.id}
              className="flex items-center space-x-2 p-1 hover:bg-gray-50 rounded"
            >
              <input
                type="checkbox"
                checked={selectedContacts.some((c) => c.id === contact.id)}
                onChange={() => handleContactToggle(contact)}
                className="rounded border-gray-300"
              />
              <span className="text-sm">{contact.name}</span>
              {contact.email && (
                <span className="text-xs text-gray-500">({contact.email})</span>
              )}
            </label>
          ))}
        </div>
      </div>
    );
  };

  const renderPreview = () => {
    const sampleContact = selectedContacts[0];
    const previewContent = formData.content
      .replace(/\{\{prenom\}\}/g, sampleContact?.name?.split(' ')[0] || 'John')
      .replace(/\{\{nom\}\}/g, sampleContact?.name?.split(' ')[1] || 'Doe')
      .replace(
        /\{\{entreprise\}\}/g,
        sampleContact?.company || 'Entreprise Example'
      )
      .replace(/\{\{poste\}\}/g, 'Influenceur')
      .replace(/\{\{ville\}\}/g, 'Paris');

    return (
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">
            Aperçu de l&apos;email
          </h4>
          <div className="bg-white border rounded p-3 space-y-2">
            <div className="text-xs text-gray-500">
              De: {formData.fromName} &lt;{formData.fromEmail}&gt;
            </div>
            <div className="text-xs text-gray-500">
              À: {sampleContact?.name} &lt;{sampleContact?.email}&gt;
            </div>
            <div className="font-medium">{formData.subject}</div>
            <div className="border-t pt-2 text-sm whitespace-pre-wrap">
              {previewContent}
            </div>
          </div>
        </div>

        {mode === 'bulk' && (
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="text-sm text-blue-800">
              Cet email sera envoyé à{' '}
              <strong>
                {selectedContacts.length} contact
                {selectedContacts.length > 1 ? 's' : ''}
              </strong>{' '}
              avec personnalisation automatique.
            </div>
          </div>
        )}
      </div>
    );
  };

  const getModalTitle = () => {
    switch (mode) {
      case 'single':
        return 'Envoyer un email';
      case 'bulk':
        return 'Envoi en masse';
      case 'campaign':
        return 'Créer une campagne';
      default:
        return 'Email';
    }
  };

  const getModalIcon = () => {
    switch (mode) {
      case 'single':
        return UserIcon;
      case 'bulk':
        return UserGroupIcon;
      case 'campaign':
        return DocumentTextIcon;
      default:
        return PaperAirplaneIcon;
    }
  };

  if (!isOpen) return null;

  const ModalIcon = getModalIcon();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <ModalIcon className="w-6 h-6 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              {getModalTitle()}
            </h3>
          </div>

          <div className="flex items-center space-x-2">
            {step === 'compose' && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setStep('preview')}
                  disabled={!formData.subject || !formData.content}
                >
                  <EyeIcon className="w-4 h-4 mr-1" />
                  Aperçu
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setStep('schedule')}
                  disabled={!formData.subject || !formData.content}
                >
                  <ClockIcon className="w-4 h-4 mr-1" />
                  Programmer
                </Button>
              </>
            )}

            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Steps indicator */}
        <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
          <div className="flex space-x-8">
            <button
              onClick={() => setStep('compose')}
              className={`text-sm font-medium ${
                step === 'compose'
                  ? 'text-purple-600 border-b-2 border-purple-600 pb-1'
                  : 'text-gray-500'
              }`}
            >
              1. Composer
            </button>
            <button
              onClick={() => setStep('preview')}
              disabled={!formData.subject || !formData.content}
              className={`text-sm font-medium ${
                step === 'preview'
                  ? 'text-purple-600 border-b-2 border-purple-600 pb-1'
                  : 'text-gray-500'
              }`}
            >
              2. Aperçu
            </button>
            <button
              onClick={() => setStep('schedule')}
              disabled={!formData.subject || !formData.content}
              className={`text-sm font-medium ${
                step === 'schedule'
                  ? 'text-purple-600 border-b-2 border-purple-600 pb-1'
                  : 'text-gray-500'
              }`}
            >
              3. Programmation
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === 'compose' && (
            <div className="space-y-4">
              {/* Template selection */}
              {templates.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Modèle (optionnel)
                  </label>
                  <Select
                    value={formData.templateId}
                    onChange={(e) => handleTemplateChange(e.target.value)}
                    options={[
                      { value: '', label: 'Créer un nouveau message' },
                      ...templates.map((template) => ({
                        value: template.id,
                        label: template.name,
                      })),
                    ]}
                  />
                </div>
              )}

              {/* Contact selection for bulk mode */}
              {renderContactSelection()}

              {/* From information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom expéditeur
                  </label>
                  <Input
                    value={formData.fromName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        fromName: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email expéditeur
                  </label>
                  <Input
                    type="email"
                    value={formData.fromEmail}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        fromEmail: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sujet *
                </label>
                <Input
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      subject: e.target.value,
                    }))
                  }
                  placeholder="Sujet de votre email..."
                  required
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      content: e.target.value,
                    }))
                  }
                  placeholder="Rédigez votre message..."
                  rows={12}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
                  required
                />
              </div>

              {/* Personalization */}
              {mode === 'bulk' && renderPersonalization()}
            </div>
          )}

          {step === 'preview' && renderPreview()}

          {step === 'schedule' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date et heure d&apos;envoi
                </label>
                <Input
                  type="datetime-local"
                  value={formData.scheduledAt}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      scheduledAt: e.target.value,
                    }))
                  }
                />
                <p className="text-xs text-gray-500 mt-1">
                  Laissez vide pour envoyer immédiatement
                </p>
              </div>

              <div className="bg-yellow-50 p-3 rounded-lg">
                <p className="text-sm text-yellow-800">
                  💡 <strong>Conseil :</strong> Les meilleurs moments pour
                  envoyer des emails sont généralement entre 10h-11h et 14h-15h
                  en semaine.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {mode === 'bulk' && selectedContacts.length > 0 && (
              <span>
                {selectedContacts.length} destinataire
                {selectedContacts.length > 1 ? 's' : ''}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={onClose} disabled={loading}>
              Annuler
            </Button>

            {step === 'compose' && (
              <Button onClick={handleSend} disabled={loading}>
                {loading ? (
                  'Envoi...'
                ) : (
                  <>
                    <PaperAirplaneIcon className="w-4 h-4 mr-2" />
                    Envoyer
                  </>
                )}
              </Button>
            )}

            {step === 'preview' && (
              <Button onClick={() => setStep('compose')}>
                Retour à l&apos;édition
              </Button>
            )}

            {step === 'schedule' && (
              <Button onClick={handleSchedule} disabled={loading}>
                {loading
                  ? 'Programmation...'
                  : formData.scheduledAt
                    ? 'Programmer l&apos;envoi'
                    : 'Envoyer maintenant'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
