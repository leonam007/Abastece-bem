import AsyncStorage from "@react-native-async-storage/async-storage";

const CHAVE = "favoritos";

export function carregarFavoritos() {
  return AsyncStorage.getItem(CHAVE).then((texto) => {
    if (texto === null) {
      return [];
    }
    return JSON.parse(texto);
  });
}

export function salvarFavoritos(lista) {
  return AsyncStorage.setItem(CHAVE, JSON.stringify(lista));
}