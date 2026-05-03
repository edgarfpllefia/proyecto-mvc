"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const ROLES = ["USER", "EDITOR", "ADMIN"];

export default function ChangeRoleButton({ userId, currentRole }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(currentRole);

  async function handleChange(newRole) {
    if (newRole === role) return;
    setLoading(true);

    const res = await fetch(`/api/users/${userId}/role`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: newRole }),
    });

    setLoading(false);
    if (res.ok) {
      setRole(newRole);
      router.refresh();
    } else {
      alert("Error al cambiar el rol");
    }
  }

  return (
    <select
      value={role}
      onChange={e => handleChange(e.target.value)}
      disabled={loading}
      style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: '0.9rem',
        padding: '0.5rem 0.75rem',
        border: '1px solid var(--gray-mid)',
        borderRadius: '6px',
        backgroundColor: 'white',
        cursor: 'pointer',
        color: 'var(--black)',
      }}
    >
      {ROLES.map(r => (
        <option key={r} value={r}>{r}</option>
      ))}
    </select>
  );
}
