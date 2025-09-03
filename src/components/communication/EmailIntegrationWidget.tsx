'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
  EnvelopeIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/24/solid';
import { useEmailIntegration } from '@/hooks/useEmailIntegration';

interface EmailIntegrationWidgetProps {
  compact?: boolean;
}

export default function EmailIntegrationWidget({
  compact = false,
}: EmailIntegrationWidgetProps) {
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<
    'gmail' | 'outlook' | null
  >(null);

  const {
    providers,
    hasConnectedEmail,
    isConnecting,
    error,
    connectProvider,
    syncEmails,
  } = useEmailIntegration();

  const connectedProvider = providers.find((p) => p.connected);

  const handleConnect = (providerType: 'gmail' | 'outlook') => {
    setSelectedProvider(providerType);
    setShowConnectModal(true);
  };

  const confirmConnection = async () => {
    if (!selectedProvider) return;

    const success = await connectProvider(selectedProvider);
    if (success) {
      setShowConnectModal(false);
      setSelectedProvider(null);
    }
  };

  const handleSync = async () => {
    await syncEmails();
  };

  if (compact) {
    return (
      <div className="p-3 border-t border-gray-200">
        {hasConnectedEmail ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircleIconSolid className="w-4 h-4 text-green-500" />
                <span className="text-xs font-medium text-gray-700">
                  Email connecté
                </span>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={handleSync}
                disabled={isConnecting}
                className="text-xs px-2 py-1 h-6"
              >
                {isConnecting ? (
                  <ArrowPathIcon className="w-3 h-3 animate-spin" />
                ) : (
                  <ArrowPathIcon className="w-3 h-3" />
                )}
              </Button>
            </div>
            {connectedProvider && (
              <div className="text-xs text-gray-500 truncate">
                {connectedProvider.email}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <ExclamationTriangleIcon className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-medium text-gray-700">
                Email non configuré
              </span>
            </div>
            <Button
              size="sm"
              onClick={() => setShowConnectModal(true)}
              className="w-full text-xs h-6"
            >
              <PlusIcon className="w-3 h-3 mr-1" />
              Connecter
            </Button>
          </div>
        )}

        {error && <div className="text-xs text-red-600 mt-1">{error}</div>}
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <EnvelopeIcon className="w-5 h-5 text-gray-400" />
          <h3 className="font-medium text-gray-900">Intégration Email</h3>
        </div>

        {hasConnectedEmail && (
          <Button
            size="sm"
            variant="outline"
            onClick={handleSync}
            disabled={isConnecting}
          >
            {isConnecting ? (
              <ArrowPathIcon className="w-4 h-4 animate-spin" />
            ) : (
              <ArrowPathIcon className="w-4 h-4" />
            )}
          </Button>
        )}
      </div>

      {hasConnectedEmail ? (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <CheckCircleIconSolid className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium text-green-700">Connecté</span>
          </div>
          {connectedProvider && (
            <div className="text-sm text-gray-600">
              {connectedProvider.email}
            </div>
          )}
          <div className="text-xs text-gray-500">
            Dernière sync:{' '}
            {connectedProvider?.lastSync
              ? new Date(connectedProvider.lastSync).toLocaleTimeString('fr-FR')
              : 'Jamais'}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-amber-600">
            <ExclamationTriangleIcon className="w-4 h-4" />
            <span className="text-sm">Aucun email configuré</span>
          </div>
          <p className="text-xs text-gray-600">
            Connectez votre email pour synchroniser vos conversations.
          </p>
          <Button
            size="sm"
            onClick={() => setShowConnectModal(true)}
            className="w-full"
          >
            <PlusIcon className="w-4 h-4 mr-1" />
            Connecter un email
          </Button>
        </div>
      )}

      {error && <div className="mt-2 text-sm text-red-600">{error}</div>}

      {/* Modal de connexion */}
      {showConnectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Connecter votre email
                </h3>
                <button
                  onClick={() => setShowConnectModal(false)}
                  disabled={isConnecting}
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

              {isConnecting ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                    <ArrowPathIcon className="w-6 h-6 text-purple-600 animate-spin" />
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
                <div className="space-y-4">
                  <p className="text-gray-600 mb-4">
                    Choisissez votre fournisseur d'email pour synchroniser vos
                    conversations.
                  </p>

                  <div className="space-y-3">
                    <button
                      onClick={() => handleConnect('gmail')}
                      className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-red-600"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
                          </svg>
                        </div>
                        <span className="font-medium text-gray-900">
                          Google Gmail
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">Connecter →</span>
                    </button>

                    <button
                      onClick={() => handleConnect('outlook')}
                      className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-blue-600"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
                          </svg>
                        </div>
                        <span className="font-medium text-gray-900">
                          Microsoft Outlook
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">Connecter →</span>
                    </button>
                  </div>

                  {selectedProvider && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h5 className="font-medium text-gray-900 mb-2">
                        Permissions demandées :
                      </h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Lecture des emails entrants et sortants</li>
                        <li>• Envoi d'emails en votre nom</li>
                        <li>• Accès aux informations de contact</li>
                        <li>• Synchronisation des conversations</li>
                      </ul>

                      <div className="flex space-x-3 mt-4">
                        <Button
                          variant="secondary"
                          onClick={() => {
                            setSelectedProvider(null);
                            setShowConnectModal(false);
                          }}
                          className="flex-1"
                        >
                          Annuler
                        </Button>
                        <Button onClick={confirmConnection} className="flex-1">
                          Autoriser
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
