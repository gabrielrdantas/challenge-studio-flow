# Studio Flow - Teste Técnico

Este repositório contém um projeto fictício chamado **Studio Flow**, criado exclusivamente para fins de avaliação técnica.

A proposta simula uma ferramenta de **kanban de cenas**, utilizada (hipoteticamente) por um estúdio para organizar a produção de conteúdo audiovisual. O funcionamento esperado é simples: cada "cena" passa por etapas sequenciais (ex: planejada → em produção → finalizada) e deve poder ser movida entre elas conforme seu progresso.

## Contexto

Este projeto foi propositalmente iniciado de forma incompleta e com diversas limitações, como se tivesse sido desenvolvido por uma pessoa com pouca experiência técnica. A intenção é simular um cenário realista onde você deve assumir um código legado e levá-lo até uma versão funcional e bem estruturada.

Você terá **5 dias** para entregar uma solução que funcione conforme o esperado, com foco tanto na correção de erros quanto na qualidade e clareza do código.

Este teste serve para avaliar sua capacidade de:

- Compreender e evoluir código existente
- Resolver bugs e inconsistências
- Refatorar e estruturar melhor o projeto
- Implementar novas funcionalidades
- Tomar decisões técnicas com autonomia e bom senso

## O que precisa ser feito

Você tem liberdade para alterar, reestruturar ou remover qualquer parte do código — o objetivo é que, ao final, o projeto esteja funcionando bem, com código limpo, estável e fácil de manter.

Não se prenda apenas aos problemas já mapeados. Se identificar pontos fracos ou melhorias importantes, sinta-se à vontade para agir.

## Bugs identificados

A seguir, estão listados alguns comportamentos considerados incorretos que foram propositalmente deixados no projeto:

1. **Movimentação incorreta de cenas no fluxo**
   Atualmente é possível mover cenas para qualquer etapa, mas o correto é permitir apenas a movimentação para a **próxima etapa imediata**. Não deve ser possível voltar ou pular etapas.

2. **Status inválidos no modal de detalhes**
   O campo de status no modal permite selecionar qualquer valor. Ele deve exibir apenas o **próximo status válido** no fluxo da cena.

3. **"Piscar" visual na coluna ao mover uma cena sobre ela**
   Quando se arrasta uma cena e o ponteiro passa sobre a própria coluna de origem, ela alterna rapidamente entre estilos de hover e desabilitado, causando um efeito visual incômodo.

4. **Validação incorreta de data de gravação**
   Ao editar uma cena, não deve ser permitido selecionar uma data de gravação no passado. A data deve ser **igual ou posterior à data atual**.

5. **Falta de tratamento visual para erro da API**
   Quando ocorre uma falha na atualização da cena (por exemplo, a API retorna 404), a aplicação não exibe nenhuma mensagem de erro, e o estado local é atualizado como se a operação tivesse sido bem-sucedida. Isso causa inconsistência: o usuário acredita que a alteração foi salva, mas ao recarregar a página a mudança se perde. O sistema deve sinalizar falhas de forma clara e evitar que a interface mostre dados como se estivessem persistidos quando não estão.

## Outros problemas conhecidos

Além dos bugs acima, há outros pontos que merecem atenção:

- Performance insatisfatória ao lidar com listas grandes de cenas
- Estrutura de código desorganizada e com baixa coesão
- Ausência de tratamento de erros em pontos críticos

## Funcionalidades a serem implementadas

Além da correção dos problemas, você deverá implementar duas funcionalidades que **ainda não existem no projeto**:

- Criação de **novas cenas** diretamente no kanban
- **Reordenação de cenas** dentro de cada coluna (drag and drop entre posições)

## Como rodar o projeto

### Aplicação

```bash
# Instale as dependências
pnpm install

# Rode o servidor de desenvolvimento
pnpm run dev
```

A aplicação ficará disponível em `http://localhost:3000`.

### API (json-server)

Para simular uma API, usamos o [json-server](https://github.com/typicode/json-server), com os dados armazenados no arquivo `data/api.json`.

Para iniciar a API fake:

```bash
pnpm install -g json-server

# Rode o json-server apontando para o arquivo de dados
json-server --watch data/api.json --port 3001
```

A API ficará acessível em `http://localhost:3001`.

## Entrega

O foco aqui não é acertar tudo "de primeira", mas sim demonstrar **como você pensa, organiza e estrutura seu trabalho**. Por isso, sinta-se livre para fazer refatorações, quebrar componentes, ajustar estruturas ou até mudar o que achar necessário.

O importante é entregar um sistema funcional, com código limpo, coeso e fácil de evoluir.
