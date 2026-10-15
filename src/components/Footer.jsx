import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full mt-auto py-6 border-t border-slate-100 bg-white/50 backdrop-blur-xs text-center text-xs tracking-wider text-slate-500 font-mono leading-relaxed select-none">
      <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-1">
        <p className="font-semibold text-neutral-700 tracking-widest text-[11px] sm:text-xs">
          AUTHORIZED BY RAYAAN TASNIM
        </p>
        <p className="text-slate-500 text-[10px] sm:text-[11px] tracking-wider">
          POWERED BY IDAI UNIVERSE
        </p>
        <p className="text-slate-400 text-[10px] sm:text-[11px] tracking-wider">
          &copy; 2026 GAME ZONE. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
