import { client } from '@/lib/sanity.client';
import { Orb } from '@/app/components/Orb';
import { SectionTitle } from '@/app/components/SectionTitle';
import Link from 'next/link';
import { groq } from 'next-sanity';

// GROQクエリを定義
const query = groq`*[_type == "character"]{
  _id,
  name,
  characterId,
  "iconUrl": iconImage.asset->url
}`;

interface Character {
  _id: string;
  name: string;
  characterId: { current: string };
  iconUrl?: string;
}

export default async function TavernPage() {
  const characters: Character[] = await client.fetch(query);

  return (
    <main className="min-h-screen px-4 py-16">
      <div className="max-w-7xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-16">
          <Link href="/">
            <h1 className="font-orbitron text-4xl font-bold bg-gradient-to-r from-accent-sub to-accent-main bg-clip-text text-transparent cursor-pointer">
              冒険者の酒場
            </h1>
          </Link>
        </div>
        
        <div className="text-center mb-12">
            <SectionTitle>Characters</SectionTitle>
        </div>

        {/* キャラクター一覧 */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {characters.map((char) => (
            <Link href={`/characters/${char.characterId.current}`} key={char._id} className="text-center group flex flex-col items-center">
              <Orb size="medium" image={char.iconUrl} character={!char.iconUrl ? char.name.charAt(0) : undefined} />
              <h4 className="mt-4 font-orbitron text-xl text-white group-hover:text-accent-main transition-colors">
                {char.name}
              </h4>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}