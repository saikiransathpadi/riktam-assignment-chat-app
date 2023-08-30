require('dotenv').config();
import express from 'express';
import cors from 'cors';
import { connectMongoDb } from './src/db/mongoose';
import router from './src/routes';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => [res.send('working')]);

app.use('/riktam/chatapp/api/v1', router);

app.use('*', (_req, res) => {
    console.log(_req.originalUrl);
    console.log(_req.hostname);
    res.status(404).json({ message: 'route not found' });
});

app.listen(process.env.PORT, async () => {
    await connectMongoDb();
    console.log('listening on port:', process.env.PORT);
});
