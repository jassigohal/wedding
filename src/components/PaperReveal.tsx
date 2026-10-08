import React, { useState } from 'react';

interface PaperRevealProps {
  onOpen: () => void;
  brideName: string;
  groomName: string;
}

export const PaperReveal: React.FC<PaperRevealProps> = ({ onOpen, brideName, groomName }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    window.setTimeout(onOpen, 1600);
  };

  return (
    <div className={`paper-reveal ${isOpen ? 'paper-reveal--open' : ''}`}>
      <div className="paper-reveal__sheet" aria-hidden="true">
        <div className="paper-reveal__panel paper-reveal__panel--left"><span className="paper-reveal__panel-art" aria-hidden="true" /></div>
        <div className="paper-reveal__panel paper-reveal__panel--right"><span className="paper-reveal__panel-art" aria-hidden="true" /></div>
      </div>
      <div className="paper-reveal__invitation-title">WEDDING INVITATION</div>
      <svg className="paper-reveal__heart" viewBox="0 0 360 330" aria-hidden="true">
        <path d="M180 316 C162 299 38 210 25 116 C16 51 84 14 133 54 C153 70 169 88 180 101 C191 88 207 70 227 54 C276 14 344 51 335 116 C322 210 198 299 180 316 Z" />
      </svg>
      <div className="paper-reveal__content">
        <div className="paper-reveal__kicker">Together with their families</div>
        <h1>{groomName || 'Groom Name'}</h1>
        <div className="paper-reveal__amp">&amp;</div>
        <h1>{brideName || 'Bride Name'}</h1>
      </div>
        <button className="paper-reveal__seal" type="button" onClick={handleOpen} aria-label="Open wedding invitation">
          <img src="/wax-seal-open-v2.png" alt="Open invitation" />
        </button>
    </div>
  );
};
