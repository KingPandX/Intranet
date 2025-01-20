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
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
app.use(express_1.default.static("public"));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(express_1.default.static('public'));
app.post('/upload', lbUpload_1.default.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { description, title, ci } = req.body;
    console.log(req.body);
    const file = req.file;
    if (!file) {
        res.status(400).send('No se ha subido ningun archivo');
        return;
    }
    const path = file.path;
    try {
        const newFile = yield PrismaInstance_1.prisma.proyectos.create({
            data: {
                descripcion: description,
                titulo: title,
                fecha_upload: new Date(),
                urlFile: path,
                usuario: {
                    connect: { cedula: ci }
                }
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Error al subir el archivo');
        fs_1.default.rm(file.path, (err) => { console.log(err); });
        return;
    }
    res.status(200).send('Archivo subido correctamente');
}));
app.get('/files', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const files = yield PrismaInstance_1.prisma.proyectos.findMany();
    res.status(200).send(files);
}));
app.get('/files/dw/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const file = yield PrismaInstance_1.prisma.proyectos.findUnique({
        where: {
            idProyecto: parseInt(id)
        }
    });
    if (!file) {
        res.status(404).send('Archivo no encontrado');
        return;
    }
    res.download(file.urlFile);
}));
exports.default = app;
