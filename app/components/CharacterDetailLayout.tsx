// app/components/CharacterDetailLayout.tsx

'use client';

import Link from 'next/link';
import { Orb } from './Orb';
import { StatusBar } from './StatusBar';
import { InfoPanel } from './InfoPanel';
import { PortableText } from '@portabletext/react';

// page.tsxから渡されるデータの型定義
interface Character {
  name: string;
  class: string;
  heroImageUrl?: string;
  archetype: { name: string; description: any };
  stats: { hp: number; attack: number; magic: number; defense: number; speed: number; strategy: number };
  skill: { name: string; description: any };
  personality: any;
  backgroundStory: any;
  evolutionPath: any;
  characterId: string;
}

interface CharacterDetailLayoutProps {
  character: Character;
  prevSlug?: string;
  nextSlug?: string;
}

export default function CharacterDetailLayout({ character, prevSlug, nextSlug }: CharacterDetailLayoutProps) {
  if (!character) return <div>キャラクターが見つかりません。</div>;

  return (
    <div className="max-w-screen-lg mx-auto w-full space-y-12">
      {/* --- トップセクション --- */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* 左: アイコン */}
        <div className="flex items-center justify-around">
          {prevSlug ? (
            <Link href={`/characters/${prevSlug}`} className="text-accent-main hover:brightness-125 text-5xl font-bold">&lsaquo;</Link>
          ) : (
            <span className="text-gray-600 text-5xl font-bold">&lsaquo;</span>
          )}
          
          <div className="drop-shadow-[0_0_15px_theme(colors.accent-main)]">
            <Orb size="large" image={character.heroImageUrl} />
          </div>

          {nextSlug ? (
            <Link href={`/characters/${nextSlug}`} className="text-accent-main hover:brightness-125 text-5xl font-bold">&rsaquo;</Link>
          ) : (
            <span className="text-gray-600 text-5xl font-bold">&rsaquo;</span>
          )}
        </div>
        {/* 右: 名前とアーキタイプ */}
        <div className="space-y-4">
          <div className="text-center md:text-left">
            <h1 className="font-orbitron text-5xl font-bold text-accent-main tracking-widest drop-shadow-[0_0_8px_theme(colors.accent-main)]">{character.name}</h1>
            <p className="font-dotgothic text-xl text-text-sub mt-2">{character.class}</p>
          </div>
          <InfoPanel title="アーキタイプ">
            <h4 className="font-teko text-2xl text-white font-bold">{character.archetype.name}</h4>
            <PortableText value={character.archetype.description} />
          </InfoPanel>
        </div>
      </div>

      {/* --- ステータス & 得意技セクション --- */}
      <div className="grid md:grid-cols-2 gap-8">
        <InfoPanel title="ステータス">
          <div className="flex flex-col gap-y-3 pt-2">
            <StatusBar label="体力" value={character.stats.hp} />
            <StatusBar label="攻撃" value={character.stats.attack} />
            <StatusBar label="魔法" value={character.stats.magic} />
            <StatusBar label="防御" value={character.stats.defense} />
            <StatusBar label="速度" value={character.stats.speed} />
            <StatusBar label="戦略" value={character.stats.strategy} />
          </div>
        </InfoPanel>
        <InfoPanel title="得意技">
          <h4 className="font-teko text-2xl text-white font-bold">{character.skill.name}</h4>
          <PortableText value={character.skill.description} />
        </InfoPanel>
      </div>

      {/* --- 性格・背景・進化への道セクション --- */}
      <InfoPanel title="性格">
        <PortableText value={character.personality} />
      </InfoPanel>
      <InfoPanel title="バックグラウンド">
        <PortableText value={character.backgroundStory} />
      </InfoPanel>
      <InfoPanel title="進化への道">
        <PortableText value={character.evolutionPath} />
      </InfoPanel>

      {/* --- 特設ページへのリンク --- */}
      <div className="text-center pt-8">
        <Link 
          href={`/characters/${character.characterId}/story`} 
          className="inline-block px-16 py-5 bg-gradient-to-r from-accent-sub to-accent-main text-primary-bg rounded-lg font-orbitron font-bold text-xl transition-all duration-300 shadow-lg shadow-accent-main/40 hover:scale-105 hover:shadow-2xl hover:shadow-accent-main/60"
        >
          キャラ特設ページはこちら→
        </Link>
      </div>
    </div>
  );
}