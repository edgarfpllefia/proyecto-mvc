import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Limpiar datos existentes
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
