import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from 'dotenv';

dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;


const storage = new GridFsStorage({
    url: `mongodb+srv://${username}:${password}@cluster0.tllekjo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    options: { useNewUrlParser: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpg"];
        if (match.indexOf(file.memeType) === -1) {
            return `${Date.now()}-blog-${file.originalName}`;
        }
        return {
            bucketName: "photos",
            fileName: `${Date.now()}-blog-${file.originalName}`
        }
    }
})

export default multer({ storage });