# PLAN D'ACTION PRESCRIPTIF : SHARE-01

**User Story :** En tant qu'utilisateur, je veux pouvoir partager un rapport d'audience en un clic avec un lien brandé Spread incluant un CTA 'Essayer Spread' pour faire du growth hacking.

**Objectif :** Créer un système de partage de rapport d'audience avec lien brandé, tracking des vues et CTA pour acquisition.

---

## Plan d'Action Prescriptif

### Étape 1 : Créer le composant ShareReportModal

Créer `src/components/profile/ShareReportModal.tsx` :

```tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
  XMarkIcon,
  ShareIcon,
  LinkIcon,
  CheckIcon,
  ChartBarIcon,
  EyeIcon,
  ClipboardDocumentIcon,
} from '@heroicons/react/24/outline';
import { InfluencerDetails } from '@/types';

interface ShareReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  influencer: InfluencerDetails;
  onShare: (shareData: ShareReportData) => void;
}

interface ShareReportData {
  influencerId: string;
  shareType: 'public' | 'private';
  expiresAt?: string;
  includeFullAudience: boolean;
  trackingEnabled: boolean;
}

export default function ShareReportModal({
  isOpen,
  onClose,
  influencer,
  onShare,
}: ShareReportModalProps) {
  const [shareData, setShareData] = useState<ShareReportData>({
    influencerId: influencer.id,
    shareType: 'public',
    expiresAt: undefined,
    includeFullAudience: false,
    trackingEnabled: true,
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);

  const handleGenerateLink = async () => {
    setIsGenerating(true);

    // Simuler la génération d'un lien unique
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const shareId = `${influencer.id}_${Date.now()}`;
    const link = `https://share.spread.com/report/${shareId}?utm_source=spread_app&utm_medium=share&utm_campaign=growth_hacking`;

    setGeneratedLink(link);
    setIsGenerating(false);

    // Appeler la fonction de partage
    onShare(shareData);
  };

  const handleCopyLink = async () => {
    if (generatedLink) {
      await navigator.clipboard.writeText(generatedLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <ShareIcon className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Partager le rapport
              </h2>
              <p className="text-sm text-gray-600">
                {influencer.name} (@{influencer.username})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {!generatedLink ? (
          <>
            {/* Options de partage */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type de partage
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="public"
                      checked={shareData.shareType === 'public'}
                      onChange={(e) =>
                        setShareData({ ...shareData, shareType: 'public' })
                      }
                      className="mr-2"
                    />
                    <div>
                      <span className="text-sm font-medium">Public</span>
                      <p className="text-xs text-gray-500">
                        Accessible à tous avec le lien
                      </p>
                    </div>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="private"
                      checked={shareData.shareType === 'private'}
                      onChange={(e) =>
                        setShareData({ ...shareData, shareType: 'private' })
                      }
                      className="mr-2"
                    />
                    <div>
                      <span className="text-sm font-medium">Privé</span>
                      <p className="text-xs text-gray-500">
                        Protégé par mot de passe
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiration
                </label>
                <select
                  value={shareData.expiresAt || ''}
                  onChange={(e) =>
                    setShareData({
                      ...shareData,
                      expiresAt: e.target.value || undefined,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Jamais</option>
                  <option value="24h">24 heures</option>
                  <option value="7d">7 jours</option>
                  <option value="30d">30 jours</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={shareData.includeFullAudience}
                    onChange={(e) =>
                      setShareData({
                        ...shareData,
                        includeFullAudience: e.target.checked,
                      })
                    }
                    className="mr-2"
                  />
                  <span className="text-sm">
                    Inclure toutes les données d'audience
                  </span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={shareData.trackingEnabled}
                    onChange={(e) =>
                      setShareData({
                        ...shareData,
                        trackingEnabled: e.target.checked,
                      })
                    }
                    className="mr-2"
                  />
                  <span className="text-sm">Activer le tracking des vues</span>
                </label>
              </div>
            </div>

            {/* Aperçu du rapport partagé */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Aperçu du rapport partagé
              </h3>
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <div className="flex items-center space-x-3 mb-2">
                  <img
                    src={influencer.avatar}
                    alt={influencer.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <div className="font-medium text-sm">{influencer.name}</div>
                    <div className="text-xs text-gray-500">
                      @{influencer.username}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-600 mb-2">
                  {influencer.followers.toLocaleString()} followers •{' '}
                  {influencer.engagementRate}% engagement
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded p-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-purple-600 rounded"></div>
                    <span className="text-xs font-medium text-purple-800">
                      Essayer Spread
                    </span>
                  </div>
                  <p className="text-xs text-purple-700 mt-1">
                    Trouvez des influenceurs comme {influencer.name} avec Spread
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-3">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Annuler
              </Button>
              <Button
                onClick={handleGenerateLink}
                disabled={isGenerating}
                className="flex-1 bg-purple-600 hover:bg-purple-700"
              >
                {isGenerating ? 'Génération...' : 'Générer le lien'}
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* Lien généré */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <CheckIcon className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  Lien généré avec succès !
                </span>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lien de partage
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={generatedLink}
                    readOnly
                    className="flex-1 p-2 border border-gray-300 rounded-lg bg-white text-sm"
                  />
                  <Button
                    onClick={handleCopyLink}
                    variant="outline"
                    className="flex items-center space-x-1"
                  >
                    {linkCopied ? (
                      <CheckIcon className="w-4 h-4 text-green-600" />
                    ) : (
                      <ClipboardDocumentIcon className="w-4 h-4" />
                    )}
                    <span>{linkCopied ? 'Copié' : 'Copier'}</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Statistiques preview */}
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <ChartBarIcon className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">
                  Tracking activé
                </span>
              </div>
              <p className="text-xs text-blue-700">
                Vous recevrez des notifications lorsque quelqu'un consulte ce
                rapport. Les statistiques seront disponibles dans votre tableau
                de bord.
              </p>
            </div>

            {/* Actions finales */}
            <div className="flex space-x-3">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Fermer
              </Button>
              <Button
                onClick={() => {
                  // Ouvrir dans un nouvel onglet pour prévisualiser
                  window.open(generatedLink, '_blank');
                }}
                className="flex-1 bg-purple-600 hover:bg-purple-700"
              >
                <EyeIcon className="w-4 h-4 mr-2" />
                Prévisualiser
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
```

### Étape 2 : Créer la page de rapport partagé

Créer `src/app/share/[shareId]/page.tsx` :

```tsx
import { notFound } from 'next/navigation';
import {
  ShareIcon,
  UserGroupIcon,
  HeartIcon,
  MessageCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import { InfluencerDetails } from '@/types';

interface SharePageProps {
  params: {
    shareId: string;
  };
  searchParams: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
  };
}

// Simuler la récupération des données de partage
async function getSharedReport(
  shareId: string
): Promise<InfluencerDetails | null> {
  // Dans un vrai projet, ça ferait un appel API
  // Pour le mock, on retourne des données statiques
  return {
    id: '1',
    name: 'Marie Lifestyle',
    username: 'marie_lifestyle',
    platform: 'instagram',
    avatar: '/avatars/marie.jpg',
    followers: 125000,
    engagement: 8500,
    engagementRate: 6.8,
    country: 'France',
    verified: true,
    email: 'marie@lifestyle.com',
    bio: 'Lifestyle & Fashion • Paris 🇫🇷',
    audienceUnlocked: true,
    stats: {
      avgLikes: 7500,
      avgComments: 850,
      avgViews: 45000,
      totalPosts: 1250,
    },
    audience: {
      gender: { male: 25, female: 75 },
      age: {
        '13-17': 8,
        '18-24': 35,
        '25-34': 42,
        '35-44': 12,
        '45-64': 3,
      },
      countries: {
        France: 65,
        Belgique: 15,
        Suisse: 10,
        Canada: 8,
        Autres: 2,
      },
      cities: {
        Paris: 35,
        Lyon: 12,
        Marseille: 8,
        Bruxelles: 10,
        Genève: 7,
      },
      languages: {
        Français: 85,
        Anglais: 12,
        Autres: 3,
      },
      ethnicities: {
        Européen: 78,
        Africain: 12,
        Asiatique: 7,
        Autres: 3,
      },
      interests: {
        topics: {
          Mode: 85,
          Beauté: 72,
          Lifestyle: 68,
          Voyage: 45,
          Cuisine: 38,
        },
        brands: {
          Zara: 42,
          Sephora: 38,
          Nike: 25,
          Apple: 22,
          Adidas: 18,
        },
      },
    },
  };
}

export default async function SharePage({
  params,
  searchParams,
}: SharePageProps) {
  const report = await getSharedReport(params.shareId);

  if (!report) {
    notFound();
  }

  // Tracker la vue (dans un vrai projet, ça ferait un appel API)
  const trackView = () => {
    console.log('Tracking view for share:', params.shareId, searchParams);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec branding Spread */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  Rapport d'audience
                </h1>
                <p className="text-sm text-gray-600">Partagé via Spread</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <ShareIcon className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-500">Rapport partagé</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={report.avatar}
              alt={report.name}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {report.name}
              </h2>
              <p className="text-gray-600">@{report.username}</p>
              <p className="text-sm text-gray-500 mt-1">{report.bio}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-1">
                <UserGroupIcon className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Followers</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {report.followers.toLocaleString()}
              </span>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-1">
                <HeartIcon className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Engagement</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {report.engagement.toLocaleString()}
              </span>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-1">
                <MessageCircleIcon className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Taux d'engagement</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {report.engagementRate}%
              </span>
            </div>
          </div>
        </div>

        {/* Données d'audience */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Répartition par genre */}
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Répartition par genre
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Femmes</span>
                <span className="text-sm font-medium">
                  {report.audience.gender.female}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-pink-500 h-2 rounded-full"
                  style={{ width: `${report.audience.gender.female}%` }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Hommes</span>
                <span className="text-sm font-medium">
                  {report.audience.gender.male}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${report.audience.gender.male}%` }}
                />
              </div>
            </div>
          </div>

          {/* Répartition par âge */}
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Répartition par âge
            </h3>
            <div className="space-y-2">
              {Object.entries(report.audience.age).map(([age, percentage]) => (
                <div key={age} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{age} ans</span>
                  <span className="text-sm font-medium">{percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top pays */}
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Top pays
            </h3>
            <div className="space-y-2">
              {Object.entries(report.audience.countries).map(
                ([country, percentage]) => (
                  <div
                    key={country}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-gray-600">{country}</span>
                    <span className="text-sm font-medium">{percentage}%</span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Centres d'intérêt */}
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Centres d'intérêt
            </h3>
            <div className="space-y-2">
              {Object.entries(report.audience.interests.topics).map(
                ([topic, percentage]) => (
                  <div
                    key={topic}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-gray-600">{topic}</span>
                    <span className="text-sm font-medium">{percentage}%</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Footer */}
      <div className="bg-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <h3 className="text-2xl font-bold mb-2">
            Trouvez des influenceurs comme {report.name}
          </h3>
          <p className="text-purple-100 mb-6">
            Accédez à plus de 100 000 profils d'influenceurs avec des analyses
            détaillées
          </p>
          <Button
            className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3"
            onClick={() => {
              // Tracker le clic CTA
              console.log('CTA clicked', searchParams);
              window.open(
                'https://spread.com/signup?utm_source=shared_report',
                '_blank'
              );
            }}
          >
            Essayer Spread gratuitement
          </Button>
        </div>
      </div>
    </div>
  );
}
```

### Étape 3 : Créer les types pour le partage

Ajouter à `src/types/index.ts` :

```typescript
export interface SharedReport {
  id: string;
  influencerId: string;
  shareType: 'public' | 'private';
  createdAt: string;
  expiresAt?: string;
  includeFullAudience: boolean;
  trackingEnabled: boolean;
  password?: string;
  viewCount: number;
  lastViewedAt?: string;
  utmParameters?: {
    source?: string;
    medium?: string;
    campaign?: string;
  };
}

export interface ShareStats {
  totalViews: number;
  uniqueViews: number;
  clickThroughRate: number;
  conversionRate: number;
  topReferrers: { source: string; views: number }[];
  viewsOverTime: { date: string; views: number }[];
}
```

### Étape 4 : Ajouter le bouton de partage dans ProfileHeader

Modifier `src/components/profile/ProfileHeader.tsx` :

```tsx
import { useState } from "react";
import ShareReportModal from "./ShareReportModal";
import { ShareIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/Button";

// Dans le composant ProfileHeader, ajouter :
const [showShareModal, setShowShareModal] = useState(false);

const handleShare = (shareData: any) => {
  console.log("Sharing report:", shareData);
  // Dans un vrai projet, ça ferait un appel API
};

// Dans le JSX, ajouter le bouton de partage :
<Button
  variant="outline"
  onClick={() => setShowShareModal(true)}
  className="flex items-center space-x-2"
>
  <ShareIcon className="w-4 h-4" />
  <span>Partager</span>
</Button>

// Ajouter la modale à la fin du composant :
<ShareReportModal
  isOpen={showShareModal}
  onClose={() => setShowShareModal(false)}
  influencer={influencer}
  onShare={handleShare}
/>
```

### Étape 5 : Créer les données mockées de partage

Ajouter à `src/lib/mockData.ts` :

```typescript
export const mockSharedReports = [
  {
    id: 'share_1',
    influencerId: '1',
    shareType: 'public' as const,
    createdAt: '2024-01-15T10:30:00Z',
    expiresAt: '2024-02-15T10:30:00Z',
    includeFullAudience: true,
    trackingEnabled: true,
    viewCount: 127,
    lastViewedAt: '2024-01-20T14:22:00Z',
    utmParameters: {
      source: 'spread_app',
      medium: 'share',
      campaign: 'growth_hacking',
    },
  },
  {
    id: 'share_2',
    influencerId: '2',
    shareType: 'private' as const,
    createdAt: '2024-01-12T15:45:00Z',
    includeFullAudience: false,
    trackingEnabled: true,
    password: 'securepass123',
    viewCount: 43,
    lastViewedAt: '2024-01-18T09:15:00Z',
  },
];

export const mockShareStats = {
  totalViews: 1250,
  uniqueViews: 892,
  clickThroughRate: 12.5,
  conversionRate: 3.2,
  topReferrers: [
    { source: 'Direct', views: 450 },
    { source: 'LinkedIn', views: 320 },
    { source: 'Twitter', views: 180 },
    { source: 'Email', views: 150 },
    { source: 'WhatsApp', views: 120 },
  ],
  viewsOverTime: [
    { date: '2024-01-10', views: 23 },
    { date: '2024-01-11', views: 45 },
    { date: '2024-01-12', views: 67 },
    { date: '2024-01-13', views: 89 },
    { date: '2024-01-14', views: 112 },
    { date: '2024-01-15', views: 134 },
    { date: '2024-01-16', views: 156 },
  ],
};
```

---

## Résumé des modifications

✅ **Modale de partage** : Interface complète pour configurer le partage
✅ **Page de rapport partagé** : Landing page brandée avec CTA
✅ **Tracking intégré** : Suivi des vues et conversions
✅ **Types étendus** : Support du partage et statistiques
✅ **Données mockées** : Simulation des partages et statistiques
✅ **Growth hacking** : CTA optimisé pour l'acquisition

Cette fonctionnalité permet de transformer chaque utilisateur en canal d'acquisition grâce au partage viral des rapports.
