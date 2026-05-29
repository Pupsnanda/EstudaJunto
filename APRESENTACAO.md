# Roteiro de apresentação - EstudaJunto — Monitoria Colaborativa entre Alunos

## 1. Introdução

Este projeto foi desenvolvido por **Fernanda Lobato Ribeiro**, estudante do curso de **Sistemas de Informação**, como parte de uma proposta acadêmica orientada pelo professor **Julio Cartier Maia Gomes**. A atividade teve como objetivo aplicar os conhecimentos adquiridos em desenvolvimento mobile, utilizando **React Native** e **Expo** para criar uma solução funcional, com interface, lógica de programação, navegação entre telas e persistência de dados.

A partir da proposta de desenvolver um aplicativo com impacto social, surgiu o **EstudaJunto**, um app voltado para a educação e para a colaboração entre estudantes. A ideia principal do projeto é aproximar alunos que precisam de ajuda em determinadas disciplinas de colegas que possuem conhecimento e disponibilidade para oferecer monitoria.

O aplicativo busca incentivar uma rede de apoio dentro do ambiente escolar ou universitário, promovendo a troca de conhecimento, a inclusão e o fortalecimento do aprendizado coletivo. Dessa forma, o EstudaJunto não funciona apenas como uma ferramenta tecnológica, mas também como uma proposta de cooperação entre alunos, mostrando como a tecnologia pode ser usada para resolver problemas reais e trazer benefícios para a comunidade acadêmica.

No sistema, o usuário pode cadastrar pedidos de ajuda, oferecer monitorias, visualizar os cadastros existentes, editar informações, alterar o status dos registros e excluir dados quando necessário. Essas funcionalidades compõem as operações completas de CRUD, atendendo aos requisitos técnicos do trabalho.

## Desenvolvedora

**Fernanda Lobato Ribeiro**
Estudante de **Sistemas de Informação**

## Professor Orientador

**Julio Cartier Maia Gomes**

## Nome do Aplicativo

**EstudaJunto**

## Tema

Educação — Monitoria colaborativa entre alunos

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
