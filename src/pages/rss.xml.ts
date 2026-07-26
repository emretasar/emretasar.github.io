import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getPublishedPosts } from '../lib/blog';
import { siteConfig } from '../lib/site';

export const GET: APIRoute = async (context) => {
  const posts = await getPublishedPosts();
  return rss({
    title: `${siteConfig.name} — Blog`,
    description: siteConfig.description,
    site: context.site ?? 'https://your-domain.com',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedAt,
      link: `/blog/${post.id}`,
    })),
  });
};
