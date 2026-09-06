import React from 'react';
import { useGame } from '../context/GameContext';
import { STAT_CONFIG } from '../data/scenarios';
import { Heart, Coins, Smile, Sparkles, AlertTriangle } from 'lucide-react';

export default function StatMeters() {
  const { state } = useGame();
  const { stats, statDeltas } = state;

  const statKeys = ['support', 'treasury', 'opposition'];

  return (
    <div className="w-full bg-gradient-to-r from-[#FBF5E6] via-[#F8ECD5] to-[#FBF5E6] border-b-2 border-kerala-border/60 py-2.5 px-3 shadow-inner">
      <div className="max-w-5xl mx-auto grid grid-cols-3 gap-2.5 sm:gap-4">
        {statKeys.map((key) => {
          const cfg = STAT_CONFIG[key];
          const val = stats[key];
          const delta = statDeltas[key] || 0;
          // Opposition is inverted: HIGH values are dangerous
          const isHigh = cfg.dangerHigh === true;
          const isDanger = isHigh ? val >= 70 : (cfg.deathCondition !== null && val <= 25);
          const isCritical = isHigh ? val >= 88 : (cfg.deathCondition !== null && val <= 10);

          return (
            <div
              key={key}
              className={`relative bg-white/90 rounded-xl p-2.5 sm:p-3 border-2 transition-all duration-300 shadow-sm ${
                isCritical
                  ? 'border-red-600 bg-red-50/90 animate-pulse-fast ring-2 ring-red-400'
                  : isDanger
                  ? 'border-orange-400 bg-orange-50/60'
                  : 'border-kerala-border/40 hover:border-kerala-border'
              }`}
            >
              {/* Floating Delta Badge */}
              {delta !== 0 && (
                <span
                  key={`${key}-${delta}-${Date.now()}`}
                  className={`absolute -top-3 right-2 text-xs font-black px-2 py-0.5 rounded-full shadow-md animate-bounce z-10 ${
                    (delta > 0 && !isHigh) || (delta < 0 && isHigh)
                      ? 'bg-emerald-600 text-white'
                      : 'bg-rose-600 text-white'
                  }`}
                >
                  {delta > 0 ? `+${delta}` : delta}
                </span>
              )}

              {/* Title & Icon Header */}
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="text-base sm:text-lg select-none">{cfg.icon}</span>
                  <div className="truncate">
                    <div className="text-xs sm:text-sm font-extrabold text-kerala-darkwood truncate leading-none">
                      {cfg.label}
                    </div>
                    <div className="text-[9px] text-kerala-wood/70 font-medium truncate">
                      {cfg.sub}
                    </div>
                  </div>
                </div>

                {/* Numeric Value */}
                <div className="flex items-center gap-1 font-mono font-black text-sm sm:text-base">
                  <span className={isCritical ? 'text-red-700 font-extrabold' : cfg.textColor}>
                    {val}
                  </span>
                  <span className="text-[10px] text-gray-400 font-normal">/100</span>
                </div>
              </div>

              {/* Progress Bar Track */}
              <div className="w-full bg-amber-100 rounded-full h-2.5 overflow-hidden border border-amber-200">
                <div
                  className={`h-full rounded-full transition-all duration-700 ease-out ${
                    isCritical
                      ? 'bg-red-600'
                      : isDanger
                      ? 'bg-orange-500'
                      : cfg.color
                  }`}
                  style={{ width: `${Math.min(100, Math.max(0, val))}%` }}
                />
              </div>

              {/* Critical warning banner */}
              {isCritical && (
                <div className="flex items-center gap-1 mt-1 text-[10px] text-red-700 font-bold leading-tight">
                  <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">
                    {isHigh
                      ? 'അവിശ്വാസ പ്രമേയം വരുന്നു! (100 ആയാൽ പുറത്ത്!)'
                      : 'അപകട നില! (0 ആയാൽ പുറത്താകും!)'}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
