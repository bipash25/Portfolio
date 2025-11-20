import './globals.css';
import { Outfit } from 'next/font/google';
import LayoutWrapper from '@/components/LayoutWrapper';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';

const outfit = Outfit({ subsets: ['latin'] });

export const metadata = {
  title: 'Biprodeep Nath | Developer Portfolio',
  description: 'Personal portfolio of Biprodeep Nath, a passionate developer and thinker.',
  keywords: ['Biprodeep Nath', 'Developer', 'Portfolio', 'Web Development', 'Next.js'],
  openGraph: {
    title: 'Biprodeep Nath | Developer Portfolio',
    description: 'Crafting digital experiences with code and curiosity.',
    url: 'https://bipro.dev',
    siteName: 'Biprodeep Nath',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biprodeep Nath | Developer Portfolio',
    description: 'Crafting digital experiences with code and curiosity.',
    creator: '@theBIPRO',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={outfit.className}>
        <CustomCursor />
        <ScrollProgress />
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
