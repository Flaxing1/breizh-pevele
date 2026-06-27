'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { subscribeGalerie, type GaleriePhoto } from '@/lib/firestore';

import { ALL_PHOTOS } from './photos';

export default function GaleriePage() {
  const [photos, setPhotos] = useState<GaleriePhoto[]>([]);
  const [lightbox, setLightbox] = useState<null | { src: string; alt: string; index: number }>(null);

  useEffect(() => {
    try {
      const unsub = subscribeGalerie((data) => {
        if (data.length > 0) {
          setPhotos(data);
        } else {
          setPhotos(ALL_PHOTOS.map((p, idx) => ({ id: `local-${idx}`, url: p.src, alt: p.alt })));
        }
      });
      return unsub;
    } catch {
      setPhotos(ALL_PHOTOS.map((p, idx) => ({ id: `local-${idx}`, url: p.src, alt: p.alt })));
    }
  }, []);

  const openLightbox = (photo: GaleriePhoto, i: number) => setLightbox({ src: photo.url, alt: photo.alt, index: i });
  const closeLightbox = () => setLightbox(null);
  const prevPhoto = () => lightbox && setLightbox({ src: photos[(lightbox.index - 1 + photos.length) % photos.length].url, alt: photos[(lightbox.index - 1 + photos.length) % photos.length].alt, index: (lightbox.index - 1 + photos.length) % photos.length });
  const nextPhoto = () => lightbox && setLightbox({ src: photos[(lightbox.index + 1) % photos.length].url, alt: photos[(lightbox.index + 1) % photos.length].alt, index: (lightbox.index + 1) % photos.length });

  return (
    <>
      <Navbar />
      <main>
        {/* Hero interne */}
        <section className="pt-28 pb-14" style={{ background: 'linear-gradient(135deg, #1A1A1A 0%, #0a2a2c 100%)' }}>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="relative w-20 h-20 mx-auto mb-5">
              <Image src="/icon-galerie.png" alt="Galerie" fill className="object-contain" />
            </div>
            <h1 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: 'white', marginBottom: '0.75rem' }}>
              Galerie <span style={{ color: '#BA9C5A' }}>Photos</span>
            </h1>
            <p style={{ fontFamily: 'var(--font-opensans)', fontSize: '1rem', color: 'rgba(255,255,255,0.7)' }}>
              {photos.length} photos — nos meilleurs moments en images
            </p>
          </div>
        </section>

        {/* Grille photos */}
        <section className="py-12" style={{ background: '#111' }}>
          <div className="max-w-7xl mx-auto px-4">
            <div
              className="gap-3"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gridAutoRows: '200px',
                gridAutoFlow: 'dense',
              }}
            >
              {photos.map((photo, i) => (
                <button
                  key={photo.id}
                  onClick={() => openLightbox(photo, i)}
                  className="relative overflow-hidden rounded-xl group cursor-pointer border-none p-0"
                  style={{
                    gridRow: i % 7 === 0 ? 'span 2' : 'span 1',
                    gridColumn: i % 11 === 0 ? 'span 2' : 'span 1',
                    background: '#222',
                  }}
                  aria-label={`Voir ${photo.alt} en grand`}
                  id={`galerie-photo-${i + 1}`}
                >
                  <Image
                    src={photo.url}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-108"
                    loading="lazy"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p style={{ fontFamily: 'var(--font-opensans)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>
                      {photo.alt}
                    </p>
                  </div>
                  {/* Icône loupe */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'rgba(14,103,109,0.8)' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                      <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.93)', backdropFilter: 'blur(8px)' }}
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Vue agrandie de la photo"
          id="lightbox-overlay"
        >
          {/* Image */}
          <div
            className="relative"
            style={{ maxWidth: '90vw', maxHeight: '88vh', width: '900px', height: '600px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.src}
              alt={lightbox.alt}
              fill
              className="object-contain"
              unoptimized
              priority
            />
          </div>

          {/* Légende */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
            <p style={{ fontFamily: 'var(--font-opensans)', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>
              {lightbox.alt} — {lightbox.index + 1}/{ALL_PHOTOS.length}
            </p>
          </div>

          {/* Navigation */}
          <button onClick={(e) => { e.stopPropagation(); prevPhoto(); }} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110" style={{ background: 'rgba(14,103,109,0.7)', border: 'none', cursor: 'pointer' }} aria-label="Photo précédente" id="lightbox-prev">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button onClick={(e) => { e.stopPropagation(); nextPhoto(); }} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110" style={{ background: 'rgba(14,103,109,0.7)', border: 'none', cursor: 'pointer' }} aria-label="Photo suivante" id="lightbox-next">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
          </button>
          <button onClick={closeLightbox} className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer' }} aria-label="Fermer" id="lightbox-close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>
      )}

      <Footer />
    </>
  );
}
