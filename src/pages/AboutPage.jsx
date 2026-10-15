import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { SYSTEM_RANKINGS } from '../js/framework.js';
import { sound } from '../utils/audio.js';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-neutral-800">
      <Navbar activePage="about" />

      {/* Main Container - Compact Screen Geometry */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 pt-20 pb-10 flex flex-col justify-center space-y-6">
        
        {/* Whitepaper Title Kicker */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 sm:p-6 transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 block">
            Architectural Whitepaper &middot; React 19 Specification
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-800 tracking-tight mt-1">
            System Design &amp; Engine Mechanics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-2xl leading-relaxed">
            An exhaustive architectural documentation examining the concurrent execution pipeline, zero-lag state machines, procedural telemetry matrices, and multi-page static guarantees implemented in Minesweeper Lite.
          </p>
        </div>

        {/* SECTION 1: Strict 5-Layer Flow */}
        {/* Layer 1: Core Heading | Layer 2: Slogan | Layer 3: 100+ Words Technical Brief | Layer 4: Bright Asset | Layer 5: Action Button */}
        <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 sm:p-6 transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.2)]">
          
          {/* Layer 1: Core Heading */}
          <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-800 tracking-tight">
            React 19 Concurrent Architecture &amp; Zero-Latency Execution
          </h2>

          {/* Layer 2: Slogan */}
          <p className="text-xs sm:text-sm font-semibold text-cyan-600 mt-0.5 mb-3 tracking-wide uppercase">
            Harnessing Next-Generation Fiber Scheduling for Uncompromised Micro-Second Interactivity
          </p>

          {/* Layer 3: 100+ Words Technical Brief */}
          <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2 mb-4">
            <p>
              In high-cadence spatial puzzle games like Minesweeper Lite, standard React re-render cycles introduce imperceptible yet cumulative micro-stutters when multiple state changes occur simultaneously (such as time slice updates, click counter increments, and commentary stream bursts). React 19 completely resolves these bottlenecks through automatic state transition batching and compiler-level hook optimizations that decouple UI rendering from high-frequency timer execution.
            </p>
            <p>
              By isolating imperative GSAP animation loops via direct DOM references (`useRef`), the application bypasses the virtual DOM reconciliation tree during rapid flip transitions and coordinate shakes. Meanwhile, React 19’s fine-grained fiber priority scheduler ensures that telemetry calculation and audio synthesis invocations execute synchronously without blocking the primary browser event loop. Component separation enforces that the 4x4 matrix grid re-renders only the targeted index node, maintaining 60 frames per second on mobile touch surfaces as well as high-refresh-rate desktop displays with zero memory leakage.
            </p>
          </div>

          {/* Layer 4: Bright Visual Asset */}
          <div className="relative group overflow-hidden rounded-2xl border border-slate-100 shadow-xs mb-4 bg-slate-100">
            <img
              src="/src/assets/images/minesweeper_react_architecture_1792084862251.jpg"
              alt="React 19 Concurrent Architecture Diagram Asset"
              referrerPolicy="no-referrer"
              className="w-full h-48 sm:h-64 object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-3 sm:p-4">
              <span className="text-white text-xs font-semibold">
                Optical Node Representation &middot; Isolated Virtual DOM Fiber Sub-Tree
              </span>
            </div>
          </div>

          {/* Layer 5: Action Button */}
          <div>
            <a
              href="./play.html"
              onClick={() => sound.playTick()}
              className="inline-block py-2.5 px-6 rounded-xl bg-neutral-900 text-white font-bold text-xs tracking-wide shadow-sm hover:bg-neutral-800 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
            >
              TEST REACT 19 ARENA SPEED &rarr;
            </a>
          </div>

        </section>

        {/* SECTION 2: Strict 5-Layer Flow */}
        {/* Layer 1: Core Heading | Layer 2: Slogan | Layer 3: 100+ Words Technical Brief | Layer 4: Bright Asset | Layer 5: Action Button */}
        <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 sm:p-6 transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.2)]">
          
          {/* Layer 1: Core Heading */}
          <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-800 tracking-tight">
            Procedural Telemetry Calculus &amp; Dynamic Mathematical Rankings
          </h2>

          {/* Layer 2: Slogan */}
          <p className="text-xs sm:text-sm font-semibold text-amber-600 mt-0.5 mb-3 tracking-wide uppercase">
            Quantifying Precision, Temporal Velocity, and Strategic Extraction Across 100 Points
          </p>

          {/* Layer 3: 100+ Words Technical Brief */}
          <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2 mb-4">
            <p>
              The Telemetry Matrix operates on a rigorous mathematical deduction theorem: `Score = Max(0, 100 - TimePenalty - InefficiencyPenalty)`. Rather than rewarding arbitrary point inflation, the engine begins with an ideal 100-point operational capital. The player must navigate the 4x4 coordinate plane within an empirical par window of exactly 25.00 seconds. For every 2.0 seconds elapsed beyond this par threshold, a deterministic 1-point penalty is subtracted, compelling players to balance spatial analytical depth with rapid move tempo.
            </p>
            <p>
              The Inefficiency Penalty quantitatively balances risk and reward: players choosing voluntary extraction forfeit 5 points for every safe coin left unrevealed, reflecting unrealized tactical potential. In contrast, triggering a sudden-death mine trap inflicts a catastrophic 40-point baseline penalty plus 4 points per remaining safe tile, immediately capping performance within degraded ranking brackets. This dual-penalty dynamic ensures that luck alone cannot attain master-tier status without consistent temporal velocity and disciplined probabilistic evaluation.
            </p>
          </div>

          {/* Dedicated Matrix Section: Detailed Mathematical Criteria for the 6 Rankings */}
          <div className="mb-4 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-mono uppercase text-[10px] border-b border-slate-200">
                <tr>
                  <th className="px-3 py-2.5 font-bold">Ranking Tier</th>
                  <th className="px-3 py-2.5 font-bold">Grade</th>
                  <th className="px-3 py-2.5 font-bold">Score Window</th>
                  <th className="px-3 py-2.5 font-bold">Mathematical Qualification Criteria</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {SYSTEM_RANKINGS.map((rank) => (
                  <tr key={rank.title} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-3 py-2.5 font-extrabold font-mono text-[11px] sm:text-xs" style={{ color: rank.color }}>
                      {rank.title}
                    </td>
                    <td className="px-3 py-2.5 font-mono font-bold text-neutral-800">
                      {rank.grade}
                    </td>
                    <td className="px-3 py-2.5 font-mono font-semibold text-neutral-900 tabular-nums">
                      {rank.minScore} - {rank.maxScore} pts
                    </td>
                    <td className="px-3 py-2.5 text-slate-600 text-[11px] sm:text-xs">
                      {rank.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Layer 4: Bright Visual Asset */}
          <div className="relative group overflow-hidden rounded-2xl border border-slate-100 shadow-xs mb-4 bg-slate-100">
            <img
              src="/src/assets/images/minesweeper_telemetry_matrix_1792084861536.jpg"
              alt="Minesweeper Telemetry Matrix Studio Layout"
              referrerPolicy="no-referrer"
              className="w-full h-48 sm:h-64 object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-3 sm:p-4">
              <span className="text-white text-xs font-semibold">
                Calibrated Computational Nodes &middot; Golden Yield Metric Surface
              </span>
            </div>
          </div>

          {/* Layer 5: Action Button */}
          <div>
            <a
              href="./results.html"
              className="inline-block py-2.5 px-6 rounded-xl bg-white border border-slate-200 text-slate-800 font-bold text-xs tracking-wide shadow-sm hover:border-cyan-300 hover:text-cyan-700 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(6,182,212,0.25)]"
            >
              INSPECT TELEMETRY DASHBOARD &rarr;
            </a>
          </div>

        </section>

        {/* SECTION 3: Strict 5-Layer Flow */}
        {/* Layer 1: Core Heading | Layer 2: Slogan | Layer 3: 100+ Words Technical Brief | Layer 4: Bright Asset | Layer 5: Action Button */}
        <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 sm:p-6 transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.2)]">
          
          {/* Layer 1: Core Heading */}
          <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-800 tracking-tight">
            Pure Multi-Page Architecture &amp; GitHub Pages Hosting Parity
          </h2>

          {/* Layer 2: Slogan */}
          <p className="text-xs sm:text-sm font-semibold text-emerald-600 mt-0.5 mb-3 tracking-wide uppercase">
            Eliminating 404 Refresh Pitfalls via Deterministic Physical HTML Entrypoints
          </p>

          {/* Layer 3: 100+ Words Technical Brief */}
          <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2 mb-4">
            <p>
              Traditional single-page application routers (such as HTML5 History API BrowserRouter) rely on server-side URL rewrite rewrites (`/* -&gt; /index.html`) to route virtual paths. On static environments like free GitHub Pages, hard refreshing a virtual route inevitably terminates in an HTTP 404 error because the static file server searches for physical disk paths that do not exist. Minesweeper Lite eliminates this systemic vulnerability through a strict multi-page architecture.
            </p>
            <p>
              Every view—from the Way to Play gateway (`./index.html`) to the Core Arena (`./play.html`), Telemetry Dashboard (`./results.html`), Inquiry Matrix (`./faq.html`), and Technical Whitepaper (`./about.html`)—exists as a distinct, physical HTML file compiled via Vite multi-page rollup inputs. State transitions and telemetry payloads cross boundaries seamlessly using browser `localStorage` and URL parameters, giving users the instant fluidity of an SPA with the 100% fail-safe robustness of native static web architecture.
            </p>
          </div>

          {/* Layer 4: Bright Visual Asset */}
          <div className="relative group overflow-hidden rounded-2xl border border-slate-100 shadow-xs mb-4 bg-slate-100">
            <img
              src="/src/assets/images/minesweeper_hero_gateway_1792084861281.jpg"
              alt="Static Multi-Page Structural Gateway"
              referrerPolicy="no-referrer"
              className="w-full h-48 sm:h-64 object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-3 sm:p-4">
              <span className="text-white text-xs font-semibold">
                Multi-Page Static Web Fabric &middot; Physical HTML Entry Architecture
              </span>
            </div>
          </div>

          {/* Layer 5: Action Button */}
          <div>
            <a
              href="./faq.html"
              className="inline-block py-2.5 px-6 rounded-xl bg-neutral-900 text-white font-bold text-xs tracking-wide shadow-sm hover:bg-neutral-800 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
            >
              EXPLORE FULL INQUIRY MATRIX &rarr;
            </a>
          </div>

        </section>

      </main>

      <Footer />
    </div>
  );
}
