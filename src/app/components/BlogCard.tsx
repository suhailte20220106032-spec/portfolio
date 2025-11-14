'use client';

import React from 'react';
import Link from 'next/link';
import { Post } from '@/types/post';

interface BlogCardProps {
  post: Post;
  link: string;
}

export default function BlogCard({ post, link }: BlogCardProps) {
  return (
    <div className="col-lg-4 col-md-6 mb-4 pb-2">
      <div className="pad-right-left m-2">
        <div className="blog-post rounded customer-testi">
          <div className="content pt-4 pb-4 p-3">
            <h5 className="mb-3 text-dark" style={{ minHeight: '60px' }}>
              {post.title}
            </h5>
            <p className="text-muted" style={{ minHeight: '80px' }}>
              {post.excerpt || post.content.substring(0, 150).replace(/[#*_`-]/g, '')}...
            </p>
            <div className="post-meta d-flex justify-content-between align-items-center mt-3">
              <small className="text-muted">
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </small>
              <Link href={link} className="text-muted readmore">
                Read more <i className="mdi mdi-chevron-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
