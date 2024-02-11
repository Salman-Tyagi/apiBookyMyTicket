import express from 'express';
import morgan from 'morgan';
import userRoutes from './routes/userRoutes.js';
import AppError from './utils/appError.js';
import globalErrorHandler from './controllers/globalError.js';

const app = express();

// morgan
app.use(morgan('dev'));

// Body parser
app.use(express.json());

// Static files
app.use(express.static('public'));

// API routes
app.use('/api/v1/users', userRoutes);

// All unknown requests
app.use('*', (req, res, next) =>
  next(new AppError(`${req.originalUrl} not found`, 404))
);

// Global error middleware handler
app.use(globalErrorHandler);

export default app;
