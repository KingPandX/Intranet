import { error } from "console";
import { prisma } from "../PrismaInstance"

interface LoginRequest {
    CI: string;
    password: string;
}

export async function login(req : LoginRequest){
    const { CI, password } = req;
    const user = await prisma.usuario.findUnique({
        where: {
            cedula: CI
        }
    });

    if(!user){
        return {
            status: 200,
            message: "Usuario o contraseña incorrectos",
        }
    }

    if(user.password !== password){
        return {
            status: 200,
            message: "Usuario o contraseña incorrectos",
        }
    }

    return {
        status: 200,
        message: user
    }
}