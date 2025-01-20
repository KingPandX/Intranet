import express from "express";
import bodyparser from "body-parser";
import { getNotas } from "../controllers/notas.controller";

const app = express();

app.use(bodyparser.urlencoded({ extended: true }));

app.get("/notas/:cedula", async (req, res) => {
    const cedula = req.params.cedula;
    const notas = await getNotas({ CI: cedula });
    res.status(notas.status).send(notas.message);
})

app.get("/notas", async (req, res) => {
    const notas = await getNotas();
    res.status(notas.status).send(notas.message);
})

export default app;