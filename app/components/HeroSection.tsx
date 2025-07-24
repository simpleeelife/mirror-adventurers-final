export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-4xl">
        <h1 className="font-orbitron text-6xl md:text-8xl font-bold bg-gradient-to-r from-accent-sub to-accent-main bg-clip-text text-transparent leading-tight">
          Adventurers in the Mirror
        </h1>
        <p className="font-dotgothic text-3xl md:text-4xl text-text-base">
          あなたの人生が永遠の物語になる
        </p>
        <p className="font-teko text-2xl md:text-3xl text-text-sub">
          鏡の向こうにいるもうひとりのあなた
        </p>
        <a
          href="#about"
          className="inline-block px-10 py-4 bg-gradient-to-r from-accent-sub to-accent-main text-primary-bg rounded-full font-orbitron font-bold text-lg hover:scale-105 hover:shadow-lg hover:shadow-accent-main/30 transition-all duration-300"
        >
          冒険を始める
        </a>
      </div>
    </section>
  );
}