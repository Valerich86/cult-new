import { Client } from "pg";
import { withDbClient } from "@/lib/db";

// Схема: создание таблиц (идемпотентно — безопасно вызывать много раз)
const createTablesQuery = `
  CREATE TABLE IF NOT EXISTS news (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    media_url VARCHAR(500),
    published_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS photos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    media_type VARCHAR(10),
    media_url VARCHAR(500),
    link_name VARCHAR(100),
    link_href VARCHAR(500),
    published_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
`;

// Индексы (тоже идемпотентны)
const createIndexesQuery = `
  CREATE INDEX IF NOT EXISTS idx_news_id ON news(id);
  CREATE INDEX IF NOT EXISTS idx_photos_media_url ON photos(media_url);
`;

export async function GET(req: Request) {
  try {
    await withDbClient(async (client) => {
      await client.query(createTablesQuery);
      await client.query(createIndexesQuery);
    });
    return Response.json({
      success: true,
      message: "Схема инициализирована, данные получены",
    });
  } catch (error) {
    console.error("API GET error:", error);
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
