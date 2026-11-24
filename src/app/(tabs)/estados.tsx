import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { buscarPrecos } from "../../services/combustivelApi";

// Formato de cada item da lista
type Estado = {
  sigla: string;
  gasolina: string;
  diesel: string;
};

export default function EstadosScreen() {
  const [estados, setEstados] = useState<Estado[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // Função que chama a API e monta a lista de estados
  async function carregar() {
    setCarregando(true);
    setErro("");

    try {
      const dados = await buscarPrecos();

      // Transforma o objeto { sp: "6,36", rj: "6,61" } em uma lista
      const lista = Object.keys(dados.precos.gasolina)
        .filter((sigla) => sigla !== "br") // "br" é a média do Brasil, não um estado
        .map((sigla) => ({
          sigla: sigla,
          gasolina: dados.precos.gasolina[sigla],
          diesel: dados.precos.diesel[sigla] ?? "-",
        }));

      setEstados(lista);
    } catch (e) {
      setErro("Não foi possível carregar os preços.");
    }

    setCarregando(false);
  }

  // Chama a API uma vez, quando a tela abre
  useEffect(() => {
    carregar();
  }, []);

  // Enquanto carrega, mostra o loading
  if (carregando) {
    return (
      <SafeAreaView style={styles.centro}>
        <ActivityIndicator size="large" color="#166534" />
        <Text>Carregando preços...</Text>
      </SafeAreaView>
    );
  }

  // Se deu erro, mostra a mensagem e o botão de tentar de novo
  if (erro) {
    return (
      <SafeAreaView style={styles.centro}>
        <Text style={styles.erro}>{erro}</Text>
        <TouchableOpacity style={styles.botao} onPress={carregar}>
          <Text style={styles.textoBotao}>Tentar novamente</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={estados}
        keyExtractor={(item) => item.sigla}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => router.push(`/posto/${item.sigla}`)}
          >
            <Text style={styles.sigla}>{item.sigla.toUpperCase()}</Text>
            <Text>Gasolina: R$ {item.gasolina}</Text>
            <Text>Diesel: R$ {item.diesel}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F8F6",
    padding: 16,
  },
  centro: {
    flex: 1,
    backgroundColor: "#F6F8F6",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  item: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
  },
  sigla: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#166534",
  },
  erro: {
    color: "#B91C1C",
    fontSize: 16,
  },
  botao: {
    backgroundColor: "#166534",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  textoBotao: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
