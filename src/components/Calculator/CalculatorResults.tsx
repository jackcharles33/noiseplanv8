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
  };
  formData: {
    soundPower: string;
    barrier: string;
  };
}

export const CalculatorResults = ({ results, formData }: ResultsProps) => {
  const noiseLevel = parseFloat(results.final);
  const isCompliant = noiseLevel <= 42;

  return (
    <div className="mt-8 space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ResultCard 
          icon="noise" 
          title="Noise Level" 
          value={`${noiseLevel.toFixed(2)} dB(A)`}
          valueColor={isCompliant ? 'text-white' : 'text-red-400'}
        />
        <ResultCard 
          icon="status" 
          title="Status" 
          value={isCompliant ? 'Compliant' : 'Non-Compliant'}
          valueColor={isCompliant ? 'text-emerald-400' : 'text-red-400'}
        />
        <ResultCard 
          icon="limit" 
          title="Limit" 
          value="42.00 dB(A)" 
        />
      </div>

      <ProgressBar 
        value={noiseLevel} 
        maxValue={42}
        isCompliant={isCompliant}
      />
      <ComplianceMessage isCompliant={isCompliant} />
      
      <div className="flex justify-end gap-4">
        <GenerateReportButton results={results} formData={formData} />
        <CopyButton results={results} formData={formData} />
      </div>
    </div>
  );
};