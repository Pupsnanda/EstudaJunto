import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {
  atualizarPedido,
  buscarPedidoPorId,
  criarPedido,
} from '../database/database';

import BottomNav from '../components/BottomNav';

const tipos = ['Preciso de monitoria', 'Ofereço monitoria'];
const statusOptions = ['Aberto', 'Resolvido'];

function mostrarAlerta(titulo, mensagem) {
  if (Platform.OS === 'web') {
    window.alert(`${titulo}\n\n${mensagem}`);
    return;
  }

  Alert.alert(titulo, mensagem);
}

export default function FormPedidoScreen({ navigation, route }) {
  const pedidoParametro = route.params?.pedido || null;
  const pedidoId = route.params?.pedidoId || route.params?.id || pedidoParametro?.id || null;
  const tipoInicial = route.params?.tipoInicial || 'Preciso de monitoria';

  const modoEdicao = !!pedidoId;

  const [carregando, setCarregando] = useState(modoEdicao);
  const [salvando, setSalvando] = useState(false);

  const [nome, setNome] = useState(pedidoParametro?.nome || '');
  const [materia, setMateria] = useState(pedidoParametro?.materia || '');
  const [tipo, setTipo] = useState(pedidoParametro?.tipo || tipoInicial);
  const [descricao, setDescricao] = useState(pedidoParametro?.descricao || '');
  const [disponibilidade, setDisponibilidade] = useState(
    pedidoParametro?.disponibilidade || ''
  );
  const [contato, setContato] = useState(pedidoParametro?.contato || '');
  const [status, setStatus] = useState(pedidoParametro?.status || 'Aberto');

  useEffect(() => {
    async function carregarPedido() {
      if (!modoEdicao || pedidoParametro) {
        setCarregando(false);
        return;
      }

      try {
        setCarregando(true);

        const pedido = await buscarPedidoPorId(pedidoId);

        if (pedido) {
          setNome(pedido.nome || '');
          setMateria(pedido.materia || '');
          setTipo(pedido.tipo || tipoInicial);
          setDescricao(pedido.descricao || '');
          setDisponibilidade(pedido.disponibilidade || '');
          setContato(pedido.contato || '');
          setStatus(pedido.status || 'Aberto');
        }
      } catch (error) {
        console.log('Erro ao carregar pedido:', error);
        mostrarAlerta('Erro', 'Não foi possível carregar o cadastro.');
      } finally {
        setCarregando(false);
      }
    }

    carregarPedido();
  }, [modoEdicao, pedidoId, pedidoParametro, tipoInicial]);

  function validarCampos() {
    if (!nome.trim()) {
      mostrarAlerta('Atenção', 'Informe o nome do aluno.');
      return false;
    }

    if (!materia.trim()) {
      mostrarAlerta('Atenção', 'Informe a matéria.');
      return false;
    }

    if (!descricao.trim()) {
      mostrarAlerta('Atenção', 'Informe a descrição.');
      return false;
    }

    if (!disponibilidade.trim()) {
      mostrarAlerta('Atenção', 'Informe a disponibilidade.');
      return false;
    }

    if (!contato.trim()) {
      mostrarAlerta('Atenção', 'Informe o contato.');
      return false;
    }

    return true;
  }

  async function salvar() {
    if (!validarCampos()) {
      return;
    }

    const dados = {
      nome,
      materia,
      tipo,
      descricao,
      disponibilidade,
      contato,
      status,
    };

    try {
      setSalvando(true);

      if (modoEdicao) {
        await atualizarPedido(pedidoId, dados);
      } else {
        await criarPedido(dados);
      }

      navigation.navigate('Pedidos');
    } catch (error) {
      console.log('Erro ao salvar:', error);
      mostrarAlerta('Erro', 'Não foi possível salvar o cadastro.');
    } finally {
      setSalvando(false);
    }
  }

  if (carregando) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large" color="#9B6DFF" />
        <Text style={styles.loadingText}>Carregando cadastro...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.headerIcon}>{modoEdicao ? '✏️' : '✨'}</Text>

        <Text style={styles.title}>
          {modoEdicao ? 'Editar cadastro' : 'Novo cadastro'}
        </Text>

        <Text style={styles.subtitle}>
          {modoEdicao
            ? 'Atualize as informações do pedido ou monitoria.'
            : 'Cadastre um pedido de ajuda ou ofereça monitoria para outros alunos.'}
        </Text>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.sectionTitle}>Tipo de cadastro</Text>

        <View style={styles.typeRow}>
          {tipos.map((item) => (
            <Pressable
              key={item}
              style={[
                styles.typeChip,
                tipo === item && styles.typeChipActive,
              ]}
              onPress={() => setTipo(item)}
            >
              <Text
                style={[
                  styles.typeChipText,
                  tipo === item && styles.typeChipTextActive,
                ]}
              >
                {item === 'Preciso de monitoria'
                  ? 'Preciso de ajuda'
                  : 'Ofereço monitoria'}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>Nome do aluno</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex.: Ana Clara"
          placeholderTextColor="#9D8DBA"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>Matéria</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex.: Matemática, Programação, Física..."
          placeholderTextColor="#9D8DBA"
          value={materia}
          onChangeText={setMateria}
        />

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Descreva a dificuldade ou a monitoria oferecida..."
          placeholderTextColor="#9D8DBA"
          value={descricao}
          onChangeText={setDescricao}
          multiline
          textAlignVertical="top"
        />

        <Text style={styles.label}>Disponibilidade</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex.: Segunda e quarta após 18h"
          placeholderTextColor="#9D8DBA"
          value={disponibilidade}
          onChangeText={setDisponibilidade}
        />

        <Text style={styles.label}>Contato</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex.: WhatsApp, e-mail ou Instagram"
          placeholderTextColor="#9D8DBA"
          value={contato}
          onChangeText={setContato}
        />

        {modoEdicao && (
          <>
            <Text style={styles.label}>Status</Text>

            <View style={styles.statusRow}>
              {statusOptions.map((item) => (
                <Pressable
                  key={item}
                  style={[
                    styles.statusChip,
                    status === item && styles.statusChipActive,
                    item === 'Resolvido' &&
                      status === item &&
                      styles.statusChipResolved,
                  ]}
                  onPress={() => setStatus(item)}
                >
                  <Text
                    style={[
                      styles.statusChipText,
                      status === item && styles.statusChipTextActive,
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        )}

        <Pressable
          style={[styles.saveButton, salvando && styles.saveButtonDisabled]}
          onPress={salvar}
          disabled={salvando}
        >
          <Text style={styles.saveButtonText}>
            {salvando
              ? 'Salvando...'
              : modoEdicao
                ? 'Salvar alterações'
                : 'Cadastrar'}
          </Text>
        </Pressable>

        <Pressable style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </Pressable>
      </View>

      <View style={styles.tipCard}>
        <Text style={styles.tipIcon}>💡</Text>

        <View style={styles.tipTextArea}>
          <Text style={styles.tipTitle}>Dica para um bom cadastro</Text>
          <Text style={styles.tipText}>
            Seja claro na descrição, informe a matéria corretamente e coloque um
            contato que facilite o retorno dos colegas.
          </Text>
        </View>
      </View>

      <BottomNav navigation={navigation} active="Formulario" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#EEE5FF',
  },

  content: {
    padding: 18,
    paddingBottom: 34,
  },

  loadingScreen: {
    flex: 1,
    backgroundColor: '#EEE5FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadingText: {
    marginTop: 10,
    color: '#7B6B9D',
  },

  header: {
    backgroundColor: '#9B6DFF',
    borderRadius: 34,
    padding: 24,
    marginBottom: 18,
  },

  headerIcon: {
    fontSize: 34,
    marginBottom: 10,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '300',
  },

  subtitle: {
    color: '#F4EEFF',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
  },

  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E7D9FF',
    marginBottom: 16,
  },

  sectionTitle: {
    color: '#2B2142',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 14,
  },

  typeRow: {
    flexDirection: 'row',
    marginBottom: 18,
  },

  typeChip: {
    flex: 1,
    backgroundColor: '#F4EEFF',
    borderRadius: 22,
    paddingVertical: 13,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E7D9FF',
  },

  typeChipActive: {
    backgroundColor: '#9B6DFF',
    borderColor: '#9B6DFF',
  },

  typeChipText: {
    color: '#8A5CF6',
    fontWeight: 'bold',
    fontSize: 13,
    textAlign: 'center',
  },

  typeChipTextActive: {
    color: '#FFFFFF',
  },

  label: {
    color: '#2B2142',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 8,
    marginTop: 6,
  },

  input: {
    backgroundColor: '#F8F3FF',
    borderRadius: 22,
    paddingVertical: 15,
    paddingHorizontal: 16,
    color: '#2B2142',
    fontSize: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EAD9FF',
  },

  textArea: {
    minHeight: 120,
  },

  statusRow: {
    flexDirection: 'row',
    marginBottom: 18,
  },

  statusChip: {
    flex: 1,
    backgroundColor: '#F4EEFF',
    borderRadius: 22,
    paddingVertical: 13,
    alignItems: 'center',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E7D9FF',
  },

  statusChipActive: {
    backgroundColor: '#9B6DFF',
    borderColor: '#9B6DFF',
  },

  statusChipResolved: {
    backgroundColor: '#05A660',
    borderColor: '#05A660',
  },

  statusChipText: {
    color: '#8A5CF6',
    fontWeight: 'bold',
  },

  statusChipTextActive: {
    color: '#FFFFFF',
  },

  saveButton: {
    backgroundColor: '#9B6DFF',
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },

  saveButtonDisabled: {
    opacity: 0.7,
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  cancelButton: {
    backgroundColor: '#F4EEFF',
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12,
  },

  cancelButtonText: {
    color: '#8A5CF6',
    fontWeight: 'bold',
    fontSize: 15,
  },

  tipCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 18,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E7D9FF',
    marginBottom: 16,
  },

  tipIcon: {
    fontSize: 28,
    marginRight: 12,
  },

  tipTextArea: {
    flex: 1,
  },

  tipTitle: {
    color: '#2B2142',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 6,
  },

  tipText: {
    color: '#6C5A8C',
    lineHeight: 22,
    fontSize: 14,
  },
});