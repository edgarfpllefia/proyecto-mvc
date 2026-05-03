"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteModelButton({ id, name }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm(`¿Eliminar "${name}"? Esta acción no se puede deshacer.`)) return;
    setLoading(true);

    const res = await fetch(`/api/models/${id}`, { method: "DELETE" });

    if (res.ok) {
      router.refresh();
    } else {
      alert("Error al eliminar el modelo");
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      style={{
        fontFamily: "'Outfit', sans-serif",
        backgroundColor: loading ? 'var(--gray-text)' : 'white',
        color: loading ? 'white' : '#dc2626',
        padding: '0.6rem 1.25rem',
        fontSize: '0.9rem',
        fontWeight: 500,
        borderRadius: '6px',
        border: '1px solid #fca5a5',
        cursor: loading ? 'not-allowed' : 'pointer',
      }}
    >
      {loading ? 'Eliminando...' : 'Eliminar'}
    </button>
  );
}
