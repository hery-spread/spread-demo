# PLAN D'ACTION PRESCRIPTIF : LISTS-04

**User Story :** En tant qu'utilisateur, je veux pouvoir dupliquer, fusionner et organiser mes listes d'influenceurs pour optimiser ma gestion de contacts.

**Objectif :** Créer des fonctionnalités avancées de gestion des listes (duplication, fusion, organisation).

---

## Plan d'Action Prescriptif

### Étape 1 : Créer le composant ListActions

Créer `src/components/lists/ListActions.tsx` :

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  DocumentDuplicateIcon,
  ArrowsPointingInIcon,
  FolderIcon,
  ArchiveBoxIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { InfluencerList } from "@/types";

interface ListActionsProps {
  selectedLists: string[];
  allLists: InfluencerList[];
  onDuplicate: (listId: string) => void;
  onMerge: (listIds: string[]) => void;
  onArchive: (listIds: string[]) => void;
  onFavorite: (listIds: string[]) => void;
  onClearSelection: () => void;
}

export default function ListActions({
  selectedLists,
  allLists,
  onDuplicate,
  onMerge,
  onArchive,
  onFavorite,
  onClearSelection,
}: ListActionsProps) {
  const [showMergeModal, setShowMergeModal] = useState(false);

  if (selectedLists.length === 0) return null;

  const selectedListsData = allLists.filter((list) =>
    selectedLists.includes(list.id)
  );
  const canMerge = selectedLists.length >= 2;

  const handleDuplicateAll = () => {
    selectedLists.forEach((listId) => onDuplicate(listId));
    onClearSelection();
  };

  const handleMerge = () => {
    if (canMerge) {
      setShowMergeModal(true);
    }
  };

  const confirmMerge = (newListName: string) => {
    onMerge(selectedLists);
    setShowMergeModal(false);
    onClearSelection();
  };

  const handleArchive = () => {
    if (
      confirm(`Archiver ${selectedLists.length} liste(s) sélectionnée(s) ?`)
    ) {
      onArchive(selectedLists);
      onClearSelection();
    }
  };

  const handleFavorite = () => {
    onFavorite(selectedLists);
    onClearSelection();
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">
              {selectedLists.length} liste{selectedLists.length > 1 ? "s" : ""}{" "}
              sélectionnée{selectedLists.length > 1 ? "s" : ""}
            </span>
            <button
              onClick={onClearSelection}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Désélectionner
            </button>
          </div>

          <div className="flex items-center space-x-2">
            {selectedLists.length === 1 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDuplicate(selectedLists[0])}
              >
                <DocumentDuplicateIcon className="w-4 h-4 mr-1" />
                Dupliquer
              </Button>
            )}

            {canMerge && (
              <Button variant="outline" size="sm" onClick={handleMerge}>
                <ArrowsPointingInIcon className="w-4 h-4 mr-1" />
                Fusionner
              </Button>
            )}

            <Button variant="outline" size="sm" onClick={handleFavorite}>
              <StarIcon className="w-4 h-4 mr-1" />
              Favoris
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleArchive}
              className="text-orange-600 hover:text-orange-700"
            >
              <ArchiveBoxIcon className="w-4 h-4 mr-1" />
              Archiver
            </Button>
          </div>
        </div>

        {/* Aperçu des listes sélectionnées */}
        <div className="mt-3 flex flex-wrap gap-2">
          {selectedListsData.slice(0, 3).map((list) => (
            <span
              key={list.id}
              className="inline-flex items-center px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full"
            >
              {list.name} ({list.influencers.length})
            </span>
          ))}
          {selectedListsData.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
              +{selectedListsData.length - 3} autres
            </span>
          )}
        </div>
      </div>

      {/* Modal de fusion */}
      {showMergeModal && (
        <MergeListsModal
          lists={selectedListsData}
          onConfirm={confirmMerge}
          onCancel={() => setShowMergeModal(false)}
        />
      )}
    </>
  );
}

interface MergeListsModalProps {
  lists: InfluencerList[];
  onConfirm: (newListName: string) => void;
  onCancel: () => void;
}

function MergeListsModal({ lists, onConfirm, onCancel }: MergeListsModalProps) {
  const [newListName, setNewListName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const totalContacts = lists.reduce(
    (sum, list) => sum + list.influencers.length,
    0
  );
  const uniqueContacts = new Set(
    lists.flatMap((list) => list.influencers.map((inf) => inf.id))
  ).size;
  const categories = Array.from(new Set(lists.map((list) => list.category)));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newListName.trim()) {
      onConfirm(newListName.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Fusionner les listes
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Aperçu de la fusion */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              Listes à fusionner :
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {lists.map((list) => (
                <li key={list.id} className="flex items-center justify-between">
                  <span>{list.name}</span>
                  <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                    {list.influencers.length} contacts
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-900">Total :</span>
                <span className="text-gray-600">
                  {uniqueContacts} contacts uniques (sur {totalContacts} total)
                </span>
              </div>
            </div>
          </div>

          {/* Nom de la nouvelle liste */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom de la nouvelle liste
            </label>
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder="Ex: Liste fusionnée"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          {/* Catégorie */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Catégorie
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
              <option value="Mixte">Mixte</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={!newListName.trim() || !selectedCategory}
            >
              Fusionner
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
```

### Étape 2 : Créer le composant ListOrganizer

Créer `src/components/lists/ListOrganizer.tsx` :

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  FolderIcon,
  PlusIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { InfluencerList } from "@/types";

interface ListFolder {
  id: string;
  name: string;
  color: string;
  listIds: string[];
  isExpanded: boolean;
}

interface ListOrganizerProps {
  lists: InfluencerList[];
  onOrganize: (folders: ListFolder[]) => void;
}

export default function ListOrganizer({
  lists,
  onOrganize,
}: ListOrganizerProps) {
  const [folders, setFolders] = useState<ListFolder[]>([
    {
      id: "1",
      name: "Campagnes actives",
      color: "green",
      listIds: ["1", "2"],
      isExpanded: true,
    },
    {
      id: "2",
      name: "Projets futurs",
      color: "blue",
      listIds: ["3", "4"],
      isExpanded: true,
    },
    {
      id: "3",
      name: "Archives",
      color: "gray",
      listIds: ["5"],
      isExpanded: false,
    },
  ]);

  const [unorganizedLists, setUnorganizedLists] = useState<string[]>(
    lists
      .filter(
        (list) => !folders.some((folder) => folder.listIds.includes(list.id))
      )
      .map((list) => list.id)
  );

  const [newFolderName, setNewFolderName] = useState("");
  const [showNewFolderForm, setShowNewFolderForm] = useState(false);

  const colors = [
    { name: "Vert", value: "green", class: "bg-green-500" },
    { name: "Bleu", value: "blue", class: "bg-blue-500" },
    { name: "Violet", value: "purple", class: "bg-purple-500" },
    { name: "Rouge", value: "red", class: "bg-red-500" },
    { name: "Orange", value: "orange", class: "bg-orange-500" },
    { name: "Gris", value: "gray", class: "bg-gray-500" },
  ];

  const createFolder = (name: string, color: string) => {
    const newFolder: ListFolder = {
      id: Date.now().toString(),
      name,
      color,
      listIds: [],
      isExpanded: true,
    };

    setFolders((prev) => [...prev, newFolder]);
    setNewFolderName("");
    setShowNewFolderForm(false);
  };

  const toggleFolder = (folderId: string) => {
    setFolders((prev) =>
      prev.map((folder) =>
        folder.id === folderId
          ? { ...folder, isExpanded: !folder.isExpanded }
          : folder
      )
    );
  };

  const moveListToFolder = (listId: string, targetFolderId: string | null) => {
    setFolders((prev) =>
      prev.map((folder) => {
        if (folder.id === targetFolderId) {
          return { ...folder, listIds: [...folder.listIds, listId] };
        } else {
          return {
            ...folder,
            listIds: folder.listIds.filter((id) => id !== listId),
          };
        }
      })
    );

    if (targetFolderId === null) {
      setUnorganizedLists((prev) => [...prev, listId]);
    } else {
      setUnorganizedLists((prev) => prev.filter((id) => id !== listId));
    }
  };

  const getListById = (listId: string) =>
    lists.find((list) => list.id === listId);

  const getFolderColorClass = (color: string) => {
    const colorMap = {
      green: "bg-green-100 text-green-800",
      blue: "bg-blue-100 text-blue-800",
      purple: "bg-purple-100 text-purple-800",
      red: "bg-red-100 text-red-800",
      orange: "bg-orange-100 text-orange-800",
      gray: "bg-gray-100 text-gray-800",
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.gray;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Organisation des listes
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowNewFolderForm(true)}
        >
          <PlusIcon className="w-4 h-4 mr-1" />
          Nouveau dossier
        </Button>
      </div>

      {/* Formulaire nouveau dossier */}
      {showNewFolderForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 mb-3">
            Créer un nouveau dossier
          </h4>
          <div className="space-y-3">
            <Input
              type="text"
              placeholder="Nom du dossier"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
            />

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Couleur
              </label>
              <div className="flex space-x-2">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => createFolder(newFolderName, color.value)}
                    disabled={!newFolderName.trim()}
                    className={`w-8 h-8 rounded-full ${color.class} hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed`}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowNewFolderForm(false)}
              >
                Annuler
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Dossiers */}
      <div className="space-y-3">
        {folders.map((folder) => (
          <div key={folder.id} className="border border-gray-200 rounded-lg">
            <div
              className={`flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 ${getFolderColorClass(
                folder.color
              )}`}
              onClick={() => toggleFolder(folder.id)}
            >
              <div className="flex items-center space-x-2">
                {folder.isExpanded ? (
                  <ChevronDownIcon className="w-4 h-4" />
                ) : (
                  <ChevronRightIcon className="w-4 h-4" />
                )}
                <FolderIcon className="w-5 h-5" />
                <span className="font-medium">{folder.name}</span>
                <span className="text-sm opacity-75">
                  ({folder.listIds.length})
                </span>
              </div>
            </div>

            {folder.isExpanded && (
              <div className="p-3 bg-gray-50 border-t border-gray-200">
                {folder.listIds.length === 0 ? (
                  <p className="text-sm text-gray-500 italic">
                    Aucune liste dans ce dossier
                  </p>
                ) : (
                  <div className="space-y-2">
                    {folder.listIds.map((listId) => {
                      const list = getListById(listId);
                      if (!list) return null;

                      return (
                        <div
                          key={listId}
                          className="flex items-center justify-between p-2 bg-white rounded border"
                        >
                          <div>
                            <div className="font-medium text-sm">
                              {list.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {list.influencers.length} contacts •{" "}
                              {list.category}
                            </div>
                          </div>
                          <button
                            onClick={() => moveListToFolder(listId, null)}
                            className="text-xs text-gray-500 hover:text-gray-700"
                          >
                            Retirer
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Listes non organisées */}
        {unorganizedLists.length > 0 && (
          <div className="border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between p-3 bg-gray-100">
              <div className="flex items-center space-x-2">
                <FolderIcon className="w-5 h-5 text-gray-400" />
                <span className="font-medium text-gray-700">
                  Non organisées
                </span>
                <span className="text-sm text-gray-500">
                  ({unorganizedLists.length})
                </span>
              </div>
            </div>

            <div className="p-3 space-y-2">
              {unorganizedLists.map((listId) => {
                const list = getListById(listId);
                if (!list) return null;

                return (
                  <div
                    key={listId}
                    className="flex items-center justify-between p-2 bg-white rounded border"
                  >
                    <div>
                      <div className="font-medium text-sm">{list.name}</div>
                      <div className="text-xs text-gray-500">
                        {list.influencers.length} contacts • {list.category}
                      </div>
                    </div>
                    <select
                      onChange={(e) =>
                        moveListToFolder(listId, e.target.value || null)
                      }
                      className="text-xs border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="">Déplacer vers...</option>
                      {folders.map((folder) => (
                        <option key={folder.id} value={folder.id}>
                          {folder.name}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="mt-6 flex justify-end">
        <Button onClick={() => onOrganize(folders)}>
          Sauvegarder l'organisation
        </Button>
      </div>
    </div>
  );
}
```

### Étape 3 : Étendre les fonctions de gestion des listes

Ajouter dans `src/lib/mockData.ts` :

```tsx
// Fonctions avancées de gestion des listes
export function duplicateList(listId: string): Promise<InfluencerList> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const originalList = mockLists.find((list) => list.id === listId);
      if (!originalList) {
        throw new Error("Liste non trouvée");
      }

      const duplicatedList: InfluencerList = {
        ...originalList,
        id: Date.now().toString(),
        name: `${originalList.name} (Copie)`,
        createdAt: new Date().toISOString().split("T")[0],
      };

      mockLists.unshift(duplicatedList);
      resolve(duplicatedList);
    }, 500);
  });
}

export function mergeLists(
  listIds: string[],
  newListName: string,
  category: string
): Promise<InfluencerList> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const listsToMerge = mockLists.filter((list) =>
        listIds.includes(list.id)
      );

      // Combiner tous les influenceurs en évitant les doublons
      const allInfluencers = listsToMerge.flatMap((list) => list.influencers);
      const uniqueInfluencers = allInfluencers.filter(
        (influencer, index, self) =>
          index === self.findIndex((inf) => inf.id === influencer.id)
      );

      const mergedList: InfluencerList = {
        id: Date.now().toString(),
        name: newListName,
        description: `Liste fusionnée à partir de ${listsToMerge.length} listes`,
        category,
        createdAt: new Date().toISOString().split("T")[0],
        influencers: uniqueInfluencers,
      };

      // Supprimer les listes originales
      listIds.forEach((listId) => {
        const index = mockLists.findIndex((list) => list.id === listId);
        if (index > -1) {
          mockLists.splice(index, 1);
        }
      });

      // Ajouter la nouvelle liste
      mockLists.unshift(mergedList);
      resolve(mergedList);
    }, 1000);
  });
}

export function archiveLists(listIds: string[]): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simuler l'archivage (dans une vraie app, on marquerait les listes comme archivées)
      listIds.forEach((listId) => {
        const list = mockLists.find((l) => l.id === listId);
        if (list) {
          list.name = `[ARCHIVÉ] ${list.name}`;
        }
      });
      resolve(true);
    }, 500);
  });
}

export function favoriteLists(listIds: string[]): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simuler l'ajout aux favoris (dans une vraie app, on sauvegarderait cette info)
      listIds.forEach((listId) => {
        const list = mockLists.find((l) => l.id === listId);
        if (list && !list.name.startsWith("⭐")) {
          list.name = `⭐ ${list.name}`;
        }
      });
      resolve(true);
    }, 300);
  });
}

export function bulkUpdateListCategory(
  listIds: string[],
  newCategory: string
): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      listIds.forEach((listId) => {
        const list = mockLists.find((l) => l.id === listId);
        if (list) {
          list.category = newCategory;
        }
      });
      resolve(true);
    }, 500);
  });
}
```

### Étape 4 : Vérifier l'installation

```bash
npm run lint
npm run build
```

---

## Checklist de Validation

- [ ] Étape 1 : Composant ListActions créé avec actions en lot
- [ ] Étape 2 : Composant ListOrganizer créé avec système de dossiers
- [ ] Étape 3 : Fonctions avancées de gestion ajoutées
- [ ] Étape 4 : Lint et build passent sans erreur
