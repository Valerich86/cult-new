import { NextResponse, NextRequest } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { pool } from "@/lib/db";
import { useCloudPath, bucketName, s3Client} from "@/lib/cloud";

async function uploadFileToCloud(
  file: File,
  fileName: string,
): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const cloudPath = useCloudPath();

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileName,
    Body: buffer,
    ContentType: file.type,
    ACL: "public-read",
  });
  await s3Client.send(command);
  return `${cloudPath}/${fileName}`;
}

function generateFileName(originalName: string): string {
  const timestamp = Date.now();
  const extension = originalName.split(".").pop();
  return `news/${timestamp}-${Math.random().toString(36).substring(2, 8)}.${extension}`;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const title =
      formData.get("title")?.toString() !== ""
        ? formData.get("title")?.toString()
        : undefined;
    const content = formData.get("content")?.toString() || "";

    // Инициализируем поле для файла

    const media = formData.get("media") as File | null;
    if (!media) {
      return NextResponse.json(
      {error: `Ошибка получения данных файла`},
      { status: 500 },
    );
    }

    const fileName = generateFileName(media.name);
    const media_url = await uploadFileToCloud(media, fileName);

    console.log(media_url)
    
    const result = await pool.query(`
      INSERT INTO news (title, content, media_url)
      VALUES ($1, $2, $3) RETURNING id;
    `, [title, content, media_url]);

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {error: `Критическая ошибка: ${error}`},
      { status: 500 },
    );
  }
}

// export async function PUT(request: NextRequest) {
//   try {
//     const formData = await request.formData();
//     const type = formData.get("type") as Content["type"];
//     const title =
//       formData.get("title")?.toString() !== ""
//         ? formData.get("title")?.toString()
//         : undefined;
//     const info = formData.get("info")?.toString() || "";
//     const link_href = formData.get("link_href")?.toString();
//     const link_name = formData.get("link_name")?.toString();
//     const id = formData.get("id");

//     // Инициализируем поле для файла
//     let media_url: string | undefined;
//     const media = formData.get("media") as File | null;
//     if (media) {
//       const fileName = generateFileName(media.name);
//       media_url = await uploadFileToCloud(media, fileName);
//     } else {
//       // Если файл не выбран — получаем текущий media_url из БД
//       const currentMediaResult = await pool.query('SELECT media_url FROM content WHERE id = $1', [id]);
//       if (currentMediaResult.rows.length > 0) {
//         media_url = currentMediaResult.rows[0].media_url;
//       }
//     }
//     const query = `
//       UPDATE content SET type=$1, title=$2, info=$3, media_url=$4, link_href=$5, link_name=$6 WHERE id=$7;
//     `;
//     const values = [type, title, info, media_url, link_href, link_name, Number(id)];
//     const result = await pool.query(query, values);
//     return NextResponse.json({ status: 200 });
//   } catch (error) {
//     console.error("Ошибка изменения данных:", error);
//     return NextResponse.json({ status: 500 });
//   }
// }

export async function GET(request: Request) {
  try {
    const news = await pool.query(
      `SELECT * FROM news ORDER BY published_at DESC;`
    );
    return NextResponse.json(news.rows);
  } catch (error) {
    return NextResponse.json({error: `Критическая ошибка: ${error}`}, { status: 500 });
  }
}