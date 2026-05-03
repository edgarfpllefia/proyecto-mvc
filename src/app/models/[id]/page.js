import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import CommentSection from "@/components/CommentSection";

export const dynamic = "force-dynamic";

export default async function ModelDetailPage({ params }) {
  const { id } = await params;

  const model = await prisma.camperModel.findUnique({
    where: { id },
    include: {
      comments: {
        include: { user: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!model) notFound();

  return (
    <div style={{ paddingTop: '72px' }}>

      {/* Header */}
      <div style={{ backgroundColor: 'var(--dark-bg)', padding: '3rem 2rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <Link href="/models" style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '0.85rem',
            color: 'rgba(255,255,255,0.45)',
            textDecoration: 'none',
            letterSpacing: '0.05em',
          }}>
            ← Volver a modelos
          </Link>
        </div>
      </div>

      {/* Contenido */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>

          {/* Imagen */}
          <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06)' }}>
            <img
              src={model.imageUrl || '/images/photo-1634109725557-d2b8ac9f6c5c.avif'}
              alt={model.name}
              style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }}
            />
            <div style={{
              backgroundColor: 'var(--accent)',
              padding: '1.25rem 2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <span style={{ fontFamily: "'Outfit', sans-serif", color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Precio por día
              </span>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: 'white' }}>
                {model.price}€
              </span>
            </div>
          </div>

          {/* Info */}
          <div>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1rem', fontWeight: 500 }}>
              Ficha técnica
            </p>
            <h1 style={{ fontSize: 'clamp(2rem, 3vw, 3rem)', color: 'var(--black)', letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
              {model.name}
            </h1>
            <p style={{ fontFamily: "'Outfit', sans-serif", color: 'var(--gray-text)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2.5rem', fontWeight: 300 }}>
              {model.description}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2.5rem' }}>
              {[
                { label: 'Plazas', value: model.seats },
                { label: 'Precio/día', value: `${model.price}€` },
              ].map(({ label, value }) => (
                <div key={label} style={{ backgroundColor: 'var(--gray-light)', borderRadius: '10px', padding: '1.25rem 1.5rem' }}>
                  <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.4rem', fontWeight: 500 }}>{label}</p>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', color: 'var(--black)' }}>{value}</p>
                </div>
              ))}
            </div>

            <Link href="/contact" style={{
              fontFamily: "'Outfit', sans-serif",
              display: 'inline-block',
              backgroundColor: 'var(--accent)',
              color: 'white',
              padding: '1rem 2.5rem',
              textDecoration: 'none',
              fontSize: '1rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontWeight: 500,
              borderRadius: '8px',
            }}>
              Solicitar información
            </Link>
          </div>
        </div>

        {/* Sección de comentarios — componente cliente */}
        <CommentSection modelId={model.id} comments={model.comments} />
      </div>
    </div>
  );
}
