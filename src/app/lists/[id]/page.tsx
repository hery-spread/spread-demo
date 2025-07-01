'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import ListHeader from '@/components/lists/ListHeader';
import ContactsTable from '@/components/lists/ContactsTable';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
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
    // TODO: Implémenter le partage de liste
    console.log('Partager la liste:', list?.name);
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
      />

      {/* Table des contacts */}
      <ContactsTable
        contacts={list.influencers}
        onRemoveContact={handleRemoveContact}
        onContactInfluencer={handleContactInfluencer}
      />
    </div>
  );
}
