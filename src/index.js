"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const fileUpload_routes_1 = __importDefault(require("./routes/fileUpload.routes"));
const carnet_routes_1 = __importDefault(require("./routes/carnet.routes"));
const login_routes_1 = __importDefault(require("./routes/login.routes"));
const notas_routes_1 = __importDefault(require("./routes/notas.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(fileUpload_routes_1.default);
app.use(carnet_routes_1.default);
app.use(login_routes_1.default);
app.use(notas_routes_1.default);
const port = 3000;
app.use(express_1.default.static('public'));
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
