import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function CardPreco({ titulo, gasolina, diesel, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} disabled={!onPress}>
      <Text style={styles.titulo}>{titulo}</Text>

      <View style={styles.linha}>
        <View style={styles.coluna}>
          <Text style={styles.rotulo}>Gasolina</Text>
          <Text style={styles.preco}>R$ {gasolina}</Text>
        </View>

        <View style={styles.coluna}>
          <Text style={styles.rotulo}>Diesel</Text>
          <Text style={styles.preco}>R$ {diesel}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#166534",
    marginBottom: 8,
  },
  linha: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  coluna: {
    flex: 1,
  },
  rotulo: {
    color: "#6B7280",
  },
  preco: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
