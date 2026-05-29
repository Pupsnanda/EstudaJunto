# EstudaJunto

Aplicativo desenvolvido em **React Native com Expo** para apoiar a educação por meio de uma rede de **monitoria colaborativa entre alunos**.

## 1. Problema real

Muitos estudantes têm dificuldade em determinadas disciplinas e nem sempre conseguem pagar por aulas particulares. Ao mesmo tempo, existem alunos que dominam alguns conteúdos e poderiam ajudar colegas da própria escola, faculdade ou comunidade.

O **EstudaJunto** resolve esse problema conectando alunos que precisam de monitoria com alunos que podem oferecer ajuda.

## 2. Objetivo do app

Permitir que alunos cadastrem pedidos de ajuda ou ofertas de monitoria, com informações de matéria, descrição, disponibilidade e contato.

Frase principal do app:

> Aprender fica mais fácil quando um aluno ajuda o outro.

## 3. Tecnologias utilizadas

- React Native
- Expo
- React Navigation
- SQLite com expo-sqlite
- Hooks: useState, useCallback e useFocusEffect
- JavaScript

## 4. Requisitos atendidos

| Requisito | Como foi atendido |
|---|---|
| Framework React Native | Projeto feito com React Native usando Expo |
| Navegação | Uso de React Navigation com Native Stack |
| Persistência de dados | Banco local SQLite com expo-sqlite |
| CRUD | Criar, listar, atualizar e excluir cadastros |
| Interface | Layout responsivo, cards, filtros, busca e botões claros |
| Código e estrutura | Componentes separados por telas, banco e componentes reutilizáveis |
| Versionamento | Projeto preparado para Git/GitHub |

## 5. Funcionalidades

### Tela inicial

- Mostra o nome do app.
- Explica o impacto social.
- Exibe resumo dos registros.
- Possui botões para acessar lista, criar pedido de ajuda ou oferecer monitoria.

### Lista de pedidos e monitorias

- Lista todos os registros cadastrados.
- Permite busca por aluno, matéria, tipo ou descrição.
- Possui filtros por status: Todos, Aberto e Resolvido.

### Cadastro

- Cria um novo pedido de monitoria ou oferta de monitoria.
- Valida campos obrigatórios.
- Salva os dados no SQLite.

### Detalhes

- Exibe todas as informações do cadastro.
- Permite marcar como resolvido ou aberto.
- Permite editar o cadastro.
- Permite excluir o cadastro.

### Edição

- Carrega os dados cadastrados.
- Permite atualizar as informações no banco.

## 6. CRUD implementado

| Operação | Local no app |
|---|---|
| Create | Tela Novo Cadastro |
| Read | Tela Pedidos e Monitorias + Tela Detalhes |
| Update | Tela Editar Cadastro + alteração de status |
| Delete | Botão Excluir Cadastro na tela Detalhes |

## 7. Estrutura de pastas

```txt
EstudaJunto/
├── App.js
├── app.json
├── package.json
├── README.md
├── APRESENTACAO.md
└── src/
    ├── components/
    │   ├── AppButton.js
    │   ├── EmptyState.js
    │   ├── Field.js
    │   ├── PedidoCard.js
    │   └── StatCard.js
    ├── database/
    │   └── database.js
    ├── screens/
    │   ├── DetalhePedidoScreen.js
    │   ├── FormPedidoScreen.js
    │   ├── HomeScreen.js
    │   └── PedidosScreen.js
    └── theme.js
```

## 8. Como rodar o projeto

### Opção A: rodar este projeto diretamente

No terminal, dentro da pasta do projeto:

```bash
npm install
npx expo start --go
```

Depois, abra o aplicativo no **Expo Go** pelo QR Code.

### Opção B: forma mais segura se aparecer erro de dependência

Crie um projeto Expo limpo e copie os arquivos `App.js` e a pasta `src` deste projeto para dentro dele:

```bash
npx create-expo-app@latest EstudaJunto --template blank
cd EstudaJunto
npx expo install expo-sqlite react-native-screens react-native-safe-area-context
npm install @react-navigation/native @react-navigation/native-stack
```

Depois copie:

```txt
App.js
src/
```

E rode:

```bash
npx expo start --go
```

## 9. Observação sobre Expo Go

Este projeto foi pensado para rodar no **Expo Go**, sem necessidade de development build. Se o terminal estiver em modo development build, pressione `s` para alternar para Expo Go ou rode:

```bash
npx expo start --go
```

## 10. Sugestão de commits para GitHub

```bash
git init
git add .
git commit -m "Cria estrutura inicial do app EstudaJunto"
git commit -m "Implementa banco SQLite e CRUD de monitorias"
git commit -m "Adiciona telas de listagem, cadastro, edição e detalhes"
git commit -m "Finaliza README e roteiro de apresentação"
```

## 11. Como apresentar o código

Na apresentação, mostre principalmente:

1. `App.js`: navegação entre telas.
2. `src/database/database.js`: criação da tabela e funções CRUD.
3. `src/screens`: telas principais do app.
4. `src/components`: componentes reutilizáveis.
5. Demonstração prática criando, editando e excluindo um cadastro.

