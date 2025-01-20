import express from 'express';
import bodyparser from 'body-parser';
import { getCarnet } from '../controllers/carnet.controller';

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.get('/carnet/:cedula', async (req, res) => {
    const cedula = req.params.cedula;
    const carnet = await getCarnet(cedula);
    if (carnet) {
        res.status(200).send({ carnet });
        return;
    }

    res.status(404).send({ message: 'Carnet no encontrado' });
    return
});

export default app;