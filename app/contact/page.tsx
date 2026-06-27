import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Contact | Breizh Pévèle — Danse Bretonne Orchies',
  description: 'Contactez l\'association Breizh Pévèle à Orchies (Nord 59). Inscription aux cours de danse bretonne, renseignements, partenariats.',
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero interne */}
        <section className="pt-28 pb-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0E676D 0%, #0a4f54 100%)' }}>
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `url('/triskel-bg.svg')`, backgroundSize: '300px', backgroundRepeat: 'repeat' }} />
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <div className="relative w-20 h-20 mx-auto mb-5">
              <Image src="/icon-contact.png" alt="Contact" fill className="object-contain" />
            </div>
            <h1 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: 'white', marginBottom: '0.75rem', textShadow: '0 2px 12px rgba(0,0,0,0.2)' }}>
              Contactez-nous
            </h1>
            <p style={{ fontFamily: 'var(--font-opensans)', fontSize: '1rem', color: 'rgba(255,255,255,0.9)' }}>
              Nous répondons sous 48h — venez danser avec nous !
            </p>
          </div>
        </section>

        <section className="py-16" style={{ background: '#f5f3f0' }}>
          <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-10">

            {/* Infos de contact */}
            <div>
              <h2 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800, fontSize: '1.4rem', color: '#1A1A1A', marginBottom: '1.5rem' }}>
                Nos coordonnées
              </h2>

              <div className="space-y-5">
                {/* Email */}
                <div className="flex items-center gap-4 p-5 rounded-2xl" style={{ background: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <Image src="/icon-contact.png" alt="Email" fill className="object-contain" />
                  </div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 700, fontSize: '0.72rem', color: '#0E676D', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>Email</p>
                    <a href="mailto:breizhpevele@gmail.com" style={{ fontFamily: 'var(--font-opensans)', fontSize: '0.95rem', color: '#1A1A1A', fontWeight: 600, textDecoration: 'none' }} id="contact-email-link">
                      breizhpevele@gmail.com
                    </a>
                  </div>
                </div>

                {/* Adresse */}
                <div className="flex items-center gap-4 p-5 rounded-2xl" style={{ background: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
                  <div className="w-12 h-12 flex-shrink-0 rounded-xl flex items-center justify-center" style={{ background: 'rgba(14,103,109,0.1)' }}>
                    <span style={{ fontSize: '1.5rem' }}>📍</span>
                  </div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 700, fontSize: '0.72rem', color: '#0E676D', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>Adresse</p>
                    <p style={{ fontFamily: 'var(--font-opensans)', fontSize: '0.9rem', color: '#1A1A1A', fontWeight: 600 }}>Salle Marypomme — Oiseau Lyre</p>
                    <p style={{ fontFamily: 'var(--font-opensans)', fontSize: '0.85rem', color: '#4a4a4a' }}>18 rue Gaston Leroy, 59310 Orchies</p>
                  </div>
                </div>

                {/* Horaires */}
                <div className="flex items-center gap-4 p-5 rounded-2xl" style={{ background: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <Image src="/icon-cours.png" alt="Horaires" fill className="object-contain" />
                  </div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 700, fontSize: '0.72rem', color: '#0E676D', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>Horaires des cours</p>
                    <p style={{ fontFamily: 'var(--font-opensans)', fontSize: '0.9rem', color: '#1A1A1A', fontWeight: 600 }}>Tous les samedis</p>
                    <p style={{ fontFamily: 'var(--font-opensans)', fontSize: '0.85rem', color: '#4a4a4a' }}>15h00 → 17h00 (hors vacances scolaires)</p>
                  </div>
                </div>

                {/* Réseaux sociaux */}
                <div className="p-5 rounded-2xl" style={{ background: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
                  <p style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 700, fontSize: '0.72rem', color: '#0E676D', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>Réseaux Sociaux</p>
                  <div className="flex gap-3">
                    <a
                      href="https://www.facebook.com/p/Breizh-P%C3%A9v%C3%A8le-61555861410250/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:scale-105"
                      style={{ background: '#1877F2', fontFamily: 'var(--font-montserrat)', textDecoration: 'none' }}
                      id="contact-facebook-link"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                      Facebook
                    </a>
                    <a
                      href="https://www.instagram.com/breizh_pevele"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:scale-105"
                      style={{ background: 'radial-gradient(circle at 30% 110%, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', fontFamily: 'var(--font-montserrat)', textDecoration: 'none' }}
                      id="contact-instagram-link"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5.5" stroke="white" strokeWidth="2.3" fill="none"/><circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="2.3" fill="none"/><circle cx="17.5" cy="6.5" r="1.3" fill="white"/></svg>
                      Instagram
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulaire / HelloAsso */}
            <div>
              <h2 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800, fontSize: '1.4rem', color: '#1A1A1A', marginBottom: '1.5rem' }}>
                S&apos;inscrire en ligne
              </h2>

              <div
                className="p-8 rounded-2xl text-center mb-6"
                style={{ background: 'linear-gradient(135deg, #0E676D, #0a4f54)', boxShadow: '0 8px 30px rgba(14,103,109,0.3)' }}
              >
                <div className="relative w-16 h-16 mx-auto mb-4">
                  <Image src="/icon-triskel.png" alt="Triskel" fill className="object-contain" />
                </div>
                <h3 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 900, fontSize: '1.2rem', color: 'white', marginBottom: '0.75rem' }}>
                  Inscription via HelloAsso
                </h3>
                <p style={{ fontFamily: 'var(--font-opensans)', fontSize: '0.875rem', color: 'rgba(255,255,255,0.85)', marginBottom: '1.5rem', lineHeight: 1.65 }}>
                  Rejoignez l&apos;association en quelques clics sur HelloAsso. Paiement sécurisé, 100% gratuit pour l&apos;association.
                </p>
                <a
                  href="https://www.helloasso.com/associations/breizh-pevele"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3.5 rounded-xl font-semibold transition-all hover:scale-105"
                  style={{ background: '#BA9C5A', color: '#1A1A1A', fontFamily: 'var(--font-montserrat)', fontSize: '0.95rem', fontWeight: 700, textDecoration: 'none', boxShadow: '0 4px 16px rgba(186,156,90,0.4)' }}
                  id="contact-helloasso-btn"
                >
                  🎪 S&apos;inscrire sur HelloAsso
                </a>
              </div>

              {/* Ou par email */}
              <div
                className="p-6 rounded-2xl"
                style={{ background: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', border: '2px dashed rgba(14,103,109,0.2)' }}
              >
                <h3 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800, fontSize: '1rem', color: '#1A1A1A', marginBottom: '0.5rem' }}>
                  ✉️ Ou envoyez-nous un email
                </h3>
                <p style={{ fontFamily: 'var(--font-opensans)', fontSize: '0.875rem', color: '#4a4a4a', marginBottom: '1rem', lineHeight: 1.65 }}>
                  Pour toute question (inscriptions, renseignements, partenariats), écrivez-nous directement.
                </p>
                <a
                  href="mailto:breizhpevele@gmail.com?subject=Renseignements%20Breizh%20P%C3%A9v%C3%A8le&body=Bonjour%2C%0A%0AJe%20souhaite%20avoir%20des%20renseignements%20sur%20les%20cours.%0A%0AMerci%20!"
                  className="btn-biais btn-biais-vert w-full justify-center text-center"
                  style={{ fontSize: '0.9rem', padding: '0.85rem 1.5rem', display: 'block' }}
                  id="contact-email-btn"
                >
                  ✉️ Envoyer un message
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Carte Google Maps embed */}
        <section style={{ background: '#1A1A1A' }}>
          <div className="max-w-6xl mx-auto px-4 py-12">
            <h2 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800, fontSize: '1.3rem', color: 'white', marginBottom: '1.5rem', textAlign: 'center' }}>
              📍 Nous trouver à Orchies
            </h2>
            <div className="rounded-2xl overflow-hidden" style={{ height: '380px' }}>
              <iframe
                title="Localisation Breizh Pévèle — Orchies"
                src="https://maps.google.com/maps?q=18%20rue%20Gaston%20Leroy,%2059310%20Orchies&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
