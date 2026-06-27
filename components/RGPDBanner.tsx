'use client';

import { useState, useEffect } from 'react';

const RGPD_KEY = 'breizh-pevele-rgpd-consent';

export default function RGPDBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(RGPD_KEY);
    if (!consent) {
      // Légère pause pour ne pas bloquer le LCP
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(RGPD_KEY, 'accepted');
    setVisible(false);
  };

  const refuse = () => {
    localStorage.setItem(RGPD_KEY, 'refused');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="rgpd-banner" role="dialog" aria-label="Bandeau cookies RGPD" id="rgpd-banner">
      <div className="flex-1 min-w-0">
        <p style={{ fontFamily: 'var(--font-opensans)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.6 }}>
          🍪 Ce site utilise des cookies essentiels pour fonctionner (Firebase). En naviguant, vous acceptez nos{' '}
          <a
            href="/politique-confidentialite"
            style={{ color: '#BA9C5A', textDecoration: 'underline' }}
            id="rgpd-privacy-link"
          >
            conditions de confidentialité
          </a>
          .
        </p>
      </div>
      <div className="flex gap-2 flex-shrink-0">
        <button
          onClick={refuse}
          className="px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
          style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-montserrat)', border: '1px solid rgba(255,255,255,0.2)' }}
          id="rgpd-refuse-btn"
        >
          Refuser
        </button>
        <button
          onClick={accept}
          className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105"
          style={{ background: '#0E676D', color: 'white', fontFamily: 'var(--font-montserrat)' }}
          id="rgpd-accept-btn"
        >
          Accepter ✓
        </button>
      </div>
    </div>
  );
}
