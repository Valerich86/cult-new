import { pool } from "@/lib/db";

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

const createIndexesQuery = `
  CREATE INDEX IF NOT EXISTS idx_news_id ON news(id);
  
`;

export async function GET(req: Request) {
  try {
    await pool.query("BEGIN");
    await pool.query(createTablesQuery);
    await pool.query(createIndexesQuery);
    await pool.query("INSERT INTO photos (media_url) VALUES ('какой-то URL')")
    const result = await pool.query("SELECT * FROM photos");
    await pool.query("COMMIT");
    return Response.json({result: result.rows});
  } catch (error) {
    pool.query("ROLLBACK");
    return Response.json({ error: error }, { status: 500 });
  }
}
