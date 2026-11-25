import { useCallback, useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "expo-router";
import { buscarPrecos } from "../../services/combustivelApi";
import { carregarFavoritos } from "../../services/favoritos";
import CardPreco from "../../components/CardPreco";
import SeletorEstado from "../../components/SeletorEstado";

function paraNumero(preco) {
  return Number(preco.replace(",", "."));
}

export default function CompararScreen() {
  const [dados, setDados] = useState(null);
  const [favoritos, setFavoritos] = useState([]);
  const [estado1, setEstado1] = useState("");
  const [estado2, setEstado2] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  function carregar() {
    setCarregando(true);
    setErro("");

    buscarPrecos()
      .then((resposta) => setDados(resposta))
      .catch(() => setErro("Não foi possível carregar os preços."))
      .finally(() => setCarregando(false));
  }

  useEffect(() => {
    carregar();
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarFavoritos().then(setFavoritos);
    }, [])
  );

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

  const siglas = Object.keys(dados.precos.gasolina).filter((sigla) => sigla !== "br");

  let resultado = "";
  if (estado1 && estado2 && estado1 !== estado2) {
    const preco1 = paraNumero(dados.precos.gasolina[estado1]);
    const preco2 = paraNumero(dados.precos.gasolina[estado2]);
    const diferenca = Math.abs(preco1 - preco2).toFixed(2).replace(".", ",");

    if (preco1 === preco2) {
      resultado = "A gasolina custa o mesmo nos dois estados.";
    } else {
      const maisBarato = preco1 < preco2 ? estado1 : estado2;
      resultado = `A gasolina em ${maisBarato.toUpperCase()} é R$ ${diferenca} mais barata.`;
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.titulo}>Comparar estados</Text>
        <Text style={styles.subtitulo}>Seus favoritos (★) aparecem primeiro.</Text>

        <SeletorEstado
          titulo="Estado 1"
          estados={siglas}
          favoritos={favoritos}
          selecionado={estado1}
          onSelecionar={setEstado1}
        />

        <SeletorEstado
          titulo="Estado 2"
          estados={siglas}
          favoritos={favoritos}
          selecionado={estado2}
          onSelecionar={setEstado2}
        />

        {estado1 !== "" && (
          <CardPreco
            titulo={estado1.toUpperCase()}
            gasolina={dados.precos.gasolina[estado1]}
            diesel={dados.precos.diesel[estado1] ?? "-"}
          />
        )}

        {estado2 !== "" && (
          <CardPreco
            titulo={estado2.toUpperCase()}
            gasolina={dados.precos.gasolina[estado2]}
            diesel={dados.precos.diesel[estado2] ?? "-"}
          />
        )}

        {resultado !== "" && (
          <View style={styles.caixaResultado}>
            <Text style={styles.textoResultado}>{resultado}</Text>
          </View>
        )}

        {estado1 !== "" && estado1 === estado2 && (
          <Text style={styles.aviso}>Escolha dois estados diferentes.</Text>
        )}
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
  centro: {
    flex: 1,
    backgroundColor: "#F6F8F6",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#166534",
  },
  subtitulo: {
    color: "#6B7280",
    marginBottom: 16,
  },
  caixaResultado: {
    backgroundColor: "#DCFCE7",
    padding: 16,
    borderRadius: 10,
    marginTop: 6,
  },
  textoResultado: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#166534",
    textAlign: "center",
  },
  aviso: {
    color: "#B91C1C",
    textAlign: "center",
    marginTop: 6,
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