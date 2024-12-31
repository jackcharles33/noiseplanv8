import React from 'react';
import { StepLabel } from './StepLabel';
import { Select } from '../ui/select';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { heatPumps } from '../../data/heatPumps';

interface CalculatorFormProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleCalculate: () => void;
  isValid: boolean;
}

export const CalculatorForm = ({ 
  formData, 
  handleInputChange, 
  handleCalculate,
  isValid 
}: CalculatorFormProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="transition-all duration-300 hover:translate-y-[-2px]">
          <StepLabel step={1} label="Select Heat Pump Model" />
          <Select
            name="model"
            value={formData.model}
            onChange={handleInputChange}
          >
            {heatPumps.map(pump => (
              <option key={pump.name} value={pump.name}>
                {pump.name} - {pump.soundPower} dB(A)
              </option>
            ))}
          </Select>
        </div>

        <div className="transition-all duration-300 hover:translate-y-[-2px]">
          <StepLabel step={2} label="Select Opposing Surfaces" />
          <Select
            name="directivity"
            value={formData.directivity}
            onChange={handleInputChange}
          >
            <option value="2">One reflecting surface (Q2)</option>
            <option value="4">Two reflecting surfaces (Q4)</option>
            <option value="8">Three reflecting surfaces (Q8)</option>
          </Select>
        </div>

        <div className="transition-all duration-300 hover:translate-y-[-2px]">
          <StepLabel step={3} label="Distance (meters)" />
          <Input
            type="number"
            name="distance"
            value={formData.distance}
            onChange={handleInputChange}
            min="1"
            max="30"
            step="0.1"
          />
        </div>

        <div className="transition-all duration-300 hover:translate-y-[-2px]">
          <StepLabel step={4} label="Select Visibility" />
          <Select
            name="barrier"
            value={formData.barrier}
            onChange={handleInputChange}
          >
            <option value="0">Fully seen</option>
            <option value="-5">Partially seen</option>
            <option value="-10">Not seen</option>
          </Select>
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={handleCalculate}
          disabled={!isValid}
          className={`w-full max-w-md transition-all duration-300 ${
            !isValid ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          Calculate
        </Button>
      </div>
    </div>
  );
};