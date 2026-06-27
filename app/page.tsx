import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Breizh Pévèle | Danse & Musique Bretonne à Orchies (59)',
  description: "Cours de danse bretonne et musique celtique tous les samedis à Orchies (Nord). Rejoignez l'association Breizh Pévèle pour découvrir le Fest-Noz en Pévèle !",
};

const sections = [
  {
    href: '/nos-cours',
    icon: '/icon-cours.png',
    title: 'Nos Cours',
    desc: 'Chaque samedi de 15h à 17h à la Salle Marypomme d\'Orchies. Ouvert à tous, débutants bienvenus !',
    cta: 'Voir les cours →',
    accent: '#0E676D',
  },
  {
    href: '/actualites',
    icon: '/icon-groupe.png',
    title: 'Actualités',
    desc: 'Fest-Noz, stages, sorties culturelles… Ne manquez aucun de nos événements bretons !',
    cta: 'Voir les événements →',
    accent: '#BA9C5A',
  },
  {
    href: '/galerie',
    icon: '/icon-galerie.png',
    title: 'Galerie Photos',
    desc: 'Revivez l\'ambiance de nos cours et soirées en images. 41 photos de moments partagés.',
    cta: 'Voir la galerie →',
    accent: '#0E676D',
  },
  {
    href: '/contact',
    icon: '/icon-contact.png',
    title: 'Contact',
    desc: 'Une question ? Envie d\'essayer ? Contactez-nous, nous répondons sous 48h.',
    cta: 'Nous contacter →',
    accent: '#BA9C5A',
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />

        {/* Section aperçu des rubriques */}
        <section className="py-24" style={{ background: '#f5f3f0' }} aria-labelledby="rubriques-heading">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-14">
              <div
                className="inline-block px-4 py-1.5 rounded-full mb-4"
                style={{ background: 'rgba(14,103,109,0.1)', fontFamily: 'var(--font-montserrat)', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.14em', color: '#0E676D', textTransform: 'uppercase' }}
              >
                🎵 Découvrez l&apos;association
              </div>
              <h2
                id="rubriques-heading"
                style={{ fontFamily: 'var(--font-montserrat)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, color: '#1A1A1A', marginBottom: '0.75rem' }}
              >
                Tout sur <span style={{ color: '#0E676D' }}>Breizh Pévèle</span>
              </h2>
              <p style={{ fontFamily: 'var(--font-opensans)', fontSize: '1.05rem', color: '#4a4a4a', maxWidth: '500px', margin: '0 auto' }}>
                Une association dynamique qui fait vibrer la Pévèle au rythme breton depuis des années.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sections.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="card-hover flex flex-col rounded-2xl overflow-hidden group"
                  style={{ background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.07)', textDecoration: 'none' }}
                  id={`home-card-${s.title.toLowerCase().replace(/\s/g, '-')}`}
                >
                  {/* Icône */}
                  <div
                    className="flex items-center justify-center p-6"
                    style={{ background: `linear-gradient(135deg, ${s.accent}15, ${s.accent}30)` }}
                  >
                    <div className="relative w-16 h-16 transition-transform duration-300 group-hover:scale-110">
                      <Image src={s.icon} alt={s.title} fill className="object-contain" />
                    </div>
                  </div>
                  {/* Contenu */}
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800, fontSize: '1rem', color: '#1A1A1A', marginBottom: '0.5rem' }}>
                      {s.title}
                    </h3>
                    <p style={{ fontFamily: 'var(--font-opensans)', fontSize: '0.85rem', color: '#4a4a4a', lineHeight: 1.65, flex: 1, marginBottom: '1rem' }}>
                      {s.desc}
                    </p>
                    <span style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 700, fontSize: '0.8rem', color: s.accent }}>
                      {s.cta}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Section photos aperçu */}
        <section className="py-20" style={{ background: '#1A1A1A' }} aria-label="Aperçu galerie">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <h2 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 900, fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', color: 'white' }}>
                Nos <span style={{ color: '#BA9C5A' }}>Derniers Moments</span>
              </h2>
              <Link
                href="/galerie"
                className="btn-biais btn-biais-vert"
                style={{ fontSize: '0.82rem', padding: '0.6rem 1.3rem' }}
                id="home-galerie-link"
              >
                Voir tout →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                '/photos/38f45ba9-cd83-4e6e-9fbe-f7d585b6552c.webp',
                '/photos/455576cf-1d28-452b-8119-1ec806e1eae9.webp',
                '/photos/8877c57e-e0b2-46c7-a801-49cfc22b76ef.webp',
                '/photos/95db3996-ded5-41b3-95b5-2ce9321565a1.webp',
                '/photos/b06e1302-e18d-4622-991c-4dd174315055.webp',
                '/photos/ecb78b7d-d30e-4ac1-bc21-f496c3599a36.webp',
              ].map((src, i) => (
                <Link
                  href="/galerie"
                  key={src}
                  className="relative overflow-hidden rounded-xl group block"
                  style={{ aspectRatio: '4/3' }}
                  id={`home-photo-${i + 1}`}
                >
                  <Image
                    src={src}
                    alt={`Breizh Pévèle - danse bretonne - photo ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final inscription */}
        <section
          className="py-20 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0E676D 0%, #0a4f54 100%)' }}
          aria-label="Inscription aux cours"
        >
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `url('/triskel-bg.svg')`, backgroundSize: '300px 300px', backgroundRepeat: 'repeat' }} />
          <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <Image src="/icon-triskel.png" alt="Triskel" fill className="object-contain" />
            </div>
            <h2 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 900, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'white', marginBottom: '1rem' }}>
              Prêt·e à rejoindre la ronde ?
            </h2>
            <p style={{ fontFamily: 'var(--font-opensans)', fontSize: '1.05rem', color: 'rgba(255,255,255,0.85)', maxWidth: '480px', margin: '0 auto 2rem', lineHeight: 1.75 }}>
              Premier cours gratuit ! Inscrivez-vous dès maintenant sur HelloAsso et venez découvrir la danse bretonne à Orchies.
            </p>
            <a
              href="https://www.helloasso.com/associations/breizh-pevele"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-biais"
              style={{ fontSize: '1.1rem', padding: '1.2rem 3rem' }}
              id="home-cta-inscription"
            >
              🎪 S&apos;inscrire sur HelloAsso
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
