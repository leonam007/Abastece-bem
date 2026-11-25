import { Tabs } from "expo-router";
import { Text } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#166534" }}>
      <Tabs.Screen
        name="index"
        options={{ title: "Início", tabBarIcon: () => <Text>🏠</Text> }}
      />
      <Tabs.Screen
        name="estados"
        options={{ title: "Estados", tabBarIcon: () => <Text>⛽</Text> }}
      />
      <Tabs.Screen
        name="favoritos"
        options={{ title: "Favoritos", tabBarIcon: () => <Text>⭐</Text> }}
      />
      <Tabs.Screen
        name="comparar"
        options={{ title: "Comparar", tabBarIcon: () => <Text>⚖️</Text> }}
      />
      <Tabs.Screen
        name="sobre"
        options={{ title: "Sobre", tabBarIcon: () => <Text>ℹ️</Text> }}
      />
    </Tabs>
  );
}
