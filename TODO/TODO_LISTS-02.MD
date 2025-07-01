# PLAN D'ACTION PRESCRIPTIF : LISTS-02

**User Story :** En tant qu'utilisateur, je veux voir le détail d'une liste spécifique avec tous les influenceurs qu'elle contient et leurs informations de contact.

**Objectif :** Créer la page de détail d'une liste avec gestion des contacts et actions avancées.

---

## Plan d'Action Prescriptif

### Étape 1 : Créer le composant ListHeader

Créer `src/components/lists/ListHeader.tsx` :

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  PencilIcon,
  ShareIcon,
  DocumentArrowDownIcon,
  TrashIcon,
  UserPlusIcon,
  CalendarIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { InfluencerList } from "@/types";

interface ListHeaderProps {
  list: InfluencerList;
  onEdit: () => void;
  onDelete: () => void;
  onExport: () => void;
  onShare: () => void;
  onAddInfluencer: () => void;
}

export default function ListHeader({
  list,
  onEdit,
  onDelete,
  onExport,
  onShare,
  onAddInfluencer,
}: ListHeaderProps) {
  const [showActions, setShowActions] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Mode & Beauté":
        return "bg-pink-100 text-pink-800";
      case "Gaming":
        return "bg-purple-100 text-purple-800";
      case "Cuisine":
        return "bg-orange-100 text-orange-800";
      case "Automobile":
        return "bg-blue-100 text-blue-800";
      case "Lifestyle":
        return "bg-green-100 text-green-800";
      case "Marketing":
        return "bg-indigo-100 text-indigo-800";
      case "Voyage":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Mode & Beauté":
        return "👗";
      case "Gaming":
        return "🎮";
      case "Cuisine":
        return "🍳";
      case "Automobile":
        return "🚗";
      case "Lifestyle":
        return "✨";
      case "Marketing":
        return "📈";
      case "Voyage":
        return "✈️";
      default:
        return "📋";
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between space-y-4 md:space-y-0">
        {/* Informations principales */}
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <span className="text-3xl">{getCategoryIcon(list.category)}</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{list.name}</h1>
              <div className="flex items-center space-x-4 mt-1">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(
                    list.category
                  )}`}
                >
                  <TagIcon className="w-3 h-3 inline mr-1" />
                  {list.category}
                </span>
                <span className="text-sm text-gray-500 flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-1" />
                  Créée le {formatDate(list.createdAt)}
                </span>
              </div>
            </div>
          </div>

          {list.description && (
            <p className="text-gray-600 mb-4 max-w-2xl">{list.description}</p>
          )}

          {/* Statistiques */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {list.influencers.length}
              </div>
              <div className="text-sm text-purple-600 font-medium">
                Influenceur{list.influencers.length > 1 ? "s" : ""}
              </div>
            </div>

            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {list.influencers.filter((inf) => inf.contactEmail).length}
              </div>
              <div className="text-sm text-blue-600 font-medium">
                Contacts email
              </div>
            </div>

            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {list.influencers.length > 0 ? "100" : "0"}%
              </div>
              <div className="text-sm text-green-600 font-medium">
                Complétude
              </div>
            </div>

            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {new Date().toLocaleDateString("fr-FR") ===
                new Date(list.createdAt).toLocaleDateString("fr-FR")
                  ? "Aujourd'hui"
                  : "Active"}
              </div>
              <div className="text-sm text-orange-600 font-medium">Statut</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col space-y-2 md:ml-6">
          <Button onClick={onAddInfluencer} className="flex items-center">
            <UserPlusIcon className="w-4 h-4 mr-2" />
            Ajouter un influenceur
          </Button>

          <div className="flex space-x-2">
            <Button variant="outline" onClick={onEdit} size="sm">
              <PencilIcon className="w-4 h-4 mr-1" />
              Modifier
            </Button>

            <Button variant="outline" onClick={onExport} size="sm">
              <DocumentArrowDownIcon className="w-4 h-4 mr-1" />
              Export
            </Button>

            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setShowActions(!showActions)}
                size="sm"
              >
                •••
              </Button>

              {showActions && (
                <div className="absolute right-0 top-10 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                  <button
                    onClick={() => {
                      onShare();
                      setShowActions(false);
                    }}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <ShareIcon className="w-4 h-4" />
                    <span>Partager</span>
                  </button>

                  <div className="border-t border-gray-100 my-1"></div>

                  <button
                    onClick={() => {
                      onDelete();
                      setShowActions(false);
                    }}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <TrashIcon className="w-4 h-4" />
                    <span>Supprimer</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fermer le menu au clic extérieur */}
      {showActions && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowActions(false)}
        />
      )}
    </div>
  );
}
```

### Étape 2 : Créer le composant ContactsTable

Créer `src/components/lists/ContactsTable.tsx` :

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  MagnifyingGlassIcon,
  EnvelopeIcon,
  EyeIcon,
  TrashIcon,
  CheckBadgeIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";
import { InfluencerContact } from "@/types";

interface ContactsTableProps {
  contacts: InfluencerContact[];
  onRemoveContact: (contactId: string) => void;
  onContactInfluencer: (contact: InfluencerContact) => void;
}

export default function ContactsTable({
  contacts,
  onRemoveContact,
  onContactInfluencer,
}: ContactsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "email">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

  // Filtrer et trier les contacts
  const filteredContacts = contacts
    .filter(
      (contact) =>
        contact.contactName
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        contact.contactEmail?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const aValue =
        sortBy === "name" ? a.contactName || "" : a.contactEmail || "";
      const bValue =
        sortBy === "name" ? b.contactName || "" : b.contactEmail || "";

      if (sortOrder === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

  const handleSort = (field: "name" | "email") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const handleSelectAll = () => {
    if (selectedContacts.length === filteredContacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(filteredContacts.map((c) => c.id));
    }
  };

  const handleSelectContact = (contactId: string) => {
    if (selectedContacts.includes(contactId)) {
      setSelectedContacts((prev) => prev.filter((id) => id !== contactId));
    } else {
      setSelectedContacts((prev) => [...prev, contactId]);
    }
  };

  const handleBulkRemove = () => {
    if (
      confirm(
        `Supprimer ${selectedContacts.length} contact(s) de cette liste ?`
      )
    ) {
      selectedContacts.forEach((contactId) => onRemoveContact(contactId));
      setSelectedContacts([]);
    }
  };

  if (contacts.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <div className="text-6xl mb-4">👥</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Aucun influenceur dans cette liste
        </h3>
        <p className="text-gray-600">
          Ajoutez des influenceurs depuis la page de recherche pour commencer à
          constituer votre liste.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Header avec recherche et actions */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          {/* Recherche */}
          <div className="relative flex-1 max-w-md">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Rechercher un contact..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Actions de masse */}
          {selectedContacts.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {selectedContacts.length} sélectionné(s)
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleBulkRemove}
                className="text-red-600 hover:text-red-700"
              >
                <TrashIcon className="w-4 h-4 mr-1" />
                Supprimer
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={
                    selectedContacts.length === filteredContacts.length &&
                    filteredContacts.length > 0
                  }
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center space-x-1">
                  <span>Nom</span>
                  {sortBy === "name" && (
                    <span className="text-purple-600">
                      {sortOrder === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("email")}
              >
                <div className="flex items-center space-x-1">
                  <span>Email</span>
                  {sortBy === "email" && (
                    <span className="text-purple-600">
                      {sortOrder === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredContacts.map((contact) => (
              <tr key={contact.id} className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={selectedContacts.includes(contact.id)}
                    onChange={() => handleSelectContact(contact.id)}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {contact.contactName?.charAt(0) || "?"}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {contact.contactName || "Nom non disponible"}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: {contact.id}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm text-gray-900">
                    {contact.contactEmail || (
                      <span className="text-gray-400 italic">
                        Email non disponible
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-2">
                    {contact.contactEmail ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckBadgeIcon className="w-3 h-3 mr-1" />
                        Contactable
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Email manquant
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Link href={`/profile/${contact.id}`}>
                      <Button variant="outline" size="sm">
                        <EyeIcon className="w-4 h-4 mr-1" />
                        Voir
                      </Button>
                    </Link>

                    {contact.contactEmail && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onContactInfluencer(contact)}
                      >
                        <EnvelopeIcon className="w-4 h-4 mr-1" />
                        Contact
                      </Button>
                    )}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onRemoveContact(contact.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer avec pagination si nécessaire */}
      {filteredContacts.length > 0 && (
        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Affichage de {filteredContacts.length} contact
              {filteredContacts.length > 1 ? "s" : ""}
              {searchQuery && ` (filtré sur "${searchQuery}")`}
            </div>

            <div className="text-sm text-gray-500">
              {filteredContacts.filter((c) => c.contactEmail).length} avec email
              • {filteredContacts.filter((c) => !c.contactEmail).length} sans
              email
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

### Étape 3 : Créer la page de détail de liste

Créer `src/app/lists/[id]/page.tsx` :

```tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import ListHeader from "@/components/lists/ListHeader";
import ContactsTable from "@/components/lists/ContactsTable";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { InfluencerList, InfluencerContact } from "@/types";
import {
  getUserListById,
  deleteUserList,
  exportListToCSV,
  removeInfluencerFromList,
} from "@/lib/mockData";

export default function ListDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [list, setList] = useState<InfluencerList | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadList();
  }, [params.id]);

  const loadList = async () => {
    try {
      const listId = params.id as string;
      const foundList = await getUserListById(listId);

      if (!foundList) {
        setError("Liste non trouvée");
        return;
      }

      setList(foundList);
    } catch (err) {
      console.error("Erreur lors du chargement de la liste:", err);
      setError("Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  };

  const handleEditList = () => {
    // TODO: Implémenter la modification de liste
    console.log("Modifier la liste:", list?.name);
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
      router.push("/lists");
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    }
  };

  const handleExportList = async () => {
    if (!list) return;

    try {
      const csvContent = await exportListToCSV(list.id);

      // Créer et télécharger le fichier CSV
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `${list.name}-contacts.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Erreur lors de l'export:", error);
    }
  };

  const handleShareList = () => {
    // TODO: Implémenter le partage de liste
    console.log("Partager la liste:", list?.name);
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
      console.error("Erreur lors de la suppression du contact:", error);
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
          {error || "Liste non trouvée"}
        </h1>
        <p className="text-gray-600 mb-6">
          La liste que vous recherchez n'existe pas ou a été supprimée.
        </p>
        <Button onClick={() => router.push("/lists")}>
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
          onClick={() => router.push("/lists")}
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
        onExport={handleExportList}
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
```

### Étape 4 : Vérifier l'installation

```bash
npm run lint
npm run build
```

---

## Checklist de Validation

- [ ] Étape 1 : Composant ListHeader créé avec statistiques et actions
- [ ] Étape 2 : Composant ContactsTable créé avec recherche et tri
- [ ] Étape 3 : Page de détail de liste créée avec gestion complète
- [ ] Étape 4 : Lint et build passent sans erreur
