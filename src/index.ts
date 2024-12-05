import express from "express";
import fileUploadRoutes from "./routes/fileUpload.routes"

const app = express();
app.use(fileUploadRoutes)
const port = 3000;


app.listen(port, () => {  
    console.log(`Server started at http://localhost:${port}`);
});