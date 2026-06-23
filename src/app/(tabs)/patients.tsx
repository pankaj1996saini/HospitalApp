import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Alert, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useCallback } from 'react';
import { useHospital, Patient } from '../../store/hospitalStore';

export default function PatientsScreen() {
  const { patients, removePatient } = useHospital();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  }, []);

  const filtered = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.disease.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase())
  );

  function handleDelete(id: string, name: string) {
    Alert.alert('Remove Patient', `Remove ${name} from records?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => removePatient(id) },
    ]);
  }

  function renderCard({ item }: { item: Patient }) {
    return (
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.cardLeft}
          onPress={() => router.push({ pathname: '/detail', params: item })}
          activeOpacity={0.7}
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{item.name[0]}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.meta}>{item.disease} · Age {item.age}</Text>
            <Text style={styles.doctor}>{item.doctor}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => handleDelete(item.id, item.name)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.deleteText}>✕</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchWrap}>
        <TextInput
          style={styles.search}
          placeholder="Search by name, disease or ID..."
          value={search}
          onChangeText={setSearch}
          placeholderTextColor="#9ca3af"
        />
      </View>

      <Text style={styles.count}>{filtered.length} patient{filtered.length !== 1 ? 's' : ''} found</Text>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={renderCard}
        contentContainerStyle={{ padding: 12, paddingTop: 4 }}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#0f766e']} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No patients found</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:  { flex: 1, backgroundColor: '#f3f4f6' },
  searchWrap: { backgroundColor: '#0f766e', paddingHorizontal: 16, paddingVertical: 12 },
  search:     { backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10, fontSize: 14 },
  count:      { fontSize: 13, color: '#6b7280', marginLeft: 16, marginTop: 10, marginBottom: 4 },

  card:       { backgroundColor: '#fff', borderRadius: 12, marginBottom: 10, flexDirection: 'row', alignItems: 'center', padding: 12, elevation: 2 },
  cardLeft:   { flex: 1, flexDirection: 'row', alignItems: 'center' },
  avatar:     { width: 48, height: 48, borderRadius: 24, backgroundColor: '#ccfbf1', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 20, fontWeight: 'bold', color: '#0f766e' },
  info:       { marginLeft: 12, flex: 1 },
  name:       { fontSize: 15, fontWeight: '700', color: '#111827' },
  meta:       { fontSize: 13, color: '#6b7280', marginTop: 2 },
  doctor:     { fontSize: 12, color: '#0f766e', marginTop: 3, fontWeight: '600' },

  deleteBtn:  { padding: 8 },
  deleteText: { fontSize: 16, color: '#ef4444', fontWeight: 'bold' },

  empty:      { alignItems: 'center', marginTop: 60 },
  emptyText:  { fontSize: 15, color: '#9ca3af' },
});
