import { useEffect, useState } from "react";
import { Text, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { buscarPrecos } from "../../services/combustivelApi";
import CardPreco from "../../components/CardPreco";
import { carregarFavoritos, salvarFavoritos } from "../../services/favoritos";

export default function DetalheScreen() {
  const { uf } = useLocalSearchParams();

  const [gasolina, setGasolina] = useState("");
  const [diesel, setDiesel] = useState("");
  const [gasolinaBrasil, setGasolinaBrasil] = useState("");
  const [dieselBrasil, setDieselBrasil] = useState("");
  const [dataColeta, setDataColeta] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [favorito, setFavorito] = useState(false);

  function carregar() {
    setCarregando(true);
    setErro("");

    buscarPrecos()
      .then((dados) => {
        setGasolina(dados.precos.gasolina[uf] ?? "-");
        setDiesel(dados.precos.diesel[uf] ?? "-");
        setGasolinaBrasil(dados.precos.gasolina["br"]);
        setDieselBrasil(dados.precos.diesel["br"]);
        setDataColeta(dados.data_coleta);

        return carregarFavoritos();
      })
      .then((favoritos) => setFavorito(favoritos.includes(uf)))
      .catch(() => setErro("Não foi possível carregar os preços."))
      .finally(() => setCarregando(false));
  }

  function alternarFavorito() {
    carregarFavoritos()
      .then((favoritos) => {
        if (favorito) {
          return salvarFavoritos(favoritos.filter((sigla) => sigla !== uf));
        }
        return salvarFavoritos([...favoritos, uf]);
      })
      .then(() => setFavorito(!favorito));
  }

  useEffect(() => {
    carregar();
  }, [uf]);

  if (carregando) {
    return (
      <SafeAreaView style={styles.centro} edges={["bottom"]}>
        <ActivityIndicator size="large" color="#166534" />
        <Text>Carregando...</Text>
      </SafeAreaView>
    );
  }

  if (erro) {
    return (
      <SafeAreaView style={styles.centro} edges={["bottom"]}>
        <Text style={styles.erro}>{erro}</Text>
        <TouchableOpacity style={styles.botao} onPress={carregar}>
          <Text style={styles.textoBotao}>Tentar novamente</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <Text style={styles.titulo}>{uf.toUpperCase()}</Text>

      <CardPreco titulo="Preço no estado" gasolina={gasolina} diesel={diesel} />
      <CardPreco titulo="Média do Brasil" gasolina={gasolinaBrasil} diesel={dieselBrasil} />

      <Text style={styles.data}>Atualizado em: {dataColeta}</Text>

      <TouchableOpacity style={styles.botao} onPress={alternarFavorito}>
        <Text style={styles.textoBotao}>
          {favorito ? "★ Remover dos favoritos" : "☆ Adicionar aos favoritos"}
        </Text>
      </TouchableOpacity>
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
  titulo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#166534",
    marginBottom: 16,
  },
  data: {
    color: "#6B7280",
    marginTop: 8,
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
    alignItems: "center",
    marginTop: 16,
  },
  textoBotao: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});