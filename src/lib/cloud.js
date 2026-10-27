import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

export const baseUrl = "https://hb.ru-msk.vkcloud-storage.ru";
export const bucketName = "cult-test";

export function getCloudPath() {
  return `${baseUrl}/${bucketName}`;
}

export function getS3Client() {
  const endpoint = baseUrl;
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  if (!accessKeyId) {
    throw new Error("AWS_ACCESS_KEY_ID is not set in environment variables");
  }
  if (!secretAccessKey) {
    throw new Error("AWS_SECRET_ACCESS_KEY is not set in environment variables");
  }

  return new S3Client({
    endpoint: endpoint,
    region: "ru-msk", // Обязательно для @aws-sdk/client-s3, даже при кастомном endpoint
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
    forcePathStyle: true, // Критично для S3‑совместимых хранилищ (VK Cloud)
  });
  // console.log("Да сколько можно уже!???")
}

export async function getGallery(folder, limit = 0) {
  try {
    const s3Client = getS3Client();

    const command = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: `${folder}/`,
      Delimiter: "/",
    });

    const response = await s3Client.send(command);
    const contents = response.Contents || [];

    let photos = contents
      .filter((obj) => obj.Key !== `${folder}/`)
      .map(
        (obj) =>
          `${baseUrl.replace(/\/$/, "")}/${bucketName.replace(/^\//, "")}/${obj.Key.replace(/^\/+/, "")}`,
      );

    // Перемешивание (Fisher–Yates)
    for (let i = photos.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [photos[i], photos[j]] = [photos[j], photos[i]];
    }

    if (limit > 0) {
      photos = photos.slice(0, limit);
    }

    return photos;
  } catch (error) {
    console.error("Ошибка получения данных:", error);
    throw error;
  }
}
