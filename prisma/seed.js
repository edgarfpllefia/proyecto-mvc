import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.camperModel.createMany({
    data: [
      {
        name: "Adventure Van XL",
        description:
          "Camper espaciosa ideal para familias, con cocina completa y zona de descanso amplia.",
        seats: 4,
        price: 89,
        imageUrl: null,
      },
      {
        name: "Compact Cruiser",
        description:
          "Perfecta para parejas, compacta y fácil de aparcar en cualquier sitio.",
        seats: 2,
        price: 65,
        imageUrl: null,
      },
      {
        name: "Explorer Pro",
        description:
          "Para los aventureros, equipada con todo para rutas de montaña y offroad.",
        seats: 4,
        price: 110,
        imageUrl: null,
      },
    ],
    skipDuplicates: true,
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
