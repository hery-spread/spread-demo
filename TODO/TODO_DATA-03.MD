# PLAN D'ACTION PRESCRIPTIF : DATA-03

**User Story :** En tant que développeur, je dois créer un fichier de mock data pour 'Mes Listes', simulant plusieurs listes créées par l'utilisateur avec des influenceurs associés.

**Objectif :** Compléter le fichier mockData.ts avec des données de listes réalistes.

---

## Plan d'Action Prescriptif

### Étape 1 : Compléter les données des listes utilisateur

Modifier `src/lib/mockData.ts` pour étendre le tableau `mockLists` :

```typescript
export const mockLists: InfluencerList[] = [
  {
    id: "1",
    name: "HelloFresh",
    createdAt: "2024-06-15",
    influencers: [
      { id: "1", contactName: "Zidane", contactEmail: "contact@zidane.com" },
      {
        id: "2",
        contactName: "Nabilla Vergara",
        contactEmail: "contact@nabillavergara.com",
      },
      { id: "4", contactName: "Dadju", contactEmail: "contact@dadju.com" },
      {
        id: "5",
        contactName: "Kev Adams",
        contactEmail: "contact@kevadams.com",
      },
    ],
  },
  {
    id: "2",
    name: "Food",
    createdAt: "2024-06-10",
    influencers: [
      { id: "3", contactName: "Squeezie", contactEmail: "contact@squeezie.fr" },
      { id: "7", contactName: "Chef Martin", contactEmail: "chef@martin.com" },
      {
        id: "8",
        contactName: "Julie Cuisine",
        contactEmail: "julie@cuisine.fr",
      },
    ],
  },
  {
    id: "3",
    name: "Auto",
    createdAt: "2024-05-28",
    influencers: [
      { id: "9", contactName: "Shmee150", contactEmail: "tim@shmee150.com" },
      {
        id: "10",
        contactName: "Vilebrequin",
        contactEmail: "contact@vilebrequin.fr",
      },
      {
        id: "11",
        contactName: "Alex Kersten",
        contactEmail: "alex@carthrottle.com",
      },
      {
        id: "12",
        contactName: "Donut Media",
        contactEmail: "hello@donutmedia.com",
      },
      {
        id: "13",
        contactName: "Top Gear France",
        contactEmail: "contact@topgear.fr",
      },
      {
        id: "14",
        contactName: "Automotive Mike",
        contactEmail: "mike@automotive.com",
      },
    ],
  },
  {
    id: "4",
    name: "Good",
    createdAt: "2024-06-01",
    influencers: [
      {
        id: "15",
        contactName: "Emma Chamberlain",
        contactEmail: "emma@chamberlain.com",
      },
      {
        id: "16",
        contactName: "David Dobrik",
        contactEmail: "david@dobrik.com",
      },
    ],
  },
  {
    id: "5",
    name: "Marketing d'influence",
    createdAt: "2024-04-20",
    influencers: [
      {
        id: "17",
        contactName: "Gary Vaynerchuk",
        contactEmail: "gary@vaynermedia.com",
      },
      {
        id: "18",
        contactName: "Neil Patel",
        contactEmail: "neil@neilpatel.com",
      },
      {
        id: "19",
        contactName: "Rand Fishkin",
        contactEmail: "rand@sparktoro.com",
      },
      {
        id: "20",
        contactName: "Ann Handley",
        contactEmail: "ann@marketingprofs.com",
      },
      {
        id: "21",
        contactName: "Seth Godin",
        contactEmail: "seth@sethgodin.com",
      },
      {
        id: "22",
        contactName: "Mari Smith",
        contactEmail: "mari@marismith.com",
      },
      { id: "23", contactName: "Jay Baer", contactEmail: "jay@jaybaer.com" },
      {
        id: "24",
        contactName: "Amy Porterfield",
        contactEmail: "amy@amyporterfield.com",
      },
      {
        id: "25",
        contactName: "Michael Stelzner",
        contactEmail: "michael@socialmediaexaminer.com",
      },
      {
        id: "26",
        contactName: "Brian Dean",
        contactEmail: "brian@backlinko.com",
      },
    ],
  },
  {
    id: "6",
    name: "Voyage",
    createdAt: "2024-05-15",
    influencers: [
      {
        id: "27",
        contactName: "Nomadic Fanatic",
        contactEmail: "eric@nomadicfanatic.com",
      },
      {
        id: "28",
        contactName: "Kara and Nate",
        contactEmail: "hello@karaandnate.com",
      },
      {
        id: "29",
        contactName: "Drew Binsky",
        contactEmail: "drew@drewbinsky.com",
      },
    ],
  },
  {
    id: "7",
    name: "R&B",
    createdAt: "2024-06-05",
    influencers: [
      { id: "4", contactName: "Dadju", contactEmail: "contact@dadju.com" },
    ],
  },
];
```

### Étape 2 : Créer des hooks pour la gestion des listes

Créer `src/hooks/useLists.ts` :

```typescript
import { useState, useEffect } from "react";
import { InfluencerList } from "@/types";
import { mockLists } from "@/lib/mockData";

export function useLists() {
  const [lists, setLists] = useState<InfluencerList[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLists(mockLists);
      setLoading(false);
    }, 300);
  }, []);

  return { lists, loading };
}

export function useListDetails(id: string) {
  const [list, setList] = useState<InfluencerList | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundList = mockLists.find((l) => l.id === id);
      setList(foundList || null);
      setLoading(false);
    }, 200);
  }, [id]);

  return { list, loading };
}
```

### Étape 3 : Créer des fonctions utilitaires pour les listes

Ajouter dans `src/lib/mockData.ts` :

```typescript
export function exportListToCSV(listId: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const list = mockLists.find((l) => l.id === listId);
      if (!list) {
        resolve("");
        return;
      }

      const headers = ["Nom", "Email"];
      const rows = list.influencers.map((inf) => [
        inf.contactName || "",
        inf.contactEmail || "",
      ]);

      const csvContent = [
        headers.join(","),
        ...rows.map((row) => row.join(",")),
      ].join("\n");

      resolve(csvContent);
    }, 500);
  });
}

export function addInfluencerToList(
  listId: string,
  influencerId: string
): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate API call success
      resolve(true);
    }, 300);
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

- [ ] Étape 1 : Données de listes complétées avec 7 listes
- [ ] Étape 2 : Hooks useLists créés
- [ ] Étape 3 : Fonctions utilitaires ajoutées
- [ ] Étape 4 : Lint et build passent sans erreur
