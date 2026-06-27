import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité | Breizh Pevele',
  description: 'Politique de confidentialité et gestion des cookies de l\'association Breizh Pevele',
  robots: { index: false, follow: false },
};

export default function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen" style={{ background: '#f5f3f0' }}>
      <header style={{ background: '#1A1A1A', padding: '1.5rem' }}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800, fontSize: '1.1rem', color: '#BA9C5A', textDecoration: 'none' }}>
            ← Breizh Pévèle
          </Link>
          <span style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 700, fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>
            Confidentialité
          </span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 900, fontSize: '2.5rem', color: '#1A1A1A', marginBottom: '0.5rem' }}>
          Politique de Confidentialité
        </h1>
        <p style={{ fontFamily: 'var(--font-opensans)', fontSize: '0.85rem', color: '#666', marginBottom: '2rem' }}>
          Dernière mise à jour : juin 2025 — Conformément au RGPD (UE) 2016/679
        </p>

        <div style={{ background: 'white', borderRadius: '16px', padding: '2.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          {[
            {
              title: '1. Responsable du traitement',
              content: `Association Breizh Pévèle — breizhpevele@gmail.com
L'association agit en qualité de responsable du traitement des données personnelles collectées via ce site.`,
            },
            {
              title: '2. Données collectées',
              content: `Ce site ne collecte aucune donnée personnelle sans votre consentement explicite.

Les seules données potentiellement collectées sont :
• Votre adresse email si vous nous contactez via le formulaire ou par email direct
• Des données de navigation anonymisées (Firebase Analytics, optionnel)

Ce site n'utilise pas de cookies publicitaires, de tracking ou de pistage comportemental.`,
            },
            {
              title: '3. Finalité du traitement',
              content: `Les données email collectées sont utilisées uniquement pour :
• Répondre à vos demandes d'information ou d'inscription aux cours
• Vous envoyer des informations sur nos événements (avec votre accord)

Base légale : consentement (art. 6(1)(a) RGPD)`,
            },
            {
              title: '4. Durée de conservation',
              content: `Vos données sont conservées :
• Email de contact : 3 ans maximum après le dernier échange
• Données d'adhésion : durée de l'adhésion + 3 ans

Au-delà de ces délais, vos données sont supprimées ou anonymisées.`,
            },
            {
              title: '5. Cookies utilisés',
              content: `Ce site utilise uniquement des cookies techniques essentiels :

• firebase-auth-token : Nécessaire pour l'authentification sécurisée (administrateur uniquement)
• breizh-pevele-rgpd-consent : Mémorise votre choix de consentement (stockage local, non transmis)

Aucun cookie tiers (Google Analytics, Meta Pixel, etc.) n'est installé sans votre accord explicite.`,
            },
            {
              title: '6. Vos droits (RGPD)',
              content: `Conformément au RGPD, vous disposez des droits suivants :
• Droit d'accès à vos données
• Droit de rectification
• Droit à l'effacement ("droit à l'oubli")
• Droit à la limitation du traitement
• Droit à la portabilité

Pour exercer ces droits : breizhpevele@gmail.com
Délai de réponse : 30 jours maximum.

Vous pouvez également déposer une réclamation auprès de la CNIL : https://www.cnil.fr`,
            },
            {
              title: '7. Hébergement & Sécurité',
              content: `Ce site est hébergé sur Vercel (USA) avec des garanties RGPD. La base de données utilise Firebase (Google Cloud, serveurs EU).
Toutes les communications sont chiffrées (HTTPS/TLS). L'accès administration est protégé par authentification forte (Magic Link email).`,
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
          <Link href="/" className="btn-biais btn-biais-vert" id="confidentialite-retour-btn">
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </main>
    </div>
  );
}
