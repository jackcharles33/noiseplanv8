export interface HeatPump {
  name: string;
  soundPower: number;
}

export const heatPumps: HeatPump[] = [
  { name: 'Cosy6', soundPower: 58 },
  { name: 'Cosy9', soundPower: 58 },
  { name: 'EDLA04E2V3', soundPower: 58 },
  { name: 'EDLA06E2V3', soundPower: 60 },
  { name: 'EDLA08E2V3', soundPower: 62 },
  { name: 'EDLA09DA3V3', soundPower: 62 },
  { name: 'EDLA11DA3V3', soundPower: 62 },
  { name: 'EDLA14DA3V3', soundPower: 62 },
  { name: 'EDLA16DA3V3', soundPower: 62 }
];

export interface DirectivityOption {
  value: number;
  surfaces: number;
  label: string;
}

export const directivityOptions: DirectivityOption[] = [
  { value: 0, surfaces: 0, label: '0 Opposing Surfaces (Q2)' },
  { value: 1, surfaces: 1, label: '1 Opposing Surfaces (Q4)' },
  { value: 2, surfaces: 2, label: '2 Opposing Surfaces (Q8)' }
];

export interface BarrierOption {
  type: string;
  value: number;
  id: string; // Add a unique identifier
}

export const barrierOptions: BarrierOption[] = [
  { type: 'Solid Wall', value: 1, id: 'solid-wall' },
  { type: 'Fence >=18mm', value: 1, id: 'fence-thick' },
  { type: 'Fence <18mm', value: 0.5, id: 'fence-thin' },
  { type: 'Open Fencing', value: 0, id: 'open-fencing' },
  { type: 'Vegetation', value: 0, id: 'vegetation' },
  { type: 'No barrier', value: 0, id: 'no-barrier' }
];

export interface VisibilityOption {
  type: string;
  value: number;
}

export const visibilityOptions: VisibilityOption[] = [
  { type: 'Fully seen', value: 0 },
  { type: 'Partially seen', value: -5 },
  { type: 'Not seen', value: -10 }
];