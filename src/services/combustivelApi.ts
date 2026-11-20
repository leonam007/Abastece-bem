
const API_URL = "https://combustivelapi.com.br/api/precos/";

export interface RespostaAPI {
  error: boolean;
  message: string;
  data_coleta: string;
  precos: {
    gasolina: Record<string, string>;
    diesel: Record<string, string>;
  };
}

export async function buscarPrecos(): Promise<RespostaAPI> {
  const resposta = await fetch(API_URL);

  if (!resposta.ok) {
    throw new Error("Não foi possível consultar a API.");
  }

  const dados: RespostaAPI = await resposta.json();

  if (dados.error || !dados.precos?.gasolina) {
    throw new Error("A API retornou dados inválidos.");
  }

  return dados;
}
