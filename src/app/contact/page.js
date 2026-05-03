"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = "El nombre es obligatorio";
    if (!form.email.trim()) errs.email = "El email es obligatorio";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Email no válido";
    if (!form.message.trim()) errs.message = "El mensaje es obligatorio";
    else if (form.message.trim().length < 10) errs.message = "El mensaje debe tener al menos 10 caracteres";
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { setStatus("success"); setForm({ name: "", email: "", message: "" }); }
      else setStatus("error");
    } catch { setStatus("error"); }
  }

  const inputStyle = (field) => ({
    width: '100%',
    padding: '0.9rem 1rem',
    border: `1px solid ${errors[field] ? 'var(--accent)' : 'var(--gray-mid)'}`,
    borderRadius: '8px',
    backgroundColor: 'var(--gray-light)',
    fontSize: '1rem',
    fontFamily: "'Outfit', sans-serif",
    outline: 'none',
    color: 'var(--black)',
    fontWeight: 300,
  });

  return (
    <div style={{ paddingTop: '72px' }}>
      <div style={{ backgroundColor: 'var(--dark-bg)', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1rem', fontWeight: 500 }}>Contacto</p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'white', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
            Hablemos de tu próximo viaje
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1.1rem', maxWidth: '500px', lineHeight: 1.7, fontWeight: 300 }}>
            ¿Tienes dudas sobre disponibilidad o precios? Te respondemos en menos de 24 horas.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '5rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '5rem', alignItems: 'start' }}>

          <div>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--black)', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
              Estamos aquí para ayudarte
            </h2>
            <p style={{ color: 'var(--gray-text)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2.5rem', fontWeight: 300 }}>
              Rellena el formulario y te respondemos lo antes posible. También puedes contactarnos directamente por teléfono o email.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[
                { label: 'Email', value: 'hola@campervaneco.com' },
                { label: 'Teléfono', value: '+34 900 123 456' },
                { label: 'Oficina', value: 'Barcelona, España' },
              ].map(({ label, value }) => (
                <div key={label} style={{ padding: '1.25rem 1.5rem', backgroundColor: 'var(--gray-light)', borderRadius: '10px' }}>
                  <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.3rem', fontWeight: 500 }}>{label}</p>
                  <p style={{ fontSize: '1.05rem', color: 'var(--black)', fontWeight: 400 }}>{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ backgroundColor: 'white', padding: '2.5rem', borderRadius: '16px', border: '1px solid var(--gray-mid)' }}>
            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                <h3 style={{ fontSize: '1.5rem', color: 'var(--black)', marginBottom: '0.75rem' }}>¡Mensaje enviado!</h3>
                <p style={{ color: 'var(--gray-text)', fontSize: '1.05rem' }}>Te responderemos en menos de 24 horas.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {[
                    { key: 'name', label: 'Nombre', type: 'text', placeholder: 'Tu nombre' },
                    { key: 'email', label: 'Email', type: 'email', placeholder: 'tu@email.com' },
                  ].map(({ key, label, type, placeholder }) => (
                    <div key={key}>
                      <label style={{ display: 'block', fontSize: '1rem', fontWeight: 500, color: 'var(--black)', marginBottom: '0.5rem' }}>{label}</label>
                      <input type={type} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} placeholder={placeholder} style={inputStyle(key)} />
                      {errors[key] && <p style={{ color: 'var(--accent)', fontSize: '0.9rem', marginTop: '0.4rem' }}>{errors[key]}</p>}
                    </div>
                  ))}

                  <div>
                    <label style={{ display: 'block', fontSize: '1rem', fontWeight: 500, color: 'var(--black)', marginBottom: '0.5rem' }}>Mensaje</label>
                    <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Cuéntanos qué necesitas..." rows={5} style={{ ...inputStyle('message'), resize: 'vertical' }} />
                    {errors.message && <p style={{ color: 'var(--accent)', fontSize: '0.9rem', marginTop: '0.4rem' }}>{errors.message}</p>}
                  </div>

                  {status === 'error' && <p style={{ color: 'var(--accent)', fontSize: '1rem', textAlign: 'center' }}>Ha ocurrido un error. Inténtalo de nuevo.</p>}

                  <button type="submit" disabled={status === 'loading'} style={{
                    backgroundColor: status === 'loading' ? 'var(--gray-text)' : 'var(--accent)',
                    color: 'white', padding: '1rem', border: 'none', borderRadius: '8px',
                    fontSize: '1rem', fontWeight: 500, fontFamily: "'Outfit', sans-serif",
                    cursor: status === 'loading' ? 'not-allowed' : 'pointer', width: '100%',
                  }}>
                    {status === 'loading' ? 'Enviando...' : 'Enviar mensaje'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
