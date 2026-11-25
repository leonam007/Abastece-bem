import { useCallback, useState } from "react";
import { Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useFocusEffect } from "expo-router";
import { buscarPrecos } from "../../services/combustivelApi";
import { carregarFavoritos } from "../../services/favoritos";
import CardPreco from "../../components/CardPreco";

export default function FavoritosScreen() {
  const [estados, setEstados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  async function carregar() {
    setCarregando(true);
    setErro("");

    try {
      const favoritos = await carregarFavoritos();

      const dados = await buscarPrecos();

      const lista = favoritos.map((sigla) => ({
        sigla: sigla,
        gasolina: dados.precos.gasolina[sigla] ?? "-",
        diesel: dados.precos.diesel[sigla] ?? "-",
      }));

      setEstados(lista);
    } catch (e) {
      setErro("Não foi possível carregar os favoritos.");
    }

    setCarregando(false);
  }

  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [])
  );

  if (carregando) {
    return (
      <SafeAreaView style={styles.centro}>
        <ActivityIndicator size="large" color="#166534" />
      </SafeAreaView>
    );
  }

  if (erro) {
    return (
      <SafeAreaView style={styles.centro}>
        <Text style={styles.erro}>{erro}</Text>
      </SafeAreaView>
    );
  }

  if (estados.length === 0) {
    return (
      <SafeAreaView style={styles.centro}>
        <Text>Você ainda não tem favoritos.</Text>
        <Text>Abra um estado e toque em ☆ para favoritar.</Text>
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
    gap: 8,
  },
  erro: {
    color: "#B91C1C",
    fontSize: 16,
  },
});
