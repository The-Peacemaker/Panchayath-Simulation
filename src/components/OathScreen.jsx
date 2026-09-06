import React, { useState, useRef } from 'react';
import { useGame } from '../context/GameContext';
import { playVoice } from '../utils/audio';
import { KuttappanFace } from './Sprites';
import { Scroll, CheckSquare, Sparkles, Volume2, Stamp, Camera, Trash2 } from 'lucide-react';

export default function OathScreen() {
  const { state, dispatch } = useGame();
  const [nameInput, setNameInput] = useState(state.playerName || 'സുരേന്ദ്രൻ പിള്ള');
  const [hasAgreed, setHasAgreed] = useState(true);
  const [photoPreview, setPhotoPreview] = useState(state.playerPhoto || '');
  const fileRef = useRef(null);

  const handleCompleteOath = (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_PLAYER_NAME', payload: nameInput });
    dispatch({ type: 'SET_PLAYER_PHOTO', payload: photoPreview });
    dispatch({ type: 'COMPLETE_OATH' });
  };

  const readOathAloud = () => {
    playVoice('oath_read', `ഞാൻ ${nameInput || 'സുരേന്ദ്രൻ'}, ചക്കുംവള പഞ്ചായത്തിന്റെ പുതിയ പ്രസിഡന്റായി സത്യപ്രതിജ്ഞ ചെയ്യുന്നു! എല്ലാ കുറ്റങ്ങളും മുൻ പ്രസിഡന്റിന്റെ തലയിൽ ഇടും!`);
  };

  const handlePhotoPick = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      // Downscale to a small avatar to keep localStorage light
      const img = new Image();
      img.onload = () => {
        try {
          const size = 160;
          const canvas = document.createElement('canvas');
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext('2d');
          const side = Math.min(img.width, img.height);
          const sx = (img.width - side) / 2;
          const sy = (img.height - side) / 2;
          ctx.drawImage(img, sx, sy, side, side, 0, 0, size, size);
          setPhotoPreview(canvas.toDataURL('image/jpeg', 0.82));
        } catch (err) {
          setPhotoPreview(reader.result);
        }
      };
      img.onerror = () => setPhotoPreview(reader.result);
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const clearPhoto = () => {
    setPhotoPreview('');
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-3xl bg-gradient-to-b from-[#FFFDF0] via-[#FAF3E0] to-[#F5ECD7] rounded-2xl panchayat-wood-border p-5 sm:p-8 shadow-2xl relative">
        
        {/* Top Header Seal */}
        <div className="text-center mb-6 border-b-2 border-amber-900/20 pb-4">
          <div className="inline-block bg-kerala-seal text-white text-xs font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            ഔദ്യോഗിക സത്യപ്രതിജ്ഞാ ചടങ്ങ്
          </div>
          <h2 className="font-fun text-2xl sm:text-3xl font-bold text-kerala-darkwood">
            സത്യപ്രതിജ്ഞാ ചടങ്ങ്
          </h2>
          <p className="text-xs sm:text-sm text-kerala-wood/80 font-medium">
            ചക്കുംവള പഞ്ചായത്ത് ഹാൾ • സാക്ഷികൾ: പ്യൂൺ കുട്ടപ്പനും പതിനാല് വാർഡുകളും
          </p>
        </div>

        {/* Clerk Kuttappan Character Dialogue Box */}
        <div className="bg-amber-100/90 border-2 border-amber-300 rounded-xl p-3.5 mb-6 flex items-start gap-3 shadow-sm">
          <KuttappanFace mood="cool" className="w-12 h-12 flex-shrink-0 drop-shadow" />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="font-black text-kerala-darkwood text-sm">
                കുട്ടപ്പൻ (സീനിയർ പ്യൂൺ)
              </span>
              <button
                type="button"
                onClick={readOathAloud}
                className="text-[11px] text-amber-800 hover:text-amber-950 font-bold flex items-center gap-1 bg-amber-200/80 px-2 py-0.5 rounded"
              >
                <Volume2 className="w-3 h-3" /> വായിക്കൂ
              </button>
            </div>
            <p className="text-xs text-kerala-wood mt-1 leading-relaxed">
              "അഭിനന്ദനങ്ങൾ സാർ! മുൻപിലിരിക്കുന്ന കസേര കണ്ടോ? കഴിഞ്ഞ മൂന്ന് പ്രസിഡന്റുമാരും അഞ്ച് ദിവസം തികച്ചിട്ടില്ല! പേരും ഫോട്ടോയും ഇവിടെ കൊടുത്ത് ഈ സത്യവാങ്മൂലത്തിൽ ഒപ്പിടൂ!"
            </p>
          </div>
        </div>

        <form onSubmit={handleCompleteOath}>
          {/* President Name + Photo Row */}
          <div className="mb-6 bg-white/80 p-4 rounded-xl border border-amber-300 flex flex-col sm:flex-row gap-4 items-stretch">
            {/* Photo upload */}
            <div className="flex sm:flex-col items-center gap-3 sm:w-40 flex-shrink-0">
              <div className="relative">
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="പ്രസിഡന്റിന്റെ ഫോട്ടോ"
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover photo-kasavu"
                  />
                ) : (
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-amber-100 border-2 border-dashed border-amber-400 flex items-center justify-center text-3xl text-amber-500">
                    <Camera className="w-8 h-8" />
                  </div>
                )}
              </div>
              <div className="flex sm:flex-col gap-2">
                <button
                  type="button"
                  onClick={() => fileRef.current && fileRef.current.click()}
                  className="px-3 py-1.5 bg-amber-200/80 hover:bg-amber-300 text-amber-900 rounded-lg text-xs font-bold border border-amber-400"
                >
                  ഫോട്ടോ ചേർക്കൂ
                </button>
                {photoPreview && (
                  <button
                    type="button"
                    onClick={clearPhoto}
                    className="px-3 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-lg text-xs font-bold border border-rose-300 flex items-center justify-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" /> മായ്ക്കൂ
                  </button>
                )}
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoPick}
                />
              </div>
            </div>

            {/* Name input */}
            <div className="flex-1">
              <label className="block text-xs sm:text-sm font-black text-kerala-darkwood mb-1.5">
                നിങ്ങളുടെ ശുഭനാമം:
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="ഉദാ: സുരേന്ദ്രൻ പിള്ള"
                  className="w-full px-4 py-2.5 text-base sm:text-lg font-bold text-kerala-darkwood bg-amber-50 border-2 border-kerala-border rounded-lg focus:outline-none focus:ring-2 focus:ring-kerala-ochre focus:border-transparent transition-all placeholder:text-gray-400"
                />
                <span className="absolute right-3 top-2.5 text-lg">✍️</span>
              </div>
              <p className="text-[11px] text-kerala-wood/70 mt-1">
                * ഈ പേരും ഫോട്ടോയും ചരിത്ര ബോർഡിലും വിധി കാർഡിലും വരും.
              </p>
            </div>
          </div>

          {/* Hilarious Comedic Oath Document */}
          <div className="bg-[#FFFDF7] border-2 border-amber-200 rounded-xl p-4 sm:p-5 mb-6 text-kerala-wood font-serif shadow-inner relative overflow-hidden">
            <div className="absolute top-2 right-3 opacity-10 text-6xl select-none">📜</div>
            <h3 className="font-extrabold text-center text-kerala-darkwood text-sm sm:text-base mb-3 border-b border-amber-200 pb-2">
              സത്യവാങ്മൂലം
            </h3>
            
            <div className="space-y-2 text-xs sm:text-sm leading-relaxed text-kerala-wood">
              <p>
                "ഞാൻ, <span className="font-bold text-kerala-ochre underline underline-offset-2">{nameInput || '...'}</span>, ചക്കുംവള ഗ്രാമപഞ്ചായത്തിന്റെ പ്രസിഡന്റായി ചുമതലയേൽക്കുമ്പോൾ സത്യം ചെയ്യുന്നു:"
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-1 text-kerala-wood/90 font-sans">
                <li>ഗ്രാമത്തിൽ എന്ത് ദുരന്തം സംഭവിച്ചാലും അതിന്റെ പൂർണ്ണ കുറ്റം മുൻ പ്രസിഡന്റിന്റെ തലയിൽ ഇടും.</li>
                <li>നാട്ടുകാർ റോഡിലെ കുഴികളെപ്പറ്റി ചോദിച്ചാൽ 'ഇത് സ്മാർട്ട് വികസനത്തിന്റെ ഭാഗമാണ്' എന്ന് വിശദീകരിക്കും.</li>
                <li>മണികണ്ഠൻ ആന വിരണ്ടാൽ സ്വന്തം മേശയുടെ അടിയിൽ ഒളിക്കാൻ മടിക്കില്ല.</li>
                <li>ഖജനാവിലെ അവസാന ചില്ലിക്കാശും സംരക്ഷിക്കാൻ അമ്മയുടെ ഉപദേശം മാത്രം തേടും!</li>
              </ul>
            </div>

            <div className="mt-4 pt-3 border-t border-amber-200 flex items-center justify-between text-xs font-mono text-kerala-wood/80">
              <div>തീയതി: {new Date().toLocaleDateString('en-GB')}</div>
              <div className="font-bold text-kerala-seal">മുദ്ര: പഞ്ചായത്ത് കാര്യാലയം</div>
            </div>
          </div>

          {/* Agreement Checkbox */}
          <div className="mb-6 flex items-center gap-2.5">
            <input
              type="checkbox"
              id="agreeCheck"
              checked={hasAgreed}
              onChange={(e) => setHasAgreed(e.target.checked)}
              className="w-4 h-4 text-kerala-ochre rounded focus:ring-kerala-ochre cursor-pointer"
            />
            <label htmlFor="agreeCheck" className="text-xs sm:text-sm font-semibold text-kerala-wood cursor-pointer select-none">
              മുകളിൽ പറഞ്ഞ എല്ലാ നിബന്ധനകളും പൂർണ്ണ സമ്മതത്തോടെ അംഗീകരിക്കുന്നു.
            </label>
          </div>

          {/* Take Charge / Affix Seal Button */}
          <button
            type="submit"
            disabled={!hasAgreed || !nameInput.trim()}
            className="w-full py-4 bg-gradient-to-r from-emerald-700 via-green-700 to-emerald-800 hover:from-emerald-600 hover:to-green-600 text-white font-black text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 border-2 border-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>മുദ്ര പതിപ്പിച്ച് ചുമതലയേൽക്കുക</span>
          </button>
        </form>

      </div>
    </div>
  );
}
