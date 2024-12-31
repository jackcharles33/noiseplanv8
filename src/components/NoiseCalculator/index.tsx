import React, { useState } from 'react';
import { Select } from '../ui/select';
import { Button } from '../ui/button';
import { ResultsDisplay } from './ResultsDisplay';
import { CalculatedDistance } from './CalculatedDistance';
import { NoiseIcon, SurfacesIcon, DistanceIcon, WindowIcon, VisibilityIcon, CalculateIcon } from './icons';

export const NoiseCalculator = () => {
  const [formData, setFormData] = useState({
    heatPumpModel: 'EDLA16DA3V3 - 62.00 dB(A)',
    surfaces: '1',
    distance: '1',
    windowLevel: 'First floor',
    visibility: 'Fully visible (0 dB)'
  });

  const [results, setResults] = useState({
    noiseLevel: '',
    status: '',
    calculatedDistance: ''
  });

  const handleCalculate = () => {
    // Implement calculation logic here
    setResults({
      noiseLevel: '81.93',
      status: 'Non-Compliant',
      calculatedDistance: '2.79'
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
        Heat Pump Noise Assessment
      </h1>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <NoiseIcon /> Step 1: Select Heat Pump Model
            </label>
            <Select
              value={formData.heatPumpModel}
              onChange={(e) => setFormData({ ...formData, heatPumpModel: e.target.value })}
            >
              <option>EDLA16DA3V3 - 62.00 dB(A)</option>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <SurfacesIcon /> Step 2: Select Opposing Surfaces
            </label>
            <Select
              value={formData.surfaces}
              onChange={(e) => setFormData({ ...formData, surfaces: e.target.value })}
            >
              <option>1</option>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <DistanceIcon /> Step 3a: Horizontal Distance (m)
            </label>
            <input
              type="number"
              value={formData.distance}
              onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-[hsl(var(--input))] border-none text-white focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <WindowIcon /> Step 3b: Assessment Window Level
            </label>
            <Select
              value={formData.windowLevel}
              onChange={(e) => setFormData({ ...formData, windowLevel: e.target.value })}
            >
              <option>First floor</option>
            </Select>
          </div>
        </div>

        <CalculatedDistance distance={results.calculatedDistance} />

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <VisibilityIcon /> Step 4: Select Visibility
            </label>
            <Select
              value={formData.visibility}
              onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
            >
              <option>Fully visible (0 dB)</option>
            </Select>
          </div>

          <div className="flex items-end">
            <Button onClick={handleCalculate}>
              <span className="flex items-center justify-center gap-2">
                <CalculateIcon /> Calculate
              </span>
            </Button>
          </div>
        </div>

        {results.noiseLevel && <ResultsDisplay results={results} />}
      </div>
    </div>
  );
};