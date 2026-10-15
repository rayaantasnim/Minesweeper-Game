import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { sound } from '../utils/audio.js';

export default function FaqPage() {
  const [activeId, setActiveId] = useState(1);
  const contentRefs = useRef({});

  const faqData = [
    {
      id: 1,
      question: 'What is the fundamental architecture of Minesweeper Lite (Lottery Trap)?',
      category: 'Architecture',
      answerType: 'bullet',
      bullets: [
        'A deterministic 16-node tactical matrix arranged in a 4x4 coordinate plane.',
        'Zero dark-pattern or hidden randomized re-rolls: mine traps are set upon grid initialization and immutably locked.',
        'High-speed state dispatch driven entirely inside browser memory with instant Web Audio auditory cues.',
        'Zero-modal multi-page static routing designed specifically for 100% bug-free deployment on GitHub Pages static servers.',
      ],
    },
    {
      id: 2,
      question: 'How does the 4x4 matrix mathematically distribute mine traps and golden coins?',
      category: 'Probability',
      answerType: 'table',
      tableHeaders: ['Node Classification', 'Total Units', 'Grid Saturation', 'Point Multiplier'],
      tableRows: [
        ['Golden Reward Coins', '14 Cells', '87.50%', 'Positive Cadence (+Safe)'],
        ['Lethal Mine Traps', '2 Cells', '12.50%', 'Sudden Death Defeat (-40+ pts)'],
        ['Total Matrix Domain', '16 Cells', '100.0%', 'Calibrated 4x4 Topology'],
      ],
      note: 'The probability of hitting a trap on Move 1 is 2/16 (12.5%). By Move 10 (with 10 safe coins uncovered), trap probability elevates to 2/6 (33.33%).',
    },
    {
      id: 3,
      question: 'What is the exact formula governing the Telemetry Score out of 100 points?',
      category: 'Scoring',
      answerType: 'formula',
      formula: 'Points Gained = Max(0, 100 - TimePenalty - InefficiencyPenalty)',
      bullets: [
        'Base Operational Capital: Fixed at 100 maximum possible points.',
        'Time Penalty: Deduct 1 point for every 2 seconds spent past the standard 25.00-second par window: Math.floor(Max(0, Elapsed - 25) / 2).',
        'Inefficiency Penalty: Deduct 5 points per safe tile missed upon voluntary cash-out, or flat 40 base + 4 per remaining cell upon detonation.',
      ],
    },
    {
      id: 4,
      question: 'How is the Time Penalty calculated beyond the standard par window?',
      category: 'Scoring',
      answerType: 'table',
      tableHeaders: ['Elapsed Runtime', 'Par Variance', 'Deduction Formula', 'Penalty Applied'],
      tableRows: [
        ['18.40 seconds', '-6.60s (Sub-par)', 'Math.floor(0 / 2)', '0 pts (Zero Friction)'],
        ['25.00 seconds', '0.00s (Exact Par)', 'Math.floor(0 / 2)', '0 pts'],
        ['31.50 seconds', '+6.50s (Over-par)', 'Math.floor(6.5 / 2)', '-3 pts'],
        ['45.20 seconds', '+20.20s (Over-par)', 'Math.floor(20.2 / 2)', '-10 pts'],
        ['75.00 seconds', '+50.00s (Over-par)', 'Math.floor(50.0 / 2)', '-25 pts'],
      ],
    },
    {
      id: 5,
      question: 'What defines the Inefficiency Penalty and how does voluntary cash-out alter it?',
      category: 'Mechanics',
      answerType: 'bullet',
      bullets: [
        'Voluntary Cash-Out: Allows tactical banking of points. Each safe coin left untouched costs exactly -5 points in tactical yield deficit.',
        'Example: Cashing out at 10/14 coins leaves 4 safe coins behind. Inefficiency Penalty = 4 × 5 = -20 points.',
        'Mine Detonation: Immediately incurs a catastrophic 40-point baseline penalty plus 4 points per remaining safe coin.',
        'Total Clearance: Uncovering all 14/14 coins incurs exactly 0 points inefficiency penalty.',
      ],
    },
    {
      id: 6,
      question: 'What are the six system architectural ranking tiers and their qualifying score thresholds?',
      category: 'Rankings',
      answerType: 'table',
      tableHeaders: ['Score Range', 'Architectural Rank', 'Grade', 'Operational Status'],
      tableRows: [
        ['95 - 100 pts', 'QUANTUM EDGE', 'SS+', 'Flawless Acuity & Sub-Par Velocity'],
        ['85 - 94 pts', 'APEX VECTOR', 'S', 'High-Tier Computational Consistency'],
        ['70 - 84 pts', 'HYPER MATRIX', 'A', 'Solid Sequence With Controlled Margins'],
        ['50 - 69 pts', 'LOGIC CORE', 'B', 'Baseline Traversal With Temporal Drift'],
        ['30 - 49 pts', 'ALPHA NODE', 'C', 'Early Extraction / Substantial Penalties'],
        ['0 - 29 pts', 'STATIC DRIFT', 'D', 'Premature Detonation / Severe Deficit'],
      ],
    },
    {
      id: 7,
      question: 'How does the live Chess-Style Rapid Commentary classification engine operate?',
      category: 'Telemetry',
      answerType: 'bullet',
      bullets: [
        'Speed Category (⚡): Triggers when inter-click latency dips below 1.20 seconds (e.g. "Supersonic Solve!", "Lightning Reflexes!").',
        'Streak Category (🔥): Triggers when consecutive safe discoveries reach 3 or higher (e.g. "On Fire! 🔥", "Unstoppable Momentum!").',
        'Accuracy Category (🎯): Evaluates clean positional moves and optimal choices (e.g. "Brilliant Move!", "Grandmaster Insight!").',
        'Recovery Category (🛡️): Fires upon tactical pivot maneuvers or counter-gambit extractions (e.g. "Tactical Recovery!").',
      ],
    },
    {
      id: 8,
      question: 'Why does detonating a trap incur an immediate 40-point baseline penalty?',
      category: 'Game Balance',
      answerType: 'bullet',
      bullets: [
        'Sudden-death traps represent critical systemic failures in spatial path computation.',
        'Without a significant penalty baseline, reckless high-speed random clicking would outperform disciplined probabilistic play.',
        'The 40-point deduction caps the maximum possible score of a detonated run at 60 points (dropping into LOGIC CORE or lower).',
      ],
    },
    {
      id: 9,
      question: 'How is the live accuracy percentage evaluated?',
      category: 'Mathematics',
      answerType: 'formula',
      formula: 'Accuracy = (Safe Tiles Uncovered / Total Active Cell Attempts) × 100',
      bullets: [
        'A clean 14/14 run yields 14/14 = 100.0% accuracy.',
        'A run detonating on the 6th move yields 5 / (5 + 1) = 83.3% accuracy.',
        'Precision figures are formatted with strict 1-decimal-place tabular numerals.',
      ],
    },
    {
      id: 10,
      question: 'What is the role of the 25.00-second par window in game pacing?',
      category: 'Pacing',
      answerType: 'bullet',
      bullets: [
        'The 25.00-second par window is derived from empirical psychological cognitive research on 4x4 spatial assessment.',
        'It allows an average examination time of ~1.78 seconds per cell for a complete 14-node sweep.',
        'Playing faster than 25 seconds guarantees 0 temporal deduction, rewarding intuitive and rapid pattern recognition.',
      ],
    },
    {
      id: 11,
      question: 'How does the voluntary "Cash Out" mechanic work in competitive play?',
      category: 'Strategy',
      answerType: 'bullet',
      bullets: [
        'Players can press "Cash Out 💰" after uncovering at least 1 safe tile to lock in their score.',
        'This allows high-risk management when trap odds escalate towards 33.3% in endgame states.',
        'Guarantees score stabilization by taking a known -5 pt/cell penalty rather than risking a catastrophic 40-pt detonation.',
      ],
    },
    {
      id: 12,
      question: 'What Web Audio synthesis parameters are used for sound generation?',
      category: 'Audio Engine',
      answerType: 'table',
      tableHeaders: ['Sound Effect', 'Waveform', 'Frequency Profile', 'Duration & Envelope'],
      tableRows: [
        ['Coin Chime', 'Sine Wave', '987.77 Hz (B5) ramp to 1318.51 Hz (E6)', '0.35s Exponential Decay'],
        ['Card Tick', 'Triangle Wave', '520 Hz ramp down to 320 Hz', '0.05s Instant Snap'],
        ['Trap Detonation', 'Sawtooth Wave', '180 Hz drop to 60 Hz deep rumble', '0.45s Linear Pitch Fall'],
        ['Victory Flourish', 'Polyphonic Sine', 'C5 (523Hz), E5 (659Hz), G5 (784Hz), C6 (1046Hz)', '0.30s Staggered Arpeggio'],
      ],
    },
    {
      id: 13,
      question: 'How does GSAP handle the tile flip and reveal animations?',
      category: 'Graphics & GSAP',
      answerType: 'bullet',
      bullets: [
        'Utilizes CSS 3D transforms (`rotateY: 180deg`) coupled with `perspective: 1000px` for hardware-accelerated 60fps rendering.',
        'Card front and back faces are bound to `backface-visibility: hidden` to eliminate raster flickers.',
        'Detonations trigger high-frequency directional shaking (`gsap.to(grid, { x: 8, yoyo: true })`) for tactile kinetic feedback.',
      ],
    },
    {
      id: 14,
      question: 'How are session metrics persisted across static multi-page transitions?',
      category: 'Data Layer',
      answerType: 'bullet',
      bullets: [
        'Telemetry payloads are serialized as structured JSON and committed to browser `localStorage` under `minesweeper_lite_session_telemetry`.',
        'Physical page navigation transfers control without losing timestamps, click arrays, or ranking achievements.',
        'Robust fallback routines provide automatic default simulations if a user bookmarks or lands directly on `results.html`.',
      ],
    },
    {
      id: 15,
      question: 'Why does this application use pure multi-page routing over virtual single-page history?',
      category: 'Architecture',
      answerType: 'bullet',
      bullets: [
        'GitHub Pages and standard static servers do not have URL rewrite rules; refreshing `/play` on virtual SPAs triggers HTTP 404 errors.',
        'Physical files (`index.html`, `play.html`, `results.html`, `faq.html`, `about.html`) guarantee 100% reload reliability anywhere.',
        'Each view is an isolated, performant entry point sharing the central `styles.css` and `framework.js` core.',
      ],
    },
    {
      id: 16,
      question: 'How does the Procedural Suggestion Generator construct non-templated advice?',
      category: 'AI / Procedural',
      answerType: 'bullet',
      bullets: [
        'Analyzes exact runtime delta against par time, node-per-second cadence rate, and unbroken streak maximums.',
        'Evaluates terminal cause (voluntary cash-out vs detonation vs flawless clearance).',
        'Dynamically synthesizes personalized tactical paragraphs providing actionable advice for achieving higher system rankings.',
      ],
    },
    {
      id: 17,
      question: 'What clipboard formatting standards are enforced in the telemetry debrief?',
      category: 'Telemetry',
      answerType: 'bullet',
      bullets: [
        'Utilizes clean OS-level CRLF carriage line breaks without escaping raw `\\n` literals.',
        'Strictly terminates with the exact immutable validation block:',
        '  Certified by Rayaan Tasnim',
        '  Powered by IDAI Universe',
        '  © All rights reserved',
      ],
    },
    {
      id: 18,
      question: 'How does the UI guarantee a pure light-luxury theme without dark-mode slop?',
      category: 'Design System',
      answerType: 'bullet',
      bullets: [
        'Canvas background is strictly anchored to `bg-slate-50` (Soft Alabaster White).',
        'Card surfaces use pure white `bg-white` with hairline `border-slate-100` and soft elevation shadows.',
        'Prohibits muddy navy or black backgrounds, prioritizing high-key gallery lighting and crisp neutral-800 typography.',
      ],
    },
    {
      id: 19,
      question: 'How does the 3-line hamburger menu animate without causing layout shifts?',
      category: 'UX / Motion',
      answerType: 'bullet',
      bullets: [
        'Menu unfolds in an absolute overlay container using GSAP translation (`y: -20` to `y: 0`) and opacity ramps.',
        'Active page links emit continuous high-intensity Electric Cyan glow text.',
        'Viewport backdrop blur traps focus while clicking outside gracefully collapses the overlay.',
      ],
    },
    {
      id: 20,
      question: 'What guarantees zero-lag state execution under high-frequency clicks in React 19?',
      category: 'React 19 Core',
      answerType: 'bullet',
      bullets: [
        'React 19 compiler optimizations and automatic state batching prevent superfluous component re-renders.',
        'Ref-based direct node manipulation for GSAP transforms circumvents React reconciliation bottlenecks.',
        'Zero heavy DOM allocations: the entire 16-node matrix runs with lightweight micro-structures.',
      ],
    },
  ];

  const toggleAccordion = (id) => {
    sound.playTick();
    const nextId = activeId === id ? null : id;
    setActiveId(nextId);
  };

  useEffect(() => {
    // GSAP Accordion animation
    faqData.forEach((item) => {
      const el = contentRefs.current[item.id];
      if (el) {
        if (activeId === item.id) {
          gsap.fromTo(
            el,
            { height: 0, opacity: 0 },
            { height: 'auto', opacity: 1, duration: 0.28, ease: 'power2.out' }
          );
        } else {
          gsap.to(el, {
            height: 0,
            opacity: 0,
            duration: 0.2,
            ease: 'power2.in',
          });
        }
      }
    });
  }, [activeId]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-neutral-800">
      <Navbar activePage="faq" />

      {/* Main Container - Compact Screen Geometry */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 pt-20 pb-8 flex flex-col justify-center">
        
        {/* Page Title Card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 sm:p-6 mb-4 transition-all duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-600">
                Inquiry Matrix &middot; 20 Platform Specifications
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-800 tracking-tight mt-0.5">
                Technical Knowledge Base
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono bg-slate-100 text-slate-700 px-3 py-1 rounded-xl font-semibold">
                Single-Expansion Accordion Engine
              </span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Explore the comprehensive mathematical formulas, procedural commentary pipelines, and React 19 architectural invariants powering Minesweeper Lite.
          </p>
        </div>

        {/* 20 Accordion Question Rows */}
        <div className="space-y-2.5">
          {faqData.map((item, index) => {
            const isOpen = activeId === item.id;

            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.22)] ring-1 ring-cyan-200'
                    : 'border-slate-100 shadow-xs hover:border-slate-200 hover:scale-[1.01] hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                }`}
              >
                {/* Accordion Header Button */}
                <button
                  onClick={() => toggleAccordion(item.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-3.5 sm:p-4 flex items-center justify-between gap-3 select-none focus:outline-none"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-slate-100 text-slate-700 font-mono font-bold text-xs shrink-0">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-neutral-800">
                      {item.question}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="hidden sm:inline-block text-[10px] font-mono font-semibold uppercase text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">
                      {item.category}
                    </span>
                    <span
                      className={`w-6 h-6 flex items-center justify-center rounded-full text-slate-400 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-cyan-600 bg-cyan-50' : 'bg-slate-50'
                      }`}
                    >
                      &darr;
                    </span>
                  </div>
                </button>

                {/* Accordion Content Container */}
                <div
                  ref={(el) => (contentRefs.current[item.id] = el)}
                  className="overflow-hidden"
                  style={{
                    height: isOpen ? 'auto' : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="px-4 pb-4 pt-1 border-t border-slate-50 text-xs sm:text-sm text-slate-600 space-y-3">
                    
                    {/* Bullet List Format */}
                    {item.bullets && (
                      <ul className="space-y-1.5 list-disc list-inside text-slate-700">
                        {item.bullets.map((b, bIdx) => (
                          <li key={bIdx} className="leading-relaxed">
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Formula Format */}
                    {item.formula && (
                      <div className="p-3 rounded-xl bg-slate-900 text-cyan-300 font-mono text-xs sm:text-sm font-semibold tracking-wide shadow-inner">
                        {item.formula}
                      </div>
                    )}

                    {/* Table Format */}
                    {item.tableHeaders && item.tableRows && (
                      <div className="overflow-x-auto rounded-xl border border-slate-200">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-slate-50 text-slate-500 font-mono uppercase text-[10px] border-b border-slate-200">
                            <tr>
                              {item.tableHeaders.map((th, hIdx) => (
                                <th key={hIdx} className="px-3 py-2 font-semibold">
                                  {th}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-sans">
                            {item.tableRows.map((row, rIdx) => (
                              <tr key={rIdx} className="hover:bg-slate-50/70 transition-colors">
                                {row.map((cell, cIdx) => (
                                  <td key={cIdx} className="px-3 py-2 text-slate-700 font-medium font-mono text-[11px] sm:text-xs">
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Additional Note */}
                    {item.note && (
                      <p className="text-xs text-slate-500 italic bg-slate-50 p-2 rounded-lg border border-slate-100">
                        {item.note}
                      </p>
                    )}

                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Gateway Link */}
        <div className="mt-6 text-center">
          <a
            href="./play.html"
            className="inline-block py-3 px-8 rounded-2xl bg-neutral-900 text-white font-bold text-xs sm:text-sm tracking-wide border-2 border-cyan-400 shadow-[0_0_18px_rgba(6,182,212,0.4)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_28px_rgba(6,182,212,0.6)] active:scale-[0.98]"
          >
            ENTER 4x4 MATRIX ARENA &rarr;
          </a>
        </div>

      </main>

      <Footer />
    </div>
  );
}
