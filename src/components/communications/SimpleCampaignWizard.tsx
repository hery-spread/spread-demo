'use client';

import { useState } from 'react';
import { Button } from '@/components/ui';
import {
  EmailCampaignSequence,
  EmailSequenceStep,
  InfluencerList,
} from '@/types';
import { mockLists } from '@/lib/mockData';

interface SimpleCampaignWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateCampaign: (campaign: EmailCampaignSequence) => void;
}

export default function SimpleCampaignWizard({
  isOpen,
  onClose,
  onCreateCampaign,
}: SimpleCampaignWizardProps) {
  const [campaignName, setCampaignName] = useState('');
  const [selectedListId, setSelectedListId] = useState('');
  const [emailSteps, setEmailSteps] = useState<EmailSequenceStep[]>([]);

  const lists: InfluencerList[] = mockLists;

  const addEmailStep = () => {
    const newStep: EmailSequenceStep = {
      id: `step_${Date.now()}`,
      stepNumber: emailSteps.length + 1,
      delayDays: emailSteps.length === 0 ? 0 : 3,
      templateId: '',
      subject: '',
      body: '',
      isActive: true,
    };
    setEmailSteps([...emailSteps, newStep]);
  };

  const removeStep = (index: number) => {
    const updatedSteps = emailSteps
      .filter((_, i) => i !== index)
      .map((step, i) => ({ ...step, stepNumber: i + 1 }));
    setEmailSteps(updatedSteps);
  };

  const updateStep = (index: number, updates: Partial<EmailSequenceStep>) => {
    const updatedSteps = emailSteps.map((step, i) =>
      i === index ? { ...step, ...updates } : step
    );
    setEmailSteps(updatedSteps);
  };

  const handleCreateCampaign = () => {
    const selectedList = lists.find((list) => list.id === selectedListId);

    const newCampaign: EmailCampaignSequence = {
      id: `campaign_${Date.now()}`,
      name: campaignName,
      listId: selectedListId,
      listName: selectedList?.name || '',
      fromEmail: 'marie.marketing@agence-creative.com',
      fromName: 'Marie - Agence Créative',
      steps: emailSteps,
      status: 'draft',
      createdAt: new Date().toISOString(),
      totalRecipients: selectedList?.influencers.length || 0,
      sentCount: 0,
      openedCount: 0,
      repliedCount: 0,
      bouncedCount: 0,
      trackOpens: true,
      trackClicks: true,
    };

    onCreateCampaign(newCampaign);
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setCampaignName('');
    setSelectedListId('');
    setEmailSteps([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            Nouvelle campagne email
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
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

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)] space-y-6">
          {/* Nom de la campagne */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom de la campagne *
            </label>
            <input
              type="text"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              placeholder="Ex: Campagne Beauté Q1 2024"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Sélection de liste */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Liste d{`'`}influenceurs *
            </label>
            <select
              value={selectedListId}
              onChange={(e) => setSelectedListId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Sélectionnez une liste</option>
              {lists.map((list) => (
                <option key={list.id} value={list.id}>
                  {list.name} ({list.influencers.length} influenceurs)
                </option>
              ))}
            </select>
          </div>

          {/* Séquence d'emails */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Séquence d{`'`}emails
              </h3>
              <Button onClick={addEmailStep} size="sm">
                Ajouter un email
              </Button>
            </div>

            <div className="space-y-4">
              {emailSteps.map((step, index) => (
                <div
                  key={step.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-900">
                      Email {step.stepNumber}
                    </h4>
                    <button
                      onClick={() => removeStep(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Supprimer
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Délai (jours)
                      </label>
                      <select
                        value={step.delayDays}
                        onChange={(e) =>
                          updateStep(index, {
                            delayDays: parseInt(e.target.value),
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value={0}>Immédiatement</option>
                        <option value={1}>1 jour</option>
                        <option value={3}>3 jours</option>
                        <option value={7}>1 semaine</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sujet
                      </label>
                      <input
                        type="text"
                        value={step.subject}
                        onChange={(e) =>
                          updateStep(index, { subject: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        value={step.body}
                        onChange={(e) =>
                          updateStep(index, { body: e.target.value })
                        }
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
          <Button variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button
            onClick={handleCreateCampaign}
            disabled={
              !campaignName || !selectedListId || emailSteps.length === 0
            }
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            Créer la campagne
          </Button>
        </div>
      </div>
    </div>
  );
}
