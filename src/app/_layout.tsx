import { Stack } from "expo-router";

// Navegador 1: Stack (pilha de telas)
// Ele controla as abas e a tela de detalhe do estado
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="posto/[uf]" options={{ title: "Detalhe do estado" }} />
    </Stack>
  );
}
