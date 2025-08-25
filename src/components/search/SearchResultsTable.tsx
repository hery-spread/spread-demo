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
import { Avatar } from '@/components/ui/Avatar';
import {
  ChevronUpIcon,
  ChevronDownIcon,
  EyeIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

interface SearchResultsTableProps {
  results: Influencer[];
  loading?: boolean;
  selectedInfluencers?: string[];
  onViewProfile?: (influencer: Influencer) => void;
  onAddToList?: (influencer: Influencer) => void;
  onSelectInfluencer?: (influencerId: string) => void;
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
      <div className="bg-white/80 backdrop-blur-xl rounded-xl border border-white/20 shadow-xl">
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-gray-200/50 rounded-lg"></div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-100/50 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-xl border border-white/20 shadow-xl p-6 text-center">
        <p className="text-gray-500 mb-1.5 text-sm">Aucun résultat trouvé</p>
        <p className="text-xs text-gray-400">
          Essayez d&apos;ajuster vos critères de recherche
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-xl border border-white/20 shadow-xl overflow-hidden">
      <div className="p-4 border-b border-gray-200/50">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900">
            Résultats de recherche
          </h3>
          <span className="text-xs text-gray-500 bg-gray-100/50 px-2 py-1 rounded-full backdrop-blur-sm">
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
                  className="flex items-center hover:text-gray-900 transition-colors duration-200"
                >
                  Nom
                  <SortIcon field="name" />
                </button>
              </TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort('platform')}
                  className="flex items-center hover:text-gray-900 transition-colors duration-200"
                >
                  Plateforme
                  <SortIcon field="platform" />
                </button>
              </TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort('followers')}
                  className="flex items-center hover:text-gray-900 transition-colors duration-200"
                >
                  Followers
                  <SortIcon field="followers" />
                </button>
              </TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort('engagement')}
                  className="flex items-center hover:text-gray-900 transition-colors duration-200"
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
              <TableRow
                key={influencer.id}
                className="hover:bg-purple-50/30 transition-colors duration-200"
              >
                <TableCell>
                  <Avatar
                    src={influencer.avatar}
                    name={influencer.name}
                    size="default"
                  />
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium text-gray-900 flex items-center text-xs">
                      {influencer.name}
                      {influencer.verified && (
                        <span className="ml-1 text-blue-500 text-xs">✓</span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">
                      @{influencer.username}
                    </div>
                    {influencer.bio && (
                      <div className="text-xs text-gray-400 mt-0.5 max-w-xs truncate">
                        {influencer.bio}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium backdrop-blur-sm border border-white/20 shadow-sm hover:scale-105 transition-all duration-200 ${getPlatformBadge(
                      influencer.platform
                    )}`}
                  >
                    {influencer.platform}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="text-xs font-medium text-gray-900">
                    {influencer.followers.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">abonnés</div>
                </TableCell>
                <TableCell>
                  <div className="text-xs font-medium text-gray-900">
                    {influencer.engagementRate}%
                  </div>
                  <div className="text-xs text-gray-500">
                    {influencer.engagement.toLocaleString()}
                  </div>
                </TableCell>
                <TableCell>
                  {influencer.email ? (
                    <div className="text-xs text-green-600 flex items-center">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                      Oui
                    </div>
                  ) : (
                    <div className="text-xs text-gray-400 flex items-center">
                      <span className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-1.5"></span>
                      Non
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1.5">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewProfile?.(influencer)}
                      className="hover:scale-105 transition-transform duration-200 text-xs px-1.5 py-0.5 h-6"
                    >
                      <EyeIcon className="w-3 h-3 mr-0.5" />
                      Voir
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => onAddToList?.(influencer)}
                      className="hover:scale-105 transition-transform duration-200 text-xs px-1.5 py-0.5 h-6"
                    >
                      <PlusIcon className="w-3 h-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination avec design moderne */}
      {totalPages > 1 && (
        <div className="px-4 py-3 border-t border-gray-200/50 bg-gray-50/30 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">
              {startIndex + 1}-
              {Math.min(startIndex + itemsPerPage, results.length)} sur{' '}
              {results.length}
            </div>
            <div className="flex items-center space-x-1.5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="hover:scale-105 transition-transform duration-200 text-xs px-1.5 py-0.5 h-6"
              >
                ←
              </Button>
              <span className="text-xs text-gray-600 bg-white/50 px-1.5 py-0.5 rounded-full backdrop-blur-sm">
                {currentPage}/{totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="hover:scale-105 transition-transform duration-200 text-xs px-1.5 py-0.5 h-6"
              >
                →
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
