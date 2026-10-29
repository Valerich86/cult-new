import mysql from 'mysql2/promise';

let pool: mysql.Pool | null = null;

export function getPool(): mysql.Pool {
  if (!pool) {
    const isDev = process.env.APP_ENV === 'development';
    if (!isDev) {
      const config = {
        host: process.env.DBHOST || 'localhost',
        user: process.env.DBUSER,
        password: process.env.DBPASS,
        database: process.env.DBNAME,
        socketPath: process.env.MYSQL_SOCKET,
      };

      if (!config.user || !config.password || !config.database) {
        throw new Error('Missing DB environment variables for production');
      }

      pool = mysql.createPool(config);
    } else {
      const connectionString = process.env.LOCAL_CONNECTION_STRING;
      if (!connectionString) {
        throw new Error('LOCAL_CONNECTION_STRING is not set');
      }
      pool = mysql.createPool(connectionString);
    }
  }
  return pool;
}
