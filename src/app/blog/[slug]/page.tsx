import React from 'react';
import Link from 'next/link';
import { Post } from '@/types/post';
import Navbar from '@/app/components/Navbar';

interface PageProps {
  params: {
    slug: string;
  };
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/admin/posts/${slug}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.post || null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps) {
  const post = await getPost(params.slug);
  return {
    title: post?.title || 'Post Not Found',
    description: post?.excerpt || 'Read this blog post',
  };
}

function renderMarkdown(markdown: string) {
  let html = markdown
    // Headers
    .replace(/^### (.*?)$/gm, '<h3 style="margin-top: 1.5rem; margin-bottom: 0.5rem;">$1</h3>')
    .replace(/^## (.*?)$/gm, '<h2 style="margin-top: 1.5rem; margin-bottom: 0.5rem;">$1</h2>')
    .replace(/^# (.*?)$/gm, '<h1 style="margin-top: 1.5rem; margin-bottom: 0.5rem;">$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.+?)__/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/_(.+?)_/g, '<em>$1</em>')
    // Code blocks - split across lines to avoid s flag
    .replace(/```[\s\S]*?```/g, (match) => {
      const code = match.slice(3, -3);
      return `<pre style="background: #f5f5f5; padding: 1rem; overflow-x: auto;"><code>${code}</code></pre>`;
    })
    // Inline code
    .replace(/`([^`]+)`/g, '<code style="background: #f5f5f5; padding: 0.2rem 0.4rem; border-radius: 3px;">$1</code>')
    // Line breaks
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br />');

  return `<p>${html}</p>`;
}

export default async function BlogPostPage({ params }: PageProps) {
  const slug = params.slug;
  const post = await getPost(slug);

  if (!post) {
    return (
      <div>
        <Navbar />
        <div className="container mt-5 text-center">
          <h2>Post Not Found</h2>
          <p className="text-muted">The blog post you are looking for does not exist.</p>
          <Link href="/blog" className="btn btn-primary mt-3">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div id="home" className="hero-area position-relative bg-half-120" style={{ background: 'url(/img/bg-hero.jpg) center center' }}>
        <div className="bg-overlay bg-overlay-white"></div>
        <div id="counter" className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12 text-center">
              <div className="page-next-level">
                <h4 className="title text-black">Blog</h4>
                <div className="page-next">
                  <nav aria-label="breadcrumb" className="d-inline-block">
                    <ul className="breadcrumb rounded mb-0 mt-3">
                      <li className="breadcrumb-item">
                        <Link href="/" className="text-muted">
                          Home
                        </Link>
                      </li>
                      <li className="breadcrumb-item">
                        <Link href="/blog" className="text-muted">
                          Blog
                        </Link>
                      </li>
                      <li aria-current="page" className="breadcrumb-item active">
                        {post.title}
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Navbar />

      <section className="section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <article className="blog-article">
                <h1 className="mb-3">{post.title}</h1>

                <div className="blog-meta mb-4 pb-3 border-bottom">
                  <small className="text-muted">
                    Published on{' '}
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </small>
                </div>

                <div
                  className="blog-content"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
                  style={{ lineHeight: '1.8', fontSize: '1.05rem', color: '#333' }}
                />

                <div className="mt-5 pt-4 border-top">
                  <Link href="/blog" className="btn btn-primary">
                    Back to Blog
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}