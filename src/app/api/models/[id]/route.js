import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(request, { params }) {
  const session = await auth();
  if (!session || !["EDITOR", "ADMIN"].includes(session.user.role)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const { name, description, seats, price, imageUrl } = await request.json();

    const model = await prisma.camperModel.update({
      where: { id },
      data: { name, description, seats, price, imageUrl: imageUrl || null },
    });

    return NextResponse.json({ success: true, model });
  } catch (error) {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const session = await auth();
  if (!session || !["EDITOR", "ADMIN"].includes(session.user.role)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { id } = await params;

    // Primero eliminar comentarios asociados
    await prisma.comment.deleteMany({ where: { modelId: id } });
    await prisma.camperModel.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
