import AsyncStorage from "@react-native-async-storage/async-storage";

const CHAVE = "favoritos";

export async function carregarFavoritos(): Promise<string[]> {
  const texto = await AsyncStorage.getItem(CHAVE);

  if (texto === null) {
    return [];
  }

  return JSON.parse(texto);
}

export async function salvarFavoritos(lista: string[]) {
  await AsyncStorage.setItem(CHAVE, JSON.stringify(lista));
}
