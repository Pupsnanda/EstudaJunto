# Roteiro de apresentação - EstudaJunto

## 1. Introdução

Bom dia/boa noite. O aplicativo que eu desenvolvi se chama **EstudaJunto**. Ele é um app de monitoria colaborativa entre alunos, criado com React Native e Expo.

A ideia surgiu a partir de um problema comum no ambiente escolar e universitário: muitos alunos têm dificuldade em algumas matérias, mas nem sempre conseguem pagar por aulas particulares. Ao mesmo tempo, existem colegas que dominam esses conteúdos e poderiam ajudar outros estudantes.

Por isso, o objetivo do EstudaJunto é criar uma ponte entre quem precisa de ajuda e quem pode oferecer monitoria.

## 2. Objetivo social

O impacto social do aplicativo está na democratização do acesso ao apoio educacional. Ele incentiva a colaboração, o compartilhamento de conhecimento e a criação de uma rede de ajuda entre alunos.

A frase principal do app é:

> Aprender fica mais fácil quando um aluno ajuda o outro.

## 3. Tecnologias utilizadas

O projeto foi desenvolvido com:

- React Native;
- Expo;
- React Navigation;
- SQLite com expo-sqlite;
- Hooks como useState, useCallback e useFocusEffect.

A escolha do SQLite foi feita porque o aplicativo pode funcionar de forma offline, armazenando os dados localmente no dispositivo.

## 4. Demonstração das telas

### Tela inicial

Na tela inicial, o usuário vê o nome do aplicativo, uma breve descrição, os indicadores de registros cadastrados e os botões principais.

### Tela de pedidos e monitorias

Nesta tela, o usuário consegue visualizar todos os cadastros. Também é possível pesquisar por aluno, matéria ou descrição e filtrar por status: Todos, Aberto ou Resolvido.

### Tela de cadastro

Na tela de cadastro, o aluno pode escolher se precisa de monitoria ou se está oferecendo monitoria. Em seguida, informa nome, matéria, descrição, disponibilidade e contato.

### Tela de detalhes

Na tela de detalhes, o usuário vê todas as informações de um cadastro. Também pode marcar como resolvido, editar ou excluir o registro.

## 5. CRUD

O aplicativo possui CRUD completo:

- Create: criação de novos cadastros;
- Read: listagem e visualização dos detalhes;
- Update: edição dos dados e alteração de status;
- Delete: exclusão de um cadastro.

## 6. Estrutura do código

O código foi organizado em pastas:

- `components`: componentes reutilizáveis, como botões, campos e cards;
- `screens`: telas do aplicativo;
- `database`: conexão e funções do SQLite;
- `theme.js`: cores e padrões visuais do app;
- `App.js`: configuração da navegação.

Essa organização facilita a manutenção do projeto e atende ao critério de boa estrutura e componentização.

## 7. Conclusão

Concluindo, o EstudaJunto é uma solução simples, funcional e com impacto social. Ele utiliza React Native para criar uma aplicação híbrida, possui navegação entre telas, persistência de dados com SQLite e operações completas de CRUD.

O app pode ser melhorado futuramente com login de usuários, notificações, avaliação dos monitores e sincronização em nuvem com Firebase.
