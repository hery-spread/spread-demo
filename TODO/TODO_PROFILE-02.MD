# PLAN D'ACTION PRESCRIPTIF : PROFILE-02

**User Story :** En tant qu'utilisateur, je veux voir les données d'audience détaillées d'un influenceur (âge, genre, localisation, intérêts) pour évaluer la pertinence de son audience.

**Objectif :** Créer les composants d'analyse d'audience avec graphiques et données démographiques.

---

## Plan d'Action Prescriptif

### Étape 1 : Créer le composant AudienceGender

Créer `src/components/profile/audience/AudienceGender.tsx` :

```tsx
"use client";

interface AudienceGenderProps {
  data: {
    male: number;
    female: number;
  };
}

export default function AudienceGender({ data }: AudienceGenderProps) {
  const total = data.male + data.female;
  const malePercentage = (data.male / total) * 100;
  const femalePercentage = (data.female / total) * 100;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Répartition par genre
      </h3>

      {/* Graphique en barres horizontales */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-sm font-medium text-gray-700">Hommes</span>
          </div>
          <span className="text-sm font-semibold text-gray-900">
            {data.male.toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${malePercentage}%` }}
          ></div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-pink-500 rounded"></div>
            <span className="text-sm font-medium text-gray-700">Femmes</span>
          </div>
          <span className="text-sm font-semibold text-gray-900">
            {data.female.toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-pink-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${femalePercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Graphique en donut simplifié */}
      <div className="mt-6 flex justify-center">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="3"
              strokeDasharray={`${malePercentage}, 100`}
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#ec4899"
              strokeWidth="3"
              strokeDasharray={`${femalePercentage}, 100`}
              strokeDashoffset={`-${malePercentage}`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-xs text-gray-500">Genre</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Étape 2 : Créer le composant AudienceAge

Créer `src/components/profile/audience/AudienceAge.tsx` :

```tsx
"use client";

interface AudienceAgeProps {
  data: Record<string, number>;
}

export default function AudienceAge({ data }: AudienceAgeProps) {
  const ageRanges = Object.entries(data).sort((a, b) => {
    // Tri par ordre d'âge croissant
    const ageA = parseInt(a[0].split("-")[0]);
    const ageB = parseInt(b[0].split("-")[0]);
    return ageA - ageB;
  });

  const maxValue = Math.max(...Object.values(data));

  const getBarColor = (percentage: number) => {
    if (percentage >= 30) return "bg-green-500";
    if (percentage >= 20) return "bg-blue-500";
    if (percentage >= 10) return "bg-yellow-500";
    return "bg-gray-400";
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Répartition par âge
      </h3>

      <div className="space-y-4">
        {ageRanges.map(([ageRange, percentage]) => {
          const barWidth = (percentage / maxValue) * 100;

          return (
            <div key={ageRange} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  {ageRange} ans
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  {percentage.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${getBarColor(
                    percentage
                  )}`}
                  style={{ width: `${barWidth}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Insights */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">
          💡 Insights
        </h4>
        <p className="text-sm text-blue-800">
          La tranche d'âge principale est{" "}
          <strong>
            {
              ageRanges.reduce((max, current) =>
                current[1] > max[1] ? current : max
              )[0]
            }{" "}
            ans
          </strong>{" "}
          avec{" "}
          {ageRanges
            .reduce((max, current) => (current[1] > max[1] ? current : max))[1]
            .toFixed(1)}
          % de l'audience.
        </p>
      </div>
    </div>
  );
}
```

### Étape 3 : Créer le composant AudienceLocation

Créer `src/components/profile/audience/AudienceLocation.tsx` :

```tsx
"use client";

import { useState } from "react";

interface AudienceLocationProps {
  countries: Record<string, number>;
  cities: Record<string, number>;
}

export default function AudienceLocation({
  countries,
  cities,
}: AudienceLocationProps) {
  const [activeView, setActiveView] = useState<"countries" | "cities">(
    "countries"
  );

  const currentData = activeView === "countries" ? countries : cities;
  const sortedData = Object.entries(currentData)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8); // Top 8

  const getFlag = (country: string) => {
    const flags: Record<string, string> = {
      France: "🇫🇷",
      USA: "🇺🇸",
      Maroc: "🇲🇦",
      Belgique: "🇧🇪",
      Algérie: "🇩🇿",
      Tunisie: "🇹🇳",
      Canada: "🇨🇦",
      Suisse: "🇨🇭",
    };
    return flags[country] || "🌍";
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Localisation de l'audience
        </h3>

        {/* Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveView("countries")}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
              activeView === "countries"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Pays
          </button>
          <button
            onClick={() => setActiveView("cities")}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
              activeView === "cities"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Villes
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {sortedData.map(([location, percentage], index) => (
          <div key={location} className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-6 h-6 text-sm">
              {activeView === "countries" ? getFlag(location) : `${index + 1}.`}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-900">
                  {location}
                </span>
                <span className="text-sm font-semibold text-gray-700">
                  {percentage.toFixed(1)}%
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(percentage / sortedData[0][1]) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Résumé */}
      <div className="mt-6 p-4 bg-purple-50 rounded-lg">
        <h4 className="text-sm font-semibold text-purple-900 mb-2">
          🌍 Géolocalisation
        </h4>
        <p className="text-sm text-purple-800">
          {activeView === "countries" ? "Pays" : "Ville"} principal :{" "}
          <strong>{sortedData[0]?.[0]}</strong> ({sortedData[0]?.[1].toFixed(1)}
          %)
        </p>
      </div>
    </div>
  );
}
```

### Étape 4 : Créer le composant AudienceInterests

Créer `src/components/profile/audience/AudienceInterests.tsx` :

```tsx
"use client";

interface AudienceInterestsProps {
  topics: Record<string, number>;
  brands: Record<string, number>;
}

export default function AudienceInterests({
  topics,
  brands,
}: AudienceInterestsProps) {
  const topTopics = Object.entries(topics)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6);

  const topBrands = Object.entries(brands)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6);

  const getTopicIcon = (topic: string) => {
    const icons: Record<string, string> = {
      "Mode & Accessoires": "👗",
      "Beauté & Cosmétiques": "💄",
      Gaming: "🎮",
      Technologie: "📱",
      Musique: "🎵",
      "Famille & Relations": "👨‍👩‍👧‍👦",
      "Voyage & Tourisme": "✈️",
      Photographie: "📸",
      Alimentation: "🍽️",
      Divertissement: "🎭",
      Humour: "😂",
      Cinéma: "🎬",
      Fitness: "💪",
      Lifestyle: "✨",
    };
    return icons[topic] || "📝";
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Centres d'intérêt */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Centres d'intérêt
        </h3>

        <div className="space-y-3">
          {topTopics.map(([topic, percentage]) => (
            <div key={topic} className="flex items-center space-x-3">
              <span className="text-2xl">{getTopicIcon(topic)}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">
                    {topic}
                  </span>
                  <span className="text-sm font-semibold text-gray-700">
                    {percentage.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${(percentage / topTopics[0][1]) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marques favorites */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Marques favorites
        </h3>

        <div className="space-y-3">
          {topBrands.map(([brand, percentage], index) => (
            <div key={brand} className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">
                    {brand}
                  </span>
                  <span className="text-sm font-semibold text-gray-700">
                    {percentage.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${(percentage / topBrands[0][1]) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

### Étape 5 : Mettre à jour la page de profil pour intégrer l'analyse d'audience

Modifier `src/app/profile/[id]/page.tsx` pour ajouter les composants d'audience :

```tsx
// Ajouter les imports
import AudienceGender from "@/components/profile/audience/AudienceGender";
import AudienceAge from "@/components/profile/audience/AudienceAge";
import AudienceLocation from "@/components/profile/audience/AudienceLocation";
import AudienceInterests from "@/components/profile/audience/AudienceInterests";

// Dans le case "audience" du renderTabContent() :
case "audience":
  if (!detailedData) {
    return (
      <div className="p-6 text-center">
        <div className="text-6xl mb-4">🔒</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Données d'audience verrouillées
        </h3>
        <p className="text-gray-600 mb-4">
          Débloquez les données d'audience détaillées pour cet influenceur.
        </p>
        <Button>Débloquer pour 1 crédit</Button>
      </div>
    );
  }
  return (
    <div className="p-6 space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">
        Analyse d'audience détaillée
      </h3>

      {/* Première ligne : Genre et Âge */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AudienceGender data={detailedData.audience.gender} />
        <AudienceAge data={detailedData.audience.age} />
      </div>

      {/* Deuxième ligne : Localisation */}
      <AudienceLocation
        countries={detailedData.audience.countries}
        cities={detailedData.audience.cities}
      />

      {/* Troisième ligne : Intérêts */}
      <AudienceInterests
        topics={detailedData.audience.interests.topics}
        brands={detailedData.audience.interests.brands}
      />
    </div>
  );
```

### Étape 6 : Vérifier l'installation

```bash
npm run lint
npm run build
```

---

## Checklist de Validation

- [ ] Étape 1 : Composant AudienceGender créé avec graphiques
- [ ] Étape 2 : Composant AudienceAge créé avec barres de progression
- [ ] Étape 3 : Composant AudienceLocation créé avec toggle pays/villes
- [ ] Étape 4 : Composant AudienceInterests créé pour topics et marques
- [ ] Étape 5 : Page de profil mise à jour avec analyse d'audience
- [ ] Étape 6 : Lint et build passent sans erreur
