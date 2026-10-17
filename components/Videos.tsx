import Link from 'next/link';

const VIDEOS = [
  {
    src: '/videos/breizh-pevele-video-1.mp4',
    poster: '/videos/breizh-pevele-video-1-poster.jpg',
    title: 'La ronde en musique',
    desc: 'Guitare, cornemuse et danseurs : l’ambiance d’un samedi après-midi à Orchies.',
  },
  {
    src: '/videos/breizh-pevele-video-2.mp4',
    poster: '/videos/breizh-pevele-video-2-poster.jpg',
    title: 'Les couples en danse',
    desc: 'Des pas simples, des sourires et des musiciens en direct. Venez essayer !',
  },
  {
    src: '/videos/breizh-pevele-video-3.mp4',
    poster: '/videos/breizh-pevele-video-3-poster.jpg',
    title: 'Tous ensemble, en ligne',
    desc: 'Débutants ou confirmés : on apprend et on danse ensemble.',
  },
];

export default function Videos({ dark = false }: { dark?: boolean }) {
  return (
    <section className="py-20" style={{ background: dark ? '#1A1A1A' : '#f5f3f0' }} aria-labelledby="videos-heading" id={dark ? 'galerie-videos' : 'home-videos'}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <div
            className="inline-block px-4 py-1.5 rounded-full mb-4"
            style={{ background: 'rgba(14,103,109,0.1)', fontFamily: 'var(--font-montserrat)', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.14em', color: '#0E676D', textTransform: 'uppercase' }}
          >
            🎬 En vidéo
          </div>
          <h2
            id="videos-heading"
            style={{ fontFamily: 'var(--font-montserrat)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, color: dark ? 'white' : '#1A1A1A', marginBottom: '0.75rem' }}
          >
            Venez voir <span style={{ color: dark ? '#BA9C5A' : '#0E676D' }}>comment ça se passe</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-opensans)', fontSize: '1.05rem', color: dark ? 'rgba(255,255,255,0.75)' : '#4a4a4a', maxWidth: '520px', margin: '0 auto' }}>
            Un aperçu de nos cours du samedi à Orchies. Le premier cours est gratuit !
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {VIDEOS.map((v, i) => (
            <figure
              key={v.src}
              className="rounded-2xl overflow-hidden"
              style={{ background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.07)', margin: 0 }}
            >
              <video
                controls
                playsInline
                preload="none"
                poster={v.poster}
                style={{ width: '100%', aspectRatio: '16/9', background: '#000', display: 'block' }}
                id={`home-video-${i + 1}`}
              >
                <source src={v.src} type="video/mp4" />
                Votre navigateur ne peut pas lire cette vidéo.
              </video>
              <figcaption className="p-5">
                <h3 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800, fontSize: '1rem', color: '#1A1A1A', marginBottom: '0.4rem' }}>
                  {v.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-opensans)', fontSize: '0.85rem', color: '#4a4a4a', lineHeight: 1.65, margin: 0 }}>
                  {v.desc}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/nos-cours" className="btn-biais btn-biais-vert" style={{ fontSize: '0.9rem', padding: '0.8rem 1.8rem' }} id="home-videos-cours">
            Voir les cours →
          </Link>
        </div>
      </div>
    </section>
  );
}
