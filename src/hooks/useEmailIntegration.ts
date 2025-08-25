'use client';

import { useState, useEffect } from 'react';
import { EmailProvider } from '@/types';

export interface EmailIntegrationState {
  providers: EmailProvider[];
  hasConnectedEmail: boolean;
  isConnecting: boolean;
  error: string | null;
}

export function useEmailIntegration() {
  const [state, setState] = useState<EmailIntegrationState>({
    providers: [
      {
        type: 'gmail',
        connected: false,
        email: '',
      },
      {
        type: 'outlook',
        connected: false,
        email: '',
      },
    ],
    hasConnectedEmail: false,
    isConnecting: false,
    error: null,
  });

  // Vérifier s'il y a des emails connectés
  useEffect(() => {
    const hasConnected = state.providers.some(provider => provider.connected);
    setState(prev => ({ ...prev, hasConnectedEmail: hasConnected }));
  }, [state.providers]);

  const connectProvider = async (providerType: 'gmail' | 'outlook') => {
    setState(prev => ({ ...prev, isConnecting: true, error: null }));

    try {
      // Simulation de connexion OAuth
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock email basé sur le type de provider
      const mockEmail = providerType === 'gmail' 
        ? 'marie@agence-creative.com' 
        : 'marie@company.com';

      setState(prev => ({
        ...prev,
        providers: prev.providers.map(provider =>
          provider.type === providerType
            ? {
                ...provider,
                connected: true,
                email: mockEmail,
                connectedAt: new Date().toISOString(),
                lastSync: new Date().toISOString(),
              }
            : provider
        ),
        isConnecting: false,
      }));

      return true;
    } catch {
      setState(prev => ({
        ...prev,
        isConnecting: false,
        error: 'Erreur lors de la connexion',
      }));
      return false;
    }
  };

  const disconnectProvider = (providerType: 'gmail' | 'outlook') => {
    setState(prev => ({
      ...prev,
      providers: prev.providers.map(provider =>
        provider.type === providerType
          ? {
              ...provider,
              connected: false,
              email: '',
              connectedAt: undefined,
              lastSync: undefined,
            }
          : provider
      ),
    }));
  };

  const syncEmails = async () => {
    setState(prev => ({ ...prev, isConnecting: true, error: null }));

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setState(prev => ({
        ...prev,
        providers: prev.providers.map(provider =>
          provider.connected
            ? { ...provider, lastSync: new Date().toISOString() }
            : provider
        ),
        isConnecting: false,
      }));

      return true;
    } catch {
      setState(prev => ({
        ...prev,
        isConnecting: false,
        error: 'Erreur lors de la synchronisation',
      }));
      return false;
    }
  };

  return {
    ...state,
    connectProvider,
    disconnectProvider,
    syncEmails,
  };
}
