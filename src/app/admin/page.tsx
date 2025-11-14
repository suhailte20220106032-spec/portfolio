'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Post } from '@/types/post';
import PostList from './components/PostList';

export default function AdminDashboard() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/posts');
        if (response.status === 401) {
          router.push('/admin/login');
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data = await response.json();
        setPosts(data.posts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const handlePostDeleted = (slug: string) => {
    setPosts(posts.filter((p) => p.slug !== slug));
  };

  const handleNewPost = () => {
    router.push('/admin/edit');
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
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Blog Admin Dashboard</h1>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-4">
        <button className="btn btn-primary" onClick={handleNewPost}>
          Create New Post
        </button>
      </div>

      <PostList posts={posts} onPostDeleted={handlePostDeleted} />
    </div>
  );
}
