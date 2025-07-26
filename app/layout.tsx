import type { Metadata } from "next";
import { Orbitron, Teko, DotGothic16 } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";

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
        <Header />
        {children}

        {/* フッター */}
        <footer className="text-center py-8 text-text-sub">
          <p>© 2025 Adventurers in the Mirror. All Rights Reserved.</p>
        </footer>
      </body>
    </html>
  );
}