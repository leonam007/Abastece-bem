import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";

export default function SeletorEstado({ titulo, estados, favoritos, selecionado, onSelecionar }) {
  const outros = estados.filter((sigla) => !favoritos.includes(sigla));
  const lista = [...favoritos, ...outros];

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{titulo}</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {lista.map((sigla) => (
          <TouchableOpacity
            key={sigla}
            style={[styles.opcao, sigla === selecionado && styles.opcaoSelecionada]}
            onPress={() => onSelecionar(sigla)}
          >
            <Text style={[styles.textoOpcao, sigla === selecionado && styles.textoSelecionado]}>
              {favoritos.includes(sigla) ? "★ " : ""}
              {sigla.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  titulo: {
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 8,
  },
  opcao: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  opcaoSelecionada: {
    backgroundColor: "#166534",
    borderColor: "#166534",
  },
  textoOpcao: {
    color: "#374151",
  },
  textoSelecionado: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
