import React from 'react';
import { SectionTitle } from './SectionTitle';

interface InfoPanelProps {
  title: string;
  children: React.ReactNode;
}

export function InfoPanel({ title, children }: InfoPanelProps) {
  return (
    <div className="bg-secondary-bg/50 border border-accent-main/30 rounded-lg p-6">
      <SectionTitle>{title}</SectionTitle>
      <div className="text-text-base leading-relaxed space-y-2">
        {children}
      </div>
    </div>
  );
}
