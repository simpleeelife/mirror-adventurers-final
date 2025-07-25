// app/components/InfoPanel.tsx

import React from 'react';

interface InfoPanelProps {
  title: string;
  children: React.ReactNode;
}

export function InfoPanel({ title, children }: InfoPanelProps) {
  return (
    <div className="bg-secondary-bg/30 border border-accent-main/20 rounded-lg p-6">
      <h3 className="font-orbitron text-2xl font-bold text-accent-main mb-4 drop-shadow-[0_0_5px_theme(colors.accent-main)]">
        {title}
      </h3>
      <div className="text-text-base leading-relaxed space-y-2 font-teko text-lg">{children}</div>
    </div>
  );
}