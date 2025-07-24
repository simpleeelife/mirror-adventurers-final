import React from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
}

export function SectionTitle({ children }: SectionTitleProps) {
  return (
    <h3 className="font-orbitron text-2xl font-bold text-accent-main mb-4">
      {children}
    </h3>
  );
}
