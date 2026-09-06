import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';
import { SCENARIOS } from '../data/scenarios';
import { getComedy } from '../data/comedy';
import { KuttappanFace, ElephantSprite, getKuttappanMood, getElephantMood } from './Sprites';
import { playTick, playBriefing, playVoice } from '../utils/audio';
import { Clock, Volume2, AlertTriangle, Sparkles, Send } from 'lucide-react';

const TIMER_SECONDS = 30;

function PresidentAvatar({ name, photo }) {
  if (photo) {
    return (
      <img
        src={photo}
        alt={name}
        className="w-8 h-8 rounded-full object-cover photo-kasavu flex-shrink-0"
      />
    );
  }
  const initial = (name || 'സ').trim().charAt(0);
  return (
    <div className="w-8 h-8 rounded-full bg-amber-800 text-amber-50 text-sm font-black flex items-center justify-center flex-shrink-0 border-2 border-yellow-300">
      {initial}
    </div>
  );
}

export default function DayScreen() {
  const { state, dispatch } = useGame();
  const { currentDayIndex, playerName, playerPhoto, stats } = state;
  const scenario = SCENARIOS[currentDayIndex] || SCENARIOS[0];
  const comedy = getComedy(scenario.id);
  const kuttappan = getKuttappanMood(stats);
  const elephant = getElephantMood(stats.opposition);

  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [hasSelected, setHasSelected] = useState(false);
  const timerRef = useRef(null);
  const panicFiredRef = useRef(false);

  // Day intro audio: Day 1 opens with the pledge sting chained into the
  // briefing; Days 2-5 go straight to the briefing (no transition loop).
  // The transition sting is reserved for the finale (Day 5 -> verdict).
  useEffect(() => {
    const briefingFallback = `${scenario.kuttappanAlert} ${scenario.briefing}`;
    if (currentDayIndex === 0) {
      playVoice('oath_complete', 'സത്യപ്രതിജ്ഞ കഴിഞ്ഞു! ഭരണം തുടങ്ങാം!', () =>
        playBriefing(currentDayIndex, briefingFallback)
      );
    } else {
      playBriefing(currentDayIndex, briefingFallback);
    }
    setTimeLeft(TIMER_SECONDS);
    setHasSelected(false);
    panicFiredRef.current = false;
  }, [currentDayIndex]);

  // Timer loop & audio ticking
  useEffect(() => {
    if (hasSelected) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleChoice(null, true);
          return 0;
        }

        const nextVal = prev - 1;

        // Kuttappan panic voice once at the 10s mark
        if (nextVal === 10 && !panicFiredRef.current) {
          panicFiredRef.current = true;
          playVoice('timer_panic', 'സമയം തീരാറായി സർ! വേഗം തീരുമാനിക്കൂ! മൗനം ദുരന്തമാണ്!');
        }

        // Play tick sound (urgent if <= 10s)
        if (nextVal <= 10) {
          playTick(true);
        } else if (nextVal % 2 === 0) {
          playTick(false);
        }

        return nextVal;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [hasSelected, currentDayIndex]);

  const handleChoice = (option, isTimeout = false) => {
    if (hasSelected) return;
    setHasSelected(true);
    if (timerRef.current) clearInterval(timerRef.current);

    dispatch({
      type: 'MAKE_CHOICE',
      payload: { option, isTimeout }
    });
  };

  const handleHearKuttappan = () => {
    playBriefing(currentDayIndex, `${scenario.kuttappanAlert} ${scenario.briefing}`);
  };

  const isUrgent = timeLeft <= 10;
  const progressPercent = (timeLeft / TIMER_SECONDS) * 100;

  return (
    <div
      className={`min-h-[calc(100vh-140px)] p-3 sm:p-5 transition-all duration-300 ${
        isUrgent ? 'ring-8 ring-red-500/40 animate-pulse-fast bg-red-50/20' : ''
      }`}
    >
      <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">

        {/* Slim dawn bar */}
        <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white px-3 py-2 rounded-xl shadow flex items-center justify-between border border-yellow-300">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-lg">🌅</span>
            <div className="min-w-0">
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-950">
                ദിനം {currentDayIndex + 1} • {scenario.badge}
              </div>
              <div className="font-fun text-base sm:text-lg font-bold truncate">
                {scenario.title}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-black truncate max-w-[130px]">{playerName}</div>
            </div>
            <PresidentAvatar name={playerName} photo={playerPhoto} />
          </div>
        </div>

        {/* Slim timer strip */}
        <div className={`flex items-center gap-2.5 bg-white/95 rounded-full pl-3 pr-2 py-1.5 border-2 shadow-sm ${
          isUrgent ? 'border-red-500 timer-danger-glow' : 'border-amber-300'
        }`}>
          <Clock className={`w-4 h-4 flex-shrink-0 ${isUrgent ? 'text-red-600 animate-spin' : 'text-amber-700'}`} />
          <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full transition-all duration-1000 ease-linear ${
                isUrgent ? 'bg-red-600 animate-pulse' : 'bg-gradient-to-r from-amber-500 to-yellow-500'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className={`font-mono text-sm font-black px-2.5 py-0.5 rounded-full ${
            isUrgent ? 'bg-red-600 text-white animate-bounce' : 'bg-amber-100 text-amber-900'
          }`}>
            {timeLeft}s
          </div>
        </div>

        {/* THE briefing card — Kuttappan, issue, whisper, elephant buddy */}
        <div className="bg-gradient-to-br from-[#FFFDF0] via-[#FAF3E0] to-[#F5ECD7] rounded-2xl border-2 border-amber-400 p-4 sm:p-5 shadow-md">
          {/* Kuttappan header row */}
          <div className="flex items-center gap-3 mb-3">
            <KuttappanFace key={kuttappan.mood} mood={kuttappan.mood} className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-fun text-base sm:text-lg font-bold text-kerala-darkwood">കുട്ടപ്പൻ</span>
                <span className="text-[10px] font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-full border border-amber-400">
                  {kuttappan.label}
                </span>
              </div>
              <div className="text-[11px] text-kerala-wood/70 font-medium">
                സീനിയർ പ്യൂൺ • അടിയന്തര ഫയലുമായി എത്തിയിരിക്കുന്നു
              </div>
            </div>
            <button
              onClick={handleHearKuttappan}
              className="px-2.5 py-1.5 bg-amber-200/80 hover:bg-amber-300 text-amber-900 rounded-lg text-xs font-bold flex items-center gap-1 border border-amber-400 shadow-sm flex-shrink-0"
              title="കുട്ടപ്പന്റെ ശബ്ദം കേൾക്കുക"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">കേൾക്കൂ</span>
            </button>
          </div>

          {/* Alert + issue — the main readable content */}
          <div className="bg-amber-100/90 border-l-4 border-amber-600 p-2.5 rounded-r-lg text-sm sm:text-[15px] font-bold text-amber-950 mb-2.5 italic leading-relaxed">
            "{scenario.kuttappanAlert}"
          </div>
          <p className="text-[15px] sm:text-base text-kerala-wood font-medium leading-relaxed mb-2.5">
            {scenario.briefing}
          </p>

          {/* Kuttappan's whisper */}
          {comedy.aside && (
            <p className="text-xs sm:text-[13px] text-kerala-wood/85 italic border-l-2 border-amber-300 pl-2.5 mb-3 leading-relaxed">
              കുട്ടപ്പൻ മെല്ലെ: "{comedy.aside}"
            </p>
          )}

          {/* Manikandan mini buddy row */}
          <div className="flex items-center gap-2 pt-2.5 border-t border-amber-200/80">
            <ElephantSprite mood={elephant.mood} className="w-9 h-9 flex-shrink-0" />
            <span className="text-xs font-black text-kerala-darkwood">മണികണ്ഠൻ</span>
            <span className={`text-[11px] font-bold ${elephant.wild ? 'text-red-700 animate-pulse' : 'text-emerald-800'}`}>
              {elephant.label}
            </span>
            <span className="ml-auto text-[11px] font-mono text-kerala-wood/70">
              പ്രതിപക്ഷം: {stats.opposition}
            </span>
          </div>
        </div>

        {/* Options — the decision */}
        <div>
          <div className="text-sm font-black text-kerala-darkwood mb-2">
            നിങ്ങളുടെ തീരുമാനം:
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
            {scenario.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleChoice(opt)}
                disabled={hasSelected}
                className="group text-left bg-white hover:bg-amber-50/90 active:bg-amber-100 rounded-xl p-3 sm:p-3.5 border-2 border-kerala-border/60 hover:border-kerala-ochre shadow-sm hover:shadow-md transition-all duration-200 flex items-start gap-2.5"
              >
                <div className="w-7 h-7 rounded-lg bg-amber-100 group-hover:bg-amber-600 group-hover:text-white text-amber-900 font-mono font-black text-xs flex items-center justify-center flex-shrink-0 border border-amber-300 transition-colors">
                  {opt.id}
                </div>
                <div className="text-sm sm:text-[15px] font-extrabold text-kerala-darkwood group-hover:text-kerala-ochre transition-colors leading-snug">
                  {opt.text}
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
