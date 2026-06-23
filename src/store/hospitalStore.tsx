import { createContext, useContext, useState, ReactNode } from 'react';

export type Patient = {
  id: string;
  name: string;
  age: string;
  disease: string;
  doctor: string;
  admissionDate: string;
};

export type Doctor = {
  id: string;
  name: string;
  specialization: string;
};

const seedPatients: Patient[] = [
  { id: 'P001', name: 'Ramesh Kumar',   age: '45', disease: 'Diabetes',       doctor: 'Dr. Mehta',   admissionDate: '2026-06-01' },
  { id: 'P002', name: 'Sunita Sharma',  age: '32', disease: 'Hypertension',   doctor: 'Dr. Iyer',    admissionDate: '2026-06-03' },
  { id: 'P003', name: 'Anil Verma',     age: '60', disease: 'Heart Disease',  doctor: 'Dr. Mehta',   admissionDate: '2026-06-05' },
  { id: 'P004', name: 'Priya Nair',     age: '28', disease: 'Fever',          doctor: 'Dr. Singh',   admissionDate: '2026-06-08' },
  { id: 'P005', name: 'Vikram Rao',     age: '52', disease: 'Asthma',         doctor: 'Dr. Iyer',    admissionDate: '2026-06-10' },
  { id: 'P006', name: 'Geeta Pillai',   age: '40', disease: 'Arthritis',      doctor: 'Dr. Singh',   admissionDate: '2026-06-11' },
  { id: 'P007', name: 'Suresh Bose',    age: '35', disease: 'Dengue',         doctor: 'Dr. Mehta',   admissionDate: '2026-06-12' },
  { id: 'P008', name: 'Kavita Joshi',   age: '55', disease: 'Kidney Stone',   doctor: 'Dr. Reddy',   admissionDate: '2026-06-13' },
  { id: 'P009', name: 'Deepak Patel',   age: '48', disease: 'Typhoid',        doctor: 'Dr. Reddy',   admissionDate: '2026-06-14' },
  { id: 'P010', name: 'Meena Desai',    age: '62', disease: 'Diabetes',       doctor: 'Dr. Iyer',    admissionDate: '2026-06-15' },
  { id: 'P011', name: 'Arjun Singh',    age: '30', disease: 'Fracture',       doctor: 'Dr. Singh',   admissionDate: '2026-06-16' },
  { id: 'P012', name: 'Pooja Reddy',    age: '25', disease: 'Malaria',        doctor: 'Dr. Mehta',   admissionDate: '2026-06-17' },
];

const seedDoctors: Doctor[] = [
  { id: 'D001', name: 'Dr. Mehta',  specialization: 'General Physician' },
  { id: 'D002', name: 'Dr. Iyer',   specialization: 'Cardiologist'      },
  { id: 'D003', name: 'Dr. Singh',  specialization: 'Orthopedic'        },
  { id: 'D004', name: 'Dr. Reddy',  specialization: 'Nephrologist'      },
];

type StoreType = {
  patients: Patient[];
  doctors: Doctor[];
  addPatient: (p: Omit<Patient, 'id'>) => void;
  removePatient: (id: string) => void;
};

const HospitalContext = createContext<StoreType | null>(null);

export function HospitalProvider({ children }: { children: ReactNode }) {
  const [patients, setPatients] = useState<Patient[]>(seedPatients);
  const doctors = seedDoctors;

  function addPatient(p: Omit<Patient, 'id'>) {
    const id = 'P' + String(patients.length + 1).padStart(3, '0');
    setPatients(prev => [{ ...p, id }, ...prev]);
  }

  function removePatient(id: string) {
    setPatients(prev => prev.filter(p => p.id !== id));
  }

  return (
    <HospitalContext.Provider value={{ patients, doctors, addPatient, removePatient }}>
      {children}
    </HospitalContext.Provider>
  );
}

export function useHospital() {
  const ctx = useContext(HospitalContext);
  if (!ctx) throw new Error('useHospital must be inside HospitalProvider');
  return ctx;
}
