import { NextResponse, NextRequest } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { pool } from "@/lib/db";
import { getCloudPath, bucketName, s3Client } from "@/lib/cloud";

export async function uploadFileToCloud(
  file: File,
  fileName: string,
): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const cloudPath = getCloudPath();

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

export function generateFileName(originalName: string): string {
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

    const media = formData.get("media") as File | null;
    if (!media) {
      return NextResponse.json(
      {error: `Ошибка получения данных файла`},
      { status: 500 },
    );
    }

    const fileName = generateFileName(media.name);
    const media_url = await uploadFileToCloud(media, fileName);

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




