import React, { useState } from 'react';
import { X, Save, Palette, Image as ImageIcon, Type, Heart } from 'lucide-react';
import type { DesignConfig, EventDetails } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  eventDetails: EventDetails;
  onUpdateEventDetails: (value: EventDetails) => void;
  designConfig: DesignConfig;
  onUpdateDesignConfig: (value: DesignConfig) => void;
}

const fieldClass = 'mt-1 w-full rounded-lg border border-[#b69a64]/40 bg-[#211014] px-3 py-2 text-sm text-[#f8ead4] outline-none focus:border-[#d9b875]';

export const FinalVersionEditor: React.FC<Props> = ({ isOpen, onClose, eventDetails, onUpdateEventDetails, designConfig, onUpdateDesignConfig }) => {
  const [saved, setSaved] = useState(false);
  if (!isOpen) return null;
  const update = (value: Partial<DesignConfig>) => { onUpdateDesignConfig({ ...designConfig, ...value }); setSaved(false); };
  const gallery = designConfig.galleryImages || [];
  const updateGallery = (index: number, value: string) => { const next = [...gallery]; next[index] = value; update({ galleryImages: next }); };

  return <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm">
    <section className="flex max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-[#b69a64]/70 bg-[#140608] text-[#f8ead4] shadow-2xl">
      <header className="flex items-center justify-between border-b border-[#b69a64]/30 bg-[#351017] px-5 py-4">
        <div><p className="text-[10px] uppercase tracking-[.24em] text-[#d9b875]">Final Version</p><h2 className="font-cinzel text-lg font-bold">Invitation Editor</h2><p className="text-xs text-[#f8ead4]/65">Only controls for this finalized wedding design</p></div>
        <button onClick={onClose} className="rounded-full p-2 text-[#d9b875] hover:bg-white/10" aria-label="Close editor"><X size={20} /></button>
      </header>
      <div className="flex-1 space-y-5 overflow-y-auto p-5">
        <section className="rounded-xl border border-[#b69a64]/30 bg-[#211014] p-4"><h3 className="mb-3 flex items-center gap-2 font-semibold text-[#e4ca91]"><Heart size={16} /> Names</h3><div className="grid gap-3 sm:grid-cols-2"><label className="text-xs">Groom name<input className={fieldClass} value={eventDetails.groomName} onChange={e => onUpdateEventDetails({ ...eventDetails, groomName: e.target.value })} /></label><label className="text-xs">Bride name<input className={fieldClass} value={eventDetails.brideName} onChange={e => onUpdateEventDetails({ ...eventDetails, brideName: e.target.value })} /></label></div></section>
        <section className="rounded-xl border border-[#b69a64]/30 bg-[#211014] p-4"><h3 className="mb-3 flex items-center gap-2 font-semibold text-[#e4ca91]"><Palette size={16} /> Colors</h3><div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{([['primaryColor','Primary'],['headingColor','Heading'],['textColor','Text'],['accentColor','Accent'],['backgroundColor','Background'],['secondaryColor','Secondary']] as const).map(([key,label]) => <label key={key} className="text-xs">{label}<input type="color" className="mt-1 block h-10 w-full cursor-pointer rounded border border-[#b69a64]/40 bg-transparent" value={designConfig[key]} onChange={e => update({ [key]: e.target.value })} /></label>)}</div></section>
        <section className="rounded-xl border border-[#b69a64]/30 bg-[#211014] p-4"><h3 className="mb-3 flex items-center gap-2 font-semibold text-[#e4ca91]"><Type size={16} /> Fonts</h3><div className="grid gap-3 sm:grid-cols-3">{[["'Cinzel', serif",'Royal'],["'Playfair Display', serif",'Classic'],["'Great Vibes', cursive",'Handwritten']].map(([font,label]) => <button key={font} onClick={() => update({ typography: { ...designConfig.typography, displayFont: font, headingFont: font } })} className={`rounded-lg border p-3 text-left ${designConfig.typography.displayFont === font ? 'border-[#d9b875] bg-[#5a202d]' : 'border-[#b69a64]/30'}`}><span className="text-xs text-[#e4ca91]">{label}</span><div style={{ fontFamily: font }} className="mt-1 text-lg">Sandeep & Sarbjeet</div></button>)}</div></section>
        <section className="rounded-xl border border-[#b69a64]/30 bg-[#211014] p-4"><h3 className="mb-1 flex items-center gap-2 font-semibold text-[#e4ca91]"><ImageIcon size={16} /> Front opening panels</h3><p className="mb-3 text-xs text-[#f8ead4]/60">Use a public image URL or a project path such as /paper-panel-floral-v2.png.</p><div className="grid gap-3 sm:grid-cols-2"><label className="text-xs">Left panel image<input className={fieldClass} placeholder="/left-panel.png" value={designConfig.frontPanelLeftImage || ''} onChange={e => update({ frontPanelLeftImage: e.target.value })} /></label><label className="text-xs">Right panel image<input className={fieldClass} placeholder="/right-panel.png" value={designConfig.frontPanelRightImage || ''} onChange={e => update({ frontPanelRightImage: e.target.value })} /></label></div></section>
        <section className="rounded-xl border border-[#b69a64]/30 bg-[#211014] p-4"><h3 className="mb-1 flex items-center gap-2 font-semibold text-[#e4ca91]"><ImageIcon size={16} /> Couple gallery</h3><p className="mb-3 text-xs text-[#f8ead4]/60">Add the four photos used by the sliding gallery.</p><div className="grid gap-3 sm:grid-cols-2">{[0,1,2,3].map(i => <label key={i} className="text-xs">Photo {i+1}<input className={fieldClass} placeholder={`/couple-gallery-${i+1}.png`} value={gallery[i] || ''} onChange={e => updateGallery(i, e.target.value)} /></label>)}</div></section>
      </div>
      <footer className="flex items-center justify-between border-t border-[#b69a64]/30 bg-[#211014] px-5 py-3"><span className="text-xs text-[#f8ead4]/65">Changes apply live to the invitation.</span><button onClick={() => setSaved(true)} className="flex items-center gap-2 rounded-lg bg-[#d9b875] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#351017]"><Save size={15} /> {saved ? 'Saved' : 'Save changes'}</button></footer>
    </section>
  </div>;
};
