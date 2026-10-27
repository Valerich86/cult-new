// lib/db.ts
import mysql from 'mysql2/promise';

let pool: mysql.Pool | null = null;

export function getPool(): mysql.Pool {
  if (!pool) {
    // Проверка переменных — сработает только при вызове функции (в рантайме)
    if (!process.env.MYSQL_HOST) {
      throw new Error('MYSQL_HOST is not set');
    }
    pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT || '3306', 10),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
}
