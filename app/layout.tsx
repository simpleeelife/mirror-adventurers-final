import type { Metadata } from "next";
import "./globals.css";

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
      {/* classNameを一旦削除して、エラーを解消します */}
      <body>
        <div className="star-field" />
        {children}
      </body>
    </html>
  );
}