'use client';

import { useState } from 'react';
import { Button } from '@/components/ui';
import { EmailProvider } from '@/types';
import { mockEmailProviders } from '@/lib/mockData/emailData';

export default function EmailIntegration() {
  const [providers, setProviders] =
    useState<EmailProvider[]>(mockEmailProviders);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<
    'gmail' | 'outlook' | null
  >(null);
  const [connecting, setConnecting] = useState(false);

  const handleConnect = async (providerType: 'gmail' | 'outlook') => {
    setSelectedProvider(providerType);
    setShowConnectModal(true);
  };

  const confirmConnection = async () => {
    if (!selectedProvider) return;

    setConnecting(true);

    // Simulation de connexion
    setTimeout(() => {
      setProviders((prev) =>
        prev.map((provider) =>
          provider.type === selectedProvider
            ? {
                ...provider,
                connected: true,
                connectedAt: new Date().toISOString(),
                lastSync: new Date().toISOString(),
              }
            : provider
        )
      );

      setConnecting(false);
      setShowConnectModal(false);
      setSelectedProvider(null);
    }, 2000);
  };

  const handleDisconnect = (providerType: 'gmail' | 'outlook') => {
    setProviders((prev) =>
      prev.map((provider) =>
        provider.type === providerType
          ? {
              ...provider,
              connected: false,
              connectedAt: undefined,
              lastSync: undefined,
            }
          : provider
      )
    );
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Non disponible';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Intégration email
        </h3>
        <p className="text-sm text-gray-600">
          Connectez vos comptes email pour synchroniser automatiquement vos
          conversations avec les influenceurs.
        </p>
      </div>

      <div className="space-y-4">
        {providers.map((provider) => (
          <div
            key={provider.type}
            className="border border-gray-200 rounded-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {provider.type === 'gmail' ? (
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-red-600"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
                      </svg>
                    </div>
                  ) : provider.type === 'outlook' ? (
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="text-lg font-medium text-gray-900 capitalize">
                    {provider.type === 'gmail'
                      ? 'Google Gmail'
                      : provider.type === 'outlook'
                        ? 'Microsoft Outlook'
                        : 'Autre fournisseur'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {provider.connected ? provider.email : 'Non connecté'}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {provider.connected ? (
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center text-green-600">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-sm font-medium">Connecté</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleDisconnect(provider.type as 'gmail' | 'outlook')
                      }
                    >
                      Déconnecter
                    </Button>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    onClick={() =>
                      handleConnect(provider.type as 'gmail' | 'outlook')
                    }
                    className="bg-emerald-600 hover:bg-emerald-700"
                    disabled={provider.type === 'other'}
                  >
                    {provider.type === 'other' ? 'Non supporté' : 'Connecter'}
                  </Button>
                )}
              </div>
            </div>

            {provider.connected && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Connecté le :</span>
                    <span className="ml-2 text-gray-900">
                      {formatDate(provider.connectedAt)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Dernière sync :</span>
                    <span className="ml-2 text-gray-900">
                      {formatDate(provider.lastSync)}
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Synchronisation automatique des emails
                  </span>
                  <Button variant="outline" size="sm">
                    Synchroniser maintenant
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Information sur la sécurité */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <svg
            className="w-5 h-5 text-blue-600 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-blue-900">
              Sécurité et confidentialité
            </h4>
            <p className="text-sm text-blue-800 mt-1">
              Vos données de connexion sont cryptées et stockées de manière
              sécurisée. Nous utilisons OAuth 2.0 pour l{`'`}authentification et
              n{`'`}accédons qu{`'`}aux emails nécessaires au suivi de vos
              conversations professionnelles.
            </p>
          </div>
        </div>
      </div>

      {/* Modal de connexion */}
      {showConnectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Connecter {selectedProvider === 'gmail' ? 'Gmail' : 'Outlook'}
                </h3>
                <button
                  onClick={() => setShowConnectModal(false)}
                  disabled={connecting}
                  className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {connecting ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-emerald-600 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    Connexion en cours...
                  </h4>
                  <p className="text-gray-600">
                    Authentification avec{' '}
                    {selectedProvider === 'gmail' ? 'Google' : 'Microsoft'}
                  </p>
                </div>
              ) : (
                <div>
                  <div className="mb-6">
                    <p className="text-gray-600 mb-4">
                      Vous allez être redirigé vers{' '}
                      {selectedProvider === 'gmail' ? 'Google' : 'Microsoft'}
                      pour autoriser l{`'`}accès à votre compte email.
                    </p>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-medium text-gray-900 mb-2">
                        Permissions demandées :
                      </h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Lecture des emails entrants et sortants</li>
                        <li>• Envoi d{`'`}emails en votre nom</li>
                        <li>• Accès aux informations de contact</li>
                        <li>• Synchronisation des conversations</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      variant="secondary"
                      onClick={() => setShowConnectModal(false)}
                      className="flex-1"
                    >
                      Annuler
                    </Button>
                    <Button
                      onClick={confirmConnection}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                    >
                      Autoriser la connexion
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
