'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import {
  ChevronDownIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

interface MultiSelectOption {
  value: string;
  label: string;
}

interface MultiSelectProps {
  label?: string;
  placeholder?: string;
  values: MultiSelectOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  searchable?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function MultiSelect({
  label,
  placeholder = 'Sélectionner...',
  values,
  selected,
  onChange,
  searchable = true,
  disabled = false,
  className = '',
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Filtrer les options selon la recherche
  const filteredValues = values.filter((option) =>
    searchQuery
      ? option.label.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  // Obtenir les options sélectionnées pour affichage
  const selectedOptions = values.filter((option) =>
    selected.includes(option.value)
  );

  // Fermer le dropdown si clic à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery('');
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus sur l'input de recherche à l'ouverture
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  // Gestion du clavier
  const handleKeyDown = (event: KeyboardEvent) => {
    if (!isOpen) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (event.key) {
      case 'Escape':
        setIsOpen(false);
        setSearchQuery('');
        setFocusedIndex(-1);
        triggerRef.current?.focus();
        break;
      case 'ArrowDown':
        event.preventDefault();
        setFocusedIndex((prev) =>
          prev < filteredValues.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case 'Enter':
        event.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < filteredValues.length) {
          toggleSelection(filteredValues[focusedIndex].value);
        }
        break;
    }
  };

  // Toggle sélection d'une option
  const toggleSelection = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  // Supprimer une sélection (chip)
  const removeSelection = (value: string) => {
    onChange(selected.filter((v) => v !== value));
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={`
          w-full min-h-[40px] px-3 py-2 text-left bg-white border rounded-md shadow-sm
          focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500
          ${disabled ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : 'hover:border-gray-400'}
          ${isOpen ? 'border-purple-500 ring-2 ring-purple-500' : 'border-gray-300'}
        `}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex flex-wrap gap-1 items-center">
          {selectedOptions.length > 0 ? (
            <>
              {/* Selected Tags */}
              {selectedOptions.map((option) => (
                <span
                  key={option.value}
                  className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-md"
                >
                  {option.label}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeSelection(option.value);
                    }}
                    className="ml-1 text-purple-600 hover:text-purple-800"
                  >
                    <XMarkIcon className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {/* Spacer pour pousser la flèche à droite */}
              <div className="flex-1" />
            </>
          ) : (
            <span className="text-gray-500">{placeholder}</span>
          )}
        </div>

        {/* Chevron */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDownIcon
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
              isOpen ? 'transform rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-hidden">
          {/* Search Input */}
          {searchable && (
            <div className="p-2 border-b border-gray-200">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setFocusedIndex(-1);
                  }}
                  onKeyDown={handleKeyDown}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>
          )}

          {/* Options List */}
          <div className="max-h-48 overflow-y-auto">
            {filteredValues.length > 0 ? (
              <div role="listbox" aria-label={label}>
                {filteredValues.map((option, index) => {
                  const isSelected = selected.includes(option.value);
                  const isFocused = index === focusedIndex;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => toggleSelection(option.value)}
                      onMouseEnter={() => setFocusedIndex(index)}
                      className={`
                        w-full px-3 py-2 text-left text-sm hover:bg-gray-50
                        flex items-center justify-between
                        ${isFocused ? 'bg-purple-50' : ''}
                        ${isSelected ? 'bg-purple-100 text-purple-900' : 'text-gray-900'}
                      `}
                    >
                      <span>{option.label}</span>
                      {isSelected && (
                        <span className="text-purple-600 font-medium">✓</span>
                      )}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="px-3 py-2 text-sm text-gray-500">
                Aucun résultat trouvé
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
