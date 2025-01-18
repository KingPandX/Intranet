import express from 'express';
import bodyparser from 'body-parser';
import uploadPDF from '../lib/lbUpload';
import {prisma} from '../PrismaInstance'
import { randomInt } from 'crypto';

const app = express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.post("projects/upload/", uploadPDF.single("file"), async (req, res) => {
    const user = await prisma.usuario.findUnique({
        where: { cedula: parseInt(req.body.ci) }
    })

    if (!user) {
        res.status(404).send("User not found");
        return;
    }

    if (!req.file) {
        res.status(400).send("File not found");
        return;
    }

    await prisma.proyectos.create({
        data: {
            descripcion: req.body.description,
            fecha_upload: new Date(Date.now()).toISOString(),
            idProyecto: randomInt(0, 1000000),
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
});

app.get("projects/files/:filename", (req, res) => {
    console.log(req.params.filename);
    const path = "uploads/" + req.params.filename;
    res.sendFile(path, { root: "public" });
});

app.use(express.static('public'));

export default app;