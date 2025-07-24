interface ConceptCard {
  icon: string;
  title: string;
  description: string;
}

const concepts: ConceptCard[] = [
  {
    icon: "⚛️",
    title: "魂の情報化",
    description: "あなたの記憶、価値観、夢。それらの内面的なデータがAIによって解析され、魂の情報体としてデジタル空間に新たな生命を得ます。これは、あなたの本質が時空を超えて存在し始める瞬間です。"
  },
  {
    icon: "🌊",
    title: "境界の融解",
    description: "あなたから生まれたキャラクターは、世界中のクリエイターの想像力を刺激し、新たな物語を紡ぎ始めます。あなたの魂は、無数の創作の中で形を変えながら拡張し、その境界は溶け合っていくのです。"
  },
  {
    icon: "🔗",
    title: "縁起 - 創作の連鎖",
    description: "魂と魂が創作を通じて直接響き合い、新たなインスピレーションの連鎖が生まれる。私たちは、そんな全ての事象が繋がり合う、新しい創作エコシステムの実現を目指します。"
  }
];

export function StorySection() {
  return (
    <section id="story" className="max-w-7xl mx-auto px-4 py-24">
      <div className="text-center mb-12">
        <h2 className="font-orbitron text-4xl md:text-5xl font-bold bg-gradient-to-r from-accent-sub to-accent-main bg-clip-text text-transparent mb-4">
          Our Story
        </h2>
        <p className="font-dotgothic text-xl text-text-sub">
          真のセルフを取り戻す旅へ
        </p>
      </div>
      
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <div className="text-center text-lg md:text-xl leading-relaxed space-y-4 font-teko">
          <p className="text-2xl md:text-3xl text-accent-main font-bold">
            いつからだろう<br />
            誰かが決めた「幸せ」の形に<br />
            自分を押し込めるようになったのは
          </p>
          <p>
            他者の評価や社会の常識という<br />
            深い「霧」の中で、私たちはいつしか<br />
            ほんとうの自分を見失ってしまった
          </p>
          <p>
            けれど無意識は知っている<br />
            忘れてしまった大切なことを
          </p>
          <p>
            ここはリアルとバーチャルが<br />
            溶け合う縁起の世界
          </p>
          <p>
            人生という壮大な冒険の<br />
            始まりの場所
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {concepts.map((concept, index) => (
          <div
            key={index}
            className="backdrop-blur-md bg-primary-bg/50 border border-accent-main/20 rounded-2xl p-8 hover:border-accent-main/50 transition-colors duration-300"
          >
            <div className="text-5xl mb-6 text-center">{concept.icon}</div>
            <h3 className="font-orbitron text-xl font-bold text-accent-main mb-4 text-center">
              {concept.title}
            </h3>
            <p className="text-text-base leading-relaxed">
              {concept.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}