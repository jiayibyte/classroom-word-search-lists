# Classroom Word Search Vocabulary Lists (JSON & CSV)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A curated, classroom-safe dataset of **358 themed vocabulary words** organized across **10 popular K–12, seasonal, ESL/Spanish, and senior-friendly themes** and **30 difficulty tiers** (Easy, Standard, Challenge).

- **Turn any list into a printable PDF worksheet (free, no login, no watermark, automatic answer key):** [WordPuzzleGenerator.com](https://wordpuzzlegenerator.com/)

## What's Inside

Every theme includes three calibrated difficulty tiers with recommended grid sizes:
- **Easy (Grades K–2 / Beginners):** Shorter words for 10×10–12×12 forward-only grids.
- **Standard (Grades 3–6 / Classroom):** Core curriculum & holiday vocabulary for 14×14 grids.
- **Challenge (Teens & Adults):** Longer multisyllabic vocabulary for 16×16–18×18 all-direction grids.

All lists have been normalized to uppercase letters (including full Spanish `Ñ` and accented vowel support for the Spanish collection) and verified against a classroom-safe profanity filter.

## Theme Overview

| Theme (Interactive Printable Preset) | Category | Tier Breakdown | Total Words |
| :--- | :--- | :--- | ---: |
| [Halloween](https://wordpuzzlegenerator.com/word-search/halloween/) | Holiday & Seasonal | easy: 10 / standard: 12 / challenge: 14 | **36** |
| [Christmas](https://wordpuzzlegenerator.com/word-search/christmas/) | Holiday & Seasonal | easy: 10 / standard: 12 / challenge: 14 | **36** |
| [Thanksgiving](https://wordpuzzlegenerator.com/word-search/thanksgiving/) | Holiday & Seasonal | easy: 10 / standard: 12 / challenge: 14 | **36** |
| [Animals](https://wordpuzzlegenerator.com/word-search/animals/) | Kids & Nature | easy: 10 / standard: 12 / challenge: 14 | **36** |
| [Science](https://wordpuzzlegenerator.com/word-search/science/) | School & STEM | easy: 10 / standard: 12 / challenge: 14 | **36** |
| [Math Vocabulary](https://wordpuzzlegenerator.com/word-search/math/) | School & STEM | easy: 10 / standard: 12 / challenge: 14 | **36** |
| [Sight Words](https://wordpuzzlegenerator.com/word-search/sight-words/) | Early Literacy | easy: 10 / standard: 12 / challenge: 12 | **34** |
| [Bible](https://wordpuzzlegenerator.com/word-search/bible/) | Faith & Sunday School | easy: 10 / standard: 12 / challenge: 14 | **36** |
| [Large Print for Seniors](https://wordpuzzlegenerator.com/word-search/large-print-seniors/) | Seniors & Accessibility | easy: 10 / standard: 12 / challenge: 14 | **36** |
| [Spanish (Español)](https://wordpuzzlegenerator.com/word-search/spanish/) | World Languages | easy: 10 / standard: 12 / challenge: 14 | **36** |

## Files

- [`data/word-lists.json`](data/word-lists.json) — Nested JSON organized by theme → tier → word list, with recommended grid size, difficulty, and printable preset URLs.
- [`data/word-lists.csv`](data/word-lists.csv) — Flat spreadsheet-ready CSV (`theme_slug,theme_name,category,tier,tier_label,recommended_grid_size,difficulty,word,letter_count,interactive_url`).
- [`scripts/validate.mjs`](scripts/validate.mjs) — Automated schema, deduplication, character-set, and classroom-safety validator.

## Quick Usage

### Python (pandas)

```python
import pandas as pd

df = pd.read_csv("data/word-lists.csv")
science_standard = df[(df["theme_slug"] == "science") & (df["tier"] == "standard")]["word"].tolist()
print(science_standard)
```

### Node.js

```js
import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync('./data/word-lists.json', 'utf8'));
const animals = data.collections.find((c) => c.slug === 'animals');
console.log(animals.tiers[0].words);
```

### Validate Dataset

```bash
node scripts/validate.mjs
```

## License

MIT License — free for teachers, homeschoolers, KDP/printable creators, and open-source educational software.
