import Navbar from '@/components/Navbar';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextAuthProvider } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Monitoramento Seibt',
  description: 'Criado para ajudar a monitorar e controlar os açudes agrícolas.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <main className='h-screen flex flex-col justify-center items-center'>
          <NextAuthProvider>
            <Navbar />
            {children}
          </NextAuthProvider>
        </main>
      </body>
    </html>
  );
}
