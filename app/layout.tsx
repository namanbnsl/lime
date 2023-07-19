import '@uploadthing/react/styles.css';
import './globals.css';
import AuthContext from '@/components/auth/AuthContext';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700']
});

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin Dashboard'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="referrer" content="no-referrer" />
      </head>
      <AuthContext>
        <body className={poppins.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children} <Toaster />
          </ThemeProvider>
        </body>
      </AuthContext>
    </html>
  );
}
