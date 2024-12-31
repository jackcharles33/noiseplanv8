import React from 'react';
import { Calculator } from './components/Calculator';

export default function App() {
  return (
    <div className="min-h-screen bg-[#100030] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
          Heat Pump Noise Assessment
        </h1>
        <Calculator />
      </div>
    </div>
  );
}