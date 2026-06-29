import { NextResponse } from "next/server";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { bucketName, s3Client } from "@/lib/cloud";
import { pool } from "@/lib/db";
import { generateFileName, uploadFileToCloud } from "../route";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const result = await pool.query(
      "DELETE FROM news WHERE id = $1 RETURNING media_url",
      [id],
    );

    // Если запись не найдена — возвращаем 404
    if (!result.rows.length || !result.rows[0].media_url) {
      return NextResponse.json(
        { message: "Новость не найдена" },
        { status: 404 },
      );
    }
    const mediaUrl = result.rows[0].media_url;
    await deleteFromCloud(mediaUrl, bucketName!);
    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    console.error("Ошибка удаления данных:", error);
    return NextResponse.json(
      { message: "Внутренняя ошибка сервера" },
      { status: 500 },
    );
  }
}

async function deleteFromCloud(url: string, bucket: string) {
  try {
    const parsedUrl = new URL(url);
    const pathname = parsedUrl.pathname;
    // pathname начинается с '/', поэтому убираем первый символ и разбиваем
    const parts = pathname.slice(1).split("/");
    // Проверяем, что первый сегмент пути совпадает с именем бакета
    // if (parts[0] !== bucket) {
    //   console.warn(
    //     `Бакет в URL (${parts[0]}) не совпадает с ожидаемым (${bucket})`,
    //   );
    //   // Попытка всё равно взять всё после первого сегмента, если формат нестандартный
    //   return parts.slice(1).join("/");
    // }
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
    const formData = await request.formData();
    const title =
      formData.get("title")?.toString() !== ""
        ? formData.get("title")?.toString()
        : undefined;
    const content = formData.get("content")?.toString() || "";

    const media = formData.get("media") as File | null;
    const currentMediaResult = await pool.query(
      "SELECT media_url FROM news WHERE id = $1",
      [id],
    );

    let currentMediaUrl = currentMediaResult.rows[0].media_url;
    if (media) {
      await deleteFromCloud (currentMediaUrl, bucketName!);
      const fileName = generateFileName(media.name);
      currentMediaUrl = await uploadFileToCloud(media, fileName);
    } 
    const query = `
      UPDATE news SET title=$1, content=$2, media_url=$3 WHERE id=$4;
    `;
    const values = [title, content, currentMediaUrl, id];
    const result = await pool.query(query, values);
    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json(
      {error: `Критическая ошибка: ${error}`},
      { status: 500 },
    );
  }
}
