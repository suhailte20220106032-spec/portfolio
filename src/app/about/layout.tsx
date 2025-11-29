'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Award, Clock, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isRootAbout = pathname === '/about';

  const subPages = [
    { to: '/about/skills', label: 'Skills', icon: Code },
    { to: '/about/timeline', label: 'Timeline', icon: Clock },
    { to: '/about/certificates', label: 'Certificates', icon: Award },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <User className="h-8 w-8 text-primary" />
            <h1 className="text-4xl sm:text-5xl font-serif font-bold">About Me</h1>
          </div>

          <div className="flex flex-wrap gap-4 mb-12">
            {subPages.map(({ to, label, icon: Icon }) => (
              <Button
                key={to}
                asChild
                variant={pathname === to ? 'default' : 'outline'}
              >
                <Link href={to}>
                  <Icon className="h-4 w-4 mr-2" />
                  {label}
                </Link>
              </Button>
            ))}
          </div>

          {isRootAbout ? (
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="bg-card rounded-lg p-8 shadow-lg border border-border/50">
                <h2 className="text-2xl font-serif font-semibold mb-4">Welcome!</h2>
                <p className="text-muted-foreground mb-4">
                  I&apos;m a passionate developer with a keen interest in creating beautiful and functional web applications. 
                  My journey in tech has been driven by curiosity and a desire to solve real-world problems through code.
                </p>
                <p className="text-muted-foreground mb-4">
                  With years of experience in web development, I&apos;ve worked on various projects ranging from small business 
                  websites to complex web applications. I believe in writing clean, maintainable code and staying up-to-date 
                  with the latest technologies.
                </p>
                <p className="text-muted-foreground mb-6">
                  When I&apos;m not coding, you can find me exploring new technologies, contributing to open-source projects, 
                  or sharing knowledge with the developer community.
                </p>
                
                <div className="border-t border-border/50 pt-6">
                  <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {subPages.map(({ to, label, icon: Icon }) => (
                      <Link
                        key={to}
                        href={to}
                        className="flex items-center gap-3 p-4 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-accent/50 transition-all group"
                      >
                        <Icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                        <span className="font-medium">{label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
}
