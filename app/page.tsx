import { Card } from '@/app/components/Card';
import { SectionTitle } from '@/app/components/SectionTitle';
import { Orb } from '@/app/components/Orb';
import Link from 'next/link';
import { client } from '@/lib/sanity.client';
import { groq } from 'next-sanity';

// isPickupがtrueのキャラクターを取得するクエリ
const query = groq`*[_type == "character" && isPickup == true]{
  _id,
  name,
  characterId,
  class,
  "iconUrl": iconImage.asset->url
}`;

interface FeaturedCharacter {
  _id: string;
  name: string;
  characterId: { current: string };
  class: string;
  iconUrl?: string;
}

export default async function HomePage() {
  const featuredCharacters: FeaturedCharacter[] = await client.fetch(query);
  return (
    <main className="relative">
      {/* ヒーローセクション */}
      <section className="min-h-screen flex items-center justify-center px-4">
        {/* ... (このセクションに変更はありません) ... */}
        <div className="text-center space-y-8 max-w-4xl">
          <h1 className="font-orbitron text-5xl md:text-7xl font-bold bg-gradient-to-r from-accent-sub to-accent-main bg-clip-text text-transparent leading-tight">
            あなたの人生が、<br />永遠の物語になる
          </h1>
          <p className="font-teko text-2xl md:text-3xl text-text-sub">
            鏡の向こうで待つのは、もうひとりのあなた
          </p>
          <Link
            href="/tavern"
            className="inline-block px-10 py-4 bg-accent-main text-primary-bg rounded-full font-orbitron font-bold text-lg hover:scale-105 hover:shadow-lg hover:shadow-accent-main/30 transition-all duration-300"
          >
            冒険を始める
          </Link>
        </div>
      </section>

      {/* ✨ ここからストーリーセクション (旧価値提案セクション) を更新 */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <SectionTitle>デジタルネイチャー時代の新しい自己実現</SectionTitle>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <Card title="物化 - あなたと鏡の境界が溶ける瞬間">
            {/* アイコンは後ほど画像やSVGに置き換えます */}
            <span className="text-4xl block text-center mb-4"></span>
            <p className="text-center">荘子の胡蝶の夢のように...</p>
          </Card>
          <Card title="幽体 - 魂の情報化">
            <span className="text-4xl block text-center mb-4"></span>
            <p className="text-center">肉体、記憶、人格が仮想化され...</p>
          </Card>
          <Card title="事事無礙 - 全てが繋がる創作エコシステム">
            <span className="text-4xl block text-center mb-4">️</span>
            <p className="text-center">あらゆる事象が直接的に関係し合う...</p>
          </Card>
        </div>
      </section>
      {/* ✨ ストーリーセクションの更新ここまで */}

      {/* コミュニティ概要セクション */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        {/* ... (このセクションに変更はありません) ... */}
        <div className="text-center mb-12">
          <SectionTitle>鏡の中の冒険者たちでできること</SectionTitle>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card title="QJ講座で自己探求">
            内面を深く掘り下げるワークショップ<br/>(30,000円〜)
          </Card>
          <Card title="AIキャラクター生成">
            あなたの魂の分身を創造<br/>(5,000円)
          </Card>
          <Card title="NFT資産化">
            永続的なデジタル資産として保存<br/>(取引額の5%)
          </Card>
        </div>
        <div className="text-center">
          <Link
            href="/tavern"
            className="inline-block px-10 py-4 bg-accent-main text-primary-bg rounded-full font-orbitron font-bold text-lg hover:scale-105 hover:shadow-lg hover:shadow-accent-main/30 transition-all duration-300"
          >
            冒険を始める
          </Link>
        </div>
      </section>

      {/* キャラクタープレビューセクション */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        {/* ... (このセクションに変更はありません) ... */}
        <div className="text-center mb-12">
          <SectionTitle>Featured Characters</SectionTitle>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {featuredCharacters.map((char) => (
            <Link href={`/characters/${char.characterId.current}`} key={char._id} className="text-center group flex flex-col items-center">
              <Orb size="medium" image={char.iconUrl} character={!char.iconUrl ? char.name.charAt(0) : undefined} />
              <h4 className="mt-4 font-orbitron text-xl text-white group-hover:text-accent-main transition-colors">
                {char.name}
              </h4>
              <p className="text-sm text-text-sub">{char.class}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
