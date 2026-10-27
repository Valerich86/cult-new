import { PutObjectCommand } from "@aws-sdk/client-s3";
import { bucketName, getCloudPath, getS3Client } from "./cloud";

export const photoComposition = [
  "inset-0",
  "top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2",
  "right-0 bottom-0",
  "left-0 bottom-0",
  "right-0 top-0",
];

export const masters = [
  { name: "Андрей", id: "tan" },
  { name: "Соня", id: "sonya" },
  { name: "Артур", id: "arthur" },
];

export type VkReview = {
  id: number;
  text: string;
  date: number; // unix-время
  authorName: string;
  authorPhoto?: string;
  vkHref?: string;
};

export async function uploadFileToCloud(
  file: File,
  fileName: string,
): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const cloudPath = getCloudPath();
  try {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
      ACL: "public-read",
    });
    const s3Client = getS3Client();
    await s3Client.send(command);
  } catch (error) {
    console.error(error);
  }
  return `${cloudPath}/${fileName}`;
}

export function generateFileName(originalName: string): string {
  const timestamp = Date.now();
  const extension = originalName.split(".").pop();
  return `news/${timestamp}-${Math.random().toString(36).substring(2, 8)}.${extension}`;
}
