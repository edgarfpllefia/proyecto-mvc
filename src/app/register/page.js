"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error);
    } else {
      router.push("/login?registered=true");
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
            Crea tu cuenta gratuita
          </p>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '2.5rem', boxShadow: '0 8px 30px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

              {[
                { key: 'name', label: 'Nombre', type: 'text', placeholder: 'Tu nombre' },
                { key: 'email', label: 'Email', type: 'email', placeholder: 'tu@email.com' },
                { key: 'password', label: 'Contraseña', type: 'password', placeholder: '••••••••' },
              ].map(({ key, label, type, placeholder }) => (
                <div key={key}>
                  <label style={{ display: 'block', fontFamily: "'Outfit', sans-serif", fontSize: '1rem', fontWeight: 500, color: 'var(--black)', marginBottom: '0.5rem' }}>{label}</label>
                  <input
                    type={type}
                    value={form[key]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    placeholder={placeholder}
                    style={inputStyle}
                    required
                  />
                </div>
              ))}

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
                {loading ? 'Creando cuenta...' : 'Crear cuenta'}
              </button>
            </div>
          </form>

          <p style={{ fontFamily: "'Outfit', sans-serif", textAlign: 'center', marginTop: '1.5rem', fontSize: '0.95rem', color: 'var(--gray-text)' }}>
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" style={{ color: 'var(--accent)', fontWeight: 500, textDecoration: 'none' }}>
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
