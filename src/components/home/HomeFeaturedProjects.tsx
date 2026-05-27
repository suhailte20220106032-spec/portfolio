'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Cpu, Database } from 'lucide-react';
import Link from 'next/link';

export default function HomeFeaturedProjects() {
  const projects = [
    {
      id: 1,
      title: 'NFC Card Activation System',
      category: 'Hardware-Software Integration',
      icon: Cpu,
      headline: 'Physical-Digital Bridge: Real-time Hardware Integration at Scale',
      description:
        'Architected an end-to-end NFC system managing 200+ users with real-time synchronization across hardware and digital layers. Built custom ESP32 NFC reader prototype with sensor integration, paired with Supabase-powered backend and responsive Next.js frontend for comprehensive user management and data visualization.',
      insights: [
        'Proved feasibility of real-time hardware-software integration at production scale',
        'Demonstrated scalability from prototype validation to 200+ active users'
      ],
      accentColor: 'from-cyan-500 to-blue-500'
    },
    {
      id: 2,
      title: 'Event Management Ecosystem',
      category: 'Software Architecture',
      icon: Database,
      headline: 'Scalable Digital Infrastructure for Complex Organizational Operations',
      description:
        'Designed and deployed a modular event management platform supporting 40+ student organizations with minimal resource constraints. Built on Next.js frontend with Supabase backend enabling real-time event data management, multi-organization support, and participant tracking across numerous concurrent operations.',
      insights: [
        'Optimized architectural decisions under real-world budget constraints',
        'Validated scalable system design supporting organizational growth from 0 to 40+ entities'
      ],
      accentColor: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3 text-foreground">
            Featured Work
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            End-to-end systems demonstrating hardware-software integration and scalable architecture
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => {
            const IconComponent = project.icon;
            return (
              <Card
                key={project.id}
                className="border border-border/50 overflow-hidden hover:border-border/80 transition-all duration-300 hover:shadow-lg dark:hover:shadow-lg/20 bg-card/50 backdrop-blur-sm flex flex-col"
              >
                {/* Project Image/Icon Area */}
                <div className={`h-40 bg-gradient-to-br ${project.accentColor} opacity-10 flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                  <IconComponent className="h-16 w-16 text-primary/40" />
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Badge variant="outline" className="text-xs font-medium">
                      {project.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl font-semibold text-foreground leading-tight">
                    {project.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col pb-4">
                  {/* Headline */}
                  <h3 className="text-sm font-semibold text-primary mb-3 italic">
                    {project.headline}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Key Insights */}
                  <div className="space-y-2 mb-6 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Key Insights
                    </p>
                    <ul className="space-y-2">
                      {project.insights.map((insight, idx) => (
                        <li key={idx} className="flex gap-2 text-xs text-muted-foreground">
                          <span className="text-primary mt-1">•</span>
                          <span>{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <Button
                    asChild
                    variant="outline"
                    className="w-full group hover:bg-primary/10 dark:hover:bg-primary/20"
                  >
                    <Link href="/portfolio">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* View All Projects CTA */}
        <div className="mt-12 text-center">
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg"
          >
            <Link href="/portfolio">
              View All Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
