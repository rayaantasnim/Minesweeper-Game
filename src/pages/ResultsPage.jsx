import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import {
  loadSessionTelemetry,
  generateProceduralSuggestion,
  buildClipboardPayload,
  calculateTelemetryMatrix,
} from '../js/framework.js';
import { sound } from '../utils/audio.js';

export default function ResultsPage() {
  const [telemetry, setTelemetry] = useState(null);
  const [suggestion, setSuggestion] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let data = loadSessionTelemetry();
    if (!data) {
      // Sensible fallback simulation if navigated to directly
      data = calculateTelemetryMatrix({
        durationSeconds: 22.45,
        safeTilesUncovered: 13,
        detonated: false,
        totalSafeTiles: 14,
        totalClicks: 13,
        maxStreak: 8,
      });
    }
    setTelemetry(data);
    const procedural = generateProceduralSuggestion(data);
    setSuggestion(procedural);
  }, []);

  const handleCopyClipboard = async () => {
    if (!telemetry) return;
    sound.playTick();
    const payload = buildClipboardPayload(telemetry, suggestion);
    try {
      await navigator.clipboard.writeText(payload);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = payload;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  if (!telemetry) return null;

  const scorePercentage = Math.max(0, Math.min(100, telemetry.finalScore));
  const strokeDashoffset = 283 - (283 * scorePercentage) / 100; // circle r=45, circumference ~ 282.7

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-neutral-800">
      <Navbar activePage="play" />

      {/* Main Container - Compact Screen Geometry */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 pt-20 pb-6 flex flex-col justify-center">
        
        {/* Main Telemetry Card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 sm:p-6 transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.18)]">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-600">
                Telemetry Verification &middot; Mission Debrief
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-800 tracking-tight mt-0.5">
                Session Performance Dashboard
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider border ${
                  telemetry.detonated
                    ? 'bg-rose-50 border-rose-200 text-rose-600'
                    : telemetry.safeTilesUncovered === telemetry.totalSafeTiles
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                    : 'bg-amber-50 border-amber-200 text-amber-600'
                }`}
              >
                {telemetry.detonated
                  ? 'Trap Detonated'
                  : telemetry.safeTilesUncovered === telemetry.totalSafeTiles
                  ? 'Flawless Clearance'
                  : 'Extracted Safe'}
              </span>
            </div>
          </div>

          {/* Primary Metrics Row: Neon Ring + Rank Badge */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center mb-6">
            
            {/* Neon Ring Circular Gauge */}
            <div className="md:col-span-5 flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50/70 border border-slate-100">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background Track */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#e2e8f0"
                    strokeWidth="7"
                    fill="transparent"
                  />
                  {/* Neon Glow Track */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke={telemetry.ranking?.color || '#06b6d4'}
                    strokeWidth="7"
                    strokeDasharray="283"
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-1000 ease-out filter drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]"
                  />
                </svg>

                {/* Score Number in Center */}
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-extrabold text-neutral-900 font-mono tracking-tight tabular-nums">
                    {telemetry.finalScore}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
                    / 100 PTS
                  </span>
                </div>
              </div>

              <span className="text-xs font-semibold text-slate-500 mt-2">
                Overall Operational Efficiency
              </span>
            </div>

            {/* Dynamic Rank Badge & Key Stats */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  System Architectural Tier
                </span>
                <div className="flex items-center gap-2.5 mt-1">
                  <h2
                    className="text-2xl sm:text-3xl font-extrabold tracking-tight"
                    style={{ color: telemetry.ranking?.color || '#06b6d4' }}
                  >
                    {telemetry.ranking?.title}
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-lg font-mono font-bold text-xs bg-slate-100 border border-slate-200 text-neutral-800">
                    Grade {telemetry.ranking?.grade}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {telemetry.ranking?.description}
                </p>
              </div>

              {/* Exact Fractional Duration & Live Accuracy */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">
                    Runtime Duration
                  </span>
                  <span className="text-xs font-bold text-neutral-800 font-mono block mt-0.5">
                    {telemetry.durationFormatted}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">
                    Live Accuracy
                  </span>
                  <span className="text-xs font-bold text-cyan-600 font-mono block mt-0.5 tabular-nums">
                    {telemetry.accuracy}% ({telemetry.safeTilesUncovered}/{telemetry.totalSafeTiles})
                  </span>
                </div>
              </div>

              {/* Scoring Formula Matrix Sub-Strip */}
              <div className="flex items-center justify-between text-xs font-mono p-2 rounded-xl bg-slate-100/70 text-slate-600">
                <span>Base: <b className="text-neutral-800">100</b></span>
                <span className="text-slate-300">|</span>
                <span className="text-rose-600">Time: <b>-{telemetry.timePenalty}</b></span>
                <span className="text-slate-300">|</span>
                <span className="text-rose-600">Deficit: <b>-{telemetry.inefficiencyPenalty}</b></span>
                <span className="text-slate-300">|</span>
                <span className="text-cyan-700 font-bold">Net: <b>{telemetry.finalScore}</b></span>
              </div>

            </div>

          </div>

          {/* Procedural Telemetry Suggestion Output */}
          <div className="mb-6 p-3.5 rounded-2xl bg-cyan-50/40 border border-cyan-100/80">
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="text-sm">🧠</span>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-800 font-mono">
                Procedural Strategy Analysis
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
              {suggestion}
            </p>
          </div>

          {/* Clipboard Payload Action & Control Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
            
            {/* Clipboard Payload Button */}
            <button
              onClick={handleCopyClipboard}
              className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs transition-all duration-300 hover:scale-[1.03] ${
                copied
                  ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                  : 'bg-white border border-slate-200 text-slate-700 hover:border-cyan-300 hover:text-cyan-700 hover:shadow-[0_0_20px_rgba(6,182,212,0.25)]'
              }`}
            >
              <span>{copied ? '✅ Report Copied!' : '📋 Copy Telemetry Report'}</span>
            </button>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-2.5">
              <a
                href="./play.html"
                onClick={() => sound.playTick()}
                className="flex-1 sm:flex-none text-center py-2.5 px-5 rounded-xl bg-neutral-900 text-white font-bold text-xs tracking-wide shadow-sm hover:bg-neutral-800 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] active:scale-[0.98]"
              >
                Play Again 🔄
              </a>

              <a
                href="./index.html"
                className="flex-1 sm:flex-none text-center py-2.5 px-4 rounded-xl bg-slate-100 text-neutral-800 font-semibold text-xs transition-all duration-300 hover:scale-[1.03] hover:bg-slate-200"
              >
                Dive Into New Game 🚀
              </a>
            </div>

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
