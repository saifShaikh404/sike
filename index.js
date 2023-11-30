import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

// DataBase connection
let dbConnection = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('DB Connected')
}
dbConnection().catch(err => console.log(err));

import express from 'express';
import dataRouter from './routes/dataRouter.js';

let app = express();
app.use(cors())
app.use(express.json())
app.use('/', dataRouter);
app.use(express.static('build'))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT, () => {
    console.log(`App is running on port ${process.env.PORT}`);
})
