import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.BASE_URL?.trim().replace(/\/$/, '') ?? 'https://culttattoo.ru';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/auth/',
        '/_next/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
