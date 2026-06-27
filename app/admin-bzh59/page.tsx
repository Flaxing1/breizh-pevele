'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AdminLoginPage() {
  const router = useRouter();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulation d'un délai réseau (sécurité anti-brute-force)
    await new Promise((r) => setTimeout(r, 700));

    // Vérification des identifiants
    if (id === 'breizhpevele' && password === 'Breizh2026@') {
      // Stocker la session côté client
      sessionStorage.setItem('admin_auth', 'authenticated');
      sessionStorage.setItem('admin_user', id);
      router.push('/admin-bzh59/dashboard');
    } else {
      setError('Identifiant ou mot de passe incorrect.');
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0f1117 0%, #0a2a2c 50%, #0f1117 100%)' }}
    >
      {/* Fond triskel */}
      <div
        className="absolute inset-0 opacity-3"
        style={{ backgroundImage: `url('/triskel-bg.svg')`, backgroundSize: '250px', backgroundRepeat: 'repeat' }}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(14,103,109,0.15) 0%, transparent 70%)' }} />

      <div className="relative z-10 w-full max-w-md mx-auto px-5">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="relative h-14 w-56 mx-auto mb-3">
            <Image
              src="/logo.png"
              alt="Breizh Pévèle"
              fill
              className="object-contain"
              priority
            />
          </div>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>
            Administration
          </p>
        </div>

        {/* Card login */}
        <div
          className="rounded-2xl p-8"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)' }}
        >
          <h1 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800, fontSize: '1.3rem', color: 'white', marginBottom: '0.4rem' }}>
            Accès Administrateur
          </h1>
          <p style={{ fontFamily: 'var(--font-opensans)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', marginBottom: '2rem' }}>
            Entrez vos identifiants pour accéder au tableau de bord.
          </p>

          <form onSubmit={handleLogin} id="admin-login-form">
            {/* Identifiant */}
            <div className="mb-4">
              <label
                htmlFor="admin-id-input"
                style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.72rem', fontWeight: 700, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}
              >
                Identifiant
              </label>
              <input
                id="admin-id-input"
                type="text"
                autoComplete="username"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="Votre identifiant"
                required
                className="w-full px-4 py-3.5 rounded-xl text-white text-sm transition-all"
                style={{ background: 'rgba(255,255,255,0.07)', border: `1px solid ${error ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.12)'}`, fontFamily: 'var(--font-opensans)', outline: 'none' }}
                onFocus={(e) => e.target.style.borderColor = '#0E676D'}
                onBlur={(e) => e.target.style.borderColor = error ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.12)'}
              />
            </div>

            {/* Mot de passe */}
            <div className="mb-6 relative">
              <label
                htmlFor="admin-password-input"
                style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.72rem', fontWeight: 700, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}
              >
                Mot de passe
              </label>
              <div className="relative">
                <input
                  id="admin-password-input"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Votre mot de passe"
                  required
                  className="w-full px-4 py-3.5 rounded-xl text-white text-sm transition-all pr-12"
                  style={{ background: 'rgba(255,255,255,0.07)', border: `1px solid ${error ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.12)'}`, fontFamily: 'var(--font-opensans)', outline: 'none' }}
                  onFocus={(e) => e.target.style.borderColor = '#0E676D'}
                  onBlur={(e) => e.target.style.borderColor = error ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.12)'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)' }}
                  aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  id="toggle-password-btn"
                >
                  {showPassword
                    ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
            </div>

            {/* Message d'erreur */}
            {error && (
              <div
                className="flex items-center gap-2 mb-4 px-4 py-3 rounded-xl"
                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                <p style={{ fontFamily: 'var(--font-opensans)', fontSize: '0.82rem', color: '#ef4444' }}>
                  {error}
                </p>
              </div>
            )}

            {/* Bouton de connexion */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-sm transition-all relative overflow-hidden"
              style={{ background: loading ? 'rgba(14,103,109,0.5)' : '#0E676D', color: 'white', fontFamily: 'var(--font-montserrat)', fontSize: '0.9rem', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', letterSpacing: '0.05em' }}
              id="admin-login-submit"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Vérification...
                </span>
              ) : 'Se connecter'}
            </button>
          </form>
        </div>

        {/* Lien retour site */}
        <div className="text-center mt-6">
          <a
            href="/"
            style={{ fontFamily: 'var(--font-opensans)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}
            id="admin-back-site-link"
          >
            ← Retour au site
          </a>
        </div>
      </div>
    </div>
  );
}
