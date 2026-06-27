import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Nos Cours de Danse Bretonne | Breizh Pévèle — Orchies',
  description: 'Cours de danse bretonne tous les samedis à Orchies (Nord 59). Cercle, gavotte, suite d\'ensemble. Ouvert à tous, débutants bienvenus. Premier cours gratuit !',
};

const infoCards = [
  { icon: '/icon-cours.png', title: 'Jour & Horaire', value: 'Tous les samedis', detail: '15h00 → 17h00', color: '#0E676D' },
  { icon: '/icon-groupe.png', title: 'Public', value: 'Tout le monde !', detail: 'À partir de 10 ans, tous niveaux', color: '#BA9C5A' },
  { icon: '/icon-lieu.png', title: 'Lieu', value: 'Salle Marypomme', detail: 'Oiseau Lyre, Orchies', color: '#0E676D' },
  { icon: '/icon-tarifs.png', title: 'Tarif annuel', value: '30 € / saison', detail: '+ adhésion association (10 €)', color: '#BA9C5A' },
];

const danses = [
  { nom: 'Hanter Dro', desc: 'Danse en chaîne ouverte, la plus répandue des danses bretonnes. Parfaite pour débuter.', difficulte: 'Débutant', emoji: '🌀' },
  { nom: 'An Dro', desc: 'Proche du Hanter Dro, avec un mouvement de bras différent. Emblème du Finistère.', difficulte: 'Débutant', emoji: '💃' },
  { nom: 'Gavotte de Cornouaille', desc: 'Danse en cercle fermé, vive et rythmée. Plusieurs variantes régionales.', difficulte: 'Intermédiaire', emoji: '🎭' },
  { nom: 'Suite d\'ensemble', desc: 'Enchaînement de figures choreographiques en groupe. Le travail collectif au cœur !', difficulte: 'Tous niveaux', emoji: '🎪' },
  { nom: 'Plinn', desc: 'Danse des montagnes du Centre-Bretagne. Tempo rapide et pas bondissants.', difficulte: 'Avancé', emoji: '🏔️' },
  { nom: 'Bal Breton', desc: 'Soirées festives où toutes les danses apprises se retrouvent. La fête bretonne !', difficulte: 'Tous niveaux', emoji: '🎉' },
];

const diffColors: Record<string, string> = {
  'Débutant': '#0E676D',
  'Intermédiaire': '#BA9C5A',
  'Avancé': '#dc2626',
  'Tous niveaux': '#4a4a4a',
};

export default function NosCoursPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero page interne */}
        <section
          className="pt-28 pb-16 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0E676D 0%, #0a4f54 100%)' }}
        >
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `url('/triskel-bg.svg')`, backgroundSize: '300px', backgroundRepeat: 'repeat' }} />
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <div className="relative w-20 h-20 mx-auto mb-5">
              <Image src="/icon-cours.png" alt="Cours" fill className="object-contain" />
            </div>
            <h1 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: 'white', marginBottom: '1rem' }}>
              Nos Cours de Danse
            </h1>
            <p style={{ fontFamily: 'var(--font-opensans)', fontSize: '1.1rem', color: 'rgba(255,255,255,0.85)', maxWidth: '520px', margin: '0 auto 1.5rem', lineHeight: 1.75 }}>
              Apprenez les danses traditionnelles bretonnes dans une ambiance chaleureuse et conviviale, à Orchies chaque samedi.
            </p>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{ background: 'rgba(186,156,90,0.2)', border: '1px solid rgba(186,156,90,0.4)' }}
            >
              <span style={{ color: '#BA9C5A', fontFamily: 'var(--font-montserrat)', fontWeight: 700, fontSize: '0.85rem' }}>
                🎉 Premier cours GRATUIT — Venez essayer !
              </span>
            </div>
          </div>
        </section>

        {/* Infos pratiques */}
        <section className="py-16" style={{ background: '#f5f3f0' }} aria-labelledby="infos-heading">
          <div className="max-w-5xl mx-auto px-4">
            <h2 id="infos-heading" className="text-center" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 900, fontSize: '1.7rem', color: '#1A1A1A', marginBottom: '2.5rem' }}>
              Infos <span style={{ color: '#0E676D' }}>Pratiques</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {infoCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl p-6 text-center"
                  style={{ background: 'white', boxShadow: '0 4px 16px rgba(0,0,0,0.07)' }}
                >
                  <div className="w-14 h-14 mx-auto mb-3 flex items-center justify-center">
                    <Image src={card.icon} alt={card.title} width={56} height={56} className="object-contain" />
                  </div>
                  <p style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 700, fontSize: '0.72rem', color: card.color, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                    {card.title}
                  </p>
                  <p style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 900, fontSize: '1.05rem', color: '#1A1A1A', marginBottom: '0.25rem' }}>
                    {card.value}
                  </p>
                  <p style={{ fontFamily: 'var(--font-opensans)', fontSize: '0.82rem', color: '#4a4a4a' }}>
                    {card.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* Adresse complète */}
            <div
              className="mt-8 p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6"
              style={{ background: 'white', boxShadow: '0 4px 16px rgba(0,0,0,0.07)' }}
            >
              <div className="flex-1">
                <h3 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800, fontSize: '1rem', color: '#1A1A1A', marginBottom: '0.5rem' }}>
                  📍 Où nous trouver ?
                </h3>
                <p style={{ fontFamily: 'var(--font-opensans)', fontSize: '0.9rem', color: '#4a4a4a', lineHeight: 1.7 }}>
                  <strong>Salle Marypomme — Oiseau Lyre</strong><br />
                  18 rue Gaston Leroy, 59310 Orchies<br />
                  (à 5 min du centre-ville, parking gratuit)
                </p>
              </div>
              <a
                href="https://maps.google.com/?q=18+rue+Gaston+Leroy+59310+Orchies"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-biais flex-shrink-0"
                style={{ fontSize: '0.85rem', padding: '0.75rem 1.5rem' }}
                id="cours-maps-btn"
              >
                🗺️ Ouvrir dans Google Maps
              </a>
            </div>
          </div>
        </section>

        {/* Les danses */}
        <section className="py-16" style={{ background: 'white' }} aria-labelledby="danses-heading">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 id="danses-heading" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 900, fontSize: '1.7rem', color: '#1A1A1A', marginBottom: '0.75rem' }}>
                Les Danses que vous <span style={{ color: '#0E676D' }}>apprendrez</span>
              </h2>
              <p style={{ fontFamily: 'var(--font-opensans)', color: '#4a4a4a', fontSize: '0.95rem' }}>
                Un répertoire varié, du Finistère au Morbihan, pour découvrir toute la richesse de la tradition bretonne.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {danses.map((d) => (
                <div
                  key={d.nom}
                  className="rounded-2xl p-6 card-hover"
                  style={{ background: '#f5f3f0' }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span style={{ fontSize: '1.8rem' }}>{d.emoji}</span>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800, fontSize: '1rem', color: '#1A1A1A' }}>
                        {d.nom}
                      </h3>
                      <span
                        className="inline-block px-2 py-0.5 rounded-full"
                        style={{ background: diffColors[d.difficulte], color: d.difficulte === 'Intermédiaire' ? '#1A1A1A' : 'white', fontFamily: 'var(--font-montserrat)', fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.08em' }}
                      >
                        {d.difficulte.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <p style={{ fontFamily: 'var(--font-opensans)', fontSize: '0.85rem', color: '#4a4a4a', lineHeight: 1.65 }}>
                    {d.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Inscription */}
        <section className="py-20" style={{ background: '#1A1A1A' }}>
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h2 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 900, fontSize: '2rem', color: 'white', marginBottom: '1rem' }}>
              Envie de <span style={{ color: '#BA9C5A' }}>rejoindre la ronde ?</span>
            </h2>
            <p style={{ fontFamily: 'var(--font-opensans)', color: 'rgba(255,255,255,0.7)', marginBottom: '2rem', lineHeight: 1.7 }}>
              Inscrivez-vous en ligne sur HelloAsso ou contactez-nous par email. Le premier cours est gratuit !
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://www.helloasso.com/associations/breizh-pevele"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-biais"
                style={{ fontSize: '1rem', padding: '1rem 2.2rem' }}
                id="cours-inscription-btn"
              >
                🎪 S&apos;inscrire sur HelloAsso
              </a>
              <a
                href="mailto:breizhpevele@gmail.com"
                className="btn-biais btn-biais-vert"
                style={{ fontSize: '1rem', padding: '1rem 2.2rem' }}
                id="cours-email-btn"
              >
                ✉️ Nous contacter
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
