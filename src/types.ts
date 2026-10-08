export interface WeddingSubEvent {
  id: string;
  name: string;
  startTime: string;
  endTime?: string;
  date?: string;
  venueName?: string;
  address?: string;
}

export interface WeddingEvent {
  id: string;
  name: string;
  date: string;
  startTime: string;
  endTime?: string;
  venueName: string;
  address: string;
  mapUrl?: string;
  description?: string;
  // Compatibility aliases for legacy consumers & PDF generator
  title: string;
  time: string;
  venue: string;
  subEvents?: WeddingSubEvent[];
}

export interface EventDetails {
  groomName: string;
  brideName: string;
  groomFatherName: string;
  groomMotherName: string;
  brideFatherName: string;
  brideMotherName: string;
  groomParents: string;
  brideParents: string;
  weddingDate: string;
  time: string;
  venueName: string;
  venueAddress: string;
  mapUrl: string;
  storyHeading: string;
  storyText: string;
  events: WeddingEvent[];
  accommodation?: {
    name?: string;
    address?: string;
    mapUrl?: string;
    notes?: string;
  };
}

export interface GuestResponse {
  id: string;
  name: string;
  attendance: 'attending' | 'declined' | 'maybe';
  guestsCount: number;
  wishes: string;
  createdAt: string;
}

export type BackgroundType = 'image' | 'solid';
export type BackgroundPosition = 'center' | 'top' | 'bottom' | 'left' | 'right';
export type BackgroundSize = 'cover' | 'contain' | 'auto';

export interface TypographyConfig {
  displayFont: string;
  displayFontSize: number;
  displayFontWeight: string;
  displayLetterSpacing: string;

  headingFont: string;
  headingFontWeight: string;
  headingLetterSpacing: string;
  headingLineHeight: string;

  bodyFont: string;
  bodyFontSize: number;
  bodyFontWeight: string;
  bodyLineHeight: string;
}

export interface DesignConfig {
  backgroundType: BackgroundType;
  backgroundColor: string;
  backgroundImage: string;
  backgroundPosition: BackgroundPosition;
  backgroundSize: BackgroundSize;
  overlayEnabled: boolean;
  overlayColor: string;
  overlayOpacity: number; // 0 - 100
  primaryColor: string;
  secondaryColor: string;
  headingColor: string;
  textColor: string;
  accentColor: string;
  typography: TypographyConfig;
  frontPanelLeftImage?: string;
  frontPanelRightImage?: string;
  galleryImages?: string[];
}
