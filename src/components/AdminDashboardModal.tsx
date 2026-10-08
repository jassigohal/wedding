import React, { useState } from 'react';
import {
  Layout,
  Shield,
  Check,
  RotateCcw,
  Palette,
  FileText,
  X
} from 'lucide-react';
import type { EventDetails, DesignConfig } from '../types';
import { PREDEFINED_THEMES } from './CustomizerDrawer';

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

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventDetails: EventDetails;
  onUpdateEventDetails: (updated: EventDetails) => void;
  selectedTemplate: string;
  onSelectTemplate: (template: string) => void;
  layoutConfig: LayoutConfig;
  onUpdateLayoutConfig: (config: LayoutConfig) => void;
  designConfig: DesignConfig;
  onUpdateDesignConfig: (config: DesignConfig) => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  eventDetails,
  onUpdateEventDetails,
  selectedTemplate,
  onSelectTemplate,
  layoutConfig,
  onUpdateLayoutConfig,
  designConfig,
  onUpdateDesignConfig
}) => {
  const [activeTab, setActiveTab] = useState<'layout' | 'content' | 'theme' | 'media'>('layout');
  const updateMedia = (key: 'frontPanelLeftImage' | 'frontPanelRightImage', value: string) => onUpdateDesignConfig({ ...designConfig, [key]: value });
  const updateGalleryImage = (index: number, value: string) => {
    const galleryImages = [...(designConfig.galleryImages || [])];
    galleryImages[index] = value;
    onUpdateDesignConfig({ ...designConfig, galleryImages });
  };

  if (!isOpen) return null;

  const handleToggleModule = (key: keyof LayoutConfig) => {
    onUpdateLayoutConfig({
      ...layoutConfig,
      [key]: !layoutConfig[key]
    });
  };

  const handleResetLayout = () => {
    onUpdateLayoutConfig({
      showScratchCard: true,
      showCountdown: true,
      showCouplePhoto: true,
      showStorySection: true,
      showEventsList: true,
      showGuestbook: true,
      showMusicToggle: true,
      cardBorderStyle: 'royal-double',
      fontFamily: 'Cinzel, serif'
      ,mobileEventLayout: 'grid',
      mobileEventColumns: 3
    });
  };

  return (
    <div className="studio-dashboard-surface fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#140608] border-2 border-[#d4af37] rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden font-cinzel text-[#fce7f3]">
        
        {/* Admin Dashboard Header */}
        <div className="bg-gradient-to-r from-[#1c0406] via-[#2b080b] to-[#1c0406] p-4 border-b border-[#d4af37]/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#d4af37]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#fce09b] tracking-wider uppercase">Admin Site & Layout Control Center</h2>
              <p className="text-xs text-amber-200/70 font-sans">Manage layout visibility, dynamic modules, themes, and PDF options live</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-[#d4af37] transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#d4af37]/30 bg-black/60 font-sans text-xs">
          <button
            onClick={() => setActiveTab('layout')}
            className={`flex-1 py-3 px-4 font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors ${
              activeTab === 'layout'
                ? 'bg-[#d4af37]/20 border-b-2 border-[#d4af37] text-[#fce09b]'
                : 'text-amber-100/70 hover:bg-white/5'
            }`}
          >
            <Layout className="w-4 h-4 text-[#d4af37]" /> Page Modules & Layout Switcher
          </button>
          <button
            onClick={() => setActiveTab('theme')}
            className={`flex-1 py-3 px-4 font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors ${
              activeTab === 'theme'
                ? 'bg-[#d4af37]/20 border-b-2 border-[#d4af37] text-[#fce09b]'
                : 'text-amber-100/70 hover:bg-white/5'
            }`}
          >
            <Palette className="w-4 h-4 text-[#d4af37]" /> Predefined Themes & Borders
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`flex-1 py-3 px-4 font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors ${
              activeTab === 'content'
                ? 'bg-[#d4af37]/20 border-b-2 border-[#d4af37] text-[#fce09b]'
                : 'text-amber-100/70 hover:bg-white/5'
            }`}
          >
            <FileText className="w-4 h-4 text-[#d4af37]" /> Venue & Ceremony Data
          </button>
          <button
            onClick={() => setActiveTab('media')}
            className={`flex-1 py-3 px-4 font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors ${activeTab === 'media' ? 'bg-[#d4af37]/20 border-b-2 border-[#d4af37] text-[#fce09b]' : 'text-amber-100/70 hover:bg-white/5'}`}
          >
            <Palette className="w-4 h-4 text-[#d4af37]" /> Photos & Colors
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 font-sans space-y-6 text-sm">
          {activeTab === 'layout' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-black/40 p-3.5 rounded-lg border border-[#d4af37]/30">
                <div>
                  <h3 className="text-sm font-bold text-[#fce09b]">Section & Component Controls</h3>
                  <p className="text-xs text-neutral-300">Enable or disable website sections in real time</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onUpdateLayoutConfig({
                        ...layoutConfig,
                        showScratchCard: true,
                        showCountdown: true,
                        showCouplePhoto: true,
                        showStorySection: true,
                        showEventsList: true,
                        showGuestbook: true,
                        showMusicToggle: true
                      });
                    }}
                    className="px-2.5 py-1.5 rounded bg-black/60 border border-[#d4af37]/40 text-[#fce09b] text-xs font-semibold hover:bg-[#d4af37]/20 cursor-pointer"
                  >
                    Enable All
                  </button>
                  <button
                    onClick={() => {
                      onUpdateLayoutConfig({
                        ...layoutConfig,
                        showScratchCard: false,
                        showCountdown: false,
                        showCouplePhoto: true,
                        showStorySection: true,
                        showEventsList: true,
                        showGuestbook: false,
                        showMusicToggle: true
                      });
                    }}
                    className="px-2.5 py-1.5 rounded bg-black/60 border border-[#d4af37]/40 text-amber-200/80 text-xs font-semibold hover:bg-[#d4af37]/20 cursor-pointer"
                  >
                    Minimalist Invite
                  </button>
                  <button
                    onClick={handleResetLayout}
                    className="px-2.5 py-1.5 rounded bg-black/60 border border-[#d4af37]/40 text-[#d4af37] text-xs font-bold hover:bg-[#d4af37]/20 flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Module Toggles */}
                {[
                  { key: 'showScratchCard', label: 'Heart Scratch-to-Reveal Card', desc: 'Display interactive scratch date card' },
                  { key: 'showCountdown', label: 'Wedding Countdown Timer', desc: 'Live days/hours countdown to Nov 27' },
                  { key: 'showCouplePhoto', label: 'Couple Photo & Artwork Section', desc: 'Show groom & bride illustration frame' },
                  { key: 'showStorySection', label: 'Sacred Union & Family Blessings', desc: 'Display parents names and invitation message' },
                  { key: 'showEventsList', label: 'Ceremonies & Events Cards', desc: 'Jaggo Night, Anand Karaj, Grand Reception' },
                  { key: 'showGuestbook', label: 'Guestbook & RSVP Form', desc: 'Allow guests to leave digital wishes' },
                  { key: 'showMusicToggle', label: 'Background Music Control', desc: 'Show floating audio toggle button' },
                ].map((mod) => {
                  const isEnabled = Boolean(layoutConfig[mod.key as keyof LayoutConfig]);
                  return (
                    <div
                      key={mod.key}
                      onClick={() => handleToggleModule(mod.key as keyof LayoutConfig)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        isEnabled
                          ? 'bg-[#2b080b]/90 border-[#d4af37] shadow-lg'
                          : 'bg-black/50 border-neutral-800 opacity-60'
                      }`}
                    >
                      <div>
                        <h4 className="font-bold text-[#fce09b] text-sm">{mod.label}</h4>
                        <p className="text-xs text-neutral-300">{mod.desc}</p>
                      </div>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                        isEnabled ? 'bg-[#d4af37] border-white text-black' : 'border-neutral-600'
                      }`}>
                        {isEnabled && <Check className="w-4 h-4 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="rounded-xl border border-[#d4af37]/40 bg-black/40 p-4 space-y-3">
                <div><h3 className="text-sm font-bold text-[#fce09b]">Mobile Event Layout</h3><p className="text-xs text-neutral-300">Choose how ceremony cards behave on phones.</p></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="text-xs text-amber-100/80">Mode<select value={layoutConfig.mobileEventLayout} onChange={(e) => onUpdateLayoutConfig({ ...layoutConfig, mobileEventLayout: e.target.value as LayoutConfig['mobileEventLayout'] })} className="mt-1 w-full rounded border border-[#d4af37]/40 bg-[#1c0406] p-2 text-xs text-white"><option value="grid">Grid rows</option><option value="scroll">One-by-one horizontal scroll</option></select></label>
                  <label className="text-xs text-amber-100/80">Cards per row<select value={layoutConfig.mobileEventColumns} onChange={(e) => onUpdateLayoutConfig({ ...layoutConfig, mobileEventColumns: Number(e.target.value) as LayoutConfig['mobileEventColumns'] })} disabled={layoutConfig.mobileEventLayout === 'scroll'} className="mt-1 w-full rounded border border-[#d4af37]/40 bg-[#1c0406] p-2 text-xs text-white disabled:opacity-40"><option value={2}>2 cards</option><option value={3}>3 cards</option><option value={4}>4 cards</option></select></label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'theme' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-[#fce09b] uppercase tracking-wider mb-2">Select Primary Theme</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {PREDEFINED_THEMES.map((thm) => (
                    <div
                      key={thm.id}
                      onClick={() => onSelectTemplate(thm.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                        selectedTemplate === thm.id
                          ? 'border-[#ffd700] bg-[#2b080b] ring-2 ring-[#d4af37]'
                          : 'border-[#d4af37]/30 bg-black/40 hover:border-[#d4af37]'
                      }`}
                    >
                      <div
                        className="w-12 h-12 rounded-lg border border-[#d4af37] bg-cover bg-center shrink-0"
                        style={{ backgroundImage: `url("${thm.bg}")` }}
                      />
                      <div>
                        <h4 className="font-bold text-xs text-[#fce09b]">{thm.name}</h4>
                        <span className="text-[10px] text-amber-200/70">Click to apply</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Border Style Controls */}
              <div className="bg-black/40 p-4 rounded-xl border border-[#d4af37]/30 space-y-3">
                <h3 className="text-sm font-bold text-[#fce09b] uppercase tracking-wider">Card Border Elegance Style</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'royal-double', label: 'Royal Double Gold', desc: 'Double regal golden borders' },
                    { id: 'ornate-gold', label: 'Ornate Glow', desc: 'Glowing golden ambient shadow' },
                    { id: 'minimal', label: 'Minimalist Clean', desc: 'Subtle sleek gold border' }
                  ].map((styleOption) => (
                    <button
                      key={styleOption.id}
                      onClick={() => onUpdateLayoutConfig({
                        ...layoutConfig,
                        cardBorderStyle: styleOption.id as LayoutConfig['cardBorderStyle']
                      })}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        layoutConfig.cardBorderStyle === styleOption.id
                          ? 'border-[#ffd700] bg-[#2b080b] ring-2 ring-[#d4af37]'
                          : 'border-[#d4af37]/30 bg-black/50 hover:border-[#d4af37]/60'
                      }`}
                    >
                      <div className="font-bold text-xs text-[#fce09b]">{styleOption.label}</div>
                      <div className="text-[11px] text-neutral-300 mt-1">{styleOption.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Typography / Font Family Selection */}
              <div className="bg-black/40 p-4 rounded-xl border border-[#d4af37]/30 space-y-3">
                <h3 className="text-sm font-bold text-[#fce09b] uppercase tracking-wider">Royal Typography Selection</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'Cinzel, serif', label: 'Cinzel Royal Serifs', sample: 'Sandeep & Sarbjeet', fontClass: 'font-cinzel' },
                    { id: 'Playfair Display, serif', label: 'Playfair Majestic', sample: 'Sandeep & Sarbjeet', fontClass: 'font-display' },
                    { id: 'Great Vibes, cursive', label: 'Great Vibes Cursive', sample: 'Sandeep & Sarbjeet', fontClass: 'font-cursive text-lg' }
                  ].map((fontOption) => (
                    <button
                      key={fontOption.id}
                      onClick={() => onUpdateLayoutConfig({
                        ...layoutConfig,
                        fontFamily: fontOption.id as LayoutConfig['fontFamily']
                      })}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        layoutConfig.fontFamily === fontOption.id
                          ? 'border-[#ffd700] bg-[#2b080b] ring-2 ring-[#d4af37]'
                          : 'border-[#d4af37]/30 bg-black/50 hover:border-[#d4af37]/60'
                      }`}
                    >
                      <div className="font-bold text-xs text-[#fce09b]">{fontOption.label}</div>
                      <div className={`mt-2 text-white/90 ${fontOption.fontClass}`}>{fontOption.sample}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#d4af37]">Groom Name</label>
                  <input
                    type="text"
                    value={eventDetails.groomName}
                    onChange={(e) => onUpdateEventDetails({ ...eventDetails, groomName: e.target.value })}
                    className="w-full bg-black/80 border border-[#d4af37]/40 rounded-lg p-2 text-white mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#d4af37]">Bride Name</label>
                  <input
                    type="text"
                    value={eventDetails.brideName}
                    onChange={(e) => onUpdateEventDetails({ ...eventDetails, brideName: e.target.value })}
                    className="w-full bg-black/80 border border-[#d4af37]/40 rounded-lg p-2 text-white mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#d4af37]">Venue Name & Address</label>
                <input
                  type="text"
                  value={eventDetails.venueName}
                  onChange={(e) => onUpdateEventDetails({ ...eventDetails, venueName: e.target.value })}
                  className="w-full bg-black/80 border border-[#d4af37]/40 rounded-lg p-2 text-white mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#d4af37]">Google Maps Venue Link</label>
                <input
                  type="text"
                  value={eventDetails.mapUrl}
                  onChange={(e) => onUpdateEventDetails({ ...eventDetails, mapUrl: e.target.value })}
                  className="w-full bg-black/80 border border-[#d4af37]/40 rounded-lg p-2 text-white mt-1 text-xs"
                />
              </div>
            </div>
          )}

          {activeTab === 'media' && (
            <div className="space-y-5">
              <div className="rounded-xl border border-[#d4af37]/40 bg-black/40 p-4 space-y-3">
                <h3 className="text-sm font-bold text-[#fce09b] uppercase tracking-wider">Color Combination</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {([['primaryColor', 'Primary'], ['secondaryColor', 'Secondary'], ['headingColor', 'Heading'], ['textColor', 'Text'], ['accentColor', 'Accent'], ['backgroundColor', 'Background']] as const).map(([key, label]) => (
                    <label key={key} className="text-xs text-amber-100/80">{label}<input type="color" value={designConfig[key]} onChange={(e) => onUpdateDesignConfig({ ...designConfig, [key]: e.target.value })} className="mt-1 block h-10 w-full cursor-pointer rounded border border-[#d4af37]/40 bg-transparent" /></label>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-[#d4af37]/40 bg-black/40 p-4 space-y-3">
                <h3 className="text-sm font-bold text-[#fce09b] uppercase tracking-wider">Front Opening Panel Images</h3>
                <p className="text-xs text-neutral-300">Paste a public image URL or a project asset path such as <code>/paper-panel-floral-v2.png</code>.</p>
                {([['frontPanelLeftImage', 'Left panel'], ['frontPanelRightImage', 'Right panel']] as const).map(([key, label]) => <label key={key} className="block text-xs text-amber-100/80">{label}<input value={designConfig[key] || ''} onChange={(e) => updateMedia(key, e.target.value)} placeholder="/your-panel-image.png" className="mt-1 w-full rounded border border-[#d4af37]/40 bg-[#1c0406] p-2 text-xs text-white" /></label>)}
              </div>
              <div className="rounded-xl border border-[#d4af37]/40 bg-black/40 p-4 space-y-3">
                <h3 className="text-sm font-bold text-[#fce09b] uppercase tracking-wider">Sliding Gallery Photos</h3>
                <p className="text-xs text-neutral-300">Add up to four different image paths or URLs. Changes apply immediately to the public page.</p>
                {[0, 1, 2, 3].map((index) => <label key={index} className="block text-xs text-amber-100/80">Photo {index + 1}<input value={designConfig.galleryImages?.[index] || ''} onChange={(e) => updateGalleryImage(index, e.target.value)} placeholder="/couple-gallery-1.png" className="mt-1 w-full rounded border border-[#d4af37]/40 bg-[#1c0406] p-2 text-xs text-white" /></label>)}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-black/80 p-4 border-t border-[#d4af37]/40 flex items-center justify-between">
          <span className="text-xs text-amber-200/80">✨ All layout choices apply instantly to both the website & multi-page PDF.</span>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-[#d4af37] via-[#fcf6ba] to-[#aa771c] text-neutral-950 font-bold text-xs uppercase tracking-wider hover:scale-105 transition-all shadow-lg cursor-pointer"
          >
            Save Layout Settings
          </button>
        </div>

      </div>
    </div>
  );
};
