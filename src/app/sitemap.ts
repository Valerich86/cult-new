import { MetadataRoute } from 'next';
import { mastersInfo } from '../lib/text';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.BASE_URL?.trim().replace(/\/$/, '') ?? 'https://cult.na4u.ru';

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/news`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  ];

  const masterPages: MetadataRoute.Sitemap = mastersInfo.map((m) => ({
    url: `${baseUrl}/masters/${m.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticPages, ...masterPages];
}
