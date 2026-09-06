import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { INITIAL_STATS, SCENARIOS, ENDINGS } from '../data/scenarios';
import defaultPresidentPhoto from '../president-profile/president.jpg';
import {
  playConch,
  playVoice,
  playChenda,
  playStamp,
  playMorningJingle,
  playTick,
  playFailureHorn,
  playVictoryFanfare,
  speakMalayalam,
  setSoundEnabled,
  isSoundEnabled
} from '../utils/audio';

const STORAGE_KEY = 'chakkumvila_presidents_history_v1';
const PHOTO_KEY = 'chakkumvila_president_photo_v1';

const initialState = {
  screen: 'HOME', // 'HOME' | 'OATH' | 'DAY' | 'CONSEQUENCE' | 'ENDING'
  playerName: '',
  // Uploaded photo if present, otherwise the bundled default portrait
  playerPhoto: loadPhoto() || defaultPresidentPhoto,
  currentDayIndex: 0, // 0 to 4 (Day 1 to 5)
  stats: { ...INITIAL_STATS },
  statDeltas: { support: 0, treasury: 0, opposition: 0 },
  selectedOption: null,
  isTimeout: false,
  consequenceData: null,
  ending: null,
  history: [],
  audioOn: true,
  wallOfPresidents: []
};

function clamp(val, min = 0, max = 100) {
  return Math.min(Math.max(val, min), max);
}

function isDeadStats(stats) {
  return stats.support <= 0 || stats.treasury <= 0 || stats.opposition >= 100;
}

function calculateEnding(stats, isEarlyDeath) {
  if (isEarlyDeath) {
    return ENDINGS.UNWORTHY;
  }

  // Hero: Loved by people, treasury alive, opposition crushed.
  // No more winning with the opposition at your throat.
  if (stats.support >= 70 && stats.treasury >= 50 && stats.opposition <= 45) {
    return ENDINGS.HERO;
  }

  // Corrupt: Hated by people but the vault is full (evil genius path)
  if (stats.support <= 30 && stats.treasury >= 50) {
    return ENDINGS.CORRUPT;
  }

  // Escape to Gulf: weak support, empty treasury, or roaring opposition
  if (stats.support <= 30 || stats.treasury <= 30 || stats.opposition >= 70) {
    return ENDINGS.ESCAPE_GULF;
  }

  // Fallback: beloved but broke presidents don't get statues —
  // they get midnight flights (the Gulf ending is about debtors too)
  if (stats.support >= 50 && stats.treasury >= 40) {
    return ENDINGS.HERO;
  }
  return ENDINGS.ESCAPE_GULF;
}

function gameReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_AUDIO': {
      const nextAudio = !state.audioOn;
      setSoundEnabled(nextAudio);
      return { ...state, audioOn: nextAudio };
    }

    case 'START_OATH': {
      // Your recorded intro owns this moment (conch retired — it kept
      // getting mistaken for an elephant trumpet).
      playVoice('welcome', 'അഭിനന്ദനങ്ങൾ! നിങ്ങൾ ചക്കുംവള പഞ്ചായത്തിന്റെ പുതിയ പ്രസിഡന്റ്! അഞ്ച് ദിവസം പിടിച്ചുനിൽക്കുക!');
      return { ...state, screen: 'OATH' };
    }

    case 'SET_PLAYER_NAME': {
      return { ...state, playerName: action.payload };
    }

    case 'SET_PLAYER_PHOTO': {
      persistPhoto(action.payload);
      return { ...state, playerPhoto: action.payload };
    }

    case 'COMPLETE_OATH': {
      playStamp();
      const finalName = (state.playerName || '').trim() || 'സുരേന്ദ്രൻ പിള്ള';
      return {
        ...state,
        playerName: finalName,
        screen: 'DAY',
        currentDayIndex: 0,
        stats: { ...INITIAL_STATS },
        statDeltas: { support: 0, treasury: 0, opposition: 0 },
        history: []
      };
    }

    case 'MAKE_CHOICE': {
      const { option, isTimeout = false } = action.payload;
      const currentScenario = SCENARIOS[state.currentDayIndex];
      const outcome = isTimeout ? currentScenario.timeoutOutcome : option;

      const deltas = outcome.changes || { support: 0, treasury: 0, opposition: 0 };
      const nextStats = {
        support: clamp(state.stats.support + (deltas.support || 0)),
        treasury: clamp(state.stats.treasury + (deltas.treasury || 0)),
        opposition: clamp(state.stats.opposition + (deltas.opposition || 0))
      };

      playChenda();

      // Check if the government collapsed
      const isDead = isDeadStats(nextStats);

      const consequence = {
        isTimeout,
        headline: outcome.headline,
        consequence: outcome.consequence,
        deltas,
        isDead
      };

      return {
        ...state,
        screen: 'CONSEQUENCE',
        stats: nextStats,
        statDeltas: deltas,
        selectedOption: option,
        isTimeout,
        consequenceData: consequence,
        history: [
          ...state.history,
          {
            day: state.currentDayIndex + 1,
            scenario: currentScenario.title,
            optionChosen: isTimeout ? 'നിസ്സംഗത (സമയപരിധി കഴിഞ്ഞു)' : option.text,
            headline: outcome.headline
          }
        ]
      };
    }

    case 'CONTINUE_FROM_CONSEQUENCE': {
      // If dead, jump to UNWORTHY ending
      // (EndingScreen owns all finale audio: trombone -> bridge -> speech)
      if (isDeadStats(state.stats)) {
        const ending = ENDINGS.UNWORTHY;
        saveToWallOfPresidents(state.playerName, ending, state.stats, state.currentDayIndex + 1);
        return {
          ...state,
          screen: 'ENDING',
          ending
        };
      }

      // Check if day 5 was just finished
      // (EndingScreen owns all finale audio: fanfare/trombone -> bridge -> speech)
      if (state.currentDayIndex >= 4) {
        const ending = calculateEnding(state.stats, false);
        saveToWallOfPresidents(state.playerName, ending, state.stats, 5);
        return {
          ...state,
          screen: 'ENDING',
          ending
        };
      }

      // Advance to next day
      playMorningJingle();
      return {
        ...state,
        currentDayIndex: state.currentDayIndex + 1,
        screen: 'DAY',
        statDeltas: { support: 0, treasury: 0, opposition: 0 },
        selectedOption: null,
        isTimeout: false,
        consequenceData: null
      };
    }

    case 'RESTART_GAME': {
      return {
        ...initialState,
        playerName: state.playerName,
        playerPhoto: state.playerPhoto || getStoredPhoto(),
        audioOn: state.audioOn,
        wallOfPresidents: getStoredPresidents()
      };
    }

    case 'LOAD_WALL': {
      return { ...state, wallOfPresidents: action.payload };
    }

    default:
      return state;
  }
}

function loadPhoto() {
  return getStoredPhoto();
}

function getStoredPhoto() {
  try {
    return localStorage.getItem(PHOTO_KEY) || '';
  } catch (e) {
    return '';
  }
}

function persistPhoto(dataUrl) {
  try {
    // Never persist the bundled default portrait (its hashed URL changes per
    // build) — only real uploads. A blank value resolves to default at runtime.
    if (dataUrl && dataUrl !== defaultPresidentPhoto) {
      localStorage.setItem(PHOTO_KEY, dataUrl);
    } else {
      localStorage.removeItem(PHOTO_KEY);
    }
  } catch (e) {
    console.warn('Photo storage error', e);
  }
}

function getStoredPresidents() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveToWallOfPresidents(name, ending, stats, daysSurvived) {
  try {
    const existing = getStoredPresidents();
    const entry = {
      id: Date.now(),
      name: name || 'അജ്ഞാതൻ',
      photo: getStoredPhoto() || '',
      endingTitle: ending.malayalamTitle,
      endingType: ending.type,
      daysSurvived,
      support: stats.support,
      treasury: stats.treasury,
      opposition: stats.opposition,
      date: new Date().toLocaleDateString('ml-IN', { month: 'short', day: 'numeric' })
    };
    const updated = [entry, ...existing].slice(0, 15);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn("Storage error", e);
  }
}

const GameContext = createContext();

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    const wall = getStoredPresidents();
    dispatch({ type: 'LOAD_WALL', payload: wall });
  }, []);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) {
    throw new Error('useGame must be used within GameProvider');
  }
  return ctx;
}
