import { NextResponse } from "next/server";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { bucketName, s3Client } from "@/lib/cloud";
// import { pool } from "@/lib/db";
import { withDbClient } from "@/lib/db";
import { generateFileName, uploadFileToCloud } from "../route";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const result = await withDbClient(async(client) => {
      const res = await client.query(
        "DELETE FROM news WHERE id = $1 RETURNING media_url",
        [id],
      );
      return res.rows[0];
    })

    // Если запись не найдена — возвращаем 404
    if (!result || !result.media_url) {
      return NextResponse.json(
        { message: "Новость не найдена" },
        { status: 404 },
      );
    }
    await deleteFromCloud(result.media_url);
    return NextResponse.json({}, { status: 204 });
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
    const formData = await request.formData();
    const title =
      formData.get("title")?.toString() !== ""
        ? formData.get("title")?.toString()
        : undefined;
    const content = formData.get("content")?.toString() || "";
    const linkName = formData.get("linkName")?.toString() || "";
    const linkHref = formData.get("linkHref")?.toString() || "";

    const media = formData.get("media") as File | null;
    const currentMediaResult = await withDbClient(async(client) => {
      const res = await client.query(
        "SELECT media_url, media_type FROM news WHERE id = $1",
        [id],
      );
      return res.rows[0];
    })
    let currentMediaUrl = currentMediaResult.media_url;
    let currentMediaType = currentMediaResult.media_type;
    if (media) {
      currentMediaType = media.type.startsWith("image/") ? "image" : "video";
      await deleteFromCloud (currentMediaUrl);
      const fileName = generateFileName(media.name);
      currentMediaUrl = await uploadFileToCloud(media, fileName);
    } 
    const query = `
      UPDATE news SET title=$1, content=$2, media_url=$3, 
      media_type=$4, link_name=$5, link_href=$6 WHERE id=$7;
    `;
    const values = [title, content, currentMediaUrl, currentMediaType, linkName, linkHref, id];
    await withDbClient(async(client) => {
      await client.query(query, values); 
    })
    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json(
      {error: `Критическая ошибка: ${error}`},
      { status: 500 },
    );
  }
}
