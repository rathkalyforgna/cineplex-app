import './globals.css';
import type {Metadata} from 'next';
import {Montserrat} from 'next/font/google';
import {Header} from '@/components/Header';
import {Footer} from '@/components/Footer';
import {Providers} from '@/utils/providers';

const montserrat = Montserrat({
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Movie Cineplex',
  description: 'Browse and book your favourite movie now',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
