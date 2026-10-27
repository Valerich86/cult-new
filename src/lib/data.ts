import { getPool } from "./db";
import { RowDataPacket } from "mysql2/promise";

export type News = {
  id: number;
  title: string;
  content: string;
  media_type: "image" | "video";
  media_url: string;
  link_name?: string;
  link_href?: string;
  published_at: string;
};

export type User = {
  id: number;
  email: string;
  password_hash: string;
}

export async function getNews(limit?: number){
  let query = 'SELECT * FROM news ORDER BY published_at DESC';
  if (limit) query += ` LIMIT ${limit}`;
  try {
    const pool = getPool(); 
    const [result] = await pool.execute(query);
    return result as News[];
  } catch (error) {
    console.error('Ошибка получения данных:', error);
    return [];
  } 
}

export async function getOneNewsItem(id: string) {
  try {
    const pool = getPool(); 
    const [result] = await pool.execute<RowDataPacket[]>('SELECT * FROM news WHERE id = ?', [id]);
    return result[0] as News;
  } catch (error) {
    console.error('Ошибка получения данных:', error);
    return null;
  }
}
