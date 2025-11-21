import type { Metadata } from "next";
import { Orbitron, Teko, DotGothic16 } from "next/font/google";
import { FluidBackground } from "@/app/components/FluidBackground";
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
  metadataBase: new URL("https://mirror-adventurers.com"),
  title: "鏡の中の冒険者たち",
  description: "リアルとバーチャルが溶け合う縁起の世界。あなたの魂が新たな冒険を始める場所。",
  openGraph: {
    title: "鏡の中の冒険者たち",
    description: "リアルとバーチャルが溶け合う縁起の世界。あなたの魂が新たな冒険を始める場所。",
    url: "https://mirror-adventurers.com",
    siteName: "鏡の中の冒険者たち",
    images: [
      {
        url: "/image/OGP.png",
        width: 1200,
        height: 630,
        alt: "鏡の中の冒険者たち",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "鏡の中の冒険者たち",
    description: "リアルとバーチャルが溶け合う縁起の世界。あなたの魂が新たな冒険を始める場所。",
    images: ["/image/OGP.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${orbitron.variable} ${teko.variable} ${dotGothic16.variable} bg-primary-bg text-text-base`}>
        <FluidBackground />
        <div className="fluid-overlay" aria-hidden="true" />
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