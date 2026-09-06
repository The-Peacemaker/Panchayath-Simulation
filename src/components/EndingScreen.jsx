import React, { useEffect, useRef, useState } from 'react';
import { useGame } from '../context/GameContext';
import { STAT_CONFIG } from '../data/scenarios';
import confetti from 'canvas-confetti';
import { playVoice, playEndingVoice, playSadTrombone, playVictoryFanfare } from '../utils/audio';
import { Download, RotateCcw, Share2, Award, Sparkles, AlertTriangle } from 'lucide-react';

export default function EndingScreen({ onOpenWall }) {
  const { state, dispatch } = useGame();
  const { ending, playerName, playerPhoto, stats } = state;
  const canvasRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  // Finale audio arc: synth flourish -> transition bridge -> verdict speech.
  // Sequenced with timers so nothing overlaps; cleanup kills pending timers
  // if the player restarts mid-fanfare.
  useEffect(() => {
    if (!ending) return;
    const isVictory = ending.type === 'HERO' || ending.type === 'CORRUPT';
    const verdictFallback = `${ending.malayalamTitle}. ${ending.description}`;
    const playBridge = () => {
      playVoice('day_transition', 'അവസാന വിധി വരുന്നു!', () =>
        playEndingVoice(ending.code, verdictFallback)
      );
    };
    let timer = null;
    if (isVictory) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      playVictoryFanfare();
      timer = setTimeout(playBridge, 1500);
    } else {
      playSadTrombone();
      timer = setTimeout(playBridge, 2200);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [ending]);

  if (!ending) return null;

  const loadPhotoImage = () => new Promise((resolve) => {
    if (!playerPhoto) return resolve(null);
    const im = new Image();
    im.onload = () => resolve(im);
    im.onerror = () => resolve(null);
    im.src = playerPhoto;
  });

  // Generate WhatsApp Status Share Card via HTML5 Canvas
  const handleDownloadCard = async () => {
    setDownloading(true);
    try {
      const photoImg = await loadPhotoImage();
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1920; // 9:16 WhatsApp Status aspect ratio
      const ctx = canvas.getContext('2d');

      // 1. Background Parchment Texture
      ctx.fillStyle = '#FAF4E6';
      ctx.fillRect(0, 0, 1080, 1920);

      // Decorative Green / Gold Border
      ctx.lineWidth = 24;
      ctx.strokeStyle = '#B45309';
      ctx.strokeRect(36, 36, 1008, 1848);

      ctx.lineWidth = 6;
      ctx.strokeStyle = '#D97706';
      ctx.strokeRect(60, 60, 960, 1800);

      // 2. Govt Header
      ctx.fillStyle = '#047857';
      ctx.fillRect(80, 100, 920, 100);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 36px "Noto Sans Malayalam", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('കേരള സർക്കാർ • ഗസറ്റ് വിജ്ഞാപനം 2026', 540, 162);

      // President photo stamp (top-right of header)
      if (photoImg) {
        const cx = 930, cy = 168, r = 56;
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.clip();
        const side = Math.min(photoImg.width, photoImg.height);
        ctx.drawImage(
          photoImg,
          (photoImg.width - side) / 2, (photoImg.height - side) / 2, side, side,
          cx - r, cy - r, r * 2, r * 2
        );
        ctx.restore();
        ctx.lineWidth = 6;
        ctx.strokeStyle = '#D97706';
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 3. Panchayat Title
      ctx.fillStyle = '#451A03';
      ctx.font = '900 64px "Noto Sans Malayalam", sans-serif';
      ctx.fillText('ചക്കുംവള ഗ്രാമപഞ്ചായത്ത്', 540, 310);

      ctx.font = 'italic 34px "Courier Prime", monospace';
      ctx.fillStyle = '#78350F';
      ctx.fillText('ഭരണ സർട്ടിഫിക്കറ്റ്', 540, 365);

      // Divider Line
      ctx.strokeStyle = '#D97706';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(150, 420);
      ctx.lineTo(930, 420);
      ctx.stroke();

      // 4. President's Name
      ctx.font = 'bold 42px "Noto Sans Malayalam", sans-serif';
      ctx.fillStyle = '#78350F';
      ctx.fillText('ബഹുമാനപ്പെട്ട പ്രസിഡന്റ്:', 540, 500);

      ctx.font = '900 78px "Noto Sans Malayalam", sans-serif';
      ctx.fillStyle = '#9A3412';
      ctx.fillText(playerName || 'സുരേന്ദ്രൻ', 540, 590);

      // 5. Ending Icon & Title Box
      ctx.fillStyle = '#FEF3C7';
      ctx.fillRect(140, 670, 800, 300);
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#D97706';
      ctx.strokeRect(140, 670, 800, 300);

      ctx.font = '100px sans-serif';
      ctx.fillText(ending.icon, 540, 780);

      ctx.font = '900 62px "Noto Sans Malayalam", sans-serif';
      ctx.fillStyle = '#451A03';
      ctx.fillText(ending.malayalamTitle, 540, 870);

      ctx.font = 'italic bold 32px sans-serif';
      ctx.fillStyle = '#B45309';
      ctx.fillText(ending.title, 540, 925);

      // 6. Ending Description
      ctx.font = '500 32px "Noto Sans Malayalam", sans-serif';
      ctx.fillStyle = '#2B1810';
      // Wrap text simply
      const words = ending.description.split(' ');
      let line = '';
      let y = 1050;
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > 820 && n > 0) {
          ctx.fillText(line, 540, y);
          line = words[n] + ' ';
          y += 50;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, 540, y);

      // 7. Final Stats Summary Table (3 stats)
      y += 90;
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(140, y, 800, 220);
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#D4AF37';
      ctx.strokeRect(140, y, 800, 220);

      const statsEntries = [
        { label: 'ജനപിന്തുണ', val: stats.support },
        { label: 'ഖജനാവ്', val: stats.treasury },
        { label: 'പ്രതിപക്ഷം', val: stats.opposition }
      ];

      statsEntries.forEach((s, idx) => {
        const colX = 140 + idx * 266 + 133;
        ctx.font = 'bold 30px "Noto Sans Malayalam", sans-serif';
        ctx.fillStyle = '#78350F';
        ctx.fillText(s.label, colX, y + 80);

        ctx.font = '900 48px monospace';
        ctx.fillStyle = '#047857';
        ctx.fillText(`${s.val}`, colX, y + 150);
      });

      // 8. Official Seal & Stamp
      ctx.fillStyle = '#047857';
      ctx.font = 'bold 36px monospace';
      ctx.fillText('ചക്കുംവള പഞ്ചായത്ത് ഔദ്യോഗിക മുദ്ര', 540, 1680);

      ctx.font = 'italic 28px sans-serif';
      ctx.fillStyle = '#78350F';
      ctx.fillText('പഞ്ചായത്ത് പ്രസിഡന്റ് സിമുലേറ്റർ', 540, 1750);

      // Download file
      const link = document.createElement('a');
      link.download = `panchayat-president-${playerName || 'status'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (e) {
      console.warn('Share card error:', e);
    }
    setDownloading(false);
  };

  const handleRestart = () => {
    dispatch({ type: 'RESTART_GAME' });
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="w-full max-w-3xl bg-gradient-to-b from-[#FFFDF0] via-[#FAF3E0] to-[#F5ECD7] rounded-2xl panchayat-wood-border p-5 sm:p-8 shadow-2xl relative text-center">
        
        {/* Badge Ribbon */}
        <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-mono font-bold text-xs uppercase tracking-widest mb-3 shadow-md">
          {ending.badge} • ഔദ്യോഗിക വിധി
        </div>

        {/* President photo + Large Ending Icon */}
        <div className="flex items-center justify-center gap-4 my-2">
          {playerPhoto ? (
            <img
              src={playerPhoto}
              alt={playerName}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover photo-kasavu"
            />
          ) : (
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-200 border-2 border-amber-500 flex items-center justify-center text-3xl font-black text-amber-900">
              {(playerName || 'സ').trim().charAt(0)}
            </div>
          )}
          <div className="text-6xl sm:text-7xl animate-bounce-slight select-none">
            {ending.icon}
          </div>
        </div>
        <div className="text-xs font-bold text-kerala-wood/70 mb-3">
          പ്രസിഡന്റ് {playerName}
        </div>

        {/* Ending Title */}
        <h2 className="font-fun text-3xl sm:text-5xl font-bold text-kerala-darkwood leading-tight mb-1">
          {ending.malayalamTitle}
        </h2>
        {/* Description Box */}
        <div className="bg-white/90 rounded-xl p-4 sm:p-6 border-2 border-amber-200 shadow-sm text-left mb-6">
          <p className="text-sm sm:text-base text-kerala-wood font-medium leading-relaxed mb-3">
            {ending.description}
          </p>

          <div className="bg-amber-50 p-3 rounded-lg border-l-4 border-amber-600 text-xs sm:text-sm font-bold text-amber-950 italic">
            {ending.quote}
          </div>
        </div>

        {/* Final Stats Summary */}
        <div className="bg-amber-100/70 rounded-xl p-3 sm:p-4 border border-amber-300 mb-6">
          <div className="text-xs font-black text-kerala-darkwood uppercase tracking-wider mb-2">
            നിങ്ങളുടെ അന്തിമ സ്കോർ:
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            {Object.keys(STAT_CONFIG).map((key) => {
              const cfg = STAT_CONFIG[key];
              const val = stats[key];
              return (
                <div key={key} className="bg-white p-2 rounded-lg border border-amber-200">
                  <div className="text-xs font-bold text-gray-600">{cfg.icon} {cfg.label}</div>
                  <div className="font-mono text-base font-black text-kerala-darkwood mt-0.5">{val}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {/* WhatsApp Status Card Download */}
          <button
            onClick={handleDownloadCard}
            disabled={downloading}
            className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-500 hover:to-green-600 text-white font-extrabold text-sm sm:text-base rounded-xl shadow-md transition-all flex items-center justify-center gap-2 border-2 border-emerald-400"
          >
            <Download className="w-5 h-5" />
            <span>വാട്സ്ആപ്പ് കാർഡ്</span>
          </button>

          {/* Wall of Fame / History */}
          <button
            onClick={onOpenWall}
            className="w-full sm:w-auto px-5 py-3.5 bg-amber-100 hover:bg-amber-200 text-kerala-wood font-bold text-sm rounded-xl border-2 border-amber-300 transition-all flex items-center justify-center gap-2"
          >
            <Award className="w-5 h-5 text-amber-700" />
            <span>ചരിത്ര ബോർഡ്</span>
          </button>

          {/* Restart Game */}
          <button
            onClick={handleRestart}
            className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white font-black text-sm sm:text-base rounded-xl shadow-md transition-all flex items-center justify-center gap-2 border-2 border-yellow-300"
          >
            <RotateCcw className="w-5 h-5" />
            <span>വീണ്ടും കളിക്കൂ</span>
          </button>
        </div>

      </div>
    </div>
  );
}
