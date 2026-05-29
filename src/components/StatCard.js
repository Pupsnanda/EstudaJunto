import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius } from '../theme';

export default function StatCard({ label, value, tone = 'blue' }) {
  const toneStyle = {
    blue: styles.blue,
    green: styles.green,
    yellow: styles.yellow,
  }[tone];

  return (
    <View style={[styles.card, toneStyle]}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 100,
    borderRadius: radius.lg,
    padding: 16,
    margin: 5,
    borderWidth: 1,
    borderColor: colors.border,
  },
  blue: {
    backgroundColor: colors.softBlue,
  },
  green: {
    backgroundColor: colors.softGreen,
  },
  yellow: {
    backgroundColor: colors.softYellow,
  },
  value: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.text,
  },
  label: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: '700',
    color: colors.muted,
  },
});
