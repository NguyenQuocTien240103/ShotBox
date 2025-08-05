import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

let db;

export const connectDB = async () => {
  try {
    db = await mysql.createConnection({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,

    });
    console.log("Connected to DB");
  } catch (error) {
    console.error("Failed to connect to DB:", error.message);
    process.exit(1);
  }
};

export const getDB = () => db;