import mysql from 'mysql2/promise';

const isBuilding = typeof window === 'undefined' && process.env.NEXT_RUNNING_BUILD === 'true';

let pool: mysql.Pool | null = null;

if (!isBuilding) {
  if (!process.env.MYSQL_HOST) {
    throw new Error('MYSQL_HOST is not set');
  }

  pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT || '3306'),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
}

export default pool;
