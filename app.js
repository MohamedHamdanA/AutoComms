import express, { json } from 'express';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import createTables from './models/setup.js';                      // Ensure tables are created before anything else
import classRoutes from './routes/classRoutes.js';
import formRoutes from './routes/formRoutes.js';
import studentRoutes from './routes/studentRoutes.js'
import cors from 'cors';

createTables();
config();


const app = express();

// Adjust these origins as needed:
const allowedOrigins = [
  "http://localhost:5173",           // your web app (if applicable)
  "chrome-extension://mnjhahpifkplaaeedlnbiomkjfngjlkk"  // your chrome extension
];

// app.use(cors({
//   origin: function(origin, callback) {
//     // Allow requests with no origin (like mobile apps, curl, etc.)
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.indexOf(origin) === -1) {
//       const msg = "The CORS policy for this site does not allow access from the specified Origin.";
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   },
//   credentials: true, // allow cookies and other credentials
// }));
app.use(cors({
  origin: (origin, callback) => {
    callback(null, origin); // Allow any origin
  },
  credentials: true
}));
// Middleware
app.use(json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/classes',classRoutes);
app.use('/api/google-form', formRoutes);
app.use('/api/student', studentRoutes);

export default app;
