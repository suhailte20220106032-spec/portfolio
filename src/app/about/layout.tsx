//app/about/layout.tsx
import { Metadata } from 'next';
import AboutLayoutClient from './aboutClientHeader';

export const metadata: Metadata = {
  title: 'About | Md. Suhail Mujahir - Textile Engineer & AI Developer',
  description: 'Md. Suhail Mujahir is a BSc Textile Engineering student and AI early adopter specializing in sustainable textile automation, machine learning, and web development. Secretary at AASTC AUST Student Chapter, expert in React, Next.js, Python.',
  keywords: [
    'Textile Engineer Bangladesh',
    'AI Textile Engineering',
    'Sustainable Textile Technology',
    'Machine Learning Textile',
    'Web Developer Bangladesh',
    'React Developer',
    'Next.js Developer',
    'Textile Automation',
    'AUST Student',
    'Ahsanullah University',
    'Textile Tech Innovation',
    'AI Developer Bangladesh',
    'Full Stack Developer',
    'Sustainable Fashion Tech',
    'Textile Engineering AI',
    'GreenWAT Project',
    'AASTC Student Chapter',
    'Technology Enthusiast',
    'Freelance Developer Bangladesh'
  ],
  authors: [{ name: 'Md. Suhail Mujahir' }],
  openGraph: {
    title: 'About Md. Suhail Mujahir - Textile Engineer & AI Developer',
    description: 'BSc Textile Engineering student specializing in AI, sustainable textile automation, and web development. Leading AASTC AUST Chapter.',
    type: 'profile',
    locale: 'en_US',
    siteName: 'Md. Suhail Mujahir Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Md. Suhail Mujahir - Textile Engineer & AI Developer',
    description: 'Bridging textile engineering and AI technology for sustainable innovation.',
  },
  alternates: {
    canonical: '/about',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AboutLayoutClient>{children}</AboutLayoutClient>;
}