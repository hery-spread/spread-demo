'use client';

import { useState } from 'react';
import { Influencer } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import {
  ChevronUpIcon,
  ChevronDownIcon,
  EyeIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

interface SearchResultsTableProps {
  results: Influencer[];
  loading?: boolean;
  onViewProfile?: (influencer: Influencer) => void;
  onAddToList?: (influencer: Influencer) => void;
}

type SortField = 'name' | 'followers' | 'engagement' | 'platform';
type SortDirection = 'asc' | 'desc';

export default function SearchResultsTable({
  results,
  loading = false,
  onViewProfile,
  onAddToList,
}: SearchResultsTableProps) {
  const [sortField, setSortField] = useState<SortField>('followers');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
    setCurrentPage(1);
  };

  const sortedResults = [...results].sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    switch (sortField) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'followers':
        aValue = a.followers;
        bValue = b.followers;
        break;
      case 'engagement':
        aValue = a.engagementRate;
        bValue = b.engagementRate;
        break;
      case 'platform':
        aValue = a.platform;
        bValue = b.platform;
        break;
      default:
        return 0;
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedResults.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedResults = sortedResults.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? (
      <ChevronUpIcon className="w-4 h-4 ml-1" />
    ) : (
      <ChevronDownIcon className="w-4 h-4 ml-1" />
    );
  };

  const getPlatformBadge = (platform: string) => {
    const colors = {
      instagram: 'bg-pink-100 text-pink-800',
      youtube: 'bg-red-100 text-red-800',
      tiktok: 'bg-gray-900 text-white',
    };
    return (
      colors[platform as keyof typeof colors] || 'bg-gray-100 text-gray-800'
    );
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-gray-200 rounded"></div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <p className="text-gray-500 mb-2">Aucun résultat trouvé</p>
        <p className="text-sm text-gray-400">
          Essayez d&apos;ajuster vos critères de recherche
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Résultats de recherche
          </h3>
          <span className="text-sm text-gray-500">
            {results.length} influenceur{results.length > 1 ? 's' : ''} trouvé
            {results.length > 1 ? 's' : ''}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Profil</TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center hover:text-gray-900"
                >
                  Nom
                  <SortIcon field="name" />
                </button>
              </TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort('platform')}
                  className="flex items-center hover:text-gray-900"
                >
                  Plateforme
                  <SortIcon field="platform" />
                </button>
              </TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort('followers')}
                  className="flex items-center hover:text-gray-900"
                >
                  Followers
                  <SortIcon field="followers" />
                </button>
              </TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort('engagement')}
                  className="flex items-center hover:text-gray-900"
                >
                  Engagement
                  <SortIcon field="engagement" />
                </button>
              </TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedResults.map((influencer) => (
              <TableRow key={influencer.id}>
                <TableCell>
                  <img
                    src={influencer.avatar}
                    alt={influencer.name}
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          influencer.name
                        )}&background=6366f1&color=fff`;
                    }}
                  />
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium text-gray-900 flex items-center">
                      {influencer.name}
                      {influencer.verified && (
                        <span className="ml-1 text-blue-500">✓</span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      @{influencer.username}
                    </div>
                    {influencer.bio && (
                      <div className="text-xs text-gray-400 mt-1 max-w-xs truncate">
                        {influencer.bio}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPlatformBadge(
                      influencer.platform
                    )}`}
                  >
                    {influencer.platform}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="text-sm font-medium text-gray-900">
                    {influencer.followers.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">followers</div>
                </TableCell>
                <TableCell>
                  <div className="text-sm font-medium text-gray-900">
                    {influencer.engagementRate}%
                  </div>
                  <div className="text-xs text-gray-500">
                    {influencer.engagement.toLocaleString()} interactions
                  </div>
                </TableCell>
                <TableCell>
                  {influencer.email ? (
                    <div className="text-sm text-green-600">✓ Disponible</div>
                  ) : (
                    <div className="text-sm text-gray-400">Non disponible</div>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewProfile?.(influencer)}
                    >
                      <EyeIcon className="w-4 h-4 mr-1" />
                      Voir
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => onAddToList?.(influencer)}
                    >
                      <PlusIcon className="w-4 h-4 mr-1" />
                      Ajouter
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Affichage de {startIndex + 1} à{' '}
              {Math.min(startIndex + itemsPerPage, results.length)} sur{' '}
              {results.length} résultats
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Précédent
              </Button>
              <span className="text-sm text-gray-600">
                Page {currentPage} sur {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
              >
                Suivant
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
