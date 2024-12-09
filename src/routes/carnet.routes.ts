import express from 'express';
import bodyparser from 'body-parser';
import { getCarnet } from 'src/controllers/carnet.controller';

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.get('/carnet/:cedula', async (req, res) => {
    const cedula = parseInt(req.params.cedula);
    const carnet = await getCarnet(cedula);
    res.json(carnet);
});

export default app;