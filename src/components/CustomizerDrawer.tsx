import React, { useState } from 'react';
import {
  Settings,
  X,
  Plus,
  Trash2,
  Upload,
  Palette,
  Image as ImageIcon,
  Sliders,
  MapPin,
  Check,
  Type,
  ChevronDown,
  ChevronUp,
  Calendar
} from 'lucide-react';
import type { EventDetails, WeddingEvent, WeddingSubEvent, DesignConfig, BackgroundPosition, BackgroundSize } from '../types';
import {
  CURATED_FONTS,
  TYPOGRAPHY_PAIRING_PRESETS,
  DEFAULT_TYPOGRAPHY_CONFIG
} from '../typography';

interface CustomizerDrawerProps {
  details: EventDetails;
  onChange: (updated: EventDetails) => void;
  selectedTemplate: string;
  onSelectTemplate: (template: string) => void;
  isOpen: boolean;
  onClose: () => void;
  onUploadPhoto: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUploadBackground: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSketchActive: boolean;
  onToggleSketch: () => void;
  onOpenAdmin?: () => void;
  designConfig: DesignConfig;
  onChangeDesign: (config: DesignConfig) => void;
}

export const PREDEFINED_THEMES = [
  { id: 'royal-crest', name: 'Ivory Paisley & Champagne', bg: '/royal_crest_background.jpg' },
  { id: 'gold-green', name: 'Emerald Garden & Gold', bg: '/bg_gold_green.jpg' },
  { id: 'maroon-green', name: 'Burgundy Botanical', bg: '/bg_maroon_green.jpg' },
  { id: 'cream-gold', name: 'Royal Ivory Filigree', bg: '/bg_royal_ivory_generated.png' },
  { id: 'yellow-gold', name: 'Marigold Celebration', bg: '/bg_yellow_gold.jpg' },
  { id: 'heart-glow', name: 'Heart Glow Gate', bg: '/bg_heart_glow_generated.png' }
];

export interface ThemePreset {
  id: string;
  name: string;
  config: DesignConfig;
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'royal-red-gold',
    name: 'Cream, Maroon & Gold Heart (Default)',
    config: {
      backgroundType: 'image',
      backgroundColor: '#FAF7F0',
      backgroundImage: '/bg_heart_glow_generated.png',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      overlayEnabled: true,
      overlayColor: '#FAF7F0',
      overlayOpacity: 58,
      primaryColor: '#7A2938',
      secondaryColor: '#FFFDF8',
      headingColor: '#641F2D',
      textColor: '#47252D',
      accentColor: '#B69A64',
      typography: { ...DEFAULT_TYPOGRAPHY_CONFIG }
    }
  },
  {
    id: 'ivory-gold',
    name: 'Ivory + Gold (Classic Silk)',
    config: {
      backgroundType: 'image',
      backgroundColor: '#fbf9f4',
      backgroundImage: '/bg_cream_gold.jpg',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      overlayEnabled: true,
      overlayColor: '#fffef9',
      overlayOpacity: 70,
      primaryColor: '#b8860b',
      secondaryColor: '#f5efe1',
      headingColor: '#8c6218',
      textColor: '#382b1d',
      accentColor: '#d4af37',
      typography: { ...DEFAULT_TYPOGRAPHY_CONFIG }
    }
  },
  {
    id: 'emerald-gold',
    name: 'Emerald + Gold (Regal Mandap)',
    config: {
      backgroundType: 'image',
      backgroundColor: '#072418',
      backgroundImage: '/bg_gold_green.jpg',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      overlayEnabled: true,
      overlayColor: '#03140d',
      overlayOpacity: 80,
      primaryColor: '#d4af37',
      secondaryColor: '#0b3524',
      headingColor: '#fce09b',
      textColor: '#e6f7ef',
      accentColor: '#48cf95',
      typography: { ...DEFAULT_TYPOGRAPHY_CONFIG }
    }
  },
  {
    id: 'navy-silver',
    name: 'Navy + Silver (Midnight Sapphire)',
    config: {
      backgroundType: 'image',
      backgroundColor: '#0a192f',
      backgroundImage: '/bg_royal_velvet.jpg',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      overlayEnabled: true,
      overlayColor: '#060f1c',
      overlayOpacity: 80,
      primaryColor: '#c5d1de',
      secondaryColor: '#112240',
      headingColor: '#e6f1ff',
      textColor: '#d9e2ec',
      accentColor: '#7fa1c3',
      typography: {
        ...DEFAULT_TYPOGRAPHY_CONFIG,
        displayFont: "'Bodoni Moda', serif",
        headingFont: "'Outfit', sans-serif",
        bodyFont: "'Montserrat', sans-serif"
      }
    }
  },
  {
    id: 'white-rosegold',
    name: 'White + Rose Gold (Blush Romance)',
    config: {
      backgroundType: 'image',
      backgroundColor: '#fcf6f7',
      backgroundImage: '/bg_cream_gold.jpg',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      overlayEnabled: true,
      overlayColor: '#fff2f5',
      overlayOpacity: 75,
      primaryColor: '#b76e79',
      secondaryColor: '#faeaee',
      headingColor: '#964455',
      textColor: '#422830',
      accentColor: '#d89b9e',
      typography: {
        ...DEFAULT_TYPOGRAPHY_CONFIG,
        displayFont: "'Allura', cursive",
        headingFont: "'Cinzel', serif",
        bodyFont: "'Lora', serif"
      }
    }
  }
];

export const DEFAULT_DESIGN_CONFIG: DesignConfig = THEME_PRESETS[0].config;

const ColorField = ({
  label,
  value,
  onChange,
  description
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  description?: string;
}) => (
  <div className="p-2.5 rounded-lg border border-[#d4af37]/30 bg-black/60 space-y-1">
    <div className="flex items-center justify-between">
      <label className="text-[10px] uppercase tracking-wider font-semibold text-[#d4af37]">
        {label}
      </label>
      {description && (
        <span className="text-[9px] text-amber-200/60">{description}</span>
      )}
    </div>
    <div className="flex items-center gap-2">
      <input
        type="color"
        value={value && value.startsWith('#') && value.length === 7 ? value : '#d4af37'}
        onChange={(e) => onChange(e.target.value)}
        className="w-8 h-8 rounded border border-[#d4af37]/50 bg-transparent cursor-pointer p-0.5 shrink-0"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="#RRGGBB"
        className="flex-1 bg-black/80 border border-[#d4af37]/30 rounded px-2 py-1 text-xs text-white font-mono uppercase focus:outline-none focus:border-[#d4af37]"
      />
    </div>
  </div>
);

export const CustomizerDrawer: React.FC<CustomizerDrawerProps> = ({
  details,
  onChange,
  selectedTemplate,
  onSelectTemplate,
  isOpen,
  onClose,
  onUploadPhoto,
  onUploadBackground,
  isSketchActive,
  onToggleSketch,
  onOpenAdmin,
  designConfig,
  onChangeDesign
}) => {
  type EditorTab = 'theme' | 'background' | 'typography' | 'content';
  const [activeTab, setActiveTab] = useState<EditorTab>('theme');
  const [showAdvancedColors, setShowAdvancedColors] = useState<boolean>(false);
  const [showAdvancedBg, setShowAdvancedBg] = useState<boolean>(false);

  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [newEventName, setNewEventName] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [newEventStartTime, setNewEventStartTime] = useState('');
  const [newEventEndTime, setNewEventEndTime] = useState('');
  const [newEventVenueName, setNewEventVenueName] = useState('');
  const [newEventAddress, setNewEventAddress] = useState('');
  const [newEventMapUrl, setNewEventMapUrl] = useState('');
  const [newEventDescription, setNewEventDescription] = useState('');

  if (!isOpen) return null;

  const handleInputChange = (field: keyof EventDetails, value: any) => {
    onChange({
      ...details,
      [field]: value
    });
  };

  const handleEventFieldChange = (index: number, field: keyof WeddingEvent, value: string) => {
    const updatedEvents = details.events.map((evt, idx) => {
      if (idx !== index) return evt;
      const updated: WeddingEvent = {
        ...evt,
        [field]: value
      };
      if (field === 'name') {
        updated.title = value;
      }
      if (field === 'venueName') {
        updated.venue = value;
      }
      if (field === 'startTime' || field === 'endTime') {
        const start = field === 'startTime' ? value : (updated.startTime || '');
        const end = field === 'endTime' ? value : (updated.endTime || '');
        updated.time = end ? `${start} - ${end}` : start;
      }
      return updated;
    });

    onChange({
      ...details,
      events: updatedEvents
    });
  };

  const updateSubEvents = (eventIndex: number, subEvents: WeddingSubEvent[]) => {
    onChange({ ...details, events: details.events.map((event, index) => index === eventIndex ? { ...event, subEvents } : event) });
  };

  const updateSubEvent = (eventIndex: number, subIndex: number, field: keyof WeddingSubEvent, value: string) => {
    const event = details.events[eventIndex];
    const subEvents = (event.subEvents || []).map((sub, index) => index === subIndex ? { ...sub, [field]: value } : sub);
    updateSubEvents(eventIndex, subEvents);
  };

  const addSubEvent = (eventIndex: number) => {
    const event = details.events[eventIndex];
    const subEvent: WeddingSubEvent = { id: `sub-event-${Date.now()}`, name: 'New Sub-event', startTime: event.startTime || '10:00 AM' };
    updateSubEvents(eventIndex, [...(event.subEvents || []), subEvent]);
  };

  const reorderSubEvent = (eventIndex: number, subIndex: number, direction: -1 | 1) => {
    const items = [...(details.events[eventIndex].subEvents || [])];
    const target = subIndex + direction;
    if (target < 0 || target >= items.length) return;
    [items[subIndex], items[target]] = [items[target], items[subIndex]];
    updateSubEvents(eventIndex, items);
  };

  const handleCopyVenueFrom = (targetIndex: number, sourceVenue: { venueName: string; address: string; mapUrl?: string }) => {
    const updatedEvents = details.events.map((evt, idx) => {
      if (idx !== targetIndex) return evt;
      return {
        ...evt,
        venueName: sourceVenue.venueName,
        venue: sourceVenue.venueName,
        address: sourceVenue.address,
        mapUrl: sourceVenue.mapUrl || ''
      };
    });

    onChange({
      ...details,
      events: updatedEvents
    });
  };

  const handleAddEvent = () => {
    if (!newEventName.trim()) return;
    const start = newEventStartTime.trim() || '10:00 AM';
    const end = newEventEndTime.trim() || undefined;
    const vName = newEventVenueName.trim() || details.venueName || 'Main Venue';
    const addr = newEventAddress.trim() || details.venueAddress || '';
    const map = newEventMapUrl.trim() || '';
    const desc = newEventDescription.trim() || 'Join us to celebrate this special ceremony.';
    const date = newEventDate.trim() || details.weddingDate || '27 Nov 2026';
    const id = `event-${Date.now()}`;

    const newEvt: WeddingEvent = {
      id,
      name: newEventName.trim(),
      title: newEventName.trim(),
      date,
      startTime: start,
      endTime: end,
      time: end ? `${start} - ${end}` : start,
      venueName: vName,
      venue: vName,
      address: addr,
      mapUrl: map,
      description: desc
    };

    onChange({
      ...details,
      events: [...details.events, newEvt]
    });

    setNewEventName('');
    setNewEventDate('');
    setNewEventStartTime('');
    setNewEventEndTime('');
    setNewEventVenueName('');
    setNewEventAddress('');
    setNewEventMapUrl('');
    setNewEventDescription('');
    setIsAddingEvent(false);
  };

  const handleRemoveEvent = (index: number) => {
    const updated = details.events.filter((_, i) => i !== index);
    onChange({
      ...details,
      events: updated
    });
  };

  const existingVenues = details.events
    .map(e => ({ venueName: e.venueName || e.venue || '', address: e.address || '', mapUrl: e.mapUrl || '' }))
    .filter((v, idx, arr) => Boolean(v.venueName) && arr.findIndex(other => other.venueName === v.venueName && other.address === v.address) === idx);

  return (
    <div className="studio-editor-surface relative top-0 z-50 w-full max-h-[78vh] overflow-y-auto bg-[#140608]/95 backdrop-blur-xl border-b border-[#d4af37]/40 shadow-2xl text-[#fce7f3] flex flex-col font-body pt-14 lg:fixed lg:inset-y-0 lg:left-0 lg:right-auto lg:max-h-none lg:w-[460px] lg:border-b-0 lg:border-r lg:pt-0">
      {/* Drawer Header */}
      <div className="p-4 border-b border-[#d4af37]/30 flex items-center justify-between bg-black/50 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-[#d4af37]" />
          <div>
            <h2 className="font-cinzel text-base sm:text-lg font-bold text-gold-shine">Royal Design Studio</h2>
            <p className="text-[10px] text-amber-200/60 hidden sm:block">Live Theme, Background & Typography Editor</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-gradient-to-r from-[#d4af37] to-[#aa771c] text-neutral-950 font-bold rounded text-xs uppercase tracking-wider hover:opacity-90 shadow-md transition-all cursor-pointer"
          >
            💾 Save & Apply
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-amber-200 transition-colors cursor-pointer"
            title="Close Drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Editor Navigation Tabs */}
      <div className="grid grid-cols-4 border-b border-[#d4af37]/30 bg-black/70 shrink-0">
        <button
          type="button"
          onClick={() => setActiveTab('theme')}
          className={`py-2.5 px-1.5 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 text-[11px] font-cinzel font-bold transition-all cursor-pointer border-b-2 ${
            activeTab === 'theme'
              ? 'border-[#ffd700] text-[#fce09b] bg-[#2b080b]/80 shadow-inner'
              : 'border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-white/5'
          }`}
        >
          <Palette className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>Theme</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('background')}
          className={`py-2.5 px-1.5 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 text-[11px] font-cinzel font-bold transition-all cursor-pointer border-b-2 ${
            activeTab === 'background'
              ? 'border-[#ffd700] text-[#fce09b] bg-[#2b080b]/80 shadow-inner'
              : 'border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-white/5'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>Background</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('typography')}
          className={`py-2.5 px-1.5 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 text-[11px] font-cinzel font-bold transition-all cursor-pointer border-b-2 ${
            activeTab === 'typography'
              ? 'border-[#ffd700] text-[#fce09b] bg-[#2b080b]/80 shadow-inner'
              : 'border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-white/5'
          }`}
        >
          <Type className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>Typography</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('content')}
          className={`py-2.5 px-1.5 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 text-[11px] font-cinzel font-bold transition-all cursor-pointer border-b-2 ${
            activeTab === 'content'
              ? 'border-[#ffd700] text-[#fce09b] bg-[#2b080b]/80 shadow-inner'
              : 'border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-white/5'
          }`}
        >
          <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>Events</span>
        </button>
      </div>

      {/* Scrolling Form Controls */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {/* ===================== TAB 1: THEME ===================== */}
        {activeTab === 'theme' && (
          <div className="space-y-4">
            {/* Theme Presets */}
            <div className="rounded-xl border border-[#d4af37]/40 bg-black/60 p-3.5 shadow-md space-y-3">
              <div className="flex items-center justify-between pb-1.5 border-b border-[#d4af37]/30">
                <div className="text-[11px] uppercase tracking-wider text-[#d4af37] font-semibold flex items-center gap-1.5 font-cinzel">
                  <Palette className="w-4 h-4 text-[#d4af37]" /> Theme Presets
                </div>
                <span className="text-[9px] text-amber-200/60 uppercase">One-Click Presets</span>
              </div>

              <p className="text-[11px] text-neutral-300 leading-relaxed">
                Select a modern wedding theme preset. Plum, Violet & Blush is the signature default preset. All individual colours remain customizable below.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {THEME_PRESETS.map((preset) => {
                  const isSelected =
                    designConfig.backgroundColor === preset.config.backgroundColor &&
                    designConfig.primaryColor === preset.config.primaryColor &&
                    designConfig.secondaryColor === preset.config.secondaryColor;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        onChangeDesign(preset.config);
                        const matchedTheme = PREDEFINED_THEMES.find(t => t.bg === preset.config.backgroundImage);
                        if (matchedTheme) {
                          onSelectTemplate(matchedTheme.id);
                        }
                      }}
                      className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-[#ffd700] bg-[#2b080b] ring-1 ring-[#d4af37]'
                          : 'border-[#d4af37]/30 bg-black/50 hover:border-[#d4af37]'
                      }`}
                    >
                      <div className="truncate">
                        <div className="font-bold text-xs text-[#fce09b] truncate">{preset.name}</div>
                        <div className="flex items-center gap-1 mt-1.5">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white/30 inline-block shrink-0 shadow-sm"
                            style={{ backgroundColor: preset.config.backgroundColor }}
                            title="Background"
                          />
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white/30 inline-block shrink-0 shadow-sm"
                            style={{ backgroundColor: preset.config.primaryColor }}
                            title="Primary"
                          />
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white/30 inline-block shrink-0 shadow-sm"
                            style={{ backgroundColor: preset.config.secondaryColor }}
                            title="Secondary / Card"
                          />
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white/30 inline-block shrink-0 shadow-sm"
                            style={{ backgroundColor: preset.config.accentColor }}
                            title="Accent"
                          />
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-[#ffd700] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Core Theme Colors */}
            <div className="rounded-xl border border-[#d4af37]/40 bg-black/60 p-3.5 shadow-md space-y-3">
              <div className="flex items-center justify-between pb-1.5 border-b border-[#d4af37]/30">
                <div className="text-[11px] uppercase tracking-wider text-[#d4af37] font-semibold flex items-center gap-1.5 font-cinzel">
                  <Sliders className="w-4 h-4 text-[#d4af37]" /> Core Theme Colors
                </div>
                <span className="text-[9px] text-amber-200/60 uppercase">Live Preview</span>
              </div>

              <div className="space-y-2.5">
                <ColorField
                  label="Primary Color"
                  value={designConfig.primaryColor}
                  onChange={(val) => onChangeDesign({ ...designConfig, primaryColor: val })}
                  description="Regal borders, buttons & royal monogram"
                />

                <ColorField
                  label="Secondary Color"
                  value={designConfig.secondaryColor}
                  onChange={(val) => onChangeDesign({ ...designConfig, secondaryColor: val })}
                  description="Ceremony card containers & card fill"
                />

                <ColorField
                  label="Accent Color"
                  value={designConfig.accentColor}
                  onChange={(val) => onChangeDesign({ ...designConfig, accentColor: val })}
                  description="Decorative gold highlights & badges"
                />
              </div>

              {/* Collapsible Advanced Colors */}
              <div className="pt-2 border-t border-[#d4af37]/20">
                <button
                  type="button"
                  onClick={() => setShowAdvancedColors(!showAdvancedColors)}
                  className="w-full flex items-center justify-between py-1.5 text-xs text-amber-200/80 hover:text-[#fce09b] transition-colors cursor-pointer font-semibold"
                >
                  <span>Advanced Text & Canvas Colors</span>
                  {showAdvancedColors ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {showAdvancedColors && (
                  <div className="space-y-2.5 pt-2">
                    <ColorField
                      label="Canvas Background Color"
                      value={designConfig.backgroundColor}
                      onChange={(val) => onChangeDesign({ ...designConfig, backgroundColor: val })}
                      description="Base canvas background tone"
                    />

                    <ColorField
                      label="Heading / Names Color"
                      value={designConfig.headingColor}
                      onChange={(val) => onChangeDesign({ ...designConfig, headingColor: val })}
                      description="Couple names & titles"
                    />

                    <ColorField
                      label="Body Text Color"
                      value={designConfig.textColor}
                      onChange={(val) => onChangeDesign({ ...designConfig, textColor: val })}
                      description="Ceremony descriptions, parents & dates"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 2: BACKGROUND ===================== */}
        {activeTab === 'background' && (
          <div className="space-y-4">
            {/* Background Settings */}
            <div className="rounded-xl border border-[#d4af37]/40 bg-black/60 p-3.5 shadow-md space-y-3">
              <div className="flex items-center justify-between pb-1.5 border-b border-[#d4af37]/30">
                <div className="text-[11px] uppercase tracking-wider text-[#d4af37] font-semibold flex items-center gap-1.5 font-cinzel">
                  <ImageIcon className="w-4 h-4 text-[#d4af37]" /> Background Mode
                </div>
                <span className="text-[9px] text-amber-200/60 uppercase">Canvas Setup</span>
              </div>

              {/* Background Type Toggle */}
              <div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onChangeDesign({ ...designConfig, backgroundType: 'image' })}
                    className={`py-2 px-3 rounded-lg border font-cinzel text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      designConfig.backgroundType === 'image'
                        ? 'border-[#ffd700] bg-[#2b080b] text-[#fce09b] ring-1 ring-[#d4af37]'
                        : 'border-[#d4af37]/30 bg-black/50 text-neutral-300 hover:border-[#d4af37]'
                    }`}
                  >
                    🖼️ Background Image
                  </button>
                  <button
                    type="button"
                    onClick={() => onChangeDesign({ ...designConfig, backgroundType: 'solid' })}
                    className={`py-2 px-3 rounded-lg border font-cinzel text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      designConfig.backgroundType === 'solid'
                        ? 'border-[#ffd700] bg-[#2b080b] text-[#fce09b] ring-1 ring-[#d4af37]'
                        : 'border-[#d4af37]/30 bg-black/50 text-neutral-300 hover:border-[#d4af37]'
                    }`}
                  >
                    🎨 Solid Color
                  </button>
                </div>
              </div>

              {/* If Solid Background is selected */}
              {designConfig.backgroundType === 'solid' && (
                <div className="pt-1">
                  <ColorField
                    label="Solid Canvas Color"
                    value={designConfig.backgroundColor}
                    onChange={(val) => onChangeDesign({ ...designConfig, backgroundColor: val })}
                    description="Entire background tone (e.g. #2b080b, #0a192f, #ffffff)"
                  />
                </div>
              )}

              {/* If Image Background is selected */}
              {designConfig.backgroundType === 'image' && (
                <div className="space-y-3 pt-1">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#d4af37] font-semibold block mb-1">
                      Preset Wallpaper Textures
                    </label>
                    <div className="grid grid-cols-6 gap-1.5">
                      {PREDEFINED_THEMES.map((thm) => (
                        <button
                          key={thm.id}
                          type="button"
                          onClick={() => {
                            onSelectTemplate(thm.id);
                            onChangeDesign({ ...designConfig, backgroundImage: thm.bg, backgroundType: 'image' });
                          }}
                          className={`h-8 rounded-lg border transition-all cursor-pointer relative overflow-hidden ${
                            designConfig.backgroundImage === thm.bg || selectedTemplate === thm.id
                              ? 'border-[#ffd700] ring-2 ring-[#d4af37] scale-105 shadow-lg'
                              : 'border-[#d4af37]/30 opacity-70 hover:opacity-100'
                          }`}
                          style={{
                            backgroundImage: `url("${thm.bg}")`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                          title={thm.name}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Upload Custom Wallpaper */}
                  <div>
                    <label className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg border border-dashed border-[#d4af37]/60 bg-black/40 text-[#fce09b] hover:bg-[#d4af37]/15 cursor-pointer transition-colors text-xs font-medium">
                      <Upload className="w-3.5 h-3.5 text-[#d4af37]" /> Upload Custom Background Image
                      <input type="file" accept="image/*" onChange={onUploadBackground} className="hidden" />
                    </label>
                  </div>

                  {/* Collapsible Position and Size Controls */}
                  <div className="pt-2 border-t border-[#d4af37]/20">
                    <button
                      type="button"
                      onClick={() => setShowAdvancedBg(!showAdvancedBg)}
                      className="w-full flex items-center justify-between py-1 text-xs text-amber-200/80 hover:text-[#fce09b] transition-colors cursor-pointer font-semibold"
                    >
                      <span>Image Placement & Cover Sizing</span>
                      {showAdvancedBg ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {showAdvancedBg && (
                      <div className="grid grid-cols-2 gap-2 pt-2">
                        <div>
                          <label className="text-[10px] uppercase tracking-wider text-[#d4af37] font-semibold block mb-1">
                            Image Position
                          </label>
                          <select
                            value={designConfig.backgroundPosition || 'center'}
                            onChange={(e) =>
                              onChangeDesign({
                                ...designConfig,
                                backgroundPosition: e.target.value as BackgroundPosition
                              })
                            }
                            className="w-full bg-black/80 border border-[#d4af37]/40 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                          >
                            <option value="center">Center</option>
                            <option value="top">Top</option>
                            <option value="bottom">Bottom</option>
                            <option value="left">Left</option>
                            <option value="right">Right</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[10px] uppercase tracking-wider text-[#d4af37] font-semibold block mb-1">
                            Image Size
                          </label>
                          <select
                            value={designConfig.backgroundSize || 'cover'}
                            onChange={(e) =>
                              onChangeDesign({
                                ...designConfig,
                                backgroundSize: e.target.value as BackgroundSize
                              })
                            }
                            className="w-full bg-black/80 border border-[#d4af37]/40 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                          >
                            <option value="cover">Cover (Fill Screen)</option>
                            <option value="contain">Contain (Fit Screen)</option>
                            <option value="auto">Auto (Original)</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Independent Overlay Controls */}
            {designConfig.backgroundType === 'image' && (
              <div className="rounded-xl border border-[#d4af37]/40 bg-black/60 p-3.5 shadow-md space-y-3">
                <div className="flex items-center justify-between pb-1.5 border-b border-[#d4af37]/30">
                  <div className="text-[11px] uppercase tracking-wider text-[#d4af37] font-semibold flex items-center gap-1.5 font-cinzel">
                    <Sliders className="w-4 h-4 text-[#d4af37]" /> Background Image Overlay
                  </div>
                  <label className="flex items-center gap-1.5 cursor-pointer text-xs">
                    <input
                      type="checkbox"
                      checked={designConfig.overlayEnabled}
                      onChange={(e) =>
                        onChangeDesign({ ...designConfig, overlayEnabled: e.target.checked })
                      }
                      className="rounded border-[#d4af37] text-[#d4af37] focus:ring-0 cursor-pointer"
                    />
                    <span className="font-semibold text-[#fce09b]">
                      {designConfig.overlayEnabled ? 'Overlay ON' : 'Overlay OFF'}
                    </span>
                  </label>
                </div>

                {designConfig.overlayEnabled ? (
                  <div className="space-y-3 pt-1">
                    <ColorField
                      label="Overlay Color"
                      value={designConfig.overlayColor}
                      onChange={(val) => onChangeDesign({ ...designConfig, overlayColor: val })}
                      description="Tint color layered on top of image"
                    />

                    <div className="p-2.5 rounded-lg border border-[#d4af37]/30 bg-black/60 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] uppercase tracking-wider font-semibold text-[#d4af37]">
                          Overlay Opacity
                        </label>
                        <span className="text-xs font-mono font-bold text-[#fce09b]">
                          {designConfig.overlayOpacity}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={designConfig.overlayOpacity}
                        onChange={(e) =>
                          onChangeDesign({
                            ...designConfig,
                            overlayOpacity: Number(e.target.value)
                          })
                        }
                        className="w-full accent-[#d4af37] cursor-pointer"
                      />
                      <div className="flex justify-between text-[9px] text-amber-200/60 pt-0.5">
                        <span>0% (Raw Image)</span>
                        <span>15–30% (Subtle Tint)</span>
                        <span>75–85% (High Contrast)</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-neutral-400 italic">
                    Overlay is turned OFF. The background image is displayed raw with zero tinting.
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* ===================== TAB 3: TYPOGRAPHY ===================== */}
        {activeTab === 'typography' && (
          <div className="space-y-4">
            {/* 5. TYPOGRAPHY & FONT STUDIO (3-TIER LUXURY HIERARCHY) */}
            <div className="rounded-xl border border-[#d4af37]/40 bg-black/60 p-3.5 shadow-md space-y-4">
              <div className="flex items-center justify-between pb-1.5 border-b border-[#d4af37]/30">
                <div className="text-[11px] uppercase tracking-wider text-[#d4af37] font-semibold flex items-center gap-1.5 font-cinzel">
                  <Type className="w-4 h-4 text-[#d4af37]" /> Typography & Font Studio
                </div>
                <span className="text-[9px] text-amber-200/60 uppercase">3-Tier Hierarchy</span>
              </div>

          {/* Quick Typography Pairings */}
          <div>
            <label className="text-[10px] uppercase tracking-wider text-[#d4af37] font-semibold block mb-1.5">
              Curated Royal Pairings (One-Click)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {TYPOGRAPHY_PAIRING_PRESETS.map((pairing) => {
                const isSelected =
                  (designConfig.typography?.displayFont || DEFAULT_TYPOGRAPHY_CONFIG.displayFont) === pairing.config.displayFont &&
                  (designConfig.typography?.headingFont || DEFAULT_TYPOGRAPHY_CONFIG.headingFont) === pairing.config.headingFont;

                return (
                  <button
                    key={pairing.id}
                    type="button"
                    onClick={() =>
                      onChangeDesign({
                        ...designConfig,
                        typography: { ...pairing.config }
                      })
                    }
                    className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-[#ffd700] bg-[#2b080b] ring-1 ring-[#d4af37]'
                        : 'border-[#d4af37]/30 bg-black/50 hover:border-[#d4af37]'
                    }`}
                  >
                    <div className="truncate pr-1">
                      <div className="font-bold text-xs text-[#fce09b] truncate">{pairing.name}</div>
                      <div className="text-[10px] text-amber-100/70 truncate mt-0.5">{pairing.desc}</div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#ffd700] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* TIER 1: DISPLAY FONT (BRIDE & GROOM NAMES) */}
          <div className="p-3 rounded-lg border border-[#d4af37]/30 bg-black/50 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#fce09b] uppercase tracking-wider font-cinzel">
                1. Display Font (Couple Names)
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/30">
                Monogram & Names
              </span>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-wider text-[#d4af37] font-semibold block mb-1">
                Font Family
              </label>
              <select
                value={designConfig.typography?.displayFont || DEFAULT_TYPOGRAPHY_CONFIG.displayFont}
                onChange={(e) =>
                  onChangeDesign({
                    ...designConfig,
                    typography: {
                      ...(designConfig.typography || DEFAULT_TYPOGRAPHY_CONFIG),
                      displayFont: e.target.value
                    }
                  })
                }
                className="w-full bg-black/80 border border-[#d4af37]/40 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              >
                {[
                  'Luxury Serif',
                  'Script / Calligraphy',
                  'Elegant Serif',
                  'Traditional / Classic',
                  'Modern Clean'
                ].map((category) => (
                  <optgroup key={category} label={category} className="bg-neutral-900 text-amber-300 font-semibold">
                    {CURATED_FONTS.filter((f) => f.category === category).map((font) => (
                      <option key={font.name} value={font.family} className="text-white bg-black">
                        {font.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            {/* Display Font Weight & Letter Spacing */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#d4af37] font-semibold block mb-1">
                  Font Weight
                </label>
                <select
                  value={designConfig.typography?.displayFontWeight || '700'}
                  onChange={(e) =>
                    onChangeDesign({
                      ...designConfig,
                      typography: {
                        ...(designConfig.typography || DEFAULT_TYPOGRAPHY_CONFIG),
                        displayFontWeight: e.target.value
                      }
                    })
                  }
                  className="w-full bg-black/80 border border-[#d4af37]/40 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="400">Regular (400)</option>
                  <option value="600">SemiBold (600)</option>
                  <option value="700">Bold (700)</option>
                  <option value="800">ExtraBold (800)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#d4af37] font-semibold block mb-1">
                  Letter Spacing
                </label>
                <select
                  value={designConfig.typography?.displayLetterSpacing || '0.1em'}
                  onChange={(e) =>
                    onChangeDesign({
                      ...designConfig,
                      typography: {
                        ...(designConfig.typography || DEFAULT_TYPOGRAPHY_CONFIG),
                        displayLetterSpacing: e.target.value
                      }
                    })
                  }
                  className="w-full bg-black/80 border border-[#d4af37]/40 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="0.02em">Tight (0.02em)</option>
                  <option value="0.05em">Normal (0.05em)</option>
                  <option value="0.1em">Wide (0.10em)</option>
                  <option value="0.18em">Ultra-Wide (0.18em)</option>
                </select>
              </div>
            </div>

            {/* Display Font Size Slider */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[10px] uppercase tracking-wider text-[#d4af37] font-semibold">
                  Display Font Scale
                </label>
                <span className="text-[10px] font-mono text-[#fce09b]">
                  {designConfig.typography?.displayFontSize || 72}px
                </span>
              </div>
              <input
                type="range"
                min="48"
                max="88"
                step="2"
                value={designConfig.typography?.displayFontSize || 72}
                onChange={(e) =>
                  onChangeDesign({
                    ...designConfig,
                    typography: {
                      ...(designConfig.typography || DEFAULT_TYPOGRAPHY_CONFIG),
                      displayFontSize: Number(e.target.value)
                    }
                  })
                }
                className="w-full accent-[#d4af37] cursor-pointer"
              />
            </div>

            {/* Live Sample Preview */}
            <div
              className="p-2 rounded bg-black/70 border border-[#d4af37]/20 text-center truncate text-[#fce09b]"
              style={{
                fontFamily: designConfig.typography?.displayFont || DEFAULT_TYPOGRAPHY_CONFIG.displayFont,
                fontWeight: designConfig.typography?.displayFontWeight || '700',
                letterSpacing: designConfig.typography?.displayLetterSpacing || '0.1em',
                fontSize: '18px'
              }}
            >
              Sandeep & Sarbjeet
            </div>
          </div>

          {/* TIER 2: HEADING FONT (EVENT NAMES & SECTIONS) */}
          <div className="p-3 rounded-lg border border-[#d4af37]/30 bg-black/50 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#fce09b] uppercase tracking-wider font-cinzel">
                2. Heading Font (Ceremony Titles & Headers)
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/30">
                Titles & Kicker
              </span>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-wider text-[#d4af37] font-semibold block mb-1">
                Font Family
              </label>
              <select
                value={designConfig.typography?.headingFont || DEFAULT_TYPOGRAPHY_CONFIG.headingFont}
                onChange={(e) =>
                  onChangeDesign({
                    ...designConfig,
                    typography: {
                      ...(designConfig.typography || DEFAULT_TYPOGRAPHY_CONFIG),
                      headingFont: e.target.value
                    }
                  })
                }
                className="w-full bg-black/80 border border-[#d4af37]/40 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              >
                {[
                  'Luxury Serif',
                  'Script / Calligraphy',
                  'Elegant Serif',
                  'Traditional / Classic',
                  'Modern Clean'
                ].map((category) => (
                  <optgroup key={category} label={category} className="bg-neutral-900 text-amber-300 font-semibold">
                    {CURATED_FONTS.filter((f) => f.category === category).map((font) => (
                      <option key={font.name} value={font.family} className="text-white bg-black">
                        {font.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            {/* Heading Font Weight, Letter Spacing, and Line Height */}
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#d4af37] font-semibold block mb-1">
                  Weight
                </label>
                <select
                  value={designConfig.typography?.headingFontWeight || '700'}
                  onChange={(e) =>
                    onChangeDesign({
                      ...designConfig,
                      typography: {
                        ...(designConfig.typography || DEFAULT_TYPOGRAPHY_CONFIG),
                        headingFontWeight: e.target.value
                      }
                    })
                  }
                  className="w-full bg-black/80 border border-[#d4af37]/40 rounded px-1.5 py-1 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="400">400</option>
                  <option value="600">600</option>
                  <option value="700">700</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#d4af37] font-semibold block mb-1">
                  Spacing
                </label>
                <select
                  value={designConfig.typography?.headingLetterSpacing || '0.05em'}
                  onChange={(e) =>
                    onChangeDesign({
                      ...designConfig,
                      typography: {
                        ...(designConfig.typography || DEFAULT_TYPOGRAPHY_CONFIG),
                        headingLetterSpacing: e.target.value
                      }
                    })
                  }
                  className="w-full bg-black/80 border border-[#d4af37]/40 rounded px-1.5 py-1 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="0em">0em</option>
                  <option value="0.05em">0.05em</option>
                  <option value="0.1em">0.10em</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#d4af37] font-semibold block mb-1">
                  Height
                </label>
                <select
                  value={designConfig.typography?.headingLineHeight || '1.3'}
                  onChange={(e) =>
                    onChangeDesign({
                      ...designConfig,
                      typography: {
                        ...(designConfig.typography || DEFAULT_TYPOGRAPHY_CONFIG),
                        headingLineHeight: e.target.value
                      }
                    })
                  }
                  className="w-full bg-black/80 border border-[#d4af37]/40 rounded px-1.5 py-1 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="1.2">1.2 (Tight)</option>
                  <option value="1.3">1.3 (Normal)</option>
                  <option value="1.5">1.5 (Airy)</option>
                </select>
              </div>
            </div>

            {/* Live Sample Preview */}
            <div
              className="p-2 rounded bg-black/70 border border-[#d4af37]/20 text-center truncate text-[#fce09b]"
              style={{
                fontFamily: designConfig.typography?.headingFont || DEFAULT_TYPOGRAPHY_CONFIG.headingFont,
                fontWeight: designConfig.typography?.headingFontWeight || '700',
                letterSpacing: designConfig.typography?.headingLetterSpacing || '0.05em',
                lineHeight: designConfig.typography?.headingLineHeight || '1.3',
                fontSize: '15px'
              }}
            >
              Anand Karaj & Jaggo Celebrations
            </div>
          </div>

          {/* TIER 3: BODY FONT (DATES, VENUES, DESCRIPTIONS & PARENTS) */}
          <div className="p-3 rounded-lg border border-[#d4af37]/30 bg-black/50 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#fce09b] uppercase tracking-wider font-cinzel">
                3. Body Font (Details & Literature)
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/30">
                Dates, Venue & Parents
              </span>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-wider text-[#d4af37] font-semibold block mb-1">
                Font Family
              </label>
              <select
                value={designConfig.typography?.bodyFont || DEFAULT_TYPOGRAPHY_CONFIG.bodyFont}
                onChange={(e) =>
                  onChangeDesign({
                    ...designConfig,
                    typography: {
                      ...(designConfig.typography || DEFAULT_TYPOGRAPHY_CONFIG),
                      bodyFont: e.target.value
                    }
                  })
                }
                className="w-full bg-black/80 border border-[#d4af37]/40 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              >
                {[
                  'Traditional / Classic',
                  'Elegant Serif',
                  'Modern Clean',
                  'Luxury Serif',
                  'Script / Calligraphy'
                ].map((category) => (
                  <optgroup key={category} label={category} className="bg-neutral-900 text-amber-300 font-semibold">
                    {CURATED_FONTS.filter((f) => f.category === category).map((font) => (
                      <option key={font.name} value={font.family} className="text-white bg-black">
                        {font.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            {/* Body Font Size Slider */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[10px] uppercase tracking-wider text-[#d4af37] font-semibold">
                  Body Font Size
                </label>
                <span className="text-[10px] font-mono text-[#fce09b]">
                  {designConfig.typography?.bodyFontSize || 16}px
                </span>
              </div>
              <input
                type="range"
                min="13"
                max="19"
                step="1"
                value={designConfig.typography?.bodyFontSize || 16}
                onChange={(e) =>
                  onChangeDesign({
                    ...designConfig,
                    typography: {
                      ...(designConfig.typography || DEFAULT_TYPOGRAPHY_CONFIG),
                      bodyFontSize: Number(e.target.value)
                    }
                  })
                }
                className="w-full accent-[#d4af37] cursor-pointer"
              />
            </div>

            {/* Body Weight and Line Height */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#d4af37] font-semibold block mb-1">
                  Font Weight
                </label>
                <select
                  value={designConfig.typography?.bodyFontWeight || '400'}
                  onChange={(e) =>
                    onChangeDesign({
                      ...designConfig,
                      typography: {
                        ...(designConfig.typography || DEFAULT_TYPOGRAPHY_CONFIG),
                        bodyFontWeight: e.target.value
                      }
                    })
                  }
                  className="w-full bg-black/80 border border-[#d4af37]/40 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="300">Light (300)</option>
                  <option value="400">Regular (400)</option>
                  <option value="500">Medium (500)</option>
                  <option value="600">SemiBold (600)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#d4af37] font-semibold block mb-1">
                  Line Height
                </label>
                <select
                  value={designConfig.typography?.bodyLineHeight || '1.6'}
                  onChange={(e) =>
                    onChangeDesign({
                      ...designConfig,
                      typography: {
                        ...(designConfig.typography || DEFAULT_TYPOGRAPHY_CONFIG),
                        bodyLineHeight: e.target.value
                      }
                    })
                  }
                  className="w-full bg-black/80 border border-[#d4af37]/40 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="1.4">Compact (1.4)</option>
                  <option value="1.6">Standard (1.6)</option>
                  <option value="1.8">Relaxed (1.8)</option>
                </select>
              </div>
            </div>

            {/* Live Sample Preview */}
            <div
              className="p-2 rounded bg-black/70 border border-[#d4af37]/20 text-center text-[#fce7f3]/90 italic"
              style={{
                fontFamily: designConfig.typography?.bodyFont || DEFAULT_TYPOGRAPHY_CONFIG.bodyFont,
                fontWeight: designConfig.typography?.bodyFontWeight || '400',
                lineHeight: designConfig.typography?.bodyLineHeight || '1.6',
                fontSize: `${designConfig.typography?.bodyFontSize || 16}px`
              }}
            >
              "With divine blessings of Waheguru Ji and joyful hearts of our families..."
            </div>
          </div>
        </div>
      </div>
    )}

        {/* ===================== TAB 4: EVENTS & CONTENT ===================== */}
        {activeTab === 'content' && (
          <div className="space-y-4">
            {onOpenAdmin && (
              <div className="p-3 rounded-lg bg-gradient-to-r from-[#2b080b] to-[#1c0406] border border-[#d4af37]/60 flex items-center justify-between shadow-md">
                <div>
                  <div className="font-bold text-[#fce09b] text-xs flex items-center gap-1.5 font-cinzel">
                    <Sliders className="w-3.5 h-3.5 text-[#d4af37]" /> Page Modules & Layout Switcher
                  </div>
                  <p className="text-[10px] text-amber-200/70">Show or hide Scratch Card, Countdown, RSVP & more</p>
                </div>
                <button
                  onClick={() => {
                    onOpenAdmin();
                    onClose();
                  }}
                  className="px-2.5 py-1 rounded bg-[#d4af37] text-black font-bold text-[11px] uppercase tracking-wider hover:bg-[#fce09b] transition-all cursor-pointer shadow"
                >
                  Configure
                </button>
              </div>
            )}

            {/* Upload Couple Photo & Convert to Sketch */}
            <div className="rounded-md border border-[#d4af37]/40 bg-black/60 p-3.5 shadow-md space-y-3">
          <div className="text-[11px] uppercase tracking-wider text-[#d4af37] font-semibold flex items-center gap-1.5">
            <Palette className="w-4 h-4 text-[#d4af37]" /> Couple Photo & Sketch Illustration
          </div>

          <label className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-lg border border-dashed border-[#d4af37]/60 bg-black/50 text-[#fce09b] hover:bg-[#d4af37]/10 cursor-pointer transition-colors text-xs font-semibold">
            <Upload className="w-4 h-4 text-[#d4af37]" /> Upload Couple Photo
            <input type="file" accept="image/*" onChange={onUploadPhoto} className="hidden" />
          </label>

          <button
            onClick={onToggleSketch}
            className={`w-full py-2 rounded font-cinzel font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
              isSketchActive
                ? 'bg-gradient-to-r from-[#d4af37] to-[#aa771c] text-neutral-950 shadow-lg'
                : 'bg-black/60 border border-[#d4af37]/40 text-[#d4af37] hover:border-[#d4af37]'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            {isSketchActive ? '✨ Sketch Art View' : '🎨 Original Photo View'}
          </button>
        </div>

        {/* Groom Details */}
        <div className="rounded-md border border-[#d4af37]/30 bg-black/50 p-3 shadow-sm space-y-2">
          <div className="text-[10px] uppercase tracking-wider text-[#d4af37] font-bold">Groom & Parents Details</div>
          <div>
            <label className="text-[9px] text-[#fce09b]/80">Groom's Name</label>
            <input
              type="text"
              value={details.groomName}
              onChange={(e) => handleInputChange('groomName', e.target.value)}
              className="w-full bg-black/60 border border-[#d4af37]/30 rounded px-2.5 py-1 text-xs text-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[9px] text-[#fce09b]/80">Groom's Father</label>
              <input
                type="text"
                value={details.groomFatherName}
                onChange={(e) => handleInputChange('groomFatherName', e.target.value)}
                className="w-full bg-black/60 border border-[#d4af37]/30 rounded px-2 py-1 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[9px] text-[#fce09b]/80">Groom's Mother</label>
              <input
                type="text"
                value={details.groomMotherName}
                onChange={(e) => handleInputChange('groomMotherName', e.target.value)}
                className="w-full bg-black/60 border border-[#d4af37]/30 rounded px-2 py-1 text-xs text-white"
              />
            </div>
          </div>
        </div>

        {/* Bride Details */}
        <div className="rounded-md border border-[#d4af37]/30 bg-black/50 p-3 shadow-sm space-y-2">
          <div className="text-[10px] uppercase tracking-wider text-[#d4af37] font-bold">Bride & Parents Details</div>
          <div>
            <label className="text-[9px] text-[#fce09b]/80">Bride's Name</label>
            <input
              type="text"
              value={details.brideName}
              onChange={(e) => handleInputChange('brideName', e.target.value)}
              className="w-full bg-black/60 border border-[#d4af37]/30 rounded px-2.5 py-1 text-xs text-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[9px] text-[#fce09b]/80">Bride's Father</label>
              <input
                type="text"
                value={details.brideFatherName}
                onChange={(e) => handleInputChange('brideFatherName', e.target.value)}
                className="w-full bg-black/60 border border-[#d4af37]/30 rounded px-2 py-1 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[9px] text-[#fce09b]/80">Bride's Mother</label>
              <input
                type="text"
                value={details.brideMotherName}
                onChange={(e) => handleInputChange('brideMotherName', e.target.value)}
                className="w-full bg-black/60 border border-[#d4af37]/30 rounded px-2 py-1 text-xs text-white"
              />
            </div>
          </div>
        </div>

        {/* Wedding Date */}
        <div className="rounded-md border border-[#d4af37]/30 bg-black/50 p-3 shadow-sm">
          <div className="text-[10px] uppercase tracking-wider text-[#d4af37] mb-1 font-semibold">Wedding Date</div>
          <input
            type="text"
            value={details.weddingDate}
            onChange={(e) => handleInputChange('weddingDate', e.target.value)}
            className="w-full bg-black/60 border border-[#d4af37]/30 rounded px-2.5 py-1.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        {/* Venue */}
        <div className="rounded-md border border-[#d4af37]/30 bg-black/50 p-3 shadow-sm">
          <div className="text-[10px] uppercase tracking-wider text-[#d4af37] mb-1 font-semibold">Venue Name</div>
          <input
            type="text"
            value={details.venueName}
            onChange={(e) => handleInputChange('venueName', e.target.value)}
            className="w-full bg-black/60 border border-[#d4af37]/30 rounded px-2.5 py-1.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        <div className="rounded-md border border-[#d4af37]/30 bg-black/50 p-3 shadow-sm space-y-2">
          <div className="text-[10px] uppercase tracking-wider text-[#d4af37] font-semibold">Accommodation (Optional)</div>
          <input type="text" placeholder="Hotel / accommodation name" value={details.accommodation?.name || ''} onChange={(e) => handleInputChange('accommodation', { ...details.accommodation, name: e.target.value })} className="w-full bg-black/60 border border-[#d4af37]/30 rounded px-2.5 py-1.5 text-xs text-white" />
          <input type="text" placeholder="Full hotel address" value={details.accommodation?.address || ''} onChange={(e) => handleInputChange('accommodation', { ...details.accommodation, address: e.target.value })} className="w-full bg-black/60 border border-[#d4af37]/30 rounded px-2.5 py-1.5 text-xs text-white" />
          <input type="text" placeholder="Google Maps link (optional)" value={details.accommodation?.mapUrl || ''} onChange={(e) => handleInputChange('accommodation', { ...details.accommodation, mapUrl: e.target.value })} className="w-full bg-black/60 border border-[#d4af37]/30 rounded px-2.5 py-1.5 text-xs text-white" />
          <textarea rows={2} placeholder="Optional accommodation notes" value={details.accommodation?.notes || ''} onChange={(e) => handleInputChange('accommodation', { ...details.accommodation, notes: e.target.value })} className="w-full bg-black/60 border border-[#d4af37]/30 rounded px-2.5 py-1.5 text-xs text-white" />
        </div>

        {/* Welcome Message */}
        <div className="rounded-md border border-[#d4af37]/30 bg-black/50 p-3 shadow-sm">
          <div className="text-[10px] uppercase tracking-wider text-[#d4af37] mb-1 font-semibold">Welcome Message / Story</div>
          <textarea
            rows={2}
            value={details.storyText}
            onChange={(e) => handleInputChange('storyText', e.target.value)}
            className="w-full bg-black/60 border border-[#d4af37]/30 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        {/* Dynamic Events List with Independent Timing & Separate Venue Sections */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-[#d4af37] font-semibold border-b border-[#d4af37]/30 pb-1.5">
            <span className="text-[11px] uppercase tracking-wider font-cinzel">
              Wedding Events ({details.events.length})
            </span>
            <span className="text-[10px] text-amber-200/70">
              Jaggo • Sukhmani Sahib • Anand Karaj
            </span>
          </div>

          {details.events.map((evt, idx) => (
            <div
              key={evt.id || idx}
              className="rounded-xl border border-[#d4af37]/40 bg-black/70 p-3.5 shadow-md space-y-3 relative group"
            >
              {/* Event Header */}
              <div className="flex justify-between items-center pb-2 border-b border-[#d4af37]/20">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#d4af37] text-black font-bold text-[11px] flex items-center justify-center font-cinzel shadow">
                    {idx + 1}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-[#fce09b] font-bold font-cinzel truncate max-w-[210px]">
                    {evt.name || `Event ${idx + 1}`}
                  </span>
                </div>
                {details.events.length > 1 && (
                  <button
                    onClick={() => handleRemoveEvent(idx)}
                    className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-white/10 transition-colors cursor-pointer"
                    title="Remove Event"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* 1. EVENT & TIMING SECTION */}
              <div className="space-y-2">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#d4af37] font-semibold block mb-1">
                    Event Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sukhmani Sahib Path, Anand Karaj, or Jaggo"
                    value={evt.name || ''}
                    onChange={(e) => handleEventFieldChange(idx, 'name', e.target.value)}
                    className="w-full bg-[#1c0406] border border-[#d4af37]/40 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#d4af37] font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#d4af37] font-semibold block mb-1">
                      Date
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 27 Nov 2026"
                      value={evt.date || ''}
                      onChange={(e) => handleEventFieldChange(idx, 'date', e.target.value)}
                      className="w-full bg-[#1c0406] border border-[#d4af37]/40 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#d4af37] font-semibold block mb-1">
                      Start Time
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 10:00 AM"
                      value={evt.startTime || ''}
                      onChange={(e) => handleEventFieldChange(idx, 'startTime', e.target.value)}
                      className="w-full bg-[#1c0406] border border-[#d4af37]/40 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-amber-200/70 font-semibold block mb-1">
                      End Time (Opt.)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 1:00 PM"
                      value={evt.endTime || ''}
                      onChange={(e) => handleEventFieldChange(idx, 'endTime', e.target.value)}
                      className="w-full bg-[#1c0406] border border-[#d4af37]/40 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-amber-200/70 font-semibold block mb-1">
                    Short Description / Note (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Auspicious prayers followed by Guru Ka Langar"
                    value={evt.description || ''}
                    onChange={(e) => handleEventFieldChange(idx, 'description', e.target.value)}
                    className="w-full bg-[#1c0406] border border-[#d4af37]/30 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              {/* 2. PROPER SEPARATE VENUE & LOCATION SECTION */}
              <div className="rounded-lg border border-[#d4af37]/50 bg-[#160305]/90 p-3 space-y-2.5 mt-2 shadow-inner">
                <div className="flex items-center justify-between pb-1 border-b border-[#d4af37]/25">
                  <div className="text-[10px] uppercase tracking-wider text-[#fce09b] font-bold flex items-center gap-1.5 font-cinzel">
                    <MapPin className="w-3.5 h-3.5 text-[#d4af37]" /> Venue & Location Details
                  </div>
                  <span className="text-[9px] text-amber-200/60 uppercase">Independent Venue</span>
                </div>

                {/* Quick copy venue chips */}
                {existingVenues.length > 0 && (
                  <div className="flex items-center gap-1 flex-wrap pt-0.5">
                    <span className="text-[9px] text-neutral-400">Quick Fill Venue:</span>
                    {existingVenues.map((v, vIdx) => (
                      <button
                        key={vIdx}
                        type="button"
                        onClick={() => handleCopyVenueFrom(idx, v)}
                        className="text-[10px] px-2 py-0.5 rounded-full border border-[#d4af37]/40 bg-black/60 text-[#fce09b] hover:bg-[#d4af37]/20 transition-all cursor-pointer truncate max-w-[170px]"
                        title={`Copy venue details from "${v.venueName}"`}
                      >
                        📋 {v.venueName}
                      </button>
                    ))}
                  </div>
                )}

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#d4af37] font-semibold block mb-1">
                    Venue Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Gurdwara Sri Guru Singh Sabha or Grand Hotel"
                    value={evt.venueName || ''}
                    onChange={(e) => handleEventFieldChange(idx, 'venueName', e.target.value)}
                    className="w-full bg-black/80 border border-[#d4af37]/40 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#d4af37] font-medium"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#d4af37] font-semibold block mb-1">
                    Full Location / Address
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Main Bazar, Nawanshahr, Punjab 144514"
                    value={evt.address || ''}
                    onChange={(e) => handleEventFieldChange(idx, 'address', e.target.value)}
                    className="w-full bg-black/80 border border-[#d4af37]/40 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-amber-200/70 font-semibold block mb-1">
                    Google Maps Link (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="https://maps.google.com/?q=..."
                    value={evt.mapUrl || ''}
                    onChange={(e) => handleEventFieldChange(idx, 'mapUrl', e.target.value)}
                    className="w-full bg-black/80 border border-[#d4af37]/30 rounded px-2.5 py-1 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="rounded-lg border border-[#d4af37]/50 bg-[#160305]/90 p-3 space-y-2 mt-2">
                <div className="flex items-center justify-between border-b border-[#d4af37]/25 pb-1">
                  <div className="text-[10px] uppercase tracking-wider text-[#fce09b] font-bold font-cinzel">Sub-events</div>
                  <button type="button" onClick={() => addSubEvent(idx)} className="rounded border border-[#d4af37]/50 px-2 py-1 text-[10px] text-[#fce09b]">+ Add Sub-event</button>
                </div>
                {(evt.subEvents || []).map((sub, subIdx) => (
                  <div key={sub.id} className="rounded border border-[#d4af37]/25 bg-black/50 p-2 space-y-2">
                    <div className="flex items-center justify-between"><span className="text-[10px] text-amber-200/70">Sub-event {subIdx + 1}</span><div className="flex gap-1"><button type="button" disabled={subIdx === 0} onClick={() => reorderSubEvent(idx, subIdx, -1)} className="px-1 text-xs disabled:opacity-30">↑</button><button type="button" disabled={subIdx === (evt.subEvents || []).length - 1} onClick={() => reorderSubEvent(idx, subIdx, 1)} className="px-1 text-xs disabled:opacity-30">↓</button><button type="button" onClick={() => updateSubEvents(idx, (evt.subEvents || []).filter((_, i) => i !== subIdx))} className="px-1 text-xs text-red-300">Delete</button></div></div>
                    <input value={sub.name} onChange={(e) => updateSubEvent(idx, subIdx, 'name', e.target.value)} placeholder="Sub-event name" className="w-full rounded border border-[#d4af37]/30 bg-black/70 px-2 py-1 text-xs text-white" />
                    <div className="grid grid-cols-2 gap-2"><input value={sub.startTime} onChange={(e) => updateSubEvent(idx, subIdx, 'startTime', e.target.value)} placeholder="Start time" className="rounded border border-[#d4af37]/30 bg-black/70 px-2 py-1 text-xs text-white" /><input value={sub.endTime || ''} onChange={(e) => updateSubEvent(idx, subIdx, 'endTime', e.target.value)} placeholder="End time (optional)" className="rounded border border-[#d4af37]/30 bg-black/70 px-2 py-1 text-xs text-white" /></div>
                    <input value={sub.date || ''} onChange={(e) => updateSubEvent(idx, subIdx, 'date', e.target.value)} placeholder="Date override (optional)" className="w-full rounded border border-[#d4af37]/30 bg-black/70 px-2 py-1 text-xs text-white" />
                    <input value={sub.venueName || ''} onChange={(e) => updateSubEvent(idx, subIdx, 'venueName', e.target.value)} placeholder="Venue override (optional)" className="w-full rounded border border-[#d4af37]/30 bg-black/70 px-2 py-1 text-xs text-white" />
                    <input value={sub.address || ''} onChange={(e) => updateSubEvent(idx, subIdx, 'address', e.target.value)} placeholder="Address override (optional)" className="w-full rounded border border-[#d4af37]/30 bg-black/70 px-2 py-1 text-xs text-white" />
                  </div>
                ))}
                {!(evt.subEvents || []).length && <p className="text-[10px] text-amber-100/50">Add schedule details beneath this event.</p>}
              </div>
            </div>
          ))}

          {/* Add New Custom Event Form */}
          {!isAddingEvent ? (
            <button
              onClick={() => setIsAddingEvent(true)}
              className="w-full py-2.5 rounded-xl border border-dashed border-[#d4af37]/60 bg-black/40 text-[#fce09b] hover:bg-[#d4af37]/15 font-cinzel font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow"
            >
              <Plus className="w-4 h-4 text-[#d4af37]" /> Add New Wedding Event / Venue
            </button>
          ) : (
            <div className="rounded-xl border border-[#d4af37]/60 bg-black/80 p-3.5 space-y-3 shadow-lg">
              <div className="flex items-center justify-between pb-1.5 border-b border-[#d4af37]/30">
                <span className="text-[11px] uppercase tracking-wider text-[#fce09b] font-bold font-cinzel flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5 text-[#d4af37]" /> Add New Event
                </span>
                <button
                  onClick={() => setIsAddingEvent(false)}
                  className="text-amber-200/70 hover:text-white p-1 rounded hover:bg-white/10 text-xs"
                >
                  Cancel
                </button>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#d4af37] font-semibold block mb-1">
                  Event Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sangeet, Grand Reception, or Hotel Banquet"
                  value={newEventName}
                  onChange={(e) => setNewEventName(e.target.value)}
                  className="w-full bg-[#1c0406] border border-[#d4af37]/40 rounded px-2.5 py-1.5 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#d4af37] font-semibold block mb-1">
                    Date
                  </label>
                  <input
                    type="text"
                    placeholder="27 Nov 2026"
                    value={newEventDate}
                    onChange={(e) => setNewEventDate(e.target.value)}
                    className="w-full bg-[#1c0406] border border-[#d4af37]/40 rounded px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#d4af37] font-semibold block mb-1">
                    Start Time
                  </label>
                  <input
                    type="text"
                    placeholder="7:00 PM"
                    value={newEventStartTime}
                    onChange={(e) => setNewEventStartTime(e.target.value)}
                    className="w-full bg-[#1c0406] border border-[#d4af37]/40 rounded px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-amber-200/70 font-semibold block mb-1">
                    End Time (Opt.)
                  </label>
                  <input
                    type="text"
                    placeholder="11:30 PM"
                    value={newEventEndTime}
                    onChange={(e) => setNewEventEndTime(e.target.value)}
                    className="w-full bg-[#1c0406] border border-[#d4af37]/40 rounded px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
              </div>

              {/* Separate Venue Section for New Event */}
              <div className="rounded-lg border border-[#d4af37]/50 bg-[#160305] p-3 space-y-2 shadow-inner">
                <div className="text-[10px] uppercase tracking-wider text-[#fce09b] font-bold flex items-center gap-1.5 font-cinzel">
                  <MapPin className="w-3.5 h-3.5 text-[#d4af37]" /> Venue / Hotel Details
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#d4af37] font-semibold block mb-1">
                    Venue Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Grand Hotel or Gurdwara Sahib"
                    value={newEventVenueName}
                    onChange={(e) => setNewEventVenueName(e.target.value)}
                    className="w-full bg-black/80 border border-[#d4af37]/40 rounded px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#d4af37] font-semibold block mb-1">
                    Full Address / Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Hotel Address, Nawanshahr"
                    value={newEventAddress}
                    onChange={(e) => setNewEventAddress(e.target.value)}
                    className="w-full bg-black/80 border border-[#d4af37]/40 rounded px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-amber-200/70 font-semibold block mb-1">
                    Google Maps Link (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="https://maps.google.com/?q=..."
                    value={newEventMapUrl}
                    onChange={(e) => setNewEventMapUrl(e.target.value)}
                    className="w-full bg-black/80 border border-[#d4af37]/30 rounded px-2.5 py-1 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-amber-200/70 font-semibold block mb-1">
                  Description (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Royal dinner banquet and celebrations"
                  value={newEventDescription}
                  onChange={(e) => setNewEventDescription(e.target.value)}
                  className="w-full bg-[#1c0406] border border-[#d4af37]/30 rounded px-2.5 py-1.5 text-xs text-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleAddEvent}
                  className="flex-1 py-2 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#fcf6ba] to-[#aa771c] text-neutral-950 font-cinzel font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-md cursor-pointer"
                >
                  Save & Add Event
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingEvent(false)}
                  className="px-4 py-2 rounded-lg border border-[#d4af37]/40 text-[#fce09b] hover:bg-white/5 text-xs font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
          </div>
        )}
      </div>
    </div>
  );
};
