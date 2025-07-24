import React from 'react';

// Cardコンポーネントが受け取るデータ（プロパティ）の型を定義
interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function Card({ title, children, className }: CardProps) {
  return (
    <div
      className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-colors duration-300 ${className}`}
    >
      <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
      <div className="text-slate-400">{children}</div>
    </div>
  );
}
