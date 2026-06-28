'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';

// ─── Easter Egg Pluie de crêpes ──────────────────────────────────────────────
interface Crepe { id: number; left: string; delay: string; size: string; emoji: string; }

function CrepeRain({ active, onEnd }: { active: boolean; onEnd: () => void }) {
  const [crepes, setCrepes] = useState<Crepe[]>([]);
  const emojis = ['🥞', '🫓', '🍪', '⚜️', '🎵'];

  useEffect(() => {
    if (!active) return;
    const items: Crepe[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 1.5}s`,
      size: `${1.8 + Math.random() * 2}rem`,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));
    setCrepes(items);
    const t = setTimeout(() => { setCrepes([]); onEnd(); }, 3800);
    return () => clearTimeout(t);
  }, [active]);

  if (!active && crepes.length === 0) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }} aria-hidden="true">
      {crepes.map((c) => (
        <div key={c.id} className="crepe" style={{ left: c.left, animationDelay: c.delay, fontSize: c.size }}>
          {c.emoji}
        </div>
      ))}
    </div>
  );
}

// ─── Logo avec Easter Egg triple-clic ─────────────────────────────────────────
export function LogoEasterEgg({ onTripleClick, size = 'md' }: { onTripleClick: () => void; size?: 'sm' | 'md' | 'lg' }) {
  const clickCountRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = useCallback(() => {
    clickCountRef.current += 1;
    if (timerRef.current) clearTimeout(timerRef.current);
    if (clickCountRef.current >= 3) {
      clickCountRef.current = 0;
      onTripleClick();
    } else {
      timerRef.current = setTimeout(() => { clickCountRef.current = 0; }, 700);
    }
  }, [onTripleClick]);

  const heights: Record<string, number> = { sm: 36, md: 52, lg: 72 };
  const h = heights[size];

  return (
    <button
      onClick={handleClick}
      className="bg-transparent border-none p-0 cursor-pointer group"
      title="Breizh Pévèle — cliquez 3× sur le logo pour une surprise !"
      aria-label="Logo Breizh Pévèle"
      id="logo-easter-egg"
    >
      <div className="relative transition-transform duration-300 group-hover:scale-105" style={{ height: `${h}px`, width: `${h * 3.2}px` }}>
        <Image
          src="/logo-white.png"
          alt="Breizh Pévèle — Musique / Danse"
          fill
          className="object-contain object-center"
          priority={size === 'lg'}
        />
      </div>
    </button>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
export default function Hero() {
  const [crepeActive, setCrepeActive] = useState(false);
  // Sélection des vraies photos pour le hero
  const heroPhotos = [
    '/photos/766feb11-f386-414f-b919-2b5cd684af45.webp',
    '/photos/d710c95e-a6be-401b-83d5-80094f47df9c.webp',
    '/photos/3a384d9d-fbd3-4c86-96f3-f67ff5c3cba2.webp',
  ];
  const [photoIdx, setPhotoIdx] = useState(0);

  // Slideshow auto
  useEffect(() => {
    const t = setInterval(() => setPhotoIdx(i => (i + 1) % heroPhotos.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <CrepeRain active={crepeActive} onEnd={() => setCrepeActive(false)} />

      <section
        id="accueil"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        aria-label="Accueil Breizh Pévèle"
      >
        {/* Slideshow photos réelles */}
        <div className="absolute inset-0 z-0">
          {heroPhotos.map((src, i) => (
            <div
              key={src}
              className="absolute inset-0 transition-opacity duration-1000"
              style={{ opacity: i === photoIdx ? 1 : 0 }}
            >
              <Image
                src={src}
                alt={`Breizh Pévèle - danse bretonne à Orchies - photo ${i + 1}`}
                fill
                priority={i === 0}
                className="object-cover object-center"
                quality={85}
              />
            </div>
          ))}
          {/* Overlay */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(14,103,109,0.75) 0%, rgba(26,26,26,0.65) 60%, rgba(186,156,90,0.25) 100%)' }} />
          {/* Triskel filigrane */}
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `url('/triskel-bg.svg')`, backgroundSize: '350px 350px', backgroundRepeat: 'repeat' }} />
        </div>

        {/* Contenu hero */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto pt-28">
          {/* Logo cliquable — Easter egg triple-clic */}
          <div className="flex justify-center mb-8 animate-fade-in-up">
            <LogoEasterEgg onTripleClick={() => setCrepeActive(true)} size="lg" />
          </div>

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 animate-fade-in-up animate-delay-200"
            style={{ background: 'rgba(14,103,109,0.4)', border: '1px solid rgba(186,156,90,0.5)', backdropFilter: 'blur(10px)' }}
          >
            <span style={{ color: '#BA9C5A', fontSize: '0.85rem' }}>🎵</span>
            <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', color: '#BA9C5A' }}>
              ASSOCIATION · ORCHIES · NORD (59)
            </span>
          </div>

          {/* H1 */}
          <h1
            className="animate-fade-in-up animate-delay-400"
            style={{ fontFamily: 'var(--font-montserrat)', fontSize: 'clamp(2.4rem, 6.5vw, 4.8rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '1.5rem', textShadow: '0 4px 24px rgba(0,0,0,0.6)' }}
          >
            Rejoignez la ronde<br />
            <span style={{ color: '#BA9C5A' }}>à Orchies !</span>
          </h1>

          {/* Sous-titre */}
          <p
            className="animate-fade-in-up animate-delay-600"
            style={{ fontFamily: 'var(--font-opensans)', fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: 'rgba(255,255,255,0.92)', maxWidth: '560px', margin: '0 auto 2.5rem', lineHeight: 1.75 }}
          >
            Cours de danse bretonne ouverts à tous, chaque samedi à Orchies.
            Débutants bienvenus — premier cours gratuit ! 🎉
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.8s', opacity: 0 }}>
            <a
              href="https://www.helloasso.com/associations/breizh-pevele"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-biais"
              style={{ fontSize: '1.05rem', padding: '1.1rem 2.5rem' }}
              id="hero-inscription-btn"
            >
              🎪 S&apos;inscrire sur HelloAsso
            </a>
            <a
              href="/nos-cours"
              className="btn-biais btn-biais-vert"
              style={{ fontSize: '1.05rem', padding: '1.1rem 2.5rem' }}
              id="hero-infos-btn"
            >
              📅 Voir les cours
            </a>
          </div>

          {/* Indicateurs slideshow */}
          <div className="flex justify-center gap-2 mt-8">
            {heroPhotos.map((_, i) => (
              <button
                key={i}
                onClick={() => setPhotoIdx(i)}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{ background: i === photoIdx ? '#BA9C5A' : 'rgba(255,255,255,0.4)', transform: i === photoIdx ? 'scale(1.4)' : 'scale(1)' }}
                aria-label={`Photo ${i + 1}`}
                id={`hero-slide-${i}`}
              />
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>
    </>
  );
}
