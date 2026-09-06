import React from 'react';
import { useGame } from '../context/GameContext';
import { X, Award, Skull, Calendar, Trash2 } from 'lucide-react';

export default function WallOfPresidentsModal({ isOpen, onClose }) {
  const { state, dispatch } = useGame();
  const { wallOfPresidents } = state;

  if (!isOpen) return null;

  const handleClear = () => {
    if (window.confirm('എല്ലാ മുൻ പ്രസിഡന്റുമാരുടെയും ചരിത്രം മായ്ക്കണോ?')) {
      localStorage.removeItem('chakkumvila_presidents_history_v1');
      dispatch({ type: 'LOAD_WALL', payload: [] });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn">
      <div className="w-full max-w-2xl bg-gradient-to-b from-[#FFFDF0] via-[#FAF3E0] to-[#F5ECD7] rounded-2xl panchayat-wood-border p-5 sm:p-7 shadow-2xl relative max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-amber-900/20 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-kerala-ochre" />
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-kerala-darkwood">
                മുൻ പ്രസിഡന്റുമാരുടെ ചരിത്ര ബോർഡ്
              </h2>
              <p className="text-xs text-kerala-wood/70">
                പ്രശസ്തിയുടെയും നാണക്കേടിന്റെയും ചുവർ
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-kerala-wood transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-3">
          {wallOfPresidents.length === 0 ? (
            <div className="text-center py-12 text-kerala-wood/60">
              <div className="text-4xl mb-2">📜</div>
              <p className="font-bold text-sm">ഇതുവരെ ആരും ഭരണം പൂർത്തിയാക്കിയിട്ടില്ല!</p>
              <p className="text-xs mt-1">നിങ്ങളാണ് ചക്കുംവളയുടെ ആദ്യ ചരിത്രപുരുഷൻ / വനിത!</p>
            </div>
          ) : (
            wallOfPresidents.map((p, idx) => {
              const isFired = p.endingType === 'UNWORTHY';
              return (
                <div
                  key={p.id || idx}
                  className={`p-3.5 rounded-xl border-2 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isFired
                      ? 'bg-red-50/80 border-red-200'
                      : 'bg-white/80 border-amber-200 hover:border-amber-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {p.photo ? (
                      <img
                        src={p.photo}
                        alt={p.name}
                        className="w-10 h-10 rounded-full object-cover photo-kasavu flex-shrink-0"
                      />
                    ) : (
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-base flex-shrink-0 ${
                        isFired ? 'bg-red-200 text-red-800' : 'bg-amber-200 text-amber-900'
                      }`}>
                        {isFired ? '💀' : `#${idx + 1}`}
                      </div>
                    )}

                    <div>
                      <div className="font-black text-kerala-darkwood text-sm sm:text-base">
                        പ്രസിഡന്റ് {p.name}
                      </div>
                      <div className="text-xs font-extrabold text-kerala-ochre">
                        {p.endingTitle}
                      </div>
                      <div className="text-[11px] text-gray-500 flex items-center gap-2 mt-0.5 font-mono">
                        <span>{p.daysSurvived} ദിവസം ഭരിച്ചു</span>
                        <span>•</span>
                        <span>{p.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats snippet */}
                  <div className="flex items-center gap-3 text-xs font-mono font-bold bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 self-end sm:self-center">
                    <span title="ജനപിന്തുണ">❤️ {p.support}</span>
                    <span title="ഖജനാവ്">💰 {p.treasury}</span>
                    <span title="പ്രതിപക്ഷം">📣 {p.opposition}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 mt-3 border-t border-amber-900/20 flex items-center justify-between">
          {wallOfPresidents.length > 0 && (
            <button
              onClick={handleClear}
              className="text-xs text-rose-700 hover:text-rose-900 font-bold flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" /> ലിസ്റ്റ് മായ്ക്കുക
            </button>
          )}

          <button
            onClick={onClose}
            className="ml-auto px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-lg shadow transition-all"
          >
            ശരി
          </button>
        </div>

      </div>
    </div>
  );
}
