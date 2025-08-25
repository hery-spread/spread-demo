'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Influencer, InfluencerDetails } from '@/types';
import {
  mockInfluencers,
  mockInfluencerDetails,
  unlockInfluencerReport,
} from '@/lib/mockData';
import { getEnhancedInfluencerReport } from '@/lib/modash';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileTabs from '@/components/profile/ProfileTabs';
// import LockedContent from '@/components/profile/LockedContent'; // Unused for now
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ArrowLeftIcon, XMarkIcon, LockClosedIcon, CreditCardIcon } from '@heroicons/react/24/outline';
import { useCredits } from '@/hooks/useCredits';

type ProfileTab =
  | 'overview'
  | 'audience'
  | 'contact';

// Helper function pour formater les nombres
const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const [influencer, setInfluencer] = useState<Influencer | null>(null);
  const [detailedData, setDetailedData] = useState<InfluencerDetails | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<ProfileTab>('overview');
  const [loading, setLoading] = useState(true);
  const { unlockReports } = useCredits();
  const [showContactModal, setShowContactModal] = useState(false);
  const [showAddToListModal, setShowAddToListModal] = useState(false);

  useEffect(() => {
    const loadInfluencerData = async () => {
      const id = params.id as string;
      setLoading(true);

      try {
        // Trouver l'influenceur de base
        const foundInfluencer = mockInfluencers.find((inf) => inf.id === id);
        if (foundInfluencer) {
          setInfluencer(foundInfluencer);

          // Essayer de charger les données enrichies via Modash
          try {
            const enhancedData = await getEnhancedInfluencerReport(
              foundInfluencer.platform,
              id,
              'median'
            );
            setDetailedData(enhancedData);
          } catch (error) {
            console.error(
              'Erreur lors du chargement des données Modash:',
              error
            );

            // Fallback sur les données mockées
            const details = mockInfluencerDetails[id];
            if (details) {
              setDetailedData(details);
            }
          }
        }
      } catch (error) {
        console.error('Erreur lors du chargement du profil:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInfluencerData();
  }, [params.id]);

  // Fonction pour débloquer le rapport
  const handleUnlockReport = async () => {
    try {
      const result = unlockReports([influencer!.id]);
      if (result) {
        // Simuler le déverrouillage des données
        const unlockedData = await unlockInfluencerReport(influencer!.id);
          setDetailedData(unlockedData);
      }
    } catch (error) {
      console.error('Erreur lors du déverrouillage:', error);
    }
  };

  const handleContact = () => {
    setShowContactModal(true);
  };

  const handleAddToList = () => {
    setShowAddToListModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!influencer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Influenceur non trouvé
        </h1>
          <Button onClick={() => router.back()}>
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Retour
          </Button>
        </div>
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
                <h4 className="font-medium text-gray-900 mb-2">Informations publiques</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Plateforme:</span>
                    <span className="font-medium capitalize">
                      {influencer.platform}
                    </span>
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
                
                {/* Informations nécessitant un déblocage */}
                <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <h5 className="font-medium text-gray-700 mb-2 text-xs">Informations détaillées</h5>
                  <div className="space-y-1 text-xs text-gray-500">
                    <div className="flex justify-between items-center">
                      <span>Pays de résidence:</span>
                      <span className="flex items-center gap-1">
                        <LockClosedIcon className="w-3 h-3" />
                        Verrouillé
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Données d'audience:</span>
                      <span className="flex items-center gap-1">
                        <LockClosedIcon className="w-3 h-3" />
                        Verrouillé
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'audience':
        return (
          <div className="space-y-0">
            {/* Informations de base toujours visibles */}
            <div className="p-6 bg-white">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Rapport d'audience complet
            </h3>

              {/* Statistiques publiques */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {formatNumber(influencer.followers)}
                  </div>
                  <div className="text-sm text-blue-800">Followers</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {influencer.engagementRate}%
                  </div>
                  <div className="text-sm text-green-800">Engagement</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {formatNumber(influencer.engagement)}
                  </div>
                  <div className="text-sm text-purple-800">Interactions</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {influencer.platform.toUpperCase()}
                  </div>
                  <div className="text-sm text-orange-800">Plateforme</div>
                </div>
              </div>
            </div>

            {/* Contenu détaillé - verrouillé ou déverrouillé */}
            {!detailedData ? (
              <div className="relative">
                {/* Aperçu flouté */}
                <div className="p-6 bg-white border-t border-gray-200">
                  <div className="filter blur-sm pointer-events-none select-none">
                    <h4 className="text-md font-semibold text-gray-900 mb-4">Analyse détaillée de l'audience</h4>
                    
                    {/* Fausses données pour l'aperçu */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h5 className="font-medium text-gray-700 mb-3">Répartition par genre</h5>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Femmes</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-20 h-2 bg-pink-200 rounded-full">
                                <div className="w-3/5 h-full bg-pink-500 rounded-full"></div>
                              </div>
                              <span className="text-sm font-medium">60%</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Hommes</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-20 h-2 bg-blue-200 rounded-full">
                                <div className="w-2/5 h-full bg-blue-500 rounded-full"></div>
                              </div>
                              <span className="text-sm font-medium">40%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-gray-700 mb-3">Top pays</h5>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">France</span>
                            <span className="text-sm font-medium">45%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Belgique</span>
                            <span className="text-sm font-medium">15%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Suisse</span>
                            <span className="text-sm font-medium">12%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-medium text-gray-700 mb-3">Tranches d'âge</h5>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">18-24</span>
                            <span className="text-sm font-medium">25%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">25-34</span>
                            <span className="text-sm font-medium">35%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">35-44</span>
                            <span className="text-sm font-medium">20%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-gray-700 mb-3">Centres d'intérêt</h5>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Sport</span>
                            <span className="text-sm font-medium">28%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Mode</span>
                            <span className="text-sm font-medium">22%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Voyage</span>
                            <span className="text-sm font-medium">18%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Overlay de déblocage */}
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                        <LockClosedIcon className="w-8 h-8 text-purple-600" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        Rapport d'audience complet
                      </h4>
                      <p className="text-gray-600 mb-4 max-w-sm">
                        Débloquez l'analyse complète avec toutes les données d'audience, contenus et performances.
                      </p>
                      <div className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-50 border border-purple-200 rounded-lg mb-4">
                        <CreditCardIcon className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-900">1 crédit</span>
                      </div>
                      <Button onClick={handleUnlockReport} size="lg">
                        <LockClosedIcon className="w-4 h-4 mr-2" />
                        Débloquer maintenant
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 bg-white border-t border-gray-200">
                <h4 className="text-md font-semibold text-gray-900 mb-6">
                  Analyse détaillée de l'audience - Déverrouillée
                </h4>

                {/* Statistiques détaillées */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round(detailedData!.audience!.gender.female)}%
                </div>
                <div className="text-sm text-blue-800">Femmes</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round(detailedData!.audience!.gender.male)}%
                </div>
                <div className="text-sm text-purple-800">Hommes</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {Object.keys(detailedData!.audience!.countries).length}
                </div>
                <div className="text-sm text-green-800">Pays</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {Object.keys(detailedData!.audience!.interests.topics).length}
                </div>
                <div className="text-sm text-orange-800">Intérêts</div>
              </div>
            </div>

            {/* Répartition par âge */}
                <div className="bg-white border rounded-lg p-4 mb-6">
              <h4 className="font-medium text-gray-900 mb-3">
                Répartition par âge
              </h4>
              <div className="space-y-2">
                {Object.entries(detailedData!.audience!.age).map(
                  ([age, percentage]) => (
                    <div key={age} className="flex items-center">
                      <div className="w-16 text-sm text-gray-600">{age}</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-2 mx-3">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <div className="w-12 text-sm font-medium text-right">
                        {percentage}%
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Top pays */}
                <div className="bg-white border rounded-lg p-4 mb-6">
              <h4 className="font-medium text-gray-900 mb-3">Top pays</h4>
              <div className="space-y-2">
                {Object.entries(detailedData!.audience!.countries)
                  .sort(([, a], [, b]) => (b as number) - (a as number))
                  .slice(0, 5)
                  .map(([country, percentage]) => (
                    <div
                      key={country}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm text-gray-700">{country}</span>
                      <span className="text-sm font-medium">{percentage}%</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Centres d'intérêt */}
            <div className="bg-white border rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">
                    Centres d'intérêt
              </h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(detailedData!.audience!.interests.topics)
                  .sort(([, a], [, b]) => (b as number) - (a as number))
                  .slice(0, 8)
                  .map(([topic, percentage]) => (
                    <span
                      key={topic}
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                    >
                      {topic} ({percentage}%)
                    </span>
                  ))}
              </div>
            </div>
          </div>
            )}
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-8 px-4">
        {/* Header avec bouton retour */}
        <div className="mb-6">
        <Button
            variant="outline"
          onClick={() => router.back()}
            className="mb-4"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Retour à la recherche
        </Button>
      </div>

      {/* Header du profil */}
      <ProfileHeader
          influencer={influencer}
        onAddToList={handleAddToList}
        onContact={handleContact}
      />

        {/* Onglets et contenu */}
        <div className="mt-8">
      <ProfileTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        hasDetailedData={!!detailedData}
      />

          <div className="mt-6 bg-white rounded-lg border border-gray-200 shadow-sm">
        {renderTabContent()}
          </div>
        </div>
      </div>

      {/* Modales */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Contacter {influencer.name}
              </h3>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
                <Input
                label="Sujet"
                placeholder="Collaboration, partenariat..."
                />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  rows={4}
                  placeholder="Votre message..."
                ></textarea>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowContactModal(false)}
                className="flex-1"
              >
                Annuler
              </Button>
              <Button
                onClick={() => {
                  setShowContactModal(false);
                  // Ici on enverrait le message
                }}
                className="flex-1"
              >
                Envoyer
              </Button>
            </div>
          </div>
        </div>
      )}

      {showAddToListModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Ajouter à une liste
              </h3>
              <button
                onClick={() => setShowAddToListModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <p className="text-gray-600 mb-4">
              Sélectionnez une liste existante ou créez-en une nouvelle.
            </p>

            <div className="space-y-2 mb-4">
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                📋 Ma liste principale
              </button>
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                ⭐ Favoris
              </button>
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                🎯 Prospects
              </button>
            </div>

            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowAddToListModal(false)}
                className="flex-1"
              >
                Annuler
              </Button>
              <Button
                onClick={() => {
                  setShowAddToListModal(false);
                  // Ici on ajouterait à la liste
                }}
                className="flex-1"
              >
                Ajouter
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
