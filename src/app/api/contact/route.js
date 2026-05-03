import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email no válido" }, { status: 400 });
    }

    const contact = await prisma.contactRequest.create({
      data: { name, email, message },
    });

    return NextResponse.json({ success: true, contact }, { status: 201 });
  } catch (error) {
    console.error("Error al guardar contacto:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
