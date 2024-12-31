import React from 'react';
import { VolumeIcon, StatusIcon, LimitIcon } from './icons';

interface ResultsDisplayProps {
  results: {
    noiseLevel: string;
    status: string;
    calculatedDistance: string;
  };
}

export const ResultsDisplay = ({ results }: ResultsDisplayProps) => {
  const isCompliant = results.status === 'Compliant';

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-[hsl(var(--card))] p-6 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <VolumeIcon /> Noise Level
          </div>
          <div className="text-2xl font-bold">{results.noiseLevel} dB(A)</div>
        </div>

        <div className="bg-[hsl(var(--card))] p-6 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <StatusIcon /> Status
          </div>
          <div className={`text-2xl font-bold ${isCompliant ? 'text-green-400' : 'text-red-400'}`}>
            {results.status}
          </div>
        </div>

        <div className="bg-[hsl(var(--card))] p-6 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <LimitIcon /> Limit
          </div>
          <div className="text-2xl font-bold">42.00 dB(A)</div>
        </div>
      </div>

      {!isCompliant && (
        <div className="bg-[hsl(var(--card))] p-6 rounded-lg border border-red-400/20">
          <div className="flex items-start gap-3">
            <div className="text-red-400">⚠</div>
            <div>
              <h3 className="text-red-400 font-semibold mb-1">Exceeds Noise Limit</h3>
              <p className="text-sm opacity-90">
                This configuration exceeds the permitted development noise limit of 42 dB(A).
                Consider adjusting the installation parameters.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};