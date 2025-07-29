'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import {
  CalendarDaysIcon,
  ClockIcon,
  CheckCircleIcon,
  XMarkIcon,
  EnvelopeIcon,
  PhoneIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DemoSlot {
  id: string;
  date: string;
  time: string;
  available: boolean;
}

interface DemoPreferences {
  wantsDemo: boolean;
  demoTime: string;
  communicationChannel: 'email' | 'phone' | 'both';
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [step, setStep] = useState<'preferences' | 'booking' | 'success'>(
    'preferences'
  );
  const [preferences, setPreferences] = useState<DemoPreferences>({
    wantsDemo: false,
    demoTime: '',
    communicationChannel: 'email',
  });
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);

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

  const handleSkip = () => {
    localStorage.setItem('demoModalShown', 'true');
    onClose();
  };

  const handleContinueToBooking = () => {
    if (preferences.wantsDemo) {
      setStep('booking');
    } else {
      handleSkip();
    }
  };

  const handleBookDemo = async () => {
    if (!selectedSlot) return;

    setIsBooking(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setStep('success');
    setIsBooking(false);

    // Marquer comme montré pour ne plus l'afficher
    localStorage.setItem('demoModalShown', 'true');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-black bg-opacity-25"
          onClick={handleSkip}
        ></div>

        <div className="relative bg-white rounded-xl shadow-lg max-w-2xl w-full p-8">
          {/* Header avec bouton fermer */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                <CalendarDaysIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Démo personnalisée recommandée
                </h2>
                <p className="text-gray-600">
                  Maximisez vos campagnes avec Spread
                </p>
              </div>
            </div>
            <button
              onClick={handleSkip}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Contenu selon l'étape */}
          {step === 'preferences' && (
            <PreferencesContent
              preferences={preferences}
              setPreferences={setPreferences}
              onContinue={handleContinueToBooking}
              onSkip={handleSkip}
            />
          )}

          {step === 'booking' && (
            <BookingContent
              demoSlots={demoSlots}
              selectedSlot={selectedSlot}
              setSelectedSlot={setSelectedSlot}
              onBook={handleBookDemo}
              isBooking={isBooking}
              formatDate={formatDate}
              onBack={() => setStep('preferences')}
            />
          )}

          {step === 'success' && <SuccessContent onClose={onClose} />}
        </div>
      </div>
    </div>
  );
}

// Composant pour l'étape préférences
function PreferencesContent({
  preferences,
  setPreferences,
  onContinue,
  onSkip,
}: {
  preferences: DemoPreferences;
  setPreferences: (prefs: DemoPreferences) => void;
  onContinue: () => void;
  onSkip: () => void;
}) {
  return (
    <div className="space-y-6">
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
              checked={preferences.wantsDemo}
              onChange={(e) =>
                setPreferences({ ...preferences, wantsDemo: e.target.checked })
              }
              className="w-4 h-4 text-purple-600 focus:ring-purple-500"
            />
            <label
              htmlFor="wantsDemo"
              className="text-sm font-medium text-gray-900"
            >
              Oui, je veux une démo personnalisée
            </label>
          </div>

          {preferences.wantsDemo && (
            <Select
              label="Quand préférez-vous ?"
              value={preferences.demoTime}
              onChange={(e) =>
                setPreferences({ ...preferences, demoTime: e.target.value })
              }
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
                checked={preferences.communicationChannel === value}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    communicationChannel: e.target.value as
                      | 'email'
                      | 'phone'
                      | 'both',
                  })
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
        <Button variant="outline" onClick={onSkip} className="flex-1">
          Passer pour l&apos;instant
        </Button>
        <Button
          onClick={onContinue}
          className="flex-1 bg-purple-600 hover:bg-purple-700"
        >
          {preferences.wantsDemo ? 'Réserver une démo' : 'Continuer'}
        </Button>
      </div>
    </div>
  );
}

// Composant pour la réservation
function BookingContent({
  demoSlots,
  selectedSlot,
  setSelectedSlot,
  onBook,
  isBooking,
  formatDate,
  onBack,
}: {
  demoSlots: DemoSlot[];
  selectedSlot: string | null;
  setSelectedSlot: (id: string | null) => void;
  onBook: () => void;
  isBooking: boolean;
  formatDate: (date: string) => string;
  onBack: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="text-center">
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

      <div className="flex space-x-3">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Retour
        </Button>
        <Button
          onClick={onBook}
          disabled={!selectedSlot || isBooking}
          className="flex-1 bg-purple-600 hover:bg-purple-700"
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
    </div>
  );
}

// Composant pour le succès
function SuccessContent({ onClose }: { onClose: () => void }) {
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

      <Button
        onClick={onClose}
        className="w-full bg-purple-600 hover:bg-purple-700 py-3"
      >
        Commencer à explorer Spread
      </Button>
    </div>
  );
}
