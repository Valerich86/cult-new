import { NextResponse, NextRequest } from "next/server";
import { generateFileName, uploadFileToCloud } from "../../../lib/utils";
import { deleteFromCloud } from "../../../lib/cloud";

export async function PUT(request: NextRequest) {
  const { url } = Object.fromEntries(
    new URL(request.url).searchParams,
  );
  try {
    await deleteFromCloud(url);
    const formData = await request.formData();
    const newFile = formData.get("media") as File | null;
    if (newFile) {
      const fileName = generateFileName(newFile.name, "tech");
      await uploadFileToCloud(newFile, fileName);
    }
    return NextResponse.json({ status: 204 });
  } catch (error) {
    console.error("Ошибка замены файла:", error);
    return NextResponse.json(
      { message: "Внутренняя ошибка сервера" },
      { status: 500 },
    );
  }
}
