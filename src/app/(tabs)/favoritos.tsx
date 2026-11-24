import { useCallback, useState } from "react";
import { Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useFocusEffect } from "expo-router";
import { buscarPrecos } from "../../services/combustivelApi";
import { carregarFavoritos } from "../../services/favoritos";
import CardPreco from "../../components/CardPreco";

type Estado = {
  sigla: string;
  gasolina: string;
  diesel: string;
};

export default function FavoritosScreen() {
  const [estados, setEstados] = useState<Estado[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  async function carregar() {
    setCarregando(true);
    setErro("");

    try {
      // 1. Lê as siglas salvas no celular
      const favoritos = await carregarFavoritos();

      // 2. Busca os preços atuais na API
      const dados = await buscarPrecos();

      // 3. Monta a lista só com os estados favoritos
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

  // Recarrega toda vez que a aba aparece na tela
  // (assim, se favoritar um estado no Detalhe, ele já aparece aqui)
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
