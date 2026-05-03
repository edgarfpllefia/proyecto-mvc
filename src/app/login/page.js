"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Email o contraseña incorrectos");
    } else {
      router.push("/");
      router.refresh();
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '0.9rem 1rem',
    border: '1px solid var(--gray-mid)',
    borderRadius: '8px',
    backgroundColor: 'var(--gray-light)',
    fontSize: '1rem',
    fontFamily: "'Outfit', sans-serif",
    outline: 'none',
    color: 'var(--black)',
    fontWeight: 300,
  };

  return (
    <div style={{ paddingTop: '72px', minHeight: '100vh', backgroundColor: 'var(--gray-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>

        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, color: 'var(--black)' }}>
              CamperVan<span style={{ color: 'var(--accent)' }}>.</span>
            </span>
          </Link>
          <p style={{ fontFamily: "'Outfit', sans-serif", color: 'var(--gray-text)', marginTop: '0.5rem', fontSize: '1rem' }}>
            Inicia sesión en tu cuenta
          </p>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '2.5rem', boxShadow: '0 8px 30px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

              <div>
                <label style={{ display: 'block', fontFamily: "'Outfit', sans-serif", fontSize: '1rem', fontWeight: 500, color: 'var(--black)', marginBottom: '0.5rem' }}>Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="tu@email.com"
                  style={inputStyle}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: "'Outfit', sans-serif", fontSize: '1rem', fontWeight: 500, color: 'var(--black)', marginBottom: '0.5rem' }}>Contraseña</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  style={inputStyle}
                  required
                />
              </div>

              {error && (
                <p style={{ fontFamily: "'Outfit', sans-serif", color: 'var(--accent)', fontSize: '0.9rem', textAlign: 'center' }}>{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  backgroundColor: loading ? 'var(--gray-text)' : 'var(--accent)',
                  color: 'white',
                  padding: '1rem',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 500,
                  fontFamily: "'Outfit', sans-serif",
                  cursor: loading ? 'not-allowed' : 'pointer',
                  width: '100%',
                  marginTop: '0.5rem',
                }}
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
              </button>
            </div>
          </form>

          <p style={{ fontFamily: "'Outfit', sans-serif", textAlign: 'center', marginTop: '1.5rem', fontSize: '0.95rem', color: 'var(--gray-text)' }}>
            ¿No tienes cuenta?{' '}
            <Link href="/register" style={{ color: 'var(--accent)', fontWeight: 500, textDecoration: 'none' }}>
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
