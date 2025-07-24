'use client';

import { useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import {
  EnvelopeIcon,
  PhoneIcon,
  VideoCameraIcon,
  CalendarDaysIcon,
  ChatBubbleLeftIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';
import { CRMContact } from '@/types';

interface CRMKanbanProps {
  contacts: CRMContact[];
  onUpdateStage: (contactId: string, newStage: string) => void;
}

const stages = [
  { id: 'contacted', name: 'Contacté', color: 'bg-blue-100 text-blue-800' },
  { id: 'responded', name: 'Répondu', color: 'bg-green-100 text-green-800' },
  {
    id: 'negotiating',
    name: 'Négociation',
    color: 'bg-yellow-100 text-yellow-800',
  },
  { id: 'closed', name: 'Fermé', color: 'bg-gray-100 text-gray-800' },
];

export default function CRMKanban({ contacts, onUpdateStage }: CRMKanbanProps) {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    onUpdateStage(draggableId, destination.droppableId);
  };

  const getContactsByStage = (stageId: string) => {
    return contacts.filter((contact) => contact.stage === stageId);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stages.map((stage) => (
          <div
            key={stage.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200"
          >
            {/* Header de colonne */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">{stage.name}</h3>
                <span
                  className={`text-sm px-2 py-1 rounded-full ${stage.color}`}
                >
                  {getContactsByStage(stage.id).length}
                </span>
              </div>
            </div>

            {/* Zone droppable */}
            <Droppable droppableId={stage.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`p-4 min-h-[400px] space-y-3 transition-colors ${
                    snapshot.isDraggingOver ? 'bg-gray-50' : ''
                  }`}
                >
                  {getContactsByStage(stage.id).map((contact, index) => (
                    <Draggable
                      key={contact.id}
                      draggableId={contact.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`transition-shadow ${
                            snapshot.isDragging
                              ? 'shadow-lg scale-105 rotate-2'
                              : 'hover:shadow-md'
                          }`}
                        >
                          <ContactCard contact={contact} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}

function ContactCard({ contact }: { contact: CRMContact }) {
  const [showMenu, setShowMenu] = useState(false);

  // Calculer les jours depuis le dernier contact
  const daysSinceLastContact = Math.floor(
    (new Date().getTime() - new Date(contact.lastContact).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <div className="relative bg-white border border-gray-200 rounded-lg p-3 hover:border-gray-300 transition-colors">
      {/* Header de carte */}
      <div className="flex items-center space-x-3 mb-2">
        <img
          src={contact.avatar}
          alt={contact.name}
          className="w-8 h-8 rounded-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                contact.name
              )}&background=6366f1&color=fff`;
          }}
        />
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-gray-900 truncate">
            {contact.name}
          </h4>
          <p className="text-xs text-gray-500 truncate">@{contact.username}</p>
        </div>
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="text-gray-400 hover:text-gray-600 p-1"
        >
          <EllipsisVerticalIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Statistiques */}
      <div className="text-xs text-gray-600 mb-2 space-y-1">
        <div className="flex items-center justify-between">
          <span>Followers:</span>
          <span className="font-medium">
            {contact.followers.toLocaleString()}
          </span>
        </div>
        {contact.dealValue && (
          <div className="flex items-center justify-between">
            <span>Deal:</span>
            <span className="font-medium text-green-600">
              {contact.dealValue}€
            </span>
          </div>
        )}
      </div>

      {/* Tags */}
      {contact.tags && contact.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {contact.tags.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
          {contact.tags.length > 2 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{contact.tags.length - 2}
            </span>
          )}
        </div>
      )}

      {/* Dernière activité */}
      <div className="text-xs text-gray-500 mb-2">
        Dernier contact:{' '}
        {daysSinceLastContact === 0
          ? "Aujourd'hui"
          : `Il y a ${daysSinceLastContact}j`}
      </div>

      {/* Rappel */}
      {contact.nextReminder && (
        <div className="flex items-center space-x-1 text-xs text-orange-600 mb-2">
          <CalendarDaysIcon className="w-3 h-3" />
          <span>
            Rappel: {new Date(contact.nextReminder).toLocaleDateString('fr-FR')}
          </span>
        </div>
      )}

      {/* Indicateurs de contact */}
      <div className="flex items-center space-x-2 mb-2">
        {contact.email && (
          <div className="w-4 h-4 bg-blue-100 rounded flex items-center justify-center">
            <EnvelopeIcon className="w-2.5 h-2.5 text-blue-600" />
          </div>
        )}
        {contact.phone && (
          <div className="w-4 h-4 bg-green-100 rounded flex items-center justify-center">
            <PhoneIcon className="w-2.5 h-2.5 text-green-600" />
          </div>
        )}
        {contact.hasVideoCall && (
          <div className="w-4 h-4 bg-purple-100 rounded flex items-center justify-center">
            <VideoCameraIcon className="w-2.5 h-2.5 text-purple-600" />
          </div>
        )}
      </div>

      {/* Notes preview */}
      {contact.notes && (
        <div className="mt-2 p-2 bg-gray-50 rounded text-xs text-gray-600 border-l-2 border-gray-300">
          {contact.notes.substring(0, 60)}
          {contact.notes.length > 60 && '...'}
        </div>
      )}

      {/* Menu contextuel */}
      {showMenu && (
        <div className="absolute right-0 top-8 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
          <button className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
            <EnvelopeIcon className="w-4 h-4" />
            <span>Envoyer un email</span>
          </button>
          <button className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
            <CalendarDaysIcon className="w-4 h-4" />
            <span>Programmer un rappel</span>
          </button>
          <button className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
            <ChatBubbleLeftIcon className="w-4 h-4" />
            <span>Ajouter une note</span>
          </button>
        </div>
      )}
    </div>
  );
}
