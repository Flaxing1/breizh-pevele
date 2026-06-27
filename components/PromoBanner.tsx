'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PromoBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('promo_dismissed');
    if (!dismissed) setVisible(true);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem('promo_dismissed', '1');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        background: 'linear-gradient(90deg, #0E676D, #0a4f54)',
        color: 'white',
        textAlign: 'center',
        padding: '0.6rem 1rem',
        position: 'relative',
        zIndex: 100,
      }}
    >
      <span style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.03em' }}>
        🎉 Premier cours <strong>GRATUIT</strong> — Tous les samedis à 15h à Orchies
      </span>
      <Link
        href="/nos-cours"
        onClick={dismiss}
        style={{
          marginLeft: '1rem',
          background: 'rgba(255,255,255,0.2)',
          color: 'white',
          fontFamily: 'var(--font-montserrat)',
          fontWeight: 700,
          fontSize: '0.75rem',
          padding: '0.25rem 0.75rem',
          borderRadius: '0.4rem',
          textDecoration: 'none',
          letterSpacing: '0.05em',
        }}
      >
        En savoir plus →
      </Link>
      <button
        onClick={dismiss}
        aria-label="Fermer"
        style={{
          position: 'absolute',
          right: '1rem',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'none',
          border: 'none',
          color: 'rgba(255,255,255,0.7)',
          cursor: 'pointer',
          fontSize: '1.1rem',
          lineHeight: 1,
        }}
      >
        ×
      </button>
    </div>
  );
}
