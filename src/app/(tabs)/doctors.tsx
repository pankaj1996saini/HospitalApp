import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useHospital } from '../../store/hospitalStore';

const COLORS = ['#0f766e', '#0891b2', '#7c3aed', '#dc2626'];

export default function DoctorsScreen() {
  const { doctors, patients } = useHospital();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Our Doctors</Text>
        <Text style={styles.heroSub}>{doctors.length} specialists on duty</Text>
      </View>

      {doctors.map((doc, index) => {
        const docPatients = patients.filter(p => p.doctor === doc.name);
        const color = COLORS[index % COLORS.length];

        return (
          <View key={doc.id} style={[styles.card, { borderLeftColor: color }]}>
            <View style={[styles.avatar, { backgroundColor: color + '20' }]}>
              <Text style={[styles.avatarText, { color }]}>{doc.name.split(' ')[1][0]}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.docName}>{doc.name}</Text>
              <Text style={styles.spec}>{doc.specialization}</Text>
              <Text style={[styles.patCount, { color }]}>{docPatients.length} patients assigned</Text>

              {/* patient name chips */}
              <View style={styles.chips}>
                {docPatients.slice(0, 3).map(p => (
                  <View key={p.id} style={[styles.chip, { backgroundColor: color + '15' }]}>
                    <Text style={[styles.chipText, { color }]}>{p.name.split(' ')[0]}</Text>
                  </View>
                ))}
                {docPatients.length > 3 && (
                  <View style={[styles.chip, { backgroundColor: '#e5e7eb' }]}>
                    <Text style={styles.chipText}>+{docPatients.length - 3}</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        );
      })}

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:   { flex: 1, backgroundColor: '#f3f4f6' },

  hero:        { backgroundColor: '#0f766e', padding: 24 },
  heroTitle:   { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  heroSub:     { fontSize: 13, color: '#99f6e4', marginTop: 4 },

  card:        { backgroundColor: '#fff', marginHorizontal: 16, marginTop: 12, borderRadius: 12, padding: 16, flexDirection: 'row', elevation: 2, borderLeftWidth: 4 },
  avatar:      { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  avatarText:  { fontSize: 22, fontWeight: 'bold' },
  info:        { flex: 1 },
  docName:     { fontSize: 16, fontWeight: '700', color: '#111827' },
  spec:        { fontSize: 13, color: '#6b7280', marginTop: 2 },
  patCount:    { fontSize: 13, fontWeight: '600', marginTop: 6 },

  chips:       { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 },
  chip:        { borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  chipText:    { fontSize: 12, color: '#374151' },
});
