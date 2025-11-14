import { Post, PostFrontmatter } from '@/types/post';
import matter from 'gray-matter';
import slugify from 'slugify';

export function parseMarkdown(markdown: string): { frontmatter: PostFrontmatter; content: string } {
  const { data, content } = matter(markdown);
  
  const frontmatter: PostFrontmatter = {
    title: data.title || 'Untitled',
    slug: data.slug || generateSlug(data.title || 'untitled'),
    publishedAt: data.publishedAt || new Date().toISOString(),
    updatedAt: data.updatedAt || new Date().toISOString(),
    published: data.published !== false,
    excerpt: data.excerpt || null,
    tags: data.tags || [],
  };

  return { frontmatter, content: content.trim() };
}

export function stringifyPost(frontmatter: PostFrontmatter, content: string): string {
  const frontmatterStr = `---
title: ${frontmatter.title}
slug: ${frontmatter.slug}
publishedAt: ${frontmatter.publishedAt}
updatedAt: ${frontmatter.updatedAt}
published: ${frontmatter.published}
${frontmatter.excerpt ? `excerpt: ${frontmatter.excerpt}` : ''}
${frontmatter.tags && frontmatter.tags.length > 0 ? `tags: [${frontmatter.tags.map((t) => `"${t}"`).join(', ')}]` : ''}
---`;

  return `${frontmatterStr}\n\n${content}`;
}

export function generateSlug(title: string): string {
  return slugify(title, { lower: true, strict: true });
}

export function createPost(frontmatter: PostFrontmatter, content: string): Post {
  return {
    ...frontmatter,
    content,
  };
}
