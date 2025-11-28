import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, BookOpen } from 'lucide-react';

const Blog = () => {
  const blogPosts = [
    {
      title: 'Getting Started with React Server Components',
      excerpt: 'Learn how to leverage React Server Components to build faster, more efficient web applications with improved performance.',
      date: 'March 15, 2024',
      readTime: '8 min read',
      tags: ['React', 'Performance', 'Web Development'],
      featured: true
    },
    {
      title: 'TypeScript Best Practices in 2024',
      excerpt: 'Discover the latest TypeScript features and best practices that will help you write more maintainable and type-safe code.',
      date: 'March 10, 2024',
      readTime: '6 min read',
      tags: ['TypeScript', 'Best Practices', 'Tutorial'],
      featured: true
    },
    {
      title: 'Building Accessible Web Applications',
      excerpt: 'A comprehensive guide to web accessibility, covering WCAG guidelines and practical implementation strategies.',
      date: 'March 5, 2024',
      readTime: '10 min read',
      tags: ['Accessibility', 'Web Development', 'UX'],
      featured: false
    },
    {
      title: 'State Management in Modern React',
      excerpt: 'Comparing different state management solutions and when to use each one in your React applications.',
      date: 'February 28, 2024',
      readTime: '7 min read',
      tags: ['React', 'State Management', 'Architecture'],
      featured: false
    },
    {
      title: 'CSS Grid vs Flexbox: A Practical Guide',
      excerpt: 'Understanding when to use CSS Grid and when to use Flexbox for layout design with real-world examples.',
      date: 'February 22, 2024',
      readTime: '5 min read',
      tags: ['CSS', 'Layout', 'Tutorial'],
      featured: false
    },
    {
      title: 'Optimizing Web Performance',
      excerpt: 'Practical techniques and tools to measure and improve your web application\'s performance metrics.',
      date: 'February 15, 2024',
      readTime: '9 min read',
      tags: ['Performance', 'Optimization', 'Web Development'],
      featured: false
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="h-8 w-8 text-primary" />
            <h1 className="text-4xl sm:text-5xl font-serif font-bold">Blog</h1>
          </div>

          <p className="text-lg text-muted-foreground mb-12 max-w-3xl">
            Thoughts, tutorials, and insights about web development, technology, and everything in between.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {blogPosts.map((post, index) => (
              <Card 
                key={index} 
                className={`border-border/50 hover:border-primary/30 transition-all hover:shadow-xl group cursor-pointer ${
                  post.featured ? 'md:col-span-2' : ''
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <CardTitle className="text-xl font-serif group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    {post.featured && (
                      <Badge variant="default" className="shrink-0">Featured</Badge>
                    )}
                  </div>
                  <CardDescription className="text-base">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <Badge 
                        key={tag} 
                        variant="secondary"
                        className="text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
