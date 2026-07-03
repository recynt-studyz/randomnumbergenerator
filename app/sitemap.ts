import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://randomnumbergenerator.app'
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${base}/coin-flip`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/dice-roller`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/password-generator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/name-picker`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/random-color`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/spin-wheel`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/random-date`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/random-letter`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/yes-or-no`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/team-generator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
  ]
}
