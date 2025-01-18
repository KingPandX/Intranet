"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = require("path");
const dirLocation = (0, path_1.join)(__dirname, "../../public/uploads");
const uploadPDF = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: dirLocation,
        filename: (req, file, cb) => {
            const ext = (0, path_1.extname)(file.originalname);
            const name = file.originalname.replace(ext, "").replace(/\s/g, "_");
            cb(null, `${name}-${Date.now()}${ext}`);
        }
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "application/pdf") {
            cb(null, true);
        }
        else {
            cb(new Error("File type not allowed"));
        }
    }
});
exports.default = uploadPDF;
