// app/components/StatusBar.tsx

import React from 'react';

interface StatusBarProps {
  label: string;
  value: number;
  maxValue?: number;
}

export function StatusBar({ label, value, maxValue = 100 }: StatusBarProps) {
  const percentage = (value / maxValue) * 100;

  return (
    <div className="flex items-center gap-x-4 w-full">
      <span className="w-20 text-text-sub font-dotgothic text-lg">{label}</span>
      <div className="flex-1 bg-secondary-bg/50 rounded-full h-6 p-1 border border-accent-main/20">
        <div
          className="bg-gradient-to-r from-cyan-400 to-purple-500 h-full rounded-full shadow-[0_0_8px_theme(colors.cyan.400)] transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="w-12 text-right text-accent-main font-orbitron font-bold text-2xl">{value}</span>
    </div>
  );
}