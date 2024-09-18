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

const allowedOrigins = [
  'http://localhost:5173', // Local development
  'https://your-production-url.com', // Replace with your production frontend URL
];

//parsers
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: allowedOrigins,
  credentials: true, // Allow cookies or other credentials
}));

// application routes
app.use('/api/', router);

// Global Error Handler
app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;