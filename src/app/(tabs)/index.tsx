import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useCallback } from 'react';
import { useHospital } from '../../store/hospitalStore';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { patients, doctors } = useHospital();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  }, []);

  // doctor-wise patient count
  const doctorStats = doctors.map(d => ({
    ...d,
    count: patients.filter(p => p.doctor === d.name).length,
  }));

  // recently admitted — last 4
  const recent = [...patients].slice(0, 4);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#0f766e']} />}
    >
      {/* Hero */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>City Hospital</Text>
        <Text style={styles.heroSub}>Management Dashboard</Text>
        <Text style={styles.heroCount}>{patients.length} Patients Admitted</Text>
      </View>

      {/* Stat cards */}
      <View style={styles.statsRow}>
        {[
          { label: 'Total Patients', value: patients.length,  color: '#0f766e' },
          { label: 'Doctors',        value: doctors.length,   color: '#0891b2' },
          { label: 'Diseases',       value: [...new Set(patients.map(p => p.disease))].length, color: '#7c3aed' },
          { label: 'Today',          value: patients.filter(p => p.admissionDate === '2026-06-17').length, color: '#dc2626' },
        ].map(s => (
          <View key={s.label} style={[styles.statCard, { borderTopColor: s.color }]}>
            <Text style={[styles.statVal, { color: s.color }]}>{s.value}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      {/* Doctor-wise count */}
      <Text style={styles.sectionTitle}>Patients by Doctor</Text>
      <View style={styles.card}>
        {doctorStats.map(d => (
          <View key={d.id} style={styles.barRow}>
            <Text style={styles.barLabel}>{d.name}</Text>
            <View style={styles.barBg}>
              <View style={[styles.barFill, { width: `${(d.count / patients.length) * 100}%` }]} />
            </View>
            <Text style={styles.barCount}>{d.count}</Text>
          </View>
        ))}
      </View>

      {/* Recently admitted */}
      <Text style={styles.sectionTitle}>Recently Admitted</Text>
      {recent.map(p => (
        <TouchableOpacity
          key={p.id}
          style={styles.recentRow}
          onPress={() => router.push({ pathname: '/detail', params: p })}
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{p.name[0]}</Text>
          </View>
          <View style={styles.recentInfo}>
            <Text style={styles.recentName}>{p.name}</Text>
            <Text style={styles.recentMeta}>{p.disease} · {p.doctor}</Text>
          </View>
          <Text style={styles.recentDate}>{p.admissionDate.slice(5)}</Text>
        </TouchableOpacity>
      ))}

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: '#f3f4f6' },

  hero:         { backgroundColor: '#0f766e', padding: 24, paddingTop: 32, paddingBottom: 32 },
  heroTitle:    { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  heroSub:      { fontSize: 13, color: '#99f6e4', marginTop: 4 },
  heroCount:    { fontSize: 16, color: '#ccfbf1', marginTop: 12, fontWeight: '600' },

  statsRow:     { flexDirection: 'row', flexWrap: 'wrap', padding: 12, gap: 8 },
  statCard:     {
    backgroundColor: '#fff', borderRadius: 10, padding: 14,
    alignItems: 'center', width: (width - 56) / 2,
    borderTopWidth: 3, elevation: 2,
  },
  statVal:      { fontSize: 28, fontWeight: 'bold' },
  statLabel:    { fontSize: 12, color: '#6b7280', marginTop: 4 },

  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#111827', marginHorizontal: 16, marginTop: 8, marginBottom: 8 },

  card:         { backgroundColor: '#fff', marginHorizontal: 16, borderRadius: 12, padding: 16, marginBottom: 8, elevation: 2 },
  barRow:       { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  barLabel:     { fontSize: 12, color: '#374151', width: 80 },
  barBg:        { flex: 1, backgroundColor: '#e5e7eb', borderRadius: 4, height: 8, marginHorizontal: 8 },
  barFill:      { backgroundColor: '#0f766e', borderRadius: 4, height: 8 },
  barCount:     { fontSize: 12, color: '#6b7280', width: 20, textAlign: 'right' },

  recentRow:    { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', marginHorizontal: 16, marginBottom: 8, padding: 12, borderRadius: 10, elevation: 1 },
  avatar:       { width: 44, height: 44, borderRadius: 22, backgroundColor: '#ccfbf1', alignItems: 'center', justifyContent: 'center' },
  avatarText:   { fontSize: 18, fontWeight: 'bold', color: '#0f766e' },
  recentInfo:   { flex: 1, marginLeft: 12 },
  recentName:   { fontSize: 14, fontWeight: '600', color: '#111827' },
  recentMeta:   { fontSize: 12, color: '#6b7280', marginTop: 2 },
  recentDate:   { fontSize: 12, color: '#9ca3af' },
});
