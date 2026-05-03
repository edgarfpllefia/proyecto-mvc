import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function PUT(request, { params }) {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const { role } = await request.json();

    if (!["USER", "EDITOR", "ADMIN"].includes(role)) {
      return NextResponse.json({ error: "Rol no válido" }, { status: 400 });
    }

    if (id === session.user.id) {
      return NextResponse.json({ error: "No puedes cambiar tu propio rol" }, { status: 400 });
    }

    const user = await prisma.user.update({
      where: { id },
      data: { role },
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
