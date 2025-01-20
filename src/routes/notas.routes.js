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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const notas_controller_1 = require("../controllers/notas.controller");
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get("/notas/:cedula", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cedula = req.params.cedula;
    const notas = yield (0, notas_controller_1.getNotas)({ CI: cedula });
    res.status(notas.status).send(notas.message);
}));
app.get("/notas", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notas = yield (0, notas_controller_1.getNotas)();
    res.status(notas.status).send(notas.message);
}));
exports.default = app;
