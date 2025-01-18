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
const lbUpload_1 = __importDefault(require("../lib/lbUpload"));
const PrismaInstance_1 = require("../PrismaInstance");
const crypto_1 = require("crypto");
const app = (0, express_1.default)();
app.use(express_1.default.static("public"));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.post("projects/upload/", lbUpload_1.default.single("file"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield PrismaInstance_1.prisma.usuario.findUnique({
        where: { cedula: parseInt(req.body.ci) }
    });
    if (!user) {
        res.status(404).send("User not found");
        return;
    }
    if (!req.file) {
        res.status(400).send("File not found");
        return;
    }
    yield PrismaInstance_1.prisma.proyectos.create({
        data: {
            descripcion: req.body.description,
            fecha_upload: new Date(Date.now()).toISOString(),
            idProyecto: (0, crypto_1.randomInt)(0, 1000000),
            titulo: req.body.title,
            urlFile: "projects/files/" + req.file.filename,
            usuario: {
                connect: {
                    cedula: user.cedula
                }
            }
        }
    });
    res.send("File uploaded");
}));
app.get("projects/files/:filename", (req, res) => {
    console.log(req.params.filename);
    const path = "uploads/" + req.params.filename;
    res.sendFile(path, { root: "public" });
});
app.use(express_1.default.static('public'));
exports.default = app;
