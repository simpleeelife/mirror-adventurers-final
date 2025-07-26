export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-4xl">
        <h1 className="font-orbitron text-4xl sm:text-5xl md:text-7xl font-bold leading-tight 
                   bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent 
                   drop-shadow-[0_0_15px_rgba(72,187,255,0.5)]">
          あなたの人生が<br />永遠の物語になる
        </h1>

        <div className="font-orbitron text-3xl md:text-4xl font-bold text-center">
          <span className="bg-gradient-to-r from-accent-sub to-accent-main bg-clip-text text-transparent">
            Adventurers in the
          </span>
          <br className="md:hidden" />
          <span className="text-4xl md:text-5xl inline-block md:ml-2 bg-gradient-to-r from-slate-300 to-white bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">
            Mirror
          </span>
        </div>

        <p className="font-dotgothic text-xl text-text-sub">
          鏡の向こうにいるもうひとりのあなた
        </p>

        <a href="/portal" className="inline-block px-10 py-4 bg-gradient-to-r from-accent-sub to-accent-main text-primary-bg rounded-full font-orbitron font-bold text-lg hover:scale-105 hover:shadow-lg hover:shadow-accent-main/30 transition-all duration-300">
          冒険を始める
        </a>
      </div>
    </section>
  );
}