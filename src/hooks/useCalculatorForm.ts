import { useState } from 'react';
import { heatPumps } from '../data/heatPumps';

interface FormData {
  model: string;
  soundPower: string;
  directivity: string;
  distance: string;
  barrier: string;
  visibility: string; // Added for completeness
}

interface FormState {
  formData: FormData;
  isValid: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const useCalculatorForm = (): FormState => {
  const [formData, setFormData] = useState<FormData>({
    model: heatPumps[0].name,
    soundPower: heatPumps[0].soundPower.toString(),
    directivity: '1', // Corrected default to '1' for Q4 (1 opposing surface)
    distance: '1',
    barrier: '0',
    visibility: '0'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'model') {
      const selectedPump = heatPumps.find(pump => pump.name === value);
      if (selectedPump) {
        setFormData(prev => ({
          ...prev,
          model: value,
          soundPower: selectedPump.soundPower.toString()
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const isValid = Boolean(
    formData.model &&
    formData.soundPower &&
    formData.directivity &&
    formData.distance &&
    formData.barrier &&
    formData.visibility
  );

  return {
    formData,
    isValid,
    handleInputChange
  };
};
