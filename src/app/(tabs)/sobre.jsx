import { Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SobreScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.titulo}>Sobre o app</Text>

        <Text style={styles.texto}>
          O Abastece Bem mostra o preço médio da gasolina e do diesel em cada
          estado do Brasil, e permite salvar os estados favoritos no celular.
        </Text>

        <Text style={styles.subtitulo}>Fonte dos dados</Text>
        <Text style={styles.texto}>
          Combustível API (combustivelapi.com.br), que usa os preços
          divulgados pela Petrobras.
        </Text>

        <Text style={styles.subtitulo}>Como usar</Text>
        <Text style={styles.texto}>• Início: resumo do Brasil.</Text>
        <Text style={styles.texto}>• Estados: lista com o preço de cada estado.</Text>
        <Text style={styles.texto}>• Toque em um estado para ver o detalhe e favoritar.</Text>
        <Text style={styles.texto}>• Favoritos: os estados que você salvou.</Text>

        <Text style={styles.subtitulo}>Projeto</Text>
        <Text style={styles.texto}>
          Trabalho final da disciplina de React Native — Prof. Victor Vidigal.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F8F6",
    padding: 16,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#166534",
    marginBottom: 12,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#166534",
    marginTop: 16,
    marginBottom: 4,
  },
  texto: {
    fontSize: 15,
    color: "#374151",
    marginBottom: 4,
  },
});
