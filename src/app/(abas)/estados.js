import { useEffect, useState } from "react";
import {
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { buscarPrecos } from "../../services/combustivelApi";
import CardPreco from "../../components/CardPreco";

export default function EstadosScreen() {
  const [estados, setEstados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  function carregar() {
    setCarregando(true);
    setErro("");

    buscarPrecos()
      .then((dados) => {
        const lista = Object.keys(dados.precos.gasolina)
          .filter((sigla) => sigla !== "br")
          .map((sigla) => ({
            sigla: sigla,
            gasolina: dados.precos.gasolina[sigla],
            diesel: dados.precos.diesel[sigla] ?? "-",
          }));

        setEstados(lista);
      })
      .catch(() => setErro("Não foi possível carregar os preços."))
      .finally(() => setCarregando(false));
  }

  useEffect(() => {
    carregar();
  }, []);

  if (carregando) {
    return (
      <SafeAreaView style={styles.centro}>
        <ActivityIndicator size="large" color="#166534" />
        <Text>Carregando preços...</Text>
      </SafeAreaView>
    );
  }

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
          <CardPreco
            titulo={item.sigla.toUpperCase()}
            gasolina={item.gasolina}
            diesel={item.diesel}
            onPress={() => router.push(`/posto/${item.sigla}`)}
          />
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