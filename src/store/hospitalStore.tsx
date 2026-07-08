import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

type StoreType = {
  patients: Patient[];
  doctors: Doctor[];
  loading: boolean;
  addPatient: (p: Omit<Patient, 'id'>) => void;
  removePatient: (id: string) => void;
};

const HospitalContext = createContext<StoreType | null>(null);

export function HospitalProvider({ children }: { children: ReactNode }) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors,  setDoctors]  = useState<Doctor[]>([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [usersRes, diseaseRes] = await Promise.all([
          fetch('https://jsonplaceholder.typicode.com/users'),
          fetch('https://fakestoreapi.com/products'),
        ]);

        const users    = await usersRes.json();
        const diseases = await diseaseRes.json();

        const fetchedDoctors: Doctor[] = users.slice(0, 4).map((u: any) => ({
          id:             'D' + String(u.id).padStart(3, '0'),
          name:           'Dr. ' + u.name.split(' ')[0],
          specialization: u.company.bs.split(' ').slice(0, 3).join(' '),
        }));

        const fetchedPatients: Patient[] = users.slice(4, 10).map((u: any, i: number) => ({
          id:            'P' + String(i + 1).padStart(3, '0'),
          name:           u.name,
          age:            String(20 + ((u.id * 7) % 50)),      // deterministic age from id
          disease:        diseases[i % diseases.length].title.split(' ').slice(0, 3).join(' '),
          doctor:         fetchedDoctors[i % fetchedDoctors.length].name,
          admissionDate: `2026-06-${String(i + 1).padStart(2, '0')}`,
        }));

        setDoctors(fetchedDoctors);
        setPatients(fetchedPatients);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  function addPatient(p: Omit<Patient, 'id'>) {
    const id = 'P' + String(patients.length + 1).padStart(3, '0');
    setPatients(prev => [{ ...p, id }, ...prev]);
  }

  function removePatient(id: string) {
    setPatients(prev => prev.filter(p => p.id !== id));
  }

  return (
    <HospitalContext.Provider value={{ patients, doctors, loading, addPatient, removePatient }}>
      {children}
    </HospitalContext.Provider>
  );
}

export function useHospital() {
  const ctx = useContext(HospitalContext);
  if (!ctx) throw new Error('useHospital must be inside HospitalProvider');
  return ctx;
}
