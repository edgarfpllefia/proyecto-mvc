"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      backgroundColor: 'rgba(255,255,255,0.97)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--gray-mid)',
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
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.4rem',
            fontWeight: 700,
            color: 'var(--black)',
            letterSpacing: '-0.02em',
          }}>
            CamperVan<span style={{ color: 'var(--accent)' }}>.</span>
          </span>
          <span style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--gray-text)',
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
            <Link key={href} href={href} style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '0.95rem',
              fontWeight: 400,
              color: 'var(--black)',
              textDecoration: 'none',
              padding: '0.5rem 1.1rem',
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
              color: 'var(--black)',
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
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.9rem', color: 'var(--gray-text)' }}>
                {session.user.name || session.user.email}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  backgroundColor: 'transparent',
                  border: '1px solid var(--gray-mid)',
                  color: 'var(--black)',
                  padding: '0.6rem 1.25rem',
                  fontSize: '0.85rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 500,
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
