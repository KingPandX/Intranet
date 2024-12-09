import {prisma} from '../PrismaInstance';

export const getCarnet = async (cedula: number) => {
    return await prisma.carnet.findFirst(
        {
            where: {
                cedula: cedula
            }
        }
    )
}