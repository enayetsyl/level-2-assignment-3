/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import router from './app/routes';
import bodyParser from 'body-parser';

const app: Application = express();

//parsers
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:3000'] }));

// application routes
app.use('/api/', router);

app.use('/', async(req,res) => {
  res.send("Hello from Room booking service portal.")
})

// Global Error Handler
app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;