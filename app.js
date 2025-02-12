import express, { json } from 'express';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import createTables from './models/setup.js';                      // Ensure tables are created before anything else
import classRoutes from './routes/classRoutes.js';
import cors from 'cors';

createTables();
config();

// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     credentials: true,
//   })
// );

const app = express();

// Middleware
app.use(json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/classes',classRoutes);

export default app;
