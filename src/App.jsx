import React, { useState } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import PanchayatHeader from './components/PanchayatHeader';
import StatMeters from './components/StatMeters';
import HomeScreen from './components/HomeScreen';
import OathScreen from './components/OathScreen';
import DayScreen from './components/DayScreen';
import ConsequenceModal from './components/ConsequenceModal';
import EndingScreen from './components/EndingScreen';
import WallOfPresidentsModal from './components/WallOfPresidentsModal';

function GameContent() {
  const { state } = useGame();
  const { screen } = state;
  const [isWallOpen, setIsWallOpen] = useState(false);

  return (
    <div className="min-h-screen bg-kerala-bg flex flex-col font-malayalam selection:bg-kerala-gold selection:text-kerala-darkwood">
      {/* Top Panchayat Office Header */}
      <PanchayatHeader onOpenWall={() => setIsWallOpen(true)} />

      {/* Dynamic 4-Stat Meters (Active in game screens) */}
      {screen !== 'HOME' && <StatMeters />}

      {/* Main Interactive Screen Content */}
      <main className="flex-1 flex flex-col justify-center">
        {screen === 'HOME' && <HomeScreen onOpenWall={() => setIsWallOpen(true)} />}
        {screen === 'OATH' && <OathScreen />}
        {screen === 'DAY' && <DayScreen />}
        {screen === 'CONSEQUENCE' && (
          <>
            <DayScreen />
            <ConsequenceModal />
          </>
        )}
        {screen === 'ENDING' && <EndingScreen onOpenWall={() => setIsWallOpen(true)} />}
      </main>

      {/* Wall of Presidents Modal */}
      <WallOfPresidentsModal isOpen={isWallOpen} onClose={() => setIsWallOpen(false)} />

      {/* Footer */}
      <footer className="bg-kerala-parchment border-t-2 border-amber-900/20 py-3 px-4 text-center text-xs text-kerala-wood/80 font-medium">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            🏛️ <strong>ചക്കുംവള ഗ്രാമപഞ്ചായത്ത്</strong> — Useless Projects 3.0
          </div>
          <div className="italic text-[11px] text-kerala-wood/70">
            "എല്ലാ കഥാപാത്രങ്ങളും സാങ്കൽപ്പികം... മണികണ്ഠൻ ആനയൊഴികെ!" 🐘
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}
