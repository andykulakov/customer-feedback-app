import express, {Express} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import {DatabaseService} from './services/database';
import reviewsRouter from './routes/reviews';

const app: Express = express();
const PORT = 9000;

new DatabaseService();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/reviews', reviewsRouter);

app.listen(PORT, () => {
    console.log(`API is running on http://localhost:${PORT}`);
});
