


import multer from "multer";
import express from "express";
import path from "path";
import fs from "fs";
import { handleResponse } from "../utils/responseHandler"

const router = express.Router();

// Configure multer storage with original file name
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "media/"); // save files in media folder
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//         cb(null, uniqueSuffix + path.extname(file.originalname));
//     },
// });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, "media"); // folder path

        // Check if folder exists, if not create it
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// Upload route
router.post("/", upload.single("file"), (req, res) => {
    if (!req.file) {
        return handleResponse.handleError(res, "", "no file uploaded", 400);
    }

    // Full path (useful if frontend needs full URL)
    const filePath = `/media/${req.file.filename}`;

    return handleResponse.handleSuccess(res, filePath, "file uploaded successfully", 200);
});


router.post("/multiple", upload.array("files", 10), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return handleResponse.handleError(res, "", "No files uploaded", 400);
    }

    // Full paths array
    const filePaths = (req.files as Express.Multer.File[]).map((file) => `/media/${file.filename}`);

    return handleResponse.handleSuccess(res, filePaths, "Files uploaded successfully", 200);
});


export default router;
