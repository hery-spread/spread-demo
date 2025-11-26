'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  HashtagIcon,
  AtSymbolIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
  PlusIcon,
  BellAlertIcon,
  ClockIcon,
  LinkIcon,
} from '@heroicons/react/24/outline';
import { ApifyImportConfig, ApifyScrapedPost } from '@/types';
import { mockApifyScrape } from '@/lib/mockData';
import ScrapedPostsGrid from './ScrapedPostsGrid';

// Parser une URL de profil pour extraire username et plateforme
interface ParsedProfile {
  url: string;
  username: string;
  platform: 'instagram' | 'tiktok' | 'youtube';
}

function parseProfileUrl(url: string): ParsedProfile | null {
  const trimmed = url.trim();

  // Instagram
  const instaMatch = trimmed.match(
    /(?:https?:\/\/)?(?:www\.)?instagram\.com\/([^\/\?]+)/i
  );
  if (instaMatch) {
    return { url: trimmed, username: instaMatch[1], platform: 'instagram' };
  }

  // TikTok
  const tiktokMatch = trimmed.match(
    /(?:https?:\/\/)?(?:www\.)?tiktok\.com\/@([^\/\?]+)/i
  );
  if (tiktokMatch) {
    return { url: trimmed, username: tiktokMatch[1], platform: 'tiktok' };
  }

  // YouTube
  const youtubeMatch = trimmed.match(
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:@|channel\/|c\/)?([^\/\?]+)/i
  );
  if (youtubeMatch) {
    return { url: trimmed, username: youtubeMatch[1], platform: 'youtube' };
  }

  return null;
}

// Couleurs par plateforme
const platformColors = {
  instagram: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
  tiktok: 'bg-black text-white',
  youtube: 'bg-red-600 text-white',
};

interface ApifyImportSectionProps {
  onImport: (posts: ApifyScrapedPost[]) => void;
}

export default function ApifyImportSection({
  onImport,
}: ApifyImportSectionProps) {
  // État du formulaire
  const [profiles, setProfiles] = useState<ParsedProfile[]>([]);
  const [urlInput, setUrlInput] = useState('');
  const [filterType, setFilterType] = useState<'hashtag' | 'mention'>(
    'hashtag'
  );
  const [filterValue, setFilterValue] = useState('');

  // État du scraping
  const [isScanning, setIsScanning] = useState(false);
  const [scrapedPosts, setScrapedPosts] = useState<ApifyScrapedPost[]>([]);
  const [selectedPostIds, setSelectedPostIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [hasScanned, setHasScanned] = useState(false);
  const [monitorFuturePosts, setMonitorFuturePosts] = useState(false);
  const [noResultsFound, setNoResultsFound] = useState(false);

  // Ajouter un profil via URL
  const addProfile = () => {
    const parsed = parseProfileUrl(urlInput);
    if (
      parsed &&
      !profiles.some(
        (p) => p.username === parsed.username && p.platform === parsed.platform
      )
    ) {
      setProfiles([...profiles, parsed]);
      setUrlInput('');
      setError(null);
    } else if (!parsed && urlInput.trim()) {
      setError(
        'URL non reconnue. Utilisez une URL Instagram, TikTok ou YouTube.'
      );
    }
  };

  // Supprimer un profil
  const removeProfile = (username: string, platform: string) => {
    setProfiles(
      profiles.filter(
        (p) => !(p.username === username && p.platform === platform)
      )
    );
  };

  // Gérer l'entrée clavier pour ajouter un profil
  const handleUrlKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addProfile();
    }
  };

  // Lancer le scan
  const handleScan = async () => {
    if (profiles.length === 0) {
      setError('Veuillez ajouter au moins un profil de créateur');
      return;
    }
    if (!filterValue.trim()) {
      setError(
        `Veuillez saisir un ${filterType === 'hashtag' ? 'hashtag' : 'compte à mentionner'}`
      );
      return;
    }

    setError(null);
    setIsScanning(true);
    setSelectedPostIds([]);
    setNoResultsFound(false);

    try {
      const config: ApifyImportConfig = {
        usernames: profiles.map((p) => p.username),
        filterType,
        filterValue: filterValue.trim(),
        platform: profiles[0]?.platform || 'instagram',
      };

      const posts = await mockApifyScrape(config);
      setScrapedPosts(posts);
      setHasScanned(true);

      if (posts.length === 0) {
        setNoResultsFound(true);
      }
    } catch (err) {
      setError('Erreur lors du scan. Veuillez réessayer.');
      console.error('Scan error:', err);
    } finally {
      setIsScanning(false);
    }
  };

  // Importer les posts sélectionnés
  const handleImport = () => {
    const selectedPosts = scrapedPosts.filter((post) =>
      selectedPostIds.includes(post.id)
    );
    onImport(selectedPosts);

    // Reset après import
    setScrapedPosts([]);
    setSelectedPostIds([]);
    setHasScanned(false);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h3 className="text-sm font-medium text-gray-700">
          Import automatique
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          Scannez les contenus des créateurs via hashtag ou mention
        </p>
      </div>

      {/* Formulaire de config */}
      <div className="bg-gray-50 rounded-xl p-4 space-y-4">
        {/* Profils à scanner */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profils à scanner
          </label>

          {/* Liste des profils ajoutés */}
          {profiles.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {profiles.map((profile, index) => (
                <span
                  key={`${profile.platform}-${profile.username}`}
                  className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-full animate-in fade-in slide-in-from-left-2 duration-200 ${platformColors[profile.platform]}`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="opacity-75 mr-1 capitalize text-xs">
                    {profile.platform}
                  </span>
                  @{profile.username}
                  <button
                    type="button"
                    onClick={() =>
                      removeProfile(profile.username, profile.platform)
                    }
                    className="ml-2 opacity-75 hover:opacity-100 rounded-full p-0.5 transition-opacity"
                  >
                    <XMarkIcon className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Input pour ajouter un profil */}
          <div className="flex items-stretch gap-2">
            <div className="relative flex-1">
              <Input
                placeholder="https://instagram.com/username"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={handleUrlKeyDown}
                className="pl-8"
              />
              <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={addProfile}
              disabled={!urlInput.trim()}
              className="flex items-center space-x-1.5 px-4 whitespace-nowrap"
            >
              <PlusIcon className="w-4 h-4" />
              <span>Ajouter</span>
            </Button>
          </div>

          {/* Message d'aide */}
          <p className="text-xs text-gray-500 mt-2">
            {profiles.length === 0
              ? "Collez l'URL du profil Instagram, TikTok ou YouTube du créateur"
              : `${profiles.length} profil${profiles.length > 1 ? 's' : ''} ajouté${profiles.length > 1 ? 's' : ''} — La plateforme est détectée automatiquement`}
          </p>
        </div>

        {/* Filtre type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filtrer par
          </label>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => setFilterType('mention')}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg border-2 transition-all ${
                filterType === 'mention'
                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
              }`}
            >
              <AtSymbolIcon className="w-4 h-4" />
              <span className="font-medium">Mention</span>
            </button>
            <button
              type="button"
              onClick={() => setFilterType('hashtag')}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg border-2 transition-all ${
                filterType === 'hashtag'
                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
              }`}
            >
              <HashtagIcon className="w-4 h-4" />
              <span className="font-medium">Hashtag</span>
            </button>
          </div>
        </div>

        {/* Valeur du filtre */}
        <div className="relative">
          <Input
            label={
              filterType === 'hashtag'
                ? 'Hashtag à rechercher'
                : 'Compte mentionné'
            }
            placeholder={
              filterType === 'hashtag' ? 'campagneSamsung' : 'decathlon'
            }
            value={filterValue}
            onChange={(e) =>
              setFilterValue(e.target.value.replace(/[@#]/g, ''))
            }
          />
          <div className="absolute right-3 top-9 text-gray-400">
            {filterType === 'hashtag' ? (
              <HashtagIcon className="w-4 h-4" />
            ) : (
              <AtSymbolIcon className="w-4 h-4" />
            )}
          </div>
        </div>

        {/* Bouton scan */}
        <Button
          type="button"
          onClick={handleScan}
          disabled={isScanning || profiles.length === 0 || !filterValue.trim()}
          className="w-full flex items-center justify-center space-x-2"
        >
          {isScanning ? (
            <>
              <ArrowPathIcon className="w-4 h-4 animate-spin" />
              <span>Scan en cours...</span>
            </>
          ) : (
            <>
              <MagnifyingGlassIcon className="w-4 h-4" />
              <span>Scanner les contenus</span>
            </>
          )}
        </Button>

        {/* Message d'erreur */}
        {error && (
          <div className="flex items-start space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <ExclamationTriangleIcon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Aucun résultat trouvé - Option monitoring */}
        {noResultsFound && !error && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-3">
            <div className="flex items-start space-x-3">
              <ClockIcon className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-800">
                  Aucun contenu trouvé pour le moment
                </p>
                <p className="text-xs text-amber-700 mt-1">
                  Les créateurs n&apos;ont pas encore publié avec{' '}
                  <strong>
                    {filterType === 'hashtag' ? '#' : '@'}
                    {filterValue}
                  </strong>
                </p>
              </div>
            </div>

            {/* Option monitoring */}
            <div
              onClick={() => setMonitorFuturePosts(!monitorFuturePosts)}
              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all ${
                monitorFuturePosts
                  ? 'bg-purple-100 border-2 border-purple-400'
                  : 'bg-white border-2 border-gray-200 hover:border-purple-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                  monitorFuturePosts
                    ? 'bg-purple-600 border-purple-600'
                    : 'border-gray-300'
                }`}
              >
                {monitorFuturePosts && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <BellAlertIcon className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-gray-900">
                    Détecter les futurs posts
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-0.5">
                  Nous surveillerons ces créateurs et vous notifierons dès
                  qu&apos;un nouveau contenu correspondant sera détecté
                </p>
              </div>
            </div>

            {monitorFuturePosts && (
              <div className="flex items-center space-x-2 text-xs text-purple-700 bg-purple-50 rounded-lg px-3 py-2">
                <BellAlertIcon className="w-4 h-4" />
                <span>
                  Monitoring activé ! Vous recevrez une notification pour chaque
                  nouveau post détecté.
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Résultats du scan */}
      {hasScanned && scrapedPosts.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-700">
                Contenus trouvés ({scrapedPosts.length})
              </h4>
              <p className="text-xs text-gray-500">
                Sélectionnez les contenus à importer
              </p>
            </div>
            {selectedPostIds.length > 0 && (
              <Button
                type="button"
                onClick={handleImport}
                className="flex items-center space-x-2"
              >
                <span>Importer ({selectedPostIds.length})</span>
              </Button>
            )}
          </div>

          <ScrapedPostsGrid
            posts={scrapedPosts}
            selectedIds={selectedPostIds}
            onSelectionChange={setSelectedPostIds}
          />
        </div>
      )}

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-xs text-blue-700">
          <strong>💡 Comment ça marche :</strong> Collez les URLs des profils
          des créateurs (Instagram, TikTok, YouTube), puis filtrez par hashtag
          (#votreHashtag) ou mention (@votreMarque). La plateforme est détectée
          automatiquement.
        </p>
      </div>
    </div>
  );
}
