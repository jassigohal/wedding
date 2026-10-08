import React, { useState } from 'react';
import { Send, Heart, MessageSquare } from 'lucide-react';
import type { GuestResponse } from '../types';

interface GuestBookRSVPProps {
  onAddResponse: (response: GuestResponse) => void;
  responses: GuestResponse[];
}

export const GuestBookRSVP: React.FC<GuestBookRSVPProps> = ({ onAddResponse, responses }) => {
  const [name, setName] = useState('');
  const [attendance] = useState<'attending' | 'declined' | 'maybe'>('attending');
  const [guestsCount] = useState(1);
  const [wishes, setWishes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    setError('');

    const newResponse: GuestResponse = {
      id: Date.now().toString(),
      name: name.trim(),
      attendance,
      guestsCount,
      wishes: wishes.trim(),
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };

    onAddResponse(newResponse);
    setSubmitted(true);
    setName('');
    setWishes('');
  };

  return (
    <section className="wedding-rsvp py-12 px-4 max-w-4xl mx-auto my-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-cinzel text-gold-shine mb-2 font-bold">RSVP & Guestbook</h2>
        <div className="w-24 h-0.5 mx-auto mb-3" style={{ background: 'linear-gradient(to right, transparent, var(--primary), transparent)' }} />
        <p className="text-base font-calligraphic" style={{ color: 'var(--text)', opacity: 0.85 }}>
          Please join in our happiness and leave your blessings for the couple.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form */}
        <div
          className="invitation-rsvp-card p-6 rounded-2xl border shadow-xl"
          style={{ backgroundColor: 'var(--secondary)', borderColor: 'var(--primary)' }}
        >
          {submitted ? (
            <div className="text-center py-8">
              <Heart className="w-12 h-12 text-amber-400 mx-auto mb-4 animate-bounce" />
              <h3 className="text-2xl font-serif-royal text-amber-100 mb-2">Thank You!</h3>
              <p className="text-amber-200/80 font-body">Your response and warm wishes have been received with love.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 text-xs uppercase tracking-widest text-[#d4af37] underline hover:text-amber-200 cursor-pointer"
              >
                Send Another Response
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="wedding-rsvp__form space-y-4" noValidate>
              <div>
                <label htmlFor="rsvp-name" className="wedding-rsvp__label block">
                  Your Full Name *
                </label>
                <input
                  id="rsvp-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul & Family"
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? 'rsvp-name-error' : undefined}
                  className="wedding-rsvp__control w-full rounded-lg"
                />
                {error && <p id="rsvp-name-error" className="wedding-rsvp__error" role="alert">{error}</p>}
              </div>

              <div>
                <label htmlFor="rsvp-wishes" className="wedding-rsvp__label block">
                  Warm Wishes & Message
                </label>
                <textarea
                  id="rsvp-wishes"
                  rows={4}
                  value={wishes}
                  onChange={(e) => setWishes(e.target.value)}
                  placeholder="Share your blessings for the bride & groom..."
                  className="wedding-rsvp__control wedding-rsvp__textarea w-full rounded-lg"
                />
              </div>

              <button
                type="submit"
                className="wedding-rsvp__submit w-full rounded-lg"
              >
                <Send className="wedding-rsvp__submit-icon" aria-hidden="true" /> <span>Send RSVP &amp; Wishes</span>
              </button>
            </form>
          )}
        </div>

        {/* Wishes List */}
        <div
          className="wedding-rsvp__recent invitation-rsvp-card p-6 rounded-2xl border shadow-xl flex flex-col h-[380px]"
          style={{ backgroundColor: 'var(--secondary)', borderColor: 'var(--primary)' }}
        >
          <h3
            className="text-lg font-cinzel mb-3 flex items-center gap-2 border-b pb-2"
            style={{ color: 'var(--heading)', borderColor: 'rgba(255,255,255,0.1)' }}
          >
            <MessageSquare className="w-4 h-4" style={{ color: 'var(--primary)' }} /> Recent Blessings ({responses.length})
          </h3>

          <div className="overflow-y-auto space-y-3 flex-1 pr-1">
            {responses.length === 0 ? (
              <p className="text-amber-100/50 text-sm font-body italic text-center py-12">
                Be the first to leave a warm blessing for the happy couple!
              </p>
            ) : (
              responses.map((resp) => (
                <div key={resp.id} className="p-3 rounded-lg bg-black/40 border border-amber-900/30">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-serif-royal text-sm text-amber-200 font-semibold">{resp.name}</span>
                    <span className="text-[10px] text-amber-400/60">{resp.createdAt}</span>
                  </div>
                  {resp.wishes && <p className="text-amber-100/80 text-sm font-body italic">"{resp.wishes}"</p>}
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800/40">
                      {resp.attendance} {resp.attendance === 'attending' && `(${resp.guestsCount} guests)`}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
