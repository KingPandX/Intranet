import { prisma } from "../PrismaInstance";

interface NotasRequest {
    CI: string | null;
}

export async function getNotas(_req: NotasRequest = { CI: null }) {
    const { CI } = _req;
    if (!CI) {
        const notas = await prisma.notas.findMany();
        return {
            status: 200,
            message: notas
        }
    }

    const notas = await prisma.notas.findMany({
        where: {
            Cedula: CI
        }
    });

    if (!notas) {
        return {
            status: 404,
            message: "Notas no encontradas",
        }
    }

    return {
        status: 200,
        message: notas
    }
}