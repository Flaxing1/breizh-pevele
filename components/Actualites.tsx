'use client';

import { useEffect, useState } from 'react';
import { subscribeActualites, type Actualite } from '@/lib/firestore';

// Données de démonstration (avant connexion Firebase)
const DEMO_ACTUALITES: Actualite[] = [
  {
    id: '1',
    titre: 'Fest-Noz de rentrée à Orchies',
    date: '2025-09-20',
    heure: '20h00',
    lieu: 'Salle des Fêtes d\'Orchies',
    description: 'Grande soirée de rentrée avec concert live et bal breton ! Initiations proposées pour les débutants. Entrée libre.',
    imageUrl: '/galerie-1.webp',
  },
  {
    id: '2',
    titre: 'Reprise des cours de danse',
    date: '2025-09-06',
    heure: '15h00',
    lieu: 'Salle Marypomme, Orchies',
    description: 'Les cours reprennent le 6 septembre ! Inscriptions ouvertes. Premier cours gratuit pour les nouveaux adhérents.',
  },
  {
    id: '3',
    titre: 'Stage "Techniques du Fest-Noz"',
    date: '2025-10-18',
    heure: '14h00',
    lieu: 'Salle culturelle de Pévèle',
    description: 'Stage intensif d\'une journée pour approfondir vos pas de fest-noz avec un intervenant spécialisé. Places limitées !',
  },
];

function formatDate(dateStr: string): { day: string; month: string; year: string } {
  const d = new Date(dateStr + 'T00:00:00');
  return {
    day: d.toLocaleDateString('fr-FR', { day: '2-digit' }),
    month: d.toLocaleDateString('fr-FR', { month: 'short' }).toUpperCase(),
    year: d.toLocaleDateString('fr-FR', { year: 'numeric' }),
  };
}

function ActualiteCard({ item, index }: { item: Actualite; index: number }) {
  const { day, month, year } = formatDate(item.date);

  return (
    <article
      className="card-hover rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: 'white',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        animationDelay: `${index * 0.15}s`,
      }}
      aria-label={`Événement : ${item.titre}`}
    >
      {/* Image ou placeholder */}
      <div className="relative overflow-hidden" style={{ height: '180px', flexShrink: 0 }}>
        {item.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.imageUrl}
            alt={item.titre}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #0E676D, #0a4f54)' }}
          >
            <svg width="60" height="60" viewBox="0 0 200 200" fill="none" className="opacity-30">
              <g transform="translate(100,100)">
                <g transform="rotate(0)">
                  <path d="M0,-60 C0,-60 40,-60 40,-30 C40,0 20,10 0,10" stroke="white" strokeWidth="8" fill="none"/>
                </g>
                <g transform="rotate(120)">
                  <path d="M0,-60 C0,-60 40,-60 40,-30 C40,0 20,10 0,10" stroke="white" strokeWidth="8" fill="none"/>
                </g>
                <g transform="rotate(240)">
                  <path d="M0,-60 C0,-60 40,-60 40,-30 C40,0 20,10 0,10" stroke="white" strokeWidth="8" fill="none"/>
                </g>
              </g>
            </svg>
          </div>
        )}
        {/* Badge date */}
        <div
          className="absolute top-3 left-3 flex flex-col items-center rounded-xl px-3 py-2"
          style={{ background: '#BA9C5A', minWidth: '50px' }}
        >
          <span style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 900, fontSize: '1.4rem', lineHeight: 1, color: '#1A1A1A' }}>
            {day}
          </span>
          <span style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 700, fontSize: '0.65rem', color: '#1A1A1A', letterSpacing: '0.05em' }}>
            {month}
          </span>
          <span style={{ fontFamily: 'var(--font-opensans)', fontSize: '0.65rem', color: '#1A1A1A', opacity: 0.7 }}>
            {year}
          </span>
        </div>
      </div>

      {/* Contenu */}
      <div className="flex flex-col flex-1 p-5">
        <h3
          style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800, fontSize: '1.05rem', color: '#1A1A1A', marginBottom: '0.5rem', lineHeight: 1.3 }}
        >
          {item.titre}
        </h3>

        <div className="flex flex-col gap-1 mb-3">
          <div className="flex items-center gap-2">
            <span style={{ color: '#0E676D', fontSize: '0.85rem' }}>🕐</span>
            <span style={{ fontFamily: 'var(--font-opensans)', fontSize: '0.82rem', color: '#4a4a4a' }}>{item.heure}</span>
          </div>
          <div className="flex items-center gap-2">
            <span style={{ color: '#0E676D', fontSize: '0.85rem' }}>📍</span>
            <span style={{ fontFamily: 'var(--font-opensans)', fontSize: '0.82rem', color: '#4a4a4a' }}>{item.lieu}</span>
          </div>
        </div>

        <p style={{ fontFamily: 'var(--font-opensans)', fontSize: '0.88rem', color: '#4a4a4a', lineHeight: 1.6, flex: 1 }}>
          {item.description}
        </p>
      </div>
    </article>
  );
}

export default function Actualites() {
  const [actualites, setActualites] = useState<Actualite[]>(DEMO_ACTUALITES);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Tentative de connexion Firebase (si configuré)
    try {
      setLoading(true);
      const unsubscribe = subscribeActualites((items) => {
        const visibleItems = items.filter(item => item.visible !== false);
        setActualites(visibleItems.length > 0 ? visibleItems : DEMO_ACTUALITES);
        setLoading(false);
      });
      return unsubscribe;
    } catch {
      // Firebase non configuré : utilisation des données démo
      setLoading(false);
    }
  }, []);

  return (
    <section
      id="actualites"
      className="py-24 relative"
      style={{ background: 'white' }}
      aria-labelledby="actualites-heading"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* En-tête */}
        <div className="text-center mb-14">
          <div
            className="inline-block px-4 py-1.5 rounded-full mb-4"
            style={{
              background: 'rgba(186,156,90,0.12)',
              fontFamily: 'var(--font-montserrat)',
              fontWeight: 700,
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              color: '#BA9C5A',
              textTransform: 'uppercase',
            }}
          >
            🎭 Événements & Fest-Noz
          </div>
          <h2
            id="actualites-heading"
            style={{
              fontFamily: 'var(--font-montserrat)',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 900,
              color: '#1A1A1A',
              marginBottom: '0.75rem',
            }}
          >
            Actualités & <span style={{ color: '#BA9C5A' }}>Événements</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-opensans)', fontSize: '1rem', color: '#4a4a4a', maxWidth: '500px', margin: '0 auto' }}>
            Ne manquez aucun de nos Fest-Noz, stages et soirées bretonnes !
          </p>
        </div>

        {/* Grille actualités */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 rounded-full border-4 border-vert-breizh border-t-transparent animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {actualites.map((item, i) => (
              <ActualiteCard key={item.id} item={item} index={i} />
            ))}
          </div>
        )}

        {/* Lien vers plus */}
        <div className="text-center">
          <p style={{ fontFamily: 'var(--font-opensans)', fontSize: '0.9rem', color: '#4a4a4a' }}>
            Restez informés sur{' '}
            <a
              href="https://www.facebook.com/p/Breizh-P%C3%A9v%C3%A8le-61555861410250/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#0E676D', fontWeight: 600, textDecoration: 'underline' }}
              id="facebook-link"
            >
              notre page Facebook
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
