import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import gsap from 'gsap';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import {
  GRID_CONFIG,
  calculateTelemetryMatrix,
  saveSessionTelemetry,
  selectChessReaction,
} from '../js/framework.js';
import { sound } from '../utils/audio.js';

export default function PlayPage() {
  // Tile state: 16 items
  // item: { id: number, isMine: boolean, isRevealed: boolean }
  const [tiles, setTiles] = useState([]);
  const [gameStatus, setGameStatus] = useState('READY'); // 'READY' | 'PLAYING' | 'WON' | 'LOST' | 'EXTRACTED'
  const [startTime, setStartTime] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [safeUncovered, setSafeUncovered] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [lastCommentary, setLastCommentary] = useState(null);

  const timerRef = useRef(null);
  const gridContainerRef = useRef(null);
  const commentaryRef = useRef(null);
  const tileRefs = useRef([]);
  const lastClickTimeRef = useRef(0);

  // Initialize fresh 4x4 matrix
  const initGame = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;

    // Pick 2 distinct mine indices out of 16
    const indices = Array.from({ length: GRID_CONFIG.TOTAL_TILES }, (_, i) => i);
    const mineIndices = new Set();
    while (mineIndices.size < GRID_CONFIG.MINE_COUNT) {
      const rand = Math.floor(Math.random() * indices.length);
      mineIndices.add(rand);
    }

    const initialTiles = indices.map((idx) => ({
      id: idx,
      isMine: mineIndices.has(idx),
      isRevealed: false,
    }));

    setTiles(initialTiles);
    setGameStatus('READY');
    setStartTime(null);
    setElapsedSeconds(0);
    setSafeUncovered(0);
    setCurrentStreak(0);
    setMaxStreak(0);
    setTotalClicks(0);
    setLastCommentary({ text: 'Arena Ready. Uncover first safe node!', category: 'Accuracy', icon: '⚡' });
    lastClickTimeRef.current = 0;
  };

  useEffect(() => {
    initGame();
    return () => clearInterval(timerRef.current);
  }, []);

  // Timer loop when PLAYING
  useEffect(() => {
    if (gameStatus === 'PLAYING' && startTime) {
      timerRef.current = window.setInterval(() => {
        const now = performance.now();
        const diff = (now - startTime) / 1000;
        setElapsedSeconds(diff);
      }, 35);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [gameStatus, startTime]);

  // Animate commentary burst on update
  useEffect(() => {
    if (lastCommentary && commentaryRef.current) {
      gsap.fromTo(
        commentaryRef.current,
        { scale: 0.85, opacity: 0, y: -8 },
        { scale: 1, opacity: 1, y: 0, duration: 0.25, ease: 'back.out(2)' }
      );
    }
  }, [lastCommentary]);

  // Handle tile click
  const handleTileClick = (index) => {
    if (gameStatus === 'WON' || gameStatus === 'LOST' || gameStatus === 'EXTRACTED') return;
    const tile = tiles[index];
    if (tile.isRevealed) return;

    sound.init();

    const now = performance.now();
    let currentStart = startTime;
    if (gameStatus === 'READY' || !startTime) {
      currentStart = now;
      setStartTime(currentStart);
      setGameStatus('PLAYING');
    }

    const deltaSeconds = lastClickTimeRef.current > 0 ? (now - lastClickTimeRef.current) / 1000 : 1;
    lastClickTimeRef.current = now;

    setTotalClicks((prev) => prev + 1);

    const tileEl = tileRefs.current[index];

    // Check if MINE
    if (tile.isMine) {
      sound.playMineDetonation();

      // GSAP Tremor & Red Flash on grid
      if (gridContainerRef.current) {
        gsap.to(gridContainerRef.current, {
          x: 8,
          duration: 0.05,
          repeat: 5,
          yoyo: true,
          ease: 'power1.inOut',
          onComplete: () => {
            gsap.set(gridContainerRef.current, { x: 0 });
          },
        });
      }

      // Flip the clicked mine card
      if (tileEl) {
        gsap.to(tileEl, {
          rotateY: 180,
          scale: 1.05,
          duration: 0.25,
          ease: 'power2.out',
        });
      }

      // Reveal all tiles
      const updatedTiles = tiles.map((t) => ({ ...t, isRevealed: true }));
      setTiles(updatedTiles);
      setGameStatus('LOST');
      setCurrentStreak(0);

      const finalElapsed = currentStart ? (performance.now() - currentStart) / 1000 : elapsedSeconds;
      setElapsedSeconds(finalElapsed);

      const commentary = { text: 'Critical Detonation! Trap Tripped!', category: 'Recovery', icon: '💥' };
      setLastCommentary(commentary);

      // Save telemetry and route to results
      const telemetry = calculateTelemetryMatrix({
        durationSeconds: finalElapsed,
        safeTilesUncovered: safeUncovered,
        detonated: true,
        totalSafeTiles: GRID_CONFIG.SAFE_COINS_COUNT,
        totalClicks: totalClicks + 1,
        maxStreak: maxStreak,
      });
      saveSessionTelemetry(telemetry);

      setTimeout(() => {
        window.location.href = './results.html';
      }, 1500);

      return;
    }

    // SAFE TILE: Golden Reward Coin
    sound.playCoin();

    // GSAP Flip animation & Lime green pulse
    if (tileEl) {
      gsap.to(tileEl, {
        rotateY: 180,
        scale: 1.05,
        duration: 0.22,
        ease: 'power2.out',
        onComplete: () => {
          gsap.to(tileEl, { scale: 1, duration: 0.15 });
        },
      });
    }

    const nextSafe = safeUncovered + 1;
    const nextStreak = currentStreak + 1;
    const nextMaxStreak = Math.max(maxStreak, nextStreak);

    setSafeUncovered(nextSafe);
    setCurrentStreak(nextStreak);
    setMaxStreak(nextMaxStreak);

    // Update tile state
    const updatedTiles = tiles.map((t, idx) =>
      idx === index ? { ...t, isRevealed: true } : t
    );
    setTiles(updatedTiles);

    // Chess reaction trigger
    const reaction = selectChessReaction({
      speedSeconds: deltaSeconds,
      isStreak: nextStreak >= 3,
      streakCount: nextStreak,
      isRecovery: false,
    });
    setLastCommentary(reaction);

    // Check Victory condition: all 14 coins uncovered
    if (nextSafe >= GRID_CONFIG.SAFE_COINS_COUNT) {
      sound.playVictory();
      setGameStatus('WON');

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#06b6d4', '#eab308', '#10b981', '#f59e0b'],
        });
      } catch {}

      const finalElapsed = currentStart ? (performance.now() - currentStart) / 1000 : elapsedSeconds;
      setElapsedSeconds(finalElapsed);

      const winCommentary = { text: '14/14 Flawless Sweep! Quantum Mastery!', category: 'Accuracy', icon: '👑' };
      setLastCommentary(winCommentary);

      const telemetry = calculateTelemetryMatrix({
        durationSeconds: finalElapsed,
        safeTilesUncovered: nextSafe,
        detonated: false,
        totalSafeTiles: GRID_CONFIG.SAFE_COINS_COUNT,
        totalClicks: totalClicks + 1,
        maxStreak: nextMaxStreak,
      });
      saveSessionTelemetry(telemetry);

      setTimeout(() => {
        window.location.href = './results.html';
      }, 1500);
    }
  };

  // Voluntary Early Cash Out
  const handleCashOut = () => {
    if (safeUncovered === 0 || gameStatus !== 'PLAYING') return;

    sound.playVictory();
    setGameStatus('EXTRACTED');

    const finalElapsed = startTime ? (performance.now() - startTime) / 1000 : elapsedSeconds;
    setElapsedSeconds(finalElapsed);

    const telemetry = calculateTelemetryMatrix({
      durationSeconds: finalElapsed,
      safeTilesUncovered: safeUncovered,
      detonated: false,
      totalSafeTiles: GRID_CONFIG.SAFE_COINS_COUNT,
      totalClicks: totalClicks,
      maxStreak: maxStreak,
    });
    saveSessionTelemetry(telemetry);

    setTimeout(() => {
      window.location.href = './results.html';
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-neutral-800">
      <Navbar activePage="play" />

      {/* Main Container - Compact Screen Geometry */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-3 sm:px-4 pt-18 pb-4 flex flex-col justify-center">
        
        {/* Arena Header HUD Card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-3 mb-3 transition-all duration-300">
          <div className="flex items-center justify-between gap-2">
            
            {/* Live Fractional Timer */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 text-xs uppercase font-mono">Time</span>
              <span className="font-mono font-extrabold text-base sm:text-lg text-neutral-900 tabular-nums">
                {elapsedSeconds.toFixed(2)}s
              </span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                elapsedSeconds <= GRID_CONFIG.PAR_TIME_SECONDS
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'bg-rose-50 text-rose-600'
              }`}>
                Par 25s
              </span>
            </div>

            {/* Score / Coins Metrix */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-xs font-semibold">
                <span className="text-amber-500">🪙</span>
                <span className="font-mono font-bold text-neutral-900 tabular-nums">
                  {safeUncovered}
                </span>
                <span className="text-slate-400">/14</span>
              </div>

              {/* Streak */}
              <div className="flex items-center gap-1 text-xs font-semibold">
                <span>🔥</span>
                <span className="font-mono font-bold text-orange-600 tabular-nums">
                  {currentStreak}
                </span>
              </div>
            </div>

            {/* Cash Out Button */}
            <button
              onClick={handleCashOut}
              disabled={safeUncovered === 0 || gameStatus !== 'PLAYING'}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                safeUncovered > 0 && gameStatus === 'PLAYING'
                  ? 'bg-amber-400 text-neutral-900 shadow-[0_0_15px_rgba(245,158,11,0.4)] hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(245,158,11,0.6)] active:scale-[0.98]'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              Cash Out 💰
            </button>
          </div>

          {/* Live Chess Commentary Burst Bar */}
          {lastCommentary && (
            <div
              ref={commentaryRef}
              className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-1.5 font-bold text-neutral-800">
                <span className="text-base">{lastCommentary.icon}</span>
                <span className="tracking-tight text-cyan-600 drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]">
                  {lastCommentary.text}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">
                {lastCommentary.category}
              </span>
            </div>
          )}
        </div>

        {/* 4x4 Card Grid Arena */}
        <div
          ref={gridContainerRef}
          className="bg-white rounded-3xl border border-slate-100 shadow-sm p-3 sm:p-4 aspect-square max-w-[460px] mx-auto w-full flex flex-col justify-center"
        >
          <div className="grid grid-cols-4 gap-2 sm:gap-3 w-full h-full">
            {tiles.map((tile, idx) => {
              const isFlipped = tile.isRevealed;

              return (
                <div
                  key={tile.id}
                  className="perspective-1000 w-full h-full"
                >
                  <button
                    ref={(el) => (tileRefs.current[idx] = el)}
                    onClick={() => handleTileClick(idx)}
                    disabled={tile.isRevealed || gameStatus === 'LOST' || gameStatus === 'WON'}
                    aria-label={`Tile ${idx + 1}`}
                    className={`relative w-full h-full rounded-2xl transform-style-3d cursor-pointer select-none transition-all duration-300 ${
                      !isFlipped
                        ? 'bg-white border border-slate-200/90 shadow-sm hover:scale-[1.03] hover:border-cyan-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.35)] active:scale-95'
                        : tile.isMine
                        ? 'shadow-[0_0_22px_rgba(244,63,94,0.55)] border-rose-300'
                        : 'shadow-[0_0_20px_rgba(132,204,22,0.5)] border-emerald-300'
                    }`}
                    style={{
                      transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    }}
                  >
                    {/* Front Face (Unrevealed pure clean white tile) */}
                    <div className="absolute inset-0 rounded-2xl bg-white flex items-center justify-center backface-hidden">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-200/80 group-hover:bg-cyan-400 transition-colors" />
                    </div>

                    {/* Back Face (Revealed node: Golden Coin OR Lethal Mine) */}
                    <div
                      className={`absolute inset-0 rounded-2xl flex flex-col items-center justify-center backface-hidden rotate-y-180 ${
                        tile.isMine
                          ? 'bg-rose-50 border border-rose-200 text-rose-600'
                          : 'bg-emerald-50/80 border border-emerald-200 text-amber-600'
                      }`}
                    >
                      {tile.isMine ? (
                        <div className="flex flex-col items-center">
                          <span className="text-2xl sm:text-3xl animate-bounce">💣</span>
                          <span className="text-[9px] font-extrabold text-rose-600 uppercase font-mono mt-0.5">
                            TRAP
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <span className="text-2xl sm:text-3xl filter drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]">
                            🪙
                          </span>
                          <span className="text-[9px] font-extrabold text-emerald-700 uppercase font-mono mt-0.5">
                            +SAFE
                          </span>
                        </div>
                      )}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Status & Refresh Row */}
        <div className="mt-3 flex items-center justify-between px-2 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
            <span className="font-medium">16 Nodes &middot; 2 Traps &middot; 14 Golden Coins</span>
          </div>

          <button
            onClick={initGame}
            className="flex items-center gap-1 font-semibold text-slate-700 hover:text-cyan-600 transition-colors py-1 px-2.5 rounded-lg hover:bg-white"
          >
            <span>Reset Grid</span>
            <span>🔄</span>
          </button>
        </div>

      </main>

      <Footer />
    </div>
  );
}
