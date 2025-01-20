"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const login_controller_1 = require("./src/controllers/login.controller");
const prisma = new client_1.PrismaClient();
const CI = "30162461";
const password = "V30162461";
(0, login_controller_1.login)({ CI, password }).then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
}).finally(() => {
    prisma.$disconnect();
});
