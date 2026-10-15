import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Navbar({ activePage = 'gateway' }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const backdropRef = useRef(null);

  const navLinks = [
    { id: 'gateway', label: 'Home', href: './index.html' },
    { id: 'play', label: 'Play', href: './play.html' },
    { id: 'faq', label: 'FAQ', href: './faq.html' },
    { id: 'about', label: 'About', href: './about.html' },
  ];

  useEffect(() => {
    if (isOpen && menuRef.current) {
      gsap.fromTo(
        menuRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.28, ease: 'power2.out' }
      );
      if (backdropRef.current) {
        gsap.fromTo(
          backdropRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.25, ease: 'power1.out' }
        );
      }
    }
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="fixed top-0 z-50 h-16 bg-white/70 backdrop-blur-md border-b border-slate-100 w-full flex items-center justify-between px-6">
        {/* Left Side: 💣 emoji followed by "Game Zone" branding */}
        <a
          href="./index.html"
          className="flex items-center gap-2 group transition-all duration-300 hover:scale-[1.03]"
        >
          <span className="text-2xl transform group-hover:rotate-12 transition-transform duration-300">💣</span>
          <span className="text-xl font-extrabold tracking-tight text-neutral-800">
            Game Zone
          </span>
        </a>

        {/* Right Side: A single 3-line parallel straight hamburger icon only */}
        <button
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl bg-white border border-slate-200/80 shadow-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(6,182,212,0.35)] focus:outline-none"
        >
          <span
            className={`w-5 h-0.5 bg-neutral-800 rounded-full transition-all duration-300 ${
              isOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`w-5 h-0.5 bg-neutral-800 rounded-full transition-all duration-300 ${
              isOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`w-5 h-0.5 bg-neutral-800 rounded-full transition-all duration-300 ${
              isOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </header>

      {/* Unfolding ultra-attractive clean vertical menu mapping */}
      {isOpen && (
        <div className="fixed inset-0 z-40">
          {/* Backdrop */}
          <div
            ref={backdropRef}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-neutral-900/10 backdrop-blur-xs"
          />

          {/* Clean vertical dropdown container */}
          <div
            ref={menuRef}
            className="absolute top-18 right-6 w-64 bg-white/95 backdrop-blur-xl rounded-2xl border border-slate-100 shadow-xl p-3 flex flex-col gap-1.5"
          >
            <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Navigation
            </div>
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-[1.03] ${
                    isActive
                      ? 'text-cyan-500 drop-shadow-[0_0_12px_rgba(6,182,212,0.6)] brightness-125 bg-cyan-50/60 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                      : 'text-neutral-700 hover:text-neutral-900 hover:bg-slate-50 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                  )}
                </a>
              );
            })}
            <div className="mt-2 pt-2 border-t border-slate-100 px-3 text-[11px] text-slate-400 font-medium">
              Minesweeper Lite · v2026
            </div>
          </div>
        </div>
      )}
    </>
  );
}
