import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#1e3a8a',
  },
  section: {
    margin: 10,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    width: 120,
    fontWeight: 'bold',
  },
  value: {
    flex: 1,
  },
});

const FoundReportTemplate = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Found Item Report</Text>
      
      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.label}>Reference No:</Text>
          <Text style={styles.value}>{data.referanceNo}</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Item:</Text>
          <Text style={styles.value}>{data.item}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Reported By:</Text>
          <Text style={styles.value}>{data.name}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Found Date:</Text>
          <Text style={styles.value}>{data.date}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Phone No:</Text>
          <Text style={styles.value}>{data.phoneNo}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Location:</Text>
          <Text style={styles.value}>{data.location}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Nearest Police:</Text>
          <Text style={styles.value}>{data.station}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>{data.status}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default FoundReportTemplate;