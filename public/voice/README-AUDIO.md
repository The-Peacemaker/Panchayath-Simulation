# 🎙️ Voice Audio Drop Zone — Panchayat President Simulator

Recorded Malayalam comedic audios live HERE (`public/voice/`).
Originals are kept in `src/audios/`. Filenames MUST match `src/data/voiceLines.js` exactly.
No code changes needed — the game auto-plays them. Missing/empty file? Robot Malayalam TTS covers it.

## Current status (13 wired, more to come)

| # | File | Where it plays | Status |
|---|------|----------------|--------|
| 1 | `welcome.mp3` | Home "സ്വാഗത സന്ദേശം" button | ✅ recorded |
| 2 | `oath_complete.mp3` | Day 1 arrival, then chains Day 1 briefing | ✅ recorded |
| 3 | `day_transition.mp3` | Finale bridge after Day 5, then chains verdict speech | ✅ recorded |
| 4 | `wrong_1/2/3.mp3` | Rotate after BAD choices | ✅ recorded |
| 5 | `correct_1/2/3.mp3` | Rotate after GOOD choices | ✅ recorded |
| 6 | `ending_hero.mp3` | ജനനായകൻ ending | ✅ recorded |
| 7 | `ending_gulf.mp3` | ഗൾഫ് പ്രസിഡന്റ് ending | ✅ recorded |
| 8 | `ending_unworthy.mp3` | യോഗ്യനല്ല ending | ✅ recorded |
| 9 | `oath.mp3` | Oath "വായിക്കൂ" button | ⏳ TTS for now |
| 10 | `timer_panic.mp3` | Once when timer hits 10s | ⏳ TTS for now |
| 11 | `day1_brief.mp3` … `day6_brief.mp3` | Kuttappan issue briefing each day | ⏳ TTS for now |
| 12 | `day1_A.mp3` … `day6_D.mp3` | Reaction to each option (24 clips) | ⏳ TTS for now |
| 13 | `day1_timeout.mp3` … `day6_timeout.mp3` | Timeout roast each day | ⏳ TTS for now |
| 14 | `ending_corrupt.mp3` | കമ്മീഷൻ രാജാവ് ending | ⏳ TTS for now |

## How the chains work

- **Day arrival:** Day 1 plays `oath_complete` then briefing; Days 2-5 go straight to briefing.
- **Finale:** fanfare/trombone → `day_transition` bridge → verdict speech.
- **After you decide:** reaction (TTS until recorded) → verdict sting (`wrong_1/2/3` rotate on bad, `correct_1/2/3` rotate on good, silence on chaotic).
- **Endings:** ending speech directly. Victory fanfare / sad trombone still layer underneath.

## Recording spec

- Format: **MP3**, 3–15 seconds per clip (briefings up to ~20s).
- Act it: Kuttappan = panicked clerk energy. Endings = dramatic.
- Keep volume roughly equal across clips.
