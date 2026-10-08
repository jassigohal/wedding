import type { TypographyConfig } from './types';

export interface CuratedFontOption {
  name: string;
  family: string;
  category: 'Luxury Serif' | 'Elegant Serif' | 'Traditional / Classic' | 'Script / Calligraphy' | 'Modern Clean';
  sampleText?: string;
}

export const CURATED_FONTS: CuratedFontOption[] = [
  // Luxury Serif
  { name: 'Cinzel', family: "'Cinzel', serif", category: 'Luxury Serif' },
  { name: 'Playfair Display', family: "'Playfair Display', serif", category: 'Luxury Serif' },
  { name: 'Bodoni Moda', family: "'Bodoni Moda', serif", category: 'Luxury Serif' },

  // Elegant Serif
  { name: 'Marcellus', family: "'Marcellus', serif", category: 'Elegant Serif' },
  { name: 'Lora', family: "'Lora', serif", category: 'Elegant Serif' },

  // Traditional / Classic
  { name: 'Cormorant Garamond', family: "'Cormorant Garamond', serif", category: 'Traditional / Classic' },

  // Script / Calligraphy
  { name: 'Great Vibes', family: "'Great Vibes', cursive", category: 'Script / Calligraphy' },
  { name: 'Allura', family: "'Allura', cursive", category: 'Script / Calligraphy' },
  { name: 'Dancing Script', family: "'Dancing Script', cursive", category: 'Script / Calligraphy' },
  { name: 'Italianno', family: "'Italianno', cursive", category: 'Script / Calligraphy' },

  // Modern Clean
  { name: 'Montserrat', family: "'Montserrat', sans-serif", category: 'Modern Clean' },
  { name: 'Outfit', family: "'Outfit', sans-serif", category: 'Modern Clean' },
];

export interface TypographyPairingPreset {
  id: string;
  name: string;
  desc: string;
  config: TypographyConfig;
}

export const DEFAULT_TYPOGRAPHY_CONFIG: TypographyConfig = {
  displayFont: "'Cinzel', serif",
  displayFontSize: 72,
  displayFontWeight: '700',
  displayLetterSpacing: '0.1em',

  headingFont: "'Cinzel', serif",
  headingFontWeight: '700',
  headingLetterSpacing: '0.05em',
  headingLineHeight: '1.3',

  bodyFont: "'Cormorant Garamond', serif",
  bodyFontSize: 16,
  bodyFontWeight: '400',
  bodyLineHeight: '1.6'
};

export const TYPOGRAPHY_PAIRING_PRESETS: TypographyPairingPreset[] = [
  {
    id: 'imperial-royal',
    name: 'Imperial Royal (Default)',
    desc: 'Cinzel display & headings with traditional Cormorant Garamond literature',
    config: { ...DEFAULT_TYPOGRAPHY_CONFIG }
  },
  {
    id: 'romantic-calligraphy',
    name: 'Romantic Calligraphy',
    desc: 'Great Vibes romantic script names with regal Playfair headers & Cormorant body',
    config: {
      displayFont: "'Great Vibes', cursive",
      displayFontSize: 76,
      displayFontWeight: '400',
      displayLetterSpacing: '0.02em',

      headingFont: "'Playfair Display', serif",
      headingFontWeight: '700',
      headingLetterSpacing: '0.05em',
      headingLineHeight: '1.3',

      bodyFont: "'Cormorant Garamond', serif",
      bodyFontSize: 16,
      bodyFontWeight: '400',
      bodyLineHeight: '1.6'
    }
  },
  {
    id: 'editorial-luxury',
    name: 'Editorial High Luxury',
    desc: 'Playfair Display editorial title with Marcellus headers & Lora prose',
    config: {
      displayFont: "'Playfair Display', serif",
      displayFontSize: 70,
      displayFontWeight: '700',
      displayLetterSpacing: '0.08em',

      headingFont: "'Marcellus', serif",
      headingFontWeight: '600',
      headingLetterSpacing: '0.08em',
      headingLineHeight: '1.3',

      bodyFont: "'Lora', serif",
      bodyFontSize: 15,
      bodyFontWeight: '400',
      bodyLineHeight: '1.65'
    }
  },
  {
    id: 'regal-heritage',
    name: 'Regal Heritage',
    desc: 'Marcellus inscriptional display with Cinzel headings and classic Garamond text',
    config: {
      displayFont: "'Marcellus', serif",
      displayFontSize: 72,
      displayFontWeight: '700',
      displayLetterSpacing: '0.12em',

      headingFont: "'Cinzel', serif",
      headingFontWeight: '700',
      headingLetterSpacing: '0.05em',
      headingLineHeight: '1.3',

      bodyFont: "'Cormorant Garamond', serif",
      bodyFontSize: 16,
      bodyFontWeight: '400',
      bodyLineHeight: '1.6'
    }
  },
  {
    id: 'modern-royal',
    name: 'Modern Royal',
    desc: 'High-contrast Bodoni Moda names with crisp Outfit headings & Montserrat details',
    config: {
      displayFont: "'Bodoni Moda', serif",
      displayFontSize: 72,
      displayFontWeight: '700',
      displayLetterSpacing: '0.08em',

      headingFont: "'Outfit', sans-serif",
      headingFontWeight: '600',
      headingLetterSpacing: '0.04em',
      headingLineHeight: '1.3',

      bodyFont: "'Montserrat', sans-serif",
      bodyFontSize: 14,
      bodyFontWeight: '400',
      bodyLineHeight: '1.6'
    }
  },
  {
    id: 'poetic-allura',
    name: 'Poetic Allura Script',
    desc: 'Delicate Allura calligraphy names paired with Cinzel headers and Lora body text',
    config: {
      displayFont: "'Allura', cursive",
      displayFontSize: 80,
      displayFontWeight: '400',
      displayLetterSpacing: '0.02em',

      headingFont: "'Cinzel', serif",
      headingFontWeight: '700',
      headingLetterSpacing: '0.06em',
      headingLineHeight: '1.3',

      bodyFont: "'Lora', serif",
      bodyFontSize: 15,
      bodyFontWeight: '400',
      bodyLineHeight: '1.65'
    }
  }
];
