import { useState, useRef, useEffect } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Volume2,
  VolumeX,
  Download,
  Share2,
  Sparkles,
  ExternalLink,
  Heart,
  Shield
} from 'lucide-react';
import { PaperReveal } from './components/PaperReveal';
import { ScratchToReveal } from './components/ScratchToReveal';
import { CountdownTimer } from './components/CountdownTimer';
import { GuestBookRSVP } from './components/GuestBookRSVP';
import { CoupleGallery } from './components/CoupleGallery';
import { PDFTemplate } from './components/PDFTemplate';
import { PREDEFINED_THEMES, DEFAULT_DESIGN_CONFIG } from './components/CustomizerDrawer';
import type { LayoutConfig } from './layoutTypes';
import { CurrentAdminPanel } from './components/CurrentAdminPanel';
import { ThreePaneAdminWorkspace } from './components/ThreePaneAdminWorkspace';
import { PublicHome } from './components/PublicHome';
import type { EventDetails, GuestResponse, WeddingEvent, DesignConfig } from './types';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { assetPath } from './assetPath';

export function hexToRgba(hex: string, alpha: number): string {
  if (!hex) return `rgba(0, 0, 0, ${alpha})`;
  let cleanHex = hex.replace('#', '').trim();
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map((c) => c + c).join('');
  }
  if (cleanHex.length !== 6) {
    return `rgba(0, 0, 0, ${alpha})`;
  }
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function normalizeWeddingEvent(evt: any, idx = 0): WeddingEvent {
  const name = evt.name || evt.title || `Event ${idx + 1}`;
  const startTime = evt.startTime || (evt.time ? evt.time.split('-')[0].trim() : '10:00 AM');
  const endTime = evt.endTime || (evt.time && evt.time.includes('-') ? evt.time.split('-')[1].trim() : undefined);
  const id = evt.id || `event-${idx + 1}-${Date.now()}`;
  const isMullanpurEvent = id === 'event-jaggo' || id === 'event-sukhmani';
  const isAnandEvent = id === 'event-anand-karaj';
  const venueName = isMullanpurEvent ? 'Mullanpur Dakha' : isAnandEvent ? 'The Grand Manor Resort' : (evt.venueName || evt.venue || 'Gurdwara Sahib');
  const address = isMullanpurEvent ? 'Mullanpur Dakha, Ludhiana District, Punjab 141101' : isAnandEvent ? 'Near Nawanshahr, Punjab' : (evt.address || evt.venueAddress || '');
  const mapUrl = isMullanpurEvent ? 'https://www.google.com/maps/search/?api=1&query=Mullanpur+Dakha+Ludhiana+Punjab+141101' : isAnandEvent ? 'https://www.google.com/maps/place/The+Grand+Manor+Resort/@31.2737484,76.0919828,664m/data=!3m2!1e3!4b1!4m6!3m5!1s0x391a3c10c5a3d6ef3:0x10100ef09ba1864a!8m2!3d31.2737438!4d76.0945577!16s%2Fg%2F11g0khc6tx' : (evt.mapUrl || '');
  const description = evt.description || '';
  const date = evt.date || '27 Nov 2026';
  const time = endTime ? `${startTime} - ${endTime}` : startTime;
  const savedSubEvents = Array.isArray(evt.subEvents) ? evt.subEvents : [];
  const subEvents = savedSubEvents.length > 0 || id !== 'event-anand-karaj' ? savedSubEvents.map((sub: any) => (
    sub.id === 'anand-bharat' ? { ...sub, name: 'Baraat Departure' } : sub
  )) : [
    { id: 'anand-bharat', name: 'Baraat Departure', date, startTime: '6:00 PM', endTime: '10:00 AM', venueName, address },
    { id: 'anand-karaj-sub-event', name: 'Anand Karaj', date, startTime: '10:00 AM', endTime: '1:00 PM', venueName, address },
    { id: 'anand-doli', name: 'Doli Ceremony', date, startTime: '4:30 PM', endTime: '2:00 PM', venueName, address }
  ];

  return {
    id,
    name,
    title: name,
    date,
    startTime,
    endTime,
    time,
    venueName,
    venue: venueName,
    address,
    mapUrl,
    description,
    subEvents: subEvents.map((sub: any, subIdx: number) => ({
      id: sub.id || `${id}-sub-${subIdx + 1}`,
      name: sub.name || `Sub-event ${subIdx + 1}`,
      startTime: sub.id === 'anand-bharat' ? '6:00 PM' : sub.id === 'anand-doli' ? '4:30 PM' : sub.startTime || sub.time || startTime,
      endTime: sub.endTime,
      date: sub.date,
      venueName: isAnandEvent ? 'The Grand Manor Resort' : sub.venueName,
      address: isAnandEvent ? 'Near Nawanshahr, Punjab' : sub.address
    }))
  };
}

export function normalizeWeddingEvents(events: any[]): WeddingEvent[] {
  const eventOrder: Record<string, number> = { 'event-sukhmani': 0, 'event-jaggo': 1, 'event-anand-karaj': 2 };
  if (!Array.isArray(events) || events.length === 0) {
    return [...initialEventDetails.events].sort((a, b) => (eventOrder[a.id] ?? 99) - (eventOrder[b.id] ?? 99));
  }
  return events
    .map((evt, idx) => normalizeWeddingEvent(evt, idx))
    .sort((a, b) => (eventOrder[a.id] ?? 99) - (eventOrder[b.id] ?? 99));
}

const initialEventDetails: EventDetails = {
  groomName: 'Sandeep Singh',
  brideName: 'Sarbjeet Kaur',
  groomFatherName: 'Hardeep Singh',
  groomMotherName: 'Jasdeep Kaur',
  brideFatherName: 'Harbhajan Singh',
  brideMotherName: 'Gurmeet Kaur',
  groomParents: 'S. Hardeep Singh & Smt. Jasdeep Kaur',
  brideParents: 'S. Harbhajan Singh & Smt. Gurmeet Kaur',
  weddingDate: '27 Nov 2026',
  time: '10:00 AM Onwards',
  venueName: 'The Grand Manor Resort',
  venueAddress: 'Near Nawanshahr, Punjab (Coordinates: 31.2737438, 76.0945577)',
  mapUrl: 'https://www.google.com/maps/place/The+Grand+Manor+Resort/@31.2737484,76.0919828,664m/data=!3m2!1e3!4b1!4m6!3m5!1s0x391ac10c5a3d6ef3:0x10100ef09ba1864a!8m2!3d31.2737438!4d76.0945577!16s%2Fg%2F11g0khc6tx',
  storyHeading: 'Our Sacred Union',
  storyText: 'With divine blessings of Waheguru Ji and joyful hearts of our families, we cordially invite you to celebrate our Jaggo & Anand Karaj Wedding.',
  events: [
    {
      id: 'event-jaggo',
      name: 'Jaggo',
      title: 'Jaggo',
      date: '25 Nov 2026',
      startTime: '6:00 PM',
      endTime: '11:00 PM',
      time: '6:00 PM - 11:00 PM',
      venueName: 'Mullanpur Dakha',
      venue: 'Mullanpur Dakha',
      address: 'Mullanpur Dakha, Ludhiana District, Punjab 141101',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Mullanpur+Dakha+Ludhiana+Punjab+141101',
      description: 'An evening of vibrant Punjabi folk music, traditional Jaggo dance, and royal feast.'
    },
    {
      id: 'event-sukhmani',
      name: 'Sukhmani Sahib Path',
      title: 'Sukhmani Sahib Path',
      date: '25 Nov 2026',
      startTime: '8:00 AM',
      endTime: '9:30 AM',
      time: '8:00 AM - 9:30 AM',
      venueName: 'Mullanpur Dakha',
      venue: 'Mullanpur Dakha',
      address: 'Mullanpur Dakha, Ludhiana District, Punjab 141101',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Mullanpur+Dakha+Ludhiana+Punjab+141101',
      description: 'Commencement of auspicious wedding celebrations with sacred prayers and Gurbani recitation.'
    },
    {
      id: 'event-anand-karaj',
      name: 'Anand Karaj',
      title: 'Anand Karaj',
      date: '27 Nov 2026',
      startTime: '10:00 AM',
      endTime: '1:00 PM',
      time: '10:00 AM - 1:00 PM',
      venueName: 'The Grand Manor Resort',
      venue: 'The Grand Manor Resort',
      address: 'Near Nawanshahr, Punjab',
      mapUrl: 'https://www.google.com/maps/place/The+Grand+Manor+Resort/@31.2737484,76.0919828,664m/data=!3m2!1e3!4b1!4m6!3m5!1s0x391ac10c5a3d6ef3:0x10100ef09ba1864a!8m2!3d31.2737438!4d76.0945577!16s%2Fg%2F11g0khc6tx',
      description: 'The sacred Lavaan Anand Karaj nuptial vows followed by Guru Ka Langar.',
      subEvents: [
        {
          id: 'anand-bharat',
          name: 'Baraat Departure',
          date: '27 Nov 2026',
          startTime: '6:00 PM',
          endTime: '10:00 AM',
          venueName: 'Gurdwara Sri Guru Singh Sabha',
          address: 'Main Bazar, Nawanshahr, Punjab 144514'
        },
        {
          id: 'anand-karaj-sub-event',
          name: 'Anand Karaj',
          date: '27 Nov 2026',
          startTime: '10:00 AM',
          endTime: '1:00 PM',
          venueName: 'Gurdwara Sri Guru Singh Sabha',
          address: 'Main Bazar, Nawanshahr, Punjab 144514'
        },
        {
          id: 'anand-doli',
          name: 'Doli Ceremony',
          date: '27 Nov 2026',
          startTime: '4:30 PM',
          endTime: '2:00 PM',
          venueName: 'Gurdwara Sri Guru Singh Sabha',
          address: 'Main Bazar, Nawanshahr, Punjab 144514'
        }
      ]
    }
  ]
};

const initialLayoutConfig: LayoutConfig = {
  showScratchCard: true,
  showCountdown: true,
  showCouplePhoto: true,
  showStorySection: true,
  showEventsList: true,
  showGuestbook: true,
  showMusicToggle: true,
  cardBorderStyle: 'royal-double',
  fontFamily: 'Cinzel, serif',
  mobileEventLayout: 'grid',
  mobileEventColumns: 3
};

export function App() {
  const [hasOpenedDoors, setHasOpenedDoors] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isDateRevealed, setIsDateRevealed] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isPdfPreviewOpen, setIsPdfPreviewOpen] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [isMobilePreview, setIsMobilePreview] = useState(false);
  const [isPublicView] = useState(() => new URLSearchParams(window.location.search).get('view') === 'public');
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [adminAuthenticated, setAdminAuthenticated] = useState(() => sessionStorage.getItem('version1_admin_auth') === 'true');
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminLoginError, setAdminLoginError] = useState('');
  const isLandingView = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return !params.has('view') && !params.has('invitation');
  })[0];

  const [selectedTemplate, setSelectedTemplate] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('wedding_selected_template');
      if (saved === 'royal-crest' || saved === 'cream-gold') return 'heart-glow';
      if (saved) return saved;
    } catch (e) {
      console.error(e);
    }
    return 'heart-glow';
  });

  const [eventDetails, setEventDetails] = useState<EventDetails>(() => {
    try {
      const saved = localStorage.getItem('wedding_event_details');
      if (saved) {
        const parsed = JSON.parse(saved);
        const hasSukhmani = parsed.events?.some((e: any) =>
          (e.name || e.title || '').toLowerCase().includes('sukhmani')
        );
        const eventsToUse = (hasSukhmani ? parsed.events : initialEventDetails.events).map((event: WeddingEvent) =>
          event.id === 'event-sukhmani'
            ? { ...event, date: '25 Nov 2026', venueName: 'Mullanpur Dakha', venue: 'Mullanpur Dakha', address: 'Mullanpur Dakha, Ludhiana District, Punjab 141101', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Mullanpur+Dakha+Ludhiana+Punjab+141101' }
            : event.id === 'event-jaggo'
              ? { ...event, venueName: 'Mullanpur Dakha', venue: 'Mullanpur Dakha', address: 'Mullanpur Dakha, Ludhiana District, Punjab 141101', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Mullanpur+Dakha+Ludhiana+Punjab+141101' }
              : event.id === 'event-anand-karaj'
                ? { ...event, venueName: 'The Grand Manor Resort', venue: 'The Grand Manor Resort', address: 'Near Nawanshahr, Punjab', mapUrl: 'https://www.google.com/maps/place/The+Grand+Manor+Resort/@31.2737484,76.0919828,664m/data=!3m2!1e3!4b1!4m6!3m5!1s0x391ac10c5a3d6ef3:0x10100ef09ba1864a!8m2!3d31.2737438!4d76.0945577!16s%2Fg%2F11g0khc6tx', subEvents: event.subEvents?.map(sub => ({ ...sub, startTime: sub.id === 'anand-bharat' ? '6:00 PM' : sub.id === 'anand-doli' ? '4:30 PM' : sub.startTime, venueName: 'The Grand Manor Resort', address: 'Near Nawanshahr, Punjab' })) }
              : event
        );
        return {
          ...initialEventDetails,
          ...parsed,
          events: normalizeWeddingEvents(eventsToUse)
        };
      }
    } catch (e) {
      console.error(e);
    }
    return initialEventDetails;
  });

  const [layoutConfig, setLayoutConfig] = useState<LayoutConfig>(() => {
    try {
      const saved = localStorage.getItem('wedding_layout_config');
      if (saved) return { ...initialLayoutConfig, ...JSON.parse(saved) };
    } catch (e) {
      console.error(e);
    }
    return initialLayoutConfig;
  });

  const [couplePhoto, setCouplePhoto] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('wedding_couple_photo');
      if (saved) return saved;
    } catch (e) {
      console.error(e);
    }
    return assetPath('couple_sketch_art.jpg');
  });

  const [designConfig, setDesignConfig] = useState<DesignConfig>(() => {
    try {
      const saved = localStorage.getItem('wedding_design_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Migrate both the original maroon/gold default and the interim violet
        // default. Without this, existing browsers keep rendering the stale
        // localStorage palette even after the default preset changes.
        const isLegacyDefault =
          (parsed.backgroundImage === '/royal_crest_background.jpg' && parsed.primaryColor === '#d4af37' && parsed.secondaryColor === '#1c0406') ||
          (parsed.backgroundImage === '/bg_cream_gold.jpg' && parsed.primaryColor === '#6d5ce7' && parsed.secondaryColor === '#fffafc') ||
          (parsed.backgroundImage === '/bg_cream_gold.jpg' && parsed.primaryColor === '#b76e79' && parsed.secondaryColor === '#fffafc');
        if (isLegacyDefault) return DEFAULT_DESIGN_CONFIG;
        if (parsed.backgroundImage === '/royal_crest_background.jpg') {
          return {
            ...DEFAULT_DESIGN_CONFIG,
            ...parsed,
            backgroundImage: '/bg_heart_glow_generated.png',
            backgroundColor: '#FAF7F0',
            typography: { ...DEFAULT_DESIGN_CONFIG.typography, ...(parsed.typography || {}) }
          };
        }
        const isOldSageDefault = parsed.primaryColor === '#34483D' && parsed.headingColor === '#34483D' && parsed.textColor === '#29332D';
        if (isOldSageDefault) {
          return {
            ...DEFAULT_DESIGN_CONFIG,
            ...parsed,
            backgroundImage: '/bg_heart_glow_generated.png',
            primaryColor: '#7A2938',
            headingColor: '#641F2D',
            textColor: '#47252D',
            typography: { ...DEFAULT_DESIGN_CONFIG.typography, ...(parsed.typography || {}) }
          };
        }
        return {
          ...DEFAULT_DESIGN_CONFIG,
          ...parsed,
          typography: {
            ...DEFAULT_DESIGN_CONFIG.typography,
            ...(parsed.typography || {})
          }
        };
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_DESIGN_CONFIG;
  });

  const [customBgImage] = useState<string | null>(null);
  const [isSketchActive, setIsSketchActive] = useState<boolean>(true);

  const [responses, setResponses] = useState<GuestResponse[]>(() => {
    try {
      const saved = localStorage.getItem('wedding_guest_responses');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: '1',
        name: 'Gill Family',
        attendance: 'attending',
        guestsCount: 4,
        wishes: 'Waheguru Ji Mehar Kare! Wishing Sandeep & Sarbjeet a blessed life ahead.',
        createdAt: 'Oct 6, 2026'
      }
    ];
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Sync state to localStorage for offline persistence
  useEffect(() => {
    try {
      localStorage.setItem('wedding_layout_config', JSON.stringify(layoutConfig));
    } catch (e) {
      console.error(e);
    }
  }, [layoutConfig]);

  useEffect(() => {
    try {
      localStorage.setItem('wedding_design_config', JSON.stringify(designConfig));
    } catch (e) {
      console.error(e);
    }
  }, [designConfig]);

  // Sync CSS variables to document root so all global classes (.text-gold-shine, .bg-velvet-card, etc.) update dynamically
  useEffect(() => {
    const root = document.documentElement;
    const overlayCss = designConfig.overlayEnabled
      ? hexToRgba(designConfig.overlayColor, (designConfig.overlayOpacity ?? 85) / 100)
      : 'transparent';

    const typo = designConfig.typography || DEFAULT_DESIGN_CONFIG.typography;

    root.style.setProperty('--background', designConfig.backgroundColor);
    root.style.setProperty('--primary', designConfig.primaryColor);
    root.style.setProperty('--secondary', designConfig.secondaryColor);
    root.style.setProperty('--heading', designConfig.headingColor);
    root.style.setProperty('--text', designConfig.textColor);
    root.style.setProperty('--accent', designConfig.accentColor);
    root.style.setProperty('--overlay', overlayCss);

    // Dynamic Typography Tokens
    root.style.setProperty('--font-display', typo.displayFont);
    root.style.setProperty('--font-heading', typo.headingFont);
    root.style.setProperty('--font-body', typo.bodyFont);
    root.style.setProperty('--display-font-size', `${typo.displayFontSize}px`);
    root.style.setProperty('--display-font-weight', typo.displayFontWeight);
    root.style.setProperty('--display-letter-spacing', typo.displayLetterSpacing);
    root.style.setProperty('--heading-font-weight', typo.headingFontWeight);
    root.style.setProperty('--heading-letter-spacing', typo.headingLetterSpacing);
    root.style.setProperty('--heading-line-height', typo.headingLineHeight);
    root.style.setProperty('--body-font-size', `${typo.bodyFontSize}px`);
    root.style.setProperty('--body-font-weight', typo.bodyFontWeight);
    root.style.setProperty('--body-line-height', typo.bodyLineHeight);
  }, [designConfig]);

  useEffect(() => {
    try {
      localStorage.setItem('wedding_event_details', JSON.stringify(eventDetails));
    } catch (e) {
      console.error(e);
    }
  }, [eventDetails]);

  useEffect(() => {
    try {
      localStorage.setItem('wedding_selected_template', selectedTemplate);
    } catch (e) {
      console.error(e);
    }
  }, [selectedTemplate]);

  useEffect(() => {
    try {
      localStorage.setItem('wedding_guest_responses', JSON.stringify(responses));
    } catch (e) {
      console.error(e);
    }
  }, [responses]);

  const getCardBorderClass = () => {
    switch (layoutConfig.cardBorderStyle) {
      case 'ornate-gold':
        return 'border-2 border-[#d4af37] shadow-[0_0_35px_rgba(212,175,55,0.45)]';
      case 'minimal':
        return 'border border-[#d4af37]/40 shadow-xl';
      case 'royal-double':
      default:
        return 'border-4 border-double border-[#d4af37]/80 shadow-[0_10px_30px_rgba(0,0,0,0.8)]';
    }
  };


  // Load custom invitation data from URL query param if present (Shareable Link Feature)
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const encodedData = urlParams.get('invitation');
      if (encodedData) {
        const decodedString = atob(encodedData);
        const parsedData = JSON.parse(decodedString);
        if (parsedData.eventDetails) {
          const importedEvents = normalizeWeddingEvents(parsedData.eventDetails.events || initialEventDetails.events).map((event: WeddingEvent) => {
            if (event.id === 'event-jaggo' || event.id === 'event-sukhmani') {
              return {
                ...event,
                ...(event.id === 'event-sukhmani' ? { date: '25 Nov 2026' } : {}),
                venueName: 'Mullanpur Dakha',
                venue: 'Mullanpur Dakha',
                address: 'Mullanpur Dakha, Ludhiana District, Punjab 141101',
                mapUrl: 'https://www.google.com/maps/search/?api=1&query=Mullanpur+Dakha+Ludhiana+Punjab+141101'
              };
            }
            if (event.id === 'event-anand-karaj') {
              return {
                ...event,
                venueName: 'The Grand Manor Resort',
                venue: 'The Grand Manor Resort',
                address: 'Near Nawanshahr, Punjab',
                mapUrl: 'https://www.google.com/maps/place/The+Grand+Manor+Resort/@31.2737484,76.0919828,664m/data=!3m2!1e3!4b1!4m6!3m5!1s0x391ac10c5a3d6ef3:0x10100ef09ba1864a!8m2!3d31.2737438!4d76.0945577!16s%2Fg%2F11g0khc6tx',
                subEvents: event.subEvents?.map((sub) => ({
                  ...sub,
                  startTime: sub.id === 'anand-bharat' ? '6:00 PM' : sub.id === 'anand-doli' ? '4:30 PM' : '10:00 AM',
                  venueName: 'The Grand Manor Resort',
                  address: 'Near Nawanshahr, Punjab'
                }))
              };
            }
            return event;
          });
          setEventDetails({ ...parsedData.eventDetails, events: importedEvents });
        }
        if (parsedData.selectedTemplate) setSelectedTemplate(parsedData.selectedTemplate);
        if (parsedData.couplePhoto) setCouplePhoto(parsedData.couplePhoto);
        if (parsedData.isSketchActive !== undefined) setIsSketchActive(parsedData.isSketchActive);
        if (parsedData.layoutConfig) setLayoutConfig(parsedData.layoutConfig);
        if (parsedData.designConfig) {
          setDesignConfig((prev) => ({
            ...prev,
            ...parsedData.designConfig
          }));
        }
      }
    } catch (err) {
      console.error('Error parsing shared invitation link:', err);
    }
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-piano-112191.mp3');
      audioRef.current.loop = true;
    }
    if (isPlayingMusic) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlayingMusic(true);
    }
  };

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    const matched = PREDEFINED_THEMES.find((t) => t.id === templateId);
    if (matched) {
      setDesignConfig((prev) => ({
        ...prev,
        backgroundType: 'image',
        backgroundImage: matched.bg
      }));
    }
  };


  const handleAddResponse = (newResp: GuestResponse) => {
    setResponses((prev) => [newResp, ...prev]);
  };

  const downloadPDF = async () => {
    setIsGeneratingPDF(true);
    setPdfError(null);
    let pdfContainer: HTMLElement | null = null;
    try {
      pdfContainer = document.getElementById('pdf-invitation-container');
      if (!pdfContainer) {
        alert('PDF template not found');
        return;
      }

      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }
      await Promise.all(Array.from(pdfContainer.querySelectorAll('img')).map((img) => img.complete ? Promise.resolve() : new Promise<void>((resolve) => { img.addEventListener('load', () => resolve(), { once: true }); img.addEventListener('error', () => resolve(), { once: true }); })));

      // Temporarily bring container to visible coordinate space so html2canvas computes accurate layout and fonts
      pdfContainer.style.position = 'fixed';
      pdfContainer.style.left = '0px';
      pdfContainer.style.top = '0px';
      pdfContainer.style.zIndex = '99999';
      pdfContainer.style.pointerEvents = 'none';

      const pageNodes = pdfContainer.querySelectorAll<HTMLElement>('.pdf-page-node');
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfPageHeight = pdf.internal.pageSize.getHeight();

      for (let i = 0; i < pageNodes.length; i++) {
        const pageNode = pageNodes[i];
        const canvas = await html2canvas(pageNode, {
          scale: 2, // High resolution capture
          useCORS: true,
          backgroundColor: designConfig.backgroundColor || '#2b080b',
          logging: false
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.95);

        if (i > 0) {
          pdf.addPage();
        }

        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfPageHeight);

        // Dynamically compute and attach clickable hyperlink annotations for any link buttons on this page
        const linkElements = pageNode.querySelectorAll<HTMLAnchorElement>('a[data-pdf-link]');
        const pageRect = pageNode.getBoundingClientRect();

        linkElements.forEach((linkEl) => {
          const href = linkEl.getAttribute('href');
          if (href && href !== '#' && href.trim() !== '') {
            const linkRect = linkEl.getBoundingClientRect();
            if (pageRect.width > 0 && pageRect.height > 0) {
              const x = ((linkRect.left - pageRect.left) / pageRect.width) * pdfWidth;
              const y = ((linkRect.top - pageRect.top) / pageRect.height) * pdfPageHeight;
              const w = (linkRect.width / pageRect.width) * pdfWidth;
              const h = (linkRect.height / pageRect.height) * pdfPageHeight;
              pdf.link(x, y, w, h, { url: href });
            }
          }
        });
      }

      // Hide PDF container back offscreen
      const filename = `${eventDetails.groomName}_and_${eventDetails.brideName}_Wedding_Invitation.pdf`.replace(/[^a-z0-9._-]+/gi, '_');
      pdf.save(filename);
    } catch (err) {
      console.error('PDF Generation Error:', err);
      setPdfError('We could not create the PDF. Please check that your images have finished loading and try again.');
    } finally {
      if (pdfContainer) {
        pdfContainer.style.position = 'fixed';
        pdfContainer.style.left = '-9999px';
        pdfContainer.style.top = '0px';
        pdfContainer.style.zIndex = '-1';
        pdfContainer.style.pointerEvents = 'none';
      }
      setIsGeneratingPDF(false);
    }
  };

  // Generate a shareable URL containing encoded custom invitation state
  const shareInvitation = () => {
    try {
      const invitationState = {
        eventDetails,
        selectedTemplate,
        isSketchActive,
        layoutConfig,
        designConfig,
        couplePhoto: couplePhoto.startsWith('data:') ? assetPath('couple_sketch_art.jpg') : couplePhoto
      };
      const jsonString = JSON.stringify(invitationState);
      const encodedData = btoa(jsonString);
      const shareUrl = `${window.location.origin}${window.location.pathname}?invitation=${encodedData}`;

      if (navigator.share) {
        navigator.share({
          title: `${eventDetails.groomName} & ${eventDetails.brideName} Wedding Invitation`,
          text: `You are cordially invited to celebrate the royal wedding of ${eventDetails.groomName} & ${eventDetails.brideName}!`,
          url: shareUrl,
        }).catch(() => {});
      } else {
        navigator.clipboard.writeText(shareUrl);
        alert('Customized Invitation Link copied to clipboard! Anyone opening this link will view your edited version.');
      }
    } catch (err) {
      console.error('Share link generation error:', err);
      navigator.clipboard.writeText(window.location.href);
      alert('Invitation link copied to clipboard!');
    }
  };

  const getPublicInvitationUrl = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('view', 'public');
    url.searchParams.set('invitation', btoa(JSON.stringify({ eventDetails, selectedTemplate, isSketchActive, layoutConfig, designConfig })));
    return url.toString();
  };

  const copyPublicInvitationLink = async () => {
    try {
      await navigator.clipboard.writeText(getPublicInvitationUrl());
      alert('Clean guest invitation link copied.');
    } catch {
      alert('Unable to copy the guest invitation link.');
    }
  };

  const getBackgroundStyles = () => {
    const overlayCss = designConfig.overlayEnabled
      ? hexToRgba(designConfig.overlayColor, (designConfig.overlayOpacity ?? 85) / 100)
      : 'transparent';

    const typo = designConfig.typography || DEFAULT_DESIGN_CONFIG.typography;

    const cssVars = {
      '--background': designConfig.backgroundColor,
      '--primary': designConfig.primaryColor,
      '--secondary': designConfig.secondaryColor,
      '--heading': designConfig.headingColor,
      '--text': designConfig.textColor,
      '--accent': designConfig.accentColor,
      '--overlay': overlayCss,

      // Typography Design Tokens
      '--font-display': typo.displayFont,
      '--font-heading': typo.headingFont,
      '--font-body': typo.bodyFont,
      '--display-font-size': `${typo.displayFontSize}px`,
      '--display-font-weight': typo.displayFontWeight,
      '--display-letter-spacing': typo.displayLetterSpacing,
      '--heading-font-weight': typo.headingFontWeight,
      '--heading-letter-spacing': typo.headingLetterSpacing,
      '--heading-line-height': typo.headingLineHeight,
      '--body-font-size': `${typo.bodyFontSize}px`,
      '--body-font-weight': typo.bodyFontWeight,
      '--body-line-height': typo.bodyLineHeight,
    } as React.CSSProperties;

    if (designConfig.backgroundType === 'solid') {
      return {
        ...cssVars,
        backgroundColor: designConfig.backgroundColor,
        backgroundImage: 'none',
      };
    }

    const currentThemeObj = PREDEFINED_THEMES.find((t) => t.id === selectedTemplate) || PREDEFINED_THEMES[0];
    const bgUrl = designConfig.backgroundImage || customBgImage || currentThemeObj.bg;

    let bgImageValue = `url("${bgUrl}")`;
    if (designConfig.overlayEnabled) {
      bgImageValue = `linear-gradient(${overlayCss}, ${overlayCss}), url("${bgUrl}")`;
    }

    return {
      ...cssVars,
      backgroundColor: designConfig.backgroundColor,
      backgroundImage: bgImageValue,
      backgroundPosition: designConfig.backgroundPosition || 'center',
      backgroundSize: designConfig.backgroundSize || 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
    };
  };

  const rootBackgroundStyle = getBackgroundStyles();
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`${eventDetails.groomName} & ${eventDetails.brideName} — Anand Karaj`)}&dates=20261127T100000/20261127T130000&details=${encodeURIComponent(eventDetails.storyText)}&location=${encodeURIComponent(`${eventDetails.venueName}, ${eventDetails.venueAddress}`)}&ctz=Asia%2FKolkata`;
  const calendarIcs = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Wedding Invitation//EN\r\nBEGIN:VEVENT\r\nUID:wedding-anand-karaj-20261127@wedding-invitation\r\nDTSTAMP:20261008T000000Z\r\nDTSTART;TZID=Asia/Kolkata:20261127T100000\r\nDTEND;TZID=Asia/Kolkata:20261127T130000\r\nSUMMARY:${eventDetails.groomName} & ${eventDetails.brideName} — Anand Karaj\r\nDESCRIPTION:${eventDetails.storyText.replace(/[\r\n]+/g, ' ')}\r\nLOCATION:${eventDetails.venueName}, ${eventDetails.venueAddress}\r\nEND:VEVENT\r\nEND:VCALENDAR`;
  const calendarIcsUrl = `data:text/calendar;charset=utf-8,${encodeURIComponent(calendarIcs)}`;

  if (isLandingView) {
    return <PublicHome onBuyTemplate={(templateId) => {
      alert(`Checkout preview for ${templateId}. No payment has been processed.`);
    }} onUseTemplate={(templateId) => {
      handleSelectTemplate(templateId);
      window.location.href = `/?view=editor&template=${encodeURIComponent(templateId)}`;
    }} />;
  }

  if (!isPublicView && !adminAuthenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#351017] px-5 text-[#F1E2C6]">
        <form
          className="w-full max-w-sm rounded-2xl border border-[#C8A76A]/60 bg-[#140608]/95 p-6 shadow-2xl"
          onSubmit={(event) => {
            event.preventDefault();
            if (adminUsername === 'test' && adminPassword === 'test') {
              sessionStorage.setItem('version1_admin_auth', 'true');
              setAdminAuthenticated(true);
              setAdminLoginError('');
            } else {
              setAdminLoginError('Invalid username or password');
            }
          }}
        >
          <div className="mb-5 text-center">
            <Shield className="mx-auto mb-2 h-8 w-8 text-[#C8A76A]" />
            <h1 className="font-cinzel text-lg font-bold text-[#E4CA91]">Version 1 Admin Editor</h1>
            <p className="mt-1 text-xs text-[#F1E2C6]/70">Sign in to edit the invitation</p>
          </div>
          <input value={adminUsername} onChange={(event) => setAdminUsername(event.target.value)} placeholder="Username" autoComplete="username" className="mb-3 w-full rounded-lg border border-[#C8A76A]/40 bg-black/40 px-3 py-2 text-sm text-white outline-none" />
          <input value={adminPassword} onChange={(event) => setAdminPassword(event.target.value)} placeholder="Password" type="password" autoComplete="current-password" className="mb-3 w-full rounded-lg border border-[#C8A76A]/40 bg-black/40 px-3 py-2 text-sm text-white outline-none" />
          {adminLoginError && <p className="mb-3 text-xs text-red-300">{adminLoginError}</p>}
          <button type="submit" className="w-full rounded-lg bg-[#C8A76A] py-2.5 text-sm font-bold uppercase tracking-wider text-[#351017]">Open editor</button>
        </form>
      </main>
    );
  }

  if (!isPublicView) {
    return <ThreePaneAdminWorkspace
      eventDetails={eventDetails}
      onSaveEventDetails={setEventDetails}
      designConfig={designConfig}
      onSaveDesignConfig={setDesignConfig}
    />;
  }

  return (
    <div
      data-invitation-page
      className="min-h-screen relative font-calligraphic selection:bg-[#d4af37] selection:text-black transition-colors duration-300"
      style={{
        ...rootBackgroundStyle,
        ...(isPublicView ? {
          backgroundColor: '#f4ead9',
          // Keep all gate artwork isolated to PaperReveal. Do not place any
          // entrance/legacy image behind the public invitation.
          backgroundImage: `url('${assetPath('paper-panel-floral.png')}')`,
          backgroundPosition: 'center top',
          backgroundSize: '100% auto',
          backgroundRepeat: 'repeat-y',
          backgroundAttachment: 'scroll'
        } : {}),
        ...(isPublicView ? {
          '--background': '#49151F',
          '--primary': '#C8A76A',
          '--secondary': '#351017',
          '--heading': '#E4CA91',
          '--text': '#F1E2C6',
          '--accent': '#C8A76A'
        } : {}),
        color: 'var(--text)'
      }}
    >
      {/* Interactive 3D Door Opening Reveal Overlay */}
      {!hasOpenedDoors && (
        <PaperReveal
          onOpen={() => setHasOpenedDoors(true)}
          brideName={eventDetails.brideName}
          groomName={eventDetails.groomName}
          panelLeftImage={designConfig.frontPanelLeftImage ? (designConfig.frontPanelLeftImage.startsWith('/') ? assetPath(designConfig.frontPanelLeftImage) : designConfig.frontPanelLeftImage) : undefined}
          panelRightImage={designConfig.frontPanelRightImage ? (designConfig.frontPanelRightImage.startsWith('/') ? assetPath(designConfig.frontPanelRightImage) : designConfig.frontPanelRightImage) : undefined}
        />
      )}

      {/* Dedicated editor for this finalized invitation version only */}
      {!isPublicView && <CurrentAdminPanel
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
        eventDetails={eventDetails}
        onSaveEventDetails={setEventDetails}
        designConfig={designConfig}
        onSaveDesignConfig={setDesignConfig}
        onPreviewPdf={() => setIsPdfPreviewOpen(true)}
      />}

      {/* Floating Header Controls */}
      {!isPublicView && <div className={`workspace-toolbar fixed top-2 left-2 right-2 z-40 flex flex-wrap items-center justify-end gap-1.5 sm:top-5 sm:left-auto sm:right-5 sm:gap-2 ${isMobilePreview ? 'mobile-mode' : ''}`}>
        <button
          onClick={() => setIsAdminDashboardOpen(true)}
          className="px-2.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-[#1c0406] border-2 border-[#d4af37] text-[#fce09b] font-cinzel font-bold text-[10px] sm:text-xs uppercase tracking-wider shadow-xl hover:scale-105 transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Shield className="w-4 h-4 text-[#d4af37]" /> Final Version Editor
        </button>

        <button
          onClick={() => setIsMobilePreview((value) => !value)}
          className={`px-2.5 py-2 sm:px-4 sm:py-2.5 rounded-full border font-cinzel font-bold text-[10px] sm:text-xs uppercase tracking-wider shadow-xl transition-all cursor-pointer ${isMobilePreview ? 'border-[#ffd700] bg-[#d4af37] text-neutral-950' : 'border-[#d4af37]/60 bg-black/80 text-[#d4af37]'}`}
        >
          {isMobilePreview ? 'Desktop View' : 'Mobile View'}
        </button>

        {layoutConfig.showMusicToggle && (
          <button
            onClick={toggleMusic}
            className="p-2 sm:p-3 rounded-full bg-black/80 border border-[#d4af37]/60 backdrop-blur-md text-[#d4af37] hover:text-amber-100 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-105 transition-all cursor-pointer"
            title={isPlayingMusic ? 'Mute Music' : 'Play Background Music'}
          >
            {isPlayingMusic ? <Volume2 className="w-5 h-5 text-[#d4af37] animate-pulse" /> : <VolumeX className="w-5 h-5" />}
          </button>
        )}

        <button
          onClick={downloadPDF}
          disabled={isGeneratingPDF}
          className="px-2.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-black/80 border border-[#d4af37]/60 text-[#d4af37] font-cinzel font-bold text-[10px] sm:text-xs uppercase tracking-wider shadow-xl hover:scale-105 transition-all flex items-center gap-1.5 cursor-pointer"
          title="Export Royal Multi-Page Printable PDF Invitation"
        >
          <Download className="w-4 h-4" />
          {isGeneratingPDF ? 'Creating PDF...' : 'Download PDF'}
          </button>
          <button onClick={() => setIsPdfPreviewOpen(true)} className="px-2.5 py-2 sm:px-5 sm:py-3 rounded-full border border-[#d4af37]/60 text-[#fce09b] text-[10px] sm:text-xs uppercase tracking-widest cursor-pointer">Preview PDF</button>
          {pdfError && <p className="mt-3 text-sm text-rose-200">{pdfError}</p>}
          <button onClick={copyPublicInvitationLink} className="px-2.5 py-2 sm:px-4 sm:py-2.5 rounded-full border border-emerald-300/60 bg-black/80 text-emerald-200 font-cinzel font-bold text-[10px] sm:text-xs uppercase tracking-wider cursor-pointer">Copy Guest Link</button>
      </div>}

      {/* Main Content Area */}
      <div className={isMobilePreview ? 'mobile-preview-shell max-w-[430px] w-full mx-auto px-3 py-12' : 'max-w-4xl mx-auto px-4 py-12'}>
        {isMobilePreview && <div className="mobile-preview-label">Mobile preview · 390px</div>}
        {/* Royal Crest Monogram & Card Frame Header */}
        <header
          className="inner-invitation-hero text-center pt-8 pb-10 relative"
          style={{ backgroundImage: 'none' }}
        >
          <div
            className="ek-onkar-header mb-4"
            style={{ borderColor: 'var(--primary)' }}
          >
            <div className="studio-monogram-logo ek-onkar-logo" aria-label="Ek Onkar"><span>ੴ</span></div>
          </div>

          <p className="gurbani-quote" lang="pa-Guru">ਸਤਿਗੁਰੁ ਮੇਰਾ ਸਦਾ ਸਦਾ ਨਾ ਆਵੈ ਨ ਜਾਇ ॥</p>

          {layoutConfig.showStorySection && (
            <div
              className="inner-family-details max-w-md mx-auto space-y-1 mb-4"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--body-font-size)',
                lineHeight: 'var(--body-line-height)',
                color: 'var(--text)'
              }}
            >
              <p className="italic">With the blessings of Waheguru Ji</p>
              <p>
                Son of <span className="font-semibold" style={{ color: 'var(--heading)' }}>Smt. {eventDetails.groomMotherName} & S. {eventDetails.groomFatherName}</span>
              </p>
            </div>
          )}

          <div className="inner-couple-names my-8 relative">
            <h1
              className="text-gold-shine mb-2 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 'var(--display-font-weight)',
                letterSpacing: 'var(--display-letter-spacing)',
                fontSize: `clamp(2.6rem, 6.5vw, ${((designConfig.typography?.displayFontSize || 72) / 16).toFixed(2)}rem)`,
                lineHeight: 1.15
              }}
            >
              {eventDetails.groomName}
            </h1>
            <div className="text-4xl font-cursive my-3 flex items-center justify-center gap-3" style={{ color: 'var(--primary)' }}>
              <span className="w-12 h-0.5" style={{ background: 'linear-gradient(to right, transparent, var(--primary))' }} />
              <Heart className="w-6 h-6" style={{ fill: 'var(--primary)', color: 'var(--primary)' }} />
              <span className="w-12 h-0.5" style={{ background: 'linear-gradient(to left, transparent, var(--primary))' }} />
            </div>
            <h1
              className="text-gold-shine drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 'var(--display-font-weight)',
                letterSpacing: 'var(--display-letter-spacing)',
                fontSize: `clamp(2.6rem, 6.5vw, ${((designConfig.typography?.displayFontSize || 72) / 16).toFixed(2)}rem)`,
                lineHeight: 1.15
              }}
            >
              {eventDetails.brideName}
            </h1>
          </div>

          {/* Couple Image & Sketch Art Frame */}
          {layoutConfig.showCouplePhoto && (
            <div
              className={`inner-couple-photo my-6 max-w-[220px] mx-auto p-1.5 rounded-2xl ${getCardBorderClass()} relative group`}
              style={{
                borderColor: 'var(--primary)',
                background: 'var(--secondary)',
                borderWidth: '1px',
                boxShadow: '0 16px 30px rgba(20, 4, 9, .3)'
              }}
            >
              <div className="rounded-xl overflow-hidden aspect-square border relative" style={{ borderColor: '#F5EBDD', background: '#351017' }}>
                <img
                  src={couplePhoto.startsWith('/') && !couplePhoto.startsWith(import.meta.env.BASE_URL) ? assetPath(couplePhoto) : couplePhoto}
                  alt={`${eventDetails.groomName} and ${eventDetails.brideName}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {layoutConfig.showStorySection && (
            <p
              className="inner-story max-w-xl mx-auto italic leading-relaxed"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: `calc(var(--body-font-size) * 1.15)`,
                lineHeight: 'var(--body-line-height)',
                color: 'var(--text)',
                opacity: 0.95
              }}
            >
              "{eventDetails.storyText}"
            </p>
          )}
        </header>

        {/* Heart Shape Scratch To Reveal Date Feature */}
        {layoutConfig.showScratchCard && (
          <div className="text-center my-2">
            <ScratchToReveal revealText={eventDetails.weddingDate} onReveal={() => setIsDateRevealed(true)} />
          </div>
        )}

        {layoutConfig.showScratchCard && isDateRevealed && (
          <div className="mt-7 mb-12 text-center">
            <a
              href={calendarIcsUrl}
              download="sandeep-sarbjeet-anand-karaj.ics"
              className="inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold transition hover:brightness-110"
              style={{ color: 'var(--primary)', borderColor: 'var(--accent)', backgroundColor: 'rgba(255,255,255,.12)' }}
            >
              <Calendar size={16} aria-hidden="true" />
              Add to Phone Calendar
            </a>
            <a
              href={googleCalendarUrl}
              target="_blank"
              rel="noreferrer"
              className="ml-2 inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold transition hover:brightness-110"
              style={{ color: 'var(--primary)', borderColor: 'var(--accent)', backgroundColor: 'rgba(255,255,255,.12)' }}
            >
              <Calendar size={16} aria-hidden="true" />
              Google Calendar Web
            </a>
          </div>
        )}

        {/* Live Countdown Timer */}
        {layoutConfig.showCountdown && (
          <div className="my-14 text-center">
            <h2
              className="text-lg uppercase mb-3 font-semibold tracking-wider"
              style={{
                fontFamily: 'var(--font-heading)',
                color: 'var(--primary)',
                letterSpacing: 'var(--heading-letter-spacing)'
              }}
            >
              Counting Down To The Union
            </h2>
            <CountdownTimer targetDate="2026-11-27T10:00:00" />
          </div>
        )}

        {/* Event Schedule Section */}
        {layoutConfig.showEventsList && (
          <section className="my-16">
            <div className="text-center mb-10">
              <h2
                className="text-3xl sm:text-5xl text-gold-shine mb-2 font-bold"
                style={{
                  fontFamily: 'var(--font-heading)',
                  letterSpacing: 'var(--heading-letter-spacing)',
                  lineHeight: 'var(--heading-line-height)'
                }}
              >
                Wedding Ceremonies
              </h2>
              <div className="w-32 h-0.5 mx-auto" style={{ background: 'linear-gradient(to right, transparent, var(--primary), transparent)' }} />
            </div>

            <div
              className={layoutConfig.mobileEventLayout === 'scroll' ? 'mobile-events-grid flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible' : 'mobile-events-grid grid gap-4 md:gap-6'}
              style={layoutConfig.mobileEventLayout === 'grid' ? { gridTemplateColumns: `repeat(${isMobilePreview ? 1 : (layoutConfig.mobileEventColumns || 3)}, minmax(0, 1fr))` } : undefined}
            >
              {eventDetails.events.map((evt, idx) => {
                const timeText = evt.startTime ? `${evt.startTime} onward` : evt.time;

                return (
                  <div
                    key={evt.id || idx}
                    className={`mobile-event-card min-w-0 ${layoutConfig.mobileEventLayout === 'scroll' ? 'min-w-[88%] snap-start md:min-w-0' : ''} p-6 rounded-2xl flex flex-col justify-between ${getCardBorderClass()} transition-all hover:-translate-y-1 duration-300`}
                    style={{
                      backgroundColor: 'var(--secondary)',
                      borderColor: 'var(--primary)',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                    }}
                  >
                    <div>
                      <h3
                        className="text-xl font-bold mb-3 break-words"
                        style={{
                          fontFamily: 'var(--font-heading)',
                          color: 'var(--heading)',
                          fontWeight: 'var(--heading-font-weight)',
                          letterSpacing: 'var(--heading-letter-spacing)',
                          lineHeight: 'var(--heading-line-height)'
                        }}
                      >
                        {evt.name || evt.title}
                      </h3>
                      <div
                        className="space-y-3 mb-4"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--body-font-size)',
                          lineHeight: 'var(--body-line-height)',
                          color: 'var(--text)'
                        }}
                      >
                        <p className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 shrink-0" style={{ color: 'var(--primary)' }} />
                          <span>{evt.date}</span>
                        </p>
                        {!evt.subEvents?.length && <p className="flex items-center gap-2">
                            <Clock className="w-4 h-4 shrink-0" style={{ color: 'var(--primary)' }} />
                            <span>{timeText}</span>
                        </p>}
                      </div>
                    </div>
                    {evt.description && (
                      <p
                        className="text-xs border-t pt-3 italic"
                        style={{
                          fontFamily: 'var(--font-body)',
                          borderColor: 'rgba(255,255,255,0.1)',
                          color: 'var(--text)',
                          opacity: 0.8
                        }}
                      >
                        {evt.description}
                      </p>
                    )}
                    {evt.subEvents?.length ? (
                      <div className="mt-4 border-t pt-3" style={{ borderColor: 'rgba(255,255,255,0.12)' }}>
                        <div className="mb-2 text-[10px] uppercase tracking-widest" style={{ color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>Schedule</div>
                        <div className="space-y-2">
                          {evt.subEvents.map((sub) => {
                            const parentDate = evt.date || eventDetails.weddingDate;
                            const parentVenue = evt.venueName || evt.venue;
                            const parentAddress = evt.address;
                            const time = sub.startTime ? `${sub.startTime} onward` : '';
                            return <div key={sub.id} className="flex items-start justify-between gap-3 text-sm" style={{ breakInside: 'avoid', fontFamily: 'var(--font-body)', color: 'var(--text)' }}><div className="min-w-0"><div className="font-semibold" style={{ color: 'var(--heading)' }}>{sub.name}</div>{sub.date && sub.date !== parentDate && <div className="text-xs opacity-80">{sub.date}</div>}{(sub.venueName && sub.venueName !== parentVenue) && <div className="text-xs opacity-80">{sub.venueName}</div>}{(sub.address && sub.address !== parentAddress) && <div className="text-xs opacity-70">{sub.address}</div>}</div><div className="shrink-0 text-right" style={{ color: 'var(--accent)' }}>{time}</div></div>;
                          })}
                        </div>
                      </div>
                    ) : null}
                    {(evt.venueName || evt.venue || evt.address) && (
                      <div className="border-t pt-2.5 mt-4" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--primary)' }} />
                          <div>
                            <p className="font-semibold text-sm break-words" style={{ fontFamily: 'var(--font-heading)', color: 'var(--heading)' }}>{evt.venueName || evt.venue}</p>
                            {evt.address && <p className="text-xs mt-0.5 leading-relaxed break-words" style={{ color: 'var(--text)', opacity: 0.85, overflowWrap: 'anywhere', wordBreak: 'break-word' }}>{evt.address}</p>}
                            {evt.mapUrl && <a href={evt.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[11px] font-sans mt-1.5 transition-colors underline hover:opacity-80" style={{ color: 'var(--accent)' }}><span>View Location on Map</span><ExternalLink className="w-3 h-3" style={{ color: 'var(--primary)' }} /></a>}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Venue & Google Maps Section */}
        <section
          className={`venue-section my-12 sm:my-16 p-5 sm:p-8 rounded-2xl ${getCardBorderClass()} text-center`}
          style={{
            backgroundColor: 'var(--secondary)',
            borderColor: 'var(--primary)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
          }}
        >
          <Sparkles className="w-8 h-8 mx-auto mb-3" style={{ color: 'var(--primary)' }} />
          <h2
            className="text-2xl sm:text-3xl text-gold-shine mb-2 font-bold"
            style={{
              fontFamily: 'var(--font-heading)',
              letterSpacing: 'var(--heading-letter-spacing)',
              lineHeight: 'var(--heading-line-height)'
            }}
          >
            The Venue
          </h2>
          <p
            className="text-xl font-semibold"
            style={{
              fontFamily: 'var(--font-heading)',
              color: 'var(--heading)'
            }}
          >
            {eventDetails.venueName}
          </p>
          <p
            className="text-sm max-w-md mx-auto mt-1 mb-6"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--body-font-size)',
              lineHeight: 'var(--body-line-height)',
              color: 'var(--text)',
              opacity: 0.85
            }}
          >
            {eventDetails.venueAddress}
          </p>

          <div className="venue-map-frame w-full h-[210px] sm:h-72 rounded-xl overflow-hidden border-2 mb-5 sm:mb-6 shadow-2xl" style={{ borderColor: 'var(--primary)' }}>
            <iframe
              title="The Grand Manor Resort Google Map Location"
              src="https://maps.google.com/maps?q=31.2737438,76.0945577&z=16&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
            />
          </div>

          <a
            href={eventDetails.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="venue-directions-link inline-flex w-full sm:w-auto max-w-full items-center justify-center gap-2 px-5 sm:px-7 py-3 rounded-full font-cinzel text-[11px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-widest hover:scale-105 transition-all shadow-lg cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, var(--accent), #E7D09B)',
              border: '1px solid var(--accent)',
              color: '#29332D',
              boxShadow: '0 10px 24px rgba(182,154,100,.28)'
            }}
          >
            Get Directions via Google Maps <ExternalLink className="w-4 h-4" />
          </a>
        </section>

        {/* Interactive RSVP & Guestbook */}
              <CoupleGallery images={designConfig.galleryImages} />
        {layoutConfig.showGuestbook && (
          <GuestBookRSVP onAddResponse={handleAddResponse} responses={responses} />
        )}

        {/* Action Buttons: Share Invitation Link */}
        <div className="text-center my-14">
          <button
            onClick={shareInvitation}
            className="custom-invite-share"
          >
            <span className="custom-invite-share__icon" aria-hidden="true"><Share2 /></span>
            <span className="custom-invite-share__label">Share Customized Invitation Link</span>
          </button>
        </div>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-[#d4af37]/25 text-[#fce7f3]/50 text-xs font-cinzel">
          <p>© 2026 Digital Wedding Invitation • Sandeep & Sarbjeet</p>
        </footer>
      </div>

      {/* Hidden PDF Template element rendered for canvas print capture */}
      <PDFTemplate
        details={eventDetails}
        couplePhoto={couplePhoto}
        designConfig={designConfig}
        customBgImage={customBgImage}
      />
      {!isPublicView && isPdfPreviewOpen && <div className="fixed inset-0 z-[70] overflow-auto bg-black/90 p-4 sm:p-8"><div className="mx-auto w-fit"><div className="mb-4 flex items-center justify-between text-white"><h2 className="font-cinzel text-lg text-[#fce09b]">PDF Preview</h2><button onClick={() => setIsPdfPreviewOpen(false)} className="rounded border border-[#d4af37]/60 px-3 py-1 text-xs uppercase">Close</button></div><PDFTemplate details={eventDetails} couplePhoto={couplePhoto} designConfig={designConfig} customBgImage={customBgImage} preview /></div></div>}
    </div>
  );
}

export default App;
