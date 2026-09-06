import React from 'react';
import { useGame } from '../context/GameContext';
import { KuttappanFace, ElephantSprite, CoconutMascot } from './Sprites';
import { playVoice } from '../utils/audio';
import { Play, Volume2, Award, FileText, CheckCircle2, AlertOctagon } from 'lucide-react';

export default function HomeScreen({ onOpenWall }) {
  const { dispatch } = useGame();

  const handleStart = () => {
    dispatch({ type: 'START_OATH' });
  };

  const handleWelcomeSpeech = () => {
    playVoice('welcome', 'അഭിനന്ദനങ്ങൾ! നിങ്ങൾ ചക്കുംവള പഞ്ചായത്തിന്റെ പുതിയ പ്രസിഡന്റ്! അഞ്ച് ദിവസം പിടിച്ചുനിൽക്കുക!');
  };

  return (
    <div className="relative min-h-[calc(100vh-140px)] flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-3xl bg-gradient-to-b from-[#FDFBF5] to-[#F5ECD7] rounded-2xl panchayat-wood-border p-5 sm:p-8 shadow-2xl relative overflow-hidden">

        {/* Decorative Kerala Architecture Eaves */}
        <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-r from-kerala-wood via-kerala-terracotta to-kerala-wood opacity-90 border-b border-amber-900 flex justify-around">
          {[...Array(24)].map((_, i) => (
            <div key={i} className="w-2 h-3 bg-amber-950/40 rounded-b" />
          ))}
        </div>

        {/* Rubber Stamp Badge */}
        <div className="absolute top-8 right-6 hidden md:block transform rotate-12 pointer-events-none">
          <div className="govt-stamp px-3 py-1.5 rounded border-2 border-dashed border-emerald-700 text-emerald-800 text-center font-mono text-xs font-black tracking-widest bg-emerald-50/70">
            <div>അംഗീകൃതം • 2026</div>
            <div className="text-[10px]">ചക്കുംവള പഞ്ചായത്ത്</div>
          </div>
        </div>

        {/* Title block */}
        <div className="text-center mt-2 mb-5">
          <div className="inline-block bg-amber-100/90 border border-amber-300 px-3 py-1 rounded-full text-xs font-bold text-amber-900 mb-3 shadow-sm">
            ചക്കുംവള ഗ്രാമപഞ്ചായത്ത് തെരഞ്ഞെടുപ്പ് ഫലം 2026
          </div>

          <h1 className="font-fun text-4xl sm:text-5xl md:text-6xl font-bold text-kerala-darkwood tracking-tight leading-tight mb-2 drop-shadow-sm">
            പഞ്ചായത്ത് പ്രസിഡന്റ്
          </h1>
          <div className="font-fun text-lg sm:text-xl font-semibold text-kerala-ochre tracking-wide mb-3">
            അഞ്ച് ദിവസം • അഞ്ച് പ്രതിസന്ധികൾ • ഒരു കസേര
          </div>

          <p className="max-w-xl mx-auto text-sm sm:text-[15px] text-kerala-wood/90 leading-relaxed font-medium">
            നിങ്ങൾ പുതിയ പ്രസിഡന്റായി തെരഞ്ഞെടുക്കപ്പെട്ടിരിക്കുന്നു!
            ജനങ്ങളെ സന്തോഷിപ്പിക്കൂ, ഖജനാവ് കാക്കൂ, പ്രതിപക്ഷത്തെ അടക്കൂ — <strong>മൂന്നും ഒരുമിച്ച് നടക്കില്ല!</strong>
          </p>
        </div>

        {/* Meet-the-office strip */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 mb-6 bg-amber-50/70 border border-amber-200 rounded-xl px-3 py-2.5">
          <div className="flex items-center gap-2">
            <KuttappanFace mood="cool" className="w-10 h-10" />
            <div>
              <div className="text-xs font-black text-kerala-darkwood">കുട്ടപ്പൻ</div>
              <div className="text-[10px] text-kerala-wood/70">നിങ്ങളുടെ വഴികാട്ടി</div>
            </div>
          </div>
          <div className="w-px self-stretch bg-amber-300/70" />
          <div className="flex items-center gap-2">
            <ElephantSprite mood="calm" className="w-10 h-10" />
            <div>
              <div className="text-xs font-black text-kerala-darkwood">മണികണ്ഠൻ</div>
              <div className="text-[10px] text-kerala-wood/70">നിരീക്ഷിക്കുന്നു</div>
            </div>
          </div>
          <div className="w-px self-stretch bg-amber-300/70" />
          <div className="flex items-center gap-2">
            <CoconutMascot className="w-10 h-10" />
            <div>
              <div className="text-xs font-black text-kerala-darkwood">ശുഭം</div>
              <div className="text-[10px] text-kerala-wood/70">തേങ്ങ അനുഗ്രഹം</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleStart}
            className="font-fun w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-kerala-gold transform hover:-translate-y-0.5 transition-all duration-200 border-2 border-yellow-300"
          >
            അധികാരമേൽക്കൂ
          </button>

          <button
            onClick={handleWelcomeSpeech}
            className="w-full sm:w-auto px-5 py-3 bg-amber-100 hover:bg-amber-200 text-kerala-wood font-bold text-sm rounded-xl border-2 border-amber-300 shadow-sm transition-all flex items-center justify-center gap-2"
            title="സ്വാഗത സന്ദേശം കേൾക്കുക"
          >
            <Volume2 className="w-5 h-5 text-amber-700" />
            <span>സ്വാഗത സന്ദേശം</span>
          </button>

          <button
            onClick={onOpenWall}
            className="w-full sm:w-auto px-5 py-3 bg-amber-50 hover:bg-amber-100 text-kerala-wood font-semibold text-sm rounded-xl border border-amber-300 shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <Award className="w-5 h-5 text-amber-600" />
            <span>മുൻ പ്രസിഡന്റുമാർ</span>
          </button>
        </div>

        <div className="mt-5 text-center text-[11px] text-kerala-wood/60 font-mono italic">
          മുന്നറിയിപ്പ്: സ്കോർ പൂജ്യമായാൽ കസേര കുട്ടപ്പൻ എടുക്കും!
        </div>

      </div>
    </div>
  );
}
