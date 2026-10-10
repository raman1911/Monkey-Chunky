import * as React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Speech from 'expo-speech';
import phoneSpeech from '../data/phoneSpeech';

export default function PhonicSoundButton({ wordChunk, soundChunk, isActive, onPress }) {
  const handlePress = () => {
    onPress();
    Speech.stop();
    Speech.speak(phoneSpeech[soundChunk] || wordChunk, { language: 'en-US', rate: 0.6 });
  };

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={`Play the sound for ${wordChunk}`}
      style={[styles.chunkButton, isActive ? styles.active : styles.inactive]}
      onPress={handlePress}>
      <Text style={[styles.chunkText, isActive ? styles.activeText : styles.inactiveText]}>
        {wordChunk}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chunkButton: {
    width: '60%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    margin: 5,
  },
  inactive: { backgroundColor: 'red' },
  active: { backgroundColor: 'white' },
  chunkText: { textAlign: 'center', fontSize: 30 },
  inactiveText: { color: 'white' },
  activeText: { color: 'red' },
});
