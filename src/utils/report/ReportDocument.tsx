import React from 'react';
import { Document, Page, Text, View, Image } from '@react-pdf/renderer';
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
  const formattedDate = data.assessmentDate 
    ? new Date(data.assessmentDate).toLocaleDateString('en-GB')
    : new Date().toLocaleDateString('en-GB');
  
  const directivityNumber = data.directivityFactor 
    ? parseInt(data.directivityFactor.replace('Q', ''))
    : 0;

  const getReflectingSurfacesText = () => {
    const surfaces = Math.log2(directivityNumber); // Q2 -> 1, Q4 -> 2, Q8 -> 3
    if (surfaces === 1) {
      return `There is 1 reflecting surface including the floor and it is ${data.visibilityType.toLowerCase() || 'unknown'}.`;
    }
    return `There are ${surfaces} reflecting surfaces including the floor and it is ${data.visibilityType.toLowerCase() || 'unknown'}.`;
  };
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={[styles.title, { fontSize: 16, marginBottom: 4 }]}>
          {`${data.clientName || 'Customer'} - ${data.clientAddress || 'Address'}`}
        </Text>
        <Text style={[styles.subtitle, { fontSize: 14, marginBottom: 20, color: '#000000' }]}>
          MCS 020(a) - Heat Pump Sound Calculator
        </Text>

        <Text style={[styles.sectionHeading]}>Assessment Details</Text>
        <View style={styles.details}>
          <Text style={styles.detailsText}>
            Heat pump model is {data.model || 'Unknown'} and it is {data.distance || '0'} metres from the assessment window.
          </Text>
          <Text style={styles.detailsText}>
            {getReflectingSurfacesText()}
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

          {/* Dynamically generated steps */}
          <View style={styles.tableRow}>
            <Text style={styles.stepCell}>1</Text>
            <Text style={styles.instructionCell}>{steps[0]}</Text>
            <Text style={styles.resultCell}>{formattedDate}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.stepCell}>2</Text>
            <Text style={styles.instructionCell}>{steps[1]}</Text>
            <Text style={styles.resultCell}>{data.assessmentPosition || 'N/A'}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.stepCell}>3</Text>
            <Text style={styles.instructionCell}>{steps[2]}</Text>
            <Text style={styles.resultCell}>{data.soundPower || '0'}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.stepCell}>4a</Text>
            <Text style={styles.instructionCell}>{steps[3]}</Text>
            <Text style={styles.resultCell}>{data.directivityFactor || 'Q0'}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.stepCell}>4b</Text>
            <Text style={styles.instructionCell}>{steps[4]}</Text>
            <Text style={styles.resultCell}>{data.distance || '0'}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.stepCell}>5</Text>
            <Text style={styles.instructionCell}>{steps[5]}</Text>
            <Text style={styles.resultCell}>{data.barrierType || 'No barrier'}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.stepCell}>6</Text>
            <Text style={styles.instructionCell}>{steps[6]}</Text>
            <Text style={styles.resultCell}>{data.visibilityType || 'Unknown'}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.stepCell}>7</Text>
            <Text style={styles.instructionCell}>{steps[7]}</Text>
            <Text style={styles.resultCell}>{data.calculatedLevel || '0'}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.stepCell}>8</Text>
            <Text style={styles.instructionCell}>{steps[8]}</Text>
            <Text style={[styles.resultCell, data.isCompliant ? styles.passResult : styles.failResult]}>
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
            Maximum permitted sound level at assessment position: 37 dB(A)
          </Text>
        </View>
      </Page>
      {data.annotatedPhoto && (
        <Page size="A4" style={styles.page}>
          <Text style={styles.sectionHeading}>Annotated Planning Application Photo</Text>
          <Image src={URL.createObjectURL(data.annotatedPhoto)} />
        </Page>
      )}
    </Document>
  );
};
