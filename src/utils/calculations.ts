import { 
  DirectivityOption, 
  BarrierOption, 
  VisibilityOption 
} from '../data/heatPumps';

interface CalculationInput {
  soundPower: string;
  directivity: string;
  distance: string;
  barrier: string;
  visibility: string;
}

const calculateSoundPressureLevel = (
  soundPower: number,
  Q: number,
  distance: number
): number => {
  // Formula: SPL = SWL + 10*LOG(Q/(4*π*r²))
  const PI = Math.PI;
  return soundPower + 10 * Math.log10(Q / (4 * PI * Math.pow(distance, 2)));
};

const getDirectivityFactor = (directivity: string): number => {
  const value = parseInt(directivity);
  switch(value) {
    case 0: return 2;  // Q2
    case 1: return 4;  // Q4
    case 2: return 8;  // Q8
    default: return 4; // Default to Q4
  }
};

export const calculateResults = (input: CalculationInput) => {
  // Step 1: Get sound power level
  const soundPower = parseFloat(input.soundPower);
  
  // Step 2: Get Q factor
  const Q = getDirectivityFactor(input.directivity);
  
  // Step 3: Get distance
  const distance = parseFloat(input.distance);
  
  // Step 4: Calculate base sound pressure level using the formula
  const baseSoundPressureLevel = calculateSoundPressureLevel(soundPower, Q, distance);
  
  // Step 5: Calculate total attenuation
  const barrierAttenuation = parseFloat(input.barrier);
  const visibilityAttenuation = parseFloat(input.visibility);
  // UPDATED: Changed from addition to multiplication to match the new formula
  const totalAttenuation = barrierAttenuation * visibilityAttenuation;
  
  // Step 6: Calculate final sound pressure level
  const finalSoundPressureLevel = baseSoundPressureLevel + totalAttenuation;

  const roundedFinalValue = Math.round(finalSoundPressureLevel);
  
  // Format all results to 1 decimal place for consistency
  return {
    step1: soundPower.toFixed(1),
    step2: `Q${Q}`,
    step3: distance.toFixed(1),
    step4: baseSoundPressureLevel.toFixed(1),
    step5: totalAttenuation.toFixed(1),
    step6: finalSoundPressureLevel.toFixed(1),
    final: finalSoundPressureLevel.toFixed(1),
    isCompliant: finalSoundPressureLevel <= 37
  };
};
