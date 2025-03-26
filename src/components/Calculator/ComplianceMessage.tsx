import React from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';

interface ComplianceMessageProps {
  isCompliant: boolean;
}

export const ComplianceMessage = ({ isCompliant }: ComplianceMessageProps) => (
  <div className={`mt-6 bg-[#241b36] rounded-2xl p-6 border ${
    isCompliant ? 'border-emerald-400/20' : 'border-red-400/20'
  }`}>
    <div className="flex items-start gap-3">
      {isCompliant ? (
        <CheckCircle className="w-5 h-5 text-emerald-400" />
      ) : (
        <AlertTriangle className="w-5 h-5 text-red-400" />
      )}
      <div>
        <h3 className={`font-semibold mb-1 ${
          isCompliant ? 'text-emerald-400' : 'text-red-400'
        }`}>
          {isCompliant ? 'Permitted Development Compliant' : 'Exceeds Noise Limit'}
        </h3>
        <p className="text-sm text-white/60">
          {isCompliant
            ? 'This installation meets the permitted development noise requirements of ≤37 dB(A)'
            : 'This configuration exceeds the permitted development noise limit of 37 dB(A). Consider adjusting the installation parameters.'}
        </p>
      </div>
    </div>
  </div>
);