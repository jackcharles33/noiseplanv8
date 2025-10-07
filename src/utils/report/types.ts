export interface ReportData {
  clientName: string;
  clientAddress: string;
  model: string;
  assessmentDate: string;
  assessmentPosition: string;
  soundPower: number;
  directivityFactor: string;
  distance: number;
  barrierType: string;
  visibilityType: string;
  calculatedLevel: number | string;
  isCompliant: boolean;
  annotatedPhoto?: File;
}
