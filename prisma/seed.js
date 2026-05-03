import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { readFileSync } from "fs";
import { resolve } from "path";

// Leer el .env manualmente
const envPath = resolve(process.cwd(), ".env");
const envContent = readFileSync(envPath, "utf-8");
const dbUrl = envContent
  .split("\n")
  .find((line) => line.startsWith("DATABASE_URL="))
  ?.replace("DATABASE_URL=", "")
  .replace(/^"/, "")
  .replace(/"$/, "")
  .trim();

console.log("DATABASE_URL encontrada:", dbUrl ? "sí" : "no");

const pool = new Pool({ connectionString: dbUrl });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.camperModel.deleteMany();

  await prisma.camperModel.createMany({
    data: [
      {
        name: "Adventure Van XL",
        description: "Camper espaciosa ideal para familias, con cocina completa y zona de descanso amplia. Perfecta para viajes largos.",
        seats: 4,
        price: 89,
        imageUrl: "/images/photo-1634109725557-d2b8ac9f6c5c.avif",
      },
      {
        name: "Compact Cruiser",
        description: "Perfecta para parejas, compacta y fácil de aparcar en cualquier sitio. Todo lo esencial en poco espacio.",
        seats: 2,
        price: 65,
        imageUrl: "/images/anders-nielsen-HwOCUSDIaaU-unsplash.jpg",
      },
      {
        name: "Explorer Pro",
        description: "Para los aventureros, equipada con todo para rutas de montaña y offroad. Resistente y versátil.",
        seats: 4,
        price: 110,
        imageUrl: "/images/photo-1576793048000-494aaa93d160.avif",
      },
    ],
  });

  console.log("Seed completado");
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
