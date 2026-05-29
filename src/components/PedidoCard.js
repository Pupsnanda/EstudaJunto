import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius } from '../theme';

export default function PedidoCard({ pedido, onPress }) {
  const isMonitor = pedido.tipo === 'Ofereço monitoria';
  const isResolvido = pedido.status === 'Resolvido';

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.header}>
        <View style={[styles.typeBadge, isMonitor ? styles.monitorBadge : styles.helpBadge]}>
          <Text style={styles.typeText}>{pedido.tipo}</Text>
        </View>
        <View style={[styles.statusBadge, isResolvido ? styles.doneBadge : styles.openBadge]}>
          <Text style={[styles.statusText, isResolvido ? styles.doneText : styles.openText]}>{pedido.status}</Text>
        </View>
      </View>

      <Text style={styles.title}>{pedido.materia}</Text>
      <Text style={styles.name}>Aluno: {pedido.nome}</Text>
      <Text numberOfLines={2} style={styles.description}>{pedido.descricao}</Text>

      <View style={styles.footer}>
        <Text style={styles.footerText}>🕒 {pedido.disponibilidade}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#0F172A',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  pressed: {
    opacity: 0.75,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  typeBadge: {
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 10,
    maxWidth: '65%',
  },
  monitorBadge: {
    backgroundColor: colors.softGreen,
  },
  helpBadge: {
    backgroundColor: colors.softBlue,
  },
  typeText: {
    color: colors.text,
    fontWeight: '800',
    fontSize: 12,
  },
  statusBadge: {
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  openBadge: {
    backgroundColor: colors.softYellow,
  },
  doneBadge: {
    backgroundColor: colors.softGreen,
  },
  statusText: {
    fontWeight: '900',
    fontSize: 12,
  },
  openText: {
    color: '#92400E',
  },
  doneText: {
    color: '#166534',
  },
  title: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: '900',
    color: colors.text,
  },
  name: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  description: {
    marginTop: 8,
    fontSize: 14,
    color: colors.muted,
    lineHeight: 20,
  },
  footer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  footerText: {
    color: colors.text,
    fontWeight: '700',
  },
});
