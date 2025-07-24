interface Character {
  name: string;
  title: string;
  imageUrl: string;
}

const characters: Character[] = [
  { name: "Luna", title: "夢を紡ぐ者", imageUrl: "https://placehold.co/600x800" },
  { name: "Atlas", title: "記憶の守護者", imageUrl: "https://placehold.co/600x800" },
  { name: "Nova", title: "光の探求者", imageUrl: "https://placehold.co/600x800" },
  { name: "Echo", title: "響きの創造者", imageUrl: "https://placehold.co/600x800" },
  { name: "Prism", title: "感情の結晶", imageUrl: "https://placehold.co/600x800" },
];

export function FeaturedCharactersSection() {
  return (
    <section id="characters" className="max-w-7xl mx-auto px-4 py-24">
      <div className="text-center mb-12">
        <h2 className="font-orbitron text-4xl md:text-5xl font-bold bg-gradient-to-r from-accent-sub to-accent-main bg-clip-text text-transparent mb-4">
          Featured Characters
        </h2>
        <p className="font-dotgothic text-xl text-text-sub">
          鏡の中から生まれた冒険者たち
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {characters.map((character, index) => (
          <div
            key={index}
            className="relative group cursor-pointer overflow-hidden rounded-xl aspect-[3/4]"
          >
            <img
              src={character.imageUrl}
              alt={character.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-bg/90 via-primary-bg/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
              <h3 className="font-orbitron text-xl font-bold text-white mb-1">
                {character.name}
              </h3>
              <p className="text-sm text-text-sub">{character.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}