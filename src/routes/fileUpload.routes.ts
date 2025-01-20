import express from 'express';
import bodyparser from 'body-parser';
import uploadPDF from '../lib/lbUpload';
import {prisma} from '../PrismaInstance'
import fs from 'fs';

const app = express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(express.static('public'));

app.post('/upload', uploadPDF.single('file'), async (req, res) => {
    const {description, title, ci} = req.body;

    console.log(req.body);

    const file = req.file;
    if (!file) {
        res.status(400).send('No se ha subido ningun archivo');
        return;
    }

    const path = file.path;
    try { 
        const newFile = await prisma.proyectos.create({
            data: {
                descripcion: description,
                titulo: title,
                fecha_upload: new Date(),
                urlFile: path,
                usuario: {
                    connect: { cedula: ci }
                }
            }
        }) 
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al subir el archivo');
        fs.rm(file.path, (err) => {console.log(err)});
        return;
    }

    res.status(200).send('Archivo subido correctamente');
});

app.get('/files', async (req, res) => {
    const files = await prisma.proyectos.findMany();
    res.status(200).send(files);
});

app.get('/files/dw/:id', async (req, res) => {
    const id = req.params.id;
    const file = await prisma.proyectos.findUnique({
        where: {
            idProyecto: parseInt(id)
        }
    });

    if (!file) {
        res.status(404).send('Archivo no encontrado');
        return;
    }

    res.download(file.urlFile);
})

export default app;