import { client } from '@/lib/sanity.client';
import { groq } from 'next-sanity';
import Link from 'next/link';
import PickupCarousel from '@/app/components/PickupCarousel';

// Sanityから取得するキャラクターの型定義
interface Character {
  _id: string;
  name: string;
  class: string;
  archetype: { name: string };
  characterId: { current: string };
  iconUrl?: string;
  heroUrl?: string;
}

const pickupQuery = groq`*[_type == "character"] | order(_createdAt desc) [0...5] {
  _id,
  name,
  class,
  archetype,
  characterId,
  "heroUrl": heroImage.asset->url
}`;

const allCharactersQuery = groq`*[_type == "character"] | order(_createdAt asc) {
  _id,
  name,
  class,
  archetype,
  characterId,
  "iconUrl": iconImage.asset->url
}`;

export default async function PortalPage() {
  const [pickupCharacters, allCharacters]: [Character[], Character[]] = await Promise.all([
    client.fetch(pickupQuery),
    client.fetch(allCharactersQuery)
  ]);


  return (
    <main className="min-h-screen px-4 py-16">
      <div className="max-w-screen-lg mx-auto">
        {/* ページタイトル */}
        <div className="text-center mb-8">
          <h1 className="font-orbitron text-5xl font-bold bg-gradient-to-r from-accent-sub to-accent-main bg-clip-text text-transparent">
            The Portal
          </h1>
        </div>

        {/* 検索ボックス */}
        <div className="mb-12 max-w-lg mx-auto">
          <input
            type="text"
            placeholder="名前で検索..."
            className="w-full px-4 py-3 bg-secondary-bg/50 border border-accent-main/30 rounded-lg text-white placeholder-text-sub focus:border-accent-main focus:outline-none focus:ring-2 focus:ring-accent-main/50 font-teko text-lg"
          />
        </div>

        {/* ピックアップセクション */}
        <PickupCarousel characters={pickupCharacters} />

        {/* グリッド表示セクション */}
        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {allCharacters.map((char) => (
              <Link href={`/characters/${char.characterId.current}`} key={char._id} className="p-4 bg-secondary-bg/50 border border-accent-main/20 rounded-lg text-center hover:bg-secondary-bg/80 transition-colors">
                <img 
                  src={char.iconUrl || 'https://placehold.co/100x100/0a0a0f/ffffff'} 
                  alt={char.name} 
                  className="rounded-full mx-auto mb-3 w-[100px] h-[100px] object-cover"
                />
                <h4 className="font-orbitron text-lg truncate">{char.name}</h4>
                <p className="font-teko text-base text-text-sub">{char.class}</p>
                <p className="font-teko text-base text-text-sub">{char.archetype?.name}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}