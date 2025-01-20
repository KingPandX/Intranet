"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotas = getNotas;
const PrismaInstance_1 = require("../PrismaInstance");
function getNotas() {
    return __awaiter(this, arguments, void 0, function* (_req = { CI: null }) {
        const { CI } = _req;
        if (!CI) {
            const notas = yield PrismaInstance_1.prisma.notas.findMany();
            return {
                status: 200,
                message: notas
            };
        }
        const notas = yield PrismaInstance_1.prisma.notas.findMany({
            where: {
                Cedula: CI
            }
        });
        if (!notas) {
            return {
                status: 404,
                message: "Notas no encontradas",
            };
        }
        return {
            status: 200,
            message: notas
        };
    });
}
