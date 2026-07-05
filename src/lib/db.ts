import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT || '3306', 10),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// pool.getConnection()
//   .then(connection => {
//     console.log('Успешное подключение к базе данных MySQL');
//     connection.release();
//   })
//   .catch(err => {
//     console.error('Ошибка подключения к базе данных:', err);
//   });

export default pool;