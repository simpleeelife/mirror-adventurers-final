import { HeroSection } from '@/app/components/HeroSection';
import { AboutSection } from '@/app/components/AboutSection';
import { StorySection } from '@/app/components/StorySection';
import { ConnectSection } from '@/app/components/ConnectSection';
import { client } from '@/lib/sanity.client';
import { groq } from 'next-sanity';
import Link from 'next/link';
import { Orb } from '@/app/components/Orb';

interface FeaturedCharacter {
  _id: string;
  name: string;
  characterId: { current: string };
  class: string;
  iconUrl?: string;
}

export default async function HomePage() {
  const featuredQuery = groq`*[_type == "character" && isPickup == true]{
    _id,
    name,
    characterId,
    class,
    "iconUrl": iconImage.asset->url
  }`;
  const featuredCharacters: FeaturedCharacter[] = await client.fetch(featuredQuery);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <StorySection />
      
      {/* Featured Charactersセクション */}
      <section id="characters" className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-12">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold bg-gradient-to-r from-accent-sub to-accent-main bg-clip-text text-transparent mb-4">
            Featured Characters
          </h2>
          <p className="font-dotgothic text-xl text-text-sub">
            鏡の中から生まれた冒険者たち
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {featuredCharacters.map((char) => (
            <Link href={`/characters/${char.characterId.current}`} key={char._id} className="text-center group flex flex-col items-center">
              <Orb size="medium" image={char.iconUrl} character={!char.iconUrl ? char.name.charAt(0) : undefined} />
              <h4 className="mt-4 font-orbitron text-xl text-white group-hover:text-accent-main transition-colors">
                {char.name}
              </h4>
              <p className="font-teko text-lg text-text-sub">{char.class}</p>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/portal" className="inline-block px-10 py-4 bg-gradient-to-r from-accent-sub to-accent-main text-primary-bg rounded-full font-orbitron font-bold text-lg hover:scale-105 hover:shadow-lg hover:shadow-accent-main/30 transition-all duration-300">
            冒険者の酒場へ行く
          </Link>
        </div>
      </section>
      
      <ConnectSection />
    </>
  );
}
