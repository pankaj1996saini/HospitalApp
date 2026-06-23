import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { useHospital } from '../../store/hospitalStore';

type Field = 'name' | 'age' | 'disease' | 'doctor' | 'admissionDate';

const DOCTOR_OPTIONS = ['Dr. Mehta', 'Dr. Iyer', 'Dr. Singh', 'Dr. Reddy'];

export default function AddPatientScreen() {
  const { addPatient } = useHospital();
  const [form, setForm] = useState({ name: '', age: '', disease: '', doctor: '', admissionDate: '' });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});

  function set(field: Field, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  }

  function validate(): boolean {
    const e: Partial<Record<Field, string>> = {};
    if (!form.name.trim())                              e.name          = 'Patient name is required';
    if (!form.age || isNaN(Number(form.age)) || Number(form.age) <= 0) e.age = 'Enter a valid age';
    if (!form.disease.trim())                           e.disease       = 'Disease is required';
    if (!form.doctor)                                   e.doctor        = 'Select a doctor';
    if (!/^\d{4}-\d{2}-\d{2}$/.test(form.admissionDate)) e.admissionDate = 'Use format YYYY-MM-DD';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSave() {
    if (!validate()) return;
    addPatient(form);
    Alert.alert('Success', `${form.name} has been admitted successfully.`);
    setForm({ name: '', age: '', disease: '', doctor: '', admissionDate: '' });
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Admit New Patient</Text>
        <Text style={styles.headerSub}>Fill in all fields to register</Text>
      </View>

      <View style={styles.form}>

        <Text style={styles.label}>Patient Name <Text style={styles.req}>*</Text></Text>
        <TextInput style={[styles.input, errors.name && styles.inputError]} placeholder="e.g. Rahul Sharma" value={form.name} onChangeText={v => set('name', v)} />
        {errors.name ? <Text style={styles.error}>{errors.name}</Text> : null}

        <Text style={styles.label}>Age <Text style={styles.req}>*</Text></Text>
        <TextInput style={[styles.input, errors.age && styles.inputError]} placeholder="e.g. 35" value={form.age} onChangeText={v => set('age', v)} keyboardType="numeric" />
        {errors.age ? <Text style={styles.error}>{errors.age}</Text> : null}

        <Text style={styles.label}>Disease <Text style={styles.req}>*</Text></Text>
        <TextInput style={[styles.input, errors.disease && styles.inputError]} placeholder="e.g. Fever" value={form.disease} onChangeText={v => set('disease', v)} />
        {errors.disease ? <Text style={styles.error}>{errors.disease}</Text> : null}

        <Text style={styles.label}>Assign Doctor <Text style={styles.req}>*</Text></Text>
        <View style={styles.chipRow}>
          {DOCTOR_OPTIONS.map(d => (
            <TouchableOpacity
              key={d}
              style={[styles.chip, form.doctor === d && styles.chipActive]}
              onPress={() => set('doctor', d)}
            >
              <Text style={[styles.chipText, form.doctor === d && styles.chipTextActive]}>{d}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {errors.doctor ? <Text style={styles.error}>{errors.doctor}</Text> : null}

        <Text style={styles.label}>Admission Date <Text style={styles.req}>*</Text></Text>
        <TextInput style={[styles.input, errors.admissionDate && styles.inputError]} placeholder="YYYY-MM-DD" value={form.admissionDate} onChangeText={v => set('admissionDate', v)} />
        {errors.admissionDate ? <Text style={styles.error}>{errors.admissionDate}</Text> : null}

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Admit Patient</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.clearBtn} onPress={() => { setForm({ name: '', age: '', disease: '', doctor: '', admissionDate: '' }); setErrors({}); }}>
          <Text style={styles.clearText}>Clear Form</Text>
        </TouchableOpacity>

      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:      { flex: 1, backgroundColor: '#f3f4f6' },
  header:         { backgroundColor: '#0f766e', padding: 24 },
  headerTitle:    { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  headerSub:      { fontSize: 13, color: '#99f6e4', marginTop: 4 },

  form:           { margin: 16, backgroundColor: '#fff', borderRadius: 14, padding: 20, elevation: 2 },
  label:          { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 6, marginTop: 14 },
  req:            { color: '#ef4444' },
  input:          { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 10, padding: 12, fontSize: 15, backgroundColor: '#f9fafb' },
  inputError:     { borderColor: '#ef4444', backgroundColor: '#fef2f2' },
  error:          { fontSize: 12, color: '#ef4444', marginTop: 4 },

  chipRow:        { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip:           { borderWidth: 1, borderColor: '#d1d5db', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 7 },
  chipActive:     { backgroundColor: '#0f766e', borderColor: '#0f766e' },
  chipText:       { fontSize: 13, color: '#374151' },
  chipTextActive: { color: '#fff', fontWeight: '600' },

  saveBtn:        { backgroundColor: '#0f766e', borderRadius: 10, padding: 15, alignItems: 'center', marginTop: 24 },
  saveBtnText:    { color: '#fff', fontSize: 16, fontWeight: '700' },
  clearBtn:       { padding: 14, alignItems: 'center', marginTop: 6 },
  clearText:      { color: '#9ca3af', fontSize: 14 },
});
