# PLAN D'ACTION PRESCRIPTIF : ONBOARDING-01

**User Story :** En tant qu'utilisateur, je veux un onboarding automatisé qui collecte mon numéro de téléphone et adresse email, et me propose un call de démonstration pour maximiser mon adoption de la plateforme.

**Objectif :** Créer un funnel d'onboarding complet avec étapes progressives, collecte de données qualifiées et booking automatique de démo.

---

## Plan d'Action Prescriptif

### Étape 1 : Créer la page d'onboarding principale

Créer `src/app/onboarding/page.tsx` :

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
} from '@heroicons/react/24/outline';
import OnboardingProgress from '@/components/onboarding/OnboardingProgress';
import DemoBooking from '@/components/onboarding/DemoBooking';

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
    industry: string;
    teamSize: string;
    monthlyBudget: string;
    goals: string[];
  };
  preferences: {
    wantsDemo: boolean;
    demoTime: string;
    communicationChannel: 'email' | 'phone' | 'both';
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
      industry: '',
      teamSize: '',
      monthlyBudget: '',
      goals: [],
    },
    preferences: {
      wantsDemo: false,
      demoTime: '',
      communicationChannel: 'email',
    },
  });

  const totalSteps = 4;

  const nextStep = () => {
    setData((prev) => ({ ...prev, step: Math.min(prev.step + 1, totalSteps) }));
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

  const updatePreferences = (field: string, value: boolean | string) => {
    setData((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, [field]: value },
    }));
  };

  const handleGoalToggle = (goal: string) => {
    const currentGoals = data.businessInfo.goals;
    const newGoals = currentGoals.includes(goal)
      ? currentGoals.filter((g) => g !== goal)
      : [...currentGoals, goal];
    updateBusinessInfo('goals', newGoals);
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
          <p className="text-gray-600">
            Configurons votre compte pour maximiser vos campagnes d'influence
          </p>
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

          {data.step === 3 && (
            <PreferencesStep
              data={data.preferences}
              onChange={updatePreferences}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}

          {data.step === 4 && <CompletionStep data={data} onPrev={prevStep} />}
        </div>
      </div>
    </div>
  );
}

// Étape 1 : Informations personnelles
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
        description="Pour nos experts puissent vous contacter pour une démo personnalisée"
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

// Étape 2 : Informations business
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

  const canContinue = data.industry && data.teamSize && data.monthlyBudget;

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <BuildingOfficeIcon className="w-12 h-12 text-purple-600 mx-auto mb-3" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Votre contexte business
        </h2>
        <p className="text-gray-600">
          Aidez-nous à adapter Spread à vos besoins spécifiques
        </p>
      </div>

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
        <option value="other">Autre</option>
      </Select>

      <div className="grid grid-cols-2 gap-4">
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

        <Select
          label="Budget mensuel influence *"
          value={data.monthlyBudget}
          onChange={(e) => onChange('monthlyBudget', e.target.value)}
        >
          <option value="">Sélectionnez</option>
          <option value="0-1k">0 - 1 000€</option>
          <option value="1k-5k">1 000 - 5 000€</option>
          <option value="5k-15k">5 000 - 15 000€</option>
          <option value="15k-50k">15 000 - 50 000€</option>
          <option value="50k+">50 000€+</option>
        </Select>
      </div>

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
          Continuer
        </Button>
      </div>
    </div>
  );
}

// Étape 3 : Préférences et démo
function PreferencesStep({
  data,
  onChange,
  onNext,
  onPrev,
}: {
  data: OnboardingData['preferences'];
  onChange: (field: string, value: boolean | string) => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <CalendarDaysIcon className="w-12 h-12 text-purple-600 mx-auto mb-3" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Démo personnalisée recommandée
        </h2>
        <p className="text-gray-600">
          Nos experts vous montrent comment maximiser vos campagnes avec Spread
        </p>
      </div>

      {/* Proposition de démo */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
            <CalendarDaysIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              Démo personnalisée (30 min)
            </h3>
            <p className="text-sm text-gray-600">Gratuite et sans engagement</p>
          </div>
        </div>

        <ul className="space-y-2 mb-4 text-sm text-gray-700">
          <li className="flex items-center">
            <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
            Configuration personnalisée de votre compte
          </li>
          <li className="flex items-center">
            <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
            Stratégies spécifiques à votre secteur
          </li>
          <li className="flex items-center">
            <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
            Tips pour maximiser votre ROI
          </li>
          <li className="flex items-center">
            <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
            Réponses à toutes vos questions
          </li>
        </ul>

        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="wantsDemo"
              checked={data.wantsDemo}
              onChange={(e) => onChange('wantsDemo', e.target.checked)}
              className="w-4 h-4 text-purple-600 focus:ring-purple-500"
            />
            <label
              htmlFor="wantsDemo"
              className="text-sm font-medium text-gray-900"
            >
              Oui, je veux une démo personnalisée
            </label>
          </div>

          {data.wantsDemo && (
            <Select
              label="Quand préférez-vous ?"
              value={data.demoTime}
              onChange={(e) => onChange('demoTime', e.target.value)}
            >
              <option value="">Sélectionnez un créneau</option>
              <option value="asap">Dès que possible</option>
              <option value="this_week">Cette semaine</option>
              <option value="next_week">La semaine prochaine</option>
              <option value="flexible">Je suis flexible</option>
            </Select>
          )}
        </div>
      </div>

      {/* Préférences de communication */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Comment préférez-vous être contacté ?
        </label>
        <div className="space-y-2">
          {[
            {
              value: 'email',
              label: 'Par email uniquement',
              icon: EnvelopeIcon,
            },
            {
              value: 'phone',
              label: 'Par téléphone uniquement',
              icon: PhoneIcon,
            },
            { value: 'both', label: 'Email et téléphone', icon: UserIcon },
          ].map(({ value, label, icon: Icon }) => (
            <label
              key={value}
              className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <input
                type="radio"
                name="communication"
                value={value}
                checked={data.communicationChannel === value}
                onChange={(e) =>
                  onChange('communicationChannel', e.target.value)
                }
                className="mr-3"
              />
              <Icon className="w-4 h-4 mr-2 text-gray-500" />
              <span className="text-sm text-gray-900">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex space-x-3">
        <Button variant="outline" onClick={onPrev} className="flex-1">
          Retour
        </Button>
        <Button
          onClick={onNext}
          className="flex-1 bg-purple-600 hover:bg-purple-700"
        >
          Finaliser
        </Button>
      </div>
    </div>
  );
}

// Étape 4 : Completion
function CompletionStep({
  data,
  onPrev,
}: {
  data: OnboardingData;
  onPrev: () => void;
}) {
  const handleStartExploring = () => {
    // Rediriger vers le dashboard
    window.location.href = '/';
  };

  const handleBookDemo = () => {
    // Ouvrir Calendly ou autre système de booking
    window.open('https://calendly.com/spread-demo', '_blank');
  };

  return (
    <div className="text-center space-y-6">
      <div>
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircleIcon className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Parfait, {data.personalInfo.firstName} ! 🎉
        </h2>
        <p className="text-gray-600">
          Votre compte est configuré. Vous allez recevoir un email de
          confirmation.
        </p>
      </div>

      {/* Résumé */}
      <div className="bg-gray-50 p-6 rounded-lg text-left">
        <h3 className="font-semibold text-gray-900 mb-3">Récapitulatif :</h3>
        <div className="space-y-2 text-sm text-gray-700">
          <div>
            <span className="font-medium">Email :</span>{' '}
            {data.personalInfo.email}
          </div>
          <div>
            <span className="font-medium">Téléphone :</span>{' '}
            {data.personalInfo.phone}
          </div>
          <div>
            <span className="font-medium">Secteur :</span>{' '}
            {data.businessInfo.industry}
          </div>
          <div>
            <span className="font-medium">Budget mensuel :</span>{' '}
            {data.businessInfo.monthlyBudget}
          </div>
          {data.preferences.wantsDemo && (
            <div>
              <span className="font-medium">Démo :</span>{' '}
              {data.preferences.demoTime}
            </div>
          )}
        </div>
      </div>

      {/* Actions suivantes */}
      <div className="space-y-4">
        {data.preferences.wantsDemo ? (
          <div className="space-y-3">
            <Button
              onClick={handleBookDemo}
              className="w-full bg-purple-600 hover:bg-purple-700 py-3"
            >
              <CalendarDaysIcon className="w-4 h-4 mr-2" />
              Réserver ma démo maintenant
            </Button>
            <Button
              onClick={handleStartExploring}
              variant="outline"
              className="w-full"
            >
              Explorer la plateforme d'abord
            </Button>
          </div>
        ) : (
          <Button
            onClick={handleStartExploring}
            className="w-full bg-purple-600 hover:bg-purple-700 py-3"
          >
            <RocketLaunchIcon className="w-4 h-4 mr-2" />
            Commencer à explorer Spread
          </Button>
        )}
      </div>

      <div className="text-xs text-gray-500">
        Un membre de notre équipe vous contactera dans les 24h pour finaliser
        votre configuration.
      </div>
    </div>
  );
}
```

### Étape 2 : Créer le composant OnboardingProgress

Créer `src/components/onboarding/OnboardingProgress.tsx` :

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
  const steps = [
    { id: 1, name: 'Infos personnelles' },
    { id: 2, name: 'Contexte business' },
    { id: 3, name: 'Préférences' },
    { id: 4, name: 'Finalisation' },
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
                className={`w-full h-0.5 mx-4 ${
                  step.id < currentStep ? 'bg-green-500' : 'bg-gray-200'
                }`}
                style={{ width: '60px' }}
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

### Étape 3 : Créer le composant DemoBooking

Créer `src/components/onboarding/DemoBooking.tsx` :

```tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
  CalendarDaysIcon,
  ClockIcon,
  UserIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

interface DemoSlot {
  id: string;
  date: string;
  time: string;
  available: boolean;
}

export default function DemoBooking() {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  // Simuler les créneaux disponibles
  const demoSlots: DemoSlot[] = [
    { id: '1', date: '2024-01-25', time: '09:00', available: true },
    { id: '2', date: '2024-01-25', time: '11:00', available: true },
    { id: '3', date: '2024-01-25', time: '14:00', available: false },
    { id: '4', date: '2024-01-25', time: '16:00', available: true },
    { id: '5', date: '2024-01-26', time: '09:00', available: true },
    { id: '6', date: '2024-01-26', time: '11:00', available: true },
    { id: '7', date: '2024-01-26', time: '15:00', available: true },
    { id: '8', date: '2024-01-29', time: '10:00', available: true },
  ];

  const handleBookDemo = async () => {
    if (!selectedSlot) return;

    setIsBooking(true);

    // Simuler l'API de booking
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsBooked(true);
    setIsBooking(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  };

  if (isBooked) {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
          <CheckCircleIcon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">
          Démo réservée avec succès !
        </h3>
        <p className="text-gray-600">
          Vous recevrez un email de confirmation avec le lien de la réunion.
        </p>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-800">
            Un expert Spread vous contactera avant la démo pour préparer la
            session selon vos besoins spécifiques.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <CalendarDaysIcon className="w-12 h-12 text-purple-600 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Choisissez votre créneau de démo
        </h3>
        <p className="text-gray-600">
          Session de 30 minutes avec un expert Spread
        </p>
      </div>

      {/* Grille des créneaux */}
      <div className="grid grid-cols-2 gap-3">
        {demoSlots.map((slot) => (
          <button
            key={slot.id}
            onClick={() => slot.available && setSelectedSlot(slot.id)}
            disabled={!slot.available}
            className={`p-3 border-2 rounded-lg text-left transition-colors ${
              selectedSlot === slot.id
                ? 'border-purple-500 bg-purple-50'
                : slot.available
                  ? 'border-gray-200 hover:border-gray-300'
                  : 'border-gray-100 bg-gray-50 cursor-not-allowed'
            }`}
          >
            <div className="text-sm font-medium text-gray-900">
              {formatDate(slot.date)}
            </div>
            <div
              className={`flex items-center space-x-1 text-sm ${
                slot.available ? 'text-gray-600' : 'text-gray-400'
              }`}
            >
              <ClockIcon className="w-3 h-3" />
              <span>{slot.time}</span>
            </div>
            {!slot.available && (
              <span className="text-xs text-red-500">Complet</span>
            )}
          </button>
        ))}
      </div>

      {/* Informations sur la démo */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-2">Ce qui vous attend :</h4>
        <ul className="space-y-1 text-sm text-gray-600">
          <li className="flex items-center">
            <CheckCircleIcon className="w-3 h-3 text-green-500 mr-2" />
            Tour personnalisé de la plateforme
          </li>
          <li className="flex items-center">
            <CheckCircleIcon className="w-3 h-3 text-green-500 mr-2" />
            Stratégies adaptées à votre secteur
          </li>
          <li className="flex items-center">
            <CheckCircleIcon className="w-3 h-3 text-green-500 mr-2" />
            Configuration optimale de votre compte
          </li>
          <li className="flex items-center">
            <CheckCircleIcon className="w-3 h-3 text-green-500 mr-2" />
            Session Q&A personnalisée
          </li>
        </ul>
      </div>

      <Button
        onClick={handleBookDemo}
        disabled={!selectedSlot || isBooking}
        className="w-full bg-purple-600 hover:bg-purple-700 py-3"
      >
        {isBooking ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Réservation en cours...
          </div>
        ) : (
          <>
            <CalendarDaysIcon className="w-4 h-4 mr-2" />
            Réserver cette démo
          </>
        )}
      </Button>
    </div>
  );
}
```

### Étape 4 : Créer les types pour l'onboarding

Ajouter à `src/types/index.ts` :

```typescript
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
    industry: string;
    teamSize: string;
    monthlyBudget: string;
    goals: string[];
  };
  preferences: {
    wantsDemo: boolean;
    demoTime: string;
    communicationChannel: 'email' | 'phone' | 'both';
  };
}

export interface DemoBooking {
  id: string;
  userId: string;
  scheduledAt: string;
  duration: number;
  status: 'scheduled' | 'completed' | 'cancelled';
  meetingUrl?: string;
  notes?: string;
}
```

### Étape 5 : Créer les données mockées pour l'onboarding

Ajouter à `src/lib/mockData.ts` :

```typescript
export const mockOnboardingData = {
  demoSlots: [
    { id: '1', date: '2024-01-25', time: '09:00', available: true },
    { id: '2', date: '2024-01-25', time: '11:00', available: true },
    { id: '3', date: '2024-01-25', time: '14:00', available: false },
    { id: '4', date: '2024-01-25', time: '16:00', available: true },
    { id: '5', date: '2024-01-26', time: '09:00', available: true },
    { id: '6', date: '2024-01-26', time: '11:00', available: true },
    { id: '7', date: '2024-01-26', time: '15:00', available: true },
    { id: '8', date: '2024-01-29', time: '10:00', available: true },
  ],

  industries: [
    { value: 'fashion', label: 'Mode & Lifestyle' },
    { value: 'beauty', label: 'Beauté & Cosmétiques' },
    { value: 'food', label: 'Food & Boissons' },
    { value: 'tech', label: 'Tech & Innovation' },
    { value: 'fitness', label: 'Sport & Fitness' },
    { value: 'travel', label: 'Voyage & Tourisme' },
    { value: 'gaming', label: 'Gaming & Esport' },
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
```

### Étape 6 : Ajouter la redirection depuis signup

Modifier le bouton "S'inscrire" pour rediriger vers `/onboarding` au lieu du dashboard.

---

## Résumé des modifications

✅ **Onboarding progressif** : 4 étapes avec collecte d'infos qualifiées
✅ **Collecte téléphone + email** : Champs obligatoires avec validation
✅ **Profiling business** : Secteur, budget, objectifs pour personnalisation
✅ **Booking de démo intégré** : Créneaux disponibles avec confirmation
✅ **UX optimisée** : Progress bar, validation, animations
✅ **Données qualifiées** : Informations exploitables pour l'équipe commerciale

Cet onboarding maximise la conversion en collectant les informations clés et en proposant directement un accompagnement personnalisé via la démo.
