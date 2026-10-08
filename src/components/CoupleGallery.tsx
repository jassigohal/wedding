import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { assetPath } from '../assetPath';
import type { DesignConfig } from '../types';

const slides = [
  { image: 'couple-gallery-1.png', caption: 'A beautiful beginning' },
  { image: 'couple-gallery-2.png', caption: 'Two hearts, one journey' },
  { image: 'couple-gallery-3.png', caption: 'Together with love' },
  { image: 'couple-gallery-4.png', caption: 'Our forever starts here' },
];

export const CoupleGallery: React.FC<{ images?: DesignConfig['galleryImages'] }> = ({ images }) => {
  const gallerySlides = images?.filter(Boolean).length ? images.filter(Boolean).map((image, index) => ({ image, caption: ['A beautiful beginning', 'Two hearts, one journey', 'Together with love', 'Our forever starts here'][index] || 'With love' })) : slides;
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % gallerySlides.length), 4500);
    return () => window.clearInterval(timer);
  }, []);

  const move = (direction: number) => setActive((current) => (current + direction + gallerySlides.length) % gallerySlides.length);

  return (
    <section className="couple-gallery" aria-label="Couple photo gallery">
      <div className="couple-gallery__heading">
        <Heart size={15} fill="currentColor" aria-hidden="true" />
        <span>Our Beautiful Journey</span>
        <Heart size={15} fill="currentColor" aria-hidden="true" />
      </div>
      <div className="couple-gallery__frame">
        {gallerySlides.map((slide, index) => (
          <figure key={`${slide.image}-${index}`} className={`couple-gallery__slide ${index === active ? 'is-active' : ''}`}>
            <img src={assetPath(slide.image)} alt={`Sandeep Singh and Sarbjeet Kaur — ${slide.caption}`} />
            <figcaption>{slide.caption}</figcaption>
          </figure>
        ))}
        <button type="button" className="couple-gallery__arrow couple-gallery__arrow--left" onClick={() => move(-1)} aria-label="Previous photo"><ChevronLeft size={20} /></button>
        <button type="button" className="couple-gallery__arrow couple-gallery__arrow--right" onClick={() => move(1)} aria-label="Next photo"><ChevronRight size={20} /></button>
      </div>
      <div className="couple-gallery__dots" aria-label="Choose gallery photo">
        {gallerySlides.map((_, index) => <button key={index} type="button" className={index === active ? 'is-active' : ''} onClick={() => setActive(index)} aria-label={`Show photo ${index + 1}`} />)}
      </div>
    </section>
  );
};
