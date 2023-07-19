'use client';

import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { Poppins } from 'next/font/google';
import Link from 'next/link';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700']
});

const NotFoundPage = () => {
  return (
    <div className={poppins.className}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="flex flex-col gap-y-4 justify-center items-center w-screen h-screen">
          <h1 className="font-bold text-2xl">404. Oops! Page not found.</h1>
          <Link href={'/'} className="underline hover:text-muted-foreground">
            Go Back To Home Page
          </Link>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default NotFoundPage;
