'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Post } from '@/types/post';
import Navbar from '@/app/components/Navbar';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/admin/posts/${slug}`);
        if (!response.ok) {
          throw new Error('Post not found');
        }

        const data = await response.json();
        setPost(data.post);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div>
        <Navbar />
        <div className="container mt-5 text-center">
          <h2>Post Not Found</h2>
          <p className="text-muted">{error || 'The blog post you are looking for does not exist.'}</p>
          <Link href="/blog" className="btn btn-primary mt-3">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Simple markdown to HTML converter (basic)
  const renderMarkdown = (markdown: string) => {
    let html = markdown
      // Headers
      .replace(/^### (.*?)$/gm, '<h3 className="mt-4 mb-2">$1</h3>')
      .replace(/^## (.*?)$/gm, '<h2 className="mt-4 mb-2">$1</h2>')
      .replace(/^# (.*?)$/gm, '<h1 className="mt-4 mb-2">$1</h1>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/__(.+?)__/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/_(.+?)_/g, '<em>$1</em>')
      // Line breaks
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br />');

    return `<p>${html}</p>`;
  };

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
