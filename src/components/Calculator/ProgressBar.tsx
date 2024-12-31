import React from 'react';

interface ProgressBarProps {
  value: number;
  maxValue: number;
  isCompliant: boolean;
}

export const ProgressBar = ({ value, maxValue, isCompliant }: ProgressBarProps) => {
  const percentage = (value / maxValue) * 100;
  
  return (
    <div className="mt-6 space-y-2">
      <div className="h-14 bg-[#1a1528] rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${
            isCompliant ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' : 'bg-gradient-to-r from-red-400 to-red-500'
          }`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      <div className="flex justify-between text-sm text-white/60">
        <span>0 dB(A)</span>
        <span>Limit: {maxValue} dB(A)</span>
      </div>
    </div>
  );
};