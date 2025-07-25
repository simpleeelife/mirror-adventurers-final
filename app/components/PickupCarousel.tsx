// app/components/PickupCarousel.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';

// PortalPageから渡されるキャラクターの型定義
interface Character {
  _id: string;
  name: string;
  class: string;
  archetype: { name: string };
  characterId: { current: string };
  heroUrl?: string;
}

interface PickupCarouselProps {
  characters: Character[];
}

export default function PickupCarousel({ characters }: PickupCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!characters || characters.length === 0) {
    return null; // 表示するキャラクターがいない場合は何も表示しない
  }

  const handlePrev = () => {
    // 1つ前のキャラクターへ（最初の場合は最後のキャラクターへループ）
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? characters.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    // 1つ次のキャラクターへ（最後の場合は最初のキャラクターへループ）
    setCurrentIndex((prevIndex) =>
      prevIndex === characters.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentCharacter = characters[currentIndex];

  return (
    <section className="mb-16">
      <h2 className="font-orbitron text-3xl text-accent-main mb-4">Pickup Characters</h2>
      <div className="relative p-6 bg-secondary-bg/30 border border-accent-main/20 rounded-lg flex items-center justify-center min-h-[250px]">
        
        <button onClick={handlePrev} className="absolute left-4 text-4xl text-accent-main z-10">&lsaquo;</button>
        
        <Link href={`/characters/${currentCharacter.characterId.current}`} className="text-center">
          <img 
            src={currentCharacter.heroUrl || 'https://placehold.co/150x150/0a0a0f/00ffff'} 
            alt={currentCharacter.name} 
            className="rounded-full mx-auto mb-4 border-2 border-accent-main w-[150px] h-[150px] object-cover"
          />
          <h3 className="font-orbitron text-2xl">{currentCharacter.name}</h3>
          <p className="font-teko text-lg">{currentCharacter.class} / {currentCharacter.archetype?.name}</p>
        </Link>
        
        <button onClick={handleNext} className="absolute right-4 text-4xl text-accent-main z-10">&rsaquo;</button>
      </div>
    </section>
  );
}