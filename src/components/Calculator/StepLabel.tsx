import React from 'react';
import { Fan, MapPin, Ruler, Shield } from 'lucide-react';

interface StepLabelProps {
  step: 1 | 2 | 3 | 4;
  label: string;
}

export const StepLabel = ({ step, label }: StepLabelProps) => {
  const icons = {
    1: <Fan className="w-5 h-5 text-pink-400" />,
    2: <MapPin className="w-5 h-5 text-pink-400" />,
    3: <Ruler className="w-5 h-5 text-pink-400" />,
    4: <Shield className="w-5 h-5 text-pink-400" />
  };

  return (
    <div className="flex items-center gap-2 mb-3">
      {icons[step]}
      <span className="text-pink-400 text-base font-medium">Step {step}: {label}</span>
    </div>
  );
};