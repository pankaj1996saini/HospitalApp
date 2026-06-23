import { Stack } from 'expo-router';
import { HospitalProvider } from '../store/hospitalStore';

export default function RootLayout() {
  return (
    <HospitalProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="detail"
          options={{
            title: 'Patient Detail',
            headerStyle: { backgroundColor: '#0f766e' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
      </Stack>
    </HospitalProvider>
  );
}
