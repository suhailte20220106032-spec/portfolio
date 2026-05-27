'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Microscope, Zap, GraduationCap } from 'lucide-react';

export default function HomeAboutSection() {
  const aboutCards = [
    {
      icon: Microscope,
      title: 'Material Science → Digital Infrastructure',
      description:
        'My textile engineering foundation provides deep understanding of material properties, manufacturing processes, and real-world production constraints. This knowledge directly informs how I architect software systems that solve actual manufacturing problems, rather than theoretical solutions.',
      highlight: 'Foundation'
    },
    {
      icon: Zap,
      title: 'Hardware + Software + Data = Smart Systems',
      description:
        'Proven ability to design end-to-end systems spanning physical prototyping (sensors, microcontrollers), digital architecture (APIs, databases), and scalable infrastructure. This integrated systems-thinking positions me to research Digital Twins and Smart Manufacturing in textile contexts.',
      highlight: 'Integration'
    },
    {
      icon: GraduationCap,
      title: 'Research-Ready Problem Solving',
      description:
        'I approach complex problems through systems decomposition, quantifiable metrics, and multi-domain integration. Building prototypes to validate concepts before scaling demonstrates a research mindset. Ready to contribute to advancing Smart Manufacturing and AI-assisted textile innovation.',
      highlight: 'Research'
    }
  ];

  return (
    <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3 text-foreground">
            Bridging Material Science with Digital Systems
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Textile Engineering student with proven expertise in hardware-software integration and systems architecture
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {aboutCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Card 
                key={index}
                className="border border-border/50 hover:border-border/80 transition-all duration-300 hover:shadow-lg dark:hover:shadow-lg/20 bg-card/50 backdrop-blur-sm"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <Icon className="h-8 w-8 text-primary" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary/60">
                      {card.highlight}
                    </span>
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Divider */}
        <div className="mt-12 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>
    </section>
  );
}
