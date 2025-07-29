# PLAN D'ACTION PRESCRIPTIF : ONBOARDING-02

**User Story :** En tant qu'utilisateur, je veux un onboarding simplifié en 2 étapes avec un sélecteur "Agence ou Marque" qui adapte les champs affichés, puis une redirection automatique vers le dashboard avec une modale optionnelle pour réserver une démo.

**Objectif :** Simplifier l'onboarding en supprimant les étapes 3 et 4, adapter l'étape 2 avec un sélecteur de type d'entreprise, et proposer la démo via une modale après redirection.

---

## Plan d'Action Prescriptif

### Étape 1 : Modifier la page d'onboarding principale

Modifier `src/app/onboarding/page.tsx` :

```tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import {
  CheckCircleIcon,
  UserIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  EnvelopeIcon,
  CalendarDaysIcon,
  RocketLaunchIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import OnboardingProgress from '@/components/onboarding/OnboardingProgress';
import DemoBookingModal from '@/components/onboarding/DemoBookingModal';

interface OnboardingData {
  step: number;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    role: string;
  };
  businessInfo: {
    companyType: 'agency' | 'brand' | ''; // Nouveau champ
    industry: string;
    teamSize: string;
    goals: string[];
  };
}

export default function OnboardingPage() {
  const [data, setData] = useState<OnboardingData>({
    step: 1,
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      role: '',
    },
    businessInfo: {
      companyType: '',
      industry: '',
      teamSize: '',
      goals: [],
    },
  });

  const [showDemoModal, setShowDemoModal] = useState(false);
  const totalSteps = 2; // Réduction à 2 étapes

  const nextStep = () => {
    if (data.step === 1) {
      setData((prev) => ({ ...prev, step: 2 }));
    } else if (data.step === 2) {
      // Finaliser et rediriger
      handleComplete();
    }
  };

  const prevStep = () => {
    setData((prev) => ({ ...prev, step: Math.max(prev.step - 1, 1) }));
  };

  const updatePersonalInfo = (field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  const updateBusinessInfo = (field: string, value: string | string[]) => {
    setData((prev) => ({
      ...prev,
      businessInfo: { ...prev.businessInfo, [field]: value },
    }));
  };

  const handleGoalToggle = (goal: string) => {
    const currentGoals = data.businessInfo.goals;
    const newGoals = currentGoals.includes(goal)
      ? currentGoals.filter((g) => g !== goal)
      : [...currentGoals, goal];
    updateBusinessInfo('goals', newGoals);
  };

  const handleComplete = () => {
    // Sauvegarder les données
    console.log('Données onboarding complétées:', data);

    // Rediriger vers le dashboard
    window.location.href = '/';

    // Afficher la modale de démo après un délai
    setTimeout(() => {
      setShowDemoModal(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <RocketLaunchIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bienvenue sur Spread !
          </h1>
          <p className="text-gray-600">Configurons votre compte en 2 minutes</p>
        </div>

        {/* Progress */}
        <OnboardingProgress currentStep={data.step} totalSteps={totalSteps} />

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          {data.step === 1 && (
            <PersonalInfoStep
              data={data.personalInfo}
              onChange={updatePersonalInfo}
              onNext={nextStep}
            />
          )}

          {data.step === 2 && (
            <BusinessInfoStep
              data={data.businessInfo}
              onChange={updateBusinessInfo}
              onGoalToggle={handleGoalToggle}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}
        </div>
      </div>

      {/* Modale de démo */}
      {showDemoModal && (
        <DemoBookingModal
          userName={data.personalInfo.firstName}
          onClose={() => setShowDemoModal(false)}
          onBook={() => {
            // Ouvrir Calendly
            window.open('https://calendly.com/spread-demo', '_blank');
            setShowDemoModal(false);
          }}
        />
      )}
    </div>
  );
}

// Étape 1 : Informations personnelles (inchangée)
function PersonalInfoStep({
  data,
  onChange,
  onNext,
}: {
  data: OnboardingData['personalInfo'];
  onChange: (field: string, value: string) => void;
  onNext: () => void;
}) {
  const canContinue =
    data.firstName && data.lastName && data.email && data.phone;

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <UserIcon className="w-12 h-12 text-purple-600 mx-auto mb-3" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Parlez-nous de vous
        </h2>
        <p className="text-gray-600">
          Ces informations nous aideront à personnaliser votre expérience
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Prénom *"
          value={data.firstName}
          onChange={(e) => onChange('firstName', e.target.value)}
          placeholder="Jean"
        />
        <Input
          label="Nom *"
          value={data.lastName}
          onChange={(e) => onChange('lastName', e.target.value)}
          placeholder="Dupont"
        />
      </div>

      <Input
        label="Email professionnel *"
        type="email"
        value={data.email}
        onChange={(e) => onChange('email', e.target.value)}
        placeholder="jean.dupont@entreprise.com"
        icon={EnvelopeIcon}
      />

      <Input
        label="Numéro de téléphone *"
        type="tel"
        value={data.phone}
        onChange={(e) => onChange('phone', e.target.value)}
        placeholder="+33 6 12 34 56 78"
        icon={PhoneIcon}
        description="Pour nos experts puissent vous contacter si besoin"
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Entreprise"
          value={data.company}
          onChange={(e) => onChange('company', e.target.value)}
          placeholder="Mon Entreprise"
          icon={BuildingOfficeIcon}
        />
        <Select
          label="Votre rôle"
          value={data.role}
          onChange={(e) => onChange('role', e.target.value)}
        >
          <option value="">Sélectionnez</option>
          <option value="marketing_manager">Marketing Manager</option>
          <option value="agency_owner">Dirigeant d'agence</option>
          <option value="brand_manager">Brand Manager</option>
          <option value="freelance">Freelance</option>
          <option value="other">Autre</option>
        </Select>
      </div>

      <Button
        onClick={onNext}
        disabled={!canContinue}
        className="w-full bg-purple-600 hover:bg-purple-700 py-3"
      >
        Continuer
      </Button>
    </div>
  );
}

// Étape 2 : Informations business modifiée
function BusinessInfoStep({
  data,
  onChange,
  onGoalToggle,
  onNext,
  onPrev,
}: {
  data: OnboardingData['businessInfo'];
  onChange: (field: string, value: string | string[]) => void;
  onGoalToggle: (goal: string) => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const goals = [
    'Trouver des micro-influenceurs',
    'Analyser la concurrence',
    'Gérer des campagnes',
    'Mesurer le ROI',
    'Développer ma marque',
    'Recruter des ambassadeurs',
  ];

  // Validation adaptée : companyType requis, industry requis seulement si marque
  const canContinue =
    data.companyType &&
    data.teamSize &&
    (data.companyType === 'agency' ||
      (data.companyType === 'brand' && data.industry));

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <BuildingOfficeIcon className="w-12 h-12 text-purple-600 mx-auto mb-3" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Votre contexte business
        </h2>
        <p className="text-gray-600">
          Aidez-nous à adapter Spread à vos besoins
        </p>
      </div>

      {/* NOUVEAU : Sélecteur Agence ou Marque */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Vous êtes : *
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onChange('companyType', 'agency')}
            className={`p-4 border-2 rounded-lg transition-colors ${
              data.companyType === 'agency'
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <UsersIcon className="w-8 h-8 mx-auto mb-2 text-purple-600" />
            <div className="font-medium">Agence</div>
            <div className="text-sm text-gray-500">
              Agence marketing/influence
            </div>
          </button>
          <button
            onClick={() => onChange('companyType', 'brand')}
            className={`p-4 border-2 rounded-lg transition-colors ${
              data.companyType === 'brand'
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <BuildingOfficeIcon className="w-8 h-8 mx-auto mb-2 text-purple-600" />
            <div className="font-medium">Marque</div>
            <div className="text-sm text-gray-500">Entreprise/marque</div>
          </button>
        </div>
      </div>

      {/* Secteur d'activité - AFFICHÉ SEULEMENT SI MARQUE */}
      {data.companyType === 'brand' && (
        <Select
          label="Secteur d'activité *"
          value={data.industry}
          onChange={(e) => onChange('industry', e.target.value)}
        >
          <option value="">Sélectionnez votre secteur</option>
          <option value="fashion">Mode & Lifestyle</option>
          <option value="beauty">Beauté & Cosmétiques</option>
          <option value="food">Food & Boissons</option>
          <option value="tech">Tech & Innovation</option>
          <option value="fitness">Sport & Fitness</option>
          <option value="travel">Voyage & Tourisme</option>
          <option value="gaming">Gaming & Esport</option>
          <option value="finance">Finance & Assurance</option>
          <option value="education">Éducation & Formation</option>
          <option value="health">Santé & Bien-être</option>
          <option value="automotive">Automobile</option>
          <option value="real_estate">Immobilier</option>
          <option value="other">Autre</option>
        </Select>
      )}

      {/* Taille de l'équipe */}
      <Select
        label="Taille de votre équipe *"
        value={data.teamSize}
        onChange={(e) => onChange('teamSize', e.target.value)}
      >
        <option value="">Sélectionnez</option>
        <option value="solo">Juste moi</option>
        <option value="2-5">2-5 personnes</option>
        <option value="6-15">6-15 personnes</option>
        <option value="16-50">16-50 personnes</option>
        <option value="50+">50+ personnes</option>
      </Select>

      {/* SUPPRIMÉ : Budget mensuel influence */}

      {/* Objectifs */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Vos objectifs principaux (sélectionnez tout ce qui s'applique)
        </label>
        <div className="grid grid-cols-2 gap-3">
          {goals.map((goal) => (
            <button
              key={goal}
              onClick={() => onGoalToggle(goal)}
              className={`p-3 text-left border-2 rounded-lg transition-colors ${
                data.goals.includes(goal)
                  ? 'border-purple-500 bg-purple-50 text-purple-900'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`w-4 h-4 rounded mr-2 ${
                    data.goals.includes(goal) ? 'bg-purple-500' : 'bg-gray-300'
                  }`}
                >
                  {data.goals.includes(goal) && (
                    <CheckCircleIcon className="w-4 h-4 text-white" />
                  )}
                </div>
                <span className="text-sm font-medium">{goal}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex space-x-3">
        <Button variant="outline" onClick={onPrev} className="flex-1">
          Retour
        </Button>
        <Button
          onClick={onNext}
          disabled={!canContinue}
          className="flex-1 bg-purple-600 hover:bg-purple-700"
        >
          <RocketLaunchIcon className="w-4 h-4 mr-2" />
          Finaliser mon compte
        </Button>
      </div>
    </div>
  );
}
```

### Étape 2 : Modifier le composant OnboardingProgress

Modifier `src/components/onboarding/OnboardingProgress.tsx` :

```tsx
import { CheckIcon } from '@heroicons/react/24/outline';

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
}

export default function OnboardingProgress({
  currentStep,
  totalSteps,
}: OnboardingProgressProps) {
  // Mise à jour pour 2 étapes seulement
  const steps = [
    { id: 1, name: 'Infos personnelles' },
    { id: 2, name: 'Contexte business' },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step.id < currentStep
                    ? 'bg-green-500 text-white'
                    : step.id === currentStep
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step.id < currentStep ? (
                  <CheckIcon className="w-4 h-4" />
                ) : (
                  step.id
                )}
              </div>
              <span
                className={`ml-2 text-sm font-medium ${
                  step.id <= currentStep ? 'text-gray-900' : 'text-gray-500'
                }`}
              >
                {step.name}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-full h-0.5 mx-8 ${
                  step.id < currentStep ? 'bg-green-500' : 'bg-gray-200'
                }`}
                style={{ width: '120px' }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-2 text-center">
        <span className="text-sm text-gray-500">
          Étape {currentStep} sur {totalSteps}
        </span>
      </div>
    </div>
  );
}
```

### Étape 3 : Créer le composant DemoBookingModal

Créer `src/components/onboarding/DemoBookingModal.tsx` :

```tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
  CalendarDaysIcon,
  XMarkIcon,
  CheckCircleIcon,
  ClockIcon,
  UserIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';

interface DemoBookingModalProps {
  userName: string;
  onClose: () => void;
  onBook: () => void;
}

export default function DemoBookingModal({
  userName,
  onClose,
  onBook,
}: DemoBookingModalProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Attendre la fin de l'animation
  };

  const handleBook = () => {
    onBook();
    handleClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-xl max-w-md w-full p-6 relative animate-slideUp">
        {/* Bouton fermer */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CalendarDaysIcon className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Félicitations {userName} ! 🎉
          </h3>
          <p className="text-gray-600">
            Votre compte est créé. Voulez-vous une démo personnalisée ?
          </p>
        </div>

        {/* Proposition de valeur */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">
            Démo personnalisée (30 min) 🚀
          </h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center">
              <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
              Configuration optimale de votre compte
            </li>
            <li className="flex items-center">
              <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
              Stratégies spécifiques à votre secteur
            </li>
            <li className="flex items-center">
              <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
              Tips pour maximiser votre ROI
            </li>
            <li className="flex items-center">
              <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
              Accès à nos meilleures pratiques
            </li>
          </ul>
        </div>

        {/* Testimonial */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
              <UserIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-medium text-sm">
                Marie, Marketing Manager
              </div>
              <div className="text-xs text-gray-600">Beauty Brand</div>
            </div>
          </div>
          <p className="text-sm text-gray-700 italic">
            "La démo m'a fait gagner des semaines ! J'ai appris des techniques
            que je n'aurais jamais découvertes seule."
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            onClick={handleBook}
            className="w-full bg-purple-600 hover:bg-purple-700 py-3"
          >
            <CalendarDaysIcon className="w-4 h-4 mr-2" />
            Oui, réserver ma démo
          </Button>

          <Button variant="outline" onClick={handleClose} className="w-full">
            Plus tard, explorer seul(e)
          </Button>
        </div>

        {/* Note */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            <ClockIcon className="w-3 h-3 inline mr-1" />
            Créneaux disponibles dès aujourd'hui
          </p>
        </div>
      </div>
    </div>
  );
}
```

### Étape 4 : Ajouter les animations CSS

Ajouter dans `src/app/globals.css` :

```css
/* Animations pour la modale */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

.animate-slideUp {
  animation: slideUp 0.3s ease-out;
}
```

### Étape 5 : Mettre à jour les types

Modifier `src/types/index.ts` :

```typescript
// Mise à jour de l'interface OnboardingData
export interface OnboardingData {
  step: number;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    role: string;
  };
  businessInfo: {
    companyType: 'agency' | 'brand' | ''; // Nouveau champ
    industry: string; // Optionnel selon le type
    teamSize: string;
    goals: string[];
    // SUPPRIMÉ : monthlyBudget
  };
  // SUPPRIMÉ : preferences (étapes 3 et 4)
}
```

### Étape 6 : Mettre à jour les données mockées

Modifier dans `src/lib/mockData.ts` :

```typescript
export const mockOnboardingData = {
  // Suppression des demoSlots (plus besoin dans l'onboarding)

  companyTypes: [
    {
      value: 'agency',
      label: 'Agence',
      description: 'Agence marketing/influence',
    },
    { value: 'brand', label: 'Marque', description: 'Entreprise/marque' },
  ],

  industries: [
    { value: 'fashion', label: 'Mode & Lifestyle' },
    { value: 'beauty', label: 'Beauté & Cosmétiques' },
    { value: 'food', label: 'Food & Boissons' },
    { value: 'tech', label: 'Tech & Innovation' },
    { value: 'fitness', label: 'Sport & Fitness' },
    { value: 'travel', label: 'Voyage & Tourisme' },
    { value: 'gaming', label: 'Gaming & Esport' },
    { value: 'finance', label: 'Finance & Assurance' },
    { value: 'education', label: 'Éducation & Formation' },
    { value: 'health', label: 'Santé & Bien-être' },
    { value: 'automotive', label: 'Automobile' },
    { value: 'real_estate', label: 'Immobilier' },
    { value: 'other', label: 'Autre' },
  ],

  goals: [
    'Trouver des micro-influenceurs',
    'Analyser la concurrence',
    'Gérer des campagnes',
    'Mesurer le ROI',
    'Développer ma marque',
    'Recruter des ambassadeurs',
  ],
};

// Fonction pour sauvegarder les données d'onboarding
export function saveOnboardingData(data: OnboardingData): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Données onboarding sauvegardées:', data);
      resolve(true);
    }, 500);
  });
}
```

### Étape 7 : Configurer la redirection automatique

Dans la fonction `handleComplete()`, ajouter la logique de redirection et d'affichage de la modale :

```tsx
const handleComplete = async () => {
  try {
    // Sauvegarder les données
    await saveOnboardingData(data);

    // Rediriger vers le dashboard
    window.location.href = '/';

    // La modale s'affichera automatiquement après redirection
    // (géré par un localStorage flag ou paramètre URL)
    localStorage.setItem('showDemoModal', 'true');
    localStorage.setItem('userName', data.personalInfo.firstName);
  } catch (error) {
    console.error('Erreur lors de la finalisation:', error);
  }
};
```

### Étape 8 : Gérer l'affichage de la modale après redirection

Modifier `src/app/page.tsx` (dashboard) pour vérifier et afficher la modale :

```tsx
// Ajouter dans le composant Dashboard
useEffect(() => {
  const shouldShowDemo = localStorage.getItem('showDemoModal');
  const userName = localStorage.getItem('userName');

  if (shouldShowDemo === 'true' && userName) {
    setShowDemoModal(true);
    // Nettoyer le localStorage
    localStorage.removeItem('showDemoModal');
    localStorage.removeItem('userName');
  }
}, []);
```

---

## Résumé des modifications

✅ **Onboarding simplifié** : Réduction de 4 à 2 étapes  
✅ **Sélecteur Agence/Marque** : Adaptation des champs selon le type  
✅ **Secteur conditionnel** : Affiché seulement pour les marques  
✅ **Budget supprimé** : Plus de champ budget mensuel  
✅ **Redirection automatique** : Vers le dashboard après l'étape 2  
✅ **Modale de démo** : Proposition Calendly après redirection  
✅ **UX optimisée** : Animations et personnalisation

Cette approche simplifie drastiquement l'onboarding tout en conservant la collecte des informations essentielles et en proposant la démo de manière non-intrusive après que l'utilisateur ait découvert le dashboard.
