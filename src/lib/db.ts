// import { Pool } from 'pg';

// export const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: true,
//   },
// });

import { Client, QueryResult } from 'pg';

export async function withDbClient<T>(
  callback: (client: Client) => Promise<T>
): Promise<T> {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    // Никаких ssl: { rejectUnauthorized: false } — это антипаттерн для продакшена.
    // Для разных провайдеров достаточно валидного SSL (он уже в DATABASE_URL).
  });

  await client.connect();

  try {
    return await callback(client);
  } catch (error) {
    console.error('DB error:', error);
    throw error;
  } finally {
    await client.end(); // Гарантированно закрываем соединение
  }
}
