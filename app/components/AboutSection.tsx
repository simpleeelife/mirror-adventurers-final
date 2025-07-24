export function AboutSection() {
  return (
    <section id="about" className="max-w-7xl mx-auto px-4 py-24">
      <div className="text-center mb-12">
        <h2 className="font-orbitron text-4xl md:text-5xl font-bold bg-gradient-to-r from-accent-sub to-accent-main bg-clip-text text-transparent mb-4">
          About Project
        </h2>
        <p className="font-dotgothic text-xl text-text-sub">
          『Adventurers in the Mirror』とは
        </p>
      </div>
      
      <div className="backdrop-blur-md bg-primary-bg/50 border border-accent-main/20 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
        <p className="text-lg md:text-xl leading-relaxed text-text-base">
          『Adventurers in the Mirror』は、あなたの内面を深く探求し、その本質をAIによって唯一無二のキャラクター「Q-Avatar」として具現化する、新時代の自己実現プロジェクトです。私たちは、自己分析のプロセスそのものをエンターテイメント化し、「自己成長が資産価値に繋がる」という革新的な体験を提供します。あなたの記憶、価値観、夢が、デジタルの海で永遠に生き続ける物語の「原作」となるのです。
        </p>
      </div>
    </section>
  );
}