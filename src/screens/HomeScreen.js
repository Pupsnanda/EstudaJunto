import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { initDatabase, obterResumo } from '../database/database';
import BottomNav from '../components/BottomNav';

export default function HomeScreen({ navigation }) {
  const [carregando, setCarregando] = useState(true);
  const [resumo, setResumo] = useState({
    total: 0,
    abertos: 0,
    resolvidos: 0,
    monitores: 0,
  });

  const carregarResumo = useCallback(async () => {
    try {
      setCarregando(true);

      await initDatabase();

      const dados = await obterResumo();

      setResumo({
        total: dados?.total || 0,
        abertos: dados?.abertos || 0,
        resolvidos: dados?.resolvidos || 0,
        monitores: dados?.monitores || 0,
      });
    } catch (error) {
      console.log('Erro ao carregar resumo:', error);

      setResumo({
        total: 0,
        abertos: 0,
        resolvidos: 0,
        monitores: 0,
      });
    } finally {
      setCarregando(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarResumo();
    }, [carregarResumo])
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.phoneCard}>
        <View style={styles.topBar}>
          <Text style={styles.timeText}>10:30 AM</Text>
          <Text style={styles.batteryText}>100%</Text>
        </View>

        <View style={styles.hero}>
          <Text style={styles.appName}>EstudaJunto</Text>
          <Text style={styles.appSubtitle}>Rede de monitoria entre alunos</Text>

          <View style={styles.avatarArea}>
            <View style={styles.avatarBackLarge} />
            <View style={styles.avatarBackSmall} />

            <View style={styles.avatarCircle}>
              <Text style={styles.avatarIcon}>🎓</Text>
            </View>
          </View>

          <Text style={styles.heroText}>
            Encontre ajuda, ofereça monitoria e acompanhe seus estudos em uma rede
            colaborativa.
          </Text>

          <Pressable
            style={styles.getStartedButton}
            onPress={() => navigation.navigate('Pedidos')}
          >
            <Text style={styles.getStartedText}>COMEÇAR</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.summaryArea}>
        <Text style={styles.sectionTitle}>Resumo da plataforma</Text>

        {carregando ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#9B6DFF" />
            <Text style={styles.loadingText}>Carregando dados...</Text>
          </View>
        ) : (
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>📚</Text>
              <Text style={styles.statNumber}>{resumo.total}</Text>
              <Text style={styles.statLabel}>Registros</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statIcon}>🟣</Text>
              <Text style={styles.statNumber}>{resumo.abertos}</Text>
              <Text style={styles.statLabel}>Abertos</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statIcon}>👥</Text>
              <Text style={styles.statNumber}>{resumo.monitores}</Text>
              <Text style={styles.statLabel}>Monitores</Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.actionsCard}>
        <Text style={styles.actionsTitle}>O que você deseja fazer?</Text>

        <Pressable
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Pedidos')}
        >
          <Text style={styles.primaryButtonText}>Ver pedidos e monitorias</Text>
        </Pressable>

        <Pressable
          style={styles.secondaryButton}
          onPress={() =>
            navigation.navigate('Formulario', {
              tipoInicial: 'Preciso de monitoria',
            })
          }
        >
          <Text style={styles.secondaryButtonText}>Cadastrar pedido de ajuda</Text>
        </Pressable>

        <Pressable
          style={styles.lightButton}
          onPress={() =>
            navigation.navigate('Formulario', {
              tipoInicial: 'Ofereço monitoria',
            })
          }
        >
          <Text style={styles.lightButtonText}>Oferecer monitoria</Text>
        </Pressable>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.infoHeader}>
          <Text style={styles.infoIcon}>💡</Text>
          <Text style={styles.infoTitle}>Impacto social</Text>
        </View>

        <Text style={styles.infoText}>
          O EstudaJunto conecta alunos que precisam de ajuda com colegas que podem
          oferecer monitoria. A proposta incentiva colaboração, inclusão e melhora
          do desempenho escolar.
        </Text>
      </View>

      <BottomNav navigation={navigation} active="Home" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE5FF',
  },

  content: {
    padding: 18,
    paddingBottom: 32,
    alignItems: 'center',
  },

  phoneCard: {
    width: '100%',
    maxWidth: 430,
    backgroundColor: '#9B6DFF',
    borderRadius: 36,
    padding: 18,
    marginBottom: 20,
    borderWidth: 6,
    borderColor: '#FFFFFF',
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 6,
  },

  timeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },

  batteryText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },

  hero: {
    alignItems: 'center',
    paddingBottom: 20,
  },

  appName: {
    fontSize: 34,
    color: '#FFFFFF',
    fontWeight: '300',
    letterSpacing: 1,
    marginTop: 10,
  },

  appSubtitle: {
    color: '#F4EEFF',
    fontSize: 14,
    marginTop: 8,
    fontWeight: '600',
  },

  avatarArea: {
    width: 170,
    height: 170,
    marginTop: 22,
    marginBottom: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarBackLarge: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#FFFFFF',
    opacity: 0.95,
  },

  avatarBackSmall: {
    position: 'absolute',
    width: 105,
    height: 105,
    borderRadius: 55,
    backgroundColor: '#F4EEFF',
  },

  avatarCircle: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#20212C',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarIcon: {
    fontSize: 38,
  },

  heroText: {
    color: '#F9F6FF',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 21,
    paddingHorizontal: 14,
    marginBottom: 22,
  },

  getStartedButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 48,
    borderRadius: 30,
  },

  getStartedText: {
    color: '#8A5CF6',
    fontWeight: 'bold',
    fontSize: 13,
    letterSpacing: 1,
  },

  summaryArea: {
    width: '100%',
    maxWidth: 760,
    marginBottom: 16,
  },

  sectionTitle: {
    color: '#2B2142',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  loadingBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 26,
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 10,
    color: '#7B6B9D',
  },

  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    alignItems: 'center',
    marginHorizontal: 4,
  },

  statIcon: {
    fontSize: 22,
    marginBottom: 8,
  },

  statNumber: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#8A5CF6',
  },

  statLabel: {
    fontSize: 12,
    color: '#7B6B9D',
    marginTop: 4,
    fontWeight: '600',
  },

  actionsCard: {
    width: '100%',
    maxWidth: 760,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 18,
    marginBottom: 16,
  },

  actionsTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#2B2142',
    marginBottom: 14,
  },

  primaryButton: {
    backgroundColor: '#9B6DFF',
    borderRadius: 22,
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
    backgroundColor: '#2B2142',
    borderRadius: 22,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },

  secondaryButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },

  lightButton: {
    backgroundColor: '#F4EEFF',
    borderRadius: 22,
    paddingVertical: 16,
    alignItems: 'center',
  },

  lightButtonText: {
    color: '#8A5CF6',
    fontWeight: 'bold',
    fontSize: 15,
  },

  infoCard: {
    width: '100%',
    maxWidth: 760,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 20,
    marginBottom: 16,
  },

  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  infoIcon: {
    fontSize: 24,
    marginRight: 10,
  },

  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2B2142',
  },

  infoText: {
    color: '#6C5A8C',
    fontSize: 15,
    lineHeight: 23,
  },
});