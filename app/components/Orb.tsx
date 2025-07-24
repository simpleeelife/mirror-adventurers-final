import React from 'react';

interface OrbProps {
  size?: 'small' | 'medium' | 'large';
  character?: string;
  image?: string;
  onClick?: () => void;
}

export function Orb({ size = 'medium', character, image, onClick }: OrbProps) {
  const sizeClasses = {
    small: 'w-20 h-20 text-lg',
    medium: 'w-32 h-32 text-2xl',
    large: 'w-48 h-48 text-4xl'
  };

  return (
    <div
      onClick={onClick}
      className={`${sizeClasses[size]} bg-gradient-to-br from-purple-500 via-cyan-500 to-blue-500 rounded-full flex items-center justify-center font-bold text-black shadow-lg hover:scale-105 transition-transform cursor-pointer`}
    >
      {character && <span>{character}</span>}
      {image && <img src={image} alt={character || 'orb image'} className="w-full h-full object-cover rounded-full" />}
    </div>
  );
}
