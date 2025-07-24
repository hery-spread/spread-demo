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
            Configurons votre compte pour maximiser vos campagnes
            d&apos;influence
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

          {data.step === 4 && <CompletionStep data={data} />}
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
      />

      <Input
        label="Numéro de téléphone *"
        type="tel"
        value={data.phone}
        onChange={(e) => onChange('phone', e.target.value)}
        placeholder="+33 6 12 34 56 78"
        helperText="Pour nos experts puissent vous contacter pour une démo personnalisée"
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Entreprise"
          value={data.company}
          onChange={(e) => onChange('company', e.target.value)}
          placeholder="Mon Entreprise"
        />
        <Select
          label="Votre rôle"
          value={data.role}
          onChange={(e) => onChange('role', e.target.value)}
          options={[
            { value: '', label: 'Sélectionnez' },
            { value: 'marketing_manager', label: 'Marketing Manager' },
            { value: 'agency_owner', label: 'Dirigeant d&apos;agence' },
            { value: 'brand_manager', label: 'Brand Manager' },
            { value: 'freelance', label: 'Freelance' },
            { value: 'other', label: 'Autre' },
          ]}
        />
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
        options={[
          { value: '', label: 'Sélectionnez votre secteur' },
          { value: 'fashion', label: 'Mode & Lifestyle' },
          { value: 'beauty', label: 'Beauté & Cosmétiques' },
          { value: 'food', label: 'Food & Boissons' },
          { value: 'tech', label: 'Tech & Innovation' },
          { value: 'fitness', label: 'Sport & Fitness' },
          { value: 'travel', label: 'Voyage & Tourisme' },
          { value: 'gaming', label: 'Gaming & Esport' },
          { value: 'other', label: 'Autre' },
        ]}
      />

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Taille de votre équipe *"
          value={data.teamSize}
          onChange={(e) => onChange('teamSize', e.target.value)}
          options={[
            { value: '', label: 'Sélectionnez' },
            { value: 'solo', label: 'Juste moi' },
            { value: '2-5', label: '2-5 personnes' },
            { value: '6-15', label: '6-15 personnes' },
            { value: '16-50', label: '16-50 personnes' },
            { value: '50+', label: '50+ personnes' },
          ]}
        />

        <Select
          label="Budget mensuel influence *"
          value={data.monthlyBudget}
          onChange={(e) => onChange('monthlyBudget', e.target.value)}
          options={[
            { value: '', label: 'Sélectionnez' },
            { value: '0-1k', label: '0 - 1 000€' },
            { value: '1k-5k', label: '1 000 - 5 000€' },
            { value: '5k-15k', label: '5 000 - 15 000€' },
            { value: '15k-50k', label: '15 000 - 50 000€' },
            { value: '50k+', label: '50 000€+' },
          ]}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Vos objectifs principaux (sélectionnez tout ce qui s&apos;applique)
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
              options={[
                { value: '', label: 'Sélectionnez un créneau' },
                { value: 'asap', label: 'Dès que possible' },
                { value: 'this_week', label: 'Cette semaine' },
                { value: 'next_week', label: 'La semaine prochaine' },
                { value: 'flexible', label: 'Je suis flexible' },
              ]}
            />
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
function CompletionStep({ data }: { data: OnboardingData }) {
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
              Explorer la plateforme d&apos;abord
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
