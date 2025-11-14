import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { listPosts, createPost } from '@/lib/github';
import { generateSlug, parseMarkdown } from '@/lib/posts';
import { PostFrontmatter } from '@/types/post';

export async function GET(request: NextRequest) {
  try {
    const posts = await listPosts();
    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, content, excerpt, tags, published } = body;

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const slug = generateSlug(title);
    const frontmatter: PostFrontmatter = {
      title,
      slug,
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      published: published !== false,
      excerpt: excerpt || undefined,
      tags: tags || [],
    };

    const result = await createPost(frontmatter, content);
    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: error.message || 'Failed to create post' }, { status: 500 });
  }
}
