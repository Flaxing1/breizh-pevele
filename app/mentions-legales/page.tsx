import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Mentions Légales | Breizh Pevele',
  description: 'Mentions légales de l\'association Breizh Pevele - Association de musiques et danses bretonnes à Orchies (59310)',
  robots: { index: false, follow: false },
};

export default function MentionsLegales() {
  return (
    <div className="min-h-screen" style={{ background: '#f5f3f0' }}>
      {/* Header */}
      <header style={{ background: '#1A1A1A', padding: '1.5rem' }}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800, fontSize: '1.1rem', color: '#BA9C5A', textDecoration: 'none' }}
          >
            ← Breizh Pévèle
          </Link>
          <span style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 700, fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>
            Mentions Légales
          </span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1
          style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 900, fontSize: '2.5rem', color: '#1A1A1A', marginBottom: '2rem' }}
        >
          Mentions Légales
        </h1>

        <div style={{ background: 'white', borderRadius: '16px', padding: '2.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          {[
            {
              title: '1. Éditeur du site',
              content: `Association Breizh Pévèle
Association loi 1901
Siège social : Orchies (59310), Nord, France
Email : breizhpevele@gmail.com
Directeur de la publication : Le Président de l'association`,
            },
            {
              title: '2. Hébergement',
              content: `Ce site est hébergé par :
Vercel Inc.
440 N Barranca Ave #4133
Covina, CA 91723, USA
Site : https://vercel.com`,
            },
            {
              title: '3. Objet social',
              content: `Breizh Pévèle est une association à but non lucratif dont l'objet est la promotion, l'enseignement et la pratique des musiques et danses bretonnes dans le territoire de la Pévèle (Nord, France).`,
            },
            {
              title: '4. Propriété intellectuelle',
              content: `L'ensemble du contenu de ce site (textes, images, vidéos, logo) est la propriété exclusive de l'association Breizh Pévèle, sauf mention contraire. Toute reproduction, même partielle, est interdite sans autorisation préalable.`,
            },
            {
              title: '5. Limitation de responsabilité',
              content: `L'association Breizh Pévèle s'efforce de maintenir les informations de ce site à jour. Toutefois, elle ne peut être tenue responsable des erreurs ou omissions dans le contenu. Les dates et horaires des cours peuvent être modifiés ; veuillez contacter l'association pour confirmer.`,
            },
            {
              title: '6. Contact',
              content: `Pour toute question concernant ce site ou l'association :
Email : breizhpevele@gmail.com`,
            },
          ].map(({ title, content }) => (
            <section key={title} style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800, fontSize: '1.1rem', color: '#0E676D', marginBottom: '0.75rem' }}>
                {title}
              </h2>
              <p style={{ fontFamily: 'var(--font-opensans)', fontSize: '0.9rem', color: '#4a4a4a', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                {content}
              </p>
            </section>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/" className="btn-biais btn-biais-vert" id="mentions-retour-btn">
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </main>
    </div>
  );
}
