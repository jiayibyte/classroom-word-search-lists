import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const jsonData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/word-lists.json'), 'utf8'));
const csvLines = fs.readFileSync(path.resolve(__dirname, '../data/word-lists.csv'), 'utf8').trim().split('\n');

const BLOCKED_EXACT = new Set([
  'ANAL', 'ANUS', 'ARSE', 'ASS', 'BASTARD', 'BITCH', 'BOOB', 'BOOBS', 'CLIT', 'COCK',
  'CRAP', 'CUM', 'CUNT', 'DAMN', 'DICK', 'DILDO', 'FAG', 'FAGGOT', 'FART', 'FUCK',
  'HELL', 'HORNY', 'JERK', 'JIZZ', 'MILF', 'NAZI', 'PENIS', 'PISS', 'POOP', 'PORN',
  'PRICK', 'PUSSY', 'RAPE', 'SCUM', 'SEX', 'SEXY', 'SHIT', 'SLUT', 'SUCK', 'TIT',
  'TITS', 'TURD', 'TWAT', 'WANK', 'WHORE', 'WTF', 'XXX',
]);

let count = 0;
const validWordRegex = /^[A-ZÁÉÍÓÚÜÑ]+$/;

assert.equal(jsonData.collections.length, jsonData.total_themes);
assert.ok(jsonData.collections.length >= 10, 'Expected at least 10 curated themes');

for (const collection of jsonData.collections) {
  assert.ok(collection.slug && collection.name && collection.category);
  assert.ok(collection.tiers.length === 3, `Expected 3 difficulty tiers for ${collection.slug}`);
  for (const tier of collection.tiers) {
    const seen = new Set();
    assert.equal(tier.words.length, tier.word_count);
    for (const word of tier.words) {
      assert.match(word, validWordRegex, `Invalid word characters in ${collection.slug}/${tier.id}: ${word}`);
      assert.ok([...word].length >= 3, `Word too short: ${word}`);
      assert.ok(!seen.has(word), `Duplicate word "${word}" in ${collection.slug}/${tier.id}`);
      assert.ok(!BLOCKED_EXACT.has(word), `Blocked profanity word detected: ${word}`);
      seen.add(word);
      count++;
    }
  }
}

assert.equal(count, jsonData.total_words, 'JSON total_words mismatch');
assert.equal(csvLines.length - 1, count, 'CSV row count must equal JSON total_words');

console.log(`OK: Validated ${jsonData.total_themes} themes, ${jsonData.total_tiers} difficulty tiers, ${count} classroom-safe words (JSON + CSV).`);
