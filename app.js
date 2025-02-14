import express, { json } from 'express';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import createTables from './models/setup.js';                      // Ensure tables are created before anything else
import classRoutes from './routes/classRoutes.js';
import formRoutes from './routes/formRoutes.js';
import cors from 'cors';

createTables();
config();


const app = express();
app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    })
  );
// Middleware
app.use(json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/classes',classRoutes);
app.use('/api/google-form', formRoutes);

export default app;
