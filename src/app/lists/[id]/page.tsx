'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import ListHeader from '@/components/lists/ListHeader';
import ContactsTable from '@/components/lists/ContactsTable';
import SelectionPreview from '@/components/lists/SelectionPreview';
import BulkEmailModal from '@/components/lists/BulkEmailModal';
import ShareListModal from '@/components/lists/ShareListModal';
import {
  ArrowLeftIcon,
  LinkIcon,
  EyeIcon,
  ChartBarIcon,
  ClipboardIcon,
} from '@heroicons/react/24/outline';
import { InfluencerList, InfluencerContact } from '@/types';
import {
  getUserListById,
  deleteUserList,
  removeInfluencerFromList,
} from '@/lib/mockData';

export default function ListDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [list, setList] = useState<InfluencerList | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Nouveaux états pour la sélection
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [showBulkEmailModal, setShowBulkEmailModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [activeShareLink, setActiveShareLink] = useState<string | null>(null);
  const [showShareInfo, setShowShareInfo] = useState(false);

  const loadList = useCallback(async () => {
    try {
      const listId = params.id as string;
      const foundList = await getUserListById(listId);

      if (!foundList) {
        setError('Liste non trouvée');
        return;
      }

      setList(foundList);
    } catch (err) {
      console.error('Erreur lors du chargement de la liste:', err);
      setError('Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    loadList();
  }, [loadList]);

  // Simuler un lien de partage actif pour la démo
  useEffect(() => {
    if (list) {
      const mockShareLink = `${typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'}/share/list/demo_${list.id}_2025`;
      setActiveShareLink(mockShareLink);
      setShowShareInfo(true);
    }
  }, [list]);

  const handleEditList = () => {
    // TODO: Implémenter la modification de liste
    console.log('Modifier la liste:', list?.name);
  };

  const handleDeleteList = async () => {
    if (!list) return;

    if (
      !confirm(`Êtes-vous sûr de vouloir supprimer la liste "${list.name}" ?`)
    ) {
      return;
    }

    try {
      await deleteUserList(list.id);
      router.push('/lists');
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  const handleShareList = () => {
    setShowShareModal(true);
  };

  const copyShareLink = async () => {
    if (!activeShareLink) return;
    try {
      await navigator.clipboard.writeText(activeShareLink);
      alert('Lien copié !');
    } catch (error) {
      console.error('Erreur lors de la copie:', error);
    }
  };

  const handleAddInfluencer = () => {
    // Rediriger vers la recherche avec un paramètre pour ajouter à cette liste
    router.push(`/search?addToList=${list?.id}`);
  };

  const handleRemoveContact = async (contactId: string) => {
    if (!list) return;

    const contact = list.influencers.find((inf) => inf.id === contactId);
    if (!contact) return;

    if (!confirm(`Supprimer ${contact.contactName} de cette liste ?`)) {
      return;
    }

    try {
      await removeInfluencerFromList(list.id, contactId);

      // Mettre à jour la liste localement
      setList((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          influencers: prev.influencers.filter((inf) => inf.id !== contactId),
        };
      });
    } catch (error) {
      console.error('Erreur lors de la suppression du contact:', error);
    }
  };

  const handleContactInfluencer = (contact: InfluencerContact) => {
    // TODO: Ouvrir la modal de contact ou rediriger vers l'email
    if (contact.contactEmail) {
      const subject = encodeURIComponent(
        `Collaboration - ${contact.contactName}`
      );
      const body = encodeURIComponent(
        `Bonjour ${contact.contactName},\n\nJe vous contacte concernant une potentielle collaboration...\n\nCordialement`
      );
      window.open(
        `mailto:${contact.contactEmail}?subject=${subject}&body=${body}`
      );
    }
  };

  // Nouveaux handlers pour la sélection
  const handleSelectionChange = (newSelection: string[]) => {
    setSelectedContacts(newSelection);
  };

  const handleOpenBulkEmailModal = () => {
    setShowBulkEmailModal(true);
  };

  const handleCloseBulkEmailModal = () => {
    setShowBulkEmailModal(false);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded-lg mb-6"></div>
          <div className="h-96 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (error || !list) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">❌</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {error || 'Liste non trouvée'}
        </h1>
        <p className="text-gray-600 mb-6">
          La liste que vous recherchez n&apos;existe pas ou a été supprimée.
        </p>
        <Button onClick={() => router.push('/lists')}>
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Retour aux listes
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Bouton retour */}
      <div>
        <Button
          variant="ghost"
          onClick={() => router.push('/lists')}
          className="flex items-center"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Retour aux listes
        </Button>
      </div>

      {/* Header de la liste */}
      <ListHeader
        list={list}
        onEdit={handleEditList}
        onDelete={handleDeleteList}
        onShare={handleShareList}
        onAddInfluencer={handleAddInfluencer}
        onViewShareResults={() =>
          router.push(`/lists/${list.id}/share-results`)
        }
      />

      {/* Section Partage Actif */}
      {showShareInfo && activeShareLink && (
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center">
                <LinkIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Liste partagée active
                </h3>
                <p className="text-sm text-purple-700">
                  Votre liste de casting est accessible publiquement
                </p>
              </div>
            </div>
          </div>

          {/* Lien de partage */}
          <div className="bg-white rounded-lg p-4 mb-4">
            <label className="text-xs font-medium text-gray-600 mb-2 block">
              Lien de partage
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={activeShareLink}
                readOnly
                className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm font-mono"
              />
              <Button
                onClick={copyShareLink}
                size="sm"
                variant="outline"
                className="flex items-center space-x-1"
              >
                <ClipboardIcon className="w-4 h-4" />
                <span>Copier</span>
              </Button>
              <Button
                onClick={() => window.open(activeShareLink, '_blank')}
                size="sm"
                className="bg-purple-600 hover:bg-purple-700"
              >
                Ouvrir
              </Button>
            </div>
          </div>

          {/* Indicateur de réponse */}
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center justify-center space-x-2">
              <EyeIcon className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">{Math.floor(Math.random() * 50) + 15}</span> vues • 
                <span className="font-semibold text-gray-900 ml-2">En attente de feedback</span>
              </span>
            </div>
          </div>

          {/* Bouton pour voir les détails */}
          <div className="mt-4">
            <Button
              onClick={() => router.push(`/lists/${list.id}/share-results`)}
              variant="outline"
              className="w-full border-purple-300 text-purple-700 hover:bg-white"
            >
              <ChartBarIcon className="w-4 h-4 mr-2" />
              Voir le classement détaillé des créateurs
            </Button>
          </div>
        </div>
      )}

      {/* Aperçu de la sélection avec actions rapides */}
      {list.influencers.length > 0 && (
        <SelectionPreview
          contacts={list.influencers}
          selectedContacts={selectedContacts}
          validContacts={list.influencers.filter((inf) => inf.contactEmail)}
          onOpenSelectionPanel={handleOpenBulkEmailModal}
          showAdvancedSelection={true}
          title="Sélection pour contact en masse"
          className="mb-6"
        />
      )}

      {/* Table des contacts */}
      <ContactsTable
        contacts={list.influencers}
        onRemoveContact={handleRemoveContact}
        onContactInfluencer={handleContactInfluencer}
      />

      {/* Modal d'email en masse avec sélection avancée */}
      <BulkEmailModal
        isOpen={showBulkEmailModal}
        onClose={handleCloseBulkEmailModal}
        influencers={list.influencers}
        listName={list.name}
        selectedContacts={selectedContacts}
        onSelectionChange={handleSelectionChange}
      />

      {/* Share List Modal */}
      <ShareListModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        list={list}
      />
    </div>
  );
}
