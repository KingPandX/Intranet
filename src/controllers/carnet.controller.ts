import {prisma} from '../PrismaInstance';

export const getCarnet = async (cedula: string) => {
    return await prisma.carnet.findFirst(
        {
            where: {
                cedula: cedula
            }
        }
    )
}