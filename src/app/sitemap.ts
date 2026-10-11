import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'
import { getAllCaseStudies } from '@/lib/case-studies'
import { getAllWritingPosts } from '@/lib/writing'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url
  const now = new Date()

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1
    },
    {
      url: `${base}/work`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9
    },
    ...getAllCaseStudies().map((study) => ({
      url: `${base}/work/${study.slug}`,
      changeFrequency: 'yearly' as const,
      priority: 0.8
    })),
    {
      url: `${base}/writing`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    ...getAllWritingPosts().map((post) => ({
      url: `${base}/writing/${post.slug}`,
      lastModified: new Date(post.frontmatter.date),
      changeFrequency: 'yearly' as const,
      priority: 0.7
    }))
  ]
}
