
const API_URL = "https://combustivelapi.com.br/api/precos/";

export function buscarPrecos() {
  return fetch(API_URL)
    .then((resposta) => {
      if (!resposta.ok) {
        throw new Error("Não foi possível consultar a API.");
      }
      return resposta.json();
    })
    .then((dados) => {
      if (dados.error || !dados.precos?.gasolina) {
        throw new Error("A API retornou dados inválidos.");
      }
      return dados;
    });
}