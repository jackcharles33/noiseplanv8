import React from 'react';
import { Document, Page, Text, View } from '@react-pdf/renderer';
import { styles } from './styles';
import { ReportData } from './types';

interface ReportDocumentProps {
  data: ReportData;
}

const steps = [
  "Assessment Date",
  "Assessment Position",
  "A-weighted sound power level of the heat pump dBA",
  "Determine the directivity 'Q' of the heat pump noise.",
  "Measure the distance from the heat pump to the assessment position in metres",
  "Determination of barrier correction - select barrier type",
  "Determination of barrier correction - select line of sight",
  "Calculate Sound Pressure Level",
  "Final Result?"
];

export const ReportDocument: React.FC<ReportDocumentProps> = ({ data }) => {
  // Format the date from assessmentDate or fallback to current date
  const formattedDate = data.assessmentDate 
    ? new Date(data.assessmentDate).toLocaleDateString('en-GB')
    : new Date().toLocaleDateString('en-GB');
  
  // Safely extract directivity number (removing 'Q' prefix)
  const directivityNumber = data.directivityFactor 
    ? data.directivityFactor.replace('Q', '') 
    : '0';
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={[styles.title, { fontSize: 16, marginBottom: 4 }]}>
          {`${data.clientName || 'Client'} - ${data.clientAddress || 'Address'}`}
        </Text>
        <Text style={[styles.subtitle, { fontSize: 14, marginBottom: 20, color: '#000000' }]}>
          MCS 020 - Heat Pump Sound Calculator
        </Text>

        <Text style={[styles.sectionHeading]}>Assessment Details</Text>
        <View style={styles.details}>
          <Text style={styles.detailsText}>
            Heat pump model is {data.model || 'Unknown'} and it is {data.distance || '0'} metres from the assessment window.
          </Text>
          <Text style={styles.detailsText}>
            There are {directivityNumber} Reflecting Surfaces and it is {data.visibilityType || 'Unknown'}.
          </Text>
          <Text style={styles.detailsText}>
            The assessment position is one metre perpendicular to the centre of the closest habitable room.
          </Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.stepCell}>Step</Text>
            <Text style={styles.instructionCell}>Instructions</Text>
            <Text style={styles.resultCell}>MCS contractor results/notes</Text>
          </View>

          {/* Step 1: Assessment date */}
          <View style={styles.tableRow}>
            <Text style={styles.stepCell}>1</Text>
            <Text style={styles.instructionCell}>{steps[0]}</Text>
            <Text style={styles.resultCell}>{formattedDate}</Text>
          </View>

          {/* Step 2: Assessment position */}
          <View style={styles.tableRow}>
            <Text style={styles.stepCell}>2</Text>
            <Text style={styles.instructionCell}>{steps[1]}</Text>
            <Text style={styles.resultCell}>
              {data.assessmentPosition || '0'}
            </Text>
          </View>

          {/* Step 3: Sound power level */}
          <View style={styles.tableRow}>
            <Text style={styles.stepCell}>3</Text>
            <Text style={styles.instructionCell}>{steps[2]}</Text>
            <Text style={styles.resultCell}>{data.soundPower || '0'}</Text>
          </View>

          {/* Step 4a: Directivity */}
          <View style={styles.tableRow}>
            <Text style={styles.stepCell}>4a</Text>
            <Text style={styles.instructionCell}>{steps[3]}</Text>
            <Text style={styles.resultCell}>{data.directivityFactor || 'Q0'}</Text>
          </View>

          {/* Step 4b: Distance */}
          <View style={styles.tableRow}>
            <Text style={styles.stepCell}>4b</Text>
            <Text style={styles.instructionCell}>{steps[4]}</Text>
            <Text style={styles.resultCell}>{data.distance || '0'}</Text>
          </View>

          {/* Step 5: Barrier type */}
          <View style={styles.tableRow}>
            <Text style={styles.stepCell}>5</Text>
            <Text style={styles.instructionCell}>{steps[5]}</Text>
            <Text style={styles.resultCell}>{data.barrierType || 'No barrier'}</Text>
          </View>

          {/* Step 6: Line of sight */}
          <View style={styles.tableRow}>
            <Text style={styles.stepCell}>6</Text>
            <Text style={styles.instructionCell}>{steps[6]}</Text>
            <Text style={styles.resultCell}>{data.visibilityType || 'Unknown'}</Text>
          </View>

          {/* Step 7: Calculate Sound Pressure Level */}
          <View style={styles.tableRow}>
            <Text style={styles.stepCell}>7</Text>
            <Text style={styles.instructionCell}>{steps[7]}</Text>
            <Text style={styles.resultCell}>{data.calculatedLevel || '0'}</Text>
          </View>

          {/* Step 8: Final Result */}
          <View style={styles.tableRow}>
            <Text style={styles.stepCell}>8</Text>
            <Text style={styles.instructionCell}>{steps[8]}</Text>
            <Text style={[
              styles.resultCell, 
              data.isCompliant ? styles.passResult : styles.failResult
            ]}>
              {data.isCompliant ? "Pass" : "Fail"}
            </Text>
          </View>
        </View>

        <View style={[styles.tableRow, { marginTop: 20 }]}>
          <Text style={[styles.resultCell, { width: '100%' }, data.isCompliant ? styles.passResult : styles.failResult]}>
            Final Sound Pressure Level: {data.calculatedLevel || '0'} dB(A) - {data.isCompliant ? 'COMPLIANT' : 'NON-COMPLIANT'}
          </Text>
        </View>

        <View style={[styles.footer, { marginTop: 20 }]}>
          <Text style={styles.footerText}>
            This assessment follows the MCS 020 planning standard for heat pumps.
          </Text>
          <Text style={styles.footerText}>
            Maximum permitted sound level at assessment position: 42 dB(A)
          </Text>
        </View>
      </Page>
    </Document>
  );
};