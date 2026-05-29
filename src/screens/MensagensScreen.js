import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import BottomNav from '../components/BottomNav';

const conversas = [
  {
    id: 1,
    nome: 'Ana Clara',
    materia: 'Matemática',
    mensagem: 'Oi! Vi seu pedido de ajuda em equações. Posso te ajudar hoje às 18h.',
    horario: '10:20',
  },
  {
    id: 2,
    nome: 'João Pedro',
    materia: 'Programação',
    mensagem: 'Tenho material de lógica e React Native básico para compartilhar.',
    horario: '09:45',
  },
  {
    id: 3,
    nome: 'Mariana Lima',
    materia: 'Redação',
    mensagem: 'Podemos montar um grupo de estudos para a próxima prova.',
    horario: 'Ontem',
  },
];

function gerarIniciais(nome) {
  if (!nome) return 'EJ';

  const partes = nome.trim().split(' ');

  if (partes.length === 1) {
    return partes[0].substring(0, 2).toUpperCase();
  }

  return `${partes[0][0]}${partes[1][0]}`.toUpperCase();
}

export default function MensagensScreen({ navigation }) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.headerIcon}>💬</Text>
        <Text style={styles.title}>Mensagens</Text>
        <Text style={styles.subtitle}>
          Simulação de contatos entre alunos para combinar monitorias e grupos de estudo.
        </Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Central de comunicação</Text>
        <Text style={styles.infoText}>
          Esta tela representa como os alunos poderiam conversar após encontrar
          um pedido de ajuda ou uma oferta de monitoria.
        </Text>
      </View>

      {conversas.map((item) => (
        <View key={item.id} style={styles.messageCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{gerarIniciais(item.nome)}</Text>
          </View>

          <View style={styles.messageContent}>
            <View style={styles.messageTop}>
              <Text style={styles.name}>{item.nome}</Text>
              <Text style={styles.time}>{item.horario}</Text>
            </View>

            <Text style={styles.subject}>{item.materia}</Text>
            <Text style={styles.message}>{item.mensagem}</Text>

            <Pressable style={styles.replyButton}>
              <Text style={styles.replyButtonText}>Responder</Text>
            </Pressable>
          </View>
        </View>
      ))}

      <View style={styles.noteCard}>
        <Text style={styles.noteIcon}>ℹ️</Text>
        <Text style={styles.noteText}>
          Para o trabalho, esta tela serve como demonstração de uma funcionalidade futura.
          O CRUD principal continua nos pedidos e monitorias.
        </Text>
      </View>

      <BottomNav navigation={navigation} active="Mensagens" />
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

  header: {
    backgroundColor: '#9B6DFF',
    borderRadius: 34,
    padding: 24,
    marginBottom: 18,
  },

  headerIcon: {
    fontSize: 36,
    marginBottom: 10,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '300',
  },

  subtitle: {
    color: '#F4EEFF',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
  },

  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E7D9FF',
    marginBottom: 16,
  },

  infoTitle: {
    color: '#2B2142',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  infoText: {
    color: '#6C5A8C',
    fontSize: 15,
    lineHeight: 23,
  },

  messageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E7D9FF',
    flexDirection: 'row',
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#F2E9FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#D9C3FF',
    marginRight: 12,
  },

  avatarText: {
    color: '#8A5CF6',
    fontWeight: 'bold',
    fontSize: 16,
  },

  messageContent: {
    flex: 1,
  },

  messageTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  name: {
    color: '#2B2142',
    fontSize: 17,
    fontWeight: 'bold',
  },

  time: {
    color: '#9D8DBA',
    fontSize: 12,
    fontWeight: 'bold',
  },

  subject: {
    color: '#9B6DFF',
    fontWeight: 'bold',
    marginTop: 4,
    marginBottom: 8,
  },

  message: {
    color: '#6C5A8C',
    fontSize: 14,
    lineHeight: 21,
  },

  replyButton: {
    backgroundColor: '#F4EEFF',
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignSelf: 'flex-start',
    marginTop: 12,
  },

  replyButtonText: {
    color: '#8A5CF6',
    fontWeight: 'bold',
  },

  noteCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E7D9FF',
    marginBottom: 16,
    flexDirection: 'row',
  },

  noteIcon: {
    fontSize: 24,
    marginRight: 10,
  },

  noteText: {
    flex: 1,
    color: '#6C5A8C',
    fontSize: 14,
    lineHeight: 22,
  },
});