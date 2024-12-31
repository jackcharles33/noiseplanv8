import React from 'react';
import { Document, Page, Text, View } from '@react-pdf/renderer';
import { styles } from './styles';
import { ReportData } from './types';

interface ReportDocumentProps {
  data: ReportData;
}

const steps = [
  "From manufacturer's data, obtain the A-weighted sound power level of the heat pump. See 'Note 1:Sound power level'. The highest sound power level specified should be used",
  "Use 'Note 2: Sound pressure level' and 'Note 3: Determination of directivity' below to establish the directivity 'Q' of the heat pump noise.",
  "Measure the distance from the heat pump to the assessment position in metres",
  "Use table in 'Note 4: dB distance reduction' below to obtain a dB reduction",
  "Establish whether there is a solid barrier between the heat pump and the assessment position using 'Note 5: Barriers between the heat pump and the assessment position' and note any dB reduction",
  "Calculate the sound pressure level from the heat pump at the assessment position using the following calculation: (STEP 1) + (STEP 4) + (STEP 5)",
  "Background noise level. For the purposes of the MCS Planning Standard for air source heat pumps 40 dB(A) the background noise level is assumed to be 40 dB(A) Lp.",
  "Determine the difference between background noise level and the heat pump noise level using the following calculation: (STEP 7) - (STEP 6)",
  "Using the table in 'Note 7: Decibel correction' obtain an adjustment figure and then add this to whichever is the higher dB figure from STEP 6 and STEP 7."
];

export const ReportDocument: React.FC<ReportDocumentProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={[styles.title, { fontSize: 16, marginBottom: 4 }]}>
        {`${data.clientName} - ${data.clientAddress}`}
      </Text>
      <Text style={[styles.subtitle, { fontSize: 14, marginBottom: 20, color: '#000000' }]}>
        MCS 020 - Manual Sound Calculator
      </Text>

      <Text style={[styles.sectionHeading]}>Assessment Details</Text>
      <View style={styles.details}>
        <Text style={styles.detailsText}>• Heat pump model is {data.model} and it is {data.distance}m from the assessment window.</Text>
        <Text style={styles.detailsText}>• There is {data.installation} and it is {data.visibility}.</Text>
        <Text style={styles.detailsText}>• The assessment position is one metre perpendicular to the centre of the first floor bedroom window as you're looking at the neighbours house from the rear.</Text>
      </View>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.stepCell}>Step</Text>
          <Text style={styles.instructionCell}>Instructions</Text>
          <Text style={styles.resultCell}>Result</Text>
        </View>

        {steps.map((instruction, index) => {
          let result = '';
          switch (index) {
            case 0: result = `${data.soundPower} dB(A)`; break;
            case 1: result = data.installation; break;
            case 2: result = `${data.distance}m`; break;
            case 3: result = `${data.distanceReduction} dB`; break;
            case 4: result = `${data.barrier} dB`; break;
            case 5: result = `${data.calculatedLevel} dB(A)`; break;
            case 6: result = "40 dB(A)"; break;
            case 7: result = `${data.difference} dB`; break;
            case 8: result = `${data.finalLevel} dB(A)`; break;
            default: result = '';
          }

          return (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.stepCell}>{index + 1}</Text>
              <Text style={styles.instructionCell}>{instruction}</Text>
              <Text style={styles.resultCell}>{result}</Text>
            </View>
          );
        })}
      </View>

      <View style={[styles.tableRow, { marginTop: 20 }]}>
        <Text style={[styles.resultCell, { width: '100%' }, data.isCompliant ? styles.passResult : styles.failResult]}>
          Final Result: {data.finalLevel} dB(A) - {data.isCompliant ? 'COMPLIANT' : 'NON-COMPLIANT'}
        </Text>
      </View>
    </Page>
  </Document>
);