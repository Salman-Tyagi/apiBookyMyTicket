import express from 'express';
import morgan from 'morgan';
// import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/userRoutes.js';
import cityRoutes from './routes/cityRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import cinemaRoutes from './routes/cinemaRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import ratingRoutes from './routes/ratingRoutes.js';
import viewRoutes from './routes/viewRoutes.js';
import AppError from './utils/appError.js';
import globalErrorHandler from './controllers/globalError.js';

const app = express();

// Helmet sets headers for security purpose
app.use(helmet());

// Rate limit for multiple requests from the same IP
app.use(
  rateLimit({
    windowMs: 60 * 60 * 1000,
    limit: 100,
    message: 'Too many requests! Try again later after 1 hour',
  })
);

// morgan (logger)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser
app.use(
  express.json({
    limit: '5kb',
  })
);

// Cookie-parser
app.use(cookieParser());

// Static files
app.use(express.static('public'));

// Set view engine for render templates
app.set('views', './views');
app.set('view engine', 'ejs');

// To allow access resources request from other origin (domain)
// For simple get, post requests
// app.use(cors());

// For pre-flight phase options requests, checks is it safe before executive patch, put, delete other requests
// app.options('/api/v1/', cors());

// Middleware
app.use((req, res, next) => {
  console.log(req.cookies);
  next();
});

// Site routes
app.use('/', viewRoutes);

// API routes
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/cities', cityRoutes);
app.use('/api/v1/movies', movieRoutes);
app.use('/api/v1/cinemas', cinemaRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/ratings', ratingRoutes);

// All unknown requests
app.all('*', (req, res, next) =>
  next(new AppError(`${req.originalUrl} not found`, 404))
);

// Global error middleware handler
app.use(globalErrorHandler);

export default app;
