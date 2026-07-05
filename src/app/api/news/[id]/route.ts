import { NextResponse } from "next/server";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { bucketName, s3Client } from "@/lib/cloud";
import pool from "@/lib/db";
import { generateFileName, uploadFileToCloud } from "../route";
import { RowDataPacket } from "mysql2";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const numId = Number(id);

  try {
    const [result] = await pool.execute<RowDataPacket[]>(
      "SELECT media_url FROM news WHERE id = ?", [numId],
    );
    if (!result[0] || !result[0].media_url) {
      return NextResponse.json(
        { message: "Новость не найдена" },
        { status: 404 },
      );
    }
    await pool.execute(
      "DELETE FROM news WHERE id = ?", [numId],
    );
    await deleteFromCloud(result[0].media_url);
    return NextResponse.json({ status: 204 });
  } catch (error) {
    console.error("Ошибка удаления данных:", error);
    return NextResponse.json(
      { message: "Внутренняя ошибка сервера" },
      { status: 500 },
    );
  }
}

async function deleteFromCloud(url: string) {
  try {
    const parsedUrl = new URL(url);
    const pathname = parsedUrl.pathname;
    const parts = pathname.slice(1).split("/");
    const key = parts.slice(1).join("/");
    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    });
    await s3Client.send(command);
  } catch (e) {
    console.warn("Не удалось удалить файл:", url);
    return NextResponse.json({}, { status: 204 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const numId = Number(id);
    const formData = await request.formData();
    const title = formData.get("title")?.toString() || "";
    const content = formData.get("content")?.toString() || "";
    const linkName = formData.get("linkName")?.toString() || "";
    const linkHref = formData.get("linkHref")?.toString() || "";

    const media = formData.get("media") as File | null;
    const [currentMediaResult] = await pool.execute<RowDataPacket[]>(
      "SELECT media_url, media_type FROM news WHERE id = ?", [numId],
    );

    let currentMediaUrl = currentMediaResult[0].media_url;
    let currentMediaType = currentMediaResult[0].media_type;
    if (media) {
      currentMediaType = media.type.startsWith("image/") ? "image" : "video";
      await deleteFromCloud(currentMediaUrl);
      const fileName = generateFileName(media.name);
      currentMediaUrl = await uploadFileToCloud(media, fileName);
    }
    const query = `
      UPDATE news SET title=?, content=?, media_url=?, 
      media_type=?, link_name=?, link_href=? WHERE id=?;
    `;
    const values = [
      title,
      content,
      currentMediaUrl,
      currentMediaType,
      linkName,
      linkHref,
      numId,
    ];
    await pool.execute(query, values);
    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Критическая ошибка: ${error}` },
      { status: 500 },
    );
  }
}
