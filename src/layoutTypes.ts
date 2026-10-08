export interface LayoutConfig {
  showScratchCard: boolean;
  showCountdown: boolean;
  showCouplePhoto: boolean;
  showStorySection: boolean;
  showEventsList: boolean;
  showGuestbook: boolean;
  showMusicToggle: boolean;
  cardBorderStyle: 'royal-double' | 'ornate-gold' | 'minimal';
  fontFamily: 'Cinzel, serif' | 'Playfair Display, serif' | 'Great Vibes, cursive';
  mobileEventLayout: 'grid' | 'scroll';
  mobileEventColumns: 2 | 3 | 4;
}
