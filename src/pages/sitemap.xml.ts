import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site?.href || 'https://elternherz.de/';
  
  // Get all blog posts
  let posts = [];
  try {
    posts = await getCollection('posts');
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }
  
  // Define static pages with their priorities and change frequencies
  const staticPages = [
    // German pages
    { url: '', priority: 1.0, changefreq: 'weekly', lang: 'de', alternates: [] },
    { url: 'about', priority: 0.8, changefreq: 'monthly', lang: 'de', alternates: [] },
    { url: 'kontakt', priority: 0.9, changefreq: 'monthly', lang: 'de', alternates: [{ lang: 'tr', url: 'tr/iletisim' }] },
    { url: 'blog', priority: 0.8, changefreq: 'weekly', lang: 'de', alternates: [] },
    
    // Turkish pages
    { url: 'tr/iletisim', priority: 0.9, changefreq: 'monthly', lang: 'tr', alternates: [{ lang: 'de', url: 'kontakt' }] },
  ];
  
  // Helper function to escape XML special characters
  const escapeXml = (str: string): string => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  };
  
  // Generate XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${staticPages.map(page => {
    const pageUrl = escapeXml(`${siteUrl}${page.url}`);
    const alternates = page.alternates.map(alt => 
      `    <xhtml:link rel="alternate" hreflang="${escapeXml(alt.lang)}" href="${escapeXml(siteUrl + alt.url)}" />`
    ).join('\n');
    
    return `  <url>
    <loc>${pageUrl}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>${alternates ? '\n' + alternates : ''}
  </url>`;
  }).join('\n')}
${posts.map(post => {
    const postUrl = escapeXml(`${siteUrl}blog/${post.data.slug}`);
    const lastmod = post.data.publishDate ? new Date(post.data.publishDate).toISOString().split('T')[0] : '';
    
    return `  <url>
    <loc>${postUrl}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  }).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
