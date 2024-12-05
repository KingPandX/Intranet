import multer from "multer";
import {join, extname} from "path";

const dirLocation = join(__dirname, "../../public/uploads");

const uploadPDF = multer({
    storage: multer.diskStorage({
        destination: dirLocation,
        filename: (req, file, cb) => {
            const ext = extname(file.originalname);
            const name = file.originalname.replace(ext, "").replace(/\s/g, "_");
            cb(null, `${name}-${Date.now()}${ext}`);
        }
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "application/pdf") {
            cb(null, true);
        } else {
            cb(new Error("File type not allowed"));
        }
    }
})

export default uploadPDF;