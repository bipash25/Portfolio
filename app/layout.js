import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Outfit } from 'next/font/google';

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

export const metadata = {
  title: {
    default: 'Biprodeep Nath | Developer Portfolio',
    template: '%s | Biprodeep Nath',
  },
  description: 'Personal portfolio of Biprodeep Nath - Student, Developer, Thinker. Showcasing projects, blogs, and a journey through code and science.',
  keywords: ['Biprodeep Nath', 'Developer', 'Portfolio', 'Next.js', 'React', 'Student', 'Science'],
  authors: [{ name: 'Biprodeep Nath' }],
  creator: 'Biprodeep Nath',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bipro.dev',
    title: 'Biprodeep Nath | Developer Portfolio',
    description: 'Student. Developer. Thinker. Welcome to my corner of the internet.',
    siteName: 'Biprodeep Nath',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biprodeep Nath | Developer Portfolio',
    description: 'Student. Developer. Thinker. Welcome to my corner of the internet.',
    creator: '@theBIPRO',
  },
};

import LayoutWrapper from '@/components/LayoutWrapper';

// ... imports ...

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={outfit.className} suppressHydrationWarning>
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
