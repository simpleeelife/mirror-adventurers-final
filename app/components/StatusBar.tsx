import React from 'react';

interface StatusBarProps {
  label: string;
  value: number;
  maxValue?: number;
  color?: 'cyan' | 'purple' | 'green';
}

export function StatusBar({ label, value, maxValue = 100, color = 'cyan' }: StatusBarProps) {
  const percentage = (value / maxValue) * 100;
  const colorClasses = {
    cyan: 'from-cyan-500 to-blue-500',
    purple: 'from-purple-500 to-pink-500',
    green: 'from-green-500 to-emerald-500'
  };

  return (
    <div className="flex items-center gap-4 mb-3">
      <span className="w-16 text-sm text-slate-400">{label}</span>
      <div className="flex-1 bg-slate-700 rounded-full h-2 overflow-hidden">
        <div
          className={`bg-gradient-to-r ${colorClasses[color]} h-full rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="w-8 text-sm text-cyan-500 font-semibold">{value}</span>
    </div>
  );
}
