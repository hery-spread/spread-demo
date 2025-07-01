'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
  XMarkIcon,
  EnvelopeIcon,
  PaperClipIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';
import { InfluencerList } from '@/types';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  list: InfluencerList;
  onSend: (emailData: EmailData) => Promise<void>;
}

interface EmailData {
  subject: string;
  message: string;
  template: string;
  includeContactName: boolean;
  attachments: File[];
  sendTime: 'now' | 'scheduled';
  scheduledDate?: string;
  scheduledTime?: string;
}

const emailTemplates = [
  {
    id: 'collaboration',
    name: 'Proposition de collaboration',
    subject: 'Opportunité de collaboration - {nom_entreprise}',
    message: `Bonjour {nom_contact},

J&apos;espère que ce message vous trouve en bonne santé. Je vous contacte car votre contenu sur {plateforme} m&apos;a particulièrement impressionné, notamment votre approche authentique et votre engagement avec votre communauté.

Notre équipe chez {nom_entreprise} travaille actuellement sur {projet/campagne} qui correspondrait parfaitement à votre ligne éditoriale et à vos valeurs.

Seriez-vous intéressé(e) par une collaboration ? Je serais ravi(e) de vous présenter les détails de ce partenariat lors d&apos;un appel de 15 minutes à votre convenance.

Dans l&apos;attente de votre retour,

Cordialement,
{votre_nom}
{votre_titre}
{nom_entreprise}`,
  },
  {
    id: 'event',
    name: 'Invitation événement',
    subject: 'Invitation exclusive - {nom_evenement}',
    message: `Bonjour {nom_contact},

Nous avons le plaisir de vous inviter à {nom_evenement}, qui se déroulera le {date_evenement} à {lieu_evenement}.

Cet événement réunira {description_evenement}. Votre présence serait un honneur pour nous, et nous pensons que cette opportunité pourrait être mutuellement bénéfique.

Merci de nous confirmer votre présence avant le {date_limite}.

Cordialement,
{votre_nom}`,
  },
  {
    id: 'product',
    name: 'Lancement de produit',
    subject: 'Découvrez en avant-première : {nom_produit}',
    message: `Bonjour {nom_contact},

Nous avons le plaisir de vous présenter en avant-première notre nouveau produit : {nom_produit}.

{description_produit}

Nous serions ravis de vous envoyer un échantillon gratuit pour que vous puissiez le découvrir et partager votre avis authentique avec votre communauté.

Êtes-vous intéressé(e) ?

Cordialement,
{votre_nom}`,
  },
];

export default function EmailModal({
  isOpen,
  onClose,
  list,
  onSend,
}: EmailModalProps) {
  const [emailData, setEmailData] = useState<EmailData>({
    subject: '',
    message: '',
    template: '',
    includeContactName: true,
    attachments: [],
    sendTime: 'now',
  });
  const [sending, setSending] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  if (!isOpen) return null;

  const validEmails = list.influencers.filter(
    (inf) => inf.contactEmail && inf.contactEmail.trim() !== ''
  );

  const handleTemplateSelect = (templateId: string) => {
    const template = emailTemplates.find((t) => t.id === templateId);
    if (template) {
      setEmailData((prev) => ({
        ...prev,
        template: templateId,
        subject: template.subject,
        message: template.message,
      }));
    }
  };

  const handleSend = async () => {
    setSending(true);
    try {
      await onSend(emailData);
      onClose();
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
    } finally {
      setSending(false);
    }
  };

  const previewMessage = emailData.message
    .replace(/\{nom_contact\}/g, 'John Doe')
    .replace(/\{plateforme\}/g, 'Instagram')
    .replace(/\{nom_entreprise\}/g, 'Mon Entreprise')
    .replace(/\{votre_nom\}/g, 'Votre Nom');

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Envoyer un email groupé
            </h3>
            <p className="text-sm text-gray-600">
              {list.name} • {validEmails.length} destinataire
              {validEmails.length > 1 ? 's' : ''} avec email valide
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="flex">
          {/* Main content */}
          <div className="flex-1 p-6 space-y-6">
            {/* Template selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Modèle d&apos;email
              </label>
              <div className="grid grid-cols-1 gap-3">
                <button
                  onClick={() => {
                    setEmailData((prev) => ({
                      ...prev,
                      template: '',
                      subject: '',
                      message: '',
                    }));
                  }}
                  className={`p-3 text-left border rounded-lg transition-colors ${
                    emailData.template === ''
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="font-medium">Email personnalisé</div>
                  <div className="text-xs text-gray-500">
                    Créez votre propre message
                  </div>
                </button>
                {emailTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleTemplateSelect(template.id)}
                    className={`p-3 text-left border rounded-lg transition-colors ${
                      emailData.template === template.id
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="font-medium">{template.name}</div>
                    <div className="text-xs text-gray-500">
                      {template.subject}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Objet de l&apos;email
              </label>
              <input
                type="text"
                value={emailData.subject}
                onChange={(e) =>
                  setEmailData((prev) => ({ ...prev, subject: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Entrez l'objet de votre email..."
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                value={emailData.message}
                onChange={(e) =>
                  setEmailData((prev) => ({ ...prev, message: e.target.value }))
                }
                rows={12}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Rédigez votre message..."
              />
              <div className="mt-2 text-xs text-gray-500">
                Variables disponibles : {'{nom_contact}'}, {'{plateforme}'},{' '}
                {'{nom_entreprise}'}, {'{votre_nom}'}
              </div>
            </div>

            {/* Options */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="includeContactName"
                  checked={emailData.includeContactName}
                  onChange={(e) =>
                    setEmailData((prev) => ({
                      ...prev,
                      includeContactName: e.target.checked,
                    }))
                  }
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <label
                  htmlFor="includeContactName"
                  className="text-sm text-gray-700"
                >
                  Personnaliser avec le nom du contact
                </label>
              </div>

              {/* Scheduling */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Envoi
                </label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="sendTime"
                      value="now"
                      checked={emailData.sendTime === 'now'}
                      onChange={(e) =>
                        setEmailData((prev) => ({
                          ...prev,
                          sendTime: e.target.value as 'now' | 'scheduled',
                        }))
                      }
                      className="text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">
                      Envoyer maintenant
                    </span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="sendTime"
                      value="scheduled"
                      checked={emailData.sendTime === 'scheduled'}
                      onChange={(e) =>
                        setEmailData((prev) => ({
                          ...prev,
                          sendTime: e.target.value as 'now' | 'scheduled',
                        }))
                      }
                      className="text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">
                      Programmer l&apos;envoi
                    </span>
                  </label>
                </div>

                {emailData.sendTime === 'scheduled' && (
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        value={emailData.scheduledDate || ''}
                        onChange={(e) =>
                          setEmailData((prev) => ({
                            ...prev,
                            scheduledDate: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Heure
                      </label>
                      <input
                        type="time"
                        value={emailData.scheduledTime || ''}
                        onChange={(e) =>
                          setEmailData((prev) => ({
                            ...prev,
                            scheduledTime: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Attachments */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pièces jointes
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <PaperClipIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    Glissez vos fichiers ici ou{' '}
                    <button className="text-purple-600 hover:text-purple-700">
                      parcourez
                    </button>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PDF, DOC, PNG, JPG jusqu&apos;à 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Preview */}
          <div className="w-80 border-l border-gray-200 bg-gray-50">
            <div className="p-4 border-b border-gray-200">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center space-x-2 text-sm font-medium text-gray-700"
              >
                <EyeIcon className="w-4 h-4" />
                <span>Aperçu</span>
              </button>
            </div>

            {showPreview && (
              <div className="p-4 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    De:
                  </label>
                  <p className="text-sm text-gray-600">
                    votre-email@entreprise.com
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    À:
                  </label>
                  <p className="text-sm text-gray-600">
                    {validEmails.length} destinataire
                    {validEmails.length > 1 ? 's' : ''}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Objet:
                  </label>
                  <p className="text-sm text-gray-600">
                    {emailData.subject || 'Aucun objet'}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Message:
                  </label>
                  <div className="bg-white border border-gray-200 rounded p-3 text-xs text-gray-600 max-h-60 overflow-y-auto">
                    {previewMessage ? (
                      <pre className="whitespace-pre-wrap font-sans">
                        {previewMessage}
                      </pre>
                    ) : (
                      <span className="text-gray-400">
                        Aucun message à prévisualiser
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Recipients list */}
            <div className="p-4 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Destinataires ({validEmails.length})
              </h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {validEmails.slice(0, 5).map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center space-x-2 text-xs"
                  >
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-medium">
                        {contact.contactName?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900 truncate">
                        {contact.contactName}
                      </p>
                      <p className="text-gray-500 truncate">
                        {contact.contactEmail}
                      </p>
                    </div>
                  </div>
                ))}
                {validEmails.length > 5 && (
                  <p className="text-xs text-gray-500 text-center py-2">
                    et {validEmails.length - 5} autres...
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            {validEmails.length} email{validEmails.length > 1 ? 's' : ''} à
            envoyer
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button
              onClick={handleSend}
              disabled={
                sending ||
                !emailData.subject ||
                !emailData.message ||
                validEmails.length === 0
              }
            >
              <EnvelopeIcon className="w-4 h-4 mr-2" />
              {sending
                ? 'Envoi en cours...'
                : emailData.sendTime === 'scheduled'
                  ? 'Programmer'
                  : 'Envoyer'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
