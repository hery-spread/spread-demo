'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
  CalendarDaysIcon,
  ClockIcon,
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
