import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import Link from "next/link";
import DeleteModelButton from "@/components/DeleteModelButton";

export const dynamic = "force-dynamic";

export default async function DashboardModelsPage() {
  const session = await auth();
  const models = await prisma.camperModel.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.5rem', fontWeight: 500 }}>Gestión</p>
          <h1 style={{ fontSize: '2rem', color: 'var(--black)', letterSpacing: '-0.02em' }}>Modelos</h1>
        </div>
        <Link href="/dashboard/models/new" style={{
          fontFamily: "'Outfit', sans-serif",
          backgroundColor: 'var(--accent)',
          color: 'white',
          padding: '0.75rem 1.5rem',
          textDecoration: 'none',
          fontSize: '0.95rem',
          fontWeight: 500,
          borderRadius: '8px',
        }}>
          + Nuevo modelo
        </Link>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {models.map((model) => (
          <div key={model.id} style={{
            backgroundColor: 'white',
            border: '1px solid var(--gray-mid)',
            borderRadius: '12px',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}>
            {/* Imagen miniatura */}
            <div style={{ width: '80px', height: '60px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
              <img
                src={model.imageUrl || '/images/photo-1634109725557-d2b8ac9f6c5c.avif'}
                alt={model.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Info */}
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: 'var(--black)', marginBottom: '0.25rem' }}>{model.name}</p>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.9rem', color: 'var(--gray-text)' }}>{model.seats} plazas · {model.price}€/día</p>
            </div>

            {/* Acciones */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Link href={`/dashboard/models/${model.id}/edit`} style={{
                fontFamily: "'Outfit', sans-serif",
                backgroundColor: 'var(--gray-light)',
                color: 'var(--black)',
                padding: '0.6rem 1.25rem',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                borderRadius: '6px',
                border: '1px solid var(--gray-mid)',
              }}>
                Editar
              </Link>
              <DeleteModelButton id={model.id} name={model.name} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
