import AsyncStorage from "@react-native-async-storage/async-storage";

// Nome da "chave" onde a lista fica salva no celular
const CHAVE = "favoritos";

// Lê a lista de favoritos salva (ex: ["sp", "rj"])
export async function carregarFavoritos(): Promise<string[]> {
  const texto = await AsyncStorage.getItem(CHAVE);

  if (texto === null) {
    return []; // ainda não tem nada salvo
  }

  return JSON.parse(texto);
}

// Salva a lista de favoritos no celular
export async function salvarFavoritos(lista: string[]) {
  await AsyncStorage.setItem(CHAVE, JSON.stringify(lista));
}
