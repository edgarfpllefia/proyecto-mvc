"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const { data: session, status } = useSession();

  return (
    <>
      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          height: 72px;
          transition: background-color 0.4s ease, border-color 0.4s ease;
          background-color: ${isHome ? 'transparent' : 'rgba(255,255,255,0.97)'};
          border-bottom: ${isHome ? '1px solid transparent' : '1px solid var(--gray-mid)'};
          backdrop-filter: ${isHome ? 'none' : 'blur(12px)'};
        }
        .navbar.scrolled {
          background-color: rgba(255,255,255,0.97) !important;
          border-bottom: 1px solid var(--gray-mid) !important;
          backdrop-filter: blur(12px) !important;
        }
        .navbar-link {
          color: ${isHome ? 'white' : 'var(--black)'};
          transition: color 0.4s;
        }
        .navbar.scrolled .navbar-link {
          color: var(--black) !important;
        }
        .navbar-logo {
          color: ${isHome ? 'white' : 'var(--black)'};
          transition: color 0.4s;
        }
        .navbar.scrolled .navbar-logo {
          color: var(--black) !important;
        }
        .navbar-tagline {
          color: ${isHome ? 'rgba(255,255,255,0.55)' : 'var(--gray-text)'};
          transition: color 0.4s;
        }
        .navbar.scrolled .navbar-tagline {
          color: var(--gray-text) !important;
        }
      `}</style>
      <style>{`
        (function() {
          function handleScroll() {
            var nav = document.querySelector('.navbar');
            if (!nav) return;
            if (window.scrollY > 60) {
              nav.classList.add('scrolled');
            } else {
              nav.classList.remove('scrolled');
            }
          }
          window.addEventListener('scroll', handleScroll);
          handleScroll();
        })();
      `}</style>

      <nav className="navbar">
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 2rem',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span className="navbar-logo" style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.4rem',
              fontWeight: 700,
              letterSpacing: '-0.02em',
            }}>
              CamperVan<span style={{ color: 'var(--accent)' }}>.</span>
            </span>
            <span className="navbar-tagline" style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginTop: '2px',
            }}>
              Alquiler & Aventura
            </span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            {[
              { href: '/', label: 'Inicio' },
              { href: '/models', label: 'Modelos' },
              { href: '/contact', label: 'Contacto' },
            ].map(({ href, label }) => (
              <Link key={href} href={href} className="navbar-link" style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '0.95rem',
                fontWeight: 400,
                textDecoration: 'none',
                padding: '0.5rem 1.1rem',
                letterSpacing: '0.01em',
              }}>
                {label}
              </Link>
            ))}

            {session?.user?.role && session.user.role !== 'USER' && (
              <Link href="/dashboard" className="navbar-link" style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '0.95rem',
                fontWeight: 400,
                textDecoration: 'none',
                padding: '0.5rem 1.1rem',
              }}>
                Panel
              </Link>
            )}
          </div>

          <div style={{ minWidth: '120px', display: 'flex', justifyContent: 'flex-end' }}>
            {status === 'loading' ? (
              <div style={{ width: '100px', height: '36px' }} />
            ) : session ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span className="navbar-link" style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '0.9rem',
                }}>
                  {session.user.name || session.user.email}
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="navbar-link"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    backgroundColor: 'transparent',
                    border: '1px solid currentColor',
                    padding: '0.6rem 1.25rem',
                    fontSize: '0.85rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 500,
                    opacity: 0.8,
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

      <script dangerouslySetInnerHTML={{ __html: `
        (function() {
          function handleScroll() {
            var nav = document.querySelector('.navbar');
            if (!nav) return;
            if (window.scrollY > 60) {
              nav.classList.add('scrolled');
            } else {
              nav.classList.remove('scrolled');
            }
          }
          window.addEventListener('scroll', handleScroll);
          handleScroll();
        })();
      `}} />
    </>
  );
}
