import Dexie from 'dexie';

const db = new Dexie('EstudaJuntoDB');

db.version(1).stores({
  pedidos: '++id,nome,materia,tipo,status,created_at',
});

const exemplos = [
  {
    nome: 'Ana Clara',
    materia: 'Matemática',
    tipo: 'Preciso de monitoria',
    descricao:
      'Tenho dificuldade em equações de 1º e 2º grau e gostaria de estudar antes da prova.',
    disponibilidade: 'Terça e quinta, depois das 18h',
    contato: 'ana@email.com',
    status: 'Aberto',
    created_at: new Date().toISOString(),
  },
  {
    nome: 'João Pedro',
    materia: 'Programação',
    tipo: 'Ofereço monitoria',
    descricao:
      'Posso ajudar colegas com lógica de programação, JavaScript e React Native básico.',
    disponibilidade: 'Sábado pela manhã',
    contato: 'joao@email.com',
    status: 'Aberto',
    created_at: new Date().toISOString(),
  },
];

export async function getDatabase() {
  return db;
}

export async function initDatabase() {
  const total = await db.pedidos.count();

  if (total === 0) {
    await db.pedidos.bulkAdd(exemplos);
  }
}

export async function listarPedidos({ busca = '', status = 'Todos' } = {}) {
  await initDatabase();

  const termo = busca.trim().toLowerCase();

  let dados = await db.pedidos.orderBy('id').reverse().toArray();

  if (status !== 'Todos') {
    dados = dados.filter((item) => item.status === status);
  }

  if (termo) {
    dados = dados.filter((item) => {
      const texto = `
        ${item.nome}
        ${item.materia}
        ${item.tipo}
        ${item.descricao}
        ${item.disponibilidade}
        ${item.contato}
      `.toLowerCase();

      return texto.includes(termo);
    });
  }

  return dados;
}

export async function buscarPedidoPorId(id) {
  await initDatabase();
  return db.pedidos.get(Number(id));
}

export async function criarPedido(pedido) {
  await initDatabase();

  const novoPedido = {
    nome: pedido.nome.trim(),
    materia: pedido.materia.trim(),
    tipo: pedido.tipo,
    descricao: pedido.descricao.trim(),
    disponibilidade: pedido.disponibilidade.trim(),
    contato: pedido.contato.trim(),
    status: pedido.status || 'Aberto',
    created_at: new Date().toISOString(),
  };

  const novoId = await db.pedidos.add(novoPedido);

  return novoId;
}

export async function atualizarPedido(id, pedido) {
  await initDatabase();

  await db.pedidos.update(Number(id), {
    nome: pedido.nome.trim(),
    materia: pedido.materia.trim(),
    tipo: pedido.tipo,
    descricao: pedido.descricao.trim(),
    disponibilidade: pedido.disponibilidade.trim(),
    contato: pedido.contato.trim(),
    status: pedido.status,
  });
}

export async function alterarStatusPedido(id, status) {
  await initDatabase();

  await db.pedidos.update(Number(id), {
    status,
  });
}

export async function excluirPedido(id) {
  await initDatabase();

  await db.pedidos.delete(Number(id));
}

export async function obterResumo() {
  await initDatabase();

  const dados = await db.pedidos.toArray();

  return {
    total: dados.length,
    abertos: dados.filter((item) => item.status === 'Aberto').length,
    resolvidos: dados.filter((item) => item.status === 'Resolvido').length,
    monitores: dados.filter((item) => item.tipo === 'Ofereço monitoria').length,
  };
}