import React from 'react';
import { Volume2, AlertCircle, Gauge } from 'lucide-react';

interface ResultCardProps {
  icon: 'noise' | 'status' | 'limit';
  title: string;
  value: string;
  valueColor?: string;
}

export const ResultCard = ({ icon, title, value, valueColor = 'text-white' }: ResultCardProps) => {
  const icons = {
    noise: <Volume2 className="w-5 h-5 text-pink-400" />,
    status: <AlertCircle className="w-5 h-5 text-pink-400" />,
    limit: <Gauge className="w-5 h-5 text-pink-400" />
  };

  // Always keep noise level white, but allow other values to use custom colors
  const textColor = icon === 'noise' ? 'text-white' : valueColor;

  return (
    <div className="bg-[#241b36] rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-2">
        {icons[icon]}
        <span className="text-white/60 text-sm">{title}</span>
      </div>
      <div className={`text-2xl font-bold ${textColor}`}>{value}</div>
    </div>
  );
};