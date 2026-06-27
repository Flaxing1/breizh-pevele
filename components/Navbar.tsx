'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const isHome = pathname === '/';

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/nos-cours', label: 'Nos Cours' },
    { href: '/actualites', label: 'Actualités' },
    { href: '/galerie', label: 'Galerie' },
    { href: '/contact', label: 'Contact' },
  ];

  const navBg = 'bg-white shadow-md py-2.5 border-b border-slate-100';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 ${navBg}`}
      role="navigation"
      aria-label="Navigation principale"
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* Logo officiel */}
        <Link href="/" className="flex items-center" id="nav-logo" aria-label="Accueil Breizh Pévèle">
          <Image
            src="/logo.png"
            alt="Logo Breizh Pévèle - Musique / Danse"
            width={120}
            height={56}
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-7" role="list">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="relative font-montserrat font-semibold text-sm tracking-widest uppercase text-vert-breizh hover:text-jaune-fest-dark transition-colors"
                  style={{
                    color: active ? '#BA9C5A' : '#0E676D',
                    textDecoration: 'none',
                  }}
                  id={`nav-${link.label.toLowerCase().replace(/\s/g, '-')}`}
                >
                  {link.label}
                  {active && (
                    <span
                      className="absolute -bottom-1 left-0 right-0 h-0.5 rounded"
                      style={{ background: '#BA9C5A' }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
          <li>
            <a
              href="https://www.helloasso.com/associations/breizh-pevele"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-biais"
              style={{ padding: '0.6rem 1.4rem', fontSize: '0.82rem' }}
              id="nav-inscription-btn"
            >
              ✨ S&apos;inscrire
            </a>
          </li>
        </ul>

        {/* Bouton hamburger mobile */}
        <button
          className="md:hidden text-vert-breizh p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Ouvrir le menu"
          aria-expanded={menuOpen}
          id="mobile-menu-btn"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            {menuOpen
              ? <path d="M6 18L18 6M6 6l12 12" />
              : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div
          className="md:hidden border-t"
          style={{ background: 'rgba(255,255,255,0.98)', borderColor: 'rgba(0,0,0,0.06)', backdropFilter: 'blur(20px)' }}
        >
          <ul className="flex flex-col py-4 px-4 gap-1" role="list">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-3 px-4 rounded-xl font-montserrat font-semibold text-sm tracking-wide uppercase transition-colors"
                    style={{
                      color: active ? '#BA9C5A' : '#0E676D',
                      background: active ? 'rgba(14,103,109,0.08)' : 'transparent',
                      textDecoration: 'none',
                    }}
                    onClick={() => setMenuOpen(false)}
                    id={`mobile-nav-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className="mt-3 px-4">
              <a
                href="https://www.helloasso.com/associations/breizh-pevele"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-biais block text-center"
                id="mobile-inscription-btn"
              >
                ✨ S&apos;inscrire sur HelloAsso
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
