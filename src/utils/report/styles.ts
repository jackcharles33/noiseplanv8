// src/utils/report/styles.ts
import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF'
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subtitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#666666'
  },
  sectionHeading: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333'
  },
  details: {
    marginBottom: 20,
  },
  detailsText: {
    fontSize: 10,
    marginBottom: 4,
    lineHeight: 1.4
  },
  table: {
    width: '100%',
    marginTop: 15,
    borderWidth: 2,
    borderColor: '#000000',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: 6,
    fontSize: 10,
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderColor: '#000000',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: '#000000',
    minHeight: 35,
  },
  stepCell: {
    width: '10%',
    fontSize: 10,
    fontWeight: 'bold',
    borderRightWidth: 2,
    borderColor: '#000000',
    padding: 6,
  },
  instructionCell: {
    [cite_start]width: '50%', // Changed from 70% to give more room to results [cite: 8]
    fontSize: 9,
    borderRightWidth: 2,
    borderColor: '#000000',
    padding: 6,
    paddingRight: 8,
  },
  resultCell: {
    [cite_start]width: '40%', // Changed from 20% to 40% to fit text better [cite: 8, 9]
    fontSize: 10,
    fontWeight: 'bold',
    padding: 6,
    textAlign: 'left', // Changed from center to left for better readability of text notes
  },
  passResult: {
    backgroundColor: '#c6efce',
    color: '#006100',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  failResult: {
    backgroundColor: '#ffc7ce',
    color: '#9c0006',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    marginTop: 20,
    padding: 10,
    borderTop: '1pt solid #ddd',
  },
  footerText: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  }
});