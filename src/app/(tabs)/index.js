import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { buscarPrecos } from "../../services/combustivelApi";
import CardPreco from "../../components/CardPreco";

export default function HomeScreen() {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  async function carregar() {
    setCarregando(true);
    setErro("");

    try {
      const resposta = await buscarPrecos();
      setDados(resposta);
    } catch (e) {
      setErro("Não foi possível carregar os preços.");
    }

    setCarregando(false);
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

  if (erro || !dados) {
    return (
      <SafeAreaView style={styles.centro}>
        <Text style={styles.erro}>{erro}</Text>
        <TouchableOpacity style={styles.botao} onPress={carregar}>
          <Text style={styles.textoBotao}>Tentar novamente</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const barato = dados.analise.estado_mais_barato_gasolina;
  const caro = dados.analise.estado_mais_caro_gasolina;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Abastece Bem</Text>
      <Text style={styles.subtitulo}>Preço médio dos combustíveis</Text>

      <CardPreco
        titulo="Média do Brasil"
        gasolina={dados.precos.gasolina["br"]}
        diesel={dados.precos.diesel["br"]}
      />

      <View style={styles.linha}>
        <View style={[styles.caixa, styles.caixaVerde]}>
          <Text style={styles.rotulo}>Gasolina mais barata</Text>
          <Text style={styles.valor}>{barato.sigla.toUpperCase()}</Text>
          <Text>R$ {barato.preco}</Text>
        </View>

        <View style={[styles.caixa, styles.caixaVermelha]}>
          <Text style={styles.rotulo}>Gasolina mais cara</Text>
          <Text style={styles.valor}>{caro.sigla.toUpperCase()}</Text>
          <Text>R$ {caro.preco}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.botao} onPress={() => router.push("/estados")}>
        <Text style={styles.textoBotao}>Ver todos os estados</Text>
      </TouchableOpacity>

      <Text style={styles.data}>Atualizado em: {dados.data_coleta}</Text>
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
    fontSize: 30,
    fontWeight: "bold",
    color: "#166534",
  },
  subtitulo: {
    color: "#6B7280",
    marginBottom: 16,
  },
  linha: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  caixa: {
    flex: 1,
    padding: 16,
    borderRadius: 10,
  },
  caixaVerde: {
    backgroundColor: "#DCFCE7",
  },
  caixaVermelha: {
    backgroundColor: "#FEE2E2",
  },
  rotulo: {
    color: "#374151",
  },
  valor: {
    fontSize: 24,
    fontWeight: "bold",
  },
  data: {
    color: "#6B7280",
    textAlign: "center",
    marginTop: 12,
  },
  erro: {
    color: "#B91C1C",
    fontSize: 16,
  },
  botao: {
    backgroundColor: "#166534",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  textoBotao: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
