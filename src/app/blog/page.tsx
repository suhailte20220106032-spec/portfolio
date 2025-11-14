'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import BlogCard from '../components/BlogCard';
import { Post } from '@/types/post';

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/admin/posts');
        if (response.ok) {
          const data = await response.json();
          // Filter to only published posts for public view
          const publishedPosts = data.posts.filter((post: Post) => post.published);
          setPosts(publishedPosts);
        }
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <div id="home" className="hero-area position-relative bg-half-120" style={{ background: 'url(/img/bg-hero.jpg) center center' }}>
        <div className="bg-overlay bg-overlay-white"></div>
        <div id="counter" className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12 text-center">
              <div className="page-next-level">
                <h4 className="title text-black"> Fuad </h4>
                <div className="page-next">
                  <nav aria-label="breadcrumb" className="d-inline-block">
                    <ul className="breadcrumb rounded mb-0 mt-3">
                      <li aria-current="page" className="breadcrumb-item active">
                        <a href="index" className="nuxt-link-active">Home</a>
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
      <section id="contact" className="section pb-0">
        <div className="container">
          <article>
            <section className="section">
              <div className="container">
                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : posts.length === 0 ? (
                  <div className="alert alert-info text-center" role="alert">
                    No blog posts yet. Check back soon!
                  </div>
                ) : (
                  <div className="row">
                    {posts.map((post) => (
                      <BlogCard key={post.slug} post={post} link={`/blog/${post.slug}`} />
                    ))}
                  </div>
                )}
              </div>
            </section>
          </article>
        </div>
      </section>
    </div>
  );
};

export default Blog;
