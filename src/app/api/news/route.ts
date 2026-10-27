import { NextResponse, NextRequest } from "next/server";
import { getPool } from "../../../lib/db";
import { ResultSetHeader } from "mysql2";
import { generateFileName, uploadFileToCloud } from "../../../lib/utils";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const title = formData.get("title")?.toString() || "";
    const content = formData.get("content")?.toString() || "";
    const linkName = formData.get("linkName")?.toString() || "";
    const linkHref = formData.get("linkHref")?.toString() || "";
    const media = formData.get("media") as File | null;
    if (!media) {
      return NextResponse.json(
        { error: `Ошибка получения данных файла` },
        { status: 500 },
      );
    }
    const mediaType = media.type.startsWith("image/") ? "image" : "video";
    const fileName = generateFileName(media.name);
    const mediaUrl = await uploadFileToCloud(media, fileName);
    const pool = getPool(); 
    const [result] = await pool.execute<ResultSetHeader>(
      `INSERT INTO news (title, content, media_url, media_type, link_name, link_href)
        VALUES (?,?,?,?,?,?)`,
      [title, content, mediaUrl, mediaType, linkName, linkHref],
    );
    console.log("result.insertId: ", result.insertId);
    return NextResponse.json({}, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: `Критическая ошибка: ${error}` },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const pool = getPool(); 
    const [rows]: any[][] = await pool.execute('SELECT * FROM news ORDER BY published_at DESC');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Ошибка получения новостей:', error);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}
