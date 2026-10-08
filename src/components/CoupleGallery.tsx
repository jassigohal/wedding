import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { assetPath } from '../assetPath';

const slides = [
  { image: 'couple_photo.jpg', caption: 'A beautiful beginning' },
  { image: 'couple_sketch_art.jpg', caption: 'Two hearts, one journey' },
  { image: 'couple_photo.jpg', caption: 'Together with love' },
  { image: 'couple_sketch_art.jpg', caption: 'Our forever starts here' },
];

export const CoupleGallery: React.FC = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 4500);
    return () => window.clearInterval(timer);
  }, []);

  const move = (direction: number) => setActive((current) => (current + direction + slides.length) % slides.length);

  return (
    <section className="couple-gallery" aria-label="Couple photo gallery">
      <div className="couple-gallery__heading">
        <Heart size={15} fill="currentColor" aria-hidden="true" />
        <span>Our Beautiful Journey</span>
        <Heart size={15} fill="currentColor" aria-hidden="true" />
      </div>
      <div className="couple-gallery__frame">
        {slides.map((slide, index) => (
          <figure key={`${slide.image}-${index}`} className={`couple-gallery__slide ${index === active ? 'is-active' : ''}`}>
            <img src={assetPath(slide.image)} alt={`Sandeep Singh and Sarbjeet Kaur — ${slide.caption}`} />
            <figcaption>{slide.caption}</figcaption>
          </figure>
        ))}
        <button type="button" className="couple-gallery__arrow couple-gallery__arrow--left" onClick={() => move(-1)} aria-label="Previous photo"><ChevronLeft size={20} /></button>
        <button type="button" className="couple-gallery__arrow couple-gallery__arrow--right" onClick={() => move(1)} aria-label="Next photo"><ChevronRight size={20} /></button>
      </div>
      <div className="couple-gallery__dots" aria-label="Choose gallery photo">
        {slides.map((_, index) => <button key={index} type="button" className={index === active ? 'is-active' : ''} onClick={() => setActive(index)} aria-label={`Show photo ${index + 1}`} />)}
      </div>
    </section>
  );
};
