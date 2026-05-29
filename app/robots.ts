import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL!
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard/', '/onboarding/', '/go/'],
      },
    ],
    sitemap: `${appUrl}/sitemap.xml`,
  }
}