# PLAN D'ACTION PRESCRIPTIF : LISTS-01

**User Story :** En tant qu'utilisateur, je veux voir toutes mes listes d'influenceurs créées pour organiser mes contacts et campagnes.

**Objectif :** Créer la page principale des listes avec vue d'ensemble et actions de gestion.

---

## Plan d'Action Prescriptif

### Étape 1 : Créer le composant ListCard

Créer `src/components/lists/ListCard.tsx` :

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
  ShareIcon,
  DocumentArrowDownIcon,
  UserGroupIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { InfluencerList } from "@/types";

interface ListCardProps {
  list: InfluencerList;
  onEdit: (list: InfluencerList) => void;
  onDelete: (listId: string) => void;
  onExport: (listId: string) => void;
  onShare: (listId: string) => void;
}

export default function ListCard({
  list,
  onEdit,
  onDelete,
  onExport,
  onShare,
}: ListCardProps) {
  const [showMenu, setShowMenu] = useState(false);

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
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-2xl">{getCategoryIcon(list.category)}</span>
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(
                list.category
              )}`}
            >
              {list.category}
            </span>
          </div>

          <Link
            href={`/lists/${list.id}`}
            className="text-lg font-semibold text-gray-900 hover:text-purple-600 transition-colors"
          >
            {list.name}
          </Link>

          {list.description && (
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {list.description}
            </p>
          )}
        </div>

        {/* Menu actions */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <EllipsisVerticalIcon className="w-5 h-5" />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-10 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
              <button
                onClick={() => {
                  onEdit(list);
                  setShowMenu(false);
                }}
                className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <PencilIcon className="w-4 h-4" />
                <span>Modifier</span>
              </button>

              <button
                onClick={() => {
                  onShare(list.id);
                  setShowMenu(false);
                }}
                className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <ShareIcon className="w-4 h-4" />
                <span>Partager</span>
              </button>

              <button
                onClick={() => {
                  onExport(list.id);
                  setShowMenu(false);
                }}
                className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <DocumentArrowDownIcon className="w-4 h-4" />
                <span>Exporter CSV</span>
              </button>

              <div className="border-t border-gray-100 my-1"></div>

              <button
                onClick={() => {
                  onDelete(list.id);
                  setShowMenu(false);
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

      {/* Statistiques */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <UserGroupIcon className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            {list.influencers.length} influenceur
            {list.influencers.length > 1 ? "s" : ""}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <CalendarIcon className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            {formatDate(list.createdAt)}
          </span>
        </div>
      </div>

      {/* Aperçu des influenceurs */}
      {list.influencers.length > 0 && (
        <div className="mb-4">
          <div className="text-xs font-medium text-gray-500 mb-2">Aperçu :</div>
          <div className="flex flex-wrap gap-1">
            {list.influencers.slice(0, 3).map((influencer) => (
              <span
                key={influencer.id}
                className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
              >
                {influencer.contactName}
              </span>
            ))}
            {list.influencers.length > 3 && (
              <span className="px-2 py-1 text-xs bg-gray-100 text-gray-500 rounded-full">
                +{list.influencers.length - 3} autres
              </span>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center space-x-2">
        <Link href={`/lists/${list.id}`}>
          <Button size="sm" className="flex-1">
            Voir la liste
          </Button>
        </Link>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onExport(list.id)}
          className="flex items-center"
        >
          <DocumentArrowDownIcon className="w-4 h-4 mr-1" />
          Export
        </Button>
      </div>

      {/* Fermer le menu au clic extérieur */}
      {showMenu && (
        <div className="fixed inset-0 z-0" onClick={() => setShowMenu(false)} />
      )}
    </div>
  );
}
```

### Étape 2 : Créer le composant CreateListModal

Créer `src/components/lists/CreateListModal.tsx` :

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface CreateListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (listData: {
    name: string;
    description: string;
    category: string;
  }) => Promise<void>;
}

export default function CreateListModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateListModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);

  const categories = [
    "Mode & Beauté",
    "Gaming",
    "Cuisine",
    "Automobile",
    "Lifestyle",
    "Marketing",
    "Voyage",
    "Technologie",
    "Sport",
    "Musique",
    "Autre",
  ];

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.category) {
      return;
    }

    setLoading(true);
    try {
      await onSubmit(formData);
      setFormData({ name: "", description: "", category: "" });
      onClose();
    } catch (error) {
      console.error("Erreur lors de la création:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ name: "", description: "", category: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Créer une nouvelle liste
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nom de la liste */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom de la liste *
            </label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Ex: Campagne HelloFresh"
              required
              maxLength={50}
            />
            <div className="text-xs text-gray-500 mt-1">
              {formData.name.length}/50 caractères
            </div>
          </div>

          {/* Catégorie */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Catégorie *
            </label>
            <Select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              required
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description (optionnel)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Décrivez l'objectif de cette liste..."
              rows={3}
              maxLength={200}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
            />
            <div className="text-xs text-gray-500 mt-1">
              {formData.description.length}/200 caractères
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
              disabled={loading}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={loading || !formData.name.trim() || !formData.category}
            >
              {loading ? "Création..." : "Créer la liste"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
```

### Étape 3 : Créer la page principale des listes

Créer `src/app/lists/page.tsx` :

```tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import ListCard from "@/components/lists/ListCard";
import CreateListModal from "@/components/lists/CreateListModal";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  Squares2X2Icon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";
import { InfluencerList } from "@/types";
import {
  getUserLists,
  createUserList,
  deleteUserList,
  exportListToCSV,
} from "@/lib/mockData";

export default function ListsPage() {
  const [lists, setLists] = useState<InfluencerList[]>([]);
  const [filteredLists, setFilteredLists] = useState<InfluencerList[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Charger les listes
  useEffect(() => {
    loadLists();
  }, []);

  // Filtrer les listes
  useEffect(() => {
    let filtered = lists;

    if (searchQuery) {
      filtered = filtered.filter(
        (list) =>
          list.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          list.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter((list) => list.category === categoryFilter);
    }

    setFilteredLists(filtered);
  }, [lists, searchQuery, categoryFilter]);

  const loadLists = async () => {
    try {
      const userLists = await getUserLists();
      setLists(userLists);
    } catch (error) {
      console.error("Erreur lors du chargement des listes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateList = async (listData: {
    name: string;
    description: string;
    category: string;
  }) => {
    try {
      const newList = await createUserList(listData);
      setLists((prev) => [newList, ...prev]);
    } catch (error) {
      console.error("Erreur lors de la création:", error);
      throw error;
    }
  };

  const handleEditList = (list: InfluencerList) => {
    // TODO: Implémenter la modification
    console.log("Modifier la liste:", list.name);
  };

  const handleDeleteList = async (listId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette liste ?")) {
      return;
    }

    try {
      await deleteUserList(listId);
      setLists((prev) => prev.filter((list) => list.id !== listId));
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    }
  };

  const handleExportList = async (listId: string) => {
    try {
      const csvContent = await exportListToCSV(listId);
      const list = lists.find((l) => l.id === listId);

      // Créer et télécharger le fichier CSV
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `${list?.name || "liste"}-contacts.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Erreur lors de l'export:", error);
    }
  };

  const handleShareList = (listId: string) => {
    // TODO: Implémenter le partage
    console.log("Partager la liste:", listId);
  };

  const categories = Array.from(
    new Set(lists.map((list) => list.category))
  ).sort();

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mes listes</h1>
          <p className="text-gray-600">
            Gérez vos listes d'influenceurs et organisez vos campagnes
          </p>
        </div>

        <Button onClick={() => setShowCreateModal(true)}>
          <PlusIcon className="w-4 h-4 mr-2" />
          Nouvelle liste
        </Button>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-purple-600">
            {lists.length}
          </div>
          <div className="text-sm text-gray-600">Listes créées</div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-blue-600">
            {lists.reduce((sum, list) => sum + list.influencers.length, 0)}
          </div>
          <div className="text-sm text-gray-600">Contacts total</div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-green-600">
            {categories.length}
          </div>
          <div className="text-sm text-gray-600">Catégories</div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-orange-600">
            {Math.round(
              lists.reduce((sum, list) => sum + list.influencers.length, 0) /
                (lists.length || 1)
            )}
          </div>
          <div className="text-sm text-gray-600">Contacts par liste</div>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          {/* Recherche */}
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Rechercher une liste..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filtre par catégorie */}
          <div className="flex items-center space-x-2">
            <FunnelIcon className="w-5 h-5 text-gray-400" />
            <Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-48"
            >
              <option value="">Toutes les catégories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
          </div>

          {/* Mode d'affichage */}
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "grid"
                  ? "bg-white text-purple-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Squares2X2Icon className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "list"
                  ? "bg-white text-purple-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <ListBulletIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Listes */}
      {filteredLists.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {lists.length === 0 ? "Aucune liste créée" : "Aucune liste trouvée"}
          </h3>
          <p className="text-gray-600 mb-6">
            {lists.length === 0
              ? "Créez votre première liste pour organiser vos influenceurs"
              : "Essayez de modifier vos critères de recherche"}
          </p>
          {lists.length === 0 && (
            <Button onClick={() => setShowCreateModal(true)}>
              <PlusIcon className="w-4 h-4 mr-2" />
              Créer ma première liste
            </Button>
          )}
        </div>
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }
        >
          {filteredLists.map((list) => (
            <ListCard
              key={list.id}
              list={list}
              onEdit={handleEditList}
              onDelete={handleDeleteList}
              onExport={handleExportList}
              onShare={handleShareList}
            />
          ))}
        </div>
      )}

      {/* Modal de création */}
      <CreateListModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateList}
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

- [ ] Étape 1 : Composant ListCard créé avec actions et aperçu
- [ ] Étape 2 : Composant CreateListModal créé avec formulaire
- [ ] Étape 3 : Page principale des listes créée avec filtres et recherche
- [ ] Étape 4 : Lint et build passent sans erreur
