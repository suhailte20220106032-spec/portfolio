'use client';

import { Button } from '@/components/ui/button';
import { Download, ExternalLink, FileText } from 'lucide-react';
import Link from 'next/link';
import { domToPDF } from '@/lib/domToPDF';

export default function ResumePage() {
  const handleDownloadCV = () => {
    const el = document.getElementById('cv-content');
    if (el) {
      domToPDF(el, 'Suhail-Mujtabir-CV.pdf');
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Web-only Header with Page Title - Hidden in Print */}
      <div className="pt-24 pb-8 no-print">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="h-8 w-8 text-primary" />
              <h1 className="text-4xl sm:text-5xl font-serif font-bold">Academic CV & Resume</h1>
            </div>
            <div className="flex gap-3 flex-wrap">
              <Button
                onClick={handleDownloadCV}
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Download CV
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Optimized for Print */}
      <div id="cv-content" className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 print:px-8 py-8 print:py-6">
        {/* Name & Title Header - Visible in Print */}
        <section className="mb-6 print:mb-4 pb-6 print:pb-4 border-b border-border/50">
          <h1 className="text-4xl print:text-3xl font-serif font-bold text-foreground mb-2 print:mb-1">
            Md. Suhail Mujtabir
          </h1>
          <p className="text-xl print:text-lg font-semibold text-primary mb-4 print:mb-3">
            Hardware-Software Integrator | Systems Architect
          </p>
          
          {/* Contact Info */}
          <div className="flex flex-wrap gap-4 print:gap-3 text-sm text-muted-foreground mb-3 print:mb-2">
            <div className="flex items-center gap-2">
              <span>📍 Dhaka, Bangladesh</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📧 suhailmujtabir@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📱 +880 155 245 4904</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 print:gap-3 text-sm print:hidden">
            <a
              href="https://linkedin.com/in/suhail-mujtabir"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline flex items-center gap-1"
            >
              LinkedIn <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href="https://github.com/suhailmujtabir"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline flex items-center gap-1"
            >
              GitHub <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </section>

        {/* Professional Summary */}
        <section className="mb-6 print:mb-5">
          <h3 className="text-xl print:text-base font-semibold text-foreground mb-3 print:mb-2 uppercase tracking-wider">
            Professional Summary
          </h3>
          <p className="text-muted-foreground leading-relaxed print:text-sm print:leading-normal">
            Textile Engineering undergraduate with advanced systems architecture expertise, bridging material science and digital infrastructure. Proven ability to design and deploy end-to-end hardware-software integrated systems at scale. Demonstrated leadership across multiple technical organizations with focus on innovation, automation, and scalable solutions. Positioned to advance Smart Manufacturing and AI-assisted textile engineering through rigorous research and systems thinking.
          </p>
        </section>

        {/* Education */}
        <section className="mb-6 print:mb-5">
          <h3 className="text-xl print:text-base font-semibold text-foreground mb-3 print:mb-2 uppercase tracking-wider">
            Education
          </h3>
          <div className="space-y-4 print:space-y-3">
            <div className="border-l-2 border-primary/50 pl-4 print:pl-3">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-semibold text-foreground text-lg print:text-base">
                  Bachelor of Science in Textile Engineering
                </h4>
                <span className="text-sm text-muted-foreground print:text-xs whitespace-nowrap ml-2">Expected 2026</span>
              </div>
              <p className="text-foreground font-medium print:text-sm">
                Ahsanullah University of Science and Technology (AUST)
              </p>
              <p className="text-sm text-muted-foreground print:text-sm">
                Major: Apparel Manufacturing
              </p>
              <p className="text-sm text-muted-foreground print:text-sm mt-1">
                <strong>Academic Mentorship:</strong> Dr. Mohammad Tajul Islam
              </p>
            </div>

            <div className="border-l-2 border-primary/50 pl-4 print:pl-3">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-semibold text-foreground text-lg print:text-base">
                  Higher Secondary Certificate (HSC)
                </h4>
                <span className="text-sm text-muted-foreground print:text-xs whitespace-nowrap ml-2">2021</span>
              </div>
              <p className="text-sm text-muted-foreground print:text-sm">
                GPA: 5.00 | Academic Excellence
              </p>
            </div>
          </div>
        </section>

        {/* Technical Skills */}
        <section className="mb-6 print:mb-5">
          <h3 className="text-xl print:text-base font-semibold text-foreground mb-3 print:mb-2 uppercase tracking-wider">
            Technical Skills
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:gap-3 print:grid-cols-2">
            <div>
              <h4 className="font-semibold text-foreground mb-2 print:mb-1 print:text-sm">Systems & Architecture</h4>
              <p className="text-sm text-muted-foreground print:text-sm print:leading-normal">
                Next.js 15 (App Router), React, TypeScript, Scalable Database Design, API Architecture
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-2 print:mb-1 print:text-sm">Hardware-Software Integration</h4>
              <p className="text-sm text-muted-foreground print:text-sm print:leading-normal">
                ESP32, NFC/Sensor Integration, Real-time Communication Protocols, IoT Systems
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-2 print:mb-1 print:text-sm">Data Infrastructure</h4>
              <p className="text-sm text-muted-foreground print:text-sm print:leading-normal">
                Supabase, PostgreSQL, Real-time Database Sync, SQL, Data Modeling
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-2 print:mb-1 print:text-sm">AI & Automation</h4>
              <p className="text-sm text-muted-foreground print:text-sm print:leading-normal">
                Machine Learning Concepts, Python, Data Processing, Automation Design
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-2 print:mb-1 print:text-sm">Design & Tools</h4>
              <p className="text-sm text-muted-foreground print:text-sm print:leading-normal">
                Tailwind CSS, UI/UX Modernization, Adobe Illustrator, Responsive Design
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-2 print:mb-1 print:text-sm">Programming Languages</h4>
              <p className="text-sm text-muted-foreground print:text-sm print:leading-normal">
                JavaScript, TypeScript, Python, C, C++, C#, SQL
              </p>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="mb-6 print:mb-5">
          <h3 className="text-xl print:text-base font-semibold text-foreground mb-3 print:mb-2 uppercase tracking-wider">
            Featured Projects
          </h3>
          <div className="space-y-5 print:space-y-4">
            <div className="border border-border/50 rounded-lg p-5 print:p-4 bg-card/50 print:page-break-inside-avoid">
              <div className="flex justify-between items-start mb-2 print:mb-1">
                <h4 className="font-semibold text-foreground text-lg print:text-base">
                  NFC Card Activation & Web Access System
                </h4>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded font-medium print:text-xs whitespace-nowrap ml-2">
                  Hardware-Software Integration
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-3 print:mb-2 print:text-sm print:leading-normal">
                Architected and deployed an end-to-end NFC system managing 200+ users with real-time hardware-software synchronization. Engineered custom ESP32 NFC reader prototype with sensor integration, built scalable Next.js frontend, and integrated Supabase backend for comprehensive data management and user administration.
              </p>
              <div className="space-y-2 print:space-y-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider print:text-xs">Key Achievements:</p>
                <ul className="text-sm text-muted-foreground space-y-1 print:space-y-0.5 print:text-sm print:leading-normal">
                  <li>• Proved feasibility of real-time hardware-software integration at production scale (200+ users)</li>
                  <li>• Demonstrated scalability from prototype validation to enterprise-level deployment</li>
                  <li>• Built complete infrastructure spanning physical hardware, backend APIs, and responsive UI</li>
                </ul>
              </div>
            </div>

            <div className="border border-border/50 rounded-lg p-5 print:p-4 bg-card/50 print:page-break-inside-avoid">
              <div className="flex justify-between items-start mb-2 print:mb-1">
                <h4 className="font-semibold text-foreground text-lg print:text-base">
                  Event Management Ecosystem
                </h4>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded font-medium print:text-xs whitespace-nowrap ml-2">
                  Software Architecture
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-3 print:mb-2 print:text-sm print:leading-normal">
                Designed and deployed a modular event management platform supporting 40+ student organizations with minimal resource constraints. Built on Next.js with Supabase backend, enabling real-time event data management, multi-organization support, and participant tracking.
              </p>
              <div className="space-y-2 print:space-y-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider print:text-xs">Key Achievements:</p>
                <ul className="text-sm text-muted-foreground space-y-1 print:space-y-0.5 print:text-sm print:leading-normal">
                  <li>• Optimized architectural decisions under real-world budget and resource constraints</li>
                  <li>• Validated scalable system design supporting organizational growth at multiple orders of magnitude</li>
                  <li>• Demonstrated operational excellence through seamless multi-tenant platform operation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership & Academic Engagement */}
        <section className="mb-6 print:mb-5">
          <h3 className="text-xl print:text-base font-semibold text-foreground mb-3 print:mb-2 uppercase tracking-wider">
            Leadership & Academic Engagement
          </h3>
          <div className="space-y-4 print:space-y-3">
            <div className="border-l-2 border-primary/50 pl-4 print:pl-3 print:page-break-inside-avoid">
              <h4 className="font-semibold text-foreground print:text-sm">Founding Vice President, AUST Model United Nations Cell</h4>
              <p className="text-sm text-muted-foreground print:text-sm">March 2026 - Present</p>
              <p className="text-sm text-muted-foreground print:text-sm print:leading-normal">
                Established inaugural MUN Cell at AUST. Recruited and managed 40+ student delegates. Developed foundational framework for research-focused Model United Nations activities.
              </p>
            </div>

            <div className="border-l-2 border-primary/50 pl-4 print:pl-3 print:page-break-inside-avoid">
              <h4 className="font-semibold text-foreground print:text-sm">Chairperson, AATCC AUST Student Chapter</h4>
              <p className="text-sm text-muted-foreground print:text-sm">February 2026 - Present</p>
              <p className="text-sm text-muted-foreground print:text-sm print:leading-normal">
                Direct operations of first international AATCC student chapter in Bangladesh. Coordinate industrial collaborations and organize technical webinars on advanced textile topics.
              </p>
            </div>

            <div className="border-l-2 border-primary/50 pl-4 print:pl-3 print:page-break-inside-avoid">
              <h4 className="font-semibold text-foreground print:text-sm">Executive Head of Process Automation, AUST Innovation & Design Club</h4>
              <p className="text-sm text-muted-foreground print:text-sm">March 2024 - January 2026</p>
              <p className="text-sm text-muted-foreground print:text-sm print:leading-normal">
                Led large executive teams executing technical events and business initiatives. Managed public relations and corporate sponsorships bridging academia and industry.
              </p>
            </div>
          </div>
        </section>

        {/* Internships */}
        <section className="mb-6 print:mb-5">
          <h3 className="text-xl print:text-base font-semibold text-foreground mb-3 print:mb-2 uppercase tracking-wider">
            Internship Experience
          </h3>
          <div className="space-y-4 print:space-y-3">
            <div className="border-l-2 border-primary/50 pl-4 print:pl-3 print:page-break-inside-avoid">
              <h4 className="font-semibold text-foreground print:text-sm">Contributing Intern, LEAD Academy</h4>
              <p className="text-sm text-muted-foreground print:text-sm">December 2023 - June 2024</p>
              <p className="text-sm text-muted-foreground print:text-sm print:leading-normal">
                Focused on affiliate marketing and sales promotion strategies.
              </p>
            </div>

            <div className="border-l-2 border-primary/50 pl-4 print:pl-3 print:page-break-inside-avoid">
              <h4 className="font-semibold text-foreground print:text-sm">Communication Intern, Youth School for Social Entrepreneurs (YSSE)</h4>
              <p className="text-sm text-muted-foreground print:text-sm">December 2023 - May 2024</p>
              <p className="text-sm text-muted-foreground print:text-sm print:leading-normal">
                Supported communication, networking, executive operations, and human resources functions.
              </p>
            </div>
          </div>
        </section>

        {/* Research Interests */}
        <section className="mb-8 print:mb-4 pb-8 print:pb-0 border-b border-border/50 print:border-b-0">
          <h3 className="text-xl print:text-base font-semibold text-foreground mb-3 print:mb-2 uppercase tracking-wider">
            Research Interests & Areas of Focus
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:gap-3 print:grid-cols-2">
            <div className="bg-primary/5 dark:bg-primary/10 rounded-lg p-4 print:p-3 border border-primary/20 print:page-break-inside-avoid">
              <h4 className="font-semibold text-foreground mb-2 print:mb-1 print:text-sm">Smart Manufacturing</h4>
              <p className="text-sm text-muted-foreground print:text-sm print:leading-normal">
                Digital transformation of textile manufacturing processes through IoT, real-time monitoring, and data-driven optimization.
              </p>
            </div>

            <div className="bg-primary/5 dark:bg-primary/10 rounded-lg p-4 print:p-3 border border-primary/20 print:page-break-inside-avoid">
              <h4 className="font-semibold text-foreground mb-2 print:mb-1 print:text-sm">Digital Twins</h4>
              <p className="text-sm text-muted-foreground print:text-sm print:leading-normal">
                Virtual representation of physical manufacturing systems for simulation, optimization, and predictive maintenance.
              </p>
            </div>

            <div className="bg-primary/5 dark:bg-primary/10 rounded-lg p-4 print:p-3 border border-primary/20 print:page-break-inside-avoid">
              <h4 className="font-semibold text-foreground mb-2 print:mb-1 print:text-sm">AI in Textile Engineering</h4>
              <p className="text-sm text-muted-foreground print:text-sm print:leading-normal">
                Machine learning applications for quality control, process optimization, and material property prediction.
              </p>
            </div>

            <div className="bg-primary/5 dark:bg-primary/10 rounded-lg p-4 print:p-3 border border-primary/20 print:page-break-inside-avoid">
              <h4 className="font-semibold text-foreground mb-2 print:mb-1 print:text-sm">Hardware-Software Systems</h4>
              <p className="text-sm text-muted-foreground print:text-sm print:leading-normal">
                Integration of embedded systems, IoT devices, and cloud infrastructure for industrial applications.
              </p>
            </div>
          </div>
        </section>

        {/* CTA to Return - Hidden in Print */}
        <div className="text-center py-8 print:hidden">
          <p className="text-muted-foreground mb-4">
            For more information about my work and projects, please visit my portfolio.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button asChild variant="outline">
              <Link href="/">Back to Homepage</Link>
            </Button>
            <Button asChild>
              <Link href="/portfolio">View Portfolio</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
