# Abastece Bem

Aplicativo em React Native (Expo) que mostra o preço médio da gasolina e do diesel em cada estado do Brasil, usando a [Combustível API](https://combustivelapi.com.br/), e permite salvar estados favoritos no celular.

Trabalho final da disciplina de React Native — Prof. Victor Vidigal.

## Telas

| Tela | Arquivo | O que faz |
|---|---|---|
| Início | `src/app/(tabs)/index.jsx` | Média do Brasil, estado com a gasolina mais barata e mais cara, e data da coleta |
| Estados | `src/app/(tabs)/estados.jsx` | Lista todos os estados com preço da gasolina e do diesel |
| Favoritos | `src/app/(tabs)/favoritos.jsx` | Mostra os estados que o usuário favoritou |
| Comparar | `src/app/(tabs)/comparar.jsx` | Compara o preço da gasolina entre dois estados escolhidos, com os favoritos como atalho |
| Sobre | `src/app/(tabs)/sobre.jsx` | Explica o app e a fonte dos dados |
| Detalhe | `src/app/posto/[uf].jsx` | Preço do estado comparado com a média do Brasil, com botão para favoritar |

## Requisitos atendidos

- **Navegação:** 6 telas, com dois navegadores do Expo Router (file-based routing): `Stack` em `src/app/_layout.jsx` e `Tabs` em `src/app/(tabs)/_layout.jsx`.
- **API externa:** `fetch` em `src/services/combustivelApi.js`. As telas mostram loading (`ActivityIndicator`) e mensagem de erro com botão "Tentar novamente".
- **Armazenamento local:** lista de favoritos salva com AsyncStorage em `src/services/favoritos.js`.
- **Estado e efeitos:** `useState` para dados, loading e erro; `useEffect` para chamar a API quando a tela abre.
- **Componente reutilizável:** `src/components/CardPreco.jsx`, usado nas telas Início, Estados, Detalhe, Favoritos e Comparar. `src/components/SeletorEstado.jsx` é usado duas vezes na tela Comparar.
- **UI:** `StyleSheet`, Flexbox e `SafeAreaView` em todas as telas.

## Como rodar

```
npm install
npx expo start
```

Depois é só abrir no Expo Go (celular) ou apertar `w` para abrir no navegador.
