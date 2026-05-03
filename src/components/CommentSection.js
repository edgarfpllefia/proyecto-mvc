"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CommentSection({ modelId, comments: initialComments }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState(initialComments);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    setError(null);

    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ modelId, content }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error);
    } else {
      setContent("");
      setComments([data.comment, ...comments]);
      router.refresh();
    }
  }

  return (
    <div style={{ marginTop: '5rem', paddingTop: '4rem', borderTop: '1px solid var(--gray-mid)' }}>
      <h2 style={{ fontSize: '1.8rem', color: 'var(--black)', marginBottom: '2rem', letterSpacing: '-0.02em' }}>
        Comentarios ({comments.length})
      </h2>

      {/* Lista de comentarios */}
      {comments.length === 0 ? (
        <div style={{ backgroundColor: 'var(--gray-light)', borderRadius: '12px', padding: '3rem', textAlign: 'center', marginBottom: '2rem' }}>
          <p style={{ fontFamily: "'Outfit', sans-serif", color: 'var(--gray-text)', fontSize: '1rem' }}>
            Sé el primero en comentar este modelo.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          {comments.map((comment) => (
            <div key={comment.id} style={{
              backgroundColor: 'white',
              border: '1px solid var(--gray-mid)',
              borderRadius: '12px',
              padding: '1.5rem 2rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: '1rem', color: 'var(--black)' }}>
                  {comment.user?.name || comment.user?.email || 'Usuario'}
                </span>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.85rem', color: 'var(--gray-text)' }}>
                  {new Date(comment.createdAt).toLocaleDateString('es-ES')}
                </span>
              </div>
              <p style={{ fontFamily: "'Outfit', sans-serif", color: 'var(--gray-text)', lineHeight: 1.7, fontSize: '1rem', fontWeight: 300 }}>
                {comment.content}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Formulario o prompt de login */}
      {session ? (
        <div style={{ backgroundColor: 'white', border: '1px solid var(--gray-mid)', borderRadius: '16px', padding: '2rem', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1rem', fontWeight: 500, color: 'var(--black)', marginBottom: '1rem' }}>
            Comentar como <span style={{ color: 'var(--accent)' }}>{session.user.name || session.user.email}</span>
          </p>
          <form onSubmit={handleSubmit}>
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Escribe tu comentario..."
              rows={4}
              style={{
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
                resize: 'vertical',
                marginBottom: '1rem',
              }}
            />
            {error && (
              <p style={{ fontFamily: "'Outfit', sans-serif", color: 'var(--accent)', fontSize: '0.9rem', marginBottom: '1rem' }}>{error}</p>
            )}
            <button
              type="submit"
              disabled={loading || !content.trim()}
              style={{
                fontFamily: "'Outfit', sans-serif",
                backgroundColor: loading || !content.trim() ? 'var(--gray-text)' : 'var(--accent)',
                color: 'white',
                padding: '0.85rem 2rem',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 500,
                cursor: loading || !content.trim() ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Publicando...' : 'Publicar comentario'}
            </button>
          </form>
        </div>
      ) : (
        <div style={{ backgroundColor: 'var(--gray-light)', borderRadius: '12px', padding: '2rem', textAlign: 'center' }}>
          <p style={{ fontFamily: "'Outfit', sans-serif", color: 'var(--gray-text)', marginBottom: '1rem', fontSize: '1rem' }}>
            ¿Tienes algo que decir sobre este modelo?
          </p>
          <Link href="/login" style={{
            fontFamily: "'Outfit', sans-serif",
            display: 'inline-block',
            backgroundColor: 'var(--dark-bg)',
            color: 'white',
            padding: '0.75rem 1.75rem',
            textDecoration: 'none',
            fontSize: '0.9rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            borderRadius: '6px',
            fontWeight: 500,
          }}>
            Inicia sesión para comentar
          </Link>
        </div>
      )}
    </div>
  );
}
