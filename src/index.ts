import express from "express";
import fileUploadRoutes from "./routes/fileUpload.routes"
import carnetRoutes from "./routes/carnet.routes"

const app = express();
app.use(fileUploadRoutes)
app.use(carnetRoutes)
const port = 3000;


app.listen(port, () => {  
    console.log(`Server started at http://localhost:${port}`);
});