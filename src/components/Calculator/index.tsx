// src/components/Calculator/index.tsx
import React, { useState } from 'react';
import { CalculatorForm } from './CalculatorForm';
import { CalculatorResults } from './CalculatorResults';
import { CalculatorImage } from './CalculatorImage';
import { useCalculatorForm } from '../../hooks/useCalculatorForm';
import { calculateResults } from '../../utils/calculations';
import { useAssessments } from '../../hooks/useAssessments';
import { barrierOptions } from '../../data/heatPumps';

export const Calculator = () => {
  const { formData, isValid, handleInputChange } = useCalculatorForm();
  const [results, setResults] = useState<any>(null);
  const { saveAssessment } = useAssessments();

  const handleCalculate = async () => {
    const calculatedResults = calculateResults(formData);
    setResults(calculatedResults);

    const selectedBarrier = barrierOptions.find(b => b.id === formData.barrier);
    const barrierValue = selectedBarrier ? selectedBarrier.value : 0;

    try {
      await saveAssessment({
        sound_power: parseFloat(formData.soundPower),
        directivity: parseFloat(formData.directivity),
        distance: parseFloat(formData.distance),
        barrier: barrierValue,
        final_level: parseFloat(calculatedResults.final)
      });
    } catch (error) {
      console.error('Failed to save assessment:', error);
    }
  };

  return (
    <div className="calculator-container bg-[#33274d] rounded-3xl p-8 shadow-xl">
      <CalculatorImage />
      <CalculatorForm 
        formData={formData}
        handleInputChange={handleInputChange}
        handleCalculate={handleCalculate}
        isValid={isValid}
      />
      {results && <CalculatorResults results={results} formData={formData} />}
    </div>
  );
};