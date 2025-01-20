import { PrismaClient } from "@prisma/client";
import { login } from "./src/controllers/login.controller";

const prisma = new PrismaClient();

const CI = "30162461";
const password = "V30162461";

login({ CI, password }).then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
}).finally(() => {
    prisma.$disconnect();
}  );