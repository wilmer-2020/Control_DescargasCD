import { prisma } from "@/app/hook/client";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
    const placas = await prisma.furgon.findMany();
    return NextResponse.json(placas);    
    } catch (error) {
     console.error("Error al obtener placas:", error);
    return NextResponse.json(
      { error: "Error al obtener placas" },
      { status: 500 }
    );     
    }
}

// POST: agregar una nueva placa
export async function POST(request) {
  try {
    const { placa } = await request.json();

    if (Array.isArray(placa)) {
      // placa es un array de objetos { placa, pegada, observacion }
      const nuevasPlacas = placa.map((p) => ({
        placa: p.placa, // 👈 toma solo el texto
      }));

      const createdPlacas = await prisma.furgon.createMany({
        data: nuevasPlacas,
        skipDuplicates: true,
      });

      return NextResponse.json(createdPlacas);
    } else {
      // placa es un solo objeto o string
      const nuevaPlaca = await prisma.furgon.create({
        data: { placa: typeof placa === "string" ? placa : placa.placa },
      });
      return NextResponse.json(nuevaPlaca);
    }
  } catch (error) {
    console.error("Error al crear placa:", error);
    return NextResponse.json(
      { error: "Error al crear placa" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const { id, estado, observacion } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Se requiere un ID para actualizar" },
        { status: 400 }
      );
    }

    const updatedPlaca = await prisma.furgon.update({
      where: { id },
      data: {
        ...(estado && { estado }),
        ...(observacion !== undefined && { observacion }),
      },
    });

    return NextResponse.json(updatedPlaca);
  } catch (error) {
    console.error("Error al actualizar placa:", error);
    return NextResponse.json(
      { error: "Error al actualizar placa" },
      { status: 500 }
    );
  }
}