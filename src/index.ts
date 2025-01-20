import express from "express";
import cors from "cors";
import fileUploadRoutes from "./routes/fileUpload.routes"
import carnetRoutes from "./routes/carnet.routes"
import LoginRoutes from "./routes/login.routes"
import NOtasRoutes from "./routes/notas.routes"

const app = express();
app.use(cors());
app.use(fileUploadRoutes)
app.use(carnetRoutes)
app.use(LoginRoutes)
app.use(NOtasRoutes)

const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {  
    console.log(`Server started at http://localhost:${port}`);
});