import "./globals.css";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/components/AuthProvider";
import Link from "next/link";

export const metadata = {
  title: "CamperVan Co. — Alquiler de furgonetas camper",
  description: "Descubre la libertad de viajar en camper. Flota moderna, precios transparentes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          <Navbar />
          <main style={{ paddingTop: '72px' }}>
            {children}
          </main>

          <footer style={{
            backgroundColor: 'var(--dark-bg)',
            color: 'rgba(255,255,255,0.45)',
            padding: '5rem 2rem 3rem',
          }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr',
                gap: '4rem',
                paddingBottom: '4rem',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
                marginBottom: '2.5rem',
              }}>
                <div>
                  <Link href="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '1.25rem' }}>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 700, color: 'white', letterSpacing: '-0.02em' }}>
                      CamperVan<span style={{ color: 'var(--accent)' }}>.</span>
                    </span>
                  </Link>
                  <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1rem', lineHeight: 1.8, maxWidth: '280px', color: 'rgba(255,255,255,0.35)', fontWeight: 300 }}>
                    Llevamos años ayudando a viajeros a encontrar su camper perfecta. Fiabilidad, comodidad y atención real.
                  </p>
                </div>

                <div>
                  <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: '1.5rem' }}>Navegación</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {[
                      { href: '/', label: 'Inicio' },
                      { href: '/models', label: 'Modelos' },
                      { href: '/contact', label: 'Contacto' },
                    ].map(({ href, label }) => (
                      <Link key={href} href={href} style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>
                        {label}
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: '1.5rem' }}>Contacto</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {['hola@campervaneco.com', '+34 900 123 456', 'Barcelona, España'].map((item) => (
                      <p key={item} style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1rem', color: 'rgba(255,255,255,0.4)' }}>{item}</p>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: 'rgba(255,255,255,0.18)' }}>
                <p style={{ fontFamily: "'Outfit', sans-serif" }}>© 2025 CamperVan Co. Todos los derechos reservados.</p>
                <p style={{ fontFamily: "'Outfit', sans-serif" }}>Hecho con cariño y muchos kilómetros.</p>
              </div>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
