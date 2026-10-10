import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function Header({ title }) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#9c8210',
    paddingVertical: 14,
    alignItems: 'center',
  },
  title: { color: '#fff', fontSize: 20 },
});
