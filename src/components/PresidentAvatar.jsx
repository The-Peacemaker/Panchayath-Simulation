import React from 'react';

export default function PresidentAvatar({ avatarId = 'khadi', customImage = null, size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'w-10 h-10 text-xl border-2',
    md: 'w-14 h-14 text-2xl border-2',
    lg: 'w-20 h-20 text-4xl border-3',
    xl: 'w-28 h-28 text-5xl border-4'
  };

  if (customImage) {
    return (
      <div className={`relative rounded-full overflow-hidden border-amber-600 shadow-md bg-amber-100 flex-shrink-0 ${sizeClasses[size] || sizeClasses.md} ${className}`}>
        <img src={customImage} alt="പ്രസിഡന്റ്" className="w-full h-full object-cover" />
      </div>
    );
  }

  // Pre-designed SVG Caricature Avatars for Kerala Panchayat Presidents
  return (
    <div className={`relative rounded-full overflow-hidden border-amber-600 shadow-md flex-shrink-0 flex items-center justify-center ${sizeClasses[size] || sizeClasses.md} ${className}`}>
      {avatarId === 'comrade' ? (
        // Comrade Manoharan (Red shawl, resolute face, mustache)
        <svg viewBox="0 0 100 100" className="w-full h-full bg-rose-100">
          <circle cx="50" cy="50" r="48" fill="#FEE2E2" />
          {/* Shirt & Red Shawl */}
          <path d="M15 100 C20 70, 80 70, 85 100 Z" fill="#E2E8F0" />
          <path d="M18 100 C22 75, 45 78, 48 100 Z" fill="#DC2626" />
          {/* Head & Neck */}
          <rect x="42" y="55" width="16" height="15" fill="#D97706" opacity="0.6" />
          <ellipse cx="50" cy="42" rx="22" ry="24" fill="#FBBF24" />
          {/* Hair */}
          <path d="M28 35 C28 20, 72 20, 72 35 C65 24, 35 24, 28 35 Z" fill="#1E293B" />
          {/* Spectacles & Eyes */}
          <circle cx="41" cy="40" r="6" fill="none" stroke="#0F172A" strokeWidth="2.5" />
          <circle cx="59" cy="40" r="6" fill="none" stroke="#0F172A" strokeWidth="2.5" />
          <line x1="47" y1="40" x2="53" y2="40" stroke="#0F172A" strokeWidth="2.5" />
          <circle cx="41" cy="40" r="2" fill="#0F172A" />
          <circle cx="59" cy="40" r="2" fill="#0F172A" />
          {/* Revolutionary Mustache */}
          <path d="M38 49 Q50 47 62 49 Q50 55 38 49 Z" fill="#1E293B" />
          {/* Determined Smile */}
          <path d="M44 57 Q50 59 56 57" stroke="#92400E" strokeWidth="2" fill="none" />
        </svg>
      ) : avatarId === 'teacher' ? (
        // Teacher Vijayamma (Saree, round glasses, bindi)
        <svg viewBox="0 0 100 100" className="w-full h-full bg-emerald-50">
          <circle cx="50" cy="50" r="48" fill="#ECFDF5" />
          {/* Kasavu Saree */}
          <path d="M15 100 C20 70, 80 70, 85 100 Z" fill="#FFFDF0" />
          <path d="M50 72 L85 100 L75 100 L45 74 Z" fill="#D97706" />
          {/* Head & Neck */}
          <rect x="43" y="56" width="14" height="15" fill="#D97706" opacity="0.6" />
          <ellipse cx="50" cy="43" rx="20" ry="23" fill="#FDE68A" />
          {/* Hair Bun */}
          <circle cx="50" cy="22" r="10" fill="#1E293B" />
          <path d="M30 38 C30 25, 70 25, 70 38 C60 30, 40 30, 30 38 Z" fill="#1E293B" />
          {/* Red Bindi */}
          <circle cx="50" cy="33" r="2.5" fill="#DC2626" />
          {/* Round Glasses */}
          <circle cx="42" cy="42" r="5.5" fill="none" stroke="#78350F" strokeWidth="2" />
          <circle cx="58" cy="42" r="5.5" fill="none" stroke="#78350F" strokeWidth="2" />
          <line x1="47.5" y1="42" x2="52.5" y2="42" stroke="#78350F" strokeWidth="2" />
          <circle cx="42" cy="42" r="1.8" fill="#1E293B" />
          <circle cx="58" cy="42" r="1.8" fill="#1E293B" />
          {/* Strict Smile */}
          <path d="M45 54 Q50 56 55 54" stroke="#92400E" strokeWidth="2" fill="none" />
        </svg>
      ) : avatarId === 'gulf' ? (
        // Gulf Babu (Sunglasses, safari collar, modern haircut)
        <svg viewBox="0 0 100 100" className="w-full h-full bg-sky-50">
          <circle cx="50" cy="50" r="48" fill="#E0F2FE" />
          {/* Safari Suit */}
          <path d="M15 100 C20 70, 80 70, 85 100 Z" fill="#334155" />
          <polygon points="50,75 42,90 58,90" fill="#F8FAFC" />
          {/* Head & Neck */}
          <rect x="42" y="55" width="16" height="15" fill="#D97706" opacity="0.6" />
          <ellipse cx="50" cy="42" rx="22" ry="24" fill="#FDE68A" />
          {/* Sleek Hair */}
          <path d="M28 32 C30 18, 70 18, 72 32 C65 22, 35 22, 28 32 Z" fill="#0F172A" />
          {/* Stylish Aviator Sunglasses */}
          <path d="M33 38 Q42 36 48 40 Q46 50 36 49 Z" fill="#0F172A" />
          <path d="M52 40 Q58 36 67 38 Q64 49 54 50 Z" fill="#0F172A" />
          <line x1="47" y1="39" x2="53" y2="39" stroke="#EAB308" strokeWidth="2" />
          {/* Trimmed French Beard / Mustache */}
          <path d="M42 52 Q50 50 58 52 Q50 55 42 52 Z" fill="#0F172A" />
          <ellipse cx="50" cy="59" rx="3" ry="2" fill="#0F172A" />
        </svg>
      ) : (
        // Khadi Surendran (Traditional Kerala Leader: Khadi jubba, sandalwood tilak, thick mustache)
        <svg viewBox="0 0 100 100" className="w-full h-full bg-amber-50">
          <circle cx="50" cy="50" r="48" fill="#FEF3C7" />
          {/* Khadi Jubba with Golden Border */}
          <path d="M15 100 C20 70, 80 70, 85 100 Z" fill="#FFFFFF" stroke="#E2E8F0" />
          <line x1="50" y1="72" x2="50" y2="100" stroke="#D97706" strokeWidth="2" />
          {/* Head & Neck */}
          <rect x="42" y="54" width="16" height="16" fill="#D97706" opacity="0.6" />
          <ellipse cx="50" cy="42" rx="22" ry="24" fill="#FBBF24" />
          {/* Salt & Pepper Hair */}
          <path d="M28 34 C28 20, 72 20, 72 34 C64 24, 36 24, 28 34 Z" fill="#334155" />
          {/* Sandalwood Kurikoot / Chandanam Tilak */}
          <line x1="45" y1="28" x2="55" y2="28" stroke="#FEF3C7" strokeWidth="2" strokeLinecap="round" />
          <circle cx="50" cy="28" r="1.5" fill="#DC2626" />
          {/* Spectacles */}
          <rect x="34" y="36" width="13" height="9" rx="2" fill="none" stroke="#0F172A" strokeWidth="2" />
          <rect x="53" y="36" width="13" height="9" rx="2" fill="none" stroke="#0F172A" strokeWidth="2" />
          <line x1="47" y1="40" x2="53" y2="40" stroke="#0F172A" strokeWidth="2" />
          <circle cx="40.5" cy="40.5" r="2" fill="#0F172A" />
          <circle cx="59.5" cy="40.5" r="2" fill="#0F172A" />
          {/* Classic Kerala Mustache */}
          <path d="M35 48 C42 46, 48 51, 50 49 C52 51, 58 46, 65 48 C61 54, 39 54, 35 48 Z" fill="#1E293B" />
          {/* Friendly Cunning Smile */}
          <path d="M43 57 Q50 61 57 57" stroke="#78350F" strokeWidth="2" fill="none" />
        </svg>
      )}
    </div>
  );
}
