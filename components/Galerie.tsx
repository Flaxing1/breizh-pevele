'use client';

import { useEffect, useState } from 'react';
import { subscribeGalerie, type GaleriePhoto } from '@/lib/firestore';

// Photos de démonstration
const DEMO_PHOTOS: GaleriePhoto[] = [
  { id: '1', url: '/hero.webp', alt: 'Danse bretonne en plein air - Fest-Noz Orchies' },
  { id: '2', url: '/galerie-1.webp', alt: 'Soirée Fest-Noz avec musiciens bretons' },
  { id: '3', url: '/galerie-2.webp', alt: 'Cours de danse bretonne à la Salle Marypomme' },
  { id: '4', url: '/galerie-1.webp', alt: 'Danse en ronde - An Dro' },
  { id: '5', url: '/galerie-2.webp', alt: "Apprentissage des pas de l'Hanterdro" },
  { id: '6', url: '/hero.webp', alt: 'Grande fête bretonne en costumes traditionnels' },
];

function LightboxModal({ photo, onClose }: { photo: GaleriePhoto; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="lightbox"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      id="galerie-lightbox"
    >
      <button
        className="absolute top-4 right-4 text-white text-4xl font-light hover:text-jaune-fest transition-colors"
        onClick={onClose}
        aria-label="Fermer la photo"
        id="lightbox-close-btn"
      >
        ×
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo.url}
        alt={photo.alt}
        onClick={(e) => e.stopPropagation()}
      />
      {photo.alt && (
        <p
          className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-white/80 text-sm max-w-md"
          style={{ fontFamily: 'var(--font-opensans)' }}
        >
          {photo.alt}
        </p>
      )}
    </div>
  );
}

export default function Galerie() {
  const [photos, setPhotos] = useState<GaleriePhoto[]>(DEMO_PHOTOS);
  const [selectedPhoto, setSelectedPhoto] = useState<GaleriePhoto | null>(null);

  useEffect(() => {
    try {
      const unsubscribe = subscribeGalerie((items) => {
        if (items.length > 0) setPhotos(items);
      });
      return unsubscribe;
    } catch {
      // Firebase non configuré : photos démo
    }
  }, []);

  return (
    <section
      id="galerie"
      className="py-24 triskel-bg"
      style={{ background: '#1A1A1A' }}
      aria-labelledby="galerie-heading"
    >
      {selectedPhoto && (
        <LightboxModal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
      )}

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* En-tête */}
        <div className="text-center mb-14">
          <div
            className="inline-block px-4 py-1.5 rounded-full mb-4"
            style={{
              background: 'rgba(186,156,90,0.15)',
              fontFamily: 'var(--font-montserrat)',
              fontWeight: 700,
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              color: '#BA9C5A',
              textTransform: 'uppercase',
            }}
          >
            📸 Nos moments partagés
          </div>
          <h2
            id="galerie-heading"
            style={{
              fontFamily: 'var(--font-montserrat)',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 900,
              color: 'white',
              marginBottom: '0.75rem',
            }}
          >
            La <span style={{ color: '#BA9C5A' }}>Galerie</span> Breizh
          </h2>
          <p style={{ fontFamily: 'var(--font-opensans)', fontSize: '1rem', color: 'rgba(255,255,255,0.6)', maxWidth: '500px', margin: '0 auto' }}>
            Cours, Fest-Noz, stages… revivez l&apos;ambiance en images !
          </p>
        </div>

        {/* Grille masonry */}
        <div className="masonry-grid">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className="masonry-item cursor-pointer group"
              onClick={() => setSelectedPhoto(photo)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedPhoto(photo)}
              aria-label={`Voir la photo : ${photo.alt}`}
              id={`galerie-photo-${index + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.url}
                alt={photo.alt}
                loading="lazy"
              />
              {/* Overlay hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                style={{ background: 'rgba(14,103,109,0.7)' }}
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35M11 8v6M8 11h6" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Lien Instagram */}
        <div className="text-center mt-12">
          <a
            href="https://www.instagram.com/breizh_pevele"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-biais btn-biais-vert"
            id="instagram-galerie-link"
          >
            📸 Voir plus sur Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
