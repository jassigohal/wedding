import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';

interface ScratchToRevealProps {
  revealText: string;
  onReveal?: () => void;
}

export const ScratchToReveal: React.FC<ScratchToRevealProps> = ({ revealText, onReveal }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const isDrawing = useRef(false);
  const coveredPixels = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Draw Bigger Heart shape path for metallic scratch foil
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(width / 2, height * 0.9);
    ctx.bezierCurveTo(width * 0.02, height * 0.58, width * 0.01, height * 0.1, width / 2, height * 0.28);
    ctx.bezierCurveTo(width * 0.99, height * 0.1, width * 0.98, height * 0.58, width / 2, height * 0.9);
    ctx.closePath();

    // Metallic Gold Scratch Surface Gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#bf953f');
    gradient.addColorStop(0.2, '#fcf6ba');
    gradient.addColorStop(0.4, '#b38728');
    gradient.addColorStop(0.7, '#fbf5b7');
    gradient.addColorStop(1, '#aa771c');

    ctx.fillStyle = gradient;
    ctx.fill();

    // Metallic border around Heart
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 5;
    ctx.stroke();

    // Sparkling text on heart scratch surface
    ctx.fillStyle = '#140608';
    ctx.font = 'bold 15px Cinzel, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ SCRATCH HERE ✨', width / 2, height * 0.46);
    ctx.fillText('TO REVEAL DATE', width / 2, height * 0.56);
    ctx.restore();

    const initialPixels = ctx.getImageData(0, 0, width, height).data;
    for (let i = 3; i < initialPixels.length; i += 4) {
      if (initialPixels[i] > 0) coveredPixels.current += 1;
    }
  }, []);

  const getPos = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  const scratch = (pos: { x: number; y: number }) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 16, 0, Math.PI * 2);
    ctx.fill();

    checkScratchPercent();
  };

  const checkScratchPercent = () => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (!coveredPixels.current) return;
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let remainingCoveredPixels = 0;
    for (let i = 3; i < imgData.length; i += 4) {
      if (imgData[i] > 0) remainingCoveredPixels += 1;
    }

    const percent = ((coveredPixels.current - remainingCoveredPixels) / coveredPixels.current) * 100;
    if (percent > 58) {
      setIsRevealed(true);
      confetti({
        particleCount: 110,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#ffd700', '#fcf6ba', '#b38728', '#ffffff', '#e11d48']
      });
      if (onReveal) onReveal();
    }
  };

  return (
    <div className="relative w-80 h-80 mx-auto my-2 flex items-center justify-center">
      {/* Hidden Content in Heart Shape beneath scratch layer */}
      <div
        className={`scratch-reveal-heart absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-0 shadow-2xl rounded-full border-2 border-[#C8A76A] ${isRevealed ? 'is-revealed' : ''}`}
        style={{
          clipPath: `path("M 160 288 C 3.2 185.6 1.6 32 160 89.6 C 318.4 32 316.8 185.6 160 288 Z")`,
          background: 'linear-gradient(180deg, #E4CA91 0%, #C8A76A 100%)'
        }}
      >
        <p className="text-xs uppercase tracking-[0.25em] text-[#49151F] font-bold mb-2">
          ✨ SAVE THE DATE ✨
        </p>
        <p className="text-2xl font-cinzel font-extrabold text-[#49151F] tracking-widest">
          {revealText}
        </p>
      </div>

      {/* Heart Canvas Scratch Overlay */}
      {!isRevealed && (
        <canvas
          ref={canvasRef}
          width={320}
          height={320}
          className="absolute inset-0 w-full h-full cursor-pointer z-10 touch-none transition-opacity duration-500"
          onPointerDown={(e) => {
            e.preventDefault();
            e.currentTarget.setPointerCapture(e.pointerId);
            isDrawing.current = true;
            scratch(getPos(e as unknown as React.MouseEvent<HTMLCanvasElement>));
          }}
          onPointerMove={(e) => {
            if (isDrawing.current) {
              e.preventDefault();
              scratch(getPos(e as unknown as React.MouseEvent<HTMLCanvasElement>));
            }
          }}
          onPointerUp={(e) => {
            isDrawing.current = false;
            if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
          }}
          onPointerCancel={() => (isDrawing.current = false)}
          onPointerLeave={() => (isDrawing.current = false)}
        />
      )}
    </div>
  );
};
