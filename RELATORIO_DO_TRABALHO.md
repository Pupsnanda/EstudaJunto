# Relatório do Trabalho - EstudaJunto

## Tema escolhido

Educação: aplicativo de monitoria entre alunos.

## Nome do aplicativo

EstudaJunto.

## Descrição

O EstudaJunto é um aplicativo mobile desenvolvido em React Native para facilitar a conexão entre alunos que precisam de ajuda em determinada matéria e alunos que podem oferecer monitoria.

O app permite cadastrar pedidos de ajuda, ofertas de monitoria, consultar registros, editar informações, marcar como resolvido e excluir cadastros.

## Justificativa

A educação é uma área de grande impacto social. Muitos alunos possuem dificuldades em disciplinas específicas, mas não têm acesso fácil a reforço escolar ou aulas particulares. O aplicativo propõe uma solução colaborativa, aproximando alunos da mesma comunidade acadêmica.

## Público-alvo

Alunos de escolas, cursos técnicos, faculdades e comunidades educacionais.

## Funcionalidades principais

- Cadastro de pedido de monitoria;
- Cadastro de oferta de monitoria;
- Listagem de registros;
- Busca por aluno, matéria ou descrição;
- Filtro por status;
- Visualização detalhada;
- Edição de registros;
- Exclusão de registros;
- Alteração de status para Aberto ou Resolvido.

## Banco de dados

Foi utilizado SQLite, por meio da biblioteca expo-sqlite. A tabela principal se chama `pedidos` e armazena:

- id;
- nome;
- matéria;
- tipo;
- descrição;
- disponibilidade;
- contato;
- status;
- data de criação.

## Operações CRUD

- Criar: função `criarPedido`;
- Ler: funções `listarPedidos` e `buscarPedidoPorId`;
- Atualizar: funções `atualizarPedido` e `alterarStatusPedido`;
- Deletar: função `excluirPedido`.

## Considerações finais

O projeto atende aos requisitos técnicos da atividade, integrando interface, lógica de programação, navegação e persistência de dados. A solução possui aplicação social e pode ser expandida futuramente com Firebase, autenticação e notificações.
