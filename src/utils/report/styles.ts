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
    width: '70%',
    fontSize: 9,
    borderRightWidth: 2,
    borderColor: '#000000',
    padding: 6,
    paddingRight: 8,
  },
  resultCell: {
    width: '20%',
    fontSize: 10,
    fontWeight: 'bold',
    padding: 6,
    textAlign: 'center',
  },
  passResult: {
    backgroundColor: '#4ade80',
    color: '#000000',
    fontWeight: 'bold',
  },
  failResult: {
    backgroundColor: '#fb923c',
    color: '#000000',
    fontWeight: 'bold',
  }
});