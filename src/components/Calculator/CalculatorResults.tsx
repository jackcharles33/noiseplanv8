import React from 'react';
import { ResultCard } from './ResultCard';
import { ProgressBar } from './ProgressBar';
import { ComplianceMessage } from './ComplianceMessage';
import { CopyButton } from './CopyButton';
import { GenerateReportButton } from './GenerateReportButton';

interface ResultsProps {
  results: {
    final: string;
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    step5: string;
    step6: string;
    isCompliant: boolean;
  };
  formData: any;
}

export const CalculatorResults = ({ results, formData }: ResultsProps) => {
  const noiseLevel = parseFloat(results.final);
  // UPDATED: Changed compliance threshold from 42 to 37
  const isCompliant = noiseLevel <= 37;

  return (
    <div className="mt-8 space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ResultCard 
          icon="noise" 
          title="Sound Power Level" 
          value={`${results.step1} dB(A)`}
        />
        <ResultCard 
          icon="status" 
          title="Base SPL" 
          value={`${results.step4} dB(A)`}
        />
        <ResultCard 
          icon="limit" 
          title="Final SPL" 
          value={`${results.final} dB(A)`}
          valueColor={isCompliant ? 'text-emerald-400' : 'text-red-400'}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ResultCard 
          icon="noise" // Placeholder, assuming you might add more icons
          title="Distance" 
          value={`${results.step3}m`}
        />
        <ResultCard 
          icon="status" // Placeholder
          title="Directivity" 
          value={results.step2}
        />
        <ResultCard 
          icon="limit" // Placeholder
          title="Attenuation" 
          value={`${results.step5} dB`}
        />
      </div>

      <ProgressBar 
        value={noiseLevel} 
        maxValue={37}
        isCompliant={isCompliant}
      />
      <ComplianceMessage isCompliant={isCompliant} />
      
      <div className="flex justify-end gap-4 mt-4">
        <GenerateReportButton results={results} formData={formData} />
        <CopyButton results={results} formData={formData} />
      </div>
    </div>
  );
};
