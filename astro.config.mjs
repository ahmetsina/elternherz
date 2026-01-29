import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import compress from 'astro-compress'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import remarkGfm from 'remark-gfm'
import remarkSmartypants from 'remark-smartypants'
import rehypeExternalLinks from 'rehype-external-links'

// https://astro.build/config
export default defineConfig({
  site: 'https://elternherz.de',
  trailingSlash: 'always',
  integrations: [tailwind(), compress(), mdx(), sitemap()],
  i18n: {
    defaultLocale: 'de',
    locales: ['de', 'tr'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  markdown: {
    shikiConfig: {
      theme: 'nord',
    },
    remarkPlugins: [remarkGfm, remarkSmartypants],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: '_blank',
        },
      ],
    ],
  },
})
