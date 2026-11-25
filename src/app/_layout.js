import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(abas)" options={{ headerShown: false }} />
      <Stack.Screen name="posto/[uf]" options={{ title: "Detalhe do estado" }} />
    </Stack>
  );
}
