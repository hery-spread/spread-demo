# PLAN D'ACTION PRESCRIPTIF : PROFILE-01

**User Story :** En tant qu'utilisateur, je veux voir une fiche détaillée d'un influenceur avec ses informations principales (nom, bio, followers, engagement) pour évaluer son potentiel.

**Objectif :** Créer la page de profil détaillé d'un influenceur avec toutes ses informations de base.

---

## Plan d'Action Prescriptif

### Étape 1 : Créer le composant ProfileHeader

Créer `src/components/profile/ProfileHeader.tsx` :

```tsx
"use client";

import { Influencer } from "@/types";
import { Button } from "@/components/ui/Button";
import {
  CheckBadgeIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  PlusIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

interface ProfileHeaderProps {
  influencer: Influencer;
  onAddToList?: () => void;
  onContact?: () => void;
}

export default function ProfileHeader({
  influencer,
  onAddToList,
  onContact,
}: ProfileHeaderProps) {
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "instagram":
        return "📷";
      case "youtube":
        return "🎥";
      case "tiktok":
        return "🎵";
      default:
        return "🌐";
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "instagram":
        return "bg-pink-100 text-pink-800";
      case "youtube":
        return "bg-red-100 text-red-800";
      case "tiktok":
        return "bg-gray-900 text-white";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header avec gradient */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-32"></div>

      <div className="relative px-6 pb-6">
        {/* Avatar */}
        <div className="flex items-start justify-between -mt-16">
          <div className="flex items-end space-x-4">
            <img
              src={influencer.avatar}
              alt={influencer.name}
              className="w-32 h-32 rounded-full border-4 border-white object-cover bg-white"
              onError={(e) => {
                (
                  e.target as HTMLImageElement
                ).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  influencer.name
                )}&background=6366f1&color=fff&size=128`;
              }}
            />
            <div className="pb-4">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPlatformColor(
                  influencer.platform
                )}`}
              >
                <span className="mr-2">
                  {getPlatformIcon(influencer.platform)}
                </span>
                {influencer.platform}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3 mt-4">
            <Button
              variant="outline"
              onClick={onAddToList}
              className="flex items-center"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Ajouter à une liste
            </Button>
            {influencer.email && (
              <Button onClick={onContact} className="flex items-center">
                <EnvelopeIcon className="w-4 h-4 mr-2" />
                Contacter
              </Button>
            )}
          </div>
        </div>

        {/* Informations principales */}
        <div className="mt-4">
          <div className="flex items-center space-x-2 mb-2">
            <h1 className="text-2xl font-bold text-gray-900">
              {influencer.name}
            </h1>
            {influencer.verified && (
              <CheckBadgeIcon className="w-6 h-6 text-blue-500" />
            )}
          </div>

          <p className="text-lg text-gray-600 mb-2">@{influencer.username}</p>

          {influencer.bio && (
            <p className="text-gray-700 mb-4 max-w-2xl">{influencer.bio}</p>
          )}

          {/* Statistiques principales */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {formatNumber(influencer.followers)}
              </div>
              <div className="text-sm text-blue-600 font-medium">Followers</div>
            </div>

            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {influencer.engagementRate}%
              </div>
              <div className="text-sm text-green-600 font-medium">
                Engagement
              </div>
            </div>

            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {formatNumber(influencer.engagement)}
              </div>
              <div className="text-sm text-purple-600 font-medium">
                Interactions
              </div>
            </div>

            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {influencer.country}
              </div>
              <div className="text-sm text-orange-600 font-medium">Pays</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Étape 2 : Créer le composant ProfileTabs

Créer `src/components/profile/ProfileTabs.tsx` :

```tsx
"use client";

import { useState } from "react";

type ProfileTab = "overview" | "audience" | "content" | "contact";

interface ProfileTabsProps {
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
  hasDetailedData: boolean;
}

export default function ProfileTabs({
  activeTab,
  onTabChange,
  hasDetailedData,
}: ProfileTabsProps) {
  const tabs = [
    {
      id: "overview" as ProfileTab,
      name: "Vue d'ensemble",
      icon: "📊",
      available: true,
    },
    {
      id: "audience" as ProfileTab,
      name: "Audience",
      icon: "👥",
      available: hasDetailedData,
    },
    {
      id: "content" as ProfileTab,
      name: "Contenu",
      icon: "📱",
      available: hasDetailedData,
    },
    {
      id: "contact" as ProfileTab,
      name: "Contact",
      icon: "📧",
      available: true,
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const isDisabled = !tab.available;

            return (
              <button
                key={tab.id}
                onClick={() => tab.available && onTabChange(tab.id)}
                disabled={isDisabled}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  isActive
                    ? "border-purple-500 text-purple-600"
                    : isDisabled
                    ? "border-transparent text-gray-400 cursor-not-allowed"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
                {isDisabled && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-500">
                    🔒
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
```

### Étape 3 : Créer la page de profil

Créer `src/app/profile/[id]/page.tsx` :

```tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Influencer, InfluencerDetails } from "@/types";
import { mockInfluencers, mockInfluencerDetails } from "@/lib/mockData";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTabs from "@/components/profile/ProfileTabs";
import { Button } from "@/components/ui/Button";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

type ProfileTab = "overview" | "audience" | "content" | "contact";

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const [influencer, setInfluencer] = useState<Influencer | null>(null);
  const [detailedData, setDetailedData] = useState<InfluencerDetails | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<ProfileTab>("overview");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = params.id as string;

    // Trouver l'influenceur
    const foundInfluencer = mockInfluencers.find((inf) => inf.id === id);
    if (foundInfluencer) {
      setInfluencer(foundInfluencer);

      // Vérifier s'il y a des données détaillées
      const details = mockInfluencerDetails[id];
      if (details) {
        setDetailedData(details);
      }
    }

    setLoading(false);
  }, [params.id]);

  const handleAddToList = () => {
    // TODO: Ouvrir modal pour ajouter à une liste
    console.log("Ajouter à une liste:", influencer?.name);
  };

  const handleContact = () => {
    // TODO: Ouvrir modal de contact
    console.log("Contacter:", influencer?.name);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="bg-gray-200 h-64 rounded-lg"></div>
          <div className="mt-6 space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!influencer) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Influenceur non trouvé
        </h1>
        <p className="text-gray-600 mb-6">
          L'influenceur que vous recherchez n'existe pas ou a été supprimé.
        </p>
        <Button onClick={() => router.back()}>Retour</Button>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Informations générales
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Statistiques</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Followers:</span>
                    <span className="font-medium">
                      {influencer.followers.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Engagement:</span>
                    <span className="font-medium">
                      {influencer.engagementRate}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Interactions moyennes:
                    </span>
                    <span className="font-medium">
                      {influencer.engagement.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Informations</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Plateforme:</span>
                    <span className="font-medium capitalize">
                      {influencer.platform}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pays:</span>
                    <span className="font-medium">{influencer.country}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vérifié:</span>
                    <span className="font-medium">
                      {influencer.verified ? "Oui" : "Non"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email disponible:</span>
                    <span className="font-medium">
                      {influencer.email ? "Oui" : "Non"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "audience":
        if (!detailedData) {
          return (
            <div className="p-6 text-center">
              <div className="text-6xl mb-4">🔒</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Données d'audience verrouillées
              </h3>
              <p className="text-gray-600 mb-4">
                Débloquez les données d'audience détaillées pour cet
                influenceur.
              </p>
              <Button>Débloquer pour 1 crédit</Button>
            </div>
          );
        }
        return (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Analyse d'audience
            </h3>
            <p className="text-gray-600">
              Données d'audience détaillées disponibles (sera implémenté dans
              PROFILE-02)
            </p>
          </div>
        );

      case "content":
        return (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Analyse de contenu
            </h3>
            <p className="text-gray-600">
              Analyse du contenu et des performances (sera implémenté dans
              PROFILE-03)
            </p>
          </div>
        );

      case "contact":
        return (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Informations de contact
            </h3>
            {influencer.email ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-green-600">✓</span>
                  <span className="font-medium text-green-800">
                    Email disponible
                  </span>
                </div>
                <p className="text-green-700 mb-4">{influencer.email}</p>
                <Button onClick={handleContact}>Envoyer un message</Button>
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-gray-500">✗</span>
                  <span className="font-medium text-gray-700">
                    Email non disponible
                  </span>
                </div>
                <p className="text-gray-600">
                  Les informations de contact ne sont pas disponibles pour cet
                  influenceur.
                </p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Bouton retour */}
      <div>
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="flex items-center"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Retour
        </Button>
      </div>

      {/* Header du profil */}
      <ProfileHeader
        influencer={influencer}
        onAddToList={handleAddToList}
        onContact={handleContact}
      />

      {/* Onglets */}
      <ProfileTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        hasDetailedData={!!detailedData}
      />

      {/* Contenu de l'onglet */}
      <div className="bg-white rounded-lg border border-gray-200">
        {renderTabContent()}
      </div>
    </div>
  );
}
```

### Étape 4 : Vérifier l'installation

```bash
npm run lint
npm run build
```

---

## Checklist de Validation

- [ ] Étape 1 : Composant ProfileHeader créé avec avatar et stats
- [ ] Étape 2 : Composant ProfileTabs créé avec système de verrouillage
- [ ] Étape 3 : Page de profil créée avec navigation et onglets
- [ ] Étape 4 : Lint et build passent sans erreur
