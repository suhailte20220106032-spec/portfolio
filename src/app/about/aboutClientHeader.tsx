//app/about/about-layout-client.tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Award, Clock, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RipplesScript from '@/components/Ripple';
import TextReveal ,{TextFadeIn}from "@/components/TextReveal";

export default function AboutLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const subPages = [
    { to: '/about/skills', label: 'Skills', icon: Code },
    { to: '/about/timeline', label: 'Timeline', icon: Clock },
    { to: '/about/certificates', label: 'Certificates', icon: Award },
  ];

  return (
    <>
      <RipplesScript />
      <div className="min-h-screen">
        {/* Hero Section with Fixed Background */}
        <div
          className="water hero-with-overlay relative h-[400px] bg-cover bg-center bg-no-repeat bg-fixed"
          style={{
            backgroundImage: "url('/img/bg-hero.jpg')", // Replace with your image path
            backgroundPosition: 'center',
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/30" />

          {/* Hero Content */}
          <div className="relative h-full flex items-center justify-center">
            <div className="text-center px-4">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold text-foreground mb-4">
               <TextFadeIn duration={.8}>About Me</TextFadeIn> 
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto">

                <TextReveal duration={.5} delay={500}>Textile Engineer | AI Early Adopter | Technology Enthusiast</TextReveal>
              </p>
            </div>
          </div>
        </div>

        {/* Content Section - Scrolls over fixed background */}
        <div className="relative bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Navigation Buttons - Below Hero */}
              <div className="flex flex-wrap gap-4 py-8 justify-center">
                {subPages.map(({ to, label, icon: Icon }) => (
                  <Button
                    key={to}
                    asChild
                    variant={pathname === to ? 'default' : 'outline'}
                    size="lg"
                  >
                    <Link href={to}>
                      <Icon className="h-4 w-4 mr-2" />
                      {label}
                    </Link>
                  </Button>
                ))}
              </div>
              {/* Page-specific content */}
              <div className="pb-16">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}