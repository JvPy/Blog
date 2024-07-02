import './env';
import express, { json } from 'express';
import connectToDatabase from './connection/mongo';
import router from './routes';

const app = express();
app.use(json());
app.use('/api/posts', router);
connectToDatabase();

app.listen(process.env.PORT || 3000);
