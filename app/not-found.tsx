import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page introuvable | Breizh Pévèle',
};

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
      style={{ background: 'linear-gradient(135deg, #0E676D 0%, #0a4f54 100%)' }}
    >
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `url('/triskel-bg.svg')`, backgroundSize: '300px', backgroundRepeat: 'repeat' }} />
      <div className="relative z-10 max-w-lg">
        <div className="relative w-24 h-24 mx-auto mb-6">
          <Image src="/logo-white.png" alt="Breizh Pévèle" fill className="object-contain" />
        </div>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 900, fontSize: '6rem', color: 'rgba(255,255,255,0.15)', lineHeight: 1 }}>
          404
        </p>
        <h1 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 900, fontSize: '1.8rem', color: 'white', margin: '0.5rem 0 1rem' }}>
          Page introuvable
        </h1>
        <p style={{ fontFamily: 'var(--font-opensans)', fontSize: '1rem', color: 'rgba(255,255,255,0.8)', marginBottom: '2.5rem', lineHeight: 1.7 }}>
          Cette page n&apos;existe pas ou a été déplacée.<br />
          Retournez à l&apos;accueil pour reprendre la ronde !
        </p>
        <Link
          href="/"
          style={{
            display: 'inline-block',
            background: 'white',
            color: '#0E676D',
            fontFamily: 'var(--font-montserrat)',
            fontWeight: 800,
            fontSize: '0.95rem',
            padding: '0.9rem 2.5rem',
            borderRadius: '0.75rem',
            textDecoration: 'none',
            letterSpacing: '0.05em',
          }}
        >
          ← Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
