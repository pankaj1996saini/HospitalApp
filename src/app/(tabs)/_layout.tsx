import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

function icon(inactive: IconName, active: IconName) {
  return ({ color, focused }: { color: string; focused: boolean }) => (
    <Ionicons name={focused ? active : inactive} size={22} color={color} />
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0f766e',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: { backgroundColor: '#fff', borderTopColor: '#e5e7eb', height: 60, paddingBottom: 8 },
        headerStyle: { backgroundColor: '#0f766e' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
      }}
    >
      <Tabs.Screen name="index"    options={{ title: 'Home',     tabBarLabel: 'Home',     tabBarIcon: icon('home-outline',             'home')             }} />
      <Tabs.Screen name="patients" options={{ title: 'Patients', tabBarLabel: 'Patients', tabBarIcon: icon('people-outline',           'people')           }} />
      <Tabs.Screen name="doctors"  options={{ title: 'Doctors',  tabBarLabel: 'Doctors',  tabBarIcon: icon('medical-outline',          'medical')          }} />
      <Tabs.Screen name="add"      options={{ title: 'Add Patient', tabBarLabel: 'Add',   tabBarIcon: icon('person-add-outline',       'person-add')       }} />
    </Tabs>
  );
}
