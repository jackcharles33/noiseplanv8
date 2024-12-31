export const getDecibelCorrection = (difference: number): number => {
  const x = Math.abs(difference);
  if (x >= 15) return 0;
  
  return 0.0000012969 * Math.pow(x, 6)
       - 0.0000725444 * Math.pow(x, 5)
       + 0.0014975391 * Math.pow(x, 4)
       - 0.0146839107 * Math.pow(x, 3)
       + 0.087769829 * Math.pow(x, 2)
       - 0.5720985634 * x
       + 3;
};