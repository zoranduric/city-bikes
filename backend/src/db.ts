import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const connectionString = `postgresql://${DB_USER}:${DB_PASSWORD}@db:5432/${DB_NAME}`;

const localConfig = {
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: 5432,
  host: DB_HOST,
};

const configuration = process.env.NODE_ENV === 'production' ? { connectionString } : localConfig;

export function createDatabasePool(): Pool {
  try {
    const pool = new Pool(configuration);
    return pool;
  } catch (error) {
    console.error('Error creating database pool:', error);
    throw error;
  }
}
