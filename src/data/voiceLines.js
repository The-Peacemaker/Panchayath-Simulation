// 🎙️ VOICE LINE SLOT MAP — Panchayat President Simulator
//
// Recorded Malayalam comedic audios live in:  public/voice/
// (Originals kept in src/audios/. Filenames here MUST match public/voice/ exactly.)
//
// FALLBACK BEHAVIOR (when a file is missing or empty):
//   The game speaks VOICE_TEXT[key] via Malayalam TTS instead,
//   so every screen works even before you record. Screens may also
//   pass their own Malayalam text which takes priority as fallback.
//   Slots with NO fallback text stay silent when the file is missing.

export const VOICE_LINES = {
  // ---- Global / ceremony lines ----
  welcome: 'welcome.mp3',                       // HomeScreen "സ്വാഗത സന്ദേശം" button ✅ recorded
  oath_read: 'oath.mp3',                        // OathScreen "വായിക്കൂ" button (TTS for now)
  oath_complete: 'oath_complete.mp3',           // Plays on Day 1 arrival, then chains Day 1 briefing ✅ recorded
  day_transition: 'day_transition.mp3',         // Finale bridge: Day 5 -> verdict, then chains ending speech ✅ recorded
  morning_call: 'morning.mp3',                  // Spare slot (currently unused)
  timer_panic: 'timer_panic.mp3',               // Fires once when timer hits 10s (TTS for now)
  catchphrase: 'kuttappan_catchphrase.mp3',     // Spare slot (currently unused)
  victory_laugh: 'victory_laugh.mp3',           // Spare slot (currently unused)
  defeat_sigh: 'defeat_sigh.mp3',               // Spare slot (currently unused)

  // ---- Day briefings (Kuttappan bursts in, chained after intro sting) ----
  day0_brief: 'day1_brief.mp3',                 // Water crisis (TTS for now)
  day1_brief: 'day2_brief.mp3',                 // Street dogs (TTS for now)
  day2_brief: 'day3_brief.mp3',                 // Power cut (TTS for now)
  day3_brief: 'day4_brief.mp3',                 // Wedding hall (TTS for now)
  day4_brief: 'day5_brief.mp3',                 // Collector visit (TTS for now)
  day5_brief: 'day6_brief.mp3',                 // Festival fund (TTS for now)

  // ---- Option reactions (Kuttappan roasts / praises your choice) ----
  day0_A: 'day1_A.mp3',
  day0_B: 'day1_B.mp3',
  day0_C: 'day1_C.mp3',
  day0_D: 'day1_D.mp3',
  day0_timeout: 'day1_timeout.mp3',

  day1_A: 'day2_A.mp3',
  day1_B: 'day2_B.mp3',
  day1_C: 'day2_C.mp3',
  day1_D: 'day2_D.mp3',
  day1_timeout: 'day2_timeout.mp3',

  day2_A: 'day3_A.mp3',
  day2_B: 'day3_B.mp3',
  day2_C: 'day3_C.mp3',
  day2_D: 'day3_D.mp3',
  day2_timeout: 'day3_timeout.mp3',

  day3_A: 'day4_A.mp3',
  day3_B: 'day4_B.mp3',
  day3_C: 'day4_C.mp3',
  day3_D: 'day4_D.mp3',
  day3_timeout: 'day4_timeout.mp3',

  day4_A: 'day5_A.mp3',
  day4_B: 'day5_B.mp3',
  day4_C: 'day5_C.mp3',
  day4_D: 'day5_D.mp3',
  day4_timeout: 'day5_timeout.mp3',

  day5_A: 'day6_A.mp3',
  day5_B: 'day6_B.mp3',
  day5_C: 'day6_C.mp3',
  day5_D: 'day6_D.mp3',
  day5_timeout: 'day6_timeout.mp3',

  // ---- Verdict stingers (auto-played after the reaction, by verdict) ----
  wrong_1: 'wrong_1.mp3',                      // ✅ recorded — rotates on BAD choices
  wrong_2: 'wrong_2.mp3',                      // ✅ recorded — rotates on BAD choices
  wrong_3: 'wrong_3.mp3',                      // ✅ recorded — rotates on BAD choices
  correct_1: 'correct_1.mp3',                  // ✅ recorded — rotates on GOOD choices
  correct_2: 'correct_2.mp3',                  // ✅ recorded — rotates on GOOD choices
  correct_3: 'correct_3.mp3',                  // ✅ recorded — rotates on GOOD choices

  // ---- Ending speeches ----
  ending_hero: 'ending_hero.mp3',               // ജനനായകൻ ✅ recorded
  ending_corrupt: 'ending_corrupt.mp3',         // കമ്മീഷൻ രാജാവ് (TTS for now)
  ending_escape_gulf: 'ending_gulf.mp3',        // ഗൾഫ് പ്രസിഡന്റ് ✅ recorded
  ending_unworthy: 'ending_unworthy.mp3',       // യോഗ്യനല്ല ✅ recorded
};

// ---- TTS fallback text (used only when the mp3 is missing) ----
// Keep these SHORT — they're the robot-voice safety net.
// NOTE: no entries for wrong_* / correct_* → those stay silent if missing.
export const VOICE_TEXT = {
  welcome: 'അഭിനന്ദനങ്ങൾ! നിങ്ങൾ ചക്കുംവള പഞ്ചായത്തിന്റെ പുതിയ പ്രസിഡന്റ്! അഞ്ച് ദിവസം പിടിച്ചുനിൽക്കുക!',
  oath_read: 'ഞാൻ ചക്കുംവള പഞ്ചായത്തിന്റെ പുതിയ പ്രസിഡന്റായി സത്യപ്രതിജ്ഞ ചെയ്യുന്നു! എല്ലാ കുറ്റങ്ങളും മുൻ പ്രസിഡന്റിന്റെ തലയിൽ ഇടും!',
  oath_complete: 'സത്യപ്രതിജ്ഞ കഴിഞ്ഞു! ഭരണം തുടങ്ങാം!',
  day_transition: 'അവസാന വിധി വരുന്നു!',
  morning_call: 'ചക്കുംവളയിൽ ഒരു പുതിയ പ്രഭാതം! കുട്ടപ്പൻ ഫയലുമായി വരുന്നു!',
  timer_panic: 'സമയം തീരാറായി സർ! വേഗം തീരുമാനിക്കൂ! മൗനം ദുരന്തമാണ്!',
  catchphrase: 'ഫയൽ റെഡി സർ! ഒപ്പിടൂ സർ!',
  victory_laugh: 'ഹ ഹ ഹ! പ്രസിഡന്റ് ജയിച്ചു!',
  defeat_sigh: 'അയ്യോ... കസേര പോയി...',
  ending_hero: 'അഭിനന്ദനങ്ങൾ! നിങ്ങൾ ജനനായകൻ! ജങ്ഷനിൽ പ്രതിമ ഉയർന്നു!',
  ending_corrupt: 'ഖജനാവ് നിറഞ്ഞു! ജനങ്ങൾ ദേഷ്യത്തിൽ! കമ്മീഷൻ രാജാവ്!',
  ending_escape_gulf: 'എങ്ങനെയോ രക്ഷപ്പെട്ടു! ദുബായ് വിമാനം കാത്തിരിക്കുന്നു!',
  ending_unworthy: 'യോഗ്യനല്ല! കസേര കുട്ടപ്പന്! നിങ്ങൾ പുറത്താക്കപ്പെട്ടു!',
};

// Priority recording order for what is still missing.
export const VOICE_PRIORITY = [
  'oath_read',
  'timer_panic',
  'day0_brief',
  'day1_brief',
  'day2_brief',
  'day3_brief',
  'day4_brief',
  'day5_brief',
  'ending_corrupt',
];
