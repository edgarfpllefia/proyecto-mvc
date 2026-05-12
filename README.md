# CamperVan Co. — Projecte MVC amb CRUD i Auth

Landing page corporativa d'una empresa de lloguer de furgonetes camper, construïda amb Next.js 16, PostgreSQL/Prisma i Auth.js.

## Demo

🌐 **URL de producció**: [https://proyecto-mvc-orcin.vercel.app](https://proyecto-mvc-orcin.vercel.app)

## Stack tecnològic

- **Framework**: Next.js 16 (App Router)
- **Base de dades**: PostgreSQL (local amb Docker, producció amb Neon)
- **ORM**: Prisma 7
- **Autenticació**: Auth.js (NextAuth v5)
- **Estils**: CSS-in-JS (inline styles) + Google Fonts (Playfair Display, Outfit)
- **Desplegament**: Vercel (app) + Neon (BD)

## Funcionalitats

- Landing pública amb hero, catàleg de models i formulari de contacte
- Catàleg de furgonetes camper amb detall per model
- Comentaris per model (només usuaris autenticats)
- Formulari de contacte amb validació i persistència
- Registre i inici de sessió amb email i contrasenya
- Sistema de rols: USER, EDITOR, ADMIN
- Panell d'administració:
  - EDITOR: CRUD complet de models
  - ADMIN: gestió d'usuaris i rols

## Estructura MVC

```
src/
├── app/
│   ├── api/               # Controllers (API routes)
│   │   ├── auth/
│   │   ├── comments/
│   │   ├── contact/
│   │   ├── models/
│   │   ├── register/
│   │   └── users/
│   ├── dashboard/         # Panell d'administració
│   │   ├── models/
│   │   └── users/
│   ├── login/
│   ├── models/            # Vistes públiques de models
│   │   └── [id]/
│   ├── register/
│   └── contact/
├── components/            # Components reutilitzables
│   ├── AuthProvider.js
│   ├── CommentSection.js
│   ├── DeleteModelButton.js
│   ├── EditModelForm.js
│   ├── ChangeRoleButton.js
│   └── Navbar.js
├── lib/
│   └── prisma.js          # Client Prisma (singleton)
└── auth.js                # Configuració Auth.js
prisma/
├── schema.prisma          # Model de dades
├── migrations/            # Migracions
└── seed.js                # Dades d'exemple
```

## Execució en local

### Requisits

- Node.js 18+
- Docker Desktop

### Passos

1. **Clonar el repositori**

```bash
git clone https://github.com/TU_USUARIO/proyecto-mvc.git
cd proyecto-mvc
```

2. **Instal·lar dependències**

```bash
npm install
```

3. **Configurar variables d'entorn**

Crea un fitxer `.env` a l'arrel del projecte:

```env
DATABASE_URL="postgresql://admin:admin123@localhost:5432/campers_db"
AUTH_SECRET="el-teu-secret-aqui"
AUTH_URL="http://localhost:3000"
```

4. **Arrancar la base de dades amb Docker**

```bash
docker compose up -d
```

5. **Aplicar migracions i seed**

```bash
npx prisma migrate dev
npx prisma db seed
```

6. **Arrancar el servidor**

```bash
npm run dev
```

L'aplicació estarà disponible a `http://localhost:3000`

## Credencials de prova

| Rol | Email | Contrasenya |
|-----|-------|-------------|
| ADMIN | edgar@edgar.com | edgar123 |
| EDITOR | carlos@carlos.com | carlos123 |
| USER | albert@albert.com | albert123 |

## Variables d'entorn (producció)

| Variable | Descripció |
|----------|------------|
| `DATABASE_URL` | URL de connexió a PostgreSQL (Neon) |
| `AUTH_SECRET` | Secret per a JWT d'Auth.js |
| `AUTH_URL` | URL pública de l'aplicació |

## Planificació Agile

### Sprint 1 — MVP visual + base de dades
- Landing pública (home, models, contacte)
- Esquema de BD amb Prisma (User, CamperModel, Comment, ContactRequest)
- Migracions i seed amb dades realistes

### Sprint 2 — API + seguretat + release
- Endpoints REST per a models, comentaris i contacte
- Autenticació amb Auth.js (registre + login)
- Sistema de rols (USER, EDITOR, ADMIN)
- Panell d'administració protegit per rol
- Desplegament a Vercel + Neon
