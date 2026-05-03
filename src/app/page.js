import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const models = await prisma.camperModel.findMany({
    orderBy: { createdAt: "asc" },
    take: 3,
  });

  return (
    <div>
      {/* HERO */}
      <section style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: "url('/images/photo-1583552188815-a6ac02ab3469.avif')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.45)',
        }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', width: '100%' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1.5rem', fontWeight: 500 }}>
            Alquiler de furgonetas camper
          </p>
          <h1 style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', lineHeight: 1.0, color: 'white', marginBottom: '2rem', letterSpacing: '-0.04em', maxWidth: '750px' }}>
            La carretera te espera.
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, marginBottom: '3rem', maxWidth: '400px', fontWeight: 300 }}>
            Flota moderna equipada para que solo pienses en disfrutar del viaje.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '5rem' }}>
            <Link href="/models" style={{ backgroundColor: 'var(--accent)', color: 'white', padding: '1rem 2.5rem', textDecoration: 'none', fontSize: '1rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500, borderRadius: '6px' }}>
              Ver modelos
            </Link>
            <Link href="/contact" style={{ border: '1px solid rgba(255,255,255,0.35)', color: 'white', padding: '1rem 2.5rem', textDecoration: 'none', fontSize: '1rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 400, borderRadius: '6px' }}>
              Contactar
            </Link>
          </div>
          <div style={{ display: 'flex', gap: '3rem', paddingTop: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.12)' }}>
            {[
              { number: '+500', label: 'Viajes realizados' },
              { number: '12', label: 'Modelos disponibles' },
              { number: '24h', label: 'Atención al cliente' },
            ].map(({ number, label }) => (
              <div key={label}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: 'white', lineHeight: 1, marginBottom: '0.4rem' }}>{number}</p>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODELOS DESTACADOS */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '7rem 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem' }}>
          <div>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.75rem', fontWeight: 500 }}>Nuestra flota</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: 'var(--black)', letterSpacing: '-0.03em' }}>Modelos destacados</h2>
          </div>
          <Link href="/models" style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1rem', color: 'var(--black)', textDecoration: 'none', fontWeight: 500, borderBottom: '1px solid var(--gray-mid)', paddingBottom: '2px' }}>
            Ver todos
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {models.map((model) => (
            <Link key={model.id} href={`/models/${model.id}`} style={{ textDecoration: 'none' }}>
              <div style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.06)' }}>
                <div style={{ aspectRatio: '3/2', overflow: 'hidden', position: 'relative' }}>
                  <img src={model.imageUrl || '/images/photo-1634109725557-d2b8ac9f6c5c.avif'} alt={model.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)' }} />
                  <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem', right: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', color: 'white' }}>{model.name}</h3>
                    <span style={{ fontFamily: "'Outfit', sans-serif", backgroundColor: 'var(--accent)', color: 'white', padding: '0.3rem 0.75rem', fontSize: '1rem', fontWeight: 600, borderRadius: '4px' }}>{model.price}€/día</span>
                  </div>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <p style={{ fontFamily: "'Outfit', sans-serif", color: 'var(--gray-text)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.25rem', fontWeight: 300 }}>{model.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--gray-light)' }}>
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1rem', color: 'var(--gray-text)' }}>{model.seats} plazas</span>
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1rem', color: 'var(--accent)', fontWeight: 600 }}>Ver detalle</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* POR QUÉ ELEGIRNOS */}
      <section style={{ backgroundColor: 'var(--dark-bg)', padding: '7rem 2rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
            <div>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '1.5rem' }}>Por qué elegirnos</p>
              <h2 style={{ fontSize: 'clamp(2rem, 3vw, 3rem)', color: 'white', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '2rem' }}>
                Diseñado para los que viajan de verdad.
              </h2>
              <p style={{ fontFamily: "'Outfit', sans-serif", color: 'rgba(255,255,255,0.5)', fontSize: '1.05rem', lineHeight: 1.9, marginBottom: '2.5rem', fontWeight: 300 }}>
                Llevamos años ayudando a viajeros a encontrar su camper perfecta. Fiabilidad, comodidad y atención real cuando la necesitas.
              </p>
              <Link href="/models" style={{ fontFamily: "'Outfit', sans-serif", display: 'inline-block', backgroundColor: 'var(--accent)', color: 'white', padding: '0.9rem 2rem', textDecoration: 'none', fontSize: '1rem', letterSpacing: '0.08em', textTransform: 'uppercase', borderRadius: '6px', fontWeight: 500 }}>
                Explorar flota
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '20px', padding: '0.75rem', boxShadow: '0 30px 70px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.07)' }}>
              {[
                { num: '01', title: 'Flota moderna', desc: 'Vehículos del año revisados antes de cada alquiler. Sin sorpresas en ruta.' },
                { num: '02', title: 'Recogida flexible', desc: 'Recoge y devuelve donde más te convenga, en puntos de toda la península.' },
                { num: '03', title: 'Seguro a todo riesgo', desc: 'Cobertura completa incluida en cada reserva. Viaja sin preocupaciones.' },
                { num: '04', title: 'Atención 24h', desc: 'Equipo disponible en todo momento para cualquier imprevisto durante el viaje.' },
              ].map(({ num, title, desc }) => (
                <div key={num} style={{ backgroundColor: '#1e1e1e', borderRadius: '12px', padding: '1.5rem 1.75rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1rem', color: 'var(--accent)', minWidth: '2rem', paddingTop: '2px', fontWeight: 600 }}>{num}</span>
                  <div>
                    <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.05rem', color: 'white', fontWeight: 500, marginBottom: '0.35rem' }}>{title}</p>
                    <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, fontWeight: 300 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA IMAGEN */}
      <section style={{ position: 'relative', height: '520px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('/images/fabio-sasso-N8aHmU_hw9Y-unsplash.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.35)' }} />
        <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1.5rem' }}>Reserva ahora</p>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: 'white', marginBottom: '1.5rem', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            ¿Listo para tu próxima aventura?
          </h2>
          <p style={{ fontFamily: "'Outfit', sans-serif", color: 'rgba(255,255,255,0.6)', marginBottom: '3rem', fontSize: '1.1rem', maxWidth: '400px', lineHeight: 1.7, fontWeight: 300 }}>
            Consulta nuestra flota y encuentra la camper ideal para ti.
          </p>
          <Link href="/models" style={{ fontFamily: "'Outfit', sans-serif", backgroundColor: 'var(--accent)', color: 'white', padding: '1.1rem 3rem', textDecoration: 'none', fontSize: '1rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500, borderRadius: '6px' }}>
            Ver modelos disponibles
          </Link>
        </div>
      </section>
    </div>
  );
}
