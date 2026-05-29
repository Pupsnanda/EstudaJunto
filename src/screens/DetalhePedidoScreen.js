import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import {
  alterarStatusPedido,
  buscarPedidoPorId,
  excluirPedido,
} from '../database/database';

import BottomNav from '../components/BottomNav';

function mostrarConfirmacao(titulo, mensagem, aoConfirmar) {
  if (Platform.OS === 'web') {
    const confirmou = window.confirm(`${titulo}\n\n${mensagem}`);

    if (confirmou) {
      aoConfirmar();
    }

    return;
  }

  Alert.alert(titulo, mensagem, [
    { text: 'Cancelar', style: 'cancel' },
    {
      text: 'Confirmar',
      style: 'destructive',
      onPress: aoConfirmar,
    },
  ]);
}

function gerarIniciais(nome) {
  if (!nome) return 'EJ';

  const partes = nome.trim().split(' ');

  if (partes.length === 1) {
    return partes[0].substring(0, 2).toUpperCase();
  }

  return `${partes[0][0]}${partes[1][0]}`.toUpperCase();
}

export default function DetalhePedidoScreen({ navigation, route }) {
  const pedidoId = route.params?.id || route.params?.pedidoId;

  const [pedido, setPedido] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [processando, setProcessando] = useState(false);

  const carregarPedido = useCallback(async () => {
    try {
      setCarregando(true);

      const dados = await buscarPedidoPorId(pedidoId);

      setPedido(dados || null);
    } catch (error) {
      console.log('Erro ao carregar detalhe:', error);
    } finally {
      setCarregando(false);
    }
  }, [pedidoId]);

  useFocusEffect(
    useCallback(() => {
      carregarPedido();
    }, [carregarPedido])
  );

  async function mudarStatus() {
    if (!pedido) return;

    const novoStatus = pedido.status === 'Aberto' ? 'Resolvido' : 'Aberto';

    try {
      setProcessando(true);

      await alterarStatusPedido(pedido.id, novoStatus);

      await carregarPedido();
    } catch (error) {
      console.log('Erro ao alterar status:', error);
    } finally {
      setProcessando(false);
    }
  }

  function editarPedido() {
    if (!pedido) return;

    navigation.navigate('Formulario', {
      id: pedido.id,
      pedidoId: pedido.id,
      pedido,
    });
  }

  function confirmarExclusao() {
    if (!pedido) return;

    mostrarConfirmacao(
      'Excluir cadastro',
      'Tem certeza que deseja excluir este cadastro? Esta ação não pode ser desfeita.',
      async () => {
        try {
          setProcessando(true);

          await excluirPedido(pedido.id);

          navigation.navigate('Pedidos');
        } catch (error) {
          console.log('Erro ao excluir:', error);
        } finally {
          setProcessando(false);
        }
      }
    );
  }

  if (carregando) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large" color="#9B6DFF" />
        <Text style={styles.loadingText}>Carregando detalhes...</Text>
      </View>
    );
  }

  if (!pedido) {
    return (
      <View style={styles.loadingScreen}>
        <Text style={styles.emptyIcon}>🔎</Text>
        <Text style={styles.emptyTitle}>Cadastro não encontrado</Text>

        <Pressable
          style={styles.backButton}
          onPress={() => navigation.navigate('Pedidos')}
        >
          <Text style={styles.backButtonText}>Voltar para comunidade</Text>
        </Pressable>
      </View>
    );
  }

  const isMonitoria = pedido.tipo === 'Ofereço monitoria';
  const isResolvido = pedido.status === 'Resolvido';

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.profileCard}>
        <View style={styles.topActions}>
          <Pressable style={styles.backCircle} onPress={() => navigation.goBack()}>
            <Text style={styles.backCircleText}>‹</Text>
          </Pressable>

          <View
            style={[
              styles.statusBadge,
              isResolvido ? styles.statusDone : styles.statusOpen,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                isResolvido ? styles.statusTextDone : styles.statusTextOpen,
              ]}
            >
              {pedido.status}
            </Text>
          </View>
        </View>

        <View style={styles.avatarLarge}>
          <Text style={styles.avatarLargeText}>{gerarIniciais(pedido.nome)}</Text>
        </View>

        <Text style={styles.name}>{pedido.nome}</Text>

        <Text style={styles.typeText}>
          {isMonitoria ? 'Está oferecendo monitoria' : 'Está procurando ajuda'}
        </Text>

        <View style={styles.subjectHighlight}>
          <Text style={styles.subjectLabel}>Matéria</Text>
          <Text style={styles.subject}>{pedido.materia}</Text>
        </View>
      </View>

      <View style={styles.postCard}>
        <Text style={styles.cardTitle}>Descrição</Text>
        <Text style={styles.description}>{pedido.descricao}</Text>
      </View>

      <View style={styles.infoGrid}>
        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>🕒</Text>
          <Text style={styles.infoLabel}>Disponibilidade</Text>
          <Text style={styles.infoValue}>{pedido.disponibilidade}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>📱</Text>
          <Text style={styles.infoLabel}>Contato</Text>
          <Text style={styles.infoValue}>{pedido.contato}</Text>
        </View>
      </View>

      <View style={styles.actionsCard}>
        <Text style={styles.actionsTitle}>Ações do cadastro</Text>

        <Pressable
          style={styles.editButton}
          onPress={editarPedido}
          disabled={processando}
        >
          <Text style={styles.editButtonText}>Editar cadastro</Text>
        </Pressable>

        <Pressable
          style={styles.statusButton}
          onPress={mudarStatus}
          disabled={processando}
        >
          <Text style={styles.statusButtonText}>
            {isResolvido ? 'Reabrir cadastro' : 'Marcar como resolvido'}
          </Text>
        </Pressable>

        <Pressable
          style={styles.deleteButton}
          onPress={confirmarExclusao}
          disabled={processando}
        >
          <Text style={styles.deleteButtonText}>Excluir cadastro</Text>
        </Pressable>
      </View>

      <View style={styles.tipCard}>
        <Text style={styles.tipIcon}>🎓</Text>

        <View style={styles.tipContent}>
          <Text style={styles.tipTitle}>EstudaJunto</Text>
          <Text style={styles.tipText}>
            Esta tela representa o detalhe de um pedido ou oferta de monitoria,
            permitindo visualizar, editar, atualizar status e excluir o registro.
          </Text>
        </View>
      </View>

      <BottomNav navigation={navigation} active="Detalhe" />
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
    padding: 24,
  },

  loadingText: {
    marginTop: 10,
    color: '#7B6B9D',
  },

  emptyIcon: {
    fontSize: 42,
    marginBottom: 10,
  },

  emptyTitle: {
    color: '#2B2142',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 18,
  },

  backButton: {
    backgroundColor: '#9B6DFF',
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 26,
  },

  backButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  profileCard: {
    backgroundColor: '#9B6DFF',
    borderRadius: 36,
    padding: 22,
    alignItems: 'center',
    marginBottom: 16,
  },

  topActions: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  backCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  backCircleText: {
    color: '#8A5CF6',
    fontSize: 34,
    lineHeight: 36,
    fontWeight: 'bold',
  },

  statusBadge: {
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 22,
  },

  statusOpen: {
    backgroundColor: '#FFFFFF',
  },

  statusDone: {
    backgroundColor: '#E4FFF0',
  },

  statusText: {
    fontWeight: 'bold',
    fontSize: 13,
  },

  statusTextOpen: {
    color: '#8A5CF6',
  },

  statusTextDone: {
    color: '#069950',
  },

  avatarLarge: {
    width: 124,
    height: 124,
    borderRadius: 62,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 8,
    borderColor: '#C7A8FF',
    marginBottom: 14,
  },

  avatarLargeText: {
    color: '#8A5CF6',
    fontSize: 36,
    fontWeight: 'bold',
  },

  name: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '300',
    textAlign: 'center',
  },

  typeText: {
    color: '#F4EEFF',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 6,
    marginBottom: 18,
    textAlign: 'center',
  },

  subjectHighlight: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 18,
    alignItems: 'center',
  },

  subjectLabel: {
    color: '#9D8DBA',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  subject: {
    color: '#2B2142',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  postCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E7D9FF',
    marginBottom: 16,
  },

  cardTitle: {
    color: '#2B2142',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  description: {
    color: '#6C5A8C',
    fontSize: 15,
    lineHeight: 24,
  },

  infoGrid: {
    flexDirection: 'row',
    marginBottom: 16,
  },

  infoCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E7D9FF',
    marginRight: 8,
  },

  infoIcon: {
    fontSize: 28,
    marginBottom: 8,
  },

  infoLabel: {
    color: '#9D8DBA',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 6,
  },

  infoValue: {
    color: '#2B2142',
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 21,
  },

  actionsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E7D9FF',
    marginBottom: 16,
  },

  actionsTitle: {
    color: '#2B2142',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 14,
  },

  editButton: {
    backgroundColor: '#9B6DFF',
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },

  editButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },

  statusButton: {
    backgroundColor: '#2B2142',
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },

  statusButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },

  deleteButton: {
    backgroundColor: '#FFE9F0',
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center',
  },

  deleteButtonText: {
    color: '#D93662',
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

  tipContent: {
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