import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useHospital } from '../store/hospitalStore';

export default function DetailScreen() {
  const p = useLocalSearchParams<{
    id: string; name: string; age: string;
    disease: string; doctor: string; admissionDate: string;
  }>();
  const router = useRouter();
  const { removePatient } = useHospital();

  function handleDelete() {
    Alert.alert('Remove Patient', `Remove ${p.name} from records?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => { removePatient(p.id); router.back(); } },
    ]);
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{p.name?.[0]}</Text>
        </View>
        <Text style={styles.name}>{p.name}</Text>
        <Text style={styles.idText}>{p.id}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{p.disease}</Text>
        </View>
      </View>

      {/* Details */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Patient Information</Text>
        {[
          { label: 'Patient ID',      value: p.id            },
          { label: 'Full Name',       value: p.name          },
          { label: 'Age',             value: p.age + ' years'},
          { label: 'Disease',         value: p.disease       },
          { label: 'Doctor',          value: p.doctor        },
          { label: 'Admission Date',  value: p.admissionDate },
        ].map(row => (
          <View key={row.label} style={styles.infoRow}>
            <Text style={styles.infoLabel}>{row.label}</Text>
            <Text style={styles.infoValue}>{row.value}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
        <Text style={styles.deleteBtnText}>Remove Patient</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:     { flex: 1, backgroundColor: '#f3f4f6' },

  header:        { backgroundColor: '#0f766e', alignItems: 'center', paddingVertical: 32 },
  avatar:        { width: 80, height: 80, borderRadius: 40, backgroundColor: '#ccfbf1', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  avatarText:    { fontSize: 32, fontWeight: 'bold', color: '#0f766e' },
  name:          { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  idText:        { fontSize: 13, color: '#99f6e4', marginTop: 4 },
  badge:         { backgroundColor: '#0d9488', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 5, marginTop: 10 },
  badgeText:     { color: '#ccfbf1', fontSize: 13, fontWeight: '600' },

  card:          { backgroundColor: '#fff', marginHorizontal: 16, marginTop: 16, borderRadius: 12, padding: 16, elevation: 2 },
  cardTitle:     { fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 12 },
  infoRow:       { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 11, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  infoLabel:     { fontSize: 13, color: '#6b7280' },
  infoValue:     { fontSize: 13, color: '#111827', fontWeight: '600', flexShrink: 1, textAlign: 'right', marginLeft: 12 },

  deleteBtn:     { margin: 16, backgroundColor: '#fee2e2', borderRadius: 10, padding: 14, alignItems: 'center' },
  deleteBtnText: { color: '#ef4444', fontSize: 15, fontWeight: '700' },
});
