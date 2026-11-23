import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

export default function DetalheScreen() {
  // Pega a sigla do estado que veio na rota (ex: /posto/sp)
  const { uf } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Estado: {uf}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F8F6",
    justifyContent: "center",
    alignItems: "center",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#166534",
  },
});
