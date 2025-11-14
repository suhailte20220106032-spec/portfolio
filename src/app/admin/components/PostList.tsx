'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Post } from '@/types/post';

interface PostListProps {
  posts: Post[];
  onPostDeleted: (slug: string) => void;
}

export default function PostList({ posts, onPostDeleted }: PostListProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleEdit = (slug: string) => {
    router.push(`/admin/edit?slug=${slug}`);
  };

  const handleDelete = async (slug: string) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    setDeleting(slug);
    try {
      const response = await fetch(`/api/admin/posts/${slug}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete post');

      onPostDeleted(slug);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete post');
    } finally {
      setDeleting(null);
    }
  };

  if (posts.length === 0) {
    return (
      <div className="alert alert-info" role="alert">
        No posts yet. Create one to get started!
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Published</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.slug}>
              <td>
                <strong>{post.title}</strong>
              </td>
              <td>
                <span className={`badge ${post.published ? 'bg-success' : 'bg-secondary'}`}>
                  {post.published ? 'Published' : 'Draft'}
                </span>
              </td>
              <td>{new Date(post.publishedAt).toLocaleDateString()}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => handleEdit(post.slug)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(post.slug)}
                  disabled={deleting === post.slug}
                >
                  {deleting === post.slug ? 'Deleting...' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
