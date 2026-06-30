import { pool } from "./db";

export type News = {
  id: string;
  title: string;
  content: string;
  media_type: "image"|"video",
  media_url: string;
  link_name?: string;
  link_href?: string;
  published_at: string;
}

export async function getNews (limit?:number):Promise<News[]> {
  let query = "SELECT * FROM news ORDER BY published_at DESC";
  if (limit) query += ` LIMIT ${limit}`;
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Ошибка получения данных:", error);
    return [];
  }
}

export async function getOneNewsItem (id:string):Promise<News|null> {
  try {
    const result = await pool.query("SELECT * FROM news WHERE id=$1", [id]);
    return result.rows[0];
  } catch (error) {
    console.error("Ошибка получения данных:", error);
    return null;
  }
}