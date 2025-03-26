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
    directivity: string; // Make sure this is included
    visibility: string;  // Add this if missing
  };
}

export const GenerateReportButton = ({ results, formData }: GenerateReportProps) => {
  const [generating, setGenerating] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);

  const getBarrierTypeText = () => {
    // Map your barrier values to appropriate text
    const barrierMap: Record<string, string> = {
      '1': 'Solid Wall',
      '0.5': 'Fence <18mm',
      '0': 'No barrier'
      // Add more mappings as needed
    };
    return barrierMap[formData.barrier] || 'No barrier';
  };
  
  const getVisibilityText = () => {
    const visibilityMap: Record<string, string> = {
      '0': 'Fully seen',
      '-5': 'Partially seen',
      '-10': 'Not seen'
    };
    // Make sure you're using the right property - this should be formData.visibility not formData.barrier
    return visibilityMap[formData.visibility] || 'Unknown';
  };

  const handleGenerateReport = async (clientInfo: any) => {
    try {
      setGenerating(true);
      
      // Log to debug
      console.log("Client info:", clientInfo);
      console.log("Form data:", formData);
      console.log("Results:", results);

      const reportData = {
        clientName: clientInfo.name,
        clientAddress: `${clientInfo.addressLine1}, ${clientInfo.town}, ${clientInfo.postcode}`,
        // Add the new fields
        assessmentDate: clientInfo.assessmentDate || new Date().toISOString().slice(0, 10),
        assessmentPosition: clientInfo.assessmentPosition || '',
        
        model: formData.model,
        soundPower: results.step1,
        // Match the expected fields in ReportDocument
        directivityFactor: results.step2,
        distance: results.step3,
        barrierType: getBarrierTypeText(),
        visibilityType: getVisibilityText(),
        calculatedLevel: results.step6,
        isCompliant: parseFloat(results.final) <= 42,
        
        // These can stay but aren't used in your latest ReportDocument
        date: new Date().toLocaleDateString(),
        distanceReduction: results.step4,
        barrier: formData.barrier,
        difference: results.step8,
        finalLevel: results.final
      };
      
      // Log what we're sending to debug
      console.log("Report data:", reportData);
      
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