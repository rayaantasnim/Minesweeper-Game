import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { loadSessionTelemetry } from '../js/framework.js';
import { sound } from '../utils/audio.js';

export default function GatewayPage() {
  const [previousRun, setPreviousRun] = useState(null);

  useEffect(() => {
    const data = loadSessionTelemetry();
    if (data) {
      setPreviousRun(data);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-neutral-800">
      <Navbar activePage="gateway" />

      {/* Main Container - Compact Screen Geometry */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 pt-20 pb-6 flex flex-col justify-center">
        {/* Hero Card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 sm:p-6 transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.18)]">
          
          {/* Top Tag & Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b border-slate-100 pb-3">
            <div>
              <span className="text-xs font-semibold tracking-wider text-cyan-600 uppercase">
                Gateway &middot; Rules &amp; Matrix Protocol
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-800 tracking-tight mt-0.5">
                Minesweeper Lite <span className="font-light text-slate-400">|</span> <span className="text-cyan-600">Lottery Trap</span>
              </h1>
            </div>
            {previousRun && (
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-1.5 text-xs text-slate-600">
                <span className="font-semibold text-neutral-800">Last Score:</span>
                <span className="font-mono font-bold text-cyan-600 tabular-nums">
                  {previousRun.finalScore}/100
                </span>
                <span>&middot;</span>
                <span className="font-medium text-slate-500">{previousRun.ranking?.title}</span>
              </div>
            )}
          </div>

          {/* Grid Layout: Visual Graphic + Tactical Guidelines */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            
            {/* Minimal High-Key Visual Asset */}
            <div className="md:col-span-5 relative group overflow-hidden rounded-2xl border border-slate-100 shadow-xs bg-slate-100">
              <img
                src="/src/assets/images/minesweeper_hero_gateway_1792084861281.jpg"
                alt="Minesweeper Lite High-Key Matrix Visual"
                referrerPolicy="no-referrer"
                className="w-full h-48 sm:h-56 md:h-64 object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end p-3">
                <div className="text-white text-xs font-medium">
                  <span className="font-bold text-amber-300">14 Golden Coins</span> vs <span className="font-bold text-rose-300">2 Traps</span>
                </div>
              </div>
            </div>

            {/* Bulleted Guidelines Content */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-3">
              <div className="space-y-2.5">
                <h2 className="text-base font-bold text-neutral-800">
                  Arena Operating Directives
                </h2>
                
                <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                  <li className="flex items-start gap-2.5">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-cyan-100 text-cyan-700 font-bold text-xs shrink-0 mt-0.5">
                      1
                    </span>
                    <span>
                      <strong className="text-neutral-800">4x4 Matrix Structure:</strong> The arena grid consists of exactly 16 clean white tiles arranged in a tightly spaced tactical grid.
                    </span>
                  </li>

                  <li className="flex items-start gap-2.5">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-100 text-amber-700 font-bold text-xs shrink-0 mt-0.5">
                      2
                    </span>
                    <span>
                      <strong className="text-neutral-800">Coin vs Trap Ratio:</strong> Exactly 2 hidden cells harbor active mine trap variables, while 14 contain dynamic golden reward coins.
                    </span>
                  </li>

                  <li className="flex items-start gap-2.5">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs shrink-0 mt-0.5">
                      3
                    </span>
                    <span>
                      <strong className="text-neutral-800">Streak Cadence:</strong> Click unrevealed tiles to uncover safe nodes, building live rapid-fire chess commentary and velocity score multipliers.
                    </span>
                  </li>

                  <li className="flex items-start gap-2.5">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-rose-100 text-rose-700 font-bold text-xs shrink-0 mt-0.5">
                      4
                    </span>
                    <span>
                      <strong className="text-neutral-800">Sudden Death Trap:</strong> Detonating a single mine trap instantly terminates the active session and triggers the post-game telemetry audit.
                    </span>
                  </li>

                  <li className="flex items-start gap-2.5">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-bold text-xs shrink-0 mt-0.5">
                      5
                    </span>
                    <span>
                      <strong className="text-neutral-800">25-Second Par Window:</strong> Maintain rapid execution. Every 2 seconds past the 25.00s par incurs a 1-point telemetry penalty.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Action Button Row */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href="./play.html"
                  onClick={() => sound.playTick()}
                  className="flex-1 text-center py-3 px-6 rounded-2xl bg-neutral-900 text-white font-bold text-sm tracking-wide border-2 border-cyan-400 shadow-[0_0_18px_rgba(6,182,212,0.4)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(6,182,212,0.65)] hover:bg-neutral-800 active:scale-[0.98]"
                >
                  START CHALLENGE &rarr;
                </a>
                <a
                  href="./faq.html"
                  className="text-center py-3 px-5 rounded-2xl bg-white border border-slate-200 text-slate-700 font-semibold text-sm transition-all duration-300 hover:scale-[1.03] hover:border-cyan-300 hover:text-cyan-700 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                >
                  Inquiry Matrix
                </a>
              </div>
            </div>

          </div>

          {/* Quick Sub-strip: Core Mathematical Parameters */}
          <div className="mt-5 pt-3 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10px] uppercase">Grid Nodes</span>
              <span className="font-extrabold text-neutral-800 text-sm font-mono">16 Cells</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10px] uppercase">Max Safe Yield</span>
              <span className="font-extrabold text-amber-600 text-sm font-mono">14 Coins</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10px] uppercase">Lethal Traps</span>
              <span className="font-extrabold text-rose-600 text-sm font-mono">2 Mines</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10px] uppercase">Temporal Par</span>
              <span className="font-extrabold text-cyan-600 text-sm font-mono">25.00s</span>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
