import React from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { heatPumps } from '../../data/heatPumps';

interface CopyButtonProps {
  results: {
    final: string;
    step1: string;
    step2: string;
    step3: string;
  };
  formData: {
    soundPower: string;
    barrier: string;
  };
}

export const CopyButton = ({ results, formData }: CopyButtonProps) => {
  const [copied, setCopied] = React.useState(false);

  const getHeatPumpName = () => {
    const pump = heatPumps.find(p => p.soundPower.toString() === formData.soundPower);
    return pump?.name || 'Unknown Model';
  };

  const getVisibilityText = () => {
    const visibilityMap: Record<string, string> = {
      '0': 'Fully seen',
      '-5': 'Partially seen',
      '-10': 'Not seen'
    };
    return visibilityMap[formData.barrier] || 'Unknown';
  };

  const handleCopy = async () => {
    const text = `Heat Pump Noise Assessment Results:
Model: ${getHeatPumpName()} (${results.step1} dB(A))
Installation: ${results.step2}
Distance: ${results.step3}m
Visibility: ${getVisibilityText()}
Final Noise Level: ${results.final} dB(A)`;

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      onClick={handleCopy}
      className="flex items-center gap-2 bg-[#E561A0] hover:bg-[#d44d8d] transition-colors"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          Copy Results
        </>
      )}
    </Button>
  );
};