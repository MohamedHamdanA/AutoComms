// models/setup.js
import pool from '../config/db.js';

const createTables = async () => {
  try {
    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        google_id VARCHAR(255) UNIQUE,
        access_token TEXT,
        refresh_token TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create classes table (each class belongs to a user)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS classes (
        class_id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
        class_name VARCHAR(100) NOT NULL,
        schedule TIMESTAMP,                                                                  
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create google_forms table (each form belongs to a class)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS google_forms (
        form_id SERIAL PRIMARY KEY,
        class_id INTEGER NOT NULL REFERENCES classes(class_id) ON DELETE CASCADE,
        form_title VARCHAR(255) NOT NULL,
        description TEXT,
        form_link TEXT NOT NULL,                                                            
        due_date TIMESTAMP,                                                                 
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create students table (each student is unique)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS students (
        student_id SERIAL PRIMARY KEY,
        email VARCHAR(150) UNIQUE NOT NULL,
        google_id VARCHAR(255) UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS class_students (
        class_id INTEGER NOT NULL REFERENCES classes(class_id) ON DELETE CASCADE,
        student_id INTEGER NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
        enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (class_id, student_id)
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS sessions (
        session_id VARCHAR(255) PRIMARY KEY,
        user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
        csrf_token VARCHAR(255) NOT NULL,
        expires_at TIMESTAMP NOT NULL
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS stusessions (
        session_id VARCHAR(255) PRIMARY KEY,
        student_id INT REFERENCES users(user_id) ON DELETE CASCADE,
        csrf_token VARCHAR(255) NOT NULL,
        expires_at TIMESTAMP NOT NULL
      );
    `);

    console.log("✅ Tables created successfully.");
  } catch (err) {
    console.error("❌ Error creating tables:", err);
  }
};

export default createTables;
