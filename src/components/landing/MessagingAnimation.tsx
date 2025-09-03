'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  PaperAirplaneIcon, 
  InboxIcon, 
  CheckIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

export default function MessagingAnimation() {
  const [currentStep, setCurrentStep] = useState(0);
  const [messagesSent, setMessagesSent] = useState(0);
  const [responsesReceived, setResponsesReceived] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  // Données de démonstration pour les conversations
  const demoConversations = useMemo(() => [
    {
      id: 1,
      influencer: 'Marie Beauté',
      avatar: 'MB',
      platform: 'Instagram',
      status: 'responded',
      lastMessage: 'Merci pour cette opportunité ! Je suis très intéressée...',
      time: '2 min',
      isStarred: true,
      responseRate: 95
    },
    {
      id: 2,
      influencer: 'Thomas Fitness',
      avatar: 'TF',
      platform: 'YouTube',
      status: 'sent',
      lastMessage: 'Bonjour Thomas, nous aimerions collaborer avec vous...',
      time: '5 min',
      isStarred: false,
      responseRate: 78
    },
    {
      id: 3,
      influencer: 'Sophie Lifestyle',
      avatar: 'SL',
      platform: 'TikTok',
      status: 'draft',
      lastMessage: 'Brouillon : Salut Sophie, votre contenu nous inspire...',
      time: 'Brouillon',
      isStarred: false,
      responseRate: 88
    }
  ], []);

  // Animation en boucle
  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= 4) {
          // Reset après le cycle complet
          setMessagesSent(0);
          setResponsesReceived(0);
          return 0;
        }
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  // Mise à jour des compteurs
  useEffect(() => {
    if (currentStep === 1) {
      // Envoi de messages
      const timer = setTimeout(() => setMessagesSent(12), 500);
      return () => clearTimeout(timer);
    } else if (currentStep === 2) {
      // Réception de réponses
      const timer = setTimeout(() => setResponsesReceived(8), 800);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'responded':
        return <CheckIcon className="w-4 h-4 text-green-500" />;
      case 'sent':
        return <ClockIcon className="w-4 h-4 text-yellow-500" />;
      case 'draft':
        return <InboxIcon className="w-4 h-4 text-gray-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'responded':
        return 'bg-green-50 border-green-200';
      case 'sent':
        return 'bg-yellow-50 border-yellow-200';
      case 'draft':
        return 'bg-gray-50 border-gray-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsAnimating(false)}
      onMouseLeave={() => setIsAnimating(true)}
    >
      {/* Interface de messagerie */}
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-gray-500/20 p-6 border border-gray-200/50">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
            <InboxIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">
              Messagerie Intégrée
            </h4>
            <p className="text-xs text-gray-500">
              Conversations centralisées
            </p>
          </div>
        </div>

        {/* Stats en temps réel */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 text-center">
            <div className={`text-lg font-bold text-blue-700 transition-all duration-500 ${currentStep >= 1 ? 'animate-pulse' : ''}`}>
              {messagesSent}
            </div>
            <div className="text-xs text-blue-600">Messages envoyés</div>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3 text-center">
            <div className={`text-lg font-bold text-green-700 transition-all duration-500 ${currentStep >= 2 ? 'animate-pulse' : ''}`}>
              {responsesReceived}
            </div>
            <div className="text-xs text-green-600">Réponses reçues</div>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-3 text-center">
            <div className="text-lg font-bold text-purple-700">
              87%
            </div>
            <div className="text-xs text-purple-600">Taux de réponse</div>
          </div>
        </div>

        {/* Liste des conversations */}
        <div className="space-y-3">
          {demoConversations.map((conv, index) => (
            <div 
              key={conv.id}
              className={`p-3 rounded-xl border transition-all duration-500 ${getStatusColor(conv.status)} ${
                currentStep >= index + 1 ? 'animate-slideIn opacity-100' : 'opacity-60'
              }`}
              style={{
                animationDelay: `${index * 0.3}s`,
                animationFillMode: 'both'
              }}
            >
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {conv.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900 text-sm">{conv.influencer}</span>
                      <span className="text-xs text-gray-500">• {conv.platform}</span>
                      {conv.isStarred && <StarIconSolid className="w-3 h-3 text-yellow-400" />}
                    </div>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(conv.status)}
                      <span className="text-xs text-gray-500">{conv.time}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 truncate">{conv.lastMessage}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">Taux de réponse: {conv.responseRate}%</span>
                    {currentStep >= 3 && conv.status === 'responded' && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 animate-fadeIn">
                        ✓ Répondu
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Composer un nouveau message */}
        {currentStep >= 4 && (
          <div className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200 animate-fadeIn">
            <div className="flex items-center space-x-2 mb-2">
              <PaperAirplaneIcon className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-900">Nouveau message</span>
            </div>
            <div className="text-xs text-purple-700">
              Rédigez votre message personnalisé...
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-6">
          <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-3 rounded-xl font-semibold text-sm hover:from-blue-700 hover:to-indigo-700 transition-colors duration-300">
            🚀 Gérer mes Conversations
          </button>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
        <PaperAirplaneIcon className="w-6 h-6 text-white" />
      </div>

      {/* Performance Badge */}
      <div className="absolute top-4 right-4 bg-gradient-to-r from-green-400 to-emerald-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
        ⚡ 87% taux de réponse
      </div>

      {/* Styles pour les animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-slideIn {
          animation: slideIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}