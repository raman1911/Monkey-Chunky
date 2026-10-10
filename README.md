🐵 Monkey Chunky

A mobile app that helps early readers sound out words. Type a word, see it broken into phonic chunks, and tap each chunk to hear its sound.

Why I built this

Learning to read starts with connecting letters to sounds. Monkey Chunky makes that connection visible and tappable, so a child can break a new word into small pieces and say each piece out loud.

Features
Word chunking: splits a word into phonic chunks, for example, that → th · a · t
Tap to hear: every chunk is a button that speaks its sound
Visual feedback: the tapped chunk highlights
Easy input: works with the keyboard's Go key or the on-screen GO button
Friendly errors: a clear message when a word isn't in the list yet
Extendable: the word list is plain data and easy to grow (65 words so far)
Safe-area aware: layout respects phone notches and status bars
Tech stack
	
Framework	React Native with Expo
Language	JavaScript (function components and hooks)
Sound	expo-speech (text-to-speech)
Layout	react-native-safe-area-context, expo-status-bar
How it works
The user types a word and presses GO.
The app looks the word up in data/words.js, which maps each word to its chunks and phones.
Each chunk becomes a PhonicSoundButton.
Tapping a button looks up what the voice should say for that phone in data/phoneSpeech.js and speaks it.
js
// data/words.js
that: { chunks: ['th', 'a', 't'], phones: ['DH', 'AE', 'T'] },

// data/phoneSpeech.js
DH: 'thuh', AE: 'aa', T: 'tuh',
Run it locally

You need Node.js (LTS).

bash
git clone https://github.com/<your-username>/monkey-chunky-phonics-app.git
cd monkey-chunky-phonics-app
npm install
npx expo install --fix   # aligns packages to the installed Expo SDK
npx expo start

Then scan the QR code with Expo Go, or press w for the web preview.

Project structure
App.js                           Main screen: input, GO button, chunk list
components/
  Header.js                      Title bar
  PhonicSoundButton.js           One tappable chunk that speaks its sound
data/
  words.js                       Word → chunks and phones
  phoneSpeech.js                 Phone → what the voice says
scripts/
  validate-words.js              Checks the word list is consistent
Adding words

Add an entry to data/words.js:

js
cat: { chunks: ['c', 'a', 't'], phones: ['K', 'AE', 'T'] },
chunks must spell the word when joined.
phones needs one symbol per chunk.
If you use a new phone symbol, add its spoken form to data/phoneSpeech.js.
Run npm run validate to catch mistakes.
Known limitations
Sounds come from the phone's built-in text-to-speech voice, so pronunciation varies by device and isn't as precise as recorded phonemes.
Only the words in data/words.js are supported.
Roadmap
 Replace text-to-speech with recorded phoneme audio bundled in the app
 Look up unknown words through a free dictionary API
 Add a "hear the whole word" button
 Track which words a child has practised

Live demo: https://snack.expo.dev/@ramneet_kaur/monkey-chunky-phonics-app

Author
Ramneet Kaur 
