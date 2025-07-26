// app/characters/[characterId]/page.tsx

import { client } from '@/lib/sanity.client';
import { groq } from 'next-sanity';
import CharacterDetailLayout from '@/app/components/CharacterDetailLayout'; // 新しいコンポーネントをインポート

// 表示に必要な全データを取得するクエリ
const query = groq`*[_type == "character" && characterId.current == $characterId][0]{
  name,
  class,
  "heroImageUrl": heroImage.asset->url,
  archetype,
  stats,
  skill,
  personality,
  backgroundStory,
  evolutionPath,
  "characterId": characterId.current
}`;

// 全キャラクターのIDを名前順で取得するクエリ
const allCharacterSlugsQuery = groq`*[_type == "character"] | order(name asc) {
  "slug": characterId.current
}`;

export default async function CharacterPage({ params }: { params: { characterId: string } }) {
  // 現在のキャラクターデータと、全キャラクターのslugリストを並行して取得
  const [character, allSlugs] = await Promise.all([
    client.fetch(query, { characterId: params.characterId }),
    client.fetch(allCharacterSlugsQuery)
  ]);

  if (!character) {
    return <div>キャラクターが見つかりません。</div>;
  }

  // 現在のキャラクターがリストの何番目かを探す
  const currentIndex = allSlugs.findIndex((item: { slug: string }) => item.slug === params.characterId);
  
  // 前後のキャラクターのslugを取得（存在しない場合はnull）
  const prevSlug = currentIndex > 0 ? allSlugs[currentIndex - 1].slug : null;
  const nextSlug = currentIndex < allSlugs.length - 1 ? allSlugs[currentIndex + 1].slug : null;

  return (
    <main className="min-h-screen px-4 py-16 pt-24 flex items-center justify-center">
      <CharacterDetailLayout 
        character={character}
        prevSlug={prevSlug}
        nextSlug={nextSlug}
      />
    </main>
  );
}