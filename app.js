import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js';
import cityRoutes from './routes/cityRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import cinemaRoutes from './routes/cinemaRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import AppError from './utils/appError.js';
import globalErrorHandler from './controllers/globalError.js';

const app = express();

// morgan (logger)
app.use(morgan('dev'));

// Body parser
app.use(express.json());

// Static files
app.use(express.static('public'));

app.use(cors());

app.use((req, res, next) => {
  // console.log(req.headers);
  next();
});

// API routes
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/cities', cityRoutes);
app.use('/api/v1/movies', movieRoutes);
app.use('/api/v1/cinemas', cinemaRoutes);
app.use('/api/v1/bookings', bookingRoutes);

// All unknown requests
app.use('*', (req, res, next) =>
  next(new AppError(`${req.originalUrl} not found`, 404))
);

// Global error middleware handler
app.use(globalErrorHandler);

export default app;
