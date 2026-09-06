import React, { useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { SCENARIOS, STAT_CONFIG } from '../data/scenarios';
import { getComedy } from '../data/comedy';
import { KuttappanFace } from './Sprites';
import { playReaction, playWrongSting, playCorrectSting, getVerdict } from '../utils/audio';
import { Newspaper, ArrowRight, Skull, AlertTriangle, Volume2 } from 'lucide-react';

function hitsDeath(cfg, val) {
  if (cfg.deathCondition === 0) return val <= 0;
  if (cfg.deathCondition === 100) return val >= 100;
  return false;
}

export default function ConsequenceModal() {
  const { state, dispatch } = useGame();
  const { consequenceData, currentDayIndex, stats, selectedOption, playerName, playerPhoto } = state;

  const scenario = SCENARIOS[currentDayIndex];
  const comedy = getComedy(scenario ? scenario.id : '');

  if (!consequenceData) return null;

  const { isTimeout, headline, consequence, deltas, isDead } = consequenceData;

  const reactLine = isTimeout
    ? comedy.timeoutRoast
    : (comedy.reacts[selectedOption ? selectedOption.id : ''] || '');

  // Autoplay Kuttappan's reaction voice, then the verdict stinger:
  // bad choice -> rotating wrong-answer audio, good choice -> rotating
  // correct-answer audio, chaotic -> nothing.
  useEffect(() => {
    const fallback = reactLine ? `${reactLine} ${headline}` : headline;
    playReaction(
      currentDayIndex,
      selectedOption ? selectedOption.id : null,
      isTimeout,
      fallback,
      () => {
        const verdict = getVerdict(deltas);
        if (verdict === 'bad') {
          playWrongSting();
        } else if (verdict === 'good') {
          playCorrectSting();
        }
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headline]);

  const handleContinue = () => {
    dispatch({ type: 'CONTINUE_FROM_CONSEQUENCE' });
  };

  const statKeys = ['support', 'treasury', 'opposition'];
  const reactMood = isTimeout || isDead ? 'panic' : 'cool';

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn">
      <div className="w-full max-w-2xl bg-gradient-to-b from-[#FFFDF0] via-[#FAF3E0] to-[#F5ECD7] rounded-2xl panchayat-wood-border p-4 sm:p-6 shadow-2xl relative my-auto">

        {/* Slim masthead: mugshot + newspaper name */}
        <div className="flex items-center gap-3 border-b-2 border-amber-900/30 pb-3 mb-3">
          {playerPhoto ? (
            <img
              src={playerPhoto}
              alt={playerName}
              className="w-11 h-11 rounded-full object-cover photo-kasavu flex-shrink-0 grayscale-[35%]"
            />
          ) : (
            <div className="w-11 h-11 rounded-full bg-amber-800 text-amber-50 font-black text-lg flex items-center justify-center flex-shrink-0 border-2 border-yellow-300">
              {(playerName || 'സ').trim().charAt(0)}
            </div>
          )}
          <div className="min-w-0">
            <div className="text-[10px] font-black text-red-700 uppercase tracking-widest">
              പ്രതി: പ്രസിഡന്റ് {playerName}
            </div>
            <div className="flex items-center gap-1.5">
              <Newspaper className="w-4 h-4 text-kerala-wood flex-shrink-0" />
              <h2 className="font-fun text-xl sm:text-2xl font-bold text-kerala-darkwood tracking-tight truncate">
                ചക്കുംവള ടൈംസ്
              </h2>
            </div>
          </div>
          <div className="ml-auto govt-stamp px-2 py-1 rounded text-[10px] font-black text-red-700 border-red-700 flex-shrink-0 hidden sm:block">
            അന്വേഷണം നടക്കുന്നു
          </div>
        </div>

        {/* Headline */}
        <div className={`headline-slam p-3.5 rounded-xl mb-3 border-2 shadow-inner text-center ${
          isTimeout
            ? 'bg-rose-100 border-rose-400 text-rose-950'
            : isDead
            ? 'bg-red-100 border-red-500 text-red-950 animate-pulse-fast'
            : 'bg-amber-100 border-amber-400 text-amber-950'
        }`}>
          <h3 className="font-fun text-lg sm:text-[22px] font-bold leading-snug tracking-tight">
            "{headline}"
          </h3>
        </div>

        {/* Kuttappan one-line reaction */}
        {reactLine && (
          <div className="bubble-pop flex items-center gap-2.5 mb-3 px-1">
            <KuttappanFace mood={reactMood} className="w-10 h-10 flex-shrink-0" />
            <p className="text-[13px] sm:text-sm font-bold text-amber-950 italic leading-snug">
              "{reactLine}"
            </p>
          </div>
        )}

        {/* What happened */}
        <p className="text-sm sm:text-[15px] text-kerala-wood font-medium leading-relaxed bg-white/90 p-3.5 rounded-xl border border-amber-200 shadow-sm mb-4">
          {consequence}
        </p>

        {/* Compact stat swings */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {statKeys.map((key) => {
            const cfg = STAT_CONFIG[key];
            const delta = deltas[key] || 0;
            const currentVal = stats[key];
            const isCollapsing = hitsDeath(cfg, currentVal);
            const goodMove = (delta > 0 && !cfg.dangerHigh) || (delta < 0 && cfg.dangerHigh);

            return (
              <div
                key={key}
                className={`px-2 py-2 rounded-lg border text-center ${
                  isCollapsing
                    ? 'bg-red-100 border-red-500 ring-2 ring-red-400'
                    : goodMove
                    ? 'bg-emerald-50 border-emerald-300'
                    : delta !== 0
                    ? 'bg-rose-50 border-rose-300'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="text-[11px] font-extrabold text-kerala-wood truncate">
                  {cfg.icon} {cfg.label}
                </div>
                <div className={`font-mono text-base font-black ${
                  goodMove ? 'text-emerald-700' : delta !== 0 ? 'text-rose-700' : 'text-gray-500'
                }`}>
                  {delta > 0 ? `+${delta}` : delta}
                  <span className="text-[10px] font-normal text-gray-500"> → {currentVal}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Death Warning */}
        {isDead && (
          <div className="shake-hard bg-red-600 text-white p-3 rounded-xl flex items-center gap-3 mb-4 shadow-lg">
            <Skull className="w-7 h-7 flex-shrink-0" />
            <div className="text-xs">
              <span className="font-black text-sm">ഭരണം നിലംപൊത്തി! </span>
              പിന്തുണ തീർന്നു, ഖജനാവ് കാലിയായി, അല്ലെങ്കിൽ അവിശ്വാസ പ്രമേയം പാസ്സായി!
            </div>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={handleContinue}
          className={`font-fun w-full px-7 py-3 rounded-xl font-bold text-base shadow-lg transition-all flex items-center justify-center gap-2 border-2 ${
            isDead
              ? 'bg-red-700 hover:bg-red-800 text-white border-red-900'
              : currentDayIndex >= 4
              ? 'bg-amber-600 hover:bg-amber-700 text-white border-yellow-300 shadow-kerala-gold'
              : 'bg-emerald-700 hover:bg-emerald-800 text-white border-emerald-500'
          }`}
        >
          {isDead ? (
            <>
              <Skull className="w-5 h-5" />
              <span>വിധി കാണുക</span>
            </>
          ) : currentDayIndex >= 4 ? (
            <span>അവസാന ഫലം കാണുക</span>
          ) : (
            <>
              <span>അടുത്ത ദിവസത്തേക്ക്</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>

      </div>
    </div>
  );
}
