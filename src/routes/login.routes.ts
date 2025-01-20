import express from "express";
import bodyparser from "body-parser";
import { login } from "../controllers/login.controller";

const app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.post("/login", async (req, res) => {
    const { CI, password } = req.body;
    const result = await login({ CI, password });
    res.status(result.status).send(result.message);
})

export default app;