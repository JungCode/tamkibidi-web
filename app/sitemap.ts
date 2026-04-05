import type { MetadataRoute } from 'next';

import { siteConfig } from './site-config';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      changeFrequency: 'weekly',
      lastModified: new Date(),
      priority: 1,
      url: siteConfig.siteUrl,
    },
  ];
}
