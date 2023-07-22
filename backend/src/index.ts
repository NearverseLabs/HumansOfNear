import 'dotenv/config';
import cors from 'cors';
import path from 'path';
import * as fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import connectDB from '../config/database';
import Routes from './routes';

import { RetrunValidation } from './middleware/validation';

const app = express();
const WHITE_LIST = JSON.parse(process.env.WHITE_LIST as string);

connectDB();
const port = process.env.PORT || 2003;
app.set('port', port);
app.use(
  cors({
    origin: WHITE_LIST
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', Routes);

app.use(express.static(path.join(__dirname, '..', 'upload')));

app.use(RetrunValidation);
app.use(express.static(path.join(__dirname, '../../human-frontend/', 'build')));
app.get('*', (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(__dirname, '../../human-frontend/', 'build/index.html'));
});

const http = require('http').createServer(app);
http.listen(port);
console.log('server listening on:', port);
