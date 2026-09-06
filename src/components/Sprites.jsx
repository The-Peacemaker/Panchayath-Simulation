import React from 'react';

// Hand-drawn SVG sprite cast for Chakkumvila Panchayat.
// KuttappanFace moods: cool | worried | panic | shock | dead
// ElephantSprite moods: sleep | calm | wild

const SKIN = '#9C6642';
const SKIN_DARK = '#7C4F30';
const HAIR = '#211A13';
const GREY = '#A6AEBD';
const GREY_DARK = '#8D97A8';
const GREY_LIGHT = '#C3CAD6';

export function getKuttappanMood(stats) {
  if (stats.support <= 0 || stats.treasury <= 0 || stats.opposition >= 100) {
    return { mood: 'dead', label: 'കസേര എന്റേതായി!', quip: 'കസേര തയ്യാറാക്കൂ... എനിക്ക് വേണ്ടി!' };
  }
  if (stats.opposition >= 70) {
    return { mood: 'panic', label: 'പ്രതിപക്ഷം വളയുന്നു!', quip: 'സർ... എതിർപക്ഷം അവിശ്വാസ പ്രമേയം കൊണ്ടുവരും... ഓടിക്കോ...' };
  }
  if (stats.support <= 25) {
    return { mood: 'worried', label: 'പേടിച്ചിരിക്കുന്നു!', quip: 'സർ... നാട്ടുകാർ മുട്ടയുമായി വരുന്നു...' };
  }
  if (stats.treasury <= 25) {
    return { mood: 'shock', label: 'ഖജനാവ് കാലി!', quip: 'ഖജനാവിൽ എലി പോലും കടം വാങ്ങാൻ വരുന്നില്ല!' };
  }
  if (stats.opposition >= 50) {
    return { mood: 'worried', label: 'എതിർപക്ഷം ശക്തമാകുന്നു!', quip: 'എതിർപക്ഷം പോസ്റ്റർ ഒട്ടിച്ചു തുടങ്ങി... സൂക്ഷിക്കൂ...' };
  }
  return { mood: 'cool', label: 'കൂൾ ആയി നിരീക്ഷിക്കുന്നു', quip: 'ഫയൽ റെഡി സർ! ഒപ്പിടൂ സർ!' };
}

export function getElephantMood(opposition) {
  if (opposition >= 70) {
    return { mood: 'wild', label: 'പ്രതിപക്ഷത്തോടൊപ്പം!', wild: true };
  }
  if (opposition >= 40) {
    return { mood: 'calm', label: 'ശാന്തൻ', wild: false };
  }
  return { mood: 'sleep', label: 'ഉറങ്ങുന്നു...', wild: false };
}

function KuttappanEyes({ mood }) {
  if (mood === 'dead') {
    return (
      <g stroke={HAIR} strokeWidth="2.4" strokeLinecap="round">
        <line x1="24" y1="28" x2="30" y2="34" />
        <line x1="30" y1="28" x2="24" y2="34" />
        <line x1="42" y1="28" x2="48" y2="34" />
        <line x1="48" y1="28" x2="42" y2="34" />
      </g>
    );
  }
  if (mood === 'shock') {
    return (
      <g>
        <ellipse cx="27" cy="31" rx="5" ry="6" fill="#FFF" />
        <ellipse cx="45" cy="31" rx="5" ry="6" fill="#FFF" />
        <circle cx="27" cy="32" r="1.6" fill={HAIR} />
        <circle cx="45" cy="32" r="1.6" fill={HAIR} />
      </g>
    );
  }
  const pupilShift = mood === 'worried' ? -1.2 : 0;
  const pupilR = mood === 'panic' ? 1.4 : 2;
  return (
    <g>
      <ellipse cx="27" cy="31" rx="4" ry="5" fill="#FFF" />
      <ellipse cx="45" cy="31" rx="4" ry="5" fill="#FFF" />
      <circle cx="27" cy={31 + pupilShift} r={pupilR} fill={HAIR} />
      <circle cx="45" cy={31 + pupilShift} r={pupilR} fill={HAIR} />
      {mood === 'cool' && (
        <g fill="#FFF">
          <circle cx="27.8" cy="30" r="0.7" />
          <circle cx="45.8" cy="30" r="0.7" />
        </g>
      )}
    </g>
  );
}

function KuttappanBrows({ mood }) {
  if (mood === 'dead') return null;
  if (mood === 'worried' || mood === 'panic') {
    return (
      <g stroke={HAIR} strokeWidth="2.2" strokeLinecap="round">
        <line x1="22" y1="24" x2="31" y2="27" />
        <line x1="50" y1="24" x2="41" y2="27" />
      </g>
    );
  }
  if (mood === 'shock') {
    return (
      <g stroke={HAIR} strokeWidth="2" strokeLinecap="round" fill="none">
        <path d="M22 22 Q27 19 32 21" />
        <path d="M40 21 Q45 19 50 22" />
      </g>
    );
  }
  return (
    <g stroke={HAIR} strokeWidth="2.2" strokeLinecap="round">
      <line x1="22" y1="24" x2="32" y2="24" />
      <line x1="40" y1="24" x2="50" y2="24" />
    </g>
  );
}

function KuttappanMouth({ mood }) {
  if (mood === 'panic') {
    return <ellipse cx="36" cy="56" rx="3.4" ry="4.4" fill="#5B2113" />;
  }
  if (mood === 'shock') {
    return <circle cx="36" cy="56" r="2.6" fill="#5B2113" />;
  }
  if (mood === 'cool') {
    return (
      <path d="M30 54 Q36 59 42 54" stroke={HAIR} strokeWidth="2.2" fill="none" strokeLinecap="round" />
    );
  }
  return (
    <line x1="30" y1="55" x2="42" y2="55" stroke={HAIR} strokeWidth="2.2" strokeLinecap="round" />
  );
}

export function KuttappanFace({ mood = 'cool', className = 'w-14 h-14' }) {
  return (
    <svg viewBox="0 0 72 76" className={`${className} select-none`} role="img" aria-label="കുട്ടപ്പൻ">
      {/* shirt shoulders */}
      <path d="M14 76 C14 62 23 56 36 56 C49 56 58 62 58 76 Z" fill="#F3EFE2" />
      <path d="M31 57 L36 63 L41 57" fill="none" stroke="#C9BFA6" strokeWidth="2" />
      {/* pen in pocket */}
      <rect x="46" y="64" width="3" height="9" rx="1" fill="#B91C1C" />
      {/* neck */}
      <rect x="30" y="46" width="12" height="12" rx="3" fill={SKIN_DARK} />
      {/* ears */}
      <circle cx="17" cy="33" r="4.5" fill={SKIN} />
      <circle cx="55" cy="33" r="4.5" fill={SKIN} />
      {/* head */}
      <circle cx="36" cy="32" r="19" fill={SKIN} />
      {/* hair cap */}
      <path d="M17 31 C17 14 26 10 36 10 C46 10 55 14 55 31 C50 22 43 19 36 19 C29 19 22 22 17 31 Z" fill={HAIR} />
      <KuttappanBrows mood={mood} />
      <KuttappanEyes mood={mood} />
      {/* nose */}
      <path d="M36 37 l-2.6 5.4 h5.2 Z" fill={SKIN_DARK} />
      {/* signature mustache */}
      {mood === 'dead' ? (
        <path d="M24 44 Q30 46 36 46 Q42 46 48 44 L46 50 Q36 53 26 50 Z" fill={HAIR} />
      ) : (
        <g fill={HAIR}>
          <path d="M24 42 Q36 47 48 42 Q46 51 36 51 Q26 51 24 42 Z" />
          {mood === 'cool' && (
            <g stroke={HAIR} strokeWidth="2.4" fill="none" strokeLinecap="round">
              <path d="M24 43 Q19 44 19 39" />
              <path d="M48 43 Q53 44 53 39" />
            </g>
          )}
        </g>
      )}
      <KuttappanMouth mood={mood} />
      {/* panic sweat */}
      {(mood === 'panic' || mood === 'shock') && (
        <path d="M58 24 c3.2 4.2 3.2 7.4 0 9.4 c-3.2 -2 -3.2 -5.2 0 -9.4" fill="#7DD3FC" stroke="#0284C7" strokeWidth="1" />
      )}
    </svg>
  );
}

export function ElephantSprite({ mood = 'calm', className = 'w-14 h-14' }) {
  return (
    <svg viewBox="0 0 72 66" className={`${className} select-none`} role="img" aria-label="മണികണ്ഠൻ">
      {/* ears */}
      <ellipse cx="13" cy="30" rx="9" ry="13" fill={GREY_DARK} />
      <ellipse cx="59" cy="30" rx="9" ry="13" fill={GREY_DARK} />
      <ellipse cx="13" cy="30" rx="4.5" ry="8" fill={GREY_LIGHT} />
      <ellipse cx="59" cy="30" rx="4.5" ry="8" fill={GREY_LIGHT} />
      {/* head */}
      <circle cx="36" cy="30" r="16" fill={GREY} />
      {/* gold forehead dot / headband */}
      {mood === 'wild' ? (
        <path d="M22 20 Q36 12 50 20" fill="none" stroke="#D97706" strokeWidth="3.4" strokeLinecap="round" />
      ) : (
        <circle cx="36" cy="15" r="2.6" fill="#D97706" />
      )}
      {/* eyes */}
      {mood === 'sleep' ? (
        <g stroke="#4B5563" strokeWidth="2.2" strokeLinecap="round" fill="none">
          <path d="M25 29 q4 3.4 8 0" />
          <path d="M39 29 q4 3.4 8 0" />
        </g>
      ) : (
        <g>
          <circle cx="29" cy="28" r="3.6" fill="#FFF" />
          <circle cx="43" cy="28" r="3.6" fill="#FFF" />
          <circle cx="29" cy="28.6" r="1.7" fill="#1F2937" />
          <circle cx="43" cy="28.6" r="1.7" fill="#1F2937" />
          {mood === 'wild' && (
            <g stroke="#7C2D12" strokeWidth="2.6" strokeLinecap="round">
              <line x1="23" y1="20" x2="33" y2="24.5" />
              <line x1="49" y1="20" x2="39" y2="24.5" />
            </g>
          )}
        </g>
      )}
      {/* tusks */}
      {mood !== 'sleep' && (
        <g fill="#FFF7E6" stroke="#D6C9A8" strokeWidth="1">
          <polygon points="27,44 32,44 29,52" />
          <polygon points="45,44 40,44 43,52" />
        </g>
      )}
      {/* trunk */}
      {mood === 'wild' ? (
        <g fill="none" stroke={GREY} strokeLinecap="round">
          <path d="M36 36 C38 28 44 22 51 20" strokeWidth="8" />
          <path d="M54 28 a9 9 0 0 1 6 -7" strokeWidth="2.4" stroke="#8D97A8" />
          <path d="M56 34 a12 12 0 0 1 8 -8" strokeWidth="2.4" stroke="#8D97A8" />
        </g>
      ) : mood === 'sleep' ? (
        <g>
          <path d="M36 36 C36 44 33 48 29 48" fill="none" stroke={GREY} strokeWidth="8" strokeLinecap="round" />
          <text x="52" y="18" fontSize="11" fill="#6B7280" fontWeight="bold">Z</text>
          <text x="58" y="9" fontSize="13" fill="#9CA3AF" fontWeight="bold">Z</text>
        </g>
      ) : (
        <path d="M36 36 C36 46 34 52 29 55" fill="none" stroke={GREY} strokeWidth="8" strokeLinecap="round" />
      )}
    </svg>
  );
}

export function CoconutMascot({ className = 'w-10 h-10' }) {
  return (
    <svg viewBox="0 0 64 64" className={`${className} select-none`} role="img" aria-label="ശുഭം തേങ്ങ">
      {/* husk strokes */}
      <g stroke="#4A2C12" strokeWidth="3" strokeLinecap="round">
        <line x1="32" y1="4" x2="32" y2="12" />
        <line x1="22" y1="7" x2="26" y2="14" />
        <line x1="42" y1="7" x2="38" y2="14" />
      </g>
      {/* nut */}
      <circle cx="32" cy="36" r="19" fill="#7C4A21" />
      <path d="M15 32 A19 19 0 0 1 49 32" fill="none" stroke="#93592B" strokeWidth="4" strokeLinecap="round" />
      {/* face */}
      <circle cx="25" cy="33" r="3.4" fill="#FFF" />
      <circle cx="39" cy="33" r="3.4" fill="#FFF" />
      <circle cx="25.6" cy="33.6" r="1.6" fill="#211A13" />
      <circle cx="39.6" cy="33.6" r="1.6" fill="#211A13" />
      <path d="M25 42 Q32 48 39 42" stroke="#F5E6C8" strokeWidth="2.6" fill="none" strokeLinecap="round" />
    </svg>
  );
}
