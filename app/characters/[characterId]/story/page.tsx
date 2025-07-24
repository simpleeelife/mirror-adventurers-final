import Link from 'next/link';
import { SectionTitle } from '@/app/components/SectionTitle';
import { client } from '@/lib/sanity.client';
import { groq } from 'next-sanity';
import { PortableText } from '@portabletext/react';

const query = groq`*[_type == "character" && characterId.current == $characterId][0]{
  name,
  characterId,
  specialPage {
    catchphrase,
    story,
    creativeLinks[] {
      title,
      url,
      platform
    }
  }
}`;

interface CharacterStory {
  name: string;
  characterId: { current: string };
  specialPage?: {
    catchphrase?: string;
    story?: any[];
    creativeLinks?: Array<{
      title: string;
      url: string;
      platform: string;
    }>;
  };
}

export default async function CharacterStoryPage({ params }: { params: { characterId: string } }) {
  const character: CharacterStory = await client.fetch(query, { characterId: params.characterId });

  if (!character || !character.specialPage) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-text-sub mb-4">このキャラクターの特設ページはありません。</p>
          <Link href={`/characters/${params.characterId}`} className="text-accent-main hover:brightness-125 font-dotgothic">
            &larr; キャラクター詳細に戻る
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      {/* ヒーローセクション */}
      <section className="h-[50vh] flex flex-col justify-center items-center text-center relative px-4 bg-secondary-bg">
        {/* 背景画像は後からSanityで設定 */}
        <div className="absolute inset-0 bg-primary-bg opacity-50"></div>
        <div className="relative z-10">
          {character.specialPage.catchphrase && (
            <p className="font-teko text-2xl text-accent-main mb-2">
              "{character.specialPage.catchphrase}"
            </p>
          )}
          <h1 className="font-orbitron text-6xl font-bold text-white tracking-widest">
            {character.name}
          </h1>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-16 space-y-16">
        {/* 物語セクション */}
        {character.specialPage.story && (
          <section>
            <SectionTitle>物語</SectionTitle>
            <div className="max-h-[60vh] overflow-y-auto p-6 bg-secondary-bg/50 border border-accent-main/30 rounded-lg text-text-base leading-relaxed">
              <PortableText value={character.specialPage.story} />
            </div>
          </section>
        )}

        {/* 関連作品セクション */}
        {character.specialPage.creativeLinks && character.specialPage.creativeLinks.length > 0 && (
          <section>
            <SectionTitle>関連作品</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {character.specialPage.creativeLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-secondary-bg/50 border border-accent-main/30 rounded-lg text-accent-main hover:bg-secondary-bg transition-colors"
                >
                  {link.platform}: {link.title}
                </a>
              ))}
            </div>
          </section>
        )}

        {/* 二次創作ガイドラインセクション */}
        <section>
          <SectionTitle>二次創作ガイドライン</SectionTitle>
          <div className="p-6 bg-secondary-bg/50 border border-accent-main/30 rounded-lg text-text-base leading-relaxed">
            <p>当キャラクターの二次創作は、個人のファン活動に限り自由です。詳細はライセンス情報をご確認ください。</p>
          </div>
        </section>

        {/* 詳細ページへの戻るリンク */}
        <div className="mt-16 text-center">
          <Link href={`/characters/${params.characterId}`} className="text-accent-main hover:brightness-125 font-dotgothic text-lg">
            &larr; キャラクター詳細に戻る
          </Link>
        </div>
      </div>
    </main>
  );
}