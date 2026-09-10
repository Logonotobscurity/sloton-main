import { MetadataRoute } from 'next';
import { getSitemapEntries } from '@/lib/data/site-index';

export default function sitemap(): MetadataRoute.Sitemap {
  return getSitemapEntries();
}
