const API_URL = "https://combustivelapi.com.br/api/precos/";

export async function buscarPrecos() {
  const resposta = await fetch(API_URL);

  if (!resposta.ok) {
    throw new Error("Não foi possível consultar a API.");
  }

  const dados = await resposta.json();

  if (dados.error || !dados.precos?.gasolina) {
    throw new Error("A API retornou dados inválidos.");
  }

  return dados;
}
