import { NextResponse, NextRequest } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import pool from "@/lib/db";
import { getCloudPath, bucketName, s3Client } from "@/lib/cloud";
import { QueryResult, ResultSetHeader } from "mysql2";

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
