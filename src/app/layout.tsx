import type { Metadata } from 'next';
import { DM_Sans, Crimson_Pro } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import ScrollToTop from '@/components/ScrollToTop';
import { SnowProvider } from '@/components/Snow';
import ClickSpark from '@/components/Click';
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
});

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://suhail-mujtabir.me'),
  title: {
    default: "Suhail Mujtabir Fuad | Textile Engineering Student & AI Enthusiast",
    template: "%s | Suhail Mujtabir Fuad"
  },
  description: "Undergraduate Textile Engineering Student | Small Business Owner | Passionate about leveraging AI and Automation for Sustainable Industrial Solutions | Skilled in Leadership, Project Management, and Strategic Planning.",
  keywords: [
    "Suhail Mujtabir Fuad",
    "Textile Engineering Bangladesh",
    "AI Automation",
    "Sustainable Industrial Solutions",
    "Project Management",
    "Leadership",
    "Strategic Planning",
    "Small Business Owner",
    "Dhaka Bangladesh",
    "Textile Technology",
    "Industrial Automation",
    "Undergraduate Student Portfolio"
  ],
  authors: [{ name: "Suhail Mujtabir Fuad" }],
  creator: "Suhail Mujtabir Fuad",
  publisher: "Suhail Mujtabir Fuad",
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://suhail-mujtabir.me',
    title: "Suhail Mujtabir Fuad | Textile Engineering Student & AI Enthusiast",
    description: "Undergraduate Textile Engineering Student | Small Business Owner | Passionate about leveraging AI and Automation for Sustainable Industrial Solutions",
    siteName: "Suhail Mujtabir Fuad Portfolio",
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Suhail Mujtabir Fuad - Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Suhail Mujtabir Fuad | Textile Engineering Student & AI Enthusiast",
    description: "Undergraduate Textile Engineering Student | Small Business Owner | Passionate about AI and Automation for Sustainable Industrial Solutions",
    images: ['/og.png'],
    creator: '@suhailmujtabir',
  },
  alternates: {
    canonical: 'https://suhail-mujtabir.me',
  },
  verification: {
    google: 'google-site-verification-code-here',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
        <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Suhail Mujtabir Fuad" />
        <meta name="geo.region" content="BD-13" />
        <meta name="geo.placename" content="Dhaka" />
        <meta name="geo.position" content="23.8103;90.4125" />
        <meta name="ICBM" content="23.8103, 90.4125" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'system';
                  var isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      
      <body className={`${dmSans.variable} ${crimsonPro.variable} font-sans antialiased`}>
        <Providers>
            <ClickSpark
                sparkSize={10}
                sparkRadius={15}
                sparkCount={8}
                duration={400}
              >
            <SnowProvider>
          <SmoothScroll />
          <ScrollToTop />
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1">
                
              {children}
            
            </main>
            <Footer />
          </div>
          </SnowProvider>
          </ClickSpark>
        </Providers>
      </body>
      
    </html>
  );
}
