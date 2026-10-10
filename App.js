import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { setAudioModeAsync } from 'expo-audio';

import words from './data/words';
import Header from './components/Header';
import PhonicSoundButton from './components/PhonicSoundButton';

function HomeScreen() {
  const [text, setText] = React.useState('');
  const [entry, setEntry] = React.useState(null); // { chunks, phones } for the current word
  const [activeIndex, setActiveIndex] = React.useState(null);
  const [currentWord, setCurrentWord] = React.useState(''); // the word that was searched

  // Let sounds play even when an iPhone is on silent.
  React.useEffect(() => {
    setAudioModeAsync({ playsInSilentMode: true }).catch(() => {});
  }, []);

  const lookUpWord = () => {
    const word = text.toLowerCase().trim();
    const found = words[word];

    setActiveIndex(null);
    if (found) {
      setEntry(found);
      setCurrentWord(word);
    } else {
      setEntry(null);
      Alert.alert('Word not found', 'That word is not in our word list yet. Try another one.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Header title="Monkey Chunky" />

      <Text style={styles.monkey} accessibilityLabel="Monkey mascot">🐵</Text>

      <TextInput
        style={styles.inputBox}
        placeholder="Type a word"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="go"
        onChangeText={setText}
        onSubmitEditing={lookUpWord}
        value={text}
      />

      <TouchableOpacity style={styles.goButton} onPress={lookUpWord}>
        <Text style={styles.buttonText}>GO</Text>
      </TouchableOpacity>

      <View>
        {entry &&
          entry.chunks.map((chunk, index) => (
            <PhonicSoundButton
              key={`${chunk}-${index}`}
              word={currentWord}
              wordChunk={chunk}
              soundChunk={entry.phones[index]}
              isActive={activeIndex === index}
              onPress={() => setActiveIndex(index)}
            />
          ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#b8b8b8' },
  monkey: { fontSize: 96, textAlign: 'center', marginTop: 24 },
  inputBox: {
    marginTop: 30,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    backgroundColor: 'white',
  },
  goButton: { width: '50%', height: 55, alignSelf: 'center', padding: 10, margin: 10 },
  buttonText: { textAlign: 'center', fontSize: 30, fontWeight: 'bold' },
});

export default function App() {
  return (
    <SafeAreaProvider>
      <HomeScreen />
    </SafeAreaProvider>
  );
}
