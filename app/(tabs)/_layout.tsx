import { Tabs } from 'expo-router';
import { Chrome as Home, Search, DollarSign, Phone } from 'lucide-react-native';
import { StyleSheet } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Ticket',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
          headerTitle: 'Emissão de Ticket',
        }}
      />
      <Tabs.Screen
        name="lookup"
        options={{
          title: 'Consulta',
          tabBarIcon: ({ color, size }) => <Search size={size} color={color} />,
          headerTitle: 'Consulta de Ticket',
        }}
      />
      <Tabs.Screen
        name="pricing"
        options={{
          title: 'Valores',
          tabBarIcon: ({ color, size }) => <DollarSign size={size} color={color} />,
          headerTitle: 'Tabela de Valores',
        }}
      />
      <Tabs.Screen
        name="support"
        options={{
          title: 'Suporte',
          tabBarIcon: ({ color, size }) => <Phone size={size} color={color} />,
          headerTitle: 'Suporte',
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    height: 64,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  tabBarLabel: {
    fontWeight: '500',
    fontSize: 12,
    marginBottom: 6,
  },
  header: {
    backgroundColor: '#3B82F6',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 18,
  },
});