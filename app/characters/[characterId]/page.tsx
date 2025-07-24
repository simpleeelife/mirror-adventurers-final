import { client } from '@/lib/sanity.client';
import { Orb } from '@/app/components/Orb';
import { StatusBar } from '@/app/components/StatusBar';
import { InfoPanel } from '@/app/components/InfoPanel';
import Link from 'next/link';
import { groq } from 'next-sanity';
import { PortableText } from '@portabletext/react';

const query = groq`*[_type == "character" && characterId.current == $characterId][0]{
  name,
  characterId,
  class,
  "heroImageUrl": heroImage.asset->url,
  archetype,
  stats,
  skill,
  personality,
  backgroundStory,
  specialPage
}`;

// ... (ここにSanityから取得するCharacterの型定義を追加)

export default async function CharacterPage({ params }: { params: { characterId: string } }) {
  const character = await client.fetch(query, { characterId: params.characterId });

  if (!character) {
    return <div>キャラクターが見つかりません。</div>;
  }

  return (
    <main className="min-h-screen px-4 py-16 flex items-center justify-center">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12">

          {/* 左カラム: キャラクタービジュアル */}
          <div className="flex flex-col items-center justify-center space-y-8">
            <Link href="/tavern" className="text-accent-main hover:brightness-125 self-start font-dotgothic">&larr; 酒場に戻る</Link>
            <Orb size="large" image={character.heroImageUrl} />
            <div className="text-center">
              <h1 className="font-orbitron text-5xl font-bold text-accent-main tracking-widest">{character.name}</h1>
              <p className="font-dotgothic text-xl text-text-sub mt-2">{character.class}</p>
            </div>
          </div>

          {/* 右カラム: 詳細情報 */}
          <div className="space-y-8">
            <InfoPanel title="アーキタイプ">
              <h4 className="font-teko text-2xl text-white font-bold">{character.archetype.name}</h4>
              <PortableText value={character.archetype.description} />
            </InfoPanel>

            <InfoPanel title="ステータス">
              <StatusBar label="体力" value={character.stats.hp} />
              <StatusBar label="攻撃" value={character.stats.attack} />
              <StatusBar label="魔法" value={character.stats.magic} />
              <StatusBar label="防御" value={character.stats.defense} />
              <StatusBar label="速度" value={character.stats.speed} />
              <StatusBar label="戦略" value={character.stats.strategy} />
            </InfoPanel>

            <InfoPanel title="得意技">
              <h4 className="font-teko text-2xl text-white font-bold">{character.skill.name}</h4>
              <PortableText value={character.skill.description} />
            </InfoPanel>

            <InfoPanel title="性格">
              <PortableText value={character.personality} />
            </InfoPanel>

            <InfoPanel title="バックグラウンド">
              <PortableText value={character.backgroundStory} />
            </InfoPanel>
            
            {character.specialPage && (
              <div className="text-center pt-4">
                <Link href={`/characters/${params.characterId}/story`} className="inline-block px-10 py-4 bg-accent-main text-primary-bg rounded-full font-orbitron font-bold text-lg hover:scale-105 hover:shadow-lg hover:shadow-accent-main/30 transition-all duration-300">
                  もっと詳しく知る
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}