# ⛽ Abastece Bem

Aplicativo mobile feito com **React Native (Expo)** que mostra o preço médio da **gasolina** e do **diesel** em cada estado do Brasil. Dá para ver o detalhe de um estado, comparar dois estados e salvar seus favoritos no celular.

Trabalho final da disciplina de React Native — Prof. Victor Vidigal Ribeiro.

## O que o app faz

- Mostra a média do Brasil e os estados com a gasolina mais barata e mais cara.
- Lista todos os estados com o preço da gasolina e do diesel.
- Mostra o detalhe de cada estado, comparado com a média nacional.
- Permite favoritar estados e guarda a lista no celular.
- Compara a gasolina entre dois estados.

## Telas

| Tela | O que mostra |
|---|---|
| Início | Resumo do Brasil e data da última atualização |
| Estados | Lista de todos os estados |
| Favoritos | Os estados que você salvou |
| Comparar | Diferença de preço entre dois estados |
| Sobre | Informações sobre o app e a fonte dos dados |
| Detalhe | Preço do estado e botão para favoritar |

## Fonte dos dados

Os preços vêm da [Combustível API](https://combustivelapi.com.br/), que usa os valores divulgados pela Petrobras.

## Como rodar

Você precisa do [Node.js](https://nodejs.org/) e do app **Expo Go** no celular.

```bash
git clone https://github.com/leonam007/Abastece-bem.git
cd Abastece-bem
npm install
npx expo start
```

Depois, escaneie o QR Code com o Expo Go. O app precisa de internet para buscar os preços.

## Uso de Inteligência Artificial

- **Ferramenta:** Claude (Anthropic), usado pelo claude.ai.
- **Versão:** Claude Sonnet 5.5.
- **Período:** novembro de 2026.
- **Finalidade:** revisão e correção do código e redação deste README.

### Partes em que o Claude ajudou

**1. Carregar os preços e os favoritos em sequência** (telas Favoritos e Detalhe)
- *O que faz:* primeiro lê os estados favoritos salvos no celular e depois busca os preços deles na internet. Se algo falha no caminho, mostra uma mensagem de erro, e o carregamento termina de qualquer forma.
- *Ajuda do Claude:* reescreveu o código e revisou o resultado.

**2. Atualizar os favoritos sempre que a aba é aberta** (telas Favoritos e Comparar)
- *O que faz:* se o usuário favorita um estado e volta para a aba Favoritos, a lista já aparece atualizada. Na tela Comparar, os favoritos também ficam em dia.
- *Ajuda do Claude:* revisão do código.

**3. Abrir o detalhe de cada estado a partir da lista** (tela Detalhe)
- *O que faz:* ao tocar em um estado, abre uma tela com o preço dele e a média do Brasil, e o app sabe qual estado mostrar.
- *Ajuda do Claude:* revisão do código.

**4. Calcular a diferença de preço entre dois estados** (tela Comparar)
- *O que faz:* o usuário escolhe dois estados e o app diz qual tem a gasolina mais barata e quantos reais de diferença. Se forem o mesmo estado, avisa para escolher dois diferentes.
- *Ajuda do Claude:* revisão do código.

**5. Mostrar os favoritos primeiro na escolha de estados** (tela Comparar)
- *O que faz:* na hora de escolher os estados para comparar, os favoritos aparecem primeiro, marcados com uma estrela, e depois vêm os outros.
- *Ajuda do Claude:* revisão do código.