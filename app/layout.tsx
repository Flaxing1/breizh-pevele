import type { Metadata } from 'next';
import { Montserrat, Open_Sans } from 'next/font/google';
import './globals.css';
import RGPDBanner from '@/components/RGPDBanner';
import PromoBanner from '@/components/PromoBanner';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-opensans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://breizh-pevele.vercel.app'),
  title: {
    default: 'Breizh Pevele | Danse & Musique Bretonne à Orchies (59)',
    template: '%s | Breizh Pevele',
  },
  description:
    "Cours de danse bretonne et musique celtique tous les samedis à Orchies (Nord). Rejoignez l'association Breizh Pevele pour découvrir le Fest-Noz et la culture bretonne en Pévèle !",
  keywords: [
    'danse bretonne Orchies',
    'fest-noz Orchies',
    'musique celtique Pévèle',
    'cours danse bretonne Nord',
    'association bretonne Orchies 59',
    'Breizh Pevele',
    'Salle Marypomme Orchies',
  ],
  authors: [{ name: 'Breizh Pevele' }],
  creator: 'Breizh Pevele',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://breizh-pevele.vercel.app',
    siteName: 'Breizh Pevele',
    title: 'Breizh Pevele | Danse & Musique Bretonne à Orchies',
    description: "L'association de danse et musique bretonne d'Orchies. Rejoignez la ronde !",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Breizh Pevele - Danse bretonne à Orchies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Breizh Pevele | Danse bretonne à Orchies',
    description: "Cours de danse bretonne tous les samedis à Orchies (59310)",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  verification: {
    google: 'qGbBzlcFYBI1BgKTrvjLZLU5NEKstMRimK1nCAat_IU',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${montserrat.variable} ${openSans.variable}`}>
      <body>
        <PromoBanner />
        {children}
        <RGPDBanner />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
