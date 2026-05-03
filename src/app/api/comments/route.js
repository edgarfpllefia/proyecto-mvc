import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { modelId, content } = await request.json();

    if (!modelId || !content?.trim()) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    const comment = await prisma.comment.create({
      data: {
        content: content.trim(),
        userId: session.user.id,
        modelId,
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json({ success: true, comment }, { status: 201 });
  } catch (error) {
    console.error("Error al crear comentario:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
