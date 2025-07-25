export function ConnectSection() {
  return (
    <section id="connect" className="max-w-4xl mx-auto px-4 py-24">
      <div className="backdrop-blur-md bg-primary-bg/50 border border-accent-main/20 rounded-2xl p-8 md:p-12">
        <div className="text-center mb-8">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold bg-gradient-to-r from-accent-sub to-accent-main bg-clip-text text-transparent mb-4">
            Let&apos;s Connect
          </h2>
          <p className="font-dotgothic text-xl text-text-sub">
            無料メール講座で、あなたの旅を始めよう
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href="#"
            className="inline-block px-10 py-4 bg-gradient-to-r from-accent-sub to-accent-main text-primary-bg rounded-full font-orbitron font-bold text-lg hover:scale-105 hover:shadow-lg hover:shadow-accent-main/30 transition-all duration-300"
          >
            無料で登録
          </a>
        </div>
      </div>
    </section>
  );
}