import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  const models = await prisma.camperModel.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(models);
}

export async function POST(request) {
  const session = await auth();
  if (!session || !["EDITOR", "ADMIN"].includes(session.user.role)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { name, description, seats, price, imageUrl } = await request.json();

    if (!name || !description || !seats || !price) {
      return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 });
    }

    const model = await prisma.camperModel.create({
      data: { name, description, seats, price, imageUrl: imageUrl || null },
    });

    return NextResponse.json({ success: true, model }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
