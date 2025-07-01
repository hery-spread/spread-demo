# PLAN D'ACTION PRESCRIPTIF : ACCOUNT-01

**User Story :** En tant qu'utilisateur, je veux accéder à ma page de compte pour voir et modifier mes informations personnelles et paramètres.

**Objectif :** Créer la page principale de compte avec profil utilisateur et paramètres.

---

## Plan d'Action Prescriptif

### Étape 1 : Créer le composant AccountHeader

Créer `src/components/account/AccountHeader.tsx` :

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  PencilIcon,
  CameraIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { UserAccount } from "@/types";

interface AccountHeaderProps {
  account: UserAccount;
  onUpdateProfile: (updates: Partial<UserAccount>) => Promise<void>;
}

export default function AccountHeader({
  account,
  onUpdateProfile,
}: AccountHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: account.name,
    email: account.email,
  });
  const [updating, setUpdating] = useState(false);

  const handleSave = async () => {
    setUpdating(true);
    try {
      await onUpdateProfile(editData);
      setIsEditing(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
    } finally {
      setUpdating(false);
    }
  };

  const handleCancel = () => {
    setEditData({
      name: account.name,
      email: account.email,
    });
    setIsEditing(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getPlanBadgeColor = (planName: string) => {
    switch (planName.toLowerCase()) {
      case "elite":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "pro":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "starter":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header avec gradient */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-32"></div>

      <div className="relative px-6 pb-6">
        {/* Avatar et badge plan */}
        <div className="flex items-end justify-between -mt-16">
          <div className="flex items-end space-x-4">
            <div className="relative">
              <div className="w-32 h-32 bg-white rounded-full border-4 border-white flex items-center justify-center text-2xl font-bold text-purple-600 shadow-lg">
                {getInitials(account.name)}
              </div>
              <button className="absolute bottom-2 right-2 p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors">
                <CameraIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="pb-4">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getPlanBadgeColor(
                  account.plan.name
                )}`}
              >
                ✨ Plan {account.plan.name}
              </span>
            </div>
          </div>

          {/* Bouton d'édition */}
          {!isEditing && (
            <div className="mt-4">
              <Button
                variant="outline"
                onClick={() => setIsEditing(true)}
                className="flex items-center"
              >
                <PencilIcon className="w-4 h-4 mr-2" />
                Modifier le profil
              </Button>
            </div>
          )}
        </div>

        {/* Informations du profil */}
        <div className="mt-4">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom complet
                </label>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) =>
                    setEditData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse email
                </label>
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) =>
                    setEditData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div className="flex items-center space-x-3">
                <Button
                  onClick={handleSave}
                  disabled={
                    updating || !editData.name.trim() || !editData.email.trim()
                  }
                  size="sm"
                >
                  <CheckIcon className="w-4 h-4 mr-1" />
                  {updating ? "Sauvegarde..." : "Sauvegarder"}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={updating}
                  size="sm"
                >
                  <XMarkIcon className="w-4 h-4 mr-1" />
                  Annuler
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {account.name}
              </h1>
              <p className="text-gray-600 mb-4">{account.email}</p>

              {/* Informations du compte */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {account.plan.limits.profiles.used}
                  </div>
                  <div className="text-sm text-purple-600 font-medium">
                    Profils consultés
                  </div>
                  <div className="text-xs text-gray-500">
                    sur {account.plan.limits.profiles.total}
                  </div>
                </div>

                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {typeof account.plan.limits.searches === "number"
                      ? account.plan.limits.searches
                      : "∞"}
                  </div>
                  <div className="text-sm text-blue-600 font-medium">
                    Recherches
                  </div>
                  <div className="text-xs text-gray-500">ce mois-ci</div>
                </div>

                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {account.plan.limits.users.used}/
                    {account.plan.limits.users.total}
                  </div>
                  <div className="text-sm text-green-600 font-medium">
                    Utilisateurs
                  </div>
                  <div className="text-xs text-gray-500">dans l'équipe</div>
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

### Étape 2 : Créer le composant AccountTabs

Créer `src/components/account/AccountTabs.tsx` :

```tsx
"use client";

type AccountTab =
  | "profile"
  | "subscription"
  | "billing"
  | "security"
  | "notifications";

interface AccountTabsProps {
  activeTab: AccountTab;
  onTabChange: (tab: AccountTab) => void;
}

export default function AccountTabs({
  activeTab,
  onTabChange,
}: AccountTabsProps) {
  const tabs = [
    {
      id: "profile" as AccountTab,
      name: "Profil",
      icon: "👤",
      description: "Informations personnelles",
    },
    {
      id: "subscription" as AccountTab,
      name: "Abonnement",
      icon: "💳",
      description: "Plan et facturation",
    },
    {
      id: "billing" as AccountTab,
      name: "Facturation",
      icon: "🧾",
      description: "Historique et factures",
    },
    {
      id: "security" as AccountTab,
      name: "Sécurité",
      icon: "🔒",
      description: "Mot de passe et sécurité",
    },
    {
      id: "notifications" as AccountTab,
      name: "Notifications",
      icon: "🔔",
      description: "Préférences d'email",
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  isActive
                    ? "border-purple-500 text-purple-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <span>{tab.icon}</span>
                <div className="text-left">
                  <div>{tab.name}</div>
                  <div className="text-xs text-gray-400 font-normal">
                    {tab.description}
                  </div>
                </div>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
```

### Étape 3 : Créer le composant ProfileSettings

Créer `src/components/account/ProfileSettings.tsx` :

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { UserAccount } from "@/types";

interface ProfileSettingsProps {
  account: UserAccount;
  onUpdate: (updates: Partial<UserAccount>) => Promise<void>;
}

export default function ProfileSettings({
  account,
  onUpdate,
}: ProfileSettingsProps) {
  const [formData, setFormData] = useState({
    name: account.name,
    email: account.email,
    phone: account.billingInfo?.phone || "",
    company: account.billingInfo?.company || "",
    address: account.billingInfo?.address || "",
    city: account.billingInfo?.city || "",
    postalCode: account.billingInfo?.postalCode || "",
    country: account.billingInfo?.country || "",
    website: "",
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await onUpdate({
        name: formData.name,
        email: formData.email,
        billingInfo: {
          ...account.billingInfo,
          phone: formData.phone,
          company: formData.company,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
        },
      });
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Informations du profil
        </h3>
        <p className="text-gray-600">
          Gérez vos informations personnelles et professionnelles
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informations personnelles */}
        <div>
          <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
            <UserIcon className="w-5 h-5 mr-2" />
            Informations personnelles
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom complet *
              </label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Adresse email *
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone
              </label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
                placeholder="+33 1 23 45 67 89"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Site web
              </label>
              <Input
                type="url"
                value={formData.website}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, website: e.target.value }))
                }
                placeholder="https://monsite.com"
              />
            </div>
          </div>
        </div>

        {/* Informations professionnelles */}
        <div>
          <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
            <BuildingOfficeIcon className="w-5 h-5 mr-2" />
            Informations professionnelles
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Entreprise
              </label>
              <Input
                type="text"
                value={formData.company}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, company: e.target.value }))
                }
                placeholder="Nom de votre entreprise"
              />
            </div>
          </div>
        </div>

        {/* Adresse */}
        <div>
          <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
            <MapPinIcon className="w-5 h-5 mr-2" />
            Adresse
          </h4>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Adresse
              </label>
              <Input
                type="text"
                value={formData.address}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, address: e.target.value }))
                }
                placeholder="123 Rue de la Paix"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ville
                </label>
                <Input
                  type="text"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, city: e.target.value }))
                  }
                  placeholder="Paris"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Code postal
                </label>
                <Input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      postalCode: e.target.value,
                    }))
                  }
                  placeholder="75001"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="">Sélectionner un pays</option>
                  <option value="France">France</option>
                  <option value="Belgique">Belgique</option>
                  <option value="Suisse">Suisse</option>
                  <option value="Canada">Canada</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              setFormData({
                name: account.name,
                email: account.email,
                phone: account.billingInfo?.phone || "",
                company: account.billingInfo?.company || "",
                address: account.billingInfo?.address || "",
                city: account.billingInfo?.city || "",
                postalCode: account.billingInfo?.postalCode || "",
                country: account.billingInfo?.country || "",
                website: "",
              })
            }
            disabled={saving}
          >
            Réinitialiser
          </Button>

          <Button type="submit" disabled={saving}>
            {saving ? "Sauvegarde..." : "Sauvegarder les modifications"}
          </Button>
        </div>
      </form>
    </div>
  );
}
```

### Étape 4 : Créer la page principale de compte

Créer `src/app/account/page.tsx` :

```tsx
"use client";

import { useState, useEffect } from "react";
import AccountHeader from "@/components/account/AccountHeader";
import AccountTabs from "@/components/account/AccountTabs";
import ProfileSettings from "@/components/account/ProfileSettings";
import { UserAccount } from "@/types";
import { getCurrentUserAccount, updateUserProfile } from "@/lib/mockData";

type AccountTab =
  | "profile"
  | "subscription"
  | "billing"
  | "security"
  | "notifications";

export default function AccountPage() {
  const [account, setAccount] = useState<UserAccount | null>(null);
  const [activeTab, setActiveTab] = useState<AccountTab>("profile");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAccount();
  }, []);

  const loadAccount = async () => {
    try {
      const userAccount = await getCurrentUserAccount();
      setAccount(userAccount);
    } catch (error) {
      console.error("Erreur lors du chargement du compte:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (updates: Partial<UserAccount>) => {
    if (!account) return;

    try {
      await updateUserProfile(updates);
      setAccount((prev) => (prev ? { ...prev, ...updates } : null));
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      throw error;
    }
  };

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
              Contenu de l'abonnement (sera implémenté dans ACCOUNT-02)
            </p>
          </div>
        );

      case "billing":
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Historique de facturation
            </h3>
            <p className="text-gray-600">
              Historique des factures (sera implémenté dans ACCOUNT-03)
            </p>
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

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded-lg mb-6"></div>
          <div className="h-16 bg-gray-200 rounded-lg mb-6"></div>
          <div className="h-96 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (!account) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Erreur de chargement
        </h1>
        <p className="text-gray-600">
          Impossible de charger les informations du compte.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header du compte */}
      <AccountHeader account={account} onUpdateProfile={handleUpdateProfile} />

      {/* Onglets */}
      <AccountTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Contenu de l'onglet */}
      {renderTabContent()}
    </div>
  );
}
```

### Étape 5 : Vérifier l'installation

```bash
npm run lint
npm run build
```

---

## Checklist de Validation

- [ ] Étape 1 : Composant AccountHeader créé avec édition de profil
- [ ] Étape 2 : Composant AccountTabs créé avec navigation
- [ ] Étape 3 : Composant ProfileSettings créé avec formulaire complet
- [ ] Étape 4 : Page principale de compte créée
- [ ] Étape 5 : Lint et build passent sans erreur
