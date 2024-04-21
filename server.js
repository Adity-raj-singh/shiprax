import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import Connection from './database/db.js';
import Router from './routes/routes.js';
import bodyParser from 'body-parser';
import  path from 'path';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', Router);

//static files
app.use(express.static(path.join(process.cwd(), "./client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(process.cwd(), "./client/build/index.html"));
});

const PORT = 8000;

app.listen(PORT, () => console.log(`Server is runnimg successfully on Hello World PORT ${PORT}`));

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;


Connection(USERNAME, PASSWORD);