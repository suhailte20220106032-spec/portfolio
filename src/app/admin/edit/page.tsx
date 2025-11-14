'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Post, PostFrontmatter } from '@/types/post';
import { generateSlug } from '@/lib/posts';

export default function EditPostPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [postSlug, setPostSlug] = useState('');
  const [published, setPublished] = useState(true);
  const [loading, setLoading] = useState(!!slug);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Auto-generate slug from title
  useEffect(() => {
    if (title && !slug) {
      setPostSlug(generateSlug(title));
    }
  }, [title, slug]);

  // Fetch post if editing
  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/admin/posts/${slug}`);
        if (!response.ok) throw new Error('Failed to fetch post');

        const data = await response.json();
        const post = data.post;
        setTitle(post.title);
        setContent(post.content);
        setExcerpt(post.excerpt || '');
        setPostSlug(post.slug);
        setPublished(post.published);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const body = { title, content, excerpt, published, slug: postSlug };
      const method = slug ? 'PUT' : 'POST';
      const url = slug ? `/api/admin/posts/${slug}` : '/api/admin/posts';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save post');
      }

      router.push('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>{slug ? 'Edit Post' : 'Create New Post'}</h1>
        <button className="btn btn-secondary" onClick={() => router.push('/admin')}>
          Back to Dashboard
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="card p-4">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title *
          </label>
          <input
            id="title"
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="slug" className="form-label">
            Slug
          </label>
          <input
            id="slug"
            type="text"
            className="form-control"
            value={postSlug}
            onChange={(e) => setPostSlug(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="excerpt" className="form-label">
            Excerpt
          </label>
          <input
            id="excerpt"
            type="text"
            className="form-control"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Short description of the post"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content (Markdown) *
          </label>
          <textarea
            id="content"
            className="form-control"
            rows={15}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            placeholder="Write your post in Markdown..."
          />
        </div>

        <div className="mb-3 form-check">
          <input
            id="published"
            type="checkbox"
            className="form-check-input"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          <label htmlFor="published" className="form-check-label">
            Publish this post
          </label>
        </div>

        <div className="d-flex gap-2">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Post'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => router.push('/admin')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
