import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ModelsPage() {
  const models = await prisma.camperModel.findMany({
    orderBy: { createdAt: "asc" },
  });

  return (
    <div style={{ paddingTop: '72px' }}>
      <div style={{ backgroundColor: 'var(--dark-bg)', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1rem', fontWeight: 500 }}>Nuestra flota</p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'white', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
            Modelos disponibles
          </h1>
          <p style={{ fontFamily: "'Outfit', sans-serif", color: 'rgba(255,255,255,0.45)', fontSize: '1.1rem', maxWidth: '500px', lineHeight: 1.7, fontWeight: 300 }}>
            Cada furgoneta está equipada y revisada para que tu viaje sea perfecto desde el primer kilómetro.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '5rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {models.map((model) => (
            <Link key={model.id} href={`/models/${model.id}`} style={{ textDecoration: 'none' }}>
              <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 8px 30px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06)',
                border: '1px solid rgba(0,0,0,0.06)',
              }}>
                <div style={{ aspectRatio: '16/9', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={model.imageUrl || '/images/photo-1634109725557-d2b8ac9f6c5c.avif'}
                    alt={model.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)' }} />
                  <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem', right: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', color: 'white' }}>
                      {model.name}
                    </h2>
                    <span style={{ fontFamily: "'Outfit', sans-serif", backgroundColor: 'var(--accent)', color: 'white', padding: '0.3rem 0.75rem', fontSize: '1rem', fontWeight: 600, borderRadius: '4px' }}>
                      {model.price}€/día
                    </span>
                  </div>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <p style={{ fontFamily: "'Outfit', sans-serif", color: 'var(--gray-text)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.25rem', fontWeight: 300 }}>
                    {model.description}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--gray-light)' }}>
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1rem', color: 'var(--gray-text)' }}>{model.seats} plazas</span>
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1rem', color: 'var(--accent)', fontWeight: 600 }}>Ver detalle</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
