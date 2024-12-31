export const getDistanceReduction = (distance: number, Q: string): number => {
  const distances = [1, 1.5, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25, 30];

  const distanceTable: { [key: string]: number[] } = {
    '2': [
      -7.75, -11.27, -13.76, -17.28, -19.77, -21.71, -23.29, -25.78,
      -27.72, -29.30, -31.23, -33.73, -35.66, -37.24
    ],
    '4': [
      -4.84, -8.36, -10.85, -14.36, -16.85, -18.78, -20.36, -22.85,
      -24.78, -26.36, -28.30, -30.79, -32.72, -34.30
    ],
    '8': [
      -1.80, -5.32, -7.81, -11.32, -13.81, -15.75, -17.33, -19.82,
      -21.75, -23.33, -25.26, -27.75, -29.69, -31.27
    ]
  };

  const nearestDistanceIndex = distances.reduce((prev, curr, currentIndex) => {
    return Math.abs(curr - distance) < Math.abs(distances[prev] - distance) ? currentIndex : prev;
  }, 0);

  return distanceTable[Q][nearestDistanceIndex];
};