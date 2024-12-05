import express from 'express';
import bodyparser from 'body-parser';
import uploadPDF from '../lib/lbUpload';

const app = express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.post("/upload", uploadPDF.single("file"), async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    res.send("File uploaded");
});

app.get("/", (req, res) => {
    res.sendFile("index.html");
});

app.use(express.static('public'));

export default app;