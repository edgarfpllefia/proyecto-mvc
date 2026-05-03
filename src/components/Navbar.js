"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';
  const { data: session, status } = useSession();

  useEffect(() => {
    const check = () => setScrolled(window.scrollY > 60);
    check();
    window.addEventListener("scroll", check);
    return () => window.removeEventListener("scroll", check);
  }, [pathname]);

  // Transparente en home cuando: no hay scroll Y (no hay sesión O está cargando)
  const isTransparent = isHome && !scrolled && status !== 'authenticated';

  // Color del texto según fondo
  const textColor = isTransparent ? 'white' : 'var(--black)';

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
      transition: 'background-color 0.4s ease, border-color 0.4s ease',
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
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.4rem',
            fontWeight: 700,
            color: textColor,
            letterSpacing: '-0.02em',
            transition: 'color 0.4s',
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
            transition: 'color 0.4s',
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
              color: textColor,
              textDecoration: 'none',
              padding: '0.5rem 1.1rem',
              transition: 'color 0.4s',
              letterSpacing: '0.01em',
            }}>
              {label}
            </Link>
          ))}

          {session?.user?.role && session.user.role !== 'USER' && (
            <Link href="/dashboard" style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '0.95rem',
              fontWeight: 400,
              color: textColor,
              textDecoration: 'none',
              padding: '0.5rem 1.1rem',
              transition: 'color 0.4s',
            }}>
              Panel
            </Link>
          )}
        </div>

        {/* Auth */}
        <div style={{ minWidth: '120px', display: 'flex', justifyContent: 'flex-end' }}>
          {status === 'loading' ? (
            // Placeholder invisible para evitar layout shift
            <div style={{ width: '100px', height: '36px' }} />
          ) : session ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '0.9rem',
                color: isTransparent ? 'rgba(255,255,255,0.8)' : 'var(--gray-text)',
                transition: 'color 0.4s',
              }}>
                {session.user.name || session.user.email}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  backgroundColor: 'transparent',
                  border: `1px solid ${isTransparent ? 'rgba(255,255,255,0.4)' : 'var(--gray-mid)'}`,
                  color: textColor,
                  padding: '0.6rem 1.25rem',
                  fontSize: '0.85rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 500,
                  transition: 'all 0.4s',
                }}
              >
                Salir
              </button>
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </nav>
  );
}
