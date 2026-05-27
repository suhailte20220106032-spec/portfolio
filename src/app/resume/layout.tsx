import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Textile Engineer & Systems Architect | Academic CV',
  description: 'Academic CV and Resume of Md. Suhail Mujtabir - Hardware-Software Integrator, Systems Architect. Textile Engineering undergraduate with expertise in Smart Manufacturing, Digital Twins, and AI integration.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
