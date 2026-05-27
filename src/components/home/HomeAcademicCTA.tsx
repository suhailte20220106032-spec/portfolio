'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, FileText, Briefcase, Mail } from 'lucide-react';
import Link from 'next/link';

export default function HomeAcademicCTA() {
  const ctas = [
    {
      icon: FileText,
      title: 'Academic CV & Resume',
      description: 'View my comprehensive academic credentials, research interests, and technical qualifications',
      href: '/resume',
      label: 'View Academic CV',
      isPrimary: true
    },
    {
      icon: Briefcase,
      title: 'Full Portfolio',
      description: 'Explore detailed project documentation, case studies, and technical implementations',
      href: '/portfolio',
      label: 'View Portfolio',
      isPrimary: false
    },
    {
      icon: Mail,
      title: 'Get In Touch',
      description: 'Reach out directly for collaboration, research discussions, or academic inquiries',
      href: '/contact',
      label: 'Contact Me',
      isPrimary: false
    }
  ];

  return (
    <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3 text-foreground">
            Ready to Explore Collaboration?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Whether you are looking to discuss research opportunities, review my technical work, or start a conversation
          </p>
        </div>

        {/* CTAs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {ctas.map((cta, index) => {
            const Icon = cta.icon;
            return (
              <Card
                key={index}
                className={`border transition-all duration-300 ${
                  cta.isPrimary
                    ? 'border-primary/50 bg-primary/5 dark:bg-primary/10 hover:border-primary hover:shadow-lg dark:hover:shadow-primary/20'
                    : 'border-border/50 bg-card/50 hover:border-border/80 hover:shadow-md dark:hover:shadow-md'
                } backdrop-blur-sm`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className={`h-6 w-6 ${cta.isPrimary ? 'text-primary' : 'text-muted-foreground'}`} />
                    {cta.isPrimary && (
                      <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/20 px-2 py-1 rounded">
                        Primary
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-lg font-semibold text-foreground">
                    {cta.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col h-full">
                  <p className="text-sm text-muted-foreground mb-4 flex-1">
                    {cta.description}
                  </p>
                  <Button
                    asChild
                    className={`w-full group ${
                      cta.isPrimary
                        ? 'bg-primary hover:bg-primary/90 text-primary-foreground font-medium'
                        : 'border border-border bg-background hover:bg-muted/50 text-foreground'
                    }`}
                  >
                    <Link href={cta.href}>
                      {cta.label}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-12" />

        {/* Footer Message */}
        <div className="text-center bg-muted/30 rounded-lg border border-border/50 p-6 md:p-8">
          <p className="text-muted-foreground text-base leading-relaxed">
            I am actively seeking research opportunities in <span className="font-semibold text-foreground">Smart Manufacturing, Digital Twins, and AI integration in textile engineering</span>. 
            Whether you are an academic researcher, professor, or organization exploring these frontiers, I would be delighted to discuss potential collaborations and research positions.
          </p>
        </div>
      </div>
    </section>
  );
}
