import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { initDatabase, listarPedidos } from '../database/database';
import BottomNav from '../components/BottomNav';

const filtros = ['Todos', 'Aberto', 'Resolvido'];

function gerarIniciais(nome) {
  if (!nome) return 'EJ';

  const partes = nome.trim().split(' ');

  if (partes.length === 1) {
    return partes[0].substring(0, 2).toUpperCase();
  }

  return `${partes[0][0]}${partes[1][0]}`.toUpperCase();
}

export default function PedidosScreen({ navigation }) {
  const [pedidos, setPedidos] = useState([]);
  const [busca, setBusca] = useState('');
  const [status, setStatus] = useState('Todos');
  const [carregando, setCarregando] = useState(true);

  const carregarPedidos = useCallback(async () => {
    try {
      setCarregando(true);

      await initDatabase();

      const dados = await listarPedidos({
        busca,
        status,
      });

      setPedidos(dados);
    } catch (error) {
      console.log('Erro ao carregar pedidos:', error);
    } finally {
      setCarregando(false);
    }
  }, [busca, status]);

  useFocusEffect(
    useCallback(() => {
      carregarPedidos();
    }, [carregarPedidos])
  );

  function abrirFormulario(tipoInicial) {
    navigation.navigate('Formulario', {
      tipoInicial,
    });
  }

  function abrirDetalhe(item) {
    navigation.navigate('Detalhe', {
      id: item.id,
    });
  }

  function renderPedido({ item }) {
    const isMonitor = item.tipo === 'Ofereço monitoria';
    const isResolvido = item.status === 'Resolvido';

    return (
      <Pressable style={styles.card} onPress={() => abrirDetalhe(item)}>
        <View style={styles.cardTop}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{gerarIniciais(item.nome)}</Text>
          </View>

          <View style={styles.cardUserInfo}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.tipo}>
              {isMonitor ? 'Oferece monitoria' : 'Precisa de ajuda'}
            </Text>
          </View>

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
              {item.status}
            </Text>
          </View>
        </View>

        <View style={styles.subjectBox}>
          <Text style={styles.subjectLabel}>Matéria</Text>
          <Text style={styles.subject}>{item.materia}</Text>
        </View>

        <Text style={styles.description}>{item.descricao}</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoIcon}>🕒</Text>
          <Text style={styles.infoText}>{item.disponibilidade}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoIcon}>📱</Text>
          <Text style={styles.infoText}>{item.contato}</Text>
        </View>

        <View style={styles.cardFooter}>
          <Text style={styles.footerText}>Toque para ver detalhes</Text>
          <Text style={styles.footerArrow}>›</Text>
        </View>
      </Pressable>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Comunidade</Text>

        <Text style={styles.pageSubtitle}>
          Encontre alunos, pedidos de ajuda e monitorias disponíveis.
        </Text>

        <TextInput
          value={busca}
          onChangeText={setBusca}
          placeholder="Buscar por matéria, aluno ou descrição..."
          placeholderTextColor="#9D8DBA"
          style={styles.search}
        />

        <View style={styles.filters}>
          {filtros.map((item) => (
            <Pressable
              key={item}
              onPress={() => setStatus(item)}
              style={[
                styles.filterChip,
                status === item && styles.filterChipActive,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  status === item && styles.filterTextActive,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.quickActions}>
        <Pressable
          style={styles.quickButtonDark}
          onPress={() => abrirFormulario('Preciso de monitoria')}
        >
          <Text style={styles.quickButtonDarkText}>+ Pedir ajuda</Text>
        </Pressable>

        <Pressable
          style={styles.quickButtonLight}
          onPress={() => abrirFormulario('Ofereço monitoria')}
        >
          <Text style={styles.quickButtonLightText}>+ Oferecer monitoria</Text>
        </Pressable>
      </View>

      {carregando ? (
        <View style={styles.loadingArea}>
          <ActivityIndicator size="large" color="#9B6DFF" />
          <Text style={styles.loadingText}>Carregando comunidade...</Text>
        </View>
      ) : (
        <FlatList
          data={pedidos}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderPedido}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyCard}>
              <Text style={styles.emptyIcon}>🔎</Text>
              <Text style={styles.emptyTitle}>Nenhum cadastro encontrado</Text>
              <Text style={styles.emptyText}>
                Tente mudar o filtro ou cadastre um novo pedido de ajuda.
              </Text>
            </View>
          }
        />
      )}

      <View style={styles.navWrapper}>
        <BottomNav navigation={navigation} active="Pedidos" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#EEE5FF',
  },

  header: {
    backgroundColor: '#9B6DFF',
    padding: 22,
    paddingBottom: 24,
    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 34,
  },

  pageTitle: {
    fontSize: 34,
    fontWeight: '300',
    color: '#FFFFFF',
    marginTop: 8,
  },

  pageSubtitle: {
    color: '#F4EEFF',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
    marginBottom: 18,
  },

  search: {
    backgroundColor: '#F7F0FF',
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 18,
    color: '#2B2142',
    fontSize: 15,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#EAD9FF',
  },

  filters: {
    flexDirection: 'row',
  },

  filterChip: {
    flex: 1,
    backgroundColor: '#B98CFF',
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginRight: 8,
  },

  filterChipActive: {
    backgroundColor: '#FFFFFF',
  },

  filterText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },

  filterTextActive: {
    color: '#8A5CF6',
  },

  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 18,
    marginTop: 18,
    marginBottom: 10,
  },

  quickButtonDark: {
    flex: 1,
    backgroundColor: '#2B2142',
    paddingVertical: 15,
    borderRadius: 22,
    alignItems: 'center',
    marginRight: 8,
  },

  quickButtonLight: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    borderRadius: 22,
    alignItems: 'center',
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#E7D9FF',
  },

  quickButtonDarkText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },

  quickButtonLightText: {
    color: '#8A5CF6',
    fontWeight: 'bold',
    fontSize: 13,
  },

  loadingArea: {
    backgroundColor: '#FFFFFF',
    margin: 18,
    borderRadius: 28,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E7D9FF',
  },

  loadingText: {
    marginTop: 10,
    color: '#7B6B9D',
  },

  listContent: {
    padding: 18,
    paddingBottom: 110,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E7D9FF',
  },

  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F2E9FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 3,
    borderColor: '#D9C3FF',
  },

  avatarText: {
    color: '#8A5CF6',
    fontSize: 17,
    fontWeight: 'bold',
  },

  cardUserInfo: {
    flex: 1,
  },

  nome: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#2B2142',
  },

  tipo: {
    color: '#8D7AAE',
    marginTop: 3,
    fontSize: 13,
  },

  statusBadge: {
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 18,
  },

  statusOpen: {
    backgroundColor: '#F2E9FF',
  },

  statusDone: {
    backgroundColor: '#E4FFF0',
  },

  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },

  statusTextOpen: {
    color: '#8A5CF6',
  },

  statusTextDone: {
    color: '#069950',
  },

  subjectBox: {
    backgroundColor: '#F8F3FF',
    borderRadius: 22,
    padding: 14,
    marginBottom: 12,
  },

  subjectLabel: {
    color: '#9D8DBA',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  subject: {
    color: '#2B2142',
    fontSize: 21,
    fontWeight: 'bold',
  },

  description: {
    color: '#6C5A8C',
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 12,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  infoIcon: {
    fontSize: 16,
    marginRight: 8,
  },

  infoText: {
    color: '#6C5A8C',
    fontSize: 14,
  },

  cardFooter: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0E5FF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  footerText: {
    color: '#9B6DFF',
    fontWeight: 'bold',
    fontSize: 13,
  },

  footerArrow: {
    color: '#9B6DFF',
    fontSize: 28,
    fontWeight: 'bold',
  },

  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E7D9FF',
  },

  emptyIcon: {
    fontSize: 36,
    marginBottom: 10,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2B2142',
    marginBottom: 8,
  },

  emptyText: {
    textAlign: 'center',
    color: '#7B6B9D',
    lineHeight: 22,
  },

  navWrapper: {
    position: 'absolute',
    left: 18,
    right: 18,
    bottom: 14,
  },
});