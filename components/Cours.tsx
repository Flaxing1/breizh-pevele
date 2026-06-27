'use client';

import { useEffect, useRef } from 'react';

interface CoursInfoProps {
  icon: string;
  label: string;
  value: string;
}

function CoursInfo({ icon, label, value }: CoursInfoProps) {
  return (
    <div className="flex items-start gap-4 p-5 rounded-2xl card-hover"
      style={{ background: 'rgba(14,103,109,0.08)', border: '1px solid rgba(14,103,109,0.2)' }}>
      <div
        className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
        style={{ background: 'linear-gradient(135deg, #0E676D, #1a8a91)' }}
      >
        {icon}
      </div>
      <div>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', color: '#0E676D', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
          {label}
        </p>
        <p style={{ fontFamily: 'var(--font-opensans)', fontSize: '0.95rem', fontWeight: 600, color: '#1A1A1A', lineHeight: 1.5 }}>
          {value}
        </p>
      </div>
    </div>
  );
}

export default function Cours() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal-item').forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = '1';
                (el as HTMLElement).style.transform = 'translateY(0)';
              }, i * 150);
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="cours"
      ref={sectionRef}
      className="triskel-bg relative py-24 overflow-hidden"
      style={{ background: '#f5f3f0' }}
      aria-labelledby="cours-heading"
    >
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* En-tête section */}
        <div className="text-center mb-16">
          <div
            className="reveal-item inline-block px-4 py-1.5 rounded-full mb-4"
            style={{
              background: 'rgba(14,103,109,0.12)',
              fontFamily: 'var(--font-montserrat)',
              fontWeight: 700,
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              color: '#0E676D',
              textTransform: 'uppercase',
              opacity: 0,
              transform: 'translateY(20px)',
              transition: 'all 0.6s ease',
            }}
          >
            🎵 Venez danser avec nous
          </div>
          <h2
            id="cours-heading"
            className="reveal-item"
            style={{
              fontFamily: 'var(--font-montserrat)',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 900,
              color: '#1A1A1A',
              marginBottom: '1rem',
              opacity: 0,
              transform: 'translateY(20px)',
              transition: 'all 0.6s ease',
            }}
          >
            Nos <span style={{ color: '#0E676D' }}>Cours</span> de Danse Bretonne
          </h2>
          <p
            className="reveal-item"
            style={{
              fontFamily: 'var(--font-opensans)',
              fontSize: '1.05rem',
              color: '#4a4a4a',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.8,
              opacity: 0,
              transform: 'translateY(20px)',
              transition: 'all 0.6s ease',
            }}
          >
            Ouverts à tous, débutants comme confirmés. Pas besoin de costume, juste de l&apos;envie de danser et de partager !
          </p>
        </div>

        {/* Grille d'infos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {[
            { icon: '📅', label: 'Jours & Horaires', value: 'Tous les samedis de 15h00 à 17h00\n(hors vacances scolaires)' },
            { icon: '📍', label: 'Adresse', value: 'Salle Marypomme (Oiseau Lyre)\n18 rue Gaston Leroy, 59310 Orchies' },
            { icon: '👥', label: 'Public', value: 'Adultes et adolescents\nTous niveaux bienvenus' },
            { icon: '💰', label: 'Tarif', value: 'Premier cours offert !\nCotisation annuelle accessible' },
            { icon: '📞', label: 'Contact', value: 'breizhpevele@gmail.com\nRéponse sous 48h' },
            { icon: '🎵', label: 'Style', value: 'Fest-Noz, An Dro, Hanterdro\nMusique bretonne traditionnelle' },
          ].map((info, i) => (
            <div
              key={i}
              className="reveal-item"
              style={{
                opacity: 0,
                transform: 'translateY(20px)',
                transition: `all 0.6s ease`,
              }}
            >
              <CoursInfo {...info} value={info.value} />
            </div>
          ))}
        </div>

        {/* CTA principal */}
        <div
          className="reveal-item text-center"
          style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.6s ease' }}
        >
          <div
            className="inline-flex flex-col md:flex-row items-center gap-6 p-8 rounded-3xl"
            style={{
              background: 'linear-gradient(135deg, #0E676D, #0a4f54)',
              boxShadow: '0 20px 60px rgba(14,103,109,0.3)',
            }}
          >
            <div className="text-left">
              <p style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800, fontSize: '1.3rem', color: 'white', marginBottom: '0.3rem' }}>
                Prêt·e à rejoindre la ronde ?
              </p>
              <p style={{ fontFamily: 'var(--font-opensans)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>
                Écrivez-nous pour votre premier cours — il est gratuit ! 🎉
              </p>
            </div>
            <a
              href="mailto:breizhpevele@gmail.com?subject=Je veux essayer un cours de danse bretonne&body=Bonjour, je souhaite venir essayer un cours de danse bretonne. Pouvez-vous me confirmer les prochaines dates ? Merci !"
              className="btn-biais flex-shrink-0"
              style={{ fontSize: '1rem', whiteSpace: 'nowrap' }}
              id="cours-inscription-btn"
            >
              🎪 Venir essayer gratuitement
            </a>
          </div>
        </div>
      </div>

      {/* Séparateur décoratif bas */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16"
        style={{
          background: 'white',
          clipPath: 'polygon(0 100%, 100% 100%, 100% 30%, 0 100%)',
        }}
      />
    </section>
  );
}
