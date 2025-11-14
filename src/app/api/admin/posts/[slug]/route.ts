import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getPost, updatePost, deletePost } from '@/lib/github';
import { PostFrontmatter } from '@/types/post';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    const post = await getPost(slug);

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const slug = params.slug;
    const body = await request.json();
    const { title, content, excerpt, tags, published } = body;

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const frontmatter: PostFrontmatter = {
      title,
      slug,
      publishedAt: body.publishedAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      published: published !== false,
      excerpt: excerpt || undefined,
      tags: tags || [],
    };

    const result = await updatePost(slug, frontmatter, content);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error updating post:', error);
    return NextResponse.json({ error: error.message || 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const slug = params.slug;
    const result = await deletePost(slug);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete post' }, { status: 500 });
  }
}
