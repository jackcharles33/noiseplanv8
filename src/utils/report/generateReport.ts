import { pdf } from '@react-pdf/renderer';
import { ReportDocument } from './ReportDocument';
import { ReportData } from './types';
import React from 'react';

export const generateReport = async (data: ReportData) => {
  try {
    const blob = await pdf(React.createElement(ReportDocument, { data })).toBlob();
    const filename = `heat-pump-assessment-${data.date.replace(/\//g, '-')}.pdf`;
    
    // Create local download only
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Failed to generate PDF:', error);
    throw error;
  }
};