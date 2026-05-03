"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    // Resetear al cambiar de página
    setScrolled(window.scrollY > 60);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // En home: transparente hasta scroll. En otras páginas: siempre blanco
  const isTransparent = isHome && !scrolled;

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      backgroundColor: isTransparent ? 'transparent' : 'rgba(255,255,255,0.97)',
      backdropFilter: isTransparent ? 'none' : 'blur(12px)',
      borderBottom: isTransparent ? '1px solid transparent' : '1px solid var(--gray-mid)',
      transition: 'all 0.3s ease',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 2rem',
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link href="/" style={{
          textDecoration: 'none',
          display: 'flex',
          flexDirection: 'column',
          lineHeight: 1,
        }}>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.4rem',
            fontWeight: 700,
            color: isTransparent ? 'white' : 'var(--black)',
            letterSpacing: '-0.02em',
            transition: 'color 0.3s',
          }}>
            CamperVan<span style={{ color: 'var(--accent)' }}>.</span>
          </span>
          <span style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: isTransparent ? 'rgba(255,255,255,0.55)' : 'var(--gray-text)',
            marginTop: '2px',
            transition: 'color 0.3s',
          }}>
            Alquiler & Aventura
          </span>
        </Link>

        {/* Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          {[
            { href: '/', label: 'Inicio' },
            { href: '/models', label: 'Modelos' },
            { href: '/contact', label: 'Contacto' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '0.95rem',
              fontWeight: 400,
              color: isTransparent ? 'white' : 'var(--black)',
              textDecoration: 'none',
              padding: '0.5rem 1.1rem',
              transition: 'color 0.3s',
              letterSpacing: '0.01em',
            }}>
              {label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link href="/login" style={{
          fontFamily: "'Outfit', sans-serif",
          backgroundColor: 'var(--accent)',
          color: 'white',
          padding: '0.65rem 1.5rem',
          textDecoration: 'none',
          fontSize: '0.88rem',
          fontWeight: 500,
          borderRadius: '6px',
          letterSpacing: '0.02em',
        }}>
          Acceder
        </Link>
      </div>
    </nav>
  );
}
