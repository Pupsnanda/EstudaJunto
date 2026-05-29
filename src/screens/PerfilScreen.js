import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import BottomNav from '../components/BottomNav';

export default function PerfilScreen({ navigation }) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarLarge}>
          <Text style={styles.avatarText}>EJ</Text>
        </View>

        <Text style={styles.name}>EstudaJunto</Text>
        <Text style={styles.role}>Monitoria colaborativa entre alunos</Text>

        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>Projeto educacional</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Sobre o aplicativo</Text>

        <Text style={styles.cardText}>
          O EstudaJunto é um aplicativo criado para conectar alunos que precisam
          de ajuda com colegas que podem oferecer monitoria em diferentes matérias.
        </Text>

        <Text style={styles.cardText}>
          A proposta tem impacto social porque incentiva colaboração, inclusão,
          troca de conhecimento e apoio educacional entre estudantes.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Funcionalidades</Text>

        <View style={styles.featureItem}>
          <Text style={styles.featureIcon}>📌</Text>
          <Text style={styles.featureText}>Cadastro de pedidos de ajuda.</Text>
        </View>

        <View style={styles.featureItem}>
          <Text style={styles.featureIcon}>🎓</Text>
          <Text style={styles.featureText}>Cadastro de ofertas de monitoria.</Text>
        </View>

        <View style={styles.featureItem}>
          <Text style={styles.featureIcon}>🔍</Text>
          <Text style={styles.featureText}>Busca e filtro por status.</Text>
        </View>

        <View style={styles.featureItem}>
          <Text style={styles.featureIcon}>✏️</Text>
          <Text style={styles.featureText}>Editar, resolver e excluir cadastros.</Text>
        </View>

        <View style={styles.featureItem}>
          <Text style={styles.featureIcon}>💾</Text>
          <Text style={styles.featureText}>Persistência de dados com banco local.</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Tecnologias usadas</Text>

        <View style={styles.techRow}>
          <Text style={styles.techBadge}>React Native</Text>
          <Text style={styles.techBadge}>Expo</Text>
        </View>

        <View style={styles.techRow}>
          <Text style={styles.techBadge}>React Navigation</Text>
          <Text style={styles.techBadge}>Dexie.js</Text>
        </View>

        <View style={styles.techRow}>
          <Text style={styles.techBadge}>CRUD</Text>
          <Text style={styles.techBadge}>Hooks</Text>
        </View>
      </View>

      <View style={styles.actionsCard}>
        <Text style={styles.cardTitle}>Acesso rápido</Text>

        <Pressable
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Pedidos')}
        >
          <Text style={styles.primaryButtonText}>Ver comunidade</Text>
        </Pressable>

        <Pressable
          style={styles.secondaryButton}
          onPress={() =>
            navigation.navigate('Formulario', {
              tipoInicial: 'Preciso de monitoria',
            })
          }
        >
          <Text style={styles.secondaryButtonText}>Criar novo cadastro</Text>
        </Pressable>
      </View>

      <BottomNav navigation={navigation} active="Perfil" />
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

  profileHeader: {
    backgroundColor: '#9B6DFF',
    borderRadius: 36,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },

  avatarLarge: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 8,
    borderColor: '#C7A8FF',
    marginBottom: 14,
  },

  avatarText: {
    color: '#8A5CF6',
    fontSize: 36,
    fontWeight: 'bold',
  },

  name: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '300',
  },

  role: {
    color: '#F4EEFF',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 6,
  },

  statusBadge: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingVertical: 9,
    paddingHorizontal: 18,
    marginTop: 18,
  },

  statusText: {
    color: '#8A5CF6',
    fontWeight: 'bold',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E7D9FF',
    marginBottom: 16,
  },

  actionsCard: {
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
    marginBottom: 12,
  },

  cardText: {
    color: '#6C5A8C',
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 10,
  },

  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  featureIcon: {
    fontSize: 20,
    marginRight: 10,
  },

  featureText: {
    color: '#6C5A8C',
    fontSize: 15,
    flex: 1,
  },

  techRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },

  techBadge: {
    backgroundColor: '#F4EEFF',
    color: '#8A5CF6',
    fontWeight: 'bold',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 18,
    marginRight: 8,
    overflow: 'hidden',
  },

  primaryButton: {
    backgroundColor: '#9B6DFF',
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },

  secondaryButton: {
    backgroundColor: '#F4EEFF',
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center',
  },

  secondaryButtonText: {
    color: '#8A5CF6',
    fontWeight: 'bold',
    fontSize: 15,
  },
});