'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { subscribeActualites, type Actualite } from '@/lib/firestore';
import { Timestamp } from 'firebase/firestore';

// Données de secours si Firestore non configuré
const DEMO_EVENTS: Actualite[] = [
  {
    id: 'demo-1',
    titre: 'Reprise des cours — Rentrée 2025',
    date: '2025-09-06',
    heure: '15h00',
    lieu: 'Salle Marypomme — Oiseau Lyre',
    description: 'La saison 2025-2026 commence ! Venez rejoindre la ronde pour notre premier cours de la rentrée. Nouveaux adhérents bienvenus, premier cours gratuit !',
    imageUrl: '',
    createdAt: Timestamp.fromDate(new Date('2025-08-01')),
  },
  {
    id: 'demo-2',
    titre: 'Fest-Noz de rentrée',
    date: '2025-10-11',
    heure: '20h00',
    lieu: 'Salle des Fêtes — Orchies',
    description: 'Grande soirée de Fest-Noz pour fêter la rentrée ! Musiques bretonnes live, danses, buvette. Entrée libre, venez nombreux !',
    imageUrl: '',
    createdAt: Timestamp.fromDate(new Date('2025-09-01')),
  },
  {
    id: 'demo-3',
    titre: 'Stage Inter-associations Pévèle',
    date: '2025-11-15',
    heure: '14h00',
    lieu: 'Gymnase Municipal — Orchies',
    description: 'Stage en partenariat avec les associations bretonnes du Nord. Au programme : Plinn, Gavotte de Cornouaille et suite d\'ensemble. Inscription obligatoire.',
    imageUrl: '',
    createdAt: Timestamp.fromDate(new Date('2025-10-01')),
  },
];

function EventCard({ event }: { event: Actualite }) {
  const d = new Date(event.date + 'T00:00:00');
  const day = d.getDate();
  const month = d.toLocaleDateString('fr-FR', { month: 'short' }).toUpperCase();
  const year = d.getFullYear();

  return (
    <article
      className="flex gap-5 p-6 rounded-2xl transition-all duration-200 hover:shadow-lg"
      style={{ background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
    >
      {/* Badge date */}
      <div className="flex-shrink-0 w-16 text-center">
        <div className="rounded-xl py-2 px-1" style={{ background: 'linear-gradient(135deg, #0E676D, #0a4f54)' }}>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 900, fontSize: '1.6rem', color: 'white', lineHeight: 1 }}>{day}</p>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 700, fontSize: '0.65rem', color: '#BA9C5A', letterSpacing: '0.05em' }}>{month}</p>
          <p style={{ fontFamily: 'var(--font-opensans)', fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)' }}>{year}</p>
        </div>
      </div>

      {/* Contenu */}
      <div className="flex-1">
        <h2 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800, fontSize: '1.05rem', color: '#1A1A1A', marginBottom: '0.4rem' }}>
          {event.titre}
        </h2>
        <div className="flex flex-wrap gap-3 mb-3">
          <span style={{ fontFamily: 'var(--font-opensans)', fontSize: '0.8rem', color: '#0E676D', fontWeight: 600 }}>
            🕐 {event.heure}
          </span>
          <span style={{ fontFamily: 'var(--font-opensans)', fontSize: '0.8rem', color: '#4a4a4a' }}>
            📍 {event.lieu}
          </span>
        </div>
        <p style={{ fontFamily: 'var(--font-opensans)', fontSize: '0.875rem', color: '#4a4a4a', lineHeight: 1.65 }}>
          {event.description}
        </p>
      </div>
    </article>
  );
}

export default function ActualitesPage() {
  const [events, setEvents] = useState<Actualite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const unsub = subscribeActualites((data) => {
        const visibleEvents = data.filter(e => e.visible !== false);
        setEvents(visibleEvents.length > 0 ? visibleEvents : DEMO_EVENTS);
        setLoading(false);
      });
      const timeout = setTimeout(() => { setLoading(false); setEvents(DEMO_EVENTS); }, 3000);
      return () => { unsub(); clearTimeout(timeout); };
    } catch {
      setEvents(DEMO_EVENTS);
      setLoading(false);
    }
  }, []);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero interne */}
        <section className="pt-28 pb-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0E676D 0%, #0a4f54 100%)' }}>
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `url('/triskel-bg.svg')`, backgroundSize: '300px', backgroundRepeat: 'repeat' }} />
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <div className="relative w-20 h-20 mx-auto mb-5">
              <Image src="/icon-groupe.png" alt="Actualités" fill className="object-contain" />
            </div>
            <h1 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: 'white', marginBottom: '0.75rem', textShadow: '0 2px 12px rgba(0,0,0,0.2)' }}>
              Actualités & Événements
            </h1>
            <p style={{ fontFamily: 'var(--font-opensans)', fontSize: '1rem', color: 'rgba(255,255,255,0.9)' }}>
              Restez informé·e de toute la vie de l&apos;association
            </p>
          </div>
        </section>

        {/* Liste événements */}
        <section className="py-16" style={{ background: '#f5f3f0' }}>
          <div className="max-w-3xl mx-auto px-4">
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="w-10 h-10 border-4 rounded-full animate-spin" style={{ borderColor: '#0E676D', borderTopColor: 'transparent' }} />
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-20">
                <p style={{ fontFamily: 'var(--font-opensans)', color: '#4a4a4a', fontSize: '1rem' }}>
                  Aucun événement programmé pour le moment. Revenez bientôt !
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}

            {/* Abonnement / réseaux */}
            <div
              className="mt-12 p-7 rounded-2xl text-center"
              style={{ background: 'linear-gradient(135deg, #0E676D15, #BA9C5A10)', border: '1px solid rgba(14,103,109,0.2)' }}
            >
              <p style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800, fontSize: '1rem', color: '#1A1A1A', marginBottom: '0.6rem' }}>
                Ne ratez aucun événement !
              </p>
              <p style={{ fontFamily: 'var(--font-opensans)', fontSize: '0.875rem', color: '#4a4a4a', marginBottom: '1.2rem' }}>
                Suivez-nous sur Facebook et Instagram pour être informé·e en temps réel.
              </p>
              <div className="flex justify-center gap-4">
                <a
                  href="https://www.facebook.com/p/Breizh-P%C3%A9v%C3%A8le-61555861410250/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all hover:scale-105"
                  style={{ background: '#1877F2', fontFamily: 'var(--font-montserrat)', textDecoration: 'none' }}
                  id="actualites-facebook-link"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  Facebook
                </a>
                <a
                  href="https://www.instagram.com/breizh_pevele"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all hover:scale-105"
                  style={{ background: 'radial-gradient(circle at 30% 110%, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', fontFamily: 'var(--font-montserrat)', textDecoration: 'none' }}
                  id="actualites-instagram-link"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5.5" stroke="white" strokeWidth="2.3" fill="none"/><circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="2.3" fill="none"/><circle cx="17.5" cy="6.5" r="1.3" fill="white"/></svg>
                  @breizh_pevele
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
