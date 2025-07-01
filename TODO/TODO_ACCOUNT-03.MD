# PLAN D'ACTION PRESCRIPTIF : ACCOUNT-03

**User Story :** En tant qu'utilisateur, je veux consulter mon historique de facturation, télécharger mes factures et gérer mes informations de paiement.

**Objectif :** Créer les composants de gestion de facturation avec historique des paiements et téléchargement de factures.

---

## Plan d'Action Prescriptif

### Étape 1 : Créer le composant BillingHistory

Créer `src/components/account/BillingHistory.tsx` :

```tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import {
  DocumentArrowDownIcon,
  CreditCardIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

interface Invoice {
  id: string;
  date: string;
  amount: number;
  currency: string;
  status: "paid" | "pending" | "failed";
  planName: string;
  period: {
    start: string;
    end: string;
  };
  downloadUrl?: string;
}

interface BillingHistoryProps {
  onDownloadInvoice: (invoiceId: string) => Promise<void>;
}

const mockInvoices: Invoice[] = [
  {
    id: "inv_001",
    date: "2024-07-01",
    amount: 299,
    currency: "EUR",
    status: "paid",
    planName: "Plan Elite",
    period: {
      start: "2024-07-01",
      end: "2024-07-31",
    },
  },
  {
    id: "inv_002",
    date: "2024-06-01",
    amount: 299,
    currency: "EUR",
    status: "paid",
    planName: "Plan Elite",
    period: {
      start: "2024-06-01",
      end: "2024-06-30",
    },
  },
  {
    id: "inv_003",
    date: "2024-05-01",
    amount: 299,
    currency: "EUR",
    status: "paid",
    planName: "Plan Elite",
    period: {
      start: "2024-05-01",
      end: "2024-05-31",
    },
  },
  {
    id: "inv_004",
    date: "2024-04-01",
    amount: 149,
    currency: "EUR",
    status: "paid",
    planName: "Plan Pro",
    period: {
      start: "2024-04-01",
      end: "2024-04-30",
    },
  },
  {
    id: "inv_005",
    date: "2024-03-01",
    amount: 149,
    currency: "EUR",
    status: "paid",
    planName: "Plan Pro",
    period: {
      start: "2024-03-01",
      end: "2024-03-31",
    },
  },
];

export default function BillingHistory({
  onDownloadInvoice,
}: BillingHistoryProps) {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setInvoices(mockInvoices);
      setLoading(false);
    }, 500);
  }, []);

  const handleDownload = async (invoiceId: string) => {
    setDownloading(invoiceId);
    try {
      await onDownloadInvoice(invoiceId);
    } catch (error) {
      console.error("Erreur lors du téléchargement:", error);
    } finally {
      setDownloading(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const getStatusIcon = (status: Invoice["status"]) => {
    switch (status) {
      case "paid":
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case "pending":
        return <ClockIcon className="w-5 h-5 text-yellow-500" />;
      case "failed":
        return <ExclamationCircleIcon className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusText = (status: Invoice["status"]) => {
    switch (status) {
      case "paid":
        return "Payée";
      case "pending":
        return "En attente";
      case "failed":
        return "Échec";
    }
  };

  const getStatusColor = (status: Invoice["status"]) => {
    switch (status) {
      case "paid":
        return "text-green-700 bg-green-50 border-green-200";
      case "pending":
        return "text-yellow-700 bg-yellow-50 border-yellow-200";
      case "failed":
        return "text-red-700 bg-red-50 border-red-200";
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          Historique de facturation
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Consultez et téléchargez vos factures
        </p>
      </div>

      <div className="divide-y divide-gray-200">
        {invoices.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <CreditCardIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">
              Aucune facture
            </h4>
            <p className="text-gray-600">
              Vos factures apparaîtront ici une fois votre premier paiement
              effectué.
            </p>
          </div>
        ) : (
          invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {getStatusIcon(invoice.status)}
                </div>

                <div>
                  <div className="flex items-center space-x-3">
                    <h4 className="text-sm font-medium text-gray-900">
                      Facture #{invoice.id.replace("inv_", "")}
                    </h4>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                        invoice.status
                      )}`}
                    >
                      {getStatusText(invoice.status)}
                    </span>
                  </div>

                  <div className="mt-1 flex items-center space-x-4 text-sm text-gray-600">
                    <span>{formatDate(invoice.date)}</span>
                    <span>•</span>
                    <span>{invoice.planName}</span>
                    <span>•</span>
                    <span>
                      {formatDate(invoice.period.start)} -{" "}
                      {formatDate(invoice.period.end)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {formatAmount(invoice.amount, invoice.currency)}
                  </div>
                </div>

                {invoice.status === "paid" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(invoice.id)}
                    disabled={downloading === invoice.id}
                    className="flex items-center"
                  >
                    <DocumentArrowDownIcon className="w-4 h-4 mr-2" />
                    {downloading === invoice.id ? "Téléchargement..." : "PDF"}
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {invoices.length > 0 && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              Total des paiements : {invoices.length} factures
            </span>
            <span className="font-medium text-gray-900">
              {formatAmount(
                invoices.reduce((sum, inv) => sum + inv.amount, 0),
                "EUR"
              )}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
```

### Étape 2 : Créer le composant PaymentMethods

Créer `src/components/account/PaymentMethods.tsx` :

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  CreditCardIcon,
  PlusIcon,
  TrashIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

interface PaymentMethod {
  id: string;
  type: "card" | "sepa";
  last4: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
  holderName: string;
}

interface PaymentMethodsProps {
  onAddPaymentMethod: () => Promise<void>;
  onRemovePaymentMethod: (id: string) => Promise<void>;
  onSetDefaultPaymentMethod: (id: string) => Promise<void>;
}

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: "pm_001",
    type: "card",
    last4: "4242",
    brand: "visa",
    expiryMonth: 12,
    expiryYear: 2027,
    isDefault: true,
    holderName: "Hugo Expandia",
  },
  {
    id: "pm_002",
    type: "card",
    last4: "0005",
    brand: "mastercard",
    expiryMonth: 8,
    expiryYear: 2026,
    isDefault: false,
    holderName: "Hugo Expandia",
  },
];

export default function PaymentMethods({
  onAddPaymentMethod,
  onRemovePaymentMethod,
  onSetDefaultPaymentMethod,
}: PaymentMethodsProps) {
  const [paymentMethods, setPaymentMethods] =
    useState<PaymentMethod[]>(mockPaymentMethods);
  const [loading, setLoading] = useState<string | null>(null);

  const handleSetDefault = async (id: string) => {
    setLoading(id);
    try {
      await onSetDefaultPaymentMethod(id);
      setPaymentMethods((prev) =>
        prev.map((pm) => ({ ...pm, isDefault: pm.id === id }))
      );
    } catch (error) {
      console.error("Erreur lors de la modification:", error);
    } finally {
      setLoading(null);
    }
  };

  const handleRemove = async (id: string) => {
    setLoading(id);
    try {
      await onRemovePaymentMethod(id);
      setPaymentMethods((prev) => prev.filter((pm) => pm.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    } finally {
      setLoading(null);
    }
  };

  const getBrandIcon = (brand?: string) => {
    switch (brand) {
      case "visa":
        return "💳";
      case "mastercard":
        return "💳";
      case "amex":
        return "💳";
      default:
        return "💳";
    }
  };

  const getBrandName = (brand?: string) => {
    switch (brand) {
      case "visa":
        return "Visa";
      case "mastercard":
        return "Mastercard";
      case "amex":
        return "American Express";
      default:
        return "Carte";
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Méthodes de paiement
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Gérez vos cartes de crédit et méthodes de paiement
          </p>
        </div>

        <Button
          onClick={onAddPaymentMethod}
          className="flex items-center"
          size="sm"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Ajouter une carte
        </Button>
      </div>

      <div className="divide-y divide-gray-200">
        {paymentMethods.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <CreditCardIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">
              Aucune méthode de paiement
            </h4>
            <p className="text-gray-600 mb-4">
              Ajoutez une carte de crédit pour gérer vos paiements.
            </p>
            <Button onClick={onAddPaymentMethod} className="flex items-center">
              <PlusIcon className="w-4 h-4 mr-2" />
              Ajouter une carte
            </Button>
          </div>
        ) : (
          paymentMethods.map((method) => (
            <div
              key={method.id}
              className="px-6 py-4 flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-lg">
                    {getBrandIcon(method.brand)}
                  </div>
                </div>

                <div>
                  <div className="flex items-center space-x-3">
                    <h4 className="text-sm font-medium text-gray-900">
                      {getBrandName(method.brand)} •••• {method.last4}
                    </h4>
                    {method.isDefault && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                        <CheckIcon className="w-3 h-3 mr-1" />
                        Par défaut
                      </span>
                    )}
                  </div>

                  <div className="mt-1 flex items-center space-x-4 text-sm text-gray-600">
                    <span>{method.holderName}</span>
                    {method.expiryMonth && method.expiryYear && (
                      <>
                        <span>•</span>
                        <span>
                          Expire{" "}
                          {method.expiryMonth.toString().padStart(2, "0")}/
                          {method.expiryYear}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {!method.isDefault && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSetDefault(method.id)}
                    disabled={loading === method.id}
                  >
                    {loading === method.id
                      ? "Modification..."
                      : "Définir par défaut"}
                  </Button>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemove(method.id)}
                  disabled={loading === method.id || method.isDefault}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                >
                  <TrashIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {paymentMethods.length > 0 && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-xs text-gray-600">
            💡 Vos informations de paiement sont sécurisées et chiffrées. Nous
            ne stockons jamais les détails complets de votre carte.
          </p>
        </div>
      )}
    </div>
  );
}
```

### Étape 3 : Créer le composant BillingAddress

Créer `src/components/account/BillingAddress.tsx` :

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  MapPinIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { UserAccount } from "@/types";

interface BillingAddressProps {
  account: UserAccount;
  onUpdate: (billingInfo: UserAccount["billingInfo"]) => Promise<void>;
}

export default function BillingAddress({
  account,
  onUpdate,
}: BillingAddressProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    company: account.billingInfo?.company || "",
    vatNumber: account.billingInfo?.vatNumber || "",
    street: account.billingInfo?.address?.street || "",
    city: account.billingInfo?.address?.city || "",
    postalCode: account.billingInfo?.address?.postalCode || "",
    country: account.billingInfo?.address?.country || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const billingInfo = {
        company: formData.company,
        vatNumber: formData.vatNumber,
        address: {
          street: formData.street,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
        },
      };

      await onUpdate(billingInfo);
      setIsEditing(false);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      company: account.billingInfo?.company || "",
      vatNumber: account.billingInfo?.vatNumber || "",
      street: account.billingInfo?.address?.street || "",
      city: account.billingInfo?.address?.city || "",
      postalCode: account.billingInfo?.address?.postalCode || "",
      country: account.billingInfo?.address?.country || "",
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Adresse de facturation
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Informations utilisées pour la facturation
          </p>
        </div>

        {!isEditing && (
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
            className="flex items-center"
            size="sm"
          >
            <PencilIcon className="w-4 h-4 mr-2" />
            Modifier
          </Button>
        )}
      </div>

      <div className="p-6">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Entreprise
                </label>
                <Input
                  value={formData.company}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      company: e.target.value,
                    }))
                  }
                  placeholder="Nom de l'entreprise"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Numéro de TVA
                </label>
                <Input
                  value={formData.vatNumber}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      vatNumber: e.target.value,
                    }))
                  }
                  placeholder="FR12345678901"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adresse
              </label>
              <Input
                value={formData.street}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, street: e.target.value }))
                }
                placeholder="123 Rue de la Paix"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ville
                </label>
                <Input
                  value={formData.city}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, city: e.target.value }))
                  }
                  placeholder="Paris"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Code postal
                </label>
                <Input
                  value={formData.postalCode}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      postalCode: e.target.value,
                    }))
                  }
                  placeholder="75001"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pays
                </label>
                <select
                  value={formData.country}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      country: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  required
                >
                  <option value="">Sélectionner un pays</option>
                  <option value="France">France</option>
                  <option value="Belgique">Belgique</option>
                  <option value="Suisse">Suisse</option>
                  <option value="Canada">Canada</option>
                  <option value="Maroc">Maroc</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={saving}
              >
                <XMarkIcon className="w-4 h-4 mr-2" />
                Annuler
              </Button>

              <Button type="submit" disabled={saving}>
                <CheckIcon className="w-4 h-4 mr-2" />
                {saving ? "Sauvegarde..." : "Sauvegarder"}
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            {account.billingInfo ? (
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <MapPinIcon className="w-5 h-5 text-gray-400 mt-1" />
                </div>

                <div className="flex-1">
                  {account.billingInfo.company && (
                    <div className="font-medium text-gray-900">
                      {account.billingInfo.company}
                    </div>
                  )}

                  {account.billingInfo.vatNumber && (
                    <div className="text-sm text-gray-600 mb-2">
                      TVA: {account.billingInfo.vatNumber}
                    </div>
                  )}

                  <div className="text-sm text-gray-600 space-y-1">
                    <div>{account.billingInfo.address.street}</div>
                    <div>
                      {account.billingInfo.address.postalCode}{" "}
                      {account.billingInfo.address.city}
                    </div>
                    <div>{account.billingInfo.address.country}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <MapPinIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">
                  Aucune adresse de facturation
                </h4>
                <p className="text-gray-600 mb-4">
                  Ajoutez votre adresse de facturation pour vos factures.
                </p>
                <Button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center"
                >
                  <PencilIcon className="w-4 h-4 mr-2" />
                  Ajouter une adresse
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
```

### Étape 4 : Mettre à jour la page de compte pour inclure la facturation

Modifier `src/app/account/page.tsx` pour ajouter le contenu de l'onglet billing :

```tsx
// ... existing imports ...
import BillingHistory from "@/components/account/BillingHistory";
import PaymentMethods from "@/components/account/PaymentMethods";
import BillingAddress from "@/components/account/BillingAddress";

// ... existing code ...

const renderTabContent = () => {
  if (!account) return null;

  switch (activeTab) {
    case "profile":
      return (
        <ProfileSettings account={account} onUpdate={handleUpdateProfile} />
      );

    case "subscription":
      return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Gestion de l'abonnement
          </h3>
          <p className="text-gray-600">
            Contenu de l'abonnement (implémenté dans ACCOUNT-02)
          </p>
        </div>
      );

    case "billing":
      return (
        <div className="space-y-6">
          <BillingHistory
            onDownloadInvoice={async (invoiceId) => {
              // Simulate PDF download
              console.log("Téléchargement de la facture:", invoiceId);
              await new Promise((resolve) => setTimeout(resolve, 1000));
            }}
          />

          <PaymentMethods
            onAddPaymentMethod={async () => {
              // Simulate adding payment method
              console.log("Ajout d'une méthode de paiement");
              await new Promise((resolve) => setTimeout(resolve, 1000));
            }}
            onRemovePaymentMethod={async (id) => {
              console.log("Suppression de la méthode:", id);
              await new Promise((resolve) => setTimeout(resolve, 500));
            }}
            onSetDefaultPaymentMethod={async (id) => {
              console.log("Définir par défaut:", id);
              await new Promise((resolve) => setTimeout(resolve, 500));
            }}
          />

          <BillingAddress
            account={account}
            onUpdate={async (billingInfo) => {
              await handleUpdateProfile({ billingInfo });
            }}
          />
        </div>
      );

    case "security":
      return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Sécurité et confidentialité
          </h3>
          <p className="text-gray-600">
            Paramètres de sécurité (sera implémenté dans une future version)
          </p>
        </div>
      );

    case "notifications":
      return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Préférences de notifications
          </h3>
          <p className="text-gray-600">
            Paramètres de notifications (sera implémenté dans une future
            version)
          </p>
        </div>
      );

    default:
      return null;
  }
};

// ... rest of existing code ...
```

### Étape 5 : Vérifier l'installation

```bash
npm run lint
npm run build
```

---

## Checklist de Validation

- [ ] Étape 1 : Composant BillingHistory créé avec historique des factures
- [ ] Étape 2 : Composant PaymentMethods créé avec gestion des cartes
- [ ] Étape 3 : Composant BillingAddress créé avec formulaire d'adresse
- [ ] Étape 4 : Page de compte mise à jour avec l'onglet facturation
- [ ] Étape 5 : Lint et build passent sans erreur
