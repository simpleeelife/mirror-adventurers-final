import { client } from '@/lib/sanity.client';
import { groq } from 'next-sanity';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';

// 特設ページに必要なデータを取得するクエリ（更新版）
const query = groq`*[_type == "character" && characterId.current == $characterId][0]{
  "specialPage": specialPage {
    "heroImageUrl": storyPageHeroImage.asset->url,
    catchphrase,
    heroSubtitle, // 新しいフィールドを追加
    pastStory,
    creativeLinks,
    assetGallery[] {
      "url": asset->url,
      caption,
      _key
    },
    futureMemory
  }
}`;

export default async function CharacterStoryPage({ params }: { params: { characterId: string } }) {
  const character = await client.fetch(query, { characterId: params.characterId });

  if (!character || !character.specialPage) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl">特設ページの情報が見つかりません。</h1>
        <Link href="/portal" className="mt-8 text-accent-main hover:underline">
          The Portalへ戻る
        </Link>
      </div>
    );
  }

  const { specialPage } = character;

  return (
    <div className="bg-primary-bg text-text-base">
      {/* --- Section 1: The Mirror --- */}
      <section className="h-screen flex flex-col items-center justify-center relative text-center bg-cover bg-center" style={{backgroundImage: `url(${specialPage.heroImageUrl || 'https://placehold.co/1920x1080/0a0a0f/1a1a2e'})`}}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10">
          <h1 className="font-orbitron text-5xl md:text-7xl font-bold text-white drop-shadow-[0_0_15px_rgba(72,187,255,0.7)] whitespace-pre-wrap">
            {specialPage.catchphrase}
          </h1>
          {specialPage.heroSubtitle && (
            <p className="font-teko text-3xl mt-4 whitespace-pre-wrap">
              {specialPage.heroSubtitle}
            </p>
          )}
        </div>
        <div className="absolute bottom-10 animate-bounce text-white text-3xl">
          <span className="block">↓</span>
        </div>
      </section>

      {/* --- Section 2: The Origin (過去の物語) --- */}
      <section className="py-20 md:py-32 px-4 max-w-3xl mx-auto text-center">
        <h2 className="font-orbitron text-4xl font-bold bg-gradient-to-r from-accent-sub to-accent-main bg-clip-text text-transparent mb-4">The Origin</h2>
        {specialPage.pastStory?.subtitle && (
          <h3 className="font-teko text-3xl md:text-4xl text-text-base mb-8">{specialPage.pastStory.subtitle}</h3>
        )}
        <div className="prose prose-invert prose-xl font-teko text-left mx-auto">
          <PortableText value={specialPage.pastStory?.content} />
        </div>
      </section>

      {/* --- Section 3: The Echo (創作物ポートフォリオ) --- */}
      {specialPage.creativeLinks && specialPage.creativeLinks.length > 0 && (
        <section className="py-20 md:py-32 px-4 bg-secondary-bg/30">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="font-orbitron text-4xl font-bold bg-gradient-to-r from-accent-sub to-accent-main bg-clip-text text-transparent mb-12">The Echo</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {specialPage.creativeLinks.map((item: any) => (
                <a key={item._key} href={item.url} target="_blank" rel="noopener noreferrer" className="block p-8 bg-secondary-bg/50 border border-accent-main/20 rounded-lg text-accent-main hover:bg-secondary-bg transition-colors font-orbitron text-2xl">
                  {item.title}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* --- Section 4: The Fragment (二次創作アセット) --- */}
      {specialPage.assetGallery && specialPage.assetGallery.length > 0 && (
        <section className="py-20 md:py-32 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="font-orbitron text-4xl font-bold bg-gradient-to-r from-accent-sub to-accent-main bg-clip-text text-transparent mb-12">The Fragment</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {specialPage.assetGallery.map((asset: any) => (
                <div key={asset._key}>
                  <img src={asset.url} alt={asset.caption || 'Asset'} className="w-full rounded-lg border-2 border-accent-main/30" />
                  <p className="text-center mt-2 font-teko text-lg">{asset.caption}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
{/* --- Section 5: The Horizon (未来の記憶) --- */}
<section className="min-h-screen px-4 flex flex-col text-center">
  
  {/* 上のコンテンツを中央に寄せるためのコンテナ */}
  <div className="flex-grow flex flex-col justify-center">
    <div className="max-w-3xl mx-auto">
      <h2 className="font-orbitron text-4xl font-bold bg-gradient-to-r from-accent-sub to-accent-main bg-clip-text text-transparent mb-4">The Horizon</h2>
      {specialPage.futureMemory?.subtitle && (
        <h3 className="font-teko text-3xl md:text-4xl text-text-base mb-8">{specialPage.futureMemory.subtitle}</h3>
      )}
      <div className="prose prose-invert prose-xl font-teko text-left mx-auto">
        <PortableText value={specialPage.futureMemory?.content} />
      </div>
    </div>
  </div>
  
  {/* ボタンをセクション下部に配置するためのコンテナ */}
  <div className="py-20">
    <Link href="/portal" className="inline-block px-10 py-4 bg-gradient-to-r from-accent-sub to-accent-main text-primary-bg rounded-lg font-orbitron font-bold text-lg hover:scale-105 transition-transform duration-300">
       The Portalへ帰還する
    </Link>
  </div>

</section>
    </div>
  );
}