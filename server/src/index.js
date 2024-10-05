import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import db from './config/database.js';
const app = express();
const port = 8080;
app.use(cors());
// middleware use Parse data from body request (Form html)
app.use(express.urlencoded({ extended: false }));
// middleware use Parse data from javascript (fetch)
app.use(express.json());
db.connect();
routes(app);
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});

