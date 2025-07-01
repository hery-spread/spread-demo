# PLAN D'ACTION PRESCRIPTIF : LISTS-05

**User Story :** En tant qu'utilisateur, je veux exporter mes listes en CSV et envoyer des emails groupés pour faciliter mes campagnes de communication.

**Objectif :** Créer les fonctionnalités d'export CSV avancé et d'envoi d'emails groupés.

---

## Plan d'Action Prescriptif

### Étape 1 : Créer le composant ExportModal

Créer `src/components/lists/ExportModal.tsx` :

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  XMarkIcon,
  DocumentArrowDownIcon,
  Cog6ToothIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { InfluencerList } from "@/types";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  list: InfluencerList;
  onExport: (options: ExportOptions) => Promise<void>;
}

interface ExportOptions {
  format: "csv" | "xlsx" | "json";
  fields: string[];
  includeHeaders: boolean;
  separator: string;
  encoding: string;
  filterEmptyEmails: boolean;
}

const availableFields = [
  { key: "contactName", label: "Nom du contact", required: true },
  { key: "contactEmail", label: "Email", required: false },
  { key: "id", label: "ID Influenceur", required: false },
  { key: "platform", label: "Plateforme", required: false },
  { key: "followers", label: "Nombre de followers", required: false },
  { key: "engagementRate", label: "Taux d'engagement", required: false },
  { key: "country", label: "Pays", required: false },
  { key: "category", label: "Catégorie de la liste", required: false },
  { key: "addedDate", label: "Date d'ajout", required: false },
];

export default function ExportModal({
  isOpen,
  onClose,
  list,
  onExport,
}: ExportModalProps) {
  const [options, setOptions] = useState<ExportOptions>({
    format: "csv",
    fields: ["contactName", "contactEmail"],
    includeHeaders: true,
    separator: ",",
    encoding: "UTF-8",
    filterEmptyEmails: false,
  });
  const [exporting, setExporting] = useState(false);

  if (!isOpen) return null;

  const handleFieldToggle = (fieldKey: string) => {
    const field = availableFields.find((f) => f.key === fieldKey);
    if (field?.required) return; // Ne pas permettre de désélectionner les champs requis

    setOptions((prev) => ({
      ...prev,
      fields: prev.fields.includes(fieldKey)
        ? prev.fields.filter((f) => f !== fieldKey)
        : [...prev.fields, fieldKey],
    }));
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      await onExport(options);
      onClose();
    } catch (error) {
      console.error("Erreur lors de l'export:", error);
    } finally {
      setExporting(false);
    }
  };

  const previewData = list.influencers.slice(0, 3).map((influencer) => {
    const row: Record<string, string> = {};
    options.fields.forEach((field) => {
      switch (field) {
        case "contactName":
          row[field] = influencer.contactName || "";
          break;
        case "contactEmail":
          row[field] = influencer.contactEmail || "";
          break;
        case "id":
          row[field] = influencer.id;
          break;
        case "category":
          row[field] = list.category;
          break;
        case "addedDate":
          row[field] = list.createdAt;
          break;
        default:
          row[field] = "";
      }
    });
    return row;
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Exporter la liste
            </h3>
            <p className="text-sm text-gray-600">
              {list.name} • {list.influencers.length} contact
              {list.influencers.length > 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Format d'export */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Format d'export
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "csv", label: "CSV", desc: "Compatible Excel" },
                { value: "xlsx", label: "Excel", desc: "Format natif" },
                { value: "json", label: "JSON", desc: "Pour développeurs" },
              ].map((format) => (
                <button
                  key={format.value}
                  onClick={() =>
                    setOptions((prev) => ({
                      ...prev,
                      format: format.value as any,
                    }))
                  }
                  className={`p-3 text-left border rounded-lg transition-colors ${
                    options.format === format.value
                      ? "border-purple-500 bg-purple-50 text-purple-700"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <div className="font-medium">{format.label}</div>
                  <div className="text-xs text-gray-500">{format.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Champs à exporter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Champs à inclure
            </label>
            <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3">
              {availableFields.map((field) => (
                <label key={field.key} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={options.fields.includes(field.key)}
                    onChange={() => handleFieldToggle(field.key)}
                    disabled={field.required}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span
                    className={`text-sm ${field.required ? "font-medium" : ""}`}
                  >
                    {field.label}
                    {field.required && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Options avancées */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Cog6ToothIcon className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">
                Options avancées
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Séparateur */}
              {options.format === "csv" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Séparateur
                  </label>
                  <select
                    value={options.separator}
                    onChange={(e) =>
                      setOptions((prev) => ({
                        ...prev,
                        separator: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value=",">Virgule (,)</option>
                    <option value=";">Point-virgule (;)</option>
                    <option value="\t">Tabulation</option>
                  </select>
                </div>
              )}

              {/* Encodage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Encodage
                </label>
                <select
                  value={options.encoding}
                  onChange={(e) =>
                    setOptions((prev) => ({
                      ...prev,
                      encoding: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="UTF-8">UTF-8</option>
                  <option value="ISO-8859-1">ISO-8859-1</option>
                  <option value="Windows-1252">Windows-1252</option>
                </select>
              </div>
            </div>

            {/* Cases à cocher */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={options.includeHeaders}
                  onChange={(e) =>
                    setOptions((prev) => ({
                      ...prev,
                      includeHeaders: e.target.checked,
                    }))
                  }
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm">
                  Inclure les en-têtes de colonnes
                </span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={options.filterEmptyEmails}
                  onChange={(e) =>
                    setOptions((prev) => ({
                      ...prev,
                      filterEmptyEmails: e.target.checked,
                    }))
                  }
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm">Exclure les contacts sans email</span>
              </label>
            </div>
          </div>

          {/* Aperçu */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Aperçu (3 premiers contacts)
            </label>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  {options.includeHeaders && (
                    <thead className="bg-gray-50">
                      <tr>
                        {options.fields.map((field) => {
                          const fieldInfo = availableFields.find(
                            (f) => f.key === field
                          );
                          return (
                            <th
                              key={field}
                              className="px-3 py-2 text-left font-medium text-gray-700"
                            >
                              {fieldInfo?.label}
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                  )}
                  <tbody>
                    {previewData.map((row, index) => (
                      <tr key={index} className="border-t border-gray-100">
                        {options.fields.map((field) => (
                          <td key={field} className="px-3 py-2 text-gray-600">
                            {row[field] || "-"}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            {options.filterEmptyEmails
              ? `${
                  list.influencers.filter((inf) => inf.contactEmail).length
                } contacts avec email`
              : `${list.influencers.length} contacts total`}
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={onClose} disabled={exporting}>
              Annuler
            </Button>
            <Button
              onClick={handleExport}
              disabled={exporting || options.fields.length === 0}
            >
              <DocumentArrowDownIcon className="w-4 h-4 mr-2" />
              {exporting ? "Export en cours..." : "Exporter"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Étape 2 : Créer le composant EmailCampaignModal

Créer `src/components/lists/EmailCampaignModal.tsx` :

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  XMarkIcon,
  PaperAirplaneIcon,
  EyeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { InfluencerList } from "@/types";

interface EmailCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  list: InfluencerList;
  onSend: (campaign: EmailCampaign) => Promise<void>;
}

interface EmailCampaign {
  subject: string;
  message: string;
  senderName: string;
  senderEmail: string;
  recipients: string[];
  scheduledDate?: string;
}

const emailTemplates = [
  {
    id: "collaboration",
    name: "Demande de collaboration",
    subject: "Opportunité de collaboration - {BRAND_NAME}",
    message: `Bonjour {INFLUENCER_NAME},

J'espère que vous allez bien. Je vous contacte au nom de {BRAND_NAME} pour vous proposer une collaboration qui pourrait vous intéresser.

Nous avons remarqué votre contenu de qualité et pensons que votre audience serait parfaitement alignée avec nos valeurs et produits.

Seriez-vous disponible pour une discussion plus approfondie ?

Cordialement,
{SENDER_NAME}`,
  },
  {
    id: "event",
    name: "Invitation événement",
    subject: "Invitation exclusive - Événement {BRAND_NAME}",
    message: `Bonjour {INFLUENCER_NAME},

Nous avons le plaisir de vous inviter à notre événement exclusif qui aura lieu le {EVENT_DATE}.

Cet événement sera l'occasion de découvrir nos nouveautés et de rencontrer d'autres créateurs de contenu.

Merci de confirmer votre présence avant le {RSVP_DATE}.

À très bientôt,
{SENDER_NAME}`,
  },
  {
    id: "product",
    name: "Envoi de produits",
    subject: "Découvrez nos nouveaux produits",
    message: `Bonjour {INFLUENCER_NAME},

Nous aimerions vous faire découvrir notre nouvelle collection et vous envoyer quelques produits qui pourraient vous plaire.

Aucune obligation de publication, c'est simplement pour vous faire plaisir et avoir vos retours.

Pouvez-vous nous confirmer votre adresse de livraison ?

Bien à vous,
{SENDER_NAME}`,
  },
];

export default function EmailCampaignModal({
  isOpen,
  onClose,
  list,
  onSend,
}: EmailCampaignModalProps) {
  const [campaign, setCampaign] = useState<EmailCampaign>({
    subject: "",
    message: "",
    senderName: "",
    senderEmail: "",
    recipients: list.influencers
      .filter((inf) => inf.contactEmail)
      .map((inf) => inf.contactEmail!),
  });
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [sending, setSending] = useState(false);

  if (!isOpen) return null;

  const contactsWithEmail = list.influencers.filter((inf) => inf.contactEmail);

  const applyTemplate = (templateId: string) => {
    const template = emailTemplates.find((t) => t.id === templateId);
    if (template) {
      setCampaign((prev) => ({
        ...prev,
        subject: template.subject,
        message: template.message,
      }));
      setSelectedTemplate(templateId);
    }
  };

  const previewMessage = (message: string, influencerName: string) => {
    return message
      .replace(/\{INFLUENCER_NAME\}/g, influencerName)
      .replace(/\{BRAND_NAME\}/g, "Votre Marque")
      .replace(/\{SENDER_NAME\}/g, campaign.senderName || "Votre Nom")
      .replace(/\{EVENT_DATE\}/g, "15 juillet 2024")
      .replace(/\{RSVP_DATE\}/g, "10 juillet 2024");
  };

  const handleSend = async () => {
    setSending(true);
    try {
      await onSend(campaign);
      onClose();
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
    } finally {
      setSending(false);
    }
  };

  const isFormValid =
    campaign.subject.trim() &&
    campaign.message.trim() &&
    campaign.senderName.trim() &&
    campaign.senderEmail.trim() &&
    campaign.recipients.length > 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Campagne email
            </h3>
            <p className="text-sm text-gray-600">
              {list.name} • {contactsWithEmail.length} destinataire
              {contactsWithEmail.length > 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Formulaire principal */}
            <div className="lg:col-span-2 space-y-6">
              {/* Templates */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Modèles d'email
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {emailTemplates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => applyTemplate(template.id)}
                      className={`p-3 text-left border rounded-lg transition-colors ${
                        selectedTemplate === template.id
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <div className="font-medium text-sm">{template.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Expéditeur */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Votre nom
                  </label>
                  <Input
                    type="text"
                    value={campaign.senderName}
                    onChange={(e) =>
                      setCampaign((prev) => ({
                        ...prev,
                        senderName: e.target.value,
                      }))
                    }
                    placeholder="Ex: Marie Dupont"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Votre email
                  </label>
                  <Input
                    type="email"
                    value={campaign.senderEmail}
                    onChange={(e) =>
                      setCampaign((prev) => ({
                        ...prev,
                        senderEmail: e.target.value,
                      }))
                    }
                    placeholder="Ex: marie@monentreprise.com"
                  />
                </div>
              </div>

              {/* Sujet */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sujet de l'email
                </label>
                <Input
                  type="text"
                  value={campaign.subject}
                  onChange={(e) =>
                    setCampaign((prev) => ({
                      ...prev,
                      subject: e.target.value,
                    }))
                  }
                  placeholder="Ex: Opportunité de collaboration"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  value={campaign.message}
                  onChange={(e) =>
                    setCampaign((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  rows={12}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
                  placeholder="Rédigez votre message..."
                />
                <div className="mt-2 text-xs text-gray-500">
                  Variables disponibles : {"{INFLUENCER_NAME}"},{" "}
                  {"{BRAND_NAME}"}, {"{SENDER_NAME}"}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Destinataires */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <UserGroupIcon className="w-5 h-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">
                    Destinataires
                  </span>
                </div>

                <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3">
                  {contactsWithEmail.map((contact) => (
                    <label
                      key={contact.id}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={campaign.recipients.includes(
                          contact.contactEmail!
                        )}
                        onChange={(e) => {
                          const email = contact.contactEmail!;
                          setCampaign((prev) => ({
                            ...prev,
                            recipients: e.target.checked
                              ? [...prev.recipients, email]
                              : prev.recipients.filter((r) => r !== email),
                          }));
                        }}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {contact.contactName}
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                          {contact.contactEmail}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="mt-2 text-xs text-gray-500">
                  {campaign.recipients.length} destinataire
                  {campaign.recipients.length > 1 ? "s" : ""} sélectionné
                  {campaign.recipients.length > 1 ? "s" : ""}
                </div>
              </div>

              {/* Aperçu */}
              <div>
                <Button
                  variant="outline"
                  onClick={() => setShowPreview(!showPreview)}
                  className="w-full"
                >
                  <EyeIcon className="w-4 h-4 mr-2" />
                  {showPreview ? "Masquer" : "Aperçu"}
                </Button>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button
                  onClick={handleSend}
                  disabled={!isFormValid || sending}
                  className="w-full"
                >
                  <PaperAirplaneIcon className="w-4 h-4 mr-2" />
                  {sending ? "Envoi en cours..." : "Envoyer maintenant"}
                </Button>

                <Button
                  variant="outline"
                  onClick={onClose}
                  className="w-full"
                  disabled={sending}
                >
                  Annuler
                </Button>
              </div>
            </div>
          </div>

          {/* Aperçu du message */}
          {showPreview && contactsWithEmail.length > 0 && (
            <div className="mt-6 border-t border-gray-200 pt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Aperçu pour {contactsWithEmail[0].contactName}
              </h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm mb-2">
                  <strong>Sujet :</strong>{" "}
                  {campaign.subject.replace(
                    /\{INFLUENCER_NAME\}/g,
                    contactsWithEmail[0].contactName || ""
                  )}
                </div>
                <div className="text-sm whitespace-pre-wrap">
                  {previewMessage(
                    campaign.message,
                    contactsWithEmail[0].contactName || ""
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

### Étape 3 : Étendre les fonctions d'export

Ajouter dans `src/lib/mockData.ts` :

```tsx
// Fonctions d'export avancées
export function exportListWithOptions(
  listId: string,
  options: any
): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const list = mockLists.find((l) => l.id === listId);
      if (!list) {
        throw new Error("Liste non trouvée");
      }

      let contacts = list.influencers;

      // Filtrer les contacts sans email si demandé
      if (options.filterEmptyEmails) {
        contacts = contacts.filter((contact) => contact.contactEmail);
      }

      // Construire les données selon les champs sélectionnés
      const data = contacts.map((contact) => {
        const row: Record<string, string> = {};

        options.fields.forEach((field: string) => {
          switch (field) {
            case "contactName":
              row[field] = contact.contactName || "";
              break;
            case "contactEmail":
              row[field] = contact.contactEmail || "";
              break;
            case "id":
              row[field] = contact.id;
              break;
            case "category":
              row[field] = list.category;
              break;
            case "addedDate":
              row[field] = list.createdAt;
              break;
            default:
              row[field] = "";
          }
        });

        return row;
      });

      // Générer le contenu selon le format
      let content = "";

      if (options.format === "csv") {
        const headers = options.fields.map((field: string) => {
          const fieldInfo = [
            { key: "contactName", label: "Nom du contact" },
            { key: "contactEmail", label: "Email" },
            { key: "id", label: "ID Influenceur" },
            { key: "category", label: "Catégorie" },
            { key: "addedDate", label: "Date d'ajout" },
          ].find((f) => f.key === field);
          return fieldInfo?.label || field;
        });

        if (options.includeHeaders) {
          content += headers.join(options.separator) + "\n";
        }

        data.forEach((row) => {
          const values = options.fields.map((field: string) => {
            const value = row[field] || "";
            // Échapper les guillemets et entourer de guillemets si nécessaire
            if (
              value.includes(options.separator) ||
              value.includes('"') ||
              value.includes("\n")
            ) {
              return '"' + value.replace(/"/g, '""') + '"';
            }
            return value;
          });
          content += values.join(options.separator) + "\n";
        });
      } else if (options.format === "json") {
        content = JSON.stringify(data, null, 2);
      }

      resolve(content);
    }, 1000);
  });
}

export function sendEmailCampaign(campaign: any): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simuler l'envoi d'emails
      console.log("Envoi de campagne email:", {
        subject: campaign.subject,
        recipients: campaign.recipients.length,
        sender: campaign.senderEmail,
      });

      // Dans une vraie application, on utiliserait un service d'email comme SendGrid, Mailgun, etc.
      resolve(true);
    }, 2000);
  });
}

export function scheduleEmailCampaign(
  campaign: any,
  scheduledDate: string
): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Campagne programmée pour:", scheduledDate);
      resolve(true);
    }, 500);
  });
}
```

### Étape 4 : Vérifier l'installation

```bash
npm run lint
npm run build
```

---

## Checklist de Validation

- [ ] Étape 1 : Composant ExportModal créé avec options avancées
- [ ] Étape 2 : Composant EmailCampaignModal créé avec templates
- [ ] Étape 3 : Fonctions d'export et email étendues
- [ ] Étape 4 : Lint et build passent sans erreur
