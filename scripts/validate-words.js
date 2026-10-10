// Sanity-checks data/words.js. Run with: npm run validate
const fs = require('fs');
const path = require('path');

const source = fs
  .readFileSync(path.join(__dirname, '..', 'data', 'words.js'), 'utf8')
  .replace('export default words;', 'module.exports = words;');
const module_ = { exports: {} };
new Function('module', source)(module_);
const words = module_.exports;

const problems = [];
for (const [word, { chunks, phones }] of Object.entries(words)) {
  if (word !== word.toLowerCase()) problems.push(`${word}: key must be lowercase`);
  if (chunks.join('') !== word) problems.push(`${word}: chunks ${JSON.stringify(chunks)} do not spell the word`);
  if (chunks.length !== phones.length) problems.push(`${word}: ${chunks.length} chunks but ${phones.length} phones`);
  if (phones.some((p) => p !== p.toUpperCase())) problems.push(`${word}: phones must be uppercase ARPAbet symbols`);
}

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(`OK: ${Object.keys(words).length} words validated.`);
