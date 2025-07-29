'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import {
  CheckCircleIcon,
  UserIcon,
  BuildingOfficeIcon,
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
    goals: string[];
  };
}

export default function OnboardingPage() {
  const router = useRouter();
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
      goals: [],
    },
  });

  const totalSteps = 2;

  const nextStep = () => {
    if (data.step === 2) {
      // Rediriger vers le dashboard après l'étape 2
      router.push('/');
      return;
    }
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

  const canContinue = data.industry && data.teamSize;

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
