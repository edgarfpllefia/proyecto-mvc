import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardLayout({ children }) {
  const session = await auth();

  if (!session) redirect("/login");
  if (session.user.role === "USER") redirect("/");

  const isAdmin = session.user.role === "ADMIN";

  return (
    <div style={{ paddingTop: '72px', minHeight: '100vh', backgroundColor: 'var(--gray-light)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 2rem', display: 'grid', gridTemplateColumns: '240px 1fr', gap: '2rem', alignItems: 'start' }}>

        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid var(--gray-mid)', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', position: 'sticky', top: '90px' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--gray-mid)' }}>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 500, marginBottom: '0.25rem' }}>Panel</p>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1rem', fontWeight: 500, color: 'var(--black)' }}>{session.user.name}</p>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.85rem', color: 'var(--gray-text)' }}>{session.user.role}</p>
          </div>

          <nav style={{ padding: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <Link href="/dashboard/models" style={{ fontFamily: "'Outfit', sans-serif", display: 'block', padding: '0.75rem 1rem', borderRadius: '8px', fontSize: '0.95rem', color: 'var(--black)', textDecoration: 'none', fontWeight: 400 }}>
                Modelos
              </Link>
              {isAdmin && (
                <Link href="/dashboard/users" style={{ fontFamily: "'Outfit', sans-serif", display: 'block', padding: '0.75rem 1rem', borderRadius: '8px', fontSize: '0.95rem', color: 'var(--black)', textDecoration: 'none', fontWeight: 400 }}>
                  Usuarios
                </Link>
              )}
              <div style={{ borderTop: '1px solid var(--gray-mid)', marginTop: '0.5rem', paddingTop: '0.5rem' }}>
                <Link href="/" style={{ fontFamily: "'Outfit', sans-serif", display: 'block', padding: '0.75rem 1rem', borderRadius: '8px', fontSize: '0.95rem', color: 'var(--gray-text)', textDecoration: 'none' }}>
                  Volver al sitio
                </Link>
              </div>
            </div>
          </nav>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
}
