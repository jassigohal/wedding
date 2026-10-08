import React, { useState } from 'react';

interface DoorRevealProps {
  onOpen: () => void;
  selectedTemplate: string;
  brideName: string;
  groomName: string;
}

export const DoorReveal: React.FC<DoorRevealProps> = ({
  onOpen,
  brideName,
  groomName
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden flex items-center justify-center transition-all duration-1000 ${isOpen ? 'doors-open' : ''} ${
        isOpen ? 'pointer-events-none opacity-0 delay-1000' : 'opacity-100'
      }`}
    >
      {/* 3D Split Door Panels */}
      <div className="door-panels absolute inset-0 flex z-10 pointer-events-none" aria-hidden="true">
        {/* Left Door Panel */}
        <div
          className={`w-1/2 h-full border-r-2 border-[#B69A64]/70 transition-transform duration-1000 ease-in-out ${
            isOpen ? '-translate-x-full' : 'translate-x-0'
          }`}
          style={{ backgroundImage: 'url("/gate-left.svg")' }}
        >
          <div className="absolute inset-6 border border-[#B89B67]/55 rounded-l-2xl opacity-60" />
        </div>

        {/* Right Door Panel */}
        <div
          className={`w-1/2 h-full border-l-2 border-[#B69A64]/70 transition-transform duration-1000 ease-in-out ${
            isOpen ? 'translate-x-full' : 'translate-x-0'
          }`}
          style={{ backgroundImage: 'url("/gate-right.svg")' }}
        >
          <div className="absolute inset-6 border border-[#B89B67]/55 rounded-r-2xl opacity-60" />
        </div>
      </div>

      {/* Center Heart Emblem Container */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center z-20 transition-all duration-500 ${
          isOpen ? 'scale-90 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <div
          className="door-reveal-card relative flex flex-col items-center justify-center cursor-pointer group"
          onClick={handleOpen}
        >
          {/* The light sits behind the plaque; the plaque itself is a single continuous SVG path. */}
          <div className="door-heart-glow absolute" aria-hidden="true" />
          <svg className="door-heart-frame absolute" viewBox="0 0 360 330" preserveAspectRatio="none" aria-hidden="true">
            <path className="door-heart-surface" d="M180 316 C162 299 38 210 25 116 C16 51 84 14 133 54 C153 70 169 88 180 101 C191 88 207 70 227 54 C276 14 344 51 335 116 C322 210 198 299 180 316 Z" />
            <path className="door-heart-outline" d="M180 316 C162 299 38 210 25 116 C16 51 84 14 133 54 C153 70 169 88 180 101 C191 88 207 70 227 54 C276 14 344 51 335 116 C322 210 198 299 180 316 Z" />
          </svg>

          {/* Main Couple Names & Title Container */}
          <div className="door-invitation-card relative z-10 px-8 sm:px-12 text-center flex flex-col items-center justify-center max-w-[360px]">
            <span className="door-card-kicker">Together with their families</span>
            <h1 className="text-lg sm:text-xl font-cinzel text-gold-shine tracking-wider font-extrabold uppercase leading-tight">
              {groomName || 'Groom Name'}
            </h1>
            <div className="text-[#B69A64] text-sm font-cursive font-bold my-0.5">&</div>
            <h1 className="text-lg sm:text-xl font-cinzel text-gold-shine tracking-wider font-extrabold uppercase leading-tight mb-2">
              {brideName || 'Bride Name'}
            </h1>

            <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.22em] sm:tracking-[0.3em] text-[#B69A64] font-cinzel font-bold mb-5 sm:mb-6">
              ROYAL WEDDING INVITATION
            </p>
          </div>

          {/* A compact wax-style seal replaces the old wide action bar. */}
          <div className="door-reveal-action relative z-10 mt-4 sm:mt-5">
            <button
              onClick={handleOpen}
              type="button"
              aria-label="Open wedding invitation"
              className="door-seal hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <img src="/wax-seal-maroon.png" alt="" aria-hidden="true" />
              <span>OPEN</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
