'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  MagnifyingGlassIcon,
  EnvelopeIcon,
  EyeIcon,
  TrashIcon,
  CheckBadgeIcon,
} from '@heroicons/react/24/outline';
import { InfluencerContact } from '@/types';

interface ContactsTableProps {
  contacts: InfluencerContact[];
  onRemoveContact: (contactId: string) => void;
  onContactInfluencer: (contact: InfluencerContact) => void;
}

export default function ContactsTable({
  contacts,
  onRemoveContact,
  onContactInfluencer,
}: ContactsTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'email'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

  // Filtrer et trier les contacts
  const filteredContacts = contacts
    .filter(
      (contact) =>
        contact.contactName
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        contact.contactEmail?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const aValue =
        sortBy === 'name' ? a.contactName || '' : a.contactEmail || '';
      const bValue =
        sortBy === 'name' ? b.contactName || '' : b.contactEmail || '';

      if (sortOrder === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

  const handleSort = (field: 'name' | 'email') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  // Filtrer uniquement les contacts avec email pour sélection
  const contactsWithEmail = filteredContacts.filter((c) => c.contactEmail);

  const handleSelectAll = () => {
    if (selectedContacts.length === contactsWithEmail.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(contactsWithEmail.map((c) => c.id));
    }
  };

  const handleSelectContact = (contactId: string) => {
    const contact = filteredContacts.find((c) => c.id === contactId);
    // Empêcher la sélection des contacts sans email
    if (!contact?.contactEmail) return;
    
    if (selectedContacts.includes(contactId)) {
      setSelectedContacts((prev) => prev.filter((id) => id !== contactId));
    } else {
      setSelectedContacts((prev) => [...prev, contactId]);
    }
  };

  const handleBulkRemove = () => {
    if (
      confirm(
        `Supprimer ${selectedContacts.length} contact(s) de cette liste ?`
      )
    ) {
      selectedContacts.forEach((contactId) => onRemoveContact(contactId));
      setSelectedContacts([]);
    }
  };

  if (contacts.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <div className="text-6xl mb-4">👥</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Aucun influenceur dans cette liste
        </h3>
        <p className="text-gray-600">
          Ajoutez des influenceurs depuis la page de recherche pour commencer à
          constituer votre liste.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Header avec recherche et actions */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          {/* Recherche */}
          <div className="relative flex-1 max-w-md">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Rechercher un contact..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Actions de masse */}
          <div className="flex items-center space-x-4">
            {/* Compteur de sélection */}
            <div className="text-sm text-gray-600">
              <span className="font-medium">{selectedContacts.length}</span> / <span className="font-medium">{contactsWithEmail.length}</span> contacts sélectionnés
              {contactsWithEmail.length < filteredContacts.length && (
                <span className="text-xs text-gray-500 ml-2">
                  ({filteredContacts.length - contactsWithEmail.length} sans email)
                </span>
              )}
            </div>

            {/* Actions */}
            {selectedContacts.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleBulkRemove}
                className="text-red-600 hover:text-red-700"
              >
                <TrashIcon className="w-4 h-4 mr-1" />
                Supprimer ({selectedContacts.length})
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={
                    selectedContacts.length === contactsWithEmail.length &&
                    contactsWithEmail.length > 0
                  }
                  onChange={handleSelectAll}
                  disabled={contactsWithEmail.length === 0}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 disabled:bg-gray-100 disabled:border-gray-300"
                  title={contactsWithEmail.length === 0 ? "Aucun contact avec email à sélectionner" : "Sélectionner tous les contacts avec email"}
                />
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center space-x-1">
                  <span>Nom</span>
                  {sortBy === 'name' && (
                    <span className="text-purple-600">
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('email')}
              >
                <div className="flex items-center space-x-1">
                  <span>Email</span>
                  {sortBy === 'email' && (
                    <span className="text-purple-600">
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredContacts.map((contact) => {
              const hasEmail = !!contact.contactEmail;
              return (
              <tr 
                key={contact.id} 
                className={`hover:bg-gray-50 ${!hasEmail ? 'opacity-60 bg-gray-50/50' : ''}`}
              >
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={selectedContacts.includes(contact.id)}
                    onChange={() => handleSelectContact(contact.id)}
                    disabled={!hasEmail}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 disabled:bg-gray-100 disabled:border-gray-300 disabled:opacity-50"
                    title={!hasEmail ? "Contact sans email - non sélectionnable" : "Sélectionner ce contact"}
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {contact.contactName?.charAt(0) || '?'}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {contact.contactName || 'Nom non disponible'}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: {contact.id}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm text-gray-900">
                    {contact.contactEmail || (
                      <span className="text-gray-400 italic">
                        Email non disponible
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-2">
                    {contact.contactEmail ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckBadgeIcon className="w-3 h-3 mr-1" />
                        Contactable
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Email manquant
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Link href={`/profile/${contact.id}`}>
                      <Button variant="outline" size="sm">
                        <EyeIcon className="w-4 h-4 mr-1" />
                        Voir
                      </Button>
                    </Link>

                    {contact.contactEmail && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onContactInfluencer(contact)}
                      >
                        <EnvelopeIcon className="w-4 h-4 mr-1" />
                        Contact
                      </Button>
                    )}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onRemoveContact(contact.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer avec statistiques */}
      {filteredContacts.length > 0 && (
        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Affichage de {filteredContacts.length} contact
              {filteredContacts.length > 1 ? 's' : ''}
              {searchQuery && ` (filtré sur "${searchQuery}")`}
            </div>

            <div className="text-sm text-gray-500 flex items-center space-x-4">
              <span className="text-green-600 font-medium">
                ✓ {contactsWithEmail.length} contactable{contactsWithEmail.length > 1 ? 's' : ''}
              </span>
              {filteredContacts.length > contactsWithEmail.length && (
                <span className="text-gray-400">
                  ✗ {filteredContacts.length - contactsWithEmail.length} sans email
                </span>
              )}
              {selectedContacts.length > 0 && (
                <span className="text-purple-600 font-medium">
                  • {selectedContacts.length} sélectionné{selectedContacts.length > 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
