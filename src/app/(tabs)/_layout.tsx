import { Tabs } from 'expo-router/js-tabs';
import { TabBar } from '@/components/TabBar';

export default function TabsLayout() {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="home" />
      <Tabs.Screen name="explore" />
      <Tabs.Screen name="collab" />
      <Tabs.Screen name="mystore" />
    </Tabs>
  );
}
