import React from 'react';
import { FileText } from 'lucide-react';
import { Button } from '../ui/button';
import { generateReport } from '../../utils/report/generateReport';
import { ClientInfoModal } from './ClientInfoModal';

interface GenerateReportProps {
  results: {
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    step6: string;
    step8: string;
    final: string;
  };
  formData: {
    model: string;
    soundPower: string;
    barrier: string;
  };
}

export const GenerateReportButton = ({ results, formData }: GenerateReportProps) => {
  const [generating, setGenerating] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);

  const getVisibilityText = () => {
    const visibilityMap: Record<string, string> = {
      '0': 'Fully seen',
      '-5': 'Partially seen',
      '-10': 'Not seen'
    };
    return visibilityMap[formData.barrier] || 'Unknown';
  };

  const handleGenerateReport = async (clientInfo: any) => {
    try {
      setGenerating(true);

      const reportData = {
        clientName: clientInfo.name,
        clientAddress: `${clientInfo.addressLine1}, ${clientInfo.town}, ${clientInfo.postcode}`,
        model: formData.model,
        soundPower: results.step1,
        installation: results.step2,
        distance: results.step3,
        visibility: getVisibilityText(),
        finalLevel: results.final,
        isCompliant: parseFloat(results.final) <= 42,
        date: new Date().toLocaleDateString(),
        distanceReduction: results.step4,
        barrier: formData.barrier,
        calculatedLevel: results.step6,
        difference: results.step8
      };

      await generateReport(reportData);
    } catch (error) {
      console.error('Failed to generate report:', error);
    } finally {
      setGenerating(false);
      setShowModal(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setShowModal(true)}
        disabled={generating}
        className="flex items-center gap-2 bg-[#E561A0] hover:bg-[#d44d8d] transition-colors"
      >
        <FileText className="w-4 h-4" />
        {generating ? 'Generating...' : 'Generate Report'}
      </Button>

      <ClientInfoModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleGenerateReport}
      />
    </>
  );
};