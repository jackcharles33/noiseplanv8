import { getDecibelCorrection } from './decibelCorrection';

interface CalculationInput {
  soundPower: string;
  directivity: string;
  distance: string;
  barrier: string;
}

const calculateDistanceReduction = (distance: number, directivity: string) => {
  const d = parseFloat(distance.toString());
  
  switch (directivity) {
    case '2':
      return -8.67138897219558 * Math.log(d) - 7.75157229452539;
    case '4':
      return -8.65986536106484 * Math.log(d) - 4.84454631910138;
    case '8':
      return -8.66252064972486 * Math.log(d) - 1.80386749607598;
    default:
      return 0;
  }
};

export const calculateResults = (input: CalculationInput) => {
  const soundPower = parseFloat(input.soundPower);
  const distance = parseFloat(input.distance);
  const barrier = parseFloat(input.barrier);
  const distanceReduction = calculateDistanceReduction(distance, input.directivity);
  
  // Step 6 is the sum of steps 1, 4, and 5
  const calculatedLevel = soundPower + distanceReduction + barrier;
  
  const backgroundLevel = 40;
  const levelDifference = backgroundLevel - calculatedLevel;
  const correction = getDecibelCorrection(levelDifference);
  const final = Math.max(calculatedLevel, backgroundLevel) + correction;

  return {
    step1: soundPower.toFixed(2),
    step2: `Q${input.directivity}`,
    step3: distance.toFixed(1),
    step4: distanceReduction.toFixed(2), // dB reduction value
    step5: barrier.toFixed(0),
    step6: calculatedLevel.toFixed(2), // Sum of steps 1, 4, and 5
    step7: backgroundLevel.toFixed(0),
    step8: levelDifference.toFixed(2),
    final: final.toFixed(2)
  };
};