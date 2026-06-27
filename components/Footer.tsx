'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// ─── Easter Egg Triskel ───────────────────────────────────────────────────────
function TriskelEasterEgg() {
  const [spinning, setSpinning] = useState(false);

  const playAccordeon = useCallback(() => {
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const notes = [261.63, 293.66, 329.63, 349.23, 392.00, 349.23, 329.63, 261.63];
      let time = ctx.currentTime;
      notes.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, time);
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(0.12, time + 0.05);
        gain.gain.linearRampToValueAtTime(0.08, time + 0.22);
        gain.gain.linearRampToValueAtTime(0, time + 0.28);
        osc.start(time);
        osc.stop(time + 0.3);
        time += 0.26;
      });
      setTimeout(() => ctx.close(), 2500);
    } catch { /* Web Audio non dispo */ }
  }, []);

  const handleHover = useCallback(() => {
    if (spinning) return;
    setSpinning(true);
    playAccordeon();
    setTimeout(() => setSpinning(false), 3000);
  }, [spinning, playAccordeon]);

  return (
    <div className="relative inline-block mt-4">
      <button
        onMouseEnter={handleHover}
        onFocus={handleHover}
        onClick={handleHover}
        className={`triskel-secret ${spinning ? 'spinning' : ''} bg-transparent border-none cursor-pointer`}
        title="Triskel caché 🎵"
        aria-label="Easter egg Triskel"
        id="triskel-easter-egg"
      >
        <div className="relative w-14 h-14 transition-opacity hover:opacity-90">
          <Image src="/icon-triskel.png" alt="Triskel Breizh" fill className="object-contain" />
        </div>
      </button>
      {spinning && (
        <span
          className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap animate-fade-in pointer-events-none"
          style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 700, color: '#BA9C5A' }}
        >
          🎵 Kenavo !
        </span>
      )}
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" style={{ background: 'white' }} aria-label="Pied de page Breizh Pévèle">
      {/* Barre de couleur top */}
      <div style={{ background: 'linear-gradient(90deg, #0E676D, #BA9C5A)', height: '3px' }} />

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">

          {/* Col 1 — Logo + Easter Egg */}
          <div>
            <div className="relative h-12 w-48 mb-5">
              <Image src="/logo.png" alt="Breizh Pévèle" fill className="object-contain object-left" />
            </div>
            <p style={{ fontFamily: 'var(--font-opensans)', fontSize: '0.875rem', color: '#4a4a4a', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              Association de musiques et danses bretonnes basée à Orchies (Nord). Rejoignez la ronde — tout le monde est bienvenu !
            </p>
            <TriskelEasterEgg />
          </div>

          {/* Col 2 — Nos cours */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800, fontSize: '0.85rem', color: '#0E676D', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.2rem' }}>
              Nos Cours
            </h3>
            <ul className="space-y-3">
              {[
                { icon: '📅', text: 'Tous les samedis de 15h à 17h' },
                { icon: '🏫', text: 'Salle Marypomme — Oiseau Lyre' },
                { icon: '📍', text: '18 rue Gaston Leroy — 59310 Orchies' },
                { icon: '🚫', text: 'Fermé pendant les vacances scolaires' },
                { icon: '💰', text: 'Premier cours gratuit !' },
              ].map(({ icon, text }) => (
                <li key={text} className="flex items-start gap-2">
                  <span style={{ flexShrink: 0, marginTop: '2px', fontSize: '0.9rem' }}>{icon}</span>
                  <span style={{ fontFamily: 'var(--font-opensans)', fontSize: '0.84rem', color: '#4a4a4a', lineHeight: 1.6 }}>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contact + Réseaux */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800, fontSize: '0.85rem', color: '#0E676D', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.2rem' }}>
              Nous rejoindre
            </h3>

            {/* HelloAsso */}
            <a
              href="https://www.helloasso.com/associations/breizh-pevele"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 mb-5 group"
              id="footer-helloasso-link"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(14,103,109,0.1)' }}>
                <span style={{ fontSize: '1.2rem' }}>🎪</span>
              </div>
              <span style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 700, fontSize: '0.85rem', color: '#BA9C5A', textDecoration: 'none' }}>
                S&apos;inscrire sur HelloAsso
              </span>
            </a>

            {/* Email */}
            <a
              href="mailto:breizhpevele@gmail.com"
              className="flex items-center gap-3 mb-6 group"
              id="footer-email-link"
            >
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image src="/icon-contact.png" alt="" fill className="object-contain" />
              </div>
              <span style={{ fontFamily: 'var(--font-opensans)', fontSize: '0.875rem', color: '#1A1A1A', fontWeight: 600 }}>
                breizhpevele@gmail.com
              </span>
            </a>

            {/* Réseaux sociaux */}
            <div className="flex gap-3">
              {/* Facebook — logo officiel */}
              <a
                href="https://www.facebook.com/p/Breizh-P%C3%A9v%C3%A8le-61555861410250/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 hover:brightness-110"
                style={{ background: '#1877F2' }}
                aria-label="Page Facebook Breizh Pévèle"
                id="footer-facebook-link"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* Instagram — logo officiel */}
              <a
                href="https://www.instagram.com/breizh_pevele"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 hover:brightness-110"
                style={{ background: 'radial-gradient(circle at 30% 110%, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' }}
                aria-label="Instagram @breizh_pevele"
                id="footer-instagram-link"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="white" strokeWidth="2" fill="none"/>
                  <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="2" fill="none"/>
                  <circle cx="17.5" cy="6.5" r="1.3" fill="white"/>
                </svg>
              </a>
            </div>
            <p style={{ fontFamily: 'var(--font-opensans)', fontSize: '0.72rem', color: '#777777', marginTop: '0.5rem' }}>
              @breizh_pevele
            </p>
          </div>
        </div>

        {/* Barre légale */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}
        >
          <p style={{ fontFamily: 'var(--font-opensans)', fontSize: '0.78rem', color: '#777777' }}>
            © {year} Breizh Pévèle — association, danse bretonne
          </p>
          <div className="flex gap-5">
            <Link href="/mentions-legales" style={{ fontFamily: 'var(--font-opensans)', fontSize: '0.78rem', color: '#777777', textDecoration: 'none' }} className="hover:text-vert-breizh transition-colors" id="footer-mentions-link">
              Mentions légales
            </Link>
            <Link href="/politique-confidentialite" style={{ fontFamily: 'var(--font-opensans)', fontSize: '0.78rem', color: '#777777', textDecoration: 'none' }} className="hover:text-vert-breizh transition-colors" id="footer-rgpd-link">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
