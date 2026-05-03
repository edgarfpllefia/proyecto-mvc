"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewModelPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", description: "", seats: "", price: "", imageUrl: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/models", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, seats: parseInt(form.seats), price: parseFloat(form.price) }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error);
    } else {
      router.push("/dashboard/models");
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
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/dashboard/models" style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.85rem', color: 'var(--gray-text)', textDecoration: 'none' }}>← Volver</Link>
        <h1 style={{ fontSize: '2rem', color: 'var(--black)', letterSpacing: '-0.02em', marginTop: '0.5rem' }}>Nuevo modelo</h1>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid var(--gray-mid)', padding: '2.5rem', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {[
              { key: 'name', label: 'Nombre', type: 'text', placeholder: 'Adventure Van XL' },
              { key: 'seats', label: 'Plazas', type: 'number', placeholder: '4' },
              { key: 'price', label: 'Precio por día (€)', type: 'number', placeholder: '89' },
              { key: 'imageUrl', label: 'URL de imagen', type: 'text', placeholder: '/images/mi-camper.jpg' },
            ].map(({ key, label, type, placeholder }) => (
              <div key={key}>
                <label style={{ display: 'block', fontFamily: "'Outfit', sans-serif", fontSize: '1rem', fontWeight: 500, color: 'var(--black)', marginBottom: '0.5rem' }}>{label}</label>
                <input type={type} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} placeholder={placeholder} style={inputStyle} required />
              </div>
            ))}

            <div>
              <label style={{ display: 'block', fontFamily: "'Outfit', sans-serif", fontSize: '1rem', fontWeight: 500, color: 'var(--black)', marginBottom: '0.5rem' }}>Descripción</label>
              <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Describe la camper..." rows={4} style={{ ...inputStyle, resize: 'vertical' }} required />
            </div>

            {error && <p style={{ fontFamily: "'Outfit', sans-serif", color: 'var(--accent)', fontSize: '0.9rem' }}>{error}</p>}

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" disabled={loading} style={{
                fontFamily: "'Outfit', sans-serif",
                backgroundColor: loading ? 'var(--gray-text)' : 'var(--accent)',
                color: 'white', padding: '1rem 2rem', border: 'none', borderRadius: '8px',
                fontSize: '1rem', fontWeight: 500, cursor: loading ? 'not-allowed' : 'pointer',
              }}>
                {loading ? 'Guardando...' : 'Crear modelo'}
              </button>
              <Link href="/dashboard/models" style={{
                fontFamily: "'Outfit', sans-serif",
                backgroundColor: 'var(--gray-light)', color: 'var(--black)', padding: '1rem 2rem',
                textDecoration: 'none', fontSize: '1rem', fontWeight: 500, borderRadius: '8px',
                border: '1px solid var(--gray-mid)',
              }}>
                Cancelar
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
