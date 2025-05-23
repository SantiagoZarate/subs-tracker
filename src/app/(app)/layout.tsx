import { Footer } from '@/components/common/footer/footer';
import { Header } from '@/components/common/header/header';
import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../styles/index.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} relative antialiased`}
      >
        <Header />
        <section className="grid min-h-dvh grid-rows-[1fr_auto]">
          <section className="max-w-tablet mx-auto grid pt-[calc(var(--spacing-top)_+_48px)] pb-12">
            {children}
          </section>
          <Footer />
        </section>
        <Toaster />
      </body>
    </html>
  );
}
