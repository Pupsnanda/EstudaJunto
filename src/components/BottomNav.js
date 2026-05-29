import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function BottomNav({ navigation, active = 'Home' }) {
  function irParaFormulario() {
    navigation.navigate('Formulario', {
      tipoInicial: 'Preciso de monitoria',
    });
  }

  return (
    <View style={styles.bottomNav}>
      <Pressable
        style={styles.navButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={active === 'Home' ? styles.navIconActive : styles.navIcon}>
          ⌂
        </Text>
      </Pressable>

      <Pressable
        style={styles.navButton}
        onPress={() => navigation.navigate('Pedidos')}
      >
        <Text style={active === 'Pedidos' ? styles.navIconActive : styles.navIcon}>
          🔍
        </Text>
      </Pressable>

      <Pressable style={styles.centerButton} onPress={irParaFormulario}>
        <Text style={styles.centerButtonText}>＋</Text>
      </Pressable>

      <Pressable
        style={styles.navButton}
        onPress={() => navigation.navigate('Mensagens')}
      >
        <Text style={active === 'Mensagens' ? styles.navIconActive : styles.navIcon}>
          💬
        </Text>
      </Pressable>

      <Pressable
        style={styles.navButton}
        onPress={() => navigation.navigate('Perfil')}
      >
        <Text style={active === 'Perfil' ? styles.navIconActive : styles.navIcon}>
          ☰
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    width: '100%',
    maxWidth: 430,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E7D9FF',
  },

  navButton: {
    width: 42,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },

  navIcon: {
    fontSize: 20,
    color: '#8D7AAE',
  },

  navIconActive: {
    fontSize: 22,
    color: '#9B6DFF',
    fontWeight: 'bold',
  },

  centerButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#9B6DFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -28,
    borderWidth: 4,
    borderColor: '#EEE5FF',
  },

  centerButtonText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 30,
  },
});