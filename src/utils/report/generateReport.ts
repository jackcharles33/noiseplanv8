import { pdf } from '@react-pdf/renderer';
import { ReportDocument } from './ReportDocument';
import { ReportData } from './types';
import React from 'react';

export const generateReport = async (data: ReportData) => {
  try {
    const blob = await pdf(React.createElement(ReportDocument, { data })).toBlob();
    
    // Format the date for the filename
    const dateString = data.assessmentDate 
      ? new Date(data.assessmentDate).toLocaleDateString('en-GB').replace(/\//g, '-')
      : new Date().toLocaleDateString('en-GB').replace(/\//g, '-');
    
    const filename = `heat-pump-assessment-${dateString}.pdf`;
    
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