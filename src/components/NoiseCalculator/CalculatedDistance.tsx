import React from 'react';

interface CalculatedDistanceProps {
  distance: string;
}

export const CalculatedDistance = ({ distance }: CalculatedDistanceProps) => (
  <div className="bg-[hsl(var(--card))] p-4 rounded-lg">
    <div className="text-sm">
      Calculated Distance: <span className="font-semibold">{distance}m</span>
    </div>
  </div>
);