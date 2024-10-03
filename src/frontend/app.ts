import express, { ErrorRequestHandler } from 'express';
import http from 'http';
import createError from 'http-errors';
import path from 'path';
import { fileURLToPath } from 'url';

import mainRouter from './api/routes/mains.js';

const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.set('views', path.join(__dirname, '../../views'));
app.set('view engine', 'pug');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'api/public')));

app.get('/favicon.ico', (_req, res) => res.status(204));
app.use('/', mainRouter);

app.use(function (_req, _res, next) {
    return next(createError(404));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandling: ErrorRequestHandler = async (err, _req, res, _next) => {
    // Use any logger if necessary, for the purpose of the test, I keep this console.log
    console.log(err);
    if (err instanceof createError.HttpError) {
        return res.status(err.statusCode).json(err);
    } else {
        return res.status(500).json({ message: err.message });
    }
};
app.use(errorHandling);

const httpserver = http.createServer(app);
httpserver.listen(5000);
console.log('Server running');
