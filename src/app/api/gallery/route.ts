import { NextResponse, NextRequest } from "next/server";
import { generateFileName, uploadFileToCloud } from "../../../lib/utils";
import { deleteFromCloud } from "../../../lib/cloud";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const folder = formData.get("folder")?.toString() || "";
    const media = formData.get("media") as File | null;
    if (!media) {
      return NextResponse.json(
        { error: `Ошибка получения данных файла` },
        { status: 500 },
      );
    }
    const fileName = generateFileName(media.name, folder);
    const mediaUrl = await uploadFileToCloud(media, fileName);
    console.log("file uploaded");
    return NextResponse.json({}, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: `Критическая ошибка: ${error}` },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  const { url } = Object.fromEntries(
    new URL(request.url).searchParams,
  );
  console.log(url);
  try {
    await deleteFromCloud(url);
    return NextResponse.json({ status: 204 });
  } catch (error) {
    console.error("Ошибка удаления данных:", error);
    return NextResponse.json(
      { message: "Внутренняя ошибка сервера" },
      { status: 500 },
    );
  }
}
