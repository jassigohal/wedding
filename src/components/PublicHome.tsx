import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { PREDEFINED_THEMES } from './CustomizerDrawer';

interface PublicHomeProps {
  onUseTemplate: (id: string) => void;
  onBuyTemplate: (id: string) => void;
}

export const PublicHome: React.FC<PublicHomeProps> = ({ onUseTemplate, onBuyTemplate }) => (
  <main className="public-home min-h-screen px-5 py-10 sm:px-10 lg:px-16">
    <header className="mx-auto flex max-w-6xl items-center justify-between gap-4">
      <div className="public-brand"><span className="public-brand-mark ek-onkar-mark" aria-label="Ek Onkar">ੴ</span><span>Amrit Vows Studio</span></div>
      <a className="public-editor-link" href="/?view=editor">Open editor <ArrowRight size={15} /></a>
    </header>
    <section className="public-hero mx-auto max-w-6xl">
      <div><p className="public-kicker">Digital invitations with soul</p><h1>Begin your forever<br /><em>beautifully.</em></h1><p className="public-intro">Luxury wedding invitations inspired by Punjabi ceremony, modern stationery and the stories you want to share.</p><button type="button" className="public-primary" onClick={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' })}>Explore templates <ArrowRight size={17} /></button></div>
      <div className="public-hero-card"><Sparkles size={22} /><span>Choose your style</span><strong>Personalise every detail</strong><small>Share or download when it feels just right.</small></div>
    </section>
    <section id="templates" className="public-template-section mx-auto max-w-6xl"><div className="public-section-heading"><div><p className="public-kicker">The collection</p><h2>Made for meaningful celebrations</h2></div><span>01 — 06</span></div><div className="public-template-grid">{PREDEFINED_THEMES.slice(0, 4).map((theme, index) => <article className="public-template-card" key={theme.id}><div className="public-template-art" style={{ backgroundImage: `linear-gradient(145deg, rgba(52,72,61,.18), rgba(52,72,61,.62)), url('${theme.bg}')` }}><span>0{index + 1}</span></div><div className="public-template-copy"><div><h3>{theme.name.split(' (')[0]}</h3><p>{['Ivory, antique gold and sacred detail.', 'Airy sage foliage and calm elegance.', 'Soft romance with delicate warmth.', 'Formal midnight tones with champagne light.'][index]}</p></div><div className="public-template-actions"><button type="button" onClick={() => onUseTemplate(theme.id)}>Use template <ArrowRight size={14} /></button><button type="button" onClick={() => onBuyTemplate(theme.id)}>Buy now</button></div></div></article>)}</div></section>
    <footer className="public-footer"><span>Amrit Vows Studio</span><span>Choose · Personalise · Celebrate</span></footer>
  </main>
);
