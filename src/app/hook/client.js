// src/app/hook/client.js
import { PrismaClient } from "@/generated/prisma/client";

let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  // 🔹 En desarrollo, reutiliza la instancia si ya existe
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export { prisma };
