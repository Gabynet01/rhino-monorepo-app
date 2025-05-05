'use client';

import React from 'react';
import { Game } from '@rhino-portal/types';
import { useBrand } from '../../hooks/useBrand';
import Link from 'next/link';
import Image from 'next/image';

interface GameCardProps {
  game: Game;
  onGameClick?: (game: Game) => void;
  className?: string;
  featured?: boolean;
}

export const GameCard: React.FC<GameCardProps> = ({
  game,
  onGameClick,
  className = '',
  featured = false,
}) => {
  const { brandConfig } = useBrand();

  const handleGameClick = () => {
    if (onGameClick) {
      onGameClick(game);
    }
  };

  // Dynamic styling based on brand
  const cardStyle = {
    borderColor: featured ? brandConfig.primaryColor : 'transparent',
    boxShadow: featured
      ? `0 4px 6px -1px rgba(${parseInt(
          brandConfig.primaryColor.slice(1, 3),
          16
        )}, ${parseInt(brandConfig.primaryColor.slice(3, 5), 16)}, ${parseInt(
          brandConfig.primaryColor.slice(5, 7),
          16
        )}, 0.1), 0 2px 4px -1px rgba(${parseInt(
          brandConfig.primaryColor.slice(1, 3),
          16
        )}, ${parseInt(brandConfig.primaryColor.slice(3, 5), 16)}, ${parseInt(
          brandConfig.primaryColor.slice(5, 7),
          16
        )}, 0.06)`
      : undefined,
  };

  return (
    <div
      className={`game-card relative flex flex-col overflow-hidden rounded-lg bg-gray-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${className}`}
      style={cardStyle}
      onClick={handleGameClick}
    >
      {/* Game image */}
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={game.thumbnailUrl}
          alt={game.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 hover:scale-105"
          priority={featured}
        />

        {/* Featured badge */}
        {game.isFeatured && (
          <div
            className="absolute right-0 top-0 rounded-bl-md px-2 py-1 text-xs font-bold text-white"
            style={{ backgroundColor: brandConfig.primaryColor }}
          >
            Featured
          </div>
        )}

        {/* New release badge */}
        {game.isNewRelease && (
          <div
            className="absolute left-0 top-0 rounded-br-md px-2 py-1 text-xs font-bold text-white"
            style={{ backgroundColor: brandConfig.secondaryColor }}
          >
            New
          </div>
        )}
      </div>

      {/* Game info */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">{game.title}</h3>
          <div className="flex items-center">
            <svg
              className="h-4 w-4 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1 text-sm text-white">
              {game.rating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Game genres */}
        <div className="mb-2 flex flex-wrap gap-1">
          {game.genres.map((genre) => (
            <span
              key={genre}
              className="rounded-full px-2 py-1 text-xs font-medium text-white"
              style={{ backgroundColor: brandConfig.accentColor }}
            >
              {genre.charAt(0).toUpperCase() + genre.slice(1)}
            </span>
          ))}
        </div>

        {/* Game description (truncated) */}
        <p className="mb-4 line-clamp-2 flex-1 text-sm text-gray-300">
          {game.description}
        </p>

        {/* Platforms */}
        <div className="mt-auto flex items-center gap-2">
          {game.platforms.includes('pc') && (
            <span className="text-gray-400" title="PC">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M5 0a.5.5 0 0 1 .5.5V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2A2.5 2.5 0 0 1 14 4.5h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14a2.5 2.5 0 0 1-2.5 2.5v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14A2.5 2.5 0 0 1 2 11.5H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2A2.5 2.5 0 0 1 4.5 2V.5A.5.5 0 0 1 5 0zm-.5 3A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13h7a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 11.5 3h-7zM5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3z" />
              </svg>
            </span>
          )}
          {game.platforms.includes('console') && (
            <span className="text-gray-400" title="Console">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M15 7H9V1c0-.55-.45-1-1-1S7 .45 7 1v6H1c-.55 0-1 .45-1 1s.45 1 1 1h6v6c0 .55.45 1 1 1s1-.45 1-1V9h6c.55 0 1-.45 1-1s-.45-1-1-1z" />
              </svg>
            </span>
          )}
          {game.platforms.includes('browser') && (
            <span className="text-gray-400" title="Browser">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M0 4s0-2 2-2h12s2 0 2 2v8s0 2-2 2H2s-2 0-2-2V4zm1 9h14a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1z" />
                <path d="M14 14V4.5H2v9.5h12z" />
              </svg>
            </span>
          )}
          {game.platforms.includes('mobile') && (
            <span className="text-gray-400" title="Mobile">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z" />
                <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
              </svg>
            </span>
          )}
        </div>
      </div>

      {/* Play button */}
      <Link
        href={`/games/${game.id}`}
        className="mt-2 block p-2 text-center text-sm font-bold text-white no-underline"
        style={{ backgroundColor: brandConfig.primaryColor }}
      >
        Play Now
      </Link>
    </div>
  );
};

export default GameCard;
