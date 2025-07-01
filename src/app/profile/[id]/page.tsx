'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Influencer, InfluencerDetails } from '@/types';
import {
  mockInfluencers,
  mockInfluencerDetails,
  unlockInfluencerReport,
} from '@/lib/mockData';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileTabs from '@/components/profile/ProfileTabs';
import UnlockModal from '@/components/profile/UnlockModal';
import LockedContent from '@/components/profile/LockedContent';
import { Button } from '@/components/ui/Button';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useCredits } from '@/hooks/useCredits';

type ProfileTab = 'overview' | 'audience' | 'content' | 'contact';

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const [influencer, setInfluencer] = useState<Influencer | null>(null);
  const [detailedData, setDetailedData] = useState<InfluencerDetails | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<ProfileTab>('overview');
  const [loading, setLoading] = useState(true);
  const { credits, spendCredits } = useCredits();
  const [showUnlockModal, setShowUnlockModal] = useState(false);

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

  // Fonction pour débloquer le rapport
  const handleUnlockReport = async () => {
    if (!influencer) return;

    try {
      // Dépenser les crédits
      await spendCredits(
        1,
        `Rapport débloqué - ${influencer.name}`,
        influencer.id
      );

      // Simuler le déverrouillage du rapport
      const unlockedData = await unlockInfluencerReport(influencer.id);
      if (unlockedData) {
        setDetailedData(unlockedData);
      }
    } catch (error) {
      console.error('Erreur lors du déverrouillage:', error);
    }
  };

  const handleAddToList = () => {
    // TODO: Ouvrir modal pour ajouter à une liste
    console.log('Ajouter à une liste:', influencer?.name);
  };

  const handleContact = () => {
    // TODO: Ouvrir modal de contact
    console.log('Contacter:', influencer?.name);
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
          L&apos;influenceur que vous recherchez n&apos;existe pas ou a été
          supprimé.
        </p>
        <Button onClick={() => router.back()}>Retour</Button>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
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
                      {influencer.verified ? 'Oui' : 'Non'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email disponible:</span>
                    <span className="font-medium">
                      {influencer.email ? 'Oui' : 'Non'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'audience':
        if (!detailedData) {
          return (
            <LockedContent
              title="Données d'audience verrouillées"
              description="Débloquez l'analyse détaillée de l'audience pour cet influenceur et accédez à des insights précieux sur ses followers."
              onUnlock={() => setShowUnlockModal(true)}
              creditCost={1}
              features={[
                'Répartition par âge et genre',
                'Géolocalisation (pays et villes)',
                "Centres d'intérêt détaillés",
                "Marques favorites de l'audience",
                'Langues et ethnicités',
              ]}
            />
          );
        }
        return (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Analyse d&apos;audience
            </h3>
            <p className="text-gray-600">
              Données d&apos;audience détaillées disponibles (sera implémenté
              dans PROFILE-04)
            </p>
          </div>
        );

      case 'content':
        return (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Analyse de contenu
            </h3>
            <p className="text-gray-600">
              Analyse du contenu et des performances (sera implémenté dans
              PROFILE-04)
            </p>
          </div>
        );

      case 'contact':
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

      {/* Modal de déverrouillage */}
      {influencer && (
        <UnlockModal
          isOpen={showUnlockModal}
          onClose={() => setShowUnlockModal(false)}
          influencer={influencer}
          onUnlock={handleUnlockReport}
          currentCredits={credits}
        />
      )}
    </div>
  );
}
