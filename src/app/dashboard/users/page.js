import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ChangeRoleButton from "@/components/ChangeRoleButton";

export const dynamic = "force-dynamic";

export default async function DashboardUsersPage() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") redirect("/dashboard/models");

  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.5rem', fontWeight: 500 }}>Gestión</p>
        <h1 style={{ fontSize: '2rem', color: 'var(--black)', letterSpacing: '-0.02em' }}>Usuarios</h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {users.map((user) => (
          <div key={user.id} style={{
            backgroundColor: 'white',
            border: '1px solid var(--gray-mid)',
            borderRadius: '12px',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}>
            {/* Avatar */}
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 600,
              fontSize: '1rem',
              flexShrink: 0,
            }}>
              {(user.name || user.email)[0].toUpperCase()}
            </div>

            {/* Info */}
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1rem', fontWeight: 500, color: 'var(--black)', marginBottom: '0.2rem' }}>{user.name || 'Sin nombre'}</p>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.9rem', color: 'var(--gray-text)' }}>{user.email}</p>
            </div>

            {/* Rol actual */}
            <span style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '0.8rem',
              fontWeight: 500,
              padding: '0.3rem 0.85rem',
              borderRadius: '20px',
              backgroundColor: user.role === 'ADMIN' ? '#111' : user.role === 'EDITOR' ? '#fff3e8' : 'var(--gray-light)',
              color: user.role === 'ADMIN' ? 'white' : user.role === 'EDITOR' ? 'var(--accent)' : 'var(--gray-text)',
              border: user.role === 'EDITOR' ? '1px solid #f5c6a0' : 'none',
            }}>
              {user.role}
            </span>

            {/* Cambiar rol — solo si no es el propio usuario */}
            {user.id !== session.user.id && (
              <ChangeRoleButton userId={user.id} currentRole={user.role} />
            )}

            {user.id === session.user.id && (
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.85rem', color: 'var(--gray-text)' }}>Tú</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
