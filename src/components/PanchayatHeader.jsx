import React from 'react';
import { useGame } from '../context/GameContext';
import { CoconutMascot } from './Sprites';
import { Volume2, VolumeX, Award, ShieldAlert } from 'lucide-react';

export default function PanchayatHeader({ onOpenWall }) {
  const { state, dispatch } = useGame();
  const { screen, currentDayIndex, audioOn, playerName, playerPhoto } = state;

  return (
    <header className="relative bg-gradient-to-b from-kerala-parchment to-[#F5ECD7] border-b-4 border-kerala-wood shadow-paper px-4 py-3 select-none">
      {/* Top Govt Red Line Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 official-red-ribbon" />

      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Kerala Emblem & Office Title */}
        <div className="flex items-center gap-3">
          {/* Sacred Coconut Mascot */}
          <div className="relative group" title="ബഹുമാനപ്പെട്ട തേങ്ങ (Our Sacred Coconut Mascot)">
            <div className="w-12 h-14 bg-amber-100 border-2 border-kerala-border rounded shadow flex flex-col items-center justify-center overflow-hidden">
              <CoconutMascot className="w-8 h-8 animate-bounce-slight" />
              <span className="text-[8px] font-bold text-kerala-wood tracking-tighter mt-0.5">ശുഭം</span>
            </div>
            {/* Small marigold garland */}
            <div className="absolute -bottom-1 -left-1 -right-1 text-[10px] text-center text-amber-600 leading-none">
              🌼🌼🌼
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-kerala-seal text-white font-mono px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                കേരള സർക്കാർ
              </span>
              <span className="text-[11px] text-kerala-terracotta font-mono font-bold hidden sm:inline">
                ഫയൽ നം. 420/ചക്കുംവള/2026
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-extrabold text-kerala-darkwood leading-tight tracking-tight">
              ചക്കുംവള ഗ്രാമപഞ്ചായത്ത്
            </h1>
            <p className="text-[11px] text-kerala-wood/80 font-medium">
              ചക്കുംവള ഗ്രാമപഞ്ചായത്ത് • പ്രസിഡന്റിന്റെ കാര്യാലയം
            </p>
          </div>
        </div>

        {/* Center: Ceiling Fan and Day Badge (when in game) */}
        <div className="flex items-center gap-4">
          {/* Vintage Ceiling Fan */}
          <div className="flex items-center gap-1.5 bg-amber-50/80 px-2.5 py-1 rounded-full border border-amber-200" title="പഞ്ചായത്ത് ഫാൻ (1982 മോഡൽ)">
            <svg
              className="w-6 h-6 text-kerala-wood animate-ceiling-fan"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2 C13 5, 13 8, 12 9 C11 8, 11 5, 12 2 Z" opacity="0.8" />
              <path d="M22 12 C19 13, 16 13, 15 12 C16 11, 19 11, 22 12 Z" opacity="0.8" />
              <path d="M12 22 C11 19, 11 16, 12 15 C13 16, 13 19, 12 22 Z" opacity="0.8" />
              <path d="M2 12 C5 11, 8 11, 9 12 C8 13, 5 13, 2 12 Z" opacity="0.8" />
            </svg>
            <span className="text-[11px] text-kerala-wood font-medium hidden md:inline">സ്പീഡ് 5</span>
          </div>

          {/* Current Day Badge */}
          {(screen === 'DAY' || screen === 'CONSEQUENCE') && (
            <div className="flex items-center gap-1 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold px-3 py-1 rounded-lg shadow-sm border border-amber-800">
              <span className="text-sm">ദിനം {currentDayIndex + 1}</span>
              <span className="text-xs opacity-80">/ 5</span>
            </div>
          )}

          {/* President Photo + Name Badge */}
          {playerName && (
            <div className="hidden lg:flex items-center gap-1.5 bg-amber-100 border border-amber-300 px-2 py-1 rounded-md text-xs font-semibold text-kerala-wood">
              {playerPhoto ? (
                <img
                  src={playerPhoto}
                  alt={playerName}
                  className="w-6 h-6 rounded-full object-cover photo-kasavu"
                />
              ) : (
                <span className="w-6 h-6 rounded-full bg-amber-800 text-amber-50 font-black flex items-center justify-center text-[10px]">
                  {(playerName || 'സ').trim().charAt(0)}
                </span>
              )}
              <span className="max-w-[120px] truncate">{playerName}</span>
            </div>
          )}
        </div>

        {/* Right: Audio Mute & Wall of Presidents Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenWall}
            className="flex items-center gap-1.5 text-xs bg-amber-100 hover:bg-amber-200 text-kerala-wood font-bold px-2.5 py-1.5 rounded-lg border border-amber-300 transition-colors shadow-sm"
            title="മുൻ പ്രസിഡന്റുമാരുടെ പട്ടിക"
          >
            <Award className="w-4 h-4 text-amber-700" />
            <span className="hidden sm:inline">ചരിത്രം</span>
          </button>

          <button
            onClick={() => dispatch({ type: 'TOGGLE_AUDIO' })}
            className={`p-1.5 rounded-lg border transition-all ${
              audioOn
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200'
                : 'bg-rose-100 text-rose-700 border-rose-300 hover:bg-rose-200'
            }`}
            title={audioOn ? 'ശബ്ദം നിശബ്ദമാക്കുക' : 'ശബ്ദം ഓൺ ചെയ്യുക'}
            aria-label="Toggle Sound"
          >
            {audioOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
}
