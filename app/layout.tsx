import type { Metadata } from "next";
import { Orbitron, Teko, DotGothic16 } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "700", "900"],
});

const teko = Teko({
  subsets: ["latin"],
  variable: "--font-teko",
  weight: ["300", "400", "500", "600", "700"],
});

const dotGothic16 = DotGothic16({
  subsets: ["latin"],
  variable: "--font-dotgothic",
  weight: "400",
});

export const metadata: Metadata = {
  title: "鏡の中の冒険者たち",
  description: "安定バージョン",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${orbitron.variable} ${teko.variable} ${dotGothic16.variable}`}>
        <div className="star-field" />
        
        {/* ヘッダー */}
        <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between backdrop-blur-md bg-primary-bg/50 rounded-full px-8 py-3 border border-accent-main/20">
            {/* ロゴ */}
            <a href="/" className="font-orbitron font-bold text-2xl bg-gradient-to-r from-accent-sub to-accent-main bg-clip-text text-transparent">
              Adventurers in the Mirror
            </a>
            
            {/* ナビゲーション */}
            <nav className="flex items-center gap-8">
              <a href="/portal" className="text-2xl text-text-base hover:text-accent-main transition-colors">
                The Portal
              </a>
              <a href="#about" className="text-2xl text-text-base hover:text-accent-main transition-colors">
                About
              </a>
              <a href="#" className="text-2xl px-6 py-2 bg-secondary-bg rounded-full text-text-base hover:bg-accent-main hover:text-primary-bg transition-all">
                Join
              </a>
            </nav>
          </div>
        </header>

        {/* メインコンテンツ */}
        <main className="pt-24">
          {children}
        </main>

        {/* フッター */}
        <footer className="text-center py-8 text-text-sub">
          <p>© 2025 Adventurers in the Mirror. All Rights Reserved.</p>
        </footer>
      </body>
    </html>
  );
}