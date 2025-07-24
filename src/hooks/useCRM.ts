import { useState, useEffect } from 'react';
import { CRMContact, CRMStats } from '@/types';
import { mockCRMContacts, mockCRMStats } from '@/lib/mockData';

export const useCRM = () => {
  const [contacts, setContacts] = useState<CRMContact[]>(mockCRMContacts);
  const [stats, setStats] = useState<CRMStats>(mockCRMStats);

  const addContact = (contactData: Partial<CRMContact>) => {
    const newContact: CRMContact = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      lastContact: new Date().toISOString(),
      platform: 'instagram',
      followers: 0,
      avatar: '/avatars/default.jpg',
      stage: 'contacted',
      source: 'manual',
      name: '',
      username: '',
      ...contactData,
    } as CRMContact;

    setContacts((prev) => [newContact, ...prev]);
    updateStats();
  };

  const updateContactStage = (contactId: string, newStage: string) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === contactId
          ? { 
              ...contact, 
              stage: newStage as CRMContact['stage'],
              lastContact: new Date().toISOString()
            }
          : contact
      )
    );
    updateStats();
  };

  const updateContact = (contactId: string, updates: Partial<CRMContact>) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === contactId 
          ? { 
              ...contact, 
              ...updates,
              lastContact: new Date().toISOString()
            } 
          : contact
      )
    );
    updateStats();
  };

  const deleteContact = (contactId: string) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== contactId));
    updateStats();
  };

  const updateStats = () => {
    const totalContacts = contacts.length;
    const contacted = contacts.filter((c) => c.stage === 'contacted').length;
    const responded = contacts.filter((c) => c.stage === 'responded').length;
    const negotiating = contacts.filter((c) => c.stage === 'negotiating').length;
    const closed = contacts.filter((c) => c.stage === 'closed').length;

    const responseRate = totalContacts > 0 ? Math.round(((responded + negotiating + closed) / totalContacts) * 100) : 0;
    const conversionRate = totalContacts > 0 ? Math.round((closed / totalContacts) * 100) : 0;

    setStats({
      totalContacts,
      contacted,
      responded,
      negotiating,
      closed,
      responseRate,
      averageResponseTime: 24, // heures
      conversionRate,
    });
  };

  const getContactsByStage = (stage: CRMContact['stage']) => {
    return contacts.filter((contact) => contact.stage === stage);
  };

  const addNote = (contactId: string, note: string) => {
    updateContact(contactId, { notes: note });
  };

  const setReminder = (contactId: string, reminderDate: string) => {
    updateContact(contactId, { nextReminder: reminderDate });
  };

  // Mise à jour automatique des stats quand les contacts changent
  useEffect(() => {
    updateStats();
  }, [contacts.length]);

  return {
    contacts,
    stats,
    addContact,
    updateContactStage,
    updateContact,
    deleteContact,
    getContactsByStage,
    addNote,
    setReminder,
  };
}; 