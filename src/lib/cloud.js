import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

export const baseUrl = process.env.NEXT_PUBLIC_VK_CLOUD_ENDPOINT;
export const bucketName = process.env.NEXT_PUBLIC_VK_CLOUD_BUCKET;

export function getCloudPath() {
  return `${baseUrl}/${bucketName}`;
}

export const s3Client = new S3Client({
  region: "ru-msk",
  endpoint: baseUrl,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
});

export async function getGallery(folder, limit = 0) {
  try {
    const command = new ListObjectsV2Command({
      Bucket: bucketName, // имя вашего бакета
      Prefix: `${folder}/`, // путь к папке (обязательно с / в конце!)
      Delimiter: "/", // опционально: ограничивает вывод только объектами в указанной папке (без подпапок)
    });
    const response = await s3Client.send(command);
    const contents = response.Contents || [];

    let photos = contents
      .filter((obj) => obj.Key !== `${folder}/`) // убираем саму папку из списка, если она попала
      .map(
        (obj) =>
          `${baseUrl.replace(/\/$/, "")}/${bucketName.replace(/^\//, "")}/${obj.Key.replace(/^\/+/, "")}`,
      );

    for (let i = photos.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [photos[i], photos[j]] = [photos[j], photos[i]];
    }

    if (limit !== 0) {
      photos = photos.slice(0, limit);
    }

    return photos;
  } catch (error) {
    console.error("Ошибка получения данных:", error);
    throw error;
  }
}
